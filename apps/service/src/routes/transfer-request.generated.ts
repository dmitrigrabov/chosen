import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import { putProjectsTransferRequestCode } from "./handlers/transfer-request";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.put(
  "/projects/transfer-request/:code",
  validate("param", z.object({ code: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", putProjectsTransferRequestCodeBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await putProjectsTransferRequestCode({
        db,
        env: c.env,
        user: c.var.user,
        params,
        query,
        body,
      }),
    );
  },
);

export const putProjectsTransferRequestCodeBody = z.object({
  newProjectName: z.string().max(100).optional(),
  paidFeatures: z
    .object({
      concurrentBuilds: z.number().int().nullable().optional(),
      passwordProtection: z.boolean().nullable().optional(),
      previewDeploymentSuffix: z.boolean().nullable().optional(),
    })
    .optional(),
  acceptedPolicies: z
    .record(
      z.string(),
      z.object({ eula: z.string(), privacy: z.string() }).and(z.record(z.string(), z.string())),
    )
    .optional(),
});

export type PutProjectsTransferRequestCodeBody = {
  newProjectName?: string | undefined;
  paidFeatures?:
    | {
        concurrentBuilds?: (number | null) | undefined;
        passwordProtection?: (boolean | null) | undefined;
        previewDeploymentSuffix?: (boolean | null) | undefined;
      }
    | undefined;
  acceptedPolicies?:
    | Record<string, { eula: string; privacy: string } | Record<string, string>>
    | undefined;
};

export type PutProjectsTransferRequestCodeResponse =
  | {
      partnerCalls: Array<{
        installationId: string;
        resourceIds: Array<string>;
        result: {
          status: "errored" | "fulfilled";
          error?: Record<string, never> | undefined;
          code?: string | undefined;
        };
      }>;
      resourceTransferErrors: Array<Record<string, never>>;
      transferredStoreIds: Array<string>;
    }
  | Record<string, never>;

export type PutProjectsTransferRequestCodeInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { code: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PutProjectsTransferRequestCodeBody;
};

export type PutProjectsTransferRequestCodeHandler = (
  input: PutProjectsTransferRequestCodeInput,
) => Promise<PutProjectsTransferRequestCodeResponse>;
