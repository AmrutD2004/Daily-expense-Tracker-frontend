import React from 'react';
import { FiMail, FiPhone, FiMapPin, FiTwitter, FiLinkedin, FiGithub, FiFacebook } from 'react-icons/fi';
import '../assets/css/footer.css'
import { useNavigate,Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Brand Section */}
                <div className="footer-section">
                    <div className="footer-brand">
                        <h3 className="brand-name">TrakX</h3>
                        <p className="brand-tagline">
                            Smart expense management for efficient teams. 
                            Empowering finance teams with 3x efficiency boost.
                        </p>
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="footer-section">
                    <h4 className="footer-title">Product</h4>
                    <ul className="footer-nav">
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><Link to="/analytics">Analytics</Link></li>
                        <li><Link to="/reports">Reports</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4 className="footer-title">Company</h4>
                    <ul className="footer-nav">
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/careers">Careers</Link></li>
                        <li><Link to="/blog">Blog</Link></li>
                        <li><Link to="/press">Press</Link></li>
                        <li><Link to="/partners">Partners</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4 className="footer-title">Support</h4>
                    <ul className="footer-nav">
                        <li><Link to="/help">Help Center</Link></li>
                        <li><Link to="/documentation">Documentation</Link></li>
                        <li><Link to="/api">API Reference</Link></li>
                        <li><Link to="/contact">Contact Support</Link></li>
                        <li><Link to="/status">System Status</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4 className="footer-title">Legal</h4>
                    <ul className="footer-nav">
                        <li><Link to="/privacy">Privacy Policy</Link></li>
                        <li><Link to="/terms">Terms of Service</Link></li>
                        <li><Link to="/security">Security</Link></li>
                        <li><Link to="/compliance">Compliance</Link></li>
                        <li><Link to="/cookies">Cookie Policy</Link></li>
                    </ul>
                </div>

                {/* Contact Section */}
                <div className="footer-section">
                    <h4 className="footer-title">Contact</h4>
                    <div className="contact-info">
                        <div className="contact-item">
                            <FiMail className="contact-icon" />
                            <Link to="mailto:amrutdeshpande2004@gmail.com" className="contact-link">
                                amrutdeshpande2004@gmail.com
                            </Link>
                        </div>
                        <div className="contact-item">
                            <FiPhone className="contact-icon" />
                            <span className="contact-text">+1 (555) 123-4567</span>
                        </div>
                        <div className="contact-item">
                            <FiMapPin className="contact-icon" />
                            <span className="contact-text">Aurangabad, Maharashtra, IN</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="footer-bottom">
                <div className="footer-bottom-container">
                    <div className="footer-bottom-left">
                        <p className="copyright">
                            © 2025 TrakX. All rights reserved.
                        </p>
                    </div>
                    
                    <div className="footer-bottom-center">
                        <nav className="footer-bottom-nav">
                            <Link to="/privacy">Privacy</Link>
                            <Link to="/terms">Terms</Link>
                            <Link to="/cookies">Cookies</Link>
                            <Link to="/sitemap">Sitemap</Link>
                        </nav>
                    </div>

                    <div className="footer-bottom-right">
                        <div className="social-links">
                            <Link to="#" className="social-link" aria-label="Twitter">
                                <FiTwitter />
                            </Link>
                            <Link to="#" className="social-link" aria-label="LinkedIn">
                                <FiLinkedin />
                            </Link>
                            <Link to="#" className="social-link" aria-label="GitHub">
                                <FiGithub />
                            </Link>
                            <Link to="#" className="social-link" aria-label="Facebook">
                                <FiFacebook />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;