'use client';

import React from 'react';
import FeatureCard from './FeatureCard';
import { Card, CardContent } from './ui/card';
import { Container } from './ui/container';

/**
 * WhyJoinSection component showcases the key benefits of joining The Breakout Tribe.
 * Displays a grid of feature cards with images, titles, and descriptions.
 * Each feature has different animation classes for visual appeal.
 * 
 * @returns {JSX.Element} The rendered WhyJoinSection component
 */
const WhyJoinSection: React.FC = () => {
  const features = [
    {
      title: "Curated Adventures",
      image: "https://images.pexels.com/photos/12125348/pexels-photo-12125348.jpeg?auto=compress&cs=tinysrgb&w=1920",
      description: "Handpicked escapes — hidden beaches, private yacht parties, wild cliff dives, and once-in-a-lifetime thrills with a circle of extraordinary souls.",
      animation: "animate-fade-in-left"
    },
    {
      title: "Real Connections",
      image: "https://images.pexels.com/photos/7149136/pexels-photo-7149136.jpeg?auto=compress&cs=tinysrgb&w=1920",
      description: "More than conversations, more than contacts — it's where great minds meet under open skies, and lifelong alliances are born in laughter and adventure.",
      animation: "animate-fade-in"
    },
    {
      title: "Unscripted Possibilities",
      image: "/assets/unscripted_possibilities_img.png",
      description: "We don't call it networking — but when bold minds travel together, ideas flow, intros unfold, and new possibilities take shape.",
      animation: "animate-fade-in-right"
    }
  ];

  return (
    <section id="why-join" className="py-20 bg-charcoal text-softwhite">
      <Container>
        <Card className="bg-transparent border-none shadow-none mb-16">
          <CardContent className="p-0">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gold text-center">
              Why Join Us
            </h2>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              image={feature.image}
              description={feature.description.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < feature.description.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
              animationClass={feature.animation}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default WhyJoinSection; 