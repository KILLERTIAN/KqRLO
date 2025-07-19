'use client';

import { motion } from 'framer-motion';
import { UserPlus, Shield, CheckCircle, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';

const steps = [
  {
    icon: <UserPlus className="h-12 w-12 text-blue-400" />,
    title: "Connect Wallet",
    description: "Connect your Web3 wallet to begin the identity registration process. We support all major wallets.",
    details: ["MetaMask, WalletConnect", "Secure connection", "No personal data required"]
  },
  {
    icon: <Shield className="h-12 w-12 text-purple-400" />,
    title: "Generate Proof",
    description: "Create your zero-knowledge identity proof using advanced cryptographic algorithms that protect your privacy.",
    details: ["Zero-knowledge cryptography", "Privacy-preserving", "Mathematically secure"]
  },
  {
    icon: <CheckCircle className="h-12 w-12 text-green-400" />,
    title: "Verify & Use",
    description: "Your identity is now verified and ready to use across any platform that supports ZKIdentity protocol.",
    details: ["Instant verification", "Cross-platform compatibility", "Permanent validity"]
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Get verified in three simple steps. Our streamlined process makes identity 
            verification fast, secure, and completely private.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 opacity-30 transform -translate-y-1/2" />
          
          <div className="grid lg:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.3 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="relative"
              >
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm z-20">
                  {index + 1}
                </div>

                <Card className="glass p-8 text-center hover:glow transition-all duration-300 pt-12">
                  <div className="flex justify-center mb-6">
                    {step.icon}
                  </div>
                  
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    {step.title}
                  </h3>
                  
                  <p className="text-white/70 mb-6 leading-relaxed">
                    {step.description}
                  </p>

                  <div className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center justify-center text-white/60 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                        {detail}
                      </div>
                    ))}
                  </div>

                  {/* Arrow for desktop */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="h-6 w-6 text-white/40" />
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-white/60 mb-4">
            Ready to experience privacy-first identity verification?
          </p>
          <div className="flex justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center cursor-pointer glow-hover">
                <ArrowRight className="h-6 w-6 text-white" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}