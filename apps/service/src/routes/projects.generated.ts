import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import {
  getV2ProjectsProjectIdOrNameChecks,
  postV2ProjectsProjectIdOrNameChecks,
  getV2ProjectsProjectIdOrNameChecksCheckId,
  patchV2ProjectsProjectIdOrNameChecksCheckId,
  deleteV2ProjectsProjectIdOrNameChecksCheckId,
  getV2ProjectsProjectIdOrNameChecksCheckIdRuns,
  getV2ProjectsProjectIdOrNameFeatureFlagsFlags,
  getV1ProjectsProjectIdOrNameFeatureFlagsFlags,
  putV1ProjectsProjectIdOrNameFeatureFlagsFlags,
  getV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlug,
  patchV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlug,
  deleteV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlug,
  getV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlugVersions,
  getV1ProjectsProjectIdOrNameFeatureFlagsSettings,
  patchV1ProjectsProjectIdOrNameFeatureFlagsSettings,
  putV1ProjectsProjectIdOrNameFeatureFlagsSegments,
  getV1ProjectsProjectIdOrNameFeatureFlagsSegments,
  getV1ProjectsProjectIdOrNameFeatureFlagsSegmentsSegmentIdOrSlug,
  deleteV1ProjectsProjectIdOrNameFeatureFlagsSegmentsSegmentIdOrSlug,
  patchV1ProjectsProjectIdOrNameFeatureFlagsSegmentsSegmentIdOrSlug,
  getV1ProjectsProjectIdOrNameFeatureFlagsSdkKeys,
  putV1ProjectsProjectIdOrNameFeatureFlagsSdkKeys,
  deleteV1ProjectsProjectIdOrNameFeatureFlagsSdkKeysHashKey,
  getV1ProjectsProjectIdDeploymentsDeploymentIdRuntimeLogs,
  getV1ProjectsIdOrNameMembers,
  postV1ProjectsIdOrNameMembers,
  deleteV1ProjectsIdOrNameMembersUid,
  getV1ProjectsProjectIdRoutes,
  putV1ProjectsProjectIdRoutes,
  postV1ProjectsProjectIdRoutes,
  deleteV1ProjectsProjectIdRoutes,
  patchV1ProjectsProjectIdRoutesRouteId,
  postV1ProjectsProjectIdRoutesGenerate,
  getV1ProjectsProjectIdRoutesVersions,
  postV1ProjectsProjectIdRoutesVersions,
  getV10Projects,
  getV1ProjectsTraces,
  postV11Projects,
  postV1ProjectsIdOrNameToken,
  postV1ProjectsTracesSession,
  getV9ProjectsIdOrName,
  patchV9ProjectsIdOrName,
  deleteV9ProjectsIdOrName,
  postV1ProjectsIdOrNameAvatar,
  patchV1ProjectsIdOrNameSharedConnectLinks,
  postV9ProjectsIdOrNameCustomEnvironments,
  getV9ProjectsIdOrNameCustomEnvironments,
  getV9ProjectsIdOrNameCustomEnvironmentsEnvironmentSlugOrId,
  patchV9ProjectsIdOrNameCustomEnvironmentsEnvironmentSlugOrId,
  deleteV9ProjectsIdOrNameCustomEnvironmentsEnvironmentSlugOrId,
  getV9ProjectsIdOrNameDomains,
  getV9ProjectsIdOrNameDomainsDomain,
  patchV9ProjectsIdOrNameDomainsDomain,
  deleteV9ProjectsIdOrNameDomainsDomain,
  postV10ProjectsIdOrNameDomains,
  postV1ProjectsIdOrNameDomainsDomainMove,
  postV9ProjectsIdOrNameDomainsDomainVerify,
  getV10ProjectsIdOrNameEnv,
  postV10ProjectsIdOrNameEnv,
  getV1ProjectsIdOrNameEnvId,
  deleteV9ProjectsIdOrNameEnvId,
  patchV9ProjectsIdOrNameEnvId,
  deleteV1ProjectsIdOrNameEnv,
  getV1ProjectsIdOrNameRollingReleaseBilling,
  getV1ProjectsIdOrNameRollingReleaseConfig,
  deleteV1ProjectsIdOrNameRollingReleaseConfig,
  patchV1ProjectsIdOrNameRollingReleaseConfig,
  getV1ProjectsIdOrNameRollingRelease,
  postV1ProjectsIdOrNameRollingReleaseApproveStage,
  postV1ProjectsIdOrNameRollingReleaseStart,
  postV1ProjectsIdOrNameRollingReleaseComplete,
  patchV1ProjectsIdOrNameProtectionBypass,
  postV1ProjectsProjectIdRollbackDeploymentId,
  patchV1ProjectsProjectIdRollbackDeploymentIdUpdateDescription,
  patchV1ProjectsProjectIdMicrofrontends,
  postV10ProjectsProjectIdPromoteDeploymentId,
  getV1ProjectsProjectIdPromoteAliases,
  postV1ProjectsProjectIdPause,
  postV1ProjectsProjectIdUnpause,
} from "./handlers/projects";
import type { Flag } from "packages/models/src/flag.generated.ts";
import type { MarketplaceFlag } from "packages/models/src/marketplaceFlag.generated.ts";
import type { Segment } from "packages/models/src/segment.generated.ts";
import type { FlagsSdkKeyWithSecrets } from "packages/models/src/flagsSdkKeyWithSecrets.generated.ts";
import type { Pagination } from "packages/models/src/pagination.generated.ts";
import type { ACLAction } from "packages/models/src/aCLAction.generated.ts";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.get(
  "/v2/projects/:projectIdOrName/checks",
  validate("param", z.object({ projectIdOrName: z.string() })),
  validate(
    "query",
    z.object({
      blocks: z
        .enum([
          "build-start",
          "deployment-start",
          "deployment-alias",
          "deployment-promotion",
          "none",
        ])
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
      await getV2ProjectsProjectIdOrNameChecks({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);
app.post(
  "/v2/projects/:projectIdOrName/checks",
  validate("param", z.object({ projectIdOrName: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV2ProjectsProjectIdOrNameChecksBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV2ProjectsProjectIdOrNameChecks({
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
  "/v2/projects/:projectIdOrName/checks/:checkId",
  validate("param", z.object({ projectIdOrName: z.string(), checkId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV2ProjectsProjectIdOrNameChecksCheckId({
        db,
        env: c.env,
        user: c.var.user,
        params,
        query,
      }),
    );
  },
);
app.patch(
  "/v2/projects/:projectIdOrName/checks/:checkId",
  validate("param", z.object({ projectIdOrName: z.string(), checkId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", patchV2ProjectsProjectIdOrNameChecksCheckIdBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await patchV2ProjectsProjectIdOrNameChecksCheckId({
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
  "/v2/projects/:projectIdOrName/checks/:checkId",
  validate("param", z.object({ projectIdOrName: z.string(), checkId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await deleteV2ProjectsProjectIdOrNameChecksCheckId({
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
  "/v2/projects/:projectIdOrName/checks/:checkId/runs",
  validate("param", z.object({ projectIdOrName: z.string(), checkId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV2ProjectsProjectIdOrNameChecksCheckIdRuns({
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
  "/v2/projects/:projectIdOrName/feature-flags/flags",
  validate("param", z.object({ projectIdOrName: z.string() })),
  validate(
    "query",
    z.object({
      state: z.enum(["active", "archived"]).optional(),
      limit: z.coerce.number().int().gte(1).lte(100).optional(),
      cursor: z.string().optional(),
      search: z.string().max(256).optional(),
      tags: z.array(z.string()).optional(),
      createdBy: z.string().max(256).optional(),
      maintainerIds: z.array(z.string().max(24)).optional(),
      includeMarketplaceFlags: z
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
      await getV2ProjectsProjectIdOrNameFeatureFlagsFlags({
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
  "/v1/projects/:projectIdOrName/feature-flags/flags",
  validate("param", z.object({ projectIdOrName: z.string() })),
  validate(
    "query",
    z.object({
      state: z.enum(["active", "archived"]).optional(),
      withMetadata: z
        .preprocess((v) => (v === "true" ? true : v === "false" ? false : v), z.boolean())
        .optional(),
      limit: z.coerce.number().int().gte(1).lte(100).optional(),
      cursor: z.string().optional(),
      search: z.string().max(256).optional(),
      tags: z.array(z.string()).optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV1ProjectsProjectIdOrNameFeatureFlagsFlags({
        db,
        env: c.env,
        user: c.var.user,
        params,
        query,
      }),
    );
  },
);
app.put(
  "/v1/projects/:projectIdOrName/feature-flags/flags",
  validate("param", z.object({ projectIdOrName: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", putV1ProjectsProjectIdOrNameFeatureFlagsFlagsBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await putV1ProjectsProjectIdOrNameFeatureFlagsFlags({
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
  "/v1/projects/:projectIdOrName/feature-flags/flags/:flagIdOrSlug",
  validate("param", z.object({ projectIdOrName: z.string(), flagIdOrSlug: z.string() })),
  validate(
    "query",
    z.object({
      ifMatch: z.string().optional(),
      withMetadata: z
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
      await getV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlug({
        db,
        env: c.env,
        user: c.var.user,
        params,
        query,
      }),
    );
  },
);
app.patch(
  "/v1/projects/:projectIdOrName/feature-flags/flags/:flagIdOrSlug",
  validate("param", z.object({ projectIdOrName: z.string(), flagIdOrSlug: z.string() })),
  validate(
    "query",
    z.object({
      ifMatch: z.string().optional(),
      withMetadata: z
        .preprocess((v) => (v === "true" ? true : v === "false" ? false : v), z.boolean())
        .optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  validate("json", patchV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlugBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await patchV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlug({
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
  "/v1/projects/:projectIdOrName/feature-flags/flags/:flagIdOrSlug",
  validate("param", z.object({ projectIdOrName: z.string(), flagIdOrSlug: z.string() })),
  validate(
    "query",
    z.object({
      ifMatch: z.string().optional(),
      withMetadata: z
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
    await deleteV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlug({
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
  "/v1/projects/:projectIdOrName/feature-flags/flags/:flagIdOrSlug/versions",
  validate("param", z.object({ projectIdOrName: z.string(), flagIdOrSlug: z.string() })),
  validate(
    "query",
    z.object({
      limit: z.coerce.number().gte(1).lte(100).optional(),
      cursor: z.string().optional(),
      environment: z.string().optional(),
      withMetadata: z
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
      await getV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlugVersions({
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
  "/v1/projects/:projectIdOrName/feature-flags/settings",
  validate("param", z.object({ projectIdOrName: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV1ProjectsProjectIdOrNameFeatureFlagsSettings({
        db,
        env: c.env,
        user: c.var.user,
        params,
        query,
      }),
    );
  },
);
app.patch(
  "/v1/projects/:projectIdOrName/feature-flags/settings",
  validate("param", z.object({ projectIdOrName: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", patchV1ProjectsProjectIdOrNameFeatureFlagsSettingsBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await patchV1ProjectsProjectIdOrNameFeatureFlagsSettings({
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
app.put(
  "/v1/projects/:projectIdOrName/feature-flags/segments",
  validate("param", z.object({ projectIdOrName: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", putV1ProjectsProjectIdOrNameFeatureFlagsSegmentsBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await putV1ProjectsProjectIdOrNameFeatureFlagsSegments({
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
  "/v1/projects/:projectIdOrName/feature-flags/segments",
  validate("param", z.object({ projectIdOrName: z.string() })),
  validate(
    "query",
    z.object({
      withMetadata: z
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
      await getV1ProjectsProjectIdOrNameFeatureFlagsSegments({
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
  "/v1/projects/:projectIdOrName/feature-flags/segments/:segmentIdOrSlug",
  validate("param", z.object({ projectIdOrName: z.string(), segmentIdOrSlug: z.string() })),
  validate(
    "query",
    z.object({
      withMetadata: z
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
      await getV1ProjectsProjectIdOrNameFeatureFlagsSegmentsSegmentIdOrSlug({
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
  "/v1/projects/:projectIdOrName/feature-flags/segments/:segmentIdOrSlug",
  validate("param", z.object({ projectIdOrName: z.string(), segmentIdOrSlug: z.string() })),
  validate(
    "query",
    z.object({
      withMetadata: z
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
    await deleteV1ProjectsProjectIdOrNameFeatureFlagsSegmentsSegmentIdOrSlug({
      db,
      env: c.env,
      user: c.var.user,
      params,
      query,
    });
    return c.body(null, 204);
  },
);
app.patch(
  "/v1/projects/:projectIdOrName/feature-flags/segments/:segmentIdOrSlug",
  validate("param", z.object({ projectIdOrName: z.string(), segmentIdOrSlug: z.string() })),
  validate(
    "query",
    z.object({
      withMetadata: z
        .preprocess((v) => (v === "true" ? true : v === "false" ? false : v), z.boolean())
        .optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  validate("json", patchV1ProjectsProjectIdOrNameFeatureFlagsSegmentsSegmentIdOrSlugBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await patchV1ProjectsProjectIdOrNameFeatureFlagsSegmentsSegmentIdOrSlug({
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
  "/v1/projects/:projectIdOrName/feature-flags/sdk-keys",
  validate("param", z.object({ projectIdOrName: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV1ProjectsProjectIdOrNameFeatureFlagsSdkKeys({
        db,
        env: c.env,
        user: c.var.user,
        params,
        query,
      }),
    );
  },
);
app.put(
  "/v1/projects/:projectIdOrName/feature-flags/sdk-keys",
  validate("param", z.object({ projectIdOrName: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", putV1ProjectsProjectIdOrNameFeatureFlagsSdkKeysBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await putV1ProjectsProjectIdOrNameFeatureFlagsSdkKeys({
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
  "/v1/projects/:projectIdOrName/feature-flags/sdk-keys/:hashKey",
  validate("param", z.object({ projectIdOrName: z.string(), hashKey: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    await deleteV1ProjectsProjectIdOrNameFeatureFlagsSdkKeysHashKey({
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
  "/v1/projects/:projectId/deployments/:deploymentId/runtime-logs",
  validate("param", z.object({ projectId: z.string(), deploymentId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV1ProjectsProjectIdDeploymentsDeploymentIdRuntimeLogs({
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
  "/v1/projects/:idOrName/members",
  validate("param", z.object({ idOrName: z.string() })),
  validate(
    "query",
    z.object({
      limit: z.coerce.number().int().gte(1).lte(100).optional(),
      since: z.coerce.number().int().optional(),
      until: z.coerce.number().int().optional(),
      search: z.string().optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV1ProjectsIdOrNameMembers({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);
app.post(
  "/v1/projects/:idOrName/members",
  validate("param", z.object({ idOrName: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV1ProjectsIdOrNameMembersBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV1ProjectsIdOrNameMembers({
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
  "/v1/projects/:idOrName/members/:uid",
  validate("param", z.object({ idOrName: z.string(), uid: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await deleteV1ProjectsIdOrNameMembersUid({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);
app.get(
  "/v1/projects/:projectId/routes",
  validate("param", z.object({ projectId: z.string() })),
  validate(
    "query",
    z.object({
      versionId: z.string().optional(),
      q: z.string().optional(),
      filter: z.enum(["rewrite", "redirect", "set_status", "transform"]).optional(),
      diff: z
        .union([
          z.preprocess((v) => (v === "true" ? true : v === "false" ? false : v), z.boolean()),
          z.literal("only"),
        ])
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
      await getV1ProjectsProjectIdRoutes({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);
app.put(
  "/v1/projects/:projectId/routes",
  validate("param", z.object({ projectId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", putV1ProjectsProjectIdRoutesBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await putV1ProjectsProjectIdRoutes({ db, env: c.env, user: c.var.user, params, query, body }),
    );
  },
);
app.post(
  "/v1/projects/:projectId/routes",
  validate("param", z.object({ projectId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV1ProjectsProjectIdRoutesBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV1ProjectsProjectIdRoutes({
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
  "/v1/projects/:projectId/routes",
  validate("param", z.object({ projectId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", deleteV1ProjectsProjectIdRoutesBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await deleteV1ProjectsProjectIdRoutes({
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
app.patch(
  "/v1/projects/:projectId/routes/:routeId",
  validate("param", z.object({ projectId: z.string(), routeId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", patchV1ProjectsProjectIdRoutesRouteIdBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await patchV1ProjectsProjectIdRoutesRouteId({
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
app.post(
  "/v1/projects/:projectId/routes/generate",
  validate("param", z.object({ projectId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV1ProjectsProjectIdRoutesGenerateBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV1ProjectsProjectIdRoutesGenerate({
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
  "/v1/projects/:projectId/routes/versions",
  validate("param", z.object({ projectId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV1ProjectsProjectIdRoutesVersions({
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
  "/v1/projects/:projectId/routes/versions",
  validate("param", z.object({ projectId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV1ProjectsProjectIdRoutesVersionsBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV1ProjectsProjectIdRoutesVersions({
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
  "/v10/projects",
  validate(
    "query",
    z.object({
      from: z.string().optional(),
      gitForkProtection: z.enum(["1", "0"]).optional(),
      limit: z.string().optional(),
      search: z.string().max(100).optional(),
      repo: z.string().optional(),
      repoId: z.string().optional(),
      repoUrl: z.string().optional(),
      excludeRepos: z.string().optional(),
      edgeConfigId: z.string().optional(),
      edgeConfigTokenId: z.string().optional(),
      deprecated: z
        .preprocess((v) => (v === "true" ? true : v === "false" ? false : v), z.boolean())
        .optional(),
      elasticConcurrencyEnabled: z.enum(["1", "0"]).optional(),
      staticIpsEnabled: z.enum(["0", "1"]).optional(),
      buildMachineTypes: z.string().optional(),
      buildQueueConfiguration: z
        .enum(["SKIP_NAMESPACE_QUEUE", "WAIT_FOR_NAMESPACE_QUEUE"])
        .optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(await getV10Projects({ db, env: c.env, user: c.var.user, query }));
  },
);
app.get(
  "/v1/projects/traces",
  validate(
    "query",
    z.object({
      projectId: z.string().max(150),
      requestId: z.string().max(256),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(await getV1ProjectsTraces({ db, env: c.env, user: c.var.user, query }));
  },
);
app.post(
  "/v11/projects",
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV11ProjectsBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(await postV11Projects({ db, env: c.env, user: c.var.user, query, body }));
  },
);
app.post(
  "/v1/projects/:idOrName/token",
  validate("param", z.object({ idOrName: z.string().max(150) })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV1ProjectsIdOrNameTokenBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV1ProjectsIdOrNameToken({ db, env: c.env, user: c.var.user, params, query, body }),
    );
  },
);
app.post(
  "/v1/projects/traces/session",
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV1ProjectsTracesSessionBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV1ProjectsTracesSession({ db, env: c.env, user: c.var.user, query, body }),
    );
  },
);
app.get(
  "/v9/projects/:idOrName",
  validate("param", z.object({ idOrName: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(await getV9ProjectsIdOrName({ db, env: c.env, user: c.var.user, params, query }));
  },
);
app.patch(
  "/v9/projects/:idOrName",
  validate("param", z.object({ idOrName: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", patchV9ProjectsIdOrNameBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await patchV9ProjectsIdOrName({ db, env: c.env, user: c.var.user, params, query, body }),
    );
  },
);
app.delete(
  "/v9/projects/:idOrName",
  validate("param", z.object({ idOrName: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    await deleteV9ProjectsIdOrName({ db, env: c.env, user: c.var.user, params, query });
    return c.body(null, 204);
  },
);
app.post(
  "/v1/projects/:idOrName/avatar",
  validate("param", z.object({ idOrName: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const bytes = new Uint8Array(await c.req.arrayBuffer());
    return c.json(
      await postV1ProjectsIdOrNameAvatar({
        db,
        env: c.env,
        user: c.var.user,
        params,
        query,
        bytes,
      }),
    );
  },
);
app.patch(
  "/v1/projects/:idOrName/shared-connect-links",
  validate("param", z.object({ idOrName: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", patchV1ProjectsIdOrNameSharedConnectLinksBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await patchV1ProjectsIdOrNameSharedConnectLinks({
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
app.post(
  "/v9/projects/:idOrName/custom-environments",
  validate("param", z.object({ idOrName: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV9ProjectsIdOrNameCustomEnvironmentsBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV9ProjectsIdOrNameCustomEnvironments({
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
  "/v9/projects/:idOrName/custom-environments",
  validate("param", z.object({ idOrName: z.string() })),
  validate(
    "query",
    z.object({
      gitBranch: z.string().optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV9ProjectsIdOrNameCustomEnvironments({
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
  "/v9/projects/:idOrName/custom-environments/:environmentSlugOrId",
  validate("param", z.object({ idOrName: z.string(), environmentSlugOrId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV9ProjectsIdOrNameCustomEnvironmentsEnvironmentSlugOrId({
        db,
        env: c.env,
        user: c.var.user,
        params,
        query,
      }),
    );
  },
);
app.patch(
  "/v9/projects/:idOrName/custom-environments/:environmentSlugOrId",
  validate("param", z.object({ idOrName: z.string(), environmentSlugOrId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", patchV9ProjectsIdOrNameCustomEnvironmentsEnvironmentSlugOrIdBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await patchV9ProjectsIdOrNameCustomEnvironmentsEnvironmentSlugOrId({
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
  "/v9/projects/:idOrName/custom-environments/:environmentSlugOrId",
  validate("param", z.object({ idOrName: z.string(), environmentSlugOrId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", deleteV9ProjectsIdOrNameCustomEnvironmentsEnvironmentSlugOrIdBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await deleteV9ProjectsIdOrNameCustomEnvironmentsEnvironmentSlugOrId({
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
  "/v9/projects/:idOrName/domains",
  validate("param", z.object({ idOrName: z.string() })),
  validate(
    "query",
    z.object({
      production: z.enum(["true", "false"]).optional(),
      target: z.enum(["production", "preview"]).optional(),
      customEnvironmentId: z.string().optional(),
      gitBranch: z.string().optional(),
      redirects: z.enum(["true", "false"]).optional(),
      redirect: z.string().optional(),
      verified: z.enum(["true", "false"]).optional(),
      limit: z.coerce.number().optional(),
      since: z.coerce.number().optional(),
      until: z.coerce.number().optional(),
      order: z.enum(["ASC", "DESC"]).optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV9ProjectsIdOrNameDomains({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);
app.get(
  "/v9/projects/:idOrName/domains/:domain",
  validate("param", z.object({ idOrName: z.string(), domain: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV9ProjectsIdOrNameDomainsDomain({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);
app.patch(
  "/v9/projects/:idOrName/domains/:domain",
  validate("param", z.object({ idOrName: z.string(), domain: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", patchV9ProjectsIdOrNameDomainsDomainBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await patchV9ProjectsIdOrNameDomainsDomain({
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
  "/v9/projects/:idOrName/domains/:domain",
  validate("param", z.object({ idOrName: z.string(), domain: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", deleteV9ProjectsIdOrNameDomainsDomainBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await deleteV9ProjectsIdOrNameDomainsDomain({
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
app.post(
  "/v10/projects/:idOrName/domains",
  validate("param", z.object({ idOrName: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV10ProjectsIdOrNameDomainsBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV10ProjectsIdOrNameDomains({
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
app.post(
  "/v1/projects/:idOrName/domains/:domain/move",
  validate("param", z.object({ idOrName: z.string(), domain: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV1ProjectsIdOrNameDomainsDomainMoveBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV1ProjectsIdOrNameDomainsDomainMove({
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
app.post(
  "/v9/projects/:idOrName/domains/:domain/verify",
  validate("param", z.object({ idOrName: z.string(), domain: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await postV9ProjectsIdOrNameDomainsDomainVerify({
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
  "/v10/projects/:idOrName/env",
  validate("param", z.object({ idOrName: z.string() })),
  validate(
    "query",
    z.object({
      gitBranch: z.string().max(250).optional(),
      decrypt: z.enum(["true", "false"]).optional(),
      source: z.string().optional(),
      customEnvironmentId: z.string().optional(),
      customEnvironmentSlug: z.string().optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV10ProjectsIdOrNameEnv({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);
app.post(
  "/v10/projects/:idOrName/env",
  validate("param", z.object({ idOrName: z.string() })),
  validate(
    "query",
    z.object({
      upsert: z.string().optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  validate("json", postV10ProjectsIdOrNameEnvBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV10ProjectsIdOrNameEnv({ db, env: c.env, user: c.var.user, params, query, body }),
      201,
    );
  },
);
app.get(
  "/v1/projects/:idOrName/env/:id",
  validate("param", z.object({ idOrName: z.string(), id: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV1ProjectsIdOrNameEnvId({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);
app.delete(
  "/v9/projects/:idOrName/env/:id",
  validate("param", z.object({ idOrName: z.string(), id: z.string() })),
  validate(
    "query",
    z.object({
      customEnvironmentId: z.string().optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await deleteV9ProjectsIdOrNameEnvId({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);
app.patch(
  "/v9/projects/:idOrName/env/:id",
  validate("param", z.object({ idOrName: z.string(), id: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", patchV9ProjectsIdOrNameEnvIdBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await patchV9ProjectsIdOrNameEnvId({ db, env: c.env, user: c.var.user, params, query, body }),
    );
  },
);
app.delete(
  "/v1/projects/:idOrName/env",
  validate("param", z.object({ idOrName: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", deleteV1ProjectsIdOrNameEnvBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await deleteV1ProjectsIdOrNameEnv({ db, env: c.env, user: c.var.user, params, query, body }),
    );
  },
);
app.get(
  "/v1/projects/:idOrName/rolling-release/billing",
  validate("param", z.object({ idOrName: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV1ProjectsIdOrNameRollingReleaseBilling({
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
  "/v1/projects/:idOrName/rolling-release/config",
  validate("param", z.object({ idOrName: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV1ProjectsIdOrNameRollingReleaseConfig({
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
  "/v1/projects/:idOrName/rolling-release/config",
  validate("param", z.object({ idOrName: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await deleteV1ProjectsIdOrNameRollingReleaseConfig({
        db,
        env: c.env,
        user: c.var.user,
        params,
        query,
      }),
    );
  },
);
app.patch(
  "/v1/projects/:idOrName/rolling-release/config",
  validate("param", z.object({ idOrName: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await patchV1ProjectsIdOrNameRollingReleaseConfig({
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
  "/v1/projects/:idOrName/rolling-release",
  validate("param", z.object({ idOrName: z.string() })),
  validate(
    "query",
    z.object({
      state: z.enum(["ACTIVE", "COMPLETE", "ABORTED"]).optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV1ProjectsIdOrNameRollingRelease({
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
  "/v1/projects/:idOrName/rolling-release/approve-stage",
  validate("param", z.object({ idOrName: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV1ProjectsIdOrNameRollingReleaseApproveStageBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV1ProjectsIdOrNameRollingReleaseApproveStage({
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
app.post(
  "/v1/projects/:idOrName/rolling-release/start",
  validate("param", z.object({ idOrName: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV1ProjectsIdOrNameRollingReleaseStartBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV1ProjectsIdOrNameRollingReleaseStart({
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
app.post(
  "/v1/projects/:idOrName/rolling-release/complete",
  validate("param", z.object({ idOrName: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV1ProjectsIdOrNameRollingReleaseCompleteBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV1ProjectsIdOrNameRollingReleaseComplete({
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
app.patch(
  "/v1/projects/:idOrName/protection-bypass",
  validate("param", z.object({ idOrName: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", patchV1ProjectsIdOrNameProtectionBypassBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await patchV1ProjectsIdOrNameProtectionBypass({
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
app.post(
  "/v1/projects/:projectId/rollback/:deploymentId",
  validate("param", z.object({ projectId: z.string(), deploymentId: z.string() })),
  validate(
    "query",
    z.object({
      description: z.string().optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await postV1ProjectsProjectIdRollbackDeploymentId({
        db,
        env: c.env,
        user: c.var.user,
        params,
        query,
      }),
      201,
    );
  },
);
app.patch(
  "/v1/projects/:projectId/rollback/:deploymentId/update-description",
  validate("param", z.object({ projectId: z.string(), deploymentId: z.string() })),
  validate("json", patchV1ProjectsProjectIdRollbackDeploymentIdUpdateDescriptionBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const body = c.req.valid("json");
    return c.json(
      await patchV1ProjectsProjectIdRollbackDeploymentIdUpdateDescription({
        db,
        env: c.env,
        user: c.var.user,
        params,
        body,
      }),
    );
  },
);
app.patch(
  "/v1/projects/:projectId/microfrontends",
  validate("param", z.object({ projectId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", patchV1ProjectsProjectIdMicrofrontendsBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await patchV1ProjectsProjectIdMicrofrontends({
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
app.post(
  "/v10/projects/:projectId/promote/:deploymentId",
  validate("param", z.object({ projectId: z.string(), deploymentId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await postV10ProjectsProjectIdPromoteDeploymentId({
        db,
        env: c.env,
        user: c.var.user,
        params,
        query,
      }),
      201,
    );
  },
);
app.get(
  "/v1/projects/:projectId/promote/aliases",
  validate("param", z.object({ projectId: z.string() })),
  validate(
    "query",
    z.object({
      limit: z.coerce.number().lte(100).optional(),
      since: z.coerce.number().optional(),
      until: z.coerce.number().optional(),
      failedOnly: z
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
      await getV1ProjectsProjectIdPromoteAliases({
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
  "/v1/projects/:projectId/pause",
  validate("param", z.object({ projectId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await postV1ProjectsProjectIdPause({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);
app.post(
  "/v1/projects/:projectId/unpause",
  validate("param", z.object({ projectId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await postV1ProjectsProjectIdUnpause({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);

export type GetV2ProjectsProjectIdOrNameChecksResponse = {
  checks: Array<{
    id: string;
    name: string;
    ownerId: string;
    projectId: string;
    isRerequestable: boolean;
    requires: "build-ready" | "deployment-url" | "none";
    source:
      | {
          kind: "integration";
          integrationId: string;
          integrationConfigurationId: string;
          resourceId?: string | undefined;
          externalResourceId?: string | undefined;
        }
      | { kind: "webhook"; webhookId?: string | undefined }
      | {
          kind: "git-provider";
          provider: "bitbucket" | "github" | "gitlab";
          externalCheckName: string;
        };
    blocks:
      | "build-start"
      | "deployment-alias"
      | "deployment-promotion"
      | "deployment-start"
      | "none";
    targets: Array<string>;
    sourceKind:
      | "git-provider"
      | "integration"
      | "vercel"
      | "webhook"
      | "integration"
      | "webhook"
      | "git-provider";
    sourceIntegrationConfigurationId?: string | undefined;
    timeout: number;
    createdAt: number;
    updatedAt: number;
    deletedAt?: number | undefined;
  }>;
};

export type GetV2ProjectsProjectIdOrNameChecksInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { projectIdOrName: string };
  query: {
    blocks?:
      | ("build-start" | "deployment-start" | "deployment-alias" | "deployment-promotion" | "none")
      | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV2ProjectsProjectIdOrNameChecksHandler = (
  input: GetV2ProjectsProjectIdOrNameChecksInput,
) => Promise<GetV2ProjectsProjectIdOrNameChecksResponse>;

export const postV2ProjectsProjectIdOrNameChecksBody = z.object({
  name: z.string(),
  isRerequestable: z.boolean().optional(),
  requires: z.enum(["build-ready", "deployment-url", "none"]),
  targets: z.array(z.string()).optional(),
  blocks: z
    .enum(["build-start", "deployment-start", "deployment-alias", "deployment-promotion", "none"])
    .optional(),
  source: z
    .union([
      z.object({ kind: z.string().optional(), externalResourceId: z.string().optional() }),
      z.object({ kind: z.string(), webhookId: z.string().optional() }),
      z.object({ kind: z.string(), externalCheckName: z.string(), provider: z.literal("github") }),
    ])
    .optional(),
  timeout: z.number().optional(),
});

export type PostV2ProjectsProjectIdOrNameChecksBody = {
  name: string;
  isRerequestable?: boolean | undefined;
  requires: "build-ready" | "deployment-url" | "none";
  targets?: Array<string> | undefined;
  blocks?:
    | ("build-start" | "deployment-start" | "deployment-alias" | "deployment-promotion" | "none")
    | undefined;
  source?:
    | (
        | { kind?: string | undefined; externalResourceId?: string | undefined }
        | { kind: string; webhookId?: string | undefined }
        | { kind: string; externalCheckName: string; provider: "github" }
      )
    | undefined;
  timeout?: number | undefined;
};

export type PostV2ProjectsProjectIdOrNameChecksResponse = {
  id: string;
  name: string;
  ownerId: string;
  projectId: string;
  isRerequestable: boolean;
  requires: "build-ready" | "deployment-url" | "none";
  source:
    | {
        kind: "integration";
        integrationId: string;
        integrationConfigurationId: string;
        resourceId?: string | undefined;
        externalResourceId?: string | undefined;
      }
    | { kind: "webhook"; webhookId?: string | undefined }
    | {
        kind: "git-provider";
        provider: "bitbucket" | "github" | "gitlab";
        externalCheckName: string;
      };
  blocks: "build-start" | "deployment-alias" | "deployment-promotion" | "deployment-start" | "none";
  targets: Array<string>;
  sourceKind:
    | "git-provider"
    | "integration"
    | "vercel"
    | "webhook"
    | "integration"
    | "webhook"
    | "git-provider";
  sourceIntegrationConfigurationId?: string | undefined;
  timeout: number;
  createdAt: number;
  updatedAt: number;
  deletedAt?: number | undefined;
};

export type PostV2ProjectsProjectIdOrNameChecksInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { projectIdOrName: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV2ProjectsProjectIdOrNameChecksBody;
};

export type PostV2ProjectsProjectIdOrNameChecksHandler = (
  input: PostV2ProjectsProjectIdOrNameChecksInput,
) => Promise<PostV2ProjectsProjectIdOrNameChecksResponse>;

export type GetV2ProjectsProjectIdOrNameChecksCheckIdResponse = {
  id: string;
  name: string;
  ownerId: string;
  projectId: string;
  isRerequestable: boolean;
  requires: "build-ready" | "deployment-url" | "none";
  source:
    | {
        kind: "integration";
        integrationId: string;
        integrationConfigurationId: string;
        resourceId?: string | undefined;
        externalResourceId?: string | undefined;
      }
    | { kind: "webhook"; webhookId?: string | undefined }
    | {
        kind: "git-provider";
        provider: "bitbucket" | "github" | "gitlab";
        externalCheckName: string;
      };
  blocks: "build-start" | "deployment-alias" | "deployment-promotion" | "deployment-start" | "none";
  targets: Array<string>;
  sourceKind:
    | "git-provider"
    | "integration"
    | "vercel"
    | "webhook"
    | "integration"
    | "webhook"
    | "git-provider";
  sourceIntegrationConfigurationId?: string | undefined;
  timeout: number;
  createdAt: number;
  updatedAt: number;
  deletedAt?: number | undefined;
};

export type GetV2ProjectsProjectIdOrNameChecksCheckIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { projectIdOrName: string; checkId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV2ProjectsProjectIdOrNameChecksCheckIdHandler = (
  input: GetV2ProjectsProjectIdOrNameChecksCheckIdInput,
) => Promise<GetV2ProjectsProjectIdOrNameChecksCheckIdResponse>;

export const patchV2ProjectsProjectIdOrNameChecksCheckIdBody = z.object({
  name: z.string().optional(),
  isRerequestable: z.boolean().optional(),
  requires: z.enum(["build-ready", "deployment-url"]).optional(),
  targets: z.array(z.string()).optional(),
  blocks: z
    .enum(["build-start", "deployment-start", "deployment-alias", "deployment-promotion", "none"])
    .optional(),
  timeout: z.number().optional(),
});

export type PatchV2ProjectsProjectIdOrNameChecksCheckIdBody = {
  name?: string | undefined;
  isRerequestable?: boolean | undefined;
  requires?: ("build-ready" | "deployment-url") | undefined;
  targets?: Array<string> | undefined;
  blocks?:
    | ("build-start" | "deployment-start" | "deployment-alias" | "deployment-promotion" | "none")
    | undefined;
  timeout?: number | undefined;
};

export type PatchV2ProjectsProjectIdOrNameChecksCheckIdResponse = {
  id: string;
  name: string;
  ownerId: string;
  projectId: string;
  isRerequestable: boolean;
  requires: "build-ready" | "deployment-url" | "none";
  source:
    | {
        kind: "integration";
        integrationId: string;
        integrationConfigurationId: string;
        resourceId?: string | undefined;
        externalResourceId?: string | undefined;
      }
    | { kind: "webhook"; webhookId?: string | undefined }
    | {
        kind: "git-provider";
        provider: "bitbucket" | "github" | "gitlab";
        externalCheckName: string;
      };
  blocks: "build-start" | "deployment-alias" | "deployment-promotion" | "deployment-start" | "none";
  targets: Array<string>;
  sourceKind:
    | "git-provider"
    | "integration"
    | "vercel"
    | "webhook"
    | "integration"
    | "webhook"
    | "git-provider";
  sourceIntegrationConfigurationId?: string | undefined;
  timeout: number;
  createdAt: number;
  updatedAt: number;
  deletedAt?: number | undefined;
};

export type PatchV2ProjectsProjectIdOrNameChecksCheckIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { projectIdOrName: string; checkId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PatchV2ProjectsProjectIdOrNameChecksCheckIdBody;
};

export type PatchV2ProjectsProjectIdOrNameChecksCheckIdHandler = (
  input: PatchV2ProjectsProjectIdOrNameChecksCheckIdInput,
) => Promise<PatchV2ProjectsProjectIdOrNameChecksCheckIdResponse>;

export type DeleteV2ProjectsProjectIdOrNameChecksCheckIdResponse = { success: true };

export type DeleteV2ProjectsProjectIdOrNameChecksCheckIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { projectIdOrName: string; checkId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type DeleteV2ProjectsProjectIdOrNameChecksCheckIdHandler = (
  input: DeleteV2ProjectsProjectIdOrNameChecksCheckIdInput,
) => Promise<DeleteV2ProjectsProjectIdOrNameChecksCheckIdResponse>;

export type GetV2ProjectsProjectIdOrNameChecksCheckIdRunsResponse = {
  runs: Array<
    | {
        id: string;
        name: string;
        ownerId: string;
        deploymentId: string;
        projectId?: string | undefined;
        requires?: ("build-ready" | "deployment-url" | "none") | undefined;
        blocks?:
          | (
              | "build-start"
              | "deployment-alias"
              | "deployment-promotion"
              | "deployment-start"
              | "none"
            )
          | undefined;
        targets?: Array<string> | undefined;
        status: "completed" | "queued" | "running";
        conclusion?:
          | ("canceled" | "failed" | "neutral" | "skipped" | "succeeded" | "timeout")
          | undefined;
        conclusionText?: string | undefined;
        externalId?: string | undefined;
        externalUrl?: string | undefined;
        output?: Record<string, unknown> | undefined;
        timeout: number;
        createdAt: number;
        updatedAt: number;
        completedAt?: number | undefined;
        checkId: string;
        source:
          | {
              kind: "integration";
              integrationId: string;
              integrationConfigurationId: string;
              resourceId?: string | undefined;
              externalResourceId?: string | undefined;
            }
          | { kind: "webhook"; webhookId?: string | undefined }
          | {
              kind: "git-provider";
              provider: "bitbucket" | "github" | "gitlab";
              externalCheckName: string;
            }
          | {
              subKind?: "vercel-native-check" | undefined;
              origin?: ("api" | "platform") | undefined;
            };
      }
    | {
        id: string;
        name: string;
        ownerId: string;
        deploymentId: string;
        projectId?: string | undefined;
        requires?: ("build-ready" | "deployment-url" | "none") | undefined;
        blocks?:
          | (
              | "build-start"
              | "deployment-alias"
              | "deployment-promotion"
              | "deployment-start"
              | "none"
            )
          | undefined;
        targets?: Array<string> | undefined;
        status: "completed" | "queued" | "running";
        conclusion?:
          | ("canceled" | "failed" | "neutral" | "skipped" | "succeeded" | "timeout")
          | undefined;
        conclusionText?: string | undefined;
        externalId?: string | undefined;
        externalUrl?: string | undefined;
        output?: Record<string, unknown> | undefined;
        timeout: number;
        createdAt: number;
        updatedAt: number;
        completedAt?: number | undefined;
        source:
          | {
              subKind: "vercel-ci";
              origin: "config";
              invocationId: string;
              jobDefinitionId: string;
            }
          | { subKind: "vercel-ci-sentinel"; origin: "platform" };
      }
  >;
};

export type GetV2ProjectsProjectIdOrNameChecksCheckIdRunsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { projectIdOrName: string; checkId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV2ProjectsProjectIdOrNameChecksCheckIdRunsHandler = (
  input: GetV2ProjectsProjectIdOrNameChecksCheckIdRunsInput,
) => Promise<GetV2ProjectsProjectIdOrNameChecksCheckIdRunsResponse>;

export type GetV2ProjectsProjectIdOrNameFeatureFlagsFlagsResponse = {
  pagination: { next: string | null };
  data: Array<Flag | MarketplaceFlag>;
};

export type GetV2ProjectsProjectIdOrNameFeatureFlagsFlagsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { projectIdOrName: string };
  query: {
    state?: ("active" | "archived") | undefined;
    limit?: number | undefined;
    cursor?: string | undefined;
    search?: string | undefined;
    tags?: Array<string> | undefined;
    createdBy?: string | undefined;
    maintainerIds?: Array<string> | undefined;
    includeMarketplaceFlags?: boolean | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV2ProjectsProjectIdOrNameFeatureFlagsFlagsHandler = (
  input: GetV2ProjectsProjectIdOrNameFeatureFlagsFlagsInput,
) => Promise<GetV2ProjectsProjectIdOrNameFeatureFlagsFlagsResponse>;

export type GetV1ProjectsProjectIdOrNameFeatureFlagsFlagsResponse = {
  data: Array<Flag>;
  pagination: { next: string | null };
};

export type GetV1ProjectsProjectIdOrNameFeatureFlagsFlagsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { projectIdOrName: string };
  query: {
    state?: ("active" | "archived") | undefined;
    withMetadata?: boolean | undefined;
    limit?: number | undefined;
    cursor?: string | undefined;
    search?: string | undefined;
    tags?: Array<string> | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV1ProjectsProjectIdOrNameFeatureFlagsFlagsHandler = (
  input: GetV1ProjectsProjectIdOrNameFeatureFlagsFlagsInput,
) => Promise<GetV1ProjectsProjectIdOrNameFeatureFlagsFlagsResponse>;

export const putV1ProjectsProjectIdOrNameFeatureFlagsFlagsBody = z.object({
  slug: z.string().regex(/^[a-zA-Z0-9_-]{1,512}$/),
  kind: z.enum(["boolean", "string", "number", "json"]),
  variants: z
    .array(
      z.object({
        id: z.string(),
        label: z.string().optional(),
        description: z.string().optional(),
        value: z.union([
          z.string(),
          z.number(),
          z.boolean(),
          z.object({}),
          z.array(z.unknown()),
          z.string(),
        ]),
      }),
    )
    .optional(),
  environments: z.record(
    z.string(),
    z.object({
      active: z.boolean(),
      reuse: z.object({ active: z.boolean(), environment: z.string() }).optional(),
      targets: z
        .record(
          z.string(),
          z.record(
            z.string(),
            z.record(
              z.string(),
              z.array(z.object({ note: z.string().optional(), value: z.string() })),
            ),
          ),
        )
        .optional(),
      pausedOutcome: z.object({ type: z.unknown(), variantId: z.string() }),
      rules: z.array(
        z.object({
          id: z.string(),
          conditions: z.array(
            z.object({
              lhs: z.union([
                z.object({ type: z.unknown() }),
                z.object({ type: z.unknown(), kind: z.string(), attribute: z.string() }),
              ]),
              cmp: z.enum([
                "eq",
                "!eq",
                "oneOf",
                "!oneOf",
                "containsAllOf",
                "containsAnyOf",
                "containsNoneOf",
                "startsWith",
                "!startsWith",
                "endsWith",
                "!endsWith",
                "contains",
                "!contains",
                "ex",
                "!ex",
                "gt",
                "gte",
                "lt",
                "lte",
                "regex",
                "!regex",
                "before",
                "after",
              ]),
              rhs: z
                .union([
                  z.object({
                    type: z.enum(["list/inline", "list"]),
                    items: z.array(
                      z.union([
                        z.object({
                          label: z.string().optional(),
                          note: z.string().optional(),
                          value: z.number(),
                        }),
                        z.object({
                          label: z.string().optional(),
                          note: z.string().optional(),
                          value: z.string(),
                        }),
                      ]),
                    ),
                  }),
                  z.object({ type: z.unknown(), pattern: z.string(), flags: z.string() }),
                  z.string(),
                  z.number(),
                  z.boolean(),
                ])
                .optional(),
              cmpOptions: z.object({ ignoreCase: z.boolean().optional() }).optional(),
            }),
          ),
          outcome: z.union([
            z.object({ type: z.unknown(), variantId: z.string() }),
            z.object({
              type: z.unknown(),
              base: z.object({ type: z.unknown(), kind: z.string(), attribute: z.string() }),
              weights: z.record(z.string(), z.number()),
              defaultVariantId: z.string(),
            }),
            z.object({
              type: z.unknown(),
              base: z.object({ type: z.unknown(), kind: z.string(), attribute: z.string() }),
              startTimestamp: z.number(),
              rollFromVariantId: z.string(),
              rollToVariantId: z.string(),
              defaultVariantId: z.string(),
              slots: z.array(
                z.object({
                  promille: z.number().gte(0).lte(100000),
                  durationMs: z.number().gte(0),
                }),
              ),
            }),
          ]),
        }),
      ),
      fallthrough: z.union([
        z.object({ type: z.unknown(), variantId: z.string() }),
        z.object({
          type: z.unknown(),
          base: z.object({ type: z.unknown(), kind: z.string(), attribute: z.string() }),
          weights: z.record(z.string(), z.number()),
          defaultVariantId: z.string(),
        }),
        z.object({
          type: z.unknown(),
          base: z.object({ type: z.unknown(), kind: z.string(), attribute: z.string() }),
          startTimestamp: z.number(),
          rollFromVariantId: z.string(),
          rollToVariantId: z.string(),
          defaultVariantId: z.string(),
          slots: z.array(
            z.object({ promille: z.number().gte(0).lte(100000), durationMs: z.number().gte(0) }),
          ),
        }),
      ]),
      revision: z.number().optional(),
    }),
  ),
  seed: z.number().gte(0).lte(100000).optional(),
  description: z.string().optional(),
  state: z.enum(["active", "archived"]).optional(),
  maintainerIds: z.array(z.string().max(24)).optional(),
  permanent: z.boolean().optional(),
  tags: z.array(z.string().max(64)).optional(),
});

export type PutV1ProjectsProjectIdOrNameFeatureFlagsFlagsBody = {
  slug: string;
  kind: "boolean" | "string" | "number" | "json";
  variants?:
    | Array<{
        id: string;
        label?: string | undefined;
        description?: string | undefined;
        value: string | number | boolean | Record<string, never> | Array<unknown> | string;
      }>
    | undefined;
  environments: Record<
    string,
    {
      active: boolean;
      reuse?: { active: boolean; environment: string } | undefined;
      targets?:
        | Record<
            string,
            Record<string, Record<string, Array<{ note?: string | undefined; value: string }>>>
          >
        | undefined;
      pausedOutcome: { type: unknown; variantId: string };
      rules: Array<{
        id: string;
        conditions: Array<{
          lhs: { type: unknown } | { type: unknown; kind: string; attribute: string };
          cmp:
            | "eq"
            | "!eq"
            | "oneOf"
            | "!oneOf"
            | "containsAllOf"
            | "containsAnyOf"
            | "containsNoneOf"
            | "startsWith"
            | "!startsWith"
            | "endsWith"
            | "!endsWith"
            | "contains"
            | "!contains"
            | "ex"
            | "!ex"
            | "gt"
            | "gte"
            | "lt"
            | "lte"
            | "regex"
            | "!regex"
            | "before"
            | "after";
          rhs?:
            | (
                | {
                    type: "list/inline" | "list";
                    items: Array<
                      | { label?: string | undefined; note?: string | undefined; value: number }
                      | { label?: string | undefined; note?: string | undefined; value: string }
                    >;
                  }
                | { type: unknown; pattern: string; flags: string }
                | string
                | number
                | boolean
              )
            | undefined;
          cmpOptions?: { ignoreCase?: boolean | undefined } | undefined;
        }>;
        outcome:
          | { type: unknown; variantId: string }
          | {
              type: unknown;
              base: { type: unknown; kind: string; attribute: string };
              weights: Record<string, number>;
              defaultVariantId: string;
            }
          | {
              type: unknown;
              base: { type: unknown; kind: string; attribute: string };
              startTimestamp: number;
              rollFromVariantId: string;
              rollToVariantId: string;
              defaultVariantId: string;
              slots: Array<{ promille: number; durationMs: number }>;
            };
      }>;
      fallthrough:
        | { type: unknown; variantId: string }
        | {
            type: unknown;
            base: { type: unknown; kind: string; attribute: string };
            weights: Record<string, number>;
            defaultVariantId: string;
          }
        | {
            type: unknown;
            base: { type: unknown; kind: string; attribute: string };
            startTimestamp: number;
            rollFromVariantId: string;
            rollToVariantId: string;
            defaultVariantId: string;
            slots: Array<{ promille: number; durationMs: number }>;
          };
      revision?: number | undefined;
    }
  >;
  seed?: number | undefined;
  description?: string | undefined;
  state?: ("active" | "archived") | undefined;
  maintainerIds?: Array<string> | undefined;
  permanent?: boolean | undefined;
  tags?: Array<string> | undefined;
};

export type PutV1ProjectsProjectIdOrNameFeatureFlagsFlagsResponse = {
  description?: string | undefined;
  variants: Array<Record<string, never>>;
  id: string;
  environments: Record<
    string,
    {
      reuse?: { active: boolean; environment: string } | undefined;
      targets?:
        | Record<
            string,
            Record<string, Record<string, Array<{ note?: string | undefined; value: string }>>>
          >
        | undefined;
      revision?: number | undefined;
      pausedOutcome: { type: "variant"; variantId: string };
      fallthrough:
        | { type: "variant"; variantId: string }
        | {
            type: "split";
            base: { type: "entity"; kind: string; attribute: string };
            weights: Record<string, number>;
            defaultVariantId: string;
          }
        | {
            type: "rollout";
            base: { type: "entity"; kind: string; attribute: string };
            defaultVariantId: string;
            startTimestamp: number;
            rollFromVariantId: string;
            rollToVariantId: string;
            slots: Array<{ promille: number; durationMs: number }>;
          }
        | { type: "experiment" };
      active: boolean;
      rules: Array<{
        id: string;
        outcome:
          | { type: "variant"; variantId: string }
          | {
              type: "split";
              base: { type: "entity"; kind: string; attribute: string };
              weights: Record<string, number>;
              defaultVariantId: string;
            }
          | {
              type: "rollout";
              base: { type: "entity"; kind: string; attribute: string };
              defaultVariantId: string;
              startTimestamp: number;
              rollFromVariantId: string;
              rollToVariantId: string;
              slots: Array<{ promille: number; durationMs: number }>;
            }
          | { type: "experiment" };
        conditions: Array<{
          rhs?:
            | (
                | string
                | number
                | {
                    type: "list" | "list/inline";
                    items: Array<
                      | { label?: string | undefined; note?: string | undefined; value: number }
                      | { label?: string | undefined; note?: string | undefined; value: string }
                    >;
                  }
                | { type: "regex"; pattern: string; flags: string }
                | boolean
              )
            | undefined;
          cmpOptions?: { ignoreCase?: boolean | undefined } | undefined;
          lhs: { type: "segment" } | { type: "entity"; kind: string; attribute: string };
          cmp:
            | "!contains"
            | "!endsWith"
            | "!eq"
            | "!ex"
            | "!oneOf"
            | "!regex"
            | "!startsWith"
            | "after"
            | "before"
            | "contains"
            | "containsAllOf"
            | "containsAnyOf"
            | "containsNoneOf"
            | "endsWith"
            | "eq"
            | "ex"
            | "gt"
            | "gte"
            | "lt"
            | "lte"
            | "oneOf"
            | "regex"
            | "startsWith";
        }>;
      }>;
    }
  >;
  kind: "boolean" | "json" | "number" | "string";
  revision: number;
  seed: number;
  state: "active" | "archived";
  maintainerIds?: Array<string> | undefined;
  permanent?: boolean | undefined;
  tags?: Array<string> | undefined;
  slug: string;
  createdAt: number;
  updatedAt: number;
  updatedBy?: string | undefined;
  createdBy: string;
  ownerId: string;
  projectId: string;
  typeName: "flag";
};

export type PutV1ProjectsProjectIdOrNameFeatureFlagsFlagsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { projectIdOrName: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PutV1ProjectsProjectIdOrNameFeatureFlagsFlagsBody;
};

export type PutV1ProjectsProjectIdOrNameFeatureFlagsFlagsHandler = (
  input: PutV1ProjectsProjectIdOrNameFeatureFlagsFlagsInput,
) => Promise<PutV1ProjectsProjectIdOrNameFeatureFlagsFlagsResponse>;

export type GetV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlugInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { projectIdOrName: string; flagIdOrSlug: string };
  query: {
    ifMatch?: string | undefined;
    withMetadata?: boolean | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlugHandler = (
  input: GetV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlugInput,
) => Promise<Flag>;

export const patchV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlugBody = z.object({
  createdBy: z.string().optional(),
  message: z.string().optional(),
  variants: z
    .array(
      z.object({
        id: z.string(),
        label: z.string().optional(),
        description: z.string().optional(),
        value: z.union([
          z.string(),
          z.number(),
          z.boolean(),
          z.object({}),
          z.array(z.unknown()),
          z.string(),
        ]),
      }),
    )
    .optional(),
  environments: z
    .record(
      z.string(),
      z.object({
        active: z.boolean(),
        reuse: z.object({ active: z.boolean(), environment: z.string() }).optional(),
        targets: z
          .record(
            z.string(),
            z.record(
              z.string(),
              z.record(
                z.string(),
                z.array(z.object({ note: z.string().optional(), value: z.string() })),
              ),
            ),
          )
          .optional(),
        pausedOutcome: z.object({ type: z.unknown(), variantId: z.string() }),
        rules: z.array(
          z.object({
            id: z.string(),
            conditions: z.array(
              z.object({
                lhs: z.union([
                  z.object({ type: z.unknown() }),
                  z.object({ type: z.unknown(), kind: z.string(), attribute: z.string() }),
                ]),
                cmp: z.enum([
                  "eq",
                  "!eq",
                  "oneOf",
                  "!oneOf",
                  "containsAllOf",
                  "containsAnyOf",
                  "containsNoneOf",
                  "startsWith",
                  "!startsWith",
                  "endsWith",
                  "!endsWith",
                  "contains",
                  "!contains",
                  "ex",
                  "!ex",
                  "gt",
                  "gte",
                  "lt",
                  "lte",
                  "regex",
                  "!regex",
                  "before",
                  "after",
                ]),
                rhs: z
                  .union([
                    z.object({
                      type: z.enum(["list/inline", "list"]),
                      items: z.array(
                        z.union([
                          z.object({
                            label: z.string().optional(),
                            note: z.string().optional(),
                            value: z.number(),
                          }),
                          z.object({
                            label: z.string().optional(),
                            note: z.string().optional(),
                            value: z.string(),
                          }),
                        ]),
                      ),
                    }),
                    z.object({ type: z.unknown(), pattern: z.string(), flags: z.string() }),
                    z.string(),
                    z.number(),
                    z.boolean(),
                  ])
                  .optional(),
                cmpOptions: z.object({ ignoreCase: z.boolean().optional() }).optional(),
              }),
            ),
            outcome: z.union([
              z.object({ type: z.unknown(), variantId: z.string() }),
              z.object({
                type: z.unknown(),
                base: z.object({ type: z.unknown(), kind: z.string(), attribute: z.string() }),
                weights: z.record(z.string(), z.number()),
                defaultVariantId: z.string(),
              }),
              z.object({
                type: z.unknown(),
                base: z.object({ type: z.unknown(), kind: z.string(), attribute: z.string() }),
                startTimestamp: z.number(),
                rollFromVariantId: z.string(),
                rollToVariantId: z.string(),
                defaultVariantId: z.string(),
                slots: z.array(
                  z.object({
                    promille: z.number().gte(0).lte(100000),
                    durationMs: z.number().gte(0),
                  }),
                ),
              }),
            ]),
          }),
        ),
        fallthrough: z.union([
          z.object({ type: z.unknown(), variantId: z.string() }),
          z.object({
            type: z.unknown(),
            base: z.object({ type: z.unknown(), kind: z.string(), attribute: z.string() }),
            weights: z.record(z.string(), z.number()),
            defaultVariantId: z.string(),
          }),
          z.object({
            type: z.unknown(),
            base: z.object({ type: z.unknown(), kind: z.string(), attribute: z.string() }),
            startTimestamp: z.number(),
            rollFromVariantId: z.string(),
            rollToVariantId: z.string(),
            defaultVariantId: z.string(),
            slots: z.array(
              z.object({ promille: z.number().gte(0).lte(100000), durationMs: z.number().gte(0) }),
            ),
          }),
        ]),
        revision: z.number().optional(),
      }),
    )
    .optional(),
  seed: z.number().gte(0).lte(100000).optional(),
  description: z.string().optional(),
  state: z.enum(["active", "archived"]).optional(),
  maintainerIds: z.array(z.string().max(24)).optional(),
  permanent: z.boolean().optional(),
  tags: z.array(z.string().max(64)).optional(),
});

export type PatchV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlugBody = {
  createdBy?: string | undefined;
  message?: string | undefined;
  variants?:
    | Array<{
        id: string;
        label?: string | undefined;
        description?: string | undefined;
        value: string | number | boolean | Record<string, never> | Array<unknown> | string;
      }>
    | undefined;
  environments?:
    | Record<
        string,
        {
          active: boolean;
          reuse?: { active: boolean; environment: string } | undefined;
          targets?:
            | Record<
                string,
                Record<string, Record<string, Array<{ note?: string | undefined; value: string }>>>
              >
            | undefined;
          pausedOutcome: { type: unknown; variantId: string };
          rules: Array<{
            id: string;
            conditions: Array<{
              lhs: { type: unknown } | { type: unknown; kind: string; attribute: string };
              cmp:
                | "eq"
                | "!eq"
                | "oneOf"
                | "!oneOf"
                | "containsAllOf"
                | "containsAnyOf"
                | "containsNoneOf"
                | "startsWith"
                | "!startsWith"
                | "endsWith"
                | "!endsWith"
                | "contains"
                | "!contains"
                | "ex"
                | "!ex"
                | "gt"
                | "gte"
                | "lt"
                | "lte"
                | "regex"
                | "!regex"
                | "before"
                | "after";
              rhs?:
                | (
                    | {
                        type: "list/inline" | "list";
                        items: Array<
                          | { label?: string | undefined; note?: string | undefined; value: number }
                          | { label?: string | undefined; note?: string | undefined; value: string }
                        >;
                      }
                    | { type: unknown; pattern: string; flags: string }
                    | string
                    | number
                    | boolean
                  )
                | undefined;
              cmpOptions?: { ignoreCase?: boolean | undefined } | undefined;
            }>;
            outcome:
              | { type: unknown; variantId: string }
              | {
                  type: unknown;
                  base: { type: unknown; kind: string; attribute: string };
                  weights: Record<string, number>;
                  defaultVariantId: string;
                }
              | {
                  type: unknown;
                  base: { type: unknown; kind: string; attribute: string };
                  startTimestamp: number;
                  rollFromVariantId: string;
                  rollToVariantId: string;
                  defaultVariantId: string;
                  slots: Array<{ promille: number; durationMs: number }>;
                };
          }>;
          fallthrough:
            | { type: unknown; variantId: string }
            | {
                type: unknown;
                base: { type: unknown; kind: string; attribute: string };
                weights: Record<string, number>;
                defaultVariantId: string;
              }
            | {
                type: unknown;
                base: { type: unknown; kind: string; attribute: string };
                startTimestamp: number;
                rollFromVariantId: string;
                rollToVariantId: string;
                defaultVariantId: string;
                slots: Array<{ promille: number; durationMs: number }>;
              };
          revision?: number | undefined;
        }
      >
    | undefined;
  seed?: number | undefined;
  description?: string | undefined;
  state?: ("active" | "archived") | undefined;
  maintainerIds?: Array<string> | undefined;
  permanent?: boolean | undefined;
  tags?: Array<string> | undefined;
};

export type PatchV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlugResponse =
  | {
      description?: string | undefined;
      variants: Array<Record<string, never>>;
      id: string;
      environments: Record<
        string,
        {
          reuse?: { active: boolean; environment: string } | undefined;
          targets?:
            | Record<
                string,
                Record<string, Record<string, Array<{ note?: string | undefined; value: string }>>>
              >
            | undefined;
          revision?: number | undefined;
          pausedOutcome: { type: "variant"; variantId: string };
          fallthrough:
            | { type: "variant"; variantId: string }
            | {
                type: "split";
                base: { type: "entity"; kind: string; attribute: string };
                weights: Record<string, number>;
                defaultVariantId: string;
              }
            | {
                type: "rollout";
                base: { type: "entity"; kind: string; attribute: string };
                defaultVariantId: string;
                startTimestamp: number;
                rollFromVariantId: string;
                rollToVariantId: string;
                slots: Array<{ promille: number; durationMs: number }>;
              }
            | { type: "experiment" };
          active: boolean;
          rules: Array<{
            id: string;
            outcome:
              | { type: "variant"; variantId: string }
              | {
                  type: "split";
                  base: { type: "entity"; kind: string; attribute: string };
                  weights: Record<string, number>;
                  defaultVariantId: string;
                }
              | {
                  type: "rollout";
                  base: { type: "entity"; kind: string; attribute: string };
                  defaultVariantId: string;
                  startTimestamp: number;
                  rollFromVariantId: string;
                  rollToVariantId: string;
                  slots: Array<{ promille: number; durationMs: number }>;
                }
              | { type: "experiment" };
            conditions: Array<{
              rhs?:
                | (
                    | string
                    | number
                    | {
                        type: "list" | "list/inline";
                        items: Array<
                          | { label?: string | undefined; note?: string | undefined; value: number }
                          | { label?: string | undefined; note?: string | undefined; value: string }
                        >;
                      }
                    | { type: "regex"; pattern: string; flags: string }
                    | boolean
                  )
                | undefined;
              cmpOptions?: { ignoreCase?: boolean | undefined } | undefined;
              lhs: { type: "segment" } | { type: "entity"; kind: string; attribute: string };
              cmp:
                | "!contains"
                | "!endsWith"
                | "!eq"
                | "!ex"
                | "!oneOf"
                | "!regex"
                | "!startsWith"
                | "after"
                | "before"
                | "contains"
                | "containsAllOf"
                | "containsAnyOf"
                | "containsNoneOf"
                | "endsWith"
                | "eq"
                | "ex"
                | "gt"
                | "gte"
                | "lt"
                | "lte"
                | "oneOf"
                | "regex"
                | "startsWith";
            }>;
          }>;
        }
      >;
      kind: "boolean" | "json" | "number" | "string";
      revision: number;
      seed: number;
      state: "active" | "archived";
      maintainerIds?: Array<string> | undefined;
      permanent?: boolean | undefined;
      tags?: Array<string> | undefined;
      slug: string;
      createdAt: number;
      updatedAt: number;
      updatedBy?: string | undefined;
      createdBy: string;
      ownerId: string;
      projectId: string;
      typeName: "flag";
    }
  | Flag;

export type PatchV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlugInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { projectIdOrName: string; flagIdOrSlug: string };
  query: {
    ifMatch?: string | undefined;
    withMetadata?: boolean | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
  body: PatchV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlugBody;
};

export type PatchV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlugHandler = (
  input: PatchV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlugInput,
) => Promise<PatchV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlugResponse>;

export type DeleteV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlugInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { projectIdOrName: string; flagIdOrSlug: string };
  query: {
    ifMatch?: string | undefined;
    withMetadata?: boolean | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type DeleteV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlugHandler = (
  input: DeleteV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlugInput,
) => Promise<void>;

export type GetV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlugVersionsResponse = {
  versions: Array<{
    id: string;
    revision: number;
    createdAt: number;
    createdBy?: string | undefined;
    message?: string | undefined;
    flagId: string;
    changedEnvironments: Array<string>;
    data: {
      description?: string | undefined;
      variants: Array<Record<string, never>>;
      environments: Record<
        string,
        {
          reuse?: { active: boolean; environment: string } | undefined;
          targets?:
            | Record<
                string,
                Record<string, Record<string, Array<{ note?: string | undefined; value: string }>>>
              >
            | undefined;
          revision?: number | undefined;
          pausedOutcome: { type: "variant"; variantId: string };
          fallthrough:
            | { type: "variant"; variantId: string }
            | {
                type: "split";
                base: { type: "entity"; kind: string; attribute: string };
                weights: Record<string, number>;
                defaultVariantId: string;
              }
            | {
                type: "rollout";
                base: { type: "entity"; kind: string; attribute: string };
                defaultVariantId: string;
                startTimestamp: number;
                rollFromVariantId: string;
                rollToVariantId: string;
                slots: Array<{ promille: number; durationMs: number }>;
              }
            | { type: "experiment" };
          active: boolean;
          rules: Array<{
            id: string;
            outcome:
              | { type: "variant"; variantId: string }
              | {
                  type: "split";
                  base: { type: "entity"; kind: string; attribute: string };
                  weights: Record<string, number>;
                  defaultVariantId: string;
                }
              | {
                  type: "rollout";
                  base: { type: "entity"; kind: string; attribute: string };
                  defaultVariantId: string;
                  startTimestamp: number;
                  rollFromVariantId: string;
                  rollToVariantId: string;
                  slots: Array<{ promille: number; durationMs: number }>;
                }
              | { type: "experiment" };
            conditions: Array<{
              rhs?:
                | (
                    | string
                    | number
                    | {
                        type: "list" | "list/inline";
                        items: Array<
                          | { label?: string | undefined; note?: string | undefined; value: number }
                          | { label?: string | undefined; note?: string | undefined; value: string }
                        >;
                      }
                    | { type: "regex"; pattern: string; flags: string }
                    | boolean
                  )
                | undefined;
              cmpOptions?: { ignoreCase?: boolean | undefined } | undefined;
              lhs: { type: "segment" } | { type: "entity"; kind: string; attribute: string };
              cmp:
                | "!contains"
                | "!endsWith"
                | "!eq"
                | "!ex"
                | "!oneOf"
                | "!regex"
                | "!startsWith"
                | "after"
                | "before"
                | "contains"
                | "containsAllOf"
                | "containsAnyOf"
                | "containsNoneOf"
                | "endsWith"
                | "eq"
                | "ex"
                | "gt"
                | "gte"
                | "lt"
                | "lte"
                | "oneOf"
                | "regex"
                | "startsWith";
            }>;
          }>;
        }
      >;
      seed: number;
      state: "active" | "archived";
      maintainerIds?: Array<string> | undefined;
      permanent?: boolean | undefined;
      tags?: Array<string> | undefined;
    };
    metadata?: { creator?: { id: string; name: string } | undefined } | undefined;
  }>;
  pagination: Record<string, never>;
};

export type GetV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlugVersionsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { projectIdOrName: string; flagIdOrSlug: string };
  query: {
    limit?: number | undefined;
    cursor?: string | undefined;
    environment?: string | undefined;
    withMetadata?: boolean | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlugVersionsHandler = (
  input: GetV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlugVersionsInput,
) => Promise<GetV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlugVersionsResponse>;

export type GetV1ProjectsProjectIdOrNameFeatureFlagsSettingsResponse = {
  typeName: "settings";
  projectId: string;
  ownerId?: string | undefined;
  enabled: boolean;
  environments: Array<string>;
  entities: Array<{
    kind: string;
    label: string;
    attributes: Array<{
      key: string;
      type: string;
      labels?: Array<{ label: string; value: string }> | undefined;
    }>;
  }>;
  createdAt?: number | undefined;
  updatedAt?: number | undefined;
  metadata: {
    activeFlagCount: number;
    archivedFlagCount: number;
    segmentCount: number;
    packSizeInBytes: number;
    packRevision?: number | undefined;
    configUpdatedAt?: number | undefined;
  };
};

export type GetV1ProjectsProjectIdOrNameFeatureFlagsSettingsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { projectIdOrName: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV1ProjectsProjectIdOrNameFeatureFlagsSettingsHandler = (
  input: GetV1ProjectsProjectIdOrNameFeatureFlagsSettingsInput,
) => Promise<GetV1ProjectsProjectIdOrNameFeatureFlagsSettingsResponse>;

export const patchV1ProjectsProjectIdOrNameFeatureFlagsSettingsBody = z.object({
  enabled: z.boolean().optional(),
  entities: z
    .array(
      z.object({
        kind: z.string().max(128),
        label: z.string().max(128),
        attributes: z.array(
          z.object({
            key: z.string().max(128),
            type: z.string().max(128),
            labels: z
              .array(z.object({ label: z.string().max(128), value: z.string().max(128) }))
              .optional(),
          }),
        ),
      }),
    )
    .optional(),
  environments: z.array(z.string()).optional(),
});

export type PatchV1ProjectsProjectIdOrNameFeatureFlagsSettingsBody = {
  enabled?: boolean | undefined;
  entities?:
    | Array<{
        kind: string;
        label: string;
        attributes: Array<{
          key: string;
          type: string;
          labels?: Array<{ label: string; value: string }> | undefined;
        }>;
      }>
    | undefined;
  environments?: Array<string> | undefined;
};

export type PatchV1ProjectsProjectIdOrNameFeatureFlagsSettingsResponse = {
  typeName: "settings";
  projectId: string;
  ownerId?: string | undefined;
  enabled: boolean;
  environments: Array<string>;
  entities: Array<{
    kind: string;
    label: string;
    attributes: Array<{
      key: string;
      type: string;
      labels?: Array<{ label: string; value: string }> | undefined;
    }>;
  }>;
  createdAt?: number | undefined;
  updatedAt?: number | undefined;
  metadata: {
    activeFlagCount: number;
    archivedFlagCount: number;
    segmentCount: number;
    packSizeInBytes: number;
    packRevision?: number | undefined;
    configUpdatedAt?: number | undefined;
  };
};

export type PatchV1ProjectsProjectIdOrNameFeatureFlagsSettingsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { projectIdOrName: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PatchV1ProjectsProjectIdOrNameFeatureFlagsSettingsBody;
};

export type PatchV1ProjectsProjectIdOrNameFeatureFlagsSettingsHandler = (
  input: PatchV1ProjectsProjectIdOrNameFeatureFlagsSettingsInput,
) => Promise<PatchV1ProjectsProjectIdOrNameFeatureFlagsSettingsResponse>;

export const putV1ProjectsProjectIdOrNameFeatureFlagsSegmentsBody = z.object({
  slug: z.string(),
  createdBy: z.string().optional(),
  label: z.string(),
  description: z.string().optional(),
  data: z.object({
    rules: z
      .array(
        z.object({
          id: z.string(),
          conditions: z.array(
            z.object({
              lhs: z.union([
                z.object({ type: z.unknown() }),
                z.object({ type: z.unknown(), kind: z.string(), attribute: z.string() }),
              ]),
              cmp: z.enum([
                "eq",
                "!eq",
                "oneOf",
                "!oneOf",
                "containsAllOf",
                "containsAnyOf",
                "containsNoneOf",
                "startsWith",
                "!startsWith",
                "endsWith",
                "!endsWith",
                "contains",
                "!contains",
                "ex",
                "!ex",
                "gt",
                "gte",
                "lt",
                "lte",
                "regex",
                "!regex",
                "before",
                "after",
              ]),
              rhs: z
                .union([
                  z.object({
                    type: z.enum(["list/inline", "list"]),
                    items: z.array(
                      z.union([
                        z.object({
                          label: z.string().optional(),
                          note: z.string().optional(),
                          value: z.number(),
                        }),
                        z.object({
                          label: z.string().optional(),
                          note: z.string().optional(),
                          value: z.string(),
                        }),
                      ]),
                    ),
                  }),
                  z.object({ type: z.unknown(), pattern: z.string(), flags: z.string() }),
                  z.string(),
                  z.number(),
                  z.boolean(),
                ])
                .optional(),
              cmpOptions: z.object({ ignoreCase: z.boolean().optional() }).optional(),
            }),
          ),
          outcome: z.union([
            z.object({ type: z.unknown() }),
            z.object({
              type: z.unknown(),
              base: z.object({ type: z.unknown(), kind: z.string(), attribute: z.string() }),
              passPromille: z.number(),
            }),
          ]),
        }),
      )
      .optional(),
    include: z
      .record(
        z.string(),
        z.record(z.string(), z.array(z.object({ note: z.string().optional(), value: z.string() }))),
      )
      .optional(),
    exclude: z
      .record(
        z.string(),
        z.record(z.string(), z.array(z.object({ note: z.string().optional(), value: z.string() }))),
      )
      .optional(),
  }),
  hint: z.string(),
});

export type PutV1ProjectsProjectIdOrNameFeatureFlagsSegmentsBody = {
  slug: string;
  createdBy?: string | undefined;
  label: string;
  description?: string | undefined;
  data: {
    rules?:
      | Array<{
          id: string;
          conditions: Array<{
            lhs: { type: unknown } | { type: unknown; kind: string; attribute: string };
            cmp:
              | "eq"
              | "!eq"
              | "oneOf"
              | "!oneOf"
              | "containsAllOf"
              | "containsAnyOf"
              | "containsNoneOf"
              | "startsWith"
              | "!startsWith"
              | "endsWith"
              | "!endsWith"
              | "contains"
              | "!contains"
              | "ex"
              | "!ex"
              | "gt"
              | "gte"
              | "lt"
              | "lte"
              | "regex"
              | "!regex"
              | "before"
              | "after";
            rhs?:
              | (
                  | {
                      type: "list/inline" | "list";
                      items: Array<
                        | { label?: string | undefined; note?: string | undefined; value: number }
                        | { label?: string | undefined; note?: string | undefined; value: string }
                      >;
                    }
                  | { type: unknown; pattern: string; flags: string }
                  | string
                  | number
                  | boolean
                )
              | undefined;
            cmpOptions?: { ignoreCase?: boolean | undefined } | undefined;
          }>;
          outcome:
            | { type: unknown }
            | {
                type: unknown;
                base: { type: unknown; kind: string; attribute: string };
                passPromille: number;
              };
        }>
      | undefined;
    include?:
      | Record<string, Record<string, Array<{ note?: string | undefined; value: string }>>>
      | undefined;
    exclude?:
      | Record<string, Record<string, Array<{ note?: string | undefined; value: string }>>>
      | undefined;
  };
  hint: string;
};

export type PutV1ProjectsProjectIdOrNameFeatureFlagsSegmentsResponse = {
  description?: string | undefined;
  createdBy?: string | undefined;
  usedByFlags?: Array<string> | undefined;
  usedBySegments?: Array<string> | undefined;
  data: {
    rules?:
      | Array<{
          id: string;
          outcome:
            | { type: "all" }
            | {
                type: "split";
                base: { type: "entity"; kind: string; attribute: string };
                passPromille: number;
              };
          conditions: Array<{
            rhs?:
              | (
                  | string
                  | number
                  | {
                      type: "list" | "list/inline";
                      items: Array<
                        | { label?: string | undefined; note?: string | undefined; value: number }
                        | { label?: string | undefined; note?: string | undefined; value: string }
                      >;
                    }
                  | { type: "regex"; pattern: string; flags: string }
                  | boolean
                )
              | undefined;
            cmpOptions?: { ignoreCase?: boolean | undefined } | undefined;
            lhs: { type: "segment" } | { type: "entity"; kind: string; attribute: string };
            cmp:
              | "!contains"
              | "!endsWith"
              | "!eq"
              | "!ex"
              | "!oneOf"
              | "!regex"
              | "!startsWith"
              | "after"
              | "before"
              | "contains"
              | "containsAllOf"
              | "containsAnyOf"
              | "containsNoneOf"
              | "endsWith"
              | "eq"
              | "ex"
              | "gt"
              | "gte"
              | "lt"
              | "lte"
              | "oneOf"
              | "regex"
              | "startsWith";
          }>;
        }>
      | undefined;
    include?:
      | Record<string, Record<string, Array<{ note?: string | undefined; value: string }>>>
      | undefined;
    exclude?:
      | Record<string, Record<string, Array<{ note?: string | undefined; value: string }>>>
      | undefined;
  };
  id: string;
  label: string;
  slug: string;
  createdAt: number;
  updatedAt: number;
  projectId: string;
  typeName: "segment";
  hint: string;
};

export type PutV1ProjectsProjectIdOrNameFeatureFlagsSegmentsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { projectIdOrName: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PutV1ProjectsProjectIdOrNameFeatureFlagsSegmentsBody;
};

export type PutV1ProjectsProjectIdOrNameFeatureFlagsSegmentsHandler = (
  input: PutV1ProjectsProjectIdOrNameFeatureFlagsSegmentsInput,
) => Promise<PutV1ProjectsProjectIdOrNameFeatureFlagsSegmentsResponse>;

export type GetV1ProjectsProjectIdOrNameFeatureFlagsSegmentsResponse = { data: Array<Segment> };

export type GetV1ProjectsProjectIdOrNameFeatureFlagsSegmentsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { projectIdOrName: string };
  query: {
    withMetadata?: boolean | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV1ProjectsProjectIdOrNameFeatureFlagsSegmentsHandler = (
  input: GetV1ProjectsProjectIdOrNameFeatureFlagsSegmentsInput,
) => Promise<GetV1ProjectsProjectIdOrNameFeatureFlagsSegmentsResponse>;

export type GetV1ProjectsProjectIdOrNameFeatureFlagsSegmentsSegmentIdOrSlugInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { projectIdOrName: string; segmentIdOrSlug: string };
  query: {
    withMetadata?: boolean | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV1ProjectsProjectIdOrNameFeatureFlagsSegmentsSegmentIdOrSlugHandler = (
  input: GetV1ProjectsProjectIdOrNameFeatureFlagsSegmentsSegmentIdOrSlugInput,
) => Promise<Segment>;

export type DeleteV1ProjectsProjectIdOrNameFeatureFlagsSegmentsSegmentIdOrSlugInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { projectIdOrName: string; segmentIdOrSlug: string };
  query: {
    withMetadata?: boolean | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type DeleteV1ProjectsProjectIdOrNameFeatureFlagsSegmentsSegmentIdOrSlugHandler = (
  input: DeleteV1ProjectsProjectIdOrNameFeatureFlagsSegmentsSegmentIdOrSlugInput,
) => Promise<void>;

export const patchV1ProjectsProjectIdOrNameFeatureFlagsSegmentsSegmentIdOrSlugBody = z.object({
  operations: z
    .array(
      z.object({
        action: z.enum(["add", "remove"]),
        field: z.enum(["include", "exclude"]),
        entity: z.string(),
        attribute: z.string(),
        value: z.object({ note: z.string().optional(), value: z.string() }),
      }),
    )
    .optional(),
  label: z.string().optional(),
  description: z.string().optional(),
  data: z
    .object({
      rules: z
        .array(
          z.object({
            id: z.string(),
            conditions: z.array(
              z.object({
                lhs: z.union([
                  z.object({ type: z.unknown() }),
                  z.object({ type: z.unknown(), kind: z.string(), attribute: z.string() }),
                ]),
                cmp: z.enum([
                  "eq",
                  "!eq",
                  "oneOf",
                  "!oneOf",
                  "containsAllOf",
                  "containsAnyOf",
                  "containsNoneOf",
                  "startsWith",
                  "!startsWith",
                  "endsWith",
                  "!endsWith",
                  "contains",
                  "!contains",
                  "ex",
                  "!ex",
                  "gt",
                  "gte",
                  "lt",
                  "lte",
                  "regex",
                  "!regex",
                  "before",
                  "after",
                ]),
                rhs: z
                  .union([
                    z.object({
                      type: z.enum(["list/inline", "list"]),
                      items: z.array(
                        z.union([
                          z.object({
                            label: z.string().optional(),
                            note: z.string().optional(),
                            value: z.number(),
                          }),
                          z.object({
                            label: z.string().optional(),
                            note: z.string().optional(),
                            value: z.string(),
                          }),
                        ]),
                      ),
                    }),
                    z.object({ type: z.unknown(), pattern: z.string(), flags: z.string() }),
                    z.string(),
                    z.number(),
                    z.boolean(),
                  ])
                  .optional(),
                cmpOptions: z.object({ ignoreCase: z.boolean().optional() }).optional(),
              }),
            ),
            outcome: z.union([
              z.object({ type: z.unknown() }),
              z.object({
                type: z.unknown(),
                base: z.object({ type: z.unknown(), kind: z.string(), attribute: z.string() }),
                passPromille: z.number(),
              }),
            ]),
          }),
        )
        .optional(),
      include: z
        .record(
          z.string(),
          z.record(
            z.string(),
            z.array(z.object({ note: z.string().optional(), value: z.string() })),
          ),
        )
        .optional(),
      exclude: z
        .record(
          z.string(),
          z.record(
            z.string(),
            z.array(z.object({ note: z.string().optional(), value: z.string() })),
          ),
        )
        .optional(),
    })
    .optional(),
  hint: z.string().optional(),
});

export type PatchV1ProjectsProjectIdOrNameFeatureFlagsSegmentsSegmentIdOrSlugBody = {
  operations?:
    | Array<{
        action: "add" | "remove";
        field: "include" | "exclude";
        entity: string;
        attribute: string;
        value: { note?: string | undefined; value: string };
      }>
    | undefined;
  label?: string | undefined;
  description?: string | undefined;
  data?:
    | {
        rules?:
          | Array<{
              id: string;
              conditions: Array<{
                lhs: { type: unknown } | { type: unknown; kind: string; attribute: string };
                cmp:
                  | "eq"
                  | "!eq"
                  | "oneOf"
                  | "!oneOf"
                  | "containsAllOf"
                  | "containsAnyOf"
                  | "containsNoneOf"
                  | "startsWith"
                  | "!startsWith"
                  | "endsWith"
                  | "!endsWith"
                  | "contains"
                  | "!contains"
                  | "ex"
                  | "!ex"
                  | "gt"
                  | "gte"
                  | "lt"
                  | "lte"
                  | "regex"
                  | "!regex"
                  | "before"
                  | "after";
                rhs?:
                  | (
                      | {
                          type: "list/inline" | "list";
                          items: Array<
                            | {
                                label?: string | undefined;
                                note?: string | undefined;
                                value: number;
                              }
                            | {
                                label?: string | undefined;
                                note?: string | undefined;
                                value: string;
                              }
                          >;
                        }
                      | { type: unknown; pattern: string; flags: string }
                      | string
                      | number
                      | boolean
                    )
                  | undefined;
                cmpOptions?: { ignoreCase?: boolean | undefined } | undefined;
              }>;
              outcome:
                | { type: unknown }
                | {
                    type: unknown;
                    base: { type: unknown; kind: string; attribute: string };
                    passPromille: number;
                  };
            }>
          | undefined;
        include?:
          | Record<string, Record<string, Array<{ note?: string | undefined; value: string }>>>
          | undefined;
        exclude?:
          | Record<string, Record<string, Array<{ note?: string | undefined; value: string }>>>
          | undefined;
      }
    | undefined;
  hint?: string | undefined;
};

export type PatchV1ProjectsProjectIdOrNameFeatureFlagsSegmentsSegmentIdOrSlugResponse =
  | {
      description?: string | undefined;
      createdBy?: string | undefined;
      usedByFlags?: Array<string> | undefined;
      usedBySegments?: Array<string> | undefined;
      data: {
        rules?:
          | Array<{
              id: string;
              outcome:
                | { type: "all" }
                | {
                    type: "split";
                    base: { type: "entity"; kind: string; attribute: string };
                    passPromille: number;
                  };
              conditions: Array<{
                rhs?:
                  | (
                      | string
                      | number
                      | {
                          type: "list" | "list/inline";
                          items: Array<
                            | {
                                label?: string | undefined;
                                note?: string | undefined;
                                value: number;
                              }
                            | {
                                label?: string | undefined;
                                note?: string | undefined;
                                value: string;
                              }
                          >;
                        }
                      | { type: "regex"; pattern: string; flags: string }
                      | boolean
                    )
                  | undefined;
                cmpOptions?: { ignoreCase?: boolean | undefined } | undefined;
                lhs: { type: "segment" } | { type: "entity"; kind: string; attribute: string };
                cmp:
                  | "!contains"
                  | "!endsWith"
                  | "!eq"
                  | "!ex"
                  | "!oneOf"
                  | "!regex"
                  | "!startsWith"
                  | "after"
                  | "before"
                  | "contains"
                  | "containsAllOf"
                  | "containsAnyOf"
                  | "containsNoneOf"
                  | "endsWith"
                  | "eq"
                  | "ex"
                  | "gt"
                  | "gte"
                  | "lt"
                  | "lte"
                  | "oneOf"
                  | "regex"
                  | "startsWith";
              }>;
            }>
          | undefined;
        include?:
          | Record<string, Record<string, Array<{ note?: string | undefined; value: string }>>>
          | undefined;
        exclude?:
          | Record<string, Record<string, Array<{ note?: string | undefined; value: string }>>>
          | undefined;
      };
      id: string;
      label: string;
      slug: string;
      createdAt: number;
      updatedAt: number;
      projectId: string;
      typeName: "segment";
      hint: string;
    }
  | Segment;

export type PatchV1ProjectsProjectIdOrNameFeatureFlagsSegmentsSegmentIdOrSlugInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { projectIdOrName: string; segmentIdOrSlug: string };
  query: {
    withMetadata?: boolean | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
  body: PatchV1ProjectsProjectIdOrNameFeatureFlagsSegmentsSegmentIdOrSlugBody;
};

export type PatchV1ProjectsProjectIdOrNameFeatureFlagsSegmentsSegmentIdOrSlugHandler = (
  input: PatchV1ProjectsProjectIdOrNameFeatureFlagsSegmentsSegmentIdOrSlugInput,
) => Promise<PatchV1ProjectsProjectIdOrNameFeatureFlagsSegmentsSegmentIdOrSlugResponse>;

export type GetV1ProjectsProjectIdOrNameFeatureFlagsSdkKeysResponse = {
  data: Array<{
    hashKey: string;
    projectId: string;
    type: "client" | "mobile" | "server";
    environment: string;
    createdBy: string;
    createdAt: number;
    updatedAt: number;
    label?: string | undefined;
    deletedAt?: number | undefined;
    partialKeyValue: string;
  }>;
};

export type GetV1ProjectsProjectIdOrNameFeatureFlagsSdkKeysInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { projectIdOrName: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV1ProjectsProjectIdOrNameFeatureFlagsSdkKeysHandler = (
  input: GetV1ProjectsProjectIdOrNameFeatureFlagsSdkKeysInput,
) => Promise<GetV1ProjectsProjectIdOrNameFeatureFlagsSdkKeysResponse>;

export const putV1ProjectsProjectIdOrNameFeatureFlagsSdkKeysBody = z.object({
  sdkKeyType: z.enum(["server", "mobile", "client"]),
  environment: z.string(),
  label: z.string().optional(),
});

export type PutV1ProjectsProjectIdOrNameFeatureFlagsSdkKeysBody = {
  sdkKeyType: "server" | "mobile" | "client";
  environment: string;
  label?: string | undefined;
};

export type PutV1ProjectsProjectIdOrNameFeatureFlagsSdkKeysInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { projectIdOrName: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PutV1ProjectsProjectIdOrNameFeatureFlagsSdkKeysBody;
};

export type PutV1ProjectsProjectIdOrNameFeatureFlagsSdkKeysHandler = (
  input: PutV1ProjectsProjectIdOrNameFeatureFlagsSdkKeysInput,
) => Promise<FlagsSdkKeyWithSecrets>;

export type DeleteV1ProjectsProjectIdOrNameFeatureFlagsSdkKeysHashKeyInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { projectIdOrName: string; hashKey: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type DeleteV1ProjectsProjectIdOrNameFeatureFlagsSdkKeysHashKeyHandler = (
  input: DeleteV1ProjectsProjectIdOrNameFeatureFlagsSdkKeysHashKeyInput,
) => Promise<void>;

export type GetV1ProjectsProjectIdDeploymentsDeploymentIdRuntimeLogsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { projectId: string; deploymentId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV1ProjectsProjectIdDeploymentsDeploymentIdRuntimeLogsHandler = (
  input: GetV1ProjectsProjectIdDeploymentsDeploymentIdRuntimeLogsInput,
) => Promise<void>;

export type GetV1ProjectsIdOrNameMembersResponse =
  | Record<string, never>
  | {
      members: Array<{
        avatar?: string | undefined;
        email: string;
        role: "ADMIN" | "PROJECT_DEVELOPER" | "PROJECT_GUEST" | "PROJECT_VIEWER";
        computedProjectRole: "ADMIN" | "PROJECT_DEVELOPER" | "PROJECT_GUEST" | "PROJECT_VIEWER";
        uid: string;
        username: string;
        name?: string | undefined;
        createdAt: number;
        teamRole:
          | "BILLING"
          | "CONTRIBUTOR"
          | "DEVELOPER"
          | "MEMBER"
          | "OWNER"
          | "SECURITY"
          | "VIEWER"
          | "VIEWER_FOR_PLUS";
      }>;
      pagination: { hasNext: boolean; count: number; next: number | null; prev: number | null };
    };

export type GetV1ProjectsIdOrNameMembersInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string };
  query: {
    limit?: number | undefined;
    since?: number | undefined;
    until?: number | undefined;
    search?: string | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV1ProjectsIdOrNameMembersHandler = (
  input: GetV1ProjectsIdOrNameMembersInput,
) => Promise<GetV1ProjectsIdOrNameMembersResponse>;

export const postV1ProjectsIdOrNameMembersBody = z.union([
  z.object({
    uid: z.string().max(256),
    username: z.string().max(256).optional(),
    email: z.string().optional(),
    role: z.enum(["ADMIN", "PROJECT_VIEWER", "PROJECT_DEVELOPER"]),
  }),
  z.object({
    uid: z.string().max(256).optional(),
    username: z.string().max(256),
    email: z.string().optional(),
    role: z.enum(["ADMIN", "PROJECT_VIEWER", "PROJECT_DEVELOPER"]),
  }),
  z.object({
    uid: z.string().max(256).optional(),
    username: z.string().max(256).optional(),
    email: z.string(),
    role: z.enum(["ADMIN", "PROJECT_VIEWER", "PROJECT_DEVELOPER"]),
  }),
]);

export type PostV1ProjectsIdOrNameMembersBody =
  | {
      uid: string;
      username?: string | undefined;
      email?: string | undefined;
      role: "ADMIN" | "PROJECT_VIEWER" | "PROJECT_DEVELOPER";
    }
  | {
      uid?: string | undefined;
      username: string;
      email?: string | undefined;
      role: "ADMIN" | "PROJECT_VIEWER" | "PROJECT_DEVELOPER";
    }
  | {
      uid?: string | undefined;
      username?: string | undefined;
      email: string;
      role: "ADMIN" | "PROJECT_VIEWER" | "PROJECT_DEVELOPER";
    };

export type PostV1ProjectsIdOrNameMembersResponse = { id: string };

export type PostV1ProjectsIdOrNameMembersInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV1ProjectsIdOrNameMembersBody;
};

export type PostV1ProjectsIdOrNameMembersHandler = (
  input: PostV1ProjectsIdOrNameMembersInput,
) => Promise<PostV1ProjectsIdOrNameMembersResponse>;

export type DeleteV1ProjectsIdOrNameMembersUidResponse = { id: string };

export type DeleteV1ProjectsIdOrNameMembersUidInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string; uid: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type DeleteV1ProjectsIdOrNameMembersUidHandler = (
  input: DeleteV1ProjectsIdOrNameMembersUidInput,
) => Promise<DeleteV1ProjectsIdOrNameMembersUidResponse>;

export type GetV1ProjectsProjectIdRoutesResponse =
  | Record<string, never>
  | {
      routes: Array<{
        id: string;
        name: string;
        description?: string | undefined;
        enabled?: boolean | undefined;
        staged?: boolean | undefined;
        route: {
          src: string;
          dest?: string | undefined;
          headers?: Record<string, string> | undefined;
          methods?: Array<string> | undefined;
          continue?: boolean | undefined;
          override?: boolean | undefined;
          caseSensitive?: boolean | undefined;
          check?: boolean | undefined;
          important?: boolean | undefined;
          status?: number | undefined;
          has?:
            | Array<
                | {
                    type: "host";
                    value:
                      | string
                      | {
                          eq?: (string | number) | undefined;
                          neq?: string | undefined;
                          inc?: Array<string> | undefined;
                          ninc?: Array<string> | undefined;
                          pre?: string | undefined;
                          suf?: string | undefined;
                          re?: string | undefined;
                          gt?: number | undefined;
                          gte?: number | undefined;
                          lt?: number | undefined;
                          lte?: number | undefined;
                        };
                  }
                | {
                    type: "cookie" | "header" | "query";
                    key: string;
                    value?:
                      | (
                          | string
                          | {
                              eq?: (string | number) | undefined;
                              neq?: string | undefined;
                              inc?: Array<string> | undefined;
                              ninc?: Array<string> | undefined;
                              pre?: string | undefined;
                              suf?: string | undefined;
                              re?: string | undefined;
                              gt?: number | undefined;
                              gte?: number | undefined;
                              lt?: number | undefined;
                              lte?: number | undefined;
                            }
                        )
                      | undefined;
                  }
              >
            | undefined;
          missing?:
            | Array<
                | {
                    type: "host";
                    value:
                      | string
                      | {
                          eq?: (string | number) | undefined;
                          neq?: string | undefined;
                          inc?: Array<string> | undefined;
                          ninc?: Array<string> | undefined;
                          pre?: string | undefined;
                          suf?: string | undefined;
                          re?: string | undefined;
                          gt?: number | undefined;
                          gte?: number | undefined;
                          lt?: number | undefined;
                          lte?: number | undefined;
                        };
                  }
                | {
                    type: "cookie" | "header" | "query";
                    key: string;
                    value?:
                      | (
                          | string
                          | {
                              eq?: (string | number) | undefined;
                              neq?: string | undefined;
                              inc?: Array<string> | undefined;
                              ninc?: Array<string> | undefined;
                              pre?: string | undefined;
                              suf?: string | undefined;
                              re?: string | undefined;
                              gt?: number | undefined;
                              gte?: number | undefined;
                              lt?: number | undefined;
                              lte?: number | undefined;
                            }
                        )
                      | undefined;
                  }
              >
            | undefined;
          mitigate?: { action: "challenge" | "deny" } | undefined;
          transforms?:
            | Array<
                | {
                    type: "request.headers" | "request.query" | "response.headers";
                    op: "append" | "delete" | "set";
                    target: {
                      key:
                        | string
                        | {
                            eq?: (string | number) | undefined;
                            neq?: string | undefined;
                            inc?: Array<string> | undefined;
                            ninc?: Array<string> | undefined;
                            pre?: string | undefined;
                            suf?: string | undefined;
                            gt?: number | undefined;
                            gte?: number | undefined;
                            lt?: number | undefined;
                            lte?: number | undefined;
                          };
                    };
                    args?: (string | Array<string>) | undefined;
                    env?: Array<string> | undefined;
                  }
                | { type: "request.path"; op: "set"; args: string; env?: Array<string> | undefined }
              >
            | undefined;
          env?: Array<string> | undefined;
          locale?:
            | { redirect?: Record<string, string> | undefined; cookie?: string | undefined }
            | undefined;
          source?: string | undefined;
          destination?:
            | (
                | string
                | { type?: "service" | undefined; service: string; path?: string | undefined }
              )
            | undefined;
          statusCode?: number | undefined;
          middlewarePath?: string | undefined;
          middlewareRawSrc?: Array<string> | undefined;
          middleware?: number | undefined;
          respectOriginCacheControl?: boolean | undefined;
        };
        rawSrc?: string | undefined;
        rawDest?: string | undefined;
        srcSyntax?: ("equals" | "path-to-regexp" | "regex") | undefined;
        routeType?: ("redirect" | "rewrite" | "set_status" | "transform") | undefined;
      }>;
      version: {
        id: string;
        s3Key: string;
        lastModified: number;
        createdBy: string;
        isStaging?: boolean | undefined;
        isLive?: boolean | undefined;
        ruleCount?: number | undefined;
        alias?: string | undefined;
      };
      diffCount: number;
    }
  | {
      routes: Array<{
        id: string;
        name: string;
        description?: string | undefined;
        enabled?: boolean | undefined;
        staged?: boolean | undefined;
        route: {
          src: string;
          dest?: string | undefined;
          headers?: Record<string, string> | undefined;
          methods?: Array<string> | undefined;
          continue?: boolean | undefined;
          override?: boolean | undefined;
          caseSensitive?: boolean | undefined;
          check?: boolean | undefined;
          important?: boolean | undefined;
          status?: number | undefined;
          has?:
            | Array<
                | {
                    type: "host";
                    value:
                      | string
                      | {
                          eq?: (string | number) | undefined;
                          neq?: string | undefined;
                          inc?: Array<string> | undefined;
                          ninc?: Array<string> | undefined;
                          pre?: string | undefined;
                          suf?: string | undefined;
                          re?: string | undefined;
                          gt?: number | undefined;
                          gte?: number | undefined;
                          lt?: number | undefined;
                          lte?: number | undefined;
                        };
                  }
                | {
                    type: "cookie" | "header" | "query";
                    key: string;
                    value?:
                      | (
                          | string
                          | {
                              eq?: (string | number) | undefined;
                              neq?: string | undefined;
                              inc?: Array<string> | undefined;
                              ninc?: Array<string> | undefined;
                              pre?: string | undefined;
                              suf?: string | undefined;
                              re?: string | undefined;
                              gt?: number | undefined;
                              gte?: number | undefined;
                              lt?: number | undefined;
                              lte?: number | undefined;
                            }
                        )
                      | undefined;
                  }
              >
            | undefined;
          missing?:
            | Array<
                | {
                    type: "host";
                    value:
                      | string
                      | {
                          eq?: (string | number) | undefined;
                          neq?: string | undefined;
                          inc?: Array<string> | undefined;
                          ninc?: Array<string> | undefined;
                          pre?: string | undefined;
                          suf?: string | undefined;
                          re?: string | undefined;
                          gt?: number | undefined;
                          gte?: number | undefined;
                          lt?: number | undefined;
                          lte?: number | undefined;
                        };
                  }
                | {
                    type: "cookie" | "header" | "query";
                    key: string;
                    value?:
                      | (
                          | string
                          | {
                              eq?: (string | number) | undefined;
                              neq?: string | undefined;
                              inc?: Array<string> | undefined;
                              ninc?: Array<string> | undefined;
                              pre?: string | undefined;
                              suf?: string | undefined;
                              re?: string | undefined;
                              gt?: number | undefined;
                              gte?: number | undefined;
                              lt?: number | undefined;
                              lte?: number | undefined;
                            }
                        )
                      | undefined;
                  }
              >
            | undefined;
          mitigate?: { action: "challenge" | "deny" } | undefined;
          transforms?:
            | Array<
                | {
                    type: "request.headers" | "request.query" | "response.headers";
                    op: "append" | "delete" | "set";
                    target: {
                      key:
                        | string
                        | {
                            eq?: (string | number) | undefined;
                            neq?: string | undefined;
                            inc?: Array<string> | undefined;
                            ninc?: Array<string> | undefined;
                            pre?: string | undefined;
                            suf?: string | undefined;
                            gt?: number | undefined;
                            gte?: number | undefined;
                            lt?: number | undefined;
                            lte?: number | undefined;
                          };
                    };
                    args?: (string | Array<string>) | undefined;
                    env?: Array<string> | undefined;
                  }
                | { type: "request.path"; op: "set"; args: string; env?: Array<string> | undefined }
              >
            | undefined;
          env?: Array<string> | undefined;
          locale?:
            | { redirect?: Record<string, string> | undefined; cookie?: string | undefined }
            | undefined;
          source?: string | undefined;
          destination?:
            | (
                | string
                | { type?: "service" | undefined; service: string; path?: string | undefined }
              )
            | undefined;
          statusCode?: number | undefined;
          middlewarePath?: string | undefined;
          middlewareRawSrc?: Array<string> | undefined;
          middleware?: number | undefined;
          respectOriginCacheControl?: boolean | undefined;
        };
        rawSrc?: string | undefined;
        rawDest?: string | undefined;
        srcSyntax?: ("equals" | "path-to-regexp" | "regex") | undefined;
        routeType?: ("redirect" | "rewrite" | "set_status" | "transform") | undefined;
      }>;
      version: {
        id: string;
        s3Key: string;
        lastModified: number;
        createdBy: string;
        isStaging?: boolean | undefined;
        isLive?: boolean | undefined;
        ruleCount?: number | undefined;
        alias?: string | undefined;
      };
    }
  | {
      routes: Array<{
        id: string;
        name: string;
        description?: string | undefined;
        enabled?: boolean | undefined;
        staged?: boolean | undefined;
        route: {
          src: string;
          dest?: string | undefined;
          headers?: Record<string, string> | undefined;
          methods?: Array<string> | undefined;
          continue?: boolean | undefined;
          override?: boolean | undefined;
          caseSensitive?: boolean | undefined;
          check?: boolean | undefined;
          important?: boolean | undefined;
          status?: number | undefined;
          has?:
            | Array<
                | {
                    type: "host";
                    value:
                      | string
                      | {
                          eq?: (string | number) | undefined;
                          neq?: string | undefined;
                          inc?: Array<string> | undefined;
                          ninc?: Array<string> | undefined;
                          pre?: string | undefined;
                          suf?: string | undefined;
                          re?: string | undefined;
                          gt?: number | undefined;
                          gte?: number | undefined;
                          lt?: number | undefined;
                          lte?: number | undefined;
                        };
                  }
                | {
                    type: "cookie" | "header" | "query";
                    key: string;
                    value?:
                      | (
                          | string
                          | {
                              eq?: (string | number) | undefined;
                              neq?: string | undefined;
                              inc?: Array<string> | undefined;
                              ninc?: Array<string> | undefined;
                              pre?: string | undefined;
                              suf?: string | undefined;
                              re?: string | undefined;
                              gt?: number | undefined;
                              gte?: number | undefined;
                              lt?: number | undefined;
                              lte?: number | undefined;
                            }
                        )
                      | undefined;
                  }
              >
            | undefined;
          missing?:
            | Array<
                | {
                    type: "host";
                    value:
                      | string
                      | {
                          eq?: (string | number) | undefined;
                          neq?: string | undefined;
                          inc?: Array<string> | undefined;
                          ninc?: Array<string> | undefined;
                          pre?: string | undefined;
                          suf?: string | undefined;
                          re?: string | undefined;
                          gt?: number | undefined;
                          gte?: number | undefined;
                          lt?: number | undefined;
                          lte?: number | undefined;
                        };
                  }
                | {
                    type: "cookie" | "header" | "query";
                    key: string;
                    value?:
                      | (
                          | string
                          | {
                              eq?: (string | number) | undefined;
                              neq?: string | undefined;
                              inc?: Array<string> | undefined;
                              ninc?: Array<string> | undefined;
                              pre?: string | undefined;
                              suf?: string | undefined;
                              re?: string | undefined;
                              gt?: number | undefined;
                              gte?: number | undefined;
                              lt?: number | undefined;
                              lte?: number | undefined;
                            }
                        )
                      | undefined;
                  }
              >
            | undefined;
          mitigate?: { action: "challenge" | "deny" } | undefined;
          transforms?:
            | Array<
                | {
                    type: "request.headers" | "request.query" | "response.headers";
                    op: "append" | "delete" | "set";
                    target: {
                      key:
                        | string
                        | {
                            eq?: (string | number) | undefined;
                            neq?: string | undefined;
                            inc?: Array<string> | undefined;
                            ninc?: Array<string> | undefined;
                            pre?: string | undefined;
                            suf?: string | undefined;
                            gt?: number | undefined;
                            gte?: number | undefined;
                            lt?: number | undefined;
                            lte?: number | undefined;
                          };
                    };
                    args?: (string | Array<string>) | undefined;
                    env?: Array<string> | undefined;
                  }
                | { type: "request.path"; op: "set"; args: string; env?: Array<string> | undefined }
              >
            | undefined;
          env?: Array<string> | undefined;
          locale?:
            | { redirect?: Record<string, string> | undefined; cookie?: string | undefined }
            | undefined;
          source?: string | undefined;
          destination?:
            | (
                | string
                | { type?: "service" | undefined; service: string; path?: string | undefined }
              )
            | undefined;
          statusCode?: number | undefined;
          middlewarePath?: string | undefined;
          middlewareRawSrc?: Array<string> | undefined;
          middleware?: number | undefined;
          respectOriginCacheControl?: boolean | undefined;
        };
        rawSrc?: string | undefined;
        rawDest?: string | undefined;
        srcSyntax?: ("equals" | "path-to-regexp" | "regex") | undefined;
        routeType?: ("redirect" | "rewrite" | "set_status" | "transform") | undefined;
      }>;
      version: {
        id: string;
        s3Key: string;
        lastModified: number;
        createdBy: string;
        isStaging?: boolean | undefined;
        isLive?: boolean | undefined;
        ruleCount?: number | undefined;
        alias?: string | undefined;
      };
      limit: { maxRoutes: number; currentRoutes: number };
    };

export type GetV1ProjectsProjectIdRoutesInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { projectId: string };
  query: {
    versionId?: string | undefined;
    q?: string | undefined;
    filter?: ("rewrite" | "redirect" | "set_status" | "transform") | undefined;
    diff?: (boolean | "only") | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV1ProjectsProjectIdRoutesHandler = (
  input: GetV1ProjectsProjectIdRoutesInput,
) => Promise<GetV1ProjectsProjectIdRoutesResponse>;

export const putV1ProjectsProjectIdRoutesBody = z.object({
  overwrite: z.boolean().optional(),
  routes: z
    .array(
      z.object({
        id: z.string().max(256),
        name: z.string().max(256),
        description: z.string().max(1024).optional(),
        enabled: z.boolean().optional(),
        route: z.object({
          src: z.string(),
          dest: z.string().optional(),
          headers: z.object({}).optional(),
          caseSensitive: z.boolean().optional(),
          status: z.number().int().optional(),
          has: z
            .array(
              z.object({
                type: z.enum(["host", "header", "cookie", "query"]).optional(),
                key: z.string().optional(),
                value: z.string().optional(),
              }),
            )
            .optional(),
          missing: z
            .array(
              z.object({
                type: z.enum(["host", "header", "cookie", "query"]).optional(),
                key: z.string().optional(),
                value: z.string().optional(),
              }),
            )
            .optional(),
          transforms: z
            .array(
              z.object({
                type: z.enum(["request.headers", "request.query", "response.headers"]).optional(),
                op: z.enum(["append", "set", "delete"]).optional(),
                target: z.object({}).optional(),
                args: z.unknown(),
                env: z.array(z.string()).optional(),
              }),
            )
            .optional(),
          respectOriginCacheControl: z.boolean().optional(),
        }),
      }),
    )
    .optional(),
});

export type PutV1ProjectsProjectIdRoutesBody = {
  overwrite?: boolean | undefined;
  routes?:
    | Array<{
        id: string;
        name: string;
        description?: string | undefined;
        enabled?: boolean | undefined;
        route: {
          src: string;
          dest?: string | undefined;
          headers?: Record<string, never> | undefined;
          caseSensitive?: boolean | undefined;
          status?: number | undefined;
          has?:
            | Array<{
                type?: ("host" | "header" | "cookie" | "query") | undefined;
                key?: string | undefined;
                value?: string | undefined;
              }>
            | undefined;
          missing?:
            | Array<{
                type?: ("host" | "header" | "cookie" | "query") | undefined;
                key?: string | undefined;
                value?: string | undefined;
              }>
            | undefined;
          transforms?:
            | Array<{
                type?: ("request.headers" | "request.query" | "response.headers") | undefined;
                op?: ("append" | "set" | "delete") | undefined;
                target?: Record<string, never> | undefined;
                args: unknown;
                env?: Array<string> | undefined;
              }>
            | undefined;
          respectOriginCacheControl?: boolean | undefined;
        };
      }>
    | undefined;
};

export type PutV1ProjectsProjectIdRoutesResponse = {
  version: {
    id: string;
    s3Key: string;
    lastModified: number;
    createdBy: string;
    isStaging?: boolean | undefined;
    isLive?: boolean | undefined;
    ruleCount?: number | undefined;
    alias?: string | undefined;
  };
};

export type PutV1ProjectsProjectIdRoutesInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { projectId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PutV1ProjectsProjectIdRoutesBody;
};

export type PutV1ProjectsProjectIdRoutesHandler = (
  input: PutV1ProjectsProjectIdRoutesInput,
) => Promise<PutV1ProjectsProjectIdRoutesResponse>;

export const postV1ProjectsProjectIdRoutesBody = z.object({
  route: z.object({
    name: z.string().max(256),
    description: z.string().max(1024).optional(),
    enabled: z.boolean().optional(),
    srcSyntax: z.enum(["equals", "path-to-regexp", "regex"]).optional(),
    route: z.object({
      src: z.string(),
      dest: z.string().optional(),
      headers: z.object({}).optional(),
      caseSensitive: z.boolean().optional(),
      status: z.number().int().optional(),
      has: z
        .array(
          z.object({
            type: z.enum(["host", "header", "cookie", "query"]).optional(),
            key: z.string().optional(),
            value: z.string().optional(),
          }),
        )
        .optional(),
      missing: z
        .array(
          z.object({
            type: z.enum(["host", "header", "cookie", "query"]).optional(),
            key: z.string().optional(),
            value: z.string().optional(),
          }),
        )
        .optional(),
      transforms: z
        .array(
          z.object({
            type: z.enum(["request.headers", "request.query", "response.headers"]).optional(),
            op: z.enum(["append", "set", "delete"]).optional(),
            target: z.object({}).optional(),
            args: z.unknown(),
            env: z.array(z.string()).optional(),
          }),
        )
        .optional(),
      respectOriginCacheControl: z.boolean().optional(),
    }),
  }),
  position: z
    .object({
      placement: z.enum(["start", "end", "after", "before"]).optional(),
      referenceId: z.string().optional(),
    })
    .optional(),
});

export type PostV1ProjectsProjectIdRoutesBody = {
  route: {
    name: string;
    description?: string | undefined;
    enabled?: boolean | undefined;
    srcSyntax?: ("equals" | "path-to-regexp" | "regex") | undefined;
    route: {
      src: string;
      dest?: string | undefined;
      headers?: Record<string, never> | undefined;
      caseSensitive?: boolean | undefined;
      status?: number | undefined;
      has?:
        | Array<{
            type?: ("host" | "header" | "cookie" | "query") | undefined;
            key?: string | undefined;
            value?: string | undefined;
          }>
        | undefined;
      missing?:
        | Array<{
            type?: ("host" | "header" | "cookie" | "query") | undefined;
            key?: string | undefined;
            value?: string | undefined;
          }>
        | undefined;
      transforms?:
        | Array<{
            type?: ("request.headers" | "request.query" | "response.headers") | undefined;
            op?: ("append" | "set" | "delete") | undefined;
            target?: Record<string, never> | undefined;
            args: unknown;
            env?: Array<string> | undefined;
          }>
        | undefined;
      respectOriginCacheControl?: boolean | undefined;
    };
  };
  position?:
    | {
        placement?: ("start" | "end" | "after" | "before") | undefined;
        referenceId?: string | undefined;
      }
    | undefined;
};

export type PostV1ProjectsProjectIdRoutesResponse = {
  route: {
    routeType?: ("redirect" | "rewrite" | "set_status" | "transform") | undefined;
    id: string;
    name: string;
    description?: string | undefined;
    enabled?: boolean | undefined;
    staged?: boolean | undefined;
    route: {
      src: string;
      dest?: string | undefined;
      headers?: Record<string, string> | undefined;
      methods?: Array<string> | undefined;
      continue?: boolean | undefined;
      override?: boolean | undefined;
      caseSensitive?: boolean | undefined;
      check?: boolean | undefined;
      important?: boolean | undefined;
      status?: number | undefined;
      has?:
        | Array<
            | {
                type: "host";
                value:
                  | string
                  | {
                      eq?: (string | number) | undefined;
                      neq?: string | undefined;
                      inc?: Array<string> | undefined;
                      ninc?: Array<string> | undefined;
                      pre?: string | undefined;
                      suf?: string | undefined;
                      re?: string | undefined;
                      gt?: number | undefined;
                      gte?: number | undefined;
                      lt?: number | undefined;
                      lte?: number | undefined;
                    };
              }
            | {
                type: "cookie" | "header" | "query";
                key: string;
                value?:
                  | (
                      | string
                      | {
                          eq?: (string | number) | undefined;
                          neq?: string | undefined;
                          inc?: Array<string> | undefined;
                          ninc?: Array<string> | undefined;
                          pre?: string | undefined;
                          suf?: string | undefined;
                          re?: string | undefined;
                          gt?: number | undefined;
                          gte?: number | undefined;
                          lt?: number | undefined;
                          lte?: number | undefined;
                        }
                    )
                  | undefined;
              }
          >
        | undefined;
      missing?:
        | Array<
            | {
                type: "host";
                value:
                  | string
                  | {
                      eq?: (string | number) | undefined;
                      neq?: string | undefined;
                      inc?: Array<string> | undefined;
                      ninc?: Array<string> | undefined;
                      pre?: string | undefined;
                      suf?: string | undefined;
                      re?: string | undefined;
                      gt?: number | undefined;
                      gte?: number | undefined;
                      lt?: number | undefined;
                      lte?: number | undefined;
                    };
              }
            | {
                type: "cookie" | "header" | "query";
                key: string;
                value?:
                  | (
                      | string
                      | {
                          eq?: (string | number) | undefined;
                          neq?: string | undefined;
                          inc?: Array<string> | undefined;
                          ninc?: Array<string> | undefined;
                          pre?: string | undefined;
                          suf?: string | undefined;
                          re?: string | undefined;
                          gt?: number | undefined;
                          gte?: number | undefined;
                          lt?: number | undefined;
                          lte?: number | undefined;
                        }
                    )
                  | undefined;
              }
          >
        | undefined;
      mitigate?: { action: "challenge" | "deny" } | undefined;
      transforms?:
        | Array<
            | {
                type: "request.headers" | "request.query" | "response.headers";
                op: "append" | "delete" | "set";
                target: {
                  key:
                    | string
                    | {
                        eq?: (string | number) | undefined;
                        neq?: string | undefined;
                        inc?: Array<string> | undefined;
                        ninc?: Array<string> | undefined;
                        pre?: string | undefined;
                        suf?: string | undefined;
                        gt?: number | undefined;
                        gte?: number | undefined;
                        lt?: number | undefined;
                        lte?: number | undefined;
                      };
                };
                args?: (string | Array<string>) | undefined;
                env?: Array<string> | undefined;
              }
            | { type: "request.path"; op: "set"; args: string; env?: Array<string> | undefined }
          >
        | undefined;
      env?: Array<string> | undefined;
      locale?:
        | { redirect?: Record<string, string> | undefined; cookie?: string | undefined }
        | undefined;
      source?: string | undefined;
      destination?:
        | (string | { type?: "service" | undefined; service: string; path?: string | undefined })
        | undefined;
      statusCode?: number | undefined;
      middlewarePath?: string | undefined;
      middlewareRawSrc?: Array<string> | undefined;
      middleware?: number | undefined;
      respectOriginCacheControl?: boolean | undefined;
    };
    rawSrc?: string | undefined;
    rawDest?: string | undefined;
    srcSyntax?: ("equals" | "path-to-regexp" | "regex") | undefined;
  };
  version: {
    id: string;
    s3Key: string;
    lastModified: number;
    createdBy: string;
    isStaging?: boolean | undefined;
    isLive?: boolean | undefined;
    ruleCount?: number | undefined;
    alias?: string | undefined;
  };
};

export type PostV1ProjectsProjectIdRoutesInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { projectId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV1ProjectsProjectIdRoutesBody;
};

export type PostV1ProjectsProjectIdRoutesHandler = (
  input: PostV1ProjectsProjectIdRoutesInput,
) => Promise<PostV1ProjectsProjectIdRoutesResponse>;

export const deleteV1ProjectsProjectIdRoutesBody = z.object({ routeIds: z.array(z.string()) });

export type DeleteV1ProjectsProjectIdRoutesBody = { routeIds: Array<string> };

export type DeleteV1ProjectsProjectIdRoutesResponse = {
  deletedCount: number;
  version: {
    id: string;
    s3Key: string;
    lastModified: number;
    createdBy: string;
    isStaging?: boolean | undefined;
    isLive?: boolean | undefined;
    ruleCount?: number | undefined;
    alias?: string | undefined;
  };
};

export type DeleteV1ProjectsProjectIdRoutesInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { projectId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: DeleteV1ProjectsProjectIdRoutesBody;
};

export type DeleteV1ProjectsProjectIdRoutesHandler = (
  input: DeleteV1ProjectsProjectIdRoutesInput,
) => Promise<DeleteV1ProjectsProjectIdRoutesResponse>;

export const patchV1ProjectsProjectIdRoutesRouteIdBody = z.object({
  route: z
    .object({
      name: z.string().max(256),
      description: z.string().max(1024).optional(),
      enabled: z.boolean().optional(),
      srcSyntax: z.enum(["equals", "path-to-regexp", "regex"]).optional(),
      route: z.object({
        src: z.string(),
        dest: z.string().optional(),
        headers: z.object({}).optional(),
        caseSensitive: z.boolean().optional(),
        status: z.number().int().optional(),
        has: z
          .array(
            z.object({
              type: z.enum(["host", "header", "cookie", "query"]).optional(),
              key: z.string().optional(),
              value: z.string().optional(),
            }),
          )
          .optional(),
        missing: z
          .array(
            z.object({
              type: z.enum(["host", "header", "cookie", "query"]).optional(),
              key: z.string().optional(),
              value: z.string().optional(),
            }),
          )
          .optional(),
        transforms: z
          .array(
            z.object({
              type: z.enum(["request.headers", "request.query", "response.headers"]).optional(),
              op: z.enum(["append", "set", "delete"]).optional(),
              target: z.object({}).optional(),
              args: z.unknown(),
              env: z.array(z.string()).optional(),
            }),
          )
          .optional(),
        respectOriginCacheControl: z.boolean().optional(),
      }),
    })
    .optional(),
  restore: z.boolean().optional(),
});

export type PatchV1ProjectsProjectIdRoutesRouteIdBody = {
  route?:
    | {
        name: string;
        description?: string | undefined;
        enabled?: boolean | undefined;
        srcSyntax?: ("equals" | "path-to-regexp" | "regex") | undefined;
        route: {
          src: string;
          dest?: string | undefined;
          headers?: Record<string, never> | undefined;
          caseSensitive?: boolean | undefined;
          status?: number | undefined;
          has?:
            | Array<{
                type?: ("host" | "header" | "cookie" | "query") | undefined;
                key?: string | undefined;
                value?: string | undefined;
              }>
            | undefined;
          missing?:
            | Array<{
                type?: ("host" | "header" | "cookie" | "query") | undefined;
                key?: string | undefined;
                value?: string | undefined;
              }>
            | undefined;
          transforms?:
            | Array<{
                type?: ("request.headers" | "request.query" | "response.headers") | undefined;
                op?: ("append" | "set" | "delete") | undefined;
                target?: Record<string, never> | undefined;
                args: unknown;
                env?: Array<string> | undefined;
              }>
            | undefined;
          respectOriginCacheControl?: boolean | undefined;
        };
      }
    | undefined;
  restore?: boolean | undefined;
};

export type PatchV1ProjectsProjectIdRoutesRouteIdResponse = {
  route?:
    | {
        routeType?: ("redirect" | "rewrite" | "set_status" | "transform") | undefined;
        id: string;
        name: string;
        description?: string | undefined;
        enabled?: boolean | undefined;
        staged?: boolean | undefined;
        route: {
          src: string;
          dest?: string | undefined;
          headers?: Record<string, string> | undefined;
          methods?: Array<string> | undefined;
          continue?: boolean | undefined;
          override?: boolean | undefined;
          caseSensitive?: boolean | undefined;
          check?: boolean | undefined;
          important?: boolean | undefined;
          status?: number | undefined;
          has?:
            | Array<
                | {
                    type: "host";
                    value:
                      | string
                      | {
                          eq?: (string | number) | undefined;
                          neq?: string | undefined;
                          inc?: Array<string> | undefined;
                          ninc?: Array<string> | undefined;
                          pre?: string | undefined;
                          suf?: string | undefined;
                          re?: string | undefined;
                          gt?: number | undefined;
                          gte?: number | undefined;
                          lt?: number | undefined;
                          lte?: number | undefined;
                        };
                  }
                | {
                    type: "cookie" | "header" | "query";
                    key: string;
                    value?:
                      | (
                          | string
                          | {
                              eq?: (string | number) | undefined;
                              neq?: string | undefined;
                              inc?: Array<string> | undefined;
                              ninc?: Array<string> | undefined;
                              pre?: string | undefined;
                              suf?: string | undefined;
                              re?: string | undefined;
                              gt?: number | undefined;
                              gte?: number | undefined;
                              lt?: number | undefined;
                              lte?: number | undefined;
                            }
                        )
                      | undefined;
                  }
              >
            | undefined;
          missing?:
            | Array<
                | {
                    type: "host";
                    value:
                      | string
                      | {
                          eq?: (string | number) | undefined;
                          neq?: string | undefined;
                          inc?: Array<string> | undefined;
                          ninc?: Array<string> | undefined;
                          pre?: string | undefined;
                          suf?: string | undefined;
                          re?: string | undefined;
                          gt?: number | undefined;
                          gte?: number | undefined;
                          lt?: number | undefined;
                          lte?: number | undefined;
                        };
                  }
                | {
                    type: "cookie" | "header" | "query";
                    key: string;
                    value?:
                      | (
                          | string
                          | {
                              eq?: (string | number) | undefined;
                              neq?: string | undefined;
                              inc?: Array<string> | undefined;
                              ninc?: Array<string> | undefined;
                              pre?: string | undefined;
                              suf?: string | undefined;
                              re?: string | undefined;
                              gt?: number | undefined;
                              gte?: number | undefined;
                              lt?: number | undefined;
                              lte?: number | undefined;
                            }
                        )
                      | undefined;
                  }
              >
            | undefined;
          mitigate?: { action: "challenge" | "deny" } | undefined;
          transforms?:
            | Array<
                | {
                    type: "request.headers" | "request.query" | "response.headers";
                    op: "append" | "delete" | "set";
                    target: {
                      key:
                        | string
                        | {
                            eq?: (string | number) | undefined;
                            neq?: string | undefined;
                            inc?: Array<string> | undefined;
                            ninc?: Array<string> | undefined;
                            pre?: string | undefined;
                            suf?: string | undefined;
                            gt?: number | undefined;
                            gte?: number | undefined;
                            lt?: number | undefined;
                            lte?: number | undefined;
                          };
                    };
                    args?: (string | Array<string>) | undefined;
                    env?: Array<string> | undefined;
                  }
                | { type: "request.path"; op: "set"; args: string; env?: Array<string> | undefined }
              >
            | undefined;
          env?: Array<string> | undefined;
          locale?:
            | { redirect?: Record<string, string> | undefined; cookie?: string | undefined }
            | undefined;
          source?: string | undefined;
          destination?:
            | (
                | string
                | { type?: "service" | undefined; service: string; path?: string | undefined }
              )
            | undefined;
          statusCode?: number | undefined;
          middlewarePath?: string | undefined;
          middlewareRawSrc?: Array<string> | undefined;
          middleware?: number | undefined;
          respectOriginCacheControl?: boolean | undefined;
        };
        rawSrc?: string | undefined;
        rawDest?: string | undefined;
        srcSyntax?: ("equals" | "path-to-regexp" | "regex") | undefined;
      }
    | undefined;
  version: {
    id: string;
    s3Key: string;
    lastModified: number;
    createdBy: string;
    isStaging?: boolean | undefined;
    isLive?: boolean | undefined;
    ruleCount?: number | undefined;
    alias?: string | undefined;
  };
};

export type PatchV1ProjectsProjectIdRoutesRouteIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { projectId: string; routeId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PatchV1ProjectsProjectIdRoutesRouteIdBody;
};

export type PatchV1ProjectsProjectIdRoutesRouteIdHandler = (
  input: PatchV1ProjectsProjectIdRoutesRouteIdInput,
) => Promise<PatchV1ProjectsProjectIdRoutesRouteIdResponse>;

export const postV1ProjectsProjectIdRoutesGenerateBody = z.object({
  prompt: z.string().max(2000),
  currentRoute: z
    .object({
      name: z.string().optional(),
      description: z.string().optional(),
      pathCondition: z.object({ value: z.string().optional(), syntax: z.string().optional() }),
      conditions: z
        .array(
          z.object({
            field: z.string().optional(),
            operator: z.string().optional(),
            key: z.string().optional(),
            value: z.string().optional(),
            missing: z.boolean().optional(),
          }),
        )
        .optional(),
      actions: z.array(
        z.object({
          type: z.string().optional(),
          subType: z.string().optional(),
          dest: z.string().optional(),
          status: z.number().int().optional(),
          headers: z
            .array(
              z.object({
                key: z.string().optional(),
                value: z.string().optional(),
                op: z.string().optional(),
              }),
            )
            .optional(),
        }),
      ),
    })
    .optional(),
});

export type PostV1ProjectsProjectIdRoutesGenerateBody = {
  prompt: string;
  currentRoute?:
    | {
        name?: string | undefined;
        description?: string | undefined;
        pathCondition: { value?: string | undefined; syntax?: string | undefined };
        conditions?:
          | Array<{
              field?: string | undefined;
              operator?: string | undefined;
              key?: string | undefined;
              value?: string | undefined;
              missing?: boolean | undefined;
            }>
          | undefined;
        actions: Array<{
          type?: string | undefined;
          subType?: string | undefined;
          dest?: string | undefined;
          status?: number | undefined;
          headers?:
            | Array<{
                key?: string | undefined;
                value?: string | undefined;
                op?: string | undefined;
              }>
            | undefined;
        }>;
      }
    | undefined;
};

export type PostV1ProjectsProjectIdRoutesGenerateResponse = {
  route?:
    | {
        name: string;
        description: string;
        pathCondition: { value: string; syntax: "equals" | "path-to-regexp" | "regex" };
        conditions?:
          | Array<{
              field: "cookie" | "header" | "host" | "query";
              operator: "contains" | "eq" | "exists" | "re";
              key?: string | undefined;
              value?: string | undefined;
              missing: boolean;
            }>
          | undefined;
        actions: Array<{
          type: "modify" | "redirect" | "rewrite" | "set-status";
          subType?:
            | ("response-headers" | "transform-request-header" | "transform-request-query")
            | undefined;
          dest?: string | undefined;
          status?: number | undefined;
          headers?:
            | Array<{ key: string; value?: string | undefined; op: "append" | "delete" | "set" }>
            | undefined;
        }>;
      }
    | undefined;
  error?: string | undefined;
};

export type PostV1ProjectsProjectIdRoutesGenerateInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { projectId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV1ProjectsProjectIdRoutesGenerateBody;
};

export type PostV1ProjectsProjectIdRoutesGenerateHandler = (
  input: PostV1ProjectsProjectIdRoutesGenerateInput,
) => Promise<PostV1ProjectsProjectIdRoutesGenerateResponse>;

export type GetV1ProjectsProjectIdRoutesVersionsResponse = {
  versions: Array<{
    id: string;
    s3Key: string;
    lastModified: number;
    createdBy: string;
    isStaging?: boolean | undefined;
    isLive?: boolean | undefined;
    ruleCount?: number | undefined;
    alias?: string | undefined;
  }>;
};

export type GetV1ProjectsProjectIdRoutesVersionsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { projectId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV1ProjectsProjectIdRoutesVersionsHandler = (
  input: GetV1ProjectsProjectIdRoutesVersionsInput,
) => Promise<GetV1ProjectsProjectIdRoutesVersionsResponse>;

export const postV1ProjectsProjectIdRoutesVersionsBody = z.object({
  id: z.string(),
  action: z.enum(["promote", "restore", "discard"]),
});

export type PostV1ProjectsProjectIdRoutesVersionsBody = {
  id: string;
  action: "promote" | "restore" | "discard";
};

export type PostV1ProjectsProjectIdRoutesVersionsResponse = {
  version: {
    id: string;
    s3Key: string;
    lastModified: number;
    createdBy: string;
    isStaging?: boolean | undefined;
    isLive?: boolean | undefined;
    ruleCount?: number | undefined;
    alias?: string | undefined;
  };
};

export type PostV1ProjectsProjectIdRoutesVersionsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { projectId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV1ProjectsProjectIdRoutesVersionsBody;
};

export type PostV1ProjectsProjectIdRoutesVersionsHandler = (
  input: PostV1ProjectsProjectIdRoutesVersionsInput,
) => Promise<PostV1ProjectsProjectIdRoutesVersionsResponse>;

export type GetV10ProjectsResponse =
  | Array<{
      accountId: string;
      creator?:
        | (
            | {
                type: "user";
                via:
                  | { type: "app"; app: { id: string; clientId?: string | undefined } }
                  | {
                      type: "integration";
                      integration: { integrationId: string; configurationId: string };
                    }
                  | null;
                user: { id: string };
              }
            | { type: "app"; app: { id: string; clientId?: string | undefined } }
            | {
                type: "integration";
                integration: { integrationId: string; configurationId: string };
              }
            | { type: "system" }
          )
        | undefined;
      alias: Array<{
        configuredBy?: ("A" | "CNAME" | "dns-01" | "http" | "null" | null) | undefined;
        configuredChangedAt?: (number | null) | undefined;
        createdAt?: (number | null) | undefined;
        deployment: {
          id: string;
          alias?: Array<string> | undefined;
          aliasAssigned?: (number | boolean | null) | undefined;
          aliasError?: ({ code: string; message: string } | null) | undefined;
          aliasFinal?: (string | null) | undefined;
          automaticAliases?: Array<string> | undefined;
          branchMatcher?:
            | { type: "endsWith" | "equals" | "startsWith"; pattern: string }
            | undefined;
          buildingAt?: number | undefined;
          builds?:
            | Array<{ use: string; src?: string | undefined; dest?: string | undefined }>
            | undefined;
          checksConclusion?: ("canceled" | "failed" | "skipped" | "succeeded") | undefined;
          checksState?: ("completed" | "registered" | "running") | undefined;
          connectBuildsEnabled?: boolean | undefined;
          connectConfigurationId?: string | undefined;
          createdAt: number;
          createdIn: string;
          creator: {
            email: string;
            githubLogin?: string | undefined;
            gitlabLogin?: string | undefined;
            uid: string;
            username: string;
          } | null;
          deletedAt?: number | undefined;
          deploymentHostname: string;
          forced?: boolean | undefined;
          name: string;
          meta?: Record<string, string> | undefined;
          monorepoManager?: (string | null) | undefined;
          oidcTokenClaims?:
            | {
                iss: string;
                sub: string;
                scope: string;
                aud: string;
                owner: string;
                owner_id: string;
                project: string;
                project_id: string;
                environment: string;
                custom_environment_id?: string | undefined;
                mfe_group_ids?: Array<string> | undefined;
                plan?: string | undefined;
              }
            | undefined;
          plan: "enterprise" | "hobby" | "pro";
          previewCommentsEnabled?: boolean | undefined;
          private: boolean;
          readyAt?: number | undefined;
          readyState:
            | "BLOCKED"
            | "BUILDING"
            | "CANCELED"
            | "ERROR"
            | "INITIALIZING"
            | "QUEUED"
            | "READY";
          readySubstate?: ("PROMOTED" | "ROLLING" | "STAGED") | undefined;
          requestedAt?: number | undefined;
          target?: (string | null) | undefined;
          teamId?: (string | null) | undefined;
          type: "LAMBDAS";
          url: string;
          userId?: string | undefined;
          withCache?: boolean | undefined;
        } | null;
        domain: string;
        environment: "preview" | "production";
        gitBranch?: (string | null) | undefined;
        redirect?: (string | null) | undefined;
        redirectStatusCode?: (number | null) | undefined;
        target: "PREVIEW" | "PRODUCTION" | "STAGING";
      }>;
      analytics?:
        | {
            id: string;
            canceledAt?: (number | null) | undefined;
            disabledAt: number;
            enabledAt: number;
            paidAt?: number | undefined;
            sampleRatePercent?: (number | null) | undefined;
            spendLimitInDollars?: (number | null) | undefined;
          }
        | undefined;
      appliedCve55182Migration?: boolean | undefined;
      autoExposeSystemEnvs?: boolean | undefined;
      autoAssignCustomDomains?: boolean | undefined;
      autoAssignCustomDomainsUpdatedBy?: string | undefined;
      buildCommand?: (string | null) | undefined;
      commandForIgnoringBuildStep?: (string | null) | undefined;
      customerSupportCodeVisibility?: boolean | undefined;
      createdAt?: number | undefined;
      devCommand?: (string | null) | undefined;
      directoryListing: boolean;
      deploymentExpiration: {
        expirationDays?: number | undefined;
        expirationDaysProduction?: number | undefined;
        expirationDaysCanceled?: number | undefined;
        expirationDaysErrored?: number | undefined;
        deploymentsToKeep?: number | undefined;
      };
      installCommand?: (string | null) | undefined;
      ipBuckets?:
        | Array<{
            bucket: string;
            default?: boolean | undefined;
            supportUntil?: number | undefined;
          }>
        | undefined;
      env?:
        | Array<{
            target?:
              | (
                  | Array<"development" | "development" | "preview" | "preview" | "production">
                  | "development"
                  | "development"
                  | "preview"
                  | "preview"
                  | "production"
                )
              | undefined;
            type: "encrypted" | "plain" | "secret" | "sensitive" | "system";
            sunsetSecretId?: string | undefined;
            legacyValue?: string | undefined;
            decrypted?: boolean | undefined;
            value: string;
            vsmValue?: string | undefined;
            id?: string | undefined;
            key: string;
            configurationId?: (string | null) | undefined;
            createdAt?: number | undefined;
            updatedAt?: number | undefined;
            createdBy?: (string | null) | undefined;
            updatedBy?: (string | null) | undefined;
            gitBranch?: string | undefined;
            visibility?: ("config" | "secret") | undefined;
            edgeConfigId?: (string | null) | undefined;
            edgeConfigTokenId?: (string | null) | undefined;
            contentHint?:
              | (
                  | { type: "redis-url"; storeId: string }
                  | { type: "redis-rest-api-url"; storeId: string }
                  | { type: "redis-rest-api-token"; storeId: string }
                  | { type: "redis-rest-api-read-only-token"; storeId: string }
                  | { type: "blob-read-write-token"; storeId: string }
                  | { type: "blob-store-id"; storeId: string }
                  | { type: "blob-webhook-public-key"; storeId: string }
                  | { type: "postgres-url"; storeId: string }
                  | { type: "postgres-url-non-pooling"; storeId: string }
                  | { type: "postgres-prisma-url"; storeId: string }
                  | { type: "postgres-user"; storeId: string }
                  | { type: "postgres-host"; storeId: string }
                  | { type: "postgres-password"; storeId: string }
                  | { type: "postgres-database"; storeId: string }
                  | { type: "postgres-url-no-ssl"; storeId: string }
                  | {
                      type: "integration-store-secret";
                      storeId: string;
                      integrationId: string;
                      integrationProductId: string;
                      integrationConfigurationId: string;
                    }
                  | { type: "flags-connection-string"; projectId: string }
                  | null
                )
              | undefined;
            internalContentHint?:
              | ({ type: "flags-secret"; encryptedValue: string } | null)
              | undefined;
            comment?: string | undefined;
            customEnvironmentIds?: Array<string> | undefined;
          }>
        | undefined;
      framework?:
        | (
            | "actix-web"
            | "angular"
            | "ash"
            | "astro"
            | "axum"
            | "blitzjs"
            | "brunch"
            | "bun"
            | "container"
            | "create-react-app"
            | "django"
            | "docusaurus"
            | "docusaurus-2"
            | "dojo"
            | "eleventy"
            | "elysia"
            | "ember"
            | "eve"
            | "express"
            | "fastapi"
            | "fasthtml"
            | "fastify"
            | "flask"
            | "gatsby"
            | "go"
            | "gridsome"
            | "h3"
            | "hexo"
            | "hono"
            | "hugo"
            | "hydrogen"
            | "ionic-angular"
            | "ionic-react"
            | "jekyll"
            | "koa"
            | "mastra"
            | "middleman"
            | "nestjs"
            | "nextjs"
            | "nitro"
            | "node"
            | "nuxtjs"
            | "parcel"
            | "polymer"
            | "preact"
            | "python"
            | "react-router"
            | "redwoodjs"
            | "remix"
            | "ruby"
            | "rust"
            | "saber"
            | "sanity"
            | "sanity-v2"
            | "sapper"
            | "scully"
            | "services"
            | "solidstart"
            | "solidstart-1"
            | "stencil"
            | "storybook"
            | "svelte"
            | "sveltekit"
            | "sveltekit-1"
            | "tanstack-start"
            | "tanstack-start-lovable"
            | "umijs"
            | "vite"
            | "vitepress"
            | "vue"
            | "vuepress"
            | "xmcp"
            | "zola"
            | "null"
            | null
          )
        | undefined;
      gitForkProtection?: boolean | undefined;
      id: string;
      latestDeployments?:
        | Array<{
            id: string;
            alias?: Array<string> | undefined;
            aliasAssigned?: (number | boolean | null) | undefined;
            aliasError?: ({ code: string; message: string } | null) | undefined;
            aliasFinal?: (string | null) | undefined;
            automaticAliases?: Array<string> | undefined;
            branchMatcher?:
              | { type: "endsWith" | "equals" | "startsWith"; pattern: string }
              | undefined;
            buildingAt?: number | undefined;
            builds?:
              | Array<{ use: string; src?: string | undefined; dest?: string | undefined }>
              | undefined;
            checksConclusion?: ("canceled" | "failed" | "skipped" | "succeeded") | undefined;
            checksState?: ("completed" | "registered" | "running") | undefined;
            connectBuildsEnabled?: boolean | undefined;
            connectConfigurationId?: string | undefined;
            createdAt: number;
            createdIn: string;
            creator: {
              email: string;
              githubLogin?: string | undefined;
              gitlabLogin?: string | undefined;
              uid: string;
              username: string;
            } | null;
            deletedAt?: number | undefined;
            deploymentHostname: string;
            forced?: boolean | undefined;
            name: string;
            meta?: Record<string, string> | undefined;
            monorepoManager?: (string | null) | undefined;
            oidcTokenClaims?:
              | {
                  iss: string;
                  sub: string;
                  scope: string;
                  aud: string;
                  owner: string;
                  owner_id: string;
                  project: string;
                  project_id: string;
                  environment: string;
                  custom_environment_id?: string | undefined;
                  mfe_group_ids?: Array<string> | undefined;
                  plan?: string | undefined;
                }
              | undefined;
            plan: "enterprise" | "hobby" | "pro";
            previewCommentsEnabled?: boolean | undefined;
            private: boolean;
            readyAt?: number | undefined;
            readyState:
              | "BLOCKED"
              | "BUILDING"
              | "CANCELED"
              | "ERROR"
              | "INITIALIZING"
              | "QUEUED"
              | "READY";
            readySubstate?: ("PROMOTED" | "ROLLING" | "STAGED") | undefined;
            requestedAt?: number | undefined;
            target?: (string | null) | undefined;
            teamId?: (string | null) | undefined;
            type: "LAMBDAS";
            url: string;
            userId?: string | undefined;
            withCache?: boolean | undefined;
          }>
        | undefined;
      link?:
        | (
            | {
                org: string;
                repoOwnerId?: number | undefined;
                repo?: string | undefined;
                repoId?: number | undefined;
                type: "github";
                createdAt?: number | undefined;
                deployHooks: Array<{
                  createdAt?: number | undefined;
                  id: string;
                  name: string;
                  ref: string;
                  url: string;
                }>;
                gitCredentialId: string;
                updatedAt?: number | undefined;
                sourceless?: boolean | undefined;
                productionBranch: string;
              }
            | {
                type: "github-limited";
                repo?: string | undefined;
                repoId?: number | undefined;
                createdAt?: number | undefined;
                updatedAt?: number | undefined;
                org: string;
                repoOwnerId?: number | undefined;
                deployHooks: Array<{
                  createdAt?: number | undefined;
                  id: string;
                  name: string;
                  ref: string;
                  url: string;
                }>;
                gitCredentialId: string;
                sourceless?: boolean | undefined;
                productionBranch: string;
              }
            | {
                org: string;
                repoOwnerId?: number | undefined;
                repo?: string | undefined;
                repoId?: number | undefined;
                type: "github-custom-host";
                host: string;
                createdAt?: number | undefined;
                deployHooks: Array<{
                  createdAt?: number | undefined;
                  id: string;
                  name: string;
                  ref: string;
                  url: string;
                }>;
                gitCredentialId: string;
                updatedAt?: number | undefined;
                sourceless?: boolean | undefined;
                productionBranch: string;
              }
            | {
                projectId: string;
                projectName: string;
                projectNameWithNamespace: string;
                projectNamespace: string;
                projectOwnerId?: number | undefined;
                projectUrl: string;
                type: "gitlab";
                createdAt?: number | undefined;
                deployHooks: Array<{
                  createdAt?: number | undefined;
                  id: string;
                  name: string;
                  ref: string;
                  url: string;
                }>;
                gitCredentialId: string;
                updatedAt?: number | undefined;
                sourceless?: boolean | undefined;
                productionBranch: string;
              }
            | {
                name: string;
                slug: string;
                owner: string;
                type: "bitbucket";
                uuid: string;
                workspaceUuid: string;
                createdAt?: number | undefined;
                deployHooks: Array<{
                  createdAt?: number | undefined;
                  id: string;
                  name: string;
                  ref: string;
                  url: string;
                }>;
                gitCredentialId: string;
                updatedAt?: number | undefined;
                sourceless?: boolean | undefined;
                productionBranch: string;
              }
            | {
                org: string;
                repo: string;
                type: "vercel";
                createdAt?: number | undefined;
                deployHooks: Array<{
                  createdAt?: number | undefined;
                  id: string;
                  name: string;
                  ref: string;
                  url: string;
                }>;
                gitCredentialId: string;
                updatedAt?: number | undefined;
                sourceless?: boolean | undefined;
                productionBranch: string;
              }
            | {
                owner: string;
                repo: string;
                repoId: string;
                ownerId: string;
                type: "cursor-origin";
                createdAt?: number | undefined;
                deployHooks: Array<{
                  createdAt?: number | undefined;
                  id: string;
                  name: string;
                  ref: string;
                  url: string;
                }>;
                gitCredentialId: string;
                updatedAt?: number | undefined;
                sourceless?: boolean | undefined;
                productionBranch: string;
              }
          )
        | undefined;
      name: string;
      nodeVersion: "10.x" | "12.x" | "14.x" | "16.x" | "18.x" | "20.x" | "22.x" | "24.x" | "8.10.x";
      outputDirectory?: (string | null) | undefined;
      passwordProtection?: (Record<string, never> | null) | undefined;
      passport?:
        | ({
            deploymentType:
              | "all"
              | "all_except_custom_domains"
              | "preview"
              | "prod_deployment_urls_and_all_previews";
            connectorId: string;
          } | null)
        | undefined;
      resourceConfig: {
        elasticConcurrencyEnabled?: boolean | undefined;
        fluid?: boolean | undefined;
        functionDefaultRegions: Array<string>;
        functionDefaultTimeout?: number | undefined;
        functionDefaultMemoryType?:
          | ("performance" | "performance_xl" | "standard" | "standard_legacy")
          | undefined;
        functionZeroConfigFailover?: boolean | undefined;
        buildMachineType?: ("basic" | "enhanced" | "standard" | "turbo") | undefined;
        buildMachineSelection?: ("elastic" | "fixed") | undefined;
        buildMachineElasticLastUpdated?: number | undefined;
        buildMachineElasticReason?:
          | (
              | "basic-floor"
              | "build-timeout-failure"
              | "enospc-failure"
              | "enterprise-floor"
              | "high-peak-disk"
              | "high-peak-memory"
              | "long-build-duration"
              | "oom-failure"
              | "short-build-duration"
              | "sustained-high-cpu"
            )
          | undefined;
        isNSNBDisabled?: boolean | undefined;
        buildQueue?:
          | { configuration?: ("SKIP_NAMESPACE_QUEUE" | "WAIT_FOR_NAMESPACE_QUEUE") | undefined }
          | undefined;
        enableFunctionsBeta?: boolean | undefined;
      };
      rollingRelease?:
        | ({
            target: string;
            stages?:
              | (Array<{
                  targetPercentage: number;
                  requireApproval?: boolean | undefined;
                  duration?: number | undefined;
                  linearShift?: boolean | undefined;
                }> | null)
              | undefined;
            canaryResponseHeader?: boolean | undefined;
            gate?:
              | {
                  enabled: boolean;
                  checks: Array<{
                    type: "error-rate-5xx";
                    minSampleSize?: number | undefined;
                    excludeStatusCodes?: Array<number> | undefined;
                    excludePaths?: Array<string> | undefined;
                    ingestWatermarkSeconds?: number | undefined;
                  }>;
                  failureThreshold?: number | undefined;
                  windowSize?: number | undefined;
                  action: "pause" | "rollback";
                  dryRun: boolean;
                }
              | undefined;
          } | null)
        | undefined;
      rootDirectory?: (string | null) | undefined;
      serverlessFunctionRegion: string;
      serverlessFunctionZeroConfigFailover?: boolean | undefined;
      speedInsights?:
        | {
            id: string;
            enabledAt?: number | undefined;
            disabledAt?: number | undefined;
            canceledAt?: number | undefined;
            hasData?: boolean | undefined;
            dataReceivedAt?: number | undefined;
            paidAt?: number | undefined;
          }
        | undefined;
      skipGitConnectDuringLink?: boolean | undefined;
      sourceFilesOutsideRootDirectory?: boolean | undefined;
      ssoProtection?:
        | ({
            deploymentType:
              | "all"
              | "all_except_custom_domains"
              | "preview"
              | "prod_deployment_urls_and_all_previews";
            cve55182MigrationAppliedFrom?:
              | (
                  | "all"
                  | "all_except_custom_domains"
                  | "preview"
                  | "prod_deployment_urls_and_all_previews"
                  | "null"
                  | null
                )
              | undefined;
            april2026SecurityIncidentMigrationAppliedFrom?:
              | (
                  | "all"
                  | "all_except_custom_domains"
                  | "preview"
                  | "prod_deployment_urls_and_all_previews"
                  | "null"
                  | null
                )
              | undefined;
          } | null)
        | undefined;
      targets?:
        | Record<
            string,
            {
              id: string;
              alias?: Array<string> | undefined;
              aliasAssigned?: (number | boolean | null) | undefined;
              aliasError?: ({ code: string; message: string } | null) | undefined;
              aliasFinal?: (string | null) | undefined;
              automaticAliases?: Array<string> | undefined;
              branchMatcher?:
                | { type: "endsWith" | "equals" | "startsWith"; pattern: string }
                | undefined;
              buildingAt?: number | undefined;
              builds?:
                | Array<{ use: string; src?: string | undefined; dest?: string | undefined }>
                | undefined;
              checksConclusion?: ("canceled" | "failed" | "skipped" | "succeeded") | undefined;
              checksState?: ("completed" | "registered" | "running") | undefined;
              connectBuildsEnabled?: boolean | undefined;
              connectConfigurationId?: string | undefined;
              createdAt: number;
              createdIn: string;
              creator: {
                email: string;
                githubLogin?: string | undefined;
                gitlabLogin?: string | undefined;
                uid: string;
                username: string;
              } | null;
              deletedAt?: number | undefined;
              deploymentHostname: string;
              forced?: boolean | undefined;
              name: string;
              meta?: Record<string, string> | undefined;
              monorepoManager?: (string | null) | undefined;
              oidcTokenClaims?:
                | {
                    iss: string;
                    sub: string;
                    scope: string;
                    aud: string;
                    owner: string;
                    owner_id: string;
                    project: string;
                    project_id: string;
                    environment: string;
                    custom_environment_id?: string | undefined;
                    mfe_group_ids?: Array<string> | undefined;
                    plan?: string | undefined;
                  }
                | undefined;
              plan: "enterprise" | "hobby" | "pro";
              previewCommentsEnabled?: boolean | undefined;
              private: boolean;
              readyAt?: number | undefined;
              readyState:
                | "BLOCKED"
                | "BUILDING"
                | "CANCELED"
                | "ERROR"
                | "INITIALIZING"
                | "QUEUED"
                | "READY";
              readySubstate?: ("PROMOTED" | "ROLLING" | "STAGED") | undefined;
              requestedAt?: number | undefined;
              target?: (string | null) | undefined;
              teamId?: (string | null) | undefined;
              type: "LAMBDAS";
              url: string;
              userId?: string | undefined;
              withCache?: boolean | undefined;
            } | null
          >
        | undefined;
      transferCompletedAt?: number | undefined;
      transferStartedAt?: number | undefined;
      transferToAccountId?: string | undefined;
      transferredFromAccountId?: string | undefined;
      trustedSources?:
        | ({
            projects?:
              | Record<
                  string,
                  {
                    label?: string | undefined;
                    customAllow?:
                      | Array<{
                          from:
                            | { slugs: Array<string>; preset?: "all-custom" | undefined }
                            | { slugs?: Array<string> | undefined; preset: "all-custom" };
                          to:
                            | { slugs: Array<string>; preset?: "all-custom" | undefined }
                            | { slugs?: Array<string> | undefined; preset: "all-custom" };
                        }>
                      | undefined;
                  }
                >
              | undefined;
            oidcProviders?:
              | Record<
                  string,
                  Array<{
                    to:
                      | { slugs: Array<string>; preset?: "all-custom" | undefined }
                      | { slugs?: Array<string> | undefined; preset: "all-custom" };
                    label?: string | undefined;
                    claims: Record<string, Array<string>>;
                  }>
                >
              | undefined;
          } | null)
        | undefined;
      updatedAt?: number | undefined;
      live?: boolean | undefined;
      hasActiveBranches?: boolean | undefined;
      gitComments?: { onPullRequest: boolean; onCommit: boolean } | undefined;
      gitProviderOptions?:
        | {
            createDeployments: "disabled" | "enabled";
            disableRepositoryDispatchEvents?: boolean | undefined;
            requireVerifiedCommits?: boolean | undefined;
            gitCommitStatus?: boolean | undefined;
            consolidatedGitCommitStatus?:
              | { enabled: boolean; propagateFailures: boolean }
              | undefined;
          }
        | undefined;
      paused?: boolean | undefined;
      webAnalytics?:
        | {
            id: string;
            disabledAt?: number | undefined;
            canceledAt?: number | undefined;
            enabledAt?: number | undefined;
            hasData?: true | undefined;
          }
        | undefined;
      security?:
        | {
            attackModeEnabled?: boolean | undefined;
            attackModeUpdatedAt?: number | undefined;
            firewallEnabled?: boolean | undefined;
            firewallUpdatedAt?: number | undefined;
            attackModeActiveUntil?: (number | null) | undefined;
            firewallConfigVersion?: number | undefined;
            firewallRoutes?:
              | Array<{
                  src?:
                    | (
                        | string
                        | {
                            re?: string | undefined;
                            eq?: string | undefined;
                            neq?: string | undefined;
                            inc?: Array<string> | undefined;
                            ninc?: Array<string> | undefined;
                            pre?: string | undefined;
                            suf?: string | undefined;
                            gt?: number | undefined;
                            gte?: number | undefined;
                            lt?: number | undefined;
                            lte?: number | undefined;
                            list?: string | undefined;
                          }
                      )
                    | undefined;
                  tierRequirement?: ("advanced" | "critical") | undefined;
                  has?:
                    | Array<{
                        type:
                          | "cookie"
                          | "domain_environment"
                          | "environment"
                          | "header"
                          | "headers"
                          | "host"
                          | "initial_request_path"
                          | "ip_address"
                          | "method"
                          | "path"
                          | "protocol"
                          | "query"
                          | "region"
                          | "scheme"
                          | "trusted_source";
                        key?: string | undefined;
                        value?:
                          | (
                              | string
                              | {
                                  re?: string | undefined;
                                  eq?: string | undefined;
                                  neq?: string | undefined;
                                  inc?: Array<string> | undefined;
                                  ninc?: Array<string> | undefined;
                                  pre?: string | undefined;
                                  suf?: string | undefined;
                                  gt?: number | undefined;
                                  gte?: number | undefined;
                                  lt?: number | undefined;
                                  lte?: number | undefined;
                                  list?: string | undefined;
                                }
                            )
                          | undefined;
                      }>
                    | undefined;
                  missing?:
                    | Array<{
                        type:
                          | "cookie"
                          | "domain_environment"
                          | "environment"
                          | "header"
                          | "headers"
                          | "host"
                          | "initial_request_path"
                          | "ip_address"
                          | "method"
                          | "path"
                          | "protocol"
                          | "query"
                          | "region"
                          | "scheme"
                          | "trusted_source";
                        key?: string | undefined;
                        value?:
                          | (
                              | string
                              | {
                                  re?: string | undefined;
                                  eq?: string | undefined;
                                  neq?: string | undefined;
                                  inc?: Array<string> | undefined;
                                  ninc?: Array<string> | undefined;
                                  pre?: string | undefined;
                                  suf?: string | undefined;
                                  gt?: number | undefined;
                                  gte?: number | undefined;
                                  lt?: number | undefined;
                                  lte?: number | undefined;
                                  list?: string | undefined;
                                }
                            )
                          | undefined;
                      }>
                    | undefined;
                  dest?: string | undefined;
                  status?: number | undefined;
                  handle?: ("finalize" | "init") | undefined;
                  mitigate?:
                    | {
                        action: "bypass" | "challenge" | "deny" | "log" | "rate_limit" | "redirect";
                        rule_id: string;
                        ttl?: number | undefined;
                        erl?:
                          | {
                              algo: "fixed_window" | "token_bucket";
                              window: number;
                              limit: number;
                              keys: Array<string>;
                            }
                          | undefined;
                        log_headers?: (Array<string> | "*") | undefined;
                      }
                    | undefined;
                  transforms?:
                    | Array<{
                        type: "request.headers";
                        op: "append";
                        target: { key: string };
                        args: string;
                      }>
                    | undefined;
                }>
              | undefined;
            rulesets?:
              | Record<
                  string,
                  {
                    action:
                      | "allow"
                      | "bypass"
                      | "challenge"
                      | "deny"
                      | "log"
                      | "rate_limit"
                      | "redirect";
                    rateLimit?:
                      | ({
                          algo: "fixed_window" | "token_bucket";
                          window: number;
                          limit: number;
                          keys: Array<string>;
                        } | null)
                      | undefined;
                    redirect?: ({ location: string; permanent: boolean } | null) | undefined;
                    actionDuration?: (string | null) | undefined;
                    bypassSystem?: (boolean | null) | undefined;
                    logHeaders?: (Array<string> | "*") | undefined;
                  }
                >
              | undefined;
            firewallSeawallEnabled?: boolean | undefined;
            ja3Enabled?: boolean | undefined;
            ja4Enabled?: boolean | undefined;
            firewallBypassIps?: Array<string> | undefined;
            managedRules?:
              | ({
                  vercel_ruleset: {
                    active: boolean;
                    action?: ("challenge" | "deny" | "log") | undefined;
                  };
                  traffic_sources: {
                    active: boolean;
                    action?: ("challenge" | "deny" | "log") | undefined;
                  };
                  bot_filter: {
                    active: boolean;
                    action?: ("challenge" | "deny" | "log") | undefined;
                  };
                  ai_bots: { active: boolean; action?: ("challenge" | "deny" | "log") | undefined };
                  owasp: { active: boolean; action?: ("challenge" | "deny" | "log") | undefined };
                } | null)
              | undefined;
            botIdEnabled?: boolean | undefined;
            requestLogsKey?: Array<string> | undefined;
            log_headers?: (Array<string> | "*") | undefined;
            securityPlus?: boolean | undefined;
            securityPlusMetadata?:
              | { updatedAt: number; firstEnabledAt?: number | undefined }
              | undefined;
            pageIntegrityEnabled?: boolean | undefined;
          }
        | undefined;
      oidcTokenConfig?:
        | { enabled?: boolean | undefined; issuerMode?: ("global" | "team") | undefined }
        | undefined;
      tier?: ("advanced" | "critical") | undefined;
      abuse?:
        | {
            scanner?: string | undefined;
            history: Array<{
              scanner: string;
              reason: string;
              by: string;
              byId: string;
              at: number;
            }>;
            updatedAt: number;
            block?:
              | {
                  action: "blocked";
                  reason: string;
                  statusCode: number;
                  createdAt: number;
                  caseId?: string | undefined;
                  actor?: string | undefined;
                  comment?: string | undefined;
                  ineligibleForAppeal?: boolean | undefined;
                  isCascading?: boolean | undefined;
                }
              | undefined;
            blockHistory?:
              | Array<
                  | {
                      action: "blocked";
                      reason: string;
                      statusCode: number;
                      createdAt: number;
                      caseId?: string | undefined;
                      actor?: string | undefined;
                      comment?: string | undefined;
                      ineligibleForAppeal?: boolean | undefined;
                      isCascading?: boolean | undefined;
                    }
                  | {
                      action: "unblocked";
                      createdAt: number;
                      caseId?: string | undefined;
                      actor?: string | undefined;
                      comment?: string | undefined;
                      ineligibleForAppeal?: boolean | undefined;
                      isCascading?: boolean | undefined;
                    }
                  | {
                      action: "route-blocked";
                      route:
                        | { src: string; status: number; expiry?: number | undefined }
                        | {
                            has: Array<
                              | {
                                  type: "header";
                                  key: "x-vercel-ip-country";
                                  value: { eq: string };
                                }
                              | { type: "host"; value: { eq: string } }
                            >;
                            mitigate: { action: "block_legal_cwc" };
                            src?: string | undefined;
                          };
                      reason: string;
                      createdAt: number;
                      caseId?: string | undefined;
                      actor?: string | undefined;
                      comment?: string | undefined;
                      ineligibleForAppeal?: boolean | undefined;
                      isCascading?: boolean | undefined;
                    }
                  | {
                      action: "route-unblocked";
                      route:
                        | { src: string; status: number; expiry?: number | undefined }
                        | {
                            has: Array<
                              | {
                                  type: "header";
                                  key: "x-vercel-ip-country";
                                  value: { eq: string };
                                }
                              | { type: "host"; value: { eq: string } }
                            >;
                            mitigate: { action: "block_legal_cwc" };
                            src?: string | undefined;
                          };
                      statusCode?: number | undefined;
                      createdAt: number;
                      caseId?: string | undefined;
                      actor?: string | undefined;
                      comment?: string | undefined;
                      ineligibleForAppeal?: boolean | undefined;
                      isCascading?: boolean | undefined;
                    }
                >
              | undefined;
            interstitial?: boolean | undefined;
            interstitialHistory?:
              | Array<{
                  action:
                    | "add-deployment-interstitial"
                    | "add-project-interstitial"
                    | "remove-deployment-interstitial"
                    | "remove-project-interstitial";
                  createdAt: number;
                  caseId?: string | undefined;
                  reason?: string | undefined;
                  actor?: string | undefined;
                  comment?: string | undefined;
                }>
              | undefined;
          }
        | undefined;
      internalRoutes?:
        | Array<
            | { src: string; status: number; expiry?: number | undefined }
            | {
                has: Array<
                  | { type: "header"; key: "x-vercel-ip-country"; value: { eq: string } }
                  | { type: "host"; value: { eq: string } }
                >;
                mitigate: { action: "block_legal_cwc" };
                src?: string | undefined;
              }
          >
        | undefined;
    }>
  | {
      projects: Array<{
        accountId: string;
        creator?:
          | (
              | {
                  type: "user";
                  via:
                    | { type: "app"; app: { id: string; clientId?: string | undefined } }
                    | {
                        type: "integration";
                        integration: { integrationId: string; configurationId: string };
                      }
                    | null;
                  user: { id: string };
                }
              | { type: "app"; app: { id: string; clientId?: string | undefined } }
              | {
                  type: "integration";
                  integration: { integrationId: string; configurationId: string };
                }
              | { type: "system" }
            )
          | undefined;
        alias: Array<{
          configuredBy?: ("A" | "CNAME" | "dns-01" | "http" | "null" | null) | undefined;
          configuredChangedAt?: (number | null) | undefined;
          createdAt?: (number | null) | undefined;
          deployment: {
            id: string;
            alias?: Array<string> | undefined;
            aliasAssigned?: (number | boolean | null) | undefined;
            aliasError?: ({ code: string; message: string } | null) | undefined;
            aliasFinal?: (string | null) | undefined;
            automaticAliases?: Array<string> | undefined;
            branchMatcher?:
              | { type: "endsWith" | "equals" | "startsWith"; pattern: string }
              | undefined;
            buildingAt?: number | undefined;
            builds?:
              | Array<{ use: string; src?: string | undefined; dest?: string | undefined }>
              | undefined;
            checksConclusion?: ("canceled" | "failed" | "skipped" | "succeeded") | undefined;
            checksState?: ("completed" | "registered" | "running") | undefined;
            connectBuildsEnabled?: boolean | undefined;
            connectConfigurationId?: string | undefined;
            createdAt: number;
            createdIn: string;
            creator: {
              email: string;
              githubLogin?: string | undefined;
              gitlabLogin?: string | undefined;
              uid: string;
              username: string;
            } | null;
            deletedAt?: number | undefined;
            deploymentHostname: string;
            forced?: boolean | undefined;
            name: string;
            meta?: Record<string, string> | undefined;
            monorepoManager?: (string | null) | undefined;
            oidcTokenClaims?:
              | {
                  iss: string;
                  sub: string;
                  scope: string;
                  aud: string;
                  owner: string;
                  owner_id: string;
                  project: string;
                  project_id: string;
                  environment: string;
                  custom_environment_id?: string | undefined;
                  mfe_group_ids?: Array<string> | undefined;
                  plan?: string | undefined;
                }
              | undefined;
            plan: "enterprise" | "hobby" | "pro";
            previewCommentsEnabled?: boolean | undefined;
            private: boolean;
            readyAt?: number | undefined;
            readyState:
              | "BLOCKED"
              | "BUILDING"
              | "CANCELED"
              | "ERROR"
              | "INITIALIZING"
              | "QUEUED"
              | "READY";
            readySubstate?: ("PROMOTED" | "ROLLING" | "STAGED") | undefined;
            requestedAt?: number | undefined;
            target?: (string | null) | undefined;
            teamId?: (string | null) | undefined;
            type: "LAMBDAS";
            url: string;
            userId?: string | undefined;
            withCache?: boolean | undefined;
          } | null;
          domain: string;
          environment: "preview" | "production";
          gitBranch?: (string | null) | undefined;
          redirect?: (string | null) | undefined;
          redirectStatusCode?: (number | null) | undefined;
          target: "PREVIEW" | "PRODUCTION" | "STAGING";
        }>;
        analytics?:
          | {
              id: string;
              canceledAt?: (number | null) | undefined;
              disabledAt: number;
              enabledAt: number;
              paidAt?: number | undefined;
              sampleRatePercent?: (number | null) | undefined;
              spendLimitInDollars?: (number | null) | undefined;
            }
          | undefined;
        appliedCve55182Migration?: boolean | undefined;
        autoExposeSystemEnvs?: boolean | undefined;
        autoAssignCustomDomains?: boolean | undefined;
        autoAssignCustomDomainsUpdatedBy?: string | undefined;
        buildCommand?: (string | null) | undefined;
        commandForIgnoringBuildStep?: (string | null) | undefined;
        customerSupportCodeVisibility?: boolean | undefined;
        createdAt?: number | undefined;
        devCommand?: (string | null) | undefined;
        directoryListing: boolean;
        deploymentExpiration: {
          expirationDays?: number | undefined;
          expirationDaysProduction?: number | undefined;
          expirationDaysCanceled?: number | undefined;
          expirationDaysErrored?: number | undefined;
          deploymentsToKeep?: number | undefined;
        };
        installCommand?: (string | null) | undefined;
        ipBuckets?:
          | Array<{
              bucket: string;
              default?: boolean | undefined;
              supportUntil?: number | undefined;
            }>
          | undefined;
        env?:
          | Array<{
              target?:
                | (
                    | Array<"development" | "development" | "preview" | "preview" | "production">
                    | "development"
                    | "development"
                    | "preview"
                    | "preview"
                    | "production"
                  )
                | undefined;
              type: "encrypted" | "plain" | "secret" | "sensitive" | "system";
              sunsetSecretId?: string | undefined;
              legacyValue?: string | undefined;
              decrypted?: boolean | undefined;
              value: string;
              vsmValue?: string | undefined;
              id?: string | undefined;
              key: string;
              configurationId?: (string | null) | undefined;
              createdAt?: number | undefined;
              updatedAt?: number | undefined;
              createdBy?: (string | null) | undefined;
              updatedBy?: (string | null) | undefined;
              gitBranch?: string | undefined;
              visibility?: ("config" | "secret") | undefined;
              edgeConfigId?: (string | null) | undefined;
              edgeConfigTokenId?: (string | null) | undefined;
              contentHint?:
                | (
                    | { type: "redis-url"; storeId: string }
                    | { type: "redis-rest-api-url"; storeId: string }
                    | { type: "redis-rest-api-token"; storeId: string }
                    | { type: "redis-rest-api-read-only-token"; storeId: string }
                    | { type: "blob-read-write-token"; storeId: string }
                    | { type: "blob-store-id"; storeId: string }
                    | { type: "blob-webhook-public-key"; storeId: string }
                    | { type: "postgres-url"; storeId: string }
                    | { type: "postgres-url-non-pooling"; storeId: string }
                    | { type: "postgres-prisma-url"; storeId: string }
                    | { type: "postgres-user"; storeId: string }
                    | { type: "postgres-host"; storeId: string }
                    | { type: "postgres-password"; storeId: string }
                    | { type: "postgres-database"; storeId: string }
                    | { type: "postgres-url-no-ssl"; storeId: string }
                    | {
                        type: "integration-store-secret";
                        storeId: string;
                        integrationId: string;
                        integrationProductId: string;
                        integrationConfigurationId: string;
                      }
                    | { type: "flags-connection-string"; projectId: string }
                    | null
                  )
                | undefined;
              internalContentHint?:
                | ({ type: "flags-secret"; encryptedValue: string } | null)
                | undefined;
              comment?: string | undefined;
              customEnvironmentIds?: Array<string> | undefined;
            }>
          | undefined;
        framework?:
          | (
              | "actix-web"
              | "angular"
              | "ash"
              | "astro"
              | "axum"
              | "blitzjs"
              | "brunch"
              | "bun"
              | "container"
              | "create-react-app"
              | "django"
              | "docusaurus"
              | "docusaurus-2"
              | "dojo"
              | "eleventy"
              | "elysia"
              | "ember"
              | "eve"
              | "express"
              | "fastapi"
              | "fasthtml"
              | "fastify"
              | "flask"
              | "gatsby"
              | "go"
              | "gridsome"
              | "h3"
              | "hexo"
              | "hono"
              | "hugo"
              | "hydrogen"
              | "ionic-angular"
              | "ionic-react"
              | "jekyll"
              | "koa"
              | "mastra"
              | "middleman"
              | "nestjs"
              | "nextjs"
              | "nitro"
              | "node"
              | "nuxtjs"
              | "parcel"
              | "polymer"
              | "preact"
              | "python"
              | "react-router"
              | "redwoodjs"
              | "remix"
              | "ruby"
              | "rust"
              | "saber"
              | "sanity"
              | "sanity-v2"
              | "sapper"
              | "scully"
              | "services"
              | "solidstart"
              | "solidstart-1"
              | "stencil"
              | "storybook"
              | "svelte"
              | "sveltekit"
              | "sveltekit-1"
              | "tanstack-start"
              | "tanstack-start-lovable"
              | "umijs"
              | "vite"
              | "vitepress"
              | "vue"
              | "vuepress"
              | "xmcp"
              | "zola"
              | "null"
              | null
            )
          | undefined;
        gitForkProtection?: boolean | undefined;
        id: string;
        latestDeployments?:
          | Array<{
              id: string;
              alias?: Array<string> | undefined;
              aliasAssigned?: (number | boolean | null) | undefined;
              aliasError?: ({ code: string; message: string } | null) | undefined;
              aliasFinal?: (string | null) | undefined;
              automaticAliases?: Array<string> | undefined;
              branchMatcher?:
                | { type: "endsWith" | "equals" | "startsWith"; pattern: string }
                | undefined;
              buildingAt?: number | undefined;
              builds?:
                | Array<{ use: string; src?: string | undefined; dest?: string | undefined }>
                | undefined;
              checksConclusion?: ("canceled" | "failed" | "skipped" | "succeeded") | undefined;
              checksState?: ("completed" | "registered" | "running") | undefined;
              connectBuildsEnabled?: boolean | undefined;
              connectConfigurationId?: string | undefined;
              createdAt: number;
              createdIn: string;
              creator: {
                email: string;
                githubLogin?: string | undefined;
                gitlabLogin?: string | undefined;
                uid: string;
                username: string;
              } | null;
              deletedAt?: number | undefined;
              deploymentHostname: string;
              forced?: boolean | undefined;
              name: string;
              meta?: Record<string, string> | undefined;
              monorepoManager?: (string | null) | undefined;
              oidcTokenClaims?:
                | {
                    iss: string;
                    sub: string;
                    scope: string;
                    aud: string;
                    owner: string;
                    owner_id: string;
                    project: string;
                    project_id: string;
                    environment: string;
                    custom_environment_id?: string | undefined;
                    mfe_group_ids?: Array<string> | undefined;
                    plan?: string | undefined;
                  }
                | undefined;
              plan: "enterprise" | "hobby" | "pro";
              previewCommentsEnabled?: boolean | undefined;
              private: boolean;
              readyAt?: number | undefined;
              readyState:
                | "BLOCKED"
                | "BUILDING"
                | "CANCELED"
                | "ERROR"
                | "INITIALIZING"
                | "QUEUED"
                | "READY";
              readySubstate?: ("PROMOTED" | "ROLLING" | "STAGED") | undefined;
              requestedAt?: number | undefined;
              target?: (string | null) | undefined;
              teamId?: (string | null) | undefined;
              type: "LAMBDAS";
              url: string;
              userId?: string | undefined;
              withCache?: boolean | undefined;
            }>
          | undefined;
        link?:
          | (
              | {
                  org: string;
                  repoOwnerId?: number | undefined;
                  repo?: string | undefined;
                  repoId?: number | undefined;
                  type: "github";
                  createdAt?: number | undefined;
                  deployHooks: Array<{
                    createdAt?: number | undefined;
                    id: string;
                    name: string;
                    ref: string;
                    url: string;
                  }>;
                  gitCredentialId: string;
                  updatedAt?: number | undefined;
                  sourceless?: boolean | undefined;
                  productionBranch: string;
                }
              | {
                  type: "github-limited";
                  repo?: string | undefined;
                  repoId?: number | undefined;
                  createdAt?: number | undefined;
                  updatedAt?: number | undefined;
                  org: string;
                  repoOwnerId?: number | undefined;
                  deployHooks: Array<{
                    createdAt?: number | undefined;
                    id: string;
                    name: string;
                    ref: string;
                    url: string;
                  }>;
                  gitCredentialId: string;
                  sourceless?: boolean | undefined;
                  productionBranch: string;
                }
              | {
                  org: string;
                  repoOwnerId?: number | undefined;
                  repo?: string | undefined;
                  repoId?: number | undefined;
                  type: "github-custom-host";
                  host: string;
                  createdAt?: number | undefined;
                  deployHooks: Array<{
                    createdAt?: number | undefined;
                    id: string;
                    name: string;
                    ref: string;
                    url: string;
                  }>;
                  gitCredentialId: string;
                  updatedAt?: number | undefined;
                  sourceless?: boolean | undefined;
                  productionBranch: string;
                }
              | {
                  projectId: string;
                  projectName: string;
                  projectNameWithNamespace: string;
                  projectNamespace: string;
                  projectOwnerId?: number | undefined;
                  projectUrl: string;
                  type: "gitlab";
                  createdAt?: number | undefined;
                  deployHooks: Array<{
                    createdAt?: number | undefined;
                    id: string;
                    name: string;
                    ref: string;
                    url: string;
                  }>;
                  gitCredentialId: string;
                  updatedAt?: number | undefined;
                  sourceless?: boolean | undefined;
                  productionBranch: string;
                }
              | {
                  name: string;
                  slug: string;
                  owner: string;
                  type: "bitbucket";
                  uuid: string;
                  workspaceUuid: string;
                  createdAt?: number | undefined;
                  deployHooks: Array<{
                    createdAt?: number | undefined;
                    id: string;
                    name: string;
                    ref: string;
                    url: string;
                  }>;
                  gitCredentialId: string;
                  updatedAt?: number | undefined;
                  sourceless?: boolean | undefined;
                  productionBranch: string;
                }
              | {
                  org: string;
                  repo: string;
                  type: "vercel";
                  createdAt?: number | undefined;
                  deployHooks: Array<{
                    createdAt?: number | undefined;
                    id: string;
                    name: string;
                    ref: string;
                    url: string;
                  }>;
                  gitCredentialId: string;
                  updatedAt?: number | undefined;
                  sourceless?: boolean | undefined;
                  productionBranch: string;
                }
              | {
                  owner: string;
                  repo: string;
                  repoId: string;
                  ownerId: string;
                  type: "cursor-origin";
                  createdAt?: number | undefined;
                  deployHooks: Array<{
                    createdAt?: number | undefined;
                    id: string;
                    name: string;
                    ref: string;
                    url: string;
                  }>;
                  gitCredentialId: string;
                  updatedAt?: number | undefined;
                  sourceless?: boolean | undefined;
                  productionBranch: string;
                }
            )
          | undefined;
        name: string;
        nodeVersion:
          | "10.x"
          | "12.x"
          | "14.x"
          | "16.x"
          | "18.x"
          | "20.x"
          | "22.x"
          | "24.x"
          | "8.10.x";
        outputDirectory?: (string | null) | undefined;
        passwordProtection?: (Record<string, never> | null) | undefined;
        passport?:
          | ({
              deploymentType:
                | "all"
                | "all_except_custom_domains"
                | "preview"
                | "prod_deployment_urls_and_all_previews";
              connectorId: string;
            } | null)
          | undefined;
        resourceConfig: {
          elasticConcurrencyEnabled?: boolean | undefined;
          fluid?: boolean | undefined;
          functionDefaultRegions: Array<string>;
          functionDefaultTimeout?: number | undefined;
          functionDefaultMemoryType?:
            | ("performance" | "performance_xl" | "standard" | "standard_legacy")
            | undefined;
          functionZeroConfigFailover?: boolean | undefined;
          buildMachineType?: ("basic" | "enhanced" | "standard" | "turbo") | undefined;
          buildMachineSelection?: ("elastic" | "fixed") | undefined;
          buildMachineElasticLastUpdated?: number | undefined;
          buildMachineElasticReason?:
            | (
                | "basic-floor"
                | "build-timeout-failure"
                | "enospc-failure"
                | "enterprise-floor"
                | "high-peak-disk"
                | "high-peak-memory"
                | "long-build-duration"
                | "oom-failure"
                | "short-build-duration"
                | "sustained-high-cpu"
              )
            | undefined;
          isNSNBDisabled?: boolean | undefined;
          buildQueue?:
            | { configuration?: ("SKIP_NAMESPACE_QUEUE" | "WAIT_FOR_NAMESPACE_QUEUE") | undefined }
            | undefined;
          enableFunctionsBeta?: boolean | undefined;
        };
        rollingRelease?:
          | ({
              target: string;
              stages?:
                | (Array<{
                    targetPercentage: number;
                    requireApproval?: boolean | undefined;
                    duration?: number | undefined;
                    linearShift?: boolean | undefined;
                  }> | null)
                | undefined;
              canaryResponseHeader?: boolean | undefined;
              gate?:
                | {
                    enabled: boolean;
                    checks: Array<{
                      type: "error-rate-5xx";
                      minSampleSize?: number | undefined;
                      excludeStatusCodes?: Array<number> | undefined;
                      excludePaths?: Array<string> | undefined;
                      ingestWatermarkSeconds?: number | undefined;
                    }>;
                    failureThreshold?: number | undefined;
                    windowSize?: number | undefined;
                    action: "pause" | "rollback";
                    dryRun: boolean;
                  }
                | undefined;
            } | null)
          | undefined;
        rootDirectory?: (string | null) | undefined;
        serverlessFunctionRegion: string;
        serverlessFunctionZeroConfigFailover?: boolean | undefined;
        speedInsights?:
          | {
              id: string;
              enabledAt?: number | undefined;
              disabledAt?: number | undefined;
              canceledAt?: number | undefined;
              hasData?: boolean | undefined;
              dataReceivedAt?: number | undefined;
              paidAt?: number | undefined;
            }
          | undefined;
        skipGitConnectDuringLink?: boolean | undefined;
        sourceFilesOutsideRootDirectory?: boolean | undefined;
        ssoProtection?:
          | ({
              deploymentType:
                | "all"
                | "all_except_custom_domains"
                | "preview"
                | "prod_deployment_urls_and_all_previews";
              cve55182MigrationAppliedFrom?:
                | (
                    | "all"
                    | "all_except_custom_domains"
                    | "preview"
                    | "prod_deployment_urls_and_all_previews"
                    | "null"
                    | null
                  )
                | undefined;
              april2026SecurityIncidentMigrationAppliedFrom?:
                | (
                    | "all"
                    | "all_except_custom_domains"
                    | "preview"
                    | "prod_deployment_urls_and_all_previews"
                    | "null"
                    | null
                  )
                | undefined;
            } | null)
          | undefined;
        targets?:
          | Record<
              string,
              {
                id: string;
                alias?: Array<string> | undefined;
                aliasAssigned?: (number | boolean | null) | undefined;
                aliasError?: ({ code: string; message: string } | null) | undefined;
                aliasFinal?: (string | null) | undefined;
                automaticAliases?: Array<string> | undefined;
                branchMatcher?:
                  | { type: "endsWith" | "equals" | "startsWith"; pattern: string }
                  | undefined;
                buildingAt?: number | undefined;
                builds?:
                  | Array<{ use: string; src?: string | undefined; dest?: string | undefined }>
                  | undefined;
                checksConclusion?: ("canceled" | "failed" | "skipped" | "succeeded") | undefined;
                checksState?: ("completed" | "registered" | "running") | undefined;
                connectBuildsEnabled?: boolean | undefined;
                connectConfigurationId?: string | undefined;
                createdAt: number;
                createdIn: string;
                creator: {
                  email: string;
                  githubLogin?: string | undefined;
                  gitlabLogin?: string | undefined;
                  uid: string;
                  username: string;
                } | null;
                deletedAt?: number | undefined;
                deploymentHostname: string;
                forced?: boolean | undefined;
                name: string;
                meta?: Record<string, string> | undefined;
                monorepoManager?: (string | null) | undefined;
                oidcTokenClaims?:
                  | {
                      iss: string;
                      sub: string;
                      scope: string;
                      aud: string;
                      owner: string;
                      owner_id: string;
                      project: string;
                      project_id: string;
                      environment: string;
                      custom_environment_id?: string | undefined;
                      mfe_group_ids?: Array<string> | undefined;
                      plan?: string | undefined;
                    }
                  | undefined;
                plan: "enterprise" | "hobby" | "pro";
                previewCommentsEnabled?: boolean | undefined;
                private: boolean;
                readyAt?: number | undefined;
                readyState:
                  | "BLOCKED"
                  | "BUILDING"
                  | "CANCELED"
                  | "ERROR"
                  | "INITIALIZING"
                  | "QUEUED"
                  | "READY";
                readySubstate?: ("PROMOTED" | "ROLLING" | "STAGED") | undefined;
                requestedAt?: number | undefined;
                target?: (string | null) | undefined;
                teamId?: (string | null) | undefined;
                type: "LAMBDAS";
                url: string;
                userId?: string | undefined;
                withCache?: boolean | undefined;
              } | null
            >
          | undefined;
        transferCompletedAt?: number | undefined;
        transferStartedAt?: number | undefined;
        transferToAccountId?: string | undefined;
        transferredFromAccountId?: string | undefined;
        trustedSources?:
          | ({
              projects?:
                | Record<
                    string,
                    {
                      label?: string | undefined;
                      customAllow?:
                        | Array<{
                            from:
                              | { slugs: Array<string>; preset?: "all-custom" | undefined }
                              | { slugs?: Array<string> | undefined; preset: "all-custom" };
                            to:
                              | { slugs: Array<string>; preset?: "all-custom" | undefined }
                              | { slugs?: Array<string> | undefined; preset: "all-custom" };
                          }>
                        | undefined;
                    }
                  >
                | undefined;
              oidcProviders?:
                | Record<
                    string,
                    Array<{
                      to:
                        | { slugs: Array<string>; preset?: "all-custom" | undefined }
                        | { slugs?: Array<string> | undefined; preset: "all-custom" };
                      label?: string | undefined;
                      claims: Record<string, Array<string>>;
                    }>
                  >
                | undefined;
            } | null)
          | undefined;
        updatedAt?: number | undefined;
        live?: boolean | undefined;
        hasActiveBranches?: boolean | undefined;
        gitComments?: { onPullRequest: boolean; onCommit: boolean } | undefined;
        gitProviderOptions?:
          | {
              createDeployments: "disabled" | "enabled";
              disableRepositoryDispatchEvents?: boolean | undefined;
              requireVerifiedCommits?: boolean | undefined;
              gitCommitStatus?: boolean | undefined;
              consolidatedGitCommitStatus?:
                | { enabled: boolean; propagateFailures: boolean }
                | undefined;
            }
          | undefined;
        paused?: boolean | undefined;
        webAnalytics?:
          | {
              id: string;
              disabledAt?: number | undefined;
              canceledAt?: number | undefined;
              enabledAt?: number | undefined;
              hasData?: true | undefined;
            }
          | undefined;
        security?:
          | {
              attackModeEnabled?: boolean | undefined;
              attackModeUpdatedAt?: number | undefined;
              firewallEnabled?: boolean | undefined;
              firewallUpdatedAt?: number | undefined;
              attackModeActiveUntil?: (number | null) | undefined;
              firewallConfigVersion?: number | undefined;
              firewallRoutes?:
                | Array<{
                    src?:
                      | (
                          | string
                          | {
                              re?: string | undefined;
                              eq?: string | undefined;
                              neq?: string | undefined;
                              inc?: Array<string> | undefined;
                              ninc?: Array<string> | undefined;
                              pre?: string | undefined;
                              suf?: string | undefined;
                              gt?: number | undefined;
                              gte?: number | undefined;
                              lt?: number | undefined;
                              lte?: number | undefined;
                              list?: string | undefined;
                            }
                        )
                      | undefined;
                    tierRequirement?: ("advanced" | "critical") | undefined;
                    has?:
                      | Array<{
                          type:
                            | "cookie"
                            | "domain_environment"
                            | "environment"
                            | "header"
                            | "headers"
                            | "host"
                            | "initial_request_path"
                            | "ip_address"
                            | "method"
                            | "path"
                            | "protocol"
                            | "query"
                            | "region"
                            | "scheme"
                            | "trusted_source";
                          key?: string | undefined;
                          value?:
                            | (
                                | string
                                | {
                                    re?: string | undefined;
                                    eq?: string | undefined;
                                    neq?: string | undefined;
                                    inc?: Array<string> | undefined;
                                    ninc?: Array<string> | undefined;
                                    pre?: string | undefined;
                                    suf?: string | undefined;
                                    gt?: number | undefined;
                                    gte?: number | undefined;
                                    lt?: number | undefined;
                                    lte?: number | undefined;
                                    list?: string | undefined;
                                  }
                              )
                            | undefined;
                        }>
                      | undefined;
                    missing?:
                      | Array<{
                          type:
                            | "cookie"
                            | "domain_environment"
                            | "environment"
                            | "header"
                            | "headers"
                            | "host"
                            | "initial_request_path"
                            | "ip_address"
                            | "method"
                            | "path"
                            | "protocol"
                            | "query"
                            | "region"
                            | "scheme"
                            | "trusted_source";
                          key?: string | undefined;
                          value?:
                            | (
                                | string
                                | {
                                    re?: string | undefined;
                                    eq?: string | undefined;
                                    neq?: string | undefined;
                                    inc?: Array<string> | undefined;
                                    ninc?: Array<string> | undefined;
                                    pre?: string | undefined;
                                    suf?: string | undefined;
                                    gt?: number | undefined;
                                    gte?: number | undefined;
                                    lt?: number | undefined;
                                    lte?: number | undefined;
                                    list?: string | undefined;
                                  }
                              )
                            | undefined;
                        }>
                      | undefined;
                    dest?: string | undefined;
                    status?: number | undefined;
                    handle?: ("finalize" | "init") | undefined;
                    mitigate?:
                      | {
                          action:
                            | "bypass"
                            | "challenge"
                            | "deny"
                            | "log"
                            | "rate_limit"
                            | "redirect";
                          rule_id: string;
                          ttl?: number | undefined;
                          erl?:
                            | {
                                algo: "fixed_window" | "token_bucket";
                                window: number;
                                limit: number;
                                keys: Array<string>;
                              }
                            | undefined;
                          log_headers?: (Array<string> | "*") | undefined;
                        }
                      | undefined;
                    transforms?:
                      | Array<{
                          type: "request.headers";
                          op: "append";
                          target: { key: string };
                          args: string;
                        }>
                      | undefined;
                  }>
                | undefined;
              rulesets?:
                | Record<
                    string,
                    {
                      action:
                        | "allow"
                        | "bypass"
                        | "challenge"
                        | "deny"
                        | "log"
                        | "rate_limit"
                        | "redirect";
                      rateLimit?:
                        | ({
                            algo: "fixed_window" | "token_bucket";
                            window: number;
                            limit: number;
                            keys: Array<string>;
                          } | null)
                        | undefined;
                      redirect?: ({ location: string; permanent: boolean } | null) | undefined;
                      actionDuration?: (string | null) | undefined;
                      bypassSystem?: (boolean | null) | undefined;
                      logHeaders?: (Array<string> | "*") | undefined;
                    }
                  >
                | undefined;
              firewallSeawallEnabled?: boolean | undefined;
              ja3Enabled?: boolean | undefined;
              ja4Enabled?: boolean | undefined;
              firewallBypassIps?: Array<string> | undefined;
              managedRules?:
                | ({
                    vercel_ruleset: {
                      active: boolean;
                      action?: ("challenge" | "deny" | "log") | undefined;
                    };
                    traffic_sources: {
                      active: boolean;
                      action?: ("challenge" | "deny" | "log") | undefined;
                    };
                    bot_filter: {
                      active: boolean;
                      action?: ("challenge" | "deny" | "log") | undefined;
                    };
                    ai_bots: {
                      active: boolean;
                      action?: ("challenge" | "deny" | "log") | undefined;
                    };
                    owasp: { active: boolean; action?: ("challenge" | "deny" | "log") | undefined };
                  } | null)
                | undefined;
              botIdEnabled?: boolean | undefined;
              requestLogsKey?: Array<string> | undefined;
              log_headers?: (Array<string> | "*") | undefined;
              securityPlus?: boolean | undefined;
              securityPlusMetadata?:
                | { updatedAt: number; firstEnabledAt?: number | undefined }
                | undefined;
              pageIntegrityEnabled?: boolean | undefined;
            }
          | undefined;
        oidcTokenConfig?:
          | { enabled?: boolean | undefined; issuerMode?: ("global" | "team") | undefined }
          | undefined;
        tier?: ("advanced" | "critical") | undefined;
        abuse?:
          | {
              scanner?: string | undefined;
              history: Array<{
                scanner: string;
                reason: string;
                by: string;
                byId: string;
                at: number;
              }>;
              updatedAt: number;
              block?:
                | {
                    action: "blocked";
                    reason: string;
                    statusCode: number;
                    createdAt: number;
                    caseId?: string | undefined;
                    actor?: string | undefined;
                    comment?: string | undefined;
                    ineligibleForAppeal?: boolean | undefined;
                    isCascading?: boolean | undefined;
                  }
                | undefined;
              blockHistory?:
                | Array<
                    | {
                        action: "blocked";
                        reason: string;
                        statusCode: number;
                        createdAt: number;
                        caseId?: string | undefined;
                        actor?: string | undefined;
                        comment?: string | undefined;
                        ineligibleForAppeal?: boolean | undefined;
                        isCascading?: boolean | undefined;
                      }
                    | {
                        action: "unblocked";
                        createdAt: number;
                        caseId?: string | undefined;
                        actor?: string | undefined;
                        comment?: string | undefined;
                        ineligibleForAppeal?: boolean | undefined;
                        isCascading?: boolean | undefined;
                      }
                    | {
                        action: "route-blocked";
                        route:
                          | { src: string; status: number; expiry?: number | undefined }
                          | {
                              has: Array<
                                | {
                                    type: "header";
                                    key: "x-vercel-ip-country";
                                    value: { eq: string };
                                  }
                                | { type: "host"; value: { eq: string } }
                              >;
                              mitigate: { action: "block_legal_cwc" };
                              src?: string | undefined;
                            };
                        reason: string;
                        createdAt: number;
                        caseId?: string | undefined;
                        actor?: string | undefined;
                        comment?: string | undefined;
                        ineligibleForAppeal?: boolean | undefined;
                        isCascading?: boolean | undefined;
                      }
                    | {
                        action: "route-unblocked";
                        route:
                          | { src: string; status: number; expiry?: number | undefined }
                          | {
                              has: Array<
                                | {
                                    type: "header";
                                    key: "x-vercel-ip-country";
                                    value: { eq: string };
                                  }
                                | { type: "host"; value: { eq: string } }
                              >;
                              mitigate: { action: "block_legal_cwc" };
                              src?: string | undefined;
                            };
                        statusCode?: number | undefined;
                        createdAt: number;
                        caseId?: string | undefined;
                        actor?: string | undefined;
                        comment?: string | undefined;
                        ineligibleForAppeal?: boolean | undefined;
                        isCascading?: boolean | undefined;
                      }
                  >
                | undefined;
              interstitial?: boolean | undefined;
              interstitialHistory?:
                | Array<{
                    action:
                      | "add-deployment-interstitial"
                      | "add-project-interstitial"
                      | "remove-deployment-interstitial"
                      | "remove-project-interstitial";
                    createdAt: number;
                    caseId?: string | undefined;
                    reason?: string | undefined;
                    actor?: string | undefined;
                    comment?: string | undefined;
                  }>
                | undefined;
            }
          | undefined;
        internalRoutes?:
          | Array<
              | { src: string; status: number; expiry?: number | undefined }
              | {
                  has: Array<
                    | { type: "header"; key: "x-vercel-ip-country"; value: { eq: string } }
                    | { type: "host"; value: { eq: string } }
                  >;
                  mitigate: { action: "block_legal_cwc" };
                  src?: string | undefined;
                }
            >
          | undefined;
      }>;
      pagination: { count: number; next: string | null } | Pagination;
    }
  | {
      projects: Array<{
        accountId: string;
        creator?:
          | (
              | {
                  type: "user";
                  via:
                    | { type: "app"; app: { id: string; clientId?: string | undefined } }
                    | {
                        type: "integration";
                        integration: { integrationId: string; configurationId: string };
                      }
                    | null;
                  user: { id: string };
                }
              | { type: "app"; app: { id: string; clientId?: string | undefined } }
              | {
                  type: "integration";
                  integration: { integrationId: string; configurationId: string };
                }
              | { type: "system" }
            )
          | undefined;
        alias: Array<{
          configuredBy?: ("A" | "CNAME" | "dns-01" | "http" | "null" | null) | undefined;
          configuredChangedAt?: (number | null) | undefined;
          createdAt?: (number | null) | undefined;
          deployment: {
            id: string;
            alias?: Array<string> | undefined;
            aliasAssigned?: (number | boolean | null) | undefined;
            aliasError?: ({ code: string; message: string } | null) | undefined;
            aliasFinal?: (string | null) | undefined;
            automaticAliases?: Array<string> | undefined;
            branchMatcher?:
              | { type: "endsWith" | "equals" | "startsWith"; pattern: string }
              | undefined;
            buildingAt?: number | undefined;
            builds?:
              | Array<{ use: string; src?: string | undefined; dest?: string | undefined }>
              | undefined;
            checksConclusion?: ("canceled" | "failed" | "skipped" | "succeeded") | undefined;
            checksState?: ("completed" | "registered" | "running") | undefined;
            connectBuildsEnabled?: boolean | undefined;
            connectConfigurationId?: string | undefined;
            createdAt: number;
            createdIn: string;
            creator: {
              email: string;
              githubLogin?: string | undefined;
              gitlabLogin?: string | undefined;
              uid: string;
              username: string;
            } | null;
            deletedAt?: number | undefined;
            deploymentHostname: string;
            forced?: boolean | undefined;
            name: string;
            meta?: Record<string, string> | undefined;
            monorepoManager?: (string | null) | undefined;
            oidcTokenClaims?:
              | {
                  iss: string;
                  sub: string;
                  scope: string;
                  aud: string;
                  owner: string;
                  owner_id: string;
                  project: string;
                  project_id: string;
                  environment: string;
                  custom_environment_id?: string | undefined;
                  mfe_group_ids?: Array<string> | undefined;
                  plan?: string | undefined;
                }
              | undefined;
            plan: "enterprise" | "hobby" | "pro";
            previewCommentsEnabled?: boolean | undefined;
            private: boolean;
            readyAt?: number | undefined;
            readyState:
              | "BLOCKED"
              | "BUILDING"
              | "CANCELED"
              | "ERROR"
              | "INITIALIZING"
              | "QUEUED"
              | "READY";
            readySubstate?: ("PROMOTED" | "ROLLING" | "STAGED") | undefined;
            requestedAt?: number | undefined;
            target?: (string | null) | undefined;
            teamId?: (string | null) | undefined;
            type: "LAMBDAS";
            url: string;
            userId?: string | undefined;
            withCache?: boolean | undefined;
          } | null;
          domain: string;
          environment: "preview" | "production";
          gitBranch?: (string | null) | undefined;
          redirect?: (string | null) | undefined;
          redirectStatusCode?: (number | null) | undefined;
          target: "PREVIEW" | "PRODUCTION" | "STAGING";
        }>;
        analytics?:
          | {
              id: string;
              canceledAt?: (number | null) | undefined;
              disabledAt: number;
              enabledAt: number;
              paidAt?: number | undefined;
              sampleRatePercent?: (number | null) | undefined;
              spendLimitInDollars?: (number | null) | undefined;
            }
          | undefined;
        appliedCve55182Migration?: boolean | undefined;
        speedInsights?:
          | {
              id: string;
              enabledAt?: number | undefined;
              disabledAt?: number | undefined;
              canceledAt?: number | undefined;
              hasData?: boolean | undefined;
              dataReceivedAt?: number | undefined;
              paidAt?: number | undefined;
            }
          | undefined;
        autoExposeSystemEnvs?: boolean | undefined;
        autoAssignCustomDomains?: boolean | undefined;
        autoAssignCustomDomainsUpdatedBy?: string | undefined;
        buildCommand?: (string | null) | undefined;
        commandForIgnoringBuildStep?: (string | null) | undefined;
        connectConfigurations?:
          | (Array<{
              envId: string | "preview" | "production";
              connectConfigurationId: string;
              dc?: string | undefined;
              passive: boolean;
              buildsEnabled: boolean;
              aws?: { subnetIds: Array<string>; securityGroupId?: string | undefined } | undefined;
              createdAt: number;
              updatedAt: number;
            }> | null)
          | undefined;
        connectConfigurationId?: (string | null) | undefined;
        connectBuildsEnabled?: boolean | undefined;
        passiveConnectConfigurationId?: (string | null) | undefined;
        createdAt?: number | undefined;
        customerSupportCodeVisibility?: boolean | undefined;
        crons?:
          | {
              enabledAt: number;
              disabledAt: number | null;
              updatedAt: number;
              deploymentId: string | null;
              definitions: Array<{
                host: string;
                path: string;
                schedule: string;
                source?: "api" | undefined;
                description?: string | undefined;
                hostInferred?: boolean | undefined;
              }>;
            }
          | undefined;
        dataCache?:
          | {
              userDisabled: boolean;
              storageSizeBytes?: (number | null) | undefined;
              unlimited?: boolean | undefined;
            }
          | undefined;
        deploymentExpiration: {
          expirationDays?: number | undefined;
          expirationDaysProduction?: number | undefined;
          expirationDaysCanceled?: number | undefined;
          expirationDaysErrored?: number | undefined;
          deploymentsToKeep?: number | undefined;
        };
        expiration?: ({ expiresAt: number } | { lockedAt: number; lockedBy: string }) | undefined;
        devCommand?: (string | null) | undefined;
        directoryListing: boolean;
        installCommand?: (string | null) | undefined;
        env?:
          | Array<{
              target?:
                | (
                    | Array<"development" | "development" | "preview" | "preview" | "production">
                    | "development"
                    | "development"
                    | "preview"
                    | "preview"
                    | "production"
                  )
                | undefined;
              type: "encrypted" | "plain" | "secret" | "sensitive" | "system";
              sunsetSecretId?: string | undefined;
              legacyValue?: string | undefined;
              decrypted?: boolean | undefined;
              value: string;
              vsmValue?: string | undefined;
              id?: string | undefined;
              key: string;
              configurationId?: (string | null) | undefined;
              createdAt?: number | undefined;
              updatedAt?: number | undefined;
              createdBy?: (string | null) | undefined;
              updatedBy?: (string | null) | undefined;
              gitBranch?: string | undefined;
              visibility?: ("config" | "secret") | undefined;
              edgeConfigId?: (string | null) | undefined;
              edgeConfigTokenId?: (string | null) | undefined;
              contentHint?:
                | (
                    | { type: "redis-url"; storeId: string }
                    | { type: "redis-rest-api-url"; storeId: string }
                    | { type: "redis-rest-api-token"; storeId: string }
                    | { type: "redis-rest-api-read-only-token"; storeId: string }
                    | { type: "blob-read-write-token"; storeId: string }
                    | { type: "blob-store-id"; storeId: string }
                    | { type: "blob-webhook-public-key"; storeId: string }
                    | { type: "postgres-url"; storeId: string }
                    | { type: "postgres-url-non-pooling"; storeId: string }
                    | { type: "postgres-prisma-url"; storeId: string }
                    | { type: "postgres-user"; storeId: string }
                    | { type: "postgres-host"; storeId: string }
                    | { type: "postgres-password"; storeId: string }
                    | { type: "postgres-database"; storeId: string }
                    | { type: "postgres-url-no-ssl"; storeId: string }
                    | {
                        type: "integration-store-secret";
                        storeId: string;
                        integrationId: string;
                        integrationProductId: string;
                        integrationConfigurationId: string;
                      }
                    | { type: "flags-connection-string"; projectId: string }
                    | null
                  )
                | undefined;
              internalContentHint?:
                | ({ type: "flags-secret"; encryptedValue: string } | null)
                | undefined;
              comment?: string | undefined;
              customEnvironmentIds?: Array<string> | undefined;
            }>
          | undefined;
        customEnvironments?:
          | Array<{
              id: string;
              slug: string;
              type: "development" | "preview" | "production";
              description?: string | undefined;
              branchMatcher?:
                | { type: "endsWith" | "equals" | "startsWith"; pattern: string }
                | undefined;
              domains?:
                | Array<{
                    name: string;
                    apexName: string;
                    projectId: string;
                    redirect?: (string | null) | undefined;
                    redirectStatusCode?: (number | null) | undefined;
                    gitBranch?: (string | null) | undefined;
                    customEnvironmentId?: (string | null) | undefined;
                    updatedAt?: number | undefined;
                    createdAt?: number | undefined;
                    verified: boolean;
                    verification?:
                      | Array<{ type: string; domain: string; value: string; reason: string }>
                      | undefined;
                  }>
                | undefined;
              currentDeploymentAliases?: Array<string> | undefined;
              createdAt: number;
              updatedAt: number;
            }>
          | undefined;
        framework?:
          | (
              | "actix-web"
              | "angular"
              | "ash"
              | "astro"
              | "axum"
              | "blitzjs"
              | "brunch"
              | "bun"
              | "container"
              | "create-react-app"
              | "django"
              | "docusaurus"
              | "docusaurus-2"
              | "dojo"
              | "eleventy"
              | "elysia"
              | "ember"
              | "eve"
              | "express"
              | "fastapi"
              | "fasthtml"
              | "fastify"
              | "flask"
              | "gatsby"
              | "go"
              | "gridsome"
              | "h3"
              | "hexo"
              | "hono"
              | "hugo"
              | "hydrogen"
              | "ionic-angular"
              | "ionic-react"
              | "jekyll"
              | "koa"
              | "mastra"
              | "middleman"
              | "nestjs"
              | "nextjs"
              | "nitro"
              | "node"
              | "nuxtjs"
              | "parcel"
              | "polymer"
              | "preact"
              | "python"
              | "react-router"
              | "redwoodjs"
              | "remix"
              | "ruby"
              | "rust"
              | "saber"
              | "sanity"
              | "sanity-v2"
              | "sapper"
              | "scully"
              | "services"
              | "solidstart"
              | "solidstart-1"
              | "stencil"
              | "storybook"
              | "svelte"
              | "sveltekit"
              | "sveltekit-1"
              | "tanstack-start"
              | "tanstack-start-lovable"
              | "umijs"
              | "vite"
              | "vitepress"
              | "vue"
              | "vuepress"
              | "xmcp"
              | "zola"
              | "null"
              | null
            )
          | undefined;
        services?:
          | Array<{
              serviceName: string;
              serviceType?: ("cron" | "job" | "web" | "worker") | undefined;
              framework?:
                | (
                    | "actix-web"
                    | "angular"
                    | "ash"
                    | "astro"
                    | "axum"
                    | "blitzjs"
                    | "brunch"
                    | "bun"
                    | "container"
                    | "create-react-app"
                    | "django"
                    | "docusaurus"
                    | "docusaurus-2"
                    | "dojo"
                    | "eleventy"
                    | "elysia"
                    | "ember"
                    | "eve"
                    | "express"
                    | "fastapi"
                    | "fasthtml"
                    | "fastify"
                    | "flask"
                    | "gatsby"
                    | "go"
                    | "gridsome"
                    | "h3"
                    | "hexo"
                    | "hono"
                    | "hugo"
                    | "hydrogen"
                    | "ionic-angular"
                    | "ionic-react"
                    | "jekyll"
                    | "koa"
                    | "mastra"
                    | "middleman"
                    | "nestjs"
                    | "nextjs"
                    | "nitro"
                    | "node"
                    | "nuxtjs"
                    | "parcel"
                    | "polymer"
                    | "preact"
                    | "python"
                    | "react-router"
                    | "redwoodjs"
                    | "remix"
                    | "ruby"
                    | "rust"
                    | "saber"
                    | "sanity"
                    | "sanity-v2"
                    | "sapper"
                    | "scully"
                    | "services"
                    | "solidstart"
                    | "solidstart-1"
                    | "stencil"
                    | "storybook"
                    | "svelte"
                    | "sveltekit"
                    | "sveltekit-1"
                    | "tanstack-start"
                    | "tanstack-start-lovable"
                    | "umijs"
                    | "vite"
                    | "vitepress"
                    | "vue"
                    | "vuepress"
                    | "xmcp"
                    | "zola"
                  )
                | undefined;
              runtime?: string | undefined;
            }>
          | undefined;
        gitForkProtection?: boolean | undefined;
        gitLFS?: boolean | undefined;
        id: string;
        ipBuckets?:
          | Array<{
              bucket: string;
              default?: boolean | undefined;
              supportUntil?: number | undefined;
            }>
          | undefined;
        jobs?:
          | {
              lint?: { targets: Array<string> } | undefined;
              typecheck?: { targets: Array<string> } | undefined;
              "mfe-config-present"?: { targets: Array<string> } | undefined;
            }
          | undefined;
        latestDeployments?:
          | Array<{
              id: string;
              alias?: Array<string> | undefined;
              aliasAssigned?: (number | boolean | null) | undefined;
              aliasError?: ({ code: string; message: string } | null) | undefined;
              aliasFinal?: (string | null) | undefined;
              automaticAliases?: Array<string> | undefined;
              branchMatcher?:
                | { type: "endsWith" | "equals" | "startsWith"; pattern: string }
                | undefined;
              buildingAt?: number | undefined;
              builds?:
                | Array<{ use: string; src?: string | undefined; dest?: string | undefined }>
                | undefined;
              checksConclusion?: ("canceled" | "failed" | "skipped" | "succeeded") | undefined;
              checksState?: ("completed" | "registered" | "running") | undefined;
              connectBuildsEnabled?: boolean | undefined;
              connectConfigurationId?: string | undefined;
              createdAt: number;
              createdIn: string;
              creator: {
                email: string;
                githubLogin?: string | undefined;
                gitlabLogin?: string | undefined;
                uid: string;
                username: string;
              } | null;
              deletedAt?: number | undefined;
              deploymentHostname: string;
              forced?: boolean | undefined;
              name: string;
              meta?: Record<string, string> | undefined;
              monorepoManager?: (string | null) | undefined;
              oidcTokenClaims?:
                | {
                    iss: string;
                    sub: string;
                    scope: string;
                    aud: string;
                    owner: string;
                    owner_id: string;
                    project: string;
                    project_id: string;
                    environment: string;
                    custom_environment_id?: string | undefined;
                    mfe_group_ids?: Array<string> | undefined;
                    plan?: string | undefined;
                  }
                | undefined;
              plan: "enterprise" | "hobby" | "pro";
              previewCommentsEnabled?: boolean | undefined;
              private: boolean;
              readyAt?: number | undefined;
              readyState:
                | "BLOCKED"
                | "BUILDING"
                | "CANCELED"
                | "ERROR"
                | "INITIALIZING"
                | "QUEUED"
                | "READY";
              readySubstate?: ("PROMOTED" | "ROLLING" | "STAGED") | undefined;
              requestedAt?: number | undefined;
              target?: (string | null) | undefined;
              teamId?: (string | null) | undefined;
              type: "LAMBDAS";
              url: string;
              userId?: string | undefined;
              withCache?: boolean | undefined;
            }>
          | undefined;
        link?:
          | (
              | {
                  org: string;
                  repoOwnerId?: number | undefined;
                  repo?: string | undefined;
                  repoId?: number | undefined;
                  type: "github";
                  createdAt?: number | undefined;
                  deployHooks: Array<{
                    createdAt?: number | undefined;
                    id: string;
                    name: string;
                    ref: string;
                    url: string;
                  }>;
                  gitCredentialId: string;
                  updatedAt?: number | undefined;
                  sourceless?: boolean | undefined;
                  productionBranch: string;
                }
              | {
                  type: "github-limited";
                  repo?: string | undefined;
                  repoId?: number | undefined;
                  createdAt?: number | undefined;
                  updatedAt?: number | undefined;
                  org: string;
                  repoOwnerId?: number | undefined;
                  deployHooks: Array<{
                    createdAt?: number | undefined;
                    id: string;
                    name: string;
                    ref: string;
                    url: string;
                  }>;
                  gitCredentialId: string;
                  sourceless?: boolean | undefined;
                  productionBranch: string;
                }
              | {
                  org: string;
                  repoOwnerId?: number | undefined;
                  repo?: string | undefined;
                  repoId?: number | undefined;
                  type: "github-custom-host";
                  host: string;
                  createdAt?: number | undefined;
                  deployHooks: Array<{
                    createdAt?: number | undefined;
                    id: string;
                    name: string;
                    ref: string;
                    url: string;
                  }>;
                  gitCredentialId: string;
                  updatedAt?: number | undefined;
                  sourceless?: boolean | undefined;
                  productionBranch: string;
                }
              | {
                  projectId: string;
                  projectName: string;
                  projectNameWithNamespace: string;
                  projectNamespace: string;
                  projectOwnerId?: number | undefined;
                  projectUrl: string;
                  type: "gitlab";
                  createdAt?: number | undefined;
                  deployHooks: Array<{
                    createdAt?: number | undefined;
                    id: string;
                    name: string;
                    ref: string;
                    url: string;
                  }>;
                  gitCredentialId: string;
                  updatedAt?: number | undefined;
                  sourceless?: boolean | undefined;
                  productionBranch: string;
                }
              | {
                  name: string;
                  slug: string;
                  owner: string;
                  type: "bitbucket";
                  uuid: string;
                  workspaceUuid: string;
                  createdAt?: number | undefined;
                  deployHooks: Array<{
                    createdAt?: number | undefined;
                    id: string;
                    name: string;
                    ref: string;
                    url: string;
                  }>;
                  gitCredentialId: string;
                  updatedAt?: number | undefined;
                  sourceless?: boolean | undefined;
                  productionBranch: string;
                }
              | {
                  org: string;
                  repo: string;
                  type: "vercel";
                  createdAt?: number | undefined;
                  deployHooks: Array<{
                    createdAt?: number | undefined;
                    id: string;
                    name: string;
                    ref: string;
                    url: string;
                  }>;
                  gitCredentialId: string;
                  updatedAt?: number | undefined;
                  sourceless?: boolean | undefined;
                  productionBranch: string;
                }
              | {
                  owner: string;
                  repo: string;
                  repoId: string;
                  ownerId: string;
                  type: "cursor-origin";
                  createdAt?: number | undefined;
                  deployHooks: Array<{
                    createdAt?: number | undefined;
                    id: string;
                    name: string;
                    ref: string;
                    url: string;
                  }>;
                  gitCredentialId: string;
                  updatedAt?: number | undefined;
                  sourceless?: boolean | undefined;
                  productionBranch: string;
                }
            )
          | undefined;
        blobs?: { isDefaultApp?: boolean | undefined } | undefined;
        microfrontends?:
          | (
              | {
                  isDefaultApp: true;
                  updatedAt: number;
                  groupIds: Array<string>;
                  enabled: true;
                  defaultRoute?: string | undefined;
                  freeProjectForLegacyLimits?: boolean | undefined;
                }
              | {
                  isDefaultApp?: false | undefined;
                  routeObservabilityToThisProject?: boolean | undefined;
                  doNotRouteWithMicrofrontendsRouting?: boolean | undefined;
                  updatedAt: number;
                  groupIds: Array<string>;
                  enabled: true;
                  defaultRoute?: string | undefined;
                  freeProjectForLegacyLimits?: boolean | undefined;
                }
              | {
                  updatedAt: number;
                  groupIds: Array<unknown>;
                  enabled: false;
                  freeProjectForLegacyLimits?: boolean | undefined;
                }
            )
          | undefined;
        name: string;
        nodeVersion:
          | "10.x"
          | "12.x"
          | "14.x"
          | "16.x"
          | "18.x"
          | "20.x"
          | "22.x"
          | "24.x"
          | "8.10.x";
        optionsAllowlist?: ({ paths: Array<{ value: string }> } | null) | undefined;
        outputDirectory?: (string | null) | undefined;
        passwordProtection?: (Record<string, never> | null) | undefined;
        passport?:
          | ({
              deploymentType:
                | "all"
                | "all_except_custom_domains"
                | "preview"
                | "prod_deployment_urls_and_all_previews";
              connectorId: string;
            } | null)
          | undefined;
        protectionConfig?:
          | { sandboxUrls?: { inheritDeploymentProtection?: boolean | undefined } | undefined }
          | undefined;
        sandbox?:
          | {
              region?:
                | (
                    | "arn1"
                    | "bom1"
                    | "cdg1"
                    | "cle1"
                    | "cpt1"
                    | "dub1"
                    | "fra1"
                    | "gru1"
                    | "hkg1"
                    | "hnd1"
                    | "iad1"
                    | "icn1"
                    | "kix1"
                    | "lhr1"
                    | "pdx1"
                    | "sfo1"
                    | "sin1"
                    | "syd1"
                    | "yul1"
                  )
                | undefined;
              failoverRegions?:
                | Array<
                    | "arn1"
                    | "bom1"
                    | "cdg1"
                    | "cle1"
                    | "cpt1"
                    | "dub1"
                    | "fra1"
                    | "gru1"
                    | "hkg1"
                    | "hnd1"
                    | "iad1"
                    | "icn1"
                    | "kix1"
                    | "lhr1"
                    | "pdx1"
                    | "sfo1"
                    | "sin1"
                    | "syd1"
                    | "yul1"
                  >
                | undefined;
            }
          | undefined;
        productionDeploymentsFastLane?: boolean | undefined;
        resourceConfig: {
          elasticConcurrencyEnabled?: boolean | undefined;
          fluid?: boolean | undefined;
          functionDefaultRegions: Array<string>;
          functionDefaultTimeout?: number | undefined;
          functionDefaultMemoryType?:
            | ("performance" | "performance_xl" | "standard" | "standard_legacy")
            | undefined;
          functionZeroConfigFailover?: boolean | undefined;
          buildMachineType?: ("basic" | "enhanced" | "standard" | "turbo") | undefined;
          buildMachineSelection?: ("elastic" | "fixed") | undefined;
          buildMachineElasticLastUpdated?: number | undefined;
          buildMachineElasticReason?:
            | (
                | "basic-floor"
                | "build-timeout-failure"
                | "enospc-failure"
                | "enterprise-floor"
                | "high-peak-disk"
                | "high-peak-memory"
                | "long-build-duration"
                | "oom-failure"
                | "short-build-duration"
                | "sustained-high-cpu"
              )
            | undefined;
          isNSNBDisabled?: boolean | undefined;
          buildQueue?:
            | { configuration?: ("SKIP_NAMESPACE_QUEUE" | "WAIT_FOR_NAMESPACE_QUEUE") | undefined }
            | undefined;
          enableFunctionsBeta?: boolean | undefined;
        };
        rollbackDescription?:
          | { userId: string; username: string; description: string; createdAt: number }
          | undefined;
        rollingRelease?:
          | ({
              target: string;
              stages?:
                | (Array<{
                    targetPercentage: number;
                    requireApproval?: boolean | undefined;
                    duration?: number | undefined;
                    linearShift?: boolean | undefined;
                  }> | null)
                | undefined;
              canaryResponseHeader?: boolean | undefined;
              gate?:
                | {
                    enabled: boolean;
                    checks: Array<{
                      type: "error-rate-5xx";
                      minSampleSize?: number | undefined;
                      excludeStatusCodes?: Array<number> | undefined;
                      excludePaths?: Array<string> | undefined;
                      ingestWatermarkSeconds?: number | undefined;
                    }>;
                    failureThreshold?: number | undefined;
                    windowSize?: number | undefined;
                    action: "pause" | "rollback";
                    dryRun: boolean;
                  }
                | undefined;
            } | null)
          | undefined;
        defaultResourceConfig: {
          elasticConcurrencyEnabled?: boolean | undefined;
          fluid?: boolean | undefined;
          functionDefaultRegions: Array<string>;
          functionDefaultTimeout?: number | undefined;
          functionDefaultMemoryType?:
            | ("performance" | "performance_xl" | "standard" | "standard_legacy")
            | undefined;
          functionZeroConfigFailover?: boolean | undefined;
          buildMachineType?: ("basic" | "enhanced" | "standard" | "turbo") | undefined;
          buildMachineSelection?: ("elastic" | "fixed") | undefined;
          buildMachineElasticLastUpdated?: number | undefined;
          buildMachineElasticReason?:
            | (
                | "basic-floor"
                | "build-timeout-failure"
                | "enospc-failure"
                | "enterprise-floor"
                | "high-peak-disk"
                | "high-peak-memory"
                | "long-build-duration"
                | "oom-failure"
                | "short-build-duration"
                | "sustained-high-cpu"
              )
            | undefined;
          isNSNBDisabled?: boolean | undefined;
          buildQueue?:
            | { configuration?: ("SKIP_NAMESPACE_QUEUE" | "WAIT_FOR_NAMESPACE_QUEUE") | undefined }
            | undefined;
          enableFunctionsBeta?: boolean | undefined;
        };
        rootDirectory?: (string | null) | undefined;
        serverlessFunctionZeroConfigFailover?: boolean | undefined;
        skewProtectionBoundaryAt?: number | undefined;
        skewProtectionMaxAge?: number | undefined;
        skewProtectionAllowedDomains?: Array<string> | undefined;
        skipGitConnectDuringLink?: boolean | undefined;
        staticIps?: { builds: boolean; enabled: boolean; regions: Array<string> } | undefined;
        sourceFilesOutsideRootDirectory?: boolean | undefined;
        enableAffectedProjectsDeployments?: boolean | undefined;
        enableExternalRewriteCaching?: boolean | undefined;
        ssoProtection?:
          | ({
              deploymentType:
                | "all"
                | "all_except_custom_domains"
                | "preview"
                | "prod_deployment_urls_and_all_previews";
              cve55182MigrationAppliedFrom?:
                | (
                    | "all"
                    | "all_except_custom_domains"
                    | "preview"
                    | "prod_deployment_urls_and_all_previews"
                    | "null"
                    | null
                  )
                | undefined;
              april2026SecurityIncidentMigrationAppliedFrom?:
                | (
                    | "all"
                    | "all_except_custom_domains"
                    | "preview"
                    | "prod_deployment_urls_and_all_previews"
                    | "null"
                    | null
                  )
                | undefined;
            } | null)
          | undefined;
        targets?:
          | Record<
              string,
              {
                id: string;
                alias?: Array<string> | undefined;
                aliasAssigned?: (number | boolean | null) | undefined;
                aliasError?: ({ code: string; message: string } | null) | undefined;
                aliasFinal?: (string | null) | undefined;
                automaticAliases?: Array<string> | undefined;
                branchMatcher?:
                  | { type: "endsWith" | "equals" | "startsWith"; pattern: string }
                  | undefined;
                buildingAt?: number | undefined;
                builds?:
                  | Array<{ use: string; src?: string | undefined; dest?: string | undefined }>
                  | undefined;
                checksConclusion?: ("canceled" | "failed" | "skipped" | "succeeded") | undefined;
                checksState?: ("completed" | "registered" | "running") | undefined;
                connectBuildsEnabled?: boolean | undefined;
                connectConfigurationId?: string | undefined;
                createdAt: number;
                createdIn: string;
                creator: {
                  email: string;
                  githubLogin?: string | undefined;
                  gitlabLogin?: string | undefined;
                  uid: string;
                  username: string;
                } | null;
                deletedAt?: number | undefined;
                deploymentHostname: string;
                forced?: boolean | undefined;
                name: string;
                meta?: Record<string, string> | undefined;
                monorepoManager?: (string | null) | undefined;
                oidcTokenClaims?:
                  | {
                      iss: string;
                      sub: string;
                      scope: string;
                      aud: string;
                      owner: string;
                      owner_id: string;
                      project: string;
                      project_id: string;
                      environment: string;
                      custom_environment_id?: string | undefined;
                      mfe_group_ids?: Array<string> | undefined;
                      plan?: string | undefined;
                    }
                  | undefined;
                plan: "enterprise" | "hobby" | "pro";
                previewCommentsEnabled?: boolean | undefined;
                private: boolean;
                readyAt?: number | undefined;
                readyState:
                  | "BLOCKED"
                  | "BUILDING"
                  | "CANCELED"
                  | "ERROR"
                  | "INITIALIZING"
                  | "QUEUED"
                  | "READY";
                readySubstate?: ("PROMOTED" | "ROLLING" | "STAGED") | undefined;
                requestedAt?: number | undefined;
                target?: (string | null) | undefined;
                teamId?: (string | null) | undefined;
                type: "LAMBDAS";
                url: string;
                userId?: string | undefined;
                withCache?: boolean | undefined;
              } | null
            >
          | undefined;
        transferCompletedAt?: number | undefined;
        transferStartedAt?: number | undefined;
        transferToAccountId?: string | undefined;
        transferredFromAccountId?: string | undefined;
        updatedAt?: number | undefined;
        live?: boolean | undefined;
        enablePreviewFeedback?: (boolean | null) | undefined;
        enableProductionFeedback?: (boolean | null) | undefined;
        permissions?:
          | {
              oauth2Connection?: Array<ACLAction> | undefined;
              user?: Array<ACLAction> | undefined;
              userConnection?: Array<ACLAction> | undefined;
              userMfaConfiguration?: Array<ACLAction> | undefined;
              userPreference?: Array<ACLAction> | undefined;
              userSudo?: Array<ACLAction> | undefined;
              webAuthn?: Array<ACLAction> | undefined;
              accessGroup?: Array<ACLAction> | undefined;
              agent?: Array<ACLAction> | undefined;
              aiGatewayApiKey?: Array<ACLAction> | undefined;
              aiGatewayApiKeyBypassAll?: Array<ACLAction> | undefined;
              aiGatewayApiKeyOwnedBySelf?: Array<ACLAction> | undefined;
              aiGatewayApiKeySpendAttribution?: Array<ACLAction> | undefined;
              aiGatewayApiKeyZdrExemption?: Array<ACLAction> | undefined;
              aiGatewayBudget?: Array<ACLAction> | undefined;
              aiGatewayCredits?: Array<ACLAction> | undefined;
              aiGatewayPrivateModels?: Array<ACLAction> | undefined;
              aiGatewayGuardrails?: Array<ACLAction> | undefined;
              aiGatewayRules?: Array<ACLAction> | undefined;
              aiGatewaySettings?: Array<ACLAction> | undefined;
              aiGatewayUsage?: Array<ACLAction> | undefined;
              aiGatewayVirtualModelConfigs?: Array<ACLAction> | undefined;
              alerts?: Array<ACLAction> | undefined;
              alertRules?: Array<ACLAction> | undefined;
              aliasGlobal?: Array<ACLAction> | undefined;
              analyticsSampling?: Array<ACLAction> | undefined;
              analyticsUsage?: Array<ACLAction> | undefined;
              apiKey?: Array<ACLAction> | undefined;
              apiKeyAiGateway?: Array<ACLAction> | undefined;
              apiKeyOwnedBySelf?: Array<ACLAction> | undefined;
              oauth2Application?: Array<ACLAction> | undefined;
              vercelAppInstallation?: Array<ACLAction> | undefined;
              vercelAppInstallationRequest?: Array<ACLAction> | undefined;
              auditLog?: Array<ACLAction> | undefined;
              billingAddress?: Array<ACLAction> | undefined;
              billingInformation?: Array<ACLAction> | undefined;
              billingInvoice?: Array<ACLAction> | undefined;
              billingInvoiceEmailRecipient?: Array<ACLAction> | undefined;
              billingInvoiceLanguage?: Array<ACLAction> | undefined;
              billingPlan?: Array<ACLAction> | undefined;
              billingPurchaseOrder?: Array<ACLAction> | undefined;
              billingRefund?: Array<ACLAction> | undefined;
              billingTaxId?: Array<ACLAction> | undefined;
              blob?: Array<ACLAction> | undefined;
              blobStoreTokenSet?: Array<ACLAction> | undefined;
              budget?: Array<ACLAction> | undefined;
              cacheArtifact?: Array<ACLAction> | undefined;
              cacheArtifactUsageEvent?: Array<ACLAction> | undefined;
              codeChecks?: Array<ACLAction> | undefined;
              codeOwners?: Array<ACLAction> | undefined;
              ciInvocations?: Array<ACLAction> | undefined;
              ciLogs?: Array<ACLAction> | undefined;
              concurrentBuilds?: Array<ACLAction> | undefined;
              connect?: Array<ACLAction> | undefined;
              connectConfiguration?: Array<ACLAction> | undefined;
              connectLogs?: Array<ACLAction> | undefined;
              connexClient?: Array<ACLAction> | undefined;
              connexClientProject?: Array<ACLAction> | undefined;
              connexContact?: Array<ACLAction> | undefined;
              connexInstallation?: Array<ACLAction> | undefined;
              connexToken?: Array<ACLAction> | undefined;
              buildMachineDefault?: Array<ACLAction> | undefined;
              cursorOriginInstallation?: Array<ACLAction> | undefined;
              dataCacheBillingSettings?: Array<ACLAction> | undefined;
              defaultDeploymentProtection?: Array<ACLAction> | undefined;
              deploymentPolicy?: Array<ACLAction> | undefined;
              domain?: Array<ACLAction> | undefined;
              domainAcceptDelegation?: Array<ACLAction> | undefined;
              domainAuthCodes?: Array<ACLAction> | undefined;
              domainCertificate?: Array<ACLAction> | undefined;
              domainCheckConfig?: Array<ACLAction> | undefined;
              domainMove?: Array<ACLAction> | undefined;
              domainPurchase?: Array<ACLAction> | undefined;
              domainRecord?: Array<ACLAction> | undefined;
              domainTransferIn?: Array<ACLAction> | undefined;
              drain?: Array<ACLAction> | undefined;
              edgeConfig?: Array<ACLAction> | undefined;
              edgeConfigItem?: Array<ACLAction> | undefined;
              edgeConfigSchema?: Array<ACLAction> | undefined;
              edgeConfigToken?: Array<ACLAction> | undefined;
              endpointVerification?: Array<ACLAction> | undefined;
              event?: Array<ACLAction> | undefined;
              fileUpload?: Array<ACLAction> | undefined;
              flagsExplorerSubscription?: Array<ACLAction> | undefined;
              gitRepository?: Array<ACLAction> | undefined;
              imageOptimizationNewPrice?: Array<ACLAction> | undefined;
              integration?: Array<ACLAction> | undefined;
              integrationAccount?: Array<ACLAction> | undefined;
              integrationConfiguration?: Array<ACLAction> | undefined;
              integrationConfigurationProjects?: Array<ACLAction> | undefined;
              integrationConfigurationRole?: Array<ACLAction> | undefined;
              integrationConfigurationTransfer?: Array<ACLAction> | undefined;
              integrationDeploymentAction?: Array<ACLAction> | undefined;
              integrationEvent?: Array<ACLAction> | undefined;
              integrationLog?: Array<ACLAction> | undefined;
              integrationResource?: Array<ACLAction> | undefined;
              integrationResourceData?: Array<ACLAction> | undefined;
              integrationResourceReplCommand?: Array<ACLAction> | undefined;
              integrationResourceSecrets?: Array<ACLAction> | undefined;
              integrationSSOSession?: Array<ACLAction> | undefined;
              integrationStrict?: Array<ACLAction> | undefined;
              integrationStoreTokenSet?: Array<ACLAction> | undefined;
              integrationVercelConfigurationOverride?: Array<ACLAction> | undefined;
              integrationPullRequest?: Array<ACLAction> | undefined;
              ipBlocking?: Array<ACLAction> | undefined;
              jobGlobal?: Array<ACLAction> | undefined;
              kmsIssuer?: Array<ACLAction> | undefined;
              kmsProjectGrant?: Array<ACLAction> | undefined;
              logDrain?: Array<ACLAction> | undefined;
              marketplaceBillingData?: Array<ACLAction> | undefined;
              marketplaceExperimentationEdgeConfigData?: Array<ACLAction> | undefined;
              marketplaceExperimentationItem?: Array<ACLAction> | undefined;
              marketplaceFlexCommit?: Array<ACLAction> | undefined;
              marketplaceInstallationMember?: Array<ACLAction> | undefined;
              marketplaceInvoice?: Array<ACLAction> | undefined;
              marketplaceSettings?: Array<ACLAction> | undefined;
              Monitoring?: Array<ACLAction> | undefined;
              monitoringAlert?: Array<ACLAction> | undefined;
              monitoringChart?: Array<ACLAction> | undefined;
              monitoringQuery?: Array<ACLAction> | undefined;
              monitoringSettings?: Array<ACLAction> | undefined;
              notificationCustomerBudget?: Array<ACLAction> | undefined;
              notificationDeploymentFailed?: Array<ACLAction> | undefined;
              notificationDomainConfiguration?: Array<ACLAction> | undefined;
              notificationDomainExpire?: Array<ACLAction> | undefined;
              notificationDomainMoved?: Array<ACLAction> | undefined;
              notificationDomainPurchase?: Array<ACLAction> | undefined;
              notificationDomainRenewal?: Array<ACLAction> | undefined;
              notificationDomainTransfer?: Array<ACLAction> | undefined;
              notificationDomainUnverified?: Array<ACLAction> | undefined;
              NotificationMonitoringAlert?: Array<ACLAction> | undefined;
              notificationPaymentFailed?: Array<ACLAction> | undefined;
              notificationPreferences?: Array<ACLAction> | undefined;
              notificationStatementOfReasons?: Array<ACLAction> | undefined;
              notificationUsageAlert?: Array<ACLAction> | undefined;
              oidcFederationPolicy?: Array<ACLAction> | undefined;
              observabilityConfiguration?: Array<ACLAction> | undefined;
              observabilityFunnel?: Array<ACLAction> | undefined;
              observabilityNotebook?: Array<ACLAction> | undefined;
              openTelemetryEndpoint?: Array<ACLAction> | undefined;
              ownEvent?: Array<ACLAction> | undefined;
              organization?: Array<ACLAction> | undefined;
              organizationDomain?: Array<ACLAction> | undefined;
              organizationTeam?: Array<ACLAction> | undefined;
              passwordProtectionInvoiceItem?: Array<ACLAction> | undefined;
              paymentMethod?: Array<ACLAction> | undefined;
              permissions?: Array<ACLAction> | undefined;
              postgres?: Array<ACLAction> | undefined;
              postgresStoreTokenSet?: Array<ACLAction> | undefined;
              previewDeploymentSuffix?: Array<ACLAction> | undefined;
              privateCloudAccount?: Array<ACLAction> | undefined;
              projectTransferIn?: Array<ACLAction> | undefined;
              proTrialOnboarding?: Array<ACLAction> | undefined;
              rateLimit?: Array<ACLAction> | undefined;
              redis?: Array<ACLAction> | undefined;
              redisStoreTokenSet?: Array<ACLAction> | undefined;
              remoteCaching?: Array<ACLAction> | undefined;
              repository?: Array<ACLAction> | undefined;
              samlConfig?: Array<ACLAction> | undefined;
              secret?: Array<ACLAction> | undefined;
              securityConfig?: Array<ACLAction> | undefined;
              sensitiveEnvironmentVariablePolicy?: Array<ACLAction> | undefined;
              sharedEnvVars?: Array<ACLAction> | undefined;
              sharedEnvVarsProduction?: Array<ACLAction> | undefined;
              space?: Array<ACLAction> | undefined;
              spaceRun?: Array<ACLAction> | undefined;
              storeIsLocked?: Array<ACLAction> | undefined;
              storeTokenSetSensitive?: Array<ACLAction> | undefined;
              storeTransfer?: Array<ACLAction> | undefined;
              supportCase?: Array<ACLAction> | undefined;
              supportCaseComment?: Array<ACLAction> | undefined;
              team?: Array<ACLAction> | undefined;
              teamAccessRequest?: Array<ACLAction> | undefined;
              teamFellowMembership?: Array<ACLAction> | undefined;
              teamGitExclusivity?: Array<ACLAction> | undefined;
              teamInvite?: Array<ACLAction> | undefined;
              teamInviteCode?: Array<ACLAction> | undefined;
              teamInviteLink?: Array<ACLAction> | undefined;
              teamJoin?: Array<ACLAction> | undefined;
              teamMemberMfaStatus?: Array<ACLAction> | undefined;
              teamMicrofrontends?: Array<ACLAction> | undefined;
              teamOwnMembership?: Array<ACLAction> | undefined;
              teamOwnMembershipDisconnectSAML?: Array<ACLAction> | undefined;
              teamSudo?: Array<ACLAction> | undefined;
              teamTokenInvalidation?: Array<ACLAction> | undefined;
              token?: Array<ACLAction> | undefined;
              toolbarComment?: Array<ACLAction> | undefined;
              usage?: Array<ACLAction> | undefined;
              usageCycle?: Array<ACLAction> | undefined;
              vcrRepository?: Array<ACLAction> | undefined;
              vpcPeeringConnection?: Array<ACLAction> | undefined;
              webAnalyticsPlan?: Array<ACLAction> | undefined;
              webhook?: Array<ACLAction> | undefined;
              "webhook-event"?: Array<ACLAction> | undefined;
              aliasProject?: Array<ACLAction> | undefined;
              aliasProtectionBypass?: Array<ACLAction> | undefined;
              bulkRedirects?: Array<ACLAction> | undefined;
              buildMachine?: Array<ACLAction> | undefined;
              connectConfigurationLink?: Array<ACLAction> | undefined;
              dataCacheNamespace?: Array<ACLAction> | undefined;
              deployment?: Array<ACLAction> | undefined;
              deploymentBuildLogs?: Array<ACLAction> | undefined;
              deploymentCheck?: Array<ACLAction> | undefined;
              deploymentCheckPreview?: Array<ACLAction> | undefined;
              deploymentCheckReRunFromProductionBranch?: Array<ACLAction> | undefined;
              deploymentProductionGit?: Array<ACLAction> | undefined;
              deploymentV0?: Array<ACLAction> | undefined;
              deploymentPreview?: Array<ACLAction> | undefined;
              deploymentPrivate?: Array<ACLAction> | undefined;
              deploymentPromote?: Array<ACLAction> | undefined;
              deploymentRollback?: Array<ACLAction> | undefined;
              edgeCacheNamespace?: Array<ACLAction> | undefined;
              environments?: Array<ACLAction> | undefined;
              job?: Array<ACLAction> | undefined;
              logs?: Array<ACLAction> | undefined;
              logsPreset?: Array<ACLAction> | undefined;
              observabilityData?: Array<ACLAction> | undefined;
              onDemandBuild?: Array<ACLAction> | undefined;
              onDemandConcurrency?: Array<ACLAction> | undefined;
              optionsAllowlist?: Array<ACLAction> | undefined;
              passwordProtection?: Array<ACLAction> | undefined;
              privateLinkEndpoint?: Array<ACLAction> | undefined;
              productionAliasProtectionBypass?: Array<ACLAction> | undefined;
              productionShareableLink?: Array<ACLAction> | undefined;
              project?: Array<ACLAction> | undefined;
              projectAccessGroup?: Array<ACLAction> | undefined;
              projectAnalyticsSampling?: Array<ACLAction> | undefined;
              projectAnalyticsUsage?: Array<ACLAction> | undefined;
              projectCheck?: Array<ACLAction> | undefined;
              projectCheckRun?: Array<ACLAction> | undefined;
              projectDeploymentExpiration?: Array<ACLAction> | undefined;
              projectDeploymentHook?: Array<ACLAction> | undefined;
              projectDeploymentProtectionStrict?: Array<ACLAction> | undefined;
              projectDomain?: Array<ACLAction> | undefined;
              projectDomainCheckConfig?: Array<ACLAction> | undefined;
              projectDomainMove?: Array<ACLAction> | undefined;
              projectDomainVerify?: Array<ACLAction> | undefined;
              projectEvent?: Array<ACLAction> | undefined;
              projectEnvVars?: Array<ACLAction> | undefined;
              projectEnvVarsProduction?: Array<ACLAction> | undefined;
              projectEnvVarsUnownedByIntegration?: Array<ACLAction> | undefined;
              projectFlags?: Array<ACLAction> | undefined;
              projectFlagsProduction?: Array<ACLAction> | undefined;
              projectFlagsSdkKey?: Array<ACLAction> | undefined;
              projectFromV0?: Array<ACLAction> | undefined;
              projectId?: Array<ACLAction> | undefined;
              projectIntegrationConfiguration?: Array<ACLAction> | undefined;
              projectLink?: Array<ACLAction> | undefined;
              projectMember?: Array<ACLAction> | undefined;
              projectMonitoring?: Array<ACLAction> | undefined;
              projectOIDCToken?: Array<ACLAction> | undefined;
              projectPermissions?: Array<ACLAction> | undefined;
              projectProductionBranch?: Array<ACLAction> | undefined;
              projectProtectionBypass?: Array<ACLAction> | undefined;
              projectRollingRelease?: Array<ACLAction> | undefined;
              projectRoutes?: Array<ACLAction> | undefined;
              projectSupportCase?: Array<ACLAction> | undefined;
              projectSupportCaseComment?: Array<ACLAction> | undefined;
              projectTier?: Array<ACLAction> | undefined;
              projectTransfer?: Array<ACLAction> | undefined;
              projectTransferOut?: Array<ACLAction> | undefined;
              projectUsage?: Array<ACLAction> | undefined;
              pageIntegrity?: Array<ACLAction> | undefined;
              seawallConfig?: Array<ACLAction> | undefined;
              securityPlusConfiguration?: Array<ACLAction> | undefined;
              shareableLink?: Array<ACLAction> | undefined;
              shareableLinkStrict?: Array<ACLAction> | undefined;
              sharedEnvVarConnection?: Array<ACLAction> | undefined;
              skewProtection?: Array<ACLAction> | undefined;
              analytics?: Array<ACLAction> | undefined;
              trustedIps?: Array<ACLAction> | undefined;
              trustedSources?: Array<ACLAction> | undefined;
              v0Chat?: Array<ACLAction> | undefined;
              vercelAuth?: Array<ACLAction> | undefined;
              vercelRun?: Array<ACLAction> | undefined;
              webAnalytics?: Array<ACLAction> | undefined;
              workflowRunData?: Array<ACLAction> | undefined;
            }
          | undefined;
        lastRollbackTarget?: (Record<string, never> | null) | undefined;
        lastAliasRequest?:
          | ({
              fromDeploymentId: string | null;
              toDeploymentId: string;
              fromRollingReleaseId?: string | undefined;
              jobStatus: "failed" | "in-progress" | "pending" | "skipped" | "succeeded";
              requestedAt: number;
              type: "promote" | "rollback";
            } | null)
          | undefined;
        protectionBypass?:
          | Record<
              string,
              | {
                  createdAt: number;
                  createdBy: string;
                  scope: "integration-automation-bypass";
                  integrationId: string;
                  configurationId: string;
                }
              | {
                  createdAt: number;
                  createdBy: string;
                  scope: "automation-bypass";
                  isEnvVar?: boolean | undefined;
                  note?: string | undefined;
                }
            >
          | undefined;
        hasActiveBranches?: boolean | undefined;
        trustedIps?:
          | (
              | {
                  deploymentType:
                    | "all"
                    | "all_except_custom_domains"
                    | "preview"
                    | "prod_deployment_urls_and_all_previews"
                    | "production";
                  addresses: Array<{ value: string; note?: string | undefined }>;
                  protectionMode: "additional" | "exclusive";
                }
              | {
                  deploymentType:
                    | "all"
                    | "all_except_custom_domains"
                    | "preview"
                    | "prod_deployment_urls_and_all_previews"
                    | "production";
                }
              | null
            )
          | undefined;
        trustedSources?:
          | ({
              projects?:
                | Record<
                    string,
                    {
                      label?: string | undefined;
                      customAllow?:
                        | Array<{
                            from:
                              | { slugs: Array<string>; preset?: "all-custom" | undefined }
                              | { slugs?: Array<string> | undefined; preset: "all-custom" };
                            to:
                              | { slugs: Array<string>; preset?: "all-custom" | undefined }
                              | { slugs?: Array<string> | undefined; preset: "all-custom" };
                          }>
                        | undefined;
                    }
                  >
                | undefined;
              oidcProviders?:
                | Record<
                    string,
                    Array<{
                      to:
                        | { slugs: Array<string>; preset?: "all-custom" | undefined }
                        | { slugs?: Array<string> | undefined; preset: "all-custom" };
                      label?: string | undefined;
                      claims: Record<string, Array<string>>;
                    }>
                  >
                | undefined;
            } | null)
          | undefined;
        gitComments?: { onPullRequest: boolean; onCommit: boolean } | undefined;
        gitProviderOptions?:
          | {
              createDeployments: "disabled" | "enabled";
              disableRepositoryDispatchEvents?: boolean | undefined;
              requireVerifiedCommits?: boolean | undefined;
              gitCommitStatus?: boolean | undefined;
              consolidatedGitCommitStatus?:
                | { enabled: boolean; propagateFailures: boolean }
                | undefined;
            }
          | undefined;
        paused?: boolean | undefined;
        concurrencyBucketName?: string | undefined;
        webAnalytics?:
          | {
              id: string;
              disabledAt?: number | undefined;
              canceledAt?: number | undefined;
              enabledAt?: number | undefined;
              hasData?: true | undefined;
            }
          | undefined;
        security?:
          | {
              attackModeEnabled?: boolean | undefined;
              attackModeUpdatedAt?: number | undefined;
              firewallEnabled?: boolean | undefined;
              firewallUpdatedAt?: number | undefined;
              attackModeActiveUntil?: (number | null) | undefined;
              firewallConfigVersion?: number | undefined;
              rulesets?:
                | Record<
                    string,
                    {
                      action:
                        | "allow"
                        | "bypass"
                        | "challenge"
                        | "deny"
                        | "log"
                        | "rate_limit"
                        | "redirect";
                      rateLimit?:
                        | ({
                            algo: "fixed_window" | "token_bucket";
                            window: number;
                            limit: number;
                            keys: Array<string>;
                          } | null)
                        | undefined;
                      redirect?: ({ location: string; permanent: boolean } | null) | undefined;
                      actionDuration?: (string | null) | undefined;
                      bypassSystem?: (boolean | null) | undefined;
                      logHeaders?: (Array<string> | "*") | undefined;
                    }
                  >
                | undefined;
              firewallSeawallEnabled?: boolean | undefined;
              ja3Enabled?: boolean | undefined;
              ja4Enabled?: boolean | undefined;
              firewallBypassIps?: Array<string> | undefined;
              managedRules?:
                | ({
                    vercel_ruleset: {
                      active: boolean;
                      action?: ("challenge" | "deny" | "log") | undefined;
                    };
                    traffic_sources: {
                      active: boolean;
                      action?: ("challenge" | "deny" | "log") | undefined;
                    };
                    bot_filter: {
                      active: boolean;
                      action?: ("challenge" | "deny" | "log") | undefined;
                    };
                    ai_bots: {
                      active: boolean;
                      action?: ("challenge" | "deny" | "log") | undefined;
                    };
                    owasp: { active: boolean; action?: ("challenge" | "deny" | "log") | undefined };
                  } | null)
                | undefined;
              botIdEnabled?: boolean | undefined;
              log_headers?: (Array<string> | "*") | undefined;
              securityPlus?: boolean | undefined;
              securityPlusMetadata?:
                | { updatedAt: number; firstEnabledAt?: number | undefined }
                | undefined;
              pageIntegrityEnabled?: boolean | undefined;
            }
          | undefined;
        oidcTokenConfig?:
          | { enabled?: boolean | undefined; issuerMode?: ("global" | "team") | undefined }
          | undefined;
        deploymentPolicy?:
          | ({
              gitSources?:
                | (Array<{
                    sources: Array<
                      | { provider: "bitbucket" | "github"; org: string; repo?: string | undefined }
                      | { provider: "gitlab"; namespace: string; project?: string | undefined }
                    >;
                    enabled: boolean;
                    environments: Array<
                      | { type: "system"; target: "preview" | "production" }
                      | { type: "custom"; environmentId: string }
                    >;
                  }> | null)
                | undefined;
              deploymentSources?:
                | (Array<{
                    sources: Array<
                      "cli" | "deploy-hook" | "git" | "integration" | "rest-api" | "v0"
                    >;
                    enabled: boolean;
                    environments: Array<
                      | { type: "system"; target: "preview" | "production" }
                      | { type: "custom"; environmentId: string }
                    >;
                  }> | null)
                | undefined;
            } | null)
          | undefined;
        tier?: ("advanced" | "critical") | undefined;
        usageStatus?:
          | {
              kind: "flat";
              exceededAllowanceUntil?: number | undefined;
              bypassThrottleUntil?: number | undefined;
              throttled?: boolean | undefined;
              teamThrottled?: boolean | undefined;
            }
          | undefined;
        features?: { webAnalytics?: boolean | undefined } | undefined;
        v0?: boolean | undefined;
        v0Created?: boolean | undefined;
        abuse?:
          | {
              scanner?: string | undefined;
              history: Array<{
                scanner: string;
                reason: string;
                by: string;
                byId: string;
                at: number;
              }>;
              updatedAt: number;
              block?:
                | {
                    action: "blocked";
                    reason: string;
                    statusCode: number;
                    createdAt: number;
                    caseId?: string | undefined;
                    actor?: string | undefined;
                    comment?: string | undefined;
                    ineligibleForAppeal?: boolean | undefined;
                    isCascading?: boolean | undefined;
                  }
                | undefined;
              blockHistory?:
                | Array<
                    | {
                        action: "blocked";
                        reason: string;
                        statusCode: number;
                        createdAt: number;
                        caseId?: string | undefined;
                        actor?: string | undefined;
                        comment?: string | undefined;
                        ineligibleForAppeal?: boolean | undefined;
                        isCascading?: boolean | undefined;
                      }
                    | {
                        action: "unblocked";
                        createdAt: number;
                        caseId?: string | undefined;
                        actor?: string | undefined;
                        comment?: string | undefined;
                        ineligibleForAppeal?: boolean | undefined;
                        isCascading?: boolean | undefined;
                      }
                    | {
                        action: "route-blocked";
                        route:
                          | { src: string; status: number; expiry?: number | undefined }
                          | {
                              has: Array<
                                | {
                                    type: "header";
                                    key: "x-vercel-ip-country";
                                    value: { eq: string };
                                  }
                                | { type: "host"; value: { eq: string } }
                              >;
                              mitigate: { action: "block_legal_cwc" };
                              src?: string | undefined;
                            };
                        reason: string;
                        createdAt: number;
                        caseId?: string | undefined;
                        actor?: string | undefined;
                        comment?: string | undefined;
                        ineligibleForAppeal?: boolean | undefined;
                        isCascading?: boolean | undefined;
                      }
                    | {
                        action: "route-unblocked";
                        route:
                          | { src: string; status: number; expiry?: number | undefined }
                          | {
                              has: Array<
                                | {
                                    type: "header";
                                    key: "x-vercel-ip-country";
                                    value: { eq: string };
                                  }
                                | { type: "host"; value: { eq: string } }
                              >;
                              mitigate: { action: "block_legal_cwc" };
                              src?: string | undefined;
                            };
                        statusCode?: number | undefined;
                        createdAt: number;
                        caseId?: string | undefined;
                        actor?: string | undefined;
                        comment?: string | undefined;
                        ineligibleForAppeal?: boolean | undefined;
                        isCascading?: boolean | undefined;
                      }
                  >
                | undefined;
              interstitial?: boolean | undefined;
              interstitialHistory?:
                | Array<{
                    action:
                      | "add-deployment-interstitial"
                      | "add-project-interstitial"
                      | "remove-deployment-interstitial"
                      | "remove-project-interstitial";
                    createdAt: number;
                    caseId?: string | undefined;
                    reason?: string | undefined;
                    actor?: string | undefined;
                    comment?: string | undefined;
                  }>
                | undefined;
            }
          | undefined;
        internalRoutes?:
          | Array<
              | { src: string; status: number; expiry?: number | undefined }
              | {
                  has: Array<
                    | { type: "header"; key: "x-vercel-ip-country"; value: { eq: string } }
                    | { type: "host"; value: { eq: string } }
                  >;
                  mitigate: { action: "block_legal_cwc" };
                  src?: string | undefined;
                }
            >
          | undefined;
        hasDeployments?: boolean | undefined;
        dismissedToasts?:
          | Array<{
              key: string;
              dismissedAt: number;
              action: "accept" | "cancel" | "delete";
              value:
                | string
                | number
                | {
                    previousValue: string | number | boolean;
                    currentValue: string | number | boolean;
                  }
                | boolean
                | null;
            }>
          | undefined;
        protectedSourcemaps?: boolean | undefined;
        tracing?:
          | {
              domains?: string | undefined;
              ignorePaths?: Array<string> | undefined;
              samplingRules?:
                | Array<{
                    rate: number;
                    env?: ("preview" | "production") | undefined;
                    requestPath?: string | undefined;
                    destination?: ("external" | "internal") | undefined;
                  }>
                | undefined;
            }
          | undefined;
        avatar?: (string | null) | undefined;
      }>;
      pagination: { count: number; next: string | null } | Pagination;
    }
  | null;

export type GetV10ProjectsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: {
    from?: string | undefined;
    gitForkProtection?: ("1" | "0") | undefined;
    limit?: string | undefined;
    search?: string | undefined;
    repo?: string | undefined;
    repoId?: string | undefined;
    repoUrl?: string | undefined;
    excludeRepos?: string | undefined;
    edgeConfigId?: string | undefined;
    edgeConfigTokenId?: string | undefined;
    deprecated?: boolean | undefined;
    elasticConcurrencyEnabled?: ("1" | "0") | undefined;
    staticIpsEnabled?: ("0" | "1") | undefined;
    buildMachineTypes?: string | undefined;
    buildQueueConfiguration?: ("SKIP_NAMESPACE_QUEUE" | "WAIT_FOR_NAMESPACE_QUEUE") | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV10ProjectsHandler = (input: GetV10ProjectsInput) => Promise<GetV10ProjectsResponse>;

export type GetV1ProjectsTracesResponse = {
  trace: {
    traceId: string;
    resources?: Array<{ name: string; attributes: Record<string, string> }> | undefined;
    spans: Array<{
      name: string;
      kind: number;
      resource: string;
      library: { name: string; version?: string | undefined };
      spanId: string;
      parentSpanId?: string | undefined;
      status: { code: number; message?: string | undefined };
      traceState?: string | undefined;
      traceFlags: number;
      attributes: Record<string, unknown>;
      links: Array<Record<string, unknown>>;
      events: Array<{
        name: string;
        timestamp: Array<number | number>;
        attributes: Record<string, unknown>;
      }>;
      startTime: Array<number | number>;
      endTime: Array<number | number>;
      duration: Array<number | number>;
    }>;
    rootSpanId?: string | undefined;
  };
};

export type GetV1ProjectsTracesInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: {
    projectId: string;
    requestId: string;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV1ProjectsTracesHandler = (
  input: GetV1ProjectsTracesInput,
) => Promise<GetV1ProjectsTracesResponse>;

export const postV11ProjectsBody = z.object({
  enablePreviewFeedback: z.boolean().nullable().optional(),
  enableProductionFeedback: z.boolean().nullable().optional(),
  previewDeploymentsDisabled: z.boolean().nullable().optional(),
  previewDeploymentSuffix: z.string().max(253).nullable().optional(),
  buildCommand: z.string().max(256).nullable().optional(),
  commandForIgnoringBuildStep: z.string().max(256).nullable().optional(),
  devCommand: z.string().max(256).nullable().optional(),
  environmentVariables: z
    .array(
      z.object({
        key: z.string(),
        target: z.union([
          z.enum(["production", "preview", "development"]),
          z.array(z.enum(["production", "preview", "development"])),
        ]),
        gitBranch: z.string().max(250).optional(),
        type: z.enum(["system", "encrypted", "plain", "sensitive"]).optional(),
        value: z.string(),
      }),
    )
    .optional(),
  framework: z.unknown(),
  gitRepository: z
    .object({
      repo: z.string(),
      type: z.enum(["github", "github-limited", "gitlab", "bitbucket", "vercel", "cursor-origin"]),
    })
    .optional(),
  installCommand: z.string().max(256).nullable().optional(),
  name: z.string().max(100),
  skipGitConnectDuringLink: z.boolean().optional(),
  ssoProtection: z
    .object({
      deploymentType: z.enum([
        "all",
        "preview",
        "prod_deployment_urls_and_all_previews",
        "all_except_custom_domains",
      ]),
    })
    .nullable()
    .optional(),
  sandbox: z
    .object({
      region: z
        .enum([
          "iad1",
          "sfo1",
          "cle1",
          "cdg1",
          "fra1",
          "arn1",
          "sin1",
          "pdx1",
          "lhr1",
          "icn1",
          "bom1",
          "cpt1",
          "dub1",
          "gru1",
          "hkg1",
          "syd1",
          "yul1",
          "hnd1",
          "kix1",
        ])
        .optional(),
      failoverRegions: z
        .array(
          z.enum([
            "iad1",
            "sfo1",
            "cle1",
            "cdg1",
            "fra1",
            "arn1",
            "sin1",
            "pdx1",
            "lhr1",
            "icn1",
            "bom1",
            "cpt1",
            "dub1",
            "gru1",
            "hkg1",
            "syd1",
            "yul1",
            "hnd1",
            "kix1",
          ]),
        )
        .optional(),
    })
    .optional(),
  outputDirectory: z.string().max(256).nullable().optional(),
  publicSource: z.boolean().nullable().optional(),
  rootDirectory: z.string().max(256).nullable().optional(),
  serverlessFunctionRegion: z.string().max(4).nullable().optional(),
  serverlessFunctionZeroConfigFailover: z.boolean().optional(),
  oidcTokenConfig: z
    .object({ enabled: z.boolean().optional(), issuerMode: z.enum(["team", "global"]).optional() })
    .optional(),
  enableAffectedProjectsDeployments: z.boolean().optional(),
  resourceConfig: z
    .object({
      buildMachineType: z.enum(["basic", "enhanced", "turbo", "standard", "elastic"]).optional(),
      fluid: z.boolean().optional(),
      functionDefaultRegions: z.array(z.string().max(4)).optional(),
      functionDefaultTimeout: z.number().gte(1).lte(900).optional(),
      functionDefaultMemoryType: z
        .enum(["standard_legacy", "standard", "performance", "performance_xl"])
        .optional(),
      functionZeroConfigFailover: z.boolean().optional(),
      elasticConcurrencyEnabled: z.boolean().optional(),
      buildMachineSelection: z.enum(["elastic", "fixed"]).optional(),
      buildMachineElasticLastUpdated: z.number().optional(),
      buildMachineElasticReason: z
        .enum([
          "oom-failure",
          "enospc-failure",
          "build-timeout-failure",
          "basic-floor",
          "high-peak-memory",
          "sustained-high-cpu",
          "high-peak-disk",
          "long-build-duration",
          "short-build-duration",
          "enterprise-floor",
        ])
        .optional(),
      isNSNBDisabled: z.boolean().optional(),
      buildQueue: z
        .object({
          configuration: z.enum(["SKIP_NAMESPACE_QUEUE", "WAIT_FOR_NAMESPACE_QUEUE"]).optional(),
        })
        .optional(),
      enableFunctionsBeta: z.boolean().optional(),
    })
    .optional(),
});

export type PostV11ProjectsBody = {
  enablePreviewFeedback?: (boolean | null) | undefined;
  enableProductionFeedback?: (boolean | null) | undefined;
  previewDeploymentsDisabled?: (boolean | null) | undefined;
  previewDeploymentSuffix?: (string | null) | undefined;
  buildCommand?: (string | null) | undefined;
  commandForIgnoringBuildStep?: (string | null) | undefined;
  devCommand?: (string | null) | undefined;
  environmentVariables?:
    | Array<{
        key: string;
        target:
          | "production"
          | "preview"
          | "development"
          | Array<"production" | "preview" | "development">;
        gitBranch?: string | undefined;
        type?: ("system" | "encrypted" | "plain" | "sensitive") | undefined;
        value: string;
      }>
    | undefined;
  framework: unknown;
  gitRepository?:
    | {
        repo: string;
        type: "github" | "github-limited" | "gitlab" | "bitbucket" | "vercel" | "cursor-origin";
      }
    | undefined;
  installCommand?: (string | null) | undefined;
  name: string;
  skipGitConnectDuringLink?: boolean | undefined;
  ssoProtection?:
    | ({
        deploymentType:
          | "all"
          | "preview"
          | "prod_deployment_urls_and_all_previews"
          | "all_except_custom_domains";
      } | null)
    | undefined;
  sandbox?:
    | {
        region?:
          | (
              | "iad1"
              | "sfo1"
              | "cle1"
              | "cdg1"
              | "fra1"
              | "arn1"
              | "sin1"
              | "pdx1"
              | "lhr1"
              | "icn1"
              | "bom1"
              | "cpt1"
              | "dub1"
              | "gru1"
              | "hkg1"
              | "syd1"
              | "yul1"
              | "hnd1"
              | "kix1"
            )
          | undefined;
        failoverRegions?:
          | Array<
              | "iad1"
              | "sfo1"
              | "cle1"
              | "cdg1"
              | "fra1"
              | "arn1"
              | "sin1"
              | "pdx1"
              | "lhr1"
              | "icn1"
              | "bom1"
              | "cpt1"
              | "dub1"
              | "gru1"
              | "hkg1"
              | "syd1"
              | "yul1"
              | "hnd1"
              | "kix1"
            >
          | undefined;
      }
    | undefined;
  outputDirectory?: (string | null) | undefined;
  publicSource?: (boolean | null) | undefined;
  rootDirectory?: (string | null) | undefined;
  serverlessFunctionRegion?: (string | null) | undefined;
  serverlessFunctionZeroConfigFailover?: boolean | undefined;
  oidcTokenConfig?:
    | { enabled?: boolean | undefined; issuerMode?: ("team" | "global") | undefined }
    | undefined;
  enableAffectedProjectsDeployments?: boolean | undefined;
  resourceConfig?:
    | {
        buildMachineType?: ("basic" | "enhanced" | "turbo" | "standard" | "elastic") | undefined;
        fluid?: boolean | undefined;
        functionDefaultRegions?: Array<string> | undefined;
        functionDefaultTimeout?: number | undefined;
        functionDefaultMemoryType?:
          | ("standard_legacy" | "standard" | "performance" | "performance_xl")
          | undefined;
        functionZeroConfigFailover?: boolean | undefined;
        elasticConcurrencyEnabled?: boolean | undefined;
        buildMachineSelection?: ("elastic" | "fixed") | undefined;
        buildMachineElasticLastUpdated?: number | undefined;
        buildMachineElasticReason?:
          | (
              | "oom-failure"
              | "enospc-failure"
              | "build-timeout-failure"
              | "basic-floor"
              | "high-peak-memory"
              | "sustained-high-cpu"
              | "high-peak-disk"
              | "long-build-duration"
              | "short-build-duration"
              | "enterprise-floor"
            )
          | undefined;
        isNSNBDisabled?: boolean | undefined;
        buildQueue?:
          | { configuration?: ("SKIP_NAMESPACE_QUEUE" | "WAIT_FOR_NAMESPACE_QUEUE") | undefined }
          | undefined;
        enableFunctionsBeta?: boolean | undefined;
      }
    | undefined;
};

export type PostV11ProjectsResponse = {
  accountId: string;
  creator?:
    | (
        | {
            type: "user";
            via:
              | { type: "app"; app: { id: string; clientId?: string | undefined } }
              | {
                  type: "integration";
                  integration: { integrationId: string; configurationId: string };
                }
              | null;
            user: { id: string };
          }
        | { type: "app"; app: { id: string; clientId?: string | undefined } }
        | { type: "integration"; integration: { integrationId: string; configurationId: string } }
        | { type: "system" }
      )
    | undefined;
  alias: Array<{
    configuredBy?: ("A" | "CNAME" | "dns-01" | "http" | "null" | null) | undefined;
    configuredChangedAt?: (number | null) | undefined;
    createdAt?: (number | null) | undefined;
    deployment: {
      id: string;
      alias?: Array<string> | undefined;
      aliasAssigned?: (number | boolean | null) | undefined;
      aliasError?: ({ code: string; message: string } | null) | undefined;
      aliasFinal?: (string | null) | undefined;
      automaticAliases?: Array<string> | undefined;
      branchMatcher?: { type: "endsWith" | "equals" | "startsWith"; pattern: string } | undefined;
      buildingAt?: number | undefined;
      builds?:
        | Array<{ use: string; src?: string | undefined; dest?: string | undefined }>
        | undefined;
      checksConclusion?: ("canceled" | "failed" | "skipped" | "succeeded") | undefined;
      checksState?: ("completed" | "registered" | "running") | undefined;
      connectBuildsEnabled?: boolean | undefined;
      connectConfigurationId?: string | undefined;
      createdAt: number;
      createdIn: string;
      creator: {
        email: string;
        githubLogin?: string | undefined;
        gitlabLogin?: string | undefined;
        uid: string;
        username: string;
      } | null;
      deletedAt?: number | undefined;
      deploymentHostname: string;
      forced?: boolean | undefined;
      name: string;
      meta?: Record<string, string> | undefined;
      monorepoManager?: (string | null) | undefined;
      oidcTokenClaims?:
        | {
            iss: string;
            sub: string;
            scope: string;
            aud: string;
            owner: string;
            owner_id: string;
            project: string;
            project_id: string;
            environment: string;
            custom_environment_id?: string | undefined;
            mfe_group_ids?: Array<string> | undefined;
            plan?: string | undefined;
          }
        | undefined;
      plan: "enterprise" | "hobby" | "pro";
      previewCommentsEnabled?: boolean | undefined;
      private: boolean;
      readyAt?: number | undefined;
      readyState:
        | "BLOCKED"
        | "BUILDING"
        | "CANCELED"
        | "ERROR"
        | "INITIALIZING"
        | "QUEUED"
        | "READY";
      readySubstate?: ("PROMOTED" | "ROLLING" | "STAGED") | undefined;
      requestedAt?: number | undefined;
      target?: (string | null) | undefined;
      teamId?: (string | null) | undefined;
      type: "LAMBDAS";
      url: string;
      userId?: string | undefined;
      withCache?: boolean | undefined;
    } | null;
    domain: string;
    environment: "preview" | "production";
    gitBranch?: (string | null) | undefined;
    redirect?: (string | null) | undefined;
    redirectStatusCode?: (number | null) | undefined;
    target: "PREVIEW" | "PRODUCTION" | "STAGING";
  }>;
  analytics?:
    | {
        id: string;
        canceledAt?: (number | null) | undefined;
        disabledAt: number;
        enabledAt: number;
        paidAt?: number | undefined;
        sampleRatePercent?: (number | null) | undefined;
        spendLimitInDollars?: (number | null) | undefined;
      }
    | undefined;
  appliedCve55182Migration?: boolean | undefined;
  speedInsights?:
    | {
        id: string;
        enabledAt?: number | undefined;
        disabledAt?: number | undefined;
        canceledAt?: number | undefined;
        hasData?: boolean | undefined;
        dataReceivedAt?: number | undefined;
        paidAt?: number | undefined;
      }
    | undefined;
  autoExposeSystemEnvs?: boolean | undefined;
  autoAssignCustomDomains?: boolean | undefined;
  autoAssignCustomDomainsUpdatedBy?: string | undefined;
  buildCommand?: (string | null) | undefined;
  commandForIgnoringBuildStep?: (string | null) | undefined;
  connectConfigurations?:
    | (Array<{
        envId: string | "preview" | "production";
        connectConfigurationId: string;
        dc?: string | undefined;
        passive: boolean;
        buildsEnabled: boolean;
        aws?: { subnetIds: Array<string>; securityGroupId?: string | undefined } | undefined;
        createdAt: number;
        updatedAt: number;
      }> | null)
    | undefined;
  connectConfigurationId?: (string | null) | undefined;
  connectBuildsEnabled?: boolean | undefined;
  passiveConnectConfigurationId?: (string | null) | undefined;
  createdAt?: number | undefined;
  customerSupportCodeVisibility?: boolean | undefined;
  crons?:
    | {
        enabledAt: number;
        disabledAt: number | null;
        updatedAt: number;
        deploymentId: string | null;
        definitions: Array<{
          host: string;
          path: string;
          schedule: string;
          source?: "api" | undefined;
          description?: string | undefined;
          hostInferred?: boolean | undefined;
        }>;
      }
    | undefined;
  dataCache?:
    | {
        userDisabled: boolean;
        storageSizeBytes?: (number | null) | undefined;
        unlimited?: boolean | undefined;
      }
    | undefined;
  deploymentExpiration: {
    expirationDays?: number | undefined;
    expirationDaysProduction?: number | undefined;
    expirationDaysCanceled?: number | undefined;
    expirationDaysErrored?: number | undefined;
    deploymentsToKeep?: number | undefined;
  };
  expiration?: ({ expiresAt: number } | { lockedAt: number; lockedBy: string }) | undefined;
  devCommand?: (string | null) | undefined;
  directoryListing: boolean;
  installCommand?: (string | null) | undefined;
  env?:
    | Array<{
        target?:
          | (
              | Array<"development" | "development" | "preview" | "preview" | "production">
              | "development"
              | "development"
              | "preview"
              | "preview"
              | "production"
            )
          | undefined;
        type: "encrypted" | "plain" | "secret" | "sensitive" | "system";
        sunsetSecretId?: string | undefined;
        legacyValue?: string | undefined;
        decrypted?: boolean | undefined;
        value: string;
        vsmValue?: string | undefined;
        id?: string | undefined;
        key: string;
        configurationId?: (string | null) | undefined;
        createdAt?: number | undefined;
        updatedAt?: number | undefined;
        createdBy?: (string | null) | undefined;
        updatedBy?: (string | null) | undefined;
        gitBranch?: string | undefined;
        visibility?: ("config" | "secret") | undefined;
        edgeConfigId?: (string | null) | undefined;
        edgeConfigTokenId?: (string | null) | undefined;
        contentHint?:
          | (
              | { type: "redis-url"; storeId: string }
              | { type: "redis-rest-api-url"; storeId: string }
              | { type: "redis-rest-api-token"; storeId: string }
              | { type: "redis-rest-api-read-only-token"; storeId: string }
              | { type: "blob-read-write-token"; storeId: string }
              | { type: "blob-store-id"; storeId: string }
              | { type: "blob-webhook-public-key"; storeId: string }
              | { type: "postgres-url"; storeId: string }
              | { type: "postgres-url-non-pooling"; storeId: string }
              | { type: "postgres-prisma-url"; storeId: string }
              | { type: "postgres-user"; storeId: string }
              | { type: "postgres-host"; storeId: string }
              | { type: "postgres-password"; storeId: string }
              | { type: "postgres-database"; storeId: string }
              | { type: "postgres-url-no-ssl"; storeId: string }
              | {
                  type: "integration-store-secret";
                  storeId: string;
                  integrationId: string;
                  integrationProductId: string;
                  integrationConfigurationId: string;
                }
              | { type: "flags-connection-string"; projectId: string }
              | null
            )
          | undefined;
        internalContentHint?: ({ type: "flags-secret"; encryptedValue: string } | null) | undefined;
        comment?: string | undefined;
        customEnvironmentIds?: Array<string> | undefined;
      }>
    | undefined;
  customEnvironments?:
    | Array<{
        id: string;
        slug: string;
        type: "development" | "preview" | "production";
        description?: string | undefined;
        branchMatcher?: { type: "endsWith" | "equals" | "startsWith"; pattern: string } | undefined;
        domains?:
          | Array<{
              name: string;
              apexName: string;
              projectId: string;
              redirect?: (string | null) | undefined;
              redirectStatusCode?: (number | null) | undefined;
              gitBranch?: (string | null) | undefined;
              customEnvironmentId?: (string | null) | undefined;
              updatedAt?: number | undefined;
              createdAt?: number | undefined;
              verified: boolean;
              verification?:
                | Array<{ type: string; domain: string; value: string; reason: string }>
                | undefined;
            }>
          | undefined;
        currentDeploymentAliases?: Array<string> | undefined;
        createdAt: number;
        updatedAt: number;
      }>
    | undefined;
  framework?:
    | (
        | "actix-web"
        | "angular"
        | "ash"
        | "astro"
        | "axum"
        | "blitzjs"
        | "brunch"
        | "bun"
        | "container"
        | "create-react-app"
        | "django"
        | "docusaurus"
        | "docusaurus-2"
        | "dojo"
        | "eleventy"
        | "elysia"
        | "ember"
        | "eve"
        | "express"
        | "fastapi"
        | "fasthtml"
        | "fastify"
        | "flask"
        | "gatsby"
        | "go"
        | "gridsome"
        | "h3"
        | "hexo"
        | "hono"
        | "hugo"
        | "hydrogen"
        | "ionic-angular"
        | "ionic-react"
        | "jekyll"
        | "koa"
        | "mastra"
        | "middleman"
        | "nestjs"
        | "nextjs"
        | "nitro"
        | "node"
        | "nuxtjs"
        | "parcel"
        | "polymer"
        | "preact"
        | "python"
        | "react-router"
        | "redwoodjs"
        | "remix"
        | "ruby"
        | "rust"
        | "saber"
        | "sanity"
        | "sanity-v2"
        | "sapper"
        | "scully"
        | "services"
        | "solidstart"
        | "solidstart-1"
        | "stencil"
        | "storybook"
        | "svelte"
        | "sveltekit"
        | "sveltekit-1"
        | "tanstack-start"
        | "tanstack-start-lovable"
        | "umijs"
        | "vite"
        | "vitepress"
        | "vue"
        | "vuepress"
        | "xmcp"
        | "zola"
        | "null"
        | null
      )
    | undefined;
  services?:
    | Array<{
        serviceName: string;
        serviceType?: ("cron" | "job" | "web" | "worker") | undefined;
        framework?:
          | (
              | "actix-web"
              | "angular"
              | "ash"
              | "astro"
              | "axum"
              | "blitzjs"
              | "brunch"
              | "bun"
              | "container"
              | "create-react-app"
              | "django"
              | "docusaurus"
              | "docusaurus-2"
              | "dojo"
              | "eleventy"
              | "elysia"
              | "ember"
              | "eve"
              | "express"
              | "fastapi"
              | "fasthtml"
              | "fastify"
              | "flask"
              | "gatsby"
              | "go"
              | "gridsome"
              | "h3"
              | "hexo"
              | "hono"
              | "hugo"
              | "hydrogen"
              | "ionic-angular"
              | "ionic-react"
              | "jekyll"
              | "koa"
              | "mastra"
              | "middleman"
              | "nestjs"
              | "nextjs"
              | "nitro"
              | "node"
              | "nuxtjs"
              | "parcel"
              | "polymer"
              | "preact"
              | "python"
              | "react-router"
              | "redwoodjs"
              | "remix"
              | "ruby"
              | "rust"
              | "saber"
              | "sanity"
              | "sanity-v2"
              | "sapper"
              | "scully"
              | "services"
              | "solidstart"
              | "solidstart-1"
              | "stencil"
              | "storybook"
              | "svelte"
              | "sveltekit"
              | "sveltekit-1"
              | "tanstack-start"
              | "tanstack-start-lovable"
              | "umijs"
              | "vite"
              | "vitepress"
              | "vue"
              | "vuepress"
              | "xmcp"
              | "zola"
            )
          | undefined;
        runtime?: string | undefined;
      }>
    | undefined;
  gitForkProtection?: boolean | undefined;
  gitLFS?: boolean | undefined;
  id: string;
  ipBuckets?:
    | Array<{ bucket: string; default?: boolean | undefined; supportUntil?: number | undefined }>
    | undefined;
  jobs?:
    | {
        lint?: { targets: Array<string> } | undefined;
        typecheck?: { targets: Array<string> } | undefined;
        "mfe-config-present"?: { targets: Array<string> } | undefined;
      }
    | undefined;
  latestDeployments?:
    | Array<{
        id: string;
        alias?: Array<string> | undefined;
        aliasAssigned?: (number | boolean | null) | undefined;
        aliasError?: ({ code: string; message: string } | null) | undefined;
        aliasFinal?: (string | null) | undefined;
        automaticAliases?: Array<string> | undefined;
        branchMatcher?: { type: "endsWith" | "equals" | "startsWith"; pattern: string } | undefined;
        buildingAt?: number | undefined;
        builds?:
          | Array<{ use: string; src?: string | undefined; dest?: string | undefined }>
          | undefined;
        checksConclusion?: ("canceled" | "failed" | "skipped" | "succeeded") | undefined;
        checksState?: ("completed" | "registered" | "running") | undefined;
        connectBuildsEnabled?: boolean | undefined;
        connectConfigurationId?: string | undefined;
        createdAt: number;
        createdIn: string;
        creator: {
          email: string;
          githubLogin?: string | undefined;
          gitlabLogin?: string | undefined;
          uid: string;
          username: string;
        } | null;
        deletedAt?: number | undefined;
        deploymentHostname: string;
        forced?: boolean | undefined;
        name: string;
        meta?: Record<string, string> | undefined;
        monorepoManager?: (string | null) | undefined;
        oidcTokenClaims?:
          | {
              iss: string;
              sub: string;
              scope: string;
              aud: string;
              owner: string;
              owner_id: string;
              project: string;
              project_id: string;
              environment: string;
              custom_environment_id?: string | undefined;
              mfe_group_ids?: Array<string> | undefined;
              plan?: string | undefined;
            }
          | undefined;
        plan: "enterprise" | "hobby" | "pro";
        previewCommentsEnabled?: boolean | undefined;
        private: boolean;
        readyAt?: number | undefined;
        readyState:
          | "BLOCKED"
          | "BUILDING"
          | "CANCELED"
          | "ERROR"
          | "INITIALIZING"
          | "QUEUED"
          | "READY";
        readySubstate?: ("PROMOTED" | "ROLLING" | "STAGED") | undefined;
        requestedAt?: number | undefined;
        target?: (string | null) | undefined;
        teamId?: (string | null) | undefined;
        type: "LAMBDAS";
        url: string;
        userId?: string | undefined;
        withCache?: boolean | undefined;
      }>
    | undefined;
  link?:
    | (
        | {
            org: string;
            repoOwnerId?: number | undefined;
            repo?: string | undefined;
            repoId?: number | undefined;
            type: "github";
            createdAt?: number | undefined;
            deployHooks: Array<{
              createdAt?: number | undefined;
              id: string;
              name: string;
              ref: string;
              url: string;
            }>;
            gitCredentialId: string;
            updatedAt?: number | undefined;
            sourceless?: boolean | undefined;
            productionBranch: string;
          }
        | {
            type: "github-limited";
            repo?: string | undefined;
            repoId?: number | undefined;
            createdAt?: number | undefined;
            updatedAt?: number | undefined;
            org: string;
            repoOwnerId?: number | undefined;
            deployHooks: Array<{
              createdAt?: number | undefined;
              id: string;
              name: string;
              ref: string;
              url: string;
            }>;
            gitCredentialId: string;
            sourceless?: boolean | undefined;
            productionBranch: string;
          }
        | {
            org: string;
            repoOwnerId?: number | undefined;
            repo?: string | undefined;
            repoId?: number | undefined;
            type: "github-custom-host";
            host: string;
            createdAt?: number | undefined;
            deployHooks: Array<{
              createdAt?: number | undefined;
              id: string;
              name: string;
              ref: string;
              url: string;
            }>;
            gitCredentialId: string;
            updatedAt?: number | undefined;
            sourceless?: boolean | undefined;
            productionBranch: string;
          }
        | {
            projectId: string;
            projectName: string;
            projectNameWithNamespace: string;
            projectNamespace: string;
            projectOwnerId?: number | undefined;
            projectUrl: string;
            type: "gitlab";
            createdAt?: number | undefined;
            deployHooks: Array<{
              createdAt?: number | undefined;
              id: string;
              name: string;
              ref: string;
              url: string;
            }>;
            gitCredentialId: string;
            updatedAt?: number | undefined;
            sourceless?: boolean | undefined;
            productionBranch: string;
          }
        | {
            name: string;
            slug: string;
            owner: string;
            type: "bitbucket";
            uuid: string;
            workspaceUuid: string;
            createdAt?: number | undefined;
            deployHooks: Array<{
              createdAt?: number | undefined;
              id: string;
              name: string;
              ref: string;
              url: string;
            }>;
            gitCredentialId: string;
            updatedAt?: number | undefined;
            sourceless?: boolean | undefined;
            productionBranch: string;
          }
        | {
            org: string;
            repo: string;
            type: "vercel";
            createdAt?: number | undefined;
            deployHooks: Array<{
              createdAt?: number | undefined;
              id: string;
              name: string;
              ref: string;
              url: string;
            }>;
            gitCredentialId: string;
            updatedAt?: number | undefined;
            sourceless?: boolean | undefined;
            productionBranch: string;
          }
        | {
            owner: string;
            repo: string;
            repoId: string;
            ownerId: string;
            type: "cursor-origin";
            createdAt?: number | undefined;
            deployHooks: Array<{
              createdAt?: number | undefined;
              id: string;
              name: string;
              ref: string;
              url: string;
            }>;
            gitCredentialId: string;
            updatedAt?: number | undefined;
            sourceless?: boolean | undefined;
            productionBranch: string;
          }
      )
    | undefined;
  blobs?: { isDefaultApp?: boolean | undefined } | undefined;
  microfrontends?:
    | (
        | {
            isDefaultApp: true;
            updatedAt: number;
            groupIds: Array<string>;
            enabled: true;
            defaultRoute?: string | undefined;
            freeProjectForLegacyLimits?: boolean | undefined;
          }
        | {
            isDefaultApp?: false | undefined;
            routeObservabilityToThisProject?: boolean | undefined;
            doNotRouteWithMicrofrontendsRouting?: boolean | undefined;
            updatedAt: number;
            groupIds: Array<string>;
            enabled: true;
            defaultRoute?: string | undefined;
            freeProjectForLegacyLimits?: boolean | undefined;
          }
        | {
            updatedAt: number;
            groupIds: Array<unknown>;
            enabled: false;
            freeProjectForLegacyLimits?: boolean | undefined;
          }
      )
    | undefined;
  name: string;
  nodeVersion: "10.x" | "12.x" | "14.x" | "16.x" | "18.x" | "20.x" | "22.x" | "24.x" | "8.10.x";
  optionsAllowlist?: ({ paths: Array<{ value: string }> } | null) | undefined;
  outputDirectory?: (string | null) | undefined;
  passwordProtection?: (Record<string, never> | null) | undefined;
  passport?:
    | ({
        deploymentType:
          | "all"
          | "all_except_custom_domains"
          | "preview"
          | "prod_deployment_urls_and_all_previews";
        connectorId: string;
      } | null)
    | undefined;
  protectionConfig?:
    | { sandboxUrls?: { inheritDeploymentProtection?: boolean | undefined } | undefined }
    | undefined;
  sandbox?:
    | {
        region?:
          | (
              | "arn1"
              | "bom1"
              | "cdg1"
              | "cle1"
              | "cpt1"
              | "dub1"
              | "fra1"
              | "gru1"
              | "hkg1"
              | "hnd1"
              | "iad1"
              | "icn1"
              | "kix1"
              | "lhr1"
              | "pdx1"
              | "sfo1"
              | "sin1"
              | "syd1"
              | "yul1"
            )
          | undefined;
        failoverRegions?:
          | Array<
              | "arn1"
              | "bom1"
              | "cdg1"
              | "cle1"
              | "cpt1"
              | "dub1"
              | "fra1"
              | "gru1"
              | "hkg1"
              | "hnd1"
              | "iad1"
              | "icn1"
              | "kix1"
              | "lhr1"
              | "pdx1"
              | "sfo1"
              | "sin1"
              | "syd1"
              | "yul1"
            >
          | undefined;
      }
    | undefined;
  productionDeploymentsFastLane?: boolean | undefined;
  resourceConfig: {
    elasticConcurrencyEnabled?: boolean | undefined;
    fluid?: boolean | undefined;
    functionDefaultRegions: Array<string>;
    functionDefaultTimeout?: number | undefined;
    functionDefaultMemoryType?:
      | ("performance" | "performance_xl" | "standard" | "standard_legacy")
      | undefined;
    functionZeroConfigFailover?: boolean | undefined;
    buildMachineType?: ("basic" | "enhanced" | "standard" | "turbo") | undefined;
    buildMachineSelection?: ("elastic" | "fixed") | undefined;
    buildMachineElasticLastUpdated?: number | undefined;
    buildMachineElasticReason?:
      | (
          | "basic-floor"
          | "build-timeout-failure"
          | "enospc-failure"
          | "enterprise-floor"
          | "high-peak-disk"
          | "high-peak-memory"
          | "long-build-duration"
          | "oom-failure"
          | "short-build-duration"
          | "sustained-high-cpu"
        )
      | undefined;
    isNSNBDisabled?: boolean | undefined;
    buildQueue?:
      | { configuration?: ("SKIP_NAMESPACE_QUEUE" | "WAIT_FOR_NAMESPACE_QUEUE") | undefined }
      | undefined;
    enableFunctionsBeta?: boolean | undefined;
  };
  rollbackDescription?:
    | { userId: string; username: string; description: string; createdAt: number }
    | undefined;
  rollingRelease?:
    | ({
        target: string;
        stages?:
          | (Array<{
              targetPercentage: number;
              requireApproval?: boolean | undefined;
              duration?: number | undefined;
              linearShift?: boolean | undefined;
            }> | null)
          | undefined;
        canaryResponseHeader?: boolean | undefined;
        gate?:
          | {
              enabled: boolean;
              checks: Array<{
                type: "error-rate-5xx";
                minSampleSize?: number | undefined;
                excludeStatusCodes?: Array<number> | undefined;
                excludePaths?: Array<string> | undefined;
                ingestWatermarkSeconds?: number | undefined;
              }>;
              failureThreshold?: number | undefined;
              windowSize?: number | undefined;
              action: "pause" | "rollback";
              dryRun: boolean;
            }
          | undefined;
      } | null)
    | undefined;
  defaultResourceConfig: {
    elasticConcurrencyEnabled?: boolean | undefined;
    fluid?: boolean | undefined;
    functionDefaultRegions: Array<string>;
    functionDefaultTimeout?: number | undefined;
    functionDefaultMemoryType?:
      | ("performance" | "performance_xl" | "standard" | "standard_legacy")
      | undefined;
    functionZeroConfigFailover?: boolean | undefined;
    buildMachineType?: ("basic" | "enhanced" | "standard" | "turbo") | undefined;
    buildMachineSelection?: ("elastic" | "fixed") | undefined;
    buildMachineElasticLastUpdated?: number | undefined;
    buildMachineElasticReason?:
      | (
          | "basic-floor"
          | "build-timeout-failure"
          | "enospc-failure"
          | "enterprise-floor"
          | "high-peak-disk"
          | "high-peak-memory"
          | "long-build-duration"
          | "oom-failure"
          | "short-build-duration"
          | "sustained-high-cpu"
        )
      | undefined;
    isNSNBDisabled?: boolean | undefined;
    buildQueue?:
      | { configuration?: ("SKIP_NAMESPACE_QUEUE" | "WAIT_FOR_NAMESPACE_QUEUE") | undefined }
      | undefined;
    enableFunctionsBeta?: boolean | undefined;
  };
  rootDirectory?: (string | null) | undefined;
  serverlessFunctionZeroConfigFailover?: boolean | undefined;
  skewProtectionBoundaryAt?: number | undefined;
  skewProtectionMaxAge?: number | undefined;
  skewProtectionAllowedDomains?: Array<string> | undefined;
  skipGitConnectDuringLink?: boolean | undefined;
  staticIps?: { builds: boolean; enabled: boolean; regions: Array<string> } | undefined;
  sourceFilesOutsideRootDirectory?: boolean | undefined;
  enableAffectedProjectsDeployments?: boolean | undefined;
  enableExternalRewriteCaching?: boolean | undefined;
  ssoProtection?:
    | ({
        deploymentType:
          | "all"
          | "all_except_custom_domains"
          | "preview"
          | "prod_deployment_urls_and_all_previews";
        cve55182MigrationAppliedFrom?:
          | (
              | "all"
              | "all_except_custom_domains"
              | "preview"
              | "prod_deployment_urls_and_all_previews"
              | "null"
              | null
            )
          | undefined;
        april2026SecurityIncidentMigrationAppliedFrom?:
          | (
              | "all"
              | "all_except_custom_domains"
              | "preview"
              | "prod_deployment_urls_and_all_previews"
              | "null"
              | null
            )
          | undefined;
      } | null)
    | undefined;
  targets?:
    | Record<
        string,
        {
          id: string;
          alias?: Array<string> | undefined;
          aliasAssigned?: (number | boolean | null) | undefined;
          aliasError?: ({ code: string; message: string } | null) | undefined;
          aliasFinal?: (string | null) | undefined;
          automaticAliases?: Array<string> | undefined;
          branchMatcher?:
            | { type: "endsWith" | "equals" | "startsWith"; pattern: string }
            | undefined;
          buildingAt?: number | undefined;
          builds?:
            | Array<{ use: string; src?: string | undefined; dest?: string | undefined }>
            | undefined;
          checksConclusion?: ("canceled" | "failed" | "skipped" | "succeeded") | undefined;
          checksState?: ("completed" | "registered" | "running") | undefined;
          connectBuildsEnabled?: boolean | undefined;
          connectConfigurationId?: string | undefined;
          createdAt: number;
          createdIn: string;
          creator: {
            email: string;
            githubLogin?: string | undefined;
            gitlabLogin?: string | undefined;
            uid: string;
            username: string;
          } | null;
          deletedAt?: number | undefined;
          deploymentHostname: string;
          forced?: boolean | undefined;
          name: string;
          meta?: Record<string, string> | undefined;
          monorepoManager?: (string | null) | undefined;
          oidcTokenClaims?:
            | {
                iss: string;
                sub: string;
                scope: string;
                aud: string;
                owner: string;
                owner_id: string;
                project: string;
                project_id: string;
                environment: string;
                custom_environment_id?: string | undefined;
                mfe_group_ids?: Array<string> | undefined;
                plan?: string | undefined;
              }
            | undefined;
          plan: "enterprise" | "hobby" | "pro";
          previewCommentsEnabled?: boolean | undefined;
          private: boolean;
          readyAt?: number | undefined;
          readyState:
            | "BLOCKED"
            | "BUILDING"
            | "CANCELED"
            | "ERROR"
            | "INITIALIZING"
            | "QUEUED"
            | "READY";
          readySubstate?: ("PROMOTED" | "ROLLING" | "STAGED") | undefined;
          requestedAt?: number | undefined;
          target?: (string | null) | undefined;
          teamId?: (string | null) | undefined;
          type: "LAMBDAS";
          url: string;
          userId?: string | undefined;
          withCache?: boolean | undefined;
        } | null
      >
    | undefined;
  transferCompletedAt?: number | undefined;
  transferStartedAt?: number | undefined;
  transferToAccountId?: string | undefined;
  transferredFromAccountId?: string | undefined;
  updatedAt?: number | undefined;
  live?: boolean | undefined;
  enablePreviewFeedback?: (boolean | null) | undefined;
  enableProductionFeedback?: (boolean | null) | undefined;
  permissions?:
    | {
        oauth2Connection?: Array<ACLAction> | undefined;
        user?: Array<ACLAction> | undefined;
        userConnection?: Array<ACLAction> | undefined;
        userMfaConfiguration?: Array<ACLAction> | undefined;
        userPreference?: Array<ACLAction> | undefined;
        userSudo?: Array<ACLAction> | undefined;
        webAuthn?: Array<ACLAction> | undefined;
        accessGroup?: Array<ACLAction> | undefined;
        agent?: Array<ACLAction> | undefined;
        aiGatewayApiKey?: Array<ACLAction> | undefined;
        aiGatewayApiKeyBypassAll?: Array<ACLAction> | undefined;
        aiGatewayApiKeyOwnedBySelf?: Array<ACLAction> | undefined;
        aiGatewayApiKeySpendAttribution?: Array<ACLAction> | undefined;
        aiGatewayApiKeyZdrExemption?: Array<ACLAction> | undefined;
        aiGatewayBudget?: Array<ACLAction> | undefined;
        aiGatewayCredits?: Array<ACLAction> | undefined;
        aiGatewayPrivateModels?: Array<ACLAction> | undefined;
        aiGatewayGuardrails?: Array<ACLAction> | undefined;
        aiGatewayRules?: Array<ACLAction> | undefined;
        aiGatewaySettings?: Array<ACLAction> | undefined;
        aiGatewayUsage?: Array<ACLAction> | undefined;
        aiGatewayVirtualModelConfigs?: Array<ACLAction> | undefined;
        alerts?: Array<ACLAction> | undefined;
        alertRules?: Array<ACLAction> | undefined;
        aliasGlobal?: Array<ACLAction> | undefined;
        analyticsSampling?: Array<ACLAction> | undefined;
        analyticsUsage?: Array<ACLAction> | undefined;
        apiKey?: Array<ACLAction> | undefined;
        apiKeyAiGateway?: Array<ACLAction> | undefined;
        apiKeyOwnedBySelf?: Array<ACLAction> | undefined;
        oauth2Application?: Array<ACLAction> | undefined;
        vercelAppInstallation?: Array<ACLAction> | undefined;
        vercelAppInstallationRequest?: Array<ACLAction> | undefined;
        auditLog?: Array<ACLAction> | undefined;
        billingAddress?: Array<ACLAction> | undefined;
        billingInformation?: Array<ACLAction> | undefined;
        billingInvoice?: Array<ACLAction> | undefined;
        billingInvoiceEmailRecipient?: Array<ACLAction> | undefined;
        billingInvoiceLanguage?: Array<ACLAction> | undefined;
        billingPlan?: Array<ACLAction> | undefined;
        billingPurchaseOrder?: Array<ACLAction> | undefined;
        billingRefund?: Array<ACLAction> | undefined;
        billingTaxId?: Array<ACLAction> | undefined;
        blob?: Array<ACLAction> | undefined;
        blobStoreTokenSet?: Array<ACLAction> | undefined;
        budget?: Array<ACLAction> | undefined;
        cacheArtifact?: Array<ACLAction> | undefined;
        cacheArtifactUsageEvent?: Array<ACLAction> | undefined;
        codeChecks?: Array<ACLAction> | undefined;
        codeOwners?: Array<ACLAction> | undefined;
        ciInvocations?: Array<ACLAction> | undefined;
        ciLogs?: Array<ACLAction> | undefined;
        concurrentBuilds?: Array<ACLAction> | undefined;
        connect?: Array<ACLAction> | undefined;
        connectConfiguration?: Array<ACLAction> | undefined;
        connectLogs?: Array<ACLAction> | undefined;
        connexClient?: Array<ACLAction> | undefined;
        connexClientProject?: Array<ACLAction> | undefined;
        connexContact?: Array<ACLAction> | undefined;
        connexInstallation?: Array<ACLAction> | undefined;
        connexToken?: Array<ACLAction> | undefined;
        buildMachineDefault?: Array<ACLAction> | undefined;
        cursorOriginInstallation?: Array<ACLAction> | undefined;
        dataCacheBillingSettings?: Array<ACLAction> | undefined;
        defaultDeploymentProtection?: Array<ACLAction> | undefined;
        deploymentPolicy?: Array<ACLAction> | undefined;
        domain?: Array<ACLAction> | undefined;
        domainAcceptDelegation?: Array<ACLAction> | undefined;
        domainAuthCodes?: Array<ACLAction> | undefined;
        domainCertificate?: Array<ACLAction> | undefined;
        domainCheckConfig?: Array<ACLAction> | undefined;
        domainMove?: Array<ACLAction> | undefined;
        domainPurchase?: Array<ACLAction> | undefined;
        domainRecord?: Array<ACLAction> | undefined;
        domainTransferIn?: Array<ACLAction> | undefined;
        drain?: Array<ACLAction> | undefined;
        edgeConfig?: Array<ACLAction> | undefined;
        edgeConfigItem?: Array<ACLAction> | undefined;
        edgeConfigSchema?: Array<ACLAction> | undefined;
        edgeConfigToken?: Array<ACLAction> | undefined;
        endpointVerification?: Array<ACLAction> | undefined;
        event?: Array<ACLAction> | undefined;
        fileUpload?: Array<ACLAction> | undefined;
        flagsExplorerSubscription?: Array<ACLAction> | undefined;
        gitRepository?: Array<ACLAction> | undefined;
        imageOptimizationNewPrice?: Array<ACLAction> | undefined;
        integration?: Array<ACLAction> | undefined;
        integrationAccount?: Array<ACLAction> | undefined;
        integrationConfiguration?: Array<ACLAction> | undefined;
        integrationConfigurationProjects?: Array<ACLAction> | undefined;
        integrationConfigurationRole?: Array<ACLAction> | undefined;
        integrationConfigurationTransfer?: Array<ACLAction> | undefined;
        integrationDeploymentAction?: Array<ACLAction> | undefined;
        integrationEvent?: Array<ACLAction> | undefined;
        integrationLog?: Array<ACLAction> | undefined;
        integrationResource?: Array<ACLAction> | undefined;
        integrationResourceData?: Array<ACLAction> | undefined;
        integrationResourceReplCommand?: Array<ACLAction> | undefined;
        integrationResourceSecrets?: Array<ACLAction> | undefined;
        integrationSSOSession?: Array<ACLAction> | undefined;
        integrationStrict?: Array<ACLAction> | undefined;
        integrationStoreTokenSet?: Array<ACLAction> | undefined;
        integrationVercelConfigurationOverride?: Array<ACLAction> | undefined;
        integrationPullRequest?: Array<ACLAction> | undefined;
        ipBlocking?: Array<ACLAction> | undefined;
        jobGlobal?: Array<ACLAction> | undefined;
        kmsIssuer?: Array<ACLAction> | undefined;
        kmsProjectGrant?: Array<ACLAction> | undefined;
        logDrain?: Array<ACLAction> | undefined;
        marketplaceBillingData?: Array<ACLAction> | undefined;
        marketplaceExperimentationEdgeConfigData?: Array<ACLAction> | undefined;
        marketplaceExperimentationItem?: Array<ACLAction> | undefined;
        marketplaceFlexCommit?: Array<ACLAction> | undefined;
        marketplaceInstallationMember?: Array<ACLAction> | undefined;
        marketplaceInvoice?: Array<ACLAction> | undefined;
        marketplaceSettings?: Array<ACLAction> | undefined;
        Monitoring?: Array<ACLAction> | undefined;
        monitoringAlert?: Array<ACLAction> | undefined;
        monitoringChart?: Array<ACLAction> | undefined;
        monitoringQuery?: Array<ACLAction> | undefined;
        monitoringSettings?: Array<ACLAction> | undefined;
        notificationCustomerBudget?: Array<ACLAction> | undefined;
        notificationDeploymentFailed?: Array<ACLAction> | undefined;
        notificationDomainConfiguration?: Array<ACLAction> | undefined;
        notificationDomainExpire?: Array<ACLAction> | undefined;
        notificationDomainMoved?: Array<ACLAction> | undefined;
        notificationDomainPurchase?: Array<ACLAction> | undefined;
        notificationDomainRenewal?: Array<ACLAction> | undefined;
        notificationDomainTransfer?: Array<ACLAction> | undefined;
        notificationDomainUnverified?: Array<ACLAction> | undefined;
        NotificationMonitoringAlert?: Array<ACLAction> | undefined;
        notificationPaymentFailed?: Array<ACLAction> | undefined;
        notificationPreferences?: Array<ACLAction> | undefined;
        notificationStatementOfReasons?: Array<ACLAction> | undefined;
        notificationUsageAlert?: Array<ACLAction> | undefined;
        oidcFederationPolicy?: Array<ACLAction> | undefined;
        observabilityConfiguration?: Array<ACLAction> | undefined;
        observabilityFunnel?: Array<ACLAction> | undefined;
        observabilityNotebook?: Array<ACLAction> | undefined;
        openTelemetryEndpoint?: Array<ACLAction> | undefined;
        ownEvent?: Array<ACLAction> | undefined;
        organization?: Array<ACLAction> | undefined;
        organizationDomain?: Array<ACLAction> | undefined;
        organizationTeam?: Array<ACLAction> | undefined;
        passwordProtectionInvoiceItem?: Array<ACLAction> | undefined;
        paymentMethod?: Array<ACLAction> | undefined;
        permissions?: Array<ACLAction> | undefined;
        postgres?: Array<ACLAction> | undefined;
        postgresStoreTokenSet?: Array<ACLAction> | undefined;
        previewDeploymentSuffix?: Array<ACLAction> | undefined;
        privateCloudAccount?: Array<ACLAction> | undefined;
        projectTransferIn?: Array<ACLAction> | undefined;
        proTrialOnboarding?: Array<ACLAction> | undefined;
        rateLimit?: Array<ACLAction> | undefined;
        redis?: Array<ACLAction> | undefined;
        redisStoreTokenSet?: Array<ACLAction> | undefined;
        remoteCaching?: Array<ACLAction> | undefined;
        repository?: Array<ACLAction> | undefined;
        samlConfig?: Array<ACLAction> | undefined;
        secret?: Array<ACLAction> | undefined;
        securityConfig?: Array<ACLAction> | undefined;
        sensitiveEnvironmentVariablePolicy?: Array<ACLAction> | undefined;
        sharedEnvVars?: Array<ACLAction> | undefined;
        sharedEnvVarsProduction?: Array<ACLAction> | undefined;
        space?: Array<ACLAction> | undefined;
        spaceRun?: Array<ACLAction> | undefined;
        storeIsLocked?: Array<ACLAction> | undefined;
        storeTokenSetSensitive?: Array<ACLAction> | undefined;
        storeTransfer?: Array<ACLAction> | undefined;
        supportCase?: Array<ACLAction> | undefined;
        supportCaseComment?: Array<ACLAction> | undefined;
        team?: Array<ACLAction> | undefined;
        teamAccessRequest?: Array<ACLAction> | undefined;
        teamFellowMembership?: Array<ACLAction> | undefined;
        teamGitExclusivity?: Array<ACLAction> | undefined;
        teamInvite?: Array<ACLAction> | undefined;
        teamInviteCode?: Array<ACLAction> | undefined;
        teamInviteLink?: Array<ACLAction> | undefined;
        teamJoin?: Array<ACLAction> | undefined;
        teamMemberMfaStatus?: Array<ACLAction> | undefined;
        teamMicrofrontends?: Array<ACLAction> | undefined;
        teamOwnMembership?: Array<ACLAction> | undefined;
        teamOwnMembershipDisconnectSAML?: Array<ACLAction> | undefined;
        teamSudo?: Array<ACLAction> | undefined;
        teamTokenInvalidation?: Array<ACLAction> | undefined;
        token?: Array<ACLAction> | undefined;
        toolbarComment?: Array<ACLAction> | undefined;
        usage?: Array<ACLAction> | undefined;
        usageCycle?: Array<ACLAction> | undefined;
        vcrRepository?: Array<ACLAction> | undefined;
        vpcPeeringConnection?: Array<ACLAction> | undefined;
        webAnalyticsPlan?: Array<ACLAction> | undefined;
        webhook?: Array<ACLAction> | undefined;
        "webhook-event"?: Array<ACLAction> | undefined;
        aliasProject?: Array<ACLAction> | undefined;
        aliasProtectionBypass?: Array<ACLAction> | undefined;
        bulkRedirects?: Array<ACLAction> | undefined;
        buildMachine?: Array<ACLAction> | undefined;
        connectConfigurationLink?: Array<ACLAction> | undefined;
        dataCacheNamespace?: Array<ACLAction> | undefined;
        deployment?: Array<ACLAction> | undefined;
        deploymentBuildLogs?: Array<ACLAction> | undefined;
        deploymentCheck?: Array<ACLAction> | undefined;
        deploymentCheckPreview?: Array<ACLAction> | undefined;
        deploymentCheckReRunFromProductionBranch?: Array<ACLAction> | undefined;
        deploymentProductionGit?: Array<ACLAction> | undefined;
        deploymentV0?: Array<ACLAction> | undefined;
        deploymentPreview?: Array<ACLAction> | undefined;
        deploymentPrivate?: Array<ACLAction> | undefined;
        deploymentPromote?: Array<ACLAction> | undefined;
        deploymentRollback?: Array<ACLAction> | undefined;
        edgeCacheNamespace?: Array<ACLAction> | undefined;
        environments?: Array<ACLAction> | undefined;
        job?: Array<ACLAction> | undefined;
        logs?: Array<ACLAction> | undefined;
        logsPreset?: Array<ACLAction> | undefined;
        observabilityData?: Array<ACLAction> | undefined;
        onDemandBuild?: Array<ACLAction> | undefined;
        onDemandConcurrency?: Array<ACLAction> | undefined;
        optionsAllowlist?: Array<ACLAction> | undefined;
        passwordProtection?: Array<ACLAction> | undefined;
        privateLinkEndpoint?: Array<ACLAction> | undefined;
        productionAliasProtectionBypass?: Array<ACLAction> | undefined;
        productionShareableLink?: Array<ACLAction> | undefined;
        project?: Array<ACLAction> | undefined;
        projectAccessGroup?: Array<ACLAction> | undefined;
        projectAnalyticsSampling?: Array<ACLAction> | undefined;
        projectAnalyticsUsage?: Array<ACLAction> | undefined;
        projectCheck?: Array<ACLAction> | undefined;
        projectCheckRun?: Array<ACLAction> | undefined;
        projectDeploymentExpiration?: Array<ACLAction> | undefined;
        projectDeploymentHook?: Array<ACLAction> | undefined;
        projectDeploymentProtectionStrict?: Array<ACLAction> | undefined;
        projectDomain?: Array<ACLAction> | undefined;
        projectDomainCheckConfig?: Array<ACLAction> | undefined;
        projectDomainMove?: Array<ACLAction> | undefined;
        projectDomainVerify?: Array<ACLAction> | undefined;
        projectEvent?: Array<ACLAction> | undefined;
        projectEnvVars?: Array<ACLAction> | undefined;
        projectEnvVarsProduction?: Array<ACLAction> | undefined;
        projectEnvVarsUnownedByIntegration?: Array<ACLAction> | undefined;
        projectFlags?: Array<ACLAction> | undefined;
        projectFlagsProduction?: Array<ACLAction> | undefined;
        projectFlagsSdkKey?: Array<ACLAction> | undefined;
        projectFromV0?: Array<ACLAction> | undefined;
        projectId?: Array<ACLAction> | undefined;
        projectIntegrationConfiguration?: Array<ACLAction> | undefined;
        projectLink?: Array<ACLAction> | undefined;
        projectMember?: Array<ACLAction> | undefined;
        projectMonitoring?: Array<ACLAction> | undefined;
        projectOIDCToken?: Array<ACLAction> | undefined;
        projectPermissions?: Array<ACLAction> | undefined;
        projectProductionBranch?: Array<ACLAction> | undefined;
        projectProtectionBypass?: Array<ACLAction> | undefined;
        projectRollingRelease?: Array<ACLAction> | undefined;
        projectRoutes?: Array<ACLAction> | undefined;
        projectSupportCase?: Array<ACLAction> | undefined;
        projectSupportCaseComment?: Array<ACLAction> | undefined;
        projectTier?: Array<ACLAction> | undefined;
        projectTransfer?: Array<ACLAction> | undefined;
        projectTransferOut?: Array<ACLAction> | undefined;
        projectUsage?: Array<ACLAction> | undefined;
        pageIntegrity?: Array<ACLAction> | undefined;
        seawallConfig?: Array<ACLAction> | undefined;
        securityPlusConfiguration?: Array<ACLAction> | undefined;
        shareableLink?: Array<ACLAction> | undefined;
        shareableLinkStrict?: Array<ACLAction> | undefined;
        sharedEnvVarConnection?: Array<ACLAction> | undefined;
        skewProtection?: Array<ACLAction> | undefined;
        analytics?: Array<ACLAction> | undefined;
        trustedIps?: Array<ACLAction> | undefined;
        trustedSources?: Array<ACLAction> | undefined;
        v0Chat?: Array<ACLAction> | undefined;
        vercelAuth?: Array<ACLAction> | undefined;
        vercelRun?: Array<ACLAction> | undefined;
        webAnalytics?: Array<ACLAction> | undefined;
        workflowRunData?: Array<ACLAction> | undefined;
      }
    | undefined;
  lastRollbackTarget?: (Record<string, never> | null) | undefined;
  lastAliasRequest?:
    | ({
        fromDeploymentId: string | null;
        toDeploymentId: string;
        fromRollingReleaseId?: string | undefined;
        jobStatus: "failed" | "in-progress" | "pending" | "skipped" | "succeeded";
        requestedAt: number;
        type: "promote" | "rollback";
      } | null)
    | undefined;
  protectionBypass?:
    | Record<
        string,
        | {
            createdAt: number;
            createdBy: string;
            scope: "integration-automation-bypass";
            integrationId: string;
            configurationId: string;
          }
        | {
            createdAt: number;
            createdBy: string;
            scope: "automation-bypass";
            isEnvVar?: boolean | undefined;
            note?: string | undefined;
          }
      >
    | undefined;
  hasActiveBranches?: boolean | undefined;
  trustedIps?:
    | (
        | {
            deploymentType:
              | "all"
              | "all_except_custom_domains"
              | "preview"
              | "prod_deployment_urls_and_all_previews"
              | "production";
            addresses: Array<{ value: string; note?: string | undefined }>;
            protectionMode: "additional" | "exclusive";
          }
        | {
            deploymentType:
              | "all"
              | "all_except_custom_domains"
              | "preview"
              | "prod_deployment_urls_and_all_previews"
              | "production";
          }
        | null
      )
    | undefined;
  trustedSources?:
    | ({
        projects?:
          | Record<
              string,
              {
                label?: string | undefined;
                customAllow?:
                  | Array<{
                      from:
                        | { slugs: Array<string>; preset?: "all-custom" | undefined }
                        | { slugs?: Array<string> | undefined; preset: "all-custom" };
                      to:
                        | { slugs: Array<string>; preset?: "all-custom" | undefined }
                        | { slugs?: Array<string> | undefined; preset: "all-custom" };
                    }>
                  | undefined;
              }
            >
          | undefined;
        oidcProviders?:
          | Record<
              string,
              Array<{
                to:
                  | { slugs: Array<string>; preset?: "all-custom" | undefined }
                  | { slugs?: Array<string> | undefined; preset: "all-custom" };
                label?: string | undefined;
                claims: Record<string, Array<string>>;
              }>
            >
          | undefined;
      } | null)
    | undefined;
  gitComments?: { onPullRequest: boolean; onCommit: boolean } | undefined;
  gitProviderOptions?:
    | {
        createDeployments: "disabled" | "enabled";
        disableRepositoryDispatchEvents?: boolean | undefined;
        requireVerifiedCommits?: boolean | undefined;
        gitCommitStatus?: boolean | undefined;
        consolidatedGitCommitStatus?: { enabled: boolean; propagateFailures: boolean } | undefined;
      }
    | undefined;
  paused?: boolean | undefined;
  concurrencyBucketName?: string | undefined;
  webAnalytics?:
    | {
        id: string;
        disabledAt?: number | undefined;
        canceledAt?: number | undefined;
        enabledAt?: number | undefined;
        hasData?: true | undefined;
      }
    | undefined;
  security?:
    | {
        attackModeEnabled?: boolean | undefined;
        attackModeUpdatedAt?: number | undefined;
        firewallEnabled?: boolean | undefined;
        firewallUpdatedAt?: number | undefined;
        attackModeActiveUntil?: (number | null) | undefined;
        firewallConfigVersion?: number | undefined;
        rulesets?:
          | Record<
              string,
              {
                action:
                  | "allow"
                  | "bypass"
                  | "challenge"
                  | "deny"
                  | "log"
                  | "rate_limit"
                  | "redirect";
                rateLimit?:
                  | ({
                      algo: "fixed_window" | "token_bucket";
                      window: number;
                      limit: number;
                      keys: Array<string>;
                    } | null)
                  | undefined;
                redirect?: ({ location: string; permanent: boolean } | null) | undefined;
                actionDuration?: (string | null) | undefined;
                bypassSystem?: (boolean | null) | undefined;
                logHeaders?: (Array<string> | "*") | undefined;
              }
            >
          | undefined;
        firewallSeawallEnabled?: boolean | undefined;
        ja3Enabled?: boolean | undefined;
        ja4Enabled?: boolean | undefined;
        firewallBypassIps?: Array<string> | undefined;
        managedRules?:
          | ({
              vercel_ruleset: {
                active: boolean;
                action?: ("challenge" | "deny" | "log") | undefined;
              };
              traffic_sources: {
                active: boolean;
                action?: ("challenge" | "deny" | "log") | undefined;
              };
              bot_filter: { active: boolean; action?: ("challenge" | "deny" | "log") | undefined };
              ai_bots: { active: boolean; action?: ("challenge" | "deny" | "log") | undefined };
              owasp: { active: boolean; action?: ("challenge" | "deny" | "log") | undefined };
            } | null)
          | undefined;
        botIdEnabled?: boolean | undefined;
        log_headers?: (Array<string> | "*") | undefined;
        securityPlus?: boolean | undefined;
        securityPlusMetadata?:
          | { updatedAt: number; firstEnabledAt?: number | undefined }
          | undefined;
        pageIntegrityEnabled?: boolean | undefined;
      }
    | undefined;
  oidcTokenConfig?:
    | { enabled?: boolean | undefined; issuerMode?: ("global" | "team") | undefined }
    | undefined;
  deploymentPolicy?:
    | ({
        gitSources?:
          | (Array<{
              sources: Array<
                | { provider: "bitbucket" | "github"; org: string; repo?: string | undefined }
                | { provider: "gitlab"; namespace: string; project?: string | undefined }
              >;
              enabled: boolean;
              environments: Array<
                | { type: "system"; target: "preview" | "production" }
                | { type: "custom"; environmentId: string }
              >;
            }> | null)
          | undefined;
        deploymentSources?:
          | (Array<{
              sources: Array<"cli" | "deploy-hook" | "git" | "integration" | "rest-api" | "v0">;
              enabled: boolean;
              environments: Array<
                | { type: "system"; target: "preview" | "production" }
                | { type: "custom"; environmentId: string }
              >;
            }> | null)
          | undefined;
      } | null)
    | undefined;
  tier?: ("advanced" | "critical") | undefined;
  usageStatus?:
    | {
        kind: "flat";
        exceededAllowanceUntil?: number | undefined;
        bypassThrottleUntil?: number | undefined;
        throttled?: boolean | undefined;
        teamThrottled?: boolean | undefined;
      }
    | undefined;
  features?: { webAnalytics?: boolean | undefined } | undefined;
  v0?: boolean | undefined;
  v0Created?: boolean | undefined;
  abuse?:
    | {
        scanner?: string | undefined;
        history: Array<{ scanner: string; reason: string; by: string; byId: string; at: number }>;
        updatedAt: number;
        block?:
          | {
              action: "blocked";
              reason: string;
              statusCode: number;
              createdAt: number;
              caseId?: string | undefined;
              actor?: string | undefined;
              comment?: string | undefined;
              ineligibleForAppeal?: boolean | undefined;
              isCascading?: boolean | undefined;
            }
          | undefined;
        blockHistory?:
          | Array<
              | {
                  action: "blocked";
                  reason: string;
                  statusCode: number;
                  createdAt: number;
                  caseId?: string | undefined;
                  actor?: string | undefined;
                  comment?: string | undefined;
                  ineligibleForAppeal?: boolean | undefined;
                  isCascading?: boolean | undefined;
                }
              | {
                  action: "unblocked";
                  createdAt: number;
                  caseId?: string | undefined;
                  actor?: string | undefined;
                  comment?: string | undefined;
                  ineligibleForAppeal?: boolean | undefined;
                  isCascading?: boolean | undefined;
                }
              | {
                  action: "route-blocked";
                  route:
                    | { src: string; status: number; expiry?: number | undefined }
                    | {
                        has: Array<
                          | { type: "header"; key: "x-vercel-ip-country"; value: { eq: string } }
                          | { type: "host"; value: { eq: string } }
                        >;
                        mitigate: { action: "block_legal_cwc" };
                        src?: string | undefined;
                      };
                  reason: string;
                  createdAt: number;
                  caseId?: string | undefined;
                  actor?: string | undefined;
                  comment?: string | undefined;
                  ineligibleForAppeal?: boolean | undefined;
                  isCascading?: boolean | undefined;
                }
              | {
                  action: "route-unblocked";
                  route:
                    | { src: string; status: number; expiry?: number | undefined }
                    | {
                        has: Array<
                          | { type: "header"; key: "x-vercel-ip-country"; value: { eq: string } }
                          | { type: "host"; value: { eq: string } }
                        >;
                        mitigate: { action: "block_legal_cwc" };
                        src?: string | undefined;
                      };
                  statusCode?: number | undefined;
                  createdAt: number;
                  caseId?: string | undefined;
                  actor?: string | undefined;
                  comment?: string | undefined;
                  ineligibleForAppeal?: boolean | undefined;
                  isCascading?: boolean | undefined;
                }
            >
          | undefined;
        interstitial?: boolean | undefined;
        interstitialHistory?:
          | Array<{
              action:
                | "add-deployment-interstitial"
                | "add-project-interstitial"
                | "remove-deployment-interstitial"
                | "remove-project-interstitial";
              createdAt: number;
              caseId?: string | undefined;
              reason?: string | undefined;
              actor?: string | undefined;
              comment?: string | undefined;
            }>
          | undefined;
      }
    | undefined;
  internalRoutes?:
    | Array<
        | { src: string; status: number; expiry?: number | undefined }
        | {
            has: Array<
              | { type: "header"; key: "x-vercel-ip-country"; value: { eq: string } }
              | { type: "host"; value: { eq: string } }
            >;
            mitigate: { action: "block_legal_cwc" };
            src?: string | undefined;
          }
      >
    | undefined;
  hasDeployments?: boolean | undefined;
  dismissedToasts?:
    | Array<{
        key: string;
        dismissedAt: number;
        action: "accept" | "cancel" | "delete";
        value:
          | string
          | number
          | { previousValue: string | number | boolean; currentValue: string | number | boolean }
          | boolean
          | null;
      }>
    | undefined;
  protectedSourcemaps?: boolean | undefined;
  tracing?:
    | {
        domains?: string | undefined;
        ignorePaths?: Array<string> | undefined;
        samplingRules?:
          | Array<{
              rate: number;
              env?: ("preview" | "production") | undefined;
              requestPath?: string | undefined;
              destination?: ("external" | "internal") | undefined;
            }>
          | undefined;
      }
    | undefined;
  avatar?: (string | null) | undefined;
};

export type PostV11ProjectsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV11ProjectsBody;
};

export type PostV11ProjectsHandler = (
  input: PostV11ProjectsInput,
) => Promise<PostV11ProjectsResponse>;

export const postV1ProjectsIdOrNameTokenBody = z.object({ source: z.string().max(150).optional() });

export type PostV1ProjectsIdOrNameTokenBody = { source?: string | undefined };

export type PostV1ProjectsIdOrNameTokenResponse = { token: string };

export type PostV1ProjectsIdOrNameTokenInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV1ProjectsIdOrNameTokenBody;
};

export type PostV1ProjectsIdOrNameTokenHandler = (
  input: PostV1ProjectsIdOrNameTokenInput,
) => Promise<PostV1ProjectsIdOrNameTokenResponse>;

export const postV1ProjectsTracesSessionBody = z.object({
  projectId: z.string(),
  hostname: z.string(),
});

export type PostV1ProjectsTracesSessionBody = { projectId: string; hostname: string };

export type PostV1ProjectsTracesSessionResponse = { token: string };

export type PostV1ProjectsTracesSessionInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV1ProjectsTracesSessionBody;
};

export type PostV1ProjectsTracesSessionHandler = (
  input: PostV1ProjectsTracesSessionInput,
) => Promise<PostV1ProjectsTracesSessionResponse>;

export type GetV9ProjectsIdOrNameResponse = {
  integrations?:
    | Array<{
        installationId: string;
        resources?: Array<{ externalResourceId: string }> | undefined;
      }>
    | undefined;
  accountId: string;
  creator?:
    | (
        | {
            type: "user";
            via:
              | { type: "app"; app: { id: string; clientId?: string | undefined } }
              | {
                  type: "integration";
                  integration: { integrationId: string; configurationId: string };
                }
              | null;
            user: { id: string };
          }
        | { type: "app"; app: { id: string; clientId?: string | undefined } }
        | { type: "integration"; integration: { integrationId: string; configurationId: string } }
        | { type: "system" }
      )
    | undefined;
  alias: Array<{
    configuredBy?: ("A" | "CNAME" | "dns-01" | "http" | "null" | null) | undefined;
    configuredChangedAt?: (number | null) | undefined;
    createdAt?: (number | null) | undefined;
    deployment: {
      id: string;
      alias?: Array<string> | undefined;
      aliasAssigned?: (number | boolean | null) | undefined;
      aliasError?: ({ code: string; message: string } | null) | undefined;
      aliasFinal?: (string | null) | undefined;
      automaticAliases?: Array<string> | undefined;
      branchMatcher?: { type: "endsWith" | "equals" | "startsWith"; pattern: string } | undefined;
      buildingAt?: number | undefined;
      builds?:
        | Array<{ use: string; src?: string | undefined; dest?: string | undefined }>
        | undefined;
      checksConclusion?: ("canceled" | "failed" | "skipped" | "succeeded") | undefined;
      checksState?: ("completed" | "registered" | "running") | undefined;
      connectBuildsEnabled?: boolean | undefined;
      connectConfigurationId?: string | undefined;
      createdAt: number;
      createdIn: string;
      creator: {
        email: string;
        githubLogin?: string | undefined;
        gitlabLogin?: string | undefined;
        uid: string;
        username: string;
      } | null;
      deletedAt?: number | undefined;
      deploymentHostname: string;
      forced?: boolean | undefined;
      name: string;
      meta?: Record<string, string> | undefined;
      monorepoManager?: (string | null) | undefined;
      oidcTokenClaims?:
        | {
            iss: string;
            sub: string;
            scope: string;
            aud: string;
            owner: string;
            owner_id: string;
            project: string;
            project_id: string;
            environment: string;
            custom_environment_id?: string | undefined;
            mfe_group_ids?: Array<string> | undefined;
            plan?: string | undefined;
          }
        | undefined;
      plan: "enterprise" | "hobby" | "pro";
      previewCommentsEnabled?: boolean | undefined;
      private: boolean;
      readyAt?: number | undefined;
      readyState:
        | "BLOCKED"
        | "BUILDING"
        | "CANCELED"
        | "ERROR"
        | "INITIALIZING"
        | "QUEUED"
        | "READY";
      readySubstate?: ("PROMOTED" | "ROLLING" | "STAGED") | undefined;
      requestedAt?: number | undefined;
      target?: (string | null) | undefined;
      teamId?: (string | null) | undefined;
      type: "LAMBDAS";
      url: string;
      userId?: string | undefined;
      withCache?: boolean | undefined;
    } | null;
    domain: string;
    environment: "preview" | "production";
    gitBranch?: (string | null) | undefined;
    redirect?: (string | null) | undefined;
    redirectStatusCode?: (number | null) | undefined;
    target: "PREVIEW" | "PRODUCTION" | "STAGING";
  }>;
  analytics?:
    | {
        id: string;
        canceledAt?: (number | null) | undefined;
        disabledAt: number;
        enabledAt: number;
        paidAt?: number | undefined;
        sampleRatePercent?: (number | null) | undefined;
        spendLimitInDollars?: (number | null) | undefined;
      }
    | undefined;
  appliedCve55182Migration?: boolean | undefined;
  speedInsights?:
    | {
        id: string;
        enabledAt?: number | undefined;
        disabledAt?: number | undefined;
        canceledAt?: number | undefined;
        hasData?: boolean | undefined;
        dataReceivedAt?: number | undefined;
        paidAt?: number | undefined;
      }
    | undefined;
  autoExposeSystemEnvs?: boolean | undefined;
  autoAssignCustomDomains?: boolean | undefined;
  autoAssignCustomDomainsUpdatedBy?: string | undefined;
  buildCommand?: (string | null) | undefined;
  commandForIgnoringBuildStep?: (string | null) | undefined;
  connectConfigurations?:
    | (Array<{
        envId: string | "preview" | "production";
        connectConfigurationId: string;
        dc?: string | undefined;
        passive: boolean;
        buildsEnabled: boolean;
        aws?: { subnetIds: Array<string>; securityGroupId?: string | undefined } | undefined;
        createdAt: number;
        updatedAt: number;
      }> | null)
    | undefined;
  connectConfigurationId?: (string | null) | undefined;
  connectBuildsEnabled?: boolean | undefined;
  passiveConnectConfigurationId?: (string | null) | undefined;
  createdAt?: number | undefined;
  customerSupportCodeVisibility?: boolean | undefined;
  crons?:
    | {
        enabledAt: number;
        disabledAt: number | null;
        updatedAt: number;
        deploymentId: string | null;
        definitions: Array<{
          host: string;
          path: string;
          schedule: string;
          source?: "api" | undefined;
          description?: string | undefined;
          hostInferred?: boolean | undefined;
        }>;
      }
    | undefined;
  dataCache?:
    | {
        userDisabled: boolean;
        storageSizeBytes?: (number | null) | undefined;
        unlimited?: boolean | undefined;
      }
    | undefined;
  deploymentExpiration: {
    expirationDays?: number | undefined;
    expirationDaysProduction?: number | undefined;
    expirationDaysCanceled?: number | undefined;
    expirationDaysErrored?: number | undefined;
    deploymentsToKeep?: number | undefined;
  };
  expiration?: ({ expiresAt: number } | { lockedAt: number; lockedBy: string }) | undefined;
  devCommand?: (string | null) | undefined;
  directoryListing: boolean;
  installCommand?: (string | null) | undefined;
  env?:
    | Array<{
        target?:
          | (
              | Array<"development" | "development" | "preview" | "preview" | "production">
              | "production"
              | "preview"
              | "development"
            )
          | undefined;
        type: "encrypted" | "plain" | "secret" | "sensitive" | "system";
        sunsetSecretId?: string | undefined;
        legacyValue?: string | undefined;
        decrypted?: boolean | undefined;
        value: string;
        vsmValue?: string | undefined;
        id?: string | undefined;
        key: string;
        configurationId?: (string | null) | undefined;
        createdAt?: number | undefined;
        updatedAt?: number | undefined;
        createdBy?: (string | null) | undefined;
        updatedBy?: (string | null) | undefined;
        gitBranch?: string | undefined;
        visibility?: ("config" | "secret") | undefined;
        edgeConfigId?: (string | null) | undefined;
        edgeConfigTokenId?: (string | null) | undefined;
        contentHint?:
          | (
              | { type: "redis-url"; storeId: string }
              | { type: "redis-rest-api-url"; storeId: string }
              | { type: "redis-rest-api-token"; storeId: string }
              | { type: "redis-rest-api-read-only-token"; storeId: string }
              | { type: "blob-read-write-token"; storeId: string }
              | { type: "blob-store-id"; storeId: string }
              | { type: "blob-webhook-public-key"; storeId: string }
              | { type: "postgres-url"; storeId: string }
              | { type: "postgres-url-non-pooling"; storeId: string }
              | { type: "postgres-prisma-url"; storeId: string }
              | { type: "postgres-user"; storeId: string }
              | { type: "postgres-host"; storeId: string }
              | { type: "postgres-password"; storeId: string }
              | { type: "postgres-database"; storeId: string }
              | { type: "postgres-url-no-ssl"; storeId: string }
              | {
                  type: "integration-store-secret";
                  storeId: string;
                  integrationId: string;
                  integrationProductId: string;
                  integrationConfigurationId: string;
                }
              | { type: "flags-connection-string"; projectId: string }
              | null
            )
          | undefined;
        internalContentHint?: ({ type: "flags-secret"; encryptedValue: string } | null) | undefined;
        comment?: string | undefined;
        customEnvironmentIds?: Array<string> | undefined;
      }>
    | undefined;
  customEnvironments?:
    | Array<{
        id: string;
        slug: string;
        type: "development" | "preview" | "production";
        description?: string | undefined;
        branchMatcher?: { type: "endsWith" | "equals" | "startsWith"; pattern: string } | undefined;
        domains?:
          | Array<{
              name: string;
              apexName: string;
              projectId: string;
              redirect?: (string | null) | undefined;
              redirectStatusCode?: (number | null) | undefined;
              gitBranch?: (string | null) | undefined;
              customEnvironmentId?: (string | null) | undefined;
              updatedAt?: number | undefined;
              createdAt?: number | undefined;
              verified: boolean;
              verification?:
                | Array<{ type: string; domain: string; value: string; reason: string }>
                | undefined;
            }>
          | undefined;
        currentDeploymentAliases?: Array<string> | undefined;
        createdAt: number;
        updatedAt: number;
      }>
    | undefined;
  framework?:
    | (
        | "actix-web"
        | "angular"
        | "ash"
        | "astro"
        | "axum"
        | "blitzjs"
        | "brunch"
        | "bun"
        | "container"
        | "create-react-app"
        | "django"
        | "docusaurus"
        | "docusaurus-2"
        | "dojo"
        | "eleventy"
        | "elysia"
        | "ember"
        | "eve"
        | "express"
        | "fastapi"
        | "fasthtml"
        | "fastify"
        | "flask"
        | "gatsby"
        | "go"
        | "gridsome"
        | "h3"
        | "hexo"
        | "hono"
        | "hugo"
        | "hydrogen"
        | "ionic-angular"
        | "ionic-react"
        | "jekyll"
        | "koa"
        | "mastra"
        | "middleman"
        | "nestjs"
        | "nextjs"
        | "nitro"
        | "node"
        | "nuxtjs"
        | "parcel"
        | "polymer"
        | "preact"
        | "python"
        | "react-router"
        | "redwoodjs"
        | "remix"
        | "ruby"
        | "rust"
        | "saber"
        | "sanity"
        | "sanity-v2"
        | "sapper"
        | "scully"
        | "services"
        | "solidstart"
        | "solidstart-1"
        | "stencil"
        | "storybook"
        | "svelte"
        | "sveltekit"
        | "sveltekit-1"
        | "tanstack-start"
        | "tanstack-start-lovable"
        | "umijs"
        | "vite"
        | "vitepress"
        | "vue"
        | "vuepress"
        | "xmcp"
        | "zola"
        | "null"
        | null
      )
    | undefined;
  services?:
    | Array<{
        serviceName: string;
        serviceType?: ("cron" | "job" | "web" | "worker") | undefined;
        framework?:
          | (
              | "actix-web"
              | "angular"
              | "ash"
              | "astro"
              | "axum"
              | "blitzjs"
              | "brunch"
              | "bun"
              | "container"
              | "create-react-app"
              | "django"
              | "docusaurus"
              | "docusaurus-2"
              | "dojo"
              | "eleventy"
              | "elysia"
              | "ember"
              | "eve"
              | "express"
              | "fastapi"
              | "fasthtml"
              | "fastify"
              | "flask"
              | "gatsby"
              | "go"
              | "gridsome"
              | "h3"
              | "hexo"
              | "hono"
              | "hugo"
              | "hydrogen"
              | "ionic-angular"
              | "ionic-react"
              | "jekyll"
              | "koa"
              | "mastra"
              | "middleman"
              | "nestjs"
              | "nextjs"
              | "nitro"
              | "node"
              | "nuxtjs"
              | "parcel"
              | "polymer"
              | "preact"
              | "python"
              | "react-router"
              | "redwoodjs"
              | "remix"
              | "ruby"
              | "rust"
              | "saber"
              | "sanity"
              | "sanity-v2"
              | "sapper"
              | "scully"
              | "services"
              | "solidstart"
              | "solidstart-1"
              | "stencil"
              | "storybook"
              | "svelte"
              | "sveltekit"
              | "sveltekit-1"
              | "tanstack-start"
              | "tanstack-start-lovable"
              | "umijs"
              | "vite"
              | "vitepress"
              | "vue"
              | "vuepress"
              | "xmcp"
              | "zola"
            )
          | undefined;
        runtime?: string | undefined;
      }>
    | undefined;
  gitForkProtection?: boolean | undefined;
  gitLFS?: boolean | undefined;
  id: string;
  ipBuckets?:
    | Array<{ bucket: string; default?: boolean | undefined; supportUntil?: number | undefined }>
    | undefined;
  jobs?:
    | {
        lint?: { targets: Array<string> } | undefined;
        typecheck?: { targets: Array<string> } | undefined;
        "mfe-config-present"?: { targets: Array<string> } | undefined;
      }
    | undefined;
  latestDeployments?:
    | Array<{
        id: string;
        alias?: Array<string> | undefined;
        aliasAssigned?: (number | boolean | null) | undefined;
        aliasError?: ({ code: string; message: string } | null) | undefined;
        aliasFinal?: (string | null) | undefined;
        automaticAliases?: Array<string> | undefined;
        branchMatcher?: { type: "endsWith" | "equals" | "startsWith"; pattern: string } | undefined;
        buildingAt?: number | undefined;
        builds?:
          | Array<{ use: string; src?: string | undefined; dest?: string | undefined }>
          | undefined;
        checksConclusion?: ("canceled" | "failed" | "skipped" | "succeeded") | undefined;
        checksState?: ("completed" | "registered" | "running") | undefined;
        connectBuildsEnabled?: boolean | undefined;
        connectConfigurationId?: string | undefined;
        createdAt: number;
        createdIn: string;
        creator: {
          email: string;
          githubLogin?: string | undefined;
          gitlabLogin?: string | undefined;
          uid: string;
          username: string;
        } | null;
        deletedAt?: number | undefined;
        deploymentHostname: string;
        forced?: boolean | undefined;
        name: string;
        meta?: Record<string, string> | undefined;
        monorepoManager?: (string | null) | undefined;
        oidcTokenClaims?:
          | {
              iss: string;
              sub: string;
              scope: string;
              aud: string;
              owner: string;
              owner_id: string;
              project: string;
              project_id: string;
              environment: string;
              custom_environment_id?: string | undefined;
              mfe_group_ids?: Array<string> | undefined;
              plan?: string | undefined;
            }
          | undefined;
        plan: "enterprise" | "hobby" | "pro";
        previewCommentsEnabled?: boolean | undefined;
        private: boolean;
        readyAt?: number | undefined;
        readyState:
          | "BLOCKED"
          | "BUILDING"
          | "CANCELED"
          | "ERROR"
          | "INITIALIZING"
          | "QUEUED"
          | "READY";
        readySubstate?: ("PROMOTED" | "ROLLING" | "STAGED") | undefined;
        requestedAt?: number | undefined;
        target?: (string | null) | undefined;
        teamId?: (string | null) | undefined;
        type: "LAMBDAS";
        url: string;
        userId?: string | undefined;
        withCache?: boolean | undefined;
      }>
    | undefined;
  link?:
    | (
        | {
            org: string;
            repoOwnerId?: number | undefined;
            repo?: string | undefined;
            repoId?: number | undefined;
            type: "github";
            createdAt?: number | undefined;
            deployHooks: Array<{
              createdAt?: number | undefined;
              id: string;
              name: string;
              ref: string;
              url: string;
            }>;
            gitCredentialId: string;
            updatedAt?: number | undefined;
            sourceless?: boolean | undefined;
            productionBranch: string;
          }
        | {
            type: "github-limited";
            repo?: string | undefined;
            repoId?: number | undefined;
            createdAt?: number | undefined;
            updatedAt?: number | undefined;
            org: string;
            repoOwnerId?: number | undefined;
            deployHooks: Array<{
              createdAt?: number | undefined;
              id: string;
              name: string;
              ref: string;
              url: string;
            }>;
            gitCredentialId: string;
            sourceless?: boolean | undefined;
            productionBranch: string;
          }
        | {
            org: string;
            repoOwnerId?: number | undefined;
            repo?: string | undefined;
            repoId?: number | undefined;
            type: "github-custom-host";
            host: string;
            createdAt?: number | undefined;
            deployHooks: Array<{
              createdAt?: number | undefined;
              id: string;
              name: string;
              ref: string;
              url: string;
            }>;
            gitCredentialId: string;
            updatedAt?: number | undefined;
            sourceless?: boolean | undefined;
            productionBranch: string;
          }
        | {
            projectId: string;
            projectName: string;
            projectNameWithNamespace: string;
            projectNamespace: string;
            projectOwnerId?: number | undefined;
            projectUrl: string;
            type: "gitlab";
            createdAt?: number | undefined;
            deployHooks: Array<{
              createdAt?: number | undefined;
              id: string;
              name: string;
              ref: string;
              url: string;
            }>;
            gitCredentialId: string;
            updatedAt?: number | undefined;
            sourceless?: boolean | undefined;
            productionBranch: string;
          }
        | {
            name: string;
            slug: string;
            owner: string;
            type: "bitbucket";
            uuid: string;
            workspaceUuid: string;
            createdAt?: number | undefined;
            deployHooks: Array<{
              createdAt?: number | undefined;
              id: string;
              name: string;
              ref: string;
              url: string;
            }>;
            gitCredentialId: string;
            updatedAt?: number | undefined;
            sourceless?: boolean | undefined;
            productionBranch: string;
          }
        | {
            org: string;
            repo: string;
            type: "vercel";
            createdAt?: number | undefined;
            deployHooks: Array<{
              createdAt?: number | undefined;
              id: string;
              name: string;
              ref: string;
              url: string;
            }>;
            gitCredentialId: string;
            updatedAt?: number | undefined;
            sourceless?: boolean | undefined;
            productionBranch: string;
          }
        | {
            owner: string;
            repo: string;
            repoId: string;
            ownerId: string;
            type: "cursor-origin";
            createdAt?: number | undefined;
            deployHooks: Array<{
              createdAt?: number | undefined;
              id: string;
              name: string;
              ref: string;
              url: string;
            }>;
            gitCredentialId: string;
            updatedAt?: number | undefined;
            sourceless?: boolean | undefined;
            productionBranch: string;
          }
      )
    | undefined;
  blobs?: { isDefaultApp?: boolean | undefined } | undefined;
  microfrontends?:
    | (
        | {
            isDefaultApp: true;
            updatedAt: number;
            groupIds: Array<string>;
            enabled: true;
            defaultRoute?: string | undefined;
            freeProjectForLegacyLimits?: boolean | undefined;
          }
        | {
            isDefaultApp?: false | undefined;
            routeObservabilityToThisProject?: boolean | undefined;
            doNotRouteWithMicrofrontendsRouting?: boolean | undefined;
            updatedAt: number;
            groupIds: Array<string>;
            enabled: true;
            defaultRoute?: string | undefined;
            freeProjectForLegacyLimits?: boolean | undefined;
          }
        | {
            updatedAt: number;
            groupIds: Array<unknown>;
            enabled: false;
            freeProjectForLegacyLimits?: boolean | undefined;
          }
      )
    | undefined;
  name: string;
  nodeVersion: "10.x" | "12.x" | "14.x" | "16.x" | "18.x" | "20.x" | "22.x" | "24.x" | "8.10.x";
  optionsAllowlist?: ({ paths: Array<{ value: string }> } | null) | undefined;
  outputDirectory?: (string | null) | undefined;
  passwordProtection?: (Record<string, never> | null) | undefined;
  passport?:
    | ({
        deploymentType:
          | "all"
          | "all_except_custom_domains"
          | "preview"
          | "prod_deployment_urls_and_all_previews";
        connectorId: string;
      } | null)
    | undefined;
  protectionConfig?:
    | { sandboxUrls?: { inheritDeploymentProtection?: boolean | undefined } | undefined }
    | undefined;
  sandbox?:
    | {
        region?:
          | (
              | "arn1"
              | "bom1"
              | "cdg1"
              | "cle1"
              | "cpt1"
              | "dub1"
              | "fra1"
              | "gru1"
              | "hkg1"
              | "hnd1"
              | "iad1"
              | "icn1"
              | "kix1"
              | "lhr1"
              | "pdx1"
              | "sfo1"
              | "sin1"
              | "syd1"
              | "yul1"
            )
          | undefined;
        failoverRegions?:
          | Array<
              | "arn1"
              | "bom1"
              | "cdg1"
              | "cle1"
              | "cpt1"
              | "dub1"
              | "fra1"
              | "gru1"
              | "hkg1"
              | "hnd1"
              | "iad1"
              | "icn1"
              | "kix1"
              | "lhr1"
              | "pdx1"
              | "sfo1"
              | "sin1"
              | "syd1"
              | "yul1"
            >
          | undefined;
      }
    | undefined;
  productionDeploymentsFastLane?: boolean | undefined;
  resourceConfig: {
    elasticConcurrencyEnabled?: boolean | undefined;
    fluid?: boolean | undefined;
    functionDefaultRegions: Array<string>;
    functionDefaultTimeout?: number | undefined;
    functionDefaultMemoryType?:
      | ("performance" | "performance_xl" | "standard" | "standard_legacy")
      | undefined;
    functionZeroConfigFailover?: boolean | undefined;
    buildMachineType?: ("basic" | "enhanced" | "standard" | "turbo") | undefined;
    buildMachineSelection?: ("elastic" | "fixed") | undefined;
    buildMachineElasticLastUpdated?: number | undefined;
    buildMachineElasticReason?:
      | (
          | "basic-floor"
          | "build-timeout-failure"
          | "enospc-failure"
          | "enterprise-floor"
          | "high-peak-disk"
          | "high-peak-memory"
          | "long-build-duration"
          | "oom-failure"
          | "short-build-duration"
          | "sustained-high-cpu"
        )
      | undefined;
    isNSNBDisabled?: boolean | undefined;
    buildQueue?:
      | { configuration?: ("SKIP_NAMESPACE_QUEUE" | "WAIT_FOR_NAMESPACE_QUEUE") | undefined }
      | undefined;
    enableFunctionsBeta?: boolean | undefined;
  };
  rollbackDescription?:
    | { userId: string; username: string; description: string; createdAt: number }
    | undefined;
  rollingRelease?:
    | ({
        target: string;
        stages?:
          | (Array<{
              targetPercentage: number;
              requireApproval?: boolean | undefined;
              duration?: number | undefined;
              linearShift?: boolean | undefined;
            }> | null)
          | undefined;
        canaryResponseHeader?: boolean | undefined;
        gate?:
          | {
              enabled: boolean;
              checks: Array<{
                type: "error-rate-5xx";
                minSampleSize?: number | undefined;
                excludeStatusCodes?: Array<number> | undefined;
                excludePaths?: Array<string> | undefined;
                ingestWatermarkSeconds?: number | undefined;
              }>;
              failureThreshold?: number | undefined;
              windowSize?: number | undefined;
              action: "pause" | "rollback";
              dryRun: boolean;
            }
          | undefined;
      } | null)
    | undefined;
  defaultResourceConfig: {
    elasticConcurrencyEnabled?: boolean | undefined;
    fluid?: boolean | undefined;
    functionDefaultRegions: Array<string>;
    functionDefaultTimeout?: number | undefined;
    functionDefaultMemoryType?:
      | ("performance" | "performance_xl" | "standard" | "standard_legacy")
      | undefined;
    functionZeroConfigFailover?: boolean | undefined;
    buildMachineType?: ("basic" | "enhanced" | "standard" | "turbo") | undefined;
    buildMachineSelection?: ("elastic" | "fixed") | undefined;
    buildMachineElasticLastUpdated?: number | undefined;
    buildMachineElasticReason?:
      | (
          | "basic-floor"
          | "build-timeout-failure"
          | "enospc-failure"
          | "enterprise-floor"
          | "high-peak-disk"
          | "high-peak-memory"
          | "long-build-duration"
          | "oom-failure"
          | "short-build-duration"
          | "sustained-high-cpu"
        )
      | undefined;
    isNSNBDisabled?: boolean | undefined;
    buildQueue?:
      | { configuration?: ("SKIP_NAMESPACE_QUEUE" | "WAIT_FOR_NAMESPACE_QUEUE") | undefined }
      | undefined;
    enableFunctionsBeta?: boolean | undefined;
  };
  rootDirectory?: (string | null) | undefined;
  serverlessFunctionZeroConfigFailover?: boolean | undefined;
  skewProtectionBoundaryAt?: number | undefined;
  skewProtectionMaxAge?: number | undefined;
  skewProtectionAllowedDomains?: Array<string> | undefined;
  skipGitConnectDuringLink?: boolean | undefined;
  staticIps?: { builds: boolean; enabled: boolean; regions: Array<string> } | undefined;
  sourceFilesOutsideRootDirectory?: boolean | undefined;
  enableAffectedProjectsDeployments?: boolean | undefined;
  enableExternalRewriteCaching?: boolean | undefined;
  ssoProtection?:
    | ({
        deploymentType:
          | "all"
          | "all_except_custom_domains"
          | "preview"
          | "prod_deployment_urls_and_all_previews";
        cve55182MigrationAppliedFrom?:
          | (
              | "all"
              | "all_except_custom_domains"
              | "preview"
              | "prod_deployment_urls_and_all_previews"
              | "null"
              | null
            )
          | undefined;
        april2026SecurityIncidentMigrationAppliedFrom?:
          | (
              | "all"
              | "all_except_custom_domains"
              | "preview"
              | "prod_deployment_urls_and_all_previews"
              | "null"
              | null
            )
          | undefined;
      } | null)
    | undefined;
  targets?:
    | Record<
        string,
        {
          id: string;
          alias?: Array<string> | undefined;
          aliasAssigned?: (number | boolean | null) | undefined;
          aliasError?: ({ code: string; message: string } | null) | undefined;
          aliasFinal?: (string | null) | undefined;
          automaticAliases?: Array<string> | undefined;
          branchMatcher?:
            | { type: "endsWith" | "equals" | "startsWith"; pattern: string }
            | undefined;
          buildingAt?: number | undefined;
          builds?:
            | Array<{ use: string; src?: string | undefined; dest?: string | undefined }>
            | undefined;
          checksConclusion?: ("canceled" | "failed" | "skipped" | "succeeded") | undefined;
          checksState?: ("completed" | "registered" | "running") | undefined;
          connectBuildsEnabled?: boolean | undefined;
          connectConfigurationId?: string | undefined;
          createdAt: number;
          createdIn: string;
          creator: {
            email: string;
            githubLogin?: string | undefined;
            gitlabLogin?: string | undefined;
            uid: string;
            username: string;
          } | null;
          deletedAt?: number | undefined;
          deploymentHostname: string;
          forced?: boolean | undefined;
          name: string;
          meta?: Record<string, string> | undefined;
          monorepoManager?: (string | null) | undefined;
          oidcTokenClaims?:
            | {
                iss: string;
                sub: string;
                scope: string;
                aud: string;
                owner: string;
                owner_id: string;
                project: string;
                project_id: string;
                environment: string;
                custom_environment_id?: string | undefined;
                mfe_group_ids?: Array<string> | undefined;
                plan?: string | undefined;
              }
            | undefined;
          plan: "enterprise" | "hobby" | "pro";
          previewCommentsEnabled?: boolean | undefined;
          private: boolean;
          readyAt?: number | undefined;
          readyState:
            | "BLOCKED"
            | "BUILDING"
            | "CANCELED"
            | "ERROR"
            | "INITIALIZING"
            | "QUEUED"
            | "READY";
          readySubstate?: ("PROMOTED" | "ROLLING" | "STAGED") | undefined;
          requestedAt?: number | undefined;
          target?: (string | null) | undefined;
          teamId?: (string | null) | undefined;
          type: "LAMBDAS";
          url: string;
          userId?: string | undefined;
          withCache?: boolean | undefined;
        } | null
      >
    | undefined;
  transferCompletedAt?: number | undefined;
  transferStartedAt?: number | undefined;
  transferToAccountId?: string | undefined;
  transferredFromAccountId?: string | undefined;
  updatedAt?: number | undefined;
  live?: boolean | undefined;
  enablePreviewFeedback?: (boolean | null) | undefined;
  enableProductionFeedback?: (boolean | null) | undefined;
  permissions?:
    | {
        oauth2Connection?: Array<ACLAction> | undefined;
        user?: Array<ACLAction> | undefined;
        userConnection?: Array<ACLAction> | undefined;
        userMfaConfiguration?: Array<ACLAction> | undefined;
        userPreference?: Array<ACLAction> | undefined;
        userSudo?: Array<ACLAction> | undefined;
        webAuthn?: Array<ACLAction> | undefined;
        accessGroup?: Array<ACLAction> | undefined;
        agent?: Array<ACLAction> | undefined;
        aiGatewayApiKey?: Array<ACLAction> | undefined;
        aiGatewayApiKeyBypassAll?: Array<ACLAction> | undefined;
        aiGatewayApiKeyOwnedBySelf?: Array<ACLAction> | undefined;
        aiGatewayApiKeySpendAttribution?: Array<ACLAction> | undefined;
        aiGatewayApiKeyZdrExemption?: Array<ACLAction> | undefined;
        aiGatewayBudget?: Array<ACLAction> | undefined;
        aiGatewayCredits?: Array<ACLAction> | undefined;
        aiGatewayPrivateModels?: Array<ACLAction> | undefined;
        aiGatewayGuardrails?: Array<ACLAction> | undefined;
        aiGatewayRules?: Array<ACLAction> | undefined;
        aiGatewaySettings?: Array<ACLAction> | undefined;
        aiGatewayUsage?: Array<ACLAction> | undefined;
        aiGatewayVirtualModelConfigs?: Array<ACLAction> | undefined;
        alerts?: Array<ACLAction> | undefined;
        alertRules?: Array<ACLAction> | undefined;
        aliasGlobal?: Array<ACLAction> | undefined;
        analyticsSampling?: Array<ACLAction> | undefined;
        analyticsUsage?: Array<ACLAction> | undefined;
        apiKey?: Array<ACLAction> | undefined;
        apiKeyAiGateway?: Array<ACLAction> | undefined;
        apiKeyOwnedBySelf?: Array<ACLAction> | undefined;
        oauth2Application?: Array<ACLAction> | undefined;
        vercelAppInstallation?: Array<ACLAction> | undefined;
        vercelAppInstallationRequest?: Array<ACLAction> | undefined;
        auditLog?: Array<ACLAction> | undefined;
        billingAddress?: Array<ACLAction> | undefined;
        billingInformation?: Array<ACLAction> | undefined;
        billingInvoice?: Array<ACLAction> | undefined;
        billingInvoiceEmailRecipient?: Array<ACLAction> | undefined;
        billingInvoiceLanguage?: Array<ACLAction> | undefined;
        billingPlan?: Array<ACLAction> | undefined;
        billingPurchaseOrder?: Array<ACLAction> | undefined;
        billingRefund?: Array<ACLAction> | undefined;
        billingTaxId?: Array<ACLAction> | undefined;
        blob?: Array<ACLAction> | undefined;
        blobStoreTokenSet?: Array<ACLAction> | undefined;
        budget?: Array<ACLAction> | undefined;
        cacheArtifact?: Array<ACLAction> | undefined;
        cacheArtifactUsageEvent?: Array<ACLAction> | undefined;
        codeChecks?: Array<ACLAction> | undefined;
        codeOwners?: Array<ACLAction> | undefined;
        ciInvocations?: Array<ACLAction> | undefined;
        ciLogs?: Array<ACLAction> | undefined;
        concurrentBuilds?: Array<ACLAction> | undefined;
        connect?: Array<ACLAction> | undefined;
        connectConfiguration?: Array<ACLAction> | undefined;
        connectLogs?: Array<ACLAction> | undefined;
        connexClient?: Array<ACLAction> | undefined;
        connexClientProject?: Array<ACLAction> | undefined;
        connexContact?: Array<ACLAction> | undefined;
        connexInstallation?: Array<ACLAction> | undefined;
        connexToken?: Array<ACLAction> | undefined;
        buildMachineDefault?: Array<ACLAction> | undefined;
        cursorOriginInstallation?: Array<ACLAction> | undefined;
        dataCacheBillingSettings?: Array<ACLAction> | undefined;
        defaultDeploymentProtection?: Array<ACLAction> | undefined;
        deploymentPolicy?: Array<ACLAction> | undefined;
        domain?: Array<ACLAction> | undefined;
        domainAcceptDelegation?: Array<ACLAction> | undefined;
        domainAuthCodes?: Array<ACLAction> | undefined;
        domainCertificate?: Array<ACLAction> | undefined;
        domainCheckConfig?: Array<ACLAction> | undefined;
        domainMove?: Array<ACLAction> | undefined;
        domainPurchase?: Array<ACLAction> | undefined;
        domainRecord?: Array<ACLAction> | undefined;
        domainTransferIn?: Array<ACLAction> | undefined;
        drain?: Array<ACLAction> | undefined;
        edgeConfig?: Array<ACLAction> | undefined;
        edgeConfigItem?: Array<ACLAction> | undefined;
        edgeConfigSchema?: Array<ACLAction> | undefined;
        edgeConfigToken?: Array<ACLAction> | undefined;
        endpointVerification?: Array<ACLAction> | undefined;
        event?: Array<ACLAction> | undefined;
        fileUpload?: Array<ACLAction> | undefined;
        flagsExplorerSubscription?: Array<ACLAction> | undefined;
        gitRepository?: Array<ACLAction> | undefined;
        imageOptimizationNewPrice?: Array<ACLAction> | undefined;
        integration?: Array<ACLAction> | undefined;
        integrationAccount?: Array<ACLAction> | undefined;
        integrationConfiguration?: Array<ACLAction> | undefined;
        integrationConfigurationProjects?: Array<ACLAction> | undefined;
        integrationConfigurationRole?: Array<ACLAction> | undefined;
        integrationConfigurationTransfer?: Array<ACLAction> | undefined;
        integrationDeploymentAction?: Array<ACLAction> | undefined;
        integrationEvent?: Array<ACLAction> | undefined;
        integrationLog?: Array<ACLAction> | undefined;
        integrationResource?: Array<ACLAction> | undefined;
        integrationResourceData?: Array<ACLAction> | undefined;
        integrationResourceReplCommand?: Array<ACLAction> | undefined;
        integrationResourceSecrets?: Array<ACLAction> | undefined;
        integrationSSOSession?: Array<ACLAction> | undefined;
        integrationStrict?: Array<ACLAction> | undefined;
        integrationStoreTokenSet?: Array<ACLAction> | undefined;
        integrationVercelConfigurationOverride?: Array<ACLAction> | undefined;
        integrationPullRequest?: Array<ACLAction> | undefined;
        ipBlocking?: Array<ACLAction> | undefined;
        jobGlobal?: Array<ACLAction> | undefined;
        kmsIssuer?: Array<ACLAction> | undefined;
        kmsProjectGrant?: Array<ACLAction> | undefined;
        logDrain?: Array<ACLAction> | undefined;
        marketplaceBillingData?: Array<ACLAction> | undefined;
        marketplaceExperimentationEdgeConfigData?: Array<ACLAction> | undefined;
        marketplaceExperimentationItem?: Array<ACLAction> | undefined;
        marketplaceFlexCommit?: Array<ACLAction> | undefined;
        marketplaceInstallationMember?: Array<ACLAction> | undefined;
        marketplaceInvoice?: Array<ACLAction> | undefined;
        marketplaceSettings?: Array<ACLAction> | undefined;
        Monitoring?: Array<ACLAction> | undefined;
        monitoringAlert?: Array<ACLAction> | undefined;
        monitoringChart?: Array<ACLAction> | undefined;
        monitoringQuery?: Array<ACLAction> | undefined;
        monitoringSettings?: Array<ACLAction> | undefined;
        notificationCustomerBudget?: Array<ACLAction> | undefined;
        notificationDeploymentFailed?: Array<ACLAction> | undefined;
        notificationDomainConfiguration?: Array<ACLAction> | undefined;
        notificationDomainExpire?: Array<ACLAction> | undefined;
        notificationDomainMoved?: Array<ACLAction> | undefined;
        notificationDomainPurchase?: Array<ACLAction> | undefined;
        notificationDomainRenewal?: Array<ACLAction> | undefined;
        notificationDomainTransfer?: Array<ACLAction> | undefined;
        notificationDomainUnverified?: Array<ACLAction> | undefined;
        NotificationMonitoringAlert?: Array<ACLAction> | undefined;
        notificationPaymentFailed?: Array<ACLAction> | undefined;
        notificationPreferences?: Array<ACLAction> | undefined;
        notificationStatementOfReasons?: Array<ACLAction> | undefined;
        notificationUsageAlert?: Array<ACLAction> | undefined;
        oidcFederationPolicy?: Array<ACLAction> | undefined;
        observabilityConfiguration?: Array<ACLAction> | undefined;
        observabilityFunnel?: Array<ACLAction> | undefined;
        observabilityNotebook?: Array<ACLAction> | undefined;
        openTelemetryEndpoint?: Array<ACLAction> | undefined;
        ownEvent?: Array<ACLAction> | undefined;
        organization?: Array<ACLAction> | undefined;
        organizationDomain?: Array<ACLAction> | undefined;
        organizationTeam?: Array<ACLAction> | undefined;
        passwordProtectionInvoiceItem?: Array<ACLAction> | undefined;
        paymentMethod?: Array<ACLAction> | undefined;
        permissions?: Array<ACLAction> | undefined;
        postgres?: Array<ACLAction> | undefined;
        postgresStoreTokenSet?: Array<ACLAction> | undefined;
        previewDeploymentSuffix?: Array<ACLAction> | undefined;
        privateCloudAccount?: Array<ACLAction> | undefined;
        projectTransferIn?: Array<ACLAction> | undefined;
        proTrialOnboarding?: Array<ACLAction> | undefined;
        rateLimit?: Array<ACLAction> | undefined;
        redis?: Array<ACLAction> | undefined;
        redisStoreTokenSet?: Array<ACLAction> | undefined;
        remoteCaching?: Array<ACLAction> | undefined;
        repository?: Array<ACLAction> | undefined;
        samlConfig?: Array<ACLAction> | undefined;
        secret?: Array<ACLAction> | undefined;
        securityConfig?: Array<ACLAction> | undefined;
        sensitiveEnvironmentVariablePolicy?: Array<ACLAction> | undefined;
        sharedEnvVars?: Array<ACLAction> | undefined;
        sharedEnvVarsProduction?: Array<ACLAction> | undefined;
        space?: Array<ACLAction> | undefined;
        spaceRun?: Array<ACLAction> | undefined;
        storeIsLocked?: Array<ACLAction> | undefined;
        storeTokenSetSensitive?: Array<ACLAction> | undefined;
        storeTransfer?: Array<ACLAction> | undefined;
        supportCase?: Array<ACLAction> | undefined;
        supportCaseComment?: Array<ACLAction> | undefined;
        team?: Array<ACLAction> | undefined;
        teamAccessRequest?: Array<ACLAction> | undefined;
        teamFellowMembership?: Array<ACLAction> | undefined;
        teamGitExclusivity?: Array<ACLAction> | undefined;
        teamInvite?: Array<ACLAction> | undefined;
        teamInviteCode?: Array<ACLAction> | undefined;
        teamInviteLink?: Array<ACLAction> | undefined;
        teamJoin?: Array<ACLAction> | undefined;
        teamMemberMfaStatus?: Array<ACLAction> | undefined;
        teamMicrofrontends?: Array<ACLAction> | undefined;
        teamOwnMembership?: Array<ACLAction> | undefined;
        teamOwnMembershipDisconnectSAML?: Array<ACLAction> | undefined;
        teamSudo?: Array<ACLAction> | undefined;
        teamTokenInvalidation?: Array<ACLAction> | undefined;
        token?: Array<ACLAction> | undefined;
        toolbarComment?: Array<ACLAction> | undefined;
        usage?: Array<ACLAction> | undefined;
        usageCycle?: Array<ACLAction> | undefined;
        vcrRepository?: Array<ACLAction> | undefined;
        vpcPeeringConnection?: Array<ACLAction> | undefined;
        webAnalyticsPlan?: Array<ACLAction> | undefined;
        webhook?: Array<ACLAction> | undefined;
        "webhook-event"?: Array<ACLAction> | undefined;
        aliasProject?: Array<ACLAction> | undefined;
        aliasProtectionBypass?: Array<ACLAction> | undefined;
        bulkRedirects?: Array<ACLAction> | undefined;
        buildMachine?: Array<ACLAction> | undefined;
        connectConfigurationLink?: Array<ACLAction> | undefined;
        dataCacheNamespace?: Array<ACLAction> | undefined;
        deployment?: Array<ACLAction> | undefined;
        deploymentBuildLogs?: Array<ACLAction> | undefined;
        deploymentCheck?: Array<ACLAction> | undefined;
        deploymentCheckPreview?: Array<ACLAction> | undefined;
        deploymentCheckReRunFromProductionBranch?: Array<ACLAction> | undefined;
        deploymentProductionGit?: Array<ACLAction> | undefined;
        deploymentV0?: Array<ACLAction> | undefined;
        deploymentPreview?: Array<ACLAction> | undefined;
        deploymentPrivate?: Array<ACLAction> | undefined;
        deploymentPromote?: Array<ACLAction> | undefined;
        deploymentRollback?: Array<ACLAction> | undefined;
        edgeCacheNamespace?: Array<ACLAction> | undefined;
        environments?: Array<ACLAction> | undefined;
        job?: Array<ACLAction> | undefined;
        logs?: Array<ACLAction> | undefined;
        logsPreset?: Array<ACLAction> | undefined;
        observabilityData?: Array<ACLAction> | undefined;
        onDemandBuild?: Array<ACLAction> | undefined;
        onDemandConcurrency?: Array<ACLAction> | undefined;
        optionsAllowlist?: Array<ACLAction> | undefined;
        passwordProtection?: Array<ACLAction> | undefined;
        privateLinkEndpoint?: Array<ACLAction> | undefined;
        productionAliasProtectionBypass?: Array<ACLAction> | undefined;
        productionShareableLink?: Array<ACLAction> | undefined;
        project?: Array<ACLAction> | undefined;
        projectAccessGroup?: Array<ACLAction> | undefined;
        projectAnalyticsSampling?: Array<ACLAction> | undefined;
        projectAnalyticsUsage?: Array<ACLAction> | undefined;
        projectCheck?: Array<ACLAction> | undefined;
        projectCheckRun?: Array<ACLAction> | undefined;
        projectDeploymentExpiration?: Array<ACLAction> | undefined;
        projectDeploymentHook?: Array<ACLAction> | undefined;
        projectDeploymentProtectionStrict?: Array<ACLAction> | undefined;
        projectDomain?: Array<ACLAction> | undefined;
        projectDomainCheckConfig?: Array<ACLAction> | undefined;
        projectDomainMove?: Array<ACLAction> | undefined;
        projectDomainVerify?: Array<ACLAction> | undefined;
        projectEvent?: Array<ACLAction> | undefined;
        projectEnvVars?: Array<ACLAction> | undefined;
        projectEnvVarsProduction?: Array<ACLAction> | undefined;
        projectEnvVarsUnownedByIntegration?: Array<ACLAction> | undefined;
        projectFlags?: Array<ACLAction> | undefined;
        projectFlagsProduction?: Array<ACLAction> | undefined;
        projectFlagsSdkKey?: Array<ACLAction> | undefined;
        projectFromV0?: Array<ACLAction> | undefined;
        projectId?: Array<ACLAction> | undefined;
        projectIntegrationConfiguration?: Array<ACLAction> | undefined;
        projectLink?: Array<ACLAction> | undefined;
        projectMember?: Array<ACLAction> | undefined;
        projectMonitoring?: Array<ACLAction> | undefined;
        projectOIDCToken?: Array<ACLAction> | undefined;
        projectPermissions?: Array<ACLAction> | undefined;
        projectProductionBranch?: Array<ACLAction> | undefined;
        projectProtectionBypass?: Array<ACLAction> | undefined;
        projectRollingRelease?: Array<ACLAction> | undefined;
        projectRoutes?: Array<ACLAction> | undefined;
        projectSupportCase?: Array<ACLAction> | undefined;
        projectSupportCaseComment?: Array<ACLAction> | undefined;
        projectTier?: Array<ACLAction> | undefined;
        projectTransfer?: Array<ACLAction> | undefined;
        projectTransferOut?: Array<ACLAction> | undefined;
        projectUsage?: Array<ACLAction> | undefined;
        pageIntegrity?: Array<ACLAction> | undefined;
        seawallConfig?: Array<ACLAction> | undefined;
        securityPlusConfiguration?: Array<ACLAction> | undefined;
        shareableLink?: Array<ACLAction> | undefined;
        shareableLinkStrict?: Array<ACLAction> | undefined;
        sharedEnvVarConnection?: Array<ACLAction> | undefined;
        skewProtection?: Array<ACLAction> | undefined;
        analytics?: Array<ACLAction> | undefined;
        trustedIps?: Array<ACLAction> | undefined;
        trustedSources?: Array<ACLAction> | undefined;
        v0Chat?: Array<ACLAction> | undefined;
        vercelAuth?: Array<ACLAction> | undefined;
        vercelRun?: Array<ACLAction> | undefined;
        webAnalytics?: Array<ACLAction> | undefined;
        workflowRunData?: Array<ACLAction> | undefined;
      }
    | undefined;
  lastRollbackTarget?: (Record<string, never> | null) | undefined;
  lastAliasRequest?:
    | ({
        fromDeploymentId: string | null;
        toDeploymentId: string;
        fromRollingReleaseId?: string | undefined;
        jobStatus: "failed" | "in-progress" | "pending" | "skipped" | "succeeded";
        requestedAt: number;
        type: "promote" | "rollback";
      } | null)
    | undefined;
  protectionBypass?:
    | Record<
        string,
        | {
            createdAt: number;
            createdBy: string;
            scope: "integration-automation-bypass";
            integrationId: string;
            configurationId: string;
          }
        | {
            createdAt: number;
            createdBy: string;
            scope: "automation-bypass";
            isEnvVar?: boolean | undefined;
            note?: string | undefined;
          }
      >
    | undefined;
  hasActiveBranches?: boolean | undefined;
  trustedIps?:
    | (
        | {
            deploymentType:
              | "all"
              | "all_except_custom_domains"
              | "preview"
              | "prod_deployment_urls_and_all_previews"
              | "production";
            addresses: Array<{ value: string; note?: string | undefined }>;
            protectionMode: "additional" | "exclusive";
          }
        | {
            deploymentType:
              | "all"
              | "all_except_custom_domains"
              | "preview"
              | "prod_deployment_urls_and_all_previews"
              | "production";
          }
        | null
      )
    | undefined;
  trustedSources?:
    | ({
        projects?:
          | Record<
              string,
              {
                label?: string | undefined;
                customAllow?:
                  | Array<{
                      from:
                        | { slugs: Array<string>; preset?: "all-custom" | undefined }
                        | { slugs?: Array<string> | undefined; preset: "all-custom" };
                      to:
                        | { slugs: Array<string>; preset?: "all-custom" | undefined }
                        | { slugs?: Array<string> | undefined; preset: "all-custom" };
                    }>
                  | undefined;
              }
            >
          | undefined;
        oidcProviders?:
          | Record<
              string,
              Array<{
                to:
                  | { slugs: Array<string>; preset?: "all-custom" | undefined }
                  | { slugs?: Array<string> | undefined; preset: "all-custom" };
                label?: string | undefined;
                claims: Record<string, Array<string>>;
              }>
            >
          | undefined;
      } | null)
    | undefined;
  gitComments?: { onPullRequest: boolean; onCommit: boolean } | undefined;
  gitProviderOptions?:
    | {
        createDeployments: "disabled" | "enabled";
        disableRepositoryDispatchEvents?: boolean | undefined;
        requireVerifiedCommits?: boolean | undefined;
        gitCommitStatus?: boolean | undefined;
        consolidatedGitCommitStatus?: { enabled: boolean; propagateFailures: boolean } | undefined;
      }
    | undefined;
  paused?: boolean | undefined;
  concurrencyBucketName?: string | undefined;
  webAnalytics?:
    | {
        id: string;
        disabledAt?: number | undefined;
        canceledAt?: number | undefined;
        enabledAt?: number | undefined;
        hasData?: true | undefined;
      }
    | undefined;
  security?:
    | {
        attackModeEnabled?: boolean | undefined;
        attackModeUpdatedAt?: number | undefined;
        firewallEnabled?: boolean | undefined;
        firewallUpdatedAt?: number | undefined;
        attackModeActiveUntil?: (number | null) | undefined;
        firewallConfigVersion?: number | undefined;
        rulesets?:
          | Record<
              string,
              {
                action:
                  | "allow"
                  | "bypass"
                  | "challenge"
                  | "deny"
                  | "log"
                  | "rate_limit"
                  | "redirect";
                rateLimit?:
                  | ({
                      algo: "fixed_window" | "token_bucket";
                      window: number;
                      limit: number;
                      keys: Array<string>;
                    } | null)
                  | undefined;
                redirect?: ({ location: string; permanent: boolean } | null) | undefined;
                actionDuration?: (string | null) | undefined;
                bypassSystem?: (boolean | null) | undefined;
                logHeaders?: (Array<string> | "*") | undefined;
              }
            >
          | undefined;
        firewallSeawallEnabled?: boolean | undefined;
        ja3Enabled?: boolean | undefined;
        ja4Enabled?: boolean | undefined;
        firewallBypassIps?: Array<string> | undefined;
        managedRules?:
          | ({
              vercel_ruleset: {
                active: boolean;
                action?: ("challenge" | "deny" | "log") | undefined;
              };
              traffic_sources: {
                active: boolean;
                action?: ("challenge" | "deny" | "log") | undefined;
              };
              bot_filter: { active: boolean; action?: ("challenge" | "deny" | "log") | undefined };
              ai_bots: { active: boolean; action?: ("challenge" | "deny" | "log") | undefined };
              owasp: { active: boolean; action?: ("challenge" | "deny" | "log") | undefined };
            } | null)
          | undefined;
        botIdEnabled?: boolean | undefined;
        log_headers?: (Array<string> | "*") | undefined;
        securityPlus?: boolean | undefined;
        securityPlusMetadata?:
          | { updatedAt: number; firstEnabledAt?: number | undefined }
          | undefined;
        pageIntegrityEnabled?: boolean | undefined;
      }
    | undefined;
  oidcTokenConfig?:
    | { enabled?: boolean | undefined; issuerMode?: ("global" | "team") | undefined }
    | undefined;
  deploymentPolicy?:
    | ({
        gitSources?:
          | (Array<{
              sources: Array<
                | { provider: "bitbucket" | "github"; org: string; repo?: string | undefined }
                | { provider: "gitlab"; namespace: string; project?: string | undefined }
              >;
              enabled: boolean;
              environments: Array<
                | { type: "system"; target: "preview" | "production" }
                | { type: "custom"; environmentId: string }
              >;
            }> | null)
          | undefined;
        deploymentSources?:
          | (Array<{
              sources: Array<"cli" | "deploy-hook" | "git" | "integration" | "rest-api" | "v0">;
              enabled: boolean;
              environments: Array<
                | { type: "system"; target: "preview" | "production" }
                | { type: "custom"; environmentId: string }
              >;
            }> | null)
          | undefined;
      } | null)
    | undefined;
  tier?: ("advanced" | "critical") | undefined;
  usageStatus?:
    | {
        kind: "flat";
        exceededAllowanceUntil?: number | undefined;
        bypassThrottleUntil?: number | undefined;
        throttled?: boolean | undefined;
        teamThrottled?: boolean | undefined;
      }
    | undefined;
  features?: { webAnalytics?: boolean | undefined } | undefined;
  v0?: boolean | undefined;
  v0Created?: boolean | undefined;
  abuse?:
    | {
        scanner?: string | undefined;
        history: Array<{ scanner: string; reason: string; by: string; byId: string; at: number }>;
        updatedAt: number;
        block?:
          | {
              action: "blocked";
              reason: string;
              statusCode: number;
              createdAt: number;
              caseId?: string | undefined;
              actor?: string | undefined;
              comment?: string | undefined;
              ineligibleForAppeal?: boolean | undefined;
              isCascading?: boolean | undefined;
            }
          | undefined;
        blockHistory?:
          | Array<
              | {
                  action: "blocked";
                  reason: string;
                  statusCode: number;
                  createdAt: number;
                  caseId?: string | undefined;
                  actor?: string | undefined;
                  comment?: string | undefined;
                  ineligibleForAppeal?: boolean | undefined;
                  isCascading?: boolean | undefined;
                }
              | {
                  action: "unblocked";
                  createdAt: number;
                  caseId?: string | undefined;
                  actor?: string | undefined;
                  comment?: string | undefined;
                  ineligibleForAppeal?: boolean | undefined;
                  isCascading?: boolean | undefined;
                }
              | {
                  action: "route-blocked";
                  route:
                    | { src: string; status: number; expiry?: number | undefined }
                    | {
                        has: Array<
                          | { type: "header"; key: "x-vercel-ip-country"; value: { eq: string } }
                          | { type: "host"; value: { eq: string } }
                        >;
                        mitigate: { action: "block_legal_cwc" };
                        src?: string | undefined;
                      };
                  reason: string;
                  createdAt: number;
                  caseId?: string | undefined;
                  actor?: string | undefined;
                  comment?: string | undefined;
                  ineligibleForAppeal?: boolean | undefined;
                  isCascading?: boolean | undefined;
                }
              | {
                  action: "route-unblocked";
                  route:
                    | { src: string; status: number; expiry?: number | undefined }
                    | {
                        has: Array<
                          | { type: "header"; key: "x-vercel-ip-country"; value: { eq: string } }
                          | { type: "host"; value: { eq: string } }
                        >;
                        mitigate: { action: "block_legal_cwc" };
                        src?: string | undefined;
                      };
                  statusCode?: number | undefined;
                  createdAt: number;
                  caseId?: string | undefined;
                  actor?: string | undefined;
                  comment?: string | undefined;
                  ineligibleForAppeal?: boolean | undefined;
                  isCascading?: boolean | undefined;
                }
            >
          | undefined;
        interstitial?: boolean | undefined;
        interstitialHistory?:
          | Array<{
              action:
                | "add-deployment-interstitial"
                | "add-project-interstitial"
                | "remove-deployment-interstitial"
                | "remove-project-interstitial";
              createdAt: number;
              caseId?: string | undefined;
              reason?: string | undefined;
              actor?: string | undefined;
              comment?: string | undefined;
            }>
          | undefined;
      }
    | undefined;
  internalRoutes?:
    | Array<
        | { src: string; status: number; expiry?: number | undefined }
        | {
            has: Array<
              | { type: "header"; key: "x-vercel-ip-country"; value: { eq: string } }
              | { type: "host"; value: { eq: string } }
            >;
            mitigate: { action: "block_legal_cwc" };
            src?: string | undefined;
          }
      >
    | undefined;
  hasDeployments?: boolean | undefined;
  dismissedToasts?:
    | Array<{
        key: string;
        dismissedAt: number;
        action: "accept" | "cancel" | "delete";
        value:
          | string
          | number
          | { previousValue: string | number | boolean; currentValue: string | number | boolean }
          | boolean
          | null;
      }>
    | undefined;
  protectedSourcemaps?: boolean | undefined;
  tracing?:
    | {
        domains?: string | undefined;
        ignorePaths?: Array<string> | undefined;
        samplingRules?:
          | Array<{
              rate: number;
              env?: ("preview" | "production") | undefined;
              requestPath?: string | undefined;
              destination?: ("external" | "internal") | undefined;
            }>
          | undefined;
      }
    | undefined;
  avatar?: (string | null) | undefined;
};

export type GetV9ProjectsIdOrNameInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV9ProjectsIdOrNameHandler = (
  input: GetV9ProjectsIdOrNameInput,
) => Promise<GetV9ProjectsIdOrNameResponse>;

export const patchV9ProjectsIdOrNameBody = z.object({
  autoExposeSystemEnvs: z.boolean().optional(),
  autoAssignCustomDomains: z.boolean().optional(),
  autoAssignCustomDomainsUpdatedBy: z.string().optional(),
  buildCommand: z.string().max(256).nullable().optional(),
  commandForIgnoringBuildStep: z.string().max(256).nullable().optional(),
  customerSupportCodeVisibility: z.boolean().optional(),
  devCommand: z.string().max(256).nullable().optional(),
  directoryListing: z.boolean().optional(),
  framework: z
    .enum([
      "null",
      "container",
      "blitzjs",
      "nextjs",
      "gatsby",
      "remix",
      "react-router",
      "astro",
      "hexo",
      "eleventy",
      "docusaurus-2",
      "docusaurus",
      "preact",
      "solidstart-1",
      "solidstart",
      "dojo",
      "ember",
      "vue",
      "scully",
      "ionic-angular",
      "angular",
      "polymer",
      "svelte",
      "sveltekit",
      "sveltekit-1",
      "ionic-react",
      "create-react-app",
      "gridsome",
      "umijs",
      "sapper",
      "saber",
      "stencil",
      "nuxtjs",
      "redwoodjs",
      "hugo",
      "jekyll",
      "brunch",
      "middleman",
      "zola",
      "hydrogen",
      "vite",
      "tanstack-start",
      "tanstack-start-lovable",
      "vitepress",
      "vuepress",
      "parcel",
      "fastapi",
      "flask",
      "fasthtml",
      "django",
      "ash",
      "eve",
      "sanity",
      "sanity-v2",
      "storybook",
      "nitro",
      "hono",
      "express",
      "h3",
      "koa",
      "nestjs",
      "elysia",
      "fastify",
      "xmcp",
      "python",
      "ruby",
      "rust",
      "axum",
      "actix-web",
      "bun",
      "node",
      "go",
      "services",
      "mastra",
    ])
    .nullable()
    .optional(),
  gitForkProtection: z.boolean().optional(),
  gitLFS: z.boolean().optional(),
  protectedSourcemaps: z.boolean().optional(),
  installCommand: z.string().max(256).nullable().optional(),
  name: z.string().max(100).optional(),
  nodeVersion: z.enum(["24.x", "22.x", "20.x", "18.x", "16.x", "14.x", "12.x", "10.x"]).optional(),
  outputDirectory: z.string().max(256).nullable().optional(),
  previewDeploymentsDisabled: z.boolean().nullable().optional(),
  previewDeploymentSuffix: z.string().max(253).nullable().optional(),
  resourceConfig: z
    .object({
      buildMachineType: z.unknown(),
      buildMachineSelection: z.enum(["elastic", "fixed"]).optional(),
      buildQueue: z
        .object({
          configuration: z.enum(["SKIP_NAMESPACE_QUEUE", "WAIT_FOR_NAMESPACE_QUEUE"]).optional(),
        })
        .optional(),
      fluid: z.boolean().optional(),
      functionDefaultRegions: z.array(z.string().max(4)).optional(),
      functionDefaultTimeout: z.number().gte(1).lte(900).optional(),
      functionDefaultMemoryType: z
        .enum(["standard_legacy", "standard", "performance", "performance_xl"])
        .optional(),
      functionZeroConfigFailover: z.boolean().optional(),
      elasticConcurrencyEnabled: z.boolean().optional(),
      buildMachineElasticLastUpdated: z.number().optional(),
      buildMachineElasticReason: z
        .enum([
          "oom-failure",
          "enospc-failure",
          "build-timeout-failure",
          "basic-floor",
          "high-peak-memory",
          "sustained-high-cpu",
          "high-peak-disk",
          "long-build-duration",
          "short-build-duration",
          "enterprise-floor",
        ])
        .optional(),
      isNSNBDisabled: z.boolean().optional(),
      enableFunctionsBeta: z.boolean().optional(),
    })
    .optional(),
  publicSource: z.boolean().nullable().optional(),
  rootDirectory: z.string().max(256).nullable().optional(),
  serverlessFunctionRegion: z.string().max(4).nullable().optional(),
  serverlessFunctionZeroConfigFailover: z.boolean().optional(),
  skewProtectionBoundaryAt: z.number().int().gte(0).optional(),
  skewProtectionMaxAge: z.number().int().gte(0).optional(),
  skewProtectionAllowedDomains: z.array(z.string().max(254)).optional(),
  skipGitConnectDuringLink: z.boolean().optional(),
  sourceFilesOutsideRootDirectory: z.boolean().optional(),
  enablePreviewFeedback: z.boolean().nullable().optional(),
  enableProductionFeedback: z.boolean().nullable().optional(),
  enableAffectedProjectsDeployments: z.boolean().optional(),
  enableExternalRewriteCaching: z.boolean().optional(),
  staticIps: z.object({ enabled: z.boolean() }).optional(),
  tracing: z
    .object({
      domains: z.string().optional(),
      ignorePaths: z.array(z.string()).optional(),
      samplingRules: z
        .array(
          z.object({
            rate: z.number().gte(0).lte(1),
            env: z.enum(["production", "preview"]).optional(),
            requestPath: z.string().optional(),
            destination: z.enum(["internal", "external"]).optional(),
          }),
        )
        .optional(),
    })
    .nullable()
    .optional(),
  oidcTokenConfig: z
    .object({ enabled: z.boolean().optional(), issuerMode: z.enum(["team", "global"]).optional() })
    .optional(),
  passwordProtection: z
    .object({
      deploymentType: z.enum([
        "all",
        "preview",
        "prod_deployment_urls_and_all_previews",
        "all_except_custom_domains",
      ]),
      password: z.string().max(72).nullable().optional(),
    })
    .nullable()
    .optional(),
  passport: z
    .object({
      connectorId: z.string(),
      deploymentType: z
        .enum([
          "all",
          "preview",
          "prod_deployment_urls_and_all_previews",
          "all_except_custom_domains",
        ])
        .optional(),
    })
    .nullable()
    .optional(),
  sandbox: z
    .object({
      region: z
        .enum([
          "iad1",
          "sfo1",
          "cle1",
          "cdg1",
          "fra1",
          "arn1",
          "sin1",
          "pdx1",
          "lhr1",
          "icn1",
          "bom1",
          "cpt1",
          "dub1",
          "gru1",
          "hkg1",
          "syd1",
          "yul1",
          "hnd1",
          "kix1",
        ])
        .optional(),
      failoverRegions: z
        .array(
          z.enum([
            "iad1",
            "sfo1",
            "cle1",
            "cdg1",
            "fra1",
            "arn1",
            "sin1",
            "pdx1",
            "lhr1",
            "icn1",
            "bom1",
            "cpt1",
            "dub1",
            "gru1",
            "hkg1",
            "syd1",
            "yul1",
            "hnd1",
            "kix1",
          ]),
        )
        .optional(),
    })
    .optional(),
  ssoProtection: z
    .object({
      deploymentType: z.enum([
        "all",
        "preview",
        "prod_deployment_urls_and_all_previews",
        "all_except_custom_domains",
      ]),
    })
    .nullable()
    .optional(),
  trustedIps: z
    .object({
      deploymentType: z.enum([
        "all",
        "preview",
        "production",
        "prod_deployment_urls_and_all_previews",
        "all_except_custom_domains",
      ]),
      addresses: z.array(z.object({ value: z.string(), note: z.string().max(20).optional() })),
      protectionMode: z.enum(["exclusive", "additional"]),
    })
    .nullable()
    .optional(),
  trustedSources: z
    .object({
      projects: z
        .record(
          z.string(),
          z.object({
            label: z.string().max(100).optional(),
            customAllow: z
              .array(
                z.object({
                  to: z.union([
                    z.object({
                      slugs: z.array(z.string().max(64)),
                      preset: z.literal("all-custom").optional(),
                    }),
                    z.object({
                      slugs: z.array(z.string().max(64)).optional(),
                      preset: z.literal("all-custom"),
                    }),
                  ]),
                  from: z.union([
                    z.object({
                      slugs: z.array(z.string().max(64)),
                      preset: z.literal("all-custom").optional(),
                    }),
                    z.object({
                      slugs: z.array(z.string().max(64)).optional(),
                      preset: z.literal("all-custom"),
                    }),
                  ]),
                }),
              )
              .optional(),
          }),
        )
        .optional(),
      oidcProviders: z
        .record(
          z.string(),
          z.array(
            z.object({
              label: z.string().max(100).optional(),
              to: z.union([
                z.object({
                  slugs: z.array(z.string().max(64)),
                  preset: z.literal("all-custom").optional(),
                }),
                z.object({
                  slugs: z.array(z.string().max(64)).optional(),
                  preset: z.literal("all-custom"),
                }),
              ]),
              claims: z.record(z.string(), z.array(z.string().max(256))),
            }),
          ),
        )
        .optional(),
    })
    .nullable()
    .optional(),
  deploymentPolicy: z
    .union([
      z.object({
        gitSources: z
          .union([
            z.array(
              z.object({
                enabled: z.boolean(),
                environments: z.array(
                  z.union([
                    z.object({
                      type: z.literal("system"),
                      target: z.enum(["production", "preview"]),
                    }),
                    z.object({ type: z.literal("custom"), environmentId: z.string() }),
                  ]),
                ),
                sources: z.array(
                  z.union([
                    z.object({
                      provider: z.enum(["github", "bitbucket"]),
                      org: z.string(),
                      repo: z.string().optional(),
                    }),
                    z.object({
                      provider: z.literal("gitlab"),
                      namespace: z.string(),
                      project: z.string().optional(),
                    }),
                  ]),
                ),
              }),
            ),
            z.string(),
          ])
          .optional(),
        deploymentSources: z
          .union([
            z.array(
              z.object({
                enabled: z.boolean(),
                environments: z.array(
                  z.union([
                    z.object({
                      type: z.literal("system"),
                      target: z.enum(["production", "preview"]),
                    }),
                    z.object({ type: z.literal("custom"), environmentId: z.string() }),
                  ]),
                ),
                sources: z.array(
                  z.enum(["git", "cli", "rest-api", "deploy-hook", "integration", "v0"]),
                ),
              }),
            ),
            z.string(),
          ])
          .optional(),
      }),
      z.string(),
    ])
    .optional(),
  optionsAllowlist: z
    .object({ paths: z.array(z.object({ value: z.string().regex(/^\/.*/) })) })
    .nullable()
    .optional(),
  connectConfigurations: z
    .array(
      z.object({
        envId: z.string(),
        connectConfigurationId: z.string(),
        passive: z.boolean(),
        buildsEnabled: z.boolean(),
      }),
    )
    .nullable()
    .optional(),
  dismissedToasts: z
    .array(
      z.object({
        key: z.string(),
        dismissedAt: z.number(),
        action: z.enum(["cancel", "accept", "delete"]),
        value: z.union([
          z.string(),
          z.string(),
          z.boolean(),
          z.number(),
          z.object({
            previousValue: z.union([z.number(), z.boolean(), z.string()]),
            currentValue: z.union([z.number(), z.boolean(), z.string()]),
          }),
        ]),
      }),
    )
    .optional(),
});

export type PatchV9ProjectsIdOrNameBody = {
  autoExposeSystemEnvs?: boolean | undefined;
  autoAssignCustomDomains?: boolean | undefined;
  autoAssignCustomDomainsUpdatedBy?: string | undefined;
  buildCommand?: (string | null) | undefined;
  commandForIgnoringBuildStep?: (string | null) | undefined;
  customerSupportCodeVisibility?: boolean | undefined;
  devCommand?: (string | null) | undefined;
  directoryListing?: boolean | undefined;
  framework?:
    | (
        | "null"
        | "container"
        | "blitzjs"
        | "nextjs"
        | "gatsby"
        | "remix"
        | "react-router"
        | "astro"
        | "hexo"
        | "eleventy"
        | "docusaurus-2"
        | "docusaurus"
        | "preact"
        | "solidstart-1"
        | "solidstart"
        | "dojo"
        | "ember"
        | "vue"
        | "scully"
        | "ionic-angular"
        | "angular"
        | "polymer"
        | "svelte"
        | "sveltekit"
        | "sveltekit-1"
        | "ionic-react"
        | "create-react-app"
        | "gridsome"
        | "umijs"
        | "sapper"
        | "saber"
        | "stencil"
        | "nuxtjs"
        | "redwoodjs"
        | "hugo"
        | "jekyll"
        | "brunch"
        | "middleman"
        | "zola"
        | "hydrogen"
        | "vite"
        | "tanstack-start"
        | "tanstack-start-lovable"
        | "vitepress"
        | "vuepress"
        | "parcel"
        | "fastapi"
        | "flask"
        | "fasthtml"
        | "django"
        | "ash"
        | "eve"
        | "sanity"
        | "sanity-v2"
        | "storybook"
        | "nitro"
        | "hono"
        | "express"
        | "h3"
        | "koa"
        | "nestjs"
        | "elysia"
        | "fastify"
        | "xmcp"
        | "python"
        | "ruby"
        | "rust"
        | "axum"
        | "actix-web"
        | "bun"
        | "node"
        | "go"
        | "services"
        | "mastra"
        | null
      )
    | undefined;
  gitForkProtection?: boolean | undefined;
  gitLFS?: boolean | undefined;
  protectedSourcemaps?: boolean | undefined;
  installCommand?: (string | null) | undefined;
  name?: string | undefined;
  nodeVersion?: ("24.x" | "22.x" | "20.x" | "18.x" | "16.x" | "14.x" | "12.x" | "10.x") | undefined;
  outputDirectory?: (string | null) | undefined;
  previewDeploymentsDisabled?: (boolean | null) | undefined;
  previewDeploymentSuffix?: (string | null) | undefined;
  resourceConfig?:
    | {
        buildMachineType: unknown;
        buildMachineSelection?: ("elastic" | "fixed") | undefined;
        buildQueue?:
          | { configuration?: ("SKIP_NAMESPACE_QUEUE" | "WAIT_FOR_NAMESPACE_QUEUE") | undefined }
          | undefined;
        fluid?: boolean | undefined;
        functionDefaultRegions?: Array<string> | undefined;
        functionDefaultTimeout?: number | undefined;
        functionDefaultMemoryType?:
          | ("standard_legacy" | "standard" | "performance" | "performance_xl")
          | undefined;
        functionZeroConfigFailover?: boolean | undefined;
        elasticConcurrencyEnabled?: boolean | undefined;
        buildMachineElasticLastUpdated?: number | undefined;
        buildMachineElasticReason?:
          | (
              | "oom-failure"
              | "enospc-failure"
              | "build-timeout-failure"
              | "basic-floor"
              | "high-peak-memory"
              | "sustained-high-cpu"
              | "high-peak-disk"
              | "long-build-duration"
              | "short-build-duration"
              | "enterprise-floor"
            )
          | undefined;
        isNSNBDisabled?: boolean | undefined;
        enableFunctionsBeta?: boolean | undefined;
      }
    | undefined;
  publicSource?: (boolean | null) | undefined;
  rootDirectory?: (string | null) | undefined;
  serverlessFunctionRegion?: (string | null) | undefined;
  serverlessFunctionZeroConfigFailover?: boolean | undefined;
  skewProtectionBoundaryAt?: number | undefined;
  skewProtectionMaxAge?: number | undefined;
  skewProtectionAllowedDomains?: Array<string> | undefined;
  skipGitConnectDuringLink?: boolean | undefined;
  sourceFilesOutsideRootDirectory?: boolean | undefined;
  enablePreviewFeedback?: (boolean | null) | undefined;
  enableProductionFeedback?: (boolean | null) | undefined;
  enableAffectedProjectsDeployments?: boolean | undefined;
  enableExternalRewriteCaching?: boolean | undefined;
  staticIps?: { enabled: boolean } | undefined;
  tracing?:
    | ({
        domains?: string | undefined;
        ignorePaths?: Array<string> | undefined;
        samplingRules?:
          | Array<{
              rate: number;
              env?: ("production" | "preview") | undefined;
              requestPath?: string | undefined;
              destination?: ("internal" | "external") | undefined;
            }>
          | undefined;
      } | null)
    | undefined;
  oidcTokenConfig?:
    | { enabled?: boolean | undefined; issuerMode?: ("team" | "global") | undefined }
    | undefined;
  passwordProtection?:
    | ({
        deploymentType:
          | "all"
          | "preview"
          | "prod_deployment_urls_and_all_previews"
          | "all_except_custom_domains";
        password?: (string | null) | undefined;
      } | null)
    | undefined;
  passport?:
    | ({
        connectorId: string;
        deploymentType?:
          | (
              | "all"
              | "preview"
              | "prod_deployment_urls_and_all_previews"
              | "all_except_custom_domains"
            )
          | undefined;
      } | null)
    | undefined;
  sandbox?:
    | {
        region?:
          | (
              | "iad1"
              | "sfo1"
              | "cle1"
              | "cdg1"
              | "fra1"
              | "arn1"
              | "sin1"
              | "pdx1"
              | "lhr1"
              | "icn1"
              | "bom1"
              | "cpt1"
              | "dub1"
              | "gru1"
              | "hkg1"
              | "syd1"
              | "yul1"
              | "hnd1"
              | "kix1"
            )
          | undefined;
        failoverRegions?:
          | Array<
              | "iad1"
              | "sfo1"
              | "cle1"
              | "cdg1"
              | "fra1"
              | "arn1"
              | "sin1"
              | "pdx1"
              | "lhr1"
              | "icn1"
              | "bom1"
              | "cpt1"
              | "dub1"
              | "gru1"
              | "hkg1"
              | "syd1"
              | "yul1"
              | "hnd1"
              | "kix1"
            >
          | undefined;
      }
    | undefined;
  ssoProtection?:
    | ({
        deploymentType:
          | "all"
          | "preview"
          | "prod_deployment_urls_and_all_previews"
          | "all_except_custom_domains";
      } | null)
    | undefined;
  trustedIps?:
    | ({
        deploymentType:
          | "all"
          | "preview"
          | "production"
          | "prod_deployment_urls_and_all_previews"
          | "all_except_custom_domains";
        addresses: Array<{ value: string; note?: string | undefined }>;
        protectionMode: "exclusive" | "additional";
      } | null)
    | undefined;
  trustedSources?:
    | ({
        projects?:
          | Record<
              string,
              {
                label?: string | undefined;
                customAllow?:
                  | Array<{
                      to:
                        | { slugs: Array<string>; preset?: "all-custom" | undefined }
                        | { slugs?: Array<string> | undefined; preset: "all-custom" };
                      from:
                        | { slugs: Array<string>; preset?: "all-custom" | undefined }
                        | { slugs?: Array<string> | undefined; preset: "all-custom" };
                    }>
                  | undefined;
              }
            >
          | undefined;
        oidcProviders?:
          | Record<
              string,
              Array<{
                label?: string | undefined;
                to:
                  | { slugs: Array<string>; preset?: "all-custom" | undefined }
                  | { slugs?: Array<string> | undefined; preset: "all-custom" };
                claims: Record<string, Array<string>>;
              }>
            >
          | undefined;
      } | null)
    | undefined;
  deploymentPolicy?:
    | (
        | {
            gitSources?:
              | (
                  | Array<{
                      enabled: boolean;
                      environments: Array<
                        | { type: "system"; target: "production" | "preview" }
                        | { type: "custom"; environmentId: string }
                      >;
                      sources: Array<
                        | {
                            provider: "github" | "bitbucket";
                            org: string;
                            repo?: string | undefined;
                          }
                        | { provider: "gitlab"; namespace: string; project?: string | undefined }
                      >;
                    }>
                  | string
                )
              | undefined;
            deploymentSources?:
              | (
                  | Array<{
                      enabled: boolean;
                      environments: Array<
                        | { type: "system"; target: "production" | "preview" }
                        | { type: "custom"; environmentId: string }
                      >;
                      sources: Array<
                        "git" | "cli" | "rest-api" | "deploy-hook" | "integration" | "v0"
                      >;
                    }>
                  | string
                )
              | undefined;
          }
        | string
      )
    | undefined;
  optionsAllowlist?: ({ paths: Array<{ value: string }> } | null) | undefined;
  connectConfigurations?:
    | (Array<{
        envId: string;
        connectConfigurationId: string;
        passive: boolean;
        buildsEnabled: boolean;
      }> | null)
    | undefined;
  dismissedToasts?:
    | Array<{
        key: string;
        dismissedAt: number;
        action: "cancel" | "accept" | "delete";
        value:
          | string
          | string
          | boolean
          | number
          | { previousValue: number | boolean | string; currentValue: number | boolean | string };
      }>
    | undefined;
};

export type PatchV9ProjectsIdOrNameResponse = {
  accountId: string;
  creator?:
    | (
        | {
            type: "user";
            via:
              | { type: "app"; app: { id: string; clientId?: string | undefined } }
              | {
                  type: "integration";
                  integration: { integrationId: string; configurationId: string };
                }
              | null;
            user: { id: string };
          }
        | { type: "app"; app: { id: string; clientId?: string | undefined } }
        | { type: "integration"; integration: { integrationId: string; configurationId: string } }
        | { type: "system" }
      )
    | undefined;
  alias: Array<{
    configuredBy?: ("A" | "CNAME" | "dns-01" | "http" | "null" | null) | undefined;
    configuredChangedAt?: (number | null) | undefined;
    createdAt?: (number | null) | undefined;
    deployment: {
      id: string;
      alias?: Array<string> | undefined;
      aliasAssigned?: (number | boolean | null) | undefined;
      aliasError?: ({ code: string; message: string } | null) | undefined;
      aliasFinal?: (string | null) | undefined;
      automaticAliases?: Array<string> | undefined;
      branchMatcher?: { type: "endsWith" | "equals" | "startsWith"; pattern: string } | undefined;
      buildingAt?: number | undefined;
      builds?:
        | Array<{ use: string; src?: string | undefined; dest?: string | undefined }>
        | undefined;
      checksConclusion?: ("canceled" | "failed" | "skipped" | "succeeded") | undefined;
      checksState?: ("completed" | "registered" | "running") | undefined;
      connectBuildsEnabled?: boolean | undefined;
      connectConfigurationId?: string | undefined;
      createdAt: number;
      createdIn: string;
      creator: {
        email: string;
        githubLogin?: string | undefined;
        gitlabLogin?: string | undefined;
        uid: string;
        username: string;
      } | null;
      deletedAt?: number | undefined;
      deploymentHostname: string;
      forced?: boolean | undefined;
      name: string;
      meta?: Record<string, string> | undefined;
      monorepoManager?: (string | null) | undefined;
      oidcTokenClaims?:
        | {
            iss: string;
            sub: string;
            scope: string;
            aud: string;
            owner: string;
            owner_id: string;
            project: string;
            project_id: string;
            environment: string;
            custom_environment_id?: string | undefined;
            mfe_group_ids?: Array<string> | undefined;
            plan?: string | undefined;
          }
        | undefined;
      plan: "enterprise" | "hobby" | "pro";
      previewCommentsEnabled?: boolean | undefined;
      private: boolean;
      readyAt?: number | undefined;
      readyState:
        | "BLOCKED"
        | "BUILDING"
        | "CANCELED"
        | "ERROR"
        | "INITIALIZING"
        | "QUEUED"
        | "READY";
      readySubstate?: ("PROMOTED" | "ROLLING" | "STAGED") | undefined;
      requestedAt?: number | undefined;
      target?: (string | null) | undefined;
      teamId?: (string | null) | undefined;
      type: "LAMBDAS";
      url: string;
      userId?: string | undefined;
      withCache?: boolean | undefined;
    } | null;
    domain: string;
    environment: "preview" | "production";
    gitBranch?: (string | null) | undefined;
    redirect?: (string | null) | undefined;
    redirectStatusCode?: (number | null) | undefined;
    target: "PREVIEW" | "PRODUCTION" | "STAGING";
  }>;
  analytics?:
    | {
        id: string;
        canceledAt?: (number | null) | undefined;
        disabledAt: number;
        enabledAt: number;
        paidAt?: number | undefined;
        sampleRatePercent?: (number | null) | undefined;
        spendLimitInDollars?: (number | null) | undefined;
      }
    | undefined;
  appliedCve55182Migration?: boolean | undefined;
  speedInsights?:
    | {
        id: string;
        enabledAt?: number | undefined;
        disabledAt?: number | undefined;
        canceledAt?: number | undefined;
        hasData?: boolean | undefined;
        dataReceivedAt?: number | undefined;
        paidAt?: number | undefined;
      }
    | undefined;
  autoExposeSystemEnvs?: boolean | undefined;
  autoAssignCustomDomains?: boolean | undefined;
  autoAssignCustomDomainsUpdatedBy?: string | undefined;
  buildCommand?: (string | null) | undefined;
  commandForIgnoringBuildStep?: (string | null) | undefined;
  connectConfigurations?:
    | (Array<{
        envId: string | "preview" | "production";
        connectConfigurationId: string;
        dc?: string | undefined;
        passive: boolean;
        buildsEnabled: boolean;
        aws?: { subnetIds: Array<string>; securityGroupId?: string | undefined } | undefined;
        createdAt: number;
        updatedAt: number;
      }> | null)
    | undefined;
  connectConfigurationId?: (string | null) | undefined;
  connectBuildsEnabled?: boolean | undefined;
  passiveConnectConfigurationId?: (string | null) | undefined;
  createdAt?: number | undefined;
  customerSupportCodeVisibility?: boolean | undefined;
  crons?:
    | {
        enabledAt: number;
        disabledAt: number | null;
        updatedAt: number;
        deploymentId: string | null;
        definitions: Array<{
          host: string;
          path: string;
          schedule: string;
          source?: "api" | undefined;
          description?: string | undefined;
          hostInferred?: boolean | undefined;
        }>;
      }
    | undefined;
  dataCache?:
    | {
        userDisabled: boolean;
        storageSizeBytes?: (number | null) | undefined;
        unlimited?: boolean | undefined;
      }
    | undefined;
  deploymentExpiration: {
    expirationDays?: number | undefined;
    expirationDaysProduction?: number | undefined;
    expirationDaysCanceled?: number | undefined;
    expirationDaysErrored?: number | undefined;
    deploymentsToKeep?: number | undefined;
  };
  expiration?: ({ expiresAt: number } | { lockedAt: number; lockedBy: string }) | undefined;
  devCommand?: (string | null) | undefined;
  directoryListing: boolean;
  installCommand?: (string | null) | undefined;
  env?:
    | Array<{
        target?: (Array<string> | "production" | "preview" | "development") | undefined;
        type: "encrypted" | "plain" | "secret" | "sensitive" | "system";
        sunsetSecretId?: string | undefined;
        legacyValue?: string | undefined;
        decrypted?: boolean | undefined;
        value: string;
        vsmValue?: string | undefined;
        id?: string | undefined;
        key: string;
        configurationId?: (string | null) | undefined;
        createdAt?: number | undefined;
        updatedAt?: number | undefined;
        createdBy?: (string | null) | undefined;
        updatedBy?: (string | null) | undefined;
        gitBranch?: string | undefined;
        visibility?: ("config" | "secret") | undefined;
        edgeConfigId?: (string | null) | undefined;
        edgeConfigTokenId?: (string | null) | undefined;
        contentHint?:
          | (
              | { type: "redis-url"; storeId: string }
              | { type: "redis-rest-api-url"; storeId: string }
              | { type: "redis-rest-api-token"; storeId: string }
              | { type: "redis-rest-api-read-only-token"; storeId: string }
              | { type: "blob-read-write-token"; storeId: string }
              | { type: "blob-store-id"; storeId: string }
              | { type: "blob-webhook-public-key"; storeId: string }
              | { type: "postgres-url"; storeId: string }
              | { type: "postgres-url-non-pooling"; storeId: string }
              | { type: "postgres-prisma-url"; storeId: string }
              | { type: "postgres-user"; storeId: string }
              | { type: "postgres-host"; storeId: string }
              | { type: "postgres-password"; storeId: string }
              | { type: "postgres-database"; storeId: string }
              | { type: "postgres-url-no-ssl"; storeId: string }
              | {
                  type: "integration-store-secret";
                  storeId: string;
                  integrationId: string;
                  integrationProductId: string;
                  integrationConfigurationId: string;
                }
              | { type: "flags-connection-string"; projectId: string }
              | null
            )
          | undefined;
        internalContentHint?: ({ type: "flags-secret"; encryptedValue: string } | null) | undefined;
        comment?: string | undefined;
        customEnvironmentIds?: Array<string> | undefined;
      }>
    | undefined;
  customEnvironments?:
    | Array<{
        id: string;
        slug: string;
        type: "development" | "preview" | "production";
        description?: string | undefined;
        branchMatcher?: { type: "endsWith" | "equals" | "startsWith"; pattern: string } | undefined;
        domains?:
          | Array<{
              name: string;
              apexName: string;
              projectId: string;
              redirect?: (string | null) | undefined;
              redirectStatusCode?: (number | null) | undefined;
              gitBranch?: (string | null) | undefined;
              customEnvironmentId?: (string | null) | undefined;
              updatedAt?: number | undefined;
              createdAt?: number | undefined;
              verified: boolean;
              verification?:
                | Array<{ type: string; domain: string; value: string; reason: string }>
                | undefined;
            }>
          | undefined;
        currentDeploymentAliases?: Array<string> | undefined;
        createdAt: number;
        updatedAt: number;
      }>
    | undefined;
  framework?:
    | (
        | "actix-web"
        | "angular"
        | "ash"
        | "astro"
        | "axum"
        | "blitzjs"
        | "brunch"
        | "bun"
        | "container"
        | "create-react-app"
        | "django"
        | "docusaurus"
        | "docusaurus-2"
        | "dojo"
        | "eleventy"
        | "elysia"
        | "ember"
        | "eve"
        | "express"
        | "fastapi"
        | "fasthtml"
        | "fastify"
        | "flask"
        | "gatsby"
        | "go"
        | "gridsome"
        | "h3"
        | "hexo"
        | "hono"
        | "hugo"
        | "hydrogen"
        | "ionic-angular"
        | "ionic-react"
        | "jekyll"
        | "koa"
        | "mastra"
        | "middleman"
        | "nestjs"
        | "nextjs"
        | "nitro"
        | "node"
        | "nuxtjs"
        | "parcel"
        | "polymer"
        | "preact"
        | "python"
        | "react-router"
        | "redwoodjs"
        | "remix"
        | "ruby"
        | "rust"
        | "saber"
        | "sanity"
        | "sanity-v2"
        | "sapper"
        | "scully"
        | "services"
        | "solidstart"
        | "solidstart-1"
        | "stencil"
        | "storybook"
        | "svelte"
        | "sveltekit"
        | "sveltekit-1"
        | "tanstack-start"
        | "tanstack-start-lovable"
        | "umijs"
        | "vite"
        | "vitepress"
        | "vue"
        | "vuepress"
        | "xmcp"
        | "zola"
        | "null"
        | null
      )
    | undefined;
  services?:
    | Array<{
        serviceName: string;
        serviceType?: ("cron" | "job" | "web" | "worker") | undefined;
        framework?:
          | (
              | "actix-web"
              | "angular"
              | "ash"
              | "astro"
              | "axum"
              | "blitzjs"
              | "brunch"
              | "bun"
              | "container"
              | "create-react-app"
              | "django"
              | "docusaurus"
              | "docusaurus-2"
              | "dojo"
              | "eleventy"
              | "elysia"
              | "ember"
              | "eve"
              | "express"
              | "fastapi"
              | "fasthtml"
              | "fastify"
              | "flask"
              | "gatsby"
              | "go"
              | "gridsome"
              | "h3"
              | "hexo"
              | "hono"
              | "hugo"
              | "hydrogen"
              | "ionic-angular"
              | "ionic-react"
              | "jekyll"
              | "koa"
              | "mastra"
              | "middleman"
              | "nestjs"
              | "nextjs"
              | "nitro"
              | "node"
              | "nuxtjs"
              | "parcel"
              | "polymer"
              | "preact"
              | "python"
              | "react-router"
              | "redwoodjs"
              | "remix"
              | "ruby"
              | "rust"
              | "saber"
              | "sanity"
              | "sanity-v2"
              | "sapper"
              | "scully"
              | "services"
              | "solidstart"
              | "solidstart-1"
              | "stencil"
              | "storybook"
              | "svelte"
              | "sveltekit"
              | "sveltekit-1"
              | "tanstack-start"
              | "tanstack-start-lovable"
              | "umijs"
              | "vite"
              | "vitepress"
              | "vue"
              | "vuepress"
              | "xmcp"
              | "zola"
            )
          | undefined;
        runtime?: string | undefined;
      }>
    | undefined;
  gitForkProtection?: boolean | undefined;
  gitLFS?: boolean | undefined;
  id: string;
  ipBuckets?:
    | Array<{ bucket: string; default?: boolean | undefined; supportUntil?: number | undefined }>
    | undefined;
  jobs?:
    | {
        lint?: { targets: Array<string> } | undefined;
        typecheck?: { targets: Array<string> } | undefined;
        "mfe-config-present"?: { targets: Array<string> } | undefined;
      }
    | undefined;
  latestDeployments?:
    | Array<{
        id: string;
        alias?: Array<string> | undefined;
        aliasAssigned?: (number | boolean | null) | undefined;
        aliasError?: ({ code: string; message: string } | null) | undefined;
        aliasFinal?: (string | null) | undefined;
        automaticAliases?: Array<string> | undefined;
        branchMatcher?: { type: "endsWith" | "equals" | "startsWith"; pattern: string } | undefined;
        buildingAt?: number | undefined;
        builds?:
          | Array<{ use: string; src?: string | undefined; dest?: string | undefined }>
          | undefined;
        checksConclusion?: ("canceled" | "failed" | "skipped" | "succeeded") | undefined;
        checksState?: ("completed" | "registered" | "running") | undefined;
        connectBuildsEnabled?: boolean | undefined;
        connectConfigurationId?: string | undefined;
        createdAt: number;
        createdIn: string;
        creator: {
          email: string;
          githubLogin?: string | undefined;
          gitlabLogin?: string | undefined;
          uid: string;
          username: string;
        } | null;
        deletedAt?: number | undefined;
        deploymentHostname: string;
        forced?: boolean | undefined;
        name: string;
        meta?: Record<string, string> | undefined;
        monorepoManager?: (string | null) | undefined;
        oidcTokenClaims?:
          | {
              iss: string;
              sub: string;
              scope: string;
              aud: string;
              owner: string;
              owner_id: string;
              project: string;
              project_id: string;
              environment: string;
              custom_environment_id?: string | undefined;
              mfe_group_ids?: Array<string> | undefined;
              plan?: string | undefined;
            }
          | undefined;
        plan: "enterprise" | "hobby" | "pro";
        previewCommentsEnabled?: boolean | undefined;
        private: boolean;
        readyAt?: number | undefined;
        readyState:
          | "BLOCKED"
          | "BUILDING"
          | "CANCELED"
          | "ERROR"
          | "INITIALIZING"
          | "QUEUED"
          | "READY";
        readySubstate?: ("PROMOTED" | "ROLLING" | "STAGED") | undefined;
        requestedAt?: number | undefined;
        target?: (string | null) | undefined;
        teamId?: (string | null) | undefined;
        type: "LAMBDAS";
        url: string;
        userId?: string | undefined;
        withCache?: boolean | undefined;
      }>
    | undefined;
  link?:
    | (
        | {
            org: string;
            repoOwnerId?: number | undefined;
            repo?: string | undefined;
            repoId?: number | undefined;
            type: "github";
            createdAt?: number | undefined;
            deployHooks: Array<{
              createdAt?: number | undefined;
              id: string;
              name: string;
              ref: string;
              url: string;
            }>;
            gitCredentialId: string;
            updatedAt?: number | undefined;
            sourceless?: boolean | undefined;
            productionBranch: string;
          }
        | {
            type: "github-limited";
            repo?: string | undefined;
            repoId?: number | undefined;
            createdAt?: number | undefined;
            updatedAt?: number | undefined;
            org: string;
            repoOwnerId?: number | undefined;
            deployHooks: Array<{
              createdAt?: number | undefined;
              id: string;
              name: string;
              ref: string;
              url: string;
            }>;
            gitCredentialId: string;
            sourceless?: boolean | undefined;
            productionBranch: string;
          }
        | {
            org: string;
            repoOwnerId?: number | undefined;
            repo?: string | undefined;
            repoId?: number | undefined;
            type: "github-custom-host";
            host: string;
            createdAt?: number | undefined;
            deployHooks: Array<{
              createdAt?: number | undefined;
              id: string;
              name: string;
              ref: string;
              url: string;
            }>;
            gitCredentialId: string;
            updatedAt?: number | undefined;
            sourceless?: boolean | undefined;
            productionBranch: string;
          }
        | {
            projectId: string;
            projectName: string;
            projectNameWithNamespace: string;
            projectNamespace: string;
            projectOwnerId?: number | undefined;
            projectUrl: string;
            type: "gitlab";
            createdAt?: number | undefined;
            deployHooks: Array<{
              createdAt?: number | undefined;
              id: string;
              name: string;
              ref: string;
              url: string;
            }>;
            gitCredentialId: string;
            updatedAt?: number | undefined;
            sourceless?: boolean | undefined;
            productionBranch: string;
          }
        | {
            name: string;
            slug: string;
            owner: string;
            type: "bitbucket";
            uuid: string;
            workspaceUuid: string;
            createdAt?: number | undefined;
            deployHooks: Array<{
              createdAt?: number | undefined;
              id: string;
              name: string;
              ref: string;
              url: string;
            }>;
            gitCredentialId: string;
            updatedAt?: number | undefined;
            sourceless?: boolean | undefined;
            productionBranch: string;
          }
        | {
            org: string;
            repo: string;
            type: "vercel";
            createdAt?: number | undefined;
            deployHooks: Array<{
              createdAt?: number | undefined;
              id: string;
              name: string;
              ref: string;
              url: string;
            }>;
            gitCredentialId: string;
            updatedAt?: number | undefined;
            sourceless?: boolean | undefined;
            productionBranch: string;
          }
        | {
            owner: string;
            repo: string;
            repoId: string;
            ownerId: string;
            type: "cursor-origin";
            createdAt?: number | undefined;
            deployHooks: Array<{
              createdAt?: number | undefined;
              id: string;
              name: string;
              ref: string;
              url: string;
            }>;
            gitCredentialId: string;
            updatedAt?: number | undefined;
            sourceless?: boolean | undefined;
            productionBranch: string;
          }
      )
    | undefined;
  blobs?: { isDefaultApp?: boolean | undefined } | undefined;
  microfrontends?:
    | (
        | {
            isDefaultApp: true;
            updatedAt: number;
            groupIds: Array<string>;
            enabled: true;
            defaultRoute?: string | undefined;
            freeProjectForLegacyLimits?: boolean | undefined;
          }
        | {
            isDefaultApp?: false | undefined;
            routeObservabilityToThisProject?: boolean | undefined;
            doNotRouteWithMicrofrontendsRouting?: boolean | undefined;
            updatedAt: number;
            groupIds: Array<string>;
            enabled: true;
            defaultRoute?: string | undefined;
            freeProjectForLegacyLimits?: boolean | undefined;
          }
        | {
            updatedAt: number;
            groupIds: Array<unknown>;
            enabled: false;
            freeProjectForLegacyLimits?: boolean | undefined;
          }
      )
    | undefined;
  name: string;
  nodeVersion: "10.x" | "12.x" | "14.x" | "16.x" | "18.x" | "20.x" | "22.x" | "24.x" | "8.10.x";
  optionsAllowlist?: ({ paths: Array<{ value: string }> } | null) | undefined;
  outputDirectory?: (string | null) | undefined;
  passwordProtection?: (Record<string, never> | null) | undefined;
  passport?:
    | ({
        deploymentType:
          | "all"
          | "all_except_custom_domains"
          | "preview"
          | "prod_deployment_urls_and_all_previews";
        connectorId: string;
      } | null)
    | undefined;
  protectionConfig?:
    | { sandboxUrls?: { inheritDeploymentProtection?: boolean | undefined } | undefined }
    | undefined;
  sandbox?:
    | {
        region?:
          | (
              | "arn1"
              | "bom1"
              | "cdg1"
              | "cle1"
              | "cpt1"
              | "dub1"
              | "fra1"
              | "gru1"
              | "hkg1"
              | "hnd1"
              | "iad1"
              | "icn1"
              | "kix1"
              | "lhr1"
              | "pdx1"
              | "sfo1"
              | "sin1"
              | "syd1"
              | "yul1"
            )
          | undefined;
        failoverRegions?:
          | Array<
              | "arn1"
              | "bom1"
              | "cdg1"
              | "cle1"
              | "cpt1"
              | "dub1"
              | "fra1"
              | "gru1"
              | "hkg1"
              | "hnd1"
              | "iad1"
              | "icn1"
              | "kix1"
              | "lhr1"
              | "pdx1"
              | "sfo1"
              | "sin1"
              | "syd1"
              | "yul1"
            >
          | undefined;
      }
    | undefined;
  productionDeploymentsFastLane?: boolean | undefined;
  resourceConfig: {
    elasticConcurrencyEnabled?: boolean | undefined;
    fluid?: boolean | undefined;
    functionDefaultRegions: Array<string>;
    functionDefaultTimeout?: number | undefined;
    functionDefaultMemoryType?:
      | ("performance" | "performance_xl" | "standard" | "standard_legacy")
      | undefined;
    functionZeroConfigFailover?: boolean | undefined;
    buildMachineType?: ("basic" | "enhanced" | "standard" | "turbo") | undefined;
    buildMachineSelection?: ("elastic" | "fixed") | undefined;
    buildMachineElasticLastUpdated?: number | undefined;
    buildMachineElasticReason?:
      | (
          | "basic-floor"
          | "build-timeout-failure"
          | "enospc-failure"
          | "enterprise-floor"
          | "high-peak-disk"
          | "high-peak-memory"
          | "long-build-duration"
          | "oom-failure"
          | "short-build-duration"
          | "sustained-high-cpu"
        )
      | undefined;
    isNSNBDisabled?: boolean | undefined;
    buildQueue?:
      | { configuration?: ("SKIP_NAMESPACE_QUEUE" | "WAIT_FOR_NAMESPACE_QUEUE") | undefined }
      | undefined;
    enableFunctionsBeta?: boolean | undefined;
  };
  rollbackDescription?:
    | { userId: string; username: string; description: string; createdAt: number }
    | undefined;
  rollingRelease?:
    | ({
        target: string;
        stages?:
          | (Array<{
              targetPercentage: number;
              requireApproval?: boolean | undefined;
              duration?: number | undefined;
              linearShift?: boolean | undefined;
            }> | null)
          | undefined;
        canaryResponseHeader?: boolean | undefined;
        gate?:
          | {
              enabled: boolean;
              checks: Array<{
                type: "error-rate-5xx";
                minSampleSize?: number | undefined;
                excludeStatusCodes?: Array<number> | undefined;
                excludePaths?: Array<string> | undefined;
                ingestWatermarkSeconds?: number | undefined;
              }>;
              failureThreshold?: number | undefined;
              windowSize?: number | undefined;
              action: "pause" | "rollback";
              dryRun: boolean;
            }
          | undefined;
      } | null)
    | undefined;
  defaultResourceConfig: {
    elasticConcurrencyEnabled?: boolean | undefined;
    fluid?: boolean | undefined;
    functionDefaultRegions: Array<string>;
    functionDefaultTimeout?: number | undefined;
    functionDefaultMemoryType?:
      | ("performance" | "performance_xl" | "standard" | "standard_legacy")
      | undefined;
    functionZeroConfigFailover?: boolean | undefined;
    buildMachineType?: ("basic" | "enhanced" | "standard" | "turbo") | undefined;
    buildMachineSelection?: ("elastic" | "fixed") | undefined;
    buildMachineElasticLastUpdated?: number | undefined;
    buildMachineElasticReason?:
      | (
          | "basic-floor"
          | "build-timeout-failure"
          | "enospc-failure"
          | "enterprise-floor"
          | "high-peak-disk"
          | "high-peak-memory"
          | "long-build-duration"
          | "oom-failure"
          | "short-build-duration"
          | "sustained-high-cpu"
        )
      | undefined;
    isNSNBDisabled?: boolean | undefined;
    buildQueue?:
      | { configuration?: ("SKIP_NAMESPACE_QUEUE" | "WAIT_FOR_NAMESPACE_QUEUE") | undefined }
      | undefined;
    enableFunctionsBeta?: boolean | undefined;
  };
  rootDirectory?: (string | null) | undefined;
  serverlessFunctionZeroConfigFailover?: boolean | undefined;
  skewProtectionBoundaryAt?: number | undefined;
  skewProtectionMaxAge?: number | undefined;
  skewProtectionAllowedDomains?: Array<string> | undefined;
  skipGitConnectDuringLink?: boolean | undefined;
  staticIps?: { builds: boolean; enabled: boolean; regions: Array<string> } | undefined;
  sourceFilesOutsideRootDirectory?: boolean | undefined;
  enableAffectedProjectsDeployments?: boolean | undefined;
  enableExternalRewriteCaching?: boolean | undefined;
  ssoProtection?:
    | ({
        deploymentType:
          | "all"
          | "all_except_custom_domains"
          | "preview"
          | "prod_deployment_urls_and_all_previews";
        cve55182MigrationAppliedFrom?:
          | (
              | "all"
              | "all_except_custom_domains"
              | "preview"
              | "prod_deployment_urls_and_all_previews"
              | "null"
              | null
            )
          | undefined;
        april2026SecurityIncidentMigrationAppliedFrom?:
          | (
              | "all"
              | "all_except_custom_domains"
              | "preview"
              | "prod_deployment_urls_and_all_previews"
              | "null"
              | null
            )
          | undefined;
      } | null)
    | undefined;
  targets?:
    | Record<
        string,
        {
          id: string;
          alias?: Array<string> | undefined;
          aliasAssigned?: (number | boolean | null) | undefined;
          aliasError?: ({ code: string; message: string } | null) | undefined;
          aliasFinal?: (string | null) | undefined;
          automaticAliases?: Array<string> | undefined;
          branchMatcher?:
            | { type: "endsWith" | "equals" | "startsWith"; pattern: string }
            | undefined;
          buildingAt?: number | undefined;
          builds?:
            | Array<{ use: string; src?: string | undefined; dest?: string | undefined }>
            | undefined;
          checksConclusion?: ("canceled" | "failed" | "skipped" | "succeeded") | undefined;
          checksState?: ("completed" | "registered" | "running") | undefined;
          connectBuildsEnabled?: boolean | undefined;
          connectConfigurationId?: string | undefined;
          createdAt: number;
          createdIn: string;
          creator: {
            email: string;
            githubLogin?: string | undefined;
            gitlabLogin?: string | undefined;
            uid: string;
            username: string;
          } | null;
          deletedAt?: number | undefined;
          deploymentHostname: string;
          forced?: boolean | undefined;
          name: string;
          meta?: Record<string, string> | undefined;
          monorepoManager?: (string | null) | undefined;
          oidcTokenClaims?:
            | {
                iss: string;
                sub: string;
                scope: string;
                aud: string;
                owner: string;
                owner_id: string;
                project: string;
                project_id: string;
                environment: string;
                custom_environment_id?: string | undefined;
                mfe_group_ids?: Array<string> | undefined;
                plan?: string | undefined;
              }
            | undefined;
          plan: "enterprise" | "hobby" | "pro";
          previewCommentsEnabled?: boolean | undefined;
          private: boolean;
          readyAt?: number | undefined;
          readyState:
            | "BLOCKED"
            | "BUILDING"
            | "CANCELED"
            | "ERROR"
            | "INITIALIZING"
            | "QUEUED"
            | "READY";
          readySubstate?: ("PROMOTED" | "ROLLING" | "STAGED") | undefined;
          requestedAt?: number | undefined;
          target?: (string | null) | undefined;
          teamId?: (string | null) | undefined;
          type: "LAMBDAS";
          url: string;
          userId?: string | undefined;
          withCache?: boolean | undefined;
        } | null
      >
    | undefined;
  transferCompletedAt?: number | undefined;
  transferStartedAt?: number | undefined;
  transferToAccountId?: string | undefined;
  transferredFromAccountId?: string | undefined;
  updatedAt?: number | undefined;
  live?: boolean | undefined;
  enablePreviewFeedback?: (boolean | null) | undefined;
  enableProductionFeedback?: (boolean | null) | undefined;
  permissions?:
    | {
        oauth2Connection?: Array<ACLAction> | undefined;
        user?: Array<ACLAction> | undefined;
        userConnection?: Array<ACLAction> | undefined;
        userMfaConfiguration?: Array<ACLAction> | undefined;
        userPreference?: Array<ACLAction> | undefined;
        userSudo?: Array<ACLAction> | undefined;
        webAuthn?: Array<ACLAction> | undefined;
        accessGroup?: Array<ACLAction> | undefined;
        agent?: Array<ACLAction> | undefined;
        aiGatewayApiKey?: Array<ACLAction> | undefined;
        aiGatewayApiKeyBypassAll?: Array<ACLAction> | undefined;
        aiGatewayApiKeyOwnedBySelf?: Array<ACLAction> | undefined;
        aiGatewayApiKeySpendAttribution?: Array<ACLAction> | undefined;
        aiGatewayApiKeyZdrExemption?: Array<ACLAction> | undefined;
        aiGatewayBudget?: Array<ACLAction> | undefined;
        aiGatewayCredits?: Array<ACLAction> | undefined;
        aiGatewayPrivateModels?: Array<ACLAction> | undefined;
        aiGatewayGuardrails?: Array<ACLAction> | undefined;
        aiGatewayRules?: Array<ACLAction> | undefined;
        aiGatewaySettings?: Array<ACLAction> | undefined;
        aiGatewayUsage?: Array<ACLAction> | undefined;
        aiGatewayVirtualModelConfigs?: Array<ACLAction> | undefined;
        alerts?: Array<ACLAction> | undefined;
        alertRules?: Array<ACLAction> | undefined;
        aliasGlobal?: Array<ACLAction> | undefined;
        analyticsSampling?: Array<ACLAction> | undefined;
        analyticsUsage?: Array<ACLAction> | undefined;
        apiKey?: Array<ACLAction> | undefined;
        apiKeyAiGateway?: Array<ACLAction> | undefined;
        apiKeyOwnedBySelf?: Array<ACLAction> | undefined;
        oauth2Application?: Array<ACLAction> | undefined;
        vercelAppInstallation?: Array<ACLAction> | undefined;
        vercelAppInstallationRequest?: Array<ACLAction> | undefined;
        auditLog?: Array<ACLAction> | undefined;
        billingAddress?: Array<ACLAction> | undefined;
        billingInformation?: Array<ACLAction> | undefined;
        billingInvoice?: Array<ACLAction> | undefined;
        billingInvoiceEmailRecipient?: Array<ACLAction> | undefined;
        billingInvoiceLanguage?: Array<ACLAction> | undefined;
        billingPlan?: Array<ACLAction> | undefined;
        billingPurchaseOrder?: Array<ACLAction> | undefined;
        billingRefund?: Array<ACLAction> | undefined;
        billingTaxId?: Array<ACLAction> | undefined;
        blob?: Array<ACLAction> | undefined;
        blobStoreTokenSet?: Array<ACLAction> | undefined;
        budget?: Array<ACLAction> | undefined;
        cacheArtifact?: Array<ACLAction> | undefined;
        cacheArtifactUsageEvent?: Array<ACLAction> | undefined;
        codeChecks?: Array<ACLAction> | undefined;
        codeOwners?: Array<ACLAction> | undefined;
        ciInvocations?: Array<ACLAction> | undefined;
        ciLogs?: Array<ACLAction> | undefined;
        concurrentBuilds?: Array<ACLAction> | undefined;
        connect?: Array<ACLAction> | undefined;
        connectConfiguration?: Array<ACLAction> | undefined;
        connectLogs?: Array<ACLAction> | undefined;
        connexClient?: Array<ACLAction> | undefined;
        connexClientProject?: Array<ACLAction> | undefined;
        connexContact?: Array<ACLAction> | undefined;
        connexInstallation?: Array<ACLAction> | undefined;
        connexToken?: Array<ACLAction> | undefined;
        buildMachineDefault?: Array<ACLAction> | undefined;
        cursorOriginInstallation?: Array<ACLAction> | undefined;
        dataCacheBillingSettings?: Array<ACLAction> | undefined;
        defaultDeploymentProtection?: Array<ACLAction> | undefined;
        deploymentPolicy?: Array<ACLAction> | undefined;
        domain?: Array<ACLAction> | undefined;
        domainAcceptDelegation?: Array<ACLAction> | undefined;
        domainAuthCodes?: Array<ACLAction> | undefined;
        domainCertificate?: Array<ACLAction> | undefined;
        domainCheckConfig?: Array<ACLAction> | undefined;
        domainMove?: Array<ACLAction> | undefined;
        domainPurchase?: Array<ACLAction> | undefined;
        domainRecord?: Array<ACLAction> | undefined;
        domainTransferIn?: Array<ACLAction> | undefined;
        drain?: Array<ACLAction> | undefined;
        edgeConfig?: Array<ACLAction> | undefined;
        edgeConfigItem?: Array<ACLAction> | undefined;
        edgeConfigSchema?: Array<ACLAction> | undefined;
        edgeConfigToken?: Array<ACLAction> | undefined;
        endpointVerification?: Array<ACLAction> | undefined;
        event?: Array<ACLAction> | undefined;
        fileUpload?: Array<ACLAction> | undefined;
        flagsExplorerSubscription?: Array<ACLAction> | undefined;
        gitRepository?: Array<ACLAction> | undefined;
        imageOptimizationNewPrice?: Array<ACLAction> | undefined;
        integration?: Array<ACLAction> | undefined;
        integrationAccount?: Array<ACLAction> | undefined;
        integrationConfiguration?: Array<ACLAction> | undefined;
        integrationConfigurationProjects?: Array<ACLAction> | undefined;
        integrationConfigurationRole?: Array<ACLAction> | undefined;
        integrationConfigurationTransfer?: Array<ACLAction> | undefined;
        integrationDeploymentAction?: Array<ACLAction> | undefined;
        integrationEvent?: Array<ACLAction> | undefined;
        integrationLog?: Array<ACLAction> | undefined;
        integrationResource?: Array<ACLAction> | undefined;
        integrationResourceData?: Array<ACLAction> | undefined;
        integrationResourceReplCommand?: Array<ACLAction> | undefined;
        integrationResourceSecrets?: Array<ACLAction> | undefined;
        integrationSSOSession?: Array<ACLAction> | undefined;
        integrationStrict?: Array<ACLAction> | undefined;
        integrationStoreTokenSet?: Array<ACLAction> | undefined;
        integrationVercelConfigurationOverride?: Array<ACLAction> | undefined;
        integrationPullRequest?: Array<ACLAction> | undefined;
        ipBlocking?: Array<ACLAction> | undefined;
        jobGlobal?: Array<ACLAction> | undefined;
        kmsIssuer?: Array<ACLAction> | undefined;
        kmsProjectGrant?: Array<ACLAction> | undefined;
        logDrain?: Array<ACLAction> | undefined;
        marketplaceBillingData?: Array<ACLAction> | undefined;
        marketplaceExperimentationEdgeConfigData?: Array<ACLAction> | undefined;
        marketplaceExperimentationItem?: Array<ACLAction> | undefined;
        marketplaceFlexCommit?: Array<ACLAction> | undefined;
        marketplaceInstallationMember?: Array<ACLAction> | undefined;
        marketplaceInvoice?: Array<ACLAction> | undefined;
        marketplaceSettings?: Array<ACLAction> | undefined;
        Monitoring?: Array<ACLAction> | undefined;
        monitoringAlert?: Array<ACLAction> | undefined;
        monitoringChart?: Array<ACLAction> | undefined;
        monitoringQuery?: Array<ACLAction> | undefined;
        monitoringSettings?: Array<ACLAction> | undefined;
        notificationCustomerBudget?: Array<ACLAction> | undefined;
        notificationDeploymentFailed?: Array<ACLAction> | undefined;
        notificationDomainConfiguration?: Array<ACLAction> | undefined;
        notificationDomainExpire?: Array<ACLAction> | undefined;
        notificationDomainMoved?: Array<ACLAction> | undefined;
        notificationDomainPurchase?: Array<ACLAction> | undefined;
        notificationDomainRenewal?: Array<ACLAction> | undefined;
        notificationDomainTransfer?: Array<ACLAction> | undefined;
        notificationDomainUnverified?: Array<ACLAction> | undefined;
        NotificationMonitoringAlert?: Array<ACLAction> | undefined;
        notificationPaymentFailed?: Array<ACLAction> | undefined;
        notificationPreferences?: Array<ACLAction> | undefined;
        notificationStatementOfReasons?: Array<ACLAction> | undefined;
        notificationUsageAlert?: Array<ACLAction> | undefined;
        oidcFederationPolicy?: Array<ACLAction> | undefined;
        observabilityConfiguration?: Array<ACLAction> | undefined;
        observabilityFunnel?: Array<ACLAction> | undefined;
        observabilityNotebook?: Array<ACLAction> | undefined;
        openTelemetryEndpoint?: Array<ACLAction> | undefined;
        ownEvent?: Array<ACLAction> | undefined;
        organization?: Array<ACLAction> | undefined;
        organizationDomain?: Array<ACLAction> | undefined;
        organizationTeam?: Array<ACLAction> | undefined;
        passwordProtectionInvoiceItem?: Array<ACLAction> | undefined;
        paymentMethod?: Array<ACLAction> | undefined;
        permissions?: Array<ACLAction> | undefined;
        postgres?: Array<ACLAction> | undefined;
        postgresStoreTokenSet?: Array<ACLAction> | undefined;
        previewDeploymentSuffix?: Array<ACLAction> | undefined;
        privateCloudAccount?: Array<ACLAction> | undefined;
        projectTransferIn?: Array<ACLAction> | undefined;
        proTrialOnboarding?: Array<ACLAction> | undefined;
        rateLimit?: Array<ACLAction> | undefined;
        redis?: Array<ACLAction> | undefined;
        redisStoreTokenSet?: Array<ACLAction> | undefined;
        remoteCaching?: Array<ACLAction> | undefined;
        repository?: Array<ACLAction> | undefined;
        samlConfig?: Array<ACLAction> | undefined;
        secret?: Array<ACLAction> | undefined;
        securityConfig?: Array<ACLAction> | undefined;
        sensitiveEnvironmentVariablePolicy?: Array<ACLAction> | undefined;
        sharedEnvVars?: Array<ACLAction> | undefined;
        sharedEnvVarsProduction?: Array<ACLAction> | undefined;
        space?: Array<ACLAction> | undefined;
        spaceRun?: Array<ACLAction> | undefined;
        storeIsLocked?: Array<ACLAction> | undefined;
        storeTokenSetSensitive?: Array<ACLAction> | undefined;
        storeTransfer?: Array<ACLAction> | undefined;
        supportCase?: Array<ACLAction> | undefined;
        supportCaseComment?: Array<ACLAction> | undefined;
        team?: Array<ACLAction> | undefined;
        teamAccessRequest?: Array<ACLAction> | undefined;
        teamFellowMembership?: Array<ACLAction> | undefined;
        teamGitExclusivity?: Array<ACLAction> | undefined;
        teamInvite?: Array<ACLAction> | undefined;
        teamInviteCode?: Array<ACLAction> | undefined;
        teamInviteLink?: Array<ACLAction> | undefined;
        teamJoin?: Array<ACLAction> | undefined;
        teamMemberMfaStatus?: Array<ACLAction> | undefined;
        teamMicrofrontends?: Array<ACLAction> | undefined;
        teamOwnMembership?: Array<ACLAction> | undefined;
        teamOwnMembershipDisconnectSAML?: Array<ACLAction> | undefined;
        teamSudo?: Array<ACLAction> | undefined;
        teamTokenInvalidation?: Array<ACLAction> | undefined;
        token?: Array<ACLAction> | undefined;
        toolbarComment?: Array<ACLAction> | undefined;
        usage?: Array<ACLAction> | undefined;
        usageCycle?: Array<ACLAction> | undefined;
        vcrRepository?: Array<ACLAction> | undefined;
        vpcPeeringConnection?: Array<ACLAction> | undefined;
        webAnalyticsPlan?: Array<ACLAction> | undefined;
        webhook?: Array<ACLAction> | undefined;
        "webhook-event"?: Array<ACLAction> | undefined;
        aliasProject?: Array<ACLAction> | undefined;
        aliasProtectionBypass?: Array<ACLAction> | undefined;
        bulkRedirects?: Array<ACLAction> | undefined;
        buildMachine?: Array<ACLAction> | undefined;
        connectConfigurationLink?: Array<ACLAction> | undefined;
        dataCacheNamespace?: Array<ACLAction> | undefined;
        deployment?: Array<ACLAction> | undefined;
        deploymentBuildLogs?: Array<ACLAction> | undefined;
        deploymentCheck?: Array<ACLAction> | undefined;
        deploymentCheckPreview?: Array<ACLAction> | undefined;
        deploymentCheckReRunFromProductionBranch?: Array<ACLAction> | undefined;
        deploymentProductionGit?: Array<ACLAction> | undefined;
        deploymentV0?: Array<ACLAction> | undefined;
        deploymentPreview?: Array<ACLAction> | undefined;
        deploymentPrivate?: Array<ACLAction> | undefined;
        deploymentPromote?: Array<ACLAction> | undefined;
        deploymentRollback?: Array<ACLAction> | undefined;
        edgeCacheNamespace?: Array<ACLAction> | undefined;
        environments?: Array<ACLAction> | undefined;
        job?: Array<ACLAction> | undefined;
        logs?: Array<ACLAction> | undefined;
        logsPreset?: Array<ACLAction> | undefined;
        observabilityData?: Array<ACLAction> | undefined;
        onDemandBuild?: Array<ACLAction> | undefined;
        onDemandConcurrency?: Array<ACLAction> | undefined;
        optionsAllowlist?: Array<ACLAction> | undefined;
        passwordProtection?: Array<ACLAction> | undefined;
        privateLinkEndpoint?: Array<ACLAction> | undefined;
        productionAliasProtectionBypass?: Array<ACLAction> | undefined;
        productionShareableLink?: Array<ACLAction> | undefined;
        project?: Array<ACLAction> | undefined;
        projectAccessGroup?: Array<ACLAction> | undefined;
        projectAnalyticsSampling?: Array<ACLAction> | undefined;
        projectAnalyticsUsage?: Array<ACLAction> | undefined;
        projectCheck?: Array<ACLAction> | undefined;
        projectCheckRun?: Array<ACLAction> | undefined;
        projectDeploymentExpiration?: Array<ACLAction> | undefined;
        projectDeploymentHook?: Array<ACLAction> | undefined;
        projectDeploymentProtectionStrict?: Array<ACLAction> | undefined;
        projectDomain?: Array<ACLAction> | undefined;
        projectDomainCheckConfig?: Array<ACLAction> | undefined;
        projectDomainMove?: Array<ACLAction> | undefined;
        projectDomainVerify?: Array<ACLAction> | undefined;
        projectEvent?: Array<ACLAction> | undefined;
        projectEnvVars?: Array<ACLAction> | undefined;
        projectEnvVarsProduction?: Array<ACLAction> | undefined;
        projectEnvVarsUnownedByIntegration?: Array<ACLAction> | undefined;
        projectFlags?: Array<ACLAction> | undefined;
        projectFlagsProduction?: Array<ACLAction> | undefined;
        projectFlagsSdkKey?: Array<ACLAction> | undefined;
        projectFromV0?: Array<ACLAction> | undefined;
        projectId?: Array<ACLAction> | undefined;
        projectIntegrationConfiguration?: Array<ACLAction> | undefined;
        projectLink?: Array<ACLAction> | undefined;
        projectMember?: Array<ACLAction> | undefined;
        projectMonitoring?: Array<ACLAction> | undefined;
        projectOIDCToken?: Array<ACLAction> | undefined;
        projectPermissions?: Array<ACLAction> | undefined;
        projectProductionBranch?: Array<ACLAction> | undefined;
        projectProtectionBypass?: Array<ACLAction> | undefined;
        projectRollingRelease?: Array<ACLAction> | undefined;
        projectRoutes?: Array<ACLAction> | undefined;
        projectSupportCase?: Array<ACLAction> | undefined;
        projectSupportCaseComment?: Array<ACLAction> | undefined;
        projectTier?: Array<ACLAction> | undefined;
        projectTransfer?: Array<ACLAction> | undefined;
        projectTransferOut?: Array<ACLAction> | undefined;
        projectUsage?: Array<ACLAction> | undefined;
        pageIntegrity?: Array<ACLAction> | undefined;
        seawallConfig?: Array<ACLAction> | undefined;
        securityPlusConfiguration?: Array<ACLAction> | undefined;
        shareableLink?: Array<ACLAction> | undefined;
        shareableLinkStrict?: Array<ACLAction> | undefined;
        sharedEnvVarConnection?: Array<ACLAction> | undefined;
        skewProtection?: Array<ACLAction> | undefined;
        analytics?: Array<ACLAction> | undefined;
        trustedIps?: Array<ACLAction> | undefined;
        trustedSources?: Array<ACLAction> | undefined;
        v0Chat?: Array<ACLAction> | undefined;
        vercelAuth?: Array<ACLAction> | undefined;
        vercelRun?: Array<ACLAction> | undefined;
        webAnalytics?: Array<ACLAction> | undefined;
        workflowRunData?: Array<ACLAction> | undefined;
      }
    | undefined;
  lastRollbackTarget?: (Record<string, never> | null) | undefined;
  lastAliasRequest?:
    | ({
        fromDeploymentId: string | null;
        toDeploymentId: string;
        fromRollingReleaseId?: string | undefined;
        jobStatus: "failed" | "in-progress" | "pending" | "skipped" | "succeeded";
        requestedAt: number;
        type: "promote" | "rollback";
      } | null)
    | undefined;
  protectionBypass?:
    | Record<
        string,
        | {
            createdAt: number;
            createdBy: string;
            scope: "integration-automation-bypass";
            integrationId: string;
            configurationId: string;
          }
        | {
            createdAt: number;
            createdBy: string;
            scope: "automation-bypass";
            isEnvVar?: boolean | undefined;
            note?: string | undefined;
          }
      >
    | undefined;
  hasActiveBranches?: boolean | undefined;
  trustedIps?:
    | (
        | {
            deploymentType:
              | "all"
              | "all_except_custom_domains"
              | "preview"
              | "prod_deployment_urls_and_all_previews"
              | "production";
            addresses: Array<{ value: string; note?: string | undefined }>;
            protectionMode: "additional" | "exclusive";
          }
        | {
            deploymentType:
              | "all"
              | "all_except_custom_domains"
              | "preview"
              | "prod_deployment_urls_and_all_previews"
              | "production";
          }
        | null
      )
    | undefined;
  trustedSources?:
    | ({
        projects?:
          | Record<
              string,
              {
                label?: string | undefined;
                customAllow?:
                  | Array<{
                      from:
                        | { slugs: Array<string>; preset?: "all-custom" | undefined }
                        | { slugs?: Array<string> | undefined; preset: "all-custom" };
                      to:
                        | { slugs: Array<string>; preset?: "all-custom" | undefined }
                        | { slugs?: Array<string> | undefined; preset: "all-custom" };
                    }>
                  | undefined;
              }
            >
          | undefined;
        oidcProviders?:
          | Record<
              string,
              Array<{
                to:
                  | { slugs: Array<string>; preset?: "all-custom" | undefined }
                  | { slugs?: Array<string> | undefined; preset: "all-custom" };
                label?: string | undefined;
                claims: Record<string, Array<string>>;
              }>
            >
          | undefined;
      } | null)
    | undefined;
  gitComments?: { onPullRequest: boolean; onCommit: boolean } | undefined;
  gitProviderOptions?:
    | {
        createDeployments: "disabled" | "enabled";
        disableRepositoryDispatchEvents?: boolean | undefined;
        requireVerifiedCommits?: boolean | undefined;
        gitCommitStatus?: boolean | undefined;
        consolidatedGitCommitStatus?: { enabled: boolean; propagateFailures: boolean } | undefined;
      }
    | undefined;
  paused?: boolean | undefined;
  concurrencyBucketName?: string | undefined;
  webAnalytics?:
    | {
        id: string;
        disabledAt?: number | undefined;
        canceledAt?: number | undefined;
        enabledAt?: number | undefined;
        hasData?: true | undefined;
      }
    | undefined;
  security?:
    | {
        attackModeEnabled?: boolean | undefined;
        attackModeUpdatedAt?: number | undefined;
        firewallEnabled?: boolean | undefined;
        firewallUpdatedAt?: number | undefined;
        attackModeActiveUntil?: (number | null) | undefined;
        firewallConfigVersion?: number | undefined;
        rulesets?:
          | Record<
              string,
              {
                action:
                  | "allow"
                  | "bypass"
                  | "challenge"
                  | "deny"
                  | "log"
                  | "rate_limit"
                  | "redirect";
                rateLimit?:
                  | ({
                      algo: "fixed_window" | "token_bucket";
                      window: number;
                      limit: number;
                      keys: Array<string>;
                    } | null)
                  | undefined;
                redirect?: ({ location: string; permanent: boolean } | null) | undefined;
                actionDuration?: (string | null) | undefined;
                bypassSystem?: (boolean | null) | undefined;
                logHeaders?: (Array<string> | "*") | undefined;
              }
            >
          | undefined;
        firewallSeawallEnabled?: boolean | undefined;
        ja3Enabled?: boolean | undefined;
        ja4Enabled?: boolean | undefined;
        firewallBypassIps?: Array<string> | undefined;
        managedRules?:
          | ({
              vercel_ruleset: {
                active: boolean;
                action?: ("challenge" | "deny" | "log") | undefined;
              };
              traffic_sources: {
                active: boolean;
                action?: ("challenge" | "deny" | "log") | undefined;
              };
              bot_filter: { active: boolean; action?: ("challenge" | "deny" | "log") | undefined };
              ai_bots: { active: boolean; action?: ("challenge" | "deny" | "log") | undefined };
              owasp: { active: boolean; action?: ("challenge" | "deny" | "log") | undefined };
            } | null)
          | undefined;
        botIdEnabled?: boolean | undefined;
        log_headers?: (Array<string> | "*") | undefined;
        securityPlus?: boolean | undefined;
        securityPlusMetadata?:
          | { updatedAt: number; firstEnabledAt?: number | undefined }
          | undefined;
        pageIntegrityEnabled?: boolean | undefined;
      }
    | undefined;
  oidcTokenConfig?:
    | { enabled?: boolean | undefined; issuerMode?: ("global" | "team") | undefined }
    | undefined;
  deploymentPolicy?:
    | ({
        gitSources?:
          | (Array<{
              sources: Array<
                | { provider: "bitbucket" | "github"; org: string; repo?: string | undefined }
                | { provider: "gitlab"; namespace: string; project?: string | undefined }
              >;
              enabled: boolean;
              environments: Array<
                | { type: "system"; target: "preview" | "production" }
                | { type: "custom"; environmentId: string }
              >;
            }> | null)
          | undefined;
        deploymentSources?:
          | (Array<{
              sources: Array<"cli" | "deploy-hook" | "git" | "integration" | "rest-api" | "v0">;
              enabled: boolean;
              environments: Array<
                | { type: "system"; target: "preview" | "production" }
                | { type: "custom"; environmentId: string }
              >;
            }> | null)
          | undefined;
      } | null)
    | undefined;
  tier?: ("advanced" | "critical") | undefined;
  usageStatus?:
    | {
        kind: "flat";
        exceededAllowanceUntil?: number | undefined;
        bypassThrottleUntil?: number | undefined;
        throttled?: boolean | undefined;
        teamThrottled?: boolean | undefined;
      }
    | undefined;
  features?: { webAnalytics?: boolean | undefined } | undefined;
  v0?: boolean | undefined;
  v0Created?: boolean | undefined;
  abuse?:
    | {
        scanner?: string | undefined;
        history: Array<{ scanner: string; reason: string; by: string; byId: string; at: number }>;
        updatedAt: number;
        block?:
          | {
              action: "blocked";
              reason: string;
              statusCode: number;
              createdAt: number;
              caseId?: string | undefined;
              actor?: string | undefined;
              comment?: string | undefined;
              ineligibleForAppeal?: boolean | undefined;
              isCascading?: boolean | undefined;
            }
          | undefined;
        blockHistory?:
          | Array<
              | {
                  action: "blocked";
                  reason: string;
                  statusCode: number;
                  createdAt: number;
                  caseId?: string | undefined;
                  actor?: string | undefined;
                  comment?: string | undefined;
                  ineligibleForAppeal?: boolean | undefined;
                  isCascading?: boolean | undefined;
                }
              | {
                  action: "unblocked";
                  createdAt: number;
                  caseId?: string | undefined;
                  actor?: string | undefined;
                  comment?: string | undefined;
                  ineligibleForAppeal?: boolean | undefined;
                  isCascading?: boolean | undefined;
                }
              | {
                  action: "route-blocked";
                  route:
                    | { src: string; status: number; expiry?: number | undefined }
                    | {
                        has: Array<
                          | { type: "header"; key: "x-vercel-ip-country"; value: { eq: string } }
                          | { type: "host"; value: { eq: string } }
                        >;
                        mitigate: { action: "block_legal_cwc" };
                        src?: string | undefined;
                      };
                  reason: string;
                  createdAt: number;
                  caseId?: string | undefined;
                  actor?: string | undefined;
                  comment?: string | undefined;
                  ineligibleForAppeal?: boolean | undefined;
                  isCascading?: boolean | undefined;
                }
              | {
                  action: "route-unblocked";
                  route:
                    | { src: string; status: number; expiry?: number | undefined }
                    | {
                        has: Array<
                          | { type: "header"; key: "x-vercel-ip-country"; value: { eq: string } }
                          | { type: "host"; value: { eq: string } }
                        >;
                        mitigate: { action: "block_legal_cwc" };
                        src?: string | undefined;
                      };
                  statusCode?: number | undefined;
                  createdAt: number;
                  caseId?: string | undefined;
                  actor?: string | undefined;
                  comment?: string | undefined;
                  ineligibleForAppeal?: boolean | undefined;
                  isCascading?: boolean | undefined;
                }
            >
          | undefined;
        interstitial?: boolean | undefined;
        interstitialHistory?:
          | Array<{
              action:
                | "add-deployment-interstitial"
                | "add-project-interstitial"
                | "remove-deployment-interstitial"
                | "remove-project-interstitial";
              createdAt: number;
              caseId?: string | undefined;
              reason?: string | undefined;
              actor?: string | undefined;
              comment?: string | undefined;
            }>
          | undefined;
      }
    | undefined;
  internalRoutes?:
    | Array<
        | { src: string; status: number; expiry?: number | undefined }
        | {
            has: Array<
              | { type: "header"; key: "x-vercel-ip-country"; value: { eq: string } }
              | { type: "host"; value: { eq: string } }
            >;
            mitigate: { action: "block_legal_cwc" };
            src?: string | undefined;
          }
      >
    | undefined;
  hasDeployments?: boolean | undefined;
  dismissedToasts?:
    | Array<{
        key: string;
        dismissedAt: number;
        action: "accept" | "cancel" | "delete";
        value:
          | string
          | number
          | { previousValue: string | number | boolean; currentValue: string | number | boolean }
          | boolean
          | null;
      }>
    | undefined;
  protectedSourcemaps?: boolean | undefined;
  tracing?:
    | {
        domains?: string | undefined;
        ignorePaths?: Array<string> | undefined;
        samplingRules?:
          | Array<{
              rate: number;
              env?: ("preview" | "production") | undefined;
              requestPath?: string | undefined;
              destination?: ("external" | "internal") | undefined;
            }>
          | undefined;
      }
    | undefined;
  avatar?: (string | null) | undefined;
};

export type PatchV9ProjectsIdOrNameInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PatchV9ProjectsIdOrNameBody;
};

export type PatchV9ProjectsIdOrNameHandler = (
  input: PatchV9ProjectsIdOrNameInput,
) => Promise<PatchV9ProjectsIdOrNameResponse>;

export type DeleteV9ProjectsIdOrNameInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type DeleteV9ProjectsIdOrNameHandler = (
  input: DeleteV9ProjectsIdOrNameInput,
) => Promise<void>;

export type PostV1ProjectsIdOrNameAvatarResponse = {
  accountId: string;
  creator?:
    | (
        | {
            type: "user";
            via:
              | { type: "app"; app: { id: string; clientId?: string | undefined } }
              | {
                  type: "integration";
                  integration: { integrationId: string; configurationId: string };
                }
              | null;
            user: { id: string };
          }
        | { type: "app"; app: { id: string; clientId?: string | undefined } }
        | { type: "integration"; integration: { integrationId: string; configurationId: string } }
        | { type: "system" }
      )
    | undefined;
  alias: Array<{
    configuredBy?: ("A" | "CNAME" | "dns-01" | "http" | "null" | null) | undefined;
    configuredChangedAt?: (number | null) | undefined;
    createdAt?: (number | null) | undefined;
    deployment: {
      id: string;
      alias?: Array<string> | undefined;
      aliasAssigned?: (number | boolean | null) | undefined;
      aliasError?: ({ code: string; message: string } | null) | undefined;
      aliasFinal?: (string | null) | undefined;
      automaticAliases?: Array<string> | undefined;
      branchMatcher?: { type: "endsWith" | "equals" | "startsWith"; pattern: string } | undefined;
      buildingAt?: number | undefined;
      builds?:
        | Array<{ use: string; src?: string | undefined; dest?: string | undefined }>
        | undefined;
      checksConclusion?: ("canceled" | "failed" | "skipped" | "succeeded") | undefined;
      checksState?: ("completed" | "registered" | "running") | undefined;
      connectBuildsEnabled?: boolean | undefined;
      connectConfigurationId?: string | undefined;
      createdAt: number;
      createdIn: string;
      creator: {
        email: string;
        githubLogin?: string | undefined;
        gitlabLogin?: string | undefined;
        uid: string;
        username: string;
      } | null;
      deletedAt?: number | undefined;
      deploymentHostname: string;
      forced?: boolean | undefined;
      name: string;
      meta?: Record<string, string> | undefined;
      monorepoManager?: (string | null) | undefined;
      oidcTokenClaims?:
        | {
            iss: string;
            sub: string;
            scope: string;
            aud: string;
            owner: string;
            owner_id: string;
            project: string;
            project_id: string;
            environment: string;
            custom_environment_id?: string | undefined;
            mfe_group_ids?: Array<string> | undefined;
            plan?: string | undefined;
          }
        | undefined;
      plan: "enterprise" | "hobby" | "pro";
      previewCommentsEnabled?: boolean | undefined;
      private: boolean;
      readyAt?: number | undefined;
      readyState:
        | "BLOCKED"
        | "BUILDING"
        | "CANCELED"
        | "ERROR"
        | "INITIALIZING"
        | "QUEUED"
        | "READY";
      readySubstate?: ("PROMOTED" | "ROLLING" | "STAGED") | undefined;
      requestedAt?: number | undefined;
      target?: (string | null) | undefined;
      teamId?: (string | null) | undefined;
      type: "LAMBDAS";
      url: string;
      userId?: string | undefined;
      withCache?: boolean | undefined;
    } | null;
    domain: string;
    environment: "preview" | "production";
    gitBranch?: (string | null) | undefined;
    redirect?: (string | null) | undefined;
    redirectStatusCode?: (number | null) | undefined;
    target: "PREVIEW" | "PRODUCTION" | "STAGING";
  }>;
  analytics?:
    | {
        id: string;
        canceledAt?: (number | null) | undefined;
        disabledAt: number;
        enabledAt: number;
        paidAt?: number | undefined;
        sampleRatePercent?: (number | null) | undefined;
        spendLimitInDollars?: (number | null) | undefined;
      }
    | undefined;
  appliedCve55182Migration?: boolean | undefined;
  speedInsights?:
    | {
        id: string;
        enabledAt?: number | undefined;
        disabledAt?: number | undefined;
        canceledAt?: number | undefined;
        hasData?: boolean | undefined;
        dataReceivedAt?: number | undefined;
        paidAt?: number | undefined;
      }
    | undefined;
  autoExposeSystemEnvs?: boolean | undefined;
  autoAssignCustomDomains?: boolean | undefined;
  autoAssignCustomDomainsUpdatedBy?: string | undefined;
  buildCommand?: (string | null) | undefined;
  commandForIgnoringBuildStep?: (string | null) | undefined;
  connectConfigurations?:
    | (Array<{
        envId: string | "preview" | "production";
        connectConfigurationId: string;
        dc?: string | undefined;
        passive: boolean;
        buildsEnabled: boolean;
        aws?: { subnetIds: Array<string>; securityGroupId?: string | undefined } | undefined;
        createdAt: number;
        updatedAt: number;
      }> | null)
    | undefined;
  connectConfigurationId?: (string | null) | undefined;
  connectBuildsEnabled?: boolean | undefined;
  passiveConnectConfigurationId?: (string | null) | undefined;
  createdAt?: number | undefined;
  customerSupportCodeVisibility?: boolean | undefined;
  crons?:
    | {
        enabledAt: number;
        disabledAt: number | null;
        updatedAt: number;
        deploymentId: string | null;
        definitions: Array<{
          host: string;
          path: string;
          schedule: string;
          source?: "api" | undefined;
          description?: string | undefined;
          hostInferred?: boolean | undefined;
        }>;
      }
    | undefined;
  dataCache?:
    | {
        userDisabled: boolean;
        storageSizeBytes?: (number | null) | undefined;
        unlimited?: boolean | undefined;
      }
    | undefined;
  deploymentExpiration: {
    expirationDays?: number | undefined;
    expirationDaysProduction?: number | undefined;
    expirationDaysCanceled?: number | undefined;
    expirationDaysErrored?: number | undefined;
    deploymentsToKeep?: number | undefined;
  };
  expiration?: ({ expiresAt: number } | { lockedAt: number; lockedBy: string }) | undefined;
  devCommand?: (string | null) | undefined;
  directoryListing: boolean;
  installCommand?: (string | null) | undefined;
  env?:
    | Array<{
        target?:
          | (
              | Array<"development" | "development" | "preview" | "preview" | "production">
              | "development"
              | "development"
              | "preview"
              | "preview"
              | "production"
            )
          | undefined;
        type: "encrypted" | "plain" | "secret" | "sensitive" | "system";
        sunsetSecretId?: string | undefined;
        legacyValue?: string | undefined;
        decrypted?: boolean | undefined;
        value: string;
        vsmValue?: string | undefined;
        id?: string | undefined;
        key: string;
        configurationId?: (string | null) | undefined;
        createdAt?: number | undefined;
        updatedAt?: number | undefined;
        createdBy?: (string | null) | undefined;
        updatedBy?: (string | null) | undefined;
        gitBranch?: string | undefined;
        visibility?: ("config" | "secret") | undefined;
        edgeConfigId?: (string | null) | undefined;
        edgeConfigTokenId?: (string | null) | undefined;
        contentHint?:
          | (
              | { type: "redis-url"; storeId: string }
              | { type: "redis-rest-api-url"; storeId: string }
              | { type: "redis-rest-api-token"; storeId: string }
              | { type: "redis-rest-api-read-only-token"; storeId: string }
              | { type: "blob-read-write-token"; storeId: string }
              | { type: "blob-store-id"; storeId: string }
              | { type: "blob-webhook-public-key"; storeId: string }
              | { type: "postgres-url"; storeId: string }
              | { type: "postgres-url-non-pooling"; storeId: string }
              | { type: "postgres-prisma-url"; storeId: string }
              | { type: "postgres-user"; storeId: string }
              | { type: "postgres-host"; storeId: string }
              | { type: "postgres-password"; storeId: string }
              | { type: "postgres-database"; storeId: string }
              | { type: "postgres-url-no-ssl"; storeId: string }
              | {
                  type: "integration-store-secret";
                  storeId: string;
                  integrationId: string;
                  integrationProductId: string;
                  integrationConfigurationId: string;
                }
              | { type: "flags-connection-string"; projectId: string }
              | null
            )
          | undefined;
        internalContentHint?: ({ type: "flags-secret"; encryptedValue: string } | null) | undefined;
        comment?: string | undefined;
        customEnvironmentIds?: Array<string> | undefined;
      }>
    | undefined;
  customEnvironments?:
    | Array<{
        id: string;
        slug: string;
        type: "development" | "preview" | "production";
        description?: string | undefined;
        branchMatcher?: { type: "endsWith" | "equals" | "startsWith"; pattern: string } | undefined;
        domains?:
          | Array<{
              name: string;
              apexName: string;
              projectId: string;
              redirect?: (string | null) | undefined;
              redirectStatusCode?: (number | null) | undefined;
              gitBranch?: (string | null) | undefined;
              customEnvironmentId?: (string | null) | undefined;
              updatedAt?: number | undefined;
              createdAt?: number | undefined;
              verified: boolean;
              verification?:
                | Array<{ type: string; domain: string; value: string; reason: string }>
                | undefined;
            }>
          | undefined;
        currentDeploymentAliases?: Array<string> | undefined;
        createdAt: number;
        updatedAt: number;
      }>
    | undefined;
  framework?:
    | (
        | "actix-web"
        | "angular"
        | "ash"
        | "astro"
        | "axum"
        | "blitzjs"
        | "brunch"
        | "bun"
        | "container"
        | "create-react-app"
        | "django"
        | "docusaurus"
        | "docusaurus-2"
        | "dojo"
        | "eleventy"
        | "elysia"
        | "ember"
        | "eve"
        | "express"
        | "fastapi"
        | "fasthtml"
        | "fastify"
        | "flask"
        | "gatsby"
        | "go"
        | "gridsome"
        | "h3"
        | "hexo"
        | "hono"
        | "hugo"
        | "hydrogen"
        | "ionic-angular"
        | "ionic-react"
        | "jekyll"
        | "koa"
        | "mastra"
        | "middleman"
        | "nestjs"
        | "nextjs"
        | "nitro"
        | "node"
        | "nuxtjs"
        | "parcel"
        | "polymer"
        | "preact"
        | "python"
        | "react-router"
        | "redwoodjs"
        | "remix"
        | "ruby"
        | "rust"
        | "saber"
        | "sanity"
        | "sanity-v2"
        | "sapper"
        | "scully"
        | "services"
        | "solidstart"
        | "solidstart-1"
        | "stencil"
        | "storybook"
        | "svelte"
        | "sveltekit"
        | "sveltekit-1"
        | "tanstack-start"
        | "tanstack-start-lovable"
        | "umijs"
        | "vite"
        | "vitepress"
        | "vue"
        | "vuepress"
        | "xmcp"
        | "zola"
        | "null"
        | null
      )
    | undefined;
  services?:
    | Array<{
        serviceName: string;
        serviceType?: ("cron" | "job" | "web" | "worker") | undefined;
        framework?:
          | (
              | "actix-web"
              | "angular"
              | "ash"
              | "astro"
              | "axum"
              | "blitzjs"
              | "brunch"
              | "bun"
              | "container"
              | "create-react-app"
              | "django"
              | "docusaurus"
              | "docusaurus-2"
              | "dojo"
              | "eleventy"
              | "elysia"
              | "ember"
              | "eve"
              | "express"
              | "fastapi"
              | "fasthtml"
              | "fastify"
              | "flask"
              | "gatsby"
              | "go"
              | "gridsome"
              | "h3"
              | "hexo"
              | "hono"
              | "hugo"
              | "hydrogen"
              | "ionic-angular"
              | "ionic-react"
              | "jekyll"
              | "koa"
              | "mastra"
              | "middleman"
              | "nestjs"
              | "nextjs"
              | "nitro"
              | "node"
              | "nuxtjs"
              | "parcel"
              | "polymer"
              | "preact"
              | "python"
              | "react-router"
              | "redwoodjs"
              | "remix"
              | "ruby"
              | "rust"
              | "saber"
              | "sanity"
              | "sanity-v2"
              | "sapper"
              | "scully"
              | "services"
              | "solidstart"
              | "solidstart-1"
              | "stencil"
              | "storybook"
              | "svelte"
              | "sveltekit"
              | "sveltekit-1"
              | "tanstack-start"
              | "tanstack-start-lovable"
              | "umijs"
              | "vite"
              | "vitepress"
              | "vue"
              | "vuepress"
              | "xmcp"
              | "zola"
            )
          | undefined;
        runtime?: string | undefined;
      }>
    | undefined;
  gitForkProtection?: boolean | undefined;
  gitLFS?: boolean | undefined;
  id: string;
  ipBuckets?:
    | Array<{ bucket: string; default?: boolean | undefined; supportUntil?: number | undefined }>
    | undefined;
  jobs?:
    | {
        lint?: { targets: Array<string> } | undefined;
        typecheck?: { targets: Array<string> } | undefined;
        "mfe-config-present"?: { targets: Array<string> } | undefined;
      }
    | undefined;
  latestDeployments?:
    | Array<{
        id: string;
        alias?: Array<string> | undefined;
        aliasAssigned?: (number | boolean | null) | undefined;
        aliasError?: ({ code: string; message: string } | null) | undefined;
        aliasFinal?: (string | null) | undefined;
        automaticAliases?: Array<string> | undefined;
        branchMatcher?: { type: "endsWith" | "equals" | "startsWith"; pattern: string } | undefined;
        buildingAt?: number | undefined;
        builds?:
          | Array<{ use: string; src?: string | undefined; dest?: string | undefined }>
          | undefined;
        checksConclusion?: ("canceled" | "failed" | "skipped" | "succeeded") | undefined;
        checksState?: ("completed" | "registered" | "running") | undefined;
        connectBuildsEnabled?: boolean | undefined;
        connectConfigurationId?: string | undefined;
        createdAt: number;
        createdIn: string;
        creator: {
          email: string;
          githubLogin?: string | undefined;
          gitlabLogin?: string | undefined;
          uid: string;
          username: string;
        } | null;
        deletedAt?: number | undefined;
        deploymentHostname: string;
        forced?: boolean | undefined;
        name: string;
        meta?: Record<string, string> | undefined;
        monorepoManager?: (string | null) | undefined;
        oidcTokenClaims?:
          | {
              iss: string;
              sub: string;
              scope: string;
              aud: string;
              owner: string;
              owner_id: string;
              project: string;
              project_id: string;
              environment: string;
              custom_environment_id?: string | undefined;
              mfe_group_ids?: Array<string> | undefined;
              plan?: string | undefined;
            }
          | undefined;
        plan: "enterprise" | "hobby" | "pro";
        previewCommentsEnabled?: boolean | undefined;
        private: boolean;
        readyAt?: number | undefined;
        readyState:
          | "BLOCKED"
          | "BUILDING"
          | "CANCELED"
          | "ERROR"
          | "INITIALIZING"
          | "QUEUED"
          | "READY";
        readySubstate?: ("PROMOTED" | "ROLLING" | "STAGED") | undefined;
        requestedAt?: number | undefined;
        target?: (string | null) | undefined;
        teamId?: (string | null) | undefined;
        type: "LAMBDAS";
        url: string;
        userId?: string | undefined;
        withCache?: boolean | undefined;
      }>
    | undefined;
  link?:
    | (
        | {
            org: string;
            repoOwnerId?: number | undefined;
            repo?: string | undefined;
            repoId?: number | undefined;
            type: "github";
            createdAt?: number | undefined;
            deployHooks: Array<{
              createdAt?: number | undefined;
              id: string;
              name: string;
              ref: string;
              url: string;
            }>;
            gitCredentialId: string;
            updatedAt?: number | undefined;
            sourceless?: boolean | undefined;
            productionBranch: string;
          }
        | {
            type: "github-limited";
            repo?: string | undefined;
            repoId?: number | undefined;
            createdAt?: number | undefined;
            updatedAt?: number | undefined;
            org: string;
            repoOwnerId?: number | undefined;
            deployHooks: Array<{
              createdAt?: number | undefined;
              id: string;
              name: string;
              ref: string;
              url: string;
            }>;
            gitCredentialId: string;
            sourceless?: boolean | undefined;
            productionBranch: string;
          }
        | {
            org: string;
            repoOwnerId?: number | undefined;
            repo?: string | undefined;
            repoId?: number | undefined;
            type: "github-custom-host";
            host: string;
            createdAt?: number | undefined;
            deployHooks: Array<{
              createdAt?: number | undefined;
              id: string;
              name: string;
              ref: string;
              url: string;
            }>;
            gitCredentialId: string;
            updatedAt?: number | undefined;
            sourceless?: boolean | undefined;
            productionBranch: string;
          }
        | {
            projectId: string;
            projectName: string;
            projectNameWithNamespace: string;
            projectNamespace: string;
            projectOwnerId?: number | undefined;
            projectUrl: string;
            type: "gitlab";
            createdAt?: number | undefined;
            deployHooks: Array<{
              createdAt?: number | undefined;
              id: string;
              name: string;
              ref: string;
              url: string;
            }>;
            gitCredentialId: string;
            updatedAt?: number | undefined;
            sourceless?: boolean | undefined;
            productionBranch: string;
          }
        | {
            name: string;
            slug: string;
            owner: string;
            type: "bitbucket";
            uuid: string;
            workspaceUuid: string;
            createdAt?: number | undefined;
            deployHooks: Array<{
              createdAt?: number | undefined;
              id: string;
              name: string;
              ref: string;
              url: string;
            }>;
            gitCredentialId: string;
            updatedAt?: number | undefined;
            sourceless?: boolean | undefined;
            productionBranch: string;
          }
        | {
            org: string;
            repo: string;
            type: "vercel";
            createdAt?: number | undefined;
            deployHooks: Array<{
              createdAt?: number | undefined;
              id: string;
              name: string;
              ref: string;
              url: string;
            }>;
            gitCredentialId: string;
            updatedAt?: number | undefined;
            sourceless?: boolean | undefined;
            productionBranch: string;
          }
        | {
            owner: string;
            repo: string;
            repoId: string;
            ownerId: string;
            type: "cursor-origin";
            createdAt?: number | undefined;
            deployHooks: Array<{
              createdAt?: number | undefined;
              id: string;
              name: string;
              ref: string;
              url: string;
            }>;
            gitCredentialId: string;
            updatedAt?: number | undefined;
            sourceless?: boolean | undefined;
            productionBranch: string;
          }
      )
    | undefined;
  blobs?: { isDefaultApp?: boolean | undefined } | undefined;
  microfrontends?:
    | (
        | {
            isDefaultApp: true;
            updatedAt: number;
            groupIds: Array<string>;
            enabled: true;
            defaultRoute?: string | undefined;
            freeProjectForLegacyLimits?: boolean | undefined;
          }
        | {
            isDefaultApp?: false | undefined;
            routeObservabilityToThisProject?: boolean | undefined;
            doNotRouteWithMicrofrontendsRouting?: boolean | undefined;
            updatedAt: number;
            groupIds: Array<string>;
            enabled: true;
            defaultRoute?: string | undefined;
            freeProjectForLegacyLimits?: boolean | undefined;
          }
        | {
            updatedAt: number;
            groupIds: Array<unknown>;
            enabled: false;
            freeProjectForLegacyLimits?: boolean | undefined;
          }
      )
    | undefined;
  name: string;
  nodeVersion: "10.x" | "12.x" | "14.x" | "16.x" | "18.x" | "20.x" | "22.x" | "24.x" | "8.10.x";
  optionsAllowlist?: ({ paths: Array<{ value: string }> } | null) | undefined;
  outputDirectory?: (string | null) | undefined;
  passwordProtection?: (Record<string, never> | null) | undefined;
  passport?:
    | ({
        deploymentType:
          | "all"
          | "all_except_custom_domains"
          | "preview"
          | "prod_deployment_urls_and_all_previews";
        connectorId: string;
      } | null)
    | undefined;
  protectionConfig?:
    | { sandboxUrls?: { inheritDeploymentProtection?: boolean | undefined } | undefined }
    | undefined;
  sandbox?:
    | {
        region?:
          | (
              | "arn1"
              | "bom1"
              | "cdg1"
              | "cle1"
              | "cpt1"
              | "dub1"
              | "fra1"
              | "gru1"
              | "hkg1"
              | "hnd1"
              | "iad1"
              | "icn1"
              | "kix1"
              | "lhr1"
              | "pdx1"
              | "sfo1"
              | "sin1"
              | "syd1"
              | "yul1"
            )
          | undefined;
        failoverRegions?:
          | Array<
              | "arn1"
              | "bom1"
              | "cdg1"
              | "cle1"
              | "cpt1"
              | "dub1"
              | "fra1"
              | "gru1"
              | "hkg1"
              | "hnd1"
              | "iad1"
              | "icn1"
              | "kix1"
              | "lhr1"
              | "pdx1"
              | "sfo1"
              | "sin1"
              | "syd1"
              | "yul1"
            >
          | undefined;
      }
    | undefined;
  productionDeploymentsFastLane?: boolean | undefined;
  resourceConfig: {
    elasticConcurrencyEnabled?: boolean | undefined;
    fluid?: boolean | undefined;
    functionDefaultRegions: Array<string>;
    functionDefaultTimeout?: number | undefined;
    functionDefaultMemoryType?:
      | ("performance" | "performance_xl" | "standard" | "standard_legacy")
      | undefined;
    functionZeroConfigFailover?: boolean | undefined;
    buildMachineType?: ("basic" | "enhanced" | "standard" | "turbo") | undefined;
    buildMachineSelection?: ("elastic" | "fixed") | undefined;
    buildMachineElasticLastUpdated?: number | undefined;
    buildMachineElasticReason?:
      | (
          | "basic-floor"
          | "build-timeout-failure"
          | "enospc-failure"
          | "enterprise-floor"
          | "high-peak-disk"
          | "high-peak-memory"
          | "long-build-duration"
          | "oom-failure"
          | "short-build-duration"
          | "sustained-high-cpu"
        )
      | undefined;
    isNSNBDisabled?: boolean | undefined;
    buildQueue?:
      | { configuration?: ("SKIP_NAMESPACE_QUEUE" | "WAIT_FOR_NAMESPACE_QUEUE") | undefined }
      | undefined;
    enableFunctionsBeta?: boolean | undefined;
  };
  rollbackDescription?:
    | { userId: string; username: string; description: string; createdAt: number }
    | undefined;
  rollingRelease?:
    | ({
        target: string;
        stages?:
          | (Array<{
              targetPercentage: number;
              requireApproval?: boolean | undefined;
              duration?: number | undefined;
              linearShift?: boolean | undefined;
            }> | null)
          | undefined;
        canaryResponseHeader?: boolean | undefined;
        gate?:
          | {
              enabled: boolean;
              checks: Array<{
                type: "error-rate-5xx";
                minSampleSize?: number | undefined;
                excludeStatusCodes?: Array<number> | undefined;
                excludePaths?: Array<string> | undefined;
                ingestWatermarkSeconds?: number | undefined;
              }>;
              failureThreshold?: number | undefined;
              windowSize?: number | undefined;
              action: "pause" | "rollback";
              dryRun: boolean;
            }
          | undefined;
      } | null)
    | undefined;
  defaultResourceConfig: {
    elasticConcurrencyEnabled?: boolean | undefined;
    fluid?: boolean | undefined;
    functionDefaultRegions: Array<string>;
    functionDefaultTimeout?: number | undefined;
    functionDefaultMemoryType?:
      | ("performance" | "performance_xl" | "standard" | "standard_legacy")
      | undefined;
    functionZeroConfigFailover?: boolean | undefined;
    buildMachineType?: ("basic" | "enhanced" | "standard" | "turbo") | undefined;
    buildMachineSelection?: ("elastic" | "fixed") | undefined;
    buildMachineElasticLastUpdated?: number | undefined;
    buildMachineElasticReason?:
      | (
          | "basic-floor"
          | "build-timeout-failure"
          | "enospc-failure"
          | "enterprise-floor"
          | "high-peak-disk"
          | "high-peak-memory"
          | "long-build-duration"
          | "oom-failure"
          | "short-build-duration"
          | "sustained-high-cpu"
        )
      | undefined;
    isNSNBDisabled?: boolean | undefined;
    buildQueue?:
      | { configuration?: ("SKIP_NAMESPACE_QUEUE" | "WAIT_FOR_NAMESPACE_QUEUE") | undefined }
      | undefined;
    enableFunctionsBeta?: boolean | undefined;
  };
  rootDirectory?: (string | null) | undefined;
  serverlessFunctionZeroConfigFailover?: boolean | undefined;
  skewProtectionBoundaryAt?: number | undefined;
  skewProtectionMaxAge?: number | undefined;
  skewProtectionAllowedDomains?: Array<string> | undefined;
  skipGitConnectDuringLink?: boolean | undefined;
  staticIps?: { builds: boolean; enabled: boolean; regions: Array<string> } | undefined;
  sourceFilesOutsideRootDirectory?: boolean | undefined;
  enableAffectedProjectsDeployments?: boolean | undefined;
  enableExternalRewriteCaching?: boolean | undefined;
  ssoProtection?:
    | ({
        deploymentType:
          | "all"
          | "all_except_custom_domains"
          | "preview"
          | "prod_deployment_urls_and_all_previews";
        cve55182MigrationAppliedFrom?:
          | (
              | "all"
              | "all_except_custom_domains"
              | "preview"
              | "prod_deployment_urls_and_all_previews"
              | "null"
              | null
            )
          | undefined;
        april2026SecurityIncidentMigrationAppliedFrom?:
          | (
              | "all"
              | "all_except_custom_domains"
              | "preview"
              | "prod_deployment_urls_and_all_previews"
              | "null"
              | null
            )
          | undefined;
      } | null)
    | undefined;
  targets?:
    | Record<
        string,
        {
          id: string;
          alias?: Array<string> | undefined;
          aliasAssigned?: (number | boolean | null) | undefined;
          aliasError?: ({ code: string; message: string } | null) | undefined;
          aliasFinal?: (string | null) | undefined;
          automaticAliases?: Array<string> | undefined;
          branchMatcher?:
            | { type: "endsWith" | "equals" | "startsWith"; pattern: string }
            | undefined;
          buildingAt?: number | undefined;
          builds?:
            | Array<{ use: string; src?: string | undefined; dest?: string | undefined }>
            | undefined;
          checksConclusion?: ("canceled" | "failed" | "skipped" | "succeeded") | undefined;
          checksState?: ("completed" | "registered" | "running") | undefined;
          connectBuildsEnabled?: boolean | undefined;
          connectConfigurationId?: string | undefined;
          createdAt: number;
          createdIn: string;
          creator: {
            email: string;
            githubLogin?: string | undefined;
            gitlabLogin?: string | undefined;
            uid: string;
            username: string;
          } | null;
          deletedAt?: number | undefined;
          deploymentHostname: string;
          forced?: boolean | undefined;
          name: string;
          meta?: Record<string, string> | undefined;
          monorepoManager?: (string | null) | undefined;
          oidcTokenClaims?:
            | {
                iss: string;
                sub: string;
                scope: string;
                aud: string;
                owner: string;
                owner_id: string;
                project: string;
                project_id: string;
                environment: string;
                custom_environment_id?: string | undefined;
                mfe_group_ids?: Array<string> | undefined;
                plan?: string | undefined;
              }
            | undefined;
          plan: "enterprise" | "hobby" | "pro";
          previewCommentsEnabled?: boolean | undefined;
          private: boolean;
          readyAt?: number | undefined;
          readyState:
            | "BLOCKED"
            | "BUILDING"
            | "CANCELED"
            | "ERROR"
            | "INITIALIZING"
            | "QUEUED"
            | "READY";
          readySubstate?: ("PROMOTED" | "ROLLING" | "STAGED") | undefined;
          requestedAt?: number | undefined;
          target?: (string | null) | undefined;
          teamId?: (string | null) | undefined;
          type: "LAMBDAS";
          url: string;
          userId?: string | undefined;
          withCache?: boolean | undefined;
        } | null
      >
    | undefined;
  transferCompletedAt?: number | undefined;
  transferStartedAt?: number | undefined;
  transferToAccountId?: string | undefined;
  transferredFromAccountId?: string | undefined;
  updatedAt?: number | undefined;
  live?: boolean | undefined;
  enablePreviewFeedback?: (boolean | null) | undefined;
  enableProductionFeedback?: (boolean | null) | undefined;
  permissions?:
    | {
        oauth2Connection?: Array<ACLAction> | undefined;
        user?: Array<ACLAction> | undefined;
        userConnection?: Array<ACLAction> | undefined;
        userMfaConfiguration?: Array<ACLAction> | undefined;
        userPreference?: Array<ACLAction> | undefined;
        userSudo?: Array<ACLAction> | undefined;
        webAuthn?: Array<ACLAction> | undefined;
        accessGroup?: Array<ACLAction> | undefined;
        agent?: Array<ACLAction> | undefined;
        aiGatewayApiKey?: Array<ACLAction> | undefined;
        aiGatewayApiKeyBypassAll?: Array<ACLAction> | undefined;
        aiGatewayApiKeyOwnedBySelf?: Array<ACLAction> | undefined;
        aiGatewayApiKeySpendAttribution?: Array<ACLAction> | undefined;
        aiGatewayApiKeyZdrExemption?: Array<ACLAction> | undefined;
        aiGatewayBudget?: Array<ACLAction> | undefined;
        aiGatewayCredits?: Array<ACLAction> | undefined;
        aiGatewayPrivateModels?: Array<ACLAction> | undefined;
        aiGatewayGuardrails?: Array<ACLAction> | undefined;
        aiGatewayRules?: Array<ACLAction> | undefined;
        aiGatewaySettings?: Array<ACLAction> | undefined;
        aiGatewayUsage?: Array<ACLAction> | undefined;
        aiGatewayVirtualModelConfigs?: Array<ACLAction> | undefined;
        alerts?: Array<ACLAction> | undefined;
        alertRules?: Array<ACLAction> | undefined;
        aliasGlobal?: Array<ACLAction> | undefined;
        analyticsSampling?: Array<ACLAction> | undefined;
        analyticsUsage?: Array<ACLAction> | undefined;
        apiKey?: Array<ACLAction> | undefined;
        apiKeyAiGateway?: Array<ACLAction> | undefined;
        apiKeyOwnedBySelf?: Array<ACLAction> | undefined;
        oauth2Application?: Array<ACLAction> | undefined;
        vercelAppInstallation?: Array<ACLAction> | undefined;
        vercelAppInstallationRequest?: Array<ACLAction> | undefined;
        auditLog?: Array<ACLAction> | undefined;
        billingAddress?: Array<ACLAction> | undefined;
        billingInformation?: Array<ACLAction> | undefined;
        billingInvoice?: Array<ACLAction> | undefined;
        billingInvoiceEmailRecipient?: Array<ACLAction> | undefined;
        billingInvoiceLanguage?: Array<ACLAction> | undefined;
        billingPlan?: Array<ACLAction> | undefined;
        billingPurchaseOrder?: Array<ACLAction> | undefined;
        billingRefund?: Array<ACLAction> | undefined;
        billingTaxId?: Array<ACLAction> | undefined;
        blob?: Array<ACLAction> | undefined;
        blobStoreTokenSet?: Array<ACLAction> | undefined;
        budget?: Array<ACLAction> | undefined;
        cacheArtifact?: Array<ACLAction> | undefined;
        cacheArtifactUsageEvent?: Array<ACLAction> | undefined;
        codeChecks?: Array<ACLAction> | undefined;
        codeOwners?: Array<ACLAction> | undefined;
        ciInvocations?: Array<ACLAction> | undefined;
        ciLogs?: Array<ACLAction> | undefined;
        concurrentBuilds?: Array<ACLAction> | undefined;
        connect?: Array<ACLAction> | undefined;
        connectConfiguration?: Array<ACLAction> | undefined;
        connectLogs?: Array<ACLAction> | undefined;
        connexClient?: Array<ACLAction> | undefined;
        connexClientProject?: Array<ACLAction> | undefined;
        connexContact?: Array<ACLAction> | undefined;
        connexInstallation?: Array<ACLAction> | undefined;
        connexToken?: Array<ACLAction> | undefined;
        buildMachineDefault?: Array<ACLAction> | undefined;
        cursorOriginInstallation?: Array<ACLAction> | undefined;
        dataCacheBillingSettings?: Array<ACLAction> | undefined;
        defaultDeploymentProtection?: Array<ACLAction> | undefined;
        deploymentPolicy?: Array<ACLAction> | undefined;
        domain?: Array<ACLAction> | undefined;
        domainAcceptDelegation?: Array<ACLAction> | undefined;
        domainAuthCodes?: Array<ACLAction> | undefined;
        domainCertificate?: Array<ACLAction> | undefined;
        domainCheckConfig?: Array<ACLAction> | undefined;
        domainMove?: Array<ACLAction> | undefined;
        domainPurchase?: Array<ACLAction> | undefined;
        domainRecord?: Array<ACLAction> | undefined;
        domainTransferIn?: Array<ACLAction> | undefined;
        drain?: Array<ACLAction> | undefined;
        edgeConfig?: Array<ACLAction> | undefined;
        edgeConfigItem?: Array<ACLAction> | undefined;
        edgeConfigSchema?: Array<ACLAction> | undefined;
        edgeConfigToken?: Array<ACLAction> | undefined;
        endpointVerification?: Array<ACLAction> | undefined;
        event?: Array<ACLAction> | undefined;
        fileUpload?: Array<ACLAction> | undefined;
        flagsExplorerSubscription?: Array<ACLAction> | undefined;
        gitRepository?: Array<ACLAction> | undefined;
        imageOptimizationNewPrice?: Array<ACLAction> | undefined;
        integration?: Array<ACLAction> | undefined;
        integrationAccount?: Array<ACLAction> | undefined;
        integrationConfiguration?: Array<ACLAction> | undefined;
        integrationConfigurationProjects?: Array<ACLAction> | undefined;
        integrationConfigurationRole?: Array<ACLAction> | undefined;
        integrationConfigurationTransfer?: Array<ACLAction> | undefined;
        integrationDeploymentAction?: Array<ACLAction> | undefined;
        integrationEvent?: Array<ACLAction> | undefined;
        integrationLog?: Array<ACLAction> | undefined;
        integrationResource?: Array<ACLAction> | undefined;
        integrationResourceData?: Array<ACLAction> | undefined;
        integrationResourceReplCommand?: Array<ACLAction> | undefined;
        integrationResourceSecrets?: Array<ACLAction> | undefined;
        integrationSSOSession?: Array<ACLAction> | undefined;
        integrationStrict?: Array<ACLAction> | undefined;
        integrationStoreTokenSet?: Array<ACLAction> | undefined;
        integrationVercelConfigurationOverride?: Array<ACLAction> | undefined;
        integrationPullRequest?: Array<ACLAction> | undefined;
        ipBlocking?: Array<ACLAction> | undefined;
        jobGlobal?: Array<ACLAction> | undefined;
        kmsIssuer?: Array<ACLAction> | undefined;
        kmsProjectGrant?: Array<ACLAction> | undefined;
        logDrain?: Array<ACLAction> | undefined;
        marketplaceBillingData?: Array<ACLAction> | undefined;
        marketplaceExperimentationEdgeConfigData?: Array<ACLAction> | undefined;
        marketplaceExperimentationItem?: Array<ACLAction> | undefined;
        marketplaceFlexCommit?: Array<ACLAction> | undefined;
        marketplaceInstallationMember?: Array<ACLAction> | undefined;
        marketplaceInvoice?: Array<ACLAction> | undefined;
        marketplaceSettings?: Array<ACLAction> | undefined;
        Monitoring?: Array<ACLAction> | undefined;
        monitoringAlert?: Array<ACLAction> | undefined;
        monitoringChart?: Array<ACLAction> | undefined;
        monitoringQuery?: Array<ACLAction> | undefined;
        monitoringSettings?: Array<ACLAction> | undefined;
        notificationCustomerBudget?: Array<ACLAction> | undefined;
        notificationDeploymentFailed?: Array<ACLAction> | undefined;
        notificationDomainConfiguration?: Array<ACLAction> | undefined;
        notificationDomainExpire?: Array<ACLAction> | undefined;
        notificationDomainMoved?: Array<ACLAction> | undefined;
        notificationDomainPurchase?: Array<ACLAction> | undefined;
        notificationDomainRenewal?: Array<ACLAction> | undefined;
        notificationDomainTransfer?: Array<ACLAction> | undefined;
        notificationDomainUnverified?: Array<ACLAction> | undefined;
        NotificationMonitoringAlert?: Array<ACLAction> | undefined;
        notificationPaymentFailed?: Array<ACLAction> | undefined;
        notificationPreferences?: Array<ACLAction> | undefined;
        notificationStatementOfReasons?: Array<ACLAction> | undefined;
        notificationUsageAlert?: Array<ACLAction> | undefined;
        oidcFederationPolicy?: Array<ACLAction> | undefined;
        observabilityConfiguration?: Array<ACLAction> | undefined;
        observabilityFunnel?: Array<ACLAction> | undefined;
        observabilityNotebook?: Array<ACLAction> | undefined;
        openTelemetryEndpoint?: Array<ACLAction> | undefined;
        ownEvent?: Array<ACLAction> | undefined;
        organization?: Array<ACLAction> | undefined;
        organizationDomain?: Array<ACLAction> | undefined;
        organizationTeam?: Array<ACLAction> | undefined;
        passwordProtectionInvoiceItem?: Array<ACLAction> | undefined;
        paymentMethod?: Array<ACLAction> | undefined;
        permissions?: Array<ACLAction> | undefined;
        postgres?: Array<ACLAction> | undefined;
        postgresStoreTokenSet?: Array<ACLAction> | undefined;
        previewDeploymentSuffix?: Array<ACLAction> | undefined;
        privateCloudAccount?: Array<ACLAction> | undefined;
        projectTransferIn?: Array<ACLAction> | undefined;
        proTrialOnboarding?: Array<ACLAction> | undefined;
        rateLimit?: Array<ACLAction> | undefined;
        redis?: Array<ACLAction> | undefined;
        redisStoreTokenSet?: Array<ACLAction> | undefined;
        remoteCaching?: Array<ACLAction> | undefined;
        repository?: Array<ACLAction> | undefined;
        samlConfig?: Array<ACLAction> | undefined;
        secret?: Array<ACLAction> | undefined;
        securityConfig?: Array<ACLAction> | undefined;
        sensitiveEnvironmentVariablePolicy?: Array<ACLAction> | undefined;
        sharedEnvVars?: Array<ACLAction> | undefined;
        sharedEnvVarsProduction?: Array<ACLAction> | undefined;
        space?: Array<ACLAction> | undefined;
        spaceRun?: Array<ACLAction> | undefined;
        storeIsLocked?: Array<ACLAction> | undefined;
        storeTokenSetSensitive?: Array<ACLAction> | undefined;
        storeTransfer?: Array<ACLAction> | undefined;
        supportCase?: Array<ACLAction> | undefined;
        supportCaseComment?: Array<ACLAction> | undefined;
        team?: Array<ACLAction> | undefined;
        teamAccessRequest?: Array<ACLAction> | undefined;
        teamFellowMembership?: Array<ACLAction> | undefined;
        teamGitExclusivity?: Array<ACLAction> | undefined;
        teamInvite?: Array<ACLAction> | undefined;
        teamInviteCode?: Array<ACLAction> | undefined;
        teamInviteLink?: Array<ACLAction> | undefined;
        teamJoin?: Array<ACLAction> | undefined;
        teamMemberMfaStatus?: Array<ACLAction> | undefined;
        teamMicrofrontends?: Array<ACLAction> | undefined;
        teamOwnMembership?: Array<ACLAction> | undefined;
        teamOwnMembershipDisconnectSAML?: Array<ACLAction> | undefined;
        teamSudo?: Array<ACLAction> | undefined;
        teamTokenInvalidation?: Array<ACLAction> | undefined;
        token?: Array<ACLAction> | undefined;
        toolbarComment?: Array<ACLAction> | undefined;
        usage?: Array<ACLAction> | undefined;
        usageCycle?: Array<ACLAction> | undefined;
        vcrRepository?: Array<ACLAction> | undefined;
        vpcPeeringConnection?: Array<ACLAction> | undefined;
        webAnalyticsPlan?: Array<ACLAction> | undefined;
        webhook?: Array<ACLAction> | undefined;
        "webhook-event"?: Array<ACLAction> | undefined;
        aliasProject?: Array<ACLAction> | undefined;
        aliasProtectionBypass?: Array<ACLAction> | undefined;
        bulkRedirects?: Array<ACLAction> | undefined;
        buildMachine?: Array<ACLAction> | undefined;
        connectConfigurationLink?: Array<ACLAction> | undefined;
        dataCacheNamespace?: Array<ACLAction> | undefined;
        deployment?: Array<ACLAction> | undefined;
        deploymentBuildLogs?: Array<ACLAction> | undefined;
        deploymentCheck?: Array<ACLAction> | undefined;
        deploymentCheckPreview?: Array<ACLAction> | undefined;
        deploymentCheckReRunFromProductionBranch?: Array<ACLAction> | undefined;
        deploymentProductionGit?: Array<ACLAction> | undefined;
        deploymentV0?: Array<ACLAction> | undefined;
        deploymentPreview?: Array<ACLAction> | undefined;
        deploymentPrivate?: Array<ACLAction> | undefined;
        deploymentPromote?: Array<ACLAction> | undefined;
        deploymentRollback?: Array<ACLAction> | undefined;
        edgeCacheNamespace?: Array<ACLAction> | undefined;
        environments?: Array<ACLAction> | undefined;
        job?: Array<ACLAction> | undefined;
        logs?: Array<ACLAction> | undefined;
        logsPreset?: Array<ACLAction> | undefined;
        observabilityData?: Array<ACLAction> | undefined;
        onDemandBuild?: Array<ACLAction> | undefined;
        onDemandConcurrency?: Array<ACLAction> | undefined;
        optionsAllowlist?: Array<ACLAction> | undefined;
        passwordProtection?: Array<ACLAction> | undefined;
        privateLinkEndpoint?: Array<ACLAction> | undefined;
        productionAliasProtectionBypass?: Array<ACLAction> | undefined;
        productionShareableLink?: Array<ACLAction> | undefined;
        project?: Array<ACLAction> | undefined;
        projectAccessGroup?: Array<ACLAction> | undefined;
        projectAnalyticsSampling?: Array<ACLAction> | undefined;
        projectAnalyticsUsage?: Array<ACLAction> | undefined;
        projectCheck?: Array<ACLAction> | undefined;
        projectCheckRun?: Array<ACLAction> | undefined;
        projectDeploymentExpiration?: Array<ACLAction> | undefined;
        projectDeploymentHook?: Array<ACLAction> | undefined;
        projectDeploymentProtectionStrict?: Array<ACLAction> | undefined;
        projectDomain?: Array<ACLAction> | undefined;
        projectDomainCheckConfig?: Array<ACLAction> | undefined;
        projectDomainMove?: Array<ACLAction> | undefined;
        projectDomainVerify?: Array<ACLAction> | undefined;
        projectEvent?: Array<ACLAction> | undefined;
        projectEnvVars?: Array<ACLAction> | undefined;
        projectEnvVarsProduction?: Array<ACLAction> | undefined;
        projectEnvVarsUnownedByIntegration?: Array<ACLAction> | undefined;
        projectFlags?: Array<ACLAction> | undefined;
        projectFlagsProduction?: Array<ACLAction> | undefined;
        projectFlagsSdkKey?: Array<ACLAction> | undefined;
        projectFromV0?: Array<ACLAction> | undefined;
        projectId?: Array<ACLAction> | undefined;
        projectIntegrationConfiguration?: Array<ACLAction> | undefined;
        projectLink?: Array<ACLAction> | undefined;
        projectMember?: Array<ACLAction> | undefined;
        projectMonitoring?: Array<ACLAction> | undefined;
        projectOIDCToken?: Array<ACLAction> | undefined;
        projectPermissions?: Array<ACLAction> | undefined;
        projectProductionBranch?: Array<ACLAction> | undefined;
        projectProtectionBypass?: Array<ACLAction> | undefined;
        projectRollingRelease?: Array<ACLAction> | undefined;
        projectRoutes?: Array<ACLAction> | undefined;
        projectSupportCase?: Array<ACLAction> | undefined;
        projectSupportCaseComment?: Array<ACLAction> | undefined;
        projectTier?: Array<ACLAction> | undefined;
        projectTransfer?: Array<ACLAction> | undefined;
        projectTransferOut?: Array<ACLAction> | undefined;
        projectUsage?: Array<ACLAction> | undefined;
        pageIntegrity?: Array<ACLAction> | undefined;
        seawallConfig?: Array<ACLAction> | undefined;
        securityPlusConfiguration?: Array<ACLAction> | undefined;
        shareableLink?: Array<ACLAction> | undefined;
        shareableLinkStrict?: Array<ACLAction> | undefined;
        sharedEnvVarConnection?: Array<ACLAction> | undefined;
        skewProtection?: Array<ACLAction> | undefined;
        analytics?: Array<ACLAction> | undefined;
        trustedIps?: Array<ACLAction> | undefined;
        trustedSources?: Array<ACLAction> | undefined;
        v0Chat?: Array<ACLAction> | undefined;
        vercelAuth?: Array<ACLAction> | undefined;
        vercelRun?: Array<ACLAction> | undefined;
        webAnalytics?: Array<ACLAction> | undefined;
        workflowRunData?: Array<ACLAction> | undefined;
      }
    | undefined;
  lastRollbackTarget?: (Record<string, never> | null) | undefined;
  lastAliasRequest?:
    | ({
        fromDeploymentId: string | null;
        toDeploymentId: string;
        fromRollingReleaseId?: string | undefined;
        jobStatus: "failed" | "in-progress" | "pending" | "skipped" | "succeeded";
        requestedAt: number;
        type: "promote" | "rollback";
      } | null)
    | undefined;
  protectionBypass?:
    | Record<
        string,
        | {
            createdAt: number;
            createdBy: string;
            scope: "integration-automation-bypass";
            integrationId: string;
            configurationId: string;
          }
        | {
            createdAt: number;
            createdBy: string;
            scope: "automation-bypass";
            isEnvVar?: boolean | undefined;
            note?: string | undefined;
          }
      >
    | undefined;
  hasActiveBranches?: boolean | undefined;
  trustedIps?:
    | (
        | {
            deploymentType:
              | "all"
              | "all_except_custom_domains"
              | "preview"
              | "prod_deployment_urls_and_all_previews"
              | "production";
            addresses: Array<{ value: string; note?: string | undefined }>;
            protectionMode: "additional" | "exclusive";
          }
        | {
            deploymentType:
              | "all"
              | "all_except_custom_domains"
              | "preview"
              | "prod_deployment_urls_and_all_previews"
              | "production";
          }
        | null
      )
    | undefined;
  trustedSources?:
    | ({
        projects?:
          | Record<
              string,
              {
                label?: string | undefined;
                customAllow?:
                  | Array<{
                      from:
                        | { slugs: Array<string>; preset?: "all-custom" | undefined }
                        | { slugs?: Array<string> | undefined; preset: "all-custom" };
                      to:
                        | { slugs: Array<string>; preset?: "all-custom" | undefined }
                        | { slugs?: Array<string> | undefined; preset: "all-custom" };
                    }>
                  | undefined;
              }
            >
          | undefined;
        oidcProviders?:
          | Record<
              string,
              Array<{
                to:
                  | { slugs: Array<string>; preset?: "all-custom" | undefined }
                  | { slugs?: Array<string> | undefined; preset: "all-custom" };
                label?: string | undefined;
                claims: Record<string, Array<string>>;
              }>
            >
          | undefined;
      } | null)
    | undefined;
  gitComments?: { onPullRequest: boolean; onCommit: boolean } | undefined;
  gitProviderOptions?:
    | {
        createDeployments: "disabled" | "enabled";
        disableRepositoryDispatchEvents?: boolean | undefined;
        requireVerifiedCommits?: boolean | undefined;
        gitCommitStatus?: boolean | undefined;
        consolidatedGitCommitStatus?: { enabled: boolean; propagateFailures: boolean } | undefined;
      }
    | undefined;
  paused?: boolean | undefined;
  concurrencyBucketName?: string | undefined;
  webAnalytics?:
    | {
        id: string;
        disabledAt?: number | undefined;
        canceledAt?: number | undefined;
        enabledAt?: number | undefined;
        hasData?: true | undefined;
      }
    | undefined;
  security?:
    | {
        attackModeEnabled?: boolean | undefined;
        attackModeUpdatedAt?: number | undefined;
        firewallEnabled?: boolean | undefined;
        firewallUpdatedAt?: number | undefined;
        attackModeActiveUntil?: (number | null) | undefined;
        firewallConfigVersion?: number | undefined;
        rulesets?:
          | Record<
              string,
              {
                action:
                  | "allow"
                  | "bypass"
                  | "challenge"
                  | "deny"
                  | "log"
                  | "rate_limit"
                  | "redirect";
                rateLimit?:
                  | ({
                      algo: "fixed_window" | "token_bucket";
                      window: number;
                      limit: number;
                      keys: Array<string>;
                    } | null)
                  | undefined;
                redirect?: ({ location: string; permanent: boolean } | null) | undefined;
                actionDuration?: (string | null) | undefined;
                bypassSystem?: (boolean | null) | undefined;
                logHeaders?: (Array<string> | "*") | undefined;
              }
            >
          | undefined;
        firewallSeawallEnabled?: boolean | undefined;
        ja3Enabled?: boolean | undefined;
        ja4Enabled?: boolean | undefined;
        firewallBypassIps?: Array<string> | undefined;
        managedRules?:
          | ({
              vercel_ruleset: {
                active: boolean;
                action?: ("challenge" | "deny" | "log") | undefined;
              };
              traffic_sources: {
                active: boolean;
                action?: ("challenge" | "deny" | "log") | undefined;
              };
              bot_filter: { active: boolean; action?: ("challenge" | "deny" | "log") | undefined };
              ai_bots: { active: boolean; action?: ("challenge" | "deny" | "log") | undefined };
              owasp: { active: boolean; action?: ("challenge" | "deny" | "log") | undefined };
            } | null)
          | undefined;
        botIdEnabled?: boolean | undefined;
        log_headers?: (Array<string> | "*") | undefined;
        securityPlus?: boolean | undefined;
        securityPlusMetadata?:
          | { updatedAt: number; firstEnabledAt?: number | undefined }
          | undefined;
        pageIntegrityEnabled?: boolean | undefined;
      }
    | undefined;
  oidcTokenConfig?:
    | { enabled?: boolean | undefined; issuerMode?: ("global" | "team") | undefined }
    | undefined;
  deploymentPolicy?:
    | ({
        gitSources?:
          | (Array<{
              sources: Array<
                | { provider: "bitbucket" | "github"; org: string; repo?: string | undefined }
                | { provider: "gitlab"; namespace: string; project?: string | undefined }
              >;
              enabled: boolean;
              environments: Array<
                | { type: "system"; target: "preview" | "production" }
                | { type: "custom"; environmentId: string }
              >;
            }> | null)
          | undefined;
        deploymentSources?:
          | (Array<{
              sources: Array<"cli" | "deploy-hook" | "git" | "integration" | "rest-api" | "v0">;
              enabled: boolean;
              environments: Array<
                | { type: "system"; target: "preview" | "production" }
                | { type: "custom"; environmentId: string }
              >;
            }> | null)
          | undefined;
      } | null)
    | undefined;
  tier?: ("advanced" | "critical") | undefined;
  usageStatus?:
    | {
        kind: "flat";
        exceededAllowanceUntil?: number | undefined;
        bypassThrottleUntil?: number | undefined;
        throttled?: boolean | undefined;
        teamThrottled?: boolean | undefined;
      }
    | undefined;
  features?: { webAnalytics?: boolean | undefined } | undefined;
  v0?: boolean | undefined;
  v0Created?: boolean | undefined;
  abuse?:
    | {
        scanner?: string | undefined;
        history: Array<{ scanner: string; reason: string; by: string; byId: string; at: number }>;
        updatedAt: number;
        block?:
          | {
              action: "blocked";
              reason: string;
              statusCode: number;
              createdAt: number;
              caseId?: string | undefined;
              actor?: string | undefined;
              comment?: string | undefined;
              ineligibleForAppeal?: boolean | undefined;
              isCascading?: boolean | undefined;
            }
          | undefined;
        blockHistory?:
          | Array<
              | {
                  action: "blocked";
                  reason: string;
                  statusCode: number;
                  createdAt: number;
                  caseId?: string | undefined;
                  actor?: string | undefined;
                  comment?: string | undefined;
                  ineligibleForAppeal?: boolean | undefined;
                  isCascading?: boolean | undefined;
                }
              | {
                  action: "unblocked";
                  createdAt: number;
                  caseId?: string | undefined;
                  actor?: string | undefined;
                  comment?: string | undefined;
                  ineligibleForAppeal?: boolean | undefined;
                  isCascading?: boolean | undefined;
                }
              | {
                  action: "route-blocked";
                  route:
                    | { src: string; status: number; expiry?: number | undefined }
                    | {
                        has: Array<
                          | { type: "header"; key: "x-vercel-ip-country"; value: { eq: string } }
                          | { type: "host"; value: { eq: string } }
                        >;
                        mitigate: { action: "block_legal_cwc" };
                        src?: string | undefined;
                      };
                  reason: string;
                  createdAt: number;
                  caseId?: string | undefined;
                  actor?: string | undefined;
                  comment?: string | undefined;
                  ineligibleForAppeal?: boolean | undefined;
                  isCascading?: boolean | undefined;
                }
              | {
                  action: "route-unblocked";
                  route:
                    | { src: string; status: number; expiry?: number | undefined }
                    | {
                        has: Array<
                          | { type: "header"; key: "x-vercel-ip-country"; value: { eq: string } }
                          | { type: "host"; value: { eq: string } }
                        >;
                        mitigate: { action: "block_legal_cwc" };
                        src?: string | undefined;
                      };
                  statusCode?: number | undefined;
                  createdAt: number;
                  caseId?: string | undefined;
                  actor?: string | undefined;
                  comment?: string | undefined;
                  ineligibleForAppeal?: boolean | undefined;
                  isCascading?: boolean | undefined;
                }
            >
          | undefined;
        interstitial?: boolean | undefined;
        interstitialHistory?:
          | Array<{
              action:
                | "add-deployment-interstitial"
                | "add-project-interstitial"
                | "remove-deployment-interstitial"
                | "remove-project-interstitial";
              createdAt: number;
              caseId?: string | undefined;
              reason?: string | undefined;
              actor?: string | undefined;
              comment?: string | undefined;
            }>
          | undefined;
      }
    | undefined;
  internalRoutes?:
    | Array<
        | { src: string; status: number; expiry?: number | undefined }
        | {
            has: Array<
              | { type: "header"; key: "x-vercel-ip-country"; value: { eq: string } }
              | { type: "host"; value: { eq: string } }
            >;
            mitigate: { action: "block_legal_cwc" };
            src?: string | undefined;
          }
      >
    | undefined;
  hasDeployments?: boolean | undefined;
  dismissedToasts?:
    | Array<{
        key: string;
        dismissedAt: number;
        action: "accept" | "cancel" | "delete";
        value:
          | string
          | number
          | { previousValue: string | number | boolean; currentValue: string | number | boolean }
          | boolean
          | null;
      }>
    | undefined;
  protectedSourcemaps?: boolean | undefined;
  tracing?:
    | {
        domains?: string | undefined;
        ignorePaths?: Array<string> | undefined;
        samplingRules?:
          | Array<{
              rate: number;
              env?: ("preview" | "production") | undefined;
              requestPath?: string | undefined;
              destination?: ("external" | "internal") | undefined;
            }>
          | undefined;
      }
    | undefined;
  avatar?: (string | null) | undefined;
};

export type PostV1ProjectsIdOrNameAvatarInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  bytes: Uint8Array;
};

export type PostV1ProjectsIdOrNameAvatarHandler = (
  input: PostV1ProjectsIdOrNameAvatarInput,
) => Promise<PostV1ProjectsIdOrNameAvatarResponse>;

export const patchV1ProjectsIdOrNameSharedConnectLinksBody = z.union([
  z.object({ builds: z.boolean(), regions: z.array(z.string().max(4)).optional() }),
  z.object({ builds: z.boolean().optional(), regions: z.array(z.string().max(4)) }),
]);

export type PatchV1ProjectsIdOrNameSharedConnectLinksBody =
  | { builds: boolean; regions?: Array<string> | undefined }
  | { builds?: boolean | undefined; regions: Array<string> };

export type PatchV1ProjectsIdOrNameSharedConnectLinksResponse = Array<{
  envId: string | "preview" | "production";
  connectConfigurationId: string;
  dc?: string | undefined;
  passive: boolean;
  buildsEnabled: boolean;
  aws?: { subnetIds: Array<string>; securityGroupId?: string | undefined } | undefined;
  createdAt: number;
  updatedAt: number;
}>;

export type PatchV1ProjectsIdOrNameSharedConnectLinksInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PatchV1ProjectsIdOrNameSharedConnectLinksBody;
};

export type PatchV1ProjectsIdOrNameSharedConnectLinksHandler = (
  input: PatchV1ProjectsIdOrNameSharedConnectLinksInput,
) => Promise<PatchV1ProjectsIdOrNameSharedConnectLinksResponse>;

export const postV9ProjectsIdOrNameCustomEnvironmentsBody = z.object({
  slug: z.string().max(32).optional(),
  description: z.string().max(256).optional(),
  branchMatcher: z
    .object({ type: z.enum(["equals", "startsWith", "endsWith"]), pattern: z.string().max(100) })
    .optional(),
  copyEnvVarsFrom: z.string().optional(),
});

export type PostV9ProjectsIdOrNameCustomEnvironmentsBody = {
  slug?: string | undefined;
  description?: string | undefined;
  branchMatcher?: { type: "equals" | "startsWith" | "endsWith"; pattern: string } | undefined;
  copyEnvVarsFrom?: string | undefined;
};

export type PostV9ProjectsIdOrNameCustomEnvironmentsResponse = {
  id: string;
  slug: string;
  type: "development" | "preview" | "production";
  description?: string | undefined;
  branchMatcher?: { type: "endsWith" | "equals" | "startsWith"; pattern: string } | undefined;
  domains?:
    | Array<{
        name: string;
        apexName: string;
        projectId: string;
        redirect?: (string | null) | undefined;
        redirectStatusCode?: (number | null) | undefined;
        gitBranch?: (string | null) | undefined;
        customEnvironmentId?: (string | null) | undefined;
        updatedAt?: number | undefined;
        createdAt?: number | undefined;
        verified: boolean;
        verification?:
          | Array<{ type: string; domain: string; value: string; reason: string }>
          | undefined;
      }>
    | undefined;
  currentDeploymentAliases?: Array<string> | undefined;
  createdAt: number;
  updatedAt: number;
};

export type PostV9ProjectsIdOrNameCustomEnvironmentsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV9ProjectsIdOrNameCustomEnvironmentsBody;
};

export type PostV9ProjectsIdOrNameCustomEnvironmentsHandler = (
  input: PostV9ProjectsIdOrNameCustomEnvironmentsInput,
) => Promise<PostV9ProjectsIdOrNameCustomEnvironmentsResponse>;

export type GetV9ProjectsIdOrNameCustomEnvironmentsResponse = {
  accountLimit: { total: number };
  environments: Array<{
    type: "development" | "preview" | "production";
    description?: string | undefined;
    createdAt: number;
    updatedAt: number;
    slug: string;
    id: string;
    domains?:
      | Array<{
          name: string;
          apexName: string;
          projectId: string;
          redirect?: (string | null) | undefined;
          redirectStatusCode?: (number | null) | undefined;
          gitBranch?: (string | null) | undefined;
          customEnvironmentId?: (string | null) | undefined;
          updatedAt?: number | undefined;
          createdAt?: number | undefined;
          verified: boolean;
          verification?:
            | Array<{ type: string; domain: string; value: string; reason: string }>
            | undefined;
        }>
      | undefined;
    branchMatcher?: { type: "endsWith" | "equals" | "startsWith"; pattern: string } | undefined;
    currentDeploymentAliases?: Array<string> | undefined;
  }>;
};

export type GetV9ProjectsIdOrNameCustomEnvironmentsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string };
  query: { gitBranch?: string | undefined; teamId?: string | undefined; slug?: string | undefined };
};

export type GetV9ProjectsIdOrNameCustomEnvironmentsHandler = (
  input: GetV9ProjectsIdOrNameCustomEnvironmentsInput,
) => Promise<GetV9ProjectsIdOrNameCustomEnvironmentsResponse>;

export type GetV9ProjectsIdOrNameCustomEnvironmentsEnvironmentSlugOrIdResponse = {
  id: string;
  slug: string;
  type: "development" | "preview" | "production";
  description?: string | undefined;
  branchMatcher?: { type: "endsWith" | "equals" | "startsWith"; pattern: string } | undefined;
  domains?:
    | Array<{
        name: string;
        apexName: string;
        projectId: string;
        redirect?: (string | null) | undefined;
        redirectStatusCode?: (number | null) | undefined;
        gitBranch?: (string | null) | undefined;
        customEnvironmentId?: (string | null) | undefined;
        updatedAt?: number | undefined;
        createdAt?: number | undefined;
        verified: boolean;
        verification?:
          | Array<{ type: string; domain: string; value: string; reason: string }>
          | undefined;
      }>
    | undefined;
  currentDeploymentAliases?: Array<string> | undefined;
  createdAt: number;
  updatedAt: number;
};

export type GetV9ProjectsIdOrNameCustomEnvironmentsEnvironmentSlugOrIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string; environmentSlugOrId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV9ProjectsIdOrNameCustomEnvironmentsEnvironmentSlugOrIdHandler = (
  input: GetV9ProjectsIdOrNameCustomEnvironmentsEnvironmentSlugOrIdInput,
) => Promise<GetV9ProjectsIdOrNameCustomEnvironmentsEnvironmentSlugOrIdResponse>;

export const patchV9ProjectsIdOrNameCustomEnvironmentsEnvironmentSlugOrIdBody = z.object({
  slug: z.string().max(32).optional(),
  description: z.string().max(256).optional(),
  branchMatcher: z
    .object({ type: z.enum(["equals", "startsWith", "endsWith"]), pattern: z.string().max(100) })
    .nullable()
    .optional(),
});

export type PatchV9ProjectsIdOrNameCustomEnvironmentsEnvironmentSlugOrIdBody = {
  slug?: string | undefined;
  description?: string | undefined;
  branchMatcher?:
    | ({ type: "equals" | "startsWith" | "endsWith"; pattern: string } | null)
    | undefined;
};

export type PatchV9ProjectsIdOrNameCustomEnvironmentsEnvironmentSlugOrIdResponse = {
  id: string;
  slug: string;
  type: "development" | "preview" | "production";
  description?: string | undefined;
  branchMatcher?: { type: "endsWith" | "equals" | "startsWith"; pattern: string } | undefined;
  domains?:
    | Array<{
        name: string;
        apexName: string;
        projectId: string;
        redirect?: (string | null) | undefined;
        redirectStatusCode?: (number | null) | undefined;
        gitBranch?: (string | null) | undefined;
        customEnvironmentId?: (string | null) | undefined;
        updatedAt?: number | undefined;
        createdAt?: number | undefined;
        verified: boolean;
        verification?:
          | Array<{ type: string; domain: string; value: string; reason: string }>
          | undefined;
      }>
    | undefined;
  currentDeploymentAliases?: Array<string> | undefined;
  createdAt: number;
  updatedAt: number;
};

export type PatchV9ProjectsIdOrNameCustomEnvironmentsEnvironmentSlugOrIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string; environmentSlugOrId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PatchV9ProjectsIdOrNameCustomEnvironmentsEnvironmentSlugOrIdBody;
};

export type PatchV9ProjectsIdOrNameCustomEnvironmentsEnvironmentSlugOrIdHandler = (
  input: PatchV9ProjectsIdOrNameCustomEnvironmentsEnvironmentSlugOrIdInput,
) => Promise<PatchV9ProjectsIdOrNameCustomEnvironmentsEnvironmentSlugOrIdResponse>;

export const deleteV9ProjectsIdOrNameCustomEnvironmentsEnvironmentSlugOrIdBody = z.object({
  deleteUnassignedEnvironmentVariables: z.boolean().optional(),
});

export type DeleteV9ProjectsIdOrNameCustomEnvironmentsEnvironmentSlugOrIdBody = {
  deleteUnassignedEnvironmentVariables?: boolean | undefined;
};

export type DeleteV9ProjectsIdOrNameCustomEnvironmentsEnvironmentSlugOrIdResponse = {
  id: string;
  slug: string;
  type: "development" | "preview" | "production";
  description?: string | undefined;
  branchMatcher?: { type: "endsWith" | "equals" | "startsWith"; pattern: string } | undefined;
  domains?:
    | Array<{
        name: string;
        apexName: string;
        projectId: string;
        redirect?: (string | null) | undefined;
        redirectStatusCode?: (number | null) | undefined;
        gitBranch?: (string | null) | undefined;
        customEnvironmentId?: (string | null) | undefined;
        updatedAt?: number | undefined;
        createdAt?: number | undefined;
        verified: boolean;
        verification?:
          | Array<{ type: string; domain: string; value: string; reason: string }>
          | undefined;
      }>
    | undefined;
  currentDeploymentAliases?: Array<string> | undefined;
  createdAt: number;
  updatedAt: number;
};

export type DeleteV9ProjectsIdOrNameCustomEnvironmentsEnvironmentSlugOrIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string; environmentSlugOrId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: DeleteV9ProjectsIdOrNameCustomEnvironmentsEnvironmentSlugOrIdBody;
};

export type DeleteV9ProjectsIdOrNameCustomEnvironmentsEnvironmentSlugOrIdHandler = (
  input: DeleteV9ProjectsIdOrNameCustomEnvironmentsEnvironmentSlugOrIdInput,
) => Promise<DeleteV9ProjectsIdOrNameCustomEnvironmentsEnvironmentSlugOrIdResponse>;

export type GetV9ProjectsIdOrNameDomainsResponse =
  | {
      domains: Array<{
        name: string;
        apexName: string;
        projectId: string;
        redirect?: (string | null) | undefined;
        redirectStatusCode?: (number | null) | undefined;
        gitBranch?: (string | null) | undefined;
        customEnvironmentId?: (string | null) | undefined;
        updatedAt?: number | undefined;
        createdAt?: number | undefined;
        verified: boolean;
        verification?:
          | Array<{ type: string; domain: string; value: string; reason: string }>
          | undefined;
      }>;
      pagination: { count: number; next: number | null; prev: number | null };
    }
  | {
      domains: Array<{
        name: string;
        apexName: string;
        projectId: string;
        redirect?: (string | null) | undefined;
        redirectStatusCode?: (number | null) | undefined;
        gitBranch?: (string | null) | undefined;
        customEnvironmentId?: (string | null) | undefined;
        updatedAt?: number | undefined;
        createdAt?: number | undefined;
        verified: boolean;
        verification?:
          | Array<{ type: string; domain: string; value: string; reason: string }>
          | undefined;
      }>;
      pagination: Pagination;
    };

export type GetV9ProjectsIdOrNameDomainsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string };
  query: {
    production?: ("true" | "false") | undefined;
    target?: ("production" | "preview") | undefined;
    customEnvironmentId?: string | undefined;
    gitBranch?: string | undefined;
    redirects?: ("true" | "false") | undefined;
    redirect?: string | undefined;
    verified?: ("true" | "false") | undefined;
    limit?: number | undefined;
    since?: number | undefined;
    until?: number | undefined;
    order?: ("ASC" | "DESC") | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV9ProjectsIdOrNameDomainsHandler = (
  input: GetV9ProjectsIdOrNameDomainsInput,
) => Promise<GetV9ProjectsIdOrNameDomainsResponse>;

export type GetV9ProjectsIdOrNameDomainsDomainResponse = {
  name: string;
  apexName: string;
  projectId: string;
  redirect?: (string | null) | undefined;
  redirectStatusCode?: (number | null) | undefined;
  gitBranch?: (string | null) | undefined;
  customEnvironmentId?: (string | null) | undefined;
  updatedAt?: number | undefined;
  createdAt?: number | undefined;
  verified: boolean;
  verification?: Array<{ type: string; domain: string; value: string; reason: string }> | undefined;
};

export type GetV9ProjectsIdOrNameDomainsDomainInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string; domain: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV9ProjectsIdOrNameDomainsDomainHandler = (
  input: GetV9ProjectsIdOrNameDomainsDomainInput,
) => Promise<GetV9ProjectsIdOrNameDomainsDomainResponse>;

export const patchV9ProjectsIdOrNameDomainsDomainBody = z.object({
  gitBranch: z.string().max(250).nullable().optional(),
  redirect: z.string().nullable().optional(),
  redirectStatusCode: z
    .union([z.literal(null), z.literal(301), z.literal(302), z.literal(307), z.literal(308)])
    .nullable()
    .optional(),
});

export type PatchV9ProjectsIdOrNameDomainsDomainBody = {
  gitBranch?: (string | null) | undefined;
  redirect?: (string | null) | undefined;
  redirectStatusCode?: (301 | 302 | 307 | 308 | null) | undefined;
};

export type PatchV9ProjectsIdOrNameDomainsDomainResponse = {
  name: string;
  apexName: string;
  projectId: string;
  redirect?: (string | null) | undefined;
  redirectStatusCode?: (number | null) | undefined;
  gitBranch?: (string | null) | undefined;
  customEnvironmentId?: (string | null) | undefined;
  updatedAt?: number | undefined;
  createdAt?: number | undefined;
  verified: boolean;
  verification?: Array<{ type: string; domain: string; value: string; reason: string }> | undefined;
};

export type PatchV9ProjectsIdOrNameDomainsDomainInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string; domain: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PatchV9ProjectsIdOrNameDomainsDomainBody;
};

export type PatchV9ProjectsIdOrNameDomainsDomainHandler = (
  input: PatchV9ProjectsIdOrNameDomainsDomainInput,
) => Promise<PatchV9ProjectsIdOrNameDomainsDomainResponse>;

export const deleteV9ProjectsIdOrNameDomainsDomainBody = z.object({
  removeRedirects: z.boolean().optional(),
});

export type DeleteV9ProjectsIdOrNameDomainsDomainBody = { removeRedirects?: boolean | undefined };

export type DeleteV9ProjectsIdOrNameDomainsDomainResponse = Record<string, never>;

export type DeleteV9ProjectsIdOrNameDomainsDomainInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string; domain: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: DeleteV9ProjectsIdOrNameDomainsDomainBody;
};

export type DeleteV9ProjectsIdOrNameDomainsDomainHandler = (
  input: DeleteV9ProjectsIdOrNameDomainsDomainInput,
) => Promise<DeleteV9ProjectsIdOrNameDomainsDomainResponse>;

export const postV10ProjectsIdOrNameDomainsBody = z.object({
  name: z.string(),
  gitBranch: z.string().max(250).nullable().optional(),
  customEnvironmentId: z.string().optional(),
  redirect: z.string().nullable().optional(),
  redirectStatusCode: z
    .union([z.literal(null), z.literal(301), z.literal(302), z.literal(307), z.literal(308)])
    .nullable()
    .optional(),
});

export type PostV10ProjectsIdOrNameDomainsBody = {
  name: string;
  gitBranch?: (string | null) | undefined;
  customEnvironmentId?: string | undefined;
  redirect?: (string | null) | undefined;
  redirectStatusCode?: (301 | 302 | 307 | 308 | null) | undefined;
};

export type PostV10ProjectsIdOrNameDomainsResponse = {
  name: string;
  apexName: string;
  projectId: string;
  redirect?: (string | null) | undefined;
  redirectStatusCode?: (number | null) | undefined;
  gitBranch?: (string | null) | undefined;
  customEnvironmentId?: (string | null) | undefined;
  updatedAt?: number | undefined;
  createdAt?: number | undefined;
  verified: boolean;
  verification?: Array<{ type: string; domain: string; value: string; reason: string }> | undefined;
};

export type PostV10ProjectsIdOrNameDomainsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV10ProjectsIdOrNameDomainsBody;
};

export type PostV10ProjectsIdOrNameDomainsHandler = (
  input: PostV10ProjectsIdOrNameDomainsInput,
) => Promise<PostV10ProjectsIdOrNameDomainsResponse>;

export const postV1ProjectsIdOrNameDomainsDomainMoveBody = z.object({
  projectId: z.string(),
  gitBranch: z.string().max(250).nullable().optional(),
  redirect: z.string().nullable().optional(),
  redirectStatusCode: z
    .union([z.literal(null), z.literal(301), z.literal(302), z.literal(307), z.literal(308)])
    .nullable()
    .optional(),
});

export type PostV1ProjectsIdOrNameDomainsDomainMoveBody = {
  projectId: string;
  gitBranch?: (string | null) | undefined;
  redirect?: (string | null) | undefined;
  redirectStatusCode?: (301 | 302 | 307 | 308 | null) | undefined;
};

export type PostV1ProjectsIdOrNameDomainsDomainMoveResponse = {
  name: string;
  apexName: string;
  projectId: string;
  redirect?: (string | null) | undefined;
  redirectStatusCode?: (number | null) | undefined;
  gitBranch?: (string | null) | undefined;
  customEnvironmentId?: (string | null) | undefined;
  updatedAt?: number | undefined;
  createdAt?: number | undefined;
  verified: boolean;
  verification?: Array<{ type: string; domain: string; value: string; reason: string }> | undefined;
};

export type PostV1ProjectsIdOrNameDomainsDomainMoveInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string; domain: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV1ProjectsIdOrNameDomainsDomainMoveBody;
};

export type PostV1ProjectsIdOrNameDomainsDomainMoveHandler = (
  input: PostV1ProjectsIdOrNameDomainsDomainMoveInput,
) => Promise<PostV1ProjectsIdOrNameDomainsDomainMoveResponse>;

export type PostV9ProjectsIdOrNameDomainsDomainVerifyResponse = {
  name: string;
  apexName: string;
  projectId: string;
  redirect?: (string | null) | undefined;
  redirectStatusCode?: (number | null) | undefined;
  gitBranch?: (string | null) | undefined;
  customEnvironmentId?: (string | null) | undefined;
  updatedAt?: number | undefined;
  createdAt?: number | undefined;
  verified: boolean;
};

export type PostV9ProjectsIdOrNameDomainsDomainVerifyInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string; domain: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type PostV9ProjectsIdOrNameDomainsDomainVerifyHandler = (
  input: PostV9ProjectsIdOrNameDomainsDomainVerifyInput,
) => Promise<PostV9ProjectsIdOrNameDomainsDomainVerifyResponse>;

export type GetV10ProjectsIdOrNameEnvResponse =
  | {
      target?:
        | (
            | Array<"development" | "development" | "preview" | "preview" | "production">
            | "development"
            | "development"
            | "preview"
            | "preview"
            | "production"
          )
        | undefined;
      type: "encrypted" | "plain" | "secret" | "sensitive" | "system";
      sunsetSecretId?: string | undefined;
      legacyValue?: string | undefined;
      decrypted?: boolean | undefined;
      value: string;
      vsmValue?: string | undefined;
      id?: string | undefined;
      key: string;
      configurationId?: (string | null) | undefined;
      createdAt?: number | undefined;
      updatedAt?: number | undefined;
      createdBy?: (string | null) | undefined;
      updatedBy?: (string | null) | undefined;
      gitBranch?: string | undefined;
      visibility?: ("config" | "secret") | undefined;
      edgeConfigId?: (string | null) | undefined;
      edgeConfigTokenId?: (string | null) | undefined;
      contentHint?:
        | (
            | { type: "redis-url"; storeId: string }
            | { type: "redis-rest-api-url"; storeId: string }
            | { type: "redis-rest-api-token"; storeId: string }
            | { type: "redis-rest-api-read-only-token"; storeId: string }
            | { type: "blob-read-write-token"; storeId: string }
            | { type: "blob-store-id"; storeId: string }
            | { type: "blob-webhook-public-key"; storeId: string }
            | { type: "postgres-url"; storeId: string }
            | { type: "postgres-url-non-pooling"; storeId: string }
            | { type: "postgres-prisma-url"; storeId: string }
            | { type: "postgres-user"; storeId: string }
            | { type: "postgres-host"; storeId: string }
            | { type: "postgres-password"; storeId: string }
            | { type: "postgres-database"; storeId: string }
            | { type: "postgres-url-no-ssl"; storeId: string }
            | {
                type: "integration-store-secret";
                storeId: string;
                integrationId: string;
                integrationProductId: string;
                integrationConfigurationId: string;
              }
            | { type: "flags-connection-string"; projectId: string }
            | null
          )
        | undefined;
      internalContentHint?: ({ type: "flags-secret"; encryptedValue: string } | null) | undefined;
      comment?: string | undefined;
      customEnvironmentIds?: Array<string> | undefined;
      system?: boolean | undefined;
    }
  | {
      envs: Array<{
        target?:
          | (
              | Array<"development" | "development" | "preview" | "preview" | "production">
              | "development"
              | "development"
              | "preview"
              | "preview"
              | "production"
            )
          | undefined;
        type: "encrypted" | "plain" | "secret" | "sensitive" | "system";
        sunsetSecretId?: string | undefined;
        legacyValue?: string | undefined;
        decrypted?: boolean | undefined;
        value: string;
        vsmValue?: string | undefined;
        id?: string | undefined;
        key: string;
        configurationId?: (string | null) | undefined;
        createdAt?: number | undefined;
        updatedAt?: number | undefined;
        createdBy?: (string | null) | undefined;
        updatedBy?: (string | null) | undefined;
        gitBranch?: string | undefined;
        visibility?: ("config" | "secret") | undefined;
        edgeConfigId?: (string | null) | undefined;
        edgeConfigTokenId?: (string | null) | undefined;
        contentHint?:
          | (
              | { type: "redis-url"; storeId: string }
              | { type: "redis-rest-api-url"; storeId: string }
              | { type: "redis-rest-api-token"; storeId: string }
              | { type: "redis-rest-api-read-only-token"; storeId: string }
              | { type: "blob-read-write-token"; storeId: string }
              | { type: "blob-store-id"; storeId: string }
              | { type: "blob-webhook-public-key"; storeId: string }
              | { type: "postgres-url"; storeId: string }
              | { type: "postgres-url-non-pooling"; storeId: string }
              | { type: "postgres-prisma-url"; storeId: string }
              | { type: "postgres-user"; storeId: string }
              | { type: "postgres-host"; storeId: string }
              | { type: "postgres-password"; storeId: string }
              | { type: "postgres-database"; storeId: string }
              | { type: "postgres-url-no-ssl"; storeId: string }
              | {
                  type: "integration-store-secret";
                  storeId: string;
                  integrationId: string;
                  integrationProductId: string;
                  integrationConfigurationId: string;
                }
              | { type: "flags-connection-string"; projectId: string }
              | null
            )
          | undefined;
        internalContentHint?: ({ type: "flags-secret"; encryptedValue: string } | null) | undefined;
        comment?: string | undefined;
        customEnvironmentIds?: Array<string> | undefined;
        system?: boolean | undefined;
      }>;
      pagination: Pagination;
    }
  | {
      envs: Array<{
        target?:
          | (
              | Array<"development" | "development" | "preview" | "preview" | "production">
              | "development"
              | "development"
              | "preview"
              | "preview"
              | "production"
            )
          | undefined;
        type: "encrypted" | "plain" | "secret" | "sensitive" | "system";
        sunsetSecretId?: string | undefined;
        legacyValue?: string | undefined;
        decrypted?: boolean | undefined;
        value: string;
        vsmValue?: string | undefined;
        id?: string | undefined;
        key: string;
        configurationId?: (string | null) | undefined;
        createdAt?: number | undefined;
        updatedAt?: number | undefined;
        createdBy?: (string | null) | undefined;
        updatedBy?: (string | null) | undefined;
        gitBranch?: string | undefined;
        visibility?: ("config" | "secret") | undefined;
        edgeConfigId?: (string | null) | undefined;
        edgeConfigTokenId?: (string | null) | undefined;
        contentHint?:
          | (
              | { type: "redis-url"; storeId: string }
              | { type: "redis-rest-api-url"; storeId: string }
              | { type: "redis-rest-api-token"; storeId: string }
              | { type: "redis-rest-api-read-only-token"; storeId: string }
              | { type: "blob-read-write-token"; storeId: string }
              | { type: "blob-store-id"; storeId: string }
              | { type: "blob-webhook-public-key"; storeId: string }
              | { type: "postgres-url"; storeId: string }
              | { type: "postgres-url-non-pooling"; storeId: string }
              | { type: "postgres-prisma-url"; storeId: string }
              | { type: "postgres-user"; storeId: string }
              | { type: "postgres-host"; storeId: string }
              | { type: "postgres-password"; storeId: string }
              | { type: "postgres-database"; storeId: string }
              | { type: "postgres-url-no-ssl"; storeId: string }
              | {
                  type: "integration-store-secret";
                  storeId: string;
                  integrationId: string;
                  integrationProductId: string;
                  integrationConfigurationId: string;
                }
              | { type: "flags-connection-string"; projectId: string }
              | null
            )
          | undefined;
        internalContentHint?: ({ type: "flags-secret"; encryptedValue: string } | null) | undefined;
        comment?: string | undefined;
        customEnvironmentIds?: Array<string> | undefined;
        system?: boolean | undefined;
      }>;
      hiddenProductionEnvCount: number;
    };

export type GetV10ProjectsIdOrNameEnvInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string };
  query: {
    gitBranch?: string | undefined;
    decrypt?: ("true" | "false") | undefined;
    source?: string | undefined;
    customEnvironmentId?: string | undefined;
    customEnvironmentSlug?: string | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV10ProjectsIdOrNameEnvHandler = (
  input: GetV10ProjectsIdOrNameEnvInput,
) => Promise<GetV10ProjectsIdOrNameEnvResponse>;

export const postV10ProjectsIdOrNameEnvBody = z.union([
  z.union([z.unknown(), z.unknown()]),
  z.array(
    z.union([
      z.object({
        key: z.string(),
        value: z.string(),
        type: z.enum(["system", "encrypted", "plain", "sensitive"]),
        target: z.array(z.enum(["production", "preview", "development"])),
        gitBranch: z.string().max(250).nullable().optional(),
        comment: z.string().max(500).optional(),
        customEnvironmentIds: z.array(z.string()).optional(),
      }),
      z.object({
        key: z.string(),
        value: z.string(),
        type: z.enum(["system", "encrypted", "plain", "sensitive"]),
        target: z.array(z.enum(["production", "preview", "development"])).optional(),
        gitBranch: z.string().max(250).nullable().optional(),
        comment: z.string().max(500).optional(),
        customEnvironmentIds: z.array(z.string()),
      }),
    ]),
  ),
]);

export type PostV10ProjectsIdOrNameEnvBody =
  | unknown
  | unknown
  | Array<
      | {
          key: string;
          value: string;
          type: "system" | "encrypted" | "plain" | "sensitive";
          target: Array<"production" | "preview" | "development">;
          gitBranch?: (string | null) | undefined;
          comment?: string | undefined;
          customEnvironmentIds?: Array<string> | undefined;
        }
      | {
          key: string;
          value: string;
          type: "system" | "encrypted" | "plain" | "sensitive";
          target?: Array<"production" | "preview" | "development"> | undefined;
          gitBranch?: (string | null) | undefined;
          comment?: string | undefined;
          customEnvironmentIds: Array<string>;
        }
    >;

export type PostV10ProjectsIdOrNameEnvResponse = {
  created?:
    | (
        | {
            target?:
              | (
                  | Array<"production" | "preview" | "development">
                  | "production"
                  | "preview"
                  | "development"
                )
              | undefined;
            type: "encrypted" | "plain" | "secret" | "sensitive" | "system";
            sunsetSecretId?: string | undefined;
            legacyValue?: string | undefined;
            decrypted?: boolean | undefined;
            value: string;
            vsmValue?: string | undefined;
            id?: string | undefined;
            key: string;
            configurationId?: (string | null) | undefined;
            createdAt?: number | undefined;
            updatedAt?: number | undefined;
            createdBy?: (string | null) | undefined;
            updatedBy?: (string | null) | undefined;
            gitBranch?: string | undefined;
            visibility?: ("config" | "secret") | undefined;
            edgeConfigId?: (string | null) | undefined;
            edgeConfigTokenId?: (string | null) | undefined;
            contentHint?:
              | (
                  | { type: "redis-url"; storeId: string }
                  | { type: "redis-rest-api-url"; storeId: string }
                  | { type: "redis-rest-api-token"; storeId: string }
                  | { type: "redis-rest-api-read-only-token"; storeId: string }
                  | { type: "blob-read-write-token"; storeId: string }
                  | { type: "blob-store-id"; storeId: string }
                  | { type: "blob-webhook-public-key"; storeId: string }
                  | { type: "postgres-url"; storeId: string }
                  | { type: "postgres-url-non-pooling"; storeId: string }
                  | { type: "postgres-prisma-url"; storeId: string }
                  | { type: "postgres-user"; storeId: string }
                  | { type: "postgres-host"; storeId: string }
                  | { type: "postgres-password"; storeId: string }
                  | { type: "postgres-database"; storeId: string }
                  | { type: "postgres-url-no-ssl"; storeId: string }
                  | {
                      type: "integration-store-secret";
                      storeId: string;
                      integrationId: string;
                      integrationProductId: string;
                      integrationConfigurationId: string;
                    }
                  | { type: "flags-connection-string"; projectId: string }
                  | null
                )
              | undefined;
            internalContentHint?:
              | ({ type: "flags-secret"; encryptedValue: string } | null)
              | undefined;
            comment?: string | undefined;
            customEnvironmentIds?: Array<string> | undefined;
            system?: boolean | undefined;
          }
        | Array<{
            target?: (Array<string> | "production" | "preview" | "development") | undefined;
            type: "encrypted" | "plain" | "secret" | "sensitive" | "system";
            sunsetSecretId?: string | undefined;
            legacyValue?: string | undefined;
            decrypted?: boolean | undefined;
            value: string;
            vsmValue?: string | undefined;
            id?: string | undefined;
            key: string;
            configurationId?: (string | null) | undefined;
            createdAt?: number | undefined;
            updatedAt?: number | undefined;
            createdBy?: (string | null) | undefined;
            updatedBy?: (string | null) | undefined;
            gitBranch?: string | undefined;
            visibility?: ("config" | "secret") | undefined;
            edgeConfigId?: (string | null) | undefined;
            edgeConfigTokenId?: (string | null) | undefined;
            contentHint?:
              | (
                  | { type: "redis-url"; storeId: string }
                  | { type: "redis-rest-api-url"; storeId: string }
                  | { type: "redis-rest-api-token"; storeId: string }
                  | { type: "redis-rest-api-read-only-token"; storeId: string }
                  | { type: "blob-read-write-token"; storeId: string }
                  | { type: "blob-store-id"; storeId: string }
                  | { type: "blob-webhook-public-key"; storeId: string }
                  | { type: "postgres-url"; storeId: string }
                  | { type: "postgres-url-non-pooling"; storeId: string }
                  | { type: "postgres-prisma-url"; storeId: string }
                  | { type: "postgres-user"; storeId: string }
                  | { type: "postgres-host"; storeId: string }
                  | { type: "postgres-password"; storeId: string }
                  | { type: "postgres-database"; storeId: string }
                  | { type: "postgres-url-no-ssl"; storeId: string }
                  | {
                      type: "integration-store-secret";
                      storeId: string;
                      integrationId: string;
                      integrationProductId: string;
                      integrationConfigurationId: string;
                    }
                  | { type: "flags-connection-string"; projectId: string }
                  | null
                )
              | undefined;
            internalContentHint?:
              | ({ type: "flags-secret"; encryptedValue: string } | null)
              | undefined;
            comment?: string | undefined;
            customEnvironmentIds?: Array<string> | undefined;
            system?: boolean | undefined;
          }>
      )
    | undefined;
  failed: Array<{
    error: {
      code: string;
      message: string;
      key?: string | undefined;
      envVarId?: string | undefined;
      envVarKey?: string | undefined;
      action?: string | undefined;
      link?: string | undefined;
      value?: (string | Array<"production" | "preview" | "development">) | undefined;
      gitBranch?: string | undefined;
      target?:
        | (
            | Array<"development" | "development" | "preview" | "preview" | "production">
            | "production"
            | "preview"
            | "development"
          )
        | undefined;
      project?: string | undefined;
    };
  }>;
};

export type PostV10ProjectsIdOrNameEnvInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string };
  query: { upsert?: string | undefined; teamId?: string | undefined; slug?: string | undefined };
  body: PostV10ProjectsIdOrNameEnvBody;
};

export type PostV10ProjectsIdOrNameEnvHandler = (
  input: PostV10ProjectsIdOrNameEnvInput,
) => Promise<PostV10ProjectsIdOrNameEnvResponse>;

export type GetV1ProjectsIdOrNameEnvIdResponse =
  | {
      decrypted: boolean;
      type: "encrypted" | "plain" | "secret" | "sensitive" | "system";
      edgeConfigId?: (string | null) | undefined;
      edgeConfigTokenId?: (string | null) | undefined;
      createdAt?: number | undefined;
      updatedAt?: number | undefined;
      id?: string | undefined;
      key: string;
      target?:
        | (
            | Array<"development" | "development" | "preview" | "preview" | "production">
            | "production"
            | "preview"
            | "development"
          )
        | undefined;
      gitBranch?: string | undefined;
      createdBy?: (string | null) | undefined;
      updatedBy?: (string | null) | undefined;
      sunsetSecretId?: string | undefined;
      legacyValue?: string | undefined;
      configurationId?: (string | null) | undefined;
      visibility?: ("config" | "secret") | undefined;
      contentHint?:
        | (
            | { type: "redis-url"; storeId: string }
            | { type: "redis-rest-api-url"; storeId: string }
            | { type: "redis-rest-api-token"; storeId: string }
            | { type: "redis-rest-api-read-only-token"; storeId: string }
            | { type: "blob-read-write-token"; storeId: string }
            | { type: "blob-store-id"; storeId: string }
            | { type: "blob-webhook-public-key"; storeId: string }
            | { type: "postgres-url"; storeId: string }
            | { type: "postgres-url-non-pooling"; storeId: string }
            | { type: "postgres-prisma-url"; storeId: string }
            | { type: "postgres-user"; storeId: string }
            | { type: "postgres-host"; storeId: string }
            | { type: "postgres-password"; storeId: string }
            | { type: "postgres-database"; storeId: string }
            | { type: "postgres-url-no-ssl"; storeId: string }
            | {
                type: "integration-store-secret";
                storeId: string;
                integrationId: string;
                integrationProductId: string;
                integrationConfigurationId: string;
              }
            | { type: "flags-connection-string"; projectId: string }
            | null
          )
        | undefined;
      internalContentHint?: ({ type: "flags-secret"; encryptedValue: string } | null) | undefined;
      comment?: string | undefined;
      customEnvironmentIds?: Array<string> | undefined;
    }
  | {
      type: "encrypted" | "plain" | "secret" | "sensitive" | "system";
      value: string;
      edgeConfigId?: (string | null) | undefined;
      edgeConfigTokenId?: (string | null) | undefined;
      createdAt?: number | undefined;
      updatedAt?: number | undefined;
      id?: string | undefined;
      key: string;
      target?:
        | (
            | Array<"production" | "preview" | "development">
            | "production"
            | "preview"
            | "development"
          )
        | undefined;
      gitBranch?: string | undefined;
      createdBy?: (string | null) | undefined;
      updatedBy?: (string | null) | undefined;
      sunsetSecretId?: string | undefined;
      legacyValue?: string | undefined;
      decrypted?: boolean | undefined;
      configurationId?: (string | null) | undefined;
      visibility?: ("config" | "secret") | undefined;
      contentHint?:
        | (
            | { type: "redis-url"; storeId: string }
            | { type: "redis-rest-api-url"; storeId: string }
            | { type: "redis-rest-api-token"; storeId: string }
            | { type: "redis-rest-api-read-only-token"; storeId: string }
            | { type: "blob-read-write-token"; storeId: string }
            | { type: "blob-store-id"; storeId: string }
            | { type: "blob-webhook-public-key"; storeId: string }
            | { type: "postgres-url"; storeId: string }
            | { type: "postgres-url-non-pooling"; storeId: string }
            | { type: "postgres-prisma-url"; storeId: string }
            | { type: "postgres-user"; storeId: string }
            | { type: "postgres-host"; storeId: string }
            | { type: "postgres-password"; storeId: string }
            | { type: "postgres-database"; storeId: string }
            | { type: "postgres-url-no-ssl"; storeId: string }
            | {
                type: "integration-store-secret";
                storeId: string;
                integrationId: string;
                integrationProductId: string;
                integrationConfigurationId: string;
              }
            | { type: "flags-connection-string"; projectId: string }
            | null
          )
        | undefined;
      internalContentHint?: ({ type: "flags-secret"; encryptedValue: string } | null) | undefined;
      comment?: string | undefined;
      customEnvironmentIds?: Array<string> | undefined;
    };

export type GetV1ProjectsIdOrNameEnvIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string; id: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV1ProjectsIdOrNameEnvIdHandler = (
  input: GetV1ProjectsIdOrNameEnvIdInput,
) => Promise<GetV1ProjectsIdOrNameEnvIdResponse>;

export type DeleteV9ProjectsIdOrNameEnvIdResponse =
  | Array<{
      type: "encrypted" | "plain" | "secret" | "sensitive" | "system";
      value: string;
      edgeConfigId?: (string | null) | undefined;
      edgeConfigTokenId?: (string | null) | undefined;
      createdAt?: number | undefined;
      updatedAt?: number | undefined;
      id?: string | undefined;
      key: string;
      target?:
        | (
            | Array<"development" | "development" | "preview" | "preview" | "production">
            | "production"
            | "preview"
            | "development"
          )
        | undefined;
      gitBranch?: string | undefined;
      createdBy?: (string | null) | undefined;
      updatedBy?: (string | null) | undefined;
      sunsetSecretId?: string | undefined;
      legacyValue?: string | undefined;
      decrypted?: boolean | undefined;
      configurationId?: (string | null) | undefined;
      visibility?: ("config" | "secret") | undefined;
      contentHint?:
        | (
            | { type: "redis-url"; storeId: string }
            | { type: "redis-rest-api-url"; storeId: string }
            | { type: "redis-rest-api-token"; storeId: string }
            | { type: "redis-rest-api-read-only-token"; storeId: string }
            | { type: "blob-read-write-token"; storeId: string }
            | { type: "blob-store-id"; storeId: string }
            | { type: "blob-webhook-public-key"; storeId: string }
            | { type: "postgres-url"; storeId: string }
            | { type: "postgres-url-non-pooling"; storeId: string }
            | { type: "postgres-prisma-url"; storeId: string }
            | { type: "postgres-user"; storeId: string }
            | { type: "postgres-host"; storeId: string }
            | { type: "postgres-password"; storeId: string }
            | { type: "postgres-database"; storeId: string }
            | { type: "postgres-url-no-ssl"; storeId: string }
            | {
                type: "integration-store-secret";
                storeId: string;
                integrationId: string;
                integrationProductId: string;
                integrationConfigurationId: string;
              }
            | { type: "flags-connection-string"; projectId: string }
            | null
          )
        | undefined;
      internalContentHint?: ({ type: "flags-secret"; encryptedValue: string } | null) | undefined;
      comment?: string | undefined;
      customEnvironmentIds?: Array<string> | undefined;
    } | null>
  | {
      system?: boolean | undefined;
      type: "encrypted" | "plain" | "secret" | "sensitive" | "system";
      value: string;
      edgeConfigId?: (string | null) | undefined;
      edgeConfigTokenId?: (string | null) | undefined;
      createdAt?: number | undefined;
      updatedAt?: number | undefined;
      id?: string | undefined;
      key: string;
      target?:
        | (
            | Array<"development" | "development" | "preview" | "preview" | "production">
            | "production"
            | "preview"
            | "development"
          )
        | undefined;
      gitBranch?: string | undefined;
      createdBy?: (string | null) | undefined;
      updatedBy?: (string | null) | undefined;
      sunsetSecretId?: string | undefined;
      legacyValue?: string | undefined;
      decrypted?: boolean | undefined;
      configurationId?: (string | null) | undefined;
      visibility?: ("config" | "secret") | undefined;
      contentHint?:
        | (
            | { type: "redis-url"; storeId: string }
            | { type: "redis-rest-api-url"; storeId: string }
            | { type: "redis-rest-api-token"; storeId: string }
            | { type: "redis-rest-api-read-only-token"; storeId: string }
            | { type: "blob-read-write-token"; storeId: string }
            | { type: "blob-store-id"; storeId: string }
            | { type: "blob-webhook-public-key"; storeId: string }
            | { type: "postgres-url"; storeId: string }
            | { type: "postgres-url-non-pooling"; storeId: string }
            | { type: "postgres-prisma-url"; storeId: string }
            | { type: "postgres-user"; storeId: string }
            | { type: "postgres-host"; storeId: string }
            | { type: "postgres-password"; storeId: string }
            | { type: "postgres-database"; storeId: string }
            | { type: "postgres-url-no-ssl"; storeId: string }
            | {
                type: "integration-store-secret";
                storeId: string;
                integrationId: string;
                integrationProductId: string;
                integrationConfigurationId: string;
              }
            | { type: "flags-connection-string"; projectId: string }
            | null
          )
        | undefined;
      internalContentHint?: ({ type: "flags-secret"; encryptedValue: string } | null) | undefined;
      comment?: string | undefined;
      customEnvironmentIds?: Array<string> | undefined;
    }
  | {
      type: "encrypted" | "plain" | "secret" | "sensitive" | "system";
      value: string;
      edgeConfigId?: (string | null) | undefined;
      edgeConfigTokenId?: (string | null) | undefined;
      createdAt?: number | undefined;
      updatedAt?: number | undefined;
      id?: string | undefined;
      key: string;
      target?:
        | (
            | Array<"development" | "development" | "preview" | "preview" | "production">
            | "production"
            | "preview"
            | "development"
          )
        | undefined;
      gitBranch?: string | undefined;
      createdBy?: (string | null) | undefined;
      updatedBy?: (string | null) | undefined;
      sunsetSecretId?: string | undefined;
      legacyValue?: string | undefined;
      decrypted?: boolean | undefined;
      configurationId?: (string | null) | undefined;
      visibility?: ("config" | "secret") | undefined;
      contentHint?:
        | (
            | { type: "redis-url"; storeId: string }
            | { type: "redis-rest-api-url"; storeId: string }
            | { type: "redis-rest-api-token"; storeId: string }
            | { type: "redis-rest-api-read-only-token"; storeId: string }
            | { type: "blob-read-write-token"; storeId: string }
            | { type: "blob-store-id"; storeId: string }
            | { type: "blob-webhook-public-key"; storeId: string }
            | { type: "postgres-url"; storeId: string }
            | { type: "postgres-url-non-pooling"; storeId: string }
            | { type: "postgres-prisma-url"; storeId: string }
            | { type: "postgres-user"; storeId: string }
            | { type: "postgres-host"; storeId: string }
            | { type: "postgres-password"; storeId: string }
            | { type: "postgres-database"; storeId: string }
            | { type: "postgres-url-no-ssl"; storeId: string }
            | {
                type: "integration-store-secret";
                storeId: string;
                integrationId: string;
                integrationProductId: string;
                integrationConfigurationId: string;
              }
            | { type: "flags-connection-string"; projectId: string }
            | null
          )
        | undefined;
      internalContentHint?: ({ type: "flags-secret"; encryptedValue: string } | null) | undefined;
      comment?: string | undefined;
      customEnvironmentIds?: Array<string> | undefined;
    }
  | null;

export type DeleteV9ProjectsIdOrNameEnvIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string; id: string };
  query: {
    customEnvironmentId?: string | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type DeleteV9ProjectsIdOrNameEnvIdHandler = (
  input: DeleteV9ProjectsIdOrNameEnvIdInput,
) => Promise<DeleteV9ProjectsIdOrNameEnvIdResponse>;

export const patchV9ProjectsIdOrNameEnvIdBody = z.object({
  key: z.string().optional(),
  target: z.array(z.enum(["production", "preview", "development"])).optional(),
  gitBranch: z.string().max(250).nullable().optional(),
  type: z.enum(["system", "encrypted", "plain", "sensitive"]).optional(),
  value: z.string().optional(),
  customEnvironmentIds: z.array(z.string()).optional(),
  comment: z.string().max(500).optional(),
});

export type PatchV9ProjectsIdOrNameEnvIdBody = {
  key?: string | undefined;
  target?: Array<"production" | "preview" | "development"> | undefined;
  gitBranch?: (string | null) | undefined;
  type?: ("system" | "encrypted" | "plain" | "sensitive") | undefined;
  value?: string | undefined;
  customEnvironmentIds?: Array<string> | undefined;
  comment?: string | undefined;
};

export type PatchV9ProjectsIdOrNameEnvIdResponse = {
  type: "encrypted" | "plain" | "secret" | "sensitive" | "system";
  value: string;
  edgeConfigId?: (string | null) | undefined;
  edgeConfigTokenId?: (string | null) | undefined;
  createdAt?: number | undefined;
  updatedAt?: number | undefined;
  id?: string | undefined;
  key: string;
  target?:
    | (
        | Array<"development" | "development" | "preview" | "preview" | "production">
        | "development"
        | "development"
        | "preview"
        | "preview"
        | "production"
      )
    | undefined;
  gitBranch?: string | undefined;
  createdBy?: (string | null) | undefined;
  updatedBy?: (string | null) | undefined;
  sunsetSecretId?: string | undefined;
  legacyValue?: string | undefined;
  decrypted?: boolean | undefined;
  configurationId?: (string | null) | undefined;
  visibility?: ("config" | "secret") | undefined;
  contentHint?:
    | (
        | { type: "redis-url"; storeId: string }
        | { type: "redis-rest-api-url"; storeId: string }
        | { type: "redis-rest-api-token"; storeId: string }
        | { type: "redis-rest-api-read-only-token"; storeId: string }
        | { type: "blob-read-write-token"; storeId: string }
        | { type: "blob-store-id"; storeId: string }
        | { type: "blob-webhook-public-key"; storeId: string }
        | { type: "postgres-url"; storeId: string }
        | { type: "postgres-url-non-pooling"; storeId: string }
        | { type: "postgres-prisma-url"; storeId: string }
        | { type: "postgres-user"; storeId: string }
        | { type: "postgres-host"; storeId: string }
        | { type: "postgres-password"; storeId: string }
        | { type: "postgres-database"; storeId: string }
        | { type: "postgres-url-no-ssl"; storeId: string }
        | {
            type: "integration-store-secret";
            storeId: string;
            integrationId: string;
            integrationProductId: string;
            integrationConfigurationId: string;
          }
        | { type: "flags-connection-string"; projectId: string }
        | null
      )
    | undefined;
  internalContentHint?: ({ type: "flags-secret"; encryptedValue: string } | null) | undefined;
  comment?: string | undefined;
  customEnvironmentIds?: Array<string> | undefined;
} | null;

export type PatchV9ProjectsIdOrNameEnvIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string; id: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PatchV9ProjectsIdOrNameEnvIdBody;
};

export type PatchV9ProjectsIdOrNameEnvIdHandler = (
  input: PatchV9ProjectsIdOrNameEnvIdInput,
) => Promise<PatchV9ProjectsIdOrNameEnvIdResponse>;

export const deleteV1ProjectsIdOrNameEnvBody = z.object({ ids: z.array(z.string()) });

export type DeleteV1ProjectsIdOrNameEnvBody = { ids: Array<string> };

export type DeleteV1ProjectsIdOrNameEnvResponse = { deleted: number; ids: Array<string> };

export type DeleteV1ProjectsIdOrNameEnvInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: DeleteV1ProjectsIdOrNameEnvBody;
};

export type DeleteV1ProjectsIdOrNameEnvHandler = (
  input: DeleteV1ProjectsIdOrNameEnvInput,
) => Promise<DeleteV1ProjectsIdOrNameEnvResponse>;

export type GetV1ProjectsIdOrNameRollingReleaseBillingResponse =
  | { availableSlots: number; reason: "plan_not_supported"; message: string }
  | { availableSlots: "unlimited"; reason: "unlimited_slots"; message: string }
  | {
      availableSlots: number;
      reason: "no_available_slots";
      message: string;
      enabledProjects: Array<string>;
    }
  | { availableSlots: number; reason: "available_slots"; message: string };

export type GetV1ProjectsIdOrNameRollingReleaseBillingInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV1ProjectsIdOrNameRollingReleaseBillingHandler = (
  input: GetV1ProjectsIdOrNameRollingReleaseBillingInput,
) => Promise<GetV1ProjectsIdOrNameRollingReleaseBillingResponse>;

export type GetV1ProjectsIdOrNameRollingReleaseConfigResponse = {
  rollingRelease: {
    target: string;
    stages?:
      | (Array<{
          targetPercentage: number;
          requireApproval?: boolean | undefined;
          duration?: number | undefined;
          linearShift?: boolean | undefined;
        }> | null)
      | undefined;
    canaryResponseHeader?: boolean | undefined;
    gate?:
      | {
          enabled: boolean;
          checks: Array<{
            type: "error-rate-5xx";
            minSampleSize?: number | undefined;
            excludeStatusCodes?: Array<number> | undefined;
            excludePaths?: Array<string> | undefined;
            ingestWatermarkSeconds?: number | undefined;
          }>;
          failureThreshold?: number | undefined;
          windowSize?: number | undefined;
          action: "pause" | "rollback";
          dryRun: boolean;
        }
      | undefined;
  } | null;
};

export type GetV1ProjectsIdOrNameRollingReleaseConfigInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV1ProjectsIdOrNameRollingReleaseConfigHandler = (
  input: GetV1ProjectsIdOrNameRollingReleaseConfigInput,
) => Promise<GetV1ProjectsIdOrNameRollingReleaseConfigResponse>;

export type DeleteV1ProjectsIdOrNameRollingReleaseConfigResponse = { rollingRelease: unknown };

export type DeleteV1ProjectsIdOrNameRollingReleaseConfigInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type DeleteV1ProjectsIdOrNameRollingReleaseConfigHandler = (
  input: DeleteV1ProjectsIdOrNameRollingReleaseConfigInput,
) => Promise<DeleteV1ProjectsIdOrNameRollingReleaseConfigResponse>;

export type PatchV1ProjectsIdOrNameRollingReleaseConfigResponse =
  | { rollingRelease: unknown }
  | {
      rollingRelease: {
        stages?:
          | (Array<{
              targetPercentage: number;
              requireApproval?: boolean | undefined;
              duration?: number | undefined;
              linearShift?: boolean | undefined;
            }> | null)
          | undefined;
      } | null;
    };

export type PatchV1ProjectsIdOrNameRollingReleaseConfigInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type PatchV1ProjectsIdOrNameRollingReleaseConfigHandler = (
  input: PatchV1ProjectsIdOrNameRollingReleaseConfigInput,
) => Promise<PatchV1ProjectsIdOrNameRollingReleaseConfigResponse>;

export type GetV1ProjectsIdOrNameRollingReleaseResponse = {
  rollingRelease: {
    state: "ABORTED" | "ACTIVE" | "COMPLETE";
    substate: "PAUSED" | "null" | null;
    currentDeployment: {
      name: string;
      createdAt: number;
      readyState:
        | "BLOCKED"
        | "BUILDING"
        | "CANCELED"
        | "ERROR"
        | "INITIALIZING"
        | "QUEUED"
        | "READY";
      id: string;
      target?: ("production" | "staging" | "null" | null) | undefined;
      readyStateAt?: number | undefined;
      source?:
        | (
            | "api-trigger-git-deploy"
            | "cli"
            | "clone/repo"
            | "drop"
            | "git"
            | "git-deploy-hook"
            | "import"
            | "import/repo"
            | "redeploy"
            | "v0-web"
          )
        | undefined;
      url: string;
    } | null;
    canaryDeployment: {
      name: string;
      createdAt: number;
      readyState:
        | "BLOCKED"
        | "BUILDING"
        | "CANCELED"
        | "ERROR"
        | "INITIALIZING"
        | "QUEUED"
        | "READY";
      id: string;
      target?: ("production" | "staging" | "null" | null) | undefined;
      readyStateAt?: number | undefined;
      source?:
        | (
            | "api-trigger-git-deploy"
            | "cli"
            | "clone/repo"
            | "drop"
            | "git"
            | "git-deploy-hook"
            | "import"
            | "import/repo"
            | "redeploy"
            | "v0-web"
          )
        | undefined;
      url: string;
    } | null;
    queuedDeploymentId: string | null;
    advancementType: "automatic" | "manual-approval";
    stages: Array<{
      index: number;
      isFinalStage: boolean;
      targetPercentage: number;
      requireApproval: boolean;
      duration: number | null;
      linearShift?: boolean | undefined;
    }>;
    activeStage: {
      index: number;
      isFinalStage: boolean;
      targetPercentage: number;
      requireApproval: boolean;
      duration: number | null;
      linearShift?: boolean | undefined;
    } | null;
    nextStage: {
      index: number;
      isFinalStage: boolean;
      targetPercentage: number;
      requireApproval: boolean;
      duration: number | null;
      linearShift?: boolean | undefined;
    } | null;
    startedAt: number;
    updatedAt: number;
    currentCanaryPercentage?: number | undefined;
  } | null;
};

export type GetV1ProjectsIdOrNameRollingReleaseInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string };
  query: {
    state?: ("ACTIVE" | "COMPLETE" | "ABORTED") | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV1ProjectsIdOrNameRollingReleaseHandler = (
  input: GetV1ProjectsIdOrNameRollingReleaseInput,
) => Promise<GetV1ProjectsIdOrNameRollingReleaseResponse>;

export const postV1ProjectsIdOrNameRollingReleaseApproveStageBody = z.object({
  nextStageIndex: z.number(),
  canaryDeploymentId: z.string(),
});

export type PostV1ProjectsIdOrNameRollingReleaseApproveStageBody = {
  nextStageIndex: number;
  canaryDeploymentId: string;
};

export type PostV1ProjectsIdOrNameRollingReleaseApproveStageResponse = {
  rollingRelease: {
    state: "ABORTED" | "ACTIVE" | "COMPLETE";
    substate: "PAUSED" | "null" | null;
    currentDeployment: {
      name: string;
      createdAt: number;
      readyState:
        | "BLOCKED"
        | "BUILDING"
        | "CANCELED"
        | "ERROR"
        | "INITIALIZING"
        | "QUEUED"
        | "READY";
      id: string;
      target?: ("production" | "staging" | "null" | null) | undefined;
      readyStateAt?: number | undefined;
      source?:
        | (
            | "api-trigger-git-deploy"
            | "cli"
            | "clone/repo"
            | "drop"
            | "git"
            | "git-deploy-hook"
            | "import"
            | "import/repo"
            | "redeploy"
            | "v0-web"
          )
        | undefined;
      url: string;
    } | null;
    canaryDeployment: {
      name: string;
      createdAt: number;
      readyState:
        | "BLOCKED"
        | "BUILDING"
        | "CANCELED"
        | "ERROR"
        | "INITIALIZING"
        | "QUEUED"
        | "READY";
      id: string;
      target?: ("production" | "staging" | "null" | null) | undefined;
      readyStateAt?: number | undefined;
      source?:
        | (
            | "api-trigger-git-deploy"
            | "cli"
            | "clone/repo"
            | "drop"
            | "git"
            | "git-deploy-hook"
            | "import"
            | "import/repo"
            | "redeploy"
            | "v0-web"
          )
        | undefined;
      url: string;
    } | null;
    queuedDeploymentId: string | null;
    advancementType: "automatic" | "manual-approval";
    stages: Array<{
      index: number;
      isFinalStage: boolean;
      targetPercentage: number;
      requireApproval: boolean;
      duration: number | null;
      linearShift?: boolean | undefined;
    }>;
    activeStage: {
      index: number;
      isFinalStage: boolean;
      targetPercentage: number;
      requireApproval: boolean;
      duration: number | null;
      linearShift?: boolean | undefined;
    } | null;
    nextStage: {
      index: number;
      isFinalStage: boolean;
      targetPercentage: number;
      requireApproval: boolean;
      duration: number | null;
      linearShift?: boolean | undefined;
    } | null;
    startedAt: number;
    updatedAt: number;
    currentCanaryPercentage?: number | undefined;
  } | null;
};

export type PostV1ProjectsIdOrNameRollingReleaseApproveStageInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV1ProjectsIdOrNameRollingReleaseApproveStageBody;
};

export type PostV1ProjectsIdOrNameRollingReleaseApproveStageHandler = (
  input: PostV1ProjectsIdOrNameRollingReleaseApproveStageInput,
) => Promise<PostV1ProjectsIdOrNameRollingReleaseApproveStageResponse>;

export const postV1ProjectsIdOrNameRollingReleaseStartBody = z.object({
  canaryDeploymentId: z.string(),
});

export type PostV1ProjectsIdOrNameRollingReleaseStartBody = { canaryDeploymentId: string };

export type PostV1ProjectsIdOrNameRollingReleaseStartResponse = {
  rollingRelease: {
    state: "ABORTED" | "ACTIVE" | "COMPLETE";
    substate: "PAUSED" | "null" | null;
    currentDeployment: {
      name: string;
      createdAt: number;
      readyState:
        | "BLOCKED"
        | "BUILDING"
        | "CANCELED"
        | "ERROR"
        | "INITIALIZING"
        | "QUEUED"
        | "READY";
      id: string;
      target?: ("production" | "staging" | "null" | null) | undefined;
      readyStateAt?: number | undefined;
      source?:
        | (
            | "api-trigger-git-deploy"
            | "cli"
            | "clone/repo"
            | "drop"
            | "git"
            | "git-deploy-hook"
            | "import"
            | "import/repo"
            | "redeploy"
            | "v0-web"
          )
        | undefined;
      url: string;
    } | null;
    canaryDeployment: {
      name: string;
      createdAt: number;
      readyState:
        | "BLOCKED"
        | "BUILDING"
        | "CANCELED"
        | "ERROR"
        | "INITIALIZING"
        | "QUEUED"
        | "READY";
      id: string;
      target?: ("production" | "staging" | "null" | null) | undefined;
      readyStateAt?: number | undefined;
      source?:
        | (
            | "api-trigger-git-deploy"
            | "cli"
            | "clone/repo"
            | "drop"
            | "git"
            | "git-deploy-hook"
            | "import"
            | "import/repo"
            | "redeploy"
            | "v0-web"
          )
        | undefined;
      url: string;
    } | null;
    queuedDeploymentId: string | null;
    advancementType: "automatic" | "manual-approval";
    stages: Array<{
      index: number;
      isFinalStage: boolean;
      targetPercentage: number;
      requireApproval: boolean;
      duration: number | null;
      linearShift?: boolean | undefined;
    }>;
    activeStage: {
      index: number;
      isFinalStage: boolean;
      targetPercentage: number;
      requireApproval: boolean;
      duration: number | null;
      linearShift?: boolean | undefined;
    } | null;
    nextStage: {
      index: number;
      isFinalStage: boolean;
      targetPercentage: number;
      requireApproval: boolean;
      duration: number | null;
      linearShift?: boolean | undefined;
    } | null;
    startedAt: number;
    updatedAt: number;
    currentCanaryPercentage?: number | undefined;
  } | null;
};

export type PostV1ProjectsIdOrNameRollingReleaseStartInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV1ProjectsIdOrNameRollingReleaseStartBody;
};

export type PostV1ProjectsIdOrNameRollingReleaseStartHandler = (
  input: PostV1ProjectsIdOrNameRollingReleaseStartInput,
) => Promise<PostV1ProjectsIdOrNameRollingReleaseStartResponse>;

export const postV1ProjectsIdOrNameRollingReleaseCompleteBody = z.object({
  canaryDeploymentId: z.string(),
});

export type PostV1ProjectsIdOrNameRollingReleaseCompleteBody = { canaryDeploymentId: string };

export type PostV1ProjectsIdOrNameRollingReleaseCompleteResponse = {
  rollingRelease: {
    state: "ABORTED" | "ACTIVE" | "COMPLETE";
    substate: "PAUSED" | "null" | null;
    currentDeployment: {
      name: string;
      createdAt: number;
      readyState:
        | "BLOCKED"
        | "BUILDING"
        | "CANCELED"
        | "ERROR"
        | "INITIALIZING"
        | "QUEUED"
        | "READY";
      id: string;
      target?: ("production" | "staging" | "null" | null) | undefined;
      readyStateAt?: number | undefined;
      source?:
        | (
            | "api-trigger-git-deploy"
            | "cli"
            | "clone/repo"
            | "drop"
            | "git"
            | "git-deploy-hook"
            | "import"
            | "import/repo"
            | "redeploy"
            | "v0-web"
          )
        | undefined;
      url: string;
    } | null;
    canaryDeployment: {
      name: string;
      createdAt: number;
      readyState:
        | "BLOCKED"
        | "BUILDING"
        | "CANCELED"
        | "ERROR"
        | "INITIALIZING"
        | "QUEUED"
        | "READY";
      id: string;
      target?: ("production" | "staging" | "null" | null) | undefined;
      readyStateAt?: number | undefined;
      source?:
        | (
            | "api-trigger-git-deploy"
            | "cli"
            | "clone/repo"
            | "drop"
            | "git"
            | "git-deploy-hook"
            | "import"
            | "import/repo"
            | "redeploy"
            | "v0-web"
          )
        | undefined;
      url: string;
    } | null;
    queuedDeploymentId: string | null;
    advancementType: "automatic" | "manual-approval";
    stages: Array<{
      index: number;
      isFinalStage: boolean;
      targetPercentage: number;
      requireApproval: boolean;
      duration: number | null;
      linearShift?: boolean | undefined;
    }>;
    activeStage: {
      index: number;
      isFinalStage: boolean;
      targetPercentage: number;
      requireApproval: boolean;
      duration: number | null;
      linearShift?: boolean | undefined;
    } | null;
    nextStage: {
      index: number;
      isFinalStage: boolean;
      targetPercentage: number;
      requireApproval: boolean;
      duration: number | null;
      linearShift?: boolean | undefined;
    } | null;
    startedAt: number;
    updatedAt: number;
    currentCanaryPercentage?: number | undefined;
  } | null;
};

export type PostV1ProjectsIdOrNameRollingReleaseCompleteInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV1ProjectsIdOrNameRollingReleaseCompleteBody;
};

export type PostV1ProjectsIdOrNameRollingReleaseCompleteHandler = (
  input: PostV1ProjectsIdOrNameRollingReleaseCompleteInput,
) => Promise<PostV1ProjectsIdOrNameRollingReleaseCompleteResponse>;

export const patchV1ProjectsIdOrNameProtectionBypassBody = z.object({
  revoke: z.object({ secret: z.string(), regenerate: z.boolean() }).optional(),
  generate: z
    .object({
      secret: z
        .string()
        .regex(/^[a-zA-Z0-9]{32}$/)
        .optional(),
      note: z.string().max(100).optional(),
    })
    .optional(),
  update: z
    .object({
      secret: z.string(),
      isEnvVar: z.boolean().optional(),
      note: z.string().max(100).optional(),
    })
    .optional(),
});

export type PatchV1ProjectsIdOrNameProtectionBypassBody = {
  revoke?: { secret: string; regenerate: boolean } | undefined;
  generate?: { secret?: string | undefined; note?: string | undefined } | undefined;
  update?:
    | { secret: string; isEnvVar?: boolean | undefined; note?: string | undefined }
    | undefined;
};

export type PatchV1ProjectsIdOrNameProtectionBypassResponse = {
  protectionBypass?:
    | Record<
        string,
        | {
            createdAt: number;
            createdBy: string;
            scope: "integration-automation-bypass";
            integrationId: string;
            configurationId: string;
          }
        | {
            createdAt: number;
            createdBy: string;
            scope: "automation-bypass";
            isEnvVar?: boolean | undefined;
            note?: string | undefined;
          }
      >
    | undefined;
};

export type PatchV1ProjectsIdOrNameProtectionBypassInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PatchV1ProjectsIdOrNameProtectionBypassBody;
};

export type PatchV1ProjectsIdOrNameProtectionBypassHandler = (
  input: PatchV1ProjectsIdOrNameProtectionBypassInput,
) => Promise<PatchV1ProjectsIdOrNameProtectionBypassResponse>;

export type PostV1ProjectsProjectIdRollbackDeploymentIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { projectId: string; deploymentId: string };
  query: {
    description?: string | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type PostV1ProjectsProjectIdRollbackDeploymentIdHandler = (
  input: PostV1ProjectsProjectIdRollbackDeploymentIdInput,
) => Promise<void>;

export const patchV1ProjectsProjectIdRollbackDeploymentIdUpdateDescriptionBody = z.object({
  description: z.string().optional(),
});

export type PatchV1ProjectsProjectIdRollbackDeploymentIdUpdateDescriptionBody = {
  description?: string | undefined;
};

export type PatchV1ProjectsProjectIdRollbackDeploymentIdUpdateDescriptionInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { projectId: string; deploymentId: string };
  body: PatchV1ProjectsProjectIdRollbackDeploymentIdUpdateDescriptionBody;
};

export type PatchV1ProjectsProjectIdRollbackDeploymentIdUpdateDescriptionHandler = (
  input: PatchV1ProjectsProjectIdRollbackDeploymentIdUpdateDescriptionInput,
) => Promise<void>;

export const patchV1ProjectsProjectIdMicrofrontendsBody = z.object({
  microfrontendsGroupId: z.string().optional(),
  enabled: z.boolean().optional(),
  isDefaultApp: z.boolean().optional(),
  defaultRoute: z.string().optional(),
  routeObservabilityToThisProject: z.boolean().optional(),
  doNotRouteWithMicrofrontendsRouting: z.boolean().optional(),
});

export type PatchV1ProjectsProjectIdMicrofrontendsBody = {
  microfrontendsGroupId?: string | undefined;
  enabled?: boolean | undefined;
  isDefaultApp?: boolean | undefined;
  defaultRoute?: string | undefined;
  routeObservabilityToThisProject?: boolean | undefined;
  doNotRouteWithMicrofrontendsRouting?: boolean | undefined;
};

export type PatchV1ProjectsProjectIdMicrofrontendsResponse = {
  accountId: string;
  creator?:
    | (
        | {
            type: "user";
            via:
              | { type: "app"; app: { id: string; clientId?: string | undefined } }
              | {
                  type: "integration";
                  integration: { integrationId: string; configurationId: string };
                }
              | null;
            user: { id: string };
          }
        | { type: "app"; app: { id: string; clientId?: string | undefined } }
        | { type: "integration"; integration: { integrationId: string; configurationId: string } }
        | { type: "system" }
      )
    | undefined;
  alias: Array<{
    configuredBy?: ("A" | "CNAME" | "dns-01" | "http" | "null" | null) | undefined;
    configuredChangedAt?: (number | null) | undefined;
    createdAt?: (number | null) | undefined;
    deployment: {
      id: string;
      alias?: Array<string> | undefined;
      aliasAssigned?: (number | boolean | null) | undefined;
      aliasError?: ({ code: string; message: string } | null) | undefined;
      aliasFinal?: (string | null) | undefined;
      automaticAliases?: Array<string> | undefined;
      branchMatcher?: { type: "endsWith" | "equals" | "startsWith"; pattern: string } | undefined;
      buildingAt?: number | undefined;
      builds?:
        | Array<{ use: string; src?: string | undefined; dest?: string | undefined }>
        | undefined;
      checksConclusion?: ("canceled" | "failed" | "skipped" | "succeeded") | undefined;
      checksState?: ("completed" | "registered" | "running") | undefined;
      connectBuildsEnabled?: boolean | undefined;
      connectConfigurationId?: string | undefined;
      createdAt: number;
      createdIn: string;
      creator: {
        email: string;
        githubLogin?: string | undefined;
        gitlabLogin?: string | undefined;
        uid: string;
        username: string;
      } | null;
      deletedAt?: number | undefined;
      deploymentHostname: string;
      forced?: boolean | undefined;
      name: string;
      meta?: Record<string, string> | undefined;
      monorepoManager?: (string | null) | undefined;
      oidcTokenClaims?:
        | {
            iss: string;
            sub: string;
            scope: string;
            aud: string;
            owner: string;
            owner_id: string;
            project: string;
            project_id: string;
            environment: string;
            custom_environment_id?: string | undefined;
            mfe_group_ids?: Array<string> | undefined;
            plan?: string | undefined;
          }
        | undefined;
      plan: "enterprise" | "hobby" | "pro";
      previewCommentsEnabled?: boolean | undefined;
      private: boolean;
      readyAt?: number | undefined;
      readyState:
        | "BLOCKED"
        | "BUILDING"
        | "CANCELED"
        | "ERROR"
        | "INITIALIZING"
        | "QUEUED"
        | "READY";
      readySubstate?: ("PROMOTED" | "ROLLING" | "STAGED") | undefined;
      requestedAt?: number | undefined;
      target?: (string | null) | undefined;
      teamId?: (string | null) | undefined;
      type: "LAMBDAS";
      url: string;
      userId?: string | undefined;
      withCache?: boolean | undefined;
    } | null;
    domain: string;
    environment: "preview" | "production";
    gitBranch?: (string | null) | undefined;
    redirect?: (string | null) | undefined;
    redirectStatusCode?: (number | null) | undefined;
    target: "PREVIEW" | "PRODUCTION" | "STAGING";
  }>;
  analytics?:
    | {
        id: string;
        canceledAt?: (number | null) | undefined;
        disabledAt: number;
        enabledAt: number;
        paidAt?: number | undefined;
        sampleRatePercent?: (number | null) | undefined;
        spendLimitInDollars?: (number | null) | undefined;
      }
    | undefined;
  appliedCve55182Migration?: boolean | undefined;
  speedInsights?:
    | {
        id: string;
        enabledAt?: number | undefined;
        disabledAt?: number | undefined;
        canceledAt?: number | undefined;
        hasData?: boolean | undefined;
        dataReceivedAt?: number | undefined;
        paidAt?: number | undefined;
      }
    | undefined;
  autoExposeSystemEnvs?: boolean | undefined;
  autoAssignCustomDomains?: boolean | undefined;
  autoAssignCustomDomainsUpdatedBy?: string | undefined;
  buildCommand?: (string | null) | undefined;
  commandForIgnoringBuildStep?: (string | null) | undefined;
  connectConfigurations?:
    | (Array<{
        envId: string | "preview" | "production";
        connectConfigurationId: string;
        dc?: string | undefined;
        passive: boolean;
        buildsEnabled: boolean;
        aws?: { subnetIds: Array<string>; securityGroupId?: string | undefined } | undefined;
        createdAt: number;
        updatedAt: number;
      }> | null)
    | undefined;
  connectConfigurationId?: (string | null) | undefined;
  connectBuildsEnabled?: boolean | undefined;
  passiveConnectConfigurationId?: (string | null) | undefined;
  createdAt?: number | undefined;
  customerSupportCodeVisibility?: boolean | undefined;
  crons?:
    | {
        enabledAt: number;
        disabledAt: number | null;
        updatedAt: number;
        deploymentId: string | null;
        definitions: Array<{
          host: string;
          path: string;
          schedule: string;
          source?: "api" | undefined;
          description?: string | undefined;
          hostInferred?: boolean | undefined;
        }>;
      }
    | undefined;
  dataCache?:
    | {
        userDisabled: boolean;
        storageSizeBytes?: (number | null) | undefined;
        unlimited?: boolean | undefined;
      }
    | undefined;
  deploymentExpiration: {
    expirationDays?: number | undefined;
    expirationDaysProduction?: number | undefined;
    expirationDaysCanceled?: number | undefined;
    expirationDaysErrored?: number | undefined;
    deploymentsToKeep?: number | undefined;
  };
  expiration?: ({ expiresAt: number } | { lockedAt: number; lockedBy: string }) | undefined;
  devCommand?: (string | null) | undefined;
  directoryListing: boolean;
  installCommand?: (string | null) | undefined;
  env?:
    | Array<{
        target?:
          | (
              | Array<"development" | "development" | "preview" | "preview" | "production">
              | "development"
              | "development"
              | "preview"
              | "preview"
              | "production"
            )
          | undefined;
        type: "encrypted" | "plain" | "secret" | "sensitive" | "system";
        sunsetSecretId?: string | undefined;
        legacyValue?: string | undefined;
        decrypted?: boolean | undefined;
        value: string;
        vsmValue?: string | undefined;
        id?: string | undefined;
        key: string;
        configurationId?: (string | null) | undefined;
        createdAt?: number | undefined;
        updatedAt?: number | undefined;
        createdBy?: (string | null) | undefined;
        updatedBy?: (string | null) | undefined;
        gitBranch?: string | undefined;
        visibility?: ("config" | "secret") | undefined;
        edgeConfigId?: (string | null) | undefined;
        edgeConfigTokenId?: (string | null) | undefined;
        contentHint?:
          | (
              | { type: "redis-url"; storeId: string }
              | { type: "redis-rest-api-url"; storeId: string }
              | { type: "redis-rest-api-token"; storeId: string }
              | { type: "redis-rest-api-read-only-token"; storeId: string }
              | { type: "blob-read-write-token"; storeId: string }
              | { type: "blob-store-id"; storeId: string }
              | { type: "blob-webhook-public-key"; storeId: string }
              | { type: "postgres-url"; storeId: string }
              | { type: "postgres-url-non-pooling"; storeId: string }
              | { type: "postgres-prisma-url"; storeId: string }
              | { type: "postgres-user"; storeId: string }
              | { type: "postgres-host"; storeId: string }
              | { type: "postgres-password"; storeId: string }
              | { type: "postgres-database"; storeId: string }
              | { type: "postgres-url-no-ssl"; storeId: string }
              | {
                  type: "integration-store-secret";
                  storeId: string;
                  integrationId: string;
                  integrationProductId: string;
                  integrationConfigurationId: string;
                }
              | { type: "flags-connection-string"; projectId: string }
              | null
            )
          | undefined;
        internalContentHint?: ({ type: "flags-secret"; encryptedValue: string } | null) | undefined;
        comment?: string | undefined;
        customEnvironmentIds?: Array<string> | undefined;
      }>
    | undefined;
  customEnvironments?:
    | Array<{
        id: string;
        slug: string;
        type: "development" | "preview" | "production";
        description?: string | undefined;
        branchMatcher?: { type: "endsWith" | "equals" | "startsWith"; pattern: string } | undefined;
        domains?:
          | Array<{
              name: string;
              apexName: string;
              projectId: string;
              redirect?: (string | null) | undefined;
              redirectStatusCode?: (number | null) | undefined;
              gitBranch?: (string | null) | undefined;
              customEnvironmentId?: (string | null) | undefined;
              updatedAt?: number | undefined;
              createdAt?: number | undefined;
              verified: boolean;
              verification?:
                | Array<{ type: string; domain: string; value: string; reason: string }>
                | undefined;
            }>
          | undefined;
        currentDeploymentAliases?: Array<string> | undefined;
        createdAt: number;
        updatedAt: number;
      }>
    | undefined;
  framework?:
    | (
        | "actix-web"
        | "angular"
        | "ash"
        | "astro"
        | "axum"
        | "blitzjs"
        | "brunch"
        | "bun"
        | "container"
        | "create-react-app"
        | "django"
        | "docusaurus"
        | "docusaurus-2"
        | "dojo"
        | "eleventy"
        | "elysia"
        | "ember"
        | "eve"
        | "express"
        | "fastapi"
        | "fasthtml"
        | "fastify"
        | "flask"
        | "gatsby"
        | "go"
        | "gridsome"
        | "h3"
        | "hexo"
        | "hono"
        | "hugo"
        | "hydrogen"
        | "ionic-angular"
        | "ionic-react"
        | "jekyll"
        | "koa"
        | "mastra"
        | "middleman"
        | "nestjs"
        | "nextjs"
        | "nitro"
        | "node"
        | "nuxtjs"
        | "parcel"
        | "polymer"
        | "preact"
        | "python"
        | "react-router"
        | "redwoodjs"
        | "remix"
        | "ruby"
        | "rust"
        | "saber"
        | "sanity"
        | "sanity-v2"
        | "sapper"
        | "scully"
        | "services"
        | "solidstart"
        | "solidstart-1"
        | "stencil"
        | "storybook"
        | "svelte"
        | "sveltekit"
        | "sveltekit-1"
        | "tanstack-start"
        | "tanstack-start-lovable"
        | "umijs"
        | "vite"
        | "vitepress"
        | "vue"
        | "vuepress"
        | "xmcp"
        | "zola"
        | "null"
        | null
      )
    | undefined;
  services?:
    | Array<{
        serviceName: string;
        serviceType?: ("cron" | "job" | "web" | "worker") | undefined;
        framework?:
          | (
              | "actix-web"
              | "angular"
              | "ash"
              | "astro"
              | "axum"
              | "blitzjs"
              | "brunch"
              | "bun"
              | "container"
              | "create-react-app"
              | "django"
              | "docusaurus"
              | "docusaurus-2"
              | "dojo"
              | "eleventy"
              | "elysia"
              | "ember"
              | "eve"
              | "express"
              | "fastapi"
              | "fasthtml"
              | "fastify"
              | "flask"
              | "gatsby"
              | "go"
              | "gridsome"
              | "h3"
              | "hexo"
              | "hono"
              | "hugo"
              | "hydrogen"
              | "ionic-angular"
              | "ionic-react"
              | "jekyll"
              | "koa"
              | "mastra"
              | "middleman"
              | "nestjs"
              | "nextjs"
              | "nitro"
              | "node"
              | "nuxtjs"
              | "parcel"
              | "polymer"
              | "preact"
              | "python"
              | "react-router"
              | "redwoodjs"
              | "remix"
              | "ruby"
              | "rust"
              | "saber"
              | "sanity"
              | "sanity-v2"
              | "sapper"
              | "scully"
              | "services"
              | "solidstart"
              | "solidstart-1"
              | "stencil"
              | "storybook"
              | "svelte"
              | "sveltekit"
              | "sveltekit-1"
              | "tanstack-start"
              | "tanstack-start-lovable"
              | "umijs"
              | "vite"
              | "vitepress"
              | "vue"
              | "vuepress"
              | "xmcp"
              | "zola"
            )
          | undefined;
        runtime?: string | undefined;
      }>
    | undefined;
  gitForkProtection?: boolean | undefined;
  gitLFS?: boolean | undefined;
  id: string;
  ipBuckets?:
    | Array<{ bucket: string; default?: boolean | undefined; supportUntil?: number | undefined }>
    | undefined;
  jobs?:
    | {
        lint?: { targets: Array<string> } | undefined;
        typecheck?: { targets: Array<string> } | undefined;
        "mfe-config-present"?: { targets: Array<string> } | undefined;
      }
    | undefined;
  latestDeployments?:
    | Array<{
        id: string;
        alias?: Array<string> | undefined;
        aliasAssigned?: (number | boolean | null) | undefined;
        aliasError?: ({ code: string; message: string } | null) | undefined;
        aliasFinal?: (string | null) | undefined;
        automaticAliases?: Array<string> | undefined;
        branchMatcher?: { type: "endsWith" | "equals" | "startsWith"; pattern: string } | undefined;
        buildingAt?: number | undefined;
        builds?:
          | Array<{ use: string; src?: string | undefined; dest?: string | undefined }>
          | undefined;
        checksConclusion?: ("canceled" | "failed" | "skipped" | "succeeded") | undefined;
        checksState?: ("completed" | "registered" | "running") | undefined;
        connectBuildsEnabled?: boolean | undefined;
        connectConfigurationId?: string | undefined;
        createdAt: number;
        createdIn: string;
        creator: {
          email: string;
          githubLogin?: string | undefined;
          gitlabLogin?: string | undefined;
          uid: string;
          username: string;
        } | null;
        deletedAt?: number | undefined;
        deploymentHostname: string;
        forced?: boolean | undefined;
        name: string;
        meta?: Record<string, string> | undefined;
        monorepoManager?: (string | null) | undefined;
        oidcTokenClaims?:
          | {
              iss: string;
              sub: string;
              scope: string;
              aud: string;
              owner: string;
              owner_id: string;
              project: string;
              project_id: string;
              environment: string;
              custom_environment_id?: string | undefined;
              mfe_group_ids?: Array<string> | undefined;
              plan?: string | undefined;
            }
          | undefined;
        plan: "enterprise" | "hobby" | "pro";
        previewCommentsEnabled?: boolean | undefined;
        private: boolean;
        readyAt?: number | undefined;
        readyState:
          | "BLOCKED"
          | "BUILDING"
          | "CANCELED"
          | "ERROR"
          | "INITIALIZING"
          | "QUEUED"
          | "READY";
        readySubstate?: ("PROMOTED" | "ROLLING" | "STAGED") | undefined;
        requestedAt?: number | undefined;
        target?: (string | null) | undefined;
        teamId?: (string | null) | undefined;
        type: "LAMBDAS";
        url: string;
        userId?: string | undefined;
        withCache?: boolean | undefined;
      }>
    | undefined;
  link?:
    | (
        | {
            org: string;
            repoOwnerId?: number | undefined;
            repo?: string | undefined;
            repoId?: number | undefined;
            type: "github";
            createdAt?: number | undefined;
            deployHooks: Array<{
              createdAt?: number | undefined;
              id: string;
              name: string;
              ref: string;
              url: string;
            }>;
            gitCredentialId: string;
            updatedAt?: number | undefined;
            sourceless?: boolean | undefined;
            productionBranch: string;
          }
        | {
            type: "github-limited";
            repo?: string | undefined;
            repoId?: number | undefined;
            createdAt?: number | undefined;
            updatedAt?: number | undefined;
            org: string;
            repoOwnerId?: number | undefined;
            deployHooks: Array<{
              createdAt?: number | undefined;
              id: string;
              name: string;
              ref: string;
              url: string;
            }>;
            gitCredentialId: string;
            sourceless?: boolean | undefined;
            productionBranch: string;
          }
        | {
            org: string;
            repoOwnerId?: number | undefined;
            repo?: string | undefined;
            repoId?: number | undefined;
            type: "github-custom-host";
            host: string;
            createdAt?: number | undefined;
            deployHooks: Array<{
              createdAt?: number | undefined;
              id: string;
              name: string;
              ref: string;
              url: string;
            }>;
            gitCredentialId: string;
            updatedAt?: number | undefined;
            sourceless?: boolean | undefined;
            productionBranch: string;
          }
        | {
            projectId: string;
            projectName: string;
            projectNameWithNamespace: string;
            projectNamespace: string;
            projectOwnerId?: number | undefined;
            projectUrl: string;
            type: "gitlab";
            createdAt?: number | undefined;
            deployHooks: Array<{
              createdAt?: number | undefined;
              id: string;
              name: string;
              ref: string;
              url: string;
            }>;
            gitCredentialId: string;
            updatedAt?: number | undefined;
            sourceless?: boolean | undefined;
            productionBranch: string;
          }
        | {
            name: string;
            slug: string;
            owner: string;
            type: "bitbucket";
            uuid: string;
            workspaceUuid: string;
            createdAt?: number | undefined;
            deployHooks: Array<{
              createdAt?: number | undefined;
              id: string;
              name: string;
              ref: string;
              url: string;
            }>;
            gitCredentialId: string;
            updatedAt?: number | undefined;
            sourceless?: boolean | undefined;
            productionBranch: string;
          }
        | {
            org: string;
            repo: string;
            type: "vercel";
            createdAt?: number | undefined;
            deployHooks: Array<{
              createdAt?: number | undefined;
              id: string;
              name: string;
              ref: string;
              url: string;
            }>;
            gitCredentialId: string;
            updatedAt?: number | undefined;
            sourceless?: boolean | undefined;
            productionBranch: string;
          }
        | {
            owner: string;
            repo: string;
            repoId: string;
            ownerId: string;
            type: "cursor-origin";
            createdAt?: number | undefined;
            deployHooks: Array<{
              createdAt?: number | undefined;
              id: string;
              name: string;
              ref: string;
              url: string;
            }>;
            gitCredentialId: string;
            updatedAt?: number | undefined;
            sourceless?: boolean | undefined;
            productionBranch: string;
          }
      )
    | undefined;
  blobs?: { isDefaultApp?: boolean | undefined } | undefined;
  microfrontends?:
    | (
        | {
            isDefaultApp: true;
            updatedAt: number;
            groupIds: Array<string>;
            enabled: true;
            defaultRoute?: string | undefined;
            freeProjectForLegacyLimits?: boolean | undefined;
          }
        | {
            isDefaultApp?: false | undefined;
            routeObservabilityToThisProject?: boolean | undefined;
            doNotRouteWithMicrofrontendsRouting?: boolean | undefined;
            updatedAt: number;
            groupIds: Array<string>;
            enabled: true;
            defaultRoute?: string | undefined;
            freeProjectForLegacyLimits?: boolean | undefined;
          }
        | {
            updatedAt: number;
            groupIds: Array<unknown>;
            enabled: false;
            freeProjectForLegacyLimits?: boolean | undefined;
          }
      )
    | undefined;
  name: string;
  nodeVersion: "10.x" | "12.x" | "14.x" | "16.x" | "18.x" | "20.x" | "22.x" | "24.x" | "8.10.x";
  optionsAllowlist?: ({ paths: Array<{ value: string }> } | null) | undefined;
  outputDirectory?: (string | null) | undefined;
  passwordProtection?: (Record<string, never> | null) | undefined;
  passport?:
    | ({
        deploymentType:
          | "all"
          | "all_except_custom_domains"
          | "preview"
          | "prod_deployment_urls_and_all_previews";
        connectorId: string;
      } | null)
    | undefined;
  protectionConfig?:
    | { sandboxUrls?: { inheritDeploymentProtection?: boolean | undefined } | undefined }
    | undefined;
  sandbox?:
    | {
        region?:
          | (
              | "arn1"
              | "bom1"
              | "cdg1"
              | "cle1"
              | "cpt1"
              | "dub1"
              | "fra1"
              | "gru1"
              | "hkg1"
              | "hnd1"
              | "iad1"
              | "icn1"
              | "kix1"
              | "lhr1"
              | "pdx1"
              | "sfo1"
              | "sin1"
              | "syd1"
              | "yul1"
            )
          | undefined;
        failoverRegions?:
          | Array<
              | "arn1"
              | "bom1"
              | "cdg1"
              | "cle1"
              | "cpt1"
              | "dub1"
              | "fra1"
              | "gru1"
              | "hkg1"
              | "hnd1"
              | "iad1"
              | "icn1"
              | "kix1"
              | "lhr1"
              | "pdx1"
              | "sfo1"
              | "sin1"
              | "syd1"
              | "yul1"
            >
          | undefined;
      }
    | undefined;
  productionDeploymentsFastLane?: boolean | undefined;
  resourceConfig: {
    elasticConcurrencyEnabled?: boolean | undefined;
    fluid?: boolean | undefined;
    functionDefaultRegions: Array<string>;
    functionDefaultTimeout?: number | undefined;
    functionDefaultMemoryType?:
      | ("performance" | "performance_xl" | "standard" | "standard_legacy")
      | undefined;
    functionZeroConfigFailover?: boolean | undefined;
    buildMachineType?: ("basic" | "enhanced" | "standard" | "turbo") | undefined;
    buildMachineSelection?: ("elastic" | "fixed") | undefined;
    buildMachineElasticLastUpdated?: number | undefined;
    buildMachineElasticReason?:
      | (
          | "basic-floor"
          | "build-timeout-failure"
          | "enospc-failure"
          | "enterprise-floor"
          | "high-peak-disk"
          | "high-peak-memory"
          | "long-build-duration"
          | "oom-failure"
          | "short-build-duration"
          | "sustained-high-cpu"
        )
      | undefined;
    isNSNBDisabled?: boolean | undefined;
    buildQueue?:
      | { configuration?: ("SKIP_NAMESPACE_QUEUE" | "WAIT_FOR_NAMESPACE_QUEUE") | undefined }
      | undefined;
    enableFunctionsBeta?: boolean | undefined;
  };
  rollbackDescription?:
    | { userId: string; username: string; description: string; createdAt: number }
    | undefined;
  rollingRelease?:
    | ({
        target: string;
        stages?:
          | (Array<{
              targetPercentage: number;
              requireApproval?: boolean | undefined;
              duration?: number | undefined;
              linearShift?: boolean | undefined;
            }> | null)
          | undefined;
        canaryResponseHeader?: boolean | undefined;
        gate?:
          | {
              enabled: boolean;
              checks: Array<{
                type: "error-rate-5xx";
                minSampleSize?: number | undefined;
                excludeStatusCodes?: Array<number> | undefined;
                excludePaths?: Array<string> | undefined;
                ingestWatermarkSeconds?: number | undefined;
              }>;
              failureThreshold?: number | undefined;
              windowSize?: number | undefined;
              action: "pause" | "rollback";
              dryRun: boolean;
            }
          | undefined;
      } | null)
    | undefined;
  defaultResourceConfig: {
    elasticConcurrencyEnabled?: boolean | undefined;
    fluid?: boolean | undefined;
    functionDefaultRegions: Array<string>;
    functionDefaultTimeout?: number | undefined;
    functionDefaultMemoryType?:
      | ("performance" | "performance_xl" | "standard" | "standard_legacy")
      | undefined;
    functionZeroConfigFailover?: boolean | undefined;
    buildMachineType?: ("basic" | "enhanced" | "standard" | "turbo") | undefined;
    buildMachineSelection?: ("elastic" | "fixed") | undefined;
    buildMachineElasticLastUpdated?: number | undefined;
    buildMachineElasticReason?:
      | (
          | "basic-floor"
          | "build-timeout-failure"
          | "enospc-failure"
          | "enterprise-floor"
          | "high-peak-disk"
          | "high-peak-memory"
          | "long-build-duration"
          | "oom-failure"
          | "short-build-duration"
          | "sustained-high-cpu"
        )
      | undefined;
    isNSNBDisabled?: boolean | undefined;
    buildQueue?:
      | { configuration?: ("SKIP_NAMESPACE_QUEUE" | "WAIT_FOR_NAMESPACE_QUEUE") | undefined }
      | undefined;
    enableFunctionsBeta?: boolean | undefined;
  };
  rootDirectory?: (string | null) | undefined;
  serverlessFunctionZeroConfigFailover?: boolean | undefined;
  skewProtectionBoundaryAt?: number | undefined;
  skewProtectionMaxAge?: number | undefined;
  skewProtectionAllowedDomains?: Array<string> | undefined;
  skipGitConnectDuringLink?: boolean | undefined;
  staticIps?: { builds: boolean; enabled: boolean; regions: Array<string> } | undefined;
  sourceFilesOutsideRootDirectory?: boolean | undefined;
  enableAffectedProjectsDeployments?: boolean | undefined;
  enableExternalRewriteCaching?: boolean | undefined;
  ssoProtection?:
    | ({
        deploymentType:
          | "all"
          | "all_except_custom_domains"
          | "preview"
          | "prod_deployment_urls_and_all_previews";
        cve55182MigrationAppliedFrom?:
          | (
              | "all"
              | "all_except_custom_domains"
              | "preview"
              | "prod_deployment_urls_and_all_previews"
              | "null"
              | null
            )
          | undefined;
        april2026SecurityIncidentMigrationAppliedFrom?:
          | (
              | "all"
              | "all_except_custom_domains"
              | "preview"
              | "prod_deployment_urls_and_all_previews"
              | "null"
              | null
            )
          | undefined;
      } | null)
    | undefined;
  targets?:
    | Record<
        string,
        {
          id: string;
          alias?: Array<string> | undefined;
          aliasAssigned?: (number | boolean | null) | undefined;
          aliasError?: ({ code: string; message: string } | null) | undefined;
          aliasFinal?: (string | null) | undefined;
          automaticAliases?: Array<string> | undefined;
          branchMatcher?:
            | { type: "endsWith" | "equals" | "startsWith"; pattern: string }
            | undefined;
          buildingAt?: number | undefined;
          builds?:
            | Array<{ use: string; src?: string | undefined; dest?: string | undefined }>
            | undefined;
          checksConclusion?: ("canceled" | "failed" | "skipped" | "succeeded") | undefined;
          checksState?: ("completed" | "registered" | "running") | undefined;
          connectBuildsEnabled?: boolean | undefined;
          connectConfigurationId?: string | undefined;
          createdAt: number;
          createdIn: string;
          creator: {
            email: string;
            githubLogin?: string | undefined;
            gitlabLogin?: string | undefined;
            uid: string;
            username: string;
          } | null;
          deletedAt?: number | undefined;
          deploymentHostname: string;
          forced?: boolean | undefined;
          name: string;
          meta?: Record<string, string> | undefined;
          monorepoManager?: (string | null) | undefined;
          oidcTokenClaims?:
            | {
                iss: string;
                sub: string;
                scope: string;
                aud: string;
                owner: string;
                owner_id: string;
                project: string;
                project_id: string;
                environment: string;
                custom_environment_id?: string | undefined;
                mfe_group_ids?: Array<string> | undefined;
                plan?: string | undefined;
              }
            | undefined;
          plan: "enterprise" | "hobby" | "pro";
          previewCommentsEnabled?: boolean | undefined;
          private: boolean;
          readyAt?: number | undefined;
          readyState:
            | "BLOCKED"
            | "BUILDING"
            | "CANCELED"
            | "ERROR"
            | "INITIALIZING"
            | "QUEUED"
            | "READY";
          readySubstate?: ("PROMOTED" | "ROLLING" | "STAGED") | undefined;
          requestedAt?: number | undefined;
          target?: (string | null) | undefined;
          teamId?: (string | null) | undefined;
          type: "LAMBDAS";
          url: string;
          userId?: string | undefined;
          withCache?: boolean | undefined;
        } | null
      >
    | undefined;
  transferCompletedAt?: number | undefined;
  transferStartedAt?: number | undefined;
  transferToAccountId?: string | undefined;
  transferredFromAccountId?: string | undefined;
  updatedAt?: number | undefined;
  live?: boolean | undefined;
  enablePreviewFeedback?: (boolean | null) | undefined;
  enableProductionFeedback?: (boolean | null) | undefined;
  permissions?:
    | {
        oauth2Connection?: Array<ACLAction> | undefined;
        user?: Array<ACLAction> | undefined;
        userConnection?: Array<ACLAction> | undefined;
        userMfaConfiguration?: Array<ACLAction> | undefined;
        userPreference?: Array<ACLAction> | undefined;
        userSudo?: Array<ACLAction> | undefined;
        webAuthn?: Array<ACLAction> | undefined;
        accessGroup?: Array<ACLAction> | undefined;
        agent?: Array<ACLAction> | undefined;
        aiGatewayApiKey?: Array<ACLAction> | undefined;
        aiGatewayApiKeyBypassAll?: Array<ACLAction> | undefined;
        aiGatewayApiKeyOwnedBySelf?: Array<ACLAction> | undefined;
        aiGatewayApiKeySpendAttribution?: Array<ACLAction> | undefined;
        aiGatewayApiKeyZdrExemption?: Array<ACLAction> | undefined;
        aiGatewayBudget?: Array<ACLAction> | undefined;
        aiGatewayCredits?: Array<ACLAction> | undefined;
        aiGatewayPrivateModels?: Array<ACLAction> | undefined;
        aiGatewayGuardrails?: Array<ACLAction> | undefined;
        aiGatewayRules?: Array<ACLAction> | undefined;
        aiGatewaySettings?: Array<ACLAction> | undefined;
        aiGatewayUsage?: Array<ACLAction> | undefined;
        aiGatewayVirtualModelConfigs?: Array<ACLAction> | undefined;
        alerts?: Array<ACLAction> | undefined;
        alertRules?: Array<ACLAction> | undefined;
        aliasGlobal?: Array<ACLAction> | undefined;
        analyticsSampling?: Array<ACLAction> | undefined;
        analyticsUsage?: Array<ACLAction> | undefined;
        apiKey?: Array<ACLAction> | undefined;
        apiKeyAiGateway?: Array<ACLAction> | undefined;
        apiKeyOwnedBySelf?: Array<ACLAction> | undefined;
        oauth2Application?: Array<ACLAction> | undefined;
        vercelAppInstallation?: Array<ACLAction> | undefined;
        vercelAppInstallationRequest?: Array<ACLAction> | undefined;
        auditLog?: Array<ACLAction> | undefined;
        billingAddress?: Array<ACLAction> | undefined;
        billingInformation?: Array<ACLAction> | undefined;
        billingInvoice?: Array<ACLAction> | undefined;
        billingInvoiceEmailRecipient?: Array<ACLAction> | undefined;
        billingInvoiceLanguage?: Array<ACLAction> | undefined;
        billingPlan?: Array<ACLAction> | undefined;
        billingPurchaseOrder?: Array<ACLAction> | undefined;
        billingRefund?: Array<ACLAction> | undefined;
        billingTaxId?: Array<ACLAction> | undefined;
        blob?: Array<ACLAction> | undefined;
        blobStoreTokenSet?: Array<ACLAction> | undefined;
        budget?: Array<ACLAction> | undefined;
        cacheArtifact?: Array<ACLAction> | undefined;
        cacheArtifactUsageEvent?: Array<ACLAction> | undefined;
        codeChecks?: Array<ACLAction> | undefined;
        codeOwners?: Array<ACLAction> | undefined;
        ciInvocations?: Array<ACLAction> | undefined;
        ciLogs?: Array<ACLAction> | undefined;
        concurrentBuilds?: Array<ACLAction> | undefined;
        connect?: Array<ACLAction> | undefined;
        connectConfiguration?: Array<ACLAction> | undefined;
        connectLogs?: Array<ACLAction> | undefined;
        connexClient?: Array<ACLAction> | undefined;
        connexClientProject?: Array<ACLAction> | undefined;
        connexContact?: Array<ACLAction> | undefined;
        connexInstallation?: Array<ACLAction> | undefined;
        connexToken?: Array<ACLAction> | undefined;
        buildMachineDefault?: Array<ACLAction> | undefined;
        cursorOriginInstallation?: Array<ACLAction> | undefined;
        dataCacheBillingSettings?: Array<ACLAction> | undefined;
        defaultDeploymentProtection?: Array<ACLAction> | undefined;
        deploymentPolicy?: Array<ACLAction> | undefined;
        domain?: Array<ACLAction> | undefined;
        domainAcceptDelegation?: Array<ACLAction> | undefined;
        domainAuthCodes?: Array<ACLAction> | undefined;
        domainCertificate?: Array<ACLAction> | undefined;
        domainCheckConfig?: Array<ACLAction> | undefined;
        domainMove?: Array<ACLAction> | undefined;
        domainPurchase?: Array<ACLAction> | undefined;
        domainRecord?: Array<ACLAction> | undefined;
        domainTransferIn?: Array<ACLAction> | undefined;
        drain?: Array<ACLAction> | undefined;
        edgeConfig?: Array<ACLAction> | undefined;
        edgeConfigItem?: Array<ACLAction> | undefined;
        edgeConfigSchema?: Array<ACLAction> | undefined;
        edgeConfigToken?: Array<ACLAction> | undefined;
        endpointVerification?: Array<ACLAction> | undefined;
        event?: Array<ACLAction> | undefined;
        fileUpload?: Array<ACLAction> | undefined;
        flagsExplorerSubscription?: Array<ACLAction> | undefined;
        gitRepository?: Array<ACLAction> | undefined;
        imageOptimizationNewPrice?: Array<ACLAction> | undefined;
        integration?: Array<ACLAction> | undefined;
        integrationAccount?: Array<ACLAction> | undefined;
        integrationConfiguration?: Array<ACLAction> | undefined;
        integrationConfigurationProjects?: Array<ACLAction> | undefined;
        integrationConfigurationRole?: Array<ACLAction> | undefined;
        integrationConfigurationTransfer?: Array<ACLAction> | undefined;
        integrationDeploymentAction?: Array<ACLAction> | undefined;
        integrationEvent?: Array<ACLAction> | undefined;
        integrationLog?: Array<ACLAction> | undefined;
        integrationResource?: Array<ACLAction> | undefined;
        integrationResourceData?: Array<ACLAction> | undefined;
        integrationResourceReplCommand?: Array<ACLAction> | undefined;
        integrationResourceSecrets?: Array<ACLAction> | undefined;
        integrationSSOSession?: Array<ACLAction> | undefined;
        integrationStrict?: Array<ACLAction> | undefined;
        integrationStoreTokenSet?: Array<ACLAction> | undefined;
        integrationVercelConfigurationOverride?: Array<ACLAction> | undefined;
        integrationPullRequest?: Array<ACLAction> | undefined;
        ipBlocking?: Array<ACLAction> | undefined;
        jobGlobal?: Array<ACLAction> | undefined;
        kmsIssuer?: Array<ACLAction> | undefined;
        kmsProjectGrant?: Array<ACLAction> | undefined;
        logDrain?: Array<ACLAction> | undefined;
        marketplaceBillingData?: Array<ACLAction> | undefined;
        marketplaceExperimentationEdgeConfigData?: Array<ACLAction> | undefined;
        marketplaceExperimentationItem?: Array<ACLAction> | undefined;
        marketplaceFlexCommit?: Array<ACLAction> | undefined;
        marketplaceInstallationMember?: Array<ACLAction> | undefined;
        marketplaceInvoice?: Array<ACLAction> | undefined;
        marketplaceSettings?: Array<ACLAction> | undefined;
        Monitoring?: Array<ACLAction> | undefined;
        monitoringAlert?: Array<ACLAction> | undefined;
        monitoringChart?: Array<ACLAction> | undefined;
        monitoringQuery?: Array<ACLAction> | undefined;
        monitoringSettings?: Array<ACLAction> | undefined;
        notificationCustomerBudget?: Array<ACLAction> | undefined;
        notificationDeploymentFailed?: Array<ACLAction> | undefined;
        notificationDomainConfiguration?: Array<ACLAction> | undefined;
        notificationDomainExpire?: Array<ACLAction> | undefined;
        notificationDomainMoved?: Array<ACLAction> | undefined;
        notificationDomainPurchase?: Array<ACLAction> | undefined;
        notificationDomainRenewal?: Array<ACLAction> | undefined;
        notificationDomainTransfer?: Array<ACLAction> | undefined;
        notificationDomainUnverified?: Array<ACLAction> | undefined;
        NotificationMonitoringAlert?: Array<ACLAction> | undefined;
        notificationPaymentFailed?: Array<ACLAction> | undefined;
        notificationPreferences?: Array<ACLAction> | undefined;
        notificationStatementOfReasons?: Array<ACLAction> | undefined;
        notificationUsageAlert?: Array<ACLAction> | undefined;
        oidcFederationPolicy?: Array<ACLAction> | undefined;
        observabilityConfiguration?: Array<ACLAction> | undefined;
        observabilityFunnel?: Array<ACLAction> | undefined;
        observabilityNotebook?: Array<ACLAction> | undefined;
        openTelemetryEndpoint?: Array<ACLAction> | undefined;
        ownEvent?: Array<ACLAction> | undefined;
        organization?: Array<ACLAction> | undefined;
        organizationDomain?: Array<ACLAction> | undefined;
        organizationTeam?: Array<ACLAction> | undefined;
        passwordProtectionInvoiceItem?: Array<ACLAction> | undefined;
        paymentMethod?: Array<ACLAction> | undefined;
        permissions?: Array<ACLAction> | undefined;
        postgres?: Array<ACLAction> | undefined;
        postgresStoreTokenSet?: Array<ACLAction> | undefined;
        previewDeploymentSuffix?: Array<ACLAction> | undefined;
        privateCloudAccount?: Array<ACLAction> | undefined;
        projectTransferIn?: Array<ACLAction> | undefined;
        proTrialOnboarding?: Array<ACLAction> | undefined;
        rateLimit?: Array<ACLAction> | undefined;
        redis?: Array<ACLAction> | undefined;
        redisStoreTokenSet?: Array<ACLAction> | undefined;
        remoteCaching?: Array<ACLAction> | undefined;
        repository?: Array<ACLAction> | undefined;
        samlConfig?: Array<ACLAction> | undefined;
        secret?: Array<ACLAction> | undefined;
        securityConfig?: Array<ACLAction> | undefined;
        sensitiveEnvironmentVariablePolicy?: Array<ACLAction> | undefined;
        sharedEnvVars?: Array<ACLAction> | undefined;
        sharedEnvVarsProduction?: Array<ACLAction> | undefined;
        space?: Array<ACLAction> | undefined;
        spaceRun?: Array<ACLAction> | undefined;
        storeIsLocked?: Array<ACLAction> | undefined;
        storeTokenSetSensitive?: Array<ACLAction> | undefined;
        storeTransfer?: Array<ACLAction> | undefined;
        supportCase?: Array<ACLAction> | undefined;
        supportCaseComment?: Array<ACLAction> | undefined;
        team?: Array<ACLAction> | undefined;
        teamAccessRequest?: Array<ACLAction> | undefined;
        teamFellowMembership?: Array<ACLAction> | undefined;
        teamGitExclusivity?: Array<ACLAction> | undefined;
        teamInvite?: Array<ACLAction> | undefined;
        teamInviteCode?: Array<ACLAction> | undefined;
        teamInviteLink?: Array<ACLAction> | undefined;
        teamJoin?: Array<ACLAction> | undefined;
        teamMemberMfaStatus?: Array<ACLAction> | undefined;
        teamMicrofrontends?: Array<ACLAction> | undefined;
        teamOwnMembership?: Array<ACLAction> | undefined;
        teamOwnMembershipDisconnectSAML?: Array<ACLAction> | undefined;
        teamSudo?: Array<ACLAction> | undefined;
        teamTokenInvalidation?: Array<ACLAction> | undefined;
        token?: Array<ACLAction> | undefined;
        toolbarComment?: Array<ACLAction> | undefined;
        usage?: Array<ACLAction> | undefined;
        usageCycle?: Array<ACLAction> | undefined;
        vcrRepository?: Array<ACLAction> | undefined;
        vpcPeeringConnection?: Array<ACLAction> | undefined;
        webAnalyticsPlan?: Array<ACLAction> | undefined;
        webhook?: Array<ACLAction> | undefined;
        "webhook-event"?: Array<ACLAction> | undefined;
        aliasProject?: Array<ACLAction> | undefined;
        aliasProtectionBypass?: Array<ACLAction> | undefined;
        bulkRedirects?: Array<ACLAction> | undefined;
        buildMachine?: Array<ACLAction> | undefined;
        connectConfigurationLink?: Array<ACLAction> | undefined;
        dataCacheNamespace?: Array<ACLAction> | undefined;
        deployment?: Array<ACLAction> | undefined;
        deploymentBuildLogs?: Array<ACLAction> | undefined;
        deploymentCheck?: Array<ACLAction> | undefined;
        deploymentCheckPreview?: Array<ACLAction> | undefined;
        deploymentCheckReRunFromProductionBranch?: Array<ACLAction> | undefined;
        deploymentProductionGit?: Array<ACLAction> | undefined;
        deploymentV0?: Array<ACLAction> | undefined;
        deploymentPreview?: Array<ACLAction> | undefined;
        deploymentPrivate?: Array<ACLAction> | undefined;
        deploymentPromote?: Array<ACLAction> | undefined;
        deploymentRollback?: Array<ACLAction> | undefined;
        edgeCacheNamespace?: Array<ACLAction> | undefined;
        environments?: Array<ACLAction> | undefined;
        job?: Array<ACLAction> | undefined;
        logs?: Array<ACLAction> | undefined;
        logsPreset?: Array<ACLAction> | undefined;
        observabilityData?: Array<ACLAction> | undefined;
        onDemandBuild?: Array<ACLAction> | undefined;
        onDemandConcurrency?: Array<ACLAction> | undefined;
        optionsAllowlist?: Array<ACLAction> | undefined;
        passwordProtection?: Array<ACLAction> | undefined;
        privateLinkEndpoint?: Array<ACLAction> | undefined;
        productionAliasProtectionBypass?: Array<ACLAction> | undefined;
        productionShareableLink?: Array<ACLAction> | undefined;
        project?: Array<ACLAction> | undefined;
        projectAccessGroup?: Array<ACLAction> | undefined;
        projectAnalyticsSampling?: Array<ACLAction> | undefined;
        projectAnalyticsUsage?: Array<ACLAction> | undefined;
        projectCheck?: Array<ACLAction> | undefined;
        projectCheckRun?: Array<ACLAction> | undefined;
        projectDeploymentExpiration?: Array<ACLAction> | undefined;
        projectDeploymentHook?: Array<ACLAction> | undefined;
        projectDeploymentProtectionStrict?: Array<ACLAction> | undefined;
        projectDomain?: Array<ACLAction> | undefined;
        projectDomainCheckConfig?: Array<ACLAction> | undefined;
        projectDomainMove?: Array<ACLAction> | undefined;
        projectDomainVerify?: Array<ACLAction> | undefined;
        projectEvent?: Array<ACLAction> | undefined;
        projectEnvVars?: Array<ACLAction> | undefined;
        projectEnvVarsProduction?: Array<ACLAction> | undefined;
        projectEnvVarsUnownedByIntegration?: Array<ACLAction> | undefined;
        projectFlags?: Array<ACLAction> | undefined;
        projectFlagsProduction?: Array<ACLAction> | undefined;
        projectFlagsSdkKey?: Array<ACLAction> | undefined;
        projectFromV0?: Array<ACLAction> | undefined;
        projectId?: Array<ACLAction> | undefined;
        projectIntegrationConfiguration?: Array<ACLAction> | undefined;
        projectLink?: Array<ACLAction> | undefined;
        projectMember?: Array<ACLAction> | undefined;
        projectMonitoring?: Array<ACLAction> | undefined;
        projectOIDCToken?: Array<ACLAction> | undefined;
        projectPermissions?: Array<ACLAction> | undefined;
        projectProductionBranch?: Array<ACLAction> | undefined;
        projectProtectionBypass?: Array<ACLAction> | undefined;
        projectRollingRelease?: Array<ACLAction> | undefined;
        projectRoutes?: Array<ACLAction> | undefined;
        projectSupportCase?: Array<ACLAction> | undefined;
        projectSupportCaseComment?: Array<ACLAction> | undefined;
        projectTier?: Array<ACLAction> | undefined;
        projectTransfer?: Array<ACLAction> | undefined;
        projectTransferOut?: Array<ACLAction> | undefined;
        projectUsage?: Array<ACLAction> | undefined;
        pageIntegrity?: Array<ACLAction> | undefined;
        seawallConfig?: Array<ACLAction> | undefined;
        securityPlusConfiguration?: Array<ACLAction> | undefined;
        shareableLink?: Array<ACLAction> | undefined;
        shareableLinkStrict?: Array<ACLAction> | undefined;
        sharedEnvVarConnection?: Array<ACLAction> | undefined;
        skewProtection?: Array<ACLAction> | undefined;
        analytics?: Array<ACLAction> | undefined;
        trustedIps?: Array<ACLAction> | undefined;
        trustedSources?: Array<ACLAction> | undefined;
        v0Chat?: Array<ACLAction> | undefined;
        vercelAuth?: Array<ACLAction> | undefined;
        vercelRun?: Array<ACLAction> | undefined;
        webAnalytics?: Array<ACLAction> | undefined;
        workflowRunData?: Array<ACLAction> | undefined;
      }
    | undefined;
  lastRollbackTarget?: (Record<string, never> | null) | undefined;
  lastAliasRequest?:
    | ({
        fromDeploymentId: string | null;
        toDeploymentId: string;
        fromRollingReleaseId?: string | undefined;
        jobStatus: "failed" | "in-progress" | "pending" | "skipped" | "succeeded";
        requestedAt: number;
        type: "promote" | "rollback";
      } | null)
    | undefined;
  protectionBypass?:
    | Record<
        string,
        | {
            createdAt: number;
            createdBy: string;
            scope: "integration-automation-bypass";
            integrationId: string;
            configurationId: string;
          }
        | {
            createdAt: number;
            createdBy: string;
            scope: "automation-bypass";
            isEnvVar?: boolean | undefined;
            note?: string | undefined;
          }
      >
    | undefined;
  hasActiveBranches?: boolean | undefined;
  trustedIps?:
    | (
        | {
            deploymentType:
              | "all"
              | "all_except_custom_domains"
              | "preview"
              | "prod_deployment_urls_and_all_previews"
              | "production";
            addresses: Array<{ value: string; note?: string | undefined }>;
            protectionMode: "additional" | "exclusive";
          }
        | {
            deploymentType:
              | "all"
              | "all_except_custom_domains"
              | "preview"
              | "prod_deployment_urls_and_all_previews"
              | "production";
          }
        | null
      )
    | undefined;
  trustedSources?:
    | ({
        projects?:
          | Record<
              string,
              {
                label?: string | undefined;
                customAllow?:
                  | Array<{
                      from:
                        | { slugs: Array<string>; preset?: "all-custom" | undefined }
                        | { slugs?: Array<string> | undefined; preset: "all-custom" };
                      to:
                        | { slugs: Array<string>; preset?: "all-custom" | undefined }
                        | { slugs?: Array<string> | undefined; preset: "all-custom" };
                    }>
                  | undefined;
              }
            >
          | undefined;
        oidcProviders?:
          | Record<
              string,
              Array<{
                to:
                  | { slugs: Array<string>; preset?: "all-custom" | undefined }
                  | { slugs?: Array<string> | undefined; preset: "all-custom" };
                label?: string | undefined;
                claims: Record<string, Array<string>>;
              }>
            >
          | undefined;
      } | null)
    | undefined;
  gitComments?: { onPullRequest: boolean; onCommit: boolean } | undefined;
  gitProviderOptions?:
    | {
        createDeployments: "disabled" | "enabled";
        disableRepositoryDispatchEvents?: boolean | undefined;
        requireVerifiedCommits?: boolean | undefined;
        gitCommitStatus?: boolean | undefined;
        consolidatedGitCommitStatus?: { enabled: boolean; propagateFailures: boolean } | undefined;
      }
    | undefined;
  paused?: boolean | undefined;
  concurrencyBucketName?: string | undefined;
  webAnalytics?:
    | {
        id: string;
        disabledAt?: number | undefined;
        canceledAt?: number | undefined;
        enabledAt?: number | undefined;
        hasData?: true | undefined;
      }
    | undefined;
  security?:
    | {
        attackModeEnabled?: boolean | undefined;
        attackModeUpdatedAt?: number | undefined;
        firewallEnabled?: boolean | undefined;
        firewallUpdatedAt?: number | undefined;
        attackModeActiveUntil?: (number | null) | undefined;
        firewallConfigVersion?: number | undefined;
        rulesets?:
          | Record<
              string,
              {
                action:
                  | "allow"
                  | "bypass"
                  | "challenge"
                  | "deny"
                  | "log"
                  | "rate_limit"
                  | "redirect";
                rateLimit?:
                  | ({
                      algo: "fixed_window" | "token_bucket";
                      window: number;
                      limit: number;
                      keys: Array<string>;
                    } | null)
                  | undefined;
                redirect?: ({ location: string; permanent: boolean } | null) | undefined;
                actionDuration?: (string | null) | undefined;
                bypassSystem?: (boolean | null) | undefined;
                logHeaders?: (Array<string> | "*") | undefined;
              }
            >
          | undefined;
        firewallSeawallEnabled?: boolean | undefined;
        ja3Enabled?: boolean | undefined;
        ja4Enabled?: boolean | undefined;
        firewallBypassIps?: Array<string> | undefined;
        managedRules?:
          | ({
              vercel_ruleset: {
                active: boolean;
                action?: ("challenge" | "deny" | "log") | undefined;
              };
              traffic_sources: {
                active: boolean;
                action?: ("challenge" | "deny" | "log") | undefined;
              };
              bot_filter: { active: boolean; action?: ("challenge" | "deny" | "log") | undefined };
              ai_bots: { active: boolean; action?: ("challenge" | "deny" | "log") | undefined };
              owasp: { active: boolean; action?: ("challenge" | "deny" | "log") | undefined };
            } | null)
          | undefined;
        botIdEnabled?: boolean | undefined;
        log_headers?: (Array<string> | "*") | undefined;
        securityPlus?: boolean | undefined;
        securityPlusMetadata?:
          | { updatedAt: number; firstEnabledAt?: number | undefined }
          | undefined;
        pageIntegrityEnabled?: boolean | undefined;
      }
    | undefined;
  oidcTokenConfig?:
    | { enabled?: boolean | undefined; issuerMode?: ("global" | "team") | undefined }
    | undefined;
  deploymentPolicy?:
    | ({
        gitSources?:
          | (Array<{
              sources: Array<
                | { provider: "bitbucket" | "github"; org: string; repo?: string | undefined }
                | { provider: "gitlab"; namespace: string; project?: string | undefined }
              >;
              enabled: boolean;
              environments: Array<
                | { type: "system"; target: "preview" | "production" }
                | { type: "custom"; environmentId: string }
              >;
            }> | null)
          | undefined;
        deploymentSources?:
          | (Array<{
              sources: Array<"cli" | "deploy-hook" | "git" | "integration" | "rest-api" | "v0">;
              enabled: boolean;
              environments: Array<
                | { type: "system"; target: "preview" | "production" }
                | { type: "custom"; environmentId: string }
              >;
            }> | null)
          | undefined;
      } | null)
    | undefined;
  tier?: ("advanced" | "critical") | undefined;
  usageStatus?:
    | {
        kind: "flat";
        exceededAllowanceUntil?: number | undefined;
        bypassThrottleUntil?: number | undefined;
        throttled?: boolean | undefined;
        teamThrottled?: boolean | undefined;
      }
    | undefined;
  features?: { webAnalytics?: boolean | undefined } | undefined;
  v0?: boolean | undefined;
  v0Created?: boolean | undefined;
  abuse?:
    | {
        scanner?: string | undefined;
        history: Array<{ scanner: string; reason: string; by: string; byId: string; at: number }>;
        updatedAt: number;
        block?:
          | {
              action: "blocked";
              reason: string;
              statusCode: number;
              createdAt: number;
              caseId?: string | undefined;
              actor?: string | undefined;
              comment?: string | undefined;
              ineligibleForAppeal?: boolean | undefined;
              isCascading?: boolean | undefined;
            }
          | undefined;
        blockHistory?:
          | Array<
              | {
                  action: "blocked";
                  reason: string;
                  statusCode: number;
                  createdAt: number;
                  caseId?: string | undefined;
                  actor?: string | undefined;
                  comment?: string | undefined;
                  ineligibleForAppeal?: boolean | undefined;
                  isCascading?: boolean | undefined;
                }
              | {
                  action: "unblocked";
                  createdAt: number;
                  caseId?: string | undefined;
                  actor?: string | undefined;
                  comment?: string | undefined;
                  ineligibleForAppeal?: boolean | undefined;
                  isCascading?: boolean | undefined;
                }
              | {
                  action: "route-blocked";
                  route:
                    | { src: string; status: number; expiry?: number | undefined }
                    | {
                        has: Array<
                          | { type: "header"; key: "x-vercel-ip-country"; value: { eq: string } }
                          | { type: "host"; value: { eq: string } }
                        >;
                        mitigate: { action: "block_legal_cwc" };
                        src?: string | undefined;
                      };
                  reason: string;
                  createdAt: number;
                  caseId?: string | undefined;
                  actor?: string | undefined;
                  comment?: string | undefined;
                  ineligibleForAppeal?: boolean | undefined;
                  isCascading?: boolean | undefined;
                }
              | {
                  action: "route-unblocked";
                  route:
                    | { src: string; status: number; expiry?: number | undefined }
                    | {
                        has: Array<
                          | { type: "header"; key: "x-vercel-ip-country"; value: { eq: string } }
                          | { type: "host"; value: { eq: string } }
                        >;
                        mitigate: { action: "block_legal_cwc" };
                        src?: string | undefined;
                      };
                  statusCode?: number | undefined;
                  createdAt: number;
                  caseId?: string | undefined;
                  actor?: string | undefined;
                  comment?: string | undefined;
                  ineligibleForAppeal?: boolean | undefined;
                  isCascading?: boolean | undefined;
                }
            >
          | undefined;
        interstitial?: boolean | undefined;
        interstitialHistory?:
          | Array<{
              action:
                | "add-deployment-interstitial"
                | "add-project-interstitial"
                | "remove-deployment-interstitial"
                | "remove-project-interstitial";
              createdAt: number;
              caseId?: string | undefined;
              reason?: string | undefined;
              actor?: string | undefined;
              comment?: string | undefined;
            }>
          | undefined;
      }
    | undefined;
  internalRoutes?:
    | Array<
        | { src: string; status: number; expiry?: number | undefined }
        | {
            has: Array<
              | { type: "header"; key: "x-vercel-ip-country"; value: { eq: string } }
              | { type: "host"; value: { eq: string } }
            >;
            mitigate: { action: "block_legal_cwc" };
            src?: string | undefined;
          }
      >
    | undefined;
  hasDeployments?: boolean | undefined;
  dismissedToasts?:
    | Array<{
        key: string;
        dismissedAt: number;
        action: "accept" | "cancel" | "delete";
        value:
          | string
          | number
          | { previousValue: string | number | boolean; currentValue: string | number | boolean }
          | boolean
          | null;
      }>
    | undefined;
  protectedSourcemaps?: boolean | undefined;
  tracing?:
    | {
        domains?: string | undefined;
        ignorePaths?: Array<string> | undefined;
        samplingRules?:
          | Array<{
              rate: number;
              env?: ("preview" | "production") | undefined;
              requestPath?: string | undefined;
              destination?: ("external" | "internal") | undefined;
            }>
          | undefined;
      }
    | undefined;
  avatar?: (string | null) | undefined;
};

export type PatchV1ProjectsProjectIdMicrofrontendsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { projectId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PatchV1ProjectsProjectIdMicrofrontendsBody;
};

export type PatchV1ProjectsProjectIdMicrofrontendsHandler = (
  input: PatchV1ProjectsProjectIdMicrofrontendsInput,
) => Promise<PatchV1ProjectsProjectIdMicrofrontendsResponse>;

export type PostV10ProjectsProjectIdPromoteDeploymentIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { projectId: string; deploymentId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type PostV10ProjectsProjectIdPromoteDeploymentIdHandler = (
  input: PostV10ProjectsProjectIdPromoteDeploymentIdInput,
) => Promise<void>;

export type GetV1ProjectsProjectIdPromoteAliasesResponse =
  | Record<string, never>
  | { aliases: Array<{ status: string; alias: string; id: string }>; pagination: Pagination };

export type GetV1ProjectsProjectIdPromoteAliasesInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { projectId: string };
  query: {
    limit?: number | undefined;
    since?: number | undefined;
    until?: number | undefined;
    failedOnly?: boolean | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV1ProjectsProjectIdPromoteAliasesHandler = (
  input: GetV1ProjectsProjectIdPromoteAliasesInput,
) => Promise<GetV1ProjectsProjectIdPromoteAliasesResponse>;

export type PostV1ProjectsProjectIdPauseInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { projectId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type PostV1ProjectsProjectIdPauseHandler = (
  input: PostV1ProjectsProjectIdPauseInput,
) => Promise<void>;

export type PostV1ProjectsProjectIdUnpauseInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { projectId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type PostV1ProjectsProjectIdUnpauseHandler = (
  input: PostV1ProjectsProjectIdUnpauseInput,
) => Promise<void>;
