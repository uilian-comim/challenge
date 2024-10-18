"use client";

import { RadioGroup } from "@/components/RadioGroup";
import { Button } from "@/components/ui/button";
import { FilterTask } from "@/interfaces/task";
import utils from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

interface FilterTaskFormProps {
    setIsOpen: (value: boolean) => void;
}

export function FilterTaskForm({ setIsOpen }: FilterTaskFormProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const defaultPriority =
        (searchParams.get("priority") as "low" | "medium" | "high") || "";
    const { control, handleSubmit } = useForm<FilterTask>({
        resolver: zodResolver(utils.schemas.filter),
        defaultValues: {
            priority: defaultPriority,
        },
    });

    function onSubmit(data: FilterTask) {
        const params = new URLSearchParams(searchParams);
        Object.entries(data).forEach(([key, value]) => {
            if (value === undefined || value === "" || value === null) {
                return;
            }

            params.set(key, value);
        });

        router.replace(`?${params.toString()}`);
        setIsOpen(false);
    }

    const resetFilter = useCallback(() => {
        router.replace("/");
        setIsOpen(false);
    }, []);

    return (
        <form
            className="w-full flex flex-col items-start justify-center gap-3"
            onSubmit={handleSubmit(onSubmit)}
        >
            <RadioGroup
                control={control}
                name="priority"
                title="Prioridade"
                items={[
                    { id: "low", value: "low", label: "Baixa" },
                    { id: "medium", value: "medium", label: "Média" },
                    { id: "high", value: "high", label: "Alta" },
                ]}
            />
            <div className="w-full grid grid-cols-3 justify-items-center place-items-center gap-1">
                <Button className="w-full" type="submit" variant="secondary">
                    Filtrar
                </Button>
                <Button
                    className="w-full"
                    type="button"
                    variant="outline"
                    onClick={resetFilter}
                >
                    Resetar
                </Button>
                <Button
                    className="w-full"
                    type="button"
                    onClick={() => setIsOpen(false)}
                    variant="destructive"
                >
                    Cancelar
                </Button>
            </div>
        </form>
    );
}
