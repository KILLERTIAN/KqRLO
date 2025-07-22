'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Eye, ArrowRight, Sparkles, Zap, Globe, Star, Heart, Radar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { XConnectButton } from '@/components/XConnectButton';
import { useState, useEffect } from 'react';

export function EnhancedHero() {
  const [isAccepted, setIsAccepted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, color: string}>>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleAcceptEcho = () => {
    setIsAccepted(true);
    // Create celebration particles
    const colors = ['#3B82F6', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B'];
    const newParticles = Array.from({length: 20}, (_, i) => ({
      id: i,
      x: Math.random() * 800 - 400,
      y: Math.random() * 600 - 300,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    setParticles(newParticles);
    
    setTimeout(() => setParticles([]), 3000);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden zephyr-bg pt-20">
      {/* Interactive Background */}
      <div className="absolute inset-0">
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        
        {/* Floating Elements */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Mouse Follower Effect */}
        <motion.div
          className="fixed w-8 h-8 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full pointer-events-none z-10 blur-sm"
          animate={{
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 28,
          }}
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          {/* USAF E.C.H.O. Badge with Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <motion.div 
              className="zephyr-glass rounded-2xl px-8 py-4 border-2 border-blue-500/30 relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <div className="flex items-center space-x-4 relative">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Radar className="h-8 w-8 text-blue-400" />
                </motion.div>
                <div className="text-left">
                  <motion.div 
                    className="text-sm font-bold text-blue-300 tracking-widest"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    U S A F
                  </motion.div>
                  <div className="text-xl font-bold text-white tracking-wider">E . C . H . O .</div>
                  <div className="text-xs text-gray-400 tracking-wide">Enhanced Cryptographic Hybrid Operations</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Main Heading with Typewriter Effect */}
          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
            >
              <motion.span 
                className="zephyr-gradient-text zephyr-heading block mb-4"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                K q R L O
              </motion.span>
              <motion.span 
                className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Privacy System
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            >
              Revolutionary military-grade privacy system with quantum-resistant encryption, 
              zero-knowledge proofs, and advanced cryptographic hybrid operations.
            </motion.p>
          </div>

          {/* Interactive Accept Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="relative"
          >
            <motion.button
              className={`relative px-16 py-6 rounded-2xl font-bold text-2xl transition-all duration-500 overflow-hidden ${
                isAccepted 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-400 hover:to-purple-400'
              }`}
              onClick={handleAcceptEcho}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              disabled={isAccepted}
            >
              {/* Animated Background Shine */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: '200%' }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  repeatDelay: 3,
                  ease: "easeInOut" 
                }}
              />

              {/* Button Content */}
              <div className="relative flex items-center space-x-4">
                <AnimatePresence mode="wait">
                  {!isAccepted ? (
                    <motion.div
                      key="activate"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      className="flex items-center space-x-4"
                    >
                      <Shield className="h-8 w-8" />
                      <span>Activate E.C.H.O.</span>
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Sparkles className="h-6 w-6" />
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="activated"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="flex items-center space-x-4"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.5, repeat: 3 }}
                      >
                        <Shield className="h-8 w-8 text-green-300" />
                      </motion.div>
                      <span>E.C.H.O. Activated!</span>
                      <Heart className="h-6 w-6 text-pink-400" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Success Ripple Effect */}
              {isAccepted && (
                <>
                  <motion.div
                    className="absolute inset-0 bg-green-400/30 rounded-2xl"
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 4, opacity: 0 }}
                    transition={{ duration: 1.5 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-emerald-400/20 rounded-2xl"
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 6, opacity: 0 }}
                    transition={{ duration: 2, delay: 0.5 }}
                  />
                </>
              )}
            </motion.button>

            {/* Celebration Particles */}
            <AnimatePresence>
              {particles.map((particle) => (
                <motion.div
                  key={particle.id}
                  className="absolute w-3 h-3 rounded-full"
                  style={{ backgroundColor: particle.color }}
                  initial={{ 
                    x: 0, 
                    y: 0, 
                    scale: 0,
                    opacity: 1 
                  }}
                  animate={{ 
                    x: particle.x, 
                    y: particle.y, 
                    scale: [0, 1.5, 0],
                    opacity: [1, 1, 0],
                    rotate: [0, 360]
                  }}
                  transition={{ 
                    duration: 3,
                    ease: "easeOut"
                  }}
                  style={{
                    left: '50%',
                    top: '50%'
                  }}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Secondary Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <XConnectButton />
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="zephyr-button text-white font-semibold px-8 py-4 text-lg border-white/20 hover:border-white/40 relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative flex items-center">
                  Learn More
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </motion.div>
                </span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Enhanced Stats with Animations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-16 border-t border-white/10"
          >
            {[
              { number: "256-bit", label: "Quantum Encryption", icon: <Lock className="h-6 w-6" /> },
              { number: "0ms", label: "Verification Time", icon: <Zap className="h-6 w-6" /> },
              { number: "100%", label: "Privacy Guaranteed", icon: <Eye className="h-6 w-6" /> },
              { number: "∞", label: "Security Level", icon: <Shield className="h-6 w-6" /> },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                className="text-center zephyr-card rounded-xl p-6 group hover:scale-105 transition-transform"
              >
                <motion.div
                  className="flex justify-center mb-3 text-blue-400"
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
                  {stat.icon}
                </motion.div>
                <motion.div 
                  className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent"
                  animate={{ 
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-gray-400 mt-2 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center zephyr-glass relative overflow-hidden"
        >
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="w-1.5 h-4 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full mt-2"
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent"
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}