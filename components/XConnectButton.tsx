'use client';
import { motion } from 'framer-motion';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { useAccount, usePublicClient } from 'wagmi';
import { zkIdentityAddress, zkIdentityAbi } from '../app/contracts/zkIdentity';
import { CheckCircle } from 'lucide-react';

export function XConnectButton() {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const [isVerified, setIsVerified] = useState(false);

  const checkVerification = useCallback(async () => {
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
  }, [address, publicClient]);



  useEffect(() => {
    checkVerification();
  }, [checkVerification]);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="inline-block">
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
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 border border-blue-500/20 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/20">
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
                      className="glass px-6 py-3 rounded-lg text-destructive font-medium hover:glow transition-all duration-300 border border-destructive/20 hover:border-destructive/40">
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
                      className="glass px-4 py-2 rounded-lg text-foreground font-medium hover:glow transition-all duration-300 border border-primary/20 hover:border-primary/40 flex items-center space-x-2">
                      {chain.iconUrl && (
                        <Image
                          src={chain.iconUrl}
                          alt={"x-layer"}
                          width={20}
                          height={20}
                          className="rounded-full"
                        />
                      )}
                      <span className="hidden sm:inline">{chain.name}</span>
                    </motion.button>
                    <motion.button
                      onClick={openAccountModal}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="glass px-4 py-2 rounded-lg text-foreground font-medium hover:glow transition-all duration-300 border border-primary/20 hover:border-primary/40">
                      <span className="hidden sm:inline">
                        {account.displayName}
                        {account.displayBalance ? ` (${account.displayBalance})` : ''}
                      </span>
                      <span className="sm:hidden">{account.displayName?.slice(0, 6)}...</span>
                    </motion.button>
                    {isVerified && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="glass px-4 py-2 rounded-lg border border-green-400/20 flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span className="text-green-400 font-medium">Verified</span>
                      </motion.div>
                    )}
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