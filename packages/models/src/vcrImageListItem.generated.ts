import { z } from "zod";

export type VcrImageListItem = {
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

export const vcrImageListItem = z.object({
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
