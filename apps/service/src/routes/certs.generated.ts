import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import {
  getV8CertsId,
  deleteV8CertsId,
  getV8Certs,
  postV8Certs,
  putV8Certs,
} from "./handlers/certs";
import type { Pagination } from "packages/models/src/pagination.generated.ts";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.get(
  "/v8/certs/:id",
  validate("param", z.object({ id: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(await getV8CertsId({ db, env: c.env, user: c.var.user, params, query }));
  },
);
app.delete(
  "/v8/certs/:id",
  validate("param", z.object({ id: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(await deleteV8CertsId({ db, env: c.env, user: c.var.user, params, query }));
  },
);
app.get(
  "/v8/certs",
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(await getV8Certs({ db, env: c.env, user: c.var.user, query }));
  },
);
app.post(
  "/v8/certs",
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV8CertsBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(await postV8Certs({ db, env: c.env, user: c.var.user, query, body }));
  },
);
app.put(
  "/v8/certs",
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", putV8CertsBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(await putV8Certs({ db, env: c.env, user: c.var.user, query, body }));
  },
);

export type GetV8CertsIdResponse = {
  id: string;
  createdAt: number;
  expiresAt: number;
  autoRenew: boolean;
  cns: Array<string>;
};

export type GetV8CertsIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { id: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV8CertsIdHandler = (input: GetV8CertsIdInput) => Promise<GetV8CertsIdResponse>;

export type DeleteV8CertsIdResponse = Record<string, never>;

export type DeleteV8CertsIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { id: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type DeleteV8CertsIdHandler = (
  input: DeleteV8CertsIdInput,
) => Promise<DeleteV8CertsIdResponse>;

export type GetV8CertsResponse = {
  certs: Array<{
    id: string;
    createdAt: number;
    expiresAt: number;
    autoRenew: boolean;
    cns: Array<string>;
  }>;
  pagination: Pagination;
};

export type GetV8CertsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV8CertsHandler = (input: GetV8CertsInput) => Promise<GetV8CertsResponse>;

export const postV8CertsBody = z.object({ cns: z.array(z.string()).optional() });

export type PostV8CertsBody = { cns?: Array<string> | undefined };

export type PostV8CertsResponse = {
  id: string;
  createdAt: number;
  expiresAt: number;
  autoRenew: boolean;
  cns: Array<string>;
};

export type PostV8CertsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV8CertsBody;
};

export type PostV8CertsHandler = (input: PostV8CertsInput) => Promise<PostV8CertsResponse>;

export const putV8CertsBody = z.object({
  ca: z.string(),
  key: z.string(),
  cert: z.string(),
  skipValidation: z.boolean().optional(),
});

export type PutV8CertsBody = {
  ca: string;
  key: string;
  cert: string;
  skipValidation?: boolean | undefined;
};

export type PutV8CertsResponse = {
  id: string;
  createdAt: number;
  expiresAt: number;
  autoRenew: boolean;
  cns: Array<string>;
};

export type PutV8CertsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PutV8CertsBody;
};

export type PutV8CertsHandler = (input: PutV8CertsInput) => Promise<PutV8CertsResponse>;
