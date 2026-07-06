import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import kitchenImg from '../assets/handover_kitchen.png';
import smarthomeImg from '../assets/handover_smarthome.png';
import bathroomImg from '../assets/handover_bathroom.png';
import flooringImg from '../assets/handover_flooring.png';

export default function HandoverSpec() {
  const { t } = useTranslation();

  const specs = [
    {
      key: 'kitchen',
      img: kitchenImg
    },
    {
      key: 'smartHome',
      img: smarthomeImg
    },
    {
      key: 'bathroom',
      img: bathroomImg
    },
    {
      key: 'flooring',
      img: flooringImg
    }
  ];

  return (
    <section id="handover" className="section-padding" style={{ backgroundColor: 'var(--primary-color)', overflow: 'hidden' }}>
      <div className="container">
        
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ fontSize: 'clamp(28px, 4vw, 42px)', marginBottom: '16px' }}
          >
            {t('handover.title')}
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
            {t('handover.subtitle')}
          </motion.p>
        </div>

        {/* Alternate Rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '100px' }}>
          {specs.map((spec, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={spec.key} 
                style={{ 
                  display: 'flex', 
                  flexDirection: isEven ? 'row' : 'row-reverse', 
                  alignItems: 'center', 
                  gap: '50px',
                  flexWrap: 'wrap'
                }}
              >
                {/* Image Section */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  style={{ 
                    flex: '1 1 450px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-luxury)',
                    border: '1px solid var(--border-light)'
                  }}
                >
                  <motion.img 
                    src={spec.img} 
                    alt={t(`handover.${spec.key}.title`)}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    style={{ 
                      width: '100%', 
                      height: 'auto', 
                      display: 'block',
                      objectFit: 'cover'
                    }}
                  />
                </motion.div>

                {/* Text Content Section */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  style={{ 
                    flex: '1 1 400px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: '16px',
                    textAlign: 'left'
                  }}
                >
                  <span style={{ 
                    fontSize: '11px', 
                    color: 'var(--accent-color)', 
                    fontWeight: '600', 
                    textTransform: 'uppercase', 
                    letterSpacing: '2px' 
                  }}>
                    {`0${index + 1} / Handover Standard`}
                  </span>
                  
                  <h3 style={{ 
                    fontSize: 'clamp(22px, 3vw, 28px)', 
                    color: 'var(--text-light)',
                    fontFamily: 'var(--font-serif)'
                  }}>
                    {t(`handover.${spec.key}.title`)}
                  </h3>

                  <div style={{ width: '40px', height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.2)', margin: '8px 0' }} />

                  <p style={{ 
                    fontSize: '15px', 
                    lineHeight: '1.8', 
                    color: 'var(--text-muted-light)',
                    fontWeight: '300'
                  }}>
                    {t(`handover.${spec.key}.desc`)}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
