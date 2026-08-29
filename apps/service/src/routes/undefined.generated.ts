import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import { postApiKeys, getV2 } from "./handlers/undefined";
import type { APIKey } from "packages/models/src/aPIKey.generated.ts";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.post("/api-keys", validate("json", postApiKeysBody), async (c) => {
  const db = createDb(c.env.DB);
  const body = c.req.valid("json");
  return c.json(await postApiKeys({ db, env: c.env, user: c.var.user, body }));
});
app.get("/v2/", async (c) => {
  const db = createDb(c.env.DB);
  return c.json(await getV2({ db, env: c.env, user: c.var.user }));
});

export const postApiKeysBody = z.object({
  purpose: z.string(),
  projectId: z.string().optional(),
  name: z.string().optional(),
  expiresAt: z.number().optional(),
  aiGatewayQuota: z
    .object({
      limitAmount: z.number().gte(1),
      includeByokInQuota: z.boolean().optional(),
      refreshPeriod: z.enum(["daily", "weekly", "monthly", "none"]).optional(),
      alertThresholds: z.array(z.union([z.literal(50), z.literal(75), z.literal(100)])).optional(),
    })
    .optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export type PostApiKeysBody = {
  purpose: string;
  projectId?: string | undefined;
  name?: string | undefined;
  expiresAt?: number | undefined;
  aiGatewayQuota?:
    | {
        limitAmount: number;
        includeByokInQuota?: boolean | undefined;
        refreshPeriod?: ("daily" | "weekly" | "monthly" | "none") | undefined;
        alertThresholds?: Array<number> | undefined;
      }
    | undefined;
  metadata?: Record<string, unknown> | undefined;
};

export type PostApiKeysResponse = { apiKeyString: string; apiKey: APIKey };

export type PostApiKeysInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  body: PostApiKeysBody;
};

export type PostApiKeysHandler = (input: PostApiKeysInput) => Promise<PostApiKeysResponse>;

export type GetV2Response = Record<string, never>;

export type GetV2Input = {
  db: Db;
  env: Env;
  user: AuthUser | null;
};

export type GetV2Handler = (input: GetV2Input) => Promise<GetV2Response>;
