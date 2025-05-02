const hre = require("hardhat");

async function main() {
  const CharityManager = await hre.ethers.getContractFactory("CharityManager");
  const charityManager = await CharityManager.deploy();

  await charityManager.deployed();

  console.log("CharityManager deployed to:", charityManager.address);
  
  // Wait for 5 block confirmations
  await charityManager.deployTransaction.wait(5);
  
  console.log("Verifying contract on BscScan...");
  try {
    await hre.run("verify:verify", {
      address: charityManager.address,
      constructorArguments: [],
    });
    console.log("Contract verified successfully!");
  } catch (error) {
    console.error("Verification failed:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 