import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Sparkles, Clock, Quote } from 'lucide-react';
import { EXPERIENCE_HIGHLIGHTS, PRESS_QUOTES } from '../data/cafeData';

export default function Experience() {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Coffee':
        return <Coffee size={28} strokeWidth={1.5} color="var(--accent-terracotta)" />;
      case 'Sparkles':
        return <Sparkles size={28} strokeWidth={1.5} color="var(--accent-terracotta)" />;
      case 'Clock':
        return <Clock size={28} strokeWidth={1.5} color="var(--accent-terracotta)" />;
      default:
        return <Coffee size={28} strokeWidth={1.5} color="var(--accent-terracotta)" />;
    }
  };

  return (
    <section id="experience" className="section" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            marginBottom: '4rem',
          }}
        >
          <div className="editorial-tag">
            <span className="jp-accent">体験</span>
            <span>04 — THE EXPERIENCE</span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              marginBottom: '1rem',
            }}
          >
            Curated with Care
          </h2>

          <p
            style={{
              maxWidth: '540px',
              color: 'var(--text-secondary)',
              fontSize: '1.05rem',
              lineHeight: 1.7,
            }}
          >
            Every detail at Morrow is intentional. From the temperature of our ceramic cups
            to the slow rhythm of acoustic jazz playing on vinyl.
          </p>
        </div>

        {/* 3 Experience Highlights */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(1.5rem, 3vw, 2.5rem)',
            marginBottom: 'clamp(4rem, 8vw, 6rem)',
          }}
        >
          {EXPERIENCE_HIGHLIGHTS.map((item, idx) => (
            <div
              key={item.title}
              style={{
                backgroundColor: '#FAF8F3',
                padding: 'clamp(2rem, 3vw, 2.5rem)',
                borderRadius: '2px',
                border: '1px solid rgba(36, 39, 32, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(163, 170, 145, 0.6)';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 16px 30px -10px rgba(36, 39, 32, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(36, 39, 32, 0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '2rem',
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(189, 120, 95, 0.1)',
                    borderRadius: '2px',
                  }}
                >
                  {getIcon(item.iconName)}
                </div>

                <span
                  style={{
                    fontSize: '0.725rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--accent-sage-dark)',
                    fontWeight: 600,
                  }}
                >
                  {item.badge}
                </span>
              </div>

              <div
                style={{
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.18em',
                  color: 'var(--text-muted)',
                  marginBottom: '0.4rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span>HIGHLIGHT 0{idx + 1}</span>
                <span>•</span>
                <span className="jp-accent">{item.japanese}</span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.65rem',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  marginBottom: '0.85rem',
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  fontSize: '0.925rem',
                  lineHeight: 1.7,
                  color: 'var(--text-secondary)',
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Press Quotes & Editorial Accolades */}
        <div
          style={{
            backgroundColor: '#EBE6DB',
            padding: 'clamp(2.5rem, 5vw, 4rem)',
            borderRadius: '2px',
            border: '1px solid rgba(36, 39, 32, 0.08)',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              marginBottom: '2.5rem',
            }}
          >
            <Quote
              size={32}
              color="var(--accent-terracotta)"
              style={{ margin: '0 auto 0.75rem auto', opacity: 0.8 }}
            />
            <div
              style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: 'var(--text-muted)',
                fontWeight: 600,
              }}
            >
              EDITORIAL REVIEWS & WORDS OF NOTICE
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2.5rem',
            }}
          >
            {PRESS_QUOTES.map((pq, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.15rem',
                    lineHeight: 1.6,
                    color: 'var(--text-primary)',
                    fontStyle: 'italic',
                    marginBottom: '1.25rem',
                  }}
                >
                  "{pq.quote}"
                </p>

                <div
                  style={{
                    paddingTop: '0.75rem',
                    borderTop: '1px solid rgba(36, 39, 32, 0.12)',
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {pq.source}
                  </span>
                  <span
                    style={{
                      fontSize: '0.725rem',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {pq.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
