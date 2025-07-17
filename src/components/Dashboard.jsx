import React, { useEffect, useState } from 'react'
import { FaRupeeSign } from 'react-icons/fa';
import { data, useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2'
import { ArcElement, Chart, Tooltip, Legend } from 'chart.js';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import '../assets/css/dashboard.css'

Chart.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {

    const userName = localStorage.getItem('userName');
    const userId = localStorage.getItem('userId')
    const navigate = useNavigate()

    const [loading, setLoading] = useState(true);

    const [expenses, setExpenses] = useState([])

    const pieData = {
        labels: expenses.map(exp => exp.ExpenseItem),
        datasets: [
            {
                data: expenses.map(exp => parseFloat(exp.ExpenseCost)),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 159, 64, 0.7)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const [todayTotal, setTodaytotal] = useState(0)
    const [yesterdayTotal, setYesterdaytotal] = useState(0)
    const [last7dayTotal, setLast7daytotal] = useState(0)
    const [last30dayTotal, setLast30daytotal] = useState(0)
    const [currentyearTotal, setCurrentyeartotal] = useState(0)
    const [grandTotal, setGrandtotal] = useState(0)


    useEffect(() => {
        if (!userId) {
            navigate('/')
        }
        fetchExpenses(userId)
    }, [])

    const fetchExpenses = async (userId) => {
        try {
            const response = await fetch(`https://daily-expense-tracker-2i0e.onrender.com/api/manage_expense/${userId}`)
            const data = await response.json();
            setExpenses(data);

            calculateTotals(data)
        }
        catch (error) {
            console.error('Error', error)
        }
    }

    const calculateTotals = async (data) => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);  // Fix: Use getDate() instead of getDay()

        const last7Days = new Date(today);
        last7Days.setDate(last7Days.getDate() - 7);

        const last30Days = new Date(today);
        last30Days.setDate(last30Days.getDate() - 30);

        const currentYear = today.getFullYear();

        let todaySum = 0, yesterdaySum = 0, last7daysSum = 0, last30daysSum = 0, yearSum = 0, grandSum = 0;

        data.forEach(element => {
            const expenseDate = new Date(element.ExpenseDate);
            const amount = parseFloat(element.ExpenseCost) || 0;

            // Today's expenses
            if (expenseDate.toDateString() === today.toDateString()) {
                todaySum += amount;
            }

            // Yesterday's expenses
            if (isSameDay(expenseDate, yesterday)) {
                yesterdaySum += amount;
            }

            // Last 7 days (including today)
            if (expenseDate >= last7Days) {
                last7daysSum += amount;
            }

            // Last 30 days (including today)
            if (expenseDate >= last30Days) {
                last30daysSum += amount;
            }

            // Current year
            if (expenseDate.getFullYear() === currentYear) {
                yearSum += amount;
            }

            function isSameDay(date1, date2) {
                return date1.getFullYear() === date2.getFullYear() &&
                    date1.getMonth() === date2.getMonth() &&
                    date1.getDate() === date2.getDate();
            }

            grandSum += amount;
        });



        setTodaytotal(todaySum);
        setYesterdaytotal(yesterdaySum);
        setLast7daytotal(last7daysSum);
        setLast30daytotal(last30daysSum);
        setCurrentyeartotal(yearSum);
        setGrandtotal(grandSum);
    }

    return (
        <div className='container mt-4'>
            <div className='text-center ms-auto lead '>
                <h1 style={{ fontSize: 30 }}>Welcome,<span className='text-primary fw-bold'> {userName}..</span></h1>
                <p className='text-muted'>Here's Your Expense Overview </p>
            </div>
            <hr />
            
            <div className="row">
                <div className="col-md-4">
                    <div className="card l-bg-blue-dark text-white text-center mb-4" style={{ height: 150 }}>
                        <div className="card-body">
                            <h5 className="card-title">Today's Expense</h5>
                            <p className="card-text"><FaRupeeSign className="me-2" />{todayTotal}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card l-bg-orange-dark text-white text-center mb-4" style={{ height: 150 }}>
                        <div className="card-body">
                            <h5 className="card-title">Yesterday's Expense</h5>
                            <p className="card-text"><FaRupeeSign className="me-2" />{yesterdayTotal}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card l-bg-cherry text-white text-center mb-4" style={{ height: 150 }}>
                        <div className="card-body">
                            <h5 className="card-title">Last 7 Day's Expense</h5>
                            <p className="card-text"><FaRupeeSign className="me-2" />{last7dayTotal}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card l-bg-green-dark text-white text-center mb-4" style={{ height: 150 }}>
                        <div className="card-body">
                            <h5 className="card-title">Last 30 Day's Expense</h5>
                            <p className="card-text"><FaRupeeSign className="me-2" />{last30dayTotal}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card l-bg-blue-dark text-white text-center mb-4" style={{ height: 150 }}>
                        <div className="card-body">
                            <h5 className="card-title">CurrentYear's Expense</h5>
                            <p className="card-text"><FaRupeeSign className="me-2" />{currentyearTotal}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card l-bg-green-dark text-white text-center mb-4" style={{ height: 150 }}>
                        <div className="card-body">
                            <h5 className="card-title">Total Expense</h5>
                            <p className="card-text"><FaRupeeSign className="me-2" />{grandTotal}</p>
                        </div>
                    </div>
                </div>
            </div>

            <hr />
            <div className='mt-3 mx-auto' style={{ height: 400, width: 400 }}>
                <h4 className='text-center'>Expense Distribution</h4>
                <Pie data={pieData} />
            </div>
        </div>
    )
}

export default Dashboard
