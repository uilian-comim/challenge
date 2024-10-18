import { z } from "zod";

const schemas = {
    create: z.object({
        name: z.string({ message: "O campo nome é obrigatório" }).min(1, {
            message: "O campo nome é obrigatório",
        }),
        description: z
            .string({
                message: "O campo descrição é obrigatório",
            })
            .min(1, { message: "O campo descrição é obrigatório" }),
        priority: z.enum(["low", "medium", "high"], {
            message: "O campo prioridade é obrigatório",
        }),
    }),
};

export default schemas;
