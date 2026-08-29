import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import {
  getV1GlobalConfig,
  postV1GlobalConfig,
  getV1GlobalConfigEdgeConfigId,
  putV1GlobalConfigEdgeConfigId,
  deleteV1GlobalConfigEdgeConfigId,
  getV1GlobalConfigEdgeConfigIdItems,
  patchV1GlobalConfigEdgeConfigIdItems,
  getV1GlobalConfigEdgeConfigIdSchema,
  postV1GlobalConfigEdgeConfigIdSchema,
  deleteV1GlobalConfigEdgeConfigIdSchema,
  getV1GlobalConfigEdgeConfigIdItemEdgeConfigItemKey,
  getV1GlobalConfigEdgeConfigIdTokens,
  deleteV1GlobalConfigEdgeConfigIdTokens,
  getV1GlobalConfigEdgeConfigIdTokenToken,
  postV1GlobalConfigEdgeConfigIdToken,
  getV1GlobalConfigEdgeConfigIdBackupsEdgeConfigBackupVersionId,
  postV1GlobalConfigEdgeConfigIdBackupsEdgeConfigBackupVersionIdRestore,
  getV1GlobalConfigEdgeConfigIdBackups,
} from "./handlers/global-config";
import type { GlobalConfigItem } from "packages/models/src/globalConfigItem.generated.ts";
import type { GlobalConfigToken } from "packages/models/src/globalConfigToken.generated.ts";
import type { GlobalConfigItemValue } from "packages/models/src/globalConfigItemValue.generated.ts";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.get(
  "/v1/global-config",
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(await getV1GlobalConfig({ db, env: c.env, user: c.var.user, query }));
  },
);
app.post(
  "/v1/global-config",
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV1GlobalConfigBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(await postV1GlobalConfig({ db, env: c.env, user: c.var.user, query, body }), 201);
  },
);
app.get(
  "/v1/global-config/:edgeConfigId",
  validate("param", z.object({ edgeConfigId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV1GlobalConfigEdgeConfigId({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);
app.put(
  "/v1/global-config/:edgeConfigId",
  validate("param", z.object({ edgeConfigId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", putV1GlobalConfigEdgeConfigIdBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await putV1GlobalConfigEdgeConfigId({
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
app.delete(
  "/v1/global-config/:edgeConfigId",
  validate("param", z.object({ edgeConfigId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    await deleteV1GlobalConfigEdgeConfigId({ db, env: c.env, user: c.var.user, params, query });
    return c.body(null, 204);
  },
);
app.get(
  "/v1/global-config/:edgeConfigId/items",
  validate("param", z.object({ edgeConfigId: z.string().regex(/^ecfg_/) })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV1GlobalConfigEdgeConfigIdItems({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);
app.patch(
  "/v1/global-config/:edgeConfigId/items",
  validate("param", z.object({ edgeConfigId: z.string().regex(/^ecfg_/) })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", patchV1GlobalConfigEdgeConfigIdItemsBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await patchV1GlobalConfigEdgeConfigIdItems({
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
app.get(
  "/v1/global-config/:edgeConfigId/schema",
  validate("param", z.object({ edgeConfigId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV1GlobalConfigEdgeConfigIdSchema({
        db,
        env: c.env,
        user: c.var.user,
        params,
        query,
      }),
    );
  },
);
app.post(
  "/v1/global-config/:edgeConfigId/schema",
  validate("param", z.object({ edgeConfigId: z.string() })),
  validate(
    "query",
    z.object({
      dryRun: z.string().optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  validate("json", postV1GlobalConfigEdgeConfigIdSchemaBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV1GlobalConfigEdgeConfigIdSchema({
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
app.delete(
  "/v1/global-config/:edgeConfigId/schema",
  validate("param", z.object({ edgeConfigId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    await deleteV1GlobalConfigEdgeConfigIdSchema({
      db,
      env: c.env,
      user: c.var.user,
      params,
      query,
    });
    return c.body(null, 204);
  },
);
app.get(
  "/v1/global-config/:edgeConfigId/item/:edgeConfigItemKey",
  validate(
    "param",
    z.object({ edgeConfigId: z.string().regex(/^ecfg_/), edgeConfigItemKey: z.string() }),
  ),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV1GlobalConfigEdgeConfigIdItemEdgeConfigItemKey({
        db,
        env: c.env,
        user: c.var.user,
        params,
        query,
      }),
    );
  },
);
app.get(
  "/v1/global-config/:edgeConfigId/tokens",
  validate("param", z.object({ edgeConfigId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV1GlobalConfigEdgeConfigIdTokens({
        db,
        env: c.env,
        user: c.var.user,
        params,
        query,
      }),
    );
  },
);
app.delete(
  "/v1/global-config/:edgeConfigId/tokens",
  validate("param", z.object({ edgeConfigId: z.string().regex(/^ecfg_/) })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", deleteV1GlobalConfigEdgeConfigIdTokensBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    await deleteV1GlobalConfigEdgeConfigIdTokens({
      db,
      env: c.env,
      user: c.var.user,
      params,
      query,
      body,
    });
    return c.body(null, 204);
  },
);
app.get(
  "/v1/global-config/:edgeConfigId/token/:token",
  validate("param", z.object({ edgeConfigId: z.string(), token: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV1GlobalConfigEdgeConfigIdTokenToken({
        db,
        env: c.env,
        user: c.var.user,
        params,
        query,
      }),
    );
  },
);
app.post(
  "/v1/global-config/:edgeConfigId/token",
  validate("param", z.object({ edgeConfigId: z.string().regex(/^ecfg_/) })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV1GlobalConfigEdgeConfigIdTokenBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV1GlobalConfigEdgeConfigIdToken({
        db,
        env: c.env,
        user: c.var.user,
        params,
        query,
        body,
      }),
      201,
    );
  },
);
app.get(
  "/v1/global-config/:edgeConfigId/backups/:edgeConfigBackupVersionId",
  validate("param", z.object({ edgeConfigId: z.string(), edgeConfigBackupVersionId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV1GlobalConfigEdgeConfigIdBackupsEdgeConfigBackupVersionId({
        db,
        env: c.env,
        user: c.var.user,
        params,
        query,
      }),
    );
  },
);
app.post(
  "/v1/global-config/:edgeConfigId/backups/:edgeConfigBackupVersionId/restore",
  validate(
    "param",
    z.object({ edgeConfigId: z.string().regex(/^ecfg_/), edgeConfigBackupVersionId: z.string() }),
  ),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await postV1GlobalConfigEdgeConfigIdBackupsEdgeConfigBackupVersionIdRestore({
        db,
        env: c.env,
        user: c.var.user,
        params,
        query,
      }),
    );
  },
);
app.get(
  "/v1/global-config/:edgeConfigId/backups",
  validate("param", z.object({ edgeConfigId: z.string() })),
  validate(
    "query",
    z.object({
      next: z.string().optional(),
      limit: z.coerce.number().gte(0).lte(50).optional(),
      metadata: z.string().optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV1GlobalConfigEdgeConfigIdBackups({
        db,
        env: c.env,
        user: c.var.user,
        params,
        query,
      }),
    );
  },
);

export type GetV1GlobalConfigResponse = {
  id: string;
  createdAt: number;
  createdBy?: string | undefined;
  ownerId: string;
  slug: string;
  updatedAt: number;
  digest: string;
  purpose?:
    | ({ type: "flags"; projectId: string } | { type: "experimentation"; resourceId: string })
    | undefined;
  deletedAt?: (number | null) | undefined;
  transfer?: { fromAccountId: string; startedAt: number; doneAt: number | null } | undefined;
  schema?: Record<string, never> | undefined;
  syncedToDynamoAt?: number | undefined;
  sizeInBytes: number;
  itemCount: number;
};

export type GetV1GlobalConfigInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV1GlobalConfigHandler = (
  input: GetV1GlobalConfigInput,
) => Promise<GetV1GlobalConfigResponse>;

export const postV1GlobalConfigBody = z.object({
  slug: z
    .string()
    .max(64)
    .regex(/^[\w-]+$/),
  items: z.record(z.string(), z.unknown()).optional(),
});

export type PostV1GlobalConfigBody = { slug: string; items?: Record<string, unknown> | undefined };

export type PostV1GlobalConfigResponse = {
  id: string;
  createdAt: number;
  createdBy?: string | undefined;
  ownerId: string;
  slug: string;
  updatedAt: number;
  digest: string;
  purpose?:
    | ({ type: "flags"; projectId: string } | { type: "experimentation"; resourceId: string })
    | undefined;
  deletedAt?: (number | null) | undefined;
  transfer?: { fromAccountId: string; startedAt: number; doneAt: number | null } | undefined;
  schema?: Record<string, never> | undefined;
  syncedToDynamoAt?: number | undefined;
  sizeInBytes: number;
  itemCount: number;
};

export type PostV1GlobalConfigInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV1GlobalConfigBody;
};

export type PostV1GlobalConfigHandler = (
  input: PostV1GlobalConfigInput,
) => Promise<PostV1GlobalConfigResponse>;

export type GetV1GlobalConfigEdgeConfigIdResponse = {
  id: string;
  createdAt: number;
  createdBy?: string | undefined;
  ownerId: string;
  slug: string;
  updatedAt: number;
  digest: string;
  purpose?:
    | ({ type: "flags"; projectId: string } | { type: "experimentation"; resourceId: string })
    | undefined;
  deletedAt?: (number | null) | undefined;
  transfer?: { fromAccountId: string; startedAt: number; doneAt: number | null } | undefined;
  schema?: Record<string, never> | undefined;
  syncedToDynamoAt?: number | undefined;
  sizeInBytes: number;
  itemCount: number;
};

export type GetV1GlobalConfigEdgeConfigIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { edgeConfigId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV1GlobalConfigEdgeConfigIdHandler = (
  input: GetV1GlobalConfigEdgeConfigIdInput,
) => Promise<GetV1GlobalConfigEdgeConfigIdResponse>;

export const putV1GlobalConfigEdgeConfigIdBody = z.object({
  slug: z
    .string()
    .max(64)
    .regex(/^[\w-]+$/),
});

export type PutV1GlobalConfigEdgeConfigIdBody = { slug: string };

export type PutV1GlobalConfigEdgeConfigIdResponse = {
  id: string;
  createdAt: number;
  createdBy?: string | undefined;
  ownerId: string;
  slug: string;
  updatedAt: number;
  digest: string;
  purpose?:
    | ({ type: "flags"; projectId: string } | { type: "experimentation"; resourceId: string })
    | undefined;
  deletedAt?: (number | null) | undefined;
  transfer?: { fromAccountId: string; startedAt: number; doneAt: number | null } | undefined;
  schema?: Record<string, never> | undefined;
  syncedToDynamoAt?: number | undefined;
  sizeInBytes: number;
  itemCount: number;
};

export type PutV1GlobalConfigEdgeConfigIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { edgeConfigId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PutV1GlobalConfigEdgeConfigIdBody;
};

export type PutV1GlobalConfigEdgeConfigIdHandler = (
  input: PutV1GlobalConfigEdgeConfigIdInput,
) => Promise<PutV1GlobalConfigEdgeConfigIdResponse>;

export type DeleteV1GlobalConfigEdgeConfigIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { edgeConfigId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type DeleteV1GlobalConfigEdgeConfigIdHandler = (
  input: DeleteV1GlobalConfigEdgeConfigIdInput,
) => Promise<void>;

export type GetV1GlobalConfigEdgeConfigIdItemsResponse = Array<GlobalConfigItem>;

export type GetV1GlobalConfigEdgeConfigIdItemsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { edgeConfigId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV1GlobalConfigEdgeConfigIdItemsHandler = (
  input: GetV1GlobalConfigEdgeConfigIdItemsInput,
) => Promise<GetV1GlobalConfigEdgeConfigIdItemsResponse>;

export const patchV1GlobalConfigEdgeConfigIdItemsBody = z.object({
  items: z.array(
    z.union([
      z.object({ operation: z.unknown() }),
      z.object({ operation: z.enum(["update", "upsert"]) }),
      z.object({ operation: z.enum(["update", "upsert"]) }),
    ]),
  ),
});

export type PatchV1GlobalConfigEdgeConfigIdItemsBody = {
  items: Array<
    { operation: unknown } | { operation: "update" | "upsert" } | { operation: "update" | "upsert" }
  >;
};

export type PatchV1GlobalConfigEdgeConfigIdItemsResponse = { status: string };

export type PatchV1GlobalConfigEdgeConfigIdItemsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { edgeConfigId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PatchV1GlobalConfigEdgeConfigIdItemsBody;
};

export type PatchV1GlobalConfigEdgeConfigIdItemsHandler = (
  input: PatchV1GlobalConfigEdgeConfigIdItemsInput,
) => Promise<PatchV1GlobalConfigEdgeConfigIdItemsResponse>;

export type GetV1GlobalConfigEdgeConfigIdSchemaResponse = Record<string, never> | null;

export type GetV1GlobalConfigEdgeConfigIdSchemaInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { edgeConfigId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV1GlobalConfigEdgeConfigIdSchemaHandler = (
  input: GetV1GlobalConfigEdgeConfigIdSchemaInput,
) => Promise<GetV1GlobalConfigEdgeConfigIdSchemaResponse>;

export const postV1GlobalConfigEdgeConfigIdSchemaBody = z.object({ definition: z.unknown() });

export type PostV1GlobalConfigEdgeConfigIdSchemaBody = { definition: unknown };

export type PostV1GlobalConfigEdgeConfigIdSchemaResponse = Record<string, never> | null;

export type PostV1GlobalConfigEdgeConfigIdSchemaInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { edgeConfigId: string };
  query: { dryRun?: string | undefined; teamId?: string | undefined; slug?: string | undefined };
  body: PostV1GlobalConfigEdgeConfigIdSchemaBody;
};

export type PostV1GlobalConfigEdgeConfigIdSchemaHandler = (
  input: PostV1GlobalConfigEdgeConfigIdSchemaInput,
) => Promise<PostV1GlobalConfigEdgeConfigIdSchemaResponse>;

export type DeleteV1GlobalConfigEdgeConfigIdSchemaInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { edgeConfigId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type DeleteV1GlobalConfigEdgeConfigIdSchemaHandler = (
  input: DeleteV1GlobalConfigEdgeConfigIdSchemaInput,
) => Promise<void>;

export type GetV1GlobalConfigEdgeConfigIdItemEdgeConfigItemKeyInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { edgeConfigId: string; edgeConfigItemKey: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV1GlobalConfigEdgeConfigIdItemEdgeConfigItemKeyHandler = (
  input: GetV1GlobalConfigEdgeConfigIdItemEdgeConfigItemKeyInput,
) => Promise<GlobalConfigItem>;

export type GetV1GlobalConfigEdgeConfigIdTokensInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { edgeConfigId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV1GlobalConfigEdgeConfigIdTokensHandler = (
  input: GetV1GlobalConfigEdgeConfigIdTokensInput,
) => Promise<GlobalConfigToken>;

export const deleteV1GlobalConfigEdgeConfigIdTokensBody = z.union([
  z.object({ tokens: z.array(z.string()), ids: z.array(z.string()).optional() }),
  z.object({ tokens: z.array(z.string()).optional(), ids: z.array(z.string()) }),
]);

export type DeleteV1GlobalConfigEdgeConfigIdTokensBody =
  | { tokens: Array<string>; ids?: Array<string> | undefined }
  | { tokens?: Array<string> | undefined; ids: Array<string> };

export type DeleteV1GlobalConfigEdgeConfigIdTokensInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { edgeConfigId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: DeleteV1GlobalConfigEdgeConfigIdTokensBody;
};

export type DeleteV1GlobalConfigEdgeConfigIdTokensHandler = (
  input: DeleteV1GlobalConfigEdgeConfigIdTokensInput,
) => Promise<void>;

export type GetV1GlobalConfigEdgeConfigIdTokenTokenInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { edgeConfigId: string; token: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV1GlobalConfigEdgeConfigIdTokenTokenHandler = (
  input: GetV1GlobalConfigEdgeConfigIdTokenTokenInput,
) => Promise<GlobalConfigToken>;

export const postV1GlobalConfigEdgeConfigIdTokenBody = z.object({ label: z.string().max(52) });

export type PostV1GlobalConfigEdgeConfigIdTokenBody = { label: string };

export type PostV1GlobalConfigEdgeConfigIdTokenResponse = { token: string; id: string };

export type PostV1GlobalConfigEdgeConfigIdTokenInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { edgeConfigId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV1GlobalConfigEdgeConfigIdTokenBody;
};

export type PostV1GlobalConfigEdgeConfigIdTokenHandler = (
  input: PostV1GlobalConfigEdgeConfigIdTokenInput,
) => Promise<PostV1GlobalConfigEdgeConfigIdTokenResponse>;

export type GetV1GlobalConfigEdgeConfigIdBackupsEdgeConfigBackupVersionIdResponse =
  | {
      id: string;
      lastModified: number;
      backup: {
        slug: string;
        updatedAt: number;
        items: Record<
          string,
          {
            createdAt: number;
            updatedAt: number;
            value: GlobalConfigItemValue;
            description?: string | undefined;
          }
        >;
        digest: string;
      };
      metadata: {
        updatedAt?: string | undefined;
        updatedBy?: string | undefined;
        itemsCount?: number | undefined;
        itemsBytes?: number | undefined;
      };
      user?:
        | {
            id: string;
            username: string;
            email: string;
            name?: string | undefined;
            avatar?: string | undefined;
          }
        | undefined;
    }
  | {
      user: {
        id: string;
        username: string;
        email: string;
        name?: string | undefined;
        avatar?: string | undefined;
      };
      id: string;
      lastModified: number;
      backup: {
        slug: string;
        updatedAt: number;
        items: Record<
          string,
          {
            createdAt: number;
            updatedAt: number;
            value: GlobalConfigItemValue;
            description?: string | undefined;
          }
        >;
        digest: string;
      };
      metadata: {
        updatedAt?: string | undefined;
        updatedBy?: string | undefined;
        itemsCount?: number | undefined;
        itemsBytes?: number | undefined;
      };
    };

export type GetV1GlobalConfigEdgeConfigIdBackupsEdgeConfigBackupVersionIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { edgeConfigId: string; edgeConfigBackupVersionId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV1GlobalConfigEdgeConfigIdBackupsEdgeConfigBackupVersionIdHandler = (
  input: GetV1GlobalConfigEdgeConfigIdBackupsEdgeConfigBackupVersionIdInput,
) => Promise<GetV1GlobalConfigEdgeConfigIdBackupsEdgeConfigBackupVersionIdResponse>;

export type PostV1GlobalConfigEdgeConfigIdBackupsEdgeConfigBackupVersionIdRestoreResponse = {
  status: "ok";
  restoredFrom: string;
  previousDigest: string;
  digest: string;
};

export type PostV1GlobalConfigEdgeConfigIdBackupsEdgeConfigBackupVersionIdRestoreInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { edgeConfigId: string; edgeConfigBackupVersionId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type PostV1GlobalConfigEdgeConfigIdBackupsEdgeConfigBackupVersionIdRestoreHandler = (
  input: PostV1GlobalConfigEdgeConfigIdBackupsEdgeConfigBackupVersionIdRestoreInput,
) => Promise<PostV1GlobalConfigEdgeConfigIdBackupsEdgeConfigBackupVersionIdRestoreResponse>;

export type GetV1GlobalConfigEdgeConfigIdBackupsResponse = {
  backups: Array<{
    metadata?:
      | {
          updatedAt?: string | undefined;
          updatedBy?: string | undefined;
          itemsCount?: number | undefined;
          itemsBytes?: number | undefined;
        }
      | undefined;
    id: string;
    lastModified: number;
  }>;
  pagination: { hasNext: boolean; next?: string | undefined };
};

export type GetV1GlobalConfigEdgeConfigIdBackupsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { edgeConfigId: string };
  query: {
    next?: string | undefined;
    limit?: number | undefined;
    metadata?: string | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV1GlobalConfigEdgeConfigIdBackupsHandler = (
  input: GetV1GlobalConfigEdgeConfigIdBackupsInput,
) => Promise<GetV1GlobalConfigEdgeConfigIdBackupsResponse>;
