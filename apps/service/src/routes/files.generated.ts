import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import { postV2Files } from "./handlers/files";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.post(
  "/v2/files",
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    const bytes = new Uint8Array(await c.req.arrayBuffer());
    return c.json(await postV2Files({ db, env: c.env, user: c.var.user, query, bytes }));
  },
);

export type PostV2FilesResponse = { urls: Array<string> } | Record<string, never>;

export type PostV2FilesInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { teamId?: string | undefined; slug?: string | undefined };
  bytes: Uint8Array;
};

export type PostV2FilesHandler = (input: PostV2FilesInput) => Promise<PostV2FilesResponse>;
