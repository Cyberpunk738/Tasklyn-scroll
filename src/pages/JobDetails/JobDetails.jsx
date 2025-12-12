import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { useWeb3 } from '../../context/Web3Context';
import Navbar from '../../components/Navbar/Navbar';
import './JobDetails.css';

const MOCK_JOBS = [
    { id: 'mock1', title: "Smart Contract Audit for DeFi Protocol", description: "Review our staking contracts.", reward: "2.5 ETH", tags: ["Solidity", "Security"], client: "0x12...89AB", bids: [] },
    { id: 'mock2', title: "Responsive Landing Page Design", description: "Create a modern landing page in Figma.", reward: "500 USDC", tags: ["Design", "Figma"], client: "0x45...CDEF", bids: [] },
    { id: 'mock3', title: "Technical Writer for API Docs", description: "Write clear examples for our SDK.", reward: "0.8 ETH", tags: ["Writing", "Docs"], client: "0x78...0123", bids: [] }
];

const JobDetails = () => {
    const { id } = useParams();
    const { jobs, placeBid, acceptBid } = useStore();
    const { account } = useWeb3();

    const [job, setJob] = useState(null);
    const [bidAmount, setBidAmount] = useState('');
    const [bidMsg, setBidMsg] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let foundJob = jobs.find(j => j.id === id);
        if (!foundJob) {
            foundJob = MOCK_JOBS.find(j => j.id === id);
        }
        // Fallback for demo if id not found but we want to show something? 
        // No, keep it specific.
        setJob(foundJob);
    }, [id, jobs]);

    const handleBid = async (e) => {
        e.preventDefault();
        if (!account) return alert("Connect Wallet!");

        setLoading(true);
        try {
            await window.ethereum.request({
                method: 'personal_sign',
                params: [`Place Bid: ${bidAmount}\nJob ID: ${job.id}`, account]
            });

            placeBid(job.id, { amount: bidAmount, msg: bidMsg });
            alert('Bid Transaction Confirmed!');
            setBidAmount('');
            setBidMsg('');
            // Trigger refresh logic if check logic in StoreContext updates state properly
        } catch (err) {
            console.error(err);
            alert("Transaction Rejected");
        } finally {
            setLoading(false);
        }
    };

    const handleAccept = async (bidId) => {
        if (confirm('Accept this bid? Checks will be locked in Escrow.')) {
            try {
                // Simulate lock funds
                await window.ethereum.request({
                    method: 'personal_sign',
                    params: [`Accept Bid & Lock Funds\nJob: ${job.id}\nBid: ${bidId}`, account]
                });
                acceptBid(job.id, bidId);
                alert('Bid Accepted! Funds Locked in Escrow.');
            } catch (err) {
                console.error(err);
                alert("Cancelled");
            }
        }
    };

    if (!job) {
        return (
            <div className="job-details-page">
                <Navbar />
                <div className="container details-container">
                    <h2>Job Not Found</h2>
                </div>
            </div>
        )
    }

    const isClient = account && (job.client && account.toLowerCase() === job.client.toLowerCase());
    // For mock data, client might just be "0x12...89AB", handle loose match or just always show for demo

    return (
        <div className="job-details-page">
            <Navbar />
            <div className="container details-container">

                <div className="main-column">
                    <div className="section-box">
                        <span className="feature-badge" style={{ marginBottom: '1rem', display: 'inline-block' }}>{job.status || 'OPEN'}</span>
                        <h1 style={{ marginBottom: '0.5rem' }}>{job.title}</h1>
                        <div style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.9rem' }}>
                            Posted by <span style={{ color: 'white' }}>{job.client ? job.client.substring(0, 6) + '...' : 'Unknown'}</span> • {new Date(job.createdAt || Date.now()).toLocaleDateString()}
                        </div>
                        <h3>Description</h3>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginTop: '1rem', whiteSpace: 'pre-wrap' }}>
                            {job.description}
                        </p>
                        <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                            <strong>Attachments:</strong> <span style={{ color: 'var(--primary)', cursor: 'pointer' }}>specs_v1.pdf</span> (Mock IPFS)
                        </div>
                    </div>

                    <div className="section-box">
                        <h3 style={{ marginBottom: '1.5rem' }}>Proposals</h3>
                        {(!job.bids || job.bids.length === 0) ? (
                            <p style={{ color: 'var(--text-secondary)' }}>No bids yet.</p>
                        ) : (
                            job.bids.map(bid => (
                                <div key={bid.id} className="bid-card">
                                    <div>
                                        <strong>{bid.freelancer ? bid.freelancer.substring(0, 6) : 'User'}...</strong> - {bid.amount}
                                        <p style={{ fontSize: '0.85rem', color: '#aaa', marginTop: '0.2rem' }}>{bid.msg}</p>
                                    </div>
                                    <div>
                                        {isClient && job.status === 'OPEN' ? (
                                            <button className="btn btn-outline" onClick={() => handleAccept(bid.id)}>Accept</button>
                                        ) : (
                                            <span className="feature-badge">{bid.status || 'Pending'}</span>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}

                        {/* Bid Form for Freelancers */}
                        {!isClient && job.status === 'OPEN' && (
                            <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
                                <h4>Place a Bid</h4>
                                <form onSubmit={handleBid}>
                                    <div className="form-group">
                                        <label>Bid Amount</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. 1.2 ETH"
                                            required
                                            value={bidAmount}
                                            onChange={(e) => setBidAmount(e.target.value)}
                                            style={{ width: '100%', padding: '0.8rem', background: '#222', border: '1px solid #444', color: 'white', borderRadius: '4px', marginBottom: '1rem' }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Proposal Message</label>
                                        <textarea
                                            rows="4"
                                            placeholder="Why are you the best fit?"
                                            required
                                            value={bidMsg}
                                            onChange={(e) => setBidMsg(e.target.value)}
                                            style={{ width: '100%', padding: '0.8rem', background: '#222', border: '1px solid #444', color: 'white', borderRadius: '4px', marginBottom: '1rem' }}
                                        ></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-primary" disabled={loading}>
                                        {loading ? 'Submitting...' : 'Submit Proposal'}
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>

                <div className="sidebar">
                    <div className="section-box">
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Budget</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--success-color)', marginBottom: '1.5rem' }}>{job.reward || job.budget}</div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Deadline</div>
                        <div style={{ marginBottom: '1.5rem', fontWeight: 600 }}>{job.deadline || 'No deadline'}</div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Payment Verified</div>
                        <div style={{ color: 'var(--primary)' }}><i className="fa-solid fa-circle-check"></i> Scroll Escrow</div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default JobDetails;
