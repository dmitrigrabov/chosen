import { type ListEventType, listEventType } from "packages/models/src/listEventType.generated.ts";
import { z } from "zod";

export type ListEventTypesResponse = {
  types: Array<ListEventType>;
  categories: Array<{
    name:
      | "account"
      | "ai"
      | "ai-gateway"
      | "billing"
      | "connect"
      | "deployment"
      | "domain"
      | "edge"
      | "env-variable"
      | "feature-flags"
      | "firewall"
      | "integration"
      | "microfrontends"
      | "network"
      | "observability"
      | "other"
      | "project"
      | "security"
      | "storage"
      | "team"
      | "v0"
      | "vercel-app"
      | "workflow";
    label: string;
  }>;
};

export const listEventTypesResponse = z.object({
  types: z.array(listEventType),
  categories: z.array(
    z.object({
      name: z.enum([
        "account",
        "ai",
        "ai-gateway",
        "billing",
        "connect",
        "deployment",
        "domain",
        "edge",
        "env-variable",
        "feature-flags",
        "firewall",
        "integration",
        "microfrontends",
        "network",
        "observability",
        "other",
        "project",
        "security",
        "storage",
        "team",
        "v0",
        "vercel-app",
        "workflow",
      ]),
      label: z.string(),
    }),
  ),
});
