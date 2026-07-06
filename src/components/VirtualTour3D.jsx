import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Play } from 'lucide-react';
import { products } from '../data/products';

export default function VirtualTour3D() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(products[0].id);
  const [activatedTours, setActivatedTours] = useState({}); // { [roomId]: boolean }
  const [iframeLoading, setIframeLoading] = useState(true);

  const activeProduct = products.find((p) => p.id === activeTab);

  const handleTabChange = (id) => {
    setActiveTab(id);
    setIframeLoading(true);
  };

  const activateTour = (id) => {
    setActivatedTours((prev) => ({ ...prev, [id]: true }));
    setIframeLoading(true);
  };

  return (
    <section id="virtual-3d" className="section-padding" style={{ backgroundColor: 'var(--secondary-color)', borderTop: '1px solid var(--border-light)' }}>
      <div className="container">
        
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '3px', color: 'var(--accent-color)', fontWeight: '600' }}>
            Interactive Experience
          </span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', marginTop: '10px', marginBottom: '16px' }}>
            Tham Quan Căn Hộ 3D (360°)
          </h2>
          <div style={{ height: '2px', backgroundColor: 'var(--accent-color)', width: '60px', margin: '0 auto 20px' }} />
          <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '15px', lineHeight: '1.7', fontWeight: '300', color: 'var(--text-muted-light)' }}>
            Trải nghiệm không gian sống chân thực nhất ngay tại nhà. Click để bước vào căn hộ dịch vụ và phòng trọ cao cấp trong không gian 3 chiều.
          </p>
        </div>

        {/* Tab Controls */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '35px'
        }}>
          {products.map((product) => {
            const isActive = product.id === activeTab;
            return (
              <button
                key={product.id}
                onClick={() => handleTabChange(product.id)}
                style={{
                  background: isActive ? 'var(--accent-color)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${isActive ? 'var(--accent-color)' : 'var(--border-light)'}`,
                  color: isActive ? 'var(--primary-color)' : 'var(--text-light)',
                  padding: '10px 20px',
                  borderRadius: '30px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
              >
                {t(`products.${product.id}.name`)}
              </button>
            );
          })}
        </div>

        {/* 3D Viewer Area */}
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '960px',
          margin: '0 auto',
          borderRadius: '12px',
          overflow: 'hidden',
          backgroundColor: 'var(--primary-color)',
          border: '1px solid var(--border-light)',
          aspectRatio: '16/10',
          boxShadow: 'var(--shadow-luxury)'
        }}>
          <AnimatePresence mode="wait">
            {!activatedTours[activeTab] ? (
              // Inactive Static State with Play button
              <motion.div
                key={`static-${activeTab}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
                onClick={() => activateTour(activeTab)}
              >
                {/* Background Image of the Room preview */}
                <img
                  src={activeProduct.image}
                  alt={t(`products.${activeTab}.name`)}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'brightness(0.35) blur(1px)',
                    transition: 'all 0.5s ease'
                  }}
                />

                {/* Info Center Overlay */}
                <div style={{
                  position: 'absolute',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '16px',
                  zIndex: 2,
                  padding: '24px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(197, 160, 89, 0.9)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'var(--primary-color)',
                    boxShadow: '0 0 25px rgba(197, 160, 89, 0.4)',
                    transition: 'transform 0.3s ease'
                  }}
                  className="btn-play-hover"
                  >
                    <Compass size={32} className="spinning-icon" />
                  </div>
                  <h3 style={{ fontSize: '22px', fontFamily: 'var(--font-serif)', color: '#ffffff' }}>
                    Kích hoạt Chế độ Xem 3D Căn {t(`products.${activeTab}.name`)}
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--accent-color)', fontWeight: '300' }}>
                    * Nhấp chuột để mở không gian thực tế ảo 360° trực quan
                  </p>
                </div>
              </motion.div>
            ) : (
              // Active Interactive Iframe State
              <motion.div
                key={`active-${activeTab}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{ width: '100%', height: '100%', position: 'relative' }}
              >
                {iframeLoading && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'var(--primary-color)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 5
                  }}>
                    <div className="spinner" />
                  </div>
                )}
                <iframe
                  src={activeProduct.virtual360Url}
                  title={`3D Tour - ${activeTab}`}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowFullScreen
                  allow="xr-spatial-tracking"
                  sandbox="allow-scripts allow-same-origin"
                  onLoad={() => setIframeLoading(false)}
                  style={{ display: 'block', width: '100%', height: '100%' }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Dynamic description of active studio */}
        <div style={{
          maxWidth: '650px',
          margin: '30px auto 0',
          textAlign: 'center',
          backgroundColor: 'rgba(255,255,255,0.01)',
          border: '1px solid var(--border-light)',
          padding: '16px 24px',
          borderRadius: '8px',
          fontSize: '13px',
          color: 'var(--text-muted-light)'
        }}>
          <strong>{t(`products.${activeTab}.name`)}:</strong> {t(`products.${activeTab}.tagline`)}. {t(`products.${activeTab}.handoverHighlight`)}
        </div>
      </div>
    </section>
  );
}
