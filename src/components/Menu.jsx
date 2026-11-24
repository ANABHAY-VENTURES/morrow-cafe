import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Search, X, Plus, Check, ShoppingBag } from 'lucide-react';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/cafeData';

export default function Menu({ onSelectItem, onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedItems, setAddedItems] = useState({}); // { [itemId]: boolean }

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.notes.toLowerCase().includes(q) ||
        item.origin.toLowerCase().includes(q) ||
        (item.japanese && item.japanese.includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleQuickAdd = (e, item) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(item, 1);
    }
    setAddedItems((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [item.id]: false }));
    }, 1400);
  };

  const getCategoryLabel = (catId) => {
    switch (catId) {
      case 'coffee':
        return 'Specialty Coffee';
      case 'tea':
        return 'Matcha & Tea';
      case 'pastry':
        return 'Bakery';
      case 'plates':
        return 'Breakfast';
      default:
        return 'Café';
    }
  };

  return (
    <section id="menu" className="section" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            marginBottom: '2.5rem',
          }}
        >
          <div className="editorial-tag">
            <span className="jp-accent">献立</span>
            <span>02 — SIGNATURE MENU</span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.5rem, 5.5vw, 4.25rem)',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              marginBottom: '1rem',
            }}
          >
            Crafted for the Present
          </h2>

          <p
            style={{
              maxWidth: '560px',
              color: 'var(--text-secondary)',
              fontSize: '1.05rem',
              lineHeight: 1.7,
            }}
          >
            Sourced directly from heirloom micro-lots and Kyoto organic tea gardens.
            Prepared with precise water mineralisation and served in hand-thrown ceramics.
          </p>
        </motion.div>

        {/* Filter & Live Search Toolbar */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem',
            marginBottom: '3.5rem',
          }}
        >
          {/* Category Tabs with Animated Pill */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '0.5rem',
            }}
          >
            {MENU_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    position: 'relative',
                    padding: '0.65rem 1.45rem',
                    fontSize: '0.825rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                    borderRadius: '2px',
                    color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                    backgroundColor: 'transparent',
                    border: 'none',
                    transition: 'color 0.25s ease',
                    cursor: 'pointer',
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'var(--text-primary)',
                        borderRadius: '2px',
                        zIndex: 0,
                      }}
                      transition={{ type: 'spring', damping: 24, stiffness: 280 }}
                    />
                  )}
                  <span style={{ position: 'relative', zIndex: 1 }}>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '480px',
            }}
          >
            <Search
              size={17}
              style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)',
                pointerEvents: 'none',
              }}
            />

            <input
              type="text"
              placeholder="Search coffee, matcha, pastries or flavor notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 2.5rem 0.75rem 2.65rem',
                backgroundColor: '#FAF8F3',
                border: '1px solid rgba(36, 39, 32, 0.12)',
                borderRadius: '2px',
                fontSize: '0.875rem',
                color: 'var(--text-primary)',
                outline: 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-terracotta)';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(189, 120, 95, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(36, 39, 32, 0.12)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />

            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                style={{
                  position: 'absolute',
                  right: '0.85rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  padding: '0.2rem',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>

        {/* Results Count & Reset Cue */}
        {searchQuery && (
          <div
            style={{
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
              borderBottom: '1px solid rgba(36, 39, 32, 0.08)',
              paddingBottom: '0.75rem',
            }}
          >
            <span>
              Found <strong>{filteredItems.length}</strong> matching "{searchQuery}" in {activeCategory.toUpperCase()}
            </span>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--accent-terracotta)',
                fontWeight: 600,
              }}
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Empty Search Result State */}
        {filteredItems.length === 0 ? (
          <div
            style={{
              padding: '4rem 1.5rem',
              textAlign: 'center',
              backgroundColor: '#FAF8F3',
              border: '1px solid rgba(36, 39, 32, 0.08)',
              borderRadius: '2px',
            }}
          >
            <Search size={36} color="var(--accent-terracotta)" style={{ margin: '0 auto 1rem auto', opacity: 0.6 }} />
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.65rem',
                color: 'var(--text-primary)',
                marginBottom: '0.5rem',
              }}
            >
              No artisan creations match your search
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              We could not find anything matching "{searchQuery}". Try searching for single origin, cold brew, matcha, or croissant.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="btn-secondary"
              style={{ fontSize: '0.8rem', padding: '0.65rem 1.5rem' }}
            >
              Show All Menu Items
            </button>
          </div>
        ) : (
          /* Menu Grid: Animated Cards */
          <motion.div
            layout
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: 'clamp(1.5rem, 3vw, 2.5rem)',
            }}
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => {
                const isJustAdded = addedItems[item.id];

                return (
                  <motion.article
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.94, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94, y: 15 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => onSelectItem(item)}
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      borderRadius: '2px',
                      border: '1px solid rgba(36, 39, 32, 0.08)',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      position: 'relative',
                    }}
                    className="menu-card"
                    data-cursor="view"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(189, 120, 95, 0.45)';
                      e.currentTarget.style.transform = 'translateY(-6px)';
                      e.currentTarget.style.boxShadow = '0 20px 35px -10px rgba(36, 39, 32, 0.09)';
                      const img = e.currentTarget.querySelector('img');
                      if (img) img.style.transform = 'scale(1.06)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(36, 39, 32, 0.08)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                      const img = e.currentTarget.querySelector('img');
                      if (img) img.style.transform = 'scale(1)';
                    }}
                  >
                    {/* Image Container with Elegant Hover Zoom */}
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
                        loading="lazy"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                      />

                      {/* Japanese Subtitle Badge */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '0.85rem',
                          left: '0.85rem',
                          backgroundColor: 'rgba(245, 242, 234, 0.94)',
                          backdropFilter: 'blur(4px)',
                          padding: '0.25rem 0.65rem',
                          fontSize: '0.725rem',
                          fontWeight: 600,
                          color: 'var(--text-primary)',
                          borderRadius: '1px',
                        }}
                      >
                        <span className="jp-accent">{item.japanese}</span>
                      </div>

                      {/* Category Pill */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '0.85rem',
                          left: '0.85rem',
                          backgroundColor: 'rgba(36, 39, 32, 0.78)',
                          backdropFilter: 'blur(4px)',
                          color: '#F5F2EA',
                          padding: '0.2rem 0.55rem',
                          fontSize: '0.675rem',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          fontWeight: 500,
                          borderRadius: '1px',
                        }}
                      >
                        {getCategoryLabel(item.category)}
                      </div>

                      {/* Specialty Badge */}
                      {item.badge && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '0.85rem',
                            right: '0.85rem',
                            backgroundColor: 'var(--accent-terracotta)',
                            color: '#FFFFFF',
                            padding: '0.25rem 0.65rem',
                            fontSize: '0.675rem',
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

                    {/* Content Body */}
                    <div
                      style={{
                        padding: '1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: 1,
                      }}
                    >
                      {/* Top row: Name and Price */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'baseline',
                          justifyContent: 'space-between',
                          gap: '0.75rem',
                          marginBottom: '0.5rem',
                        }}
                      >
                        <h3
                          style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: '1.35rem',
                            fontWeight: 500,
                            color: 'var(--text-primary)',
                            lineHeight: 1.2,
                          }}
                        >
                          {item.name}
                        </h3>
                        <div
                          style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: '1.35rem',
                            fontWeight: 600,
                            color: 'var(--accent-terracotta)',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          ₹{item.price}
                        </div>
                      </div>

                      {/* Description */}
                      <p
                        style={{
                          fontSize: '0.875rem',
                          lineHeight: 1.6,
                          color: 'var(--text-secondary)',
                          marginBottom: '1rem',
                          flexGrow: 1,
                        }}
                      >
                        {item.description}
                      </p>

                      {/* Tasting Notes */}
                      <div
                        style={{
                          paddingTop: '0.85rem',
                          borderTop: '1px dashed rgba(36, 39, 32, 0.1)',
                          fontSize: '0.775rem',
                          color: 'var(--text-muted)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.3rem',
                          marginBottom: '1.25rem',
                        }}
                      >
                        <div>
                          <strong style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Notes: </strong>
                          {item.notes}
                        </div>
                        <div>
                          <strong style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Origin: </strong>
                          {item.origin}
                        </div>
                      </div>

                      {/* Card Actions: View Details & Direct Add to Order */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          paddingTop: '0.75rem',
                          borderTop: '1px solid rgba(36, 39, 32, 0.08)',
                        }}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectItem(item);
                          }}
                          style={{
                            flexGrow: 1,
                            padding: '0.65rem 0.85rem',
                            fontSize: '0.75rem',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                            backgroundColor: 'rgba(36, 39, 32, 0.04)',
                            border: '1px solid rgba(36, 39, 32, 0.12)',
                            borderRadius: '2px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.4rem',
                            transition: 'all 0.2s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(36, 39, 32, 0.08)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(36, 39, 32, 0.04)';
                          }}
                        >
                          <Eye size={13} />
                          <span>Details</span>
                        </button>

                        <button
                          onClick={(e) => handleQuickAdd(e, item)}
                          style={{
                            flexGrow: 1,
                            padding: '0.65rem 0.85rem',
                            fontSize: '0.75rem',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            fontWeight: 600,
                            color: '#FFFFFF',
                            backgroundColor: isJustAdded ? 'var(--accent-sage-dark)' : 'var(--text-primary)',
                            border: 'none',
                            borderRadius: '2px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.4rem',
                            transition: 'background-color 0.25s, transform 0.2s',
                          }}
                          onMouseEnter={(e) => {
                            if (!isJustAdded) e.currentTarget.style.backgroundColor = 'var(--accent-terracotta)';
                          }}
                          onMouseLeave={(e) => {
                            if (!isJustAdded) e.currentTarget.style.backgroundColor = 'var(--text-primary)';
                          }}
                        >
                          {isJustAdded ? (
                            <>
                              <Check size={13} strokeWidth={2.5} />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <Plus size={13} strokeWidth={2.5} />
                              <span>Add to Order</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Bottom Note & Tasting Flight Invite */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7 }}
          style={{
            marginTop: '3.5rem',
            padding: '2rem',
            backgroundColor: '#FAF8F3',
            border: '1px solid rgba(36, 39, 32, 0.1)',
            borderRadius: '2px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
          }}
        >
          <div>
            <div
              style={{
                fontSize: '0.725rem',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'var(--accent-terracotta)',
                fontWeight: 600,
                marginBottom: '0.35rem',
              }}
            >
              TASTING FLIGHTS & DIETARY CARE
            </div>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.35rem',
                color: 'var(--text-primary)',
                fontWeight: 500,
              }}
            >
              Daily Omakase Pour-Over Flight (3 Micro-Lots) — ₹680
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              We offer house-made oat milk, oat almond blend, and A2 organic milk. Decaf Swiss Water processed lot available.
            </div>
          </div>

          <a href="#visit" className="btn-secondary" style={{ padding: '0.75rem 1.5rem', fontSize: '0.8rem' }}>
            Inquire at the Counter
          </a>
        </motion.div>
      </div>
    </section>
  );
}
