import { z } from "zod";

export type Forbidden = { status: number; code: "forbidden"; message: string };

export const forbidden = z.object({
  status: z.literal(403),
  code: z.literal("forbidden"),
  message: z.string(),
});
