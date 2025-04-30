import React from 'react';
import Button from './Button';

const NextEscapeSection: React.FC = () => {
  return (
    <section 
      id="next-escape" 
      className="py-28 relative flex items-center bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: "url('https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=1920')"
      }}
    >
      <div className="absolute inset-0 bg-charcoal/50"></div>
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="max-w-lg bg-charcoal/80 backdrop-blur-md p-8 md:p-12 rounded-lg border border-gold/20">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-3 text-gold">
            The Next Escape
          </h2>
          <h3 className="text-xl text-white mb-6 font-medium">
            Langkawi, Malaysia
            <span className="block text-amber mt-1">10 curated spots only.</span>
          </h3>
          
          <ul className="space-y-4 mb-8 text-softwhite/90">
            <li className="flex items-center gap-3">
              <span className="text-gold text-xl">•</span>
              <span className="leading-relaxed">Luxury villas & private beaches nestled in paradise.</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-gold text-xl">•</span>
              <span className="leading-relaxed">Yacht parties under the stars with endless possibilities.</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-gold text-xl">•</span>
              <span className="leading-relaxed">Forge lifelong bonds over unforgettable stories.</span>
            </li>
          </ul>
          
          <Button onClick={() => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })}>
            Reserve Your Spot
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NextEscapeSection