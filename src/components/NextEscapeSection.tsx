'use client';

import React from 'react';
import Button from './Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';

/**
 * NextEscapeSection component displays information about the upcoming escape event.
 * Features a card with location details, highlights, and a call-to-action button
 * on a background image.
 * 
 * @returns {JSX.Element} The rendered NextEscapeSection component
 */
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
        <Card className="max-w-lg bg-charcoal/80 backdrop-blur-md border-gold/20 p-4 md:p-6">
          <CardHeader className="pb-2 pt-4 px-4 md:px-6">
            <CardTitle className="text-3xl md:text-4xl font-display font-bold text-gold">
              The Next Escape
            </CardTitle>
            <div className="text-xl text-white font-medium mt-3">
              Langkawi, Malaysia
              <span className="block text-amber mt-1">Limited Spots only.</span>
            </div>
          </CardHeader>
          
          <CardContent className="pt-8 px-4 md:px-6">
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
          </CardContent>
          
          <CardFooter className="flex justify-center pb-4 pt-2 px-4 md:px-6">
            <Button 
              variant="goldFilled" 
              onClick={() => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Reserve Your Spot
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default NextEscapeSection; 