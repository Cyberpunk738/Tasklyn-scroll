import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import Navbar from '../../components/Navbar/Navbar';
import './Jobs.css';

const MOCK_JOBS = [
    { id: 'mock1', title: "Smart Contract Audit for DeFi Protocol", description: "Review our staking contracts.", reward: "2.5 ETH", tags: ["Solidity", "Security"], client: "0x12...89AB" },
    { id: 'mock2', title: "Responsive Landing Page Design", description: "Create a modern landing page in Figma.", reward: "500 USDC", tags: ["Design", "Figma"], client: "0x45...CDEF" },
    { id: 'mock3', title: "Technical Writer for API Docs", description: "Write clear examples for our SDK.", reward: "0.8 ETH", tags: ["Writing", "Docs"], client: "0x78...0123" }
];

const Jobs = () => {
    const { jobs } = useStore();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('All Categories');

    const allJobs = [...jobs, ...MOCK_JOBS];

    const filteredJobs = allJobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.description?.toLowerCase().includes(searchTerm.toLowerCase());
        // Basic category matching logic (using tags or description for now as mock data is loose)
        const matchesCategory = category === 'All Categories' ||
            (job.tags && job.tags.includes(category)) ||
            (job.category && job.category === category) ||
            (category === 'Development' && (job.tags?.includes('Solidity') || job.title.includes('Contract'))) ||
            (category === 'Design' && (job.tags?.includes('Design') || job.title.includes('Design'))) ||
            (category === 'Writing' && (job.tags?.includes('Writing') || job.title.includes('Writer')));

        return matchesSearch && matchesCategory;
    });

    return (
        <div className="jobs-page">
            <Navbar />
            <div className="container jobs-container">
                <h1 className="section-title" style={{ textAlign: 'left', marginBottom: '1rem' }}>Available Tasks</h1>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>Browse open bounties and micro-tasks.</p>

                <div className="filters">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search for jobs (e.g. Design, Audit, Content)..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select
                        className="search-bar"
                        style={{ flex: 0, minWidth: '150px' }}
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option>All Categories</option>
                        <option>Development</option>
                        <option>Design</option>
                        <option>Writing</option>
                    </select>
                </div>

                <div id="jobs-list">
                    {filteredJobs.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>No jobs found.</div>
                    ) : (
                        filteredJobs.map(job => (
                            <div key={job.id} className="job-card">
                                <div className="job-info">
                                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{job.title}</h3>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '600px' }}>
                                        {job.description ? `${job.description.substring(0, 100)}...` : ''}
                                    </p>
                                    <div className="job-tags">
                                        <span className="tag">Scroll</span>
                                        {job.tags && job.tags.map(tag => (
                                            <span key={tag} className="tag">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right', minWidth: '120px' }}>
                                    <div className="price-tag">{job.reward || job.budget}</div>
                                    <button
                                        className="btn btn-outline"
                                        style={{ marginTop: '0.8rem', fontSize: '0.85rem', padding: '0.6rem 1.2rem' }}
                                        onClick={() => navigate(`/job/${job.id}`)}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Jobs;
