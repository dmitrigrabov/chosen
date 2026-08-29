import { z } from "zod";

export type DomainNotAvailable = { status: number; code: "domain_not_available"; message: string };

export const domainNotAvailable = z.object({
  status: z.literal(400),
  code: z.literal("domain_not_available"),
  message: z.string(),
});
