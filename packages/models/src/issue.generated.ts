import { type PropertyKey, propertyKey } from "packages/models/src/propertyKey.generated.ts";
import { z } from "zod";

export type Issue = { path: Array<PropertyKey>; message: string };

export const issue = z.object({ path: z.array(propertyKey), message: z.string() });
