// Web3 Logic using Ethers.js

const connectButton = document.getElementById('connect-wallet');
const accountDisplay = document.getElementById('account-display');

async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            // 1. Force Network Switch to Scroll Sepolia
            await switchToScrollSepolia();

            // 2. Request account access
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];

            // Update UI
            updateUI(account);

            // Store in localStorage for persistence
            localStorage.setItem('connectedAccount', account);

        } catch (error) {
            console.error(error);
            alert('Failed to connect wallet. Please try again.');
        }
    } else {
        alert('Please install MetaMask to use this feature!');
        window.open('https://metamask.io/download.html', '_blank');
    }
}

async function switchToScrollSepolia() {
    const scrollChainId = '0x8274f'; // 534351 in hex
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: scrollChainId }],
        });
    } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainId: scrollChainId,
                            chainName: 'Scroll Sepolia Testnet',
                            rpcUrls: ['https://sepolia-rpc.scroll.io/'],
                            blockExplorerUrls: ['https://sepolia.scrollscan.com'],
                            nativeCurrency: {
                                name: 'ETH',
                                symbol: 'ETH',
                                decimals: 18
                            }
                        },
                    ],
                });
            } catch (addError) {
                console.error("Failed to add Scroll Network", addError);
            }
        }
    }
}

function updateUI(account) {
    if (!connectButton) return;

    // Format address: 0x123...5678
    const shortAddress = `${account.substring(0, 5)}...${account.substring(account.length - 4)}`;

    // Simulate RainbowKit's specific look (Icon + Address)
    connectButton.innerHTML = `
    <div style="display: flex; align-items: center; gap: 8px;">
        <div style="width: 24px; height: 24px; background: #DA6C24; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
             <!-- Simplified wallet icon or placeholder -->
            <i class="fa-solid fa-user" style="font-size: 12px; color: white;"></i>
        </div>
        <span style="font-weight: 700;">${shortAddress}</span>
    </div>
  `;
}

// Check for existing connection on load
window.addEventListener('load', async () => {
    const savedAccount = localStorage.getItem('connectedAccount');
    if (savedAccount) {
        // Verify if still connected
        try {
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            if (accounts.length > 0 && accounts[0] === savedAccount) {
                updateUI(savedAccount);
            } else {
                localStorage.removeItem('connectedAccount');
            }
        } catch (err) {
            console.error('Error verifying account:', err);
        }
    }
});

// Event Listeners
if (connectButton) {
    connectButton.addEventListener('click', () => {
        const connected = localStorage.getItem('connectedAccount');
        if (connected) {
            if (confirm("Disconnect wallet?")) {
                localStorage.removeItem('connectedAccount');
                window.location.reload();
            }
        } else {
            connectWallet();
        }
    });
}

// Handle account changes
if (window.ethereum) {
    window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
            updateUI(accounts[0]);
            localStorage.setItem('connectedAccount', accounts[0]);
        } else {
            // Disconnected
            localStorage.removeItem('connectedAccount');
            window.location.reload();
        }
    });
}
