# Zero-Knowledge Identity Verification System

## Overview

This application implements a comprehensive zero-knowledge identity verification system that allows users to prove their identity and attributes without revealing personal information. The system uses blockchain technology and cryptographic techniques to enable privacy-preserving verification.

## Architecture

### Smart Contracts

#### ZKIdentityAdvanced.sol
The main smart contract deployed at `0x4CBe046Ec601ad6Cf6434a71875efCbDc1ddE20d` on XLayer testnet provides:

- **Identity Registration**: Users can register their identity using cryptographic commitments
- **Attribute Verification**: Support for verifying specific attributes using zero-knowledge proofs
- **Certificate Generation**: Create verifiable certificates for third-party verification
- **Verification Levels**: Progressive verification levels (Basic, Enhanced, Premium)

### Frontend Components

#### ZKIdentityManager
Main component for users to:
- Register their identity on the blockchain
- Verify specific attributes (age, nationality, education, etc.)
- Generate verification certificates
- View their verification status and level

#### CertificateVerifier
Component for third parties to:
- Verify certificates provided by users
- Check authenticity without accessing personal data
- View verified attributes and certificate details

### Hooks

#### useZKIdentity
React hook providing:
- Identity management functions
- Attribute verification capabilities
- Certificate generation and verification
- Mock ZK proof generation for testing

## Supported Attributes

The system supports verification of the following attributes:

1. **AGE_OVER_18**: Proof that user is over 18 years old
2. **AGE_OVER_21**: Proof that user is over 21 years old
3. **NATIONALITY**: Proof of nationality without revealing specific country
4. **EDUCATION_LEVEL**: Proof of education level
5. **EMPLOYMENT_STATUS**: Proof of employment status
6. **CREDIT_SCORE_RANGE**: Proof of credit score range
7. **CUSTOM**: Custom attributes for specific use cases

## Verification Levels

Users progress through verification levels based on verified attributes:

- **NONE**: No identity registered
- **BASIC**: Identity registered with 1+ verified attributes
- **ENHANCED**: 3+ verified attributes
- **PREMIUM**: 5+ verified attributes

## How It Works

### For Users

1. **Register Identity**
   - Create a cryptographic commitment to identity data
   - Submit zero-knowledge proof of identity ownership
   - Use unique nullifier to prevent double registration

2. **Verify Attributes**
   - Generate zero-knowledge proofs for specific attributes
   - Submit proofs to smart contract for verification
   - Attributes are verified without revealing underlying data

3. **Generate Certificates**
   - Create certificates containing verified attributes
   - Certificates include cryptographic hash for verification
   - Share certificates with third parties as needed

### For Verifiers

1. **Receive Certificate**
   - Get certificate JSON from user
   - Certificate contains hash and attribute list

2. **Verify On-Chain**
   - Check certificate authenticity against blockchain
   - Confirm attributes without accessing personal data

3. **Trust Without Privacy**
   - Verify user attributes while respecting privacy
   - No personal information is revealed in the process

## Deployment

### Prerequisites

- Node.js and npm/yarn
- Hardhat development environment
- Wallet with testnet/mainnet ETH

### Deploy Advanced Contract

```bash
# Compile contracts
npx hardhat compile

# Deploy to XLayer testnet
npx hardhat run scripts/deployAdvanced.js --network xlayerTestnet

# Contract deployed at: 0x4CBe046Ec601ad6Cf6434a71875efCbDc1ddE20d
# Address already updated in app/contracts/zkIdentity.ts
```

### Current Deployment

- **Network**: XLayer Testnet (Chain ID: 195)
- **Contract Address**: `0x4CBe046Ec601ad6Cf6434a71875efCbDc1ddE20d`
- **Deployer**: `0x6e6ccc0cfAffE650AB34A911324706cc1Af57b0D`
- **Verification Keys**: Pre-configured for all 7 attribute types

### Frontend Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Usage Examples

### Register Identity

```typescript
const { registerIdentity, createMockIdentityCommitment, createMockZKProof, createMockNullifier } = useZKIdentity();

const personalData = "user-secret-data";
const identityCommitment = createMockIdentityCommitment(personalData);
const zkProof = createMockZKProof(personalData + 'registration');
const nullifier = createMockNullifier(personalData);

await registerIdentity(identityCommitment, zkProof, nullifier);
```

### Verify Attribute

```typescript
const { verifyAttribute, createMockZKProof } = useZKIdentity();

const zkProof = createMockZKProof(`attribute_${AttributeType.AGE_OVER_18}_${Date.now()}`);
const publicInputs = [BigInt(AttributeType.AGE_OVER_18), BigInt(1)];

await verifyAttribute(AttributeType.AGE_OVER_18, zkProof, publicInputs);
```

### Generate Certificate

```typescript
const { generateCertificate } = useZKIdentity();

const attributeTypes = [AttributeType.AGE_OVER_18, AttributeType.NATIONALITY];
const certificate = await generateCertificate(attributeTypes);
```

### Verify Certificate

```typescript
const { verifyCertificate } = useZKIdentity();

const isValid = await verifyCertificate(userAddress, certificate);
```

## Security Considerations

### Current Implementation

- **Mock Proofs**: Current implementation uses mock zero-knowledge proofs for demonstration
- **Simplified Verification**: Proof verification is simplified for testing purposes
- **Development Only**: Not suitable for production without proper ZK proof implementation

### Production Requirements

- **Real ZK-SNARKs**: Implement proper zk-SNARK circuits and verification
- **Trusted Setup**: Perform trusted setup ceremony for proof system
- **Audit**: Security audit of smart contracts and cryptographic implementation
- **Key Management**: Secure management of verification keys

## Future Enhancements

1. **Real ZK Proofs**: Implement actual zk-SNARK circuits using libraries like Circom
2. **Attribute Oracles**: Integration with trusted data sources for attribute verification
3. **Revocation System**: Ability to revoke certificates and attributes
4. **Cross-Chain Support**: Support for multiple blockchain networks
5. **Mobile App**: Native mobile application for identity management
6. **Enterprise Integration**: APIs for enterprise verification systems

## API Reference

### Smart Contract Functions

#### registerIdentity
```solidity
function registerIdentity(
    bytes32 identityCommitment,
    ZKProof calldata zkProof,
    bytes32 nullifier
) external
```

#### verifyAttribute
```solidity
function verifyAttribute(
    AttributeType attributeType,
    ZKProof calldata zkProof,
    uint256[] calldata publicInputs
) external
```

#### generateVerificationCertificate
```solidity
function generateVerificationCertificate(
    AttributeType[] calldata attributeTypes
) external view returns (bytes32)
```

#### verifyCertificate
```solidity
function verifyCertificate(
    address user,
    AttributeType[] calldata attributeTypes,
    bytes32 certificateHash,
    uint256 timestamp
) external view returns (bool)
```

### React Hook Functions

See `hooks/useZKIdentity.ts` for complete API documentation.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Implement changes with tests
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions and support:
- Create an issue on GitHub
- Join our Discord community
- Check the documentation wiki

## Disclaimer

This is a demonstration implementation. Do not use in production without proper security audit and implementation of real zero-knowledge proofs.