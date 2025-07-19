'use client';

import { motion } from 'framer-motion';
import { Shield, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { XConnectButton } from '@/components/XConnectButton';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <Shield className="h-8 w-8 text-blue-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              ZKIdentity
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#how-it-works">How It Works</NavLink>
            <NavLink href="#about">About</NavLink>
            <XConnectButton />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:bg-white/10"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 mt-2 pt-4 pb-4"
          >
            <div className="flex flex-col space-y-4">
              <NavLink href="#features" mobile onClick={() => setIsOpen(false)}>
                Features
              </NavLink>
              <NavLink href="#how-it-works" mobile onClick={() => setIsOpen(false)}>
                How It Works
              </NavLink>
              <NavLink href="#about" mobile onClick={() => setIsOpen(false)}>
                About
              </NavLink>
              <div className="pt-2">
                <XConnectButton />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  mobile?: boolean;
  onClick?: () => void;
}

function NavLink({ href, children, mobile, onClick }: NavLinkProps) {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        text-white/80 hover:text-white transition-colors duration-200
        ${mobile ? 'block py-2 text-base' : 'text-sm font-medium'}
      `}
    >
      {children}
    </motion.a>
  );
}