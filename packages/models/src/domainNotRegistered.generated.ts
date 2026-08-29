import { z } from "zod";

export type DomainNotRegistered = {
  status: number;
  code: "domain_not_registered";
  message: string;
};

export const domainNotRegistered = z.object({
  status: z.literal(400),
  code: z.literal("domain_not_registered"),
  message: z.string(),
});
