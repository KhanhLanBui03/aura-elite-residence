import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer style={{
      backgroundColor: 'var(--primary-color)',
      borderTop: '1px solid var(--border-light)',
      padding: '40px 0',
      textAlign: 'center',
      color: 'var(--text-muted-light)',
      fontSize: '13px'
    }}>
      <div className="container" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: '18px', 
            fontWeight: '600', 
            color: 'var(--accent-color)', 
            letterSpacing: '2px' 
          }}>
            AURA
          </span>
          <span style={{ 
            fontSize: '8px', 
            letterSpacing: '2px', 
            color: 'var(--text-light)', 
            opacity: 0.8,
            marginTop: '-2px'
          }}>
            ELITE RESIDENCE
          </span>
        </div>

        <p style={{ fontWeight: '300', opacity: 0.8 }}>
          © {new Date().getFullYear()} Aura Elite Residence. All rights reserved.
        </p>
        <p style={{ fontSize: '11px', fontWeight: '300', opacity: 0.6, maxWidth: '600px', lineHeight: '1.5' }}>
          Thông tin, hình ảnh hiển thị trên trang web này mang tính chất tham khảo minh họa và không phải là thông tin cam kết pháp lý chính thức của dự án.
        </p>
      </div>
    </footer>
  );
}
