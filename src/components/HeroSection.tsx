import React from 'react';
import Button from './Button';

const HeroSection: React.FC = () => {
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
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 z-10 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-display font-bold mb-4 animate-fade-in">
          Not a Trip. <span className="text-gold">A Tribe.</span>
        </h1>
        <h2 className="text-xl md:text-2xl text-softwhite font-sans mb-8 max-w-2xl mx-auto animate-fade-in-up">
          An invite-only escape for high performers who’ve done the panels, the dinners, the polished intros — and now crave wild fun, real bonds, and a tribe that just might change everything.
        </h2>
        <Button 
          onClick={() => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })}
          className="animate-fade-in-up"
        >
          Request Invite
        </Button>
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <div 
          className="animate-bounce cursor-pointer"
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 13l5 5 5-5M7 7l5 5 5-5" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;