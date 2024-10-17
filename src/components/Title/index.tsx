import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

const titleVariants = cva(
    "text-gray-800 dark:text-gray-300 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
    {
        variants: {
            size: {
                sm: "text-sm font-medium",
                default: "text-lg font-semibold",
                lg: "text-xl font-semibold",
            },
        },
        defaultVariants: {
            size: "default",
        },
    }
);

interface TitleProps
    extends HTMLAttributes<HTMLHeadingElement>,
        VariantProps<typeof titleVariants> {}

export function Title({ children, className, size, ...rest }: TitleProps) {
    return (
        <h1 className={cn(titleVariants({ className, size }))} {...rest}>
            {children}
        </h1>
    );
}
