import { z } from "zod";

export type GlobalConfigItemValue =
  | string
  | number
  | Record<string, GlobalConfigItemValue>
  | Array<GlobalConfigItemValue>
  | boolean
  | null;

export const globalConfigItemValue: z.ZodType<GlobalConfigItemValue> = z
  .union([
    z.string(),
    z.number(),
    z.record(
      z.string(),
      z.lazy(() => globalConfigItemValue),
    ),
    z.array(z.lazy(() => globalConfigItemValue)),
    z.boolean(),
  ])
  .nullable();
