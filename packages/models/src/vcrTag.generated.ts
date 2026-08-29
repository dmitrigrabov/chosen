import { z } from "zod";

export type VcrTag = {
  tag: string;
  manifestDigest: string;
  imageId: string;
  kind: "attestation" | "index" | "manifest";
  platform?: string | undefined;
  arch?: string | undefined;
  pushedBy?: string | undefined;
  status: "preparing" | "ready" | "unoptimized" | "null" | null;
  sizeInBytes: number;
  createdAt: string;
  updatedAt: string;
};

export const vcrTag = z.object({
  tag: z.string(),
  manifestDigest: z.string(),
  imageId: z.string(),
  kind: z.enum(["attestation", "index", "manifest"]),
  platform: z.string().optional(),
  arch: z.string().optional(),
  pushedBy: z.string().optional(),
  status: z.enum(["preparing", "ready", "unoptimized", "null"]).nullable(),
  sizeInBytes: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
