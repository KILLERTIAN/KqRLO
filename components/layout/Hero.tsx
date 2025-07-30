'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Eye, ArrowRight, CheckCircle, Zap, Globe, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const zkFeatures = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Zero-Knowledge Proofs",
      description: "Prove your identity without revealing personal data"
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "End-to-End Encryption",
      description: "Military-grade encryption for all communications"
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Complete Privacy",
      description: "No data collection, no tracking, no selling"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % zkFeatures.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [zkFeatures.length]);

  const handleVerification = async () => {
    setIsVerifying(true);
    // Simulate zk-SNARK verification process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsVerifying(false);
    setIsVerified(true);
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-background">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
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
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-8"
            >
              <Star className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm text-primary font-medium">Zero-Knowledge Technology</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-foreground via-foreground to-foreground bg-clip-text text-transparent">
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
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg text-foreground mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              Revolutionary zk-SNARKs technology enables you to prove your age, nationality, 
              or credentials without exposing any personal information. Complete privacy, 
              mathematical certainty.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                onClick={handleVerification}
                disabled={isVerifying || isVerified}
                className="bg-primary hover:bg-primary/80 text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center"
              >
                {isVerifying ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2"></div>
                    Generating Proof...
                  </>
                ) : isVerified ? (
                  <>
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Identity Verified
                  </>
                ) : (
                  <>
                    <Shield className="h-5 w-5 mr-2" />
                    Start Verification
                  </>
                )}
              </Button>
              
              <Button
                variant="outline"
                className="border-primary/50 text-primary hover:bg-primary/10 px-8 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Learn More
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </motion.div>


          </motion.div>

          {/* Right Column - Interactive Demo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* Feature Showcase */}
            <div className="bg-card/80 backdrop-blur-lg border border-border rounded-2xl p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFeature}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-primary/80 rounded-full mb-6">
                    {zkFeatures[currentFeature].icon}
                  </div>
                  <h3 className="text-xl font-semibold text-card-foreground mb-3">
                    {zkFeatures[currentFeature].title}
                  </h3>
                  <p className="text-muted-foreground">
                    {zkFeatures[currentFeature].description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Feature Indicators */}
              <div className="flex justify-center mt-8 space-x-2">
                {zkFeatures.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentFeature(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentFeature 
                        ? 'bg-primary w-8' 
                        : 'bg-border hover:bg-muted-foreground'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-4 -right-4 bg-gradient-to-r from-primary to-primary/80 rounded-full p-3"
            >
              <Zap className="h-6 w-6 text-primary-foreground" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}