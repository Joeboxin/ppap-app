// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract CharityManager is Ownable, ReentrancyGuard {
    struct Cause {
        string name;
        string description;
        uint256[] charityIds;
    }

    struct Charity {
        string name;
        string description;
        string website;
        string logoUrl;
        address wallet;
        uint256 donationCount;
        uint256 highestDonation;
        uint256 totalDonations;
        uint256[] causeIds;
        bool isActive;
    }

    // Mapping from charity ID to Charity struct
    mapping(uint256 => Charity) public charities;
    // Mapping from cause ID to Cause struct
    mapping(uint256 => Cause) public causes;
    // Mapping from user address to array of charity IDs they've donated to
    mapping(address => uint256[]) public userDonations;
    // Total number of charities and causes
    uint256 public charityCount;
    uint256 public causeCount;

    // Events
    event CharityCreated(uint256 indexed charityId, string name, address wallet);
    event CauseCreated(uint256 indexed causeId, string name);
    event DonationReceived(uint256 indexed charityId, address donor, uint256 amount);
    event CharityStatusChanged(uint256 indexed charityId, bool isActive);
    event CharityAddedToCause(uint256 indexed charityId, uint256 indexed causeId);

    constructor() {
        charityCount = 0;
        causeCount = 0;
    }

    function createCause(
        string memory _name,
        string memory _description
    ) external onlyOwner {
        uint256 causeId = causeCount;   
        causes[causeId] = Cause({
            name: _name,
            description: _description,
            charityIds: new uint256[](0)
        });
        causeCount++;
        emit CauseCreated(causeId, _name);
    }

    function createCharity(
        string memory _name,
        string memory _description,
        string memory _website,
        string memory _logoUrl,
        address _wallet,
        uint256[] memory _causeIds
    ) external onlyOwner {
        require(_causeIds.length > 0, "Charity must belong to at least one cause");
        
        uint256 charityId = charityCount;
    charities[charityId] = Charity({
        name: _name,
        description: _description,
        website: _website,
        logoUrl: _logoUrl,
        wallet: _wallet,
        donationCount: 0,
        highestDonation: 0,
        totalDonations: 0,
        causeIds: _causeIds,
        isActive: true
    });

        
        // Add charity to each cause
        for(uint256 i = 0; i < _causeIds.length; i++) {
            require(_causeIds[i] < causeCount, "Invalid cause ID");
            causes[_causeIds[i]].charityIds.push(charityId);
            emit CharityAddedToCause(charityId, _causeIds[i]);
        }
        
        charityCount++;
        emit CharityCreated(charityId, _name, _wallet);
    }

    function donate(uint256 _charityId) external payable nonReentrant {
        require(_charityId < charityCount, "Invalid charity ID");
        require(charities[_charityId].isActive, "Charity is not active");
        require(msg.value > 0, "Donation amount must be greater than 0");

        Charity storage charity = charities[_charityId];
        charity.totalDonations += msg.value;
        charity.donationCount += 1;
        if (msg.value > charity.highestDonation) {
            charity.highestDonation = msg.value;
        }
        userDonations[msg.sender].push(_charityId);

        // Transfer funds to charity wallet
        (bool success, ) = charity.wallet.call{value: msg.value}("");
        require(success, "Transfer failed");

        emit DonationReceived(_charityId, msg.sender, msg.value);
    }

    function setCharityStatus(uint256 _charityId, bool _isActive) external onlyOwner {
        require(_charityId < charityCount, "Invalid charity ID");
        charities[_charityId].isActive = _isActive;
        emit CharityStatusChanged(_charityId, _isActive);
    }

    function getCharity(uint256 _charityId) external view returns (
        string memory name,
        string memory description,
        string memory website,
        string memory logoUrl,
        address wallet,
        uint256 totalDonations,
        uint256[] memory causeIds,
        bool isActive
    ) {
        require(_charityId < charityCount, "Invalid charity ID");
        Charity memory charity = charities[_charityId];
        return (
            charity.name,
            charity.description,
            charity.website,
            charity.logoUrl,
            charity.wallet,
            charity.totalDonations,
            charity.causeIds,
            charity.isActive
        );
    }

    function getCause(uint256 _causeId) external view returns (
        string memory name,
        string memory description,
        uint256[] memory charityIds
    ) {
        require(_causeId < causeCount, "Invalid cause ID");
        Cause memory cause = causes[_causeId];
        return (
            cause.name,
            cause.description,
            cause.charityIds
        );
    }

    function getUserDonations(address _user) external view returns (uint256[] memory) {
        return userDonations[_user];
    }

    function getCharitiesByCause(uint256 _causeId) external view returns (uint256[] memory) {
        require(_causeId < causeCount, "Invalid cause ID");
        return causes[_causeId].charityIds;
    }
}
