import { z } from "zod";

export type Snapshot = {
  id: string;
  sourceSessionId: string;
  region?: string | undefined;
  regions?: Array<string> | undefined;
  status: "created" | "deleted" | "failed";
  sizeBytes: number;
  expiresAt?: number | undefined;
  createdAt: number;
  updatedAt: number;
  lastUsedAt: number;
  creationMethod?: ("automatic" | "manual") | undefined;
  parentId?: string | undefined;
};

export const snapshot = z.object({
  id: z.string(),
  sourceSessionId: z.string(),
  region: z.string().optional(),
  regions: z.array(z.string()).optional(),
  status: z.enum(["created", "deleted", "failed"]),
  sizeBytes: z.number(),
  expiresAt: z.number().optional(),
  createdAt: z.number(),
  updatedAt: z.number(),
  lastUsedAt: z.number(),
  creationMethod: z.enum(["automatic", "manual"]).optional(),
  parentId: z.string().optional(),
});
