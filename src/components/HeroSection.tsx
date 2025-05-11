'use client';

import React from 'react';
import Button from './Button';
import { Container } from './ui/container';
import { cn } from '@/lib/utils';

/**
 * HeroSection component serves as the main landing section of the website.
 * Features a full-screen background image, animated heading text, and call-to-action button.
 * Includes a scroll indicator at the bottom to navigate to the About section.
 * 
 * @param {Function} onRequestInvite - Function to handle request invite button click
 * @returns {JSX.Element} The rendered HeroSection component
 */
interface HeroSectionProps {
  onRequestInvite: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onRequestInvite }) => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/7148673/pexels-photo-7148673.jpeg?auto=compress&cs=tinysrgb&w=1920')",
          opacity: 0.8
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      <Container className="z-10 text-center">
        <h1 className={cn(
          "text-4xl md:text-6xl lg:text-7xl text-white font-display font-bold mb-4",
          "animate-fade-in"
        )}>
          Not a Trip. <span className="text-gold">A Tribe.</span>
        </h1>
        <h2 className={cn(
          "text-xl md:text-2xl text-softwhite font-sans mb-8 max-w-2xl mx-auto",
          "animate-fade-in-up"
        )}>
          An invite-only escape for high performers who&apos;ve done the panels, the dinners, the polished intros — and now crave wild fun, real bonds, and a tribe that just might change everything.
        </h2>
        <Button 
          onClick={onRequestInvite}
          className="animate-fade-in-up"
          variant="goldFilled"
        >
          Request Invite
        </Button>
      </Container>
      
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <button 
          className="animate-bounce cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full p-1"
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          aria-label="Scroll to about section"
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 13l5 5 5-5M7 7l5 5 5-5" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default HeroSection; 