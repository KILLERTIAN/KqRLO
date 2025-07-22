"use client";

import { motion } from "framer-motion";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function Logo({ size = "md", className = "" }: LogoProps) {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
    xl: "text-6xl"
  };

  return (
    <motion.div 
      className={`flex items-center space-x-3 ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* KqRLO Logo */}
      <motion.div 
        className="relative"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="zephyr-glass rounded-xl p-3 border-2 border-white/20">
          <div className={`font-bold ${sizeClasses[size]} zephyr-gradient-text tracking-wider`}>
            K<span className="text-blue-400">q</span>R<span className="text-purple-400">L</span>O
          </div>
        </div>
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-75"></div>
      </motion.div>

      {/* USAF E.C.H.O. Text */}
      <div className="flex flex-col">
        <motion.div 
          className="text-sm font-semibold text-blue-300 tracking-widest"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          U S A F
        </motion.div>
        <motion.div 
          className="text-lg font-bold text-white tracking-wider"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          E . C . H . O .
        </motion.div>
        <motion.div 
          className="text-xs text-gray-400 tracking-wide"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Enhanced Cryptographic Hybrid Operations
        </motion.div>
      </div>
    </motion.div>
  );
}

export function LogoIcon({ size = "md", className = "" }: LogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8 text-lg",
    md: "w-12 h-12 text-xl",
    lg: "w-16 h-16 text-2xl",
    xl: "w-24 h-24 text-4xl"
  };

  return (
    <motion.div 
      className={`${sizeClasses[size]} ${className} relative flex items-center justify-center`}
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="zephyr-glass rounded-xl w-full h-full flex items-center justify-center border-2 border-white/20">
        <div className="font-bold zephyr-gradient-text tracking-wider">
          K<span className="text-blue-400">q</span>R<span className="text-purple-400">L</span>O
        </div>
      </div>
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-75"></div>
    </motion.div>
  );
}