import React from 'react';
import FeatureCard from './FeatureCard';

const WhyJoinSection: React.FC = () => {
  const features = [
    {
      title: "Curated Adventures",
      image: "https://images.pexels.com/photos/12125348/pexels-photo-12125348.jpeg?auto=compress&cs=tinysrgb&w=1920",
      description: "Handpicked escapes — hidden beaches, private yacht parties, wild cliff dives, and once-in-a-lifetime thrills with a circle of extraordinary souls.",
      animation: "animate-fade-in-left"
    },
    {
      title: "Deep Bonding",
      image: "https://images.pexels.com/photos/7149136/pexels-photo-7149136.jpeg?auto=compress&cs=tinysrgb&w=1920",
      description: "More than conversations, more than contacts — it's where great minds meet under open skies, and lifelong alliances are born in laughter and adventure.",
      animation: "animate-fade-in"
    },
    {
      title: "Organic Growth",
      image: "https://images.pexels.com/photos/725255/pexels-photo-725255.jpeg?auto=compress&cs=tinysrgb&w=1920",
      description: "Share raw moments, daring dreams, and bold ideas with those who get it.",
      animation: "animate-fade-in-right"
    }
  ];

  return (
    <section id="why-join" className="py-20 bg-charcoal text-softwhite">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-16 text-gold text-center">
          Why Join Us
        </h2>
        
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
      </div>
    </section>
  );
};

export default WhyJoinSection;