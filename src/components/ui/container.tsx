import * as React from "react"
import { cn } from "@/lib/utils"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

/**
 * Container component for consistent page layout.
 * Provides centered content with responsive padding at different breakpoints.
 * 
 * @param className - Additional CSS classes to apply
 * @param children - Content to be displayed inside the container
 * @param props - Additional HTML div props
 * @returns {JSX.Element} The rendered Container component
 */
const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("container mx-auto px-4 md:px-6 lg:px-8", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Container.displayName = "Container"

export { Container } 