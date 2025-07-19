'use client';

import { motion } from 'framer-motion';
import { Shield, Github, Twitter, Mail } from 'lucide-react';

const footerLinks = {
  product: [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Documentation', href: '#' },
    { name: 'API Reference', href: '#' },
  ],
  company: [
    { name: 'About', href: '#about' },
    { name: 'Blog', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Contact', href: '#' },
  ],
  resources: [
    { name: 'Community', href: '#' },
    { name: 'Help Center', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
  ],
};

const socialLinks = [
  { icon: <Github className="h-5 w-5" />, href: '#', label: 'GitHub' },
  { icon: <Twitter className="h-5 w-5" />, href: '#', label: 'Twitter' },
  // { icon: <Discord className="h-5 w-5" />, href: '#', label: 'Discord' },
  { icon: <Mail className="h-5 w-5" />, href: '#', label: 'Email' },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/10">
      <div className="glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex items-center space-x-2 mb-4"
              >
                <Shield className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  ZKIdentity
                </span>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-white/70 mb-6 max-w-md"
              >
                The future of identity verification. Secure, private, and decentralized 
                identity proofs powered by zero-knowledge cryptography.
              </motion.p>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex space-x-4"
              >
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 glass rounded-full flex items-center justify-center text-white/60 hover:text-white hover:glow transition-all duration-300"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </motion.div>
            </div>

            {/* Links Sections */}
            <FooterSection title="Product" links={footerLinks.product} delay={0.3} />
            <FooterSection title="Company" links={footerLinks.company} delay={0.4} />
            <FooterSection title="Resources" links={footerLinks.resources} delay={0.5} />
          </div>

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
          >
            <p className="text-white/60 text-sm">
              © 2025 ZKIdentity. All rights reserved.
            </p>
            <p className="text-white/60 text-sm mt-4 md:mt-0">
              Built with privacy and security in mind.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}

interface FooterSectionProps {
  title: string;
  links: { name: string; href: string }[];
  delay: number;
}

function FooterSection({ title, links, delay }: FooterSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      <h3 className="text-white font-semibold mb-4">{title}</h3>
      <ul className="space-y-3">
        {links.map((link, index) => (
          <li key={index}>
            <motion.a
              href={link.href}
              whileHover={{ x: 5 }}
              className="text-white/60 hover:text-white transition-colors duration-200 text-sm"
            >
              {link.name}
            </motion.a>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}