import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { useJobs } from '../hooks/useJobs';
import { useContract } from '../hooks/useContract';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { FaEthereum, FaClock, FaCheckCircle, FaFileDownload } from 'react-icons/fa';

const JobDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isConnected, address } = useAccount();
    const { getJob, updateJob } = useJobs();
    const { acceptJobOnChain } = useContract();

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const foundJob = getJob(id);
        if (foundJob) {
            setJob(foundJob);
        }
    }, [id, getJob]);

    const handleAcceptJob = async () => {
        if (!isConnected) return;

        setLoading(true);
        try {
            // 1. Update LocalStorage
            updateJob(job.id, {
                status: 'IN_PROGRESS',
                freelancer: address
            });

            // 2. Call Smart Contract
            try {
                await acceptJobOnChain(job.id);
            } catch (err) {
                console.error("Contract call failed", err);
                alert("Smart contract call failed, but job updated locally for demo.");
            }

            // Refresh local state
            setJob(prev => ({ ...prev, status: 'IN_PROGRESS', freelancer: address }));
            alert("Job accepted successfully!");
        } catch (error) {
            console.error(error);
            alert('Error accepting job');
        } finally {
            setLoading(false);
        }
    };

    if (!job) return <div className="container" style={{ paddingTop: '120px', textAlign: 'center' }}>Loading...</div>;

    const isClient = isConnected && job.client === address; // Note: client address isn't saved in localstorage in createJob yet, need to fix that or assume for demo
    const isFreelancer = isConnected && job.freelancer === address;

    return (
        <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-secondary)', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                        <div>
                            <span className="feature-badge" style={{ marginBottom: '1rem' }}>{job.category}</span>
                            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{job.title}</h1>
                            <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FaClock /> Posted {new Date(job.createdAt).toLocaleDateString()}
                                </span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FaCheckCircle /> Status: {job.status}
                                </span>
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                <FaEthereum /> {job.budget} MNT
                            </div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Fixed Price</div>
                        </div>
                    </div>

                    <div style={{ borderTop: '1px solid var(--border-secondary)', paddingTop: '1.5rem', marginBottom: '1.5rem' }}>
                        <h3 style={{ marginBottom: '1rem' }}>Description</h3>
                        <p style={{ whiteSpace: 'pre-wrap' }}>{job.description}</p>
                    </div>

                    {job.ipfsHash && (
                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ marginBottom: '1rem' }}>Attachments</h3>
                            <a
                                href={`https://ipfs.io/ipfs/${job.ipfsHash}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline"
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                            >
                                <FaFileDownload /> View Attachment (IPFS)
                            </a>
                        </div>
                    )}

                    <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border-secondary)', textAlign: 'center' }}>
                        {!isConnected ? (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                                <p>Connect wallet to apply</p>
                                <ConnectButton />
                            </div>
                        ) : job.status === 'OPEN' ? (
                            <button
                                onClick={handleAcceptJob}
                                className="btn btn-primary btn-large"
                                disabled={loading}
                            >
                                {loading ? 'Processing...' : 'Accept Job & Mint NFT'}
                            </button>
                        ) : isFreelancer && job.status === 'IN_PROGRESS' ? (
                            <button
                                onClick={() => navigate(`/submit-work/${job.id}`)}
                                className="btn btn-primary btn-large"
                            >
                                Submit Work
                            </button>
                        ) : (
                            <div className="btn btn-secondary" style={{ cursor: 'default' }}>
                                {job.status === 'COMPLETED' ? 'Job Completed' : 'Job In Progress'}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;
