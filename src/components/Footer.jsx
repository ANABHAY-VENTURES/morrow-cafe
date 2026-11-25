import React, { useState, useEffect } from 'react';
import { ArrowUp, Music, Radio, Mail, Heart, Check } from 'lucide-react';
import { CAFE_INFO } from '../data/cafeData';

const InstagramIcon = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [subscribedEmail, setSubscribedEmail] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    // Check if previously subscribed
    try {
      const stored = JSON.parse(localStorage.getItem('morrow_cafe_newsletter') || '[]');
      if (stored.length > 0) {
        setSubscribed(true);
        setSubscribedEmail(stored[0]);
      }
    } catch {
      // Ignore localStorage errors
    }

    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setErrorMessage('');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cleanEmail = email.trim();

    if (!cleanEmail) {
      setErrorMessage('Please enter an email address');
      return;
    }
    if (!emailRegex.test(cleanEmail)) {
      setErrorMessage('Please enter a valid email address (e.g. name@domain.com)');
      return;
    }

    try {
      const list = JSON.parse(localStorage.getItem('morrow_cafe_newsletter') || '[]');
      if (!list.includes(cleanEmail)) {
        list.unshift(cleanEmail);
        localStorage.setItem('morrow_cafe_newsletter', JSON.stringify(list));
      }
    } catch {
      // Ignore localStorage errors
    }

    setSubscribed(true);
    setSubscribedEmail(cleanEmail);
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        backgroundColor: '#242720',
        color: '#F5F2EA',
        paddingTop: 'clamp(4.5rem, 8vw, 7rem)',
        paddingBottom: '3rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        {/* Top Section: Brand Statement & Newsletter Subscription */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'clamp(2rem, 5vw, 4rem)',
            paddingBottom: 'clamp(3rem, 6vw, 4.5rem)',
            borderBottom: '1px solid rgba(245, 242, 234, 0.12)',
            alignItems: 'start',
          }}
        >
          {/* Left Brand Identity */}
          <div
            style={{
              gridColumn: 'span 6',
            }}
            className="footer-brand-col"
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.65rem', marginBottom: '1.25rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '2.4rem',
                  fontWeight: 500,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                }}
              >
                MORROW
              </span>
              <span
                style={{
                  display: 'inline-block',
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-terracotta)',
                  transform: 'translateY(-4px)',
                }}
              />
              <span
                className="jp-accent"
                style={{
                  fontSize: '1.3rem',
                  color: 'var(--accent-sage)',
                  letterSpacing: '0.2em',
                }}
              >
                明日
              </span>
              <span
                style={{
                  fontSize: '0.75rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-terracotta)',
                  fontWeight: 600,
                  marginLeft: '0.15rem',
                }}
              >
                CAFÉ
              </span>
            </div>

            <p
              style={{
                color: 'rgba(245, 242, 234, 0.7)',
                fontSize: '1rem',
                lineHeight: 1.75,
                maxWidth: '460px',
                marginBottom: '2rem',
              }}
            >
              Japanese minimalism meets European café warmth. Specialty coffee, slow fermentations,
              and tactile sanctuary in the heart of Bengaluru.
            </p>

            {/* Local Bengaluru Live Time */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.5rem 1rem',
                backgroundColor: 'rgba(245, 242, 234, 0.06)',
                borderRadius: '2px',
                border: '1px solid rgba(245, 242, 234, 0.1)',
                fontSize: '0.8rem',
                color: 'rgba(245, 242, 234, 0.85)',
              }}
            >
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: '#7F876D',
                  boxShadow: '0 0 8px #7F876D',
                }}
              />
              <span>BENGALURU (IST): <strong>{currentTime}</strong></span>
            </div>
          </div>

          {/* Right Newsletter Dispatch UI */}
          <div
            style={{
              gridColumn: 'span 6',
            }}
            className="footer-news-col"
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
              THE MORROW DISPATCH
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                color: '#F5F2EA',
                fontWeight: 400,
                marginBottom: '0.75rem',
              }}
            >
              Letters on coffee, craft, and quietude.
            </h3>

            <p
              style={{
                color: 'rgba(245, 242, 234, 0.65)',
                fontSize: '0.9rem',
                lineHeight: 1.6,
                marginBottom: '1.5rem',
              }}
            >
              Sent once a month on the new moon. Tasting notes from fresh harvests, seasonal pastry
              releases, and curated ambient playlists. No spam, ever.
            </p>

            {subscribed ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem',
                  backgroundColor: 'rgba(163, 170, 145, 0.15)',
                  border: '1px solid var(--accent-sage)',
                  borderRadius: '2px',
                  color: '#F5F2EA',
                  fontSize: '0.875rem',
                }}
              >
                <Check size={18} color="var(--accent-sage)" style={{ flexShrink: 0 }} />
                <div>
                  <div>You are subscribed to the Morrow Dispatch{subscribedEmail ? ` (${subscribedEmail})` : ''}.</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(245, 242, 234, 0.65)', marginTop: '0.2rem' }}>
                    Saved in browser demo memory. Expect seasonal brew notes and ambient soundscapes.
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errorMessage) setErrorMessage('');
                    }}
                    style={{
                      flexGrow: 1,
                      padding: '0.85rem 1.15rem',
                      backgroundColor: 'rgba(245, 242, 234, 0.08)',
                      border: errorMessage ? '1px solid #D9534F' : '1px solid rgba(245, 242, 234, 0.15)',
                      color: '#F5F2EA',
                      borderRadius: '2px',
                      fontSize: '0.875rem',
                      outline: 'none',
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      padding: '0.85rem 1.5rem',
                      backgroundColor: 'var(--accent-terracotta)',
                      color: '#FFFFFF',
                      borderRadius: '2px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      whiteSpace: 'nowrap',
                      transition: 'background-color 0.2s',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#A6644C')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent-terracotta)')}
                  >
                    Join
                  </button>
                </div>
                {errorMessage && (
                  <span style={{ fontSize: '0.75rem', color: '#D9534F', marginTop: '0.1rem' }}>
                    {errorMessage}
                  </span>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Middle Navigation & Socials Row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            padding: '2.5rem 0',
            borderBottom: '1px solid rgba(245, 242, 234, 0.08)',
          }}
        >
          {/* Quick Nav Links */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.75rem', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            <a href="#philosophy" style={{ color: 'rgba(245, 242, 234, 0.7)' }}>Our Story</a>
            <a href="#menu" style={{ color: 'rgba(245, 242, 234, 0.7)' }}>Menu</a>
            <a href="#space" style={{ color: 'rgba(245, 242, 234, 0.7)' }}>The Space</a>
            <a href="#experience" style={{ color: 'rgba(245, 242, 234, 0.7)' }}>Experience</a>
            <a href="#journal" style={{ color: 'rgba(245, 242, 234, 0.7)' }}>Journal</a>
            <a href="#visit" style={{ color: 'rgba(245, 242, 234, 0.7)' }}>Visit Us</a>
          </div>

          {/* Social and Curated Audio Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              style={{
                color: 'rgba(245, 242, 234, 0.7)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.8rem',
              }}
            >
              <InstagramIcon size={16} />
              <span>{CAFE_INFO.instagram}</span>
            </a>

            <a
              href="https://spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Spotify"
              style={{
                color: 'rgba(245, 242, 234, 0.7)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.8rem',
              }}
            >
              <Music size={16} />
              <span>Spotify Lounge</span>
            </a>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgba(245, 242, 234, 0.1)',
                color: '#F5F2EA',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent-terracotta)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(245, 242, 234, 0.1)')}
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

        {/* Bottom Colophon / Copyright */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            paddingTop: '2rem',
            fontSize: '0.775rem',
            color: 'rgba(245, 242, 234, 0.45)',
          }}
        >
          <div>
            © {new Date().getFullYear()} MORROW CAFÉ (明日喫茶). All rights reserved.
          </div>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Architectural Woodwork: Hinoki & Co.</span>
            <span>Ceramics: Kasama Pottery Guild</span>
            <span>Ethos: Slow Living</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-brand-col {
            grid-column: span 12 !important;
          }
          .footer-news-col {
            grid-column: span 12 !important;
          }
        }
      `}</style>
    </footer>
  );
}
