const hre = require("hardhat");

async function main() {
  const charityId = 2; // Change to the ID you want to activate

  const [owner] = await hre.ethers.getSigners();
  const contractAddress = "0x48454604b541d73284Da5F1274b3Cc117E8b9747"; // replace with your deployed address
  const CharityManager = await hre.ethers.getContractFactory("CharityManager");
  const contract = CharityManager.attach(contractAddress);

  const tx = await contract.setCharityStatus(charityId, true);
  await tx.wait();

  console.log(`✅ Charity ID ${charityId} is now active.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
