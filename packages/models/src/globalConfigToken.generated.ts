import { z } from "zod";

export type GlobalConfigToken = {
  partialToken: string;
  label: string;
  id: string;
  edgeConfigId: string;
  createdAt: number;
  token?: string | undefined;
};

export const globalConfigToken = z.object({
  partialToken: z.string(),
  label: z.string(),
  id: z.string(),
  edgeConfigId: z.string(),
  createdAt: z.number(),
  token: z.string().optional(),
});
