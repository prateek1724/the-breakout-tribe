import React from 'react';
import { Mail, Instagram, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-charcoal text-stone">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-gold font-display text-2xl font-bold mb-2">
              The Breakout Tribe
            </h2>
            <p className="text-stone/80">
              Curated adventures for the few who dare.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              <a href="mailto:hq@thebreakoutribe.com" className="text-stone hover:text-gold transition-colors">
                <Mail size={20} />
              </a>
              <a href="#" className="text-stone hover:text-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-stone hover:text-gold transition-colors">
                <Facebook size={20} />
              </a>
            </div>
            <p className="text-stone/70 text-sm">
              © 2025 The Breakout Tribe. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;