import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const counters = document.querySelectorAll('.stat-number[data-target]');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const suffix = counter.getAttribute('data-suffix') || '';
            const duration = 1500;
            const stepTime = Math.abs(Math.floor(duration / (target || 1))); // prevent div by zero
            let current = 0;
            const timer = setInterval(() => {
                current += 1;
                counter.innerText = current + suffix;
                if (current >= target) {
                    clearInterval(timer);
                    counter.innerText = target + suffix; // ensure exact final value
                }
            }, stepTime);
            return () => clearInterval(timer);
        });
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
                        <i className="fa-solid fa-link"></i>
                        Scroll Network
                    </div>

                    <h1 className="hero-title">
                        The Future of Work is
                        <span className="gradient-text"> Decentralized</span>
                    </h1>

                    <p className="hero-subtitle">
                        Tasklyn revolutionizes job markets on the Scroll Network with smart contracts,
                        secure escrow, and seamless collaboration.
                    </p>

                    <div className="hero-stats">
                        <div className="stat-item">
                            <span className="stat-number" data-target="1">0</span>
                            <span className="stat-label">Blockchains</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">∞</span>
                            <span className="stat-label">Possibilities</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number" data-target="100" data-suffix="%">0</span>
                            <span className="stat-label">Secure</span>
                        </div>
                    </div>

                    <div className="hero-actions">
                        <button onClick={() => navigate('/gigs')} className="btn btn-primary btn-large">
                            <i className="fa-solid fa-rocket"></i>
                            Explore Gigs
                        </button>
                        <button onClick={() => navigate('/signup')} className="btn btn-outline btn-large">
                            <i className="fa-solid fa-user-plus"></i>
                            Join Now
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
