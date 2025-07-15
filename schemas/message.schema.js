import mongoose from "mongoose";
import z from "zod";

export const messageSchema = z.object({
	content: z.string(),
	group: z.string().refine(val => mongoose.Types.ObjectId.isValid(val), {
		message: "Invalid ObjectId",
	}).optional(),
    to: z.string().refine(val => mongoose.Types.ObjectId.isValid(val), {
		message: "Invalid ObjectId",
	}).optional(),
});
