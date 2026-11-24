import React from 'react';
import { ArrowUpRight, BookOpen, Clock } from 'lucide-react';
import { JOURNAL_POSTS } from '../data/cafeData';

export default function Journal({ onReadPost }) {
  return (
    <section id="journal" className="section" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '1.5rem',
            marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
          }}
        >
          <div>
            <div className="editorial-tag">
              <span className="jp-accent">記録</span>
              <span>05 — THE JOURNAL</span>
            </div>
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
              Stories from the Bench
            </h2>
          </div>

          <p
            style={{
              maxWidth: '440px',
              color: 'var(--text-secondary)',
              fontSize: '0.95rem',
              lineHeight: 1.7,
            }}
          >
            Dispatches on coffee origins, slow fermentation, acoustic architecture,
            and the rituals that anchor our daily presence.
          </p>
        </div>

        {/* 3 Magazine Article Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(1.5rem, 3vw, 2.5rem)',
          }}
        >
          {JOURNAL_POSTS.map((post) => (
            <article
              key={post.id}
              onClick={() => onReadPost(post)}
              data-cursor="view"
              style={{
                backgroundColor: '#FAF8F3',
                borderRadius: '2px',
                border: '1px solid rgba(36, 39, 32, 0.08)',
                overflow: 'hidden',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(189, 120, 95, 0.4)';
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
                  position: 'relative',
                  aspectRatio: '16 / 10',
                  overflow: 'hidden',
                  backgroundColor: 'var(--bg-secondary)',
                }}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />

                <div
                  style={{
                    position: 'absolute',
                    top: '0.85rem',
                    left: '0.85rem',
                    backgroundColor: 'rgba(245, 242, 234, 0.94)',
                    backdropFilter: 'blur(4px)',
                    padding: '0.25rem 0.65rem',
                    fontSize: '0.7rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                  }}
                >
                  {post.category}
                </div>
              </div>

              <div
                style={{
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    marginBottom: '0.75rem',
                  }}
                >
                  <span>{post.date}</span>
                  <span>•</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Clock size={12} />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.35rem',
                    fontWeight: 500,
                    lineHeight: 1.3,
                    color: 'var(--text-primary)',
                    marginBottom: '0.85rem',
                  }}
                >
                  {post.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.875rem',
                    lineHeight: 1.65,
                    color: 'var(--text-secondary)',
                    marginBottom: '1.5rem',
                    flexGrow: 1,
                  }}
                >
                  {post.excerpt}
                </p>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.8rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--accent-terracotta)',
                    fontWeight: 600,
                  }}
                >
                  <span>Read Dispatch</span>
                  <ArrowUpRight size={14} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
