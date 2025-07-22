'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, EyeOff, Shield, Lock, Unlock, Timer, 
  Settings, QrCode, Key, Vault, Zap, AlertTriangle,
  CheckCircle, XCircle, Info, ArrowRight, RefreshCw
} from 'lucide-react';

interface PrivacySettings {
  obfuscationLevel: 'none' | 'basic' | 'advanced';
  sessionTimeout: number; // minutes
  proofLevel: 'basic' | 'selective' | 'advanced';
  autoLock: boolean;
  blurSensitive: boolean;
}

interface ZKProof {
  id: string;
  type: 'age' | 'nationality' | 'citizenship' | 'custom';
  status: 'pending' | 'verified' | 'failed';
  timestamp: Date;
  data: Record<string, any>;
}

export function PrivacyMode() {
  const [isPrivacyMode, setIsPrivacyMode] = useState(false);
  const [settings, setSettings] = useState<PrivacySettings>({
    obfuscationLevel: 'basic',
    sessionTimeout: 30,
    proofLevel: 'selective',
    autoLock: true,
    blurSensitive: true,
  });
  const [sessionTimeLeft, setSessionTimeLeft] = useState(settings.sessionTimeout * 60);
  const [proofs, setProofs] = useState<ZKProof[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [activeProof, setActiveProof] = useState<ZKProof | null>(null);

  // Session timer
  useEffect(() => {
    if (isPrivacyMode && sessionTimeLeft > 0) {
      const timer = setInterval(() => {
        setSessionTimeLeft(prev => {
          if (prev <= 1) {
            setIsPrivacyMode(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isPrivacyMode, sessionTimeLeft]);

  // Sample proofs
  useEffect(() => {
    setProofs([
      {
        id: '1',
        type: 'age',
        status: 'verified',
        timestamp: new Date(),
        data: { age: '25+', verified: true }
      },
      {
        id: '2',
        type: 'nationality',
        status: 'verified',
        timestamp: new Date(),
        data: { country: 'US', verified: true }
      },
      {
        id: '3',
        type: 'citizenship',
        status: 'pending',
        timestamp: new Date(),
        data: { citizenship: 'US', verified: false }
      }
    ]);
  }, []);

  const togglePrivacyMode = () => {
    setIsPrivacyMode(!isPrivacyMode);
    if (!isPrivacyMode) {
      setSessionTimeLeft(settings.sessionTimeout * 60);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProofIcon = (type: string) => {
    switch (type) {
      case 'age': return '🎂';
      case 'nationality': return '🌍';
      case 'citizenship': return '🏛️';
      default: return '🔐';
    }
  };

  const getProofStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'text-privacy-safe';
      case 'pending': return 'text-privacy-warning';
      case 'failed': return 'text-privacy-danger';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-white">
      {/* Privacy Mode Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={togglePrivacyMode}
          className={`relative p-4 rounded-2xl shadow-lg transition-all duration-300 ${
            isPrivacyMode 
              ? 'bg-gradient-to-r from-zk-primary to-zk-secondary shadow-privacy' 
              : 'bg-dark-700 hover:bg-dark-600'
          }`}
        >
          <AnimatePresence mode="wait">
            {isPrivacyMode ? (
              <motion.div
                key="privacy-on"
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 180, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Lock className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="privacy-off"
                initial={{ rotate: 180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -180, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Unlock className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Session Timer */}
      {isPrivacyMode && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-4 left-4 z-50 bg-dark-800 rounded-2xl p-4 shadow-vault"
        >
          <div className="flex items-center space-x-3">
            <Timer className="h-5 w-5 text-zk-success" />
            <div>
              <div className="text-sm text-gray-400">Session Time</div>
              <div className="text-lg font-mono font-bold text-white">
                {formatTime(sessionTimeLeft)}
              </div>
            </div>
          </div>
          <div className="mt-2 w-full bg-dark-700 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-zk-success to-zk-primary h-2 rounded-full"
              initial={{ width: '100%' }}
              animate={{ width: `${(sessionTimeLeft / (settings.sessionTimeout * 60)) * 100}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-zk-primary to-zk-secondary rounded-3xl shadow-privacy mb-6"
            >
              <Vault className="h-10 w-10" />
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Privacy Vault
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Your zero-knowledge identity proofs are securely stored and ready for verification
            </p>
          </div>

          {/* Privacy Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12"
          >
            {/* Privacy Level */}
            <div className="bg-dark-800 rounded-2xl p-6 shadow-vault">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="h-6 w-6 text-zk-primary" />
                <h3 className="text-xl font-bold">Privacy Level</h3>
              </div>
              <div className="space-y-3">
                {['basic', 'selective', 'advanced'].map((level) => (
                  <motion.button
                    key={level}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSettings({ ...settings, proofLevel: level as any })}
                    className={`w-full p-3 rounded-xl text-left transition-all duration-300 ${
                      settings.proofLevel === level
                        ? 'bg-zk-primary text-white shadow-proof'
                        : 'bg-dark-700 hover:bg-dark-600 text-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="capitalize font-medium">{level}</span>
                      {settings.proofLevel === level && (
                        <CheckCircle className="h-5 w-5" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Obfuscation Controls */}
            <div className="bg-dark-800 rounded-2xl p-6 shadow-vault">
              <div className="flex items-center space-x-3 mb-4">
                <Eye className="h-6 w-6 text-zk-secondary" />
                <h3 className="text-xl font-bold">Obfuscation</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Blur Sensitive Data</span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSettings({ ...settings, blurSensitive: !settings.blurSensitive })}
                    className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                      settings.blurSensitive ? 'bg-zk-primary' : 'bg-dark-600'
                    }`}
                  >
                    <motion.div
                      className="absolute top-1 w-4 h-4 bg-white rounded-full"
                      animate={{ x: settings.blurSensitive ? 24 : 2 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Auto Lock</span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSettings({ ...settings, autoLock: !settings.autoLock })}
                    className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                      settings.autoLock ? 'bg-zk-primary' : 'bg-dark-600'
                    }`}
                  >
                    <motion.div
                      className="absolute top-1 w-4 h-4 bg-white rounded-full"
                      animate={{ x: settings.autoLock ? 24 : 2 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-dark-800 rounded-2xl p-6 shadow-vault">
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="h-6 w-6 text-zk-warning" />
                <h3 className="text-xl font-bold">Quick Actions</h3>
              </div>
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full p-3 bg-gradient-to-r from-zk-primary to-zk-secondary rounded-xl text-white font-medium flex items-center justify-between"
                >
                  <span>Scan QR Code</span>
                  <QrCode className="h-5 w-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowSettings(!showSettings)}
                  className="w-full p-3 bg-dark-700 hover:bg-dark-600 rounded-xl text-gray-300 font-medium flex items-center justify-between"
                >
                  <span>Advanced Settings</span>
                  <Settings className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Proofs Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {proofs.map((proof, index) => (
              <motion.div
                key={proof.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -5 }}
                onClick={() => setActiveProof(proof)}
                className="bg-dark-800 rounded-2xl p-6 shadow-vault cursor-pointer transition-all duration-300 hover:shadow-privacy"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl">{getProofIcon(proof.type)}</div>
                  <div className={`flex items-center space-x-2 ${getProofStatusColor(proof.status)}`}>
                    {proof.status === 'verified' && <CheckCircle className="h-5 w-5" />}
                    {proof.status === 'pending' && <RefreshCw className="h-5 w-5 animate-spin" />}
                    {proof.status === 'failed' && <XCircle className="h-5 w-5" />}
                    <span className="text-sm font-medium capitalize">{proof.status}</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2 capitalize">{proof.type}</h3>
                <p className="text-gray-400 text-sm mb-4">
                  {proof.timestamp.toLocaleDateString()}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Proof ID: {proof.id}</span>
                  <ArrowRight className="h-4 w-4 text-gray-500" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Proof Detail Modal */}
      <AnimatePresence>
        {activeProof && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setActiveProof(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-dark-800 rounded-3xl p-8 max-w-md w-full shadow-vault"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">{getProofIcon(activeProof.type)}</div>
                <h3 className="text-2xl font-bold mb-2 capitalize">{activeProof.type}</h3>
                <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${getProofStatusColor(activeProof.status)}`}>
                  {activeProof.status === 'verified' && <CheckCircle className="h-4 w-4" />}
                  {activeProof.status === 'pending' && <RefreshCw className="h-4 w-4 animate-spin" />}
                  {activeProof.status === 'failed' && <XCircle className="h-4 w-4" />}
                  <span className="capitalize">{activeProof.status}</span>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                {Object.entries(activeProof.data).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center p-3 bg-dark-700 rounded-xl">
                    <span className="text-gray-400 capitalize">{key}</span>
                    <span className="font-mono text-white">{String(value)}</span>
                  </div>
                ))}
              </div>

              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveProof(null)}
                  className="flex-1 p-3 bg-dark-700 hover:bg-dark-600 rounded-xl text-gray-300 font-medium"
                >
                  Close
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 p-3 bg-gradient-to-r from-zk-primary to-zk-secondary rounded-xl text-white font-medium"
                >
                  Verify
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 