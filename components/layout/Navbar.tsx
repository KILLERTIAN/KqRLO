'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Shield, Moon, Sun, ChevronDown, Lock, Eye, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newTheme);
  };

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'Privacy & Security', href: '#privacy-security' },
    // { name: 'How It Works', href: '#how-it-works' },
    { name: 'About', href: '#about' },
    // { name: 'Contact', href: '#contact' }
  ];

  // const dropdownItems = [
  //   { name: 'Documentation', href: '/docs' },
  //   { name: 'API Reference', href: '/api' },
  //   { name: 'GitHub', href: 'https://github.com' },
  //   { name: 'Support', href: '/support' }
  // ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-[#0D1117]/95 backdrop-blur-lg border-b border-[#30363D] py-2'
          : 'bg-transparent py-4'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo with Enhanced Responsive Spacing */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 pr-6 sm:pr-8 md:pr-12 lg:pr-16 xl:pr-20"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-[#58A6FF] to-[#58A6FF]/80 rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="h-6 w-6 text-[#0D1117]" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-[#58A6FF] to-[#58A6FF]/80 rounded-xl blur opacity-30"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-[#C9D1D9] to-white bg-clip-text text-transparent">
                KqRLO
              </span>
              <span className="text-xs text-[#8B949E] -mt-1">Zero-Knowledge</span>
            </div>
          </motion.div>

          {/* Desktop Navigation with Perfect Alignment and Consistent Spacing */}
          <div className="hidden lg:flex items-baseline space-x-8 flex-1 justify-center pl-6 lg:pl-8">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-[#8B949E] hover:text-[#C9D1D9] transition-colors duration-200 font-medium relative group px-3 py-2 whitespace-nowrap text-sm leading-5"
                whileHover={{ y: -2 }}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#58A6FF] to-[#58A6FF]/80 group-hover:w-full transition-all duration-300"></span>
              </motion.a>
            ))}

            {/* Resources Dropdown */}
            {/* <div className="relative">
              <motion.button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-1 text-[#8B949E] hover:text-[#C9D1D9] transition-colors duration-200 font-medium px-2 py-2 whitespace-nowrap"
                whileHover={{ y: -2 }}
              >
                <span>Resources</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
              </motion.button>

               <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-48 bg-[#161B22]/95 backdrop-blur-lg border border-[#30363D] rounded-lg shadow-xl py-2"
                  >
                    {dropdownItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2 text-[#8B949E] hover:text-[#C9D1D9] hover:bg-[#58A6FF]/10 transition-colors duration-200"
                        onClick={() => setShowDropdown(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence> 
            </div> */}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-[#161B22] border border-[#30363D] text-[#8B949E] hover:text-[#C9D1D9] hover:bg-[#21262D] transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </motion.button>

            {/* Privacy Indicators */}
            <div className="hidden md:flex items-center space-x-2 px-3 py-1 bg-[#10B981]/10 border border-[#10B981]/20 rounded-full">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse"></div>
                <span className="text-xs text-[#10B981] font-medium">Secure</span>
              </div>
            </div>

            {/* CTA Button */}
            <Button className="hidden md:flex bg-[#58A6FF] hover:bg-[#58A6FF]/80 text-[#0D1117] font-semibold px-6 py-2 rounded-lg transition-all duration-300">
              <Shield className="h-4 w-4 mr-2" />
              Start Verification
            </Button>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-[#161B22] border border-[#30363D] text-[#8B949E] hover:text-[#C9D1D9] hover:bg-[#21262D] transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-4 pb-4 border-t border-[#30363D]"
            >
              <div className="flex flex-col space-y-4 pt-4">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="text-[#8B949E] hover:text-[#C9D1D9] transition-colors duration-200 font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.name}
                  </motion.a>
                ))}

                {/* Mobile Resources */}
                {/* <div className="pt-2 border-t border-[#30363D]">
                  <div className="text-sm text-[#8B949E] font-medium mb-2">Resources</div>
                  {dropdownItems.map((item, index) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block text-[#8B949E] hover:text-[#C9D1D9] transition-colors duration-200 py-1 pl-4"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div> */}

                {/* Mobile CTA */}
                <Button className="bg-[#58A6FF] hover:bg-[#58A6FF]/80 text-[#0D1117] font-semibold py-3 rounded-lg transition-all duration-300 mt-4">
                  <Shield className="h-4 w-4 mr-2" />
                  Start Verification
                </Button>

                {/* Mobile Privacy Status */}
                <div className="flex items-center justify-center space-x-2 px-3 py-2 bg-[#10B981]/10 border border-[#10B981]/20 rounded-lg mt-2">
                  <Lock className="h-4 w-4 text-[#10B981]" />
                  <span className="text-sm text-[#10B981] font-medium">End-to-End Encrypted</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Privacy Status Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="hidden md:block absolute top-full left-0 right-0 bg-[#161B22]/50 backdrop-blur-sm border-b border-[#30363D]/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-center space-x-8 text-xs text-[#8B949E]">
            <div className="flex items-center space-x-2">
              <Eye className="h-3 w-3 text-[#58A6FF]" />
              <span>No Data Selling</span>
            </div>
            <div className="flex items-center space-x-2">
              <Lock className="h-3 w-3 text-[#10B981]" />
              <span>End-to-End Encrypted</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="h-3 w-3 text-[#58A6FF]" />
              <span>Open Source</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-3 w-3 text-[#F59E0B]" />
              <span>GDPR Compliant</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
}