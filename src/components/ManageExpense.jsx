import React, { useState, useEffect } from 'react';
import { FaUserPlus, FaEdit, FaSpinner } from 'react-icons/fa';
import { MdDateRange, MdDelete, MdError } from "react-icons/md";
import { GiExpense } from "react-icons/gi";
import { CiCirclePlus, CiShoppingCart } from "react-icons/ci";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { useNavigate, Link } from 'react-router-dom'

const ManageExpense = () => {
    const userId = localStorage.getItem('userId')
    const [expenses, setExpenses] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        if (!userId) {
            navigate('/')
        }
        fetchExpenses(userId)
    }, []);
    const [loading, setLoading] = useState(false);

    const [editExpense, seteditExpense] = useState(null);

    const handleEdit = (expense) => {
        seteditExpense(expense)
    }

    const handleChange = (e) => {
        seteditExpense({ ...editExpense, [e.target.name]: e.target.value });
    };

    const fetchExpenses = async (userId) => {
        try {
            const response = await fetch(`https://daily-expense-tracker-2i0e.onrender.com/api/manage_expense/${userId}`)
            const data = await response.json();
            setExpenses(data);
        }
        catch (error) {
            console.error('Error', error)
        }
    }

    const handleUpdate = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://daily-expense-tracker-2i0e.onrender.com/api/update_expense/${editExpense.id}/`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' }, // FIXED
                body: JSON.stringify(editExpense)
            })
            if (response.ok) {
                toast.success('Expense updated Successfully')
                seteditExpense(null)
                fetchExpenses(userId)
            }
            else {
                toast.error('Failed to update expense')
            }
        }
        catch (error) {
            console.error('Error update', error)
            toast.error('Something went Wrong')
        }finally{
            setLoading(false);
        }
    }
    const handleDelete = async (expenseId) => {
        if(window.confirm('Are you sure you want to delete this expense?')){
            try {
                const response = await fetch(`https://daily-expense-tracker-2i0e.onrender.com/api/delete_expense/${expenseId}/`, {
                    method: 'DELETE'
                })
                if (response.ok) {
                    toast.success('Expense Deleted Successfully')
                    fetchExpenses(userId)
                }
                else {
                    toast.error('Failed to delete expense')
                }
            }
            catch (error) {
                console.error('Error delete', error)
                toast.error('Something went Wrong')
            }
        }
        
    }


    return (
        <div className='container'>
            <div className="card-body p-4">
                <h2 className="text-center mb-4">
                    <GiExpense className='me-1' />Manage Expense
                </h2>
                <p className="text-center text-muted mb-4">View, Edit or Delete your expenses</p>
            </div>
            <table className='table table-striped table-bordered rounded'>
                <thead className="table table-dark text-center" style={{ backgroundColor: '#1e293b' }}>

                    <tr>
                        <th>Sr No.</th>
                        <th>Date</th>
                        <th>Items</th>
                        <th>Cost</th>
                        <th>Action</th>

                    </tr>
                </thead>
                <tbody className='text-center'>
                    {expenses.length > 0 ? (
                        expenses.map((exp, index) => (
                            <tr key={exp.id}>
                                <td>{index + 1}</td>
                                <td>{exp.ExpenseDate}</td>
                                <td>{exp.ExpenseItem}</td>
                                <td>{exp.ExpenseCost}</td>
                                <td>
                                    <button className='btn btn-sm btn-info me-1 ' onClick={() => handleEdit(exp)}><FaEdit /></button>
                                    <button className='btn btn-sm btn-danger ms-1' onClick={() => handleDelete(exp.id)}><MdDelete /></button>
                                </td>
                            </tr>
                        ))

                    ) : (
                        <tr>
                            <td colSpan='5' className='text-center text-muted'><MdError className='me-2' />No Expense Found</td>
                        </tr>
                    )}

                </tbody>
            </table>
            {editExpense && (
                <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header text-white" style={{ backgroundColor: '#3b82f6' }}>
                                <h5 className="modal-title"><FaEdit className='me-2' />Edit Expense</h5>
                                <button type="button" className="btn-close" onClick={() => seteditExpense(null)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Expense Date</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light"><MdDateRange /></span>
                                        <input
                                            type="date"
                                            name="ExpenseDate"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={editExpense.ExpenseDate}
                                            required
                                        />
                                    </div>
                                </div>


                                <div className="mb-3">
                                    <label className="form-label">Expense Item</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light"><CiShoppingCart /></span>
                                        <input
                                            type="text"
                                            name="ExpenseItem"
                                            className="form-control"
                                            placeholder="Enter Expense Item(e.g. Groceries, petrol, etc.)"
                                            onChange={handleChange}
                                            value={editExpense.ExpenseItem}
                                            required
                                        />
                                    </div>
                                </div>


                                <div className="mb-4">
                                    <label className="form-label">Expense Cost</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light"><RiMoneyRupeeCircleLine /></span>
                                        <input
                                            type="number"
                                            name="ExpenseCost"
                                            className="form-control"
                                            placeholder="Enter amount spent"
                                            onChange={handleChange}
                                            value={editExpense.ExpenseCost}

                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => seteditExpense(null)}>Close</button>
                                {loading ? (
                                    <button type="button" className="btn btn-primary" disabled>
                                        <FaSpinner className="icon spin me-2" /> Saving...
                                    </button>
                                ) : (
                                    <button type="button" className="btn btn-primary" onClick={handleUpdate}>Save changes</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer />
        </div>
    )
}

export default ManageExpense
