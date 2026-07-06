import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import heroBg from '../assets/luxury_hero_bg.png';

export default function Hero() {
  const { t } = useTranslation();
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Handle Resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Track Mouse
    const handleMouseMove = (e) => {
      // Normalize mouse coordinates around center
      mouseRef.current.targetX = (e.clientX - width / 2) * 0.08;
      mouseRef.current.targetY = (e.clientY - height / 2) * 0.08;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Initialize 3D Particles
    const particleCount = 120;
    const particles = [];
    const focalLength = 300;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.5,
        y: (Math.random() - 0.5) * height * 1.5,
        z: Math.random() * focalLength * 2, // Z depth
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.2,
        speedZ: -(Math.random() * 0.5 + 0.1) // Moving forward
      });
    }

    // Animation Loop
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const cx = width / 2;
      const cy = height / 2;

      // Draw each particle
      particles.forEach((p) => {
        // Move particle forward in Z space
        p.z += p.speedZ;

        // If particle passes the camera, reset it to the far background
        if (p.z <= 0) {
          p.z = focalLength * 2;
          p.x = (Math.random() - 0.5) * width * 1.5;
          p.y = (Math.random() - 0.5) * height * 1.5;
        }

        // Apply perspective projection
        const scale = focalLength / (focalLength + p.z);
        // Include mouse offset to create parallax depth
        const px = (p.x + mouseRef.current.x * (focalLength / p.z)) * scale + cx;
        const py = (p.y + mouseRef.current.y * (focalLength / p.z)) * scale + cy;
        const pSize = p.size * scale * 2;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          // Glow effect
          ctx.beginPath();
          ctx.arc(px, py, pSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(197, 160, 89, ${p.alpha * (scale * 0.8)})`; // Luxury Gold color
          ctx.shadowBlur = 10;
          ctx.shadowColor = 'rgba(197, 160, 89, 0.4)';
          ctx.fill();
        }
      });

      // Reset shadow blur for other drawings
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const heroStyle = {
    height: '100vh',
    position: 'relative',
    backgroundImage: `url(${heroBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '0 24px',
    color: 'var(--text-light)',
    overflow: 'hidden'
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(11, 12, 16, 0.7)',
    zIndex: 1
  };

  const canvasStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 2,
    pointerEvents: 'none'
  };

  const contentStyle = {
    zIndex: 3,
    maxWidth: '800px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px'
  };

  return (
    <section style={heroStyle}>
      <div style={overlayStyle}></div>
      <canvas ref={canvasRef} style={canvasStyle} />
      <div style={contentStyle}>
        {/* Subtitle Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '4px',
            color: 'var(--accent-color)',
            fontWeight: '600',
            border: '1px solid rgba(197, 160, 89, 0.3)',
            padding: '8px 16px',
            borderRadius: '4px',
            backgroundColor: 'rgba(11, 12, 16, 0.4)'
          }}
        >
          {t('hero.subtitle')}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          style={{
            fontSize: 'clamp(36px, 7vw, 68px)',
            fontFamily: 'var(--font-serif)',
            fontWeight: '400',
            lineHeight: '1.1',
            letterSpacing: '4px',
            color: '#ffffff',
            margin: '12px 0'
          }}
        >
          {t('hero.title')}
        </motion.h1>

        {/* Decorative Divider */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '80px' }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            height: '1px',
            backgroundColor: 'var(--accent-color)',
            margin: '8px 0'
          }}
        />

        {/* Tagline / CTA Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{
            fontSize: 'clamp(14px, 2.5vw, 18px)',
            fontWeight: '300',
            maxWidth: '600px',
            lineHeight: '1.6',
            color: 'var(--text-muted-light)'
          }}
        >
          {t('overview.subtitle')}
        </motion.p>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          style={{ marginTop: '16px' }}
        >
          <a href="#products" className="btn-gold" style={{ display: 'inline-flex' }}>
            <span>{t('hero.cta')}</span>
          </a>
        </motion.div>
      </div>

      {/* Animated Scroll Down Indicator */}
      <motion.a 
        href="#overview"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6, y: [0, 8, 0] }}
        transition={{ 
          opacity: { delay: 1.2, duration: 0.8 },
          y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
        }}
        style={{
          position: 'absolute',
          bottom: '40px',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          color: 'var(--text-muted-light)',
          cursor: 'pointer'
        }}
      >
        <span>Scroll</span>
        <ArrowDown size={14} style={{ color: 'var(--accent-color)' }} />
      </motion.a>
    </section>
  );
}
