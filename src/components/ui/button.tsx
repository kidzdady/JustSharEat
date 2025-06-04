import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'lg';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size = 'lg', variant = 'primary', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors';
    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      lg: 'px-6 py-3 text-base',
    };
    const variantStyles = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700',
      secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
      outline: 'border border-gray-300 bg-transparent hover:bg-gray-50',
      ghost: 'bg-transparent hover:bg-gray-100',
    };

    return (
      <button
        className={cn(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };
