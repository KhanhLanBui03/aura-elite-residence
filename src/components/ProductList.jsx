import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { products } from '../data/products';

export default function ProductList({ onSelectRoom }) {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 }
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

  const handleRentClick = (e, roomId) => {
    e.preventDefault();
    if (onSelectRoom) {
      onSelectRoom(roomId);
    }
  };

  return (
    <section id="products" className="section-padding" style={{ backgroundColor: 'var(--primary-color)' }}>
      <div className="container" style={{ perspective: '1000px' }}>
        
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ fontSize: 'clamp(28px, 4vw, 42px)', marginBottom: '16px' }}
          >
            {t('products.title')}
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
            {t('products.subtitle')}
          </motion.p>
        </div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px',
            marginTop: '40px'
          }}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                rotateX: 4, 
                rotateY: -4, 
                boxShadow: 'var(--shadow-luxury)',
                transition: { duration: 0.3 }
              }}
              style={{
                backgroundColor: 'var(--secondary-color)',
                border: '1px solid var(--border-light)',
                borderRadius: '8px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transformStyle: 'preserve-3d',
                transition: 'box-shadow 0.3s ease'
              }}
            >
              {/* Product Floorplan Thumbnail */}
              <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '16/11' }}>
                <img 
                  src={product.image} 
                  alt={t(`products.${product.id}.name`)} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  backgroundColor: 'rgba(11, 12, 16, 0.7)',
                  border: '1px solid var(--border-light)',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  color: 'var(--accent-color)',
                  fontWeight: '600'
                }}>
                  {product.areaNet}
                </div>
              </div>

              {/* Product Text details */}
              <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '16px', flexGrow: 1, transform: 'translateZ(20px)' }}>
                <div>
                  <h3 style={{ fontSize: '20px', fontFamily: 'var(--font-serif)', color: '#ffffff', marginBottom: '8px' }}>
                    {t(`products.${product.id}.name`)}
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted-light)', fontWeight: '300', fontStyle: 'italic' }}>
                    {t(`products.${product.id}.tagline`)}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: 'var(--text-muted-light)' }}>{t('products.specs.view')}</span>
                    <span style={{ fontWeight: '500', color: '#ffffff', maxWidth: '180px', textAlign: 'right' }}>
                      {t(`products.${product.id}.viewVal`)}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: 'var(--text-muted-light)' }}>{t('products.specs.price')}</span>
                    <span style={{ fontWeight: '600', color: 'var(--accent-color)' }}>
                      {t(`products.${product.id}.priceVal`)}
                    </span>
                  </div>
                </div>

                {/* Call-to-action button */}
                <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
                  <button 
                    onClick={(e) => handleRentClick(e, product.id)}
                    className="btn-gold" 
                    style={{ 
                      width: '100%', 
                      justifyContent: 'center', 
                      padding: '12px 20px', 
                      fontSize: '12px',
                      cursor: 'pointer',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <span>Đăng Ký Thuê Ngay</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
