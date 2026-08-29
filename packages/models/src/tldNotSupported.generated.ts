import { z } from "zod";

export type TldNotSupported = { status: number; code: "tld_not_supported"; message: string };

export const tldNotSupported = z.object({
  status: z.literal(400),
  code: z.literal("tld_not_supported"),
  message: z.string(),
});
