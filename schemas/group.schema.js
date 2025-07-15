import z from "zod";

export const groupSchema = z.object({
    name: z.string()
})