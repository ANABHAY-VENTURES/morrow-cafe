import React, { useState } from 'react';
import { MapPin, Clock, Phone, Mail, Navigation, Calendar, Users, CheckCircle2, Sparkles, Send, MessageSquare, AlertCircle, Check } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { CAFE_INFO } from '../data/cafeData';

export default function VisitUs({ onOpenReserve }) {
  const [activeTab, setActiveTab] = useState('reserve'); // 'reserve' | 'contact'

  // Quick Table Booking State
  const todayDate = new Date().toISOString().split('T')[0];
  const [reserveData, setReserveData] = useState({
    name: '',
    guests: '2',
    date: todayDate,
    time: '11:30 AM',
    area: 'courtyard',
  });
  const [reserveErrors, setReserveErrors] = useState({});
  const [isBooked, setIsBooked] = useState(false);

  // Contact Form State
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    inquiryType: 'General Question',
    message: '',
  });
  const [contactErrors, setContactErrors] = useState({});
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [copiedLink, setCopiedLink] = useState(null); // 'phone' | 'email'

  const handleCopy = (type, val) => {
    navigator.clipboard?.writeText(val);
    setCopiedLink(type);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const handleReserveSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!reserveData.name.trim()) errs.name = 'Please provide your name';
    if (!reserveData.date) errs.date = 'Date is required';
    if (reserveData.date < todayDate) errs.date = 'Date cannot be in the past';

    if (Object.keys(errs).length > 0) {
      setReserveErrors(errs);
      return;
    }

    setReserveErrors({});
    setIsBooked(true);

    try {
      const existing = JSON.parse(localStorage.getItem('morrow_cafe_reservations') || '[]');
      existing.unshift({
        id: `MRW-QUICK-${Math.floor(1000 + Math.random() * 9000)}`,
        createdAt: new Date().toISOString(),
        ...reserveData,
        areaName: CAFE_INFO.seatingAreas.find((a) => a.id === reserveData.area)?.name || 'Courtyard',
      });
      localStorage.setItem('morrow_cafe_reservations', JSON.stringify(existing.slice(0, 10)));
    } catch {
      // Ignore localStorage errors
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!contactData.name.trim()) errs.name = 'Name is required';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!contactData.email.trim()) {
      errs.email = 'Email is required';
    } else if (!emailRegex.test(contactData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    if (!contactData.message.trim()) {
      errs.message = 'Message cannot be empty';
    } else if (contactData.message.trim().length < 8) {
      errs.message = 'Please provide a few more details (min 8 characters)';
    }

    if (Object.keys(errs).length > 0) {
      setContactErrors(errs);
      return;
    }

    setContactErrors({});
    setIsMessageSent(true);

    try {
      const inquiries = JSON.parse(localStorage.getItem('morrow_cafe_inquiries') || '[]');
      inquiries.unshift({
        id: `INQ-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toISOString(),
        ...contactData,
      });
      localStorage.setItem('morrow_cafe_inquiries', JSON.stringify(inquiries.slice(0, 15)));
    } catch {
      // Ignore localStorage errors
    }
  };

  return (
    <section id="visit" className="section" style={{ backgroundColor: '#EBE6DB' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <div className="editorial-tag">
            <span className="jp-accent">訪問</span>
            <span>06 — VISIT & CONNECT</span>
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
            Find Your Way to Stillness
          </h2>
        </div>

        {/* 2-Column Split: Visit Info & Interactive Panel */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'clamp(2rem, 5vw, 4rem)',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Practical Details & Contact Links */}
          <div
            style={{
              gridColumn: 'span 6',
              display: 'flex',
              flexDirection: 'column',
              gap: '2.5rem',
            }}
            className="visit-info-col"
          >
            {/* Address & Landmark */}
            <div>
              <div
                style={{
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: 'var(--accent-terracotta)',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <MapPin size={15} />
                <span>LOCATION & NEIGHBORHOOD</span>
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.45rem',
                  color: 'var(--text-primary)',
                  fontWeight: 500,
                  lineHeight: 1.35,
                  marginBottom: '0.4rem',
                }}
              >
                {CAFE_INFO.address}
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                {CAFE_INFO.landmark} • Valet and dedicated bicycle racks available on site.
              </p>
            </div>

            {/* Service Hours */}
            <div>
              <div
                style={{
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: 'var(--accent-terracotta)',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <Clock size={15} />
                <span>HOURS OF SERVICE</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {CAFE_INFO.hours.map((h, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      paddingBottom: '0.5rem',
                      borderBottom: '1px solid rgba(36, 39, 32, 0.08)',
                    }}
                  >
                    <div>
                      <strong style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{h.days}</strong>
                      <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>{h.note}</div>
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.2rem',
                        color: 'var(--text-primary)',
                      }}
                    >
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Clickable Phone & Email Links */}
            <div>
              <div
                style={{
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: 'var(--accent-terracotta)',
                  fontWeight: 600,
                  marginBottom: '0.65rem',
                }}
              >
                CONCIERGE & COMMISSIONS
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem',
                  fontSize: '0.9rem',
                }}
              >
                {/* Phone */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <a
                    href={`tel:${CAFE_INFO.phone.replace(/[^0-9+]/g, '')}`}
                    title="Click to call Morrow Concierge"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.55rem',
                      color: 'var(--text-primary)',
                      fontWeight: 500,
                      textDecoration: 'none',
                    }}
                  >
                    <span
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: '#FAF8F3',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid rgba(36, 39, 32, 0.1)',
                      }}
                    >
                      <Phone size={14} color="var(--accent-terracotta)" />
                    </span>
                    <span>{CAFE_INFO.phone}</span>
                  </a>

                  <button
                    onClick={() => handleCopy('phone', CAFE_INFO.phone)}
                    style={{
                      fontSize: '0.7rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: copiedLink === 'phone' ? 'var(--accent-sage-dark)' : 'var(--text-muted)',
                      backgroundColor: 'rgba(36, 39, 32, 0.05)',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '2px',
                    }}
                  >
                    {copiedLink === 'phone' ? 'Copied' : 'Copy'}
                  </button>
                </div>

                {/* Email */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <a
                    href={`mailto:${CAFE_INFO.email}`}
                    title="Click to send an email"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.55rem',
                      color: 'var(--text-primary)',
                      fontWeight: 500,
                      textDecoration: 'none',
                    }}
                  >
                    <span
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: '#FAF8F3',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid rgba(36, 39, 32, 0.1)',
                      }}
                    >
                      <Mail size={14} color="var(--accent-sage-dark)" />
                    </span>
                    <span>{CAFE_INFO.email}</span>
                  </a>

                  <button
                    onClick={() => handleCopy('email', CAFE_INFO.email)}
                    style={{
                      fontSize: '0.7rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: copiedLink === 'email' ? 'var(--accent-sage-dark)' : 'var(--text-muted)',
                      backgroundColor: 'rgba(36, 39, 32, 0.05)',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '2px',
                    }}
                  >
                    {copiedLink === 'email' ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>

            {/* Stylized Aesthetic Map Card */}
            <div
              style={{
                position: 'relative',
                aspectRatio: '16 / 7',
                borderRadius: '2px',
                overflow: 'hidden',
                backgroundColor: '#FAF8F3',
                border: '1px solid rgba(36, 39, 32, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: 0.15,
                  backgroundImage:
                    'radial-gradient(#242720 1px, transparent 1px), radial-gradient(#242720 1px, #FAF8F3 1px)',
                  backgroundSize: '20px 20px',
                  backgroundPosition: '0 0, 10px 10px',
                }}
              />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: '0.35rem' }}>
                  Indiranagar Cultural District
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.85rem' }}>
                  4 mins walk from Indiranagar Metro Station • Exit Gate 2
                </div>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{
                    padding: '0.45rem 1rem',
                    fontSize: '0.725rem',
                    backgroundColor: '#FAF8F3',
                  }}
                >
                  <Navigation size={13} />
                  <span>Open in Navigation</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Tabbed Interactive Card (Reservation & Contact Form) */}
          <div
            style={{
              gridColumn: 'span 6',
            }}
            className="visit-reserve-col"
          >
            <div
              style={{
                backgroundColor: '#FAF8F3',
                padding: 'clamp(1.75rem, 4vw, 2.75rem)',
                borderRadius: '2px',
                border: '1px solid rgba(36, 39, 32, 0.1)',
                boxShadow: '0 20px 40px -15px rgba(36, 39, 32, 0.08)',
              }}
            >
              {/* Tab Selector: Table Reservation vs Contact Form */}
              <div
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                  borderBottom: '1px solid rgba(36, 39, 32, 0.1)',
                  paddingBottom: '0.75rem',
                  marginBottom: '1.5rem',
                }}
              >
                <button
                  type="button"
                  onClick={() => setActiveTab('reserve')}
                  style={{
                    padding: '0.5rem 1rem',
                    fontSize: '0.775rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    borderRadius: '2px',
                    color: activeTab === 'reserve' ? 'var(--text-primary)' : 'var(--text-muted)',
                    borderBottom: activeTab === 'reserve' ? '2px solid var(--accent-terracotta)' : '2px solid transparent',
                    transition: 'all 0.2s',
                  }}
                >
                  Quick Reservation
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('contact')}
                  style={{
                    padding: '0.5rem 1rem',
                    fontSize: '0.775rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    borderRadius: '2px',
                    color: activeTab === 'contact' ? 'var(--text-primary)' : 'var(--text-muted)',
                    borderBottom: activeTab === 'contact' ? '2px solid var(--accent-terracotta)' : '2px solid transparent',
                    transition: 'all 0.2s',
                  }}
                >
                  Send a Message
                </button>
              </div>

              {activeTab === 'reserve' ? (
                /* Quick Reservation Panel */
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.85rem',
                      color: 'var(--text-primary)',
                      fontWeight: 500,
                      lineHeight: 1.2,
                      marginBottom: '0.4rem',
                    }}
                  >
                    Reserve Your Slow Moment
                  </h3>

                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                      marginBottom: '1.5rem',
                    }}
                  >
                    We hold 40% of our tables for walk-in guests. For guaranteed courtyard or pour-over
                    bar seating, submit a quick reservation below.
                  </p>

                  {isBooked ? (
                    <div
                      style={{
                        padding: '2.5rem 1.5rem',
                        textAlign: 'center',
                        backgroundColor: 'rgba(163, 170, 145, 0.15)',
                        borderRadius: '2px',
                        border: '1px solid var(--accent-sage)',
                      }}
                    >
                      <CheckCircle2 size={44} color="var(--accent-sage-dark)" style={{ margin: '0 auto 1rem auto' }} />
                      <h4
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '1.5rem',
                          marginBottom: '0.5rem',
                        }}
                      >
                        Table Reserved with Warmth
                      </h4>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                        Thank you, <strong>{reserveData.name}</strong>. A quiet table for {reserveData.guests} in the{' '}
                        <strong>
                          {CAFE_INFO.seatingAreas.find((a) => a.id === reserveData.area)?.name || 'Courtyard'}
                        </strong>{' '}
                        has been noted for {reserveData.time} ({reserveData.date}).
                      </p>

                      <div
                        style={{
                          fontSize: '0.725rem',
                          color: 'var(--text-muted)',
                          marginBottom: '1.25rem',
                        }}
                      >
                        Prototype Confirmation: Stored in browser demo memory.
                      </div>

                      <button
                        onClick={() => setIsBooked(false)}
                        className="btn-secondary"
                        style={{ fontSize: '0.75rem', padding: '0.6rem 1.25rem' }}
                      >
                        Modify or Book Another Table
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleReserveSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                      {/* Name */}
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
                          Guest Name *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Maya Iyer"
                          value={reserveData.name}
                          onChange={(e) => {
                            setReserveData({ ...reserveData, name: e.target.value });
                            if (reserveErrors.name) setReserveErrors({ ...reserveErrors, name: null });
                          }}
                          style={{
                            width: '100%',
                            padding: '0.75rem 0.85rem',
                            backgroundColor: '#FFFFFF',
                            border: reserveErrors.name ? '1px solid #D9534F' : '1px solid rgba(36, 39, 32, 0.15)',
                            borderRadius: '2px',
                            fontSize: '0.875rem',
                            color: 'var(--text-primary)',
                            outline: 'none',
                          }}
                        />
                        {reserveErrors.name && (
                          <span style={{ fontSize: '0.725rem', color: '#D9534F', marginTop: '0.2rem', display: 'block' }}>
                            {reserveErrors.name}
                          </span>
                        )}
                      </div>

                      {/* Date & Time */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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
                            Date *
                          </label>
                          <input
                            type="date"
                            min={todayDate}
                            value={reserveData.date}
                            onChange={(e) => {
                              setReserveData({ ...reserveData, date: e.target.value });
                              if (reserveErrors.date) setReserveErrors({ ...reserveErrors, date: null });
                            }}
                            style={{
                              width: '100%',
                              padding: '0.75rem 0.85rem',
                              backgroundColor: '#FFFFFF',
                              border: reserveErrors.date ? '1px solid #D9534F' : '1px solid rgba(36, 39, 32, 0.15)',
                              borderRadius: '2px',
                              fontSize: '0.85rem',
                              color: 'var(--text-primary)',
                              outline: 'none',
                              fontFamily: 'inherit',
                            }}
                          />
                          {reserveErrors.date && (
                            <span style={{ fontSize: '0.725rem', color: '#D9534F', marginTop: '0.2rem', display: 'block' }}>
                              {reserveErrors.date}
                            </span>
                          )}
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
                            Time
                          </label>
                          <select
                            value={reserveData.time}
                            onChange={(e) => setReserveData({ ...reserveData, time: e.target.value })}
                            style={{
                              width: '100%',
                              padding: '0.75rem 0.85rem',
                              backgroundColor: '#FFFFFF',
                              border: '1px solid rgba(36, 39, 32, 0.15)',
                              borderRadius: '2px',
                              fontSize: '0.85rem',
                              color: 'var(--text-primary)',
                              outline: 'none',
                            }}
                          >
                            <option value="08:30 AM">08:30 AM (Dawn Pour-Over)</option>
                            <option value="10:00 AM">10:00 AM (Morning Pastry)</option>
                            <option value="11:30 AM">11:30 AM (Brunch Service)</option>
                            <option value="02:30 PM">02:30 PM (Afternoon Tea)</option>
                            <option value="04:30 PM">04:30 PM (Golden Hour)</option>
                            <option value="06:30 PM">06:30 PM (Evening Vinyl)</option>
                          </select>
                        </div>
                      </div>

                      {/* Guests & Seating Zone */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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
                            Guests
                          </label>
                          <select
                            value={reserveData.guests}
                            onChange={(e) => setReserveData({ ...reserveData, guests: e.target.value })}
                            style={{
                              width: '100%',
                              padding: '0.75rem 0.85rem',
                              backgroundColor: '#FFFFFF',
                              border: '1px solid rgba(36, 39, 32, 0.15)',
                              borderRadius: '2px',
                              fontSize: '0.85rem',
                              color: 'var(--text-primary)',
                              outline: 'none',
                            }}
                          >
                            <option value="1">1 Person</option>
                            <option value="2">2 Persons</option>
                            <option value="3">3 Persons</option>
                            <option value="4">4 Persons</option>
                            <option value="5+">5+ Persons</option>
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
                            Area
                          </label>
                          <select
                            value={reserveData.area}
                            onChange={(e) => setReserveData({ ...reserveData, area: e.target.value })}
                            style={{
                              width: '100%',
                              padding: '0.75rem 0.85rem',
                              backgroundColor: '#FFFFFF',
                              border: '1px solid rgba(36, 39, 32, 0.15)',
                              borderRadius: '2px',
                              fontSize: '0.85rem',
                              color: 'var(--text-primary)',
                              outline: 'none',
                            }}
                          >
                            {CAFE_INFO.seatingAreas.map((a) => (
                              <option key={a.id} value={a.id}>
                                {a.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <MagneticButton
                        type="submit"
                        className="btn-primary"
                        style={{
                          width: '100%',
                          padding: '0.95rem',
                          marginTop: '0.4rem',
                        }}
                      >
                        Confirm Table Reservation
                      </MagneticButton>

                      {/* Option to open full modal */}
                      <button
                        type="button"
                        onClick={onOpenReserve}
                        style={{
                          fontSize: '0.75rem',
                          color: 'var(--text-muted)',
                          textDecoration: 'underline',
                          textAlign: 'center',
                          marginTop: '0.2rem',
                          cursor: 'pointer',
                        }}
                      >
                        Need specific dietary or mezzanine booking? Open full reservation form →
                      </button>
                    </form>
                  )}
                </div>
              ) : (
                /* Contact / Inquiry Form */
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.85rem',
                      color: 'var(--text-primary)',
                      fontWeight: 500,
                      lineHeight: 1.2,
                      marginBottom: '0.4rem',
                    }}
                  >
                    Send a Message to Morrow
                  </h3>

                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                      marginBottom: '1.5rem',
                    }}
                  >
                    For private salon events, wholesale coffee partnerships, or general inquiries,
                    leave us a note below.
                  </p>

                  {isMessageSent ? (
                    <div
                      style={{
                        padding: '2.5rem 1.5rem',
                        textAlign: 'center',
                        backgroundColor: 'rgba(163, 170, 145, 0.15)',
                        borderRadius: '2px',
                        border: '1px solid var(--accent-sage)',
                      }}
                    >
                      <CheckCircle2 size={44} color="var(--accent-sage-dark)" style={{ margin: '0 auto 1rem auto' }} />
                      <h4
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '1.5rem',
                          marginBottom: '0.5rem',
                        }}
                      >
                        Message Received with Care
                      </h4>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                        Thank you, <strong>{contactData.name}</strong>. Our concierge team has recorded
                        your note regarding <em>"{contactData.inquiryType}"</em> and will respond to{' '}
                        <strong>{contactData.email}</strong> shortly.
                      </p>

                      <button
                        onClick={() => {
                          setIsMessageSent(false);
                          setContactData({ name: '', email: '', inquiryType: 'General Question', message: '' });
                        }}
                        className="btn-secondary"
                        style={{ fontSize: '0.75rem', padding: '0.6rem 1.25rem' }}
                      >
                        Send Another Note
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                      {/* Name & Email Row */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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
                            Your Name *
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Rohan"
                            value={contactData.name}
                            onChange={(e) => {
                              setContactData({ ...contactData, name: e.target.value });
                              if (contactErrors.name) setContactErrors({ ...contactErrors, name: null });
                            }}
                            style={{
                              width: '100%',
                              padding: '0.75rem 0.85rem',
                              backgroundColor: '#FFFFFF',
                              border: contactErrors.name ? '1px solid #D9534F' : '1px solid rgba(36, 39, 32, 0.15)',
                              borderRadius: '2px',
                              fontSize: '0.85rem',
                              color: 'var(--text-primary)',
                              outline: 'none',
                            }}
                          />
                          {contactErrors.name && (
                            <span style={{ fontSize: '0.725rem', color: '#D9534F', marginTop: '0.2rem', display: 'block' }}>
                              {contactErrors.name}
                            </span>
                          )}
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
                            Email Address *
                          </label>
                          <input
                            type="email"
                            placeholder="rohan@example.com"
                            value={contactData.email}
                            onChange={(e) => {
                              setContactData({ ...contactData, email: e.target.value });
                              if (contactErrors.email) setContactErrors({ ...contactErrors, email: null });
                            }}
                            style={{
                              width: '100%',
                              padding: '0.75rem 0.85rem',
                              backgroundColor: '#FFFFFF',
                              border: contactErrors.email ? '1px solid #D9534F' : '1px solid rgba(36, 39, 32, 0.15)',
                              borderRadius: '2px',
                              fontSize: '0.85rem',
                              color: 'var(--text-primary)',
                              outline: 'none',
                            }}
                          />
                          {contactErrors.email && (
                            <span style={{ fontSize: '0.725rem', color: '#D9534F', marginTop: '0.2rem', display: 'block' }}>
                              {contactErrors.email}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Inquiry Type */}
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
                          Subject of Inquiry
                        </label>
                        <select
                          value={contactData.inquiryType}
                          onChange={(e) => setContactData({ ...contactData, inquiryType: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '0.75rem 0.85rem',
                            backgroundColor: '#FFFFFF',
                            border: '1px solid rgba(36, 39, 32, 0.15)',
                            borderRadius: '2px',
                            fontSize: '0.85rem',
                            color: 'var(--text-primary)',
                            outline: 'none',
                          }}
                        >
                          <option value="General Question">General Question / Opening Hours</option>
                          <option value="Private Event">Private Gathering / Reading Salon</option>
                          <option value="Artisan Bean Supply">Artisan Single-Origin Supply</option>
                          <option value="Press & Monograph">Press, Monograph & Features</option>
                        </select>
                      </div>

                      {/* Message Field */}
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
                          Message *
                        </label>
                        <textarea
                          rows={3}
                          placeholder="How can we assist your visit or collaboration?"
                          value={contactData.message}
                          onChange={(e) => {
                            setContactData({ ...contactData, message: e.target.value });
                            if (contactErrors.message) setContactErrors({ ...contactErrors, message: null });
                          }}
                          style={{
                            width: '100%',
                            padding: '0.75rem 0.85rem',
                            backgroundColor: '#FFFFFF',
                            border: contactErrors.message ? '1px solid #D9534F' : '1px solid rgba(36, 39, 32, 0.15)',
                            borderRadius: '2px',
                            fontSize: '0.85rem',
                            color: 'var(--text-primary)',
                            outline: 'none',
                            fontFamily: 'inherit',
                            resize: 'vertical',
                          }}
                        />
                        {contactErrors.message && (
                          <span style={{ fontSize: '0.725rem', color: '#D9534F', marginTop: '0.2rem', display: 'block' }}>
                            {contactErrors.message}
                          </span>
                        )}
                      </div>

                      {/* Submit */}
                      <MagneticButton
                        type="submit"
                        className="btn-primary"
                        style={{
                          width: '100%',
                          padding: '0.95rem',
                          marginTop: '0.35rem',
                        }}
                      >
                        <Send size={14} style={{ marginRight: '0.4rem' }} />
                        <span>Send Message</span>
                      </MagneticButton>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .visit-info-col {
            grid-column: span 12 !important;
          }
          .visit-reserve-col {
            grid-column: span 12 !important;
          }
        }
      `}</style>
    </section>
  );
}
