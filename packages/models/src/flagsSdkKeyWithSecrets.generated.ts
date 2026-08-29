import { z } from "zod";

export type FlagsSdkKeyWithSecrets = {
  hashKey: string;
  projectId: string;
  type: "client" | "mobile" | "server";
  environment: string;
  createdBy: string;
  createdAt: number;
  updatedAt: number;
  label?: string | undefined;
  deletedAt?: number | undefined;
  partialKeyValue: string;
  keyValue: string;
  tokenValue?: string | undefined;
};

export const flagsSdkKeyWithSecrets = z.object({
  hashKey: z.string(),
  projectId: z.string(),
  type: z.enum(["client", "mobile", "server"]),
  environment: z.string(),
  createdBy: z.string(),
  createdAt: z.number(),
  updatedAt: z.number(),
  label: z.string().optional(),
  deletedAt: z.number().optional(),
  partialKeyValue: z.string(),
  keyValue: z.string(),
  tokenValue: z.string().optional(),
});
