import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import {
  getV1ObservabilityManageConfigurationProjects,
  putV1ObservabilityManageConfigurationProjectsProjectIdOrName,
  postV2ObservabilityQuery,
  getV2ObservabilitySchema,
  getV2ObservabilitySchemaMetricId,
} from "./handlers/observability";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.get(
  "/v1/observability/manage/configuration/projects",
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(
      await getV1ObservabilityManageConfigurationProjects({
        db,
        env: c.env,
        user: c.var.user,
        query,
      }),
    );
  },
);
app.put(
  "/v1/observability/manage/configuration/projects/:projectIdOrName",
  validate("param", z.object({ projectIdOrName: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", putV1ObservabilityManageConfigurationProjectsProjectIdOrNameBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await putV1ObservabilityManageConfigurationProjectsProjectIdOrName({
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
app.post("/v2/observability/query", validate("json", postV2ObservabilityQueryBody), async (c) => {
  const db = createDb(c.env.DB);
  const body = c.req.valid("json");
  return c.json(await postV2ObservabilityQuery({ db, env: c.env, user: c.var.user, body }));
});
app.get("/v2/observability/schema", async (c) => {
  const db = createDb(c.env.DB);
  return c.json(await getV2ObservabilitySchema({ db, env: c.env, user: c.var.user }));
});
app.get(
  "/v2/observability/schema/:metricId",
  validate("param", z.object({ metricId: z.string() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    return c.json(
      await getV2ObservabilitySchemaMetricId({ db, env: c.env, user: c.var.user, params }),
    );
  },
);

export type GetV1ObservabilityManageConfigurationProjectsResponse = {
  disabledProjects: Array<{ id: string; name?: string | undefined; disabledAt: number }>;
};

export type GetV1ObservabilityManageConfigurationProjectsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV1ObservabilityManageConfigurationProjectsHandler = (
  input: GetV1ObservabilityManageConfigurationProjectsInput,
) => Promise<GetV1ObservabilityManageConfigurationProjectsResponse>;

export const putV1ObservabilityManageConfigurationProjectsProjectIdOrNameBody = z.object({
  disabled: z.boolean(),
});

export type PutV1ObservabilityManageConfigurationProjectsProjectIdOrNameBody = {
  disabled: boolean;
};

export type PutV1ObservabilityManageConfigurationProjectsProjectIdOrNameResponse = {
  id: string;
  disabledAt?: number | undefined;
};

export type PutV1ObservabilityManageConfigurationProjectsProjectIdOrNameInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { projectIdOrName: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PutV1ObservabilityManageConfigurationProjectsProjectIdOrNameBody;
};

export type PutV1ObservabilityManageConfigurationProjectsProjectIdOrNameHandler = (
  input: PutV1ObservabilityManageConfigurationProjectsProjectIdOrNameInput,
) => Promise<PutV1ObservabilityManageConfigurationProjectsProjectIdOrNameResponse>;

export const postV2ObservabilityQueryBody = z
  .object({
    metric: z.string(),
    scope: z.object({}),
    aggregation: z.string().optional(),
    groupBy: z.array(z.string()).optional(),
    filter: z.string().optional(),
    limit: z.number().optional(),
    orderBy: z.string().optional(),
    orderDirection: z.enum(["asc", "desc"]).optional(),
    granularity: z.object({}).optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
    bucketTimezone: z.string().optional(),
  })
  .and(z.record(z.string(), z.unknown()));

export type PostV2ObservabilityQueryBody =
  | {
      metric: string;
      scope: Record<string, never>;
      aggregation?: string | undefined;
      groupBy?: Array<string> | undefined;
      filter?: string | undefined;
      limit?: number | undefined;
      orderBy?: string | undefined;
      orderDirection?: ("asc" | "desc") | undefined;
      granularity?: Record<string, never> | undefined;
      startTime?: string | undefined;
      endTime?: string | undefined;
      bucketTimezone?: string | undefined;
    }
  | Record<string, unknown>;

export type PostV2ObservabilityQueryResponse = Record<string, never>;

export type PostV2ObservabilityQueryInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  body: PostV2ObservabilityQueryBody;
};

export type PostV2ObservabilityQueryHandler = (
  input: PostV2ObservabilityQueryInput,
) => Promise<PostV2ObservabilityQueryResponse>;

export type GetV2ObservabilitySchemaResponse = {
  metrics: Array<{ id: string; description: string }>;
};

export type GetV2ObservabilitySchemaInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
};

export type GetV2ObservabilitySchemaHandler = (
  input: GetV2ObservabilitySchemaInput,
) => Promise<GetV2ObservabilitySchemaResponse>;

export type GetV2ObservabilitySchemaMetricIdResponse = Array<{
  id: string;
  description: string;
  dimensions: Array<{ name: string; label: string; description?: string | undefined }>;
  unit: string;
  aggregations: Array<string>;
  defaultAggregation: string;
}>;

export type GetV2ObservabilitySchemaMetricIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { metricId: string };
};

export type GetV2ObservabilitySchemaMetricIdHandler = (
  input: GetV2ObservabilitySchemaMetricIdInput,
) => Promise<GetV2ObservabilitySchemaMetricIdResponse>;
