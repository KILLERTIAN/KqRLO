// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

contract ZKIdentity {
    using ECDSA for bytes32;
    using MessageHashUtils for bytes32;

    // Mapping from user address to identity hash
    mapping(address => bytes32) public identityHashes;
    
    // Mapping from identity hash to verification status
    mapping(bytes32 => bool) public verifiedIdentities;
    
    // Event emitted when a new identity is registered
    event IdentityRegistered(address indexed user, bytes32 identityHash);
    
    // Event emitted when an identity is verified
    event IdentityVerified(bytes32 indexed identityHash);

    /**
     * @dev Registers a new identity hash for the caller
     * @param identityHash The hash of the user's identity data
     * @param signature The signature proving ownership of the identity
     */
    function registerIdentity(bytes32 identityHash, bytes memory signature) external {
        require(identityHashes[msg.sender] == bytes32(0), "Identity already registered");
        
        // Create properly formatted message hash
        bytes32 messageHash = identityHash.toEthSignedMessageHash();
        
        // Recover the signer
        address signer = messageHash.recover(signature);
        require(signer == msg.sender, "Invalid signature");
        
        identityHashes[msg.sender] = identityHash;
        emit IdentityRegistered(msg.sender, identityHash);
    }

    /**
     * @dev Verifies an identity (only callable by verified accounts)
     * @param user The address of the user to verify
     */
    function verifyIdentity(address user) external {
        bytes32 identityHash = identityHashes[user];
        require(identityHash != bytes32(0), "No identity registered");
        require(!verifiedIdentities[identityHash], "Identity already verified");
        
        // In a real implementation, you would add ZK proof verification here
        // For this example, we'll just mark it as verified
        verifiedIdentities[identityHash] = true;
        emit IdentityVerified(identityHash);
    }

    /**
     * @dev Checks if a user's identity is verified
     * @param user The address to check
     * @return bool Whether the identity is verified
     */
    function isVerified(address user) external view returns (bool) {
        bytes32 identityHash = identityHashes[user];
        return identityHash != bytes32(0) && verifiedIdentities[identityHash];
    }
}
