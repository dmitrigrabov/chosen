import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import {
  getV2DeploymentsDeploymentIdCheckRuns,
  postV2DeploymentsDeploymentIdCheckRuns,
  getV2DeploymentsDeploymentIdCheckRunsCheckRunId,
  patchV2DeploymentsDeploymentIdCheckRunsCheckRunId,
  postV1DeploymentsDeploymentIdChecks,
  getV1DeploymentsDeploymentIdChecks,
  getV1DeploymentsDeploymentIdChecksCheckId,
  patchV1DeploymentsDeploymentIdChecksCheckId,
  postV1DeploymentsDeploymentIdChecksCheckIdRerequest,
  getV3DeploymentsIdOrUrlEvents,
  patchV1DeploymentsDeploymentIdIntegrationsIntegrationConfigurationIdResourcesResourceIdActionsAction,
  getV13DeploymentsIdOrUrl,
  postV13Deployments,
  patchV12DeploymentsIdCancel,
  getV1DeploymentsDeploymentIdFeatureFlags,
  getV2DeploymentsIdAliases,
  postV2DeploymentsIdAliases,
  getV6DeploymentsIdFiles,
  getV8DeploymentsIdFilesFileId,
  getV7Deployments,
  deleteV13DeploymentsId,
} from "./handlers/deployments";
import type { FlagJSONValue } from "packages/models/src/flagJSONValue.generated.ts";
import type { FileTree } from "packages/models/src/fileTree.generated.ts";
import type { Pagination } from "packages/models/src/pagination.generated.ts";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.get(
  "/v2/deployments/:deploymentId/check-runs",
  validate("param", z.object({ deploymentId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV2DeploymentsDeploymentIdCheckRuns({
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
  "/v2/deployments/:deploymentId/check-runs",
  validate("param", z.object({ deploymentId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV2DeploymentsDeploymentIdCheckRunsBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV2DeploymentsDeploymentIdCheckRuns({
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
  "/v2/deployments/:deploymentId/check-runs/:checkRunId",
  validate("param", z.object({ deploymentId: z.string(), checkRunId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV2DeploymentsDeploymentIdCheckRunsCheckRunId({
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
  "/v2/deployments/:deploymentId/check-runs/:checkRunId",
  validate("param", z.object({ deploymentId: z.string(), checkRunId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", patchV2DeploymentsDeploymentIdCheckRunsCheckRunIdBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await patchV2DeploymentsDeploymentIdCheckRunsCheckRunId({
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
  "/v1/deployments/:deploymentId/checks",
  validate("param", z.object({ deploymentId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV1DeploymentsDeploymentIdChecksBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV1DeploymentsDeploymentIdChecks({
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
  "/v1/deployments/:deploymentId/checks",
  validate("param", z.object({ deploymentId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV1DeploymentsDeploymentIdChecks({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);
app.get(
  "/v1/deployments/:deploymentId/checks/:checkId",
  validate("param", z.object({ deploymentId: z.string(), checkId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV1DeploymentsDeploymentIdChecksCheckId({
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
  "/v1/deployments/:deploymentId/checks/:checkId",
  validate("param", z.object({ deploymentId: z.string(), checkId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", patchV1DeploymentsDeploymentIdChecksCheckIdBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await patchV1DeploymentsDeploymentIdChecksCheckId({
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
  "/v1/deployments/:deploymentId/checks/:checkId/rerequest",
  validate("param", z.object({ deploymentId: z.string(), checkId: z.string() })),
  validate(
    "query",
    z.object({
      autoUpdate: z
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
      await postV1DeploymentsDeploymentIdChecksCheckIdRerequest({
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
  "/v3/deployments/:idOrUrl/events",
  validate("param", z.object({ idOrUrl: z.string() })),
  validate(
    "query",
    z.object({
      direction: z.enum(["backward", "forward"]).optional(),
      follow: z.union([z.literal(0), z.literal(1)]).optional(),
      limit: z.coerce.number().optional(),
      name: z.string().optional(),
      since: z.coerce.number().optional(),
      until: z.coerce.number().optional(),
      statusCode: z.union([z.coerce.number(), z.string()]).optional(),
      delimiter: z.union([z.literal(0), z.literal(1)]).optional(),
      builds: z.union([z.literal(0), z.literal(1)]).optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV3DeploymentsIdOrUrlEvents({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);
app.patch(
  "/v1/deployments/:deploymentId/integrations/:integrationConfigurationId/resources/:resourceId/actions/:action",
  validate(
    "param",
    z.object({
      deploymentId: z.string(),
      integrationConfigurationId: z.string(),
      resourceId: z.string(),
      action: z.string(),
    }),
  ),
  validate(
    "json",
    patchV1DeploymentsDeploymentIdIntegrationsIntegrationConfigurationIdResourcesResourceIdActionsActionBody,
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const body = c.req.valid("json");
    return c.json(
      await patchV1DeploymentsDeploymentIdIntegrationsIntegrationConfigurationIdResourcesResourceIdActionsAction(
        { db, env: c.env, user: c.var.user, params, body },
      ),
    );
  },
);
app.get(
  "/v13/deployments/:idOrUrl",
  validate("param", z.object({ idOrUrl: z.string() })),
  validate(
    "query",
    z.object({
      withGitRepoInfo: z.string().optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV13DeploymentsIdOrUrl({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);
app.post(
  "/v13/deployments",
  validate(
    "query",
    z.object({
      forceNew: z.enum(["0", "1"]).optional(),
      skipAutoDetectionConfirmation: z.enum(["0", "1"]).optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  validate("json", postV13DeploymentsBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(await postV13Deployments({ db, env: c.env, user: c.var.user, query, body }));
  },
);
app.patch(
  "/v12/deployments/:id/cancel",
  validate("param", z.object({ id: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await patchV12DeploymentsIdCancel({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);
app.get(
  "/v1/deployments/:deploymentId/feature-flags",
  validate("param", z.object({ deploymentId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV1DeploymentsDeploymentIdFeatureFlags({
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
  "/v2/deployments/:id/aliases",
  validate("param", z.object({ id: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV2DeploymentsIdAliases({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);
app.post(
  "/v2/deployments/:id/aliases",
  validate("param", z.object({ id: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV2DeploymentsIdAliasesBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV2DeploymentsIdAliases({ db, env: c.env, user: c.var.user, params, query, body }),
    );
  },
);
app.get(
  "/v6/deployments/:id/files",
  validate("param", z.object({ id: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV6DeploymentsIdFiles({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);
app.get(
  "/v8/deployments/:id/files/:fileId",
  validate("param", z.object({ id: z.string(), fileId: z.string() })),
  validate(
    "query",
    z.object({
      path: z.string().optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV8DeploymentsIdFilesFileId({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);
app.get(
  "/v7/deployments",
  validate(
    "query",
    z.object({
      app: z.string().optional(),
      from: z.coerce.number().optional(),
      limit: z.coerce.number().optional(),
      projectId: z.string().optional(),
      projectIds: z.array(z.string()).optional(),
      target: z.string().optional(),
      to: z.coerce.number().optional(),
      users: z.string().optional(),
      since: z.coerce.number().optional(),
      until: z.coerce.number().optional(),
      state: z.string().optional(),
      rollbackCandidate: z
        .preprocess((v) => (v === "true" ? true : v === "false" ? false : v), z.boolean())
        .optional(),
      branch: z.string().optional(),
      sha: z.string().optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(await getV7Deployments({ db, env: c.env, user: c.var.user, query }));
  },
);
app.delete(
  "/v13/deployments/:id",
  validate("param", z.object({ id: z.string() })),
  validate(
    "query",
    z.object({
      url: z.string().optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await deleteV13DeploymentsId({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);

export type GetV2DeploymentsDeploymentIdCheckRunsResponse = {
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

export type GetV2DeploymentsDeploymentIdCheckRunsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { deploymentId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV2DeploymentsDeploymentIdCheckRunsHandler = (
  input: GetV2DeploymentsDeploymentIdCheckRunsInput,
) => Promise<GetV2DeploymentsDeploymentIdCheckRunsResponse>;

export const postV2DeploymentsDeploymentIdCheckRunsBody = z.object({ checkId: z.string() });

export type PostV2DeploymentsDeploymentIdCheckRunsBody = { checkId: string };

export type PostV2DeploymentsDeploymentIdCheckRunsResponse =
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
        | { subKind: "vercel-ci"; origin: "config"; invocationId: string; jobDefinitionId: string }
        | { subKind: "vercel-ci-sentinel"; origin: "platform" };
    };

export type PostV2DeploymentsDeploymentIdCheckRunsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { deploymentId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV2DeploymentsDeploymentIdCheckRunsBody;
};

export type PostV2DeploymentsDeploymentIdCheckRunsHandler = (
  input: PostV2DeploymentsDeploymentIdCheckRunsInput,
) => Promise<PostV2DeploymentsDeploymentIdCheckRunsResponse>;

export type GetV2DeploymentsDeploymentIdCheckRunsCheckRunIdResponse =
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
        | { subKind: "vercel-ci"; origin: "config"; invocationId: string; jobDefinitionId: string }
        | { subKind: "vercel-ci-sentinel"; origin: "platform" };
    };

export type GetV2DeploymentsDeploymentIdCheckRunsCheckRunIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { deploymentId: string; checkRunId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV2DeploymentsDeploymentIdCheckRunsCheckRunIdHandler = (
  input: GetV2DeploymentsDeploymentIdCheckRunsCheckRunIdInput,
) => Promise<GetV2DeploymentsDeploymentIdCheckRunsCheckRunIdResponse>;

export const patchV2DeploymentsDeploymentIdCheckRunsCheckRunIdBody = z.object({
  externalId: z.string().optional(),
  externalUrl: z
    .string()
    .regex(/^https?:\/\/|^sso:/)
    .optional(),
  status: z.enum(["queued", "running", "completed"]).optional(),
  output: z.object({}).optional(),
  completedAt: z.number().optional(),
  conclusion: z
    .enum(["canceled", "skipped", "timeout", "failed", "neutral", "succeeded"])
    .optional(),
  conclusionText: z.string().optional(),
});

export type PatchV2DeploymentsDeploymentIdCheckRunsCheckRunIdBody = {
  externalId?: string | undefined;
  externalUrl?: string | undefined;
  status?: ("queued" | "running" | "completed") | undefined;
  output?: Record<string, never> | undefined;
  completedAt?: number | undefined;
  conclusion?:
    | ("canceled" | "skipped" | "timeout" | "failed" | "neutral" | "succeeded")
    | undefined;
  conclusionText?: string | undefined;
};

export type PatchV2DeploymentsDeploymentIdCheckRunsCheckRunIdResponse =
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
        | { subKind: "vercel-ci"; origin: "config"; invocationId: string; jobDefinitionId: string }
        | { subKind: "vercel-ci-sentinel"; origin: "platform" };
    };

export type PatchV2DeploymentsDeploymentIdCheckRunsCheckRunIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { deploymentId: string; checkRunId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PatchV2DeploymentsDeploymentIdCheckRunsCheckRunIdBody;
};

export type PatchV2DeploymentsDeploymentIdCheckRunsCheckRunIdHandler = (
  input: PatchV2DeploymentsDeploymentIdCheckRunsCheckRunIdInput,
) => Promise<PatchV2DeploymentsDeploymentIdCheckRunsCheckRunIdResponse>;

export const postV1DeploymentsDeploymentIdChecksBody = z.object({
  name: z.string().max(100),
  path: z.string().max(255).optional(),
  blocking: z.boolean(),
  detailsUrl: z.string().optional(),
  externalId: z.string().optional(),
  rerequestable: z.boolean().optional(),
});

export type PostV1DeploymentsDeploymentIdChecksBody = {
  name: string;
  path?: string | undefined;
  blocking: boolean;
  detailsUrl?: string | undefined;
  externalId?: string | undefined;
  rerequestable?: boolean | undefined;
};

export type PostV1DeploymentsDeploymentIdChecksResponse = {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  deploymentId: string;
  status: "completed" | "registered" | "running";
  conclusion?: ("canceled" | "failed" | "neutral" | "skipped" | "stale" | "succeeded") | undefined;
  externalId?: string | undefined;
  output?:
    | {
        metrics?:
          | {
              FCP: {
                value: number | null;
                previousValue?: number | undefined;
                source: "web-vitals";
              };
              LCP: {
                value: number | null;
                previousValue?: number | undefined;
                source: "web-vitals";
              };
              CLS: {
                value: number | null;
                previousValue?: number | undefined;
                source: "web-vitals";
              };
              TBT: {
                value: number | null;
                previousValue?: number | undefined;
                source: "web-vitals";
              };
              virtualExperienceScore?:
                | { value: number | null; previousValue?: number | undefined; source: "web-vitals" }
                | undefined;
            }
          | undefined;
      }
    | undefined;
  completedAt?: number | undefined;
  path?: string | undefined;
  blocking: boolean;
  detailsUrl?: string | undefined;
  integrationId: string;
  startedAt?: number | undefined;
  rerequestable?: boolean | undefined;
};

export type PostV1DeploymentsDeploymentIdChecksInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { deploymentId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV1DeploymentsDeploymentIdChecksBody;
};

export type PostV1DeploymentsDeploymentIdChecksHandler = (
  input: PostV1DeploymentsDeploymentIdChecksInput,
) => Promise<PostV1DeploymentsDeploymentIdChecksResponse>;

export type GetV1DeploymentsDeploymentIdChecksResponse = {
  checks: Array<{
    completedAt?: number | undefined;
    conclusion?:
      | ("canceled" | "failed" | "neutral" | "skipped" | "stale" | "succeeded")
      | undefined;
    createdAt: number;
    detailsUrl?: string | undefined;
    id: string;
    integrationId: string;
    name: string;
    output?:
      | {
          metrics?:
            | {
                FCP: {
                  value: number | null;
                  previousValue?: number | undefined;
                  source: "web-vitals";
                };
                LCP: {
                  value: number | null;
                  previousValue?: number | undefined;
                  source: "web-vitals";
                };
                CLS: {
                  value: number | null;
                  previousValue?: number | undefined;
                  source: "web-vitals";
                };
                TBT: {
                  value: number | null;
                  previousValue?: number | undefined;
                  source: "web-vitals";
                };
                virtualExperienceScore?:
                  | {
                      value: number | null;
                      previousValue?: number | undefined;
                      source: "web-vitals";
                    }
                  | undefined;
              }
            | undefined;
        }
      | undefined;
    path?: string | undefined;
    rerequestable: boolean;
    blocking: boolean;
    startedAt?: number | undefined;
    status: "completed" | "registered" | "running";
    updatedAt: number;
  }>;
};

export type GetV1DeploymentsDeploymentIdChecksInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { deploymentId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV1DeploymentsDeploymentIdChecksHandler = (
  input: GetV1DeploymentsDeploymentIdChecksInput,
) => Promise<GetV1DeploymentsDeploymentIdChecksResponse>;

export type GetV1DeploymentsDeploymentIdChecksCheckIdResponse = {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  deploymentId: string;
  status: "completed" | "registered" | "running";
  conclusion?: ("canceled" | "failed" | "neutral" | "skipped" | "stale" | "succeeded") | undefined;
  externalId?: string | undefined;
  output?:
    | {
        metrics?:
          | {
              FCP: {
                value: number | null;
                previousValue?: number | undefined;
                source: "web-vitals";
              };
              LCP: {
                value: number | null;
                previousValue?: number | undefined;
                source: "web-vitals";
              };
              CLS: {
                value: number | null;
                previousValue?: number | undefined;
                source: "web-vitals";
              };
              TBT: {
                value: number | null;
                previousValue?: number | undefined;
                source: "web-vitals";
              };
              virtualExperienceScore?:
                | { value: number | null; previousValue?: number | undefined; source: "web-vitals" }
                | undefined;
            }
          | undefined;
      }
    | undefined;
  completedAt?: number | undefined;
  path?: string | undefined;
  blocking: boolean;
  detailsUrl?: string | undefined;
  integrationId: string;
  startedAt?: number | undefined;
  rerequestable?: boolean | undefined;
};

export type GetV1DeploymentsDeploymentIdChecksCheckIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { deploymentId: string; checkId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV1DeploymentsDeploymentIdChecksCheckIdHandler = (
  input: GetV1DeploymentsDeploymentIdChecksCheckIdInput,
) => Promise<GetV1DeploymentsDeploymentIdChecksCheckIdResponse>;

export const patchV1DeploymentsDeploymentIdChecksCheckIdBody = z.object({
  name: z.string().max(100).optional(),
  path: z.string().max(255).optional(),
  status: z.enum(["running", "completed"]).optional(),
  conclusion: z.enum(["canceled", "failed", "neutral", "succeeded", "skipped"]).optional(),
  detailsUrl: z.string().optional(),
  output: z
    .object({
      metrics: z
        .object({
          FCP: z.object({
            value: z.number().nullable(),
            previousValue: z.number().optional(),
            source: z.literal("web-vitals"),
          }),
          LCP: z.object({
            value: z.number().nullable(),
            previousValue: z.number().optional(),
            source: z.literal("web-vitals"),
          }),
          CLS: z.object({
            value: z.number().nullable(),
            previousValue: z.number().optional(),
            source: z.literal("web-vitals"),
          }),
          TBT: z.object({
            value: z.number().nullable(),
            previousValue: z.number().optional(),
            source: z.literal("web-vitals"),
          }),
          virtualExperienceScore: z
            .object({
              value: z.number().int().gte(0).lte(100).nullable(),
              previousValue: z.number().int().gte(0).lte(100).optional(),
              source: z.literal("web-vitals"),
            })
            .optional(),
        })
        .optional(),
    })
    .optional(),
  externalId: z.string().optional(),
});

export type PatchV1DeploymentsDeploymentIdChecksCheckIdBody = {
  name?: string | undefined;
  path?: string | undefined;
  status?: ("running" | "completed") | undefined;
  conclusion?: ("canceled" | "failed" | "neutral" | "succeeded" | "skipped") | undefined;
  detailsUrl?: string | undefined;
  output?:
    | {
        metrics?:
          | {
              FCP: {
                value: number | null;
                previousValue?: number | undefined;
                source: "web-vitals";
              };
              LCP: {
                value: number | null;
                previousValue?: number | undefined;
                source: "web-vitals";
              };
              CLS: {
                value: number | null;
                previousValue?: number | undefined;
                source: "web-vitals";
              };
              TBT: {
                value: number | null;
                previousValue?: number | undefined;
                source: "web-vitals";
              };
              virtualExperienceScore?:
                | { value: number | null; previousValue?: number | undefined; source: "web-vitals" }
                | undefined;
            }
          | undefined;
      }
    | undefined;
  externalId?: string | undefined;
};

export type PatchV1DeploymentsDeploymentIdChecksCheckIdResponse = {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  deploymentId: string;
  status: "completed" | "registered" | "running";
  conclusion?: ("canceled" | "failed" | "neutral" | "skipped" | "stale" | "succeeded") | undefined;
  externalId?: string | undefined;
  output?:
    | {
        metrics?:
          | {
              FCP: {
                value: number | null;
                previousValue?: number | undefined;
                source: "web-vitals";
              };
              LCP: {
                value: number | null;
                previousValue?: number | undefined;
                source: "web-vitals";
              };
              CLS: {
                value: number | null;
                previousValue?: number | undefined;
                source: "web-vitals";
              };
              TBT: {
                value: number | null;
                previousValue?: number | undefined;
                source: "web-vitals";
              };
              virtualExperienceScore?:
                | { value: number | null; previousValue?: number | undefined; source: "web-vitals" }
                | undefined;
            }
          | undefined;
      }
    | undefined;
  completedAt?: number | undefined;
  path?: string | undefined;
  blocking: boolean;
  detailsUrl?: string | undefined;
  integrationId: string;
  startedAt?: number | undefined;
  rerequestable?: boolean | undefined;
};

export type PatchV1DeploymentsDeploymentIdChecksCheckIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { deploymentId: string; checkId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PatchV1DeploymentsDeploymentIdChecksCheckIdBody;
};

export type PatchV1DeploymentsDeploymentIdChecksCheckIdHandler = (
  input: PatchV1DeploymentsDeploymentIdChecksCheckIdInput,
) => Promise<PatchV1DeploymentsDeploymentIdChecksCheckIdResponse>;

export type PostV1DeploymentsDeploymentIdChecksCheckIdRerequestResponse = Record<string, never>;

export type PostV1DeploymentsDeploymentIdChecksCheckIdRerequestInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { deploymentId: string; checkId: string };
  query: {
    autoUpdate?: boolean | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type PostV1DeploymentsDeploymentIdChecksCheckIdRerequestHandler = (
  input: PostV1DeploymentsDeploymentIdChecksCheckIdRerequestInput,
) => Promise<PostV1DeploymentsDeploymentIdChecksCheckIdRerequestResponse>;

export type GetV3DeploymentsIdOrUrlEventsResponse = Array<
  | {
      type:
        | "command"
        | "delimiter"
        | "deployment-state"
        | "edge-function-invocation"
        | "exit"
        | "fatal"
        | "metric"
        | "middleware"
        | "middleware-invocation"
        | "report"
        | "stderr"
        | "stdout";
      created: number;
      payload: {
        deploymentId: string;
        info?:
          | {
              type: string;
              name: string;
              entrypoint?: string | undefined;
              path?: string | undefined;
              step?: string | undefined;
              readyState?: string | undefined;
            }
          | undefined;
        text?: string | undefined;
        id: string;
        date: number;
        serial: string;
        created?: number | undefined;
        statusCode?: number | undefined;
        requestId?: string | undefined;
        proxy?:
          | {
              timestamp: number;
              method: string;
              host: string;
              path?: string | undefined;
              statusCode?: number | undefined;
              userAgent?: Array<string> | undefined;
              referer?: string | undefined;
              clientIp?: string | undefined;
              region?: string | undefined;
              scheme?: string | undefined;
              responseByteSize?: number | undefined;
              cacheId?: string | undefined;
              pathType?: string | undefined;
              pathTypeVariant?: string | undefined;
              vercelId?: string | undefined;
              vercelCache?:
                | ("BYPASS" | "HIT" | "MISS" | "PRERENDER" | "REVALIDATED" | "STALE")
                | undefined;
              lambdaRegion?: string | undefined;
              wafAction?: ("bypass" | "challenge" | "deny" | "log" | "rate_limit") | undefined;
              wafRuleId?: string | undefined;
            }
          | undefined;
      };
    }
  | {
      created: number;
      date: number;
      deploymentId: string;
      id: string;
      info: {
        type: string;
        name: string;
        entrypoint?: string | undefined;
        path?: string | undefined;
        step?: string | undefined;
        readyState?: string | undefined;
      };
      serial: string;
      text?: string | undefined;
      type:
        | "command"
        | "delimiter"
        | "deployment-state"
        | "edge-function-invocation"
        | "exit"
        | "fatal"
        | "metric"
        | "middleware"
        | "middleware-invocation"
        | "report"
        | "stderr"
        | "stdout";
      level?: ("error" | "warning") | undefined;
    }
  | {
      type:
        | "command"
        | "delimiter"
        | "deployment-state"
        | "edge-function-invocation"
        | "exit"
        | "fatal"
        | "metric"
        | "middleware"
        | "middleware-invocation"
        | "report"
        | "stderr"
        | "stdout";
      created: number;
      payload: {
        deploymentId: string;
        info?:
          | {
              type: string;
              name: string;
              entrypoint?: string | undefined;
              path?: string | undefined;
              step?: string | undefined;
              readyState?: string | undefined;
            }
          | undefined;
        text?: string | undefined;
        id: string;
        date: number;
        serial: string;
        created?: number | undefined;
        statusCode?: number | undefined;
        requestId?: string | undefined;
        proxy?:
          | {
              timestamp: number;
              method: string;
              host: string;
              path?: string | undefined;
              statusCode?: number | undefined;
              userAgent?: Array<string> | undefined;
              referer?: string | undefined;
              clientIp?: string | undefined;
              region?: string | undefined;
              scheme?: string | undefined;
              responseByteSize?: number | undefined;
              cacheId?: string | undefined;
              pathType?: string | undefined;
              pathTypeVariant?: string | undefined;
              vercelId?: string | undefined;
              vercelCache?:
                | ("BYPASS" | "HIT" | "MISS" | "PRERENDER" | "REVALIDATED" | "STALE")
                | undefined;
              lambdaRegion?: string | undefined;
              wafAction?: ("bypass" | "challenge" | "deny" | "log" | "rate_limit") | undefined;
              wafRuleId?: string | undefined;
            }
          | undefined;
      };
    }
  | {
      created: number;
      date: number;
      deploymentId: string;
      id: string;
      info: {
        type: string;
        name: string;
        entrypoint?: string | undefined;
        path?: string | undefined;
        step?: string | undefined;
        readyState?: string | undefined;
      };
      serial: string;
      text?: string | undefined;
      type:
        | "command"
        | "delimiter"
        | "deployment-state"
        | "edge-function-invocation"
        | "exit"
        | "fatal"
        | "metric"
        | "middleware"
        | "middleware-invocation"
        | "report"
        | "stderr"
        | "stdout";
      level?: ("error" | "warning") | undefined;
    }
  | {
      type: "alias-assigned";
      deploymentId: string;
      date: number;
      alias: Array<string>;
      aliasError: { code: string; message: string } | null;
      aliasWarning: {
        code: string;
        message: string;
        link?: string | undefined;
        action?: string | undefined;
      } | null;
    }
  | null
> | null;

export type GetV3DeploymentsIdOrUrlEventsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrUrl: string };
  query: {
    direction?: ("backward" | "forward") | undefined;
    follow?: number | undefined;
    limit?: number | undefined;
    name?: string | undefined;
    since?: number | undefined;
    until?: number | undefined;
    statusCode?: (number | string) | undefined;
    delimiter?: number | undefined;
    builds?: number | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV3DeploymentsIdOrUrlEventsHandler = (
  input: GetV3DeploymentsIdOrUrlEventsInput,
) => Promise<GetV3DeploymentsIdOrUrlEventsResponse>;

export const patchV1DeploymentsDeploymentIdIntegrationsIntegrationConfigurationIdResourcesResourceIdActionsActionBody =
  z.object({
    status: z.enum(["running", "succeeded", "failed"]).optional(),
    statusText: z.string().optional(),
    statusUrl: z
      .string()
      .regex(/^https?:\/\/|^sso:/)
      .optional(),
    outcomes: z
      .array(
        z.object({
          kind: z.string(),
          secrets: z.array(z.object({ name: z.string(), value: z.string() })),
        }),
      )
      .optional(),
  });

export type PatchV1DeploymentsDeploymentIdIntegrationsIntegrationConfigurationIdResourcesResourceIdActionsActionBody =
  {
    status?: ("running" | "succeeded" | "failed") | undefined;
    statusText?: string | undefined;
    statusUrl?: string | undefined;
    outcomes?: Array<{ kind: string; secrets: Array<{ name: string; value: string }> }> | undefined;
  };

export type PatchV1DeploymentsDeploymentIdIntegrationsIntegrationConfigurationIdResourcesResourceIdActionsActionInput =
  {
    db: Db;
    env: Env;
    user: AuthUser | null;
    params: {
      deploymentId: string;
      integrationConfigurationId: string;
      resourceId: string;
      action: string;
    };
    body: PatchV1DeploymentsDeploymentIdIntegrationsIntegrationConfigurationIdResourcesResourceIdActionsActionBody;
  };

export type PatchV1DeploymentsDeploymentIdIntegrationsIntegrationConfigurationIdResourcesResourceIdActionsActionHandler =
  (
    input: PatchV1DeploymentsDeploymentIdIntegrationsIntegrationConfigurationIdResourcesResourceIdActionsActionInput,
  ) => Promise<void>;

export type GetV13DeploymentsIdOrUrlResponse =
  | {
      alias?: Array<string> | undefined;
      aliasAssigned: boolean;
      id: string;
      target?: ("production" | "staging" | "null" | null) | undefined;
      readyState:
        | "BLOCKED"
        | "BUILDING"
        | "CANCELED"
        | "ERROR"
        | "INITIALIZING"
        | "QUEUED"
        | "READY";
      aliasError?: ({ code: string; message: string } | null) | undefined;
      aliasWarning?:
        | ({
            code: string;
            message: string;
            link?: string | undefined;
            action?: string | undefined;
          } | null)
        | undefined;
      errorCode?: string | undefined;
      errorMessage?: (string | null) | undefined;
    }
  | {
      aliasAssignedAt?: (number | boolean | null) | undefined;
      alwaysRefuseToBuild?: boolean | undefined;
      build: { env: Array<string> };
      buildArtifactUrls?: Array<string> | undefined;
      builds?:
        | Array<{
            use: string;
            src?: string | undefined;
            config?: Record<string, unknown> | undefined;
          }>
        | undefined;
      env: Array<string>;
      resourceConfig?:
        | {
            buildMachine?:
              | {
                  purchaseType?: ("basic" | "enhanced" | "standard" | "turbo") | undefined;
                  defaultPurchaseType?: ("basic" | "enhanced" | "standard") | undefined;
                  machineSelectionType?: ("elastic" | "fixed") | undefined;
                  cores?: number | undefined;
                  memory?: number | undefined;
                }
              | undefined;
          }
        | undefined;
      inspectorUrl: string | null;
      isInConcurrentBuildsQueue: boolean;
      isInSystemBuildsQueue: boolean;
      projectSettings: {
        nodeVersion?:
          | ("10.x" | "12.x" | "14.x" | "16.x" | "18.x" | "20.x" | "22.x" | "24.x" | "8.10.x")
          | undefined;
        buildCommand?: (string | null) | undefined;
        devCommand?: (string | null) | undefined;
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
        commandForIgnoringBuildStep?: (string | null) | undefined;
        installCommand?: (string | null) | undefined;
        outputDirectory?: (string | null) | undefined;
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
        webAnalytics?:
          | {
              id: string;
              disabledAt?: number | undefined;
              canceledAt?: number | undefined;
              enabledAt?: number | undefined;
              hasData?: true | undefined;
            }
          | undefined;
      };
      integrations?:
        | {
            status: "error" | "pending" | "ready" | "skipped" | "timeout";
            startedAt: number;
            claimedAt?: number | undefined;
            completedAt?: number | undefined;
            skippedAt?: number | undefined;
            skippedBy?: string | undefined;
          }
        | undefined;
      images?:
        | {
            sizes?: Array<number> | undefined;
            qualities?: Array<number> | undefined;
            domains?: Array<string> | undefined;
            remotePatterns?:
              | Array<{
                  protocol?: ("http" | "https") | undefined;
                  hostname: string;
                  port?: string | undefined;
                  pathname?: string | undefined;
                  search?: string | undefined;
                }>
              | undefined;
            localPatterns?:
              | Array<{ pathname?: string | undefined; search?: string | undefined }>
              | undefined;
            minimumCacheTTL?: number | undefined;
            formats?: Array<"image/avif" | "image/webp"> | undefined;
            dangerouslyAllowSVG?: boolean | undefined;
            contentSecurityPolicy?: string | undefined;
            contentDispositionType?: ("attachment" | "inline") | undefined;
          }
        | undefined;
      alias?: Array<string> | undefined;
      aliasAssigned: boolean;
      bootedAt: number;
      buildingAt: number;
      buildContainerFinishedAt?: number | undefined;
      buildSkipped: boolean;
      creator: {
        uid: string;
        type?: ("app" | "integration" | "system" | "user") | undefined;
        username?: string | undefined;
        avatar?: string | undefined;
      };
      initReadyAt?: number | undefined;
      isFirstBranchDeployment?: boolean | undefined;
      lambdas?:
        | Array<{
            id: string;
            readyState?: ("BUILDING" | "ERROR" | "INITIALIZING" | "READY") | undefined;
            createdAt?: number | undefined;
            entrypoint?: (string | null) | undefined;
            readyStateAt?: number | undefined;
            output: Array<{ path: string; functionName: string }>;
          }>
        | undefined;
      public: boolean;
      ready?: number | undefined;
      status: "BLOCKED" | "BUILDING" | "CANCELED" | "ERROR" | "INITIALIZING" | "QUEUED" | "READY";
      team?: { id: string; name: string; slug: string; avatar?: string | undefined } | undefined;
      userAliases?: Array<string> | undefined;
      previewCommentsEnabled?: boolean | undefined;
      ttyBuildLogs?: boolean | undefined;
      customEnvironment?:
        | (
            | {
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
              }
            | { id: string }
          )
        | undefined;
      oomReport?: "out-of-memory" | undefined;
      readyStateReason?: string | undefined;
      id: string;
      target?: ("production" | "staging" | "null" | null) | undefined;
      readyState:
        | "BLOCKED"
        | "BUILDING"
        | "CANCELED"
        | "ERROR"
        | "INITIALIZING"
        | "QUEUED"
        | "READY";
      aliasError?: ({ code: string; message: string } | null) | undefined;
      aliasWarning?:
        | ({
            code: string;
            message: string;
            link?: string | undefined;
            action?: string | undefined;
          } | null)
        | undefined;
      errorCode?: string | undefined;
      errorMessage?: (string | null) | undefined;
      createdAt: number;
      name: string;
      type: "LAMBDAS";
      aliasFinal?: (string | null) | undefined;
      autoAssignCustomDomains?: boolean | undefined;
      automaticAliases?: Array<string> | undefined;
      buildErrorAt?: number | undefined;
      checksState?: ("completed" | "registered" | "running") | undefined;
      checksConclusion?: ("canceled" | "failed" | "skipped" | "succeeded") | undefined;
      deletedAt?: (number | null) | undefined;
      defaultRoute?: string | undefined;
      canceledAt?: number | undefined;
      errorLink?: string | undefined;
      errorStep?: string | undefined;
      passiveRegions?: Array<string> | undefined;
      gitSource?:
        | (
            | {
                type: "github";
                repoId: string | number;
                ref?: (string | null) | undefined;
                sha?: string | undefined;
                prId?: (number | null) | undefined;
              }
            | {
                type: "github";
                org: string;
                repo: string;
                ref?: (string | null) | undefined;
                sha?: string | undefined;
                prId?: (number | null) | undefined;
              }
            | {
                type: "github-custom-host";
                host: string;
                repoId: string | number;
                ref?: (string | null) | undefined;
                sha?: string | undefined;
                prId?: (number | null) | undefined;
              }
            | {
                type: "github-custom-host";
                host: string;
                org: string;
                repo: string;
                ref?: (string | null) | undefined;
                sha?: string | undefined;
                prId?: (number | null) | undefined;
              }
            | {
                type: "github-limited";
                repoId: string | number;
                ref?: (string | null) | undefined;
                sha?: string | undefined;
                prId?: (number | null) | undefined;
              }
            | {
                type: "github-limited";
                org: string;
                repo: string;
                ref?: (string | null) | undefined;
                sha?: string | undefined;
                prId?: (number | null) | undefined;
              }
            | {
                type: "gitlab";
                projectId: string | number;
                ref?: (string | null) | undefined;
                sha?: string | undefined;
                prId?: (number | null) | undefined;
              }
            | {
                type: "bitbucket";
                workspaceUuid?: string | undefined;
                repoUuid: string;
                ref?: (string | null) | undefined;
                sha?: string | undefined;
                prId?: (number | null) | undefined;
              }
            | {
                type: "bitbucket";
                owner: string;
                slug: string;
                ref?: (string | null) | undefined;
                sha?: string | undefined;
                prId?: (number | null) | undefined;
              }
            | {
                type: "vercel";
                org?: string | undefined;
                repo?: string | undefined;
                sha: string;
                repoPushedAt?: number | undefined;
                ref?: (string | null) | undefined;
                prId?: (number | null) | undefined;
              }
            | {
                type: "cursor-origin";
                repoId: string;
                owner?: string | undefined;
                repo?: string | undefined;
                ref?: (string | null) | undefined;
                sha?: string | undefined;
                prId?: (number | null) | undefined;
              }
            | { type: "custom"; ref: string; sha: string; gitUrl: string }
            | {
                type: "github";
                ref: string;
                sha: string;
                repoId: number;
                org?: string | undefined;
                repo?: string | undefined;
              }
            | {
                type: "github-custom-host";
                host: string;
                ref: string;
                sha: string;
                repoId: number;
                org?: string | undefined;
                repo?: string | undefined;
              }
            | {
                type: "github-limited";
                ref: string;
                sha: string;
                repoId: number;
                org?: string | undefined;
                repo?: string | undefined;
              }
            | { type: "gitlab"; ref: string; sha: string; projectId: number }
            | {
                type: "bitbucket";
                ref: string;
                sha: string;
                owner?: string | undefined;
                slug?: string | undefined;
                workspaceUuid: string;
                repoUuid: string;
              }
            | {
                type: "vercel";
                ref: string;
                sha: string;
                org: string;
                repo: string;
                repoPushedAt?: number | undefined;
              }
            | {
                type: "cursor-origin";
                ref: string;
                sha: string;
                repoId: string;
                owner: string;
                repo: string;
              }
          )
        | undefined;
      manualProvisioning?:
        | { state: "COMPLETE" | "PENDING" | "TIMEOUT"; completedAt?: number | undefined }
        | undefined;
      meta: Record<string, string>;
      originCacheRegion?: string | undefined;
      nodeVersion?:
        | ("10.x" | "12.x" | "14.x" | "16.x" | "18.x" | "20.x" | "22.x" | "24.x" | "8.10.x")
        | undefined;
      project?: { id: string; name: string; framework?: (string | null) | undefined } | undefined;
      prebuilt?: boolean | undefined;
      readySubstate?: ("PROMOTED" | "ROLLING" | "STAGED") | undefined;
      regions: Array<string>;
      softDeletedByRetention?: boolean | undefined;
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
      undeletedAt?: number | undefined;
      url: string;
      userConfiguredDeploymentId?: string | undefined;
      version: number;
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
      projectId: string;
      plan: "enterprise" | "hobby" | "pro";
      connectBuildsEnabled?: boolean | undefined;
      connectConfigurationId?: string | undefined;
      createdIn: string;
      crons?: Array<{ schedule: string; path: string }> | undefined;
      atproto?:
        | (
            | { enabled: false }
            | {
                enabled: true;
                subscription: {
                  collections: Array<string>;
                  dids?: Array<string> | undefined;
                  kinds?: Array<"account" | "commit" | "identity" | "sync"> | undefined;
                  path: string;
                };
              }
          )
        | undefined;
      functions?:
        | (Record<
            string,
            {
              architecture?: ("arm64" | "x86_64") | undefined;
              memory?: number | undefined;
              maxDuration?: (number | "max") | undefined;
              maxConcurrency?: number | undefined;
              regions?: Array<string> | undefined;
              functionFailoverRegions?: Array<string> | undefined;
              runtime?: string | undefined;
              includeFiles?: string | undefined;
              excludeFiles?: string | undefined;
              experimentalTriggers?:
                | Array<
                    | {
                        type: "queue/v1beta";
                        consumer: string;
                        topic: string;
                        maxDeliveries?: number | undefined;
                        retryAfterSeconds?: number | undefined;
                        initialDelaySeconds?: number | undefined;
                        maxConcurrency?: number | undefined;
                      }
                    | {
                        type: "queue/v2beta";
                        topic: string;
                        maxDeliveries?: number | undefined;
                        retryAfterSeconds?: number | undefined;
                        initialDelaySeconds?: number | undefined;
                        maxConcurrency?: number | undefined;
                      }
                    | { type: "schedule/v1beta" }
                  >
                | undefined;
              supportsCancellation?: boolean | undefined;
            }
          > | null)
        | undefined;
      isInstantStatic?: boolean | undefined;
      monorepoManager?: (string | null) | undefined;
      ownerId: string;
      passiveConnectConfigurationId?: string | undefined;
      routes: Array<
        | {
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
                  | {
                      type: "request.path";
                      op: "set";
                      args: string;
                      env?: Array<string> | undefined;
                    }
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
          }
        | {
            handle: "error" | "filesystem" | "hit" | "miss" | "resource" | "rewrite";
            src?: string | undefined;
            dest?: string | undefined;
            status?: number | undefined;
          }
        | { src: string; continue: boolean; middleware: number }
      > | null;
      services?:
        | Array<
            | {
                schema: "experimentalServices";
                name: string;
                type: "cron" | "job" | "web" | "worker";
                trigger?: ("queue" | "schedule" | "workflow") | undefined;
                group?: string | undefined;
                workspace: string;
                entrypoint?: string | undefined;
                framework?: string | undefined;
                builder: {
                  use: string;
                  src?: string | undefined;
                  config?:
                    | {
                        bunVersion?: string | undefined;
                        maxLambdaSize?: string | undefined;
                        includeFiles?: (string | Array<string>) | undefined;
                        excludeFiles?: (string | Array<string>) | undefined;
                        bundle?: boolean | undefined;
                        ldsflags?: string | undefined;
                        helpers?: boolean | undefined;
                        rust?: string | undefined;
                        debug?: boolean | undefined;
                        zeroConfig?: boolean | undefined;
                        import?: Record<string, string> | undefined;
                        functions?:
                          | Record<
                              string,
                              {
                                architecture?: ("arm64" | "x86_64") | undefined;
                                memory?: number | undefined;
                                maxDuration?: (number | "max") | undefined;
                                maxConcurrency?: number | undefined;
                                regions?: Array<string> | undefined;
                                functionFailoverRegions?: Array<string> | undefined;
                                runtime?: string | undefined;
                                includeFiles?: string | undefined;
                                excludeFiles?: string | undefined;
                                experimentalTriggers?:
                                  | Array<
                                      | {
                                          type: "queue/v1beta";
                                          consumer: string;
                                          topic: string;
                                          maxDeliveries?: number | undefined;
                                          retryAfterSeconds?: number | undefined;
                                          initialDelaySeconds?: number | undefined;
                                          maxConcurrency?: number | undefined;
                                        }
                                      | {
                                          type: "queue/v2beta";
                                          topic: string;
                                          maxDeliveries?: number | undefined;
                                          retryAfterSeconds?: number | undefined;
                                          initialDelaySeconds?: number | undefined;
                                          maxConcurrency?: number | undefined;
                                        }
                                      | { type: "schedule/v1beta" }
                                    >
                                  | undefined;
                                supportsCancellation?: boolean | undefined;
                              }
                            >
                          | undefined;
                        projectSettings?:
                          | {
                              framework?: (string | null) | undefined;
                              devCommand?: (string | null) | undefined;
                              installCommand?: (string | null) | undefined;
                              buildCommand?: (string | null) | undefined;
                              outputDirectory?: (string | null) | undefined;
                              rootDirectory?: (string | null) | undefined;
                              nodeVersion?: string | undefined;
                              monorepoManager?: (string | null) | undefined;
                              createdAt?: number | undefined;
                              autoExposeSystemEnvs?: boolean | undefined;
                              sourceFilesOutsideRootDirectory?: boolean | undefined;
                              directoryListing?: boolean | undefined;
                              gitForkProtection?: boolean | undefined;
                              commandForIgnoringBuildStep?: (string | null) | undefined;
                            }
                          | undefined;
                        outputDirectory?: string | undefined;
                        installCommand?: string | undefined;
                        buildCommand?: string | undefined;
                        devCommand?: string | undefined;
                        framework?: (string | null) | undefined;
                        nodeVersion?: string | undefined;
                        middleware?: boolean | undefined;
                        middlewareRuntime?: "nodejs" | undefined;
                        middlewareMatcher?: (string | Array<string>) | undefined;
                        serviceName?: string | undefined;
                      }
                    | undefined;
                };
                runtime?: string | undefined;
                buildCommand?: string | undefined;
                installCommand?: string | undefined;
                preDeployCommand?: string | undefined;
                routePrefix?: string | undefined;
                routePrefixSource?: ("configured" | "generated") | undefined;
                subdomain?: string | undefined;
                schedule?: (string | Array<string>) | undefined;
                handlerFunction?: string | undefined;
                topics?:
                  | (
                      | Array<string>
                      | Array<{
                          topic: string;
                          retryAfterSeconds?: number | undefined;
                          initialDelaySeconds?: number | undefined;
                        }>
                    )
                  | undefined;
                env?: Record<string, { type: "service-ref"; service: string }> | undefined;
              }
            | {
                schema: "experimentalServicesV2";
                name: string;
                root: string;
                framework?: string | undefined;
                runtime?: string | undefined;
                entrypoint?: string | undefined;
                command?: Array<string> | undefined;
                builder: {
                  use: string;
                  src?: string | undefined;
                  config?:
                    | {
                        bunVersion?: string | undefined;
                        maxLambdaSize?: string | undefined;
                        includeFiles?: (string | Array<string>) | undefined;
                        excludeFiles?: (string | Array<string>) | undefined;
                        bundle?: boolean | undefined;
                        ldsflags?: string | undefined;
                        helpers?: boolean | undefined;
                        rust?: string | undefined;
                        debug?: boolean | undefined;
                        zeroConfig?: boolean | undefined;
                        import?: Record<string, string> | undefined;
                        functions?:
                          | Record<
                              string,
                              {
                                architecture?: ("arm64" | "x86_64") | undefined;
                                memory?: number | undefined;
                                maxDuration?: (number | "max") | undefined;
                                maxConcurrency?: number | undefined;
                                regions?: Array<string> | undefined;
                                functionFailoverRegions?: Array<string> | undefined;
                                runtime?: string | undefined;
                                includeFiles?: string | undefined;
                                excludeFiles?: string | undefined;
                                experimentalTriggers?:
                                  | Array<
                                      | {
                                          type: "queue/v1beta";
                                          consumer: string;
                                          topic: string;
                                          maxDeliveries?: number | undefined;
                                          retryAfterSeconds?: number | undefined;
                                          initialDelaySeconds?: number | undefined;
                                          maxConcurrency?: number | undefined;
                                        }
                                      | {
                                          type: "queue/v2beta";
                                          topic: string;
                                          maxDeliveries?: number | undefined;
                                          retryAfterSeconds?: number | undefined;
                                          initialDelaySeconds?: number | undefined;
                                          maxConcurrency?: number | undefined;
                                        }
                                      | { type: "schedule/v1beta" }
                                    >
                                  | undefined;
                                supportsCancellation?: boolean | undefined;
                              }
                            >
                          | undefined;
                        projectSettings?:
                          | {
                              framework?: (string | null) | undefined;
                              devCommand?: (string | null) | undefined;
                              installCommand?: (string | null) | undefined;
                              buildCommand?: (string | null) | undefined;
                              outputDirectory?: (string | null) | undefined;
                              rootDirectory?: (string | null) | undefined;
                              nodeVersion?: string | undefined;
                              monorepoManager?: (string | null) | undefined;
                              createdAt?: number | undefined;
                              autoExposeSystemEnvs?: boolean | undefined;
                              sourceFilesOutsideRootDirectory?: boolean | undefined;
                              directoryListing?: boolean | undefined;
                              gitForkProtection?: boolean | undefined;
                              commandForIgnoringBuildStep?: (string | null) | undefined;
                            }
                          | undefined;
                        outputDirectory?: string | undefined;
                        installCommand?: string | undefined;
                        buildCommand?: string | undefined;
                        devCommand?: string | undefined;
                        framework?: (string | null) | undefined;
                        nodeVersion?: string | undefined;
                        middleware?: boolean | undefined;
                        middlewareRuntime?: "nodejs" | undefined;
                        middlewareMatcher?: (string | Array<string>) | undefined;
                        serviceName?: string | undefined;
                      }
                    | undefined;
                };
                installCommand?: string | undefined;
                buildCommand?: string | undefined;
                devCommand?: string | undefined;
                ignoreCommand?: string | undefined;
                outputDirectory?: string | undefined;
                bindings?:
                  | Array<{
                      type?: "service" | undefined;
                      service: string;
                      format: "url";
                      env: string;
                    }>
                  | undefined;
                functions?:
                  | Record<
                      string,
                      {
                        architecture?: ("arm64" | "x86_64") | undefined;
                        memory?: number | undefined;
                        maxDuration?: (number | "max") | undefined;
                        maxConcurrency?: number | undefined;
                        regions?: Array<string> | undefined;
                        functionFailoverRegions?: Array<string> | undefined;
                        runtime?: string | undefined;
                        includeFiles?: string | undefined;
                        excludeFiles?: string | undefined;
                        experimentalTriggers?:
                          | Array<
                              | {
                                  type: "queue/v1beta";
                                  consumer: string;
                                  topic: string;
                                  maxDeliveries?: number | undefined;
                                  retryAfterSeconds?: number | undefined;
                                  initialDelaySeconds?: number | undefined;
                                  maxConcurrency?: number | undefined;
                                }
                              | {
                                  type: "queue/v2beta";
                                  topic: string;
                                  maxDeliveries?: number | undefined;
                                  retryAfterSeconds?: number | undefined;
                                  initialDelaySeconds?: number | undefined;
                                  maxConcurrency?: number | undefined;
                                }
                              | { type: "schedule/v1beta" }
                            >
                          | undefined;
                        supportsCancellation?: boolean | undefined;
                      }
                    >
                  | undefined;
                headers?:
                  | Array<{
                      source: string;
                      headers: Array<{ key: string; value: string }>;
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
                    }>
                  | undefined;
                redirects?:
                  | Array<{
                      source: string;
                      destination: string;
                      permanent?: boolean | undefined;
                      statusCode?: number | undefined;
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
                      env?: Array<string> | undefined;
                    }>
                  | undefined;
                rewrites?:
                  | Array<{
                      source: string;
                      destination:
                        | string
                        | {
                            type?: "service" | undefined;
                            service: string;
                            path?: string | undefined;
                          };
                      transforms?:
                        | Array<{
                            type: "request.path";
                            op: "set";
                            args: string;
                            env?: Array<string> | undefined;
                          }>
                        | undefined;
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
                      statusCode?: number | undefined;
                      env?: Array<string> | undefined;
                      respectOriginCacheControl?: boolean | undefined;
                    }>
                  | undefined;
                routes?:
                  | Array<
                      | {
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
                                | {
                                    type: "request.path";
                                    op: "set";
                                    args: string;
                                    env?: Array<string> | undefined;
                                  }
                              >
                            | undefined;
                          env?: Array<string> | undefined;
                          locale?:
                            | {
                                redirect?: Record<string, string> | undefined;
                                cookie?: string | undefined;
                              }
                            | undefined;
                          source?: string | undefined;
                          destination?:
                            | (
                                | string
                                | {
                                    type?: "service" | undefined;
                                    service: string;
                                    path?: string | undefined;
                                  }
                              )
                            | undefined;
                          statusCode?: number | undefined;
                          middlewarePath?: string | undefined;
                          middlewareRawSrc?: Array<string> | undefined;
                          middleware?: number | undefined;
                          respectOriginCacheControl?: boolean | undefined;
                        }
                      | {
                          handle: "error" | "filesystem" | "hit" | "miss" | "resource" | "rewrite";
                          src?: string | undefined;
                          dest?: string | undefined;
                          status?: number | undefined;
                        }
                    >
                  | undefined;
                cleanUrls?: boolean | undefined;
                trailingSlash?: boolean | undefined;
              }
          >
        | undefined;
      gitRepo?:
        | (
            | {
                namespace: string;
                projectId: number;
                type: "gitlab";
                url: string;
                path: string;
                defaultBranch: string;
                name: string;
                private: boolean;
                ownerType: "team" | "user";
              }
            | {
                org: string;
                repo: string;
                repoId: number;
                type: "github";
                repoOwnerId: number;
                path: string;
                defaultBranch: string;
                name: string;
                private: boolean;
                ownerType: "team" | "user";
              }
            | {
                owner: string;
                repoUuid: string;
                slug: string;
                type: "bitbucket";
                workspaceUuid: string;
                path: string;
                defaultBranch: string;
                name: string;
                private: boolean;
                ownerType: "team" | "user";
              }
            | {
                org: string;
                repo: string;
                type: "vercel";
                path: string;
                defaultBranch: string;
                name: string;
                private: boolean;
                ownerType: "team" | "user";
              }
            | {
                owner: string;
                repo: string;
                repoId: string;
                type: "cursor-origin";
                path: string;
                defaultBranch: string;
                name: string;
                private: boolean;
                ownerType: "team" | "user";
              }
            | null
          )
        | undefined;
      flags?:
        | (
            | {
                definitions: Record<
                  string,
                  {
                    options?:
                      | Array<{ value: FlagJSONValue; label?: string | undefined }>
                      | undefined;
                    url?: string | undefined;
                    description?: string | undefined;
                  }
                >;
              }
            | Array<Record<string, never>>
          )
        | undefined;
      microfrontends?:
        | (
            | {
                isDefaultApp?: false | undefined;
                defaultAppProjectName: string;
                defaultRoute?: string | undefined;
                groupIds: Array<string>;
              }
            | {
                isDefaultApp: true;
                mfeConfigUploadState?: ("no_config" | "success" | "waiting_on_build") | undefined;
                defaultAppProjectName: string;
                defaultRoute?: string | undefined;
                groupIds: Array<string>;
              }
          )
        | undefined;
      platform?:
        | {
            source: { name: string };
            origin: { type: "id" | "url"; value: string };
            creator: { name: string; avatar?: string | undefined };
            meta?: Record<string, string> | undefined;
          }
        | undefined;
      config?:
        | {
            version?: number | undefined;
            functionType: "fluid" | "standard";
            functionMemoryType: "performance" | "performance_xl" | "standard" | "standard_legacy";
            functionTimeout: number | null;
            secureComputePrimaryRegion: string | null;
            secureComputeFallbackRegion: string | null;
            isUsingActiveCPU?: boolean | undefined;
            resourceConfig?:
              | {
                  buildQueue?:
                    | {
                        configuration?:
                          | ("SKIP_NAMESPACE_QUEUE" | "WAIT_FOR_NAMESPACE_QUEUE")
                          | undefined;
                      }
                    | undefined;
                  elasticConcurrency?:
                    | ("PROJECT_SETTING" | "SKIP_QUEUE" | "TEAM_SETTING")
                    | undefined;
                  buildMachine?:
                    | {
                        purchaseType?:
                          | ("basic" | "enhanced" | "standard" | "turbo" | "null" | null)
                          | undefined;
                      }
                    | undefined;
                }
              | undefined;
          }
        | undefined;
      checks?:
        | {
            "deployment-alias": {
              state: "failed" | "pending" | "succeeded";
              startedAt: number;
              completedAt?: number | undefined;
            };
          }
        | undefined;
      seatBlock?:
        | {
            blockCode: "COMMIT_AUTHOR_REQUIRED" | "TEAM_ACCESS_REQUIRED";
            userId?: string | undefined;
            isVerified?: boolean | undefined;
            gitUserId?: (string | number) | undefined;
            gitProvider?: ("bitbucket" | "github" | "gitlab") | undefined;
          }
        | undefined;
      attribution?:
        | {
            commitMeta?:
              | {
                  email?: string | undefined;
                  name?: string | undefined;
                  isVerified?: boolean | undefined;
                }
              | undefined;
            gitUser?:
              | {
                  id: string | number;
                  login: string;
                  type?: string | undefined;
                  provider?: string | undefined;
                }
              | undefined;
            vercelUser?:
              | { id: string; username: string; teamRoles?: Array<string> | undefined }
              | undefined;
          }
        | undefined;
    }
  | {
      alias?: Array<string> | undefined;
      aliasAssigned: boolean;
      bootedAt: number;
      buildingAt: number;
      buildContainerFinishedAt?: number | undefined;
      buildSkipped: boolean;
      creator: {
        uid: string;
        type?: ("app" | "integration" | "system" | "user") | undefined;
        username?: string | undefined;
        avatar?: string | undefined;
      };
      initReadyAt?: number | undefined;
      isFirstBranchDeployment?: boolean | undefined;
      lambdas?:
        | Array<{
            id: string;
            readyState?: ("BUILDING" | "ERROR" | "INITIALIZING" | "READY") | undefined;
            createdAt?: number | undefined;
            entrypoint?: (string | null) | undefined;
            readyStateAt?: number | undefined;
            output: Array<{ path: string; functionName: string }>;
          }>
        | undefined;
      public: boolean;
      ready?: number | undefined;
      status: "BLOCKED" | "BUILDING" | "CANCELED" | "ERROR" | "INITIALIZING" | "QUEUED" | "READY";
      team?: { id: string; name: string; slug: string; avatar?: string | undefined } | undefined;
      userAliases?: Array<string> | undefined;
      previewCommentsEnabled?: boolean | undefined;
      ttyBuildLogs?: boolean | undefined;
      customEnvironment?:
        | (
            | {
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
              }
            | { id: string }
          )
        | undefined;
      oomReport?: "out-of-memory" | undefined;
      readyStateReason?: string | undefined;
      id: string;
      target?: ("production" | "staging" | "null" | null) | undefined;
      readyState:
        | "BLOCKED"
        | "BUILDING"
        | "CANCELED"
        | "ERROR"
        | "INITIALIZING"
        | "QUEUED"
        | "READY";
      aliasError?: ({ code: string; message: string } | null) | undefined;
      aliasWarning?:
        | ({
            code: string;
            message: string;
            link?: string | undefined;
            action?: string | undefined;
          } | null)
        | undefined;
      errorCode?: string | undefined;
      errorMessage?: (string | null) | undefined;
      createdAt: number;
      name: string;
      type: "LAMBDAS";
      aliasFinal?: (string | null) | undefined;
      autoAssignCustomDomains?: boolean | undefined;
      automaticAliases?: Array<string> | undefined;
      buildErrorAt?: number | undefined;
      checksState?: ("completed" | "registered" | "running") | undefined;
      checksConclusion?: ("canceled" | "failed" | "skipped" | "succeeded") | undefined;
      deletedAt?: (number | null) | undefined;
      defaultRoute?: string | undefined;
      canceledAt?: number | undefined;
      errorLink?: string | undefined;
      errorStep?: string | undefined;
      passiveRegions?: Array<string> | undefined;
      gitSource?:
        | (
            | {
                type: "github";
                repoId: string | number;
                ref?: (string | null) | undefined;
                sha?: string | undefined;
                prId?: (number | null) | undefined;
              }
            | {
                type: "github";
                org: string;
                repo: string;
                ref?: (string | null) | undefined;
                sha?: string | undefined;
                prId?: (number | null) | undefined;
              }
            | {
                type: "github-custom-host";
                host: string;
                repoId: string | number;
                ref?: (string | null) | undefined;
                sha?: string | undefined;
                prId?: (number | null) | undefined;
              }
            | {
                type: "github-custom-host";
                host: string;
                org: string;
                repo: string;
                ref?: (string | null) | undefined;
                sha?: string | undefined;
                prId?: (number | null) | undefined;
              }
            | {
                type: "github-limited";
                repoId: string | number;
                ref?: (string | null) | undefined;
                sha?: string | undefined;
                prId?: (number | null) | undefined;
              }
            | {
                type: "github-limited";
                org: string;
                repo: string;
                ref?: (string | null) | undefined;
                sha?: string | undefined;
                prId?: (number | null) | undefined;
              }
            | {
                type: "gitlab";
                projectId: string | number;
                ref?: (string | null) | undefined;
                sha?: string | undefined;
                prId?: (number | null) | undefined;
              }
            | {
                type: "bitbucket";
                workspaceUuid?: string | undefined;
                repoUuid: string;
                ref?: (string | null) | undefined;
                sha?: string | undefined;
                prId?: (number | null) | undefined;
              }
            | {
                type: "bitbucket";
                owner: string;
                slug: string;
                ref?: (string | null) | undefined;
                sha?: string | undefined;
                prId?: (number | null) | undefined;
              }
            | {
                type: "vercel";
                org?: string | undefined;
                repo?: string | undefined;
                sha: string;
                repoPushedAt?: number | undefined;
                ref?: (string | null) | undefined;
                prId?: (number | null) | undefined;
              }
            | {
                type: "cursor-origin";
                repoId: string;
                owner?: string | undefined;
                repo?: string | undefined;
                ref?: (string | null) | undefined;
                sha?: string | undefined;
                prId?: (number | null) | undefined;
              }
            | { type: "custom"; ref: string; sha: string; gitUrl: string }
            | {
                type: "github";
                ref: string;
                sha: string;
                repoId: number;
                org?: string | undefined;
                repo?: string | undefined;
              }
            | {
                type: "github-custom-host";
                host: string;
                ref: string;
                sha: string;
                repoId: number;
                org?: string | undefined;
                repo?: string | undefined;
              }
            | {
                type: "github-limited";
                ref: string;
                sha: string;
                repoId: number;
                org?: string | undefined;
                repo?: string | undefined;
              }
            | { type: "gitlab"; ref: string; sha: string; projectId: number }
            | {
                type: "bitbucket";
                ref: string;
                sha: string;
                owner?: string | undefined;
                slug?: string | undefined;
                workspaceUuid: string;
                repoUuid: string;
              }
            | {
                type: "vercel";
                ref: string;
                sha: string;
                org: string;
                repo: string;
                repoPushedAt?: number | undefined;
              }
            | {
                type: "cursor-origin";
                ref: string;
                sha: string;
                repoId: string;
                owner: string;
                repo: string;
              }
          )
        | undefined;
      manualProvisioning?:
        | { state: "COMPLETE" | "PENDING" | "TIMEOUT"; completedAt?: number | undefined }
        | undefined;
      meta: Record<string, string>;
      originCacheRegion?: string | undefined;
      nodeVersion?:
        | ("10.x" | "12.x" | "14.x" | "16.x" | "18.x" | "20.x" | "22.x" | "24.x" | "8.10.x")
        | undefined;
      project?: { id: string; name: string; framework?: (string | null) | undefined } | undefined;
      prebuilt?: boolean | undefined;
      readySubstate?: ("PROMOTED" | "ROLLING" | "STAGED") | undefined;
      regions: Array<string>;
      softDeletedByRetention?: boolean | undefined;
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
      undeletedAt?: number | undefined;
      url: string;
      userConfiguredDeploymentId?: string | undefined;
      version: number;
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
    };

export type GetV13DeploymentsIdOrUrlInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrUrl: string };
  query: {
    withGitRepoInfo?: string | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV13DeploymentsIdOrUrlHandler = (
  input: GetV13DeploymentsIdOrUrlInput,
) => Promise<GetV13DeploymentsIdOrUrlResponse>;

export const postV13DeploymentsBody = z.object({
  customEnvironmentSlugOrId: z.string().optional(),
  deploymentId: z.string().optional(),
  files: z
    .array(
      z.union([
        z.object({
          data: z.string(),
          encoding: z.enum(["base64", "utf-8"]).optional(),
          file: z.string(),
        }),
        z.object({
          file: z.string(),
          sha: z.string().optional(),
          size: z.number().int().optional(),
        }),
      ]),
    )
    .optional(),
  gitAccessToken: z.string().max(1024).optional(),
  gitMetadata: z
    .object({
      remoteUrl: z.string().optional(),
      commitAuthorName: z.string().optional(),
      commitAuthorEmail: z.string().optional(),
      commitMessage: z.string().optional(),
      commitRef: z.string().optional(),
      commitSha: z.string().optional(),
      dirty: z.boolean().optional(),
      ci: z.boolean().optional(),
      ciType: z.string().optional(),
      ciGitProviderUsername: z.string().optional(),
      ciGitRepoVisibility: z.string().optional(),
      rootDirectory: z.string().optional(),
    })
    .optional(),
  gitSource: z
    .union([
      z.object({ type: z.literal("vercel"), sha: z.string() }),
      z.object({
        ref: z.string(),
        repoId: z.union([z.number(), z.string()]),
        sha: z.string().optional(),
        type: z.literal("github"),
      }),
      z.object({
        org: z.string(),
        ref: z.string(),
        repo: z.string(),
        sha: z.string().optional(),
        type: z.literal("github"),
      }),
      z.object({
        ref: z.string(),
        repoId: z.union([z.number(), z.string()]),
        sha: z.string().optional(),
        type: z.literal("github-limited"),
      }),
      z.object({
        org: z.string(),
        ref: z.string(),
        repo: z.string(),
        sha: z.string().optional(),
        type: z.literal("github-limited"),
      }),
      z.object({
        projectId: z.union([z.number(), z.string()]),
        ref: z.string(),
        sha: z.string().optional(),
        type: z.literal("gitlab"),
      }),
      z.object({
        ref: z.string(),
        repoUuid: z.string(),
        sha: z.string().optional(),
        type: z.literal("bitbucket"),
        workspaceUuid: z.string().optional(),
      }),
      z.object({
        owner: z.string(),
        ref: z.string(),
        sha: z.string().optional(),
        slug: z.string(),
        type: z.literal("bitbucket"),
      }),
      z.object({
        owner: z.string().optional(),
        ref: z.string(),
        repo: z.string().optional(),
        repoId: z.string(),
        sha: z.string().optional(),
        type: z.literal("cursor-origin"),
      }),
    ])
    .optional(),
  meta: z.record(z.string(), z.string().max(65536)).optional(),
  monorepoManager: z.string().nullable().optional(),
  name: z.string(),
  project: z.string().optional(),
  projectSettings: z
    .object({
      buildCommand: z.string().max(256).nullable().optional(),
      commandForIgnoringBuildStep: z.string().max(256).nullable().optional(),
      devCommand: z.string().max(256).nullable().optional(),
      framework: z
        .enum([
          "null",
          "services",
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
          "mastra",
        ])
        .nullable()
        .optional(),
      installCommand: z.string().max(256).nullable().optional(),
      nodeVersion: z
        .enum(["24.x", "22.x", "20.x", "18.x", "16.x", "14.x", "12.x", "10.x", "8.10.x"])
        .optional(),
      outputDirectory: z.string().max(256).nullable().optional(),
      rootDirectory: z.string().max(256).nullable().optional(),
      serverlessFunctionRegion: z.string().max(4).nullable().optional(),
      skipGitConnectDuringLink: z.boolean().optional(),
      sourceFilesOutsideRootDirectory: z.boolean().optional(),
    })
    .optional(),
  target: z.string().optional(),
  withLatestCommit: z.boolean().optional(),
});

export type PostV13DeploymentsBody = {
  customEnvironmentSlugOrId?: string | undefined;
  deploymentId?: string | undefined;
  files?:
    | Array<
        | { data: string; encoding?: ("base64" | "utf-8") | undefined; file: string }
        | { file: string; sha?: string | undefined; size?: number | undefined }
      >
    | undefined;
  gitAccessToken?: string | undefined;
  gitMetadata?:
    | {
        remoteUrl?: string | undefined;
        commitAuthorName?: string | undefined;
        commitAuthorEmail?: string | undefined;
        commitMessage?: string | undefined;
        commitRef?: string | undefined;
        commitSha?: string | undefined;
        dirty?: boolean | undefined;
        ci?: boolean | undefined;
        ciType?: string | undefined;
        ciGitProviderUsername?: string | undefined;
        ciGitRepoVisibility?: string | undefined;
        rootDirectory?: string | undefined;
      }
    | undefined;
  gitSource?:
    | (
        | { type: "vercel"; sha: string }
        | { ref: string; repoId: number | string; sha?: string | undefined; type: "github" }
        | { org: string; ref: string; repo: string; sha?: string | undefined; type: "github" }
        | { ref: string; repoId: number | string; sha?: string | undefined; type: "github-limited" }
        | {
            org: string;
            ref: string;
            repo: string;
            sha?: string | undefined;
            type: "github-limited";
          }
        | { projectId: number | string; ref: string; sha?: string | undefined; type: "gitlab" }
        | {
            ref: string;
            repoUuid: string;
            sha?: string | undefined;
            type: "bitbucket";
            workspaceUuid?: string | undefined;
          }
        | { owner: string; ref: string; sha?: string | undefined; slug: string; type: "bitbucket" }
        | {
            owner?: string | undefined;
            ref: string;
            repo?: string | undefined;
            repoId: string;
            sha?: string | undefined;
            type: "cursor-origin";
          }
      )
    | undefined;
  meta?: Record<string, string> | undefined;
  monorepoManager?: (string | null) | undefined;
  name: string;
  project?: string | undefined;
  projectSettings?:
    | {
        buildCommand?: (string | null) | undefined;
        commandForIgnoringBuildStep?: (string | null) | undefined;
        devCommand?: (string | null) | undefined;
        framework?:
          | (
              | "null"
              | "services"
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
              | "mastra"
              | null
            )
          | undefined;
        installCommand?: (string | null) | undefined;
        nodeVersion?:
          | ("24.x" | "22.x" | "20.x" | "18.x" | "16.x" | "14.x" | "12.x" | "10.x" | "8.10.x")
          | undefined;
        outputDirectory?: (string | null) | undefined;
        rootDirectory?: (string | null) | undefined;
        serverlessFunctionRegion?: (string | null) | undefined;
        skipGitConnectDuringLink?: boolean | undefined;
        sourceFilesOutsideRootDirectory?: boolean | undefined;
      }
    | undefined;
  target?: string | undefined;
  withLatestCommit?: boolean | undefined;
};

export type PostV13DeploymentsResponse =
  | {
      alias?: Array<string> | undefined;
      aliasAssigned: boolean;
      id: string;
      target?: ("production" | "staging" | "null" | null) | undefined;
      readyState:
        | "BLOCKED"
        | "BUILDING"
        | "CANCELED"
        | "ERROR"
        | "INITIALIZING"
        | "QUEUED"
        | "READY";
      aliasError?: ({ code: string; message: string } | null) | undefined;
      aliasWarning?:
        | ({
            code: string;
            message: string;
            link?: string | undefined;
            action?: string | undefined;
          } | null)
        | undefined;
      errorCode?: string | undefined;
      errorMessage?: (string | null) | undefined;
    }
  | {
      aliasAssignedAt?: (number | boolean | null) | undefined;
      alwaysRefuseToBuild?: boolean | undefined;
      build: { env: Array<string> };
      buildArtifactUrls?: Array<string> | undefined;
      builds?:
        | Array<{
            use: string;
            src?: string | undefined;
            config?: Record<string, unknown> | undefined;
          }>
        | undefined;
      env: Array<string>;
      resourceConfig?:
        | {
            buildMachine?:
              | {
                  purchaseType?: ("basic" | "enhanced" | "standard" | "turbo") | undefined;
                  defaultPurchaseType?: ("basic" | "enhanced" | "standard") | undefined;
                  machineSelectionType?: ("elastic" | "fixed") | undefined;
                  cores?: number | undefined;
                  memory?: number | undefined;
                }
              | undefined;
          }
        | undefined;
      inspectorUrl: string | null;
      isInConcurrentBuildsQueue: boolean;
      isInSystemBuildsQueue: boolean;
      projectSettings: {
        nodeVersion?:
          | ("10.x" | "12.x" | "14.x" | "16.x" | "18.x" | "20.x" | "22.x" | "24.x" | "8.10.x")
          | undefined;
        buildCommand?: (string | null) | undefined;
        devCommand?: (string | null) | undefined;
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
        commandForIgnoringBuildStep?: (string | null) | undefined;
        installCommand?: (string | null) | undefined;
        outputDirectory?: (string | null) | undefined;
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
        webAnalytics?:
          | {
              id: string;
              disabledAt?: number | undefined;
              canceledAt?: number | undefined;
              enabledAt?: number | undefined;
              hasData?: true | undefined;
            }
          | undefined;
      };
      integrations?:
        | {
            status: "error" | "pending" | "ready" | "skipped" | "timeout";
            startedAt: number;
            claimedAt?: number | undefined;
            completedAt?: number | undefined;
            skippedAt?: number | undefined;
            skippedBy?: string | undefined;
          }
        | undefined;
      images?:
        | {
            sizes?: Array<number> | undefined;
            qualities?: Array<number> | undefined;
            domains?: Array<string> | undefined;
            remotePatterns?:
              | Array<{
                  protocol?: ("http" | "https") | undefined;
                  hostname: string;
                  port?: string | undefined;
                  pathname?: string | undefined;
                  search?: string | undefined;
                }>
              | undefined;
            localPatterns?:
              | Array<{ pathname?: string | undefined; search?: string | undefined }>
              | undefined;
            minimumCacheTTL?: number | undefined;
            formats?: Array<"image/avif" | "image/webp"> | undefined;
            dangerouslyAllowSVG?: boolean | undefined;
            contentSecurityPolicy?: string | undefined;
            contentDispositionType?: ("attachment" | "inline") | undefined;
          }
        | undefined;
      alias?: Array<string> | undefined;
      aliasAssigned: boolean;
      bootedAt: number;
      buildingAt: number;
      buildContainerFinishedAt?: number | undefined;
      buildSkipped: boolean;
      creator: {
        uid: string;
        type?: ("app" | "integration" | "system" | "user") | undefined;
        username?: string | undefined;
        avatar?: string | undefined;
      };
      initReadyAt?: number | undefined;
      isFirstBranchDeployment?: boolean | undefined;
      lambdas?:
        | Array<{
            id: string;
            readyState?: ("BUILDING" | "ERROR" | "INITIALIZING" | "READY") | undefined;
            createdAt?: number | undefined;
            entrypoint?: (string | null) | undefined;
            readyStateAt?: number | undefined;
            output: Array<{ path: string; functionName: string }>;
          }>
        | undefined;
      public: boolean;
      ready?: number | undefined;
      status: "BLOCKED" | "BUILDING" | "CANCELED" | "ERROR" | "INITIALIZING" | "QUEUED" | "READY";
      team?: { id: string; name: string; slug: string; avatar?: string | undefined } | undefined;
      userAliases?: Array<string> | undefined;
      previewCommentsEnabled?: boolean | undefined;
      ttyBuildLogs?: boolean | undefined;
      customEnvironment?:
        | (
            | {
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
              }
            | { id: string }
          )
        | undefined;
      oomReport?: "out-of-memory" | undefined;
      readyStateReason?: string | undefined;
      id: string;
      target?: ("production" | "staging" | "null" | null) | undefined;
      readyState:
        | "BLOCKED"
        | "BUILDING"
        | "CANCELED"
        | "ERROR"
        | "INITIALIZING"
        | "QUEUED"
        | "READY";
      aliasError?: ({ code: string; message: string } | null) | undefined;
      aliasWarning?:
        | ({
            code: string;
            message: string;
            link?: string | undefined;
            action?: string | undefined;
          } | null)
        | undefined;
      errorCode?: string | undefined;
      errorMessage?: (string | null) | undefined;
      createdAt: number;
      name: string;
      type: "LAMBDAS";
      aliasFinal?: (string | null) | undefined;
      autoAssignCustomDomains?: boolean | undefined;
      automaticAliases?: Array<string> | undefined;
      buildErrorAt?: number | undefined;
      checksState?: ("completed" | "registered" | "running") | undefined;
      checksConclusion?: ("canceled" | "failed" | "skipped" | "succeeded") | undefined;
      deletedAt?: (number | null) | undefined;
      defaultRoute?: string | undefined;
      canceledAt?: number | undefined;
      errorLink?: string | undefined;
      errorStep?: string | undefined;
      passiveRegions?: Array<string> | undefined;
      gitSource?:
        | (
            | {
                type: "github";
                repoId: string | number;
                ref?: (string | null) | undefined;
                sha?: string | undefined;
                prId?: (number | null) | undefined;
              }
            | {
                type: "github";
                org: string;
                repo: string;
                ref?: (string | null) | undefined;
                sha?: string | undefined;
                prId?: (number | null) | undefined;
              }
            | {
                type: "github-custom-host";
                host: string;
                repoId: string | number;
                ref?: (string | null) | undefined;
                sha?: string | undefined;
                prId?: (number | null) | undefined;
              }
            | {
                type: "github-custom-host";
                host: string;
                org: string;
                repo: string;
                ref?: (string | null) | undefined;
                sha?: string | undefined;
                prId?: (number | null) | undefined;
              }
            | {
                type: "github-limited";
                repoId: string | number;
                ref?: (string | null) | undefined;
                sha?: string | undefined;
                prId?: (number | null) | undefined;
              }
            | {
                type: "github-limited";
                org: string;
                repo: string;
                ref?: (string | null) | undefined;
                sha?: string | undefined;
                prId?: (number | null) | undefined;
              }
            | {
                type: "gitlab";
                projectId: string | number;
                ref?: (string | null) | undefined;
                sha?: string | undefined;
                prId?: (number | null) | undefined;
              }
            | {
                type: "bitbucket";
                workspaceUuid?: string | undefined;
                repoUuid: string;
                ref?: (string | null) | undefined;
                sha?: string | undefined;
                prId?: (number | null) | undefined;
              }
            | {
                type: "bitbucket";
                owner: string;
                slug: string;
                ref?: (string | null) | undefined;
                sha?: string | undefined;
                prId?: (number | null) | undefined;
              }
            | {
                type: "vercel";
                org?: string | undefined;
                repo?: string | undefined;
                sha: string;
                repoPushedAt?: number | undefined;
                ref?: (string | null) | undefined;
                prId?: (number | null) | undefined;
              }
            | {
                type: "cursor-origin";
                repoId: string;
                owner?: string | undefined;
                repo?: string | undefined;
                ref?: (string | null) | undefined;
                sha?: string | undefined;
                prId?: (number | null) | undefined;
              }
            | { type: "custom"; ref: string; sha: string; gitUrl: string }
            | {
                type: "github";
                ref: string;
                sha: string;
                repoId: number;
                org?: string | undefined;
                repo?: string | undefined;
              }
            | {
                type: "github-custom-host";
                host: string;
                ref: string;
                sha: string;
                repoId: number;
                org?: string | undefined;
                repo?: string | undefined;
              }
            | {
                type: "github-limited";
                ref: string;
                sha: string;
                repoId: number;
                org?: string | undefined;
                repo?: string | undefined;
              }
            | { type: "gitlab"; ref: string; sha: string; projectId: number }
            | {
                type: "bitbucket";
                ref: string;
                sha: string;
                owner?: string | undefined;
                slug?: string | undefined;
                workspaceUuid: string;
                repoUuid: string;
              }
            | {
                type: "vercel";
                ref: string;
                sha: string;
                org: string;
                repo: string;
                repoPushedAt?: number | undefined;
              }
            | {
                type: "cursor-origin";
                ref: string;
                sha: string;
                repoId: string;
                owner: string;
                repo: string;
              }
          )
        | undefined;
      manualProvisioning?:
        | { state: "COMPLETE" | "PENDING" | "TIMEOUT"; completedAt?: number | undefined }
        | undefined;
      meta: Record<string, string>;
      originCacheRegion?: string | undefined;
      nodeVersion?:
        | ("10.x" | "12.x" | "14.x" | "16.x" | "18.x" | "20.x" | "22.x" | "24.x" | "8.10.x")
        | undefined;
      project?: { id: string; name: string; framework?: (string | null) | undefined } | undefined;
      prebuilt?: boolean | undefined;
      readySubstate?: ("PROMOTED" | "ROLLING" | "STAGED") | undefined;
      regions: Array<string>;
      softDeletedByRetention?: boolean | undefined;
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
      undeletedAt?: number | undefined;
      url: string;
      userConfiguredDeploymentId?: string | undefined;
      version: number;
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
      projectId: string;
      plan: "enterprise" | "hobby" | "pro";
      connectBuildsEnabled?: boolean | undefined;
      connectConfigurationId?: string | undefined;
      createdIn: string;
      crons?: Array<{ schedule: string; path: string }> | undefined;
      atproto?:
        | (
            | { enabled: false }
            | {
                enabled: true;
                subscription: {
                  collections: Array<string>;
                  dids?: Array<string> | undefined;
                  kinds?: Array<"account" | "commit" | "identity" | "sync"> | undefined;
                  path: string;
                };
              }
          )
        | undefined;
      functions?:
        | (Record<
            string,
            {
              architecture?: ("arm64" | "x86_64") | undefined;
              memory?: number | undefined;
              maxDuration?: (number | "max") | undefined;
              maxConcurrency?: number | undefined;
              regions?: Array<string> | undefined;
              functionFailoverRegions?: Array<string> | undefined;
              runtime?: string | undefined;
              includeFiles?: string | undefined;
              excludeFiles?: string | undefined;
              experimentalTriggers?:
                | Array<
                    | {
                        type: "queue/v1beta";
                        consumer: string;
                        topic: string;
                        maxDeliveries?: number | undefined;
                        retryAfterSeconds?: number | undefined;
                        initialDelaySeconds?: number | undefined;
                        maxConcurrency?: number | undefined;
                      }
                    | {
                        type: "queue/v2beta";
                        topic: string;
                        maxDeliveries?: number | undefined;
                        retryAfterSeconds?: number | undefined;
                        initialDelaySeconds?: number | undefined;
                        maxConcurrency?: number | undefined;
                      }
                    | { type: "schedule/v1beta" }
                  >
                | undefined;
              supportsCancellation?: boolean | undefined;
            }
          > | null)
        | undefined;
      isInstantStatic?: boolean | undefined;
      monorepoManager?: (string | null) | undefined;
      ownerId: string;
      passiveConnectConfigurationId?: string | undefined;
      routes: Array<
        | {
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
                  | {
                      type: "request.path";
                      op: "set";
                      args: string;
                      env?: Array<string> | undefined;
                    }
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
          }
        | {
            handle: "error" | "filesystem" | "hit" | "miss" | "resource" | "rewrite";
            src?: string | undefined;
            dest?: string | undefined;
            status?: number | undefined;
          }
        | { src: string; continue: boolean; middleware: number }
      > | null;
      services?:
        | Array<
            | {
                schema: "experimentalServices";
                name: string;
                type: "cron" | "job" | "web" | "worker";
                trigger?: ("queue" | "schedule" | "workflow") | undefined;
                group?: string | undefined;
                workspace: string;
                entrypoint?: string | undefined;
                framework?: string | undefined;
                builder: {
                  use: string;
                  src?: string | undefined;
                  config?:
                    | {
                        bunVersion?: string | undefined;
                        maxLambdaSize?: string | undefined;
                        includeFiles?: (string | Array<string>) | undefined;
                        excludeFiles?: (string | Array<string>) | undefined;
                        bundle?: boolean | undefined;
                        ldsflags?: string | undefined;
                        helpers?: boolean | undefined;
                        rust?: string | undefined;
                        debug?: boolean | undefined;
                        zeroConfig?: boolean | undefined;
                        import?: Record<string, string> | undefined;
                        functions?:
                          | Record<
                              string,
                              {
                                architecture?: ("arm64" | "x86_64") | undefined;
                                memory?: number | undefined;
                                maxDuration?: (number | "max") | undefined;
                                maxConcurrency?: number | undefined;
                                regions?: Array<string> | undefined;
                                functionFailoverRegions?: Array<string> | undefined;
                                runtime?: string | undefined;
                                includeFiles?: string | undefined;
                                excludeFiles?: string | undefined;
                                experimentalTriggers?:
                                  | Array<
                                      | {
                                          type: "queue/v1beta";
                                          consumer: string;
                                          topic: string;
                                          maxDeliveries?: number | undefined;
                                          retryAfterSeconds?: number | undefined;
                                          initialDelaySeconds?: number | undefined;
                                          maxConcurrency?: number | undefined;
                                        }
                                      | {
                                          type: "queue/v2beta";
                                          topic: string;
                                          maxDeliveries?: number | undefined;
                                          retryAfterSeconds?: number | undefined;
                                          initialDelaySeconds?: number | undefined;
                                          maxConcurrency?: number | undefined;
                                        }
                                      | { type: "schedule/v1beta" }
                                    >
                                  | undefined;
                                supportsCancellation?: boolean | undefined;
                              }
                            >
                          | undefined;
                        projectSettings?:
                          | {
                              framework?: (string | null) | undefined;
                              devCommand?: (string | null) | undefined;
                              installCommand?: (string | null) | undefined;
                              buildCommand?: (string | null) | undefined;
                              outputDirectory?: (string | null) | undefined;
                              rootDirectory?: (string | null) | undefined;
                              nodeVersion?: string | undefined;
                              monorepoManager?: (string | null) | undefined;
                              createdAt?: number | undefined;
                              autoExposeSystemEnvs?: boolean | undefined;
                              sourceFilesOutsideRootDirectory?: boolean | undefined;
                              directoryListing?: boolean | undefined;
                              gitForkProtection?: boolean | undefined;
                              commandForIgnoringBuildStep?: (string | null) | undefined;
                            }
                          | undefined;
                        outputDirectory?: string | undefined;
                        installCommand?: string | undefined;
                        buildCommand?: string | undefined;
                        devCommand?: string | undefined;
                        framework?: (string | null) | undefined;
                        nodeVersion?: string | undefined;
                        middleware?: boolean | undefined;
                        middlewareRuntime?: "nodejs" | undefined;
                        middlewareMatcher?: (string | Array<string>) | undefined;
                        serviceName?: string | undefined;
                      }
                    | undefined;
                };
                runtime?: string | undefined;
                buildCommand?: string | undefined;
                installCommand?: string | undefined;
                preDeployCommand?: string | undefined;
                routePrefix?: string | undefined;
                routePrefixSource?: ("configured" | "generated") | undefined;
                subdomain?: string | undefined;
                schedule?: (string | Array<string>) | undefined;
                handlerFunction?: string | undefined;
                topics?:
                  | (
                      | Array<string>
                      | Array<{
                          topic: string;
                          retryAfterSeconds?: number | undefined;
                          initialDelaySeconds?: number | undefined;
                        }>
                    )
                  | undefined;
                env?: Record<string, { type: "service-ref"; service: string }> | undefined;
              }
            | {
                schema: "experimentalServicesV2";
                name: string;
                root: string;
                framework?: string | undefined;
                runtime?: string | undefined;
                entrypoint?: string | undefined;
                command?: Array<string> | undefined;
                builder: {
                  use: string;
                  src?: string | undefined;
                  config?:
                    | {
                        bunVersion?: string | undefined;
                        maxLambdaSize?: string | undefined;
                        includeFiles?: (string | Array<string>) | undefined;
                        excludeFiles?: (string | Array<string>) | undefined;
                        bundle?: boolean | undefined;
                        ldsflags?: string | undefined;
                        helpers?: boolean | undefined;
                        rust?: string | undefined;
                        debug?: boolean | undefined;
                        zeroConfig?: boolean | undefined;
                        import?: Record<string, string> | undefined;
                        functions?:
                          | Record<
                              string,
                              {
                                architecture?: ("arm64" | "x86_64") | undefined;
                                memory?: number | undefined;
                                maxDuration?: (number | "max") | undefined;
                                maxConcurrency?: number | undefined;
                                regions?: Array<string> | undefined;
                                functionFailoverRegions?: Array<string> | undefined;
                                runtime?: string | undefined;
                                includeFiles?: string | undefined;
                                excludeFiles?: string | undefined;
                                experimentalTriggers?:
                                  | Array<
                                      | {
                                          type: "queue/v1beta";
                                          consumer: string;
                                          topic: string;
                                          maxDeliveries?: number | undefined;
                                          retryAfterSeconds?: number | undefined;
                                          initialDelaySeconds?: number | undefined;
                                          maxConcurrency?: number | undefined;
                                        }
                                      | {
                                          type: "queue/v2beta";
                                          topic: string;
                                          maxDeliveries?: number | undefined;
                                          retryAfterSeconds?: number | undefined;
                                          initialDelaySeconds?: number | undefined;
                                          maxConcurrency?: number | undefined;
                                        }
                                      | { type: "schedule/v1beta" }
                                    >
                                  | undefined;
                                supportsCancellation?: boolean | undefined;
                              }
                            >
                          | undefined;
                        projectSettings?:
                          | {
                              framework?: (string | null) | undefined;
                              devCommand?: (string | null) | undefined;
                              installCommand?: (string | null) | undefined;
                              buildCommand?: (string | null) | undefined;
                              outputDirectory?: (string | null) | undefined;
                              rootDirectory?: (string | null) | undefined;
                              nodeVersion?: string | undefined;
                              monorepoManager?: (string | null) | undefined;
                              createdAt?: number | undefined;
                              autoExposeSystemEnvs?: boolean | undefined;
                              sourceFilesOutsideRootDirectory?: boolean | undefined;
                              directoryListing?: boolean | undefined;
                              gitForkProtection?: boolean | undefined;
                              commandForIgnoringBuildStep?: (string | null) | undefined;
                            }
                          | undefined;
                        outputDirectory?: string | undefined;
                        installCommand?: string | undefined;
                        buildCommand?: string | undefined;
                        devCommand?: string | undefined;
                        framework?: (string | null) | undefined;
                        nodeVersion?: string | undefined;
                        middleware?: boolean | undefined;
                        middlewareRuntime?: "nodejs" | undefined;
                        middlewareMatcher?: (string | Array<string>) | undefined;
                        serviceName?: string | undefined;
                      }
                    | undefined;
                };
                installCommand?: string | undefined;
                buildCommand?: string | undefined;
                devCommand?: string | undefined;
                ignoreCommand?: string | undefined;
                outputDirectory?: string | undefined;
                bindings?:
                  | Array<{
                      type?: "service" | undefined;
                      service: string;
                      format: "url";
                      env: string;
                    }>
                  | undefined;
                functions?:
                  | Record<
                      string,
                      {
                        architecture?: ("arm64" | "x86_64") | undefined;
                        memory?: number | undefined;
                        maxDuration?: (number | "max") | undefined;
                        maxConcurrency?: number | undefined;
                        regions?: Array<string> | undefined;
                        functionFailoverRegions?: Array<string> | undefined;
                        runtime?: string | undefined;
                        includeFiles?: string | undefined;
                        excludeFiles?: string | undefined;
                        experimentalTriggers?:
                          | Array<
                              | {
                                  type: "queue/v1beta";
                                  consumer: string;
                                  topic: string;
                                  maxDeliveries?: number | undefined;
                                  retryAfterSeconds?: number | undefined;
                                  initialDelaySeconds?: number | undefined;
                                  maxConcurrency?: number | undefined;
                                }
                              | {
                                  type: "queue/v2beta";
                                  topic: string;
                                  maxDeliveries?: number | undefined;
                                  retryAfterSeconds?: number | undefined;
                                  initialDelaySeconds?: number | undefined;
                                  maxConcurrency?: number | undefined;
                                }
                              | { type: "schedule/v1beta" }
                            >
                          | undefined;
                        supportsCancellation?: boolean | undefined;
                      }
                    >
                  | undefined;
                headers?:
                  | Array<{
                      source: string;
                      headers: Array<{ key: string; value: string }>;
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
                    }>
                  | undefined;
                redirects?:
                  | Array<{
                      source: string;
                      destination: string;
                      permanent?: boolean | undefined;
                      statusCode?: number | undefined;
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
                      env?: Array<string> | undefined;
                    }>
                  | undefined;
                rewrites?:
                  | Array<{
                      source: string;
                      destination:
                        | string
                        | {
                            type?: "service" | undefined;
                            service: string;
                            path?: string | undefined;
                          };
                      transforms?:
                        | Array<{
                            type: "request.path";
                            op: "set";
                            args: string;
                            env?: Array<string> | undefined;
                          }>
                        | undefined;
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
                      statusCode?: number | undefined;
                      env?: Array<string> | undefined;
                      respectOriginCacheControl?: boolean | undefined;
                    }>
                  | undefined;
                routes?:
                  | Array<
                      | {
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
                                | {
                                    type: "request.path";
                                    op: "set";
                                    args: string;
                                    env?: Array<string> | undefined;
                                  }
                              >
                            | undefined;
                          env?: Array<string> | undefined;
                          locale?:
                            | {
                                redirect?: Record<string, string> | undefined;
                                cookie?: string | undefined;
                              }
                            | undefined;
                          source?: string | undefined;
                          destination?:
                            | (
                                | string
                                | {
                                    type?: "service" | undefined;
                                    service: string;
                                    path?: string | undefined;
                                  }
                              )
                            | undefined;
                          statusCode?: number | undefined;
                          middlewarePath?: string | undefined;
                          middlewareRawSrc?: Array<string> | undefined;
                          middleware?: number | undefined;
                          respectOriginCacheControl?: boolean | undefined;
                        }
                      | {
                          handle: "error" | "filesystem" | "hit" | "miss" | "resource" | "rewrite";
                          src?: string | undefined;
                          dest?: string | undefined;
                          status?: number | undefined;
                        }
                    >
                  | undefined;
                cleanUrls?: boolean | undefined;
                trailingSlash?: boolean | undefined;
              }
          >
        | undefined;
      gitRepo?:
        | (
            | {
                namespace: string;
                projectId: number;
                type: "gitlab";
                url: string;
                path: string;
                defaultBranch: string;
                name: string;
                private: boolean;
                ownerType: "team" | "user";
              }
            | {
                org: string;
                repo: string;
                repoId: number;
                type: "github";
                repoOwnerId: number;
                path: string;
                defaultBranch: string;
                name: string;
                private: boolean;
                ownerType: "team" | "user";
              }
            | {
                owner: string;
                repoUuid: string;
                slug: string;
                type: "bitbucket";
                workspaceUuid: string;
                path: string;
                defaultBranch: string;
                name: string;
                private: boolean;
                ownerType: "team" | "user";
              }
            | {
                org: string;
                repo: string;
                type: "vercel";
                path: string;
                defaultBranch: string;
                name: string;
                private: boolean;
                ownerType: "team" | "user";
              }
            | {
                owner: string;
                repo: string;
                repoId: string;
                type: "cursor-origin";
                path: string;
                defaultBranch: string;
                name: string;
                private: boolean;
                ownerType: "team" | "user";
              }
            | null
          )
        | undefined;
      flags?:
        | (
            | {
                definitions: Record<
                  string,
                  {
                    options?:
                      | Array<{ value: FlagJSONValue; label?: string | undefined }>
                      | undefined;
                    url?: string | undefined;
                    description?: string | undefined;
                  }
                >;
              }
            | Array<Record<string, never>>
          )
        | undefined;
      microfrontends?:
        | (
            | {
                isDefaultApp?: false | undefined;
                defaultAppProjectName: string;
                defaultRoute?: string | undefined;
                groupIds: Array<string>;
              }
            | {
                isDefaultApp: true;
                mfeConfigUploadState?: ("no_config" | "success" | "waiting_on_build") | undefined;
                defaultAppProjectName: string;
                defaultRoute?: string | undefined;
                groupIds: Array<string>;
              }
          )
        | undefined;
      platform?:
        | {
            source: { name: string };
            origin: { type: "id" | "url"; value: string };
            creator: { name: string; avatar?: string | undefined };
            meta?: Record<string, string> | undefined;
          }
        | undefined;
      config?:
        | {
            version?: number | undefined;
            functionType: "fluid" | "standard";
            functionMemoryType: "performance" | "performance_xl" | "standard" | "standard_legacy";
            functionTimeout: number | null;
            secureComputePrimaryRegion: string | null;
            secureComputeFallbackRegion: string | null;
            isUsingActiveCPU?: boolean | undefined;
            resourceConfig?:
              | {
                  buildQueue?:
                    | {
                        configuration?:
                          | ("SKIP_NAMESPACE_QUEUE" | "WAIT_FOR_NAMESPACE_QUEUE")
                          | undefined;
                      }
                    | undefined;
                  elasticConcurrency?:
                    | ("PROJECT_SETTING" | "SKIP_QUEUE" | "TEAM_SETTING")
                    | undefined;
                  buildMachine?:
                    | {
                        purchaseType?:
                          | ("basic" | "enhanced" | "standard" | "turbo" | "null" | null)
                          | undefined;
                      }
                    | undefined;
                }
              | undefined;
          }
        | undefined;
      checks?:
        | {
            "deployment-alias": {
              state: "failed" | "pending" | "succeeded";
              startedAt: number;
              completedAt?: number | undefined;
            };
          }
        | undefined;
      seatBlock?:
        | {
            blockCode: "COMMIT_AUTHOR_REQUIRED" | "TEAM_ACCESS_REQUIRED";
            userId?: string | undefined;
            isVerified?: boolean | undefined;
            gitUserId?: (string | number) | undefined;
            gitProvider?: ("bitbucket" | "github" | "gitlab") | undefined;
          }
        | undefined;
      attribution?:
        | {
            commitMeta?:
              | {
                  email?: string | undefined;
                  name?: string | undefined;
                  isVerified?: boolean | undefined;
                }
              | undefined;
            gitUser?:
              | {
                  id: string | number;
                  login: string;
                  type?: string | undefined;
                  provider?: string | undefined;
                }
              | undefined;
            vercelUser?:
              | { id: string; username: string; teamRoles?: Array<string> | undefined }
              | undefined;
          }
        | undefined;
    };

export type PostV13DeploymentsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: {
    forceNew?: ("0" | "1") | undefined;
    skipAutoDetectionConfirmation?: ("0" | "1") | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
  body: PostV13DeploymentsBody;
};

export type PostV13DeploymentsHandler = (
  input: PostV13DeploymentsInput,
) => Promise<PostV13DeploymentsResponse>;

export type PatchV12DeploymentsIdCancelResponse = {
  aliasAssignedAt?: (number | boolean | null) | undefined;
  alwaysRefuseToBuild?: boolean | undefined;
  build: { env: Array<string> };
  buildArtifactUrls?: Array<string> | undefined;
  builds?:
    | Array<{ use: string; src?: string | undefined; config?: Record<string, unknown> | undefined }>
    | undefined;
  env: Array<string>;
  resourceConfig?:
    | {
        buildMachine?:
          | {
              purchaseType?: ("basic" | "enhanced" | "standard" | "turbo") | undefined;
              defaultPurchaseType?: ("basic" | "enhanced" | "standard") | undefined;
              machineSelectionType?: ("elastic" | "fixed") | undefined;
              cores?: number | undefined;
              memory?: number | undefined;
            }
          | undefined;
      }
    | undefined;
  inspectorUrl: string | null;
  isInConcurrentBuildsQueue: boolean;
  isInSystemBuildsQueue: boolean;
  projectSettings: {
    nodeVersion?:
      | ("10.x" | "12.x" | "14.x" | "16.x" | "18.x" | "20.x" | "22.x" | "24.x" | "8.10.x")
      | undefined;
    buildCommand?: (string | null) | undefined;
    devCommand?: (string | null) | undefined;
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
    commandForIgnoringBuildStep?: (string | null) | undefined;
    installCommand?: (string | null) | undefined;
    outputDirectory?: (string | null) | undefined;
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
    webAnalytics?:
      | {
          id: string;
          disabledAt?: number | undefined;
          canceledAt?: number | undefined;
          enabledAt?: number | undefined;
          hasData?: true | undefined;
        }
      | undefined;
  };
  integrations?:
    | {
        status: "error" | "pending" | "ready" | "skipped" | "timeout";
        startedAt: number;
        claimedAt?: number | undefined;
        completedAt?: number | undefined;
        skippedAt?: number | undefined;
        skippedBy?: string | undefined;
      }
    | undefined;
  images?:
    | {
        sizes?: Array<number> | undefined;
        qualities?: Array<number> | undefined;
        domains?: Array<string> | undefined;
        remotePatterns?:
          | Array<{
              protocol?: ("http" | "https") | undefined;
              hostname: string;
              port?: string | undefined;
              pathname?: string | undefined;
              search?: string | undefined;
            }>
          | undefined;
        localPatterns?:
          | Array<{ pathname?: string | undefined; search?: string | undefined }>
          | undefined;
        minimumCacheTTL?: number | undefined;
        formats?: Array<"image/avif" | "image/webp"> | undefined;
        dangerouslyAllowSVG?: boolean | undefined;
        contentSecurityPolicy?: string | undefined;
        contentDispositionType?: ("attachment" | "inline") | undefined;
      }
    | undefined;
  alias?: Array<string> | undefined;
  aliasAssigned: boolean;
  bootedAt: number;
  buildingAt: number;
  buildContainerFinishedAt?: number | undefined;
  buildSkipped: boolean;
  creator: {
    uid: string;
    type?: ("app" | "integration" | "system" | "user") | undefined;
    username?: string | undefined;
    avatar?: string | undefined;
  };
  initReadyAt?: number | undefined;
  isFirstBranchDeployment?: boolean | undefined;
  lambdas?:
    | Array<{
        id: string;
        readyState?: ("BUILDING" | "ERROR" | "INITIALIZING" | "READY") | undefined;
        createdAt?: number | undefined;
        entrypoint?: (string | null) | undefined;
        readyStateAt?: number | undefined;
        output: Array<{ path: string; functionName: string }>;
      }>
    | undefined;
  public: boolean;
  ready?: number | undefined;
  status: "BLOCKED" | "BUILDING" | "CANCELED" | "ERROR" | "INITIALIZING" | "QUEUED" | "READY";
  team?: { id: string; name: string; slug: string; avatar?: string | undefined } | undefined;
  userAliases?: Array<string> | undefined;
  previewCommentsEnabled?: boolean | undefined;
  ttyBuildLogs?: boolean | undefined;
  customEnvironment?:
    | (
        | {
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
          }
        | { id: string }
      )
    | undefined;
  oomReport?: "out-of-memory" | undefined;
  readyStateReason?: string | undefined;
  id: string;
  target?: ("production" | "staging" | "null" | null) | undefined;
  readyState: "BLOCKED" | "BUILDING" | "CANCELED" | "ERROR" | "INITIALIZING" | "QUEUED" | "READY";
  aliasError?: ({ code: string; message: string } | null) | undefined;
  aliasWarning?:
    | ({
        code: string;
        message: string;
        link?: string | undefined;
        action?: string | undefined;
      } | null)
    | undefined;
  errorCode?: string | undefined;
  errorMessage?: (string | null) | undefined;
  createdAt: number;
  name: string;
  type: "LAMBDAS";
  aliasFinal?: (string | null) | undefined;
  autoAssignCustomDomains?: boolean | undefined;
  automaticAliases?: Array<string> | undefined;
  buildErrorAt?: number | undefined;
  checksState?: ("completed" | "registered" | "running") | undefined;
  checksConclusion?: ("canceled" | "failed" | "skipped" | "succeeded") | undefined;
  deletedAt?: (number | null) | undefined;
  defaultRoute?: string | undefined;
  canceledAt?: number | undefined;
  errorLink?: string | undefined;
  errorStep?: string | undefined;
  passiveRegions?: Array<string> | undefined;
  gitSource?:
    | (
        | {
            type: "github";
            repoId: string | number;
            ref?: (string | null) | undefined;
            sha?: string | undefined;
            prId?: (number | null) | undefined;
          }
        | {
            type: "github";
            org: string;
            repo: string;
            ref?: (string | null) | undefined;
            sha?: string | undefined;
            prId?: (number | null) | undefined;
          }
        | {
            type: "github-custom-host";
            host: string;
            repoId: string | number;
            ref?: (string | null) | undefined;
            sha?: string | undefined;
            prId?: (number | null) | undefined;
          }
        | {
            type: "github-custom-host";
            host: string;
            org: string;
            repo: string;
            ref?: (string | null) | undefined;
            sha?: string | undefined;
            prId?: (number | null) | undefined;
          }
        | {
            type: "github-limited";
            repoId: string | number;
            ref?: (string | null) | undefined;
            sha?: string | undefined;
            prId?: (number | null) | undefined;
          }
        | {
            type: "github-limited";
            org: string;
            repo: string;
            ref?: (string | null) | undefined;
            sha?: string | undefined;
            prId?: (number | null) | undefined;
          }
        | {
            type: "gitlab";
            projectId: string | number;
            ref?: (string | null) | undefined;
            sha?: string | undefined;
            prId?: (number | null) | undefined;
          }
        | {
            type: "bitbucket";
            workspaceUuid?: string | undefined;
            repoUuid: string;
            ref?: (string | null) | undefined;
            sha?: string | undefined;
            prId?: (number | null) | undefined;
          }
        | {
            type: "bitbucket";
            owner: string;
            slug: string;
            ref?: (string | null) | undefined;
            sha?: string | undefined;
            prId?: (number | null) | undefined;
          }
        | {
            type: "vercel";
            org?: string | undefined;
            repo?: string | undefined;
            sha: string;
            repoPushedAt?: number | undefined;
            ref?: (string | null) | undefined;
            prId?: (number | null) | undefined;
          }
        | {
            type: "cursor-origin";
            repoId: string;
            owner?: string | undefined;
            repo?: string | undefined;
            ref?: (string | null) | undefined;
            sha?: string | undefined;
            prId?: (number | null) | undefined;
          }
        | { type: "custom"; ref: string; sha: string; gitUrl: string }
        | {
            type: "github";
            ref: string;
            sha: string;
            repoId: number;
            org?: string | undefined;
            repo?: string | undefined;
          }
        | {
            type: "github-custom-host";
            host: string;
            ref: string;
            sha: string;
            repoId: number;
            org?: string | undefined;
            repo?: string | undefined;
          }
        | {
            type: "github-limited";
            ref: string;
            sha: string;
            repoId: number;
            org?: string | undefined;
            repo?: string | undefined;
          }
        | { type: "gitlab"; ref: string; sha: string; projectId: number }
        | {
            type: "bitbucket";
            ref: string;
            sha: string;
            owner?: string | undefined;
            slug?: string | undefined;
            workspaceUuid: string;
            repoUuid: string;
          }
        | {
            type: "vercel";
            ref: string;
            sha: string;
            org: string;
            repo: string;
            repoPushedAt?: number | undefined;
          }
        | {
            type: "cursor-origin";
            ref: string;
            sha: string;
            repoId: string;
            owner: string;
            repo: string;
          }
      )
    | undefined;
  manualProvisioning?:
    | { state: "COMPLETE" | "PENDING" | "TIMEOUT"; completedAt?: number | undefined }
    | undefined;
  meta: Record<string, string>;
  originCacheRegion?: string | undefined;
  nodeVersion?:
    | ("10.x" | "12.x" | "14.x" | "16.x" | "18.x" | "20.x" | "22.x" | "24.x" | "8.10.x")
    | undefined;
  project?: { id: string; name: string; framework?: (string | null) | undefined } | undefined;
  prebuilt?: boolean | undefined;
  readySubstate?: ("PROMOTED" | "ROLLING" | "STAGED") | undefined;
  regions: Array<string>;
  softDeletedByRetention?: boolean | undefined;
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
  undeletedAt?: number | undefined;
  url: string;
  userConfiguredDeploymentId?: string | undefined;
  version: number;
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
  projectId: string;
  plan: "enterprise" | "hobby" | "pro";
  connectBuildsEnabled?: boolean | undefined;
  connectConfigurationId?: string | undefined;
  createdIn: string;
  crons?: Array<{ schedule: string; path: string }> | undefined;
  atproto?:
    | (
        | { enabled: false }
        | {
            enabled: true;
            subscription: {
              collections: Array<string>;
              dids?: Array<string> | undefined;
              kinds?: Array<"account" | "commit" | "identity" | "sync"> | undefined;
              path: string;
            };
          }
      )
    | undefined;
  functions?:
    | (Record<
        string,
        {
          architecture?: ("arm64" | "x86_64") | undefined;
          memory?: number | undefined;
          maxDuration?: (number | "max") | undefined;
          maxConcurrency?: number | undefined;
          regions?: Array<string> | undefined;
          functionFailoverRegions?: Array<string> | undefined;
          runtime?: string | undefined;
          includeFiles?: string | undefined;
          excludeFiles?: string | undefined;
          experimentalTriggers?:
            | Array<
                | {
                    type: "queue/v1beta";
                    consumer: string;
                    topic: string;
                    maxDeliveries?: number | undefined;
                    retryAfterSeconds?: number | undefined;
                    initialDelaySeconds?: number | undefined;
                    maxConcurrency?: number | undefined;
                  }
                | {
                    type: "queue/v2beta";
                    topic: string;
                    maxDeliveries?: number | undefined;
                    retryAfterSeconds?: number | undefined;
                    initialDelaySeconds?: number | undefined;
                    maxConcurrency?: number | undefined;
                  }
                | { type: "schedule/v1beta" }
              >
            | undefined;
          supportsCancellation?: boolean | undefined;
        }
      > | null)
    | undefined;
  isInstantStatic?: boolean | undefined;
  monorepoManager?: (string | null) | undefined;
  ownerId: string;
  passiveConnectConfigurationId?: string | undefined;
  routes: Array<
    | {
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
      }
    | {
        handle: "error" | "filesystem" | "hit" | "miss" | "resource" | "rewrite";
        src?: string | undefined;
        dest?: string | undefined;
        status?: number | undefined;
      }
    | { src: string; continue: boolean; middleware: number }
  > | null;
  services?:
    | Array<
        | {
            schema: "experimentalServices";
            name: string;
            type: "cron" | "job" | "web" | "worker";
            trigger?: ("queue" | "schedule" | "workflow") | undefined;
            group?: string | undefined;
            workspace: string;
            entrypoint?: string | undefined;
            framework?: string | undefined;
            builder: {
              use: string;
              src?: string | undefined;
              config?:
                | {
                    bunVersion?: string | undefined;
                    maxLambdaSize?: string | undefined;
                    includeFiles?: (string | Array<string>) | undefined;
                    excludeFiles?: (string | Array<string>) | undefined;
                    bundle?: boolean | undefined;
                    ldsflags?: string | undefined;
                    helpers?: boolean | undefined;
                    rust?: string | undefined;
                    debug?: boolean | undefined;
                    zeroConfig?: boolean | undefined;
                    import?: Record<string, string> | undefined;
                    functions?:
                      | Record<
                          string,
                          {
                            architecture?: ("arm64" | "x86_64") | undefined;
                            memory?: number | undefined;
                            maxDuration?: (number | "max") | undefined;
                            maxConcurrency?: number | undefined;
                            regions?: Array<string> | undefined;
                            functionFailoverRegions?: Array<string> | undefined;
                            runtime?: string | undefined;
                            includeFiles?: string | undefined;
                            excludeFiles?: string | undefined;
                            experimentalTriggers?:
                              | Array<
                                  | {
                                      type: "queue/v1beta";
                                      consumer: string;
                                      topic: string;
                                      maxDeliveries?: number | undefined;
                                      retryAfterSeconds?: number | undefined;
                                      initialDelaySeconds?: number | undefined;
                                      maxConcurrency?: number | undefined;
                                    }
                                  | {
                                      type: "queue/v2beta";
                                      topic: string;
                                      maxDeliveries?: number | undefined;
                                      retryAfterSeconds?: number | undefined;
                                      initialDelaySeconds?: number | undefined;
                                      maxConcurrency?: number | undefined;
                                    }
                                  | { type: "schedule/v1beta" }
                                >
                              | undefined;
                            supportsCancellation?: boolean | undefined;
                          }
                        >
                      | undefined;
                    projectSettings?:
                      | {
                          framework?: (string | null) | undefined;
                          devCommand?: (string | null) | undefined;
                          installCommand?: (string | null) | undefined;
                          buildCommand?: (string | null) | undefined;
                          outputDirectory?: (string | null) | undefined;
                          rootDirectory?: (string | null) | undefined;
                          nodeVersion?: string | undefined;
                          monorepoManager?: (string | null) | undefined;
                          createdAt?: number | undefined;
                          autoExposeSystemEnvs?: boolean | undefined;
                          sourceFilesOutsideRootDirectory?: boolean | undefined;
                          directoryListing?: boolean | undefined;
                          gitForkProtection?: boolean | undefined;
                          commandForIgnoringBuildStep?: (string | null) | undefined;
                        }
                      | undefined;
                    outputDirectory?: string | undefined;
                    installCommand?: string | undefined;
                    buildCommand?: string | undefined;
                    devCommand?: string | undefined;
                    framework?: (string | null) | undefined;
                    nodeVersion?: string | undefined;
                    middleware?: boolean | undefined;
                    middlewareRuntime?: "nodejs" | undefined;
                    middlewareMatcher?: (string | Array<string>) | undefined;
                    serviceName?: string | undefined;
                  }
                | undefined;
            };
            runtime?: string | undefined;
            buildCommand?: string | undefined;
            installCommand?: string | undefined;
            preDeployCommand?: string | undefined;
            routePrefix?: string | undefined;
            routePrefixSource?: ("configured" | "generated") | undefined;
            subdomain?: string | undefined;
            schedule?: (string | Array<string>) | undefined;
            handlerFunction?: string | undefined;
            topics?:
              | (
                  | Array<string>
                  | Array<{
                      topic: string;
                      retryAfterSeconds?: number | undefined;
                      initialDelaySeconds?: number | undefined;
                    }>
                )
              | undefined;
            env?: Record<string, { type: "service-ref"; service: string }> | undefined;
          }
        | {
            schema: "experimentalServicesV2";
            name: string;
            root: string;
            framework?: string | undefined;
            runtime?: string | undefined;
            entrypoint?: string | undefined;
            command?: Array<string> | undefined;
            builder: {
              use: string;
              src?: string | undefined;
              config?:
                | {
                    bunVersion?: string | undefined;
                    maxLambdaSize?: string | undefined;
                    includeFiles?: (string | Array<string>) | undefined;
                    excludeFiles?: (string | Array<string>) | undefined;
                    bundle?: boolean | undefined;
                    ldsflags?: string | undefined;
                    helpers?: boolean | undefined;
                    rust?: string | undefined;
                    debug?: boolean | undefined;
                    zeroConfig?: boolean | undefined;
                    import?: Record<string, string> | undefined;
                    functions?:
                      | Record<
                          string,
                          {
                            architecture?: ("arm64" | "x86_64") | undefined;
                            memory?: number | undefined;
                            maxDuration?: (number | "max") | undefined;
                            maxConcurrency?: number | undefined;
                            regions?: Array<string> | undefined;
                            functionFailoverRegions?: Array<string> | undefined;
                            runtime?: string | undefined;
                            includeFiles?: string | undefined;
                            excludeFiles?: string | undefined;
                            experimentalTriggers?:
                              | Array<
                                  | {
                                      type: "queue/v1beta";
                                      consumer: string;
                                      topic: string;
                                      maxDeliveries?: number | undefined;
                                      retryAfterSeconds?: number | undefined;
                                      initialDelaySeconds?: number | undefined;
                                      maxConcurrency?: number | undefined;
                                    }
                                  | {
                                      type: "queue/v2beta";
                                      topic: string;
                                      maxDeliveries?: number | undefined;
                                      retryAfterSeconds?: number | undefined;
                                      initialDelaySeconds?: number | undefined;
                                      maxConcurrency?: number | undefined;
                                    }
                                  | { type: "schedule/v1beta" }
                                >
                              | undefined;
                            supportsCancellation?: boolean | undefined;
                          }
                        >
                      | undefined;
                    projectSettings?:
                      | {
                          framework?: (string | null) | undefined;
                          devCommand?: (string | null) | undefined;
                          installCommand?: (string | null) | undefined;
                          buildCommand?: (string | null) | undefined;
                          outputDirectory?: (string | null) | undefined;
                          rootDirectory?: (string | null) | undefined;
                          nodeVersion?: string | undefined;
                          monorepoManager?: (string | null) | undefined;
                          createdAt?: number | undefined;
                          autoExposeSystemEnvs?: boolean | undefined;
                          sourceFilesOutsideRootDirectory?: boolean | undefined;
                          directoryListing?: boolean | undefined;
                          gitForkProtection?: boolean | undefined;
                          commandForIgnoringBuildStep?: (string | null) | undefined;
                        }
                      | undefined;
                    outputDirectory?: string | undefined;
                    installCommand?: string | undefined;
                    buildCommand?: string | undefined;
                    devCommand?: string | undefined;
                    framework?: (string | null) | undefined;
                    nodeVersion?: string | undefined;
                    middleware?: boolean | undefined;
                    middlewareRuntime?: "nodejs" | undefined;
                    middlewareMatcher?: (string | Array<string>) | undefined;
                    serviceName?: string | undefined;
                  }
                | undefined;
            };
            installCommand?: string | undefined;
            buildCommand?: string | undefined;
            devCommand?: string | undefined;
            ignoreCommand?: string | undefined;
            outputDirectory?: string | undefined;
            bindings?:
              | Array<{ type?: "service" | undefined; service: string; format: "url"; env: string }>
              | undefined;
            functions?:
              | Record<
                  string,
                  {
                    architecture?: ("arm64" | "x86_64") | undefined;
                    memory?: number | undefined;
                    maxDuration?: (number | "max") | undefined;
                    maxConcurrency?: number | undefined;
                    regions?: Array<string> | undefined;
                    functionFailoverRegions?: Array<string> | undefined;
                    runtime?: string | undefined;
                    includeFiles?: string | undefined;
                    excludeFiles?: string | undefined;
                    experimentalTriggers?:
                      | Array<
                          | {
                              type: "queue/v1beta";
                              consumer: string;
                              topic: string;
                              maxDeliveries?: number | undefined;
                              retryAfterSeconds?: number | undefined;
                              initialDelaySeconds?: number | undefined;
                              maxConcurrency?: number | undefined;
                            }
                          | {
                              type: "queue/v2beta";
                              topic: string;
                              maxDeliveries?: number | undefined;
                              retryAfterSeconds?: number | undefined;
                              initialDelaySeconds?: number | undefined;
                              maxConcurrency?: number | undefined;
                            }
                          | { type: "schedule/v1beta" }
                        >
                      | undefined;
                    supportsCancellation?: boolean | undefined;
                  }
                >
              | undefined;
            headers?:
              | Array<{
                  source: string;
                  headers: Array<{ key: string; value: string }>;
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
                }>
              | undefined;
            redirects?:
              | Array<{
                  source: string;
                  destination: string;
                  permanent?: boolean | undefined;
                  statusCode?: number | undefined;
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
                  env?: Array<string> | undefined;
                }>
              | undefined;
            rewrites?:
              | Array<{
                  source: string;
                  destination:
                    | string
                    | { type?: "service" | undefined; service: string; path?: string | undefined };
                  transforms?:
                    | Array<{
                        type: "request.path";
                        op: "set";
                        args: string;
                        env?: Array<string> | undefined;
                      }>
                    | undefined;
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
                  statusCode?: number | undefined;
                  env?: Array<string> | undefined;
                  respectOriginCacheControl?: boolean | undefined;
                }>
              | undefined;
            routes?:
              | Array<
                  | {
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
                            | {
                                type: "request.path";
                                op: "set";
                                args: string;
                                env?: Array<string> | undefined;
                              }
                          >
                        | undefined;
                      env?: Array<string> | undefined;
                      locale?:
                        | {
                            redirect?: Record<string, string> | undefined;
                            cookie?: string | undefined;
                          }
                        | undefined;
                      source?: string | undefined;
                      destination?:
                        | (
                            | string
                            | {
                                type?: "service" | undefined;
                                service: string;
                                path?: string | undefined;
                              }
                          )
                        | undefined;
                      statusCode?: number | undefined;
                      middlewarePath?: string | undefined;
                      middlewareRawSrc?: Array<string> | undefined;
                      middleware?: number | undefined;
                      respectOriginCacheControl?: boolean | undefined;
                    }
                  | {
                      handle: "error" | "filesystem" | "hit" | "miss" | "resource" | "rewrite";
                      src?: string | undefined;
                      dest?: string | undefined;
                      status?: number | undefined;
                    }
                >
              | undefined;
            cleanUrls?: boolean | undefined;
            trailingSlash?: boolean | undefined;
          }
      >
    | undefined;
  gitRepo?:
    | (
        | {
            namespace: string;
            projectId: number;
            type: "gitlab";
            url: string;
            path: string;
            defaultBranch: string;
            name: string;
            private: boolean;
            ownerType: "team" | "user";
          }
        | {
            org: string;
            repo: string;
            repoId: number;
            type: "github";
            repoOwnerId: number;
            path: string;
            defaultBranch: string;
            name: string;
            private: boolean;
            ownerType: "team" | "user";
          }
        | {
            owner: string;
            repoUuid: string;
            slug: string;
            type: "bitbucket";
            workspaceUuid: string;
            path: string;
            defaultBranch: string;
            name: string;
            private: boolean;
            ownerType: "team" | "user";
          }
        | {
            org: string;
            repo: string;
            type: "vercel";
            path: string;
            defaultBranch: string;
            name: string;
            private: boolean;
            ownerType: "team" | "user";
          }
        | {
            owner: string;
            repo: string;
            repoId: string;
            type: "cursor-origin";
            path: string;
            defaultBranch: string;
            name: string;
            private: boolean;
            ownerType: "team" | "user";
          }
        | null
      )
    | undefined;
  flags?:
    | (
        | {
            definitions: Record<
              string,
              {
                options?: Array<{ value: FlagJSONValue; label?: string | undefined }> | undefined;
                url?: string | undefined;
                description?: string | undefined;
              }
            >;
          }
        | Array<Record<string, never>>
      )
    | undefined;
  microfrontends?:
    | (
        | {
            isDefaultApp?: false | undefined;
            defaultAppProjectName: string;
            defaultRoute?: string | undefined;
            groupIds: Array<string>;
          }
        | {
            isDefaultApp: true;
            mfeConfigUploadState?: ("no_config" | "success" | "waiting_on_build") | undefined;
            defaultAppProjectName: string;
            defaultRoute?: string | undefined;
            groupIds: Array<string>;
          }
      )
    | undefined;
  platform?:
    | {
        source: { name: string };
        origin: { type: "id" | "url"; value: string };
        creator: { name: string; avatar?: string | undefined };
        meta?: Record<string, string> | undefined;
      }
    | undefined;
  config?:
    | {
        version?: number | undefined;
        functionType: "fluid" | "standard";
        functionMemoryType: "performance" | "performance_xl" | "standard" | "standard_legacy";
        functionTimeout: number | null;
        secureComputePrimaryRegion: string | null;
        secureComputeFallbackRegion: string | null;
        isUsingActiveCPU?: boolean | undefined;
        resourceConfig?:
          | {
              buildQueue?:
                | {
                    configuration?:
                      | ("SKIP_NAMESPACE_QUEUE" | "WAIT_FOR_NAMESPACE_QUEUE")
                      | undefined;
                  }
                | undefined;
              elasticConcurrency?: ("PROJECT_SETTING" | "SKIP_QUEUE" | "TEAM_SETTING") | undefined;
              buildMachine?:
                | {
                    purchaseType?:
                      | ("basic" | "enhanced" | "standard" | "turbo" | "null" | null)
                      | undefined;
                  }
                | undefined;
            }
          | undefined;
      }
    | undefined;
  checks?:
    | {
        "deployment-alias": {
          state: "failed" | "pending" | "succeeded";
          startedAt: number;
          completedAt?: number | undefined;
        };
      }
    | undefined;
  seatBlock?:
    | {
        blockCode: "COMMIT_AUTHOR_REQUIRED" | "TEAM_ACCESS_REQUIRED";
        userId?: string | undefined;
        isVerified?: boolean | undefined;
        gitUserId?: (string | number) | undefined;
        gitProvider?: ("bitbucket" | "github" | "gitlab") | undefined;
      }
    | undefined;
  attribution?:
    | {
        commitMeta?:
          | {
              email?: string | undefined;
              name?: string | undefined;
              isVerified?: boolean | undefined;
            }
          | undefined;
        gitUser?:
          | {
              id: string | number;
              login: string;
              type?: string | undefined;
              provider?: string | undefined;
            }
          | undefined;
        vercelUser?:
          | { id: string; username: string; teamRoles?: Array<string> | undefined }
          | undefined;
      }
    | undefined;
};

export type PatchV12DeploymentsIdCancelInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { id: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type PatchV12DeploymentsIdCancelHandler = (
  input: PatchV12DeploymentsIdCancelInput,
) => Promise<PatchV12DeploymentsIdCancelResponse>;

export type GetV1DeploymentsDeploymentIdFeatureFlagsResponse = {
  flags: Array<Record<string, never>>;
  status: {
    deploymentId: string;
    projectId: string;
    responseStatus: number;
    flagCount: number;
    createdAt: number;
  } | null;
};

export type GetV1DeploymentsDeploymentIdFeatureFlagsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { deploymentId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV1DeploymentsDeploymentIdFeatureFlagsHandler = (
  input: GetV1DeploymentsDeploymentIdFeatureFlagsInput,
) => Promise<GetV1DeploymentsDeploymentIdFeatureFlagsResponse>;

export type GetV2DeploymentsIdAliasesResponse = {
  aliases: Array<{
    uid: string;
    alias: string;
    created: string;
    redirect?: (string | null) | undefined;
    protectionBypass?:
      | Record<
          string,
          | {
              createdAt: number;
              createdBy: string;
              scope: "shareable-link";
              expires?: number | undefined;
            }
          | {
              createdAt: number;
              lastUpdatedAt: number;
              lastUpdatedBy: string;
              access: "granted" | "requested";
              scope: "user";
            }
          | { createdAt: number; createdBy: string; scope: "alias-protection-override" }
          | {
              createdAt: number;
              lastUpdatedAt: number;
              lastUpdatedBy: string;
              scope: "email_invite";
            }
        >
      | undefined;
  }>;
};

export type GetV2DeploymentsIdAliasesInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { id: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV2DeploymentsIdAliasesHandler = (
  input: GetV2DeploymentsIdAliasesInput,
) => Promise<GetV2DeploymentsIdAliasesResponse>;

export const postV2DeploymentsIdAliasesBody = z.object({
  alias: z.string().optional(),
  redirect: z.string().nullable().optional(),
});

export type PostV2DeploymentsIdAliasesBody = {
  alias?: string | undefined;
  redirect?: (string | null) | undefined;
};

export type PostV2DeploymentsIdAliasesResponse = {
  uid: string;
  alias: string;
  created: string;
  oldDeploymentId?: (string | null) | undefined;
};

export type PostV2DeploymentsIdAliasesInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { id: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV2DeploymentsIdAliasesBody;
};

export type PostV2DeploymentsIdAliasesHandler = (
  input: PostV2DeploymentsIdAliasesInput,
) => Promise<PostV2DeploymentsIdAliasesResponse>;

export type GetV6DeploymentsIdFilesResponse = Array<FileTree>;

export type GetV6DeploymentsIdFilesInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { id: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV6DeploymentsIdFilesHandler = (
  input: GetV6DeploymentsIdFilesInput,
) => Promise<GetV6DeploymentsIdFilesResponse>;

export type GetV8DeploymentsIdFilesFileIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { id: string; fileId: string };
  query: { path?: string | undefined; teamId?: string | undefined; slug?: string | undefined };
};

export type GetV8DeploymentsIdFilesFileIdHandler = (
  input: GetV8DeploymentsIdFilesFileIdInput,
) => Promise<void>;

export type GetV7DeploymentsResponse = {
  pagination: Pagination;
  deployments: Array<{
    createdAt: number;
    readyState:
      | "BLOCKED"
      | "BUILDING"
      | "CANCELED"
      | "DELETED"
      | "ERROR"
      | "INITIALIZING"
      | "QUEUED"
      | "READY";
    uid: string;
    name: string;
    projectId: string;
    url: string;
    created: number;
    defaultRoute?: string | undefined;
    deleted?: number | undefined;
    undeleted?: number | undefined;
    softDeletedByRetention?: boolean | undefined;
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
    state?:
      | (
          | "BLOCKED"
          | "BUILDING"
          | "CANCELED"
          | "DELETED"
          | "ERROR"
          | "INITIALIZING"
          | "QUEUED"
          | "READY"
        )
      | undefined;
    type: "LAMBDAS";
    creator: {
      uid: string;
      type?: ("app" | "integration" | "system" | "user") | undefined;
      email?: string | undefined;
      username?: string | undefined;
      githubLogin?: string | undefined;
      gitlabLogin?: string | undefined;
    };
    meta?: Record<string, string> | undefined;
    target?: ("production" | "staging" | "null" | null) | undefined;
    aliasError?: ({ code: string; message: string } | null) | undefined;
    aliasAssigned?: (number | boolean | null) | undefined;
    buildingAt?: number | undefined;
    ready?: number | undefined;
    readySubstate?: ("PROMOTED" | "ROLLING" | "STAGED") | undefined;
    checksState?: ("completed" | "registered" | "running") | undefined;
    checksConclusion?: ("canceled" | "failed" | "skipped" | "succeeded") | undefined;
    checks?:
      | {
          "deployment-alias": {
            state: "failed" | "pending" | "succeeded";
            startedAt: number;
            completedAt?: number | undefined;
          };
        }
      | undefined;
    inspectorUrl: string | null;
    errorCode?: string | undefined;
    errorMessage?: (string | null) | undefined;
    oomReport?: "out-of-memory" | undefined;
    isRollbackCandidate?: (boolean | null) | undefined;
    prebuilt?: boolean | undefined;
    manualProvisioning?:
      | { state: "COMPLETE" | "PENDING" | "TIMEOUT"; completedAt?: number | undefined }
      | undefined;
    projectSettings?:
      | {
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
          customerSupportCodeVisibility?: boolean | undefined;
          gitLFS?: boolean | undefined;
          devCommand?: (string | null) | undefined;
          installCommand?: (string | null) | undefined;
          buildCommand?: (string | null) | undefined;
          nodeVersion?:
            | ("10.x" | "12.x" | "14.x" | "16.x" | "18.x" | "20.x" | "22.x" | "24.x" | "8.10.x")
            | undefined;
          outputDirectory?: (string | null) | undefined;
          rootDirectory?: (string | null) | undefined;
          sourceFilesOutsideRootDirectory?: boolean | undefined;
          commandForIgnoringBuildStep?: (string | null) | undefined;
          createdAt?: number | undefined;
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
          webAnalytics?:
            | {
                id: string;
                disabledAt?: number | undefined;
                canceledAt?: number | undefined;
                enabledAt?: number | undefined;
                hasData?: true | undefined;
              }
            | undefined;
          skipGitConnectDuringLink?: boolean | undefined;
          gitComments?: { onPullRequest: boolean; onCommit: boolean } | undefined;
        }
      | undefined;
    connectBuildsEnabled?: boolean | undefined;
    connectConfigurationId?: string | undefined;
    passiveConnectConfigurationId?: string | undefined;
    expiration?: number | undefined;
    proposedExpiration?: number | undefined;
    platform?:
      | {
          source: { name: string };
          origin: { type: "id" | "url"; value: string };
          creator: { name: string; avatar?: string | undefined };
          meta?: Record<string, string> | undefined;
        }
      | undefined;
    customEnvironment?: { id: string; slug?: string | undefined } | undefined;
    seatBlock?:
      | {
          blockCode: "COMMIT_AUTHOR_REQUIRED" | "TEAM_ACCESS_REQUIRED";
          userId?: string | undefined;
          isVerified?: boolean | undefined;
          gitUserId?: (string | number) | undefined;
          gitProvider?: ("bitbucket" | "github" | "gitlab") | undefined;
        }
      | undefined;
    attribution?:
      | {
          commitMeta?:
            | {
                email?: string | undefined;
                name?: string | undefined;
                isVerified?: boolean | undefined;
              }
            | undefined;
          gitUser?:
            | {
                id: string | number;
                login: string;
                type?: string | undefined;
                provider?: string | undefined;
              }
            | undefined;
          vercelUser?:
            | { id: string; username: string; teamRoles?: Array<string> | undefined }
            | undefined;
        }
      | undefined;
  }>;
};

export type GetV7DeploymentsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: {
    app?: string | undefined;
    from?: number | undefined;
    limit?: number | undefined;
    projectId?: string | undefined;
    projectIds?: Array<string> | undefined;
    target?: string | undefined;
    to?: number | undefined;
    users?: string | undefined;
    since?: number | undefined;
    until?: number | undefined;
    state?: string | undefined;
    rollbackCandidate?: boolean | undefined;
    branch?: string | undefined;
    sha?: string | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV7DeploymentsHandler = (
  input: GetV7DeploymentsInput,
) => Promise<GetV7DeploymentsResponse>;

export type DeleteV13DeploymentsIdResponse = { uid: string; state: "DELETED" };

export type DeleteV13DeploymentsIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { id: string };
  query: { url?: string | undefined; teamId?: string | undefined; slug?: string | undefined };
};

export type DeleteV13DeploymentsIdHandler = (
  input: DeleteV13DeploymentsIdInput,
) => Promise<DeleteV13DeploymentsIdResponse>;
