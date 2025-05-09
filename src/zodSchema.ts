import { z } from "zod";

const errorMessages = {
  email: "Please enter a valid email address",
  password: "Password must be between 4 and 8 characters",
};

export const emailSchema = z.string().email({ message: errorMessages.email });

export const passwordSchema = z
  .string()
  .min(4, { message: errorMessages.password })
  .max(8, { message: errorMessages.password });
