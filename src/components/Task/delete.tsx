import { Trash2 } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Span } from "../Span";
import { Title } from "../Title";
import { Task } from "@/interfaces/task";
import utils from "@/utils";
import { useTasks } from "@/contexts/tasks.context";

interface DeleteProps {
    task: Task;
}

export function Delete({ task }: DeleteProps) {
    const { refetch } = useTasks();
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive">
                    <Trash2 className="text-red-50" size={20} />
                    <Span className="text-red-50">Excluir</Span>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle asChild>
                        <Title>
                            Tem certeza que deseja excluir a tarefa {task.name}?
                        </Title>
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        <Span>
                            Essa ação será permanente e não pode ser desfeita
                        </Span>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        <Span className="text-gray-50 dark:text-gray-900">
                            Cancelar
                        </Span>
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => {
                            utils.LS.removeItem("tasks", task.id);
                            refetch();
                        }}
                    >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
