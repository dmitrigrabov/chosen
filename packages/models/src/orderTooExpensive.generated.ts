import { z } from "zod";

export type OrderTooExpensive = { status: number; code: "order_too_expensive"; message: string };

export const orderTooExpensive = z.object({
  status: z.literal(400),
  code: z.literal("order_too_expensive"),
  message: z.string(),
});
