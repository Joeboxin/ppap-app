const hre = require("hardhat");

async function main() {
  const [owner] = await hre.ethers.getSigners();
  const CharityManager = await hre.ethers.getContractFactory("CharityManager");
  const charityManager = await CharityManager.deploy();
  await charityManager.deployed();

  console.log("CharityManager deployed to:", charityManager.address);

  // Create causes
  const causes = [
    {
      name: "Environmental Protection",
      description: "Supporting initiatives to protect and preserve our environment"
    },
    {
      name: "Education",
      description: "Promoting access to quality education for all"
    },
    {
      name: "Healthcare",
      description: "Improving healthcare access and medical research"
    }
  ];

  for (const cause of causes) {
    const tx = await charityManager.createCause(cause.name, cause.description);
    await tx.wait();
    console.log(`Created cause: ${cause.name}`);
  }

  // Create initial charities
  const charities = [
    {
      name: "Green Earth Foundation",
      description: "Dedicated to environmental conservation and sustainable practices",
      website: "https://greenearth.example",
      logoUrl: "https://greenearth.example/logo.png",
      wallet: "0x1234567890123456789012345678901234567890", // Replace with actual wallet
      causeIds: [0] // Environmental Protection
    },
    {
      name: "Education for All",
      description: "Providing educational resources to underprivileged communities",
      website: "https://educationforall.example",
      logoUrl: "https://educationforall.example/logo.png",
      wallet: "0x0987654321098765432109876543210987654321", // Replace with actual wallet
      causeIds: [1] // Education
    },
    {
      name: "Global Health Initiative",
      description: "Improving healthcare access worldwide",
      website: "https://globalhealth.example",
      logoUrl: "https://globalhealth.example/logo.png",
      wallet: "0xabcdef1234567890abcdef1234567890abcdef12", // Replace with actual wallet
      causeIds: [2] // Healthcare
    }
  ];

  for (const charity of charities) {
    const tx = await charityManager.createCharity(
      charity.name,
      charity.description,
      charity.website,
      charity.logoUrl,
      charity.wallet,
      charity.causeIds
    );
    await tx.wait();
    console.log(`Created charity: ${charity.name}`);
  }

  console.log("Initialization complete!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 