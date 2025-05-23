import * as React from 'react';
import { cn } from '../lib/utils';

type DivProps = React.HTMLAttributes<HTMLDivElement>;
type H3Props = React.HTMLAttributes<HTMLHeadingElement>;
type PProps = React.HTMLAttributes<HTMLParagraphElement>;

// Card
const Card = React.forwardRef<HTMLDivElement, DivProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('rounded-lg border-none bg-white text-card-foreground shadow-sm', className)}
    {...props}
  />
));
Card.displayName = 'Card';

// CardHeader
const CardHeader = React.forwardRef<HTMLDivElement, DivProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

// CardTitle
const CardTitle = React.forwardRef<HTMLHeadingElement, H3Props>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-sm font-semibold leading-none tracking-tight', className)}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

// CardDescription
const CardDescription = React.forwardRef<HTMLParagraphElement, PProps>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

// CardContent
const CardContent = React.forwardRef<HTMLDivElement, DivProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

// CardFooter
const CardFooter = React.forwardRef<HTMLDivElement, DivProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};