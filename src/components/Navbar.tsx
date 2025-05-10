import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Button from './Button';

const Navbar: React.FC = () => {
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

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${navClass}`}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <a href="#" className="text-gold font-display text-2xl font-bold">
            The Breakout Tribe
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-softwhite hover:text-gold transition-colors">About</a>
            <a href="#why-join" className="text-softwhite hover:text-gold transition-colors">Why Join</a>
            <a href="#next-escape" className="text-softwhite hover:text-gold transition-colors">Next Escape</a>
            <a href="#how-it-works" className="text-softwhite hover:text-gold transition-colors">How It Works</a>
            <Button primary={false} onClick={() => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })}>
            Request Invite
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gold p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-charcoal">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a 
              href="#about" 
              className="text-softwhite hover:text-gold p-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="#why-join" 
              className="text-softwhite hover:text-gold p-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Why Join
            </a>
            <a 
              href="#next-escape" 
              className="text-softwhite hover:text-gold p-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Next Escape
            </a>
            <a 
              href="#how-it-works" 
              className="text-softwhite hover:text-gold p-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </a>
            <Button 
              primary={false}
              className="self-start"
              onClick={() => {
                document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
                setIsMenuOpen(false);
              }}
            >
              Apply Now
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;