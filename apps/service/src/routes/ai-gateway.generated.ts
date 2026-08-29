import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import {
  postV1AiGatewayVirtualModelConfigs,
  getV1AiGatewayVirtualModelConfigs,
  patchV1AiGatewayVirtualModelConfigs,
  deleteV1AiGatewayVirtualModelConfigs,
  getV1AiGatewayVirtualModelConfigsList,
  postV1AiGatewayRules,
  getV1AiGatewayRules,
  patchV1AiGatewayRules,
  deleteV1AiGatewayRules,
} from "./handlers/ai-gateway";
import type { AiGatewayVirtualModelConfig } from "packages/models/src/aiGatewayVirtualModelConfig.generated.ts";
import type { AiGatewayVirtualModelConfigList } from "packages/models/src/aiGatewayVirtualModelConfigList.generated.ts";
import type { AiGatewayRule } from "packages/models/src/aiGatewayRule.generated.ts";
import type { AiGatewayRuleList } from "packages/models/src/aiGatewayRuleList.generated.ts";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.post(
  "/v1/ai-gateway/virtual-model-configs",
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(
      await postV1AiGatewayVirtualModelConfigs({ db, env: c.env, user: c.var.user, query }),
      201,
    );
  },
);
app.get(
  "/v1/ai-gateway/virtual-model-configs",
  validate(
    "query",
    z.object({
      ownerId: z.string().optional(),
      virtualModelSlug: z.string(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(
      await getV1AiGatewayVirtualModelConfigs({ db, env: c.env, user: c.var.user, query }),
    );
  },
);
app.patch(
  "/v1/ai-gateway/virtual-model-configs",
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(
      await patchV1AiGatewayVirtualModelConfigs({ db, env: c.env, user: c.var.user, query }),
    );
  },
);
app.delete(
  "/v1/ai-gateway/virtual-model-configs",
  validate(
    "query",
    z.object({
      ownerId: z.string().optional(),
      virtualModelSlug: z.string(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    await deleteV1AiGatewayVirtualModelConfigs({ db, env: c.env, user: c.var.user, query });
    return c.body(null, 204);
  },
);
app.get(
  "/v1/ai-gateway/virtual-model-configs/list",
  validate(
    "query",
    z.object({
      ownerId: z.string().optional(),
      limit: z.coerce.number().int().gte(1).optional(),
      cursor: z.string().optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(
      await getV1AiGatewayVirtualModelConfigsList({ db, env: c.env, user: c.var.user, query }),
    );
  },
);
app.post(
  "/v1/ai-gateway/rules",
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(await postV1AiGatewayRules({ db, env: c.env, user: c.var.user, query }), 201);
  },
);
app.get(
  "/v1/ai-gateway/rules",
  validate(
    "query",
    z.object({
      includeDisabled: z.enum(["true", "false"]).optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(await getV1AiGatewayRules({ db, env: c.env, user: c.var.user, query }));
  },
);
app.patch(
  "/v1/ai-gateway/rules",
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(await patchV1AiGatewayRules({ db, env: c.env, user: c.var.user, query }));
  },
);
app.delete(
  "/v1/ai-gateway/rules",
  validate(
    "query",
    z.object({ ruleId: z.string(), teamId: z.string().optional(), slug: z.string().optional() }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    await deleteV1AiGatewayRules({ db, env: c.env, user: c.var.user, query });
    return c.body(null, 204);
  },
);

export type PostV1AiGatewayVirtualModelConfigsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type PostV1AiGatewayVirtualModelConfigsHandler = (
  input: PostV1AiGatewayVirtualModelConfigsInput,
) => Promise<AiGatewayVirtualModelConfig>;

export type GetV1AiGatewayVirtualModelConfigsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: {
    ownerId?: string | undefined;
    virtualModelSlug: string;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV1AiGatewayVirtualModelConfigsHandler = (
  input: GetV1AiGatewayVirtualModelConfigsInput,
) => Promise<AiGatewayVirtualModelConfig>;

export type PatchV1AiGatewayVirtualModelConfigsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type PatchV1AiGatewayVirtualModelConfigsHandler = (
  input: PatchV1AiGatewayVirtualModelConfigsInput,
) => Promise<AiGatewayVirtualModelConfig>;

export type DeleteV1AiGatewayVirtualModelConfigsResponse = unknown;

export type DeleteV1AiGatewayVirtualModelConfigsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: {
    ownerId?: string | undefined;
    virtualModelSlug: string;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type DeleteV1AiGatewayVirtualModelConfigsHandler = (
  input: DeleteV1AiGatewayVirtualModelConfigsInput,
) => Promise<DeleteV1AiGatewayVirtualModelConfigsResponse>;

export type GetV1AiGatewayVirtualModelConfigsListInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: {
    ownerId?: string | undefined;
    limit?: number | undefined;
    cursor?: string | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV1AiGatewayVirtualModelConfigsListHandler = (
  input: GetV1AiGatewayVirtualModelConfigsListInput,
) => Promise<AiGatewayVirtualModelConfigList>;

export type PostV1AiGatewayRulesInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type PostV1AiGatewayRulesHandler = (
  input: PostV1AiGatewayRulesInput,
) => Promise<AiGatewayRule>;

export type GetV1AiGatewayRulesInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: {
    includeDisabled?: ("true" | "false") | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV1AiGatewayRulesHandler = (
  input: GetV1AiGatewayRulesInput,
) => Promise<AiGatewayRuleList>;

export type PatchV1AiGatewayRulesInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type PatchV1AiGatewayRulesHandler = (
  input: PatchV1AiGatewayRulesInput,
) => Promise<AiGatewayRule>;

export type DeleteV1AiGatewayRulesResponse = unknown;

export type DeleteV1AiGatewayRulesInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { ruleId: string; teamId?: string | undefined; slug?: string | undefined };
};

export type DeleteV1AiGatewayRulesHandler = (
  input: DeleteV1AiGatewayRulesInput,
) => Promise<DeleteV1AiGatewayRulesResponse>;
