// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract CharityDonations is Ownable {
    mapping(address => bool) public isCharity;
    mapping(address => uint256) public totalDonatedTo;
    mapping(address => uint256) public totalDonatedBy;

    event DonationReceived(address indexed donor, address indexed charity, uint256 amount);

    constructor(address[] memory init) {
        for (uint256 i = 0; i < init.length; i++) {
            isCharity[init[i]] = true;
        }
    }

    function donate(address charity) external payable {
        require(isCharity[charity], "Not a charity");
        totalDonatedTo[charity] += msg.value;
        totalDonatedBy[msg.sender] += msg.value;
        emit DonationReceived(msg.sender, charity, msg.value);
    }

    function addCharity(address c) external onlyOwner {
        isCharity[c] = true;
    }

    function removeCharity(address c) external onlyOwner {
        isCharity[c] = false;
    }

    receive() external payable {
        revert("Use donate() function");
    }
}
