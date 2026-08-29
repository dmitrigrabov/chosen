import { z } from "zod";

export type APIKeyQuota = {
  quotaEntityId: string;
  limitAmount: number;
  currentSpend: number;
  currentByokSpend: number;
  includeByokInQuota: boolean;
  refreshPeriod: string | string | string | string;
  active: boolean;
  archived: boolean;
  alertThresholds?: Array<number> | undefined;
  createdAt: number;
  updatedAt: number;
};

export const aPIKeyQuota = z.object({
  quotaEntityId: z.string(),
  limitAmount: z.number(),
  currentSpend: z.number(),
  currentByokSpend: z.number(),
  includeByokInQuota: z.boolean(),
  refreshPeriod: z.union([z.string(), z.string(), z.string(), z.string()]),
  active: z.boolean(),
  archived: z.boolean(),
  alertThresholds: z.array(z.number()).optional(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
