import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: "Apply for the Tribe",
      description: "Fill out our application form. We're looking for curious minds and adventurous spirits."
    },
    {
      number: 2,
      title: "Get Selected",
      description: "Our team reviews applications to ensure the right energy and mix for each escape."
    },
    {
      number: 3,
      title: "Experience the Wild Escape",
      description: "Join the tribe for an unforgettable adventure. Come as strangers, leave as lifelong friends with stories to tell."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-charcoal text-softwhite">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-16 text-gold text-center">
          How It Works
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-8 md:left-12 top-0 h-[calc(100%-2rem)] w-0.5 bg-gold/30 z-0 hidden md:block"></div>
            
            <div className="space-y-12 md:space-y-16 relative z-10">
              {steps.map((step, index) => (
                <div 
                  key={index} 
                  className="flex flex-col md:flex-row items-start gap-6"
                >
                  <div className="flex-shrink-0 z-10 bg-charcoal">
                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gold/10 border-2 border-gold flex items-center justify-center text-gold font-display text-2xl md:text-3xl font-bold">
                      {step.number}
                    </div>
                  </div>
                  
                  <div className="md:pt-3 pl-0 md:pl-4">
                    <h3 className="text-xl md:text-2xl font-display font-bold mb-3 text-gold">
                      {step.title}
                    </h3>
                    <p className="text-softwhite/80 text-lg">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection