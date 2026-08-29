import { z } from "zod";

export type Unauthorized = {
  status: number;
  code: "unauthorized";
  message: string;
  reason?: string | undefined;
};

export const unauthorized = z.object({
  status: z.literal(401),
  code: z.literal("unauthorized"),
  message: z.string(),
  reason: z.string().optional(),
});
