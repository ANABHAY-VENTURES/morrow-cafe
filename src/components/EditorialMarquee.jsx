import React from 'react';
import { motion } from 'framer-motion';

export default function EditorialMarquee() {
  const marqueeItems = [
    '余白の美学',
    'MA (間) — THE SPACE BETWEEN',
    '•',
    'HEIRLOOM SINGLE ORIGINS',
    '•',
    '72-HOUR COLD FERMENTATION',
    '•',
    'CEREMONIAL UJI MATCHA',
    '•',
    'AN UNHURRIED SANCTUARY',
    '•',
  ];

  return (
    <div
      style={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        padding: '1.25rem 0',
        backgroundColor: '#242720',
        color: '#F5F2EA',
        borderTop: '1px solid rgba(245, 242, 234, 0.12)',
        borderBottom: '1px solid rgba(245, 242, 234, 0.12)',
        position: 'relative',
        zIndex: 5,
        userSelect: 'none',
      }}
      aria-hidden="true"
    >
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 35,
        }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '2.5rem',
          fontSize: 'clamp(0.8rem, 1.2vw, 0.95rem)',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          fontWeight: 500,
        }}
      >
        {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((text, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1.5rem',
              color: text.includes('余白') ? 'var(--accent-sage)' : text === '•' ? 'var(--accent-terracotta)' : 'inherit',
              fontFamily: text.includes('余白') ? 'var(--font-jp)' : 'var(--font-sans)',
            }}
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
