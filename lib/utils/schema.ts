import z from "zod";

export const userSchema = z.object({
  email: z.string().min(1, "Email is required.").email(),
  password: z
    .string()
    .min(1, "Password is required.")
    .max(20, "Password must be lower than 20"),
});
