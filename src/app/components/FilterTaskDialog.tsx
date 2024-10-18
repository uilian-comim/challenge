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
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FilterTaskForm } from "./FilterTaskForm";

export function FilterTaskDialog() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="secondary">
                    <SlidersHorizontal
                        className="text-gray-300 dark:text-gray-800"
                        size={20}
                    />
                    <Span className="text-gray-300 dark:text-gray-800 hidden md:inline">
                        Filtrar
                    </Span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle asChild>
                        <Title>Filtro</Title>
                    </DialogTitle>
                    <DialogDescription>
                        <Span className="text-gray-700 dark:text-gray-400">
                            Filtre por prioridade, resete o filtro e ordene a
                            pesquisa
                        </Span>
                    </DialogDescription>
                </DialogHeader>
                <FilterTaskForm setIsOpen={setIsOpen} />
            </DialogContent>
        </Dialog>
    );
}
