import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MapPin, Building2, FileCheck, ShieldAlert, Trees } from 'lucide-react';

export default function ProjectOverview() {
  const { t } = useTranslation();

  const specs = [
    {
      icon: <MapPin size={32} style={{ color: 'var(--accent-color)' }} />,
      titleKey: 'location',
      valKey: 'locationVal'
    },
    {
      icon: <Building2 size={32} style={{ color: 'var(--accent-color)' }} />,
      titleKey: 'scale',
      valKey: 'scaleVal'
    },
    {
      icon: <FileCheck size={32} style={{ color: 'var(--accent-color)' }} />,
      titleKey: 'legal',
      valKey: 'legalVal'
    },
    {
      icon: <Trees size={32} style={{ color: 'var(--accent-color)' }} />,
      titleKey: 'greenSpace',
      valKey: 'greenSpaceVal'
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="overview" className="section-padding" style={{ backgroundColor: 'var(--secondary-color)', color: 'var(--text-light)' }}>
      <div className="container">
        
        {/* Section Title */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            style={{ fontSize: 'clamp(28px, 4vw, 42px)', marginBottom: '16px' }}
          >
            {t('overview.title')}
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
            {t('overview.subtitle')}
          </motion.p>
        </div>

        {/* Bento Grid Specifications */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px',
            marginTop: '40px'
          }}
        >
          {specs.map((spec, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -8, 
                borderColor: 'var(--accent-color)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
              }}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-light)',
                borderRadius: '8px',
                padding: '40px 30px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '20px',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
              }}
            >
              {/* Icon Container */}
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                backgroundColor: 'rgba(197, 160, 89, 0.05)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid rgba(197, 160, 89, 0.1)'
              }}>
                {spec.icon}
              </div>

              {/* Title */}
              <h3 style={{ 
                fontFamily: 'var(--font-sans)', 
                fontSize: '13px', 
                fontWeight: '600', 
                textTransform: 'uppercase', 
                letterSpacing: '2px',
                color: 'var(--accent-color)'
              }}>
                {t(`overview.${spec.titleKey}`)}
              </h3>

              {/* Value */}
              <p style={{ 
                fontSize: '16px', 
                fontWeight: '300', 
                lineHeight: '1.5',
                color: 'var(--text-light)',
                opacity: 0.9
              }}>
                {t(`overview.${spec.valKey}`)}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
