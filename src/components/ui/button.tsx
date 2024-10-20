import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium tracking-wider ring-offset-background transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                default:
                    "bg-indigo-600 text-indigo-100 shadow hover:bg-indigo-600/90",
                secondary:
                    "bg-gray-700 text-gray-300 hover:bg-gray-700/90 dark:bg-gray-400 dark:text-gray-800 dark:hover:bg-gray-400/90",
                success:
                    "bg-green-600 text-green-100 shadow hover:bg-green-600/90",
                destructive:
                    "bg-red-600 text-red-100 shadow hover:bg-red-600/90",
                outline:
                    "border border-gray-950 bg-transparent text-gray-950 shadow hover:bg-gray-950/10 dark:border-gray-400 dark:text-gray-400 dark:hover:bg-gray-400/10",
                ghost: "bg-transparent shadow hover:bg-gray-950/10 dark:hover:bg-gray-400/10",
            },
            size: {
                default: "h-9 px-4 py-2",
                sm: "h-8 rounded-md px-3 text-xs",
                lg: "h-10 rounded-md px-8",
                icon: "h-9 w-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
