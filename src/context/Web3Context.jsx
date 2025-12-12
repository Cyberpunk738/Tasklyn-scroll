import React, { createContext, useState, useEffect, useContext } from 'react';

const Web3Context = createContext();

export const useWeb3 = () => useContext(Web3Context);

export const Web3Provider = ({ children }) => {
    const [account, setAccount] = useState(null);

    useEffect(() => {
        const checkConnection = async () => {
            const savedAccount = localStorage.getItem('connectedAccount');
            if (savedAccount && window.ethereum) {
                try {
                    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                    if (accounts.length > 0 && accounts[0].toLowerCase() === savedAccount.toLowerCase()) {
                        setAccount(accounts[0]);
                    } else {
                        localStorage.removeItem('connectedAccount');
                        setAccount(null);
                    }
                } catch (err) {
                    console.error('Error verifying account:', err);
                }
            }
        };

        checkConnection();

        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                    localStorage.setItem('connectedAccount', accounts[0]);
                } else {
                    setAccount(null);
                    localStorage.removeItem('connectedAccount');
                }
            });
        }
    }, []);

    const switchToScrollSepolia = async () => {
        const scrollChainId = '0x8274f'; // 534351
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: scrollChainId }],
            });
        } catch (switchError) {
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
                    throw addError;
                }
            } else {
                throw switchError;
            }
        }
    };

    const connectWallet = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                // Attempt to switch chain, but don't block connection if it fails (user can switch manually)
                try {
                    await switchToScrollSepolia();
                } catch (chainError) {
                    console.error("Chain switch failed:", chainError);
                }

                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const newAccount = accounts[0];
                setAccount(newAccount);
                localStorage.setItem('connectedAccount', newAccount);
                return newAccount;
            } catch (error) {
                console.error("Wallet connection error details:", error);
                // Safe check for error message to avoid [object Object] alert
                const errMsg = error.message || JSON.stringify(error) || "Unknown error";
                alert(`Failed to connect wallet: ${errMsg}`);
                // Don't re-throw to avoid "Uncaught (in promise)" if caller doesn't catch
                return null;
            }
        } else {
            alert('Please install MetaMask!');
            window.open('https://metamask.io/download.html', '_blank');
            return null;
        }
    };

    const disconnectWallet = () => {
        setAccount(null);
        localStorage.removeItem('connectedAccount');
    };

    return (
        <Web3Context.Provider value={{ account, connectWallet, disconnectWallet }}>
            {children}
        </Web3Context.Provider>
    );
};
