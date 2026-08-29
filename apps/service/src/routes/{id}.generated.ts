import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import { patchAliasesIdProtectionBypass } from "./handlers/{id}";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.patch(
  "/aliases/:id/protection-bypass",
  validate("param", z.object({ id: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", patchAliasesIdProtectionBypassBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await patchAliasesIdProtectionBypass({
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

export const patchAliasesIdProtectionBypassBody = z.union([
  z.object({
    ttl: z.number().lte(63072000).optional(),
    revoke: z.object({ secret: z.string(), regenerate: z.boolean() }).optional(),
  }),
  z.object({
    scope: z.union([
      z.object({
        userId: z.string(),
        email: z.string().optional(),
        access: z.enum(["denied", "granted"]),
      }),
      z.object({
        userId: z.string().optional(),
        email: z.string(),
        access: z.enum(["denied", "granted"]),
      }),
    ]),
  }),
  z.object({
    override: z.object({
      scope: z.literal("alias-protection-override"),
      action: z.enum(["create", "revoke"]),
    }),
  }),
]);

export type PatchAliasesIdProtectionBypassBody =
  | { ttl?: number | undefined; revoke?: { secret: string; regenerate: boolean } | undefined }
  | {
      scope:
        | { userId: string; email?: string | undefined; access: "denied" | "granted" }
        | { userId?: string | undefined; email: string; access: "denied" | "granted" };
    }
  | { override: { scope: "alias-protection-override"; action: "create" | "revoke" } };

export type PatchAliasesIdProtectionBypassResponse = Record<string, unknown>;

export type PatchAliasesIdProtectionBypassInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { id: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PatchAliasesIdProtectionBypassBody;
};

export type PatchAliasesIdProtectionBypassHandler = (
  input: PatchAliasesIdProtectionBypassInput,
) => Promise<PatchAliasesIdProtectionBypassResponse>;
