import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  // color?: string; // Could allow custom color via props
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className = '',
  // color = 'border-primary', // Default to primary color
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  // Using Tailwind's border color for the spinner track and a transparent border for the moving part
  // The main color is applied to one of the borders to create the spinning effect.
  const spinnerColor = 'border-primary'; // Can be made dynamic if color prop is used

  return (
    <div
      className={[
        'animate-spin rounded-full border-4 border-solid border-t-transparent',
        spinnerColor, // Applies the main color to the visible part of the spinner
        `border-r-gray-200 border-b-gray-200 border-l-gray-200`, // Lighter track color for other borders
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export { LoadingSpinner };
export type { LoadingSpinnerProps };