import { ethers } from "ethers";

async function main() {
  const [deployer] = await ethers.getSigners();
  
  console.log("Deploying contracts with the account:", deployer.address);
  
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "ETH");
  
  const ZKIdentity = await ethers.getContractFactory("ZKIdentity");
  const zkIdentity = await ZKIdentity.deploy();
  
  await zkIdentity.waitForDeployment();
  
  console.log("ZKIdentity deployed to:", await zkIdentity.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
