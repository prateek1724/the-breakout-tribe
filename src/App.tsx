import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import WhyJoinSection from './components/WhyJoinSection';
import NextEscapeSection from './components/NextEscapeSection';
import HowItWorksSection from './components/HowItWorksSection';
import ApplicationSection from './components/ApplicationSection';
import Footer from './components/Footer';
import { Analytics } from "@vercel/analytics/react"

function App() {
  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href') || '');
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });

    // Change opacity based on scroll position for parallax effect
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroSection = document.querySelector('section:first-of-type');
      if (heroSection) {
        const opacity = Math.max(0.7 - scrollPosition / 1000, 0.3);
        const backgroundElement = heroSection.querySelector('div:first-child');
        if (backgroundElement) {
          backgroundElement.style.opacity = opacity.toString();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="font-sans text-charcoal">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <WhyJoinSection />
      <NextEscapeSection />
      <HowItWorksSection />
      <ApplicationSection />
      <Footer />
      <Analytics />
    </div>
  );
}

export default App;