import React, { useState, useEffect } from 'react';
import { FaKey, FaLock, FaLockOpen, FaSpinner } from 'react-icons/fa';
import { MdDateRange } from "react-icons/md";
import { CiCirclePlus, CiShoppingCart } from "react-icons/ci";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RiMoneyRupeeCircleLine } from "react-icons/ri";

import { useNavigate, Link } from 'react-router-dom'

const ChangePassword = () => {
    const [loading, setLoading] = useState(false);

    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();
    const [formData, setformData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {
            toast.error("Passwords don't match. Please try again!");
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(`https://daily-expense-tracker-2i0e.onrender.com/api/change_password/${userId}/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    oldPassword: formData.oldPassword,
                    newPassword: formData.newPassword
                })
            });

            if (!response.ok) {
                // Handle HTTP errors (404, 500, etc.)
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to change password');
            }

            const data = await response.json();
            toast.success(data.message);
            setformData({
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
        }
        catch (error) {
            console.error('Error:', error);
            toast.error(error.message || 'Something went wrong. Please try again.');
        }finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!userId) {
            navigate('/');
        }
    }, []);

    return (
        <div className='container mt-5'>
            <div className='text-center mb-4'>
                <h2 className='text-center'><FaKey className='me-2' />Change Password</h2>
                <p className='text-muted lead'>Secure you account with new password</p>
            </div>
            <form className=' col-6 mx-auto rounded shadow p-4' onSubmit={handleSubmit}>
                <div className="modal-body">
                    {/* Expense Date */}
                    <div className="mb-3">
                        <label className="form-label">Old Password</label>
                        <div className="input-group">
                            <span className="input-group-text bg-light">
                                <FaLock />
                            </span>
                            <input
                                type="password"
                                name="oldPassword"
                                className="form-control"
                                placeholder='Old password'
                                required
                                value={formData.oldPassword}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Expense Item */}
                    <div className="mb-3">
                        <label className="form-label">Enter new password</label>
                        <div className="input-group">
                            <span className="input-group-text bg-light">
                                <FaLockOpen />
                            </span>
                            <input
                                type="password"
                                name="newPassword"
                                className="form-control"
                                placeholder="New Password"
                                required
                                value={formData.newPassword}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Expense Cost */}
                    <div className="mb-4">
                        <label className="form-label">Confirm Password</label>
                        <div className="input-group">
                            <span className="input-group-text bg-light">
                                <FaLockOpen />
                            </span>
                            <input
                                type="password"
                                name="confirmPassword"
                                className="form-control"
                                placeholder="Confirm password"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button type="submit" className="btn btn-primary w-100">
                        {loading ? (
                            <>
                                <FaSpinner className="icon spin me-2" /> Changing...
                            </>
                        ) : (
                            <>
                                <FaKey className='me-2' />Change Password
                            </>
                        )}
                    </button>
                </div>
            </form>
        <ToastContainer/>
        </div>
    )
}

export default ChangePassword
