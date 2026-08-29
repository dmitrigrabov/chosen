import { z } from "zod";

export type VercelForbiddenError = { error: { code: string; message: string } };

export const vercelForbiddenError = z.object({
  error: z.object({ code: z.string(), message: z.string() }),
});
