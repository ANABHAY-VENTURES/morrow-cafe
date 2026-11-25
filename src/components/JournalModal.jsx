import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Calendar, ArrowLeft } from 'lucide-react';

export default function JournalModal({ post, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && post) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [post, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (post) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [post]);

  if (!post) return null;

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
            maxWidth: '680px',
            borderRadius: '2px',
            border: '1px solid rgba(36, 39, 32, 0.12)',
            boxShadow: '0 30px 60px -15px rgba(36, 39, 32, 0.35)',
            position: 'relative',
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
          role="dialog"
          aria-modal="true"
          aria-label={post.title}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.25rem',
              padding: '0.4rem',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              zIndex: 10,
              backgroundColor: 'rgba(245, 242, 234, 0.85)',
              borderRadius: '50%',
            }}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          {/* Cover image */}
          <div
            style={{
              position: 'relative',
              aspectRatio: '16 / 9',
              overflow: 'hidden',
              backgroundColor: 'var(--bg-secondary)',
            }}
          >
            <img
              src={post.image}
              alt={post.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>

          <div style={{ padding: 'clamp(1.75rem, 5vw, 3rem)' }}>
            {/* Meta */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontSize: '0.775rem',
                color: 'var(--text-muted)',
                marginBottom: '1rem',
              }}
            >
              <span style={{ color: 'var(--accent-terracotta)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {post.category}
              </span>
              <span>•</span>
              <span>{post.date}</span>
              <span>•</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Clock size={13} />
                <span>{post.readTime}</span>
              </div>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.4rem)',
                fontWeight: 500,
                lineHeight: 1.2,
                color: 'var(--text-primary)',
                marginBottom: '1.5rem',
              }}
            >
              {post.title}
            </h2>

            <div
              style={{
                fontSize: '1.025rem',
                lineHeight: 1.85,
                color: 'var(--text-secondary)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
              }}
            >
              <p style={{ fontStyle: 'italic', color: 'var(--text-primary)', borderLeft: '2px solid var(--accent-terracotta)', paddingLeft: '1rem' }}>
                {post.excerpt}
              </p>
              <p>{post.content}</p>
              <p>
                In the design of modern living, pauses are seldom engineered into our spaces. Morrow seeks to re-establish
                that essential equilibrium: the deliberate 4-minute wait for water to seep through organic cloth, the
                gentle aroma of toasted sesame in morning rice bowls, and sunlight tracing slow trajectories across concrete.
              </p>
              <p>
                We invite you to spend an hour without looking at a screen. Browse our collection of architecture volumes,
                order a seasonal single-origin brew, and notice the rhythm of your breath.
              </p>
            </div>

            <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(36, 39, 32, 0.1)' }}>
              <button
                onClick={onClose}
                className="btn-secondary"
                style={{ fontSize: '0.8rem', padding: '0.65rem 1.25rem' }}
              >
                <ArrowLeft size={14} />
                <span>Return to Journal</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
