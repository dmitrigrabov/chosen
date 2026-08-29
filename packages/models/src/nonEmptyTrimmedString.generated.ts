import { z } from "zod";

export type NonEmptyTrimmedString = string;

export const nonEmptyTrimmedString = z
  .string()
  .min(1)
  .regex(/^\S[\s\S]*\S$|^\S$|^$/);
