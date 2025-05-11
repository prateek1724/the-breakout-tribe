'use client';

import React from 'react';
import { Button as ShadcnButton } from "@/components/ui/button";

interface ButtonProps {
  primary?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "gold" | "goldFilled";
  disabled?: boolean;
}

/**
 * Button component that wraps the shadcn Button with custom styling.
 * 
 * @param primary - Determines if the button should have primary styling
 * @param children - The content to be displayed inside the button
 * @param onClick - Function to be called when the button is clicked
 * @param type - HTML button type attribute
 * @param className - Additional CSS classes to apply to the button
 * @param variant - Visual style variant of the button
 * @param disabled - Whether the button is disabled
 */
const Button: React.FC<ButtonProps> = ({ 
  primary = true, 
  children, 
  onClick, 
  type = "button",
  className = "",
  variant = "default",
  disabled = false
}) => {
  return (
    <ShadcnButton
      type={type}
      variant={variant || (primary ? "default" : "outline")}
      onClick={onClick}
      className={`font-button font-bold py-4 px-8 text-base md:text-lg uppercase tracking-wide ${className}`}
      disabled={disabled}
    >
      {children}
    </ShadcnButton>
  );
};

export default Button; 