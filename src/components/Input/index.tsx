import { cva, VariantProps } from "class-variance-authority";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Span } from "../Span";

const inputVariants = cva("", {
    variants: {
        variant: {
            outline:
                "border border-gray-950 shadow bg-transparent text-gray-800",
        },
        inputSize: {
            default: "h-9 px-3",
            sm: "h-8 px-2",
            lg: "h-12 px-3 text-base",
        },
    },
    defaultVariants: {
        inputSize: "default",
    },
});

const labelVariants = cva(
    "text-gray-800 dark:text-gray-300 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

type InputProps<T extends FieldValues> =
    React.InputHTMLAttributes<HTMLInputElement> &
        VariantProps<typeof inputVariants> & {
            name: Path<T>;
            label?: string;
            labelClassName?: string;
            control: Control<T, unknown>;
            error?: string;
        };

export function FormInput<T extends FieldValues>({
    name,
    label,
    className,
    labelClassName,
    variant,
    inputSize,
    control,
    error,
    ...rest
}: InputProps<T>) {
    return (
        <div className="w-full flex flex-col items-start justify-center gap-1">
            {label && (
                <Label
                    htmlFor={name}
                    className={cn(labelVariants({ className: labelClassName }))}
                >
                    {label}
                </Label>
            )}
            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <Input
                        {...field}
                        {...rest}
                        className={cn(
                            inputVariants({ variant, inputSize, className })
                        )}
                    />
                )}
            />
            {error && (
                <Span className="text-red-500 text-xs font-medium">
                    {error}
                </Span>
            )}
        </div>
    );
}
