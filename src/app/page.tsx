import { Main } from "@/components/Main";
import { ToggleTheme } from "@/components/ToggleTheme";
import { CreateTaskDialog } from "./CreateTaskDialog";
import { RenderTasks } from "./RenderTask";
import { SearchTaskFilter } from "./SearchTaskFilter";
import { FilterTaskDialog } from "./FilterTaskDialog";

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
