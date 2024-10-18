"use client";

import { Children } from "@/interfaces/children";
import { Task } from "@/interfaces/task";
import utils from "@/utils";
import { useSearchParams } from "next/navigation";
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

interface TasksContext {
    tasks: Task[];
    totalPages: number;
    refetch: () => void;
}

const TasksContext = createContext<TasksContext>({} as TasksContext);

export function TasksProvider({ children }: Children) {
    const searchParams = useSearchParams();
    const [tasks, setTasks] = useState<Task[]>([] as Task[]);
    const [totalPages, setTotalPages] = useState(1);

    const fetchTasks = useCallback(() => {
        const textQuery = searchParams.get("nameOrDescription");
        const priorityQuery = searchParams.get("priority");
        const sort = searchParams.get("sort");
        const orderBy = searchParams.get("orderBy");
        const query = {
            nameOrDescription: textQuery,
            priority: priorityQuery,
            orderBy: orderBy,
            sort: sort,
        };
        const page = Number(searchParams.get("page") || 1);
        const response = utils.LS.getItem("tasks", query, page);

        if (response && response.total > 0) {
            return response;
        }

        return {
            data: [],
            total: 0,
        };
    }, [searchParams]);

    const refetch = useCallback(() => {
        const response = fetchTasks();

        setTasks(response.data);
        setTotalPages(Math.ceil(response.total / 10));
    }, []);

    useEffect(() => {
        const response = fetchTasks();
        setTasks(response.data);
        setTotalPages(Math.ceil(response.total / 10));
    }, [searchParams]);

    const value = useMemo(
        () => ({ tasks, totalPages, refetch }),
        [tasks, totalPages]
    );

    return (
        <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
    );
}

export const useTasks = (): TasksContext => {
    const context = useContext(TasksContext);

    if (!context) {
        throw new Error("useTasks must be used within an TasksProvider");
    }

    return context;
};
