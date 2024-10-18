"use client";

import { Span } from "@/components/Span";
import { Title } from "@/components/Title";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useModal } from "@/contexts/modal";
import { CirclePlus } from "lucide-react";
import { CreateTaskForm } from "./CreateTaskForm";
import { Button } from "@/components/ui/button";

export function CreateTaskDialog() {
    const { isOpen, setIsOpen } = useModal();
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>
                    <CirclePlus className="text-indigo-50" size={20} />
                    <Span className="text-indigo-50">Criar</Span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle asChild>
                        <Title>Criar tarefa</Title>
                    </DialogTitle>
                    <DialogDescription>
                        <Span className="text-gray-700 dark:text-gray-400">
                            Crie uma nova tarefa para não ter que ficar
                            lembrando
                        </Span>
                    </DialogDescription>
                </DialogHeader>
                <CreateTaskForm />
            </DialogContent>
        </Dialog>
    );
}
