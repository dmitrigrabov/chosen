import {
  type SandboxInjectionRule,
  sandboxInjectionRule,
} from "packages/models/src/sandboxInjectionRule.generated.ts";
import { z } from "zod";

export type SandboxNetworkPolicy = {
  mode: "allow-all" | "custom" | "deny-all";
  allowedDomains?: Array<string> | undefined;
  allowedCIDRs?: Array<string> | undefined;
  deniedCIDRs?: Array<string> | undefined;
  injectionRules?: Array<SandboxInjectionRule> | undefined;
};

export const sandboxNetworkPolicy = z.object({
  mode: z.enum(["allow-all", "custom", "deny-all"]),
  allowedDomains: z.array(z.string()).optional(),
  allowedCIDRs: z.array(z.string()).optional(),
  deniedCIDRs: z.array(z.string()).optional(),
  injectionRules: z.array(sandboxInjectionRule).optional(),
});
