import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { createDb, type Db } from "../db";
import {
  getV6UserTokens,
  postV3UserTokens,
  getV5UserTokensTokenId,
  deleteV3UserTokensTokenId,
  getV2User,
  deleteV1User,
} from "./handlers/user";
import type { AuthToken } from "packages/models/src/authToken.generated.ts";
import type { Pagination } from "packages/models/src/pagination.generated.ts";
import { z } from "zod";
import type { AuthUser } from "packages/models/src/authUser.generated.ts";
import type { AuthUserLimited } from "packages/models/src/authUserLimited.generated.ts";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.get("/v6/user/tokens", async (c) => {
  const db = createDb(c.env.DB);
  return c.json(await getV6UserTokens({ db, env: c.env, user: c.var.user }));
});
app.post(
  "/v3/user/tokens",
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV3UserTokensBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(await postV3UserTokens({ db, env: c.env, user: c.var.user, query, body }));
  },
);
app.get(
  "/v5/user/tokens/:tokenId",
  validate("param", z.object({ tokenId: z.string() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    return c.json(await getV5UserTokensTokenId({ db, env: c.env, user: c.var.user, params }));
  },
);
app.delete(
  "/v3/user/tokens/:tokenId",
  validate("param", z.object({ tokenId: z.string() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    return c.json(await deleteV3UserTokensTokenId({ db, env: c.env, user: c.var.user, params }));
  },
);
app.get("/v2/user", async (c) => {
  const db = createDb(c.env.DB);
  return c.json(await getV2User({ db, env: c.env, user: c.var.user }));
});
app.delete("/v1/user", validate("json", deleteV1UserBody), async (c) => {
  const db = createDb(c.env.DB);
  const body = c.req.valid("json");
  return c.json(await deleteV1User({ db, env: c.env, user: c.var.user, body }));
});

export type GetV6UserTokensResponse =
  | {
      tokens: Array<AuthToken>;
      pagination: { count: number; next: string | null; prev: string | null };
    }
  | { tokens: Array<AuthToken>; pagination: Pagination };

export type GetV6UserTokensInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
};

export type GetV6UserTokensHandler = (
  input: GetV6UserTokensInput,
) => Promise<GetV6UserTokensResponse>;

export const postV3UserTokensBody = z.object({
  name: z.string(),
  expiresAt: z.number().optional(),
  projectId: z.string().optional(),
});

export type PostV3UserTokensBody = {
  name: string;
  expiresAt?: number | undefined;
  projectId?: string | undefined;
};

export type PostV3UserTokensResponse = { token: AuthToken; bearerToken: string };

export type PostV3UserTokensInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV3UserTokensBody;
};

export type PostV3UserTokensHandler = (
  input: PostV3UserTokensInput,
) => Promise<PostV3UserTokensResponse>;

export type GetV5UserTokensTokenIdResponse = { token: AuthToken };

export type GetV5UserTokensTokenIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { tokenId: string };
};

export type GetV5UserTokensTokenIdHandler = (
  input: GetV5UserTokensTokenIdInput,
) => Promise<GetV5UserTokensTokenIdResponse>;

export type DeleteV3UserTokensTokenIdResponse = { tokenId: string };

export type DeleteV3UserTokensTokenIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { tokenId: string };
};

export type DeleteV3UserTokensTokenIdHandler = (
  input: DeleteV3UserTokensTokenIdInput,
) => Promise<DeleteV3UserTokensTokenIdResponse>;

export type GetV2UserResponse = { user: AuthUser | AuthUserLimited };

export type GetV2UserInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
};

export type GetV2UserHandler = (input: GetV2UserInput) => Promise<GetV2UserResponse>;

export const deleteV1UserBody = z.object({
  reasons: z.array(z.object({ slug: z.string(), description: z.string() })).optional(),
});

export type DeleteV1UserBody = {
  reasons?: Array<{ slug: string; description: string }> | undefined;
};

export type DeleteV1UserResponse = { id: string; email: string; message: string };

export type DeleteV1UserInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  body: DeleteV1UserBody;
};

export type DeleteV1UserHandler = (input: DeleteV1UserInput) => Promise<DeleteV1UserResponse>;
