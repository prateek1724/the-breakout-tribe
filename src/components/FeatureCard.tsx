'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardTitle } from './ui/card';

interface FeatureCardProps {
  title: string;
  image: string;
  description: string | React.ReactNode;
  animationClass?: string;
}

/**
 * FeatureCard component displays a feature with an image, title, and description.
 * Includes animation on scroll into view and hover effects on the image.
 * Used primarily in the WhyJoinSection to showcase benefits of joining.
 * 
 * @param title - The title of the feature
 * @param image - URL or imported image for the feature
 * @param description - Text or React node describing the feature
 * @param animationClass - Optional CSS class for entrance animation
 * @returns {JSX.Element} The rendered FeatureCard component
 */
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

    const currentRef = cardRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <Card 
      ref={cardRef}
      className={`flex flex-col h-full overflow-hidden transition-all duration-500 bg-charcoal border-gold/20 ${isVisible ? animationClass : 'opacity-0'}`}
    >
      <div className="h-64 overflow-hidden relative">
        {image.startsWith('http') ? (
          // For remote images
          <Image 
            src={image} 
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 hover:scale-110"
          />
        ) : (
          // For local images
          <Image 
            src={image} 
            alt={title}
            fill
            className="object-cover transition-transform duration-700 hover:scale-110"
          />
        )}
      </div>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="text-xl font-display font-bold text-gold mb-3">
          {title}
        </CardTitle>
        <div className="text-softwhite/90">
          {description}
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureCard; 