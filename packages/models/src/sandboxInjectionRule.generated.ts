import { z } from "zod";

export type SandboxInjectionRule = { domain: string; headerNames?: Array<string> | undefined };

export const sandboxInjectionRule = z.object({
  domain: z.string(),
  headerNames: z.array(z.string()).optional(),
});
