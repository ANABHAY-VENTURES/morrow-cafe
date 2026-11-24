import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Clock, MapPin, ShoppingBag } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { CAFE_INFO } from '../data/cafeData';

export default function Navbar({ onOpenReserve, onOpenCart, cartItemCount = 0 }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Our Story', href: '#philosophy', id: 'philosophy' },
    { label: 'Menu', href: '#menu', id: 'menu' },
    { label: 'The Space', href: '#space', id: 'space' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Journal', href: '#journal', id: 'journal' },
    { label: 'Visit', href: '#visit', id: 'visit' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Section intersection detection for active link indicator
      const sections = ['hero', ...navLinks.map((l) => l.id)];
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 900,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        backgroundColor: isScrolled ? 'rgba(245, 242, 234, 0.94)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(36, 39, 32, 0.08)' : '1px solid transparent',
        boxShadow: isScrolled ? '0 10px 30px rgba(36, 39, 32, 0.04)' : 'none',
        paddingTop: isScrolled ? '0.85rem' : '1.65rem',
        paddingBottom: isScrolled ? '0.85rem' : '1.65rem',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo with animated hover expansion */}
        <a
          href="#"
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '0.6rem',
            textDecoration: 'none',
            color: 'var(--text-primary)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.65rem',
              fontWeight: 500,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}
          >
            MORROW
          </span>
          <span
            className="jp-accent"
            style={{
              fontSize: '0.9rem',
              opacity: 0.75,
              fontWeight: 300,
            }}
          >
            明日
          </span>
          <span
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--accent-terracotta)',
              fontWeight: 600,
              marginLeft: '0.2rem',
            }}
          >
            CAFÉ
          </span>
        </a>

        {/* Desktop Navigation Links with Animated Active Indicator */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2.25rem',
          }}
          className="desktop-nav"
        >
          {navLinks.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.label}
                href={item.href}
                style={{
                  fontSize: '0.825rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontWeight: isActive ? 600 : 500,
                  position: 'relative',
                  padding: '0.35rem 0',
                  transition: 'color 0.25s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = 'var(--text-secondary)';
                }}
              >
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '1.5px',
                      backgroundColor: 'var(--accent-terracotta)',
                    }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Cart Drawer Trigger Button */}
          <button
            onClick={onOpenCart}
            aria-label={`Open order tray with ${cartItemCount} items`}
            title="View Order Tray"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.65rem 0.95rem',
              backgroundColor: cartItemCount > 0 ? 'rgba(189, 120, 95, 0.12)' : 'rgba(36, 39, 32, 0.04)',
              border: cartItemCount > 0 ? '1px solid var(--accent-terracotta)' : '1px solid rgba(36, 39, 32, 0.12)',
              borderRadius: '2px',
              color: 'var(--text-primary)',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(189, 120, 95, 0.18)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = cartItemCount > 0 ? 'rgba(189, 120, 95, 0.12)' : 'rgba(36, 39, 32, 0.04)';
            }}
          >
            <div style={{ position: 'relative' }}>
              <ShoppingBag size={16} color={cartItemCount > 0 ? 'var(--accent-terracotta)' : 'currentColor'} />
              {cartItemCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-7px',
                    width: '15px',
                    height: '15px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-terracotta)',
                    color: '#FFFFFF',
                    fontSize: '0.625rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {cartItemCount}
                </span>
              )}
            </div>
            <span className="cart-text-label">Tray</span>
          </button>

          {/* Reserve a Table Button */}
          <MagneticButton
            onClick={onOpenReserve}
            className="btn-primary"
            style={{
              padding: '0.7rem 1.45rem',
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
            }}
          >
            <span>Reserve a Table</span>
            <ArrowUpRight size={14} style={{ strokeWidth: 2 }} />
          </MagneticButton>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle"
            aria-label="Toggle navigation menu"
            style={{
              display: 'none',
              padding: '0.5rem',
              color: 'var(--text-primary)',
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Smooth Mobile Navigation Drawer with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              backgroundColor: '#FAF8F3',
              borderBottom: '1px solid rgba(36, 39, 32, 0.12)',
              padding: '2rem 1.5rem',
              boxShadow: '0 16px 36px rgba(36, 39, 32, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              overflow: 'hidden',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {navLinks.map((item, idx) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 + 0.1 }}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.45rem',
                    color: activeSection === item.id ? 'var(--accent-terracotta)' : 'var(--text-primary)',
                    textDecoration: 'none',
                    borderBottom: '1px solid rgba(36, 39, 32, 0.06)',
                    paddingBottom: '0.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span>{item.label}</span>
                  {activeSection === item.id && (
                    <span style={{ fontSize: '0.75rem', color: 'var(--accent-terracotta)' }}>• Active</span>
                  )}
                </motion.a>
              ))}
            </div>

            {/* Mobile Order Tray launcher button */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenCart) onOpenCart();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.85rem 1rem',
                backgroundColor: 'rgba(189, 120, 95, 0.1)',
                border: '1px solid var(--accent-terracotta)',
                borderRadius: '2px',
                color: 'var(--text-primary)',
                fontSize: '0.85rem',
                fontWeight: 600,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShoppingBag size={17} color="var(--accent-terracotta)" />
                <span>View Order Tray</span>
              </div>
              <span
                style={{
                  backgroundColor: 'var(--accent-terracotta)',
                  color: '#FFFFFF',
                  padding: '0.15rem 0.55rem',
                  borderRadius: '10px',
                  fontSize: '0.75rem',
                }}
              >
                {cartItemCount}
              </span>
            </button>

            <div
              style={{
                paddingTop: '0.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={15} color="var(--accent-terracotta)" />
                <span>07:30 — 21:00 Daily</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={15} color="var(--accent-terracotta)" />
                <span>142 Wood St, Indiranagar, Bengaluru</span>
              </div>
            </div>

            <MagneticButton
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReserve();
              }}
              className="btn-primary"
              style={{ width: '100%', marginTop: '0.25rem' }}
            >
              Reserve a Table
            </MagneticButton>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
          .cart-text-label {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
