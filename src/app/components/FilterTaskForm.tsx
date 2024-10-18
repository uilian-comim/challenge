"use client";

import { RadioGroup } from "@/components/RadioGroup";
import { Span } from "@/components/Span";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { FilterTask } from "@/interfaces/task";
import utils from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowDownNarrowWide, ArrowUpNarrowWide } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

interface FilterTaskFormProps {
    setIsOpen: (value: boolean) => void;
}

export function FilterTaskForm({ setIsOpen }: FilterTaskFormProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const defaultSort =
        (searchParams.get("sort") as "asc" | "desc") || undefined;
    const defaultPriority =
        (searchParams.get("priority") as "low" | "medium" | "high") || "";
    const defaultOrderBy =
        (searchParams.get("orderBy") as "name" | "description" | "priority") ||
        "created_at";

    const [orderBy, setOrderBy] = useState<"asc" | "desc">(
        defaultSort || "desc"
    );
    const { control, handleSubmit } = useForm<FilterTask>({
        resolver: zodResolver(utils.schemas.filter),
        defaultValues: {
            priority: defaultPriority,
            orderBy: defaultOrderBy,
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

        params.set("sort", orderBy);

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
            <div>
                <RadioGroup
                    control={control}
                    name="orderBy"
                    title="Ordenar por"
                    items={[
                        { id: "name", value: "name", label: "Nome" },
                        {
                            id: "description",
                            value: "description",
                            label: "Descrição",
                        },
                        {
                            id: "priority",
                            value: "priority",
                            label: "Prioridade",
                        },
                        {
                            id: "created_at",
                            value: "created_at",
                            label: "Data de criação",
                        },
                    ]}
                />
                <Toggle
                    onClick={() =>
                        setOrderBy(orderBy === "asc" ? "desc" : "asc")
                    }
                    value="asc"
                    name="orderBy"
                >
                    <Span className="flex items-center justify-center gap-2 text-gray-700 dark:text-gray-400">
                        {orderBy === "asc" ? (
                            <>
                                Crescente
                                <ArrowUpNarrowWide size={16} />
                            </>
                        ) : (
                            <>
                                Decrescente
                                <ArrowDownNarrowWide size={16} />
                            </>
                        )}
                    </Span>
                </Toggle>
            </div>
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
