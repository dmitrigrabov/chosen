import { z } from "zod";

export type SessionCommand = {
  id: string;
  name: string;
  args: Array<string>;
  cwd: string;
  sessionId: string;
  exitCode: number | null;
  startedAt: number;
  durationMs?: number | undefined;
};

export const sessionCommand = z.object({
  id: z.string(),
  name: z.string(),
  args: z.array(z.string()),
  cwd: z.string(),
  sessionId: z.string(),
  exitCode: z.number().nullable(),
  startedAt: z.number(),
  durationMs: z.number().optional(),
});
