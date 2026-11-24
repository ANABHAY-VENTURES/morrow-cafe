import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Check, ArrowRight, Calendar, Tag } from 'lucide-react';
import MagneticButton from './MagneticButton';

export default function ItemModal({ item, onClose, onReserveTable, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  if (!item) return null;

  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart(item, quantity);
      setJustAdded(true);
      setTimeout(() => {
        setJustAdded(false);
      }, 1600);
    }
  };

  const getCategoryLabel = (catId) => {
    switch (catId) {
      case 'coffee':
        return 'Specialty Coffee';
      case 'tea':
        return 'Ceremonial Matcha & Tea';
      case 'pastry':
        return 'Heritage Pastries';
      case 'plates':
        return 'Breakfast & Slow Plates';
      default:
        return 'Curated Selection';
    }
  };

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          backgroundColor: 'rgba(36, 39, 32, 0.65)',
          backdropFilter: 'blur(8px)',
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundColor: '#FAF8F3',
            width: '100%',
            maxWidth: '640px',
            borderRadius: '2px',
            border: '1px solid rgba(36, 39, 32, 0.12)',
            boxShadow: '0 30px 60px -15px rgba(36, 39, 32, 0.35)',
            position: 'relative',
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
          role="dialog"
          aria-modal="true"
          aria-label={item.name}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.25rem',
              padding: '0.45rem',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              zIndex: 10,
              backgroundColor: 'rgba(245, 242, 234, 0.9)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(36, 39, 32, 0.08)',
            }}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          {/* Large Image Header */}
          <div
            style={{
              position: 'relative',
              aspectRatio: '16 / 10',
              overflow: 'hidden',
              backgroundColor: 'var(--bg-secondary)',
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />

            <div
              style={{
                position: 'absolute',
                top: '1.25rem',
                left: '1.25rem',
                backgroundColor: 'rgba(245, 242, 234, 0.94)',
                padding: '0.35rem 0.75rem',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                borderRadius: '1px',
              }}
            >
              <span className="jp-accent">{item.japanese}</span>
            </div>

            {/* Category tag */}
            <div
              style={{
                position: 'absolute',
                bottom: '1.25rem',
                left: '1.25rem',
                backgroundColor: 'rgba(36, 39, 32, 0.85)',
                color: '#F5F2EA',
                padding: '0.3rem 0.75rem',
                fontSize: '0.7rem',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                borderRadius: '1px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
            >
              <Tag size={12} color="var(--accent-terracotta-soft)" />
              <span>{getCategoryLabel(item.category)}</span>
            </div>

            {item.badge && (
              <div
                style={{
                  position: 'absolute',
                  top: '1.25rem',
                  right: '3.75rem',
                  backgroundColor: 'var(--accent-terracotta)',
                  color: '#FFFFFF',
                  padding: '0.35rem 0.85rem',
                  fontSize: '0.725rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  borderRadius: '1px',
                }}
              >
                {item.badge}
              </div>
            )}
          </div>

          {/* Details Body */}
          <div style={{ padding: 'clamp(1.5rem, 4vw, 2.25rem)' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                gap: '1rem',
                marginBottom: '0.75rem',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.85rem',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  lineHeight: 1.2,
                  margin: 0,
                }}
              >
                {item.name}
              </h3>
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.85rem',
                  fontWeight: 600,
                  color: 'var(--accent-terracotta)',
                  whiteSpace: 'nowrap',
                }}
              >
                ₹{item.price}
              </div>
            </div>

            <p
              style={{
                fontSize: '0.95rem',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                marginBottom: '1.5rem',
              }}
            >
              {item.description}
            </p>

            {/* Sensory Tasting Specs */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                padding: '1.25rem',
                borderRadius: '2px',
                border: '1px solid rgba(36, 39, 32, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
                fontSize: '0.85rem',
                marginBottom: '1.5rem',
              }}
            >
              <div>
                <strong style={{ color: 'var(--text-primary)' }}>Sensory Notes: </strong>
                <span style={{ color: 'var(--text-secondary)' }}>{item.notes}</span>
              </div>
              <div>
                <strong style={{ color: 'var(--text-primary)' }}>Terroir / Origin: </strong>
                <span style={{ color: 'var(--text-secondary)' }}>{item.origin}</span>
              </div>
              {item.pairing && (
                <div>
                  <strong style={{ color: 'var(--accent-terracotta)' }}>Recommended Pairing: </strong>
                  <span style={{ color: 'var(--text-secondary)' }}>{item.pairing}</span>
                </div>
              )}
            </div>

            {/* Tags */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
                marginBottom: '2rem',
              }}
            >
              {item.tags.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: '0.75rem',
                    padding: '0.3rem 0.65rem',
                    backgroundColor: 'rgba(36, 39, 32, 0.05)',
                    color: 'var(--text-primary)',
                    borderRadius: '2px',
                    fontWeight: 500,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Ordering Controls & CTAs */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid rgba(36, 39, 32, 0.1)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                {/* Quantity selector */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    border: '1px solid rgba(36, 39, 32, 0.15)',
                    borderRadius: '2px',
                    backgroundColor: '#FFFFFF',
                    height: '46px',
                  }}
                >
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    style={{
                      padding: '0 0.85rem',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-primary)',
                      borderRight: '1px solid rgba(36, 39, 32, 0.08)',
                    }}
                  >
                    <Minus size={14} />
                  </button>

                  <span
                    style={{
                      padding: '0 1rem',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      minWidth: '36px',
                      textAlign: 'center',
                    }}
                  >
                    {quantity}
                  </span>

                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                    style={{
                      padding: '0 0.85rem',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-primary)',
                      borderLeft: '1px solid rgba(36, 39, 32, 0.08)',
                    }}
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Add to Order Button */}
                <MagneticButton
                  onClick={handleAdd}
                  className="btn-primary"
                  style={{
                    flexGrow: 1,
                    height: '46px',
                    backgroundColor: justAdded ? 'var(--accent-sage-dark)' : 'var(--text-primary)',
                  }}
                >
                  {justAdded ? (
                    <>
                      <Check size={16} strokeWidth={2.5} />
                      <span>Added {quantity} to Order ✓</span>
                    </>
                  ) : (
                    <>
                      <span>Add to Order • ₹{item.price * quantity}</span>
                      <ArrowRight size={14} />
                    </>
                  )}
                </MagneticButton>
              </div>

              {/* Table reservation secondary CTA */}
              <button
                onClick={() => {
                  onClose();
                  if (onReserveTable) onReserveTable();
                }}
                className="btn-secondary"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  fontSize: '0.775rem',
                }}
              >
                <Calendar size={13} style={{ marginRight: '0.4rem' }} />
                <span>Reserve a Table for Tasting Flight</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
