# Tasklyn | Decentralized Freelance Marketplace on Scroll

![Tasklyn Banner](assets/task.png)

**Tasklyn** is a next-generation decentralized freelance marketplace built on the **Scroll Network**. It empowers freelancers and clients to connect, collaborate, and transact securely using smart contract-based escrows, eliminating intermediaries and ensuring fair payment release.

## 🚀 Features

### For Clients
*   **Post Jobs**: Create detailed job listings with budget and deadlines.
*   **Order Gigs**: Browse and purchase predefined services (Gigs) from top talent.
*   **Secure Escrow**: Funds are locked in a smart contract (simulated) and only released upon successful work delivery.
*   **Review Work**: Verify submissions via IPFS (simulated) before unlocking payments.

### For Freelancers
*   **Create Gigs**: Showcase services with rich media and clear pricing.
*   **Bid on Jobs**: Submit proposals for open job listings.
*   **Get Paid in Crypto**: Receive payments directly in ETH/USDC without platform hold periods.
*   **Build Reputation**: On-chain reputation system (simulated ratings) based on completed work.

### Core Technology
*   **Blockchain**: Scroll Network (Layer 2 for Ethereum).
*   **Storage**: IPFS (Simulated for Hackathon Demo).
*   **Frontend**: Vanilla HTML/CSS/JS for maximum performance and compatibility.
*   **State Management**: LocalStorage-based "Mock Blockchain" for persistent demo state without testnet friction.

## 🛠️ Tech Stack

*   **HTML5 / CSS3**: Modern, responsive layout with CSS Variables and Flexbox/Grid.
*   **JavaScript (ES6+)**: Core logic for state management and UI interactions.
*   **Ethers.js**: Web3 wallet connection and network interaction.
*   **FontAwesome**: Iconography.
*   **Google Fonts**: Inter & JetBrains Mono typography.

## 📦 Installation & Usage

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/yourusername/tasklyn_site.git
    cd tasklyn_site
    ```

2.  **Run Locally**:
    *   Simply open `index.html` in your browser.
    *   OR serve with VS Code Live Server or python:
        ```bash
        python -m http.server 8000
        ```

3.  **Demo Flow**:
    *   **Connect Wallet**: Click "Connect Wallet" (requires MetaMask).
    *   **Switch Modes**: Toggle between "Buying" (Client) and "Selling" (Freelancer) modes in the Navbar.
    *   **Post/Order**: Try posting a job or ordering a gig to see the escrow logic in action.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

*Built with ❤️ for the Scroll Hackathon 2025.*
