const hre = require("hardhat");

async function main() {
  const contractAddress = "0x4CBe046Ec601ad6Cf6434a71875efCbDc1ddE20d";
  
  console.log("Verifying deployment at:", contractAddress);
  
  // Get contract instance
  const ZKIdentityAdvanced = await hre.ethers.getContractFactory("ZKIdentityAdvanced");
  const zkIdentityAdvanced = ZKIdentityAdvanced.attach(contractAddress);
  
  try {
    // Check if contract is deployed by calling a view function
    const owner = await zkIdentityAdvanced.owner();
    console.log("Contract owner:", owner);
    
    // Check verification keys
    console.log("\nVerification keys:");
    for (let i = 0; i < 7; i++) {
      const vkHash = await zkIdentityAdvanced.verificationKeys(i);
      console.log(`Attribute type ${i}: ${vkHash}`);
    }
    
    console.log("\n✅ Contract deployment verified successfully!");
    
  } catch (error) {
    console.error("❌ Error verifying contract:", error.message);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});