import { z } from "zod";

export type BadRequest = { status: number; code: "bad_request"; message: string };

export const badRequest = z.object({
  status: z.literal(400),
  code: z.literal("bad_request"),
  message: z.string(),
});
