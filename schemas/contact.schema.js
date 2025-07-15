import z from "zod";

export const contactSchema = z.object({
    phone: z.string()
})