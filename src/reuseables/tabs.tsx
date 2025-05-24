import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from "../lib/utils";


export const Tabs = TabsPrimitive.Root;


type TabsElementProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>;

// TabsList Component
export const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsElementProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex h-10 items-center justify-center  rounded-md bg-muted p-1 text-[#0A0B0B]',
      className
    )}
    {...props}
  />
));
TabsList.displayName = 'TabsList';

// TabsTrigger Component
type TabsTriggerProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>;

export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
     'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    'data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-foreground',
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = 'TabsTrigger';

// TabsContent Component
type TabsContentProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>;

export const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className
    )}
    {...props}
  />
));
TabsContent.displayName = 'TabsContent';
