import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useWeb3 } from '../../context/Web3Context';
import './Login.css';
import Navbar from '../../components/Navbar/Navbar';

const Login = () => {
    const navigate = useNavigate();
    const { connectWallet } = useWeb3();

    const handleLogin = (e) => {
        e.preventDefault();
        // Mock login
        navigate('/dashboard');
    };

    const handleWalletLogin = async () => {
        try {
            const account = await connectWallet();
            if (account) navigate('/dashboard');
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <div className="login-page">
            <Navbar />

            <div className="auth-container">
                <div className="auth-card">
                    <div className="auth-header">
                        <h1 className="auth-title">Welcome Back</h1>
                        <p className="auth-subtitle">Login to access your dashboard</p>
                    </div>

                    <button className="wallet-btn" onClick={handleWalletLogin}>
                        <i className="fa-solid fa-wallet"></i>
                        Connect Wallet to Login
                    </button>

                    <div className="divider">OR CONTINUE WITH EMAIL</div>

                    <form className="auth-form" onSubmit={handleLogin}>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input type="email" className="form-input" placeholder="name@example.com" required />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-input" placeholder="••••••••" required />
                        </div>

                        <button type="submit" className="btn btn-primary btn-large" style={{ width: '100%', justifyContent: 'center' }}>
                            Login
                        </button>
                    </form>

                    <div className="switch-auth">
                        Don't have an account? <Link to="/signup">Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
