import { z } from "zod";

export type ConnectError = { error: { code: string; message: string } | Record<string, unknown> };

export const connectError = z.object({
  error: z.object({ code: z.string(), message: z.string() }).and(z.record(z.string(), z.unknown())),
});
