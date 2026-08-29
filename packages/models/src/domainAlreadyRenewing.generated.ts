import { z } from "zod";

export type DomainAlreadyRenewing = {
  status: number;
  code: "domain_already_renewing";
  message: string;
};

export const domainAlreadyRenewing = z.object({
  status: z.literal(400),
  code: z.literal("domain_already_renewing"),
  message: z.string(),
});
