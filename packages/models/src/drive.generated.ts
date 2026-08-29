import { z } from "zod";

export type Drive = {
  name: string;
  projectId: string;
  maxSizeBytes: number;
  region: string;
  currentSessionId?: string | undefined;
  currentSandboxName?: string | undefined;
  createdAt: number;
  updatedAt: number;
};

export const drive = z.object({
  name: z.string(),
  projectId: z.string(),
  maxSizeBytes: z.number(),
  region: z.string(),
  currentSessionId: z.string().optional(),
  currentSandboxName: z.string().optional(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
