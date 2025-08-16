import React, {useState} from 'react';
import { FaUserPlus, FaUser, FaLock, FaSpinner } from 'react-icons/fa';
import { IoIosMail } from "react-icons/io";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import signupImage from '../assets/images/signup.png';
import '../assets/css/signup.css'; // Import the CSS file
import {useNavigate, Link} from 'react-router-dom'

const Signup = () => {
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const [formData, setformData] = useState({
        Fullname : '',
        Email : '',
        Password : '',
    });

    const handleChange = (e) => {
        setformData({...formData,[e.target.name]:e.target.value})
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);
        try{
            const response=await fetch("https://daily-expense-tracker-2i0e.onrender.com/api/signup/",{
                method : 'POST',
                header: {'Content-Type': 'application/json'},
                body : JSON.stringify(formData)
            });
            if (response.status===201){
                toast.success('Signup Successful Please Login..');
                setTimeout(()=>{
                    navigate('/login')
                },2000);
            }
            else{
                const data = await response.json();
                toast.error(data.message)
            } 
        }
        catch (error){
            console.error('Error :', error)
            toast.error('Something Went Wrong')
        }
    };
    return (
        <div className="signup-container">
            <div className="signup-content">
                <div className="signup-image-container">
                    <img src={signupImage} alt="Signup illustration" className="signup-image" />
                </div>
                
                <div className="signup-form-container">
                    <div className="signup-header">
                        <h2 className="signup-title">
                            <FaUserPlus className="icon" /> Signup
                        </h2>
                        <p className="signup-subtitle">Create Your Account for tracking Expenses</p>
                    </div>
                    
                    <form className="signup-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Fullname</label>
                            <div className="input-group">
                                <span className="input-group-text"><FaUser /></span>
                                <input
                                    type="text" value={formData.Fullname}
                                    className="form-control"
                                    required
                                    placeholder="Enter your fullname"
                                    name="Fullname" onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <div className="input-group">
                                <span className="input-group-text"><IoIosMail /></span>
                                <input
                                    type="email" value={formData.Email}
                                    className="form-control"
                                    required
                                    placeholder="Enter your email"
                                    name="Email" onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <div className="input-group">
                                <span className="input-group-text"><FaLock /></span>
                                <input
                                    type="password" value={formData.Password}
                                    className="form-control"
                                    required
                                    placeholder="Enter your password"
                                    name="Password" onChange={handleChange}
                                />
                            </div>
                        </div>

                        <button className="signup-button" type="submit" disabled={loading}>
                            {loading ? (<span><FaSpinner className="icon spin" /> Signing Up...</span>) : (<span><FaUserPlus className="icon" /> Sign Up</span>)}
                        </button>
                        <div className="signup-footer">
                            Already have an account? <Link to="/login">Login</Link>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Signup;