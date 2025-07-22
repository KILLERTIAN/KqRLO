'use client';

import { motion } from 'framer-motion';
import { Wallet, Shield, Settings, CheckCircle, ArrowRight, Play } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Connect Your Wallet",
      description: "Securely connect your Web3 wallet to begin the privacy-first identity verification process.",
      icon: <Wallet className="h-8 w-8" />,
      color: "from-[#58A6FF] to-[#7C3AED]",
      details: [
        "Multi-wallet support (MetaMask, WalletConnect, etc.)",
        "Secure connection with end-to-end encryption",
        "No personal data collection during connection",
        "Instant verification and authentication"
      ]
    },
    {
      number: "02",
      title: "Generate Zero-Knowledge Proof",
      description: "Our advanced algorithms create cryptographic proofs that verify your identity without revealing any personal data.",
      icon: <Shield className="h-8 w-8" />,
      color: "from-[#10B981] to-[#059669]",
      details: [
        "Advanced zk-SNARKs cryptographic proof generation",
        "Mathematically guaranteed zero data leakage",
        "Quantum-resistant security algorithms",
        "Cross-chain compatibility and interoperability"
      ]
    },
    {
      number: "03",
      title: "Set Privacy Preferences",
      description: "Customize exactly what information you want to reveal and to whom. Full control over your data.",
      icon: <Settings className="h-8 w-8" />,
      color: "from-[#F59E0B] to-[#D97706]",
      details: [
        "Granular privacy controls for each data point",
        "Real-time adjustments and instant updates",
        "Context-aware privacy settings",
        "Temporary permissions with auto-expiry"
      ]
    },
    {
      number: "04",
      title: "Verify & Interact",
      description: "Use your privacy-protected identity across any platform or service that supports our protocol.",
      icon: <CheckCircle className="h-8 w-8" />,
      color: "from-[#EF4444] to-[#DC2626]",
      details: [
        "Cross-platform compatibility with major services",
        "Instant verification without data exposure",
        "No vendor lock-in or proprietary restrictions",
        "Universal standards and open protocols"
      ]
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-[#161B22]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-[#58A6FF]/10 border border-[#58A6FF]/20 rounded-full mb-6">
            <Play className="h-4 w-4 text-[#58A6FF] mr-2" />
            <span className="text-sm text-[#58A6FF] font-medium">How It Works</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#C9D1D9] to-white bg-clip-text text-transparent">
              Simple, Secure, Private
            </span>
          </h2>
          <p className="text-xl text-[#8B949E] max-w-3xl mx-auto">
            A straightforward process to verify your identity without compromising your personal data using zero-knowledge technology.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#161B22] border border-[#30363D] rounded-2xl p-6 hover:border-[#58A6FF]/30 transition-all duration-300 group hover:shadow-lg hover:shadow-[#58A6FF]/10"
              whileHover={{ y: -5 }}
            >
              {/* Step Number & Icon */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl font-bold bg-gradient-to-r from-[#58A6FF] to-[#7C3AED] bg-clip-text text-transparent">
                  {step.number}
                </span>
                <div className={`w-12 h-12 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                  {step.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-[#C9D1D9] mb-3 group-hover:text-white transition-colors duration-300">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-[#8B949E] mb-6 leading-relaxed">
                {step.description}
              </p>

              {/* Details */}
              <div className="space-y-3">
                {step.details.map((detail, detailIndex) => (
                  <div key={detailIndex} className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-[#58A6FF] rounded-full mt-2 flex-shrink-0" />
                    <span className="text-[#8B949E] text-sm leading-relaxed">{detail}</span>
                  </div>
                ))}
              </div>

              {/* Hover Arrow */}
              <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowRight className="h-5 w-5 text-[#58A6FF]" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-[#161B22] border border-[#30363D] rounded-2xl p-8 max-w-3xl mx-auto shadow-lg">
            <h3 className="text-2xl font-bold text-[#C9D1D9] mb-4">
              Ready to Experience Privacy-First Identity?
            </h3>
            <p className="text-[#8B949E] mb-6">
              Join thousands of users who have already secured their digital identity with zero-knowledge proofs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#58A6FF] to-[#7C3AED] hover:from-[#4A9EFF] hover:to-[#6D28D9] text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-[#58A6FF]/25"
              >
                <Shield className="h-5 w-5 mr-2 inline" />
                Get Started Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#21262D] border border-[#30363D] text-[#C9D1D9] hover:bg-[#30363D] hover:border-[#58A6FF]/30 font-semibold px-8 py-3 rounded-lg transition-all duration-300"
              >
                <ArrowRight className="h-5 w-5 mr-2 inline" />
                View Documentation
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}