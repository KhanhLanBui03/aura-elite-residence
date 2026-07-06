import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectOverview from './components/ProjectOverview';
import HandoverSpec from './components/HandoverSpec';
import ProductList from './components/ProductList';
import VirtualTour3D from './components/VirtualTour3D';
import Gallery from './components/Gallery';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
  const [selectedRoom, setSelectedRoom] = useState('');

  const handleSelectRoom = (roomId) => {
    setSelectedRoom(roomId);
    
    // Smooth scroll to contact form section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--primary-color)', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      <main style={{ marginTop: 0 }}>
        <Hero />
        <ProjectOverview />
        <HandoverSpec />
        <ProductList onSelectRoom={handleSelectRoom} />
        <VirtualTour3D />
        <Gallery />
        <ContactForm selectedRoom={selectedRoom} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
