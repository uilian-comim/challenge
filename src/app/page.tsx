import { Main } from "@/components/Main";
import { ToggleTheme } from "@/components/ToggleTheme";
import { CreateTaskDialog } from "./CreateTaskDialog";
import { Input } from "@/components/ui/input";

export default function Home() {
    return (
        <Main>
            <ToggleTheme />
            <div className="flex items-center justify-center gap-2">
                <Input name="teste" />
                <div>
                    <CreateTaskDialog />
                </div>
            </div>
        </Main>
    );
}
