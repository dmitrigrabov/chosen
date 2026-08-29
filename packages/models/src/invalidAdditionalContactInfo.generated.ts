import { z } from "zod";

export type InvalidAdditionalContactInfo = {
  status: number;
  code: "invalid_additional_contact_info";
  message: string;
};

export const invalidAdditionalContactInfo = z.object({
  status: z.literal(400),
  code: z.literal("invalid_additional_contact_info"),
  message: z.string(),
});
