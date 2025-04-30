// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";

contract CharityDonations is Ownable {
  mapping(address=>bool) public isCharity;
  mapping(address=>uint) public totalDonatedTo;
  mapping(address=>uint) public totalDonatedBy;
  event DonationReceived(address donor, address charity, uint amount);

  constructor(address[] memory init) {
    for(uint i; i<init.length; i++){
      isCharity[init[i]] = true;
    }
  }

  function donate(address charity) external payable {
    require(isCharity[charity], "Not a charity");      // read #1
    uint prev = totalDonatedTo[charity];               // read #2
    totalDonatedTo[charity] = prev + msg.value;        // write #1
    totalDonatedBy[msg.sender] += msg.value;           // write #2
    emit DonationReceived(msg.sender, charity, msg.value);
  }

  function addCharity(address c) external onlyOwner {
    isCharity[c] = true;
  }
  function removeCharity(address c) external onlyOwner {
    isCharity[c] = false;
  }
}
