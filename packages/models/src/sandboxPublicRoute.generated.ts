import { z } from "zod";

export type SandboxPublicRoute = {
  url: string;
  port: number;
  subdomain: string;
  system?: true | undefined;
};

export const sandboxPublicRoute = z.object({
  url: z.string(),
  port: z.number(),
  subdomain: z.string(),
  system: z.literal(true).optional(),
});
