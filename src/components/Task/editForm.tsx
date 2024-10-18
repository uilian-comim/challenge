"use client";

import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/Input";
import { RadioGroup } from "@/components/RadioGroup";
import { Span } from "@/components/Span";
import { CreateTask, Task, UpdateTask } from "@/interfaces/task";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { FormTextarea } from "@/components/Textarea";
import utils from "@/utils";
import { useTasks } from "@/contexts/tasks.context";

interface EditProps {
    task: Task;
    setIsOpen: (value: boolean) => void;
}

export function EditTaskForm({ task, setIsOpen }: EditProps) {
    const { refetch } = useTasks();
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<UpdateTask>({
        resolver: zodResolver(utils.schemas.create),
        defaultValues: {
            name: task.name,
            description: task.description,
            priority: task.priority,
        },
    });

    async function onSubmit(data: CreateTask) {
        utils.LS.saveItem("tasks", task, data);
        refetch();
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
                control={control}
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
                    <Save className="text-green-50" size={24} />
                    <Span className="text-green-50 text-base">
                        Salvar alterações
                    </Span>
                </Button>
                <Button
                    className="flex-1"
                    size="lg"
                    type="button"
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
