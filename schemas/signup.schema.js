import z from "zod";

export const signUpSchema = z.object({
	username: z.string().min(3, {message: "username must be 3 charcters"}),
	phone: z.string().min(5, {message: "phone number must be 5 digits"}),
	fullname: z.string().min(3, {message: "full name must be must be 3 charcters"}),
	password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_\-+=\s]{8,}$/, "Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number"),
});
