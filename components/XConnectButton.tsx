'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Shield, Eye, Trash2 } from 'lucide-react';

export function XConnectButton() {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showProofModal, setShowProofModal] = useState(false);
  const [showDestructModal, setShowDestructModal] = useState(false);

  const handleConnect = async () => {
    setIsLoading(true);
    // Simulate connection process
    setTimeout(() => {
      setIsConnected(true);
      setIsLoading(false);
    }, 2000);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
  };

  const handleSelfDestruct = () => {
    setShowDestructModal(false);
    setIsConnected(false);
    // Simulate data destruction
  };

  if (isConnected) {
  return (
      <div className="space-y-4">
    <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Identity Verified</h3>
                <p className="text-sm text-gray-600">Zero-knowledge proof generated</p>
              </div>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-3 bg-zk-primary/10 rounded-lg">
              <div className="text-lg font-bold text-zk-primary">98%</div>
              <div className="text-xs text-gray-600">Privacy Score</div>
            </div>
            <div className="text-center p-3 bg-zk-primary/10 rounded-lg">
              <div className="text-lg font-bold text-zk-primary">0</div>
              <div className="text-xs text-gray-600">Data Shared</div>
            </div>
          </div>

          <div className="flex space-x-3">
            <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
              onClick={() => setShowProofModal(true)}
              className="flex-1 btn-secondary flex items-center justify-center space-x-2"
            >
              <Eye className="h-4 w-4" />
              <span>View Proof</span>
            </motion.button>
                    <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowDestructModal(true)}
              className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-300 flex items-center space-x-2"
            >
              <Trash2 className="h-4 w-4" />
              <span>Destroy</span>
                    </motion.button>
          </div>

          <button
            onClick={handleDisconnect}
            className="w-full mt-3 text-sm text-gray-500 hover:text-gray-700 transition-colors duration-300"
          >
            Disconnect Wallet
          </button>
        </motion.div>

        {/* Proof Preview Modal */}
        {showProofModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowProofModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-semibold text-gray-900 mb-4">Proof Preview</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Identity Verified:</span>
                  <span className="font-medium text-green-600">✓ Yes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Age Over 18:</span>
                  <span className="font-medium text-green-600">✓ Yes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium text-gray-400">Not Revealed</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Personal Data:</span>
                  <span className="font-medium text-gray-400">Not Revealed</span>
                </div>
              </div>
              <button
                onClick={() => setShowProofModal(false)}
                className="w-full btn-primary"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* Self Destruct Modal */}
        {showDestructModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowDestructModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Destroy Identity Proof?</h3>
                <p className="text-gray-600 text-sm">
                  This will permanently delete your zero-knowledge proof. This action cannot be undone.
                </p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDestructModal(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSelfDestruct}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300"
                    >
                  Destroy
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
                  );
                }

                return (
                    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleConnect}
      disabled={isLoading}
      className="btn-primary flex items-center space-x-2"
                    >
      {isLoading ? (
        <>
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          <span>Connecting...</span>
        </>
                      ) : (
        <>
          <Wallet className="h-5 w-5" />
          <span>Connect Wallet</span>
        </>
      )}
                        </motion.button>
  );
}
