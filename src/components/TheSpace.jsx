import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, Camera } from 'lucide-react';
import { SPACE_ZONES } from '../data/cafeData';

export default function TheSpace() {
  const [activeZoneIndex, setActiveZoneIndex] = useState(0);
  const activeZone = SPACE_ZONES[activeZoneIndex];

  return (
    <section id="space" className="section" style={{ backgroundColor: '#FAF8F3' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
          <div className="editorial-tag">
            <span className="jp-accent">空間</span>
            <span>03 — THE SPACE</span>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '1.5rem',
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2.4rem, 5vw, 4rem)',
                  fontWeight: 400,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  color: 'var(--text-primary)',
                }}
              >
                Built for Stillness
              </h2>
              <p
                style={{
                  maxWidth: '560px',
                  color: 'var(--text-secondary)',
                  fontSize: '1.05rem',
                  lineHeight: 1.7,
                  marginTop: '0.75rem',
                }}
              >
                An architectural sanctuary composed of honest materials: raw poured concrete,
                Japanese Hinoki cedar, natural limestone plaster, and gentle acoustic fabrics.
              </p>
            </div>

            {/* Zone Switcher Tabs */}
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                borderBottom: '1px solid rgba(36, 39, 32, 0.12)',
                paddingBottom: '0.25rem',
              }}
            >
              {SPACE_ZONES.map((zone, idx) => (
                <button
                  key={zone.id}
                  onClick={() => setActiveZoneIndex(idx)}
                  style={{
                    padding: '0.65rem 1.15rem',
                    fontSize: '0.8rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                    color: idx === activeZoneIndex ? 'var(--text-primary)' : 'var(--text-muted)',
                    borderBottom: idx === activeZoneIndex ? '2px solid var(--accent-terracotta)' : '2px solid transparent',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span className="jp-accent" style={{ marginRight: '0.35rem' }}>
                    {zone.japanese}
                  </span>
                  {zone.title.split('The ')[1] || zone.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Magazine-style Layered Composition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeZone.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: 'clamp(2rem, 5vw, 4rem)',
              alignItems: 'center',
            }}
          >
            {/* Left: Big Hero Photograph */}
            <div
              style={{
                gridColumn: 'span 7',
                position: 'relative',
              }}
              className="space-photo-col"
            >
              <div
                style={{
                  position: 'relative',
                  aspectRatio: '16 / 11',
                  overflow: 'hidden',
                  borderRadius: '2px',
                  boxShadow: '0 25px 50px -15px rgba(36, 39, 32, 0.15)',
                  backgroundColor: 'var(--bg-secondary)',
                }}
                data-cursor="view"
              >
                <motion.img
                  src={activeZone.image}
                  alt={activeZone.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  initial={{ scale: 1.08 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Subtitle tag */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '1.25rem',
                    left: '1.25rem',
                    backgroundColor: 'rgba(36, 39, 32, 0.85)',
                    backdropFilter: 'blur(8px)',
                    color: '#F5F2EA',
                    padding: '0.5rem 1rem',
                    fontSize: '0.75rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <Camera size={14} color="var(--accent-terracotta-soft)" />
                  <span>{activeZone.tagline}</span>
                </div>
              </div>
            </div>

            {/* Right: Magazine Narrative & Feature List */}
            <div
              style={{
                gridColumn: 'span 5',
              }}
              className="space-info-col"
            >
              <div
                style={{
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  color: 'var(--accent-terracotta)',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                }}
              >
                ZONE 0{activeZoneIndex + 1} • {activeZone.japanese}
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.9rem, 3.5vw, 2.75rem)',
                  fontWeight: 400,
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  color: 'var(--text-primary)',
                  marginBottom: '1.25rem',
                }}
              >
                {activeZone.title}
              </h3>

              <p
                style={{
                  fontSize: '1rem',
                  lineHeight: 1.75,
                  color: 'var(--text-secondary)',
                  marginBottom: '2rem',
                }}
              >
                {activeZone.description}
              </p>

              {/* Architectural features list */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem',
                  marginBottom: '2.5rem',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid rgba(36, 39, 32, 0.1)',
                }}
              >
                {activeZone.features.map((feature) => (
                  <div
                    key={feature}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      fontSize: '0.875rem',
                      color: 'var(--text-primary)',
                    }}
                  >
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--accent-sage-bg)',
                        color: 'var(--accent-sage-dark)',
                        flexShrink: 0,
                      }}
                    >
                      <Check size={12} strokeWidth={2.5} />
                    </span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <a href="#visit" className="btn-link">
                Reserve Seating in this Zone
                <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .space-photo-col {
            grid-column: span 12 !important;
          }
          .space-info-col {
            grid-column: span 12 !important;
          }
        }
      `}</style>
    </section>
  );
}
