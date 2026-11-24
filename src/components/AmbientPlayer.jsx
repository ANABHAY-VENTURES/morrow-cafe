import React, { useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export default function AmbientPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        left: '1.5rem',
        zIndex: 40,
        display: 'flex',
        alignItems: 'center',
        gap: '0.65rem',
        padding: '0.55rem 0.95rem',
        backgroundColor: 'rgba(250, 248, 243, 0.92)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(36, 39, 32, 0.12)',
        borderRadius: '24px',
        boxShadow: '0 8px 24px rgba(36, 39, 32, 0.08)',
        fontSize: '0.75rem',
        color: 'var(--text-primary)',
        transition: 'all 0.25s ease',
      }}
      className="ambient-pill"
    >
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '26px',
          height: '26px',
          borderRadius: '50%',
          backgroundColor: isPlaying ? 'var(--accent-terracotta)' : 'rgba(36, 39, 32, 0.06)',
          color: isPlaying ? '#FFFFFF' : 'var(--text-primary)',
          transition: 'all 0.2s ease',
        }}
        title={isPlaying ? 'Pause vinyl atmosphere' : 'Play vinyl atmosphere'}
        aria-label="Toggle ambient music"
      >
        {isPlaying ? <Volume2 size={13} /> : <Music size={13} />}
      </button>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)' }}>
          {isPlaying ? 'NOW PLAYING' : 'VINYL IN CAFÉ'}
        </span>
        <span style={{ fontWeight: 600, fontSize: '0.75rem' }}>
          {isPlaying ? 'Bill Evans — Waltz for Debby (1961)' : 'Morrow Morning Reverie'}
        </span>
      </div>

      {isPlaying && (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '2px',
            marginLeft: '0.25rem',
          }}
        >
          <span style={{ width: '2px', height: '10px', backgroundColor: 'var(--accent-terracotta)', animation: 'pulse 1s infinite alternate' }} />
          <span style={{ width: '2px', height: '14px', backgroundColor: 'var(--accent-terracotta)', animation: 'pulse 0.7s infinite alternate' }} />
          <span style={{ width: '2px', height: '8px', backgroundColor: 'var(--accent-terracotta)', animation: 'pulse 1.2s infinite alternate' }} />
        </span>
      )}
    </div>
  );
}
