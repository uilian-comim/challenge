import utils from "@/utils";
import { z } from "zod";

export interface Task {
    id: string;
    name: string;
    description: string;
    priority: "low" | "medium" | "high";
    created_at: Date;
}

export type CreateTask = z.infer<typeof utils.schemas.create>;
export type UpdateTask = z.infer<typeof utils.schemas.create>;
export type FilterTask = z.infer<typeof utils.schemas.filter>;
