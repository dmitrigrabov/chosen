import { z } from "zod";

export type FlagJSONValue =
  | string
  | number
  | Array<FlagJSONValue>
  | Record<string, FlagJSONValue>
  | boolean
  | null;

export const flagJSONValue: z.ZodType<FlagJSONValue> = z
  .union([
    z.string(),
    z.number(),
    z.array(z.lazy(() => flagJSONValue)),
    z.record(
      z.string(),
      z.lazy(() => flagJSONValue),
    ),
    z.boolean(),
  ])
  .nullable();
