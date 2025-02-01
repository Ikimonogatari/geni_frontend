import { z } from "zod";

export const LoginRequestSchema = z.object({
  UserType: z.enum(["Creator", "Brand", "Student"]),
  Email: z.string().email(),
  Password: z.string().min(8),
});
