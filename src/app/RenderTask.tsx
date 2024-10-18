"use client";

import { useTasks } from "@/contexts/tasks.context";
import { Task } from "@/components/Task";
import { Pagination } from "@/components/Pagination";
import { ClipboardList } from "lucide-react";
import { useCallback } from "react";
import { Span } from "@/components/Span";

export function RenderTasks() {
    const { tasks } = useTasks();

    const renderTasks = useCallback(() => {
        if (tasks.length === 0) {
            return (
                <div className="w-full flex flex-col items-center justify-center gap-2 pt-6">
                    <ClipboardList
                        size={36}
                        className="opacity-20 text-gray-800 dark:text-gray-300"
                    />
                    <div className="flex flex-col items-center justify-center gap-1">
                        <Span className="font-medium">
                            Você ainda não possui tarefas registradas
                        </Span>
                        <Span className="font-light text-sm">
                            Crie tarefas e organize seus itens a fazer
                        </Span>
                    </div>
                </div>
            );
        }

        return tasks.map((task) => <Task key={task.id} task={task} />);
    }, [tasks]);

    return (
        <div className="w-full flex flex-col items-start justify-center gap-4 overflow-hidden overflow-x-auto">
            {renderTasks()}

            {tasks.length > 0 && <Pagination />}
        </div>
    );
}
