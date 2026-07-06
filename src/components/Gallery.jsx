import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

import livingroomImg from '../assets/gallery_livingroom.png';
import bedroomImg from '../assets/gallery_bedroom.png';
import poolImg from '../assets/gallery_pool.png';
import skyloungeImg from '../assets/gallery_skylounge.png';

export default function Gallery() {
  const { t } = useTranslation();
  const [activeImg, setActiveImg] = useState(null);

  const images = [
    { src: livingroomImg, alt: 'Living Room Space' },
    { src: bedroomImg, alt: 'Master Bedroom Space' },
    { src: poolImg, alt: 'Infinity Swimming Pool' },
    { src: skyloungeImg, alt: 'Sky Lounge Bar' }
  ];

  return (
    <section id="gallery" className="section-padding" style={{ backgroundColor: 'var(--secondary-color)' }}>
      <div className="container">
        
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ fontSize: 'clamp(28px, 4vw, 42px)', marginBottom: '16px' }}
          >
            {t('gallery.title')}
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '60px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ height: '2px', backgroundColor: 'var(--accent-color)', margin: '0 auto 24px' }}
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.7 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ maxWidth: '700px', margin: '0 auto', fontSize: '15px', lineHeight: '1.7', fontWeight: '300' }}
          >
            {t('gallery.subtitle')}
          </motion.p>
        </div>

        {/* Gallery Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px',
          marginTop: '40px'
        }}>
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              style={{
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                cursor: 'pointer',
                aspectRatio: '16/10',
                border: '1px solid var(--border-light)'
              }}
              onClick={() => setActiveImg(img.src)}
            >
              {/* Image */}
              <img 
                src={img.src} 
                alt={img.alt} 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />

              {/* Hover Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(11, 12, 16, 0.75)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 2
                }}
              >
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--accent-color)'
                }}>
                  <ZoomIn size={24} />
                  <span style={{ 
                    fontSize: '11px', 
                    textTransform: 'uppercase', 
                    letterSpacing: '1px',
                    color: 'var(--text-light)',
                    fontWeight: '500'
                  }}>
                    View Room
                  </span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(11, 12, 16, 0.95)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1100,
              padding: '24px'
            }}
            onClick={() => setActiveImg(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveImg(null)}
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '50%'
              }}
            >
              <X size={24} />
            </button>

            {/* Modal Image */}
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              src={activeImg}
              alt="Expanded view"
              style={{
                maxWidth: '90%',
                maxHeight: '80%',
                borderRadius: '8px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                border: '1px solid var(--border-light)',
                objectFit: 'contain'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
