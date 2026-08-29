import { z } from "zod";

export type BoughtTooRecently = { status: number; code: "bought_too_recently"; message: string };

export const boughtTooRecently = z.object({
  status: z.literal(400),
  code: z.literal("bought_too_recently"),
  message: z.string(),
});
