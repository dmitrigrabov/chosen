import { z } from "zod";

export type MarketplaceFlag = {
  typeName: "marketplaceFlag";
  id: string;
  externalId: string;
  slug: string;
  origin: string;
  ownerId: string;
  projectId: string;
  resourceId: string;
  integrationConfigurationId: string;
  state: "active" | "archived";
  name?: string | undefined;
  description?: string | undefined;
  category?: ("experiment" | "flag") | undefined;
  createdAt?: number | undefined;
  updatedAt?: number | undefined;
};

export const marketplaceFlag = z.object({
  typeName: z.literal("marketplaceFlag"),
  id: z.string(),
  externalId: z.string(),
  slug: z.string(),
  origin: z.string(),
  ownerId: z.string(),
  projectId: z.string(),
  resourceId: z.string(),
  integrationConfigurationId: z.string(),
  state: z.enum(["active", "archived"]),
  name: z.string().optional(),
  description: z.string().optional(),
  category: z.enum(["experiment", "flag"]).optional(),
  createdAt: z.number().optional(),
  updatedAt: z.number().optional(),
});
