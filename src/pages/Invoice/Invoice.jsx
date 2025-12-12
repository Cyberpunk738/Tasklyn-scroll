import { useState, useRef } from 'react';
import { useStore } from '../../context/StoreContext';
import { useWeb3 } from '../../context/Web3Context';
import { QRCodeCanvas } from 'qrcode.react';
import './Invoice.css';

const Invoice = () => {
    const { account } = useWeb3();
    const { createInvoice } = useStore();

    const [formData, setFormData] = useState({
        clientEmail: '',
        description: '',
        amount: '',
        currency: 'ETH'
    });

    const [createdInvoice, setCreatedInvoice] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCurrencyChange = (currency) => {
        setFormData(prev => ({
            ...prev,
            currency
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const invoice = createInvoice({
            ...formData,
            creator: account
        });
        setCreatedInvoice(invoice);
    };

    const copyLink = () => {
        const link = `${window.location.origin}/pay/${createdInvoice.id}`;
        navigator.clipboard.writeText(link);
        alert("Link copied to clipboard!");
    };

    const printInvoice = () => {
        window.print();
    };

    const resetForm = () => {
        setFormData({
            clientEmail: '',
            description: '',
            amount: '',
            currency: 'ETH'
        });
        setCreatedInvoice(null);
    };

    // Calculate preview data
    const previewData = {
        amount: formData.amount || '0.00',
        currency: formData.currency,
        client: formData.clientEmail || 'Client',
        description: formData.description || 'Services Rendered',
        creator: account ? `${account.substring(0, 6)}...${account.substring(38)}` : 'You'
    };

    if (!account) {
        return (
            <div className="container" style={{ marginTop: '6rem', textAlign: 'center' }}>
                <h2>Please connect your wallet to create invoices.</h2>
            </div>
        );
    }

    return (
        <div className="invoice-container">
            <div className="container split-layout">
                {/* Form Section */}
                <div>
                    <div style={{ marginBottom: '2.5rem' }}>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>New Invoice</h1>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            Create a seamless crypto payment link for your clients.
                            Settlement happens instantly on the Scroll Network.
                        </p>
                    </div>

                    {!createdInvoice ? (
                        <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '2rem' }}>
                            <div className="form-group">
                                <label>Client Email / Name (Optional)</label>
                                <input
                                    type="text"
                                    name="clientEmail"
                                    value={formData.clientEmail}
                                    onChange={handleChange}
                                    className="styled-input"
                                    placeholder="e.g. Acme Corp or client@gmail.com"
                                />
                            </div>
                            <div className="form-group">
                                <label>Service Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="styled-input"
                                    rows="4"
                                    placeholder="e.g. Frontend Development for Landing Page"
                                    required
                                ></textarea>
                            </div>

                            <div className="form-group">
                                <label>Amount & Currency</label>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <input
                                        type="number"
                                        step="0.001"
                                        name="amount"
                                        value={formData.amount}
                                        onChange={handleChange}
                                        className="styled-input"
                                        placeholder="0.00"
                                        style={{ flex: 2 }}
                                        required
                                    />

                                    <div className="currency-toggle">
                                        <label
                                            className={`toggle-option ${formData.currency === 'ETH' ? 'active' : ''}`}
                                            onClick={() => handleCurrencyChange('ETH')}
                                        >
                                            <i className="fa-brands fa-ethereum"></i> ETH
                                        </label>
                                        <label
                                            className={`toggle-option ${formData.currency === 'USDC' ? 'active' : ''}`}
                                            onClick={() => handleCurrencyChange('USDC')}
                                        >
                                            <i className="fa-solid fa-dollar-sign"></i> USDC
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary btn-large"
                                style={{ width: '100%', marginTop: '2rem', justifyContent: 'center', fontWeight: 700 }}
                            >
                                <i className="fa-solid fa-link"></i> Generate Payment Link
                            </button>
                        </form>
                    ) : (
                        <div className="glass-panel result-area">
                            <div className="success-icon">
                                <i className="fa-solid fa-check" style={{ color: 'var(--success-color)', fontSize: '1.5rem' }}></i>
                            </div>
                            <h3 style={{ marginBottom: '0.5rem' }}>Invoice Ready!</h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                                Share this link or download the invoice.
                            </p>

                            <div className="share-link-box">
                                {`${window.location.origin}/pay/${createdInvoice.id}`}
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '1rem' }}>
                                <button className="btn btn-primary" onClick={copyLink}>
                                    <i className="fa-regular fa-copy"></i> Copy Link
                                </button>
                                <button className="btn btn-outline" onClick={printInvoice}>
                                    <i className="fa-solid fa-qrcode"></i> Print Invoice (QR)
                                </button>
                            </div>
                            <button
                                className="btn btn-ghost"
                                onClick={resetForm}
                                style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}
                            >
                                Create Another
                            </button>
                        </div>
                    )}
                </div>

                {/* Preview Section */}
                <div className="preview-card">
                    <div className="preview-header">
                        <img src="/assets/task.png" alt="Tasklyn" className="preview-logo" />
                        <div className="scroll-badge"><i className="fa-solid fa-scroll"></i> Scroll Network</div>
                    </div>

                    <div style={{ marginBottom: '3rem' }}>
                        <label style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>
                            Amount Due
                        </label>
                        <div className="amount-display">
                            <span>{previewData.amount}</span> <span className="currency-label">{previewData.currency}</span>
                        </div>
                    </div>

                    <div className="preview-meta">
                        <div className="meta-item">
                            <label>From</label>
                            <div>{previewData.creator}</div>
                        </div>
                        <div className="meta-item">
                            <label>To</label>
                            <div>{previewData.client}</div>
                        </div>
                        <div className="meta-item">
                            <label>For</label>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.5 }}>
                                {previewData.description}
                            </div>
                        </div>
                    </div>

                    <div style={{
                        marginTop: '3rem',
                        paddingTop: '1.5rem',
                        borderTop: '1px solid var(--border-secondary)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        color: 'var(--text-muted)',
                        fontSize: '0.85rem'
                    }}>
                        <span><i className="fa-solid fa-lock"></i> Secured by Escrow</span>
                        <span>Powered by Tasklyn</span>
                    </div>
                </div>
            </div>

            {/* Hidden Printable Area */}
            {createdInvoice && (
                <div className="printable-invoice">
                    <div className="invoice-header">
                        <img src="/assets/task.png" alt="Tasklyn" className="invoice-logo" />
                        <h1>INVOICE</h1>
                    </div>
                    <div className="invoice-box">
                        <div className="invoice-row">
                            <div>
                                <strong>From:</strong> <br /> <span>{account}</span>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <strong>Date:</strong> <br /> <span>{new Date(createdInvoice.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <strong>Bill To:</strong> <br /> <span>{createdInvoice.clientEmail || 'Valued Client'}</span>
                        </div>

                        <div className="invoice-total">
                            <h2 style={{ margin: 0 }}>
                                TOTAL DUE: <span>{createdInvoice.amount}</span> <span>{createdInvoice.currency}</span>
                            </h2>
                        </div>

                        <p><strong>Description:</strong> <br /> <span>{createdInvoice.description}</span></p>

                        <div className="qr-section">
                            <p>Scan to Pay via Scroll Network:</p>
                            <div style={{ display: 'inline-block', padding: '10px', border: '1px solid #ccc' }}>
                                <QRCodeCanvas
                                    value={`${window.location.origin}/pay/${createdInvoice.id}`}
                                    size={128}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Invoice;
