import { z } from "zod";

export type DomainNotRenewable = { status: number; code: "domain_not_renewable"; message: string };

export const domainNotRenewable = z.object({
  status: z.literal(400),
  code: z.literal("domain_not_renewable"),
  message: z.string(),
});
