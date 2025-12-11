import { useWriteContract, useReadContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import EscrowABI from '../contracts/EscrowABI.json'; // We need to generate this
import JobNFTABI from '../contracts/JobNFTABI.json'; // We need to generate this

// Placeholder addresses - User needs to update these after deployment
const ESCROW_ADDRESS = '0x0000000000000000000000000000000000000000';
const JOB_NFT_ADDRESS = '0x0000000000000000000000000000000000000000';

export const useContract = () => {
    const { writeContractAsync } = useWriteContract();

    const createJobOnChain = async (jobId, amount) => {
        return await writeContractAsync({
            address: ESCROW_ADDRESS,
            abi: EscrowABI,
            functionName: 'createJob',
            args: [jobId],
            value: parseEther(amount.toString()),
        });
    };

    const acceptJobOnChain = async (jobId) => {
        return await writeContractAsync({
            address: ESCROW_ADDRESS,
            abi: EscrowABI,
            functionName: 'acceptJob',
            args: [jobId],
        });
    };

    const submitWorkOnChain = async (jobId, ipfsHash) => {
        return await writeContractAsync({
            address: ESCROW_ADDRESS,
            abi: EscrowABI,
            functionName: 'submitWork',
            args: [jobId, ipfsHash],
        });
    };

    const releasePaymentOnChain = async (jobId) => {
        return await writeContractAsync({
            address: ESCROW_ADDRESS,
            abi: EscrowABI,
            functionName: 'releasePayment',
            args: [jobId],
        });
    };

    return {
        createJobOnChain,
        acceptJobOnChain,
        submitWorkOnChain,
        releasePaymentOnChain,
        ESCROW_ADDRESS,
        JOB_NFT_ADDRESS
    };
};
