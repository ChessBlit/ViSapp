import mongoose from "mongoose";
import z from "zod";

export const messageSchema = z.object({
	content: z.string().min(1, {message: "Message must not be empty"}),
	group: z.string().refine(val => mongoose.Types.ObjectId.isValid(val), {
		message: "Invalid ObjectId",
	}).optional(),
    to: z.string().optional()
});
