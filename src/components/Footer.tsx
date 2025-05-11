'use client';

import React from 'react';
import { Mail } from 'lucide-react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { Container } from './ui/container';
import { Button } from './ui/button';

/**
 * Footer component for The Breakout Tribe website
 * Displays company name, tagline, social media links, and copyright information
 * @returns {JSX.Element} The rendered Footer component
 */
const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-charcoal text-stone">
      <Container>
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
              <Button
                variant="ghost"
                size="icon"
                className="text-stone hover:text-gold hover:bg-transparent"
                asChild
              >
                <a href="mailto:hq@thebreakoutribe.com" aria-label="Email">
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-stone hover:text-gold hover:bg-transparent"
                asChild
              >
                <a href="#" aria-label="Instagram">
                  <FaInstagram className="h-5 w-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-stone hover:text-gold hover:bg-transparent"
                asChild
              >
                <a href="#" aria-label="Facebook">
                  <FaFacebook className="h-5 w-5" />
                </a>
              </Button>
            </div>
            <p className="text-stone/70 text-sm">
              © 2025 The Breakout Tribe. All Rights Reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer; 