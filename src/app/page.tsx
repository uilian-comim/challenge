import { Main } from "@/components/Main";
import { ToggleTheme } from "@/components/ToggleTheme";
import { CreateTaskDialog } from "./components/CreateTaskDialog";
import { RenderTasks } from "./components/RenderTask";
import { SearchTaskFilter } from "./components/SearchTaskFilter";
import { FilterTaskDialog } from "./components/FilterTaskDialog";

export default function Home() {
    return (
        <Main className="pt-20 gap-3">
            <ToggleTheme />
            <div className="w-full flex items-center justify-center gap-2">
                <SearchTaskFilter />
                <div className="flex items-center justify-center gap-2">
                    <FilterTaskDialog />
                    <CreateTaskDialog />
                </div>
            </div>
            <RenderTasks />
        </Main>
    );
}
