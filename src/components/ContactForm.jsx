import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Phone, MessageCircle, CheckCircle, AlertTriangle } from 'lucide-react';

export default function ContactForm() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', notes: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validatePhone = (phone) => {
    const re = /^[0-9]{10,11}$/;
    return re.test(phone);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim()) {
      setErrorMsg(t('contact.error') + ' (Tên không được để trống)');
      return;
    }

    if (!validatePhone(formData.phone)) {
      setErrorMsg(t('contact.error') + ' (Số điện thoại không hợp lệ, phải gồm 10-11 chữ số)');
      return;
    }

    if (formData.email && !validateEmail(formData.email)) {
      setErrorMsg(t('contact.error') + ' (Địa chỉ email không hợp lệ)');
      return;
    }

    setIsSubmitting(true);

    // Simulate sending data to server
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', phone: '', email: '', notes: '' });
    }, 1500);
  };

  return (
    <section id="contact" className="section-padding" style={{ backgroundColor: 'var(--primary-color)', position: 'relative' }}>
      <div className="container" style={{ maxWidth: '680px' }}>
        
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ fontSize: 'clamp(28px, 4vw, 42px)', marginBottom: '16px' }}
          >
            {t('contact.title')}
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
            style={{ fontSize: '15px', lineHeight: '1.7', fontWeight: '300', color: 'var(--text-muted-light)' }}
          >
            {t('contact.subtitle')}
          </motion.p>
        </div>

        {/* Contact Form */}
        <motion.form 
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--border-light)',
            padding: '40px',
            borderRadius: '8px',
            boxShadow: 'var(--shadow-luxury)'
          }}
        >
          {/* Error Message */}
          <AnimatePresence>
            {errorMsg && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{ 
                  backgroundColor: 'rgba(239, 68, 68, 0.1)', 
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#f87171',
                  padding: '12px 16px',
                  borderRadius: '4px',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '14px'
                }}
              >
                <AlertTriangle size={18} />
                <span>{errorMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form Fields */}
          <div className="form-group">
            <label className="form-label">{t('contact.name')} *</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name}
              onChange={handleInputChange}
              className="form-control" 
              placeholder="e.g. Nguyễn Văn A"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label className="form-label">{t('contact.phone')} *</label>
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone}
                onChange={handleInputChange}
                className="form-control" 
                placeholder="e.g. 0357804429"
              />
            </div>
            <div className="form-group">
              <label className="form-label">{t('contact.email')}</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email}
                onChange={handleInputChange}
                className="form-control" 
                placeholder="e.g. email@example.com"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">{t('contact.notes')}</label>
            <textarea 
              name="notes" 
              value={formData.notes}
              onChange={handleInputChange}
              rows="4" 
              className="form-control"
              placeholder="e.g. Cần tư vấn căn hộ 2 phòng ngủ hướng Đông Nam..."
              style={{ resize: 'none' }}
            />
          </div>

          <button 
            type="submit" 
            className="btn-gold" 
            style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="spinner" />
            ) : (
              <>
                <Send size={16} />
                <span>{t('contact.submit')}</span>
              </>
            )}
          </button>
        </motion.form>
      </div>

      {/* Floating Action Zalo & Hotline Widgets */}
      <div className="floating-widgets">
        {/* Zalo Widget */}
        <motion.a 
          href="https://zalo.me/0357804429" 
          target="_blank" 
          rel="noopener noreferrer"
          className="widget-btn widget-zalo"
          title="Chat Zalo"
        >
          <MessageCircle size={26} />
        </motion.a>

        {/* Hotline Widget */}
        <motion.a 
          href="tel:0357804429" 
          className="widget-btn widget-hotline"
          title="Gọi Hotline"
        >
          <Phone size={24} />
        </motion.a>
      </div>

      {/* Success Modal Overlay */}
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
              zIndex: 1050,
              padding: '24px'
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              style={{
                backgroundColor: 'var(--secondary-color)',
                border: '1px solid var(--border-light)',
                borderRadius: '8px',
                padding: '40px 30px',
                maxWidth: '480px',
                textAlign: 'center',
                boxShadow: 'var(--shadow-luxury)'
              }}
            >
              <CheckCircle size={60} style={{ color: 'var(--accent-color)', marginBottom: '20px' }} />
              <h3 style={{ fontSize: '24px', fontFamily: 'var(--font-serif)', marginBottom: '12px' }}>
                Cảm Ơn Quý Khách
              </h3>
              <p style={{ color: 'var(--text-muted-light)', fontSize: '15px', lineHeight: '1.6', marginBottom: '24px' }}>
                {t('contact.success')}
              </p>
              <button 
                onClick={() => setIsSuccess(false)}
                className="btn-gold"
                style={{ padding: '12px 30px', fontSize: '13px' }}
              >
                Đóng
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 576px) {
          form div {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
