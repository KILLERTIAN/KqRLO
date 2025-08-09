const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  
  console.log("Deploying ZKIdentityAdvanced contract with the account:", deployer.address);
  
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(balance), "ETH");
  
  // Deploy the advanced ZK Identity contract
  const ZKIdentityAdvanced = await hre.ethers.getContractFactory("ZKIdentityAdvanced");
  const zkIdentityAdvanced = await ZKIdentityAdvanced.deploy();
  
  await zkIdentityAdvanced.waitForDeployment();
  
  const contractAddress = await zkIdentityAdvanced.getAddress();
  console.log("ZKIdentityAdvanced deployed to:", contractAddress);
  
  // Set up initial verification keys (in production, these would be real zk-SNARK verification keys)
  console.log("Setting up verification keys...");
  
  const attributeTypes = [
    0, // AGE_OVER_18
    1, // AGE_OVER_21
    2, // NATIONALITY
    3, // EDUCATION_LEVEL
    4, // EMPLOYMENT_STATUS
    5, // CREDIT_SCORE_RANGE
    6  // CUSTOM
  ];
  
  for (let i = 0; i < attributeTypes.length; i++) {
    const vkHash = hre.ethers.keccak256(hre.ethers.toUtf8Bytes(`verification_key_${i}`));
    await zkIdentityAdvanced.setVerificationKey(attributeTypes[i], vkHash);
    console.log(`Set verification key for attribute type ${i}: ${vkHash}`);
  }
  
  console.log("\nDeployment completed!");
  console.log("Contract address:", contractAddress);
  console.log("Remember to update your frontend configuration with this address.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});