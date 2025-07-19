import { expect } from "chai";
import hre from "hardhat";
import { ethers } from "ethers";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { ZKIdentity } from "../typechain-types";

describe("ZKIdentity", function () {
  let zkIdentity: ZKIdentity;
  let owner: SignerWithAddress;
  let user1: SignerWithAddress;

  beforeEach(async function () {
    [owner, user1] = await hre.ethers.getSigners();
    
    const ZKIdentity = await hre.ethers.getContractFactory("ZKIdentity");
    zkIdentity = await ZKIdentity.deploy();
    await zkIdentity.waitForDeployment();
  });

  it("Should register identity", async function () {
    const identityHash = ethers.keccak256(ethers.toUtf8Bytes("test-identity"));
    const signature = await user1.signMessage(ethers.getBytes(identityHash));
    
    await zkIdentity.connect(user1).registerIdentity(identityHash, signature);
    
    expect(await zkIdentity.identityHashes(user1.address)).to.equal(identityHash);
  });

  it("Should verify identity", async function () {
    const identityHash = ethers.keccak256(ethers.toUtf8Bytes("test-identity"));
    const signature = await user1.signMessage(ethers.getBytes(identityHash));
    
    await zkIdentity.connect(user1).registerIdentity(identityHash, signature);
    await zkIdentity.connect(owner).verifyIdentity(user1.address);
    
    expect(await zkIdentity.isVerified(user1.address)).to.be.true;
  });

  it("Should prevent double registration", async function () {
    const identityHash = ethers.keccak256(ethers.toUtf8Bytes("test-identity"));
    const signature = await user1.signMessage(ethers.getBytes(identityHash));
    
    await zkIdentity.connect(user1).registerIdentity(identityHash, signature);
    
    await expect(
      zkIdentity.connect(user1).registerIdentity(identityHash, signature)
    ).to.be.revertedWith("Identity already registered");
  });
});
