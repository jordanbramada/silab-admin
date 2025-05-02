import { z } from "zod";

export const loginSchema = z.object({
  nim: z.string().trim().min(1, "Email can’t be empty!"),
  password: z.string().min(1, "Password can’t be empty!"),
});
