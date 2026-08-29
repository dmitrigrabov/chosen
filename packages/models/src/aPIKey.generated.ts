import { type APIKeyQuota, aPIKeyQuota } from "packages/models/src/aPIKeyQuota.generated.ts";
import { z } from "zod";

export type APIKey = {
  id: string;
  name: string;
  partialKey: string;
  teamId: string;
  purpose: string;
  projectId: string | null;
  expiresAt: number | null;
  activeAt: number;
  createdAt: number;
  createdBy: string;
  leakedAt: number | null;
  leakedUrl: string | null;
  createdByAppId: string | null;
  quota?: APIKeyQuota | undefined;
  metadata?: Record<string, never> | undefined;
};

export const aPIKey = z.object({
  id: z.string(),
  name: z.string(),
  partialKey: z.string(),
  teamId: z.string(),
  purpose: z.string(),
  projectId: z.string().nullable(),
  expiresAt: z.number().nullable(),
  activeAt: z.number(),
  createdAt: z.number(),
  createdBy: z.string(),
  leakedAt: z.number().nullable(),
  leakedUrl: z.string().nullable(),
  createdByAppId: z.string().nullable(),
  quota: aPIKeyQuota.optional(),
  metadata: z.object({}).optional(),
});
