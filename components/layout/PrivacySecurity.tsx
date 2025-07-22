'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Key, Database, Globe, CheckCircle, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

export function PrivacySecurity() {
  const [activeTab, setActiveTab] = useState('privacy');

  const privacyGuarantees = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Zero-Knowledge Proofs",
      description: "Mathematical proof of identity without revealing personal data",
      details: "Using zk-SNARKs (Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge), we can verify your credentials without ever seeing them."
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "End-to-End Encryption",
      description: "All communications encrypted with AES-256",
      details: "Every piece of data is encrypted before leaving your device and remains encrypted throughout the entire verification process."
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "No Data Collection",
      description: "We never store, sell, or share your personal information",
      details: "Our system is designed to verify without storing. Once verification is complete, no trace of your personal data remains."
    },
    {
      icon: <Key className="h-6 w-6" />,
      title: "Self-Sovereign Identity",
      description: "You control your digital identity completely",
      details: "Your identity credentials are stored locally on your device. You decide when and how to share verification proofs."
    }
  ];

  const securityFeatures = [
    {
      icon: <Database className="h-6 w-6" />,
      title: "Decentralized Architecture",
      description: "No central point of failure or data breach risk",
      status: "Active"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Open Source",
      description: "Transparent code audited by security experts",
      status: "Verified"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Quantum-Resistant",
      description: "Future-proof against quantum computing attacks",
      status: "Ready"
    }
  ];

  return (
    <section id="privacy-security" className="py-24 bg-[#161B22]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-6">
            <Shield className="h-4 w-4 text-green-400 mr-2" />
            <span className="text-sm text-green-300 font-medium">Privacy & Security</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Your Privacy is
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Mathematically Guaranteed
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Built with cutting-edge cryptographic techniques to ensure your personal 
            information never leaves your device while still enabling secure verification.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('privacy')}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                activeTab === 'privacy'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Privacy Guarantees
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                activeTab === 'security'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Security Features
            </button>
          </div>
        </motion.div>

        {/* Privacy Guarantees Tab */}
        {activeTab === 'privacy' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-8"
          >
            {privacyGuarantees.map((guarantee, index) => (
              <motion.div
                key={guarantee.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                    {guarantee.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {guarantee.title}
                    </h3>
                    <p className="text-gray-300 mb-4">
                      {guarantee.description}
                    </p>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {guarantee.details}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Security Features Tab */}
        {activeTab === 'security' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300 mb-4">
                  {feature.description}
                </p>
                <div className="inline-flex items-center px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  <span className="text-sm text-green-300 font-medium">{feature.status}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Privacy Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16"
        >
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white text-center mb-8">
              Privacy & Security Certifications
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: "🔒", label: "End-to-End Encryption", status: "Verified" },
                { icon: "🚫", label: "No Data Selling", status: "Guaranteed" },
                { icon: "🌐", label: "Open Source", status: "Audited" },
                { icon: "🛡️", label: "GDPR Compliant", status: "Certified" }
              ].map((badge, index) => (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-4 bg-white/5 rounded-lg border border-white/10"
                >
                  <div className="text-3xl mb-2">{badge.icon}</div>
                  <div className="text-sm font-medium text-white mb-1">{badge.label}</div>
                  <div className="text-xs text-green-400">{badge.status}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Data Flow Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            How Your Data Stays Private
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Local Processing",
                description: "Your credentials are processed locally on your device",
                icon: <Database className="h-8 w-8" />
              },
              {
                step: "2",
                title: "Zero-Knowledge Proof",
                description: "Mathematical proof is generated without revealing data",
                icon: <Key className="h-8 w-8" />
              },
              {
                step: "3",
                title: "Verification",
                description: "Proof is verified without accessing personal information",
                icon: <CheckCircle className="h-8 w-8" />
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center flex flex-col items-center"
              >
                <div className="flex flex-col items-center mb-6">
                  {/* Step Number - Centered above icon */}
                  <div className="w-8 h-8 bg-[#58A6FF] rounded-full flex items-center justify-center text-sm font-bold text-[#0D1117] mb-4">
                    {step.step}
                  </div>
                  {/* Icon - Centered below number */}
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#58A6FF] to-[#7C3AED] rounded-full text-white">
                    {step.icon}
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-[#C9D1D9] mb-2">{step.title}</h4>
                <p className="text-[#8B949E]">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}