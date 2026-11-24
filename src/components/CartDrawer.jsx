import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, CheckCircle2, Clock, MapPin, AlertCircle } from 'lucide-react';
import MagneticButton from './MagneticButton';

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onExploreMenu,
}) {
  const [orderType, setOrderType] = useState('table'); // 'table' | 'counter'
  const [tableNumber, setTableNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [orderNote, setOrderNote] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setOrderPlaced(null); // Reset placed screen on reopen
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.05); // 5% GST
  const total = subtotal + tax;
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const orderRecord = {
      orderId: `MRW-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
      items: [...cart],
      orderType,
      tableNumber: orderType === 'table' ? (tableNumber || 'Any available') : 'Counter Pickup',
      customerName: customerName || 'Valued Guest',
      subtotal,
      tax,
      total,
      notes: orderNote,
    };

    // Store in prototype local storage
    try {
      const past = JSON.parse(localStorage.getItem('morrow_cafe_past_orders') || '[]');
      past.unshift(orderRecord);
      localStorage.setItem('morrow_cafe_past_orders', JSON.stringify(past.slice(0, 10)));
    } catch {
      // Ignore localStorage errors
    }

    setOrderPlaced(orderRecord);
    onClearCart();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'flex-end',
          backgroundColor: 'rgba(36, 39, 32, 0.55)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
        onClick={onClose}
      >
        <motion.aside
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: '460px',
            height: '100%',
            backgroundColor: '#FAF8F3',
            borderLeft: '1px solid rgba(36, 39, 32, 0.12)',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '-10px 0 35px rgba(36, 39, 32, 0.15)',
            position: 'relative',
          }}
          aria-label="Order Cart"
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          <div
            style={{
              padding: '1.5rem 1.75rem',
              borderBottom: '1px solid rgba(36, 39, 32, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#FAF8F3',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.65rem' }}>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.65rem',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  margin: 0,
                }}
              >
                Your Order
              </h2>
              <span className="jp-accent" style={{ fontSize: '0.85rem' }}>
                注文
              </span>
              {totalItemsCount > 0 && (
                <span
                  style={{
                    fontSize: '0.75rem',
                    padding: '0.15rem 0.55rem',
                    backgroundColor: 'rgba(189, 120, 95, 0.15)',
                    color: 'var(--accent-terracotta)',
                    borderRadius: '10px',
                    fontWeight: 600,
                  }}
                >
                  {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'}
                </span>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {cart.length > 0 && !orderPlaced && (
                <button
                  onClick={onClearCart}
                  title="Clear all items"
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    padding: '0.35rem 0.65rem',
                    borderRadius: '2px',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-terracotta)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                >
                  <Trash2 size={13} />
                  <span>Clear</span>
                </button>
              )}

              <button
                onClick={onClose}
                aria-label="Close cart drawer"
                style={{
                  padding: '0.45rem',
                  color: 'var(--text-primary)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(36, 39, 32, 0.05)',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(36, 39, 32, 0.1)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(36, 39, 32, 0.05)')}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div
            style={{
              flexGrow: 1,
              overflowY: 'auto',
              padding: '1.5rem 1.75rem',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* If an order was just placed, show simulated receipt */}
            {orderPlaced ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: '1.5rem 0',
                }}
              >
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(163, 170, 145, 0.22)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.25rem',
                  }}
                >
                  <CheckCircle2 size={34} color="var(--accent-sage-dark)" />
                </div>

                <div
                  style={{
                    fontSize: '0.725rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    color: 'var(--accent-terracotta)',
                    fontWeight: 600,
                    marginBottom: '0.35rem',
                  }}
                >
                  DEMO ORDER CONFIRMED
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.9rem',
                    fontWeight: 500,
                    marginBottom: '0.5rem',
                    color: 'var(--text-primary)',
                  }}
                >
                  Order #{orderPlaced.orderId}
                </h3>

                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    marginBottom: '1.5rem',
                    maxWidth: '340px',
                  }}
                >
                  Thank you, <strong>{orderPlaced.customerName}</strong>. Your artisanal brew & bake
                  ticket has been sent to our coffee bar.
                </p>

                {/* Ticket Details Box */}
                <div
                  style={{
                    width: '100%',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(36, 39, 32, 0.1)',
                    borderRadius: '2px',
                    padding: '1.25rem',
                    textAlign: 'left',
                    fontSize: '0.85rem',
                    marginBottom: '1.5rem',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      borderBottom: '1px solid rgba(36, 39, 32, 0.08)',
                      paddingBottom: '0.75rem',
                      marginBottom: '0.75rem',
                    }}
                  >
                    <span style={{ color: 'var(--text-muted)' }}>Location / Service</span>
                    <strong style={{ color: 'var(--text-primary)' }}>
                      {orderPlaced.orderType === 'table' ? `Table ${orderPlaced.tableNumber}` : 'Counter Pickup'}
                    </strong>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      borderBottom: '1px solid rgba(36, 39, 32, 0.08)',
                      paddingBottom: '0.75rem',
                      marginBottom: '0.75rem',
                    }}
                  >
                    <span style={{ color: 'var(--text-muted)' }}>Prep Time</span>
                    <span style={{ color: 'var(--accent-terracotta)', fontWeight: 600 }}>~10-14 mins</span>
                  </div>

                  <div style={{ marginBottom: '0.75rem' }}>
                    <div style={{ color: 'var(--text-muted)', marginBottom: '0.4rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      Items Ordered
                    </div>
                    {orderPlaced.items.map((it) => (
                      <div
                        key={it.id}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          padding: '0.25rem 0',
                        }}
                      >
                        <span>
                          {it.quantity}x {it.name}
                        </span>
                        <span>₹{it.price * it.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      borderTop: '1px dashed rgba(36, 39, 32, 0.15)',
                      paddingTop: '0.65rem',
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.15rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                    }}
                  >
                    <span>Total Demo Amount</span>
                    <span>₹{orderPlaced.total}</span>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.5rem',
                    padding: '0.75rem',
                    backgroundColor: 'rgba(163, 170, 145, 0.15)',
                    borderRadius: '2px',
                    fontSize: '0.75rem',
                    color: 'var(--text-secondary)',
                    textAlign: 'left',
                    marginBottom: '1.5rem',
                  }}
                >
                  <AlertCircle size={15} color="var(--accent-sage-dark)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>
                    Frontend Prototype Notice: No payment was charged and no live kitchen API was called.
                    This order is saved locally to your browser's demo storage.
                  </span>
                </div>

                <button
                  onClick={() => {
                    setOrderPlaced(null);
                    onClose();
                  }}
                  className="btn-primary"
                  style={{ width: '100%', padding: '0.85rem' }}
                >
                  Done
                </button>
              </div>
            ) : cart.length === 0 ? (
              /* Empty Cart State */
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  flexGrow: 1,
                  padding: '2rem 1rem',
                }}
              >
                <div
                  style={{
                    width: '68px',
                    height: '68px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(36, 39, 32, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-muted)',
                    marginBottom: '1.25rem',
                  }}
                >
                  <ShoppingBag size={28} strokeWidth={1.5} />
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.5rem',
                    fontWeight: 500,
                    color: 'var(--text-primary)',
                    marginBottom: '0.5rem',
                  }}
                >
                  Your tray is empty
                </h3>

                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    maxWidth: '280px',
                    marginBottom: '1.75rem',
                  }}
                >
                  Select from our single-origin pour-overs, ceremonial Uji matcha, or freshly laminated
                  morning pastries.
                </p>

                <button
                  onClick={() => {
                    onClose();
                    if (onExploreMenu) onExploreMenu();
                  }}
                  className="btn-primary"
                  style={{ padding: '0.8rem 1.75rem', fontSize: '0.8rem' }}
                >
                  <span>Explore Menu</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            ) : (
              /* Active Cart Items List */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      gap: '1rem',
                      paddingBottom: '1.25rem',
                      borderBottom: '1px solid rgba(36, 39, 32, 0.08)',
                      alignItems: 'center',
                    }}
                  >
                    {/* Thumbnail */}
                    <div
                      style={{
                        width: '68px',
                        height: '68px',
                        borderRadius: '2px',
                        overflow: 'hidden',
                        backgroundColor: 'var(--bg-secondary)',
                        flexShrink: 0,
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
                    </div>

                    {/* Information */}
                    <div style={{ flexGrow: 1, minWidth: 0 }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'baseline',
                          justifyContent: 'space-between',
                          gap: '0.5rem',
                          marginBottom: '0.2rem',
                        }}
                      >
                        <h4
                          style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: '1.05rem',
                            fontWeight: 500,
                            color: 'var(--text-primary)',
                            margin: 0,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {item.name}
                        </h4>
                        <span
                          style={{
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            color: 'var(--accent-terracotta)',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          ₹{item.price * item.quantity}
                        </span>
                      </div>

                      <div
                        style={{
                          fontSize: '0.75rem',
                          color: 'var(--text-muted)',
                          marginBottom: '0.6rem',
                        }}
                      >
                        <span className="jp-accent" style={{ marginRight: '0.4rem' }}>
                          {item.japanese}
                        </span>
                        <span>₹{item.price} each</span>
                      </div>

                      {/* Quantity Selector Controls */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            border: '1px solid rgba(36, 39, 32, 0.15)',
                            borderRadius: '2px',
                            backgroundColor: '#FFFFFF',
                          }}
                        >
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            aria-label={`Decrease quantity of ${item.name}`}
                            style={{
                              padding: '0.25rem 0.5rem',
                              color: 'var(--text-primary)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRight: '1px solid rgba(36, 39, 32, 0.08)',
                            }}
                          >
                            <Minus size={12} />
                          </button>

                          <span
                            style={{
                              padding: '0.2rem 0.75rem',
                              fontSize: '0.825rem',
                              fontWeight: 600,
                              minWidth: '28px',
                              textAlign: 'center',
                            }}
                          >
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            aria-label={`Increase quantity of ${item.name}`}
                            style={{
                              padding: '0.25rem 0.5rem',
                              color: 'var(--text-primary)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderLeft: '1px solid rgba(36, 39, 32, 0.08)',
                            }}
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.id)}
                          aria-label={`Remove ${item.name} from order`}
                          style={{
                            fontSize: '0.725rem',
                            color: 'var(--text-muted)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            padding: '0.25rem',
                            transition: 'color 0.2s',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-terracotta)')}
                          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                        >
                          <Trash2 size={13} />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Order Options */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(36, 39, 32, 0.08)',
                    borderRadius: '2px',
                    padding: '1.15rem',
                    marginTop: '0.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.85rem',
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.725rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: 'var(--accent-terracotta)',
                      fontWeight: 600,
                    }}
                  >
                    SERVICE SELECTION
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => setOrderType('table')}
                      style={{
                        padding: '0.55rem',
                        fontSize: '0.775rem',
                        fontWeight: 600,
                        borderRadius: '2px',
                        border:
                          orderType === 'table'
                            ? '1px solid var(--accent-terracotta)'
                            : '1px solid rgba(36, 39, 32, 0.12)',
                        backgroundColor: orderType === 'table' ? 'var(--accent-terracotta-bg)' : '#FFFFFF',
                        color: orderType === 'table' ? 'var(--accent-terracotta)' : 'var(--text-primary)',
                      }}
                    >
                      Dine-in Table
                    </button>

                    <button
                      type="button"
                      onClick={() => setOrderType('counter')}
                      style={{
                        padding: '0.55rem',
                        fontSize: '0.775rem',
                        fontWeight: 600,
                        borderRadius: '2px',
                        border:
                          orderType === 'counter'
                            ? '1px solid var(--accent-terracotta)'
                            : '1px solid rgba(36, 39, 32, 0.12)',
                        backgroundColor: orderType === 'counter' ? 'var(--accent-terracotta-bg)' : '#FFFFFF',
                        color: orderType === 'counter' ? 'var(--accent-terracotta)' : 'var(--text-primary)',
                      }}
                    >
                      Counter Pickup
                    </button>
                  </div>

                  {/* Customer name & Table number fields */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <div>
                      <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>
                        Guest Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Maya"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.45rem 0.65rem',
                          border: '1px solid rgba(36, 39, 32, 0.15)',
                          borderRadius: '2px',
                          fontSize: '0.8rem',
                          backgroundColor: '#FAF8F3',
                          outline: 'none',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>
                        {orderType === 'table' ? 'Table No. (Optional)' : 'Pickup Time'}
                      </label>
                      <input
                        type="text"
                        placeholder={orderType === 'table' ? 'e.g. 04 / Courtyard' : 'e.g. In 15 mins'}
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.45rem 0.65rem',
                          border: '1px solid rgba(36, 39, 32, 0.15)',
                          borderRadius: '2px',
                          fontSize: '0.8rem',
                          backgroundColor: '#FAF8F3',
                          outline: 'none',
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>
                      Preparation Notes (Milk preference, temperature, etc.)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Oat milk for flat white, extra hot"
                      value={orderNote}
                      onChange={(e) => setOrderNote(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.45rem 0.65rem',
                        border: '1px solid rgba(36, 39, 32, 0.15)',
                        borderRadius: '2px',
                        fontSize: '0.8rem',
                        backgroundColor: '#FAF8F3',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Checkout Bar (only if items exist and not in confirmation) */}
          {cart.length > 0 && !orderPlaced && (
            <div
              style={{
                padding: '1.25rem 1.75rem',
                borderTop: '1px solid rgba(36, 39, 32, 0.1)',
                backgroundColor: '#FFFFFF',
              }}
            >
              {/* Price summary */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <span>Estimated GST (5%)</span>
                  <span>₹{tax}</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '1.2rem',
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    paddingTop: '0.4rem',
                    borderTop: '1px solid rgba(36, 39, 32, 0.08)',
                  }}
                >
                  <span>Total</span>
                  <span style={{ color: 'var(--accent-terracotta)' }}>₹{total}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <MagneticButton
                onClick={handlePlaceOrder}
                className="btn-primary"
                style={{ width: '100%', padding: '0.95rem', fontSize: '0.85rem' }}
              >
                <span>Send Order to Bar • ₹{total}</span>
                <ArrowRight size={14} />
              </MagneticButton>

              <div
                style={{
                  fontSize: '0.7rem',
                  color: 'var(--text-muted)',
                  textAlign: 'center',
                  marginTop: '0.65rem',
                  lineHeight: 1.3,
                }}
              >
                Prototype Service: No online payment needed. Handcrafted to order.
              </div>
            </div>
          )}
        </motion.aside>
      </div>
    </AnimatePresence>
  );
}
