import { TasksProvider } from "@/contexts/tasks.context";
import { Children } from "@/interfaces/children";

export default function Providers({ children }: Children) {
    return <TasksProvider>{children}</TasksProvider>;
}
