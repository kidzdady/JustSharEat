import React from 'react';

interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  // For simplicity, we'll use a span and style it.
  // More advanced versions might use @radix-ui/react-avatar for image fallbacks etc.
  src?: string;
  alt?: string;
  fallback?: React.ReactNode; // e.g., initials
  size?: 'sm' | 'md' | 'lg';
}

const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, src, alt, fallback, size = 'md', ...props }, ref) => {
    const sizeStyles = {
      sm: 'h-8 w-8',
      md: 'h-10 w-10',
      lg: 'h-12 w-12',
    };

    const baseStyles =
      'relative flex shrink-0 overflow-hidden rounded-full items-center justify-center bg-secondary/20 text-secondary'; // Fallback bg and text color

    const combinedClassName = [
        baseStyles,
        sizeStyles[size],
        className
    ].filter(Boolean).join(' ');

    return (
      <span ref={ref} className={combinedClassName} {...props}>
        {src ? (
          <img src={src} alt={alt || 'User avatar'} className="aspect-square h-full w-full" />
        ) : fallback ? (
          fallback
        ) : (
          // Default fallback (e.g., a generic icon or initials based on name if provided)
          <svg
            className="h-3/5 w-3/5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            ></path>
          </svg>
        )}
      </span>
    );
  }
);
Avatar.displayName = 'Avatar';

export { Avatar };
export type { AvatarProps };