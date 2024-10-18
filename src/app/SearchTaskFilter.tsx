"use client";

import { FormInput } from "@/components/Input";
import { Span } from "@/components/Span";
import { Button } from "@/components/ui/button";
import { FilterTask } from "@/interfaces/task";
import utils from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextSearch } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

export function SearchTaskFilter() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { control, handleSubmit } = useForm<FilterTask>({
        resolver: zodResolver(utils.schemas.filter),
        defaultValues: {
            nameOrDescription: "",
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
    }

    return (
        <form
            className="w-full flex items-start justify-center gap-1"
            onSubmit={handleSubmit(onSubmit)}
        >
            <FormInput
                control={control}
                name="nameOrDescription"
                placeholder="Digite o nome ou descricão da tarefa que deseja filtrar"
            />
            <Button variant="secondary">
                <TextSearch
                    className="text-gray-300 dark:text-gray-800"
                    size={20}
                />
                <Span className="text-gray-300 dark:text-gray-800 hidden md:inline">
                    Buscar
                </Span>
            </Button>
        </form>
    );
}
