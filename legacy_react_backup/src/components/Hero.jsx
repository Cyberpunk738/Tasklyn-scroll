import React, { useEffect, useState } from 'react';
import { FaLink, FaRocket, FaPlay, FaCube, FaExchangeAlt, FaBolt } from 'react-icons/fa';
import './Hero.css';

const Hero = () => {
    const [stats, setStats] = useState({
        blockchains: 0,
        possibilities: '∞',
        secure: 0
    });

    useEffect(() => {
        // Animate stats
        const animateValue = (key, end, duration, suffix = '') => {
            let start = 0;
            const stepTime = Math.abs(Math.floor(duration / end));
            const timer = setInterval(() => {
                start += 1;
                setStats(prev => ({ ...prev, [key]: start + suffix }));
                if (start >= end) {
                    clearInterval(timer);
                    setStats(prev => ({ ...prev, [key]: end + suffix }));
                }
            }, stepTime);
        };

        animateValue('blockchains', 1, 1000);
        animateValue('secure', 100, 1500, '%');
    }, []);

    return (
        <section className="hero" id="hero">
            <div className="hero-background">
                <div className="hero-grid"></div>
                <div className="hero-glow"></div>
            </div>

            <div className="hero-container">
                <div className="hero-content">
                    <div className="hero-badge">
                        <FaLink />
                        Multi-Chain Platform
                    </div>

                    <h1 className="hero-title">
                        The Future of Work is
                        <span className="gradient-text"> Decentralized</span>
                    </h1>

                    <p className="hero-subtitle">
                        Tasklyn revolutionizes job markets on the Mantle Network with smart contracts,
                        secure escrow, and seamless collaboration.
                    </p>

                    <div className="hero-stats">
                        <div className="stat-item">
                            <span className="stat-number">{stats.blockchains}</span>
                            <span className="stat-label">Blockchains</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">∞</span>
                            <span className="stat-label">Possibilities</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">{stats.secure}</span>
                            <span className="stat-label">Secure</span>
                        </div>
                    </div>

                    <div className="hero-actions">
                        <button onClick={() => window.location.href = '#cta'} className="btn btn-primary btn-large">
                            <FaRocket />
                            Join Waitlist
                        </button>
                        <button className="btn btn-outline btn-large">
                            <FaPlay />
                            Watch Demo
                        </button>
                    </div>
                </div>

                <div className="hero-visual">
                    <div className="blockchain-visual">
                        <div className="chain-item base">
                            <FaCube />
                            <span>Mantle</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
