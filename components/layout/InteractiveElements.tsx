'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Shield, Zap, Eye, Lock, CheckCircle, Star, Sparkles, Heart } from 'lucide-react';

export function InteractiveElements() {
  const [isAccepted, setIsAccepted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([]);

  const handleAccept = () => {
    setIsAccepted(true);
    // Create celebration particles
    const newParticles = Array.from({length: 12}, (_, i) => ({
      id: i,
      x: Math.random() * 400,
      y: Math.random() * 300
    }));
    setParticles(newParticles);
    
    // Clear particles after animation
    setTimeout(() => setParticles([]), 2000);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Interactive Accept Button */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-8 zephyr-heading">
            <span className="zephyr-gradient-text">Ready to Secure</span>
            <br />
            <span className="text-white/90">Your Digital Identity?</span>
          </h2>

          {/* Animated Accept Button */}
          <div className="relative inline-block">
            <motion.button
              className={`relative px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-500 overflow-hidden ${
                isAccepted 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-400 hover:to-purple-400'
              }`}
              onClick={handleAccept}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              disabled={isAccepted}
            >
              {/* Button Background Animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                initial={{ x: '-100%' }}
                animate={isHovered ? { x: '100%' } : { x: '-100%' }}
                transition={{ duration: 0.6 }}
              />

              {/* Button Content */}
              <div className="relative flex items-center space-x-3">
                <AnimatePresence mode="wait">
                  {!isAccepted ? (
                    <motion.div
                      key="shield"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      className="flex items-center space-x-3"
                    >
                      <Shield className="h-6 w-6" />
                      <span>Activate E.C.H.O.</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="check"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="flex items-center space-x-3"
                    >
                      <CheckCircle className="h-6 w-6" />
                      <span>E.C.H.O. Activated!</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Success Ripple Effect */}
              {isAccepted && (
                <motion.div
                  className="absolute inset-0 bg-green-400/30 rounded-2xl"
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 4, opacity: 0 }}
                  transition={{ duration: 1 }}
                />
              )}
            </motion.button>

            {/* Celebration Particles */}
            <AnimatePresence>
              {particles.map((particle) => (
                <motion.div
                  key={particle.id}
                  className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                  initial={{ 
                    x: 0, 
                    y: 0, 
                    scale: 0,
                    opacity: 1 
                  }}
                  animate={{ 
                    x: particle.x - 200, 
                    y: particle.y - 150, 
                    scale: [0, 1, 0],
                    opacity: [1, 1, 0] 
                  }}
                  transition={{ 
                    duration: 2,
                    ease: "easeOut"
                  }}
                  style={{
                    left: '50%',
                    top: '50%'
                  }}
                />
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Interactive Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <Eye className="h-8 w-8" />,
              title: "Privacy Vision",
              description: "See through the digital noise",
              color: "from-blue-500 to-cyan-500",
              delay: 0.2
            },
            {
              icon: <Zap className="h-8 w-8" />,
              title: "Lightning Speed",
              description: "Instant quantum verification",
              color: "from-yellow-500 to-orange-500",
              delay: 0.4
            },
            {
              icon: <Lock className="h-8 w-8" />,
              title: "Fort Knox Security",
              description: "Unbreakable digital fortress",
              color: "from-green-500 to-emerald-500",
              delay: 0.6
            }
          ].map((feature, index) => (
            <InteractiveCard key={index} {...feature} />
          ))}
        </div>

        {/* Floating Action Elements */}
        <div className="relative">
          <FloatingElements />
        </div>
      </div>
    </section>
  );
}

// Interactive Card Component
function InteractiveCard({ icon, title, description, color, delay }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  delay: number;
}) {
  const [isActive, setIsActive] = useState(false);

  return (
    <motion.div
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      whileHover={{ y: -10 }}
    >
      <div className="zephyr-card p-8 rounded-2xl h-full relative overflow-hidden">
        {/* Animated Background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10`}
          initial={{ scale: 0 }}
          animate={isActive ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Icon with Animation */}
        <motion.div
          className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${color} mb-6`}
          animate={isActive ? { rotate: [0, -10, 10, 0], scale: 1.1 } : { rotate: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {icon}
        </motion.div>

        {/* Content */}
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-white/70">{description}</p>

        {/* Interactive Elements */}
        <motion.div
          className="absolute top-4 right-4"
          animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Sparkles className="h-5 w-5 text-yellow-400" />
        </motion.div>
      </div>
    </motion.div>
  );
}

// Floating Elements Component
function FloatingElements() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Floating Hearts */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        >
          <Heart className="h-4 w-4 text-pink-400/30" />
        </motion.div>
      ))}

      {/* Floating Stars */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + i * 8}%`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [0.5, 1, 0.5],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        >
          <Star className="h-3 w-3 text-blue-400/40" />
        </motion.div>
      ))}

      {/* Mouse Follower */}
      <motion.div
        className="fixed w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      />
    </div>
  );
}