'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const galleryItems = [
  {
    title: 'Privacy Mode UI',
    description: 'Obfuscate your data with a single click. Session-based, ephemeral, and beautiful.',
    img: '/gallery/privacy-mode.svg',
    alt: 'Privacy Mode UI',
  },
  {
    title: 'Zero-Knowledge Proof Animation',
    description: 'Visualize the magic of zk-SNARKs: prove without revealing.',
    img: '/gallery/zk-proof.svg',
    alt: 'Zero-Knowledge Proof Animation',
  },
  {
    title: 'Self-Destruct Modal',
    description: 'One-click data burn. See the confirmation and feedback in action.',
    img: '/gallery/self-destruct.svg',
    alt: 'Self-Destruct Modal',
  },
  {
    title: 'Wallet Connect',
    description: 'Connect securely with animated, privacy-first wallet UI.',
    img: '/gallery/wallet-connect.svg',
    alt: 'Wallet Connect',
  },
  {
    title: 'Proof Preview',
    description: 'Preview exactly what data is revealed before submitting a proof.',
    img: '/gallery/proof-preview.svg',
    alt: 'Proof Preview',
  },
  // Add more items or replace with real screenshots as needed
];

export function FeatureGallery() {
  return (
    <section id="feature-gallery" className="privacy-section">
      <div className="privacy-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="privacy-heading">Feature Gallery</h2>
          <p className="privacy-subheading">
            Explore the privacy-first features of KqRLO in action. Each visual represents a core part of our hackathon-winning experience.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {galleryItems.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="privacy-card flex flex-col items-center p-6 hover:scale-105 transition-transform duration-300 cursor-pointer group"
            >
              <div className="w-32 h-32 mb-6 relative flex items-center justify-center">
                <Image
                  src={item.img}
                  alt={item.alt}
                  fill
                  className="object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-privacy-300 text-sm text-center">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 