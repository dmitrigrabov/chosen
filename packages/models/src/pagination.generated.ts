import { z } from "zod";

export type Pagination = { count: number; next: number | null; prev: number | null };

export const pagination = z.object({
  count: z.number(),
  next: z.number().nullable(),
  prev: z.number().nullable(),
});
