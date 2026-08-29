import { z } from "zod";

export type DomainCannotBeTransferedOutUntil = {
  status: number;
  code: "domain_cannot_be_transfered_out_until";
  message: string;
};

export const domainCannotBeTransferedOutUntil = z.object({
  status: z.literal(409),
  code: z.literal("domain_cannot_be_transfered_out_until"),
  message: z.string(),
});
