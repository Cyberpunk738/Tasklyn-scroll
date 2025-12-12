import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWeb3 } from '../../context/Web3Context';
import './Navbar.css';
import logo from '../../assets/task.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSelling, setIsSelling] = useState(false);
    const { account, connectWallet, disconnectWallet } = useWeb3();
    const location = useLocation();

    useEffect(() => {
        const storedMode = localStorage.getItem('tasklyn_mode');
        if (storedMode === 'selling') {
            setIsSelling(true);
        }
    }, []);

    const toggleMode = () => {
        const newMode = !isSelling;
        setIsSelling(newMode);
        localStorage.setItem('tasklyn_mode', newMode ? 'selling' : 'buying');
        window.location.reload(); // Simple reload to refresh views for now
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const shortAddress = account ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}` : '';

    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link to="/" className="nav-logo">
                    <img src={logo} alt="Tasklyn Logo" className="logo-img" />
                </Link>

                <div className={`nav-menu ${isOpen ? 'show' : ''}`} id="nav-menu">
                    <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>Home</Link>

                    {/* BUYING MODE (Client) */}
                    {!isSelling && (
                        <>
                            <Link to="/gigs" className="nav-link mode-buy" onClick={() => setIsOpen(false)}>Find Talent</Link>
                            <Link to="/create-job" className="nav-link mode-buy" onClick={() => setIsOpen(false)}>Post Job</Link>
                        </>
                    )}

                    {/* SELLING MODE (Freelancer) */}
                    {isSelling && (
                        <>
                            <Link to="/jobs" className="nav-link mode-sell" onClick={() => setIsOpen(false)}>Find Work</Link>
                            <Link to="/create-gig" className="nav-link mode-sell" onClick={() => setIsOpen(false)}>Create Gig</Link>
                            <Link to="/invoice" className="nav-link mode-sell" onClick={() => setIsOpen(false)}>Create Invoice</Link>
                        </>
                    )}

                    <Link to="/dashboard" className="nav-link" onClick={() => setIsOpen(false)}>Dashboard</Link>
                    <Link to="/docs" className="nav-link" onClick={() => setIsOpen(false)}>Docs</Link>
                </div>

                <div className="nav-actions">
                    <button className="mode-switch" onClick={toggleMode} style={{ color: isSelling ? 'var(--success-color)' : 'var(--primary)' }}>
                        {isSelling ? 'Switch to Buying' : 'Switch to Selling'}
                    </button>

                    {account ? (
                        <button className="connect-wallet-btn" onClick={disconnectWallet}>
                            <i className="fa-solid fa-user" style={{ marginRight: '8px' }}></i>
                            {shortAddress}
                        </button>
                    ) : (
                        <button className="connect-wallet-btn" onClick={connectWallet}>Connect Wallet</button>
                    )}

                    <div className={`nav-toggle ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
