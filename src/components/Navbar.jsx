import React from 'react'
import { FaHome, FaUser, FaUserPlus, FaWallet, FaFileAlt } from 'react-icons/fa'
import { MdDashboard } from "react-icons/md";
import { GiExpense } from "react-icons/gi";
import { IoMdAdd, IoMdLogOut } from "react-icons/io";
import { TbPasswordUser } from "react-icons/tb";
import { Link, useNavigate } from 'react-router-dom'
import '../assets/css/navbar.css'

const Navbar = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName') || "User";

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        navigate('/login');
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#1e293b' }}>
            <div className="container">
                <div className="d-flex align-items-center">
                    <FaWallet className="me-2" style={{ color: '#3b82f6' }} />
                    <Link
                        className="navbar-brand"
                        to="/"
                        style={{
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: 600,
                            fontSize: 30,
                            textDecoration: 'none'
                        }}
                    >
                        TrakX
                    </Link>
                </div>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <ul className="navbar-nav ms-auto m-2 ">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/" style={{}}>
                                <FaHome className='me-1' /> Home
                            </Link>
                        </li>

                        {userId ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/dashboard">
                                        <MdDashboard className='me-1' /> Dashboard
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/add-expense">
                                        <IoMdAdd className='me-1' /> Add Expense
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/manage-expense">
                                        <GiExpense className='me-1' /> Manage Expense
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/expense-report">
                                        <FaFileAlt className='me-1' /> Expense Report
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/change-password">
                                        <TbPasswordUser className='me-1' /> Change Password
                                    </Link>
                                </li>

                                {/* Dropdown with Username */}
                                <li className="nav-item dropdown">
                                    <Link
                                        className="nav-link dropdown-toggle"
                                        href="#"
                                        id="userDropdown"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                        style={{ color: '#3b82f6' }}
                                    >
                                        {userName}
                                    </Link>
                                    <ul
                                        className="dropdown-menu dropdown-menu-end bg-dark"
                                        aria-labelledby="userDropdown"
                                    >
                                        <li>
                                            <button
                                                className="dropdown-item text-danger"onClick={handleLogout}>
                                                <IoMdLogOut className="me-2" /> Logout
                                            </button>
                                        </li>
                                    </ul>
                                </li>

                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/signup">
                                        <FaUserPlus className='me-1' /> Signup
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/login">
                                        <FaUser className='me-1' /> Login
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
