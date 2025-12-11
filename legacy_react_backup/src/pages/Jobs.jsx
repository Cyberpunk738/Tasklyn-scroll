import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useJobs } from '../hooks/useJobs';
import { FaSearch, FaFilter, FaEthereum } from 'react-icons/fa';

const Jobs = () => {
    const { jobs, loading } = useJobs();
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredJobs = jobs.filter(job => {
        const matchesCategory = filter === 'All' || job.category === filter;
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
            <div className="section-header">
                <h2 className="section-title">Explore Jobs</h2>
                <p className="section-subtitle">Find your next decentralized opportunity</p>
            </div>

            <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ position: 'relative', flex: 1, minWidth: '300px' }}>
                    <FaSearch style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search jobs..."
                        className="form-input"
                        style={{ paddingLeft: '2.5rem', width: '100%' }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '5px' }}>
                    {['All', 'Development', 'Design', 'Marketing', 'Writing'].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`btn ${filter === cat ? 'btn-primary' : 'btn-outline'}`}
                            style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', whiteSpace: 'nowrap' }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '4rem' }}>Loading jobs...</div>
            ) : filteredJobs.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)' }}>
                    <h3>No jobs found</h3>
                    <p>Try adjusting your search or filters</p>
                </div>
            ) : (
                <div className="features-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))' }}>
                    {filteredJobs.map(job => (
                        <Link to={`/jobs/${job.id}`} key={job.id} style={{ textDecoration: 'none' }}>
                            <div className="feature-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', textAlign: 'left', alignItems: 'flex-start' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '1rem' }}>
                                    <span className="feature-badge">{job.category}</span>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                                        {new Date(job.createdAt).toLocaleDateString()}
                                    </span>
                                </div>

                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{job.title}</h3>
                                <p style={{ flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                    {job.description}
                                </p>

                                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-secondary)', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', color: 'var(--primary-light)' }}>
                                        <FaEthereum /> {job.budget} MNT
                                    </div>
                                    <span className={`status-badge ${job.status.toLowerCase()}`} style={{
                                        fontSize: '0.75rem',
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '4px',
                                        background: job.status === 'OPEN' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(99, 102, 241, 0.2)',
                                        color: job.status === 'OPEN' ? '#10b981' : '#6366f1'
                                    }}>
                                        {job.status}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Jobs;
