    import React from 'react';
    import { FiPieChart, FiBell, FiSmartphone, FiShield, FiTrendingUp, FiUsers } from "react-icons/fi";
    import { useNavigate } from 'react-router-dom';
    import '../assets/css/home.css'

    const AnimatedGraph = () => {
        return (
            <div className="animated-graph-container">
                <svg className="animated-graph" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                    {/* Background */}
                <rect width="400" height="300" fill="#f8fafc" rx="12"/>
                
                {/* Title */}
                <text x="200" y="30" textAnchor="middle" className="graph-title">
                    Monthly Expense Trends
                </text>
                <text x="200" y="50" textAnchor="middle" className="graph-subtitle">
                    Cost Savings & Budget Optimization
                </text>
                    
                    {/* Grid lines */}
                    <defs>
                        <pattern id="grid" width="40" height="30" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 30" fill="none" stroke="#e2e8f0" strokeWidth="1" opacity="0.3"/>
                        </pattern>
                    </defs>
                    <rect width="400" height="300" fill="url(#grid)" />
                    
                    {/* Zigzag animated line path */}
                    <path
                        d="M 50 200 L 100 150 L 150 180 L 200 120 L 250 140 L 300 90 L 350 110"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray="400"
                        strokeDashoffset="400"
                    >
                        <animate
                            attributeName="stroke-dashoffset"
                            values="400;0;400"
                            dur="4s"
                            repeatCount="indefinite"
                        />
                    </path>
                    
                    {/* Gradient fill under the zigzag line */}
                    <defs>
                        <linearGradient id="fillGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05"/>
                        </linearGradient>
                    </defs>
                    
                    <path
                        d="M 50 200 L 100 150 L 150 180 L 200 120 L 250 140 L 300 90 L 350 110 L 350 250 L 50 250 Z"
                        fill="url(#fillGradient)"
                        opacity="0"
                    >
                        <animate
                            attributeName="opacity"
                            values="0;0.7;0"
                            dur="4s"
                            repeatCount="indefinite"
                            begin="1s"
                        />
                    </path>
    
                    {/* Animated data points */}
                    <g className="data-points">
                        {[
                            { x: 50, y: 200, delay: "0s" },
                            { x: 100, y: 150, delay: "0.5s" },
                            { x: 150, y: 180, delay: "1s" },
                            { x: 200, y: 120, delay: "1.5s" },
                            { x: 250, y: 140, delay: "2s" },
                            { x: 300, y: 90, delay: "2.5s" },
                            { x: 350, y: 110, delay: "3s" }
                        ].map((point, index) => (
                            <circle
                                key={index}
                                cx={point.x}
                                cy={point.y}
                                r="0"
                                fill="#3b82f6"
                                stroke="#ffffff"
                                strokeWidth="2"
                            >
                                <animate
                                    attributeName="r"
                                    values="0;6;0"
                                    dur="4s"
                                    repeatCount="indefinite"
                                    begin={point.delay}
                                />
                            </circle>
                        ))}
                    </g>
    
                    {/* Animated arrows along the path */}
                    <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                                refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
                        </marker>
                    </defs>
                    
                    {/* Multiple arrows that appear along the path */}
                    <g className="animated-arrows">
                        {[
                            { x: 75, y: 175, delay: "0.5s", rotation: -35 },
                            { x: 125, y: 165, delay: "1s", rotation: 25 },
                            { x: 175, y: 150, delay: "1.5s", rotation: -45 },
                            { x: 225, y: 130, delay: "2s", rotation: 15 },
                            { x: 275, y: 115, delay: "2.5s", rotation: -30 },
                            { x: 325, y: 100, delay: "3s", rotation: 20 }
                        ].map((arrow, index) => (
                            <g key={index} transform={`translate(${arrow.x}, ${arrow.y}) rotate(${arrow.rotation})`}>
                                <path
                                    d="M 0 0 L 8 0 M 4 -3 L 8 0 L 4 3"
                                    stroke="#3b82f6"
                                    strokeWidth="2"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    opacity="0"
                                >
                                    <animate
                                        attributeName="opacity"
                                        values="0;1;0"
                                        dur="4s"
                                        repeatCount="indefinite"
                                        begin={arrow.delay}
                                    />
                                </path>
                            </g>
                        ))}
                    </g>
    
                    {/* Floating particles for extra visual appeal */}
                    <g className="floating-particles">
                        {[
                            { x: 80, y: 130, delay: "0s" },
                            { x: 180, y: 100, delay: "1s" },
                            { x: 280, y: 70, delay: "2s" },
                            { x: 120, y: 160, delay: "0.5s" },
                            { x: 220, y: 110, delay: "1.5s" }
                        ].map((particle, index) => (
                            <circle
                                key={index}
                                cx={particle.x}
                                cy={particle.y}
                                r="2"
                                fill="#3b82f6"
                                opacity="0"
                            >
                                <animate
                                    attributeName="opacity"
                                    values="0;0.6;0"
                                    dur="3s"
                                    repeatCount="indefinite"
                                    begin={particle.delay}
                                />
                                <animateTransform
                                    attributeName="transform"
                                    type="translate"
                                    values="0,0; 0,-10; 0,0"
                                    dur="3s"
                                    repeatCount="indefinite"
                                    begin={particle.delay}
                                />
                            </circle>
                        ))}
                    </g>
                </svg>
            </div>
        );
    };

    const Home = () => {
        const navigate = useNavigate();
        const handleClick = (e) => {
            navigate('/login');
        };

        const userId = localStorage.getItem('userId');
        const handleDashClick = (e) => {
            navigate('/dashboard');
        };

        return (
            <div>
                {userId ? (
                    <>
                        <div className="hero-section">
                            <div className="hero-content">
                                <h1>Smart expense management for efficient teams</h1>
                                <p className='lead'>
                                    TrakX empowers finance teams to control employee spending,
                                    ensure local compliance, and increase efficiency by 3x.
                                </p>
                                <div className="button-group">
                                    <button className="cta-button" onClick={handleDashClick}>Go To Dashboard</button>
                                </div>
                            </div>
                            <AnimatedGraph />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="hero-section">
                            <div className="hero-content">
                                <h1>Smart expense management for efficient teams</h1>
                                <p className="subtitle">
                                    TrakX empowers finance teams to control employee spending,
                                    ensure local compliance, and increase efficiency by 3x.
                                </p>
                                <div className="button-group">
                                    <button className="cta-button" onClick={handleClick}>Get Started</button>
                                </div>
                            </div>
                            <AnimatedGraph />
                        </div>
                    </>
                )}

                {/* Features Section */}
                <div className="features-section">
                    <div className="feature-card">
                        <FiPieChart className="feature-icon" />
                        <h3>Real-time Analytics</h3>
                        <p>Get instant insights into spending patterns and budget utilization across all departments</p>
                    </div>

                    <div className="feature-card">
                        <FiShield className="feature-icon" />
                        <h3>Compliance Control</h3>
                        <p>Ensure adherence to local regulations and company policies with automated checks</p>
                    </div>

                    <div className="feature-card">
                        <FiTrendingUp className="feature-icon" />
                        <h3>3x Efficiency Boost</h3>
                        <p>Reduce manual processing time and eliminate expense reporting bottlenecks</p>
                    </div>

                    <div className="feature-card">
                        <FiBell className="feature-icon" />
                        <h3>Smart Notifications</h3>
                        <p>Get alerts for budget overruns, policy violations, and approval requirements</p>
                    </div>

                    <div className="feature-card">
                        <FiUsers className="feature-icon" />
                        <h3>Team Collaboration</h3>
                        <p>Enable seamless approval workflows and expense sharing across teams</p>
                    </div>

                    <div className="feature-card">
                        <FiSmartphone className="feature-icon" />
                        <h3>Mobile Access</h3>
                        <p>Submit and approve expenses on the go with our mobile-first design</p>
                    </div>
                </div>
            </div>
        );
    };

    export default Home;