import { z } from "zod";

export type VercelNotFoundError = { error: { code: string; message: string } };

export const vercelNotFoundError = z.object({
  error: z.object({ code: z.string(), message: z.string() }),
});
