import { z } from "zod";

export type NotFound = { status: number; code: "not_found"; message: string };

export const notFound = z.object({
  status: z.literal(404),
  code: z.literal("not_found"),
  message: z.string(),
});
