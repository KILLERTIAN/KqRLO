'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Lock, Eye, EyeOff, CheckCircle, XCircle, 
  Clock, Vault, Zap
} from 'lucide-react';

interface IdentityProof {
  id: string;
  type: string;
  status: 'verified' | 'pending' | 'failed' | 'expired';
  verifiedAt: Date;
  expiresAt: Date;
  issuer: string;
  confidence: number;
  attributes: Record<string, string | number | boolean>;
}

interface IdentityCardProps {
  proofs: IdentityProof[];
  isPrivate?: boolean;
  onTogglePrivacy?: () => void;
}

export function IdentityCard({ proofs, isPrivate = false, onTogglePrivacy }: IdentityCardProps) {
  const [selectedProof, setSelectedProof] = useState<IdentityProof | null>(null);

  const getProofIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'age': return '🎂';
      case 'nationality': return '🌍';
      case 'citizenship': return '🏛️';
      case 'education': return '🎓';
      case 'employment': return '💼';
      case 'medical': return '🏥';
      case 'financial': return '💰';
      default: return '🔐';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'text-privacy-safe';
      case 'pending': return 'text-privacy-warning';
      case 'failed': return 'text-privacy-danger';
      case 'expired': return 'text-gray-500';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'failed': return <XCircle className="h-4 w-4" />;
      case 'expired': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-privacy-safe';
    if (confidence >= 70) return 'text-privacy-warning';
    return 'text-privacy-danger';
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isExpired = (proof: IdentityProof) => {
    return new Date() > proof.expiresAt;
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Identity Card Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-3xl p-8 shadow-vault mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-16 h-16 bg-gradient-to-br from-zk-primary to-zk-secondary rounded-2xl flex items-center justify-center shadow-privacy"
            >
              <Vault className="h-8 w-8 text-white" />
            </motion.div>
            <div>
              <h2 className="text-2xl font-bold text-white">Digital Identity</h2>
              <p className="text-gray-400">Zero-Knowledge Proof Collection</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onTogglePrivacy}
              className={`p-3 rounded-xl transition-all duration-300 ${
                isPrivate 
                  ? 'bg-zk-primary text-white shadow-privacy' 
                  : 'bg-dark-700 text-gray-400 hover:text-white'
              }`}
            >
              {isPrivate ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </motion.button>
            <div className="text-right">
              <div className="text-sm text-gray-400">Total Proofs</div>
              <div className="text-2xl font-bold text-white">{proofs.length}</div>
            </div>
          </div>
        </div>

        {/* Privacy Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-dark-700 rounded-2xl p-4">
            <div className="flex items-center space-x-3 mb-2">
              <Shield className="h-5 w-5 text-zk-primary" />
              <span className="text-gray-400 text-sm">Privacy Level</span>
            </div>
            <div className="text-lg font-bold text-white">
              {isPrivate ? 'Maximum' : 'Standard'}
            </div>
          </div>
          <div className="bg-dark-700 rounded-2xl p-4">
            <div className="flex items-center space-x-3 mb-2">
              <Lock className="h-5 w-5 text-zk-secondary" />
              <span className="text-gray-400 text-sm">Encryption</span>
            </div>
            <div className="text-lg font-bold text-white">End-to-End</div>
          </div>
          <div className="bg-dark-700 rounded-2xl p-4">
            <div className="flex items-center space-x-3 mb-2">
              <Zap className="h-5 w-5 text-zk-success" />
              <span className="text-gray-400 text-sm">Last Updated</span>
            </div>
            <div className="text-lg font-bold text-white">
              {formatDate(new Date())}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Proofs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {proofs.map((proof, index) => (
          <motion.div
            key={proof.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            onClick={() => setSelectedProof(proof)}
            className="bg-dark-800 rounded-2xl p-6 shadow-vault cursor-pointer transition-all duration-300 hover:shadow-privacy relative overflow-hidden group"
          >
            {/* Animated Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-zk-primary/10 to-zk-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
            />

            {/* Proof Header */}
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl">{getProofIcon(proof.type)}</div>
                <div className={`flex items-center space-x-2 ${getStatusColor(proof.status)}`}>
                  {getStatusIcon(proof.status)}
                  <span className="text-sm font-medium capitalize">
                    {isExpired(proof) ? 'expired' : proof.status}
                  </span>
                </div>
              </div>

              {/* Proof Title */}
              <h3 className="text-lg font-bold text-white mb-2 capitalize">
                {proof.type} Verification
              </h3>

              {/* Confidence Score */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Confidence</span>
                  <span className={`text-sm font-bold ${getConfidenceColor(proof.confidence)}`}>
                    {proof.confidence}%
                  </span>
                </div>
                <div className="w-full bg-dark-700 rounded-full h-2">
                  <motion.div
                    className={`h-2 rounded-full ${
                      proof.confidence >= 90 ? 'bg-privacy-safe' :
                      proof.confidence >= 70 ? 'bg-privacy-warning' : 'bg-privacy-danger'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${proof.confidence}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              </div>

              {/* Proof Details */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Issuer</span>
                  <span className="text-white font-medium">{proof.issuer}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Verified</span>
                  <span className="text-white">{formatDate(proof.verifiedAt)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Expires</span>
                  <span className={`${isExpired(proof) ? 'text-privacy-danger' : 'text-white'}`}>
                    {formatDate(proof.expiresAt)}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full mt-4 p-3 bg-gradient-to-r from-zk-primary to-zk-secondary rounded-xl text-white font-medium flex items-center justify-center space-x-2"
              >
                <Eye className="h-4 w-4" />
                <span>View Details</span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Proof Detail Modal */}
      <AnimatePresence>
        {selectedProof && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedProof(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-dark-800 rounded-3xl p-8 max-w-2xl w-full shadow-vault"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{getProofIcon(selectedProof.type)}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-white capitalize">
                      {selectedProof.type} Verification
                    </h3>
                    <div className={`flex items-center space-x-2 ${getStatusColor(selectedProof.status)}`}>
                      {getStatusIcon(selectedProof.status)}
                      <span className="text-sm font-medium capitalize">
                        {isExpired(selectedProof) ? 'expired' : selectedProof.status}
                      </span>
                    </div>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedProof(null)}
                  className="p-2 bg-dark-700 hover:bg-dark-600 rounded-xl text-gray-400 hover:text-white transition-colors"
                >
                  <XCircle className="h-6 w-6" />
                </motion.button>
              </div>

              {/* Proof Attributes */}
              <div className="space-y-4 mb-6">
                <h4 className="text-lg font-bold text-white">Verified Attributes</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(selectedProof.attributes).map(([key, value]) => (
                    <div key={key} className="bg-dark-700 rounded-xl p-4">
                      <div className="text-sm text-gray-400 capitalize mb-1">{key}</div>
                      <div className="text-white font-medium">{String(value)}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Proof Metadata */}
              <div className="bg-dark-700 rounded-2xl p-6 mb-6">
                <h4 className="text-lg font-bold text-white mb-4">Proof Metadata</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Issuer</div>
                    <div className="text-white font-medium">{selectedProof.issuer}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Confidence Score</div>
                    <div className={`font-bold ${getConfidenceColor(selectedProof.confidence)}`}>
                      {selectedProof.confidence}%
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Verified On</div>
                    <div className="text-white">{formatDate(selectedProof.verifiedAt)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Expires On</div>
                    <div className={isExpired(selectedProof) ? 'text-privacy-danger' : 'text-white'}>
                      {formatDate(selectedProof.expiresAt)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedProof(null)}
                  className="flex-1 p-3 bg-dark-700 hover:bg-dark-600 rounded-xl text-gray-300 font-medium"
                >
                  Close
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 p-3 bg-gradient-to-r from-zk-primary to-zk-secondary rounded-xl text-white font-medium"
                >
                  Export Proof
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 