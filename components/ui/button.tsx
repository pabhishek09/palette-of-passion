import * as React from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "secondary" | "ghost" | "destructive" | "link"
  size?: "xs" | "sm" | "default" | "lg" | "icon"
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

    const variants = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      link: "text-primary underline-offset-4 hover:underline",
    }

    const sizes = {
      xs: "h-6 px-2 text-xs gap-1",
      sm: "h-7 px-3 text-sm gap-1",
      default: "h-8 px-4 text-sm gap-2",
      lg: "h-10 px-6 text-base gap-2",
      icon: "h-8 w-8",
    }

    if (asChild) {
      // For asChild functionality, we'd need to implement a slot-like behavior
      // For simplicity, we'll just render a button for now
      return (
        <button
          className={cn(baseClasses, variants[variant], sizes[size], className)}
          ref={ref}
          {...props}
        />
      )
    }

    return (
      <button
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button }
