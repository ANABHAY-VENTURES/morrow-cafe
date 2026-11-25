import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Sparkles, MapPin, Clock } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { CAFE_INFO } from '../data/cafeData';

export default function Hero({ onOpenReserve, onExploreMenu }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax transformations
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);
  const floatingCardY = useTransform(scrollYProgress, [0, 1], ['0%', '-24%']);

  // Word-by-word headline animation variants
  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariant = {
    hidden: { y: '100%', opacity: 0 },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        paddingTop: 'clamp(7.5rem, 13vw, 10.5rem)',
        paddingBottom: 'clamp(4rem, 8vw, 6rem)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Decorative vertical Japanese calligraphy watermark with subtle floating parallax */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '12%',
          right: '3%',
          writingMode: 'vertical-rl',
          textOrientation: 'upright',
          fontFamily: 'var(--font-jp)',
          fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
          letterSpacing: '0.45em',
          color: 'rgba(163, 170, 145, 0.18)',
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 0,
          y: useTransform(scrollYProgress, [0, 1], ['0%', '-15%']),
        }}
      >
        余白の美学・明日喫茶
      </motion.div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Top Editorial Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            paddingBottom: '1.75rem',
            borderBottom: '1px solid rgba(36, 39, 32, 0.12)',
            marginBottom: 'clamp(2.25rem, 4vw, 3.5rem)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
              style={{
                display: 'inline-block',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-terracotta)',
              }}
            />
            <span
              style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: 'var(--text-secondary)',
                fontWeight: 600,
              }}
            >
              KYOTO KISSATEN × EUROPEAN SALON
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              fontSize: '0.775rem',
              letterSpacing: '0.08em',
              color: 'var(--text-muted)',
            }}
          >
            <span>BATCH ROAST NO. 24</span>
            <span>•</span>
            <span>EST. 2024 BENGALURU</span>
          </div>
        </motion.div>

        {/* Hero Main Content Grid: Asymmetric Composition */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'clamp(1.5rem, 4vw, 3rem)',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Word-by-Word Headline & Narrative */}
          <motion.div
            style={{
              gridColumn: 'span 7',
              y: textY,
            }}
            className="hero-left-col"
          >
            {/* Tag pill */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.35rem 0.85rem',
                backgroundColor: 'rgba(163, 170, 145, 0.22)',
                color: 'var(--text-primary)',
                fontSize: '0.725rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 600,
                borderRadius: '2px',
                marginBottom: '1.5rem',
              }}
            >
              <Sparkles size={13} color="var(--accent-terracotta)" />
              <span>Sanctuary for the Senses</span>
            </motion.div>

            {/* Word by word headline reveal */}
            <motion.h1
              variants={sentence}
              initial="hidden"
              animate="visible"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.75rem, 6.2vw, 5.25rem)',
                fontWeight: 400,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)',
                marginBottom: '1.75rem',
              }}
            >
              <span style={{ display: 'block', overflow: 'hidden' }}>
                {['A', 'little', 'pause'].map((word, i) => (
                  <motion.span
                    key={i}
                    variants={wordVariant}
                    style={{ display: 'inline-block', marginRight: '0.28em' }}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>

              <span style={{ display: 'block', overflow: 'hidden' }}>
                {['from', 'everything.'].map((word, i) => (
                  <motion.span
                    key={i}
                    variants={wordVariant}
                    style={{
                      display: 'inline-block',
                      marginRight: '0.28em',
                      fontStyle: 'italic',
                      fontFamily: 'var(--font-serif)',
                      color: 'var(--accent-terracotta)',
                      fontWeight: 300,
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            {/* Supporting description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: 'clamp(1rem, 1.25vw, 1.15rem)',
                lineHeight: 1.75,
                color: 'var(--text-secondary)',
                maxWidth: '520px',
                marginBottom: '2.5rem',
                fontWeight: 400,
              }}
            >
              Slow-dripped single origins, ceremonial Uji matcha, and heritage 72-hour
              laminated viennoiserie. Crafted with deliberate stillness in the heart of
              Indiranagar.
            </motion.p>

            {/* Magnetic CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '1.25rem',
                marginBottom: '3rem',
              }}
            >
              <MagneticButton
                onClick={onExploreMenu}
                className="btn-primary"
                style={{
                  padding: '1.05rem 2.35rem',
                  fontSize: '0.85rem',
                }}
              >
                Explore Seasonal Menu
              </MagneticButton>

              <MagneticButton
                onClick={onOpenReserve}
                className="btn-secondary"
                style={{
                  padding: '1.05rem 2.15rem',
                  fontSize: '0.85rem',
                }}
              >
                Reserve a Table
              </MagneticButton>
            </motion.div>

            {/* Quick Details Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.85 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem',
                paddingTop: '1.75rem',
                borderTop: '1px solid rgba(36, 39, 32, 0.08)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <MapPin size={18} color="var(--accent-terracotta)" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.725rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)' }}>
                    Location
                  </div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)', marginTop: '2px' }}>
                    142 Wood Street, Indiranagar
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <Clock size={18} color="var(--accent-sage-dark)" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.725rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)' }}>
                    Service Hours
                  </div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)', marginTop: '2px' }}>
                    07:30 — 21:00 Daily
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Large Cinematic Photography with Clipping Reveal & Parallax */}
          <div
            style={{
              gridColumn: 'span 5',
              position: 'relative',
            }}
            className="hero-right-col"
          >
            <div style={{ position: 'relative' }}>
              {/* Main Photo Frame with clipping reveal & scale */}
              <motion.div
                initial={{ clipPath: 'inset(12% 12% 12% 12%)', opacity: 0 }}
                animate={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'relative',
                  aspectRatio: '4 / 5',
                  overflow: 'hidden',
                  borderRadius: '2px',
                  boxShadow: '0 25px 50px -12px rgba(36, 39, 32, 0.16)',
                  backgroundColor: 'var(--bg-secondary)',
                }}
                data-cursor="view"
              >
                <motion.img
                  src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=85"
                  alt="Interior of Morrow Café with warm morning sunlight falling on cedar wood and ceramics"
                  style={{
                    width: '100%',
                    height: '115%',
                    objectFit: 'cover',
                    y: imageY,
                  }}
                  initial={{ scale: 1.15 }}
                  animate={{ scale: 1.03 }}
                  transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Subtle vignette gradient overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(36,39,32,0.04) 0%, rgba(36,39,32,0.32) 100%)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Corner Japanese Seal */}
                <div
                  style={{
                    position: 'absolute',
                    top: '1.25rem',
                    right: '1.25rem',
                    backgroundColor: 'rgba(245, 242, 234, 0.94)',
                    backdropFilter: 'blur(8px)',
                    padding: '0.4rem 0.75rem',
                    fontSize: '0.7rem',
                    letterSpacing: '0.15em',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <span className="jp-accent">喫茶</span>
                  <span>MORROW 01</span>
                </div>
              </motion.div>

              {/* Floating Layered Editorial Accent Card with opposite parallax */}
              <motion.div
                initial={{ opacity: 0, x: -20, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.9, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'absolute',
                  bottom: '-2rem',
                  left: '-2rem',
                  backgroundColor: '#FAF8F3',
                  border: '1px solid rgba(36, 39, 32, 0.1)',
                  padding: '1.25rem 1.5rem',
                  borderRadius: '2px',
                  boxShadow: '0 20px 40px -10px rgba(36, 39, 32, 0.14)',
                  maxWidth: '260px',
                  zIndex: 2,
                  y: floatingCardY,
                }}
                className="hero-floating-card"
              >
                <div
                  style={{
                    fontSize: '0.675rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.18em',
                    color: 'var(--accent-terracotta)',
                    fontWeight: 600,
                    marginBottom: '0.35rem',
                  }}
                >
                  FEATURED HARVEST
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.15rem',
                    color: 'var(--text-primary)',
                    fontWeight: 500,
                    lineHeight: 1.25,
                    marginBottom: '0.35rem',
                  }}
                >
                  Ethiopian Yirgacheffe
                </div>
                <div
                  style={{
                    fontSize: '0.775rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.45,
                  }}
                >
                  Notes of wild bergamot, orange blossom & raw cane sugar.
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Scroll Down Indicator */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 'clamp(2.5rem, 5vw, 4.5rem)',
        }}
      >
        <a
          href="#philosophy"
          style={{
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.725rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          <span>Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <ArrowDown size={14} />
          </motion.div>
        </a>
      </div>

      {/* Responsive adjustments */}
      <style>{`
        @media (max-width: 960px) {
          .hero-left-col {
            grid-column: span 12 !important;
          }
          .hero-right-col {
            grid-column: span 12 !important;
            margin-top: 1.5rem;
          }
          .hero-floating-card {
            left: 1rem !important;
            bottom: -1rem !important;
          }
        }
        @media (max-width: 500px) {
          .hero-floating-card {
            position: relative !important;
            left: 0 !important;
            bottom: 0 !important;
            margin-top: 1.25rem !important;
            max-width: 100% !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
