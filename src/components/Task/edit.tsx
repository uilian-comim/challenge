import { Pencil } from "lucide-react";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Span } from "../Span";
import { Task } from "@/interfaces/task";
import { Title } from "../Title";
import utils from "@/utils";
import { useState } from "react";
import { EditTaskForm } from "./editForm";

interface EditProps {
    task: Task;
}

export function Edit({ task }: EditProps) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="secondary">
                    <Pencil
                        className="text-gray-100 dark:text-gray-800"
                        size={16}
                    />
                    <Span className="text-gray-100 dark:text-gray-800">
                        Editar
                    </Span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle asChild>
                        <Title>Editar tarefa</Title>
                    </DialogTitle>
                    <DialogDescription asChild>
                        <Span className="text-gray-700 dark:text-gray-400 uppercase">
                            Data de criação:{" "}
                            {utils.format.FromDatetoString(task.created_at)}
                        </Span>
                    </DialogDescription>
                </DialogHeader>
                <EditTaskForm task={task} setIsOpen={setIsOpen} />
            </DialogContent>
        </Dialog>
    );
}
