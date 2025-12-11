import { useState } from 'react';

export const useIPFS = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const uploadFile = async (file) => {
    setUploading(true);
    setError(null);
    try {
      // In a real hackathon, we might use Pinata or Web3.Storage.
      // For this "no backend" constraint without API keys provided, 
      // we will simulate IPFS upload or use a public gateway if possible.
      // SIMULATION: We'll store the file in localStorage as a data URI for demo purposes
      // if it's small, or just return a mock hash if it's large.
      
      // Ideally:
      // const formData = new FormData();
      // formData.append('file', file);
      // const res = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', ...);
      
      // Mocking for now to ensure "runs immediately":
      console.log('Uploading to IPFS (Simulated)...', file.name);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a mock hash
      const mockHash = 'Qm' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      
      return mockHash;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setUploading(false);
    }
  };

  return {
    uploadFile,
    uploading,
    error,
  };
};
