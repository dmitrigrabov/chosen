import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import {
  postV1EdgeCacheInvalidateByTags,
  postV1EdgeCacheDangerouslyDeleteByTags,
  postV1EdgeCacheInvalidateBySrcImages,
  postV1EdgeCacheDangerouslyDeleteBySrcImages,
} from "./handlers/edge-cache";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.post(
  "/v1/edge-cache/invalidate-by-tags",
  validate(
    "query",
    z.object({
      projectIdOrName: z.string(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  validate("json", postV1EdgeCacheInvalidateByTagsBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV1EdgeCacheInvalidateByTags({ db, env: c.env, user: c.var.user, query, body }),
    );
  },
);
app.post(
  "/v1/edge-cache/dangerously-delete-by-tags",
  validate(
    "query",
    z.object({
      projectIdOrName: z.string(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  validate("json", postV1EdgeCacheDangerouslyDeleteByTagsBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV1EdgeCacheDangerouslyDeleteByTags({
        db,
        env: c.env,
        user: c.var.user,
        query,
        body,
      }),
    );
  },
);
app.post(
  "/v1/edge-cache/invalidate-by-src-images",
  validate(
    "query",
    z.object({
      projectIdOrName: z.string(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  validate("json", postV1EdgeCacheInvalidateBySrcImagesBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV1EdgeCacheInvalidateBySrcImages({ db, env: c.env, user: c.var.user, query, body }),
    );
  },
);
app.post(
  "/v1/edge-cache/dangerously-delete-by-src-images",
  validate(
    "query",
    z.object({
      projectIdOrName: z.string(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  validate("json", postV1EdgeCacheDangerouslyDeleteBySrcImagesBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV1EdgeCacheDangerouslyDeleteBySrcImages({
        db,
        env: c.env,
        user: c.var.user,
        query,
        body,
      }),
    );
  },
);

export const postV1EdgeCacheInvalidateByTagsBody = z.object({
  tags: z.union([z.array(z.string().max(256)), z.string().max(8196)]),
  target: z.enum(["production", "preview"]).optional(),
});

export type PostV1EdgeCacheInvalidateByTagsBody = {
  tags: Array<string> | string;
  target?: ("production" | "preview") | undefined;
};

export type PostV1EdgeCacheInvalidateByTagsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { projectIdOrName: string; teamId?: string | undefined; slug?: string | undefined };
  body: PostV1EdgeCacheInvalidateByTagsBody;
};

export type PostV1EdgeCacheInvalidateByTagsHandler = (
  input: PostV1EdgeCacheInvalidateByTagsInput,
) => Promise<void>;

export const postV1EdgeCacheDangerouslyDeleteByTagsBody = z.object({
  revalidationDeadlineSeconds: z.number().int().gte(0).lte(31536000).optional(),
  tags: z.union([z.array(z.string().max(256)), z.string().max(8196)]),
  target: z.enum(["production", "preview"]).optional(),
});

export type PostV1EdgeCacheDangerouslyDeleteByTagsBody = {
  revalidationDeadlineSeconds?: number | undefined;
  tags: Array<string> | string;
  target?: ("production" | "preview") | undefined;
};

export type PostV1EdgeCacheDangerouslyDeleteByTagsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { projectIdOrName: string; teamId?: string | undefined; slug?: string | undefined };
  body: PostV1EdgeCacheDangerouslyDeleteByTagsBody;
};

export type PostV1EdgeCacheDangerouslyDeleteByTagsHandler = (
  input: PostV1EdgeCacheDangerouslyDeleteByTagsInput,
) => Promise<void>;

export const postV1EdgeCacheInvalidateBySrcImagesBody = z.object({
  srcImages: z.array(z.string()),
});

export type PostV1EdgeCacheInvalidateBySrcImagesBody = { srcImages: Array<string> };

export type PostV1EdgeCacheInvalidateBySrcImagesInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { projectIdOrName: string; teamId?: string | undefined; slug?: string | undefined };
  body: PostV1EdgeCacheInvalidateBySrcImagesBody;
};

export type PostV1EdgeCacheInvalidateBySrcImagesHandler = (
  input: PostV1EdgeCacheInvalidateBySrcImagesInput,
) => Promise<void>;

export const postV1EdgeCacheDangerouslyDeleteBySrcImagesBody = z.object({
  revalidationDeadlineSeconds: z.number().int().gte(0).lte(31536000).optional(),
  srcImages: z.array(z.string()),
});

export type PostV1EdgeCacheDangerouslyDeleteBySrcImagesBody = {
  revalidationDeadlineSeconds?: number | undefined;
  srcImages: Array<string>;
};

export type PostV1EdgeCacheDangerouslyDeleteBySrcImagesInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { projectIdOrName: string; teamId?: string | undefined; slug?: string | undefined };
  body: PostV1EdgeCacheDangerouslyDeleteBySrcImagesBody;
};

export type PostV1EdgeCacheDangerouslyDeleteBySrcImagesHandler = (
  input: PostV1EdgeCacheDangerouslyDeleteBySrcImagesInput,
) => Promise<void>;
