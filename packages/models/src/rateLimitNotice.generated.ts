import { z } from "zod";

export type RateLimitNotice = { remaining: number; reset: number; resetMs: number; total: number };

export const rateLimitNotice = z.object({
  remaining: z.number().int().gte(0),
  reset: z.number().int().gte(0),
  resetMs: z.number().int().gte(0),
  total: z.number().int().gte(0),
});
