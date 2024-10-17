import { ButtonHTMLAttributes } from "react";
import {
    Button as ShadcnButton,
    ButtonProps as ShadcnButtonProps,
} from "../ui/button";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & ShadcnButtonProps;

export function Button({ children, ...rest }: ButtonProps) {
    return <ShadcnButton {...rest}>{children}</ShadcnButton>;
}
