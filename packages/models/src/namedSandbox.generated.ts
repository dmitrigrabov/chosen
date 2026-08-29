import { z } from "zod";

export type NamedSandbox = {
  name: string;
  currentSnapshotId?: string | undefined;
  currentSessionId: string;
  status: "running" | "stopped" | "stopping";
  statusUpdatedAt: number;
  persistent: boolean;
  region?: string | undefined;
  failoverRegions?:
    | Array<
        | "arn1"
        | "bom1"
        | "cdg1"
        | "cle1"
        | "cpt1"
        | "dub1"
        | "fra1"
        | "gru1"
        | "hkg1"
        | "hnd1"
        | "iad1"
        | "icn1"
        | "kix1"
        | "lhr1"
        | "pdx1"
        | "sfo1"
        | "sin1"
        | "syd1"
        | "yul1"
      >
    | undefined;
  vcpus?: number | undefined;
  memory?: number | undefined;
  runtime?: string | undefined;
  image?: string | undefined;
  timeout?: number | undefined;
  snapshotExpiration?: number | undefined;
  keepLastSnapshots?:
    | { count: number; expiration?: number | undefined; deleteEvicted: boolean }
    | undefined;
  networkPolicy?:
    | {
        mode: "allow-all" | "custom" | "default-allow" | "default-deny" | "deny-all";
        allowedDomains?: Array<string> | undefined;
        allowedCIDRs?: Array<string> | undefined;
        deniedCIDRs?: Array<string> | undefined;
        s3Key?: string | undefined;
      }
    | undefined;
  totalEgressBytes?: number | undefined;
  totalIngressBytes?: number | undefined;
  totalActiveCpuDurationMs?: number | undefined;
  totalDurationMs?: number | undefined;
  cwd?: string | undefined;
  tags?: Record<string, string> | undefined;
  mounts?:
    | Record<string, { drive: string; mode?: ("read-only" | "read-write") | undefined }>
    | undefined;
  createdAt: number;
  updatedAt: number;
  expiresAt?: number | undefined;
};

export const namedSandbox = z.object({
  name: z.string(),
  currentSnapshotId: z.string().optional(),
  currentSessionId: z.string(),
  status: z.enum(["running", "stopped", "stopping"]),
  statusUpdatedAt: z.number(),
  persistent: z.boolean(),
  region: z.string().optional(),
  failoverRegions: z
    .array(
      z.enum([
        "arn1",
        "bom1",
        "cdg1",
        "cle1",
        "cpt1",
        "dub1",
        "fra1",
        "gru1",
        "hkg1",
        "hnd1",
        "iad1",
        "icn1",
        "kix1",
        "lhr1",
        "pdx1",
        "sfo1",
        "sin1",
        "syd1",
        "yul1",
      ]),
    )
    .optional(),
  vcpus: z.number().optional(),
  memory: z.number().optional(),
  runtime: z.string().optional(),
  image: z.string().optional(),
  timeout: z.number().optional(),
  snapshotExpiration: z.number().optional(),
  keepLastSnapshots: z
    .object({ count: z.number(), expiration: z.number().optional(), deleteEvicted: z.boolean() })
    .optional(),
  networkPolicy: z
    .object({
      mode: z.enum(["allow-all", "custom", "default-allow", "default-deny", "deny-all"]),
      allowedDomains: z.array(z.string()).optional(),
      allowedCIDRs: z.array(z.string()).optional(),
      deniedCIDRs: z.array(z.string()).optional(),
      s3Key: z.string().optional(),
    })
    .optional(),
  totalEgressBytes: z.number().optional(),
  totalIngressBytes: z.number().optional(),
  totalActiveCpuDurationMs: z.number().optional(),
  totalDurationMs: z.number().optional(),
  cwd: z.string().optional(),
  tags: z.record(z.string(), z.string()).optional(),
  mounts: z
    .record(
      z.string(),
      z.object({ drive: z.string(), mode: z.enum(["read-only", "read-write"]).optional() }),
    )
    .optional(),
  createdAt: z.number(),
  updatedAt: z.number(),
  expiresAt: z.number().optional(),
});
