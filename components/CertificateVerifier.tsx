'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useZKIdentity } from '../hooks/useZKIdentity';
import { AttributeType } from '../app/contracts/zkIdentity';
import { 
  Shield, 
  CheckCircle, 
  XCircle, 
  Search,
  AlertCircle,
  Loader2,
  Copy,
  Eye
} from 'lucide-react';

interface CertificateData {
  certificateHash: string;
  timestamp: number;
  attributeTypes: AttributeType[];
}

export function CertificateVerifier() {
  const { verifyCertificate, getAttributeName, loading } = useZKIdentity();
  
  const [userAddress, setUserAddress] = useState('');
  const [certificateJson, setCertificateJson] = useState('');
  const [verificationResult, setVerificationResult] = useState<{
    isValid: boolean;
    certificate: CertificateData;
    verifiedAt: Date;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleVerifyCertificate = async () => {
    if (!userAddress.trim()) {
      setError('Please enter a user address');
      return;
    }

    if (!certificateJson.trim()) {
      setError('Please enter certificate data');
      return;
    }

    try {
      setError(null);
      const certificate: CertificateData = JSON.parse(certificateJson);
      
      // Validate certificate structure
      if (!certificate.certificateHash || !certificate.timestamp || !Array.isArray(certificate.attributeTypes)) {
        throw new Error('Invalid certificate format');
      }

      const isValid = await verifyCertificate(userAddress, certificate);
      
      setVerificationResult({
        isValid,
        certificate,
        verifiedAt: new Date(),
      });
    } catch (err) {
      console.error('Certificate verification failed:', err);
      if (err instanceof SyntaxError) {
        setError('Invalid JSON format in certificate data');
      } else {
        setError('Certificate verification failed. Please check the data and try again.');
      }
    }
  };

  const handleClearResults = () => {
    setVerificationResult(null);
    setError(null);
  };

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setCertificateJson(text);
    } catch (err) {
      console.error('Failed to read from clipboard:', err);
      alert('Failed to read from clipboard. Please paste manually.');
    }
  };

  const sampleCertificate = {
    certificateHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    timestamp: Date.now(),
    attributeTypes: [0, 1, 2] // AGE_OVER_18, AGE_OVER_21, NATIONALITY
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center space-x-3"
        >
          <Shield className="w-8 h-8 text-green-600" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Certificate Verifier
          </h1>
        </motion.div>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Verify zero-knowledge identity certificates from users. Confirm their attributes without accessing personal information.
        </p>
      </div>

      {/* Verification Form */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Verify Certificate</h2>
        
        <div className="space-y-4">
          {/* User Address Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              User Wallet Address
            </label>
            <input
              type="text"
              value={userAddress}
              onChange={(e) => setUserAddress(e.target.value)}
              placeholder="0x1234567890abcdef1234567890abcdef12345678"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Certificate Data Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Certificate Data (JSON)
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={handlePasteFromClipboard}
                  className="text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded flex items-center space-x-1"
                >
                  <Copy className="w-3 h-3" />
                  <span>Paste</span>
                </button>
                <button
                  onClick={() => setCertificateJson(JSON.stringify(sampleCertificate, null, 2))}
                  className="text-xs bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-300 px-2 py-1 rounded flex items-center space-x-1"
                >
                  <Eye className="w-3 h-3" />
                  <span>Sample</span>
                </button>
              </div>
            </div>
            <textarea
              value={certificateJson}
              onChange={(e) => setCertificateJson(e.target.value)}
              placeholder="Paste the certificate JSON data here..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white font-mono text-sm"
              rows={8}
            />
          </div>

          {/* Error Display */}
          {error && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
            >
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <p className="text-red-800 dark:text-red-200">{error}</p>
              </div>
            </motion.div>
          )}

          {/* Verify Button */}
          <button
            onClick={handleVerifyCertificate}
            disabled={loading || !userAddress.trim() || !certificateJson.trim()}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center space-x-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
            <span>{loading ? 'Verifying...' : 'Verify Certificate'}</span>
          </button>
        </div>
      </motion.div>

      {/* Verification Results */}
      {verificationResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Verification Results</h2>
            <button
              onClick={handleClearResults}
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Clear Results
            </button>
          </div>

          {/* Verification Status */}
          <div className={`rounded-lg p-6 mb-6 ${
            verificationResult.isValid 
              ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
              : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
          }`}>
            <div className="flex items-center space-x-3">
              {verificationResult.isValid ? (
                <CheckCircle className="w-8 h-8 text-green-600" />
              ) : (
                <XCircle className="w-8 h-8 text-red-600" />
              )}
              <div>
                <h3 className={`text-lg font-semibold ${
                  verificationResult.isValid ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
                }`}>
                  {verificationResult.isValid ? 'Certificate Valid' : 'Certificate Invalid'}
                </h3>
                <p className={`text-sm ${
                  verificationResult.isValid ? 'text-green-600 dark:text-green-300' : 'text-red-600 dark:text-red-300'
                }`}>
                  {verificationResult.isValid 
                    ? 'This certificate is authentic and verified on the blockchain.'
                    : 'This certificate could not be verified. It may be invalid or tampered with.'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Certificate Details */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 dark:text-white">Certificate Details</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">User Address</h5>
                <p className="text-sm text-gray-900 dark:text-white font-mono break-all">{userAddress}</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Certificate Hash</h5>
                <p className="text-sm text-gray-900 dark:text-white font-mono break-all">
                  {verificationResult.certificate.certificateHash}
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Issue Date</h5>
                <p className="text-sm text-gray-900 dark:text-white">
                  {new Date(verificationResult.certificate.timestamp).toLocaleString()}
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Verified At</h5>
                <p className="text-sm text-gray-900 dark:text-white">
                  {verificationResult.verifiedAt.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Verified Attributes */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Verified Attributes</h5>
              <div className="space-y-2">
                {verificationResult.certificate.attributeTypes.map((attr, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-900 dark:text-white">
                      {getAttributeName(attr)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* How It Works */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6"
      >
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-4">How Certificate Verification Works</h3>
        <div className="space-y-3 text-sm text-blue-800 dark:text-blue-300">
          <div className="flex items-start space-x-2">
            <div className="w-6 h-6 bg-blue-200 dark:bg-blue-800 rounded-full flex items-center justify-center text-xs font-bold text-blue-900 dark:text-blue-200 mt-0.5">1</div>
            <p>User generates a certificate containing their verified attributes using zero-knowledge proofs.</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-6 h-6 bg-blue-200 dark:bg-blue-800 rounded-full flex items-center justify-center text-xs font-bold text-blue-900 dark:text-blue-200 mt-0.5">2</div>
            <p>The certificate is cryptographically signed and contains a hash that can be verified on-chain.</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-6 h-6 bg-blue-200 dark:bg-blue-800 rounded-full flex items-center justify-center text-xs font-bold text-blue-900 dark:text-blue-200 mt-0.5">3</div>
            <p>You can verify the certificate&apos;s authenticity without accessing any personal information.</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-6 h-6 bg-blue-200 dark:bg-blue-800 rounded-full flex items-center justify-center text-xs font-bold text-blue-900 dark:text-blue-200 mt-0.5">4</div>
            <p>The blockchain confirms the user&apos;s attributes are genuine while preserving their privacy.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}