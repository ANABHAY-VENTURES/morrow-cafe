import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PHILOSOPHY_PILLARS } from '../data/cafeData';

export default function Philosophy() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageParallax = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const smallImageParallax = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="section"
      style={{
        backgroundColor: '#EBE6DB',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative vertical Japanese calligraphy watermark */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '8%',
          left: '3%',
          writingMode: 'vertical-rl',
          textOrientation: 'upright',
          fontFamily: 'var(--font-jp)',
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          letterSpacing: '0.4em',
          color: 'rgba(36, 39, 32, 0.04)',
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        余白の美学・丁寧な時間
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header with Staggered Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 'clamp(2.5rem, 5vw, 4.5rem)' }}
        >
          <div className="editorial-tag">
            <span className="jp-accent">哲学</span>
            <span>01 — OUR PHILOSOPHY</span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: '2rem',
              alignItems: 'baseline',
            }}
          >
            <div style={{ gridColumn: 'span 7' }} className="philosophy-header-title">
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
                Good coffee. <br />
                <em
                  style={{
                    fontStyle: 'italic',
                    fontFamily: 'var(--font-serif)',
                    color: 'var(--accent-terracotta)',
                    fontWeight: 300,
                  }}
                >
                  Slow moments.
                </em>
              </h2>
            </div>

            <div style={{ gridColumn: 'span 5' }} className="philosophy-header-desc">
              <p
                style={{
                  fontSize: '1.05rem',
                  lineHeight: 1.75,
                  color: 'var(--text-secondary)',
                }}
              >
                Morrow was conceived between the quiet kissaten of Kyoto and the
                timeless salons de thé of Paris. A physical sanctuary born from the conviction
                that hurried lives deserve an unhurried corner.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Split Image and Narrative Layout with Image Clipping and Subtle Parallax */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'clamp(2rem, 5vw, 4rem)',
            alignItems: 'center',
            marginBottom: 'clamp(3.5rem, 6vw, 5.5rem)',
          }}
        >
          {/* Overlapping Image Composition */}
          <div
            style={{
              gridColumn: 'span 6',
              position: 'relative',
            }}
            className="philosophy-image-col"
          >
            {/* Main Image with clipping reveal */}
            <motion.div
              initial={{ clipPath: 'inset(15% 0% 15% 0%)', opacity: 0 }}
              whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'relative',
                aspectRatio: '4 / 5',
                overflow: 'hidden',
                borderRadius: '2px',
                boxShadow: '0 20px 40px -15px rgba(36, 39, 32, 0.14)',
                backgroundColor: 'var(--bg-tertiary)',
              }}
              data-cursor="view"
            >
              <motion.img
                src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1000&q=85"
                alt="Artisanal manual pour-over coffee extraction in ceramic dripper"
                style={{
                  width: '100%',
                  height: '112%',
                  objectFit: 'cover',
                  y: imageParallax,
                }}
              />
            </motion.div>

            {/* Overlapping Secondary Image with Parallax */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'absolute',
                bottom: '-2.5rem',
                right: '-1.5rem',
                width: '46%',
                aspectRatio: '1 / 1',
                overflow: 'hidden',
                borderRadius: '2px',
                border: '5px solid #EBE6DB',
                boxShadow: '0 20px 35px rgba(36, 39, 32, 0.12)',
                y: smallImageParallax,
                zIndex: 2,
              }}
              data-cursor="view"
              className="philosophy-small-photo"
            >
              <img
                src="https://images.unsplash.com/photo-1497636577773-f1231844b336?auto=format&fit=crop&w=600&q=85"
                alt="Fresh single-origin coffee served in handcrafted ceramic cup on Hinoki wood counter"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </motion.div>
          </div>

          {/* Narrative Column with Staggered Fade */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              gridColumn: 'span 6',
            }}
            className="philosophy-text-col"
          >
            <div style={{ paddingLeft: 'clamp(0rem, 2vw, 1.5rem)' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                  fontWeight: 400,
                  lineHeight: 1.25,
                  marginBottom: '1.5rem',
                  color: 'var(--text-primary)',
                }}
              >
                The Space Between: <br />
                Embracing the Japanese Concept of <span className="jp-accent">「間」</span>
              </h3>

              <p style={{ marginBottom: '1.25rem', lineHeight: 1.8 }}>
                In an era dominated by hyper-speed and instant gratification, we measure
                our coffee in drops rather than minutes. We do not operate fast-serve drive-thrus
                or automated pods.
              </p>

              <p style={{ marginBottom: '2rem', lineHeight: 1.8 }}>
                Every cup is ground to order, water is calibrated down to the mineral part-per-million,
                and our dough rests for 72 hours under cold fermentation to develop fragile,
                sunlit layers. Here, you are invited to reclaim your attention.
              </p>

              {/* Material tags */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.6rem',
                  paddingTop: '1.25rem',
                  borderTop: '1px solid rgba(36, 39, 32, 0.1)',
                }}
              >
                {['Honoki Cypress Wood', 'Handmade Kasama Ceramics', 'Unbleached Organic Linen', 'Direct-Farm Ethos'].map(
                  (material) => (
                    <span
                      key={material}
                      style={{
                        fontSize: '0.75rem',
                        letterSpacing: '0.06em',
                        padding: '0.4rem 0.85rem',
                        backgroundColor: 'rgba(36, 39, 32, 0.06)',
                        color: 'var(--text-primary)',
                        borderRadius: '2px',
                        fontWeight: 500,
                      }}
                    >
                      {material}
                    </span>
                  )
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* The 3 Core Pillars with Staggered Entrance */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            paddingTop: '2.5rem',
            borderTop: '1px solid rgba(36, 39, 32, 0.12)',
          }}
        >
          {PHILOSOPHY_PILLARS.map((pillar, idx) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.65, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{
                backgroundColor: 'rgba(250, 248, 243, 0.65)',
                padding: '2rem',
                borderRadius: '2px',
                border: '1px solid rgba(36, 39, 32, 0.07)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FAF8F3';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(250, 248, 243, 0.65)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div
                style={{
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-serif)',
                  color: 'var(--accent-terracotta)',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  marginBottom: '0.75rem',
                }}
              >
                PILLAR {pillar.number}
              </div>
              <h4
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.45rem',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  marginBottom: '0.75rem',
                  lineHeight: 1.25,
                }}
              >
                {pillar.title}
              </h4>
              <p
                style={{
                  fontSize: '0.9rem',
                  lineHeight: 1.7,
                  color: 'var(--text-secondary)',
                }}
              >
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .philosophy-header-title {
            grid-column: span 12 !important;
          }
          .philosophy-header-desc {
            grid-column: span 12 !important;
          }
          .philosophy-image-col {
            grid-column: span 12 !important;
            margin-bottom: 2rem;
          }
          .philosophy-text-col {
            grid-column: span 12 !important;
          }
          .philosophy-small-photo {
            right: 0.5rem !important;
            bottom: -1rem !important;
          }
        }
        @media (max-width: 500px) {
          .philosophy-small-photo {
            width: 44% !important;
            right: 0.25rem !important;
            bottom: -0.75rem !important;
          }
        }
      `}</style>
    </section>
  );
}
