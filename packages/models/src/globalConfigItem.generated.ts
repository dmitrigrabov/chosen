import {
  type GlobalConfigItemValue,
  globalConfigItemValue,
} from "packages/models/src/globalConfigItemValue.generated.ts";
import { z } from "zod";

export type GlobalConfigItem = {
  key: string;
  value: GlobalConfigItemValue;
  description?: string | undefined;
  edgeConfigId: string;
  createdAt: number;
  updatedAt: number;
};

export const globalConfigItem = z.object({
  key: z.string(),
  value: globalConfigItemValue,
  description: z.string().optional(),
  edgeConfigId: z.string(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
