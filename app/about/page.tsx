'use client';

import { motion } from 'framer-motion';
import { Shield, Users, Globe, Zap, TrendingUp, Award } from 'lucide-react';
import { Card } from '@/components/ui/card';

const stats = [
  { icon: <Users className="h-8 w-8 text-blue-400" />, value: '10K+', label: 'Verified Users' },
  { icon: <Shield className="h-8 w-8 text-green-400" />, value: '99.9%', label: 'Security Rate' },
  { icon: <Globe className="h-8 w-8 text-purple-400" />, value: '50+', label: 'Countries' },
  { icon: <Zap className="h-8 w-8 text-yellow-400" />, value: '<1s', label: 'Verification Time' },
];

const values = [
  {
    icon: <Shield className="h-12 w-12 text-blue-400" />,
    title: 'Privacy First',
    description: 'We believe privacy is a fundamental right. Our zero-knowledge approach ensures your personal data never leaves your control.'
  },
  {
    icon: <TrendingUp className="h-12 w-12 text-green-400" />,
    title: 'Innovation Driven',
    description: 'Constantly pushing the boundaries of what\'s possible with cryptographic technology and blockchain innovation.'
  },
  {
    icon: <Award className="h-12 w-12 text-purple-400" />,
    title: 'Excellence',
    description: 'Committed to delivering the highest quality identity verification solutions with uncompromising security standards.'
  },
];

export function About() {
  return (
    <section id="about" className="py-20 relative">
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
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              About ZKIdentity
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            We&apos;re building the future of digital identity verification, where privacy 
            and security aren&apos;t just features—they&apos;re fundamental principles.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="glass p-6 text-center hover:glow transition-all duration-300">
                <div className="flex justify-center mb-3">
                  {stat.icon}
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-white/60 text-sm">
                  {stat.label}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="glass p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Our Mission
            </h3>
            <p className="text-lg text-white/80 leading-relaxed max-w-4xl mx-auto">
              To democratize identity verification by making it accessible, secure, and private for everyone. 
              We envision a world where individuals have complete control over their digital identity, 
              free from the constraints of centralized authorities and the risks of data breaches.
            </p>
          </Card>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center text-white mb-12">
            Our Values
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 * index }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Card className="glass p-8 text-center h-full hover:glow transition-all duration-300">
                  <div className="flex justify-center mb-6">
                    {value.icon}
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-4">
                    {value.title}
                  </h4>
                  <p className="text-white/70 leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technology Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card className="glass p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  Cutting-Edge Technology
                </h3>
                <p className="text-white/80 leading-relaxed mb-6">
                  Built on the latest advancements in zero-knowledge cryptography and blockchain technology. 
                  Our protocol leverages zk-SNARKs to enable privacy-preserving identity verification 
                  without compromising on security or usability.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-white/70">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge (zk-SNARKs)
                  </div>
                  <div className="flex items-center text-white/70">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                    Ethereum Virtual Machine (EVM) Compatible Smart Contracts
                  </div>
                  <div className="flex items-center text-white/70">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    Decentralized Identity Standards (DID)
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="w-full h-64 glass rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Shield className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                    <p className="text-white/60">Secure Architecture</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}