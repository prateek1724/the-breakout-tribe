import * as React from "react"

import { cn } from "src/lib/utils"

/**
 * Textarea component for multiline text input.
 * Provides consistent styling and behavior for textareas.
 * 
 * @param className - Additional CSS classes to apply
 * @param props - Additional HTML textarea props
 * @returns {JSX.Element} The rendered Textarea component
 */
const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-base ring-offset-white placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
