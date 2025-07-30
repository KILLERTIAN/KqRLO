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
    <section id="about" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <Users className="h-4 w-4 text-primary mr-2" />
            <span className="text-sm text-primary font-medium">About KqRLO</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-foreground to-foreground bg-clip-text text-transparent">
              Pioneering Privacy-First Identity
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Building the future of digital identity with cutting-edge zero-knowledge technology and uncompromising privacy standards.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-card border border-border rounded-2xl p-8 mb-16 shadow-lg"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-card-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                We believe privacy is a fundamental human right in the digital age. KqRLO is building the infrastructure 
                for a world where you can prove who you are without revealing who you are. Our zero-knowledge identity 
                verification platform empowers individuals to maintain complete control over their personal data while 
                participating in the digital economy.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-muted-foreground">Privacy by design from day one</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-muted-foreground">Open source and auditable</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-muted-foreground">User-controlled data ownership</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-16 w-16 text-primary-foreground" />
              </div>
              <h4 className="text-card-foreground font-semibold mb-2">Zero-Knowledge First</h4>
              <p className="text-muted-foreground text-sm">
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
              className="bg-card border border-border rounded-xl p-6 text-center hover:bg-muted hover:border-primary/30 transition-all duration-300"
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground text-sm font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>



        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-card border border-border rounded-2xl p-8 shadow-lg"
        >
          <h3 className="text-2xl font-bold text-card-foreground mb-8 text-center">Our Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary-foreground" />
              </div>
              <h4 className="text-card-foreground font-semibold mb-2">Privacy First</h4>
              <p className="text-muted-foreground text-sm">
                Every decision we make prioritizes user privacy and data protection.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-card-foreground font-semibold mb-2">Innovation</h4>
              <p className="text-muted-foreground text-sm">
                Pushing the boundaries of what&apos;s possible with cutting-edge cryptography.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-card-foreground font-semibold mb-2">Accessibility</h4>
              <p className="text-muted-foreground text-sm">
                Making advanced privacy technology accessible to everyone, everywhere.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}