import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Realistic smooth counter progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFinished(true);
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 700);
          }, 300);
          return 100;
        }
        // Organic pacing: fast start, thoughtful finish
        const step = prev < 50 ? 5 : prev < 85 ? 3 : 2;
        return Math.min(prev + step, 100);
      });
    }, 32);

    return () => clearInterval(interval);
  }, [onComplete]);

  const brandLetters = ['M', 'O', 'R', 'R', 'O', 'W'];

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            clipPath: 'inset(0% 0% 100% 0%)',
            transition: { duration: 0.8, ease: [0.77, 0, 0.175, 1] },
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            backgroundColor: '#242720',
            color: '#F5F2EA',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 'clamp(2rem, 5vw, 4rem)',
            overflow: 'hidden',
          }}
        >
          {/* Top Preloader Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.725rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(245, 242, 234, 0.6)',
              borderBottom: '1px solid rgba(245, 242, 234, 0.12)',
              paddingBottom: '1.25rem',
            }}
          >
            <span>KYOTO KISSATEN × EUROPEAN SALON</span>
            <span>BENGALURU • EST. 2024</span>
          </div>

          {/* Central Logo Sequence */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            {/* Japanese Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.75, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{
                fontFamily: 'var(--font-jp)',
                fontSize: '1.15rem',
                letterSpacing: '0.35em',
                color: 'var(--accent-sage)',
                marginBottom: '1rem',
              }}
            >
              余白の美学・明日喫茶
            </motion.div>

            {/* Letter by letter MORROW reveal */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
                marginBottom: '1.25rem',
              }}
            >
              {brandLetters.map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.75,
                    delay: 0.15 + index * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(3.5rem, 10vw, 7.5rem)',
                    fontWeight: 400,
                    letterSpacing: '0.12em',
                    lineHeight: 1,
                    display: 'inline-block',
                    color: '#F5F2EA',
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Supporting Headline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.65 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{
                fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
                fontStyle: 'italic',
                fontFamily: 'var(--font-serif)',
                letterSpacing: '0.08em',
                color: 'var(--accent-terracotta-soft)',
              }}
            >
              A little pause from everything.
            </motion.p>
          </div>

          {/* Bottom Progress Counter */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                fontSize: '0.75rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'rgba(245, 242, 234, 0.7)',
              }}
            >
              <span>PREPARING THE SPACE</span>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: '#F5F2EA' }}>
                {progress.toString().padStart(3, '0')}%
              </span>
            </div>

            {/* Hairline Progress Bar */}
            <div
              style={{
                width: '100%',
                height: '1px',
                backgroundColor: 'rgba(245, 242, 234, 0.15)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <motion.div
                style={{
                  height: '100%',
                  backgroundColor: 'var(--accent-terracotta)',
                  width: `${progress}%`,
                  transition: 'width 0.08s linear',
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
