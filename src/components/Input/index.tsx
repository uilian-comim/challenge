import { cva, VariantProps } from "class-variance-authority";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

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

type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
    VariantProps<typeof inputVariants> & {
        name: string;
        label?: string;
        labelClassName?: string;
    };

export function FormInput({
    name,
    label,
    className,
    labelClassName,
    variant,
    inputSize,
    ...rest
}: InputProps) {
    return (
        <div className="flex flex-col items-center justify-start gap-1">
            {label && (
                <Label htmlFor={name} className={labelClassName}>
                    {label}
                </Label>
            )}
            <Input
                name={name}
                className={inputVariants({ className, variant, inputSize })}
                {...rest}
            />
        </div>
    );
}
