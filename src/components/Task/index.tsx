import type { Task } from "@/interfaces/task";
import { Span } from "../Span";
import utils from "@/utils";
import { Badge } from "../ui/badge";
import { useCallback } from "react";
import { Edit } from "./edit";
import { Delete } from "./delete";

interface TaskProps {
    task: Task;
}

export function Task({ task }: TaskProps) {
    const sliceString = useCallback((str: string) => {
        if (str.length > 10) {
            return str.slice(0, 10).concat("...");
        }
        return str;
    }, []);

    const translatePriority = useCallback((priority: string) => {
        if (priority === "low") {
            return "Baixa";
        }

        if (priority === "medium") {
            return "Média";
        }

        if (priority === "high") {
            return "Alta";
        }
    }, []);

    return (
        <div className="w-max md:w-full p-2 rounded-md grid grid-cols-6 justify-items-center place-items-center gap-2 bg-gray-50 border border-gray-300/50 shadow dark:bg-gray-800 dark:border-gray-600/20 overflow-hidden">
            <Edit task={task} />
            <Span>{sliceString(task.name)}</Span>
            <Span>{sliceString(task.description)}</Span>
            <Span>{utils.format.FromDatetoString(task.created_at)}</Span>
            <Badge variant={task.priority}>
                {translatePriority(task.priority)}
            </Badge>
            <Delete task={task} />
        </div>
    );
}
