"use client";

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'destructive' | 'ghost' | 'link' | 'outline' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  asChild?: boolean; // For using a different component as the child, e.g., NextLink
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', asChild = false, ...props }, ref) => {
    const Comp = asChild ? 'span' : 'button'; // Placeholder, ideally use Slot from @radix-ui/react-slot

    // Base styles
    let baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background';

    // Variant styles
    const variantStyles = {
      primary: 'bg-primary text-white hover:bg-primary/90',
      secondary: 'bg-secondary text-white hover:bg-secondary/90',
      accent: 'bg-accent text-gray-900 hover:bg-accent/90',
      destructive: 'bg-error text-white hover:bg-error/90',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'underline-offset-4 hover:underline text-primary',
      outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
      success: 'bg-success text-white hover:bg-success/90', // Using the 'success' color from Tailwind config
    };

    // Size styles
    const sizeStyles = {
      sm: 'h-9 px-3 rounded-md text-sm',
      md: 'h-10 px-4 py-2 rounded-md',
      lg: 'h-11 px-8 rounded-lg text-lg',
      icon: 'h-10 w-10',
    };

    const combinedClassName = [
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return <Comp className={combinedClassName} ref={ref} {...props} />;
  }
);

Button.displayName = 'Button';

export { Button };
export type { ButtonProps };