import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useWeb3 } from '../../context/Web3Context';
import '../Login/Login.css'; // Reusing Login CSS as they are identical
import Navbar from '../../components/Navbar/Navbar';

const Signup = () => {
    const navigate = useNavigate();
    const { connectWallet } = useWeb3();

    const handleSignup = (e) => {
        e.preventDefault();
        // Mock signup
        navigate('/dashboard');
    };

    const handleWalletSignup = async () => {
        try {
            const account = await connectWallet();
            if (account) navigate('/dashboard');
        } catch (error) {
            console.error("Signup failed", error);
        }
    };

    return (
        <div className="signup-page">
            <Navbar />

            <div className="auth-container">
                <div className="auth-card">
                    <div className="auth-header">
                        <h1 className="auth-title">Create Account</h1>
                        <p className="auth-subtitle">Join the decentralized workforce</p>
                    </div>

                    <button className="wallet-btn" onClick={handleWalletSignup}>
                        <i className="fa-solid fa-wallet"></i>
                        Sign Up with Wallet
                    </button>

                    <div className="divider">OR REGISTER WITH EMAIL</div>

                    <form className="auth-form" onSubmit={handleSignup}>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input type="text" className="form-input" placeholder="John Doe" required />
                        </div>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input type="email" className="form-input" placeholder="name@example.com" required />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-input" placeholder="••••••••" required />
                        </div>

                        <button type="submit" className="btn btn-primary btn-large" style={{ width: '100%', justifyContent: 'center' }}>
                            Create Account
                        </button>
                    </form>

                    <div className="switch-auth">
                        Already have an account? <Link to="/login">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
