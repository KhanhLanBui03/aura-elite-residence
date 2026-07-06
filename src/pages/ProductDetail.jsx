import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ZoomIn, Send, CheckCircle, AlertTriangle, X } from 'lucide-react';
import { products } from '../data/products';

export default function ProductDetail() {
  const { id } = useParams();
  const { t } = useTranslation();
  
  const product = products.find((p) => p.id === id);
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeTab, setActiveTab] = useState('floorplan');
  const [iframeLoading, setIframeLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', notes: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!product) {
    return (
      <div style={{ padding: '160px 24px 100px', textAlign: 'center', backgroundColor: 'var(--primary-color)' }}>
        <h2 style={{ fontSize: '32px', color: 'var(--accent-color)', marginBottom: '16px' }}>Căn hộ không tồn tại / Apartment Not Found</h2>
        <Link to="/" className="btn-gold">
          <ArrowLeft size={16} />
          <span>Quay lại trang chủ</span>
        </Link>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validatePhone = (phone) => {
    const re = /^[0-9]{10,11}$/;
    return re.test(phone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim()) {
      setErrorMsg('Tên không được để trống');
      return;
    }

    if (!validatePhone(formData.phone)) {
      setErrorMsg('Số điện thoại không hợp lệ');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', phone: '', email: '', notes: '' });
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.8 }}
      style={{
        backgroundColor: 'var(--primary-color)',
        minHeight: '100vh',
        padding: '130px 0 80px',
        color: 'var(--text-light)'
      }}
    >
      <div className="container">
        
        {/* Back Link */}
        <div style={{ marginBottom: '40px' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--accent-color)', fontSize: '14px', fontWeight: '500' }}>
            <ArrowLeft size={16} />
            <span>{t('products.backToHome')}</span>
          </Link>
        </div>

        {/* Content Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '50px'
        }}>
          
          {/* Left Column: Floorplan Image & 360 Virtual Tour Switchable Tabs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Tab selector */}
            <div style={{ display: 'flex', gap: '16px', borderBottom: '1px solid var(--border-light)', paddingBottom: '10px' }}>
              <button
                onClick={() => setActiveTab('floorplan')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: activeTab === 'floorplan' ? 'var(--accent-color)' : 'var(--text-muted-light)',
                  fontWeight: activeTab === 'floorplan' ? '600' : '400',
                  cursor: 'pointer',
                  fontSize: '14px',
                  padding: '8px 12px',
                  position: 'relative'
                }}
              >
                <span>Mặt bằng 2D</span>
                {activeTab === 'floorplan' && (
                  <motion.div 
                    layoutId="activeTabUnderline"
                    style={{ position: 'absolute', bottom: '-11px', left: 0, right: 0, height: '2px', backgroundColor: 'var(--accent-color)' }}
                  />
                )}
              </button>

              <button
                onClick={() => {
                  setActiveTab('360');
                  setIframeLoading(true);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: activeTab === '360' ? 'var(--accent-color)' : 'var(--text-muted-light)',
                  fontWeight: activeTab === '360' ? '600' : '400',
                  cursor: 'pointer',
                  fontSize: '14px',
                  padding: '8px 12px',
                  position: 'relative'
                }}
              >
                <span>Tham quan 360°</span>
                {activeTab === '360' && (
                  <motion.div 
                    layoutId="activeTabUnderline"
                    style={{ position: 'absolute', bottom: '-11px', left: 0, right: 0, height: '2px', backgroundColor: 'var(--accent-color)' }}
                  />
                )}
              </button>
            </div>

            {/* Content Container */}
            <div 
              style={{
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-light)',
                aspectRatio: '16/11'
              }}
            >
              {activeTab === 'floorplan' ? (
                <div 
                  style={{ width: '100%', height: '100%', cursor: 'zoom-in', position: 'relative' }}
                  onClick={() => setIsZoomed(true)}
                >
                  <img 
                    src={product.image} 
                    alt={t(`products.${product.id}.name`)} 
                    style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: '16px',
                    right: '16px',
                    backgroundColor: 'rgba(11, 12, 16, 0.8)',
                    borderRadius: '50%',
                    padding: '10px',
                    color: 'var(--accent-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--border-light)'
                  }}>
                    <ZoomIn size={18} />
                  </div>
                </div>
              ) : (
                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                  {/* Loading Spinner for 360 tour */}
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
                    src={product.virtual360Url}
                    title="Virtual Tour 360"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allowFullScreen
                    allow="xr-spatial-tracking"
                    sandbox="allow-scripts allow-same-origin"
                    onLoad={() => setIframeLoading(false)}
                    style={{ display: 'block', width: '100%', height: '100%' }}
                  />
                </div>
              )}
            </div>

            {/* Helper Text */}
            <p style={{ textAlign: 'center', fontSize: '13px', color: 'var(--text-muted-light)', fontStyle: 'italic' }}>
              {activeTab === 'floorplan' 
                ? '* Click vào hình ảnh để xem mặt bằng phóng to chi tiết' 
                : '* Giữ và kéo chuột trên khung hình để quay 360 độ hoặc click chọn các điểm di chuyển'}
            </p>
          </div>

          {/* Right Column: Spec Specifications & Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            
            {/* Title & Tagline */}
            <div>
              <h1 style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontFamily: 'var(--font-serif)', color: '#ffffff', marginBottom: '8px' }}>
                {t(`products.${product.id}.name`)}
              </h1>
              <p style={{ fontSize: '15px', color: 'var(--accent-color)', fontWeight: '300' }}>
                {t(`products.${product.id}.tagline`)}
              </p>
            </div>

            {/* Specifications Table */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.01)',
              border: '1px solid var(--border-light)',
              borderRadius: '8px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px' }}>
                <span style={{ color: 'var(--text-muted-light)', fontSize: '14px' }}>{t('products.specs.area')} (Net)</span>
                <span style={{ fontWeight: '600', color: '#ffffff' }}>{product.areaNet}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px' }}>
                <span style={{ color: 'var(--text-muted-light)', fontSize: '14px' }}>{t('products.specs.area')} (Gross)</span>
                <span style={{ fontWeight: '600', color: '#ffffff' }}>{product.areaGross}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px' }}>
                <span style={{ color: 'var(--text-muted-light)', fontSize: '14px' }}>{t('products.specs.view')}</span>
                <span style={{ fontWeight: '600', color: '#ffffff', textAlign: 'right', maxWidth: '220px' }}>
                  {t(`products.${product.id}.viewVal`)}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px' }}>
                <span style={{ color: 'var(--text-muted-light)', fontSize: '14px' }}>{t('products.specs.price')}</span>
                <span style={{ fontWeight: '700', color: 'var(--accent-color)' }}>
                  {t(`products.${product.id}.priceVal`)}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '4px' }}>
                <span style={{ color: 'var(--text-muted-light)', fontSize: '14px' }}>{t('products.specs.handover')}</span>
                <span style={{ fontWeight: '300', fontSize: '14px', lineHeight: '1.6', color: 'var(--text-light)' }}>
                  {t(`products.${product.id}.handoverHighlight`)}
                </span>
              </div>
            </div>

            {/* In-page Consult Form */}
            <form onSubmit={handleSubmit} style={{
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-light)',
              borderRadius: '8px',
              padding: '30px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              <h3 style={{ fontSize: '18px', fontFamily: 'var(--font-serif)', color: '#ffffff' }}>
                {t('products.registerInterest')}
              </h3>

              {errorMsg && (
                <div style={{ 
                  backgroundColor: 'rgba(239, 68, 68, 0.1)', 
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#f87171',
                  padding: '10px 14px',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '13px'
                }}>
                  <AlertTriangle size={16} />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label className="form-label">{t('contact.name')} *</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    className="form-control" 
                    placeholder="Nguyễn Văn A" 
                    style={{ padding: '12px' }}
                  />
                </div>
                <div>
                  <label className="form-label">{t('contact.phone')} *</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleInputChange} 
                    className="form-control" 
                    placeholder="0357804429" 
                    style={{ padding: '12px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'none' }}>
                {/* Save target info inside form */}
                <input type="text" name="notes" defaultValue={`Quan tâm căn hộ: ${product.id}`} />
              </div>

              <button 
                type="submit" 
                className="btn-gold" 
                style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? <span className="spinner" /> : (
                  <>
                    <Send size={14} />
                    <span>Gửi yêu cầu nhận tư vấn</span>
                  </>
                )}
              </button>
            </form>

          </div>

        </div>

      </div>

      {/* Lightbox for zooming floorplan */}
      <AnimatePresence>
        {isZoomed && (
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
            onClick={() => setIsZoomed(false)}
          >
            <button
              onClick={() => setIsZoomed(false)}
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
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={product.image}
              alt="Floorplan Zoomed"
              style={{
                maxWidth: '90%',
                maxHeight: '85%',
                objectFit: 'contain',
                borderRadius: '8px',
                border: '1px solid var(--border-light)'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {isSuccess && (
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
              backgroundColor: 'rgba(11, 12, 16, 0.8)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1200
            }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              style={{
                backgroundColor: 'var(--secondary-color)',
                border: '1px solid var(--border-light)',
                borderRadius: '8px',
                padding: '40px 30px',
                maxWidth: '440px',
                textAlign: 'center'
              }}
            >
              <CheckCircle size={60} style={{ color: 'var(--accent-color)', marginBottom: '20px' }} />
              <h3 style={{ fontSize: '24px', fontFamily: 'var(--font-serif)', marginBottom: '12px' }}>
                Đã Đăng Ký Thành Công
              </h3>
              <p style={{ color: 'var(--text-muted-light)', fontSize: '15px', lineHeight: '1.6', marginBottom: '24px' }}>
                Thông tin của bạn đã được ghi nhận. Chuyên viên tư vấn cho sản phẩm <strong>{t(`products.${product.id}.name`)}</strong> sẽ liên hệ bạn ngay.
              </p>
              <button onClick={() => setIsSuccess(false)} className="btn-gold" style={{ padding: '12px 30px' }}>
                Đóng
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
