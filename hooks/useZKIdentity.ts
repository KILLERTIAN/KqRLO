import { useState, useCallback, useEffect } from 'react';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';
import { 
  zkIdentityAdvancedAddress, 
  zkIdentityAdvancedAbi, 
  VerificationLevel, 
  AttributeType,
  ZKProof
} from '../app/contracts/zkIdentity';

export interface Identity {
  identityCommitment: string;
  level: VerificationLevel;
  timestamp: bigint;
  isActive: boolean;
}

export interface VerificationCertificate {
  certificateHash: string;
  timestamp: number;
  attributeTypes: AttributeType[];
}

export function useZKIdentity() {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  
  const [identity, setIdentity] = useState<Identity | null>(null);
  const [verificationLevel, setVerificationLevel] = useState<VerificationLevel>(VerificationLevel.NONE);
  const [verifiedAttributes, setVerifiedAttributes] = useState<Set<AttributeType>>(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if user has an identity registered
  const checkIdentity = useCallback(async () => {
    if (!address || !publicClient || !zkIdentityAdvancedAddress) return;

    try {
      setLoading(true);
      setError(null);

      const identityData = await publicClient.readContract({
        address: zkIdentityAdvancedAddress as `0x${string}`,
        abi: zkIdentityAdvancedAbi,
        functionName: 'identities',
        args: [address],
      });

      if (identityData && identityData[0] !== '0x0000000000000000000000000000000000000000000000000000000000000000') {
        const [identityCommitment, level, timestamp, isActive] = identityData;
        setIdentity({
          identityCommitment: identityCommitment as string,
          level: level as VerificationLevel,
          timestamp: timestamp as bigint,
          isActive: isActive as boolean,
        });
        setVerificationLevel(level as VerificationLevel);

        // Check verified attributes
        const attributeChecks = await Promise.all(
          Object.values(AttributeType)
            .filter(v => typeof v === 'number')
            .map(async (attrType) => {
              const hasAttribute = await publicClient.readContract({
                address: zkIdentityAdvancedAddress as `0x${string}`,
                abi: zkIdentityAdvancedAbi,
                functionName: 'hasVerifiedAttribute',
                args: [address, attrType as AttributeType],
              });
              return { attrType: attrType as AttributeType, hasAttribute };
            })
        );

        const verifiedAttrs = new Set<AttributeType>();
        attributeChecks.forEach(({ attrType, hasAttribute }) => {
          if (hasAttribute) verifiedAttrs.add(attrType);
        });
        setVerifiedAttributes(verifiedAttrs);
      } else {
        setIdentity(null);
        setVerificationLevel(VerificationLevel.NONE);
        setVerifiedAttributes(new Set());
      }
    } catch (err) {
      console.error('Error checking identity:', err);
      setError('Failed to check identity status');
    } finally {
      setLoading(false);
    }
  }, [address, publicClient]);

  // Register a new identity
  const registerIdentity = useCallback(async (
    identityCommitment: string,
    zkProof: ZKProof,
    nullifier: string
  ) => {
    if (!walletClient || !address || !zkIdentityAdvancedAddress) {
      throw new Error('Wallet not connected');
    }

    try {
      setLoading(true);
      setError(null);

      const hash = await walletClient.writeContract({
        address: zkIdentityAdvancedAddress as `0x${string}`,
        abi: zkIdentityAdvancedAbi,
        functionName: 'registerIdentity',
        args: [
          identityCommitment as `0x${string}`, 
          {
            a: [zkProof.a[0], zkProof.a[1]],
            b: [[zkProof.b[0][0], zkProof.b[0][1]], [zkProof.b[1][0], zkProof.b[1][1]]],
            c: [zkProof.c[0], zkProof.c[1]],
            publicInputs: zkProof.publicInputs
          }, 
          nullifier as `0x${string}`
        ],
      });

      // Wait for transaction confirmation
      if (publicClient) {
        await publicClient.waitForTransactionReceipt({ hash });
      }

      // Refresh identity data
      await checkIdentity();
      
      return hash;
    } catch (err) {
      console.error('Error registering identity:', err);
      setError('Failed to register identity');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [walletClient, address, publicClient, checkIdentity]);

  // Verify an attribute
  const verifyAttribute = useCallback(async (
    attributeType: AttributeType,
    zkProof: ZKProof,
    publicInputs: bigint[]
  ) => {
    if (!walletClient || !address || !zkIdentityAdvancedAddress) {
      throw new Error('Wallet not connected');
    }

    try {
      setLoading(true);
      setError(null);

      const hash = await walletClient.writeContract({
        address: zkIdentityAdvancedAddress as `0x${string}`,
        abi: zkIdentityAdvancedAbi,
        functionName: 'verifyAttribute',
        args: [
          attributeType, 
          {
            a: [zkProof.a[0], zkProof.a[1]],
            b: [[zkProof.b[0][0], zkProof.b[0][1]], [zkProof.b[1][0], zkProof.b[1][1]]],
            c: [zkProof.c[0], zkProof.c[1]],
            publicInputs: zkProof.publicInputs
          }, 
          publicInputs
        ],
      });

      // Wait for transaction confirmation
      if (publicClient) {
        await publicClient.waitForTransactionReceipt({ hash });
      }

      // Refresh identity data
      await checkIdentity();
      
      return hash;
    } catch (err) {
      console.error('Error verifying attribute:', err);
      setError('Failed to verify attribute');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [walletClient, address, publicClient, checkIdentity]);

  // Generate verification certificate
  const generateCertificate = useCallback(async (
    attributeTypes: AttributeType[]
  ): Promise<VerificationCertificate> => {
    if (!publicClient || !address || !zkIdentityAdvancedAddress) {
      throw new Error('Wallet not connected');
    }

    try {
      setLoading(true);
      setError(null);

      const certificateHash = await publicClient.readContract({
        address: zkIdentityAdvancedAddress as `0x${string}`,
        abi: zkIdentityAdvancedAbi,
        functionName: 'generateVerificationCertificate',
        args: [attributeTypes],
      });

      return {
        certificateHash: certificateHash as string,
        timestamp: Date.now(),
        attributeTypes,
      };
    } catch (err) {
      console.error('Error generating certificate:', err);
      setError('Failed to generate certificate');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [publicClient, address]);

  // Verify a certificate
  const verifyCertificate = useCallback(async (
    userAddress: string,
    certificate: VerificationCertificate
  ): Promise<boolean> => {
    if (!publicClient || !zkIdentityAdvancedAddress) {
      throw new Error('Public client not available');
    }

    try {
      const isValid = await publicClient.readContract({
        address: zkIdentityAdvancedAddress as `0x${string}`,
        abi: zkIdentityAdvancedAbi,
        functionName: 'verifyCertificate',
        args: [
          userAddress as `0x${string}`,
          certificate.attributeTypes,
          certificate.certificateHash as `0x${string}`,
          BigInt(Math.floor(certificate.timestamp / 1000)),
        ],
      });

      return isValid as boolean;
    } catch (err) {
      console.error('Error verifying certificate:', err);
      throw err;
    }
  }, [publicClient]);

  // Helper functions for creating mock ZK proofs (for testing)
  const createMockZKProof = useCallback((seed: string): ZKProof => {
    const hash = BigInt('0x' + Array.from(seed).map(c => c.charCodeAt(0).toString(16)).join(''));
    return {
      a: [hash % BigInt(2**128), (hash >> BigInt(128)) % BigInt(2**128)],
      b: [
        [hash % BigInt(2**64), (hash >> BigInt(64)) % BigInt(2**64)],
        [(hash >> BigInt(128)) % BigInt(2**64), (hash >> BigInt(192)) % BigInt(2**64)]
      ],
      c: [(hash >> BigInt(64)) % BigInt(2**128), (hash >> BigInt(192)) % BigInt(2**128)],
      publicInputs: [hash % BigInt(2**32), (hash >> BigInt(32)) % BigInt(2**32)],
    };
  }, []);

  const createMockIdentityCommitment = useCallback((personalData: string): string => {
    // In a real implementation, this would be a proper commitment scheme
    const encoder = new TextEncoder();
    const data = encoder.encode(personalData + address);
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      hash = ((hash << 5) - hash + data[i]) & 0xffffffff;
    }
    return '0x' + Math.abs(hash).toString(16).padStart(64, '0');
  }, [address]);

  const createMockNullifier = useCallback((secret: string): string => {
    // In a real implementation, this would be derived from a secret
    const encoder = new TextEncoder();
    const data = encoder.encode(secret + address + Date.now().toString());
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      hash = ((hash << 5) - hash + data[i]) & 0xffffffff;
    }
    return '0x' + Math.abs(hash).toString(16).padStart(64, '0');
  }, [address]);

  // Get attribute name for display
  const getAttributeName = useCallback((attributeType: AttributeType): string => {
    const names = {
      [AttributeType.AGE_OVER_18]: 'Age Over 18',
      [AttributeType.AGE_OVER_21]: 'Age Over 21',
      [AttributeType.NATIONALITY]: 'Nationality',
      [AttributeType.EDUCATION_LEVEL]: 'Education Level',
      [AttributeType.EMPLOYMENT_STATUS]: 'Employment Status',
      [AttributeType.CREDIT_SCORE_RANGE]: 'Credit Score Range',
      [AttributeType.CUSTOM]: 'Custom Attribute',
    };
    return names[attributeType] || 'Unknown Attribute';
  }, []);

  // Get verification level name
  const getVerificationLevelName = useCallback((level: VerificationLevel): string => {
    const names = {
      [VerificationLevel.NONE]: 'None',
      [VerificationLevel.BASIC]: 'Basic',
      [VerificationLevel.ENHANCED]: 'Enhanced',
      [VerificationLevel.PREMIUM]: 'Premium',
    };
    return names[level] || 'Unknown';
  }, []);

  useEffect(() => {
    if (address) {
      checkIdentity();
    }
  }, [address, checkIdentity]);

  return {
    // State
    identity,
    verificationLevel,
    verifiedAttributes,
    loading,
    error,
    
    // Actions
    registerIdentity,
    verifyAttribute,
    generateCertificate,
    verifyCertificate,
    checkIdentity,
    
    // Helpers
    createMockZKProof,
    createMockIdentityCommitment,
    createMockNullifier,
    getAttributeName,
    getVerificationLevelName,
    
    // Computed values
    isRegistered: identity?.isActive || false,
    hasBasicVerification: verificationLevel >= VerificationLevel.BASIC,
    hasEnhancedVerification: verificationLevel >= VerificationLevel.ENHANCED,
    hasPremiumVerification: verificationLevel >= VerificationLevel.PREMIUM,
  };
}