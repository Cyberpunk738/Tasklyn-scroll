import React, { useEffect, useState } from 'react';
import './Docs.css';
import { Link } from 'react-router-dom';

const Docs = () => {
    const [activeSection, setActiveSection] = useState('introduction');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.3, rootMargin: "-20% 0px -60% 0px" }
        );

        const sections = document.querySelectorAll('.docs-section');
        sections.forEach((section) => observer.observe(section));

        return () => sections.forEach((section) => observer.unobserve(section));
    }, []);

    const scrollToSection = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 100, // Offset for fixed navbar
                behavior: 'smooth'
            });
            setActiveSection(id);
        }
    };

    return (
        <div className="docs-container">
            <div className="docs-layout">
                {/* Sidebar Navigation */}
                <aside className="docs-sidebar">
                    <div className="docs-nav-title">General</div>
                    <ul className="docs-nav-list">
                        <li className="docs-nav-item">
                            <a href="#introduction"
                                className={`docs-nav-link ${activeSection === 'introduction' ? 'active' : ''}`}
                                onClick={(e) => scrollToSection(e, 'introduction')}>
                                Introduction
                            </a>
                        </li>
                        <li className="docs-nav-item">
                            <a href="#vision"
                                className={`docs-nav-link ${activeSection === 'vision' ? 'active' : ''}`}
                                onClick={(e) => scrollToSection(e, 'vision')}>
                                Vision
                            </a>
                        </li>
                        <li className="docs-nav-item">
                            <a href="#getting-started"
                                className={`docs-nav-link ${activeSection === 'getting-started' ? 'active' : ''}`}
                                onClick={(e) => scrollToSection(e, 'getting-started')}>
                                Getting Started
                            </a>
                        </li>
                    </ul>

                    <div className="docs-nav-title">Marketplace</div>
                    <ul className="docs-nav-list">
                        <li className="docs-nav-item">
                            <a href="#finding-talent"
                                className={`docs-nav-link ${activeSection === 'finding-talent' ? 'active' : ''}`}
                                onClick={(e) => scrollToSection(e, 'finding-talent')}>
                                Finding Talent
                            </a>
                        </li>
                        <li className="docs-nav-item">
                            <a href="#finding-work"
                                className={`docs-nav-link ${activeSection === 'finding-work' ? 'active' : ''}`}
                                onClick={(e) => scrollToSection(e, 'finding-work')}>
                                Finding Work
                            </a>
                        </li>
                        <li className="docs-nav-item">
                            <a href="#escrow"
                                className={`docs-nav-link ${activeSection === 'escrow' ? 'active' : ''}`}
                                onClick={(e) => scrollToSection(e, 'escrow')}>
                                Secure Escrow
                            </a>
                        </li>
                    </ul>

                    <div className="docs-nav-title">Features</div>
                    <ul className="docs-nav-list">
                        <li className="docs-nav-item">
                            <a href="#invoice-maker"
                                className={`docs-nav-link ${activeSection === 'invoice-maker' ? 'active' : ''}`}
                                onClick={(e) => scrollToSection(e, 'invoice-maker')}>
                                Crypto Invoicing
                            </a>
                        </li>
                        <li className="docs-nav-item">
                            <a href="#nft-reputation"
                                className={`docs-nav-link ${activeSection === 'nft-reputation' ? 'active' : ''}`}
                                onClick={(e) => scrollToSection(e, 'nft-reputation')}>
                                NFT Reputation
                            </a>
                        </li>
                    </ul>
                </aside>

                {/* Main Content */}
                <main className="docs-content">
                    <div className="docs-header">
                        <h1>Documentation</h1>
                        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
                            The definitive guide to the Tasklyn Decentralized Workforce Platform on Scroll.
                        </p>
                    </div>

                    <section id="introduction" className="docs-section">
                        <h2>Introduction</h2>
                        <p>
                            <strong>Tasklyn</strong> represents the next evolution of the gig economy. Unlike traditional Web2 platforms
                            that act as rent-seeking intermediaries, Tasklyn is a <strong>decentralized protocol</strong> built on the
                            Scroll Network (Layer 2) that connects clients and freelancers directly via smart contracts.
                        </p>
                        <p>
                            By leveraging blockchain technology, we eliminate the 20% fees charged by platforms like Upwork and Fiverr,
                            remove arbitrary account bans, and ensure that payments are settled instantly upon work approval.
                        </p>
                    </section>

                    <section id="vision" className="docs-section">
                        <h2>The Tasklyn Vision</h2>
                        <h3>The Problem</h3>
                        <p>
                            Today's freelance market is dominated by centralized giants. Freelancers lose a massive chunk of their
                            earnings to fees, wait weeks for payments to "clear," and live in fear of losing their reputation data
                            if the platform bans them.
                        </p>

                        <h3>The Solution</h3>
                        <p>
                            Tasklyn solves these core issues through three pillars:
                        </p>
                        <ul>
                            <li><strong>Zero Fees:</strong> We don't take a cut. If a job is 1 ETH, the freelancer gets 1 ETH.</li>
                            <li><strong>Trustless Escrow:</strong> Funds are locked in a smart contract before work starts. Both parties are protected by code, not a support ticket.</li>
                            <li><strong>Sovereign Identity:</strong> Your reputation is minted as NFTs. It belongs to your wallet, and you can take it anywhere.</li>
                        </ul>
                    </section>

                    <section id="getting-started" className="docs-section">
                        <h2>Getting Started</h2>
                        <div className="step-card">
                            <h3><span className="step-number">1</span> Connect Your Wallet</h3>
                            <p>
                                Click the "Connect Wallet" button in the top right. Tasklyn supports MetaMask.
                                The app will automatically prompt you to switch to the <strong>Scroll Sepolia Testnet</strong>.
                                You will need some testnet ETH to pay for gas (transaction fees), which are negligible on Scroll.
                            </p>
                        </div>
                        <div className="step-card">
                            <h3><span className="step-number">2</span> Choose Your Role</h3>
                            <p>
                                Use the toggle switch in the navbar to switch between <strong>Selling Mode</strong> (for Freelancers)
                                and <strong>Buying Mode</strong> (for Clients). You can be both with the same account!
                            </p>
                        </div>
                    </section>

                    <section id="invoice-maker" className="docs-section">
                        <div className="feature-highlight">
                            <h2 style={{ color: 'var(--primary-color)', marginTop: 0 }}>
                                <i className="fa-solid fa-bolt"></i> Instant Crypto Invoice Maker
                            </h2>
                            <p style={{ fontSize: '1.1rem', color: 'white' }}>
                                A powerful tool for freelancers to get paid by <em>any</em> client, even outside the marketplace.
                            </p>

                            <h3>Why use this?</h3>
                            <p>
                                Even if you find clients on Discord, Twitter, or email, you can use Tasklyn to handle the payment.
                                It looks professional, provides a receipt, and settles on-chain.
                            </p>

                            <h3>How it Works</h3>
                            <ol style={{ marginTop: '1.5rem' }}>
                                <li>
                                    <strong>Create Invoice:</strong> Switch to Selling Mode and click <Link to="/invoice" style={{ color: 'var(--primary-color)' }}>Create Invoice</Link>.
                                    Enter the amount (ETH/USDC) and details.
                                </li>
                                <li>
                                    <strong>Share Link:</strong> Copy the generated "Stateful Link". This link contains all the invoice data securely encoded within it.
                                </li>
                                <li>
                                    <strong>Get Paid:</strong> Send the link to your client (Telegram, Email, Discord).
                                </li>
                                <li>
                                    <strong>Instant Settlement:</strong> The client opens the link, clicks "Pay on Scroll", and funds are sent directly to your wallet.
                                    A professional receipt is generated instantly.
                                </li>
                            </ol>
                        </div>
                    </section>

                    <section id="finding-talent" className="docs-section">
                        <h2>Finding Talent</h2>
                        <p>
                            Clients can browse Gigs posted by verified freelancers.
                            Use the <strong>Find Talent</strong> page to search by category (Development, Design, Marketing).
                            Once you find a gig, you can place an order which locks your payment in a smart contract escrow until the work is delivered.
                        </p>
                    </section>

                    <section id="finding-work" className="docs-section">
                        <h2>Finding Work</h2>
                        <p>
                            Freelancers can browse the <strong>Find Work</strong> page (visible in Selling Mode) to see open jobs posted by clients.
                            You can place a bid on any job detailing your price and delivery time. If the client accepts, you are hired!
                        </p>
                    </section>

                    <section id="escrow" className="docs-section">
                        <h2>Secure Escrow</h2>
                        <p>
                            All marketplace transactions are protected by Smart Contracts.
                        </p>
                        <ul>
                            <li><strong>Deposited:</strong> Funds are locked when an offer is accepted.</li>
                            <li><strong>In Progress:</strong> Freelancer works on the task.</li>
                            <li><strong>Released:</strong> Client approves the work, and funds move instantly to the freelancer.</li>
                        </ul>
                    </section>

                    <section id="nft-reputation" className="docs-section">
                        <h2>NFT Reputation</h2>
                        <p>
                            When you successfully complete a job and receive payment, the smart contract mints a unique <strong>Job Completion NFT</strong> to your wallet.
                            This serves as verifiable proof of your skill and reliability. Future employers can audit your wallet to see your true track record.
                        </p>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default Docs;
