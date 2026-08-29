import { z } from "zod";

export type DuplicateDomains = { status: number; code: "duplicate_domains"; message: string };

export const duplicateDomains = z.object({
  status: z.literal(400),
  code: z.literal("duplicate_domains"),
  message: z.string(),
});
