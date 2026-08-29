import { z } from "zod";

export type VercelBaseError = { code: string; message: string };

export const vercelBaseError = z.object({ code: z.string(), message: z.string() });
