import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Users, CheckCircle2, Sparkles, MapPin, AlertCircle, Phone, Mail, User } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { CAFE_INFO } from '../data/cafeData';

export default function ReservationModal({ isOpen, onClose }) {
  const todayDate = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: todayDate,
    time: '11:00 AM',
    guests: '2',
    area: 'courtyard',
    specialRequests: '',
  });

  const [errors, setErrors] = useState({});
  const [confirmedBooking, setConfirmedBooking] = useState(null);

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

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setConfirmedBooking(null);
      setErrors({});
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.date) {
      newErrors.date = 'Reservation date is required';
    } else if (formData.date < todayDate) {
      newErrors.date = 'Reservation cannot be in the past';
    }

    if (!formData.time) {
      newErrors.time = 'Reservation time is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const reservationRecord = {
      id: `MRW-RES-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      ...formData,
      areaName: CAFE_INFO.seatingAreas.find((a) => a.id === formData.area)?.name || 'Zen Courtyard',
    };

    // Store in localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('morrow_cafe_reservations') || '[]');
      existing.unshift(reservationRecord);
      localStorage.setItem('morrow_cafe_reservations', JSON.stringify(existing.slice(0, 10)));
    } catch {
      // Ignore localStorage errors
    }

    setConfirmedBooking(reservationRecord);
  };

  const handleReset = () => {
    setConfirmedBooking(null);
    onClose();
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
          WebkitBackdropFilter: 'blur(8px)',
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
            maxWidth: '580px',
            borderRadius: '2px',
            border: '1px solid rgba(36, 39, 32, 0.12)',
            boxShadow: '0 30px 60px -15px rgba(36, 39, 32, 0.35)',
            position: 'relative',
            maxHeight: '92vh',
            overflowY: 'auto',
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Table Reservation"
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

          {!confirmedBooking ? (
            /* Reservation Form Step */
            <div style={{ padding: 'clamp(1.75rem, 5vw, 2.5rem)' }}>
              {/* Header */}
              <div style={{ marginBottom: '1.75rem' }}>
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
                  TABLE INQUIRY & RESERVATION
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '2.1rem',
                    color: 'var(--text-primary)',
                    fontWeight: 500,
                    lineHeight: 1.2,
                    margin: 0,
                  }}
                >
                  Reserve at Morrow
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.4rem', lineHeight: 1.6 }}>
                  Reserve your table for manual pour-overs, ceremonial teas, and slow morning plates.
                  We hold tables for 15 minutes past reserved time.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                {/* Full Name */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'var(--text-secondary)',
                      marginBottom: '0.35rem',
                      fontWeight: 600,
                    }}
                  >
                    Full Name *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      placeholder="e.g. Maya Iyer"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: null });
                      }}
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.85rem 0.75rem 2.25rem',
                        border: errors.name ? '1px solid #D9534F' : '1px solid rgba(36, 39, 32, 0.16)',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '2px',
                        fontSize: '0.875rem',
                        color: 'var(--text-primary)',
                        outline: 'none',
                      }}
                    />
                    <User
                      size={15}
                      style={{
                        position: 'absolute',
                        left: '0.75rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--text-muted)',
                      }}
                    />
                  </div>
                  {errors.name && (
                    <span style={{ fontSize: '0.725rem', color: '#D9534F', marginTop: '0.25rem', display: 'block' }}>
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Contact Row: Phone & Email */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                  {/* Phone */}
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: 'var(--text-secondary)',
                        marginBottom: '0.35rem',
                        fontWeight: 600,
                      }}
                    >
                      Phone Number *
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="tel"
                        placeholder="e.g. +91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (errors.phone) setErrors({ ...errors, phone: null });
                        }}
                        style={{
                          width: '100%',
                          padding: '0.75rem 0.85rem 0.75rem 2.25rem',
                          border: errors.phone ? '1px solid #D9534F' : '1px solid rgba(36, 39, 32, 0.16)',
                          backgroundColor: '#FFFFFF',
                          borderRadius: '2px',
                          fontSize: '0.875rem',
                          color: 'var(--text-primary)',
                          outline: 'none',
                        }}
                      />
                      <Phone
                        size={15}
                        style={{
                          position: 'absolute',
                          left: '0.75rem',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: 'var(--text-muted)',
                        }}
                      />
                    </div>
                    {errors.phone && (
                      <span style={{ fontSize: '0.725rem', color: '#D9534F', marginTop: '0.25rem', display: 'block' }}>
                        {errors.phone}
                      </span>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: 'var(--text-secondary)',
                        marginBottom: '0.35rem',
                        fontWeight: 600,
                      }}
                    >
                      Email Address *
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="email"
                        placeholder="e.g. maya@example.com"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: null });
                        }}
                        style={{
                          width: '100%',
                          padding: '0.75rem 0.85rem 0.75rem 2.25rem',
                          border: errors.email ? '1px solid #D9534F' : '1px solid rgba(36, 39, 32, 0.16)',
                          backgroundColor: '#FFFFFF',
                          borderRadius: '2px',
                          fontSize: '0.875rem',
                          color: 'var(--text-primary)',
                          outline: 'none',
                        }}
                      />
                      <Mail
                        size={15}
                        style={{
                          position: 'absolute',
                          left: '0.75rem',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: 'var(--text-muted)',
                        }}
                      />
                    </div>
                    {errors.email && (
                      <span style={{ fontSize: '0.725rem', color: '#D9534F', marginTop: '0.25rem', display: 'block' }}>
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Date & Time Row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                  {/* Date Picker (No past dates) */}
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: 'var(--text-secondary)',
                        marginBottom: '0.35rem',
                        fontWeight: 600,
                      }}
                    >
                      Reservation Date *
                    </label>
                    <input
                      type="date"
                      min={todayDate}
                      value={formData.date}
                      onChange={(e) => {
                        setFormData({ ...formData, date: e.target.value });
                        if (errors.date) setErrors({ ...errors, date: null });
                      }}
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.85rem',
                        border: errors.date ? '1px solid #D9534F' : '1px solid rgba(36, 39, 32, 0.16)',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '2px',
                        fontSize: '0.875rem',
                        color: 'var(--text-primary)',
                        outline: 'none',
                        fontFamily: 'inherit',
                      }}
                    />
                    {errors.date && (
                      <span style={{ fontSize: '0.725rem', color: '#D9534F', marginTop: '0.25rem', display: 'block' }}>
                        {errors.date}
                      </span>
                    )}
                  </div>

                  {/* Time Slot */}
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: 'var(--text-secondary)',
                        marginBottom: '0.35rem',
                        fontWeight: 600,
                      }}
                    >
                      Preferred Time *
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.85rem',
                        border: '1px solid rgba(36, 39, 32, 0.16)',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '2px',
                        fontSize: '0.875rem',
                        color: 'var(--text-primary)',
                        outline: 'none',
                      }}
                    >
                      <option value="08:00 AM">08:00 AM — Dawn First Light</option>
                      <option value="09:30 AM">09:30 AM — Breakfast Flight</option>
                      <option value="11:00 AM">11:00 AM — Morning Quietude</option>
                      <option value="01:00 PM">01:00 PM — Midday Plates</option>
                      <option value="03:00 PM">03:00 PM — Afternoon Tea & Canelé</option>
                      <option value="05:00 PM">05:00 PM — Golden Hour Vinyl</option>
                      <option value="07:00 PM">07:00 PM — Evening Drip</option>
                    </select>
                  </div>
                </div>

                {/* Party Size & Atmosphere */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: 'var(--text-secondary)',
                        marginBottom: '0.35rem',
                        fontWeight: 600,
                      }}
                    >
                      Number of Guests
                    </label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.85rem',
                        border: '1px solid rgba(36, 39, 32, 0.16)',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '2px',
                        fontSize: '0.875rem',
                        color: 'var(--text-primary)',
                        outline: 'none',
                      }}
                    >
                      <option value="1">1 Person (Quiet Reading / Work)</option>
                      <option value="2">2 Persons (Table for Two)</option>
                      <option value="3">3 Persons</option>
                      <option value="4">4 Persons (Standard Table)</option>
                      <option value="5">5 Persons</option>
                      <option value="6">6 Persons (Large Alcove)</option>
                      <option value="7+">7+ Persons (Private Tasting Inquiry)</option>
                    </select>
                  </div>

                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: 'var(--text-secondary)',
                        marginBottom: '0.35rem',
                        fontWeight: 600,
                      }}
                    >
                      Atmosphere Zone
                    </label>
                    <select
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.85rem',
                        border: '1px solid rgba(36, 39, 32, 0.16)',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '2px',
                        fontSize: '0.875rem',
                        color: 'var(--text-primary)',
                        outline: 'none',
                      }}
                    >
                      {CAFE_INFO.seatingAreas.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.name} ({a.desc.split('with')[0].trim()})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'var(--text-secondary)',
                      marginBottom: '0.35rem',
                      fontWeight: 600,
                    }}
                  >
                    Special Requests (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Dietary preferences, birthday quiet celebration, high chair, oat milk preference..."
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      border: '1px solid rgba(36, 39, 32, 0.16)',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '2px',
                      fontSize: '0.85rem',
                      color: 'var(--text-primary)',
                      outline: 'none',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                    }}
                  />
                </div>

                {/* Submit button */}
                <MagneticButton
                  type="submit"
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '1rem',
                    marginTop: '0.5rem',
                    fontSize: '0.85rem',
                  }}
                >
                  Submit Table Reservation
                </MagneticButton>

                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.4 }}>
                  No booking deposit is charged. All reservations are held with warmth.
                </div>
              </form>
            </div>
          ) : (
            /* Confirmation Step */
            <div style={{ padding: 'clamp(2rem, 5vw, 3rem)', textAlign: 'center' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(163, 170, 145, 0.22)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem auto',
                }}
              >
                <CheckCircle2 size={36} color="var(--accent-sage-dark)" />
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
                RESERVATION CONFIRMED • {confirmedBooking.id}
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '2.1rem',
                  color: 'var(--text-primary)',
                  fontWeight: 500,
                  marginBottom: '0.75rem',
                  lineHeight: 1.2,
                }}
              >
                We Look Forward to Welcoming You
              </h3>

              <p
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)',
                  maxWidth: '420px',
                  margin: '0 auto 1.5rem auto',
                  lineHeight: 1.6,
                }}
              >
                Thank you, <strong>{confirmedBooking.name}</strong>. Your sanctuary table has been
                earmarked in our prototype booking system.
              </p>

              {/* Booking Summary Card */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '1.25rem',
                  borderRadius: '2px',
                  border: '1px solid rgba(36, 39, 32, 0.1)',
                  textAlign: 'left',
                  fontSize: '0.85rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.65rem',
                  marginBottom: '1.5rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Date & Time</span>
                  <strong>
                    {confirmedBooking.date} at {confirmedBooking.time}
                  </strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Party Size</span>
                  <strong>{confirmedBooking.guests} Guest(s)</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Seating Zone</span>
                  <strong style={{ color: 'var(--accent-terracotta)' }}>{confirmedBooking.areaName}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Contact Details</span>
                  <span>
                    {confirmedBooking.phone} • {confirmedBooking.email}
                  </span>
                </div>
                {confirmedBooking.specialRequests && (
                  <div style={{ borderTop: '1px dashed rgba(36, 39, 32, 0.1)', paddingTop: '0.5rem' }}>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>
                      Special Notes:
                    </span>
                    <span>{confirmedBooking.specialRequests}</span>
                  </div>
                )}
              </div>

              {/* Prototype Notice */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.5rem',
                  padding: '0.85rem',
                  backgroundColor: 'rgba(189, 120, 95, 0.12)',
                  borderRadius: '2px',
                  fontSize: '0.75rem',
                  color: 'var(--text-primary)',
                  textAlign: 'left',
                  marginBottom: '1.5rem',
                  lineHeight: 1.5,
                }}
              >
                <AlertCircle size={16} color="var(--accent-terracotta)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>
                  <strong>Prototype Notice:</strong> This is a frontend demonstration booking stored in
                  your browser's local memory (`localStorage`). No actual reservation has been made
                  with a live host stand.
                </span>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={handleReset}
                  className="btn-primary"
                  style={{ flexGrow: 1, padding: '0.85rem' }}
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
