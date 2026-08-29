import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import {
  putV1BulkRedirects,
  getV1BulkRedirects,
  deleteV1BulkRedirects,
  patchV1BulkRedirects,
  postV1BulkRedirectsRestore,
  getV1BulkRedirectsVersions,
  postV1BulkRedirectsVersions,
} from "./handlers/bulk-redirects";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.put(
  "/v1/bulk-redirects",
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", putV1BulkRedirectsBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(await putV1BulkRedirects({ db, env: c.env, user: c.var.user, query, body }));
  },
);
app.get(
  "/v1/bulk-redirects",
  validate(
    "query",
    z.object({
      projectId: z.string(),
      versionId: z.string().optional(),
      q: z.string().optional(),
      diff: z
        .union([
          z.preprocess((v) => (v === "true" ? true : v === "false" ? false : v), z.boolean()),
          z.literal("only"),
        ])
        .optional(),
      page: z.coerce.number().int().gte(1).optional(),
      per_page: z.coerce.number().int().gte(10).lte(250).optional(),
      sort_by: z.enum(["source", "destination", "statusCode"]).optional(),
      sort_order: z.enum(["asc", "desc"]).optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(await getV1BulkRedirects({ db, env: c.env, user: c.var.user, query }));
  },
);
app.delete(
  "/v1/bulk-redirects",
  validate(
    "query",
    z.object({ projectId: z.string(), teamId: z.string().optional(), slug: z.string().optional() }),
  ),
  validate("json", deleteV1BulkRedirectsBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(await deleteV1BulkRedirects({ db, env: c.env, user: c.var.user, query, body }));
  },
);
app.patch(
  "/v1/bulk-redirects",
  validate(
    "query",
    z.object({ projectId: z.string(), teamId: z.string().optional(), slug: z.string().optional() }),
  ),
  validate("json", patchV1BulkRedirectsBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(await patchV1BulkRedirects({ db, env: c.env, user: c.var.user, query, body }));
  },
);
app.post(
  "/v1/bulk-redirects/restore",
  validate(
    "query",
    z.object({ projectId: z.string(), teamId: z.string().optional(), slug: z.string().optional() }),
  ),
  validate("json", postV1BulkRedirectsRestoreBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV1BulkRedirectsRestore({ db, env: c.env, user: c.var.user, query, body }),
    );
  },
);
app.get(
  "/v1/bulk-redirects/versions",
  validate(
    "query",
    z.object({ projectId: z.string(), teamId: z.string().optional(), slug: z.string().optional() }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(await getV1BulkRedirectsVersions({ db, env: c.env, user: c.var.user, query }));
  },
);
app.post(
  "/v1/bulk-redirects/versions",
  validate(
    "query",
    z.object({ projectId: z.string(), teamId: z.string().optional(), slug: z.string().optional() }),
  ),
  validate("json", postV1BulkRedirectsVersionsBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV1BulkRedirectsVersions({ db, env: c.env, user: c.var.user, query, body }),
    );
  },
);

export const putV1BulkRedirectsBody = z.object({
  projectId: z.string(),
  teamId: z.string(),
  overwrite: z.boolean().optional(),
  name: z.string().max(256).optional(),
  redirects: z
    .array(
      z.object({
        source: z.string().max(2048),
        destination: z.string().max(2048),
        statusCode: z.union([z.number(), z.string()]).optional(),
        permanent: z.boolean().optional(),
        caseSensitive: z.boolean().optional(),
        query: z.boolean().optional(),
        preserveQueryParams: z.boolean().optional(),
      }),
    )
    .optional(),
});

export type PutV1BulkRedirectsBody = {
  projectId: string;
  teamId: string;
  overwrite?: boolean | undefined;
  name?: string | undefined;
  redirects?:
    | Array<{
        source: string;
        destination: string;
        statusCode?: (number | string) | undefined;
        permanent?: boolean | undefined;
        caseSensitive?: boolean | undefined;
        query?: boolean | undefined;
        preserveQueryParams?: boolean | undefined;
      }>
    | undefined;
};

export type PutV1BulkRedirectsResponse = {
  alias: string | null;
  version: {
    id: string;
    key: string;
    lastModified: number;
    createdBy: string;
    name?: string | undefined;
    isStaging?: boolean | undefined;
    isLive?: boolean | undefined;
    redirectCount?: number | undefined;
    alias?: string | undefined;
  };
};

export type PutV1BulkRedirectsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PutV1BulkRedirectsBody;
};

