"use client"
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState, useEffect } from 'react';
import { useAccount, useWalletClient, usePublicClient } from 'wagmi';
import { ethers } from 'ethers';
import { zkIdentityAddress, zkIdentityAbi } from '../app/contracts/zkIdentity';

export function XConnectButton() {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const [isVerified, setIsVerified] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const checkVerification = async () => {
    if (!address || !publicClient) return;
    try {
      const isVerifiedStatus = await publicClient.readContract({
        address: zkIdentityAddress as `0x${string}`,
        abi: zkIdentityAbi,
        functionName: 'isVerified',
        args: [address],
      });
      setIsVerified(isVerifiedStatus as boolean);
    } catch (error) {
      console.error("Error checking verification status:", error);
      setIsVerified(false);
    }
  };

  const handleRegister = async () => {
    if (!walletClient || !address || !publicClient) return;
    setIsRegistering(true);
    try {
      const identityString = `zk-identity-for-${address}`;
      const identityHash = ethers.keccak256(ethers.toUtf8Bytes(identityString));
      
      const signature = await walletClient.signMessage({
        account: address,
        message: { raw: ethers.getBytes(identityHash) },
      });

      const { request } = await publicClient.simulateContract({
        account: address,
        address: zkIdentityAddress as `0x${string}`,
        abi: zkIdentityAbi,
        functionName: 'registerIdentity',
        args: [identityHash, signature],
      });

      const txHash = await walletClient.writeContract(request);
      await publicClient.waitForTransactionReceipt({ hash: txHash });

      await checkVerification(); // Re-check status after registration
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsRegistering(false);
    }
  };

  useEffect(() => {
    checkVerification();
  }, [address, publicClient]);

  return (
    <ConnectButton.Custom>
      {({ 
        account, 
        chain, 
        openChainModal, 
        openConnectModal, 
        openAccountModal,
        mounted 
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;
        
        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    className="px-4 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Wrong Network
                  </button>
                );
              }

              return (
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <button
                      onClick={openChainModal}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-semibold "
                    >
                      {chain.iconUrl ? (
                        <img 
                          src={chain.iconUrl} 
                          alt={chain.name} 
                          className="w-5 h-5 rounded-full" 
                        />
                      ) : (
                        <div className="w-5 h-5 bg-gray-300 rounded-full" />
                      )}
                      {chain.name}
                    </button>
                    
                    <button
                      onClick={openAccountModal}
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-semibold"
                    >
                      {account.displayName}
                      {account.displayBalance ? ` (${account.displayBalance})` : ''}
                    </button>
                  </div>
                  
                  <div>
                    {isVerified ? (
                      <span className='px-4 py-2 text-green-600 bg-green-100 rounded-lg font-semibold'>Verified</span>
                    ) : (
                      <button
                        onClick={handleRegister}
                        disabled={isRegistering}
                        className="px-4 py-2 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-600 transition-colors disabled:bg-purple-300"
                      >
                        {isRegistering ? 'Registering...' : 'Register Identity'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
