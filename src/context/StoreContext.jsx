import React, { createContext, useState, useEffect, useContext } from 'react';
import { useWeb3 } from './Web3Context';

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
    const { account } = useWeb3();
    const [jobs, setJobs] = useState([]);
    const [gigs, setGigs] = useState([]);
    const [orders, setOrders] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);

    const generateId = () => Math.random().toString(36).substr(2, 9);

    const refreshData = () => {
        setJobs(JSON.parse(localStorage.getItem('tasklyn_jobs') || '[]'));
        setGigs(JSON.parse(localStorage.getItem('tasklyn_gigs') || '[]'));
        setOrders(JSON.parse(localStorage.getItem('tasklyn_orders') || '[]'));
        setInvoices(JSON.parse(localStorage.getItem('tasklyn_invoices') || '[]'));
        setLoading(false);
    };

    useEffect(() => {
        refreshData();
        // Seed Gigs if needed
        const currentGigs = JSON.parse(localStorage.getItem('tasklyn_gigs') || '[]');
        if (currentGigs.length <= 5) {
            seedGigs();
        }
    }, []);

    const seedGigs = () => {
        const MOCK_GIGS = [
            // --- DEVELOPMENT & SECURITY ---
            {
                id: 'mock_audit',
                title: "I will audit your Smart Contract Security",
                freelancer: "0xSec...Auditor",
                price: "0.5 ETH",
                category: "Development",
                image: "/assets/gigs/audit.png",
                deliveryTime: "3 Days",
                rating: 5.0
            },
            {
                id: 'mock_defi_audit',
                title: "I will review your DeFi Protocol Logic",
                freelancer: "0xCode...Ninja",
                price: "0.8 ETH",
                category: "DeFi",
                image: "/assets/gigs/audit.png",
                deliveryTime: "5 Days",
                rating: 4.9
            },
            {
                id: 'mock_token_dev',
                title: "I will deploy your ERC20 Token on Scroll",
                freelancer: "0xDev...Ops",
                price: "0.1 ETH",
                category: "Development",
                image: "/assets/gigs/audit.png",
                deliveryTime: "1 Day",
                rating: 5.0
            },

            // --- DESIGN & NFT ---
            {
                id: 'mock_nft',
                title: "I will create a 3D NFT Character Collection",
                freelancer: "0xArt...Studio",
                price: "0.2 ETH",
                category: "Design",
                image: "/assets/gigs/nft.png",
                deliveryTime: "5 Days",
                rating: 4.9
            },
            {
                id: 'mock_pixel_art',
                title: "I will design Pixel Art for your PFP Project",
                freelancer: "0xPixel...Artist",
                price: "0.05 ETH",
                category: "Design",
                image: "/assets/gigs/nft.png",
                deliveryTime: "2 Days",
                rating: 4.7
            },
            {
                id: 'mock_metaverse',
                title: "I will model assets for your Metaverse Game",
                freelancer: "0xMeta...Build",
                price: "0.4 ETH",
                category: "Design",
                image: "/assets/gigs/nft.png",
                deliveryTime: "7 Days",
                rating: 5.0
            },

            // --- UI/UX & LANDING ---
            {
                id: 'mock_landing',
                title: "I will design a High-Converting Web3 Landing Page",
                freelancer: "0xWeb...Des",
                price: "200 USDC",
                category: "Design",
                image: "/assets/gigs/landing.png",
                deliveryTime: "2 Days",
                rating: 5.0
            },
            {
                id: 'mock_dapp_ui',
                title: "I will design a sleek Dapp UI in Figma",
                freelancer: "0xUI...Master",
                price: "300 USDC",
                category: "Design",
                image: "/assets/gigs/landing.png",
                deliveryTime: "4 Days",
                rating: 4.8
            },

            // --- WRITING & CONSULTING ---
            {
                id: 'mock_whitepaper',
                title: "I will write a Professional Crypto Whitepaper",
                freelancer: "0xWrite...Pro",
                price: "150 USDC",
                category: "Writing",
                image: "/assets/gigs/whitepaper.png",
                deliveryTime: "4 Days",
                rating: 4.8
            },
            {
                id: 'mock_tokenomics',
                title: "I will design sustainable Tokenomics for your DAO",
                freelancer: "0xEcon...Prof",
                price: "500 USDC",
                category: "Consulting",
                image: "/assets/gigs/whitepaper.png",
                deliveryTime: "3 Days",
                rating: 5.0
            },
            {
                id: 'mock_grant',
                title: "I will write a Grant Proposal for Scroll Ecosystem",
                freelancer: "0xGrant...Writer",
                price: "100 USDC",
                category: "Writing",
                image: "/assets/gigs/whitepaper.png",
                deliveryTime: "2 Days",
                rating: 4.9
            },

            // --- MARKETING & COMMUNITY ---
            {
                id: 'mock_community',
                title: "I will manage your Discord & Telegram Community",
                freelancer: "0xCom...Mod",
                price: "300 USDC/mo",
                category: "Marketing",
                image: "/assets/gigs/community.png",
                deliveryTime: "30 Days",
                rating: 4.9
            },
            {
                id: 'mock_twitter',
                title: "I will grow your Twitter/X to 10k Followers",
                freelancer: "0xGrowth...Hacker",
                price: "150 USDC",
                category: "Marketing",
                image: "/assets/gigs/community.png",
                deliveryTime: "14 Days",
                rating: 4.6
            },
            {
                id: 'mock_shill',
                title: "I will promote your token to 50+ Influencers",
                freelancer: "0xPromo...King",
                price: "0.3 ETH",
                category: "Marketing",
                image: "/assets/gigs/community.png",
                deliveryTime: "3 Days",
                rating: 4.7
            }
        ];

        // Always force update for this migration if count logic fails or just strict set
        localStorage.setItem('tasklyn_gigs', JSON.stringify(MOCK_GIGS));
        setGigs(MOCK_GIGS);
        // refreshData(); call redundant if we setGigs directly here
    };

    const createJob = (jobData) => {
        const currentJobs = JSON.parse(localStorage.getItem('tasklyn_jobs') || '[]');
        const newJob = {
            id: generateId(),
            ...jobData,
            client: account,
            status: 'OPEN',
            createdAt: new Date().toISOString(),
            bids: [],
            submission: null
        };
        currentJobs.push(newJob);
        localStorage.setItem('tasklyn_jobs', JSON.stringify(currentJobs));
        refreshData();
        return newJob;
    };

    const placeBid = (jobId, bidData) => {
        const currentJobs = JSON.parse(localStorage.getItem('tasklyn_jobs') || '[]');
        const jobIndex = currentJobs.findIndex(j => j.id === jobId);
        if (jobIndex === -1) throw new Error('Job not found');

        const newBid = {
            id: generateId(),
            freelancer: account,
            ...bidData,
            status: 'PENDING',
            createdAt: new Date().toISOString()
        };

        currentJobs[jobIndex].bids.push(newBid);
        localStorage.setItem('tasklyn_jobs', JSON.stringify(currentJobs));
        refreshData();
        return newBid;
    };

    const acceptBid = (jobId, bidId) => {
        const currentJobs = JSON.parse(localStorage.getItem('tasklyn_jobs') || '[]');
        const jobIndex = currentJobs.findIndex(j => j.id === jobId);
        if (jobIndex === -1) throw new Error('Job not found');

        const job = currentJobs[jobIndex];
        const bidIndex = job.bids.findIndex(b => b.id === bidId);

        job.status = 'IN_PROGRESS';
        job.freelancer = job.bids[bidIndex].freelancer;
        job.agreedPrice = job.bids[bidIndex].amount;
        job.bids[bidIndex].status = 'ACCEPTED';

        localStorage.setItem('tasklyn_jobs', JSON.stringify(currentJobs));
        refreshData();
    };

    const submitWork = (itemId, ipfsLink, type = 'JOB') => {
        if (type === 'JOB') {
            const currentJobs = JSON.parse(localStorage.getItem('tasklyn_jobs') || '[]');
            const jobIndex = currentJobs.findIndex(j => j.id === itemId);
            if (jobIndex !== -1) {
                currentJobs[jobIndex].status = 'REVIEW';
                currentJobs[jobIndex].submission = ipfsLink;
                localStorage.setItem('tasklyn_jobs', JSON.stringify(currentJobs));
                refreshData();
            }
        }
    };

    const releasePayment = (itemId, type = 'JOB') => {
        if (type === 'JOB') {
            const currentJobs = JSON.parse(localStorage.getItem('tasklyn_jobs') || '[]');
            const job = currentJobs.find(j => j.id === itemId);
            if (job) {
                job.status = 'COMPLETED';
                localStorage.setItem('tasklyn_jobs', JSON.stringify(currentJobs));
                refreshData();
            }
        }
    };

    const createGig = (gigData) => {
        const currentGigs = JSON.parse(localStorage.getItem('tasklyn_gigs') || '[]');
        const newGig = {
            id: generateId(),
            ...gigData,
            freelancer: account,
            createdAt: new Date().toISOString(),
            sales: 0
        };
        currentGigs.push(newGig);
        localStorage.setItem('tasklyn_gigs', JSON.stringify(currentGigs));
        refreshData();
        return newGig;
    };

    const createOrder = (gigId, orderData) => {
        const currentOrders = JSON.parse(localStorage.getItem('tasklyn_orders') || '[]');
        // Optional: fetch gig details to ensure data integrity

        const newOrder = {
            id: generateId(),
            gigId: gigId,
            client: account,
            status: 'IN_PROGRESS',
            createdAt: new Date().toISOString(),
            ...orderData
        };

        currentOrders.push(newOrder);
        localStorage.setItem('tasklyn_orders', JSON.stringify(currentOrders));
        refreshData();
        return newOrder;
    };

    const createInvoice = (invoiceData) => {
        const currentInvoices = JSON.parse(localStorage.getItem('tasklyn_invoices') || '[]');
        const newInvoice = {
            id: generateId(),
            ...invoiceData,
            status: 'PENDING',
            createdAt: new Date().toISOString()
        };
        currentInvoices.push(newInvoice);
        localStorage.setItem('tasklyn_invoices', JSON.stringify(currentInvoices));
        refreshData();
        return newInvoice;
    };

    const payInvoice = (id, txHash) => {
        const currentInvoices = JSON.parse(localStorage.getItem('tasklyn_invoices') || '[]');
        const invoiceIndex = currentInvoices.findIndex(i => i.id === id);
        if (invoiceIndex !== -1) {
            currentInvoices[invoiceIndex].status = 'PAID';
            currentInvoices[invoiceIndex].txHash = txHash;
            currentInvoices[invoiceIndex].paidAt = new Date().toISOString();
            localStorage.setItem('tasklyn_invoices', JSON.stringify(currentInvoices));
            refreshData();
        }
    };

    return (
        <StoreContext.Provider value={{
            jobs, gigs, orders, invoices, loading,
            createJob, placeBid, acceptBid, submitWork, releasePayment, createGig, createOrder,
            createInvoice, payInvoice
        }}>
            {children}
        </StoreContext.Provider>
    );
};
