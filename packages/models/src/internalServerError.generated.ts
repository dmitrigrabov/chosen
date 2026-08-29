import { z } from "zod";

export type InternalServerError = {
  status: number;
  code: "internal_server_error";
  message: string;
};

export const internalServerError = z.object({
  status: z.literal(500),
  code: z.literal("internal_server_error"),
  message: z.string(),
});
