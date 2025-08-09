// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

/**
 * @title ZKIdentityAdvanced
 * @dev Advanced zero-knowledge identity verification system
 * Supports attribute-based verification without revealing personal information
 */
contract ZKIdentityAdvanced is Ownable {
    using ECDSA for bytes32;
    using MessageHashUtils for bytes32;

    // Identity verification levels
    enum VerificationLevel {
        NONE,
        BASIC,
        ENHANCED,
        PREMIUM
    }

    // Attribute types that can be verified
    enum AttributeType {
        AGE_OVER_18,
        AGE_OVER_21,
        NATIONALITY,
        EDUCATION_LEVEL,
        EMPLOYMENT_STATUS,
        CREDIT_SCORE_RANGE,
        CUSTOM
    }

    struct Identity {
        bytes32 identityCommitment;  // Commitment to identity data
        VerificationLevel level;
        uint256 timestamp;
        bool isActive;
        mapping(AttributeType => bool) verifiedAttributes;
        mapping(AttributeType => bytes32) attributeProofs;
    }

    struct ZKProof {
        uint256[2] a;
        uint256[2][2] b;
        uint256[2] c;
        uint256[] publicInputs;
    }

    // Mappings
    mapping(address => Identity) public identities;
    mapping(bytes32 => bool) public usedNullifiers;
    mapping(address => bool) public authorizedVerifiers;
    
    // Verification keys for different proof types
    mapping(AttributeType => bytes32) public verificationKeys;
    
    // Events
    event IdentityRegistered(address indexed user, bytes32 identityCommitment, VerificationLevel level);
    event AttributeVerified(address indexed user, AttributeType attributeType, bytes32 proofHash);
    event VerificationLevelUpdated(address indexed user, VerificationLevel newLevel);
    event VerifierAuthorized(address indexed verifier, bool authorized);

    constructor() Ownable(msg.sender) {}

    /**
     * @dev Register a new identity with ZK commitment
     * @param identityCommitment Commitment to user's identity data
     * @param zkProof Zero-knowledge proof of identity ownership
     * @param nullifier Unique nullifier to prevent double registration
     */
    function registerIdentity(
        bytes32 identityCommitment,
        ZKProof calldata zkProof,
        bytes32 nullifier
    ) external {
        require(!usedNullifiers[nullifier], "Nullifier already used");
        require(identities[msg.sender].identityCommitment == bytes32(0), "Identity already registered");
        
        // Verify the ZK proof (simplified - in production use a proper verifier)
        require(_verifyRegistrationProof(identityCommitment, zkProof, nullifier), "Invalid ZK proof");
        
        usedNullifiers[nullifier] = true;
        
        Identity storage identity = identities[msg.sender];
        identity.identityCommitment = identityCommitment;
        identity.level = VerificationLevel.BASIC;
        identity.timestamp = block.timestamp;
        identity.isActive = true;
        
        emit IdentityRegistered(msg.sender, identityCommitment, VerificationLevel.BASIC);
    }

    /**
     * @dev Verify a specific attribute using ZK proof
     * @param attributeType The type of attribute to verify
     * @param zkProof Zero-knowledge proof of the attribute
     * @param publicInputs Public inputs for the proof verification
     */
    function verifyAttribute(
        AttributeType attributeType,
        ZKProof calldata zkProof,
        uint256[] calldata publicInputs
    ) external {
        require(identities[msg.sender].isActive, "Identity not registered or inactive");
        require(!identities[msg.sender].verifiedAttributes[attributeType], "Attribute already verified");
        
        // Verify the ZK proof for the specific attribute
        require(_verifyAttributeProof(attributeType, zkProof, publicInputs), "Invalid attribute proof");
        
        bytes32 proofHash = keccak256(abi.encodePacked(
            zkProof.a,
            zkProof.b,
            zkProof.c,
            publicInputs
        ));
        
        identities[msg.sender].verifiedAttributes[attributeType] = true;
        identities[msg.sender].attributeProofs[attributeType] = proofHash;
        
        // Update verification level based on verified attributes
        _updateVerificationLevel(msg.sender);
        
        emit AttributeVerified(msg.sender, attributeType, proofHash);
    }

    /**
     * @dev Check if a user has a verified attribute
     * @param user Address to check
     * @param attributeType Attribute type to verify
     * @return bool Whether the attribute is verified
     */
    function hasVerifiedAttribute(address user, AttributeType attributeType) external view returns (bool) {
        return identities[user].isActive && identities[user].verifiedAttributes[attributeType];
    }

    /**
     * @dev Get user's verification level
     * @param user Address to check
     * @return VerificationLevel Current verification level
     */
    function getVerificationLevel(address user) external view returns (VerificationLevel) {
        return identities[user].isActive ? identities[user].level : VerificationLevel.NONE;
    }

    /**
     * @dev Generate a verification certificate for third parties
     * @param attributeTypes Array of attributes to include in certificate
     * @return bytes32 Certificate hash that can be verified
     */
    function generateVerificationCertificate(
        AttributeType[] calldata attributeTypes
    ) external view returns (bytes32) {
        require(identities[msg.sender].isActive, "Identity not active");
        
        bytes memory certificateData = abi.encodePacked(msg.sender, block.timestamp);
        
        for (uint i = 0; i < attributeTypes.length; i++) {
            require(identities[msg.sender].verifiedAttributes[attributeTypes[i]], "Attribute not verified");
            certificateData = abi.encodePacked(
                certificateData,
                attributeTypes[i],
                identities[msg.sender].attributeProofs[attributeTypes[i]]
            );
        }
        
        return keccak256(certificateData);
    }

    /**
     * @dev Verify a certificate generated by generateVerificationCertificate
     * @param user User who generated the certificate
     * @param attributeTypes Attributes included in the certificate
     * @param certificateHash The certificate hash to verify
     * @param timestamp Timestamp when certificate was generated
     * @return bool Whether the certificate is valid
     */
    function verifyCertificate(
        address user,
        AttributeType[] calldata attributeTypes,
        bytes32 certificateHash,
        uint256 timestamp
    ) external view returns (bool) {
        if (!identities[user].isActive) return false;
        
        bytes memory certificateData = abi.encodePacked(user, timestamp);
        
        for (uint i = 0; i < attributeTypes.length; i++) {
            if (!identities[user].verifiedAttributes[attributeTypes[i]]) return false;
            certificateData = abi.encodePacked(
                certificateData,
                attributeTypes[i],
                identities[user].attributeProofs[attributeTypes[i]]
            );
        }
        
        return keccak256(certificateData) == certificateHash;
    }

    // Admin functions
    function authorizeVerifier(address verifier, bool authorized) external onlyOwner {
        authorizedVerifiers[verifier] = authorized;
        emit VerifierAuthorized(verifier, authorized);
    }

    function setVerificationKey(AttributeType attributeType, bytes32 vkHash) external onlyOwner {
        verificationKeys[attributeType] = vkHash;
    }

    // Internal functions
    function _verifyRegistrationProof(
        bytes32 identityCommitment,
        ZKProof calldata zkProof,
        bytes32 nullifier
    ) internal pure returns (bool) {
        // Simplified verification - in production, use proper zk-SNARK verifier
        // This would verify that the user knows the preimage of identityCommitment
        // and that the nullifier is correctly derived
        return identityCommitment != bytes32(0) && nullifier != bytes32(0);
    }

    function _verifyAttributeProof(
        AttributeType attributeType,
        ZKProof calldata zkProof,
        uint256[] calldata publicInputs
    ) internal view returns (bool) {
        // Simplified verification - in production, use proper zk-SNARK verifier
        // This would verify the attribute proof against the stored verification key
        bytes32 vkHash = verificationKeys[attributeType];
        return vkHash != bytes32(0) && publicInputs.length > 0;
    }

    function _updateVerificationLevel(address user) internal {
        Identity storage identity = identities[user];
        uint256 verifiedCount = 0;
        
        // Count verified attributes
        for (uint i = 0; i < 7; i++) { // 7 is the number of AttributeType enum values
            if (identity.verifiedAttributes[AttributeType(i)]) {
                verifiedCount++;
            }
        }
        
        VerificationLevel newLevel;
        if (verifiedCount >= 5) {
            newLevel = VerificationLevel.PREMIUM;
        } else if (verifiedCount >= 3) {
            newLevel = VerificationLevel.ENHANCED;
        } else if (verifiedCount >= 1) {
            newLevel = VerificationLevel.BASIC;
        } else {
            newLevel = VerificationLevel.NONE;
        }
        
        if (newLevel != identity.level) {
            identity.level = newLevel;
            emit VerificationLevelUpdated(user, newLevel);
        }
    }
}