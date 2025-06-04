import React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label'; // We'll need to install this

interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {}

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={[
      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
export type { LabelProps };