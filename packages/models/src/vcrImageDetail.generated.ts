import { type VcrImageLayer, vcrImageLayer } from "packages/models/src/vcrImageLayer.generated.ts";
import { z } from "zod";

export type VcrImageDetail = {
  layers: Array<VcrImageLayer>;
  tags: Array<string>;
  id: string;
  repositoryId: string;
  manifestDigest: string;
  kind: "attestation" | "index" | "manifest";
  platform?: string | undefined;
  arch?: string | undefined;
  pushedBy?: string | undefined;
  sizeInBytes: number;
  status: "preparing" | "ready" | "unoptimized" | "null" | null;
  createdAt: string;
};

export const vcrImageDetail = z.object({
  layers: z.array(vcrImageLayer),
  tags: z.array(z.string()),
  id: z.string(),
  repositoryId: z.string(),
  manifestDigest: z.string(),
  kind: z.enum(["attestation", "index", "manifest"]),
  platform: z.string().optional(),
  arch: z.string().optional(),
  pushedBy: z.string().optional(),
  sizeInBytes: z.number(),
  status: z.enum(["preparing", "ready", "unoptimized", "null"]).nullable(),
  createdAt: z.string(),
});
