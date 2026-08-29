import { z } from "zod";

export type TooManyDomains = { status: number; code: "too_many_domains"; message: string };

export const tooManyDomains = z.object({
  status: z.literal(400),
  code: z.literal("too_many_domains"),
  message: z.string(),
});
