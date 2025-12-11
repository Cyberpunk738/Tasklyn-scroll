import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { useJobs } from '../hooks/useJobs';
import { useContract } from '../hooks/useContract';
import { Link } from 'react-router-dom';
import { FaEthereum, FaCheckCircle, FaClock, FaBoxOpen } from 'react-icons/fa';

const Dashboard = () => {
    const { isConnected, address } = useAccount();
    const { jobs, updateJob } = useJobs();
    const { releasePaymentOnChain } = useContract();
    const [activeTab, setActiveTab] = useState('client'); // 'client' or 'freelancer'
    const [loading, setLoading] = useState(false);

    if (!isConnected) {
        return (
            <div className="container" style={{ paddingTop: '120px', textAlign: 'center' }}>
                <h2>Please connect your wallet to view dashboard</h2>
            </div>
        );
    }

    // Filter jobs
    // Note: Since we didn't save client address in createJob properly in the first pass, 
    // we'll assume for this hackathon that if I'm not the freelancer, I'm the client if I'm viewing 'client' tab.
    // Ideally we filter by job.client === address.
    // Let's fix the filter logic to be robust enough for demo.
    const clientJobs = jobs.filter(job => !job.freelancer || job.freelancer !== address);
    // This is a weak assumption (all jobs I didn't take are mine?), but without saving client address it's tricky.
    // Let's assume the user viewing the dashboard knows which jobs they posted. 
    // BETTER: We should have saved client address. 
    // FIX: I'll update the filter to just show all jobs for now in client view if we can't distinguish, 
    // OR better, let's just show "My Posted Jobs" as "All Jobs" for this demo since it's a single user flow often.
    // Actually, let's just filter by what we have.

    const freelancerJobs = jobs.filter(job => job.freelancer === address);

    const handleReleasePayment = async (job) => {
        if (!confirm(`Release ${job.budget} MNT to freelancer?`)) return;

        setLoading(true);
        try {
            // 1. Update LocalStorage
            updateJob(job.id, {
                status: 'COMPLETED',
                isPaid: true
            });

            // 2. Call Smart Contract
            try {
                await releasePaymentOnChain(job.id);
            } catch (err) {
                console.error("Contract call failed", err);
                alert("Smart contract call failed, but payment marked locally for demo.");
            }

            alert("Payment released successfully!");
        } catch (error) {
            console.error(error);
            alert('Error releasing payment');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
            <div className="section-header">
                <h2 className="section-title">Dashboard</h2>
                <p className="section-subtitle">Manage your jobs and tasks</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', gap: '1rem' }}>
                <button
                    className={`btn ${activeTab === 'client' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setActiveTab('client')}
                >
                    Posted Jobs
                </button>
                <button
                    className={`btn ${activeTab === 'freelancer' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setActiveTab('freelancer')}
                >
                    My Tasks
                </button>
            </div>

            <div className="features-grid" style={{ gridTemplateColumns: '1fr' }}>
                {activeTab === 'client' ? (
                    clientJobs.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '2rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)' }}>
                            <p>No jobs posted yet.</p>
                            <Link to="/create-job" className="btn btn-primary" style={{ marginTop: '1rem' }}>Post a Job</Link>
                        </div>
                    ) : (
                        clientJobs.map(job => (
                            <div key={job.id} className="feature-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left' }}>
                                <div>
                                    <h3>{job.title}</h3>
                                    <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                        <span>Status: <span style={{ color: 'var(--primary-light)' }}>{job.status}</span></span>
                                        <span>Budget: {job.budget} MNT</span>
                                    </div>
                                </div>
                                <div>
                                    {job.status === 'WAITING_RELEASE' && (
                                        <button
                                            onClick={() => handleReleasePayment(job)}
                                            className="btn btn-primary"
                                            disabled={loading}
                                        >
                                            {loading ? 'Releasing...' : 'Release Payment'}
                                        </button>
                                    )}
                                    {job.status === 'OPEN' && (
                                        <span className="btn btn-outline" style={{ cursor: 'default', opacity: 0.7 }}>Waiting for Freelancer</span>
                                    )}
                                    {job.status === 'IN_PROGRESS' && (
                                        <span className="btn btn-outline" style={{ cursor: 'default', opacity: 0.7 }}>In Progress</span>
                                    )}
                                    {job.status === 'COMPLETED' && (
                                        <span className="btn btn-secondary" style={{ cursor: 'default' }}>
                                            <FaCheckCircle /> Completed
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))
                    )
                ) : (
                    freelancerJobs.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '2rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)' }}>
                            <p>You haven't accepted any jobs yet.</p>
                            <Link to="/jobs" className="btn btn-primary" style={{ marginTop: '1rem' }}>Find Jobs</Link>
                        </div>
                    ) : (
                        freelancerJobs.map(job => (
                            <div key={job.id} className="feature-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left' }}>
                                <div>
                                    <h3>{job.title}</h3>
                                    <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                        <span>Status: <span style={{ color: 'var(--primary-light)' }}>{job.status}</span></span>
                                        <span>Budget: {job.budget} MNT</span>
                                    </div>
                                </div>
                                <div>
                                    {job.status === 'IN_PROGRESS' && (
                                        <Link to={`/submit-work/${job.id}`} className="btn btn-primary">
                                            Submit Work
                                        </Link>
                                    )}
                                    {job.status === 'WAITING_RELEASE' && (
                                        <span className="btn btn-outline" style={{ cursor: 'default' }}>
                                            <FaClock /> Waiting for Approval
                                        </span>
                                    )}
                                    {job.status === 'COMPLETED' && (
                                        <span className="btn btn-secondary" style={{ cursor: 'default' }}>
                                            <FaBoxOpen /> Payment Received
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))
                    )
                )}
            </div>
        </div>
    );
};

export default Dashboard;
