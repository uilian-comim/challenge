import { cva } from "class-variance-authority";
import { Textarea as ShadcnTextarea, TextareaProps } from "../ui/textarea";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Span } from "../Span";

const labelVariants = cva(
    "text-gray-800 dark:text-gray-300 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

type InputProps<T extends FieldValues> =
    React.InputHTMLAttributes<HTMLInputElement> &
        TextareaProps & {
            name: Path<T>;
            label?: string;
            labelClassName?: string;
            control: Control<T, unknown>;
            error?: string;
        };

export function FormTextarea<T extends FieldValues>({
    name,
    label,
    className,
    labelClassName,
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
                    <ShadcnTextarea
                        {...field}
                        {...rest}
                        className={cn(className)}
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
