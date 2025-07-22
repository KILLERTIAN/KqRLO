'use client';

import { motion } from 'framer-motion';
import { Github, Twitter, Mail, Shield, Lock, Eye, Globe, Heart } from 'lucide-react';

export function Footer() {
  const links = {
    product: [
      { name: "Features", href: "#features" },
      { name: "How It Works", href: "#how-it-works" },
      { name: "Privacy & Security", href: "#privacy-security" },
      { name: "Documentation", href: "/docs" }
    ],
    company: [
      { name: "About", href: "#about" },
      { name: "Team", href: "#about" },
      { name: "Careers", href: "/careers" },
      { name: "Press Kit", href: "/press" }
    ],
    resources: [
      { name: "Blog", href: "/blog" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Security Audit", href: "/security" }
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Contact", href: "#contact" },
      { name: "System Status", href: "/status" },
      { name: "API Docs", href: "/api" }
    ]
  };

  const socialLinks = [
    { name: "Twitter", href: "https://twitter.com/kqrlo", icon: <Twitter className="h-5 w-5" /> },
    { name: "GitHub", href: "https://github.com/kqrlo", icon: <Github className="h-5 w-5" /> },
    { name: "Email", href: "mailto:hello@kqrlo.com", icon: <Mail className="h-5 w-5" /> }
  ];

  return (
    <footer className="bg-[#161B22] border-t border-[#30363D] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#58A6FF] to-[#7C3AED] rounded-xl flex items-center justify-center shadow-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-[#C9D1D9] to-white bg-clip-text text-transparent">KqRLO</span>
              </div>
              <p className="text-[#8B949E] mb-6 leading-relaxed">
                Pioneering privacy-first digital identity with zero-knowledge proofs. 
                Secure, private, and built for the future.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 bg-[#21262D] border border-[#30363D] rounded-lg flex items-center justify-center text-[#8B949E] hover:text-[#58A6FF] hover:border-[#58A6FF]/40 transition-all duration-300"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Product Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-[#C9D1D9] font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {links.product.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-[#8B949E] hover:text-[#58A6FF] transition-colors duration-200 text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-[#C9D1D9] font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {links.company.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-[#8B949E] hover:text-[#58A6FF] transition-colors duration-200 text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-[#C9D1D9] font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {links.resources.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-[#8B949E] hover:text-[#58A6FF] transition-colors duration-200 text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="text-[#C9D1D9] font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              {links.support.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-[#8B949E] hover:text-[#58A6FF] transition-colors duration-200 text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-[#0D1117] border border-[#30363D] rounded-xl p-6 mb-8"
        >
          <div className="text-center">
            <h4 className="text-[#C9D1D9] font-semibold mb-2">Stay Updated</h4>
            <p className="text-[#8B949E] text-sm mb-4">
              Get the latest updates on privacy technology and zero-knowledge proofs
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-[#21262D] border border-[#30363D] rounded-lg px-4 py-2 text-[#C9D1D9] placeholder-[#8B949E] focus:outline-none focus:ring-2 focus:ring-[#58A6FF] focus:border-transparent"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#58A6FF] to-[#7C3AED] hover:from-[#4A9EFF] hover:to-[#6D28D9] text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 whitespace-nowrap"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-[#30363D] pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <span className="text-[#8B949E] text-sm">
                © 2024 KqRLO. All rights reserved.
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse" />
                <span className="text-[#8B949E] text-sm">Privacy-First</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-1">
                <Heart className="h-4 w-4 text-[#EF4444]" />
                <span className="text-[#8B949E] text-sm">Made for privacy</span>
              </div>
              <div className="flex items-center space-x-2">
                <Lock className="h-4 w-4 text-[#58A6FF]" />
                <span className="text-[#8B949E] text-sm">Security Level:</span>
                <span className="text-[#C9D1D9] text-sm font-semibold">MAXIMUM</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}