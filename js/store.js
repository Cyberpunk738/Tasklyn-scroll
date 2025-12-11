/**
 * Tasklyn Data Store (Simulated Blockchain Ledger)
 * Handles all "Smart Contract" interactions via localStorage
 */

const Store = {
    // --- UTILS ---
    generateId: () => Math.random().toString(36).substr(2, 9),
    getCurrentUser: () => localStorage.getItem('connectedAccount'),

    // --- JOBS (Client Posts) ---
    createJob: (jobData) => {
        const jobs = JSON.parse(localStorage.getItem('tasklyn_jobs') || '[]');
        const newJob = {
            id: Store.generateId(),
            ...jobData,
            client: Store.getCurrentUser(),
            status: 'OPEN', // OPEN, IN_PROGRESS, COMPLETED, REVIEW
            createdAt: new Date().toISOString(),
            bids: [],
            submission: null
        };
        jobs.push(newJob);
        localStorage.setItem('tasklyn_jobs', JSON.stringify(jobs));
        return newJob;
    },

    getJobs: () => {
        return JSON.parse(localStorage.getItem('tasklyn_jobs') || '[]');
    },

    getJobById: (id) => {
        const jobs = Store.getJobs();
        return jobs.find(j => j.id === id);
    },

    // --- BIDS (Freelancer) ---
    placeBid: (jobId, bidData) => {
        const jobs = Store.getJobs();
        const jobIndex = jobs.findIndex(j => j.id === jobId);
        if (jobIndex === -1) throw new Error('Job not found');

        const newBid = {
            id: Store.generateId(),
            freelancer: Store.getCurrentUser(),
            ...bidData,
            status: 'PENDING',
            createdAt: new Date().toISOString()
        };

        jobs[jobIndex].bids.push(newBid);
        localStorage.setItem('tasklyn_jobs', JSON.stringify(jobs));
        return newBid;
    },

    acceptBid: (jobId, bidId) => {
        const jobs = Store.getJobs();
        const jobIndex = jobs.findIndex(j => j.id === jobId);
        if (jobIndex === -1) throw new Error('Job not found');

        const job = jobs[jobIndex];
        const bidIndex = job.bids.findIndex(b => b.id === bidId);

        // Update Job Status
        job.status = 'IN_PROGRESS';
        job.freelancer = job.bids[bidIndex].freelancer; // Assign wrestler
        job.agreedPrice = job.bids[bidIndex].amount;

        // Update Bid Status
        job.bids[bidIndex].status = 'ACCEPTED';

        localStorage.setItem('tasklyn_jobs', JSON.stringify(jobs));
    },

    // --- GIGS (Freelancer Posts) ---
    createGig: (gigData) => {
        const gigs = JSON.parse(localStorage.getItem('tasklyn_gigs') || '[]');
        const newGig = {
            id: Store.generateId(),
            ...gigData,
            freelancer: Store.getCurrentUser(),
            createdAt: new Date().toISOString(),
            sales: 0
        };
        gigs.push(newGig);
        localStorage.setItem('tasklyn_gigs', JSON.stringify(gigs));
        return newGig;
    },

    getGigs: () => {
        return JSON.parse(localStorage.getItem('tasklyn_gigs') || '[]');
    },

    getGigById: (id) => {
        const gigs = Store.getGigs();
        return gigs.find(g => g.id === id);
    },

    // --- ORDERS (Client Buys Gig) ---
    createOrder: (gigId, orderData) => {
        const orders = JSON.parse(localStorage.getItem('tasklyn_orders') || '[]');
        const gigs = Store.getGigs();
        const gig = gigs.find(g => g.id === gigId);

        const newOrder = {
            id: Store.generateId(),
            gigId: gigId,
            gigTitle: gig ? gig.title : 'Unknown Gig',
            client: Store.getCurrentUser(),
            freelancer: gig ? gig.freelancer : null,
            price: gig ? gig.price : 0,
            status: 'IN_PROGRESS',
            createdAt: new Date().toISOString(),
            ...orderData
        };

        orders.push(newOrder);
        localStorage.setItem('tasklyn_orders', JSON.stringify(orders));

        // Increment gig sales logic could go here
        return newOrder;
    },

    getOrders: () => {
        return JSON.parse(localStorage.getItem('tasklyn_orders') || '[]');
    },

    // --- WORK SUBMISSION ---
    submitWork: (jobId, ipfsLink, type = 'JOB') => {
        if (type === 'JOB') {
            const jobs = Store.getJobs();
            const jobIndex = jobs.findIndex(j => j.id === jobId);
            if (jobIndex === -1) return;

            jobs[jobIndex].status = 'REVIEW';
            jobs[jobIndex].submission = ipfsLink;
            localStorage.setItem('tasklyn_jobs', JSON.stringify(jobs));
        } else {
            // Gig Order Logic
            const orders = Store.getOrders();
            const orderIndex = orders.findIndex(o => o.id === jobId);
            if (orderIndex === -1) return;

            orders[orderIndex].status = 'DELIVERED';
            orders[orderIndex].submission = ipfsLink;
            localStorage.setItem('tasklyn_orders', JSON.stringify(orders));
        }
    },

    releasePayment: (jobId, type = 'JOB') => {
        if (type === 'JOB') {
            const jobs = Store.getJobs();
            const job = jobs.find(j => j.id === jobId);
            if (job) {
                job.status = 'COMPLETED';
                localStorage.setItem('tasklyn_jobs', JSON.stringify(jobs));
            }
        } else {
            const orders = Store.getOrders();
            const order = orders.find(o => o.id === jobId);
            if (order) {
                order.status = 'COMPLETED';
                localStorage.setItem('tasklyn_orders', JSON.stringify(orders));
            }
        }
    },

    // --- SEED DATA ---
    // --- SEED DATA ---
    seedGigs: () => {
        const gigs = Store.getGigs();
        // If we have less than 6 gigs, assume it's the old seed data and re-populate
        // This is a simple migration strategy for the hackathon demo
        if (gigs.length > 5) return;

        localStorage.removeItem('tasklyn_gigs'); // Clear old small seed

        const MOCK_GIGS = [
            // --- DEVELOPMENT & SECURITY ---
            {
                id: 'mock_audit',
                title: "I will audit your Smart Contract Security",
                freelancer: "0xSec...Auditor",
                price: "0.5 ETH",
                category: "Development",
                image: "assets/gigs/audit.png",
                deliveryTime: "3 Days",
                rating: 5.0
            },
            {
                id: 'mock_defi_audit',
                title: "I will review your DeFi Protocol Logic",
                freelancer: "0xCode...Ninja",
                price: "0.8 ETH",
                category: "DeFi",
                image: "assets/gigs/audit.png",
                deliveryTime: "5 Days",
                rating: 4.9
            },
            {
                id: 'mock_token_dev',
                title: "I will deploy your ERC20 Token on Scroll",
                freelancer: "0xDev...Ops",
                price: "0.1 ETH",
                category: "Development",
                image: "assets/gigs/audit.png",
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
                image: "assets/gigs/nft.png",
                deliveryTime: "5 Days",
                rating: 4.9
            },
            {
                id: 'mock_pixel_art',
                title: "I will design Pixel Art for your PFP Project",
                freelancer: "0xPixel...Artist",
                price: "0.05 ETH",
                category: "Design",
                image: "assets/gigs/nft.png",
                deliveryTime: "2 Days",
                rating: 4.7
            },
            {
                id: 'mock_metaverse',
                title: "I will model assets for your Metaverse Game",
                freelancer: "0xMeta...Build",
                price: "0.4 ETH",
                category: "Design",
                image: "assets/gigs/nft.png",
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
                image: "assets/gigs/landing.png",
                deliveryTime: "2 Days",
                rating: 5.0
            },
            {
                id: 'mock_dapp_ui',
                title: "I will design a sleek Dapp UI in Figma",
                freelancer: "0xUI...Master",
                price: "300 USDC",
                category: "Design",
                image: "assets/gigs/landing.png",
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
                image: "assets/gigs/whitepaper.png",
                deliveryTime: "4 Days",
                rating: 4.8
            },
            {
                id: 'mock_tokenomics',
                title: "I will design sustainable Tokenomics for your DAO",
                freelancer: "0xEcon...Prof",
                price: "500 USDC",
                category: "Consulting",
                image: "assets/gigs/whitepaper.png",
                deliveryTime: "3 Days",
                rating: 5.0
            },
            {
                id: 'mock_grant',
                title: "I will write a Grant Proposal for Scroll Ecosystem",
                freelancer: "0xGrant...Writer",
                price: "100 USDC",
                category: "Writing",
                image: "assets/gigs/whitepaper.png",
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
                image: "assets/gigs/community.png",
                deliveryTime: "30 Days",
                rating: 4.9
            },
            {
                id: 'mock_twitter',
                title: "I will grow your Twitter/X to 10k Followers",
                freelancer: "0xGrowth...Hacker",
                price: "150 USDC",
                category: "Marketing",
                image: "assets/gigs/community.png",
                deliveryTime: "14 Days",
                rating: 4.6
            },
            {
                id: 'mock_shill',
                title: "I will promote your token to 50+ Influencers",
                freelancer: "0xPromo...King",
                price: "0.3 ETH",
                category: "Marketing",
                image: "assets/gigs/community.png",
                deliveryTime: "3 Days",
                rating: 4.7
            }
        ];

        localStorage.setItem('tasklyn_gigs', JSON.stringify(MOCK_GIGS));
        console.log("Seeded mock gigs");
    }
};

// Expose to window for easy access
window.Store = Store;
Store.seedGigs(); // Auto-seed on load
