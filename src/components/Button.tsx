import React from 'react';

interface ButtonProps {
  primary?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  primary = true, 
  children, 
  onClick, 
  type = "button",
  className = ""
}) => {
  const baseClasses = "font-button font-bold py-3 px-8 rounded-md transition-all duration-300 text-base md:text-lg uppercase tracking-wide";
  
  const buttonClasses = primary
    ? `${baseClasses} bg-gold hover:bg-amber text-charcoal hover:text-white`
    : `${baseClasses} bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-charcoal`;

  return (
    <button
      type={type}
      className={`${buttonClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;