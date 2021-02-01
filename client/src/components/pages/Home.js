import React from 'react';
import '../../App.css';
import Navbar from "../Navbar";
import Features from '../Features';
import HeroSection from '../HeroSection';
import Contact from '../Contact';
import About from '../About';
import Footer from '../Footer';

function Home() {
  return (
    <>
      <Navbar/>
      <HeroSection />
      <Features />
      <About />
      <Contact />
      <Footer />

    </>
  );
}

export default Home;
