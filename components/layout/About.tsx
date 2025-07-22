'use client';

import { motion } from 'framer-motion';
import { Users, Award, Shield, Target } from 'lucide-react';

export function About() {

  const stats = [
    { number: "50+", label: "Privacy Patents" },
    { number: "10M+", label: "Users Protected" },
    { number: "99.9%", label: "Uptime" },
    { number: "0", label: "Data Breaches" }
  ];

  return (
    <section id="about" className="py-24 bg-[#0D1117]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-[#58A6FF]/10 border border-[#58A6FF]/20 rounded-full mb-6">
            <Users className="h-4 w-4 text-[#58A6FF] mr-2" />
            <span className="text-sm text-[#58A6FF] font-medium">About KqRLO</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#C9D1D9] to-white bg-clip-text text-transparent">
              Pioneering Privacy-First Identity
            </span>
          </h2>
          <p className="text-xl text-[#8B949E] max-w-3xl mx-auto">
            Building the future of digital identity with cutting-edge zero-knowledge technology and uncompromising privacy standards.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-[#161B22] border border-[#30363D] rounded-2xl p-8 mb-16 shadow-lg"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-[#C9D1D9] mb-4">Our Mission</h3>
              <p className="text-[#8B949E] mb-6 leading-relaxed">
                We believe privacy is a fundamental human right in the digital age. KqRLO is building the infrastructure 
                for a world where you can prove who you are without revealing who you are. Our zero-knowledge identity 
                verification platform empowers individuals to maintain complete control over their personal data while 
                participating in the digital economy.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#58A6FF] rounded-full" />
                  <span className="text-[#8B949E]">Privacy by design from day one</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#58A6FF] rounded-full" />
                  <span className="text-[#8B949E]">Open source and auditable</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#58A6FF] rounded-full" />
                  <span className="text-[#8B949E]">User-controlled data ownership</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-[#58A6FF] to-[#7C3AED] rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-16 w-16 text-white" />
              </div>
              <h4 className="text-[#C9D1D9] font-semibold mb-2">Zero-Knowledge First</h4>
              <p className="text-[#8B949E] text-sm">
                Every feature built with privacy as the core principle
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#161B22] border border-[#30363D] rounded-xl p-6 text-center hover:bg-[#21262D] hover:border-[#58A6FF]/30 transition-all duration-300"
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#58A6FF] to-[#7C3AED] bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-[#8B949E] text-sm font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>



        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-[#161B22] border border-[#30363D] rounded-2xl p-8 shadow-lg"
        >
          <h3 className="text-2xl font-bold text-[#C9D1D9] mb-8 text-center">Our Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#58A6FF] to-[#7C3AED] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-[#C9D1D9] font-semibold mb-2">Privacy First</h4>
              <p className="text-[#8B949E] text-sm">
                Every decision we make prioritizes user privacy and data protection.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-[#C9D1D9] font-semibold mb-2">Innovation</h4>
              <p className="text-[#8B949E] text-sm">
                Pushing the boundaries of what&apos;s possible with cutting-edge cryptography.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#F59E0B] to-[#D97706] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-[#C9D1D9] font-semibold mb-2">Accessibility</h4>
              <p className="text-[#8B949E] text-sm">
                Making advanced privacy technology accessible to everyone, everywhere.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}