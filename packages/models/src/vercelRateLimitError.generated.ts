import {
  type RateLimitNotice,
  rateLimitNotice,
} from "packages/models/src/rateLimitNotice.generated.ts";
import { z } from "zod";

export type VercelRateLimitError = {
  error: { code: string; message: string; limit?: RateLimitNotice | undefined };
};

export const vercelRateLimitError = z.object({
  error: z.object({ code: z.string(), message: z.string(), limit: rateLimitNotice.optional() }),
});
