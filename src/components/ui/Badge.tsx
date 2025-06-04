import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'success' | 'warning' | 'info' | 'premium';
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    // Base styles for the badge
    const baseStyles =
      'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2';

    // Variant styles
    const variantStyles = {
      default:
        'border-transparent bg-primary text-white hover:bg-primary/80',
      secondary:
        'border-transparent bg-secondary text-white hover:bg-secondary/80',
      destructive:
        'border-transparent bg-error text-white hover:bg-error/80',
      success:
        'border-transparent bg-success text-white hover:bg-success/80',
      warning:
        'border-transparent bg-yellow-500 text-gray-900 hover:bg-yellow-500/80', // Using a yellow for warning
      info:
        'border-transparent bg-blue-500 text-white hover:bg-blue-500/80', // Using a blue for info
      premium:
        'border-transparent bg-premium text-gray-900 hover:bg-premium/80',
    };

    const combinedClassName = [
      baseStyles,
      variantStyles[variant],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return <div className={combinedClassName} ref={ref} {...props} />;
  }
);

Badge.displayName = 'Badge';

export { Badge };
export type { BadgeProps };