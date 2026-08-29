import { z } from "zod";

export type E164PhoneNumber = string;

export const e164PhoneNumber = z
  .string()
  .min(1)
  .regex(/^(?=(?:\D*\d){8,15}$)\+[1-9]\d{0,2}\.?\d+$/);
