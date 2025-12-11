import React from 'react';
import { FaCube, FaCheck, FaBolt } from 'react-icons/fa';
import './Blockchain.css';

const Blockchain = () => {
    return (
        <section id="blockchain" className="blockchain">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Built on Mantle Network</h2>
                    <p className="section-subtitle">Leveraging modular blockchain architecture for hyper-scalability and security</p>
                </div>

                <div className="blockchain-cards" style={{ gridTemplateColumns: '1fr', maxWidth: '600px', margin: '0 auto' }}>
                    <div className="blockchain-card base">
                        <div className="chain-header">
                            <div className="chain-logo">
                                <FaCube />
                            </div>
                            <h3>Mantle Network</h3>
                            <span className="chain-tag">Modular L2</span>
                        </div>
                        <ul className="chain-features">
                            <li><FaCheck /> Hyper-scalable performance</li>
                            <li><FaCheck /> Ethereum-grade security</li>
                            <li><FaCheck /> Low gas fees with EigenDA</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Blockchain;
