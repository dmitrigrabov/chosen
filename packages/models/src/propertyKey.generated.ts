import { z } from "zod";

export type PropertyKey = string | number | { _tag: "symbol"; key: string };

export const propertyKey = z.union([
  z.string(),
  z.number(),
  z.object({ _tag: z.literal("symbol"), key: z.string() }),
]);
