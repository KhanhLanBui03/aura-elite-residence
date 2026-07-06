import React from 'react';
import Hero from '../components/Hero';
import ProjectOverview from '../components/ProjectOverview';
import HandoverSpec from '../components/HandoverSpec';
import ProductList from '../components/ProductList';
import Gallery from '../components/Gallery';
import ContactForm from '../components/ContactForm';

export default function Home() {
  return (
    <>
      <Hero />
      <ProjectOverview />
      <HandoverSpec />
      <ProductList />
      <Gallery />
      <ContactForm />
    </>
  );
}
