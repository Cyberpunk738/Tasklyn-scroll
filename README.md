# Tasklyn | The Future of Work on Scroll 📜

> **DeFi-Powered Freelance Marketplace built for the Scroll Hackathon 2025.**
> Zero Middlemen. 100% On-Chain Trust. Instant Payments.

![Tasklyn Banner](src/assets/task.png)

## 💡 The Vision

The traditional gig economy is broken. Platforms like **Upwork** and **Fiverr** charge exorbitant fees (up to 20%), settle payments slowly, and lack transparency.

**Tasklyn** reclaims the future of work by building a **fully decentralized marketplace** on the **Scroll Network**. We leverage the security of Ethereum Layer 2 and the speed of modern React to provide:
*   **Zero Platform Fees**: Peer-to-Peer payments means you keep what you earn.
*   **Instant Settlement**: Smart Contract Escrow releases funds immediately upon approval.
*   **Ownership**: Your reputation is an on-chain NFT, not a database entry.

---

## 🚀 Key Features

### 1. 🧾 Instant Crypto Invoice Maker (Hackathon Special)
We realized that freelancers don't just work on platforms—they have clients everywhere. Tasklyn features a powerful **standalone Invoice Maker** that bridges Web2 and Web3.

*   **Generate & Go**: Create a professional invoice in seconds (ETH or USDC).
*   **Universal Payment Link**: Share a simple URL with any client (via Email, WhatsApp, Discord).
*   **QR Code Integrated**: Invoices auto-generate a scannable QR code for instant mobile wallet payments.
*   **Live Receipt**: Upon payment on the Scroll network, a downloadable receipt is instantly generated with the transaction hash proof.

### 2. 🏆 NFT Reputation System
Every completed job on Tasklyn isn't just a transaction—it's a verifiable credential.
*   **Proof of Work**: When a job is completed and the escrow is released, a **Job Completion NFT** is minted to the freelancer's wallet.
*   **On-Chain CV**: Your portfolio becomes an immutable history of delivered work, impossible to fake and fully portable.

### 3. 🛡️ Secure Decentralized Escrow
*   **Trustless**: Clients deposit funds into a smart contract, not a bank account.
*   **Milestone-Based**: Funds are locked until work is submitted and approved.
*   **Dispute Resolution**: (Roadmap) Community arbitration logic.

---

## 🏗️ Architecture & Technology

Tasklyn is built on a modern Web3 stack designed for speed, security, and user experience.

### Frontend
*   **Framework**: React 19 + Vite (Fast, Component-Based)
*   **Routing**: React Router DOM (SPA Navigation)
*   **State Management**: React Context API (`Web3Context` & `StoreContext`)
*   **Styling**: Custom CSS Glassmorphism Design System (No Libraries)

### Smart Contracts (Scroll Sepolia)
*   **`JobNFT.sol`**: ERC-721 implementation for storing job metadata and ownership.
*   **`Escrow.sol`**: Logic for holding and releasing funds based on logic milestones.

*(Note: For this hackathon demo, contracts are simulated via `StoreContext` to ensure a smooth, gas-free judging experience while demonstrating the exact intended on-chain flow.)*

---

## 🛠️ How to Demo

We have optimized the demo for ease of judging.

1.  **Clone & Run**:
    ```bash
    git clone https://github.com/Cyberpunk738/Tasklyn-scroll.git
    cd tasklyn_site
    npm install
    npm run dev
    ```
2.  **Connect Wallet**:
    *   Click "Connect Wallet" in the top right.
    *   The app will automatically request to switch to **Scroll Sepolia**.
3.  **Test the Marketplace**:
    *   **Post/Bid**: Post a job as a client, switch mechanism to "Selling", and place a bid.
    *   **Escrow**: Accept the bid to lock funds (simulated).
4.  **Test the Invoice Maker (Star Feature)**:
    *   Switch to "Selling" mode -> Click "Create Invoice".
    *   Enter amount (e.g., 0.1 ETH).
    *   Copy the generated link.
    *   Open the link (simulating the client) -> Click "Pay on Scroll".
    *   **Result**: Watch the status update instantly and print your receipt.

---

## 🏆 Why Scroll?

We chose **Scroll** because it offers the perfect balance of **EVM compatibility** and **low transaction costs**. For a freelance marketplace, micro-transactions (milestones, tips) usage is high, making Mainnet Ethereum prohibitively expensive. Scroll’s zkEVM ensures security without the cost.

---

*Built with ❤️ for the Scroll Hackathon 2025.*
