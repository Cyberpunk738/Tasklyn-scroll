// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./JobNFT.sol";

/**
 * @title TasklynEscrow
 * @dev Handles secure payments for freelance tasks on Scroll.
 * Flow: Client Post -> Deposit -> Work -> Release -> Freelancer Paid.
 */
contract TasklynEscrow is ReentrancyGuard {
    
    enum State { IDLE, DEPOSITED, COMPLETED, DISPUTED }

    struct Job {
        uint256 id;
        address payable client;
        address payable freelancer;
        uint256 amount;
        State state;
    }

    mapping(uint256 => Job) public jobs;
    uint256 public jobCount;

    event JobCreated(uint256 indexed jobId, address client, uint256 amount);
    event JobStarted(uint256 indexed jobId, address freelancer);
    event JobCompleted(uint256 indexed jobId);
    event FundsReleased(uint256 indexed jobId, address freelancer, uint256 amount);

    // Modifier to check if caller is the client of the job
    modifier onlyClient(uint256 _jobId) {
        require(msg.sender == jobs[_jobId].client, "Only client can call this");
        _;
    }

    // 1. Client creates a job and deposits ETH
    function createJob() external payable nonReentrant {
        require(msg.value > 0, "Budget must be greater than 0");
        
        jobCount++;
        jobs[jobCount] = Job({
            id: jobCount,
            client: payable(msg.sender),
            freelancer: payable(address(0)),
            amount: msg.value,
            state: State.DEPOSITED
        });

        emit JobCreated(jobCount, msg.sender, msg.value);
    }

    // 2. Freelancer accepts the job (Client must approve in a real app, simplified here)
    function acceptJob(uint256 _jobId) external {
        Job storage job = jobs[_jobId];
        require(job.state == State.DEPOSITED, "Job not available");
        require(job.freelancer == address(0), "Job already taken"); // Simple FCFS for demo
        
        job.freelancer = payable(msg.sender);
        emit JobStarted(_jobId, msg.sender);
    }

    // 3. Client checks work and releases funds
    function releaseFunds(uint256 _jobId) external onlyClient(_jobId) nonReentrant {
        Job storage job = jobs[_jobId];
        require(job.state == State.DEPOSITED, "Funds not deposited or already released");
        require(job.freelancer != address(0), "No freelancer assigned");

        job.state = State.COMPLETED;
        
        // Transfer funds to freelancer
        (bool success, ) = job.freelancer.call{value: job.amount}("");
        require(success, "Transfer failed");

        emit FundsReleased(_jobId, job.freelancer, job.amount);
    }

    // 4. In case of dispute (Refund for demo purposes)
    function refundClient(uint256 _jobId) external onlyClient(_jobId) nonReentrant {
        Job storage job = jobs[_jobId];
        require(job.state == State.DEPOSITED, "Invalid state");
        // In reality, this would require arbitration or timeout
        
        job.state = State.COMPLETED; // Close it
        
        (bool success, ) = job.client.call{value: job.amount}("");
        require(success, "Refund failed");
    }
}
