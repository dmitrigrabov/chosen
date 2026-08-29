import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import {
  postV8ArtifactsEvents,
  getV8ArtifactsStatus,
  putV8ArtifactsHash,
  getV8ArtifactsHash,
  headV8ArtifactsHash,
  postV8Artifacts,
  deleteV8Artifacts,
} from "./handlers/artifacts";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.post(
  "/v8/artifacts/events",
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV8ArtifactsEventsBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(await postV8ArtifactsEvents({ db, env: c.env, user: c.var.user, query, body }));
  },
);
app.get(
  "/v8/artifacts/status",
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(await getV8ArtifactsStatus({ db, env: c.env, user: c.var.user, query }));
  },
);
app.put(
  "/v8/artifacts/:hash",
  validate("param", z.object({ hash: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const bytes = new Uint8Array(await c.req.arrayBuffer());
    return c.json(
      await putV8ArtifactsHash({ db, env: c.env, user: c.var.user, params, query, bytes }),
    );
  },
);
app.get(
  "/v8/artifacts/:hash",
  validate("param", z.object({ hash: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(await getV8ArtifactsHash({ db, env: c.env, user: c.var.user, params, query }));
  },
);
app.head(
  "/v8/artifacts/:hash",
  validate("param", z.object({ hash: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(await headV8ArtifactsHash({ db, env: c.env, user: c.var.user, params, query }));
  },
);
app.post(
  "/v8/artifacts",
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV8ArtifactsBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(await postV8Artifacts({ db, env: c.env, user: c.var.user, query, body }));
  },
);
app.delete(
  "/v8/artifacts",
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(await deleteV8Artifacts({ db, env: c.env, user: c.var.user, query }));
  },
);

export const postV8ArtifactsEventsBody = z.array(
  z.object({
    sessionId: z.string(),
    source: z.enum(["LOCAL", "REMOTE"]),
    event: z.enum(["HIT", "MISS"]),
    hash: z.string(),
    duration: z.number().optional(),
  }),
);

export type PostV8ArtifactsEventsBody = Array<{
  sessionId: string;
  source: "LOCAL" | "REMOTE";
  event: "HIT" | "MISS";
  hash: string;
  duration?: number | undefined;
}>;

export type PostV8ArtifactsEventsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV8ArtifactsEventsBody;
};

export type PostV8ArtifactsEventsHandler = (input: PostV8ArtifactsEventsInput) => Promise<void>;

export type GetV8ArtifactsStatusResponse =
  | { status: string }
  | { status: "disabled" | "enabled" | "over_limit" | "paused" };

export type GetV8ArtifactsStatusInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV8ArtifactsStatusHandler = (
  input: GetV8ArtifactsStatusInput,
) => Promise<GetV8ArtifactsStatusResponse>;

export type PutV8ArtifactsHashResponse = { urls: Array<string> };

export type PutV8ArtifactsHashInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { hash: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  bytes: Uint8Array;
};

export type PutV8ArtifactsHashHandler = (
  input: PutV8ArtifactsHashInput,
) => Promise<PutV8ArtifactsHashResponse>;

export type GetV8ArtifactsHashResponse = string;

export type GetV8ArtifactsHashInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { hash: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV8ArtifactsHashHandler = (
  input: GetV8ArtifactsHashInput,
) => Promise<GetV8ArtifactsHashResponse>;

export type HeadV8ArtifactsHashInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { hash: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type HeadV8ArtifactsHashHandler = (input: HeadV8ArtifactsHashInput) => Promise<void>;

export const postV8ArtifactsBody = z.object({ hashes: z.array(z.string()) });

export type PostV8ArtifactsBody = { hashes: Array<string> };

export type PostV8ArtifactsResponse = Record<
  string,
  | {
      size: number;
      taskDurationMs: number;
      tag?: string | undefined;
      sha?: string | undefined;
      dirtyHash?: string | undefined;
    }
  | { error: { message: string } }
  | null
>;

export type PostV8ArtifactsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV8ArtifactsBody;
};

export type PostV8ArtifactsHandler = (
  input: PostV8ArtifactsInput,
) => Promise<PostV8ArtifactsResponse>;

export type DeleteV8ArtifactsResponse = { deletedCount: number };

export type DeleteV8ArtifactsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type DeleteV8ArtifactsHandler = (
  input: DeleteV8ArtifactsInput,
) => Promise<DeleteV8ArtifactsResponse>;
