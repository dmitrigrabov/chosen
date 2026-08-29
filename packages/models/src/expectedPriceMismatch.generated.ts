import { z } from "zod";

export type ExpectedPriceMismatch = {
  status: number;
  code: "expected_price_mismatch";
  message: string;
};

export const expectedPriceMismatch = z.object({
  status: z.literal(400),
  code: z.literal("expected_price_mismatch"),
  message: z.string(),
});
