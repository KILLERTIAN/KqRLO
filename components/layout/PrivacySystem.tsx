'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function PrivacySystem() {
  const [isSelfDestructModalOpen, setIsSelfDestructModalOpen] = useState(false);
  const [isProofPreviewOpen, setIsProofPreviewOpen] = useState(false);
  const [isSessionPrivacyMode, setIsSessionPrivacyMode] = useState(false);
  const [privacyLevel, setPrivacyLevel] = useState(3);
  const [proofData, setProofData] = useState({
    age: '25+',
    location: 'United States',
    kyc: 'Verified',
    reputation: 'High'
  });
  const [isDataObfuscated, setIsDataObfuscated] = useState(false);
  const [sessionTimer, setSessionTimer] = useState(0);

  useEffect(() => {
    if (isSessionPrivacyMode) {
      const timer = setInterval(() => {
        setSessionTimer(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isSessionPrivacyMode]);

  const handleSelfDestruct = () => {
    // Simulate data destruction
    setProofData({age: '25+',
      location: 'United States',
      kyc: 'Verified',
      reputation: 'High'
    });
    setIsSelfDestructModalOpen(false);
    setIsSessionPrivacyMode(false);
    setSessionTimer(0);
  };

  const toggleDataObfuscation = () => {
    setIsDataObfuscated(!isDataObfuscated);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const privacyFeatures = [
    {
      title: "One-Click Self-Destruct",
      description: "Instantly burn all identity data with cryptographic proof",
      icon: "🔥",
      action: () => setIsSelfDestructModalOpen(true),
      color: "from-accent-rose to-accent-amber"
    },
    {
      title: "Proof Preview",
      description: "See exactly what data will be revealed before submission",
      icon: "👁️",
      action: () => setIsProofPreviewOpen(true),
      color: "from-privacy-500 to-accent-cyan"
    },
    {
      title: "Session Privacy Mode",
      description: "Ephemeral sessions with automatic data clearing",
      icon: "⏱️",
      action: () => setIsSessionPrivacyMode(!isSessionPrivacyMode),
      color: "from-accent-purple to-accent-emerald"
    },
    {
      title: "Data Obfuscation",
      description: "Real-time data masking and encryption",
      icon: "🔒",
      action: toggleDataObfuscation,
      color: "from-accent-cyan to-privacy-500"
    },
    {
      title: "Privacy Level Control",
      description: "Granular control over data disclosure levels",
      icon: "🎚️",
      action: () => setPrivacyLevel((prev) => (prev % 5) + 1),
      color: "from-accent-emerald to-accent-purple"
    },
    {
      title: "Zero-Knowledge Verification",
      description: "Prove statements without revealing underlying data",
      icon: "✨",
      action: () => {},
      color: "from-privacy-500 to-accent-rose"
    }
  ];

  return (
    <section id="privacy-system" className="privacy-section">
      <div className="privacy-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="privacy-heading">Advanced Privacy System</h2>
          <p className="privacy-subheading">
            Cutting-edge privacy features designed to give you complete control over your digital identity
          </p>
        </motion.div>

        {/* Privacy Features Grid */}
        <div className="privacy-feature-grid mb-16">
          {privacyFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="privacy-feature-card group cursor-pointer"
              onClick={feature.action}
            >
              <div className={`privacy-icon bg-gradient-to-br ${feature.color}`}>
                <span className="text-2xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-privacy-300 mb-4">{feature.description}</p>
              
              {/* Interactive Elements */}
              {feature.title === "Session Privacy Mode" && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-privacy-400">Active</span>
                  <div className={`privacy-toggle ${isSessionPrivacyMode ? 'enabled' : 'disabled'}`}>
                    <span className="privacy-toggle-thumb" />
                  </div>
                </div>
              )}
              
              {feature.title === "Privacy Level Control" && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-privacy-400">Level {privacyLevel}/5</span>
                    <span className="text-privacy-300">
                      {privacyLevel === 1 && 'Minimal'}
                      {privacyLevel === 2 && 'Low'}
                      {privacyLevel === 3 && 'Medium'}
                      {privacyLevel === 4 && 'High'}
                      {privacyLevel === 5 && 'Maximum'}
                    </span>
                  </div>
                  <div className="privacy-progress">
                    <div 
                      className="privacy-progress-bar" 
                      style={{ width: `${(privacyLevel / 5) * 100}%` }}
                    />
                  </div>
                </div>
              )}
              
              {feature.title === "Data Obfuscation" && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-privacy-400">Status</span>
                  <div className={`w-2 h-2 rounded-full ${isDataObfuscated ? 'bg-accent-emerald' : 'bg-accent-rose'}`} />
              </div>
              )}
                </motion.div>
              ))}
            </div>

        {/* Live Privacy Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="privacy-card p-8 mb-16"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Live Privacy Dashboard</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Session Timer */}
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient mb-2">
                {isSessionPrivacyMode ? formatTime(sessionTimer) : '--:--'}
              </div>
              <div className="text-privacy-300 text-sm">Session Time</div>
            </div>
            
            {/* Privacy Score */}
              <div className="text-center">
              <div className="text-3xl font-bold text-gradient mb-2">
                {Math.round((privacyLevel / 5) * 100)}%
              </div>
              <div className="text-privacy-300 text-sm">Privacy Score</div>
            </div>
            
            {/* Data Exposure */}
              <div className="text-center">
              <div className="text-3xl font-bold text-gradient mb-2">
                {isDataObfuscated ? '0%' : '25%'}
              </div>
              <div className="text-privacy-300 text-sm">Data Exposure</div>
            </div>
            
            {/* Security Level */}
              <div className="text-center">
              <div className="text-3xl font-bold text-gradient mb-2">
                {isSessionPrivacyMode ? 'MAX' : 'HIGH'}
              </div>
              <div className="text-privacy-300 text-sm">Security Level</div>
            </div>
          </div>
        </motion.div>

        {/* Privacy Controls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="privacy-button"
            onClick={() => setIsSelfDestructModalOpen(true)}
          >
            <span className="flex items-center space-x-2">
              <span>🔥</span>
              <span>Self-Destruct All Data</span>
            </span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="privacy-button-secondary"
            onClick={() => setIsProofPreviewOpen(true)}
          >
            <span className="flex items-center space-x-2">
              <span>👁️</span>
              <span>Preview Proof</span>
            </span>
          </motion.button>
        </motion.div>
      </div>

      {/* Self-Destruct Modal */}
      <AnimatePresence>
        {isSelfDestructModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="privacy-modal"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="privacy-modal-content"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-accent-rose to-accent-amber rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🔥</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Self-Destruct Confirmation</h3>
                <p className="text-privacy-300 mb-6">
                  This action will permanently destroy all your identity data and proofs. 
                  This action cannot be undone.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between p-3 bg-dark-800/50 rounded-lg">
                    <span className="text-privacy-300">Identity Proofs</span>
                    <span className="text-accent-rose">Will be destroyed</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-dark-800/50 rounded-lg">
                    <span className="text-privacy-300">Session Data</span>
                    <span className="text-accent-rose">Will be cleared</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-dark-800/50 rounded-lg">
                    <span className="text-privacy-300">Wallet Connection</span>
                    <span className="text-accent-rose">Will be disconnected</span>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={handleSelfDestruct}
                    className="flex-1 bg-gradient-to-r from-accent-rose to-accent-amber text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    Confirm Destruction
                  </button>
                  <button
                    onClick={() => setIsSelfDestructModalOpen(false)}
                    className="flex-1 privacy-button-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Proof Preview Modal */}
      <AnimatePresence>
        {isProofPreviewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="privacy-modal"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="privacy-modal-content max-w-2xl"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-privacy-500 to-accent-cyan rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👁️</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Proof Preview</h3>
                <p className="text-privacy-300 mb-6">
                  This is exactly what will be revealed when you submit your proof:
                </p>
                
                <div className="space-y-3 mb-6">
                  {Object.entries(proofData).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-3 bg-dark-800/50 rounded-lg">
                      <span className="text-privacy-300 capitalize">{key}</span>
                      <span className="text-privacy-400">{value}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => setIsProofPreviewOpen(false)}
                    className="flex-1 privacy-button"
                  >
                    Submit Proof
                  </button>
                  <button
                    onClick={() => setIsProofPreviewOpen(false)}
                    className="flex-1 privacy-button-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}