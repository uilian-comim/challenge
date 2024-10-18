import { useCallback } from "react";
import { Span } from "../Span";
import { Label } from "../ui/label";
import {
    RadioGroupItem,
    RadioGroup as ShadcnRadioGroup,
} from "../ui/radio-group";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface RadioGroupProps<T extends FieldValues> {
    title: string;
    name: Path<T>;
    defaultValue?: string;
    control: Control<T>;
    items: Array<{
        id: string;
        value: string;
        label: string;
    }>;
}

export function RadioGroup<T extends FieldValues>({
    defaultValue,
    name,
    title,
    control,
    items,
}: RadioGroupProps<T>) {
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
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <ShadcnRadioGroup
                        className="w-full flex items-center justify-center gap-2"
                        name={name}
                        onValueChange={field.onChange}
                        defaultValue={field.value || defaultValue}
                    >
                        {renderItems()}
                    </ShadcnRadioGroup>
                )}
            />
        </div>
    );
}
