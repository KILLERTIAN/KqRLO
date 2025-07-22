'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, Camera, X, CheckCircle, XCircle, AlertTriangle, Shield } from 'lucide-react';

interface QRScanResult {
  success: boolean;
  data?: string;
  error?: string;
  proofType?: string;
}

export function QRScanner({ onClose, onScan }: { onClose: () => void; onScan: (result: QRScanResult) => void }) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<QRScanResult | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      setHasPermission(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      setHasPermission(false);
      console.error('Camera permission denied:', error);
    }
  };

  const startScanning = () => {
    setIsScanning(true);
    // Simulate QR code scanning
    setTimeout(() => {
      const mockResult: QRScanResult = {
        success: Math.random() > 0.3, // 70% success rate
        data: 'zk-proof://age-verification/25+/verified/2024-01-15',
        proofType: 'age'
      };
      setScanResult(mockResult);
      setIsScanning(false);
    }, 2000);
  };

  const handleScanSuccess = () => {
    if (scanResult && onScan) {
      onScan(scanResult);
      onClose();
    }
  };

  const retryScan = () => {
    setScanResult(null);
    setIsScanning(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-dark-800 rounded-3xl p-6 max-w-md w-full shadow-vault"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-zk-primary to-zk-secondary rounded-xl flex items-center justify-center">
              <QrCode className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Scan ZK Proof</h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 bg-dark-700 hover:bg-dark-600 rounded-xl text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </motion.button>
        </div>

        {/* Camera View */}
        <div className="relative mb-6">
          <div className="aspect-square bg-dark-900 rounded-2xl overflow-hidden relative">
            {hasPermission === null && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Camera className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400">Requesting camera permission...</p>
                </div>
              </div>
            )}

            {hasPermission === false && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <AlertTriangle className="h-12 w-12 text-privacy-danger mx-auto mb-4" />
                  <p className="text-gray-400 mb-4">Camera access denied</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={requestCameraPermission}
                    className="px-4 py-2 bg-zk-primary text-white rounded-xl font-medium"
                  >
                    Grant Permission
                  </motion.button>
                </div>
              </div>
            )}

            {hasPermission && !isScanning && !scanResult && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 border-2 border-zk-primary rounded-2xl relative mb-4">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-zk-primary rounded-tl-xl"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-zk-primary rounded-tr-xl"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-zk-primary rounded-bl-xl"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-zk-primary rounded-br-xl"></div>
                  </div>
                  <p className="text-gray-400 mb-4">Position QR code within frame</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={startScanning}
                    className="px-6 py-3 bg-gradient-to-r from-zk-primary to-zk-secondary text-white rounded-xl font-medium flex items-center space-x-2 mx-auto"
                  >
                    <Camera className="h-5 w-5" />
                    <span>Start Scan</span>
                  </motion.button>
                </div>
              </div>
            )}

            {isScanning && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-32 h-32 border-2 border-zk-primary rounded-2xl relative mb-4"
                  >
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-zk-primary rounded-tl-xl"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-zk-primary rounded-tr-xl"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-zk-primary rounded-bl-xl"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-zk-primary rounded-br-xl"></div>
                  </motion.div>
                  <p className="text-zk-primary font-medium">Scanning...</p>
                </div>
              </div>
            )}

            {scanResult && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${
                      scanResult.success ? 'bg-privacy-safe' : 'bg-privacy-danger'
                    }`}
                  >
                    {scanResult.success ? (
                      <CheckCircle className="h-10 w-10 text-white" />
                    ) : (
                      <XCircle className="h-10 w-10 text-white" />
                    )}
                  </motion.div>
                  <p className={`font-medium mb-2 ${
                    scanResult.success ? 'text-privacy-safe' : 'text-privacy-danger'
                  }`}>
                    {scanResult.success ? 'Proof Verified!' : 'Scan Failed'}
                  </p>
                  {scanResult.proofType && (
                    <p className="text-gray-400 text-sm capitalize">{scanResult.proofType} verification</p>
                  )}
                </div>
              </div>
            )}

            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover opacity-0"
            />
            <canvas ref={canvasRef} className="hidden" />
          </div>
        </div>

        {/* Action Buttons */}
        <AnimatePresence mode="wait">
          {scanResult ? (
            <motion.div
              key="result-actions"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex space-x-3"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={retryScan}
                className="flex-1 p-3 bg-dark-700 hover:bg-dark-600 rounded-xl text-gray-300 font-medium"
              >
                Try Again
              </motion.button>
              {scanResult.success && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleScanSuccess}
                  className="flex-1 p-3 bg-gradient-to-r from-zk-primary to-zk-secondary rounded-xl text-white font-medium"
                >
                  Accept Proof
                </motion.button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="scan-info"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center"
            >
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-400 mb-4">
                <Shield className="h-4 w-4" />
                <span>Secure ZK Proof Verification</span>
              </div>
              <p className="text-xs text-gray-500">
                Scan a QR code containing a zero-knowledge proof to verify identity attributes without revealing personal data.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
} 