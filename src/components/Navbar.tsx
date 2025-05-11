'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Button from './Button';
import { cn } from '@/lib/utils';

/**
 * Navbar component provides navigation for the website.
 * Features a responsive design with desktop and mobile views, logo, navigation links,
 * and a call-to-action button. Changes appearance on scroll.
 * 
 * @param {Function} onRequestInvite - Function to handle request invite button click
 * @returns {JSX.Element} The rendered Navbar component
 */
interface NavbarProps {
  onRequestInvite: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onRequestInvite }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClass = isScrolled 
    ? 'bg-charcoal shadow-md py-4' 
    : 'bg-transparent py-6';

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#why-join", label: "Why Join" },
    { href: "#next-escape", label: "Next Escape" },
    { href: "#how-it-works", label: "How It Works" },
  ];

  return (
    <nav className={cn("fixed w-full z-50 transition-all duration-300", navClass)}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <a href="#" className="flex items-center space-x-3 text-gold font-display text-2xl font-bold">
            <Image src="/assets/tbt_logo.png" alt="The Breakout Tribe Logo" width={40} height={40} className="object-contain" />
            <span>The Breakout Tribe</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.href}
                href={link.href} 
                className="text-softwhite hover:text-gold transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Button 
              primary={false} 
              onClick={onRequestInvite}
              variant="gold"
            >
              Request Invite
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gold p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Slide in from right */}
      <div 
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-charcoal shadow-lg transform transition-transform duration-300 ease-in-out md:hidden",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-gold p-2"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>
        <div className="px-4 py-4 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <a 
              key={link.href}
              href={link.href} 
              className="text-softwhite hover:text-gold p-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Button 
            primary={false}
            className="self-start mt-4"
            variant="gold"
            onClick={() => {
              onRequestInvite();
              setIsMenuOpen(false);
            }}
          >
            Apply Now
          </Button>
        </div>
      </div>
      
      {/* Overlay when mobile menu is open */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar; 