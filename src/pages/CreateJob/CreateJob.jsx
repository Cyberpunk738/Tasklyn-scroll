import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWeb3 } from '../../context/Web3Context';
import { useStore } from '../../context/StoreContext';
import Navbar from '../../components/Navbar/Navbar';
import './CreateJob.css';

const CreateJob = () => {
    const navigate = useNavigate();
    const { account } = useWeb3();
    const { createJob } = useStore();

    const [formData, setFormData] = useState({
        title: '',
        category: 'Development',
        description: '',
        budget: '',
        deadline: '',
        file: null
    });
    const [fileName, setFileName] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!account) {
            // alert("Please login with your wallet to post a job.");
            // navigate('/login');
            // For better UX, maybe just show a message or redirect in render, 
            // but the legacy app alerted and redirected.
        }
    }, [account]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFormData(prev => ({ ...prev, file: e.target.files[0] }));
            setFileName(e.target.files[0].name);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!account) {
            alert('Please connect your wallet first!');
            return;
        }

        setLoading(true);

        try {
            // 1. Simulating Signature
            const msg = `Create Job: ${formData.title}\nReward: ${formData.budget}\nNonce: ${Date.now()}`;
            await window.ethereum.request({
                method: 'personal_sign',
                params: [msg, account]
            });

            // 2. Simulating creation
            const ipfsHash = formData.file ? 'QmHash' + Math.random().toString(36).substr(2, 9) : null;

            const jobData = {
                title: formData.title,
                category: formData.category,
                description: formData.description,
                reward: formData.budget,
                deadline: formData.deadline,
                ipfsParams: ipfsHash,
                tags: [formData.category, 'Scroll']
            };

            setTimeout(() => {
                createJob(jobData);
                alert('Transaction Confirmed! Job Posted on Scroll Network.');
                navigate('/jobs');
            }, 1000);

        } catch (err) {
            console.error(err);
            alert("Transaction Rejected");
            setLoading(false);
        }
    };

    if (!account) {
        return (
            <div>
                <Navbar />
                <div className="container form-container" style={{ textAlign: 'center' }}>
                    <h2>Please connect your wallet to post a job.</h2>
                    <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={() => navigate('/login')}>Login</button>
                </div>
            </div>
        );
    }

    return (
        <div className="create-job-page">
            <Navbar />
            <div className="container form-container glass-panel">
                <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Post a New Bounty</h1>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Job Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="e.g. Smart Contract Audit for DeFi Protocol"
                            required
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                        >
                            <option value="Development">Development</option>
                            <option value="Design">Design</option>
                            <option value="Writing">Writing</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Audit">Smart Contract Audit</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            rows="5"
                            placeholder="Describe the task requirements in detail..."
                            required
                            value={formData.description}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="budget">Budget (ETH/USDC)</label>
                                <input
                                    type="text"
                                    id="budget"
                                    name="budget"
                                    placeholder="e.g. 1.5 ETH"
                                    required
                                    value={formData.budget}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="deadline">Deadline</label>
                                <input
                                    type="date"
                                    id="deadline"
                                    name="deadline"
                                    required
                                    value={formData.deadline}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Reference File (Optional)</label>
                        <div className="file-upload" onClick={() => document.getElementById('file').click()}>
                            <i className="fa-solid fa-cloud-arrow-up"></i>
                            <p>Click to upload specs or mockups (IPFS)</p>
                            <span style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>{fileName}</span>
                        </div>
                        <input type="file" id="file" hidden onChange={handleFileChange} />
                    </div>
                    <div className="actions">
                        <button type="button" className="btn btn-outline" onClick={() => navigate('/')} style={{ flex: 1 }}>Cancel</button>
                        <button type="submit" className="btn btn-primary" style={{ flex: 2 }} disabled={loading}>
                            {loading ? 'Minting Job on Scroll...' : 'Post Job on Scroll'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateJob;
