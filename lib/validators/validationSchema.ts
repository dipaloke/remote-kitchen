import { z } from "zod";

export const foodItemSchema = z.object({
  name: z.string().min(5, { message: "Must be 5 or more characters long" }),
  description: z
    .string()
    .min(10, { message: "Must be 10 or more characters long" })
    .max(120, { message: "Must be 120 or less characters long" }),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
  src: z.string(),
});
