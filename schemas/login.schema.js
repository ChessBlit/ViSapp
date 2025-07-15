import z from "zod";

export const loginSchema = z.object({
    usernameOrPhone: z.string().min(1, {message: "username Or Phone must not be empty"}),
    password: z.string().min(1, {message: "password must not be empty"})
})