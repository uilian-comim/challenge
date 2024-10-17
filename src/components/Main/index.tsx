import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

const mainVariants = cva(
    "w-full min-h-main flex flex-col justify-start items-center bg-base-100 px-5 md:px-60 py-4"
);

interface MainProps
    extends HTMLAttributes<HTMLElement>,
        VariantProps<typeof mainVariants> {}

export function Main({ className, children }: MainProps) {
    return <main className={cn(mainVariants({ className }))}>{children}</main>;
}