export type PutV1BulkRedirectsHandler = (
  input: PutV1BulkRedirectsInput,
) => Promise<PutV1BulkRedirectsResponse>;

export type GetV1BulkRedirectsResponse =
  | Record<string, unknown>
  | {
      version?:
        | {
            id: string;
            key: string;
            lastModified: number;
            createdBy: string;
            name?: string | undefined;
            isStaging?: boolean | undefined;
            isLive?: boolean | undefined;
            redirectCount?: number | undefined;
            alias?: string | undefined;
          }
        | undefined;
      redirects: Array<{
        statusCode?: number | undefined;
        permanent?: boolean | undefined;
        sensitive?: boolean | undefined;
        caseSensitive?: boolean | undefined;
        query?: boolean | undefined;
        preserveQueryParams?: boolean | undefined;
        destination: string;
        source: string;
      }>;
      pagination: { page: number; per_page: number; numPages: number };
    }
  | {
      version: {
        id: string;
        key: string;
        lastModified: number;
        createdBy: string;
        name?: string | undefined;
        isStaging?: boolean | undefined;
        isLive?: boolean | undefined;
        redirectCount?: number | undefined;
        alias?: string | undefined;
      };
      redirects: Array<{
        statusCode?: number | undefined;
        permanent?: boolean | undefined;
        sensitive?: boolean | undefined;
        caseSensitive?: boolean | undefined;
        query?: boolean | undefined;
        preserveQueryParams?: boolean | undefined;
        destination: string;
        source: string;
      }>;
      pagination: { page: number; per_page: number; numPages: number };
    };

export type GetV1BulkRedirectsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: {
    projectId: string;
    versionId?: string | undefined;
    q?: string | undefined;
    diff?: (boolean | "only") | undefined;
    page?: number | undefined;
    per_page?: number | undefined;
    sort_by?: ("source" | "destination" | "statusCode") | undefined;
    sort_order?: ("asc" | "desc") | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV1BulkRedirectsHandler = (
  input: GetV1BulkRedirectsInput,
) => Promise<GetV1BulkRedirectsResponse>;

export const deleteV1BulkRedirectsBody = z.object({
  name: z.string().max(256).optional(),
  redirects: z.array(z.string()),
});

export type DeleteV1BulkRedirectsBody = { name?: string | undefined; redirects: Array<string> };

export type DeleteV1BulkRedirectsResponse =
  | {
      alias?: string | undefined;
      version: {
        id: string;
        key: string;
        lastModified: number;
        createdBy: string;
        name?: string | undefined;
        isStaging?: boolean | undefined;
        isLive?: boolean | undefined;
        redirectCount?: number | undefined;
        alias?: string | undefined;
      };
    }
  | {
      alias: unknown;
      version: {
        id: string;
        key: string;
        lastModified: number;
        createdBy: string;
        name?: string | undefined;
        isStaging?: boolean | undefined;
        isLive?: boolean | undefined;
        redirectCount?: number | undefined;
        alias?: string | undefined;
      };
    }
  | {
      alias: string | null;
      version: {
        id: string;
        key: string;
        lastModified: number;
        createdBy: string;
        name?: string | undefined;
        isStaging?: boolean | undefined;
        isLive?: boolean | undefined;
        redirectCount?: number | undefined;
        alias?: string | undefined;
      };
    };

export type DeleteV1BulkRedirectsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { projectId: string; teamId?: string | undefined; slug?: string | undefined };
  body: DeleteV1BulkRedirectsBody;
};

export type DeleteV1BulkRedirectsHandler = (
  input: DeleteV1BulkRedirectsInput,
) => Promise<DeleteV1BulkRedirectsResponse>;

