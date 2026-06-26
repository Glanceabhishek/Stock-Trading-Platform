import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import CreateTicket from './CreateTicket';
import Hero from './Hero';

function SupportPage() {
    return ( 
        <>
           <Navbar />
           <Hero />
           <CreateTicket/>
           <Footer />

        </>
     );
}

export default SupportPage;
