import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import {
  postV1VcrRepository,
  getV1VcrRepository,
  getV1VcrRepositoryIdOrName,
  deleteV1VcrRepositoryIdOrName,
  getV1VcrRepositoryIdOrNameImages,
  postV1VcrRepositoryIdOrNamePermissions,
  deleteV1VcrRepositoryIdOrNamePermissions,
  getV1VcrRepositoryIdOrNamePermissions,
  deleteV1VcrRepositoryIdOrNamePermissionsAll,
  getV1VcrRepositoryIdOrNameTags,
  getV1VcrRepositoryIdOrNameTagsTag,
  getV1VcrRepositoryIdOrNameImagesImageIdOrDigest,
  deleteV1VcrRepositoryIdOrNameImagesImageId,
} from "./handlers/vcr";
import type { VcrRepository } from "packages/models/src/vcrRepository.generated.ts";
import type { VcrRepositoryList } from "packages/models/src/vcrRepositoryList.generated.ts";
import type { VcrImageList } from "packages/models/src/vcrImageList.generated.ts";
import type { VcrRepositoryPermission } from "packages/models/src/vcrRepositoryPermission.generated.ts";
import type { VcrRepositoryPermissionList } from "packages/models/src/vcrRepositoryPermissionList.generated.ts";
import type { VcrTag } from "packages/models/src/vcrTag.generated.ts";
import type { VcrImageDetail } from "packages/models/src/vcrImageDetail.generated.ts";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.post(
  "/v1/vcr/repository",
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV1VcrRepositoryBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(await postV1VcrRepository({ db, env: c.env, user: c.var.user, query, body }));
  },
);
app.get(
  "/v1/vcr/repository",
  validate(
    "query",
    z.object({
      projectId: z.string(),
      limit: z.coerce.number().int().gte(1).lte(1000).optional(),
      cursor: z.string().max(1024).optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(await getV1VcrRepository({ db, env: c.env, user: c.var.user, query }));
  },
);
app.get(
  "/v1/vcr/repository/:idOrName",
  validate("param", z.object({ idOrName: z.string().max(255) })),
  validate(
    "query",
    z.object({ projectId: z.string(), teamId: z.string().optional(), slug: z.string().optional() }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV1VcrRepositoryIdOrName({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);
app.delete(
  "/v1/vcr/repository/:idOrName",
  validate("param", z.object({ idOrName: z.string().max(255) })),
  validate(
    "query",
    z.object({ projectId: z.string(), teamId: z.string().optional(), slug: z.string().optional() }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await deleteV1VcrRepositoryIdOrName({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);
app.get(
  "/v1/vcr/repository/:idOrName/images",
  validate("param", z.object({ idOrName: z.string().max(255) })),
  validate(
    "query",
    z.object({
      projectId: z.string(),
      limit: z.coerce.number().int().gte(1).lte(100).optional(),
      cursor: z.string().max(1024).optional(),
      untagged: z
        .preprocess((v) => (v === "true" ? true : v === "false" ? false : v), z.boolean())
        .optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV1VcrRepositoryIdOrNameImages({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);
app.post(
  "/v1/vcr/repository/:idOrName/permissions",
  validate("param", z.object({ idOrName: z.string().max(255) })),
  validate(
    "query",
    z.object({ projectId: z.string(), teamId: z.string().optional(), slug: z.string().optional() }),
  ),
  validate("json", postV1VcrRepositoryIdOrNamePermissionsBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV1VcrRepositoryIdOrNamePermissions({
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
  "/v1/vcr/repository/:idOrName/permissions",
  validate("param", z.object({ idOrName: z.string().max(255) })),
  validate(
    "query",
    z.object({ projectId: z.string(), teamId: z.string().optional(), slug: z.string().optional() }),
  ),
  validate("json", deleteV1VcrRepositoryIdOrNamePermissionsBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    await deleteV1VcrRepositoryIdOrNamePermissions({
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
  "/v1/vcr/repository/:idOrName/permissions",
  validate("param", z.object({ idOrName: z.string().max(255) })),
  validate(
    "query",
    z.object({
      projectId: z.string(),
      limit: z.coerce.number().int().gte(1).lte(100).optional(),
      cursor: z.string().max(1024).optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV1VcrRepositoryIdOrNamePermissions({
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
  "/v1/vcr/repository/:idOrName/permissions/all",
  validate("param", z.object({ idOrName: z.string().max(255) })),
  validate(
    "query",
    z.object({ projectId: z.string(), teamId: z.string().optional(), slug: z.string().optional() }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    await deleteV1VcrRepositoryIdOrNamePermissionsAll({
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
  "/v1/vcr/repository/:idOrName/tags",
  validate("param", z.object({ idOrName: z.string().max(255) })),
  validate(
    "query",
    z.object({
      projectId: z.string(),
      limit: z.coerce.number().int().gte(1).lte(100).optional(),
      cursor: z.string().optional(),
      sortBy: z.enum(["updatedAt", "tag"]).optional(),
      sortOrder: z.enum(["asc", "desc"]).optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV1VcrRepositoryIdOrNameTags({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);
app.get(
  "/v1/vcr/repository/:idOrName/tags/:tag",
  validate("param", z.object({ idOrName: z.string().max(255), tag: z.string().max(255) })),
  validate(
    "query",
    z.object({ projectId: z.string(), teamId: z.string().optional(), slug: z.string().optional() }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV1VcrRepositoryIdOrNameTagsTag({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);
app.get(
  "/v1/vcr/repository/:idOrName/images/:imageIdOrDigest",
  validate(
    "param",
    z.object({ idOrName: z.string().max(255), imageIdOrDigest: z.string().max(255) }),
  ),
  validate(
    "query",
    z.object({ projectId: z.string(), teamId: z.string().optional(), slug: z.string().optional() }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV1VcrRepositoryIdOrNameImagesImageIdOrDigest({
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
  "/v1/vcr/repository/:idOrName/images/:imageId",
  validate("param", z.object({ idOrName: z.string().max(255), imageId: z.string().max(255) })),
  validate(
    "query",
    z.object({ projectId: z.string(), teamId: z.string().optional(), slug: z.string().optional() }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await deleteV1VcrRepositoryIdOrNameImagesImageId({
        db,
        env: c.env,
        user: c.var.user,
        params,
        query,
      }),
    );
  },
);

export const postV1VcrRepositoryBody = z.object({
  projectId: z.string(),
  name: z
    .string()
    .max(255)
    .regex(/^[a-z0-9]+(?:(?:\\.|_|__|-+)[a-z0-9]+)*$/),
});

export type PostV1VcrRepositoryBody = { projectId: string; name: string };

export type PostV1VcrRepositoryResponse = { repository: VcrRepository };

export type PostV1VcrRepositoryInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV1VcrRepositoryBody;
};

export type PostV1VcrRepositoryHandler = (
  input: PostV1VcrRepositoryInput,
) => Promise<PostV1VcrRepositoryResponse>;

export type GetV1VcrRepositoryInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: {
    projectId: string;
    limit?: number | undefined;
    cursor?: string | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV1VcrRepositoryHandler = (
  input: GetV1VcrRepositoryInput,
) => Promise<VcrRepositoryList>;

export type GetV1VcrRepositoryIdOrNameResponse = { repository: VcrRepository };

export type GetV1VcrRepositoryIdOrNameInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string };
  query: { projectId: string; teamId?: string | undefined; slug?: string | undefined };
};

export type GetV1VcrRepositoryIdOrNameHandler = (
  input: GetV1VcrRepositoryIdOrNameInput,
) => Promise<GetV1VcrRepositoryIdOrNameResponse>;

export type DeleteV1VcrRepositoryIdOrNameResponse = unknown;

export type DeleteV1VcrRepositoryIdOrNameInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string };
  query: { projectId: string; teamId?: string | undefined; slug?: string | undefined };
};

export type DeleteV1VcrRepositoryIdOrNameHandler = (
  input: DeleteV1VcrRepositoryIdOrNameInput,
) => Promise<DeleteV1VcrRepositoryIdOrNameResponse>;

export type GetV1VcrRepositoryIdOrNameImagesInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string };
  query: {
    projectId: string;
    limit?: number | undefined;
    cursor?: string | undefined;
    untagged?: boolean | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV1VcrRepositoryIdOrNameImagesHandler = (
  input: GetV1VcrRepositoryIdOrNameImagesInput,
) => Promise<VcrImageList>;

export const postV1VcrRepositoryIdOrNamePermissionsBody = z.object({
  teamId: z
    .string()
    .max(64)
    .regex(/^team_[a-zA-Z0-9]+$/)
    .optional(),
  teamSlug: z
    .string()
    .max(64)
    .regex(/^[a-z0-9](?:[a-z0-9-]{0,46}[a-z0-9])?$/)
    .optional(),
});

export type PostV1VcrRepositoryIdOrNamePermissionsBody = {
  teamId?: string | undefined;
  teamSlug?: string | undefined;
};

export type PostV1VcrRepositoryIdOrNamePermissionsResponse = {
  permission: VcrRepositoryPermission;
};

export type PostV1VcrRepositoryIdOrNamePermissionsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string };
  query: { projectId: string; teamId?: string | undefined; slug?: string | undefined };
  body: PostV1VcrRepositoryIdOrNamePermissionsBody;
};

export type PostV1VcrRepositoryIdOrNamePermissionsHandler = (
  input: PostV1VcrRepositoryIdOrNamePermissionsInput,
) => Promise<PostV1VcrRepositoryIdOrNamePermissionsResponse>;

export const deleteV1VcrRepositoryIdOrNamePermissionsBody = z.object({
  teamId: z
    .string()
    .max(64)
    .regex(/^team_[a-zA-Z0-9]+$/)
    .optional(),
  teamSlug: z
    .string()
    .max(64)
    .regex(/^[a-z0-9](?:[a-z0-9-]{0,46}[a-z0-9])?$/)
    .optional(),
});

export type DeleteV1VcrRepositoryIdOrNamePermissionsBody = {
  teamId?: string | undefined;
  teamSlug?: string | undefined;
};

export type DeleteV1VcrRepositoryIdOrNamePermissionsResponse = unknown;

export type DeleteV1VcrRepositoryIdOrNamePermissionsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string };
  query: { projectId: string; teamId?: string | undefined; slug?: string | undefined };
  body: DeleteV1VcrRepositoryIdOrNamePermissionsBody;
};

export type DeleteV1VcrRepositoryIdOrNamePermissionsHandler = (
  input: DeleteV1VcrRepositoryIdOrNamePermissionsInput,
) => Promise<DeleteV1VcrRepositoryIdOrNamePermissionsResponse>;

export type GetV1VcrRepositoryIdOrNamePermissionsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string };
  query: {
    projectId: string;
    limit?: number | undefined;
    cursor?: string | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV1VcrRepositoryIdOrNamePermissionsHandler = (
  input: GetV1VcrRepositoryIdOrNamePermissionsInput,
) => Promise<VcrRepositoryPermissionList>;

export type DeleteV1VcrRepositoryIdOrNamePermissionsAllResponse = unknown;

export type DeleteV1VcrRepositoryIdOrNamePermissionsAllInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string };
  query: { projectId: string; teamId?: string | undefined; slug?: string | undefined };
};

export type DeleteV1VcrRepositoryIdOrNamePermissionsAllHandler = (
  input: DeleteV1VcrRepositoryIdOrNamePermissionsAllInput,
) => Promise<DeleteV1VcrRepositoryIdOrNamePermissionsAllResponse>;

export type GetV1VcrRepositoryIdOrNameTagsResponse = {
  tags: Array<{
    tag: string;
    manifestDigest: string;
    imageId: string;
    kind: "attestation" | "index" | "manifest";
    platform?: string | undefined;
    arch?: string | undefined;
    pushedBy?: string | undefined;
    status: "preparing" | "ready" | "unoptimized" | "null" | null;
    sizeInBytes: number;
    createdAt: string;
    updatedAt: string;
  }>;
  nextCursor?: string | undefined;
};

export type GetV1VcrRepositoryIdOrNameTagsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string };
  query: {
    projectId: string;
    limit?: number | undefined;
    cursor?: string | undefined;
    sortBy?: ("updatedAt" | "tag") | undefined;
    sortOrder?: ("asc" | "desc") | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV1VcrRepositoryIdOrNameTagsHandler = (
  input: GetV1VcrRepositoryIdOrNameTagsInput,
) => Promise<GetV1VcrRepositoryIdOrNameTagsResponse>;

export type GetV1VcrRepositoryIdOrNameTagsTagResponse = { tag: VcrTag };

export type GetV1VcrRepositoryIdOrNameTagsTagInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string; tag: string };
  query: { projectId: string; teamId?: string | undefined; slug?: string | undefined };
};

export type GetV1VcrRepositoryIdOrNameTagsTagHandler = (
  input: GetV1VcrRepositoryIdOrNameTagsTagInput,
) => Promise<GetV1VcrRepositoryIdOrNameTagsTagResponse>;

export type GetV1VcrRepositoryIdOrNameImagesImageIdOrDigestResponse = { image: VcrImageDetail };

export type GetV1VcrRepositoryIdOrNameImagesImageIdOrDigestInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string; imageIdOrDigest: string };
  query: { projectId: string; teamId?: string | undefined; slug?: string | undefined };
};

export type GetV1VcrRepositoryIdOrNameImagesImageIdOrDigestHandler = (
  input: GetV1VcrRepositoryIdOrNameImagesImageIdOrDigestInput,
) => Promise<GetV1VcrRepositoryIdOrNameImagesImageIdOrDigestResponse>;

export type DeleteV1VcrRepositoryIdOrNameImagesImageIdResponse = unknown;

export type DeleteV1VcrRepositoryIdOrNameImagesImageIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string; imageId: string };
  query: { projectId: string; teamId?: string | undefined; slug?: string | undefined };
};

export type DeleteV1VcrRepositoryIdOrNameImagesImageIdHandler = (
  input: DeleteV1VcrRepositoryIdOrNameImagesImageIdInput,
) => Promise<DeleteV1VcrRepositoryIdOrNameImagesImageIdResponse>;
