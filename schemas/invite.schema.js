import z from "zod";

export const inviteSchema = z.object({
    groupId: z.string(),
    phone: z.string()
})