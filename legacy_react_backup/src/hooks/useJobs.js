import { useState, useEffect } from 'react';

const STORAGE_KEYS = {
  JOBS: 'tasklyn_jobs',
  USER_JOBS: 'tasklyn_user_jobs', // IDs of jobs created by user
  FREELANCER_JOBS: 'tasklyn_freelancer_jobs', // IDs of jobs accepted by freelancer
};

export const useJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJobs();
    window.addEventListener('storage', loadJobs);
    return () => window.removeEventListener('storage', loadJobs);
  }, []);

  const loadJobs = () => {
    const storedJobs = localStorage.getItem(STORAGE_KEYS.JOBS);
    if (storedJobs) {
      setJobs(JSON.parse(storedJobs));
    } else {
      // Mock Data
      const mockJobs = [
        {
          id: 101,
          title: 'DeFi Dashboard UI Design',
          description: 'Looking for a talented UI/UX designer to create a modern, dark-mode dashboard for a new DeFi protocol on Mantle. Must have experience with Figma and Web3 design patterns.',
          budget: '500',
          category: 'Design',
          deadline: '2024-02-15',
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
          status: 'OPEN',
          client: '0x123...abc',
          freelancer: null,
          ipfsHash: null
        },
        {
          id: 102,
          title: 'Smart Contract Audit',
          description: 'Need a security expert to audit our ERC-20 and staking contracts. The contracts are written in Solidity 0.8.20. Report must be detailed with severity levels.',
          budget: '1200',
          category: 'Development',
          deadline: '2024-02-20',
          createdAt: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
          status: 'OPEN',
          client: '0x456...def',
          freelancer: null,
          ipfsHash: null
        },
        {
          id: 103,
          title: 'Technical Content Writer for Web3 Blog',
          description: 'We need 5 high-quality articles explaining Layer 2 scaling solutions, specifically focusing on optimistic rollups and modular blockchains.',
          budget: '300',
          category: 'Writing',
          deadline: '2024-02-10',
          createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          status: 'OPEN',
          client: '0x789...ghi',
          freelancer: null,
          ipfsHash: null
        },
        {
          id: 104,
          title: 'React Frontend Developer for NFT Marketplace',
          description: 'Seeking a React developer to build the frontend for an NFT marketplace. Must know Wagmi, RainbowKit, and Tailwind CSS. Backend is already ready.',
          budget: '1500',
          category: 'Development',
          deadline: '2024-03-01',
          createdAt: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
          status: 'IN_PROGRESS',
          client: '0xabc...123',
          freelancer: '0xdef...456',
          ipfsHash: null
        }
      ];
      setJobs(mockJobs);
      localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(mockJobs));
    }
    setLoading(false);
  };

  const saveJobs = (updatedJobs) => {
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(updatedJobs));
    setJobs(updatedJobs);
    // Dispatch storage event for other tabs/components
    window.dispatchEvent(new Event('storage'));
  };

  const addJob = (job) => {
    const newJob = {
      ...job,
      id: Date.now(), // Simple ID generation
      createdAt: new Date().toISOString(),
      status: 'OPEN', // OPEN, IN_PROGRESS, WAITING_RELEASE, COMPLETED
      freelancer: null,
      ipfsHash: null,
    };
    const updatedJobs = [...jobs, newJob];
    saveJobs(updatedJobs);
    return newJob;
  };

  const updateJob = (jobId, updates) => {
    const updatedJobs = jobs.map((job) =>
      job.id === jobId ? { ...job, ...updates } : job
    );
    saveJobs(updatedJobs);
  };

  const getJob = (jobId) => {
    return jobs.find((job) => job.id === parseInt(jobId));
  };

  return {
    jobs,
    loading,
    addJob,
    updateJob,
    getJob,
  };
};
