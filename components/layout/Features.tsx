'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Key, Zap, Globe, CheckCircle, Star } from 'lucide-react';

export function Features() {
  // Main feature (Zero-Knowledge Proofs)
  const mainFeature = {
    title: "Zero-Knowledge Proofs",
    subtitle: "Mathematical Privacy Guarantees",
    description: "Prove statements about your identity without revealing any underlying data. Built on cutting-edge cryptographic protocols that provide mathematical certainty of privacy.",
    icon: <Shield className="h-8 w-8" />,
    stats: {
      privacy: "100%",
      speed: "< 2s",
      security: "Quantum-Safe"
    },
    benefits: [
      "Cryptographic proof generation without data exposure",
      "Mathematical guarantees of privacy protection",
      "Cross-chain compatibility and interoperability",
      "Quantum-resistant security protocols",
      "Real-time verification with zero latency"
    ]
  };

  // Other features for the right column
  const otherFeatures = [
    {
      title: "Self-Sovereign Identity",
      description: "Complete control over your digital identity with no central authority.",
      icon: <Key className="h-6 w-6" />,
      color: "from-[#58A6FF] to-[#7C3AED]"
    },
    {
      title: "Advanced Encryption",
      description: "Military-grade AES-256 encryption with quantum-resistant algorithms.",
      icon: <Lock className="h-6 w-6" />,
      color: "from-[#10B981] to-[#059669]"
    },
    {
      title: "Privacy-First Architecture",
      description: "Built from the ground up with privacy as the core design principle.",
      icon: <Eye className="h-6 w-6" />,
      color: "from-[#F59E0B] to-[#D97706]"
    },
    {
      title: "Real-Time Controls",
      description: "Granular privacy controls that work instantly with sub-100ms response.",
      icon: <Zap className="h-6 w-6" />,
      color: "from-[#EF4444] to-[#DC2626]"
    },
    {
      title: "Cross-Chain Privacy",
      description: "Universal protection across 10+ blockchain networks seamlessly.",
      icon: <Globe className="h-6 w-6" />,
      color: "from-[#8B5CF6] to-[#7C3AED]"
    }
  ];

  return (
    <section id="features" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <Star className="h-4 w-4 text-primary mr-2" />
            <span className="text-sm text-primary font-medium">Advanced Features</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-foreground to-foreground bg-clip-text text-transparent">
              Cutting-Edge Privacy Technology
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Revolutionary features that set new standards for digital identity protection and zero-knowledge verification.
          </p>
        </motion.div>

        {/* Two-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column - Main Feature (Zero-Knowledge Proofs) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-card border border-border rounded-2xl p-8 shadow-2xl hover:shadow-primary/10 hover:shadow-2xl transition-all duration-300"
          >
            {/* Main Feature Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-2xl mb-6">
              {mainFeature.icon}
            </div>

            {/* Main Feature Content */}
            <h3 className="text-3xl font-bold text-card-foreground mb-2">
              {mainFeature.title}
            </h3>
            <p className="text-primary text-sm font-medium mb-4">
              {mainFeature.subtitle}
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {mainFeature.description}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {Object.entries(mainFeature.stats).map(([key, value]) => (
                <div key={key} className="text-center p-4 bg-background rounded-lg border border-muted">
                  <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {value}
                  </div>
                  <div className="text-xs text-muted-foreground capitalize mt-1">{key}</div>
                </div>
              ))}
            </div>

            {/* Benefits List */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-card-foreground mb-4">Key Benefits:</h4>
              {mainFeature.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm leading-relaxed">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Other Features */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {otherFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card border border-border rounded-xl p-6 hover:bg-muted hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="flex items-start space-x-4">
                  {/* Feature Icon */}
                  <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  
                  {/* Feature Content */}
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
                
                {/* Divider (except for last item) */}
                {index < otherFeatures.length - 1 && (
                  <div className="mt-6 pt-6 border-t border-muted"></div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-card border border-border rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-card-foreground mb-4">
              Ready to Experience Zero-Knowledge Privacy?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of users who trust KqRLO for their identity verification needs.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold px-8 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-primary/25"
            >
              <Shield className="h-5 w-5 mr-2 inline" />
              Start Verification
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}