import { z } from "zod";

export type AdditionalContactInfoRequired = {
  status: number;
  code: "additional_contact_info_required";
  message: string;
};

export const additionalContactInfoRequired = z.object({
  status: z.literal(400),
  code: z.literal("additional_contact_info_required"),
  message: z.string(),
});
