# Tasklyn | The Future of Work on Scroll 📜

![Tasklyn Banner](assets/task.png)

> **DeFi-Powered Freelance Marketplace built for the Scroll Hackathon 2025.**
> Zero Middlemen. 100% On-Chain Trust. Instant Payments.

---

## 💡 The Vision

The traditional gig economy is broken. Platforms like **Upwork** and **Fiverr** charge exorbitant fees (up to 20%), hold payments for weeks, and can ban users arbitrarily. 

**Tasklyn** reclaims the future of work by building a **fully decentralized marketplace** on the **Scroll Network**. We leverage the security of Ethereum Layer 2 to provide:
*   **Zero Platform Fees**: Peer-to-Peer payments means you keep what you earn.
*   **Instant Settlement**: Smart Contract Escrow releases funds immediately upon approval.
*   **Ownership**: Your reputation is an on-chain NFT, not a database entry.

## 🏗️ Architecture & Technology

Tasklyn is built on a modern Web3 stack designed for speed, security, and user experience.

### 1. Smart Contracts (Scroll Sepolia)
*   **`JobNFT.sol` (ERC-721)**: Every job posting is minted as a unique NFT. This provides an immutable history of work specifications and ownership.
*   **`Escrow.sol`**: The core security layer.
    1.  **Deposit**: Client locks ETH/USDC into the contract.
    2.  **Work**: Freelancer submits deliverables (hashed via IPFS).
    3.  **Release**: Client approves, and funds are **instantly** transferred.

### 2. Frontend (User Experience)
We prioritized a **Web2-like experience** to bridge the gap for non-crypto natives.
*   **Wallet Integration**: Seamless connection with MetaMask (Scroll Sepolia).
*   **Dual Modes**: Switch instantly between "Buying" (Client) and "Selling" (Freelancer) interfaces.
*   **Simulation Layer**: For this hackathon demo, we use a robust `localStorage` simulation to demonstrate the **exact transactional flow** without requiring judges to hold Testnet ETH or wait for block confirmations.

## 🌟 Key Features

### For Clients (Buyers)
*   **Global Talent Pool**: Access skilled professionals without borders.
*   **Safe Payments**: Funds are only released when you are satisfied.
*   **Lower Costs**: No 20% marketplace markup means your budget goes further.

### For Freelancers (Sellers)
*   **Instant Pay**: liquidity is king. Get paid continuously as milestones are met.
*   **Censorship Resistance**: Your profile and gig history cannot be deleted.
*   **Crypto Invoicing**: Generate professional payment links for external clients and get paid in ETH/USDC instantly.
*   **Crypto Native**: Earn in ETH, USDC, or Stablecoins directly to your wallet.

## 🚀 How to Demo

We have optimized the demo for ease of judging.

1.  **Clone & Run**:
    ```bash
    git clone https://github.com/username/tasklyn_site.git
    cd tasklyn_site
    # Use any static server, e.g.
    python -m http.server 8000
    ```
2.  **Connect Wallet**:
    *   Click "Connect Wallet" in the top right.
    *   The app will automatically request to switch to **Scroll Sepolia**.
3.  **Test the Flow**:
    *   **Post a Job**: Go to "Post Job", fill the form, and sign the transaction.
    *   **Switch Mode**: Click "Switch to Selling" to see the Freelancer view.
    *   **Place a Bid**: Find your job and submit a proposal.
    *   **Accept & Pay**: Switch back to Client mode and accept the bid to lock funds in Escrow.
    *   **Create Invoice**: Use the "Invoice" button in the dashboard to generate a payment link, then pay it to test the instant receipt generation.

## 📂 Project Structure

```
tasklyn_site/
├── contracts/          # Solidity Smart Contracts
│   ├── Escrow.sol      # Payment logic
│   └── JobNFT.sol      # Job ownership token
├── assets/             # Images and Icons
├── css/                # Modern Glassmorphism Styles
├── js/                 # Web3 & App Logic
│   ├── web3.js         # Ethers.js integration
│   └── store.js        # Mock Blockchain State
└── index.html          # Entry point
```

## 🏆 Why Scroll?

We chose **Scroll** because it offers the perfect balance of **EVM compatibility** and **low transaction costs**. For a freelance marketplace, micro-transactions (milestones, tips) usage is high, making Mainnet Ethereum prohibitively expensive. Scroll’s zkEVM ensures security without the cost.

---

*Verified Smart Contracts & Frontend logic created for the Scroll Hackathon 2025.*
