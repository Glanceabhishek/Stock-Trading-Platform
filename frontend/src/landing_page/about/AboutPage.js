import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';

import Hero from '../about/Hero';
import Team from '../about/Team'


function About() {
    return ( 
        <>
        
        <Navbar />
        <Hero/>
        <Team/>
        <Footer />
        
        </>
      );
}

export default About;