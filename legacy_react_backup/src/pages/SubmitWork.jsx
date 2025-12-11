import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { useJobs } from '../hooks/useJobs';
import { useIPFS } from '../hooks/useIPFS';
import { useContract } from '../hooks/useContract';

const SubmitWork = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isConnected, address } = useAccount();
    const { getJob, updateJob } = useJobs();
    const { uploadFile, uploading } = useIPFS();
    const { submitWorkOnChain } = useContract();

    const [job, setJob] = useState(null);
    const [file, setFile] = useState(null);
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const foundJob = getJob(id);
        if (foundJob) {
            setJob(foundJob);
        }
    }, [id, getJob]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isConnected) return;
        if (!file) {
            alert("Please upload your work file");
            return;
        }

        setLoading(true);
        try {
            // 1. Upload to IPFS
            const ipfsHash = await uploadFile(file);

            // 2. Update LocalStorage
            updateJob(job.id, {
                status: 'WAITING_RELEASE',
                submissionHash: ipfsHash,
                submissionNotes: notes
            });

            // 3. Call Smart Contract
            try {
                await submitWorkOnChain(job.id, ipfsHash);
            } catch (err) {
                console.error("Contract call failed", err);
                alert("Smart contract call failed, but submission saved locally for demo.");
            }

            alert("Work submitted successfully!");
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            alert('Error submitting work');
        } finally {
            setLoading(false);
        }
    };

    if (!job) return <div className="container" style={{ paddingTop: '120px' }}>Loading...</div>;
    if (!isConnected || job.freelancer !== address) return <div className="container" style={{ paddingTop: '120px' }}>Access Denied</div>;

    return (
        <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
            <div className="section-header">
                <h2 className="section-title">Submit Work</h2>
                <p className="section-subtitle">Upload your deliverables for {job.title}</p>
            </div>

            <div style={{ maxWidth: '600px', margin: '0 auto', background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-secondary)' }}>
                <form onSubmit={handleSubmit}>
                    <div className="form-group" style={{ flexDirection: 'column', maxWidth: '100%' }}>
                        <label style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Upload Deliverables</label>
                        <input
                            type="file"
                            className="form-input"
                            onChange={handleFileChange}
                            required
                        />
                    </div>

                    <div className="form-group" style={{ flexDirection: 'column', maxWidth: '100%' }}>
                        <label style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Notes (Optional)</label>
                        <textarea
                            className="form-input"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows="4"
                            placeholder="Add any comments for the client..."
                            style={{ resize: 'vertical' }}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}
                        disabled={loading || uploading}
                    >
                        {loading || uploading ? 'Submitting...' : 'Submit Work'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SubmitWork;
