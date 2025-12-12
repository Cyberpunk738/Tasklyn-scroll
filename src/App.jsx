import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Dashboard from './pages/Dashboard/Dashboard';
import Gigs from './pages/Gigs/Gigs';
import Jobs from './pages/Jobs/Jobs';
import CreateJob from './pages/CreateJob/CreateJob';
import CreateGig from './pages/CreateGig/CreateGig';
import GigDetails from './pages/GigDetails/GigDetails';
import JobDetails from './pages/JobDetails/JobDetails';
import Invoice from './pages/Invoice/Invoice';
import PayInvoice from './pages/PayInvoice/PayInvoice';
import Docs from './pages/Docs/Docs';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/gigs" element={<Gigs />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/create-job" element={<CreateJob />} />
        <Route path="/create-gig" element={<CreateGig />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/pay/:id" element={<PayInvoice />} />
        <Route path="/gig/:id" element={<GigDetails />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/docs" element={<Docs />} />
        {/* Helper route to catch all for now, to ensure Home renders */}
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
