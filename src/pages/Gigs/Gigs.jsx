import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import Navbar from '../../components/Navbar/Navbar';
import './Gigs.css';

const Gigs = () => {
    const { gigs } = useStore();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('All');

    const filteredGigs = gigs.filter(gig => {
        const matchesSearch = gig.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = category === 'All' || (gig.category && gig.category.includes(category));
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="gigs-page">
            <Navbar />
            <div className="container gigs-container">
                <h1 className="section-title" style={{ textAlign: 'left', marginBottom: '1rem' }}>Available Gigs</h1>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>
                    Hire talented Web3 freelancers for your Scroll projects.
                </p>

                <div className="filters">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search gigs (e.g. Logo Design, Smart Contract)..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select
                        className="search-bar"
                        style={{ flex: 0, minWidth: '150px' }}
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="All">All Categories</option>
                        <option value="Development">Development</option>
                        <option value="Design">Design</option>
                        <option value="Writing">Writing</option>
                        <option value="Marketing">Marketing</option>
                        <option value="DeFi">DeFi & Video</option>
                        <option value="Consulting">Consulting</option>
                    </select>
                </div>

                <div className="gigs-grid">
                    {filteredGigs.length === 0 ? (
                        <div style={{ gridColumn: '1/-1', textAlign: 'center', color: 'var(--text-secondary)' }}>
                            No gigs found.
                        </div>
                    ) : (
                        filteredGigs.map(gig => (
                            <div key={gig.id} className="gig-card" onClick={() => navigate(`/gig/${gig.id}`)}>
                                <div className="gig-image">
                                    {gig.image ? (
                                        <img src={gig.image} alt={gig.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <i className="fa-solid fa-image fa-2x"></i>
                                    )}
                                </div>
                                <div className="gig-content">
                                    <div className="gig-user">
                                        <i className="fa-solid fa-circle-user"></i> {gig.freelancer ? `${gig.freelancer.substring(0, 6)}...` : 'Unknown'}
                                    </div>
                                    <h3 className="gig-title">{gig.title}</h3>
                                    <div className="gig-footer">
                                        <span className="gig-price">{gig.price}</span>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                            <i className="fa-solid fa-star" style={{ color: 'gold', marginRight: '4px' }}></i>
                                            {gig.rating || '5.0'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Gigs;
