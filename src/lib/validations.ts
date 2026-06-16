import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  email: z.string().trim().email("Enter a valid email").or(z.literal("")),
  phone: z.string().trim().min(7, "Please enter a valid phone number"),
  subject: z.string().optional(),
  message: z.string().trim().min(3, "Please enter your message"),
});

export type ContactInput = z.infer<typeof contactSchema>;
