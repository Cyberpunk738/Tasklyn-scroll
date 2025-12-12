import React from 'react';
import './HowItWorks.css';

const HowItWorks = () => {
    return (
        <section id="how-it-works" className="how-it-works">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">How Tasklyn Works</h2>
                    <p className="section-subtitle">Simple, secure, and efficient workflow powered by blockchain</p>
                </div>

                <div className="workflow">
                    <div className="workflow-step">
                        <div className="step-number">01</div>
                        <div className="step-icon">
                            <i className="fa-solid fa-user-plus"></i>
                        </div>
                        <h3>Connect Wallet</h3>
                        <p>Connect your Web3 wallet to access the platform</p>
                    </div>

                    <div className="workflow-arrow">
                        <i className="fa-solid fa-arrow-right"></i>
                    </div>

                    <div className="workflow-step">
                        <div className="step-number">02</div>
                        <div className="step-icon">
                            <i className="fa-solid fa-search"></i>
                        </div>
                        <h3>Find Opportunities</h3>
                        <p>Browse jobs or post new opportunities</p>
                    </div>

                    <div className="workflow-arrow">
                        <i className="fa-solid fa-arrow-right"></i>
                    </div>

                    <div className="workflow-step">
                        <div className="step-number">03</div>
                        <div className="step-icon">
                            <i className="fa-solid fa-handshake"></i>
                        </div>
                        <h3>Agree & Execute</h3>
                        <p>Set milestones and start working</p>
                    </div>

                    <div className="workflow-arrow">
                        <i className="fa-solid fa-arrow-right"></i>
                    </div>

                    <div className="workflow-step">
                        <div className="step-number">04</div>
                        <div className="step-icon">
                            <i className="fa-solid fa-circle-check"></i>
                        </div>
                        <h3>Get Paid</h3>
                        <p>Automatic payment release upon completion</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
