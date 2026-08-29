import { z } from "zod";

export type ConnectTriggerDestination = {
  projectId: string;
  customEnvironmentId?: string | undefined;
  branch?: string | undefined;
  path?: string | undefined;
};

export const connectTriggerDestination = z.object({
  projectId: z.string(),
  customEnvironmentId: z.string().optional(),
  branch: z.string().optional(),
  path: z.string().optional(),
});
