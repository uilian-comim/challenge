"use client";

import { useTasks } from "@/contexts/tasks.context";
import { Task } from "@/components/Task";
import { Pagination } from "@/components/Pagination";

export function RenderTasks() {
    const { tasks } = useTasks();

    return (
        <div className="w-full flex flex-col items-start justify-center gap-4 overflow-hidden overflow-x-auto">
            {tasks.map((task) => (
                <Task key={task.id} task={task} />
            ))}

            {tasks.length > 0 && <Pagination />}
        </div>
    );
}
