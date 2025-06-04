import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  // No specific variants for now, can be extended later if needed
  // e.g., withPadding?: boolean;
  // e.g., interactive?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    // Base styles for the card
    const baseStyles =
      'rounded-lg border bg-surface text-text-primary shadow-sm';
    // Example of interactive styles (can be made conditional with a prop)
    // const interactiveStyles = 'transition-all hover:shadow-md';

    const combinedClassName = [
        baseStyles,
        // interactive ? interactiveStyles : '',
        className
    ]
      .filter(Boolean)
      .join(' ');

    return <div ref={ref} className={combinedClassName} {...props} />;
  }
);
Card.displayName = 'Card';

// Optional: CardHeader, CardContent, CardFooter components for structure
// These can be simple divs with some default padding/styling

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={['flex flex-col space-y-1.5 p-6', className].filter(Boolean).join(' ')}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={['text-2xl font-semibold leading-none tracking-tight font-display', className].filter(Boolean).join(' ')}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={['text-sm text-text-secondary', className].filter(Boolean).join(' ')}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={['p-6 pt-0', className].filter(Boolean).join(' ')} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={['flex items-center p-6 pt-0', className].filter(Boolean).join(' ')}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
export type { CardProps };