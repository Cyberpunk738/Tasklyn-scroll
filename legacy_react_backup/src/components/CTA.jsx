import React, { useState } from 'react';
import { FaPaperPlane, FaTimes } from 'react-icons/fa';
import './CTA.css';

const CTA = () => {
    const [email, setEmail] = useState('');
    const [notification, setNotification] = useState(null);

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email && isValidEmail(email)) {
            showNotification('Success! You\'ve been added to the waitlist.', 'success');
            setEmail('');
        } else {
            showNotification('Please enter a valid email address.', 'error');
        }
    };

    const showNotification = (message, type) => {
        setNotification({ message, type });
        setTimeout(() => {
            setNotification(null);
        }, 5000);
    };

    return (
        <section className="cta" id="cta">
            <div className="container">
                <div className="cta-content">
                    <h2>Ready to Shape the Future of Work?</h2>
                    <p>Join thousands of professionals already using Tasklyn to build, earn, and grow in the Web3 economy.</p>

                    <form className="cta-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="form-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button type="submit" className="btn btn-primary">
                                <FaPaperPlane />
                                Join Waitlist
                            </button>
                        </div>
                        <p className="form-note">Get early access and exclusive updates</p>
                    </form>
                </div>
            </div>

            {notification && (
                <div
                    className="notification"
                    style={{
                        transform: 'translateX(0)',
                        background: notification.type === 'success' ? 'var(--secondary)' : 'var(--warning)',
                        color: 'white'
                    }}
                >
                    <div className="notification-content">
                        <span className="notification-message">{notification.message}</span>
                        <button className="notification-close" onClick={() => setNotification(null)}>
                            <FaTimes />
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default CTA;
