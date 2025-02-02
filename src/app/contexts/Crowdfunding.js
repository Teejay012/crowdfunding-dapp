"use client";
import React, { createContext, useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

// INTERNAL IMPORTS
import { CrowdfundingAddress, crowdfundingABI } from "./constants";

// FETCHING SMART CONTRACT
const fetchContract = (signerOrProvider) => {
  return new ethers.Contract(CrowdfundingAddress, crowdfundingABI, signerOrProvider);
};

const CrowdfundingContext = createContext();


const CrowdfundingProvider = ({ children }) => {
  const titleData = "Crowd Funding Contract";

  const [currentAccount, setCurrentAccount] = useState("");

  const createCampaign = async (campaign) => {
    try {
      const { title, description, amount, deadline } = campaign;
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
  
      const parsedAmount = ethers.utils.parseUnits(amount, 18);
      const parsedDeadline = new Date(deadline).getTime();
  
      console.log("Inputs to contract:", {
        currentAccount,
        title,
        description,
        amount: parsedAmount.toString(),
        deadline: parsedDeadline,
      });
  
      const transaction = await contract.createCampaign(
        currentAccount,
        title,
        description,
        parsedAmount.toString(),
        parsedDeadline
      );
  
      // await transaction.wait();
      // console.log("Transaction successful:", transaction);

      const receipt = await transaction.wait();
      console.log("Transaction receipt:", receipt);

      // Return transaction hash or any relevant data
      return receipt;
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };
  


  // Get all campaigns
  const getCampaigns = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/VQGi3odz5WT4bikDWFyylSrRmBG0Zm1M");
      const contract = fetchContract(provider);

      const campaigns = await contract.getAllCampaigns();

      // Parse campaigns data
      const parsedCampaigns = campaigns.map((campaign, i) => ({
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: ethers.utils.formatEther(campaign.target.toString()),
        deadline: campaign.deadline.toNumber(),
        amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
        pId: i,
      }));

      return parsedCampaigns;
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    }
  };


  // Get campaigns created by the current user
  const getUserCampaigns = async () => {
    try {
        const provider = new ethers.providers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/VQGi3odz5WT4bikDWFyylSrRmBG0Zm1M");
        const contract = fetchContract(provider);

        const allCampaigns = await contract.getAllCampaigns();
        console.log("All campaigns:", allCampaigns);

        const accounts = await window.ethereum.request({ method: "eth_accounts" });

        if (!accounts || accounts.length === 0) {
            console.error("No accounts found. Please connect your wallet.");
            return [];
        }
        
        const currentUser = accounts[0].toLowerCase();

        const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner.toLowerCase() === currentUser);

        const userData = filteredCampaigns.map((campaign, i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
            pId: i,
        }));

        return userData;
    } catch (error) {
        console.error("Error fetching user campaigns:", error);
    }
  };


  const donateToCampaign = async (pId, amount) => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const transaction = await contract.donateToCampaign(pId, {
        value: ethers.utils.parseEther(amount), // Parse donation amount to wei
      });

      await transaction.wait();
      console.log("Donation successful:", transaction);
      location.reload();
      return transaction;
    } catch (error) {
      console.error("Donation failed:", error);
    }
  };


  // Get all donations for a specific campaign
  const getDonations = async (pId) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/VQGi3odz5WT4bikDWFyylSrRmBG0Zm1M");
      const contract = fetchContract(provider);
  
      const donations = await contract.getCampaignDonators(pId);
      
      if (!donations || donations[0].length !== donations[1].length) {
        throw new Error("Mismatch in the number of donators and donations.");
      }
  
      const numberOfDonations = donations[0].length;
      const parsedDonations = [];
  
      for (let i = 0; i < numberOfDonations; i++) {
        parsedDonations.push({
          donator: donations[0][i],  // Single donator address
          donation: ethers.utils.formatEther(donations[1][i].toString()), // Format donation amount
        });
      }
  
      return parsedDonations;
    } catch (error) {
      console.error("Error fetching donations:", error);
    }
  };
  



  // Check if the wallet is connected
  const checkIfWalletIsConnected = async () => {
    try {
      if (!window.ethereum) return console.log("Please install Metamask");

      const accounts = await window.ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        console.log("Wallet connected:", accounts[0]);
      } else {
        console.log("No wallet found");
      }
    } catch (error) {
      console.error("Error checking wallet connection:", error);
    }
  };


  // Connect the wallet
  const connectWallet = async () => {
    try {
      if (!window.ethereum) return console.log("Please install Metamask");

      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setCurrentAccount(accounts[0]);
      console.log("Wallet connected:", accounts[0]);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  // Automatically check wallet connection on load
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const getChainId = async () => {
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    console.log("Connected chain ID:", parseInt(chainId, 16));
  };
  
  getChainId();

  const listenToEvents = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = fetchContract(provider);
  
    contract.on("CampaignCreated", (id, title, target, deadline) => {
      console.log("New campaign created:", { id, title, target, deadline });
    });
  };

  const fetchPastCampaigns = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = fetchContract(provider);
  
    const events = await contract.queryFilter("CampaignCreated"); // Fetch all logs
    console.log("Past Campaigns Created:", events);
  };
  
  useEffect(() => {
    listenToEvents();
    fetchPastCampaigns()
  }, []);


  return (
    <CrowdfundingContext.Provider
      value={{
        titleData,
        currentAccount,
        createCampaign,
        getCampaigns,
        getUserCampaigns,
        donateToCampaign,
        getDonations,
        connectWallet,
      }}
    >
      {children}
    </CrowdfundingContext.Provider>
  );
}

export { CrowdfundingProvider, CrowdfundingContext };