import {
  type SandboxNetworkPolicy,
  sandboxNetworkPolicy,
} from "packages/models/src/sandboxNetworkPolicy.generated.ts";
import { z } from "zod";

export type Session = {
  sourceSandboxName: string;
  projectId: string;
  id: string;
  memory: number;
  vcpus: number;
  region: string;
  runtime: string;
  timeout: number;
  status: "aborted" | "failed" | "pending" | "running" | "snapshotting" | "stopped" | "stopping";
  requestedAt: number;
  startedAt?: number | undefined;
  cwd: string;
  requestedStopAt?: number | undefined;
  stoppedAt?: number | undefined;
  abortedAt?: number | undefined;
  duration?: number | undefined;
  sourceSnapshotId?: string | undefined;
  snapshottedAt?: number | undefined;
  createdAt: number;
  updatedAt: number;
  networkPolicy?: SandboxNetworkPolicy | undefined;
  activeCpuDurationMs?: number | undefined;
  networkTransfer?: { ingress: number; egress: number } | undefined;
};

export const session = z.object({
  sourceSandboxName: z.string(),
  projectId: z.string(),
  id: z.string(),
  memory: z.number(),
  vcpus: z.number(),
  region: z.string(),
  runtime: z.string(),
  timeout: z.number(),
  status: z.enum([
    "aborted",
    "failed",
    "pending",
    "running",
    "snapshotting",
    "stopped",
    "stopping",
  ]),
  requestedAt: z.number(),
  startedAt: z.number().optional(),
  cwd: z.string(),
  requestedStopAt: z.number().optional(),
  stoppedAt: z.number().optional(),
  abortedAt: z.number().optional(),
  duration: z.number().optional(),
  sourceSnapshotId: z.string().optional(),
  snapshottedAt: z.number().optional(),
  createdAt: z.number(),
  updatedAt: z.number(),
  networkPolicy: sandboxNetworkPolicy.optional(),
  activeCpuDurationMs: z.number().optional(),
  networkTransfer: z.object({ ingress: z.number(), egress: z.number() }).optional(),
});
