import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import Features from '../../components/Features/Features';
import HowItWorks from '../../components/HowItWorks/HowItWorks';
import Footer from '../../components/Footer/Footer';

const Home = () => {
    return (
        <div className="home-page">
            <Navbar />
            <main>
                <Hero />
                <Features />
                <HowItWorks />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
