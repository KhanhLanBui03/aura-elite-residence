import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import heroBg from '../assets/luxury_hero_bg.png';

export default function Hero() {
  const { t } = useTranslation();

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
    color: 'var(--text-light)'
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(11, 12, 16, 0.65)',
    zIndex: 1
  };

  const contentStyle = {
    zIndex: 2,
    maxWidth: '800px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px'
  };

  return (
    <section style={heroStyle}>
      <div style={overlayStyle}></div>
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
          <a href="#contact" className="btn-gold" style={{ display: 'inline-flex' }}>
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
          zIndex: 2,
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
