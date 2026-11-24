import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState('default'); // 'default' | 'pointer' | 'view'
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for fluid, premium lag
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Trailing ring spring (slightly more relaxed)
  const ringSpringConfig = { damping: 22, stiffness: 220, mass: 0.7 };
  const ringX = useSpring(mouseX, ringSpringConfig);
  const ringY = useSpring(mouseY, ringSpringConfig);

  useEffect(() => {
    // Check if touch device
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Global listener for interactive elements
    const handleMouseOver = (e) => {
      const target = e.target;

      // Check for image/card view trigger
      if (target.closest('[data-cursor="view"]')) {
        setCursorType('view');
        return;
      }

      // Check for clickable/buttons
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.closest('input') ||
        target.closest('select') ||
        target.closest('textarea')
      ) {
        setCursorType('pointer');
        return;
      }

      setCursorType('default');
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Central Cursor Dot */}
      <motion.div
        style={{
          position: 'fixed',
          left: cursorX,
          top: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: cursorType === 'view' ? '0px' : cursorType === 'pointer' ? '6px' : '5px',
          height: cursorType === 'view' ? '0px' : cursorType === 'pointer' ? '6px' : '5px',
          borderRadius: '50%',
          backgroundColor: cursorType === 'pointer' ? 'var(--accent-terracotta)' : 'var(--text-primary)',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: isVisible ? 1 : 0,
          transition: 'width 0.2s, height 0.2s, background-color 0.2s',
        }}
      />

      {/* Outer Aesthetic Ring / Badge */}
      <motion.div
        style={{
          position: 'fixed',
          left: ringX,
          top: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: cursorType === 'view' ? '74px' : cursorType === 'pointer' ? '46px' : '28px',
          height: cursorType === 'view' ? '74px' : cursorType === 'pointer' ? '46px' : '28px',
          borderRadius: '50%',
          border: cursorType === 'view'
            ? '1px solid var(--accent-terracotta)'
            : cursorType === 'pointer'
            ? '1.5px solid var(--accent-terracotta)'
            : '1px solid rgba(36, 39, 32, 0.28)',
          backgroundColor: cursorType === 'view'
            ? 'rgba(245, 242, 234, 0.95)'
            : cursorType === 'pointer'
            ? 'rgba(189, 120, 95, 0.08)'
            : 'transparent',
          pointerEvents: 'none',
          zIndex: 99998,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: cursorType === 'view' ? 'blur(4px)' : 'none',
          boxShadow: cursorType === 'view' ? '0 10px 25px rgba(36, 39, 32, 0.12)' : 'none',
          transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1), height 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s, background-color 0.2s, box-shadow 0.25s',
        }}
      >
        {cursorType === 'view' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              fontSize: '0.625rem',
              letterSpacing: '0.18em',
              fontWeight: 600,
              textTransform: 'uppercase',
              color: 'var(--accent-terracotta)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            VIEW
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
