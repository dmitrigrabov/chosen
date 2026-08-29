import { z } from "zod";

export type VercelBadRequestError = { error: { code: string; message: string } };

export const vercelBadRequestError = z.object({
  error: z.object({ code: z.string(), message: z.string() }),
});
