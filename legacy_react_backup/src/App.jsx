import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Blockchain from './components/Blockchain';
import CTA from './components/CTA';
import Footer from './components/Footer';
import CreateJob from './pages/CreateJob';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import SubmitWork from './pages/SubmitWork';
import Dashboard from './pages/Dashboard';
import './App.css';

const Home = () => (
  <>
    <Hero />
    <Features />
    <HowItWorks />
    <Blockchain />
    <CTA />
  </>
);

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-job" element={<CreateJob />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/submit-work/:id" element={<SubmitWork />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
