import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function CompanyStats() {
    const { user } = useAuth();
    return (
        <section className="company-stats-root w-full bg-white dark:bg-[#0a0a0a] flex justify-center items-center transition-colors duration-500 overflow-hidden">
            <style>{`
        .company-stats-container {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: 120px 72px 60px;
            gap: 86px;
            width: 100%;
            max-width: 1440px;
            margin: 0 auto;
        }

        .top-row {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 0px;
            gap: 86px;
            width: 100%;
        }

        .stats-img {
            width: 550px;
            height: 514px;
            background: url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop') no-repeat center center;
            background-size: cover;
            border-radius: 20px;
            flex-shrink: 0;
            box-shadow: 0 20px 40px -10px rgba(0,0,0,0.1);
        }

        .text-buttons-col {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: 0px;
            gap: 60px;
            flex: 1;
            max-width: 600px;
        }

        .text-group {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: 0px;
            gap: 40px;
            width: 100%;
        }

        .main-heading {
            width: 100%; 
            max-width: 531px;
            font-style: normal;
            font-weight: 700;
            font-size: 50px;
            line-height: 1.2;
        }

        .main-desc {
            width: 100%;
            max-width: 600px;
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 1.6;
        }

        .buttons-row {
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 0px;
            gap: 24px;
        }

        .btn-register {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            padding: 14px 20px;
            gap: 10px;
            width: 122px;
            height: 40px;
            background: #3b82f6;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            line-height: 19px;
            color: #FFFFFF;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 14px 0 rgba(59, 130, 246, 0.39);
        }
        .btn-register:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(59, 130, 246, 0.23);
            filter: brightness(1.1);
        }

        .btn-learn-more {
             font-weight: 600;
             font-size: 16px;
             line-height: 19px;
             text-decoration-line: underline;
             color: #3b82f6;
             background: none;
             border: none;
             cursor: pointer;
             transition: opacity 0.3s;
        }
        .btn-learn-more:hover {
            opacity: 0.8;
        }

        .counters-row {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;
            padding: 0px;
            gap: 24px;
            width: 100%;
            flex-wrap: wrap;
        }

        .counter-item {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: 0px;
            gap: 20px;
            width: 306px;
        }

        .counter-number {
             font-weight: 700;
             font-size: 40px;
             line-height: 48px;
             color: #3b82f6;
        }

        .counter-label {
             font-weight: 600;
             font-size: 24px;
             line-height: 29px;
        }

        .counter-desc {
             font-style: normal;
             font-weight: 400;
             font-size: 16px;
             line-height: 24px;
        }
        
        @media (max-width: 1024px) {
            .company-stats-container {
                padding: 60px 24px;
                gap: 60px;
            }
            .top-row {
                flex-direction: column;
                gap: 40px;
            }
            .stats-img {
                width: 100%;
                height: 300px;
            }
            .counters-row {
                flex-direction: column;
                gap: 60px;
                align-items: center;
            }
            .counter-item {
                width: 100%;
                text-align: center;
                align-items: center;
            }
        }
      `}</style>

            <div className="company-stats-container">

                {/* Top Row: Img + Text */}
                <div className="top-row">
                    {/* Img */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="stats-img"
                    />

                    {/* Text + Buttons */}
                    <div className="text-buttons-col">
                        <div className="text-group">
                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="main-heading text-slate-900 dark:text-white"
                            >
                                Your Future Starts With A Great Career
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="main-desc text-slate-600 dark:text-slate-400"
                            >
                                We've built the world's most trusted recruitment ecosystem. By connecting top-tier talent with industry leaders, we empower individuals to reach their full potential and companies to grow with the best teams.
                            </motion.p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="buttons-row"
                        >
                            <Link to={user ? "/dashboard" : "/auth?mode=signup"}>
                                <button className="btn-register" style={user ? { width: 'auto', padding: '14px 24px' } : {}}>
                                    {user ? "Go to Dashboard" : "Join Now"}
                                </button>
                            </Link>
                            <Link to="/jobs">
                                <button className="btn-learn-more">
                                    Explore Roles
                                </button>
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* Counter Row */}
                <div className="counters-row">
                    {/* Item 1 */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="counter-item"
                    >
                        <div className="counter-number">12k+</div>
                        <div className="counter-label text-slate-900 dark:text-white">Success Stories</div>
                        <p className="counter-desc text-slate-600 dark:text-slate-400">
                            Connecting ambitious professionals with global opportunities every single day through our smart matching technology.
                        </p>
                    </motion.div>

                    {/* Item 2 */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="counter-item"
                    >
                        <div className="counter-number">20k+</div>
                        <div className="counter-label text-slate-900 dark:text-white">Active Resumes</div>
                        <p className="counter-desc text-slate-600 dark:text-slate-400">
                            A diverse talent pool across technology, design, and management industries ready to make their next move.
                        </p>
                    </motion.div>

                    {/* Item 3 */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="counter-item"
                    >
                        <div className="counter-number">18k+</div>
                        <div className="counter-label text-slate-900 dark:text-white">Trusted Partners</div>
                        <p className="counter-desc text-slate-600 dark:text-slate-400">
                            From global tech giants to innovative startups, our partners rely on us to find their most critical hires.
                        </p>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
