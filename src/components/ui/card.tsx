import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Card component serves as a container for related content.
 * Provides styling for a card with border, background, and shadow.
 * 
 * @param className - Additional CSS classes to apply
 * @param props - Additional HTML div props
 * @returns {JSX.Element} The rendered Card component
 */
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border border-neutral-200 bg-white text-neutral-950 shadow-sm dark:border-neutral-800 dark:text-neutral-50",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

/**
 * CardHeader component for the top section of a card.
 * Provides consistent spacing and layout for card headers.
 * 
 * @param className - Additional CSS classes to apply
 * @param props - Additional HTML div props
 * @returns {JSX.Element} The rendered CardHeader component
 */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

/**
 * CardTitle component for the title of a card.
 * Provides consistent styling for card titles.
 * 
 * @param className - Additional CSS classes to apply
 * @param props - Additional HTML heading props
 * @returns {JSX.Element} The rendered CardTitle component
 */
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

/**
 * CardDescription component for descriptive text in a card.
 * Provides consistent styling for card descriptions.
 * 
 * @param className - Additional CSS classes to apply
 * @param props - Additional HTML paragraph props
 * @returns {JSX.Element} The rendered CardDescription component
 */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-neutral-500 dark:text-neutral-400", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

/**
 * CardContent component for the main content area of a card.
 * Provides consistent padding and layout for card content.
 * 
 * @param className - Additional CSS classes to apply
 * @param props - Additional HTML div props
 * @returns {JSX.Element} The rendered CardContent component
 */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

/**
 * CardFooter component for the bottom section of a card.
 * Provides consistent styling and layout for card footers.
 * 
 * @param className - Additional CSS classes to apply
 * @param props - Additional HTML div props
 * @returns {JSX.Element} The rendered CardFooter component
 */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } 