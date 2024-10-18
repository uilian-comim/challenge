"use client";

import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/Input";
import { RadioGroup } from "@/components/RadioGroup";
import { Span } from "@/components/Span";
import { useModal } from "@/contexts/modal";
import { CreateTask } from "@/interfaces/task";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { FormTextarea } from "@/components/Textarea";
import utils from "@/utils";

export function CreateTaskForm() {
    const { setIsOpen } = useModal();
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<CreateTask>({
        resolver: zodResolver(utils.schemas.create),
        defaultValues: {
            name: "",
            description: "",
            priority: "low",
        },
    });

    async function onSubmit(data: CreateTask) {
        utils.LS.setItem("tasks", JSON.stringify(data));
        setIsOpen(false);
    }

    return (
        <form
            className="w-full flex flex-col items-start justify-center gap-4"
            onSubmit={handleSubmit(onSubmit)}
        >
            <FormInput
                control={control}
                name="name"
                label="Nome"
                error={errors.name?.message}
                className={
                    errors.name?.message
                        ? "border border-red-500 outline-red-500 dark:outline-red-500"
                        : ""
                }
            />
            <FormTextarea
                control={control}
                name="description"
                label="Descricão"
                error={errors.description?.message}
                className={
                    errors.description?.message
                        ? "border border-red-500 outline-red-500 dark:outline-red-500"
                        : ""
                }
            />
            <RadioGroup
                defaultValue="low"
                name="priority"
                title="Prioridade"
                items={[
                    { id: "high", value: "high", label: "Alta" },
                    { id: "medium", value: "medium", label: "Média" },
                    { id: "low", value: "low", label: "Baixa" },
                ]}
            />
            <div className="w-full flex items-start justify-between gap-2">
                <Button
                    className="flex-1"
                    size="lg"
                    type="submit"
                    variant="success"
                >
                    <Check className="text-green-50" size={24} />
                    <Span className="text-green-50 text-base">
                        Cadastrar tarefa
                    </Span>
                </Button>
                <Button
                    className="flex-1"
                    size="lg"
                    type="submit"
                    variant="destructive"
                    onClick={() => setIsOpen(false)}
                >
                    <X className="text-red-50" size={24} />
                    <Span className="text-red-50 text-base">Cancelar</Span>
                </Button>
            </div>
        </form>
    );
}
