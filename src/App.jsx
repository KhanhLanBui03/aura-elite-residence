import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <main style={{ marginTop: 0 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="*" element={
            <div style={{ padding: '160px 24px 100px', textAlign: 'center', backgroundColor: 'var(--primary-color)' }}>
              <h2 style={{ fontSize: '32px', color: 'var(--accent-color)', marginBottom: '16px' }}>404 - Không Tìm Thấy Trang</h2>
              <a href="/" className="btn-gold">Quay lại trang chủ</a>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
