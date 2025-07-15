import z from "zod";

export const loginSchema = z.object({
    usernameOrPhone: z.string(),
    password: z.string()
})