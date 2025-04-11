import React from 'react';
import Main from './Main';
import About from './About';
import MenuSection from './MenuSection';
import Testimonials from './Testimonilas';
import Gallery from './Gallery';
import Contact from './Contact';

const Home = () => {
  return (
    <>
      <Main />
      <About />
      <MenuSection />
      <Gallery />
      <Testimonials />
      <Contact />
    </>
  );
};

export default Home;