'use client';

import { motion } from 'framer-motion';
import { Shield, Zap, Globe, Users, CheckCircle, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: <Shield className="h-12 w-12 text-blue-400" />,
    title: "Zero-Knowledge Proofs",
    description: "Prove your identity without revealing any personal information. Our advanced cryptographic protocols ensure complete privacy.",
    benefits: ["Complete anonymity", "Cryptographic security", "No data exposure"]
  },
  {
    icon: <Zap className="h-12 w-12 text-yellow-400" />,
    title: "Instant Verification",
    description: "Get verified in seconds, not days. Our streamlined process eliminates lengthy verification procedures.",
    benefits: ["Sub-second verification", "No waiting periods", "Immediate access"]
  },
  {
    icon: <Globe className="h-12 w-12 text-green-400" />,
    title: "Global Compatibility",
    description: "Works across borders and platforms. One identity verification for all your needs worldwide.",
    benefits: ["Cross-platform support", "International standards", "Universal acceptance"]
  },
  {
    icon: <Users className="h-12 w-12 text-purple-400" />,
    title: "Decentralized Network",
    description: "No single point of failure. Your identity is secured by a distributed network of validators.",
    benefits: ["No central authority", "Distributed security", "Community governed"]
  }
];

export function Features() {
  return (
    <section id="features" className="py-20 relative">
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
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Powerful Features
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Experience the future of identity verification with cutting-edge technology 
            that prioritizes your privacy and security.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="glass p-8 h-full hover:glow transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-white/70 mb-4 leading-relaxed">
                      {feature.description}
                    </p>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center text-white/60">
                          <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="glass p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to secure your digital identity?
            </h3>
            <p className="text-white/70 mb-6">
              Join thousands of users who trust ZKIdentity for their privacy-first identity verification.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 glow-hover"
            >
              Start Verification
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}