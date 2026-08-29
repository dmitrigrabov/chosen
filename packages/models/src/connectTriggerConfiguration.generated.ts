import { z } from "zod";

export type ConnectTriggerConfiguration = { enabled: boolean };

export const connectTriggerConfiguration = z.object({ enabled: z.boolean() });
