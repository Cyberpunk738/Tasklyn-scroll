import React from 'react';
import './Features.css';

const Features = () => {
    return (
        <section id="features" className="features">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Powered by Web3 Innovation</h2>
                    <p className="section-subtitle">Experience the next generation of job platforms with blockchain technology</p>
                </div>

                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">
                            <i className="fa-solid fa-shield-halved"></i>
                        </div>
                        <h3>Smart Contract Escrow</h3>
                        <p>Automated payment release upon milestone completion with immutable smart contracts</p>
                        <div className="feature-badge">Scroll Network</div>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            <i className="fa-solid fa-network-wired"></i>
                        </div>
                        <h3>Cross-Chain Integration</h3>
                        <p>Seamlessly work across multiple blockchains with unified interface</p>
                        <div className="feature-badge">Layer 2</div>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            <i className="fa-solid fa-chart-line"></i>
                        </div>
                        <h3>Reputation System</h3>
                        <p>On-chain reputation tracking ensures quality and trust in the ecosystem</p>
                        <div className="feature-badge">Trustless</div>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            <i className="fa-solid fa-coins"></i>
                        </div>
                        <h3>Stablecoin Payments</h3>
                        <p>Receive payments in USDC, USDT, and other stablecoins for price stability</p>
                        <div className="feature-badge">Stable</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
