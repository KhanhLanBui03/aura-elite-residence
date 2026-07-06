import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Phone, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('lng', lng);
  };

  const navLinks = [
    { key: 'overview', href: '#overview' },
    { key: 'handover', href: '#handover' },
    { key: 'gallery', href: '#gallery' },
    { key: 'contact', href: '#contact' }
  ];

  const headerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 100,
    transition: 'var(--transition-smooth)',
    backgroundColor: isScrolled ? 'rgba(11, 12, 16, 0.95)' : 'transparent',
    borderBottom: isScrolled ? '1px solid var(--border-light)' : '1px solid transparent',
    backdropFilter: isScrolled ? 'blur(10px)' : 'none',
    padding: isScrolled ? '16px 0' : '28px 0'
  };

  return (
    <header style={headerStyle}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo */}
        <a href="#" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <span style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: '22px', 
            fontWeight: '600', 
            color: 'var(--accent-color)', 
            letterSpacing: '2px' 
          }}>
            AURA
          </span>
          <span style={{ 
            fontSize: '9px', 
            letterSpacing: '3px', 
            color: 'var(--text-light)', 
            opacity: 0.8,
            marginTop: '-2px'
          }}>
            PREMIUM STUDIOS
          </span>
        </a>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="desktop-only">
          <ul style={{ display: 'flex', listStyle: 'none', gap: '32px', margin: 0, padding: 0 }}>
            {navLinks.map((link) => (
              <li key={link.key}>
                <a 
                  href={link.href} 
                  style={{ 
                    fontSize: '13px', 
                    fontWeight: '500', 
                    textTransform: 'uppercase', 
                    letterSpacing: '1px',
                    color: 'var(--text-light)',
                    opacity: 0.8
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--accent-color)'}
                  onMouseLeave={(e) => e.target.style.color = 'var(--text-light)'}
                >
                  {t(`nav.${link.key}`)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Controls (Language & CTA) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }} className="desktop-only">
          {/* Language Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderRight: '1px solid var(--border-light)', paddingRight: '20px' }}>
            <Globe size={16} style={{ color: 'var(--accent-color)' }} />
            <button 
              onClick={() => changeLanguage('vi')}
              style={{
                background: 'none',
                border: 'none',
                color: i18n.language === 'vi' ? 'var(--accent-color)' : 'var(--text-muted-light)',
                fontWeight: i18n.language === 'vi' ? '600' : '400',
                cursor: 'pointer',
                fontSize: '13px'
              }}
            >
              VI
            </button>
            <span style={{ color: 'var(--border-light)', fontSize: '12px' }}>|</span>
            <button 
              onClick={() => changeLanguage('en')}
              style={{
                background: 'none',
                border: 'none',
                color: i18n.language === 'en' ? 'var(--accent-color)' : 'var(--text-muted-light)',
                fontWeight: i18n.language === 'en' ? '600' : '400',
                cursor: 'pointer',
                fontSize: '13px'
              }}
            >
              EN
            </button>
          </div>

          {/* Hotline Call CTA */}
          <a href="tel:0357804429" className="btn-gold" style={{ padding: '10px 20px', fontSize: '12px' }}>
            <Phone size={14} />
            <span>0357 804 429</span>
          </a>
        </div>

        {/* Mobile Menu Icon */}
        <div className="mobile-only" style={{ display: 'none', cursor: 'pointer' }} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
      </div>

      {/* CSS Helper for Responsive Nav Display */}
      <style>{`
        @media (max-width: 991px) {
          .desktop-only {
            display: none !important;
          }
          .mobile-only {
            display: block !important;
          }
        }
      `}</style>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              width: '100%',
              backgroundColor: 'var(--primary-color)',
              borderBottom: '1px solid var(--border-light)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              zIndex: 99
            }}
          >
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px', padding: 0, margin: 0 }}>
              {navLinks.map((link) => (
                <li key={link.key}>
                  <a 
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                      fontSize: '15px',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      color: 'var(--text-light)',
                      display: 'block'
                    }}
                  >
                    {t(`nav.${link.key}`)}
                  </a>
                </li>
              ))}
            </ul>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-light)' }}>
              <Globe size={16} style={{ color: 'var(--accent-color)' }} />
              <button 
                onClick={() => changeLanguage('vi')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: i18n.language === 'vi' ? 'var(--accent-color)' : 'var(--text-muted-light)',
                  fontWeight: i18n.language === 'vi' ? '600' : '400',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                VIỆT NAM
              </button>
              <span style={{ color: 'var(--border-light)' }}>|</span>
              <button 
                onClick={() => changeLanguage('en')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: i18n.language === 'en' ? 'var(--accent-color)' : 'var(--text-muted-light)',
                  fontWeight: i18n.language === 'en' ? '600' : '400',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                ENGLISH
              </button>
            </div>

            <a href="tel:0357804429" className="btn-gold" style={{ justifyContent: 'center', width: '100%' }}>
              <Phone size={16} />
              <span>0357 804 429</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
