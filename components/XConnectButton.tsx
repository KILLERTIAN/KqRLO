'use client';

import { motion } from 'framer-motion';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState, useEffect } from 'react';
import { useAccount, useWalletClient, usePublicClient } from 'wagmi';
import { ethers } from 'ethers';
import { zkIdentityAddress, zkIdentityAbi } from '../app/contracts/zkIdentity';
import { CheckCircle, Shield } from 'lucide-react';

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
        address: zkIdentityAddress,
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
      // keccak256 already returns a hex string with 0x prefix, which matches the required type
      const identityHash = ethers.keccak256(ethers.toUtf8Bytes(identityString)) as `0x${string}`;

      const signature = await walletClient.signMessage({
        account: address,
        message: { raw: ethers.getBytes(identityHash) },
      });

      const { request } = await publicClient.simulateContract({
        account: address,
        address: zkIdentityAddress,
        abi: zkIdentityAbi,
        functionName: 'registerIdentity',
        args: [identityHash, signature],
      });

      const txHash = await walletClient.writeContract(request);
      await publicClient.waitForTransactionReceipt({ hash: txHash });

      await checkVerification();
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
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="inline-block"
    >
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
                    <motion.button
                      onClick={openConnectModal}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="glass px-6 py-3 rounded-lg text-white font-medium hover:glow transition-all duration-300 border border-white/20 hover:border-white/40 bg-gradient-to-r from-blue-500/20 to-purple-600/20"
                    >
                      Connect Wallet
                    </motion.button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <motion.button
                      onClick={openChainModal}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="glass px-6 py-3 rounded-lg text-red-400 font-medium hover:glow transition-all duration-300 border border-red-400/20 hover:border-red-400/40"
                    >
                      Wrong Network
                    </motion.button>
                  );
                }

                return (
                  <div className="flex items-center space-x-3">
                    <motion.button
                      onClick={openChainModal}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="glass px-4 py-2 rounded-lg text-white font-medium hover:glow transition-all duration-300 border border-white/20 hover:border-white/40 flex items-center space-x-2"
                    >
                      {chain.iconUrl && (
                        <img
                          src={chain.iconUrl}
                          alt={chain.name}
                          className="w-5 h-5 rounded-full"
                        />
                      )}
                      <span className="hidden sm:inline">{chain.name}</span>
                    </motion.button>

                    <motion.button
                      onClick={openAccountModal}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="glass px-4 py-2 rounded-lg text-white font-medium hover:glow transition-all duration-300 border border-white/20 hover:border-white/40"
                    >
                      <span className="hidden sm:inline">
                        {account.displayName}
                        {account.displayBalance ? ` (${account.displayBalance})` : ''}
                      </span>
                      <span className="sm:hidden">
                        {account.displayName?.slice(0, 6)}...
                      </span>
                    </motion.button>

                    <div>
                      {isVerified ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="glass px-4 py-2 rounded-lg border border-green-400/20 flex items-center space-x-2"
                        >
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-green-400 font-medium">Verified</span>
                        </motion.div>
                      ) : (
                        <motion.button
                          onClick={handleRegister}
                          disabled={isRegistering}
                          whileHover={{ scale: isRegistering ? 1 : 1.05 }}
                          whileTap={{ scale: isRegistering ? 1 : 0.95 }}
                          className="glass px-4 py-2 rounded-lg font-medium hover:glow transition-all duration-300 border border-purple-400/20 hover:border-purple-400/40 bg-gradient-to-r from-purple-500/20 to-pink-600/20 text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                        >
                          <Shield className="h-4 w-4" />
                          <span>
                            {isRegistering ? 'Registering...' : 'Register Identity'}
                          </span>
                        </motion.button>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </motion.div>
  );
}
