import z from "zod";

export const signUpSchema = z.object({
	username: z.string(),
	phone: z.string(),
	fullname: z.string(),
	password: z.string(),
});
