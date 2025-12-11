import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { useJobs } from '../hooks/useJobs';
import { useIPFS } from '../hooks/useIPFS';
import { useContract } from '../hooks/useContract';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const CreateJob = () => {
    const { isConnected } = useAccount();
    const navigate = useNavigate();
    const { addJob } = useJobs();
    const { uploadFile, uploading } = useIPFS();
    const { createJobOnChain } = useContract();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        budget: '',
        deadline: '',
        category: 'Development',
    });
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isConnected) {
            alert('Please connect your wallet first');
            return;
        }

        setLoading(true);
        try {
            let ipfsHash = '';
            if (file) {
                ipfsHash = await uploadFile(file);
            }

            // 1. Create Job in LocalStorage
            const newJob = addJob({
                ...formData,
                ipfsHash,
                freelancer: null,
            });

            // 2. Call Smart Contract
            // Note: In a real app, we'd wait for the transaction to confirm
            // For this hackathon demo, we might just fire and forget or await the hash
            try {
                await createJobOnChain(newJob.id, formData.budget);
            } catch (err) {
                console.error("Contract call failed", err);
                alert("Smart contract call failed, but job saved locally for demo.");
            }

            navigate('/jobs');
        } catch (error) {
            console.error(error);
            alert('Error creating job');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
            <div className="section-header">
                <h2 className="section-title">Post a New Job</h2>
                <p className="section-subtitle">Create a decentralized task and secure it with smart contracts</p>
            </div>

            <div style={{ maxWidth: '600px', margin: '0 auto', background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-secondary)' }}>
                {!isConnected ? (
                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                        <p style={{ marginBottom: '1rem' }}>Connect your wallet to post a job</p>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <ConnectButton />
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group" style={{ flexDirection: 'column', maxWidth: '100%' }}>
                            <label style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Job Title</label>
                            <input
                                type="text"
                                name="title"
                                className="form-input"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                placeholder="e.g. Build a React Landing Page"
                            />
                        </div>

                        <div className="form-group" style={{ flexDirection: 'column', maxWidth: '100%' }}>
                            <label style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Category</label>
                            <select
                                name="category"
                                className="form-input"
                                value={formData.category}
                                onChange={handleChange}
                            >
                                <option value="Development">Development</option>
                                <option value="Design">Design</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Writing">Writing</option>
                            </select>
                        </div>

                        <div className="form-group" style={{ flexDirection: 'column', maxWidth: '100%' }}>
                            <label style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Description</label>
                            <textarea
                                name="description"
                                className="form-input"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows="5"
                                placeholder="Describe the task details..."
                                style={{ resize: 'vertical' }}
                            />
                        </div>

                        <div className="form-group" style={{ flexDirection: 'column', maxWidth: '100%' }}>
                            <label style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Budget (MNT)</label>
                            <input
                                type="number"
                                name="budget"
                                className="form-input"
                                value={formData.budget}
                                onChange={handleChange}
                                required
                                placeholder="0.0"
                                step="0.01"
                            />
                        </div>

                        <div className="form-group" style={{ flexDirection: 'column', maxWidth: '100%' }}>
                            <label style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Deadline</label>
                            <input
                                type="date"
                                name="deadline"
                                className="form-input"
                                value={formData.deadline}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group" style={{ flexDirection: 'column', maxWidth: '100%' }}>
                            <label style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Attachments (Optional)</label>
                            <input
                                type="file"
                                className="form-input"
                                onChange={handleFileChange}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}
                            disabled={loading || uploading}
                        >
                            {loading ? 'Creating Job...' : 'Post Job'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default CreateJob;
