import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

export const badgeVariants = cva(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-x font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-off-offset-2",
    {
      variants: {
        variant: {
            default: 
              "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
            secondary: 
              "border-transparent bg-secondary text-secondary-foreground outline-none hover:bg-secondary/80",
            destructive: 
              "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
            outline: "text-foreground"
        },
      },
      defaultVariants: {
        variant: "default"
      },
    }
);


export type BadgeVariant = VariantProps<typeof badgeVariants>['variant'];
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> {
    className?: string
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
    ({ className, variant = "default", ...props}, ref) => (
        <div
          ref={ref}
          className={cn(badgeVariants({ variant }), className)}
          {...props}
          />
    )
);

Badge.displayName = "Badge";

export { Badge };