export const patchV1BulkRedirectsBody = z.object({
  name: z.string().max(256).optional(),
  redirect: z.object({
    source: z.string(),
    destination: z.string().optional(),
    statusCode: z.number().optional(),
    permanent: z.boolean().optional(),
    caseSensitive: z.boolean().optional(),
    query: z.boolean().optional(),
    preserveQueryParams: z.boolean().optional(),
  }),
  restore: z.boolean().optional(),
});

export type PatchV1BulkRedirectsBody = {
  name?: string | undefined;
  redirect: {
    source: string;
    destination?: string | undefined;
    statusCode?: number | undefined;
    permanent?: boolean | undefined;
    caseSensitive?: boolean | undefined;
    query?: boolean | undefined;
    preserveQueryParams?: boolean | undefined;
  };
  restore?: boolean | undefined;
};

export type PatchV1BulkRedirectsResponse = {
  alias: string | null;
  version: {
    id: string;
    key: string;
    lastModified: number;
    createdBy: string;
    name?: string | undefined;
    isStaging?: boolean | undefined;
    isLive?: boolean | undefined;
    redirectCount?: number | undefined;
    alias?: string | undefined;
  };
};

export type PatchV1BulkRedirectsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { projectId: string; teamId?: string | undefined; slug?: string | undefined };
  body: PatchV1BulkRedirectsBody;
};

export type PatchV1BulkRedirectsHandler = (
  input: PatchV1BulkRedirectsInput,
) => Promise<PatchV1BulkRedirectsResponse>;

export const postV1BulkRedirectsRestoreBody = z.object({
  name: z.string().max(256).optional(),
  redirects: z.array(z.string()),
});

export type PostV1BulkRedirectsRestoreBody = {
  name?: string | undefined;
  redirects: Array<string>;
};

export type PostV1BulkRedirectsRestoreResponse = {
  version: {
    id: string;
    key: string;
    lastModified: number;
    createdBy: string;
    name?: string | undefined;
    isStaging?: boolean | undefined;
    isLive?: boolean | undefined;
    redirectCount?: number | undefined;
    alias?: string | undefined;
  };
  restored: Array<string>;
  failedToRestore: Array<string>;
};

export type PostV1BulkRedirectsRestoreInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { projectId: string; teamId?: string | undefined; slug?: string | undefined };
  body: PostV1BulkRedirectsRestoreBody;
};

export type PostV1BulkRedirectsRestoreHandler = (
  input: PostV1BulkRedirectsRestoreInput,
) => Promise<PostV1BulkRedirectsRestoreResponse>;

export type GetV1BulkRedirectsVersionsResponse = {
  versions: Array<{
    id: string;
    key: string;
    lastModified: number;
    createdBy: string;
    name?: string | undefined;
    isStaging?: boolean | undefined;
    isLive?: boolean | undefined;
    redirectCount?: number | undefined;
    alias?: string | undefined;
  }>;
};

export type GetV1BulkRedirectsVersionsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { projectId: string; teamId?: string | undefined; slug?: string | undefined };
};

export type GetV1BulkRedirectsVersionsHandler = (
  input: GetV1BulkRedirectsVersionsInput,
) => Promise<GetV1BulkRedirectsVersionsResponse>;

export const postV1BulkRedirectsVersionsBody = z.object({
  id: z.string(),
  action: z.enum(["promote", "restore", "discard"]),
  name: z.string().max(256).optional(),
});

export type PostV1BulkRedirectsVersionsBody = {
  id: string;
  action: "promote" | "restore" | "discard";
  name?: string | undefined;
};

export type PostV1BulkRedirectsVersionsResponse = {
  version: {
    id: string;
    key: string;
    lastModified: number;
    createdBy: string;
    name?: string | undefined;
    isStaging?: boolean | undefined;
    isLive?: boolean | undefined;
    redirectCount?: number | undefined;
    alias?: string | undefined;
  };
};

export type PostV1BulkRedirectsVersionsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { projectId: string; teamId?: string | undefined; slug?: string | undefined };
  body: PostV1BulkRedirectsVersionsBody;
};

export type PostV1BulkRedirectsVersionsHandler = (
  input: PostV1BulkRedirectsVersionsInput,
) => Promise<PostV1BulkRedirectsVersionsResponse>;
