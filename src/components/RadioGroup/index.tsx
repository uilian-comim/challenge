import { useCallback } from "react";
import { Span } from "../Span";
import { Label } from "../ui/label";
import {
    RadioGroupItem,
    RadioGroup as ShadcnRadioGroup,
} from "../ui/radio-group";

interface RadioGroupProps {
    title: string;
    name: string;
    defaultValue: string;
    items: Array<{
        id: string;
        value: string;
        label: string;
    }>;
}

export function RadioGroup({
    defaultValue,
    name,
    title,
    items,
}: RadioGroupProps) {
    const renderItems = useCallback(() => {
        return items.map((item) => {
            return (
                <div className="flex items-center justify-center" key={item.id}>
                    <RadioGroupItem id={item.id} value={item.value} />
                    <Label
                        className="w-full pl-1 cursor-pointer"
                        htmlFor={item.id}
                    >
                        {item.label}
                    </Label>
                </div>
            );
        });
    }, []);

    return (
        <div className="flex flex-col items-start justify-center gap-2">
            <Span>{title}</Span>
            <ShadcnRadioGroup
                className="w-full flex items-center justify-center gap-2"
                name={name}
                defaultValue={defaultValue}
            >
                {renderItems()}
            </ShadcnRadioGroup>
        </div>
    );
}
