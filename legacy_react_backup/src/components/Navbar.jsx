import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import './Navbar.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar" style={{
            background: isScrolled ? 'rgba(10, 10, 10, 0.95)' : 'rgba(10, 10, 10, 0.8)',
            backdropFilter: 'blur(20px)'
        }}>
            <div className="nav-container">
                <div className="nav-logo">
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'white' }}>
                        <img src="/task.png" alt="Tasklyn Logo" className="logo-img" />
                    </Link>
                </div>

                <div className={`nav-menu ${isMenuOpen ? 'show' : ''}`} id="nav-menu">
                    <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    <Link to="/jobs" className="nav-link" onClick={() => setIsMenuOpen(false)}>Find Jobs</Link>
                    <Link to="/create-job" className="nav-link" onClick={() => setIsMenuOpen(false)}>Post Job</Link>
                    <Link to="/dashboard" className="nav-link" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                </div>

                <div className="nav-actions">
                    <ConnectButton />
                </div>

                <div className={`nav-toggle ${isMenuOpen ? 'active' : ''}`} id="nav-toggle" onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
