import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWeb3 } from '../../context/Web3Context';
import { useStore } from '../../context/StoreContext';
import Navbar from '../../components/Navbar/Navbar';
import './Dashboard.css';

const Dashboard = () => {
    const { account } = useWeb3();
    const { jobs, gigs, submitWork, releasePayment } = useStore();
    const navigate = useNavigate();
    const [viewMode, setViewMode] = useState('client'); // 'client' or 'freelancer'

    // Redirect if not logged in
    useEffect(() => {
        if (!account) {
            // Give a small delay to check if loading? 
            // Actually account null means not connected. User might be on dashboard by URL.
            // We should show a "Please connect" message or redirect.
            // For now, render a message.
        }
    }, [account]);

    if (!account) {
        return (
            <div>
                <Navbar />
                <div className="container dashboard-container" style={{ textAlign: 'center' }}>
                    <h2>Please connect your wallet to view the dashboard.</h2>
                </div>
            </div>
        )
    }

    const myPostedJobs = jobs.filter(j => j.client && j.client.toLowerCase() === account.toLowerCase());
    const activeJobs = jobs.filter(j => j.freelancer && j.freelancer.toLowerCase() === account.toLowerCase());
    const myGigs = gigs.filter(g => g.freelancer && g.freelancer.toLowerCase() === account.toLowerCase());

    const myCompletedJobs = activeJobs.filter(j => j.status === 'COMPLETED').length;
    // Calculation of earnings could be complex, assume 0 for now as in legacy

    const handleSubmitWork = (id) => {
        const ipfs = prompt("Enter IPFS/File Link for submission:");
        if (ipfs) {
            submitWork(id, ipfs);
            alert("Work submitted! Client will review.");
        }
    };

    const handleReleasePayment = (id) => {
        if (confirm("Approve work and release funds?")) {
            releasePayment(id);
            alert("Bounty Paid! Transaction confirmed on Scroll.");
        }
    };

    return (
        <div className="dashboard-page">
            <Navbar />

            <div className="container dashboard-container">
                <h1 style={{ marginBottom: '0.5rem' }}>Dashboard</h1>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                    Welcome back, <span style={{ color: 'white' }}>{account.substring(0, 6)}...</span>
                </p>

                <div className="stats-grid">
                    <div className="stat-card">
                        <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)' }}>0.00 ETH</div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Total Earned</div>
                    </div>
                    <div className="stat-card">
                        <div style={{ fontSize: '2rem', fontWeight: 700, color: 'white' }}>{activeJobs.length}</div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Active Jobs</div>
                    </div>
                    <div className="stat-card">
                        <div style={{ fontSize: '2rem', fontWeight: 700, color: 'white' }}>{myCompletedJobs}</div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Completed</div>
                    </div>
                </div>

                <div className="tabs">
                    <button
                        className={`tab-btn ${viewMode === 'client' ? 'active' : ''}`}
                        onClick={() => setViewMode('client')}
                    >
                        Client Mode
                    </button>
                    <button
                        className={`tab-btn ${viewMode === 'freelancer' ? 'active' : ''}`}
                        onClick={() => setViewMode('freelancer')}
                    >
                        Freelancer Mode
                    </button>
                </div>

                {viewMode === 'client' && (
                    <div id="client-view" className="list-section">
                        <h3 style={{ marginBottom: '1.5rem' }}>Posted Jobs</h3>
                        {myPostedJobs.length === 0 ? (
                            <p style={{ color: '#666' }}>No jobs posted.</p>
                        ) : (
                            myPostedJobs.map(j => (
                                <div key={j.id} className="item-card">
                                    <div>
                                        <strong>{j.title}</strong>
                                        <div style={{ fontSize: '0.8rem', marginTop: '0.4rem' }}>
                                            Status: {j.status} | Bids: {j.bids ? j.bids.length : 0}
                                        </div>
                                    </div>
                                    <div>
                                        {j.submission ? (
                                            <button className="btn btn-primary" onClick={() => handleReleasePayment(j.id)}>Release Payment</button>
                                        ) : (
                                            <button className="btn btn-outline" onClick={() => navigate(`/job/${j.id}`)}>Manage</button>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}

                        <h3 style={{ marginTop: '3rem', marginBottom: '1.5rem' }}>Gig Orders</h3>
                        <p style={{ color: '#666' }}>No orders yet.</p>
                    </div>
                )}

                {viewMode === 'freelancer' && (
                    <div id="freelancer-view" className="list-section">
                        <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3>My Gigs (Selling)</h3>
                            <button className="btn btn-outline" onClick={() => navigate('/create-gig')}>+ Create Gig</button>
                        </div>
                        {myGigs.length === 0 ? (
                            <p style={{ color: '#666' }}>You have no gigs.</p>
                        ) : (
                            myGigs.map(g => (
                                <div key={g.id} className="item-card">
                                    <div><strong>{g.title}</strong> - {g.price}</div>
                                    <span className="feature-badge">Active</span>
                                </div>
                            ))
                        )}

                        <h3 style={{ marginTop: '3rem', marginBottom: '1.5rem' }}>Active Jobs (To Do)</h3>
                        {activeJobs.length === 0 ? (
                            <p style={{ color: '#666' }}>No active jobs.</p>
                        ) : (
                            activeJobs.map(j => (
                                <div key={j.id} className="item-card">
                                    <div>
                                        <strong>{j.title}</strong>
                                        <div style={{ fontSize: '0.8rem', marginTop: '0.4rem' }}>Price: {j.agreedPrice}</div>
                                    </div>
                                    <div>
                                        {j.status === 'REVIEW' ? (
                                            <span className="feature-badge">Under Review</span>
                                        ) : j.status === 'COMPLETED' ? (
                                            <span className="feature-badge" style={{ color: 'var(--success-color)', borderColor: 'var(--success-color)' }}>Completed</span>
                                        ) : (
                                            <button className="btn btn-primary" onClick={() => handleSubmitWork(j.id)}>Submit Work</button>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
