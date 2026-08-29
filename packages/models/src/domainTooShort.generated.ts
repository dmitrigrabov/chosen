import { z } from "zod";

export type DomainTooShort = { status: number; code: "domain_too_short"; message: string };

export const domainTooShort = z.object({
  status: z.literal(400),
  code: z.literal("domain_too_short"),
  message: z.string(),
});
