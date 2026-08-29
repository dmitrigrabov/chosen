import { z } from "zod";

export type DomainAlreadyOwned = { status: number; code: "domain_already_owned"; message: string };

export const domainAlreadyOwned = z.object({
  status: z.literal(400),
  code: z.literal("domain_already_owned"),
  message: z.string(),
});
