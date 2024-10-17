import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

const spanVariants = cva(
    "text-sm font-medium text-gray-800 dark:text-gray-300 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

interface SpanProps
    extends HTMLAttributes<HTMLSpanElement>,
        VariantProps<typeof spanVariants> {}

export function Span({ children, className, ...rest }: SpanProps) {
    return (
        <span className={cn(spanVariants({ className }))} {...rest}>
            {children}
        </span>
    );
}
