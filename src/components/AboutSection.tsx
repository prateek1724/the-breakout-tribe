'use client';

import React from 'react';
import { Card, CardContent } from './ui/card';
import { Container } from './ui/container';

/**
 * AboutSection component displays the mission and philosophy of The Breakout Tribe.
 * Features a full-width background image with overlaid text content.
 * 
 * @returns {JSX.Element} The rendered AboutSection component
 */
const AboutSection: React.FC = () => {
  return (
    <section 
      id="about" 
      className="py-20 relative min-h-[60vh] flex items-center"
      style={{
        backgroundImage: "url('https://images.pexels.com/photos/4453153/pexels-photo-4453153.jpeg?auto=compress&cs=tinysrgb&w=1920')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-charcoal/60"></div>
      <Container className="relative z-10">
        <Card className="max-w-3xl mx-auto bg-transparent border-none shadow-none">
          <CardContent className="p-0 text-center" style={{ background: 'transparent' }}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-8 text-white">
              More Than a Trip —<br />A Story You'll Tell for Life.
            </h2>
            <p className="text-lg md:text-xl text-gold leading-relaxed font-medium">
              We replace office lights with golden sunsets, LinkedIn intros with shared adrenaline, and structured agendas with serendipity. For those who've made it — but crave meaning, wild fun, and the right people. This is where ideas spark over bonfires, stories collide with possibility, and bold escapes become the beginning of something much bigger.
            </p>
          </CardContent>
        </Card>
      </Container>
    </section>
  );
};

export default AboutSection; 