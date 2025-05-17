'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import WhyJoinSection from '@/components/WhyJoinSection';
import NextEscapeSection from '@/components/NextEscapeSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import ApplicationSection from '@/components/ApplicationSection';
import EscapeExpectationsSection from '@/components/EscapeExpectationsSection';
import Footer from '@/components/Footer';

/**
 * Home page component serves as the main container for The Breakout Tribe website.
 * Assembles all page sections in order and implements scroll effects.
 * Features smooth scrolling for anchor links and parallax opacity effect for the hero section.
 * 
 * @returns {JSX.Element} The rendered Home page component
 */
export default function Home() {
  const [showExpectationsSection, setShowExpectationsSection] = useState(false);
  /**
   * State to store and persist the user's selected expectations between components
   * This allows the selections to be retained when navigating back from the application form
   */
  const [selectedExpectations, setSelectedExpectations] = useState<string[]>([]);

  /**
   * Handles the request invite action by scrolling to either the application section
   * or the expectations section, depending on which one is currently visible
   */
  const handleRequestInvite = () => {
    if (showExpectationsSection) {
      // If expectations section is showing, scroll to it
      setTimeout(() => {
        const expectationsSection = document.getElementById('expectations');
        if (expectationsSection) {
          expectationsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // If application section is showing, scroll to it
      setTimeout(() => {
        const applicationSection = document.getElementById('apply');
        if (applicationSection) {
          applicationSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(this: HTMLAnchorElement, e: Event) {
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
        const backgroundElement = heroSection.querySelector('div:first-child') as HTMLElement;
        if (backgroundElement) {
          backgroundElement.style.opacity = opacity.toString();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Handles the transition from application form to expectations selection
   * Stores the selected expectations and shows the expectations section
   * 
   * @param {string[]} expectations - Array of selected expectation options
   */
  const handleNext = (expectations: string[]) => {
    setSelectedExpectations(expectations);
    setShowExpectationsSection(true);
    // Scroll to the expectations section
    setTimeout(() => {
      const expectationsSection = document.getElementById('expectations');
      if (expectationsSection) {
        expectationsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  /**
   * Handles the transition from expectations selection back to application form
   * Preserves the selected expectations state and shows the application section
   */
  const handleBack = () => {
    setShowExpectationsSection(false);
    // Scroll to the application section
    setTimeout(() => {
      const applicationSection = document.getElementById('apply');
      if (applicationSection) {
        applicationSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="font-sans text-charcoal">
      <Navbar onRequestInvite={handleRequestInvite} />
      <HeroSection onRequestInvite={handleRequestInvite} />
      <AboutSection />
      <WhyJoinSection />
      <NextEscapeSection />
      <HowItWorksSection />
      {!showExpectationsSection ? (
        <ApplicationSection onBack={handleBack} />
      ) : (
        <EscapeExpectationsSection onNext={handleNext} initialExpectations={selectedExpectations} />
      )}
      <Footer />
    </div>
  );
}
