import { z } from "zod";

export type DNSSECEnabled = { status: number; code: "dnssec_enabled"; message: string };

export const dNSSECEnabled = z.object({
  status: z.literal(400),
  code: z.literal("dnssec_enabled"),
  message: z.string(),
});
