import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWeb3 } from '../../context/Web3Context';
import { useStore } from '../../context/StoreContext';
import Navbar from '../../components/Navbar/Navbar';
import './CreateGig.css';

const CreateGig = () => {
    const navigate = useNavigate();
    const { account } = useWeb3();
    const { createGig } = useStore();

    const [formData, setFormData] = useState({
        title: '',
        category: 'Development',
        price: '',
        delivery: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!account) {
            alert('Please connect your wallet first!');
            return;
        }

        const gigData = {
            title: formData.title,
            category: formData.category,
            price: formData.price,
            deliveryTime: `${formData.delivery} Days`, // Format compatible with seed data
            description: formData.description,
            image: null // Placeholder
        };

        createGig(gigData);
        alert('Gig Created Successfully on Scroll!');
        navigate('/gigs');
    };

    if (!account) {
        return (
            <div>
                <Navbar />
                <div className="container form-container" style={{ textAlign: 'center' }}>
                    <h2>Please connect your wallet to create a gig.</h2>
                    <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={() => navigate('/login')}>Login</button>
                </div>
            </div>
        );
    }

    return (
        <div className="create-gig-page">
            <Navbar />
            <div className="container form-container glass-panel">
                <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Create a New Gig</h1>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Gig Title (starts with "I will...")</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="I will build a React frontend..."
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
                            <option value="Video">Video</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Consulting">Consulting</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price (ETH/USDC)</label>
                        <input
                            type="text"
                            id="price"
                            name="price"
                            placeholder="e.g. 0.5 ETH"
                            required
                            value={formData.price}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="delivery">Delivery Time (Days)</label>
                        <input
                            type="number"
                            id="delivery"
                            name="delivery"
                            placeholder="3"
                            required
                            value={formData.delivery}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            rows="5"
                            placeholder="Describe what you offer..."
                            required
                            value={formData.description}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label>Gig Image</label>
                        <div className="simulated-upload" onClick={() => alert("Image upload simulation: Image selected.")}>
                            <i className="fa-solid fa-image"></i> Click to Upload (Simulated)
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Publish Gig</button>
                </form>
            </div>
        </div>
    );
};

export default CreateGig;
