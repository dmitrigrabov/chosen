import { type Issue, issue } from "packages/models/src/issue.generated.ts";
import { z } from "zod";

export type HttpApiDecodeError = { issues: Array<Issue>; message: string };

export const httpApiDecodeError = z.object({ issues: z.array(issue), message: z.string() });
