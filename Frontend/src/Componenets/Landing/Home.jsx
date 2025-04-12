import React from 'react';
import Main from './Main';
import About from './About/About';
import MenuSection from '../MenuSection';
import Testimonials from './Testiminials/Testimonilas';
import Gallery from './Gallery/Gallery';
import Contact from './Contact/Contact';

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