import React, { useRef, useEffect, useState } from 'react';

interface FeatureCardProps {
  title: string;
  image: string;
  description: string | React.ReactNode;
  animationClass?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  image, 
  description,
  animationClass = ""
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`flex flex-col h-full rounded-lg overflow-hidden transition-all duration-500 ${isVisible ? animationClass : 'opacity-0'}`}
    >
      <div className="h-64 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
      </div>
      <div className="p-6 bg-charcoal border border-gold/20 flex-grow">
        <h3 className="text-xl font-display font-bold text-gold mb-3">
          {title}
        </h3>
        <div className="text-softwhite/90">
          {description}
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;