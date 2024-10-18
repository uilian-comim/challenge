import utils from "@/utils";
import { z } from "zod";

export interface Task {
    id: string;
    name: string;
    description: string;
    priority: string;
    created_at: Date;
}

export type CreateTask = z.infer<typeof utils.schemas.create>;
