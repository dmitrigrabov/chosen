import { z } from "zod";

export type TooManyRequests = {
  status: number;
  code: "too_many_requests";
  message: string;
  retryAfter: { value: number; str: string };
  limit: { total: number; remaining: number; reset: number };
};

export const tooManyRequests = z.object({
  status: z.literal(429),
  code: z.literal("too_many_requests"),
  message: z.string(),
  retryAfter: z.object({ value: z.number(), str: z.string() }),
  limit: z.object({ total: z.number(), remaining: z.number(), reset: z.number() }),
});
