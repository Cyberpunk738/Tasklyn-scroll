// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IJobNFT {
    function mint(address to, string memory uri) external returns (uint256);
}

contract Escrow {
    struct Job {
        uint256 id;
        address client;
        address freelancer;
        uint256 amount;
        bool isCompleted;
        bool isPaid;
        string ipfsHash;
    }

    mapping(uint256 => Job) public jobs;
    IJobNFT public jobNFT;

    event JobCreated(uint256 jobId, address client, uint256 amount);
    event JobAccepted(uint256 jobId, address freelancer);
    event WorkSubmitted(uint256 jobId, string ipfsHash);
    event PaymentReleased(uint256 jobId, address freelancer, uint256 amount);

    constructor(address _jobNFT) {
        jobNFT = IJobNFT(_jobNFT);
    }

    function createJob(uint256 jobId) external payable {
        require(msg.value > 0, "Amount must be greater than 0");
        require(jobs[jobId].client == address(0), "Job already exists");

        jobs[jobId] = Job({
            id: jobId,
            client: msg.sender,
            freelancer: address(0),
            amount: msg.value,
            isCompleted: false,
            isPaid: false,
            ipfsHash: ""
        });

        emit JobCreated(jobId, msg.sender, msg.value);
    }

    function acceptJob(uint256 jobId) external {
        Job storage job = jobs[jobId];
        require(job.client != address(0), "Job does not exist");
        require(job.freelancer == address(0), "Job already accepted");
        require(msg.sender != job.client, "Client cannot accept own job");

        job.freelancer = msg.sender;
        // Mint NFT to freelancer
        // In a real app, we'd construct a proper metadata URI
        jobNFT.mint(msg.sender, "ipfs://placeholder");

        emit JobAccepted(jobId, msg.sender);
    }

    function submitWork(uint256 jobId, string memory ipfsHash) external {
        Job storage job = jobs[jobId];
        require(msg.sender == job.freelancer, "Only freelancer can submit work");
        require(!job.isCompleted, "Job already completed");

        job.ipfsHash = ipfsHash;
        emit WorkSubmitted(jobId, ipfsHash);
    }

    function releasePayment(uint256 jobId) external {
        Job storage job = jobs[jobId];
        require(msg.sender == job.client, "Only client can release payment");
        require(!job.isPaid, "Payment already released");
        
        job.isCompleted = true;
        job.isPaid = true;

        payable(job.freelancer).transfer(job.amount);

        emit PaymentReleased(jobId, job.freelancer, job.amount);
    }
}
