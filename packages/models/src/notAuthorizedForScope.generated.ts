import { z } from "zod";

export type NotAuthorizedForScope = {
  status: number;
  code: "not_authorized_for_scope";
  message: string;
};

export const notAuthorizedForScope = z.object({
  status: z.literal(403),
  code: z.literal("not_authorized_for_scope"),
  message: z.string(),
});
