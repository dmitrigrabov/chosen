import { z } from "zod";

export type LanguageCodeRequired = {
  status: number;
  code: "language_code_required";
  message: string;
};

export const languageCodeRequired = z.object({
  status: z.literal(400),
  code: z.literal("language_code_required"),
  message: z.string(),
});
