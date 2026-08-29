import { z } from "zod";

export type DomainNotFound = { status: number; code: "domain_not_found"; message: string };

export const domainNotFound = z.object({
  status: z.literal(404),
  code: z.literal("domain_not_found"),
  message: z.string(),
});
