// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Crowdfunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => Campaign) public campaigns;
    uint256 public numberOfCampaigns = 0;

    event CampaignCreated(uint256 id, address owner, string title, uint256 target, uint256 deadline);
    event DonationReceived(uint256 id, address donator, uint256 amount);

    function createCampaign(address _owner, string memory _title, string memory _description, uint256 _target, uint256 _deadline) external {
        
        Campaign storage campaign = campaigns[numberOfCampaigns];

        require(_deadline > block.timestamp, "Deadline must be in the future");

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;

        emit CampaignCreated(numberOfCampaigns, msg.sender, _title, _target, _deadline);

        numberOfCampaigns++;
    }

    function donateToCampaign(uint256 _id) external payable {

        uint256 amount = msg.value;

        Campaign storage campaign = campaigns[_id];

        // require(block.timestamp < campaign.deadline, "Campaign has ended");
        require(amount > 0, "Donation must be greater than 0");

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        (bool sent,) = payable(campaign.owner).call{value: amount}("");

        if(sent){
            campaign.amountCollected = campaign.amountCollected + amount;
        }
        

        emit DonationReceived(_id, msg.sender, amount);
    }

    function getCampaignDonators(uint256 _id) public view returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getAllCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for (uint256 i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];

            allCampaigns[i] = item;
        }

        return allCampaigns;
    }

} 