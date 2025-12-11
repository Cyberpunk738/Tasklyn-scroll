import React from 'react';
import { FaTwitter, FaDiscord, FaGithub, FaTelegram } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <div className="logo-section">
                            <img src="/task.png" alt="Tasklyn" className="footer-logo" />
                            <span className="logo-text">Tasklyn</span>
                        </div>
                        <p>Building the future of decentralized work with secure, transparent, and efficient blockchain technology.</p>
                        <div className="social-links">
                            <a href="#" className="social-link" aria-label="Twitter"><FaTwitter /></a>
                            <a href="#" className="social-link" aria-label="Discord"><FaDiscord /></a>
                            <a href="#" className="social-link" aria-label="GitHub"><FaGithub /></a>
                            <a href="#" className="social-link" aria-label="Telegram"><FaTelegram /></a>
                        </div>
                    </div>

                    <div className="footer-links">
                        <div className="footer-column">
                            <h4>Platform</h4>
                            <a href="#features">Features</a>
                            <a href="#how-it-works">How it Works</a>
                            <a href="#blockchain">Blockchain</a>
                            <a href="#">Security</a>
                            <a href="#">API</a>
                        </div>

                        <div className="footer-column">
                            <h4>Company</h4>
                            <a href="#">About Us</a>
                            <a href="#">Blog</a>
                            <a href="#">Careers</a>
                            <a href="#">Press</a>
                            <a href="#">Partners</a>
                        </div>

                        <div className="footer-column">
                            <h4>Support</h4>
                            <a href="#">Help Center</a>
                            <a href="#">Documentation</a>
                            <a href="#">Contact</a>
                            <a href="#">Status</a>
                            <a href="#">Community</a>
                        </div>

                        <div className="footer-column">
                            <h4>Legal</h4>
                            <a href="#">Privacy Policy</a>
                            <a href="#">Terms of Service</a>
                            <a href="#">Cookie Policy</a>
                            <a href="#">GDPR</a>
                            <a href="#">Security</a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2025 Tasklyn. All rights reserved.</p>
                    <div className="footer-bottom-links">
                        <span>Built with love for the Web3 community</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
