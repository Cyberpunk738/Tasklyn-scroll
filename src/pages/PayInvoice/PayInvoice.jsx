import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { useWeb3 } from '../../context/Web3Context';
import './PayInvoice.css';

const PayInvoice = () => {
    const { id } = useParams();
    const { invoices, payInvoice } = useStore();
    const { connectWallet, account } = useWeb3();

    const [invoice, setInvoice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        if (invoices.length > 0) {
            const foundInvoice = invoices.find(inv => inv.id === id);
            setInvoice(foundInvoice);
            setLoading(false);
        } else {
            // If invoices empty, might be initialization, or actually empty.
            // Since it's localStorage sync, it should be fine. 
            // But if refreshing on this page, StoreContext initializes from localstorage.
            const foundInvoice = invoices.find(inv => inv.id === id);
            setInvoice(foundInvoice);
            setLoading(false);
        }
    }, [id, invoices]);

    const handlePayment = async () => {
        if (!window.ethereum) return alert("Please install Metamask");

        try {
            let payer = account;
            if (!payer) {
                const accounts = await connectWallet();
                if (!accounts) return; // User cancelled or failed
                payer = accounts[0];
            }

            setProcessing(true);

            // Simulate Payment Transaction
            await window.ethereum.request({
                method: 'personal_sign',
                params: [`Pay Invoice #${invoice.id}\nAmount: ${invoice.amount} ${invoice.currency}\nTo: ${invoice.creator}`, payer]
            });

            payInvoice(invoice.id, '0xMockTxHash');

            setProcessing(false);
            alert("Payment Successful!");

        } catch (err) {
            console.error(err);
            setProcessing(false);
            alert("Payment Cancelled");
        }
    };

    if (loading) return <div className="pay-invoice-container invoice-loading">Loading Invoice...</div>;
    if (!invoice) return <div className="pay-invoice-container invoice-loading">Invoice Not Found</div>;

    const isPaid = invoice.status === 'PAID';

    return (
        <div className="pay-invoice-container">
            <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>

                <div style={{ marginBottom: '2rem' }}>
                    <span
                        className="feature-badge"
                        style={{ background: isPaid ? 'var(--success-color)' : 'var(--primary)' }}
                    >
                        {invoice.status}
                    </span>
                </div>

                <h1 className="invoice-amount-header">
                    <span>{invoice.amount}</span> <span className="invoice-currency">{invoice.currency}</span>
                </h1>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                    Due to <span className="invoice-creator">
                        {invoice.creator ? `${invoice.creator.substring(0, 6)}...${invoice.creator.substring(38)}` : 'Unknown'}
                    </span>
                </p>

                <div className="invoice-description-box">
                    <label className="invoice-label">For Service</label>
                    <p className="invoice-description">{invoice.description}</p>
                </div>

                {!isPaid ? (
                    <button
                        onClick={handlePayment}
                        className="btn btn-primary btn-large"
                        style={{ width: '100%', justifyContent: 'center' }}
                        disabled={processing}
                    >
                        <i className="fa-brands fa-ethereum"></i> {processing ? 'Processing Payment...' : 'Pay on Scroll'}
                    </button>
                ) : (
                    <div className="payment-success-area">
                        <div className="success-message">
                            <i className="fa-solid fa-circle-check"></i> Payment Confirmed
                        </div>
                        <button
                            className="btn btn-outline"
                            style={{ width: '100%', justifyContent: 'center' }}
                            onClick={() => window.print()}
                        >
                            <i className="fa-solid fa-receipt"></i> Download Receipt
                        </button>
                    </div>
                )}
            </div>

            {/* Hidden Receipt for Printing */}
            <div id="printable-receipt">
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <img src="/assets/task.png" alt="Tasklyn" style={{ height: '50px', filter: 'invert(1)' }} />
                    <h1>RECEIPT</h1>
                </div>
                <div className="receipt-box">
                    <p style={{ marginBottom: '1rem' }}>
                        <strong>Transaction ID:</strong> <br /> {invoice.txHash || 'N/A'}
                    </p>
                    <div className="invoice-total">
                        <h2>PAID: {invoice.amount} {invoice.currency}</h2>
                    </div>
                    <div style={{ textAlign: 'left', marginBottom: '2rem' }}>
                        <p><strong>To:</strong> {invoice.creator}</p>
                        <p><strong>For:</strong> {invoice.description}</p>
                        <p><strong>Date:</strong> {invoice.paidAt ? new Date(invoice.paidAt).toLocaleDateString() : 'N/A'}</p>
                    </div>
                    <div style={{ marginTop: '2rem', fontSize: '0.8rem' }}>
                        Tasklyn - Crypto Invoice & Escrow
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PayInvoice;
