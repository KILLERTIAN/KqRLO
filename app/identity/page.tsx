'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../../components/layout/Navbar';
import { ZKIdentityManager } from '../../components/ZKIdentityManager';
import { CertificateVerifier } from '../../components/CertificateVerifier';
import { DocumentVerifier } from '../../components/DocumentVerifier';
import { 
  Shield, 
  Users, 
  FileCheck, 
  Upload, 
  CheckCircle, 
  Lock, 
  Eye,
  ArrowRight,
  Star,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function IdentityPage() {
  const [activeView, setActiveView] = useState<'manage' | 'verify' | 'documents'>('manage');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
          
          {/* Floating Particles */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full"
            >
              <Star className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm text-primary font-medium">Zero-Knowledge Identity System</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight"
            >
              <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Verify Your Identity
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Without Revealing It
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            >
              Revolutionary zk-SNARKs technology enables you to prove your age, nationality, 
              or credentials without exposing any personal information. Complete privacy, 
              mathematical certainty.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                onClick={() => scrollToSection('features')}
                className="interactive-button px-8 py-4 text-lg font-semibold"
              >
                <Shield className="h-5 w-5 mr-2" />
                Start Verification
              </Button>
              
              <Button
                variant="outline"
                onClick={() => scrollToSection('how-it-works')}
                className="glass px-8 py-4 text-lg font-semibold border-primary/50 text-primary hover:bg-primary/10"
              >
                Learn More
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-20 right-10 bg-gradient-to-r from-primary to-primary/80 rounded-full p-3 hidden lg:block"
        >
          <Zap className="h-6 w-6 text-primary-foreground" />
        </motion.div>
      </section>

      {/* Features Overview */}
      <section id="features" className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Privacy-First Identity Verification
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Experience the future of identity verification with our cutting-edge zero-knowledge technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Privacy-Preserving",
                description: "Prove attributes like age, nationality, or credentials without revealing personal data.",
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Decentralized",
                description: "Built on blockchain technology for trustless verification without central authorities.",
                color: "from-green-500 to-green-600"
              },
              {
                icon: <FileCheck className="w-8 h-8" />,
                title: "Verifiable",
                description: "Generate cryptographic certificates that can be independently verified by third parties.",
                color: "from-purple-500 to-purple-600"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="interactive-card text-center space-y-6"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mx-auto text-white`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-card-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section id="tools" className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Identity Management Tools
            </h2>
            <p className="text-lg text-muted-foreground">
              Choose the tool that fits your needs
            </p>
          </motion.div>

          <div className="flex justify-center mb-8">
            <div className="glass rounded-xl p-2 inline-flex space-x-2">
              {[
                { id: 'manage', label: 'Manage Identity', icon: <Shield className="w-5 h-5" /> },
                { id: 'documents', label: 'Verify Documents', icon: <Upload className="w-5 h-5" /> },
                { id: 'verify', label: 'Verify Certificates', icon: <CheckCircle className="w-5 h-5" /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveView(tab.id as 'manage' | 'verify' | 'documents')}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeView === tab.id
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-[600px]"
          >
            <AnimatePresence mode="wait">
              {activeView === 'manage' && <ZKIdentityManager />}
              {activeView === 'documents' && <DocumentVerifier />}
              {activeView === 'verify' && <CertificateVerifier />}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our zero-knowledge identity system uses advanced cryptographic techniques to enable privacy-preserving verification
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* For Users */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">For Users</h3>
              </div>
              
              {[
                {
                  step: "1",
                  title: "Register Identity",
                  description: "Create a cryptographic commitment to your identity data without revealing it."
                },
                {
                  step: "2", 
                  title: "Verify Attributes",
                  description: "Use zero-knowledge proofs to verify specific attributes like age or nationality."
                },
                {
                  step: "3",
                  title: "Generate Certificates", 
                  description: "Create verifiable certificates for sharing with third parties."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* For Verifiers */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <Eye className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">For Verifiers</h3>
              </div>
              
              {[
                {
                  step: "1",
                  title: "Receive Certificate",
                  description: "Get a cryptographic certificate from a user containing verified attributes."
                },
                {
                  step: "2",
                  title: "Verify On-Chain",
                  description: "Check the certificate's authenticity against the blockchain without accessing personal data."
                },
                {
                  step: "3",
                  title: "Trust Without Privacy",
                  description: "Confirm user attributes while respecting their privacy and data sovereignty."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Built for Security & Privacy
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Your data security is our top priority. Every feature is designed with privacy-first principles.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Lock className="w-6 h-6" />, title: "End-to-End Encrypted", desc: "All data is encrypted" },
              { icon: <Shield className="w-6 h-6" />, title: "Zero-Knowledge", desc: "No personal data exposed" },
              { icon: <Eye className="w-6 h-6" />, title: "No Tracking", desc: "Complete privacy protection" },
              { icon: <CheckCircle className="w-6 h-6" />, title: "Blockchain Verified", desc: "Immutable verification" },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass p-6 text-center space-y-4 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <div className="text-primary">{feature.icon}</div>
                </div>
                <h3 className="font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}