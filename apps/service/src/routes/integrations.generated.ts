import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import {
  getV1IntegrationsGitNamespaces,
  getV1IntegrationsSearchRepo,
  getV1IntegrationsIntegrationIntegrationIdOrSlugProductsProductIdOrSlugPlans,
  postV1IntegrationsInstallationsIntegrationConfigurationIdResourcesResourceIdConnections,
  getV1IntegrationsConfigurations,
  getV1IntegrationsConfigurationId,
  deleteV1IntegrationsConfigurationId,
  getV1IntegrationsConfigurationIdProducts,
  postV1IntegrationsSsoToken,
  getV2IntegrationsLogDrains,
  postV2IntegrationsLogDrains,
  deleteV1IntegrationsLogDrainsId,
} from "./handlers/integrations";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.get(
  "/v1/integrations/git-namespaces",
  validate(
    "query",
    z.object({
      host: z.string().optional(),
      provider: z
        .enum(["github", "github-limited", "github-custom-host", "gitlab", "bitbucket"])
        .optional(),
      viewerMetadata: z
        .preprocess((v) => (v === "true" ? true : v === "false" ? false : v), z.boolean())
        .optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(
      await getV1IntegrationsGitNamespaces({ db, env: c.env, user: c.var.user, query }),
    );
  },
);
app.get(
  "/v1/integrations/search-repo",
  validate(
    "query",
    z.object({
      query: z.string().optional(),
      namespaceId: z.union([z.string(), z.coerce.number()]).nullable().optional(),
      provider: z
        .enum([
          "github",
          "github-limited",
          "github-custom-host",
          "gitlab",
          "bitbucket",
          "cursor-origin",
        ])
        .optional(),
      installationId: z.string().optional(),
      host: z.string().optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(await getV1IntegrationsSearchRepo({ db, env: c.env, user: c.var.user, query }));
  },
);
app.get(
  "/v1/integrations/integration/:integrationIdOrSlug/products/:productIdOrSlug/plans",
  validate("param", z.object({ integrationIdOrSlug: z.string(), productIdOrSlug: z.string() })),
  validate(
    "query",
    z.object({
      integrationConfigurationId: z.string().optional(),
      metadata: z.string().optional(),
      source: z
        .enum([
          "marketplace",
          "deploy-button",
          "external",
          "v0",
          "resource-claims",
          "cli",
          "oauth",
          "backoffice",
          "import-recommended-integrations",
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
      await getV1IntegrationsIntegrationIntegrationIdOrSlugProductsProductIdOrSlugPlans({
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
  "/v1/integrations/installations/:integrationConfigurationId/resources/:resourceId/connections",
  validate("param", z.object({ integrationConfigurationId: z.string(), resourceId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate(
    "json",
    postV1IntegrationsInstallationsIntegrationConfigurationIdResourcesResourceIdConnectionsBody,
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV1IntegrationsInstallationsIntegrationConfigurationIdResourcesResourceIdConnections(
        { db, env: c.env, user: c.var.user, params, query, body },
      ),
      201,
    );
  },
);
app.get(
  "/v1/integrations/configurations",
  validate(
    "query",
    z.object({
      view: z.enum(["account", "project"]),
      installationType: z.enum(["marketplace", "external", "provisioning"]).optional(),
      integrationIdOrSlug: z.string().optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(
      await getV1IntegrationsConfigurations({ db, env: c.env, user: c.var.user, query }),
    );
  },
);
app.get(
  "/v1/integrations/configuration/:id",
  validate("param", z.object({ id: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV1IntegrationsConfigurationId({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);
app.delete(
  "/v1/integrations/configuration/:id",
  validate("param", z.object({ id: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    await deleteV1IntegrationsConfigurationId({ db, env: c.env, user: c.var.user, params, query });
    return c.body(null, 204);
  },
);
app.get(
  "/v1/integrations/configuration/:id/products",
  validate("param", z.object({ id: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV1IntegrationsConfigurationIdProducts({
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
  "/v1/integrations/sso/token",
  validate("json", postV1IntegrationsSsoTokenBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const body = c.req.valid("json");
    return c.json(await postV1IntegrationsSsoToken({ db, env: c.env, user: c.var.user, body }));
  },
);
app.get(
  "/v2/integrations/log-drains",
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(await getV2IntegrationsLogDrains({ db, env: c.env, user: c.var.user, query }));
  },
);
app.post(
  "/v2/integrations/log-drains",
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV2IntegrationsLogDrainsBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV2IntegrationsLogDrains({ db, env: c.env, user: c.var.user, query, body }),
    );
  },
);
app.delete(
  "/v1/integrations/log-drains/:id",
  validate("param", z.object({ id: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    await deleteV1IntegrationsLogDrainsId({ db, env: c.env, user: c.var.user, params, query });
    return c.body(null, 204);
  },
);

export type GetV1IntegrationsGitNamespacesResponse = Array<{
  provider: string;
  slug: string;
  id: string | number;
  ownerType: string;
  name?: string | undefined;
  isAccessRestricted?: boolean | undefined;
  installationId?: number | undefined;
  requireReauth?: boolean | undefined;
  viewer?: { canCreateApp?: boolean | undefined; role?: (string | number) | undefined } | undefined;
}>;

export type GetV1IntegrationsGitNamespacesInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: {
    host?: string | undefined;
    provider?:
      | ("github" | "github-limited" | "github-custom-host" | "gitlab" | "bitbucket")
      | undefined;
    viewerMetadata?: boolean | undefined;
  };
};

export type GetV1IntegrationsGitNamespacesHandler = (
  input: GetV1IntegrationsGitNamespacesInput,
) => Promise<GetV1IntegrationsGitNamespacesResponse>;

export type GetV1IntegrationsSearchRepoResponse =
  | Record<string, never>
  | { error: { code: "installation_not_found"; message: string } }
  | {
      gitAccount: { provider: string; namespaceId: string | null };
      repos: Array<{
        id: string;
        provider: "cursor-origin";
        url: string;
        name: string;
        slug: string;
        namespace: string;
        ownerType: "team" | "user";
        owner: { id: string; name: string };
        private: boolean;
        defaultBranch: string;
        updatedAt: number;
      }>;
    }
  | {
      gitAccount: {
        provider:
          | "bitbucket"
          | "cursor-origin"
          | "github"
          | "github-custom-host"
          | "github-limited"
          | "gitlab"
          | "vercel";
        namespaceId: string | number | null;
      };
      repos: Array<{
        id: string | number;
        provider:
          | "bitbucket"
          | "cursor-origin"
          | "github"
          | "github-custom-host"
          | "github-limited"
          | "gitlab"
          | "vercel";
        url: string;
        name: string;
        slug: string;
        namespace: string;
        owner: { id: string | number; name: string };
        ownerType: "team" | "user";
        private: boolean;
        defaultBranch: string;
        updatedAt: number;
      }>;
    };

export type GetV1IntegrationsSearchRepoInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: {
    query?: string | undefined;
    namespaceId?: (string | number | null) | undefined;
    provider?:
      | (
          | "github"
          | "github-limited"
          | "github-custom-host"
          | "gitlab"
          | "bitbucket"
          | "cursor-origin"
        )
      | undefined;
    installationId?: string | undefined;
    host?: string | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV1IntegrationsSearchRepoHandler = (
  input: GetV1IntegrationsSearchRepoInput,
) => Promise<GetV1IntegrationsSearchRepoResponse>;

export type GetV1IntegrationsIntegrationIntegrationIdOrSlugProductsProductIdOrSlugPlansResponse = {
  plans: Array<{
    type: "prepayment" | "subscription";
    id: string;
    name: string;
    scope: "installation" | "resource";
    description: string;
    paymentMethodRequired: boolean;
    preauthorizationAmount?: number | undefined;
    initialCharge?: string | undefined;
    minimumAmount?: string | undefined;
    maximumAmount?: string | undefined;
    maximumAmountAutoPurchasePerPeriod?: string | undefined;
    cost?: string | undefined;
    details?: Array<{ label: string; value?: string | undefined }> | undefined;
    highlightedDetails?: Array<{ label: string; value?: string | undefined }> | undefined;
    quote?: Array<{ line: string; amount: string }> | undefined;
    effectiveDate?: string | undefined;
    disabled?: boolean | undefined;
  }>;
};

export type GetV1IntegrationsIntegrationIntegrationIdOrSlugProductsProductIdOrSlugPlansInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { integrationIdOrSlug: string; productIdOrSlug: string };
  query: {
    integrationConfigurationId?: string | undefined;
    metadata?: string | undefined;
    source?:
      | (
          | "marketplace"
          | "deploy-button"
          | "external"
          | "v0"
          | "resource-claims"
          | "cli"
          | "oauth"
          | "backoffice"
          | "import-recommended-integrations"
        )
      | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV1IntegrationsIntegrationIntegrationIdOrSlugProductsProductIdOrSlugPlansHandler = (
  input: GetV1IntegrationsIntegrationIntegrationIdOrSlugProductsProductIdOrSlugPlansInput,
) => Promise<GetV1IntegrationsIntegrationIntegrationIdOrSlugProductsProductIdOrSlugPlansResponse>;

export const postV1IntegrationsInstallationsIntegrationConfigurationIdResourcesResourceIdConnectionsBody =
  z.object({
    projectId: z.string(),
    envVarEnvironments: z.array(z.enum(["production", "preview", "development"])).optional(),
    makeEnvVarsSensitive: z.boolean().optional(),
  });

export type PostV1IntegrationsInstallationsIntegrationConfigurationIdResourcesResourceIdConnectionsBody =
  {
    projectId: string;
    envVarEnvironments?: Array<"production" | "preview" | "development"> | undefined;
    makeEnvVarsSensitive?: boolean | undefined;
  };

export type PostV1IntegrationsInstallationsIntegrationConfigurationIdResourcesResourceIdConnectionsInput =
  {
    db: Db;
    env: Env;
    user: AuthUser | null;
    params: { integrationConfigurationId: string; resourceId: string };
    query: { teamId?: string | undefined; slug?: string | undefined };
    body: PostV1IntegrationsInstallationsIntegrationConfigurationIdResourcesResourceIdConnectionsBody;
  };

export type PostV1IntegrationsInstallationsIntegrationConfigurationIdResourcesResourceIdConnectionsHandler =
  (
    input: PostV1IntegrationsInstallationsIntegrationConfigurationIdResourcesResourceIdConnectionsInput,
  ) => Promise<void>;

export type GetV1IntegrationsConfigurationsResponse =
  | Array<{
      completedAt?: number | undefined;
      createdAt?: number | undefined;
      id?: string | undefined;
      integrationId?: string | undefined;
      ownerId?: string | undefined;
      status?:
        | ("error" | "onboarding" | "pending" | "ready" | "resumed" | "suspended" | "uninstalled")
        | undefined;
      externalId?: string | undefined;
      projects?: Array<string> | undefined;
      source?:
        | (
            | "backoffice"
            | "cli"
            | "deploy-button"
            | "external"
            | "import-recommended-integrations"
            | "marketplace"
            | "oauth"
            | "resource-claims"
            | "v0"
          )
        | undefined;
      slug?: string | undefined;
      teamId?: (string | null) | undefined;
      type?: "integration-configuration" | undefined;
      updatedAt?: number | undefined;
      userId?: string | undefined;
      scopes?: Array<string> | undefined;
      disabledAt?: number | undefined;
      deletedAt?: (number | null) | undefined;
      deleteRequestedAt?: (number | null) | undefined;
      customerDeleteRequestedAt?: (number | null) | undefined;
      disabledReason?:
        | (
            | "account-plan-downgrade"
            | "disabled-by-admin"
            | "disabled-by-owner"
            | "feature-not-available"
            | "original-owner-left-the-team"
            | "original-owner-role-downgraded"
          )
        | undefined;
      installationType?: ("external" | "marketplace") | undefined;
    }>
  | Array<{
      integration: {
        name: string;
        icon: string;
        isLegacy: boolean;
        flags?: Array<string> | undefined;
        assignedBetaLabelAt?: number | undefined;
        tagIds?:
          | Array<
              | "tag_agents"
              | "tag_ai"
              | "tag_analytics"
              | "tag_authentication"
              | "tag_cms"
              | "tag_code_repository"
              | "tag_code_review"
              | "tag_code_security"
              | "tag_code_testing"
              | "tag_commerce"
              | "tag_databases"
              | "tag_dev_tools"
              | "tag_experimentation"
              | "tag_flags"
              | "tag_logging"
              | "tag_messaging"
              | "tag_monitoring"
              | "tag_observability"
              | "tag_payments"
              | "tag_performance"
              | "tag_productivity"
              | "tag_searching"
              | "tag_security"
              | "tag_support_agent"
              | "tag_testing"
              | "tag_video"
              | "tag_web_automation"
              | "tag_workflow"
            >
          | undefined;
      };
      completedAt?: number | undefined;
      createdAt: number;
      id: string;
      integrationId: string;
      ownerId: string;
      status?:
        | ("error" | "onboarding" | "pending" | "ready" | "resumed" | "suspended" | "uninstalled")
        | undefined;
      externalId?: string | undefined;
      projects?: Array<string> | undefined;
      source?:
        | (
            | "backoffice"
            | "cli"
            | "deploy-button"
            | "external"
            | "import-recommended-integrations"
            | "marketplace"
            | "oauth"
            | "resource-claims"
            | "v0"
          )
        | undefined;
      slug: string;
      teamId?: (string | null) | undefined;
      type: "integration-configuration";
      updatedAt: number;
      userId: string;
      scopes: Array<string>;
      disabledAt?: number | undefined;
      deletedAt?: (number | null) | undefined;
      deleteRequestedAt?: (number | null) | undefined;
      customerDeleteRequestedAt?: (number | null) | undefined;
      disabledReason?:
        | (
            | "account-plan-downgrade"
            | "disabled-by-admin"
            | "disabled-by-owner"
            | "feature-not-available"
            | "original-owner-left-the-team"
            | "original-owner-role-downgraded"
          )
        | undefined;
      installationType?: ("external" | "marketplace") | undefined;
    }>;

export type GetV1IntegrationsConfigurationsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: {
    view: "account" | "project";
    installationType?: ("marketplace" | "external" | "provisioning") | undefined;
    integrationIdOrSlug?: string | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV1IntegrationsConfigurationsHandler = (
  input: GetV1IntegrationsConfigurationsInput,
) => Promise<GetV1IntegrationsConfigurationsResponse>;

export type GetV1IntegrationsConfigurationIdResponse =
  | {
      projectSelection: "all" | "selected";
      notification: {
        level: "error" | "info" | "warn";
        title: string;
        message?: string | undefined;
        href?: string | undefined;
      };
      transferRequest:
        | {
            kind: "transfer-to-marketplace";
            metadata?: Record<string, unknown> | undefined;
            billingPlan?:
              | {
                  id: string;
                  type: "prepayment" | "subscription";
                  scope?: ("installation" | "resource") | undefined;
                  name: string;
                  description: string;
                  paymentMethodRequired?: boolean | undefined;
                  preauthorizationAmount?: number | undefined;
                }
              | undefined;
            requestId: string;
            transferId: string;
            requester: { name: string; email?: string | undefined };
            createdAt: number;
            expiresAt: number;
            discardedAt?: number | undefined;
            discardedBy?: string | undefined;
            approvedAt?: number | undefined;
            approvedBy?: string | undefined;
            authorizationId?: string | undefined;
          }
        | {
            kind: "transfer-from-marketplace";
            requestId: string;
            transferId: string;
            requester: { name: string; email?: string | undefined };
            createdAt: number;
            expiresAt: number;
            discardedAt?: number | undefined;
            discardedBy?: string | undefined;
            approvedAt?: number | undefined;
            approvedBy?: string | undefined;
            authorizationId?: string | undefined;
          };
      projects?: Array<string> | undefined;
      status?:
        | ("error" | "onboarding" | "pending" | "ready" | "resumed" | "suspended" | "uninstalled")
        | undefined;
      type: "integration-configuration";
      id: string;
      integrationId: string;
      userId: string;
      createdAt: number;
      deletedAt?: (number | null) | undefined;
      slug: string;
      teamId?: (string | null) | undefined;
      updatedAt: number;
      scopes: Array<string>;
      ownerId: string;
      canConfigureOpenTelemetry?: boolean | undefined;
      completedAt?: number | undefined;
      externalId?: string | undefined;
      source?:
        | (
            | "backoffice"
            | "cli"
            | "deploy-button"
            | "external"
            | "import-recommended-integrations"
            | "marketplace"
            | "oauth"
            | "resource-claims"
            | "v0"
          )
        | undefined;
      disabledAt?: number | undefined;
      deleteRequestedAt?: (number | null) | undefined;
      customerDeleteRequestedAt?: (number | null) | undefined;
      disabledReason?:
        | (
            | "account-plan-downgrade"
            | "disabled-by-admin"
            | "disabled-by-owner"
            | "feature-not-available"
            | "original-owner-left-the-team"
            | "original-owner-role-downgraded"
          )
        | undefined;
      installationType?: ("external" | "marketplace") | undefined;
    }
  | {
      completedAt?: number | undefined;
      createdAt: number;
      id: string;
      integrationId: string;
      ownerId: string;
      status?:
        | ("error" | "onboarding" | "pending" | "ready" | "resumed" | "suspended" | "uninstalled")
        | undefined;
      externalId?: string | undefined;
      projects?: Array<string> | undefined;
      source?:
        | (
            | "backoffice"
            | "cli"
            | "deploy-button"
            | "external"
            | "import-recommended-integrations"
            | "marketplace"
            | "oauth"
            | "resource-claims"
            | "v0"
          )
        | undefined;
      slug: string;
      teamId?: (string | null) | undefined;
      type: "integration-configuration";
      updatedAt: number;
      userId: string;
      scopes: Array<string>;
      disabledAt?: number | undefined;
      deletedAt?: (number | null) | undefined;
      deleteRequestedAt?: (number | null) | undefined;
      customerDeleteRequestedAt?: (number | null) | undefined;
      disabledReason?:
        | (
            | "account-plan-downgrade"
            | "disabled-by-admin"
            | "disabled-by-owner"
            | "feature-not-available"
            | "original-owner-left-the-team"
            | "original-owner-role-downgraded"
          )
        | undefined;
      installationType?: ("external" | "marketplace") | undefined;
    }
  | {
      completedAt?: number | undefined;
      createdAt?: number | undefined;
      id?: string | undefined;
      integrationId?: string | undefined;
      ownerId?: string | undefined;
      status?:
        | ("error" | "onboarding" | "pending" | "ready" | "resumed" | "suspended" | "uninstalled")
        | undefined;
      externalId?: string | undefined;
      projects?: Array<string> | undefined;
      source?:
        | (
            | "backoffice"
            | "cli"
            | "deploy-button"
            | "external"
            | "import-recommended-integrations"
            | "marketplace"
            | "oauth"
            | "resource-claims"
            | "v0"
          )
        | undefined;
      slug?: string | undefined;
      teamId?: (string | null) | undefined;
      type?: "integration-configuration" | undefined;
      updatedAt?: number | undefined;
      userId?: string | undefined;
      scopes?: Array<string> | undefined;
      disabledAt?: number | undefined;
      deletedAt?: (number | null) | undefined;
      deleteRequestedAt?: (number | null) | undefined;
      customerDeleteRequestedAt?: (number | null) | undefined;
      disabledReason?:
        | (
            | "account-plan-downgrade"
            | "disabled-by-admin"
            | "disabled-by-owner"
            | "feature-not-available"
            | "original-owner-left-the-team"
            | "original-owner-role-downgraded"
          )
        | undefined;
      installationType?: ("external" | "marketplace") | undefined;
    };

export type GetV1IntegrationsConfigurationIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { id: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV1IntegrationsConfigurationIdHandler = (
  input: GetV1IntegrationsConfigurationIdInput,
) => Promise<GetV1IntegrationsConfigurationIdResponse>;

export type DeleteV1IntegrationsConfigurationIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { id: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type DeleteV1IntegrationsConfigurationIdHandler = (
  input: DeleteV1IntegrationsConfigurationIdInput,
) => Promise<void>;

export type GetV1IntegrationsConfigurationIdProductsResponse = {
  products: Array<{
    id: string;
    slug: string;
    name: string;
    protocols: {
      storage?:
        | {
            status: "disabled" | "enabled";
            repl?:
              | {
                  enabled: boolean;
                  supportsReadOnlyMode: boolean;
                  welcomeMessage?: string | undefined;
                }
              | undefined;
          }
        | undefined;
      experimentation?:
        | { status: "disabled" | "enabled"; edgeConfigSyncingSupport?: boolean | undefined }
        | undefined;
      ai?: { status: "disabled" | "enabled" } | undefined;
      authentication?:
        | { status: "disabled" | "enabled"; appUrlRegistrationSupport?: boolean | undefined }
        | undefined;
      observability?: { status: "disabled" | "enabled" } | undefined;
      video?: { status: "disabled" | "enabled" } | undefined;
      workflow?: { status: "disabled" | "enabled" } | undefined;
      checks?: { status: "disabled" | "enabled" } | undefined;
      logDrain?:
        | {
            status: "disabled" | "enabled";
            endpoint: string;
            headers?: Record<string, string> | undefined;
            format: "json" | "ndjson";
          }
        | undefined;
      traceDrain?:
        | {
            status: "disabled" | "enabled";
            endpoint: string;
            headers?: Record<string, string> | undefined;
            format: "json" | "proto";
          }
        | undefined;
      messaging?: { status: "disabled" | "enabled" } | undefined;
      other?: { status: "disabled" | "enabled" } | undefined;
    };
    primaryProtocol?:
      | (
          | "ai"
          | "authentication"
          | "checks"
          | "experimentation"
          | "logDrain"
          | "messaging"
          | "observability"
          | "other"
          | "storage"
          | "traceDrain"
          | "video"
          | "workflow"
        )
      | undefined;
    metadataSchema: {
      type: "object";
      properties: Record<
        string,
        | {
            type: "string";
            "ui:control": "input";
            description?: string | undefined;
            default?: string | undefined;
            enum?: Array<string> | undefined;
            maxLength?: number | undefined;
            minLength?: number | undefined;
            pattern?: string | undefined;
            "ui:label"?: string | undefined;
            "ui:read-only"?: ({ expr: string } | boolean | "create" | "update") | undefined;
            "ui:hidden"?: ({ expr: string } | boolean | "create" | "update") | undefined;
            "ui:disabled"?: ({ expr: string } | boolean | "create" | "update") | undefined;
            "ui:description"?: (string | { expr: string }) | undefined;
            "ui:formatted-value"?: { expr: string } | undefined;
            "ui:paid-only"?: boolean | undefined;
            "ui:placeholder"?: string | undefined;
          }
        | {
            type: "number";
            "ui:control": "input";
            minimum?: number | undefined;
            maximum?: number | undefined;
            description?: string | undefined;
            default?: number | undefined;
            exclusiveMaximum?: number | undefined;
            exclusiveMinimum?: number | undefined;
            "ui:label"?: string | undefined;
            "ui:read-only"?: ({ expr: string } | boolean | "create" | "update") | undefined;
            "ui:hidden"?: ({ expr: string } | boolean | "create" | "update") | undefined;
            "ui:disabled"?: ({ expr: string } | boolean | "create" | "update") | undefined;
            "ui:description"?: (string | { expr: string }) | undefined;
            "ui:formatted-value"?: { expr: string } | undefined;
            "ui:paid-only"?: boolean | undefined;
            "ui:placeholder"?: string | undefined;
          }
        | {
            type: "boolean";
            "ui:control": "toggle";
            description?: string | undefined;
            default?: boolean | undefined;
            "ui:label"?: string | undefined;
            "ui:read-only"?: ({ expr: string } | boolean | "create" | "update") | undefined;
            "ui:hidden"?: ({ expr: string } | boolean | "create" | "update") | undefined;
            "ui:disabled"?: ({ expr: string } | boolean | "create" | "update") | undefined;
            "ui:description"?: (string | { expr: string }) | undefined;
            "ui:formatted-value"?: { expr: string } | undefined;
            "ui:paid-only"?: boolean | undefined;
          }
        | {
            type: "array";
            items: {
              type: "number";
              minimum?: number | undefined;
              maximum?: number | undefined;
              description?: string | undefined;
              default?: number | undefined;
              exclusiveMaximum?: number | undefined;
              exclusiveMinimum?: number | undefined;
            };
            "ui:control": "slider";
            "ui:steps": Array<number>;
            description?: string | undefined;
            default?: Array<number> | undefined;
            maxItems?: number | undefined;
            minItems?: number | undefined;
            "ui:label"?: string | undefined;
            "ui:read-only"?: ({ expr: string } | boolean | "create" | "update") | undefined;
            "ui:hidden"?: ({ expr: string } | boolean | "create" | "update") | undefined;
            "ui:disabled"?: ({ expr: string } | boolean | "create" | "update") | undefined;
            "ui:description"?: (string | { expr: string }) | undefined;
            "ui:formatted-value"?: { expr: string } | undefined;
            "ui:paid-only"?: boolean | undefined;
          }
        | {
            type: "string";
            "ui:control": "select";
            "ui:options": Array<{
              value: string;
              label: string;
              description?: string | undefined;
              disabled?: ({ expr: string } | boolean | "create" | "update") | undefined;
              hidden?: ({ expr: string } | boolean | "create" | "update") | undefined;
            }>;
            description?: string | undefined;
            default?: string | undefined;
            enum?: Array<string> | undefined;
            maxLength?: number | undefined;
            minLength?: number | undefined;
            pattern?: string | undefined;
            "ui:label"?: string | undefined;
            "ui:read-only"?: ({ expr: string } | boolean | "create" | "update") | undefined;
            "ui:hidden"?: ({ expr: string } | boolean | "create" | "update") | undefined;
            "ui:disabled"?: ({ expr: string } | boolean | "create" | "update") | undefined;
            "ui:description"?: (string | { expr: string }) | undefined;
            "ui:formatted-value"?: { expr: string } | undefined;
            "ui:paid-only"?: boolean | undefined;
            "ui:placeholder"?: string | undefined;
          }
        | {
            type: "string";
            "ui:control": "radio-button";
            "ui:options": Array<{
              value: string;
              label: string;
              description?: string | undefined;
              disabled?: ({ expr: string } | boolean | "create" | "update") | undefined;
              hidden?: ({ expr: string } | boolean | "create" | "update") | undefined;
            }>;
            description?: string | undefined;
            default?: string | undefined;
            enum?: Array<string> | undefined;
            maxLength?: number | undefined;
            minLength?: number | undefined;
            pattern?: string | undefined;
            "ui:label"?: string | undefined;
            "ui:read-only"?: ({ expr: string } | boolean | "create" | "update") | undefined;
            "ui:hidden"?: ({ expr: string } | boolean | "create" | "update") | undefined;
            "ui:disabled"?: ({ expr: string } | boolean | "create" | "update") | undefined;
            "ui:description"?: (string | { expr: string }) | undefined;
            "ui:formatted-value"?: { expr: string } | undefined;
            "ui:paid-only"?: boolean | undefined;
            "ui:placeholder"?: string | undefined;
          }
        | {
            type: "array";
            items: {
              type: "string";
              description?: string | undefined;
              default?: string | undefined;
              enum?: Array<string> | undefined;
              maxLength?: number | undefined;
              minLength?: number | undefined;
              pattern?: string | undefined;
            };
            "ui:control": "multi-select";
            "ui:options": Array<{
              value: string;
              label: string;
              description?: string | undefined;
              disabled?: ({ expr: string } | boolean | "create" | "update") | undefined;
              hidden?: ({ expr: string } | boolean | "create" | "update") | undefined;
            }>;
            description?: string | undefined;
            default?: Array<string> | undefined;
            maxItems?: number | undefined;
            minItems?: number | undefined;
            example?: Array<string> | undefined;
            "ui:label"?: string | undefined;
            "ui:read-only"?: ({ expr: string } | boolean | "create" | "update") | undefined;
            "ui:hidden"?: ({ expr: string } | boolean | "create" | "update") | undefined;
            "ui:disabled"?: ({ expr: string } | boolean | "create" | "update") | undefined;
            "ui:description"?: (string | { expr: string }) | undefined;
            "ui:formatted-value"?: { expr: string } | undefined;
            "ui:paid-only"?: boolean | undefined;
            "ui:placeholder"?: string | undefined;
          }
        | {
            type: "string";
            "ui:control": "vercel-region";
            "ui:options": Array<
              | {
                  value: string;
                  label: string;
                  description?: string | undefined;
                  disabled?: ({ expr: string } | boolean | "create" | "update") | undefined;
                  hidden?: ({ expr: string } | boolean | "create" | "update") | undefined;
                }
              | string
              | {
                  value: string;
                  description?: string | undefined;
                  disabled?: ({ expr: string } | boolean | "create" | "update") | undefined;
                  hidden?: ({ expr: string } | boolean | "create" | "update") | undefined;
                }
            >;
            description?: string | undefined;
            default?: string | undefined;
            enum?: Array<string> | undefined;
            maxLength?: number | undefined;
            minLength?: number | undefined;
            pattern?: string | undefined;
            "ui:label"?: string | undefined;
            "ui:read-only"?: ({ expr: string } | boolean | "create" | "update") | undefined;
            "ui:hidden"?: ({ expr: string } | boolean | "create" | "update") | undefined;
            "ui:disabled"?: ({ expr: string } | boolean | "create" | "update") | undefined;
            "ui:description"?: (string | { expr: string }) | undefined;
            "ui:formatted-value"?: { expr: string } | undefined;
            "ui:paid-only"?: boolean | undefined;
            "ui:placeholder"?: string | undefined;
          }
        | {
            type: "array";
            items: {
              type: "string";
              description?: string | undefined;
              default?: string | undefined;
              enum?: Array<string> | undefined;
              maxLength?: number | undefined;
              minLength?: number | undefined;
              pattern?: string | undefined;
            };
            "ui:control": "multi-vercel-region";
            "ui:options": Array<
              | {
                  value: string;
                  label: string;
                  description?: string | undefined;
                  disabled?: ({ expr: string } | boolean | "create" | "update") | undefined;
                  hidden?: ({ expr: string } | boolean | "create" | "update") | undefined;
                }
              | string
              | {
                  value: string;
                  description?: string | undefined;
                  disabled?: ({ expr: string } | boolean | "create" | "update") | undefined;
                  hidden?: ({ expr: string } | boolean | "create" | "update") | undefined;
                }
            >;
            description?: string | undefined;
            default?: Array<string> | undefined;
            maxItems?: number | undefined;
            minItems?: number | undefined;
            example?: Array<string> | undefined;
            "ui:label"?: string | undefined;
            "ui:read-only"?: ({ expr: string } | boolean | "create" | "update") | undefined;
            "ui:hidden"?: ({ expr: string } | boolean | "create" | "update") | undefined;
            "ui:disabled"?: ({ expr: string } | boolean | "create" | "update") | undefined;
            "ui:description"?: (string | { expr: string }) | undefined;
            "ui:formatted-value"?: { expr: string } | undefined;
            "ui:paid-only"?: boolean | undefined;
            "ui:placeholder"?: string | undefined;
          }
        | {
            type: "string";
            "ui:control": "vercel-country";
            "ui:options": Array<
              | {
                  value: string;
                  label: string;
                  description?: string | undefined;
                  disabled?: ({ expr: string } | boolean | "create" | "update") | undefined;
                  hidden?: ({ expr: string } | boolean | "create" | "update") | undefined;
                }
              | string
              | {
                  value: string;
                  description?: string | undefined;
                  disabled?: ({ expr: string } | boolean | "create" | "update") | undefined;
                  hidden?: ({ expr: string } | boolean | "create" | "update") | undefined;
                }
            >;
            description?: string | undefined;
            default?: string | undefined;
            enum?: Array<string> | undefined;
            maxLength?: number | undefined;
            minLength?: number | undefined;
            pattern?: string | undefined;
            "ui:label"?: string | undefined;
            "ui:read-only"?: ({ expr: string } | boolean | "create" | "update") | undefined;
            "ui:hidden"?: ({ expr: string } | boolean | "create" | "update") | undefined;
            "ui:disabled"?: ({ expr: string } | boolean | "create" | "update") | undefined;
            "ui:description"?: (string | { expr: string }) | undefined;
            "ui:formatted-value"?: { expr: string } | undefined;
            "ui:paid-only"?: boolean | undefined;
            "ui:placeholder"?: string | undefined;
          }
        | {
            type: "string";
            "ui:control": "domain";
            description?: string | undefined;
            default?: string | undefined;
            enum?: Array<string> | undefined;
            maxLength?: number | undefined;
            minLength?: number | undefined;
            pattern?: string | undefined;
            "ui:label"?: string | undefined;
            "ui:read-only"?: ({ expr: string } | boolean | "create" | "update") | undefined;
            "ui:hidden"?: ({ expr: string } | boolean | "create" | "update") | undefined;
            "ui:disabled"?: ({ expr: string } | boolean | "create" | "update") | undefined;
            "ui:description"?: (string | { expr: string }) | undefined;
            "ui:formatted-value"?: { expr: string } | undefined;
            "ui:paid-only"?: boolean | undefined;
            "ui:placeholder"?: string | undefined;
          }
        | {
            type: "string";
            "ui:control": "git-namespace";
            description?: string | undefined;
            "ui:label"?: string | undefined;
            "ui:read-only"?: ({ expr: string } | boolean | "create" | "update") | undefined;
            "ui:hidden"?: ({ expr: string } | boolean | "create" | "update") | undefined;
            "ui:disabled"?: ({ expr: string } | boolean | "create" | "update") | undefined;
            "ui:description"?: (string | { expr: string }) | undefined;
            "ui:formatted-value"?: { expr: string } | undefined;
            "ui:paid-only"?: boolean | undefined;
            "ui:placeholder"?: string | undefined;
            "git:providers"?: Array<"bitbucket" | "github" | "gitlab"> | undefined;
          }
      >;
      required?: Array<string> | undefined;
      "ui:order"?: Array<string> | undefined;
    };
  }>;
  integration: { id: string; slug: string; name: string };
  configuration: { id: string };
};

export type GetV1IntegrationsConfigurationIdProductsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { id: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV1IntegrationsConfigurationIdProductsHandler = (
  input: GetV1IntegrationsConfigurationIdProductsInput,
) => Promise<GetV1IntegrationsConfigurationIdProductsResponse>;

export const postV1IntegrationsSsoTokenBody = z.union([
  z.object({
    code: z.string(),
    state: z.string().optional(),
    client_id: z.string(),
    client_secret: z.string(),
    redirect_uri: z.string().optional(),
    grant_type: z.literal("authorization_code"),
  }),
  z.object({
    refresh_token: z.string(),
    client_id: z.string(),
    client_secret: z.string(),
    grant_type: z.literal("refresh_token"),
  }),
]);

export type PostV1IntegrationsSsoTokenBody =
  | {
      code: string;
      state?: string | undefined;
      client_id: string;
      client_secret: string;
      redirect_uri?: string | undefined;
      grant_type: "authorization_code";
    }
  | {
      refresh_token: string;
      client_id: string;
      client_secret: string;
      grant_type: "refresh_token";
    };

export type PostV1IntegrationsSsoTokenResponse =
  | {
      id_token: string;
      token_type: string | null;
      expires_in?: number | undefined;
      access_token: string | null;
      refresh_token?: string | undefined;
    }
  | {
      id_token: string;
      token_type: string;
      access_token: string;
      refresh_token: string;
      expires_in: number;
    };

export type PostV1IntegrationsSsoTokenInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  body: PostV1IntegrationsSsoTokenBody;
};

export type PostV1IntegrationsSsoTokenHandler = (
  input: PostV1IntegrationsSsoTokenInput,
) => Promise<PostV1IntegrationsSsoTokenResponse>;

export type GetV2IntegrationsLogDrainsResponse = Array<{
  clientId?: string | undefined;
  configurationId?: string | undefined;
  createdAt: number;
  id: string;
  deliveryFormat?: ("json" | "ndjson" | "protobuf") | undefined;
  name: string;
  ownerId: string;
  projectId?: (string | null) | undefined;
  projectIds?: Array<string> | undefined;
  url: string;
  sources?:
    | Array<"build" | "edge" | "external" | "firewall" | "lambda" | "redirect" | "static">
    | undefined;
  createdFrom?: ("integration" | "self-served") | undefined;
  headers?: Record<string, string> | undefined;
  environments?: Array<"preview" | "production"> | undefined;
  branch?: string | undefined;
  samplingRate?: number | undefined;
  source:
    | { kind: "self-served" }
    | {
        kind: "integration";
        resourceId?: string | undefined;
        externalResourceId?: string | undefined;
        integrationId: string;
        integrationConfigurationId: string;
      };
}>;

export type GetV2IntegrationsLogDrainsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV2IntegrationsLogDrainsHandler = (
  input: GetV2IntegrationsLogDrainsInput,
) => Promise<GetV2IntegrationsLogDrainsResponse>;

export const postV2IntegrationsLogDrainsBody = z.object({
  name: z
    .string()
    .max(100)
    .regex(/^[A-z0-9_ -]+$/),
  projectIds: z.array(z.string().regex(/^[a-zA-z0-9_]+$/)).optional(),
  secret: z
    .string()
    .max(100)
    .regex(/^[A-z0-9_ -]+$/)
    .optional(),
  deliveryFormat: z.enum(["json", "ndjson"]).optional(),
  url: z.string().regex(/^https?:\/\//),
  sources: z
    .array(z.enum(["static", "lambda", "build", "edge", "external", "firewall"]))
    .optional(),
  headers: z.record(z.string(), z.string()).optional(),
  environments: z.array(z.enum(["preview", "production"])).optional(),
});

export type PostV2IntegrationsLogDrainsBody = {
  name: string;
  projectIds?: Array<string> | undefined;
  secret?: string | undefined;
  deliveryFormat?: ("json" | "ndjson") | undefined;
  url: string;
  sources?: Array<"static" | "lambda" | "build" | "edge" | "external" | "firewall"> | undefined;
  headers?: Record<string, string> | undefined;
  environments?: Array<"preview" | "production"> | undefined;
};

export type PostV2IntegrationsLogDrainsResponse = {
  clientId?: string | undefined;
  configurationId?: string | undefined;
  createdAt: number;
  id: string;
  deliveryFormat?: ("json" | "ndjson" | "protobuf") | undefined;
  name: string;
  ownerId: string;
  projectId?: (string | null) | undefined;
  projectIds?: Array<string> | undefined;
  url: string;
  sources?:
    | Array<"build" | "edge" | "external" | "firewall" | "lambda" | "redirect" | "static">
    | undefined;
  createdFrom?: ("integration" | "self-served") | undefined;
  headers?: Record<string, string> | undefined;
  environments?: Array<"preview" | "production"> | undefined;
  branch?: string | undefined;
  samplingRate?: number | undefined;
  source:
    | { kind: "self-served" }
    | {
        kind: "integration";
        resourceId?: string | undefined;
        externalResourceId?: string | undefined;
        integrationId: string;
        integrationConfigurationId: string;
      };
};

export type PostV2IntegrationsLogDrainsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV2IntegrationsLogDrainsBody;
};

export type PostV2IntegrationsLogDrainsHandler = (
  input: PostV2IntegrationsLogDrainsInput,
) => Promise<PostV2IntegrationsLogDrainsResponse>;

export type DeleteV1IntegrationsLogDrainsIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { id: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type DeleteV1IntegrationsLogDrainsIdHandler = (
  input: DeleteV1IntegrationsLogDrainsIdInput,
) => Promise<void>;
