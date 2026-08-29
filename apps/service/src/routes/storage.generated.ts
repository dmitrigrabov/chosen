import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import { postV1StorageStoresIntegrationDirect } from "./handlers/storage";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.post(
  "/v1/storage/stores/integration/direct",
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV1StorageStoresIntegrationDirectBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV1StorageStoresIntegrationDirect({ db, env: c.env, user: c.var.user, query, body }),
    );
  },
);

export const postV1StorageStoresIntegrationDirectBody = z.object({
  name: z.string().max(128),
  integrationConfigurationId: z.string().regex(/^icfg_[a-zA-Z0-9]+$/),
  integrationProductIdOrSlug: z.union([
    z.string().regex(/^iap_[a-zA-Z0-9_]+$/),
    z.string().regex(/^[a-z0-9-]+$/),
  ]),
  metadata: z
    .record(
      z.string(),
      z.union([z.string(), z.number(), z.boolean(), z.array(z.string()), z.array(z.number())]),
    )
    .optional(),
  externalId: z.string().optional(),
  protocolSettings: z.record(z.string(), z.unknown()).optional(),
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
  billingPlanId: z.string().optional(),
  paymentMethodId: z.string().optional(),
  prepaymentAmountCents: z.number().gte(50).optional(),
});

export type PostV1StorageStoresIntegrationDirectBody = {
  name: string;
  integrationConfigurationId: string;
  integrationProductIdOrSlug: string | string;
  metadata?: Record<string, string | number | boolean | Array<string> | Array<number>> | undefined;
  externalId?: string | undefined;
  protocolSettings?: Record<string, unknown> | undefined;
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
  billingPlanId?: string | undefined;
  paymentMethodId?: string | undefined;
  prepaymentAmountCents?: number | undefined;
};

export type PostV1StorageStoresIntegrationDirectResponse = {
  store: {
    projectsMetadata: Array<{
      id: string;
      projectId: string;
      name: string;
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
      latestDeployment?: string | undefined;
      environments: Array<string>;
      envVarPrefix: string | null;
      environmentVariables: Array<string>;
      deployments?:
        | {
            required: boolean;
            actions: Array<{
              slug: string;
              environments: Array<"development" | "preview" | "production">;
            }>;
          }
        | undefined;
      makeEnvVarsSensitive?: boolean | undefined;
    }>;
    projectFilter?:
      | {
          git?:
            | {
                providers: Array<"bitbucket" | "github" | "gitlab"> | "*";
                owners?: Array<string> | undefined;
                repos?: Array<string> | undefined;
              }
            | undefined;
        }
      | undefined;
    totalConnectedProjects?: number | undefined;
    usageQuotaExceeded: boolean;
    status:
      | "available"
      | "error"
      | "initializing"
      | "limits-exceeded-suspended"
      | "limits-exceeded-suspended-store-count"
      | "onboarding"
      | "suspended"
      | "uninstalled"
      | "null"
      | null;
    ownership?: ("linked" | "owned" | "sandbox") | undefined;
    capabilities?:
      | {
          mcp?: boolean | undefined;
          mcpReadonly?: boolean | undefined;
          sso?: boolean | undefined;
          billable?: boolean | undefined;
          transferable?: boolean | undefined;
          secretsSync?: boolean | undefined;
          secretRotation?:
            | ({ maxDelayHours: number; customRotationWarning?: string | undefined } | false)
            | undefined;
          projects?: boolean | undefined;
          v0?: boolean | undefined;
          autoSensitive?: boolean | undefined;
          agentTools?: boolean | undefined;
        }
      | undefined;
    metadata?:
      | Record<string, string | number | Array<string> | Array<number> | boolean>
      | undefined;
    externalResourceId: string;
    externalResourceStatus?:
      | (
          | "error"
          | "onboarding"
          | "pending"
          | "ready"
          | "resumed"
          | "suspended"
          | "uninstalled"
          | "null"
          | null
        )
      | undefined;
    directPartnerConsoleUrl?: string | undefined;
    product: {
      id?: string | undefined;
      name?: string | undefined;
      slug?: string | undefined;
      iconUrl?: string | undefined;
      capabilities?:
        | {
            mcp?: boolean | undefined;
            mcpReadonly?: boolean | undefined;
            sso?: boolean | undefined;
            billable?: boolean | undefined;
            transferable?: boolean | undefined;
            secretsSync?: boolean | undefined;
            secretRotation?:
              | ({ maxDelayHours: number; customRotationWarning?: string | undefined } | false)
              | undefined;
            sandbox?: boolean | undefined;
            linking?: boolean | undefined;
            projects?: boolean | undefined;
            v0?: boolean | undefined;
            importResource?: boolean | undefined;
            connectedImportResource?: boolean | undefined;
            nativeImportResource?: boolean | undefined;
            databaseUI?: boolean | undefined;
            v0Flavors?: boolean | undefined;
            autoSensitive?: boolean | undefined;
            agentTools?: boolean | undefined;
          }
        | undefined;
      shortDescription?: string | undefined;
      metadataSchema?:
        | {
            type: "object";
            properties: Record<
              string,
              | {
                  type: "string";
                  "ui:control": "input";
                  default?: string | undefined;
                  enum?: Array<string> | undefined;
                  maxLength?: number | undefined;
                  minLength?: number | undefined;
                  pattern?: string | undefined;
                  description?: string | undefined;
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
                  default?: number | undefined;
                  maximum?: number | undefined;
                  exclusiveMaximum?: number | undefined;
                  minimum?: number | undefined;
                  exclusiveMinimum?: number | undefined;
                  description?: string | undefined;
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
                  default?: boolean | undefined;
                  description?: string | undefined;
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
                    default?: number | undefined;
                    maximum?: number | undefined;
                    exclusiveMaximum?: number | undefined;
                    minimum?: number | undefined;
                    exclusiveMinimum?: number | undefined;
                    description?: string | undefined;
                  };
                  "ui:control": "slider";
                  "ui:steps": Array<number>;
                  default?: Array<number> | undefined;
                  maxItems?: number | undefined;
                  minItems?: number | undefined;
                  description?: string | undefined;
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
                  default?: string | undefined;
                  enum?: Array<string> | undefined;
                  maxLength?: number | undefined;
                  minLength?: number | undefined;
                  pattern?: string | undefined;
                  description?: string | undefined;
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
                  default?: string | undefined;
                  enum?: Array<string> | undefined;
                  maxLength?: number | undefined;
                  minLength?: number | undefined;
                  pattern?: string | undefined;
                  description?: string | undefined;
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
                    default?: string | undefined;
                    enum?: Array<string> | undefined;
                    maxLength?: number | undefined;
                    minLength?: number | undefined;
                    pattern?: string | undefined;
                    description?: string | undefined;
                  };
                  "ui:control": "multi-select";
                  "ui:options": Array<{
                    value: string;
                    label: string;
                    description?: string | undefined;
                    disabled?: ({ expr: string } | boolean | "create" | "update") | undefined;
                    hidden?: ({ expr: string } | boolean | "create" | "update") | undefined;
                  }>;
                  default?: Array<string> | undefined;
                  maxItems?: number | undefined;
                  minItems?: number | undefined;
                  description?: string | undefined;
                  "ui:label"?: string | undefined;
                  "ui:read-only"?: ({ expr: string } | boolean | "create" | "update") | undefined;
                  "ui:hidden"?: ({ expr: string } | boolean | "create" | "update") | undefined;
                  "ui:disabled"?: ({ expr: string } | boolean | "create" | "update") | undefined;
                  "ui:description"?: (string | { expr: string }) | undefined;
                  "ui:formatted-value"?: { expr: string } | undefined;
                  "ui:paid-only"?: boolean | undefined;
                  "ui:placeholder"?: string | undefined;
                  example?: Array<string> | undefined;
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
                  default?: string | undefined;
                  enum?: Array<string> | undefined;
                  maxLength?: number | undefined;
                  minLength?: number | undefined;
                  pattern?: string | undefined;
                  description?: string | undefined;
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
                    default?: string | undefined;
                    enum?: Array<string> | undefined;
                    maxLength?: number | undefined;
                    minLength?: number | undefined;
                    pattern?: string | undefined;
                    description?: string | undefined;
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
                  default?: Array<string> | undefined;
                  maxItems?: number | undefined;
                  minItems?: number | undefined;
                  description?: string | undefined;
                  "ui:label"?: string | undefined;
                  "ui:read-only"?: ({ expr: string } | boolean | "create" | "update") | undefined;
                  "ui:hidden"?: ({ expr: string } | boolean | "create" | "update") | undefined;
                  "ui:disabled"?: ({ expr: string } | boolean | "create" | "update") | undefined;
                  "ui:description"?: (string | { expr: string }) | undefined;
                  "ui:formatted-value"?: { expr: string } | undefined;
                  "ui:paid-only"?: boolean | undefined;
                  "ui:placeholder"?: string | undefined;
                  example?: Array<string> | undefined;
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
                  default?: string | undefined;
                  enum?: Array<string> | undefined;
                  maxLength?: number | undefined;
                  minLength?: number | undefined;
                  pattern?: string | undefined;
                  description?: string | undefined;
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
                  default?: string | undefined;
                  enum?: Array<string> | undefined;
                  maxLength?: number | undefined;
                  minLength?: number | undefined;
                  pattern?: string | undefined;
                  description?: string | undefined;
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
          }
        | undefined;
      resourceLinks?: Array<{ href: string; title: string }> | undefined;
      tags?:
        | Array<
            | "ai"
            | "authentication"
            | "blob"
            | "checks"
            | "drains"
            | "edge-config"
            | "experimentation"
            | "kv"
            | "libsql"
            | "logDrain"
            | "mcp"
            | "messaging"
            | "mysql"
            | "observability"
            | "other"
            | "postgres"
            | "rds"
            | "redis"
            | "sqlite"
            | "storage"
            | "tag_agents"
            | "tag_ai"
            | "tag_analytics"
            | "tag_authentication"
            | "tag_checks"
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
            | "tag_logDrain"
            | "tag_logging"
            | "tag_messaging"
            | "tag_monitoring"
            | "tag_observability"
            | "tag_other"
            | "tag_payments"
            | "tag_performance"
            | "tag_productivity"
            | "tag_searching"
            | "tag_security"
            | "tag_storage"
            | "tag_support_agent"
            | "tag_testing"
            | "tag_traceDrain"
            | "tag_video"
            | "tag_web_automation"
            | "tag_workflow"
            | "traceDrain"
            | "vector"
            | "video"
            | "workflow"
          >
        | undefined;
      projectConnectionScopes?:
        | Array<
            | "read-write:deployment"
            | "read-write:deployment-check"
            | "read-write:domain"
            | "read-write:drains"
            | "read-write:global-project-env-vars"
            | "read-write:integration-deployment-action"
            | "read-write:log-drain"
            | "read-write:project-env-vars"
            | "read-write:project-protection-bypass"
            | "read:deployment"
            | "read:domain"
            | "read:project"
          >
        | undefined;
      showSSOLinkOnProjectConnection?: boolean | undefined;
      disableResourceRenaming?: boolean | undefined;
      resourceTitle?: string | undefined;
      agentSkills?: Array<string> | undefined;
      repl?:
        | { enabled: boolean; supportsReadOnlyMode: boolean; welcomeMessage?: string | undefined }
        | undefined;
      guides?:
        | Array<{
            framework: string;
            title: string;
            steps: Array<{
              title: string;
              content: string;
              actions?:
                | Array<{
                    type: "add_drain" | "configure_project_connections" | "connect_to_project";
                  }>
                | undefined;
            }>;
          }>
        | undefined;
      integration: {
        id: string;
        name: string;
        slug: string;
        supportsInstallationBillingPlans?: boolean | undefined;
        icon: string;
        capabilities?:
          | {
              provisioning?: boolean | undefined;
              mcp?: boolean | undefined;
              mcpReadonly?: boolean | undefined;
              sso?: boolean | undefined;
              billable?: boolean | undefined;
              transferable?: boolean | undefined;
              templateCloneOnly?: boolean | undefined;
              checks?: boolean | undefined;
              connectedProvisioning?: boolean | undefined;
              secretRotation?:
                | ({ maxDelayHours: number; customRotationWarning?: string | undefined } | false)
                | undefined;
              importResource?: boolean | undefined;
              connectedImportResource?: boolean | undefined;
              nativeImportResource?: boolean | undefined;
              requiresBrowserInstall?: boolean | undefined;
              v0Flavors?: boolean | undefined;
              flexCommitEligible?: boolean | undefined;
              updateConfiguration?: boolean | undefined;
              maxAllowedTeams?: number | undefined;
            }
          | undefined;
        flags?: Array<string> | undefined;
      };
      integrationConfigurationId: string;
      supportedProtocols: Array<
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
      >;
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
      logDrainStatus?: ("disabled" | "enabled") | undefined;
    };
    protocolSettings?:
      | {
          experimentation?:
            | {
                edgeConfigSyncingEnabled?: boolean | undefined;
                edgeConfigId?: string | undefined;
                globalConfigId?: string | undefined;
                globalConfigSyncingEnabled?: boolean | undefined;
                edgeConfigTokenId?: string | undefined;
              }
            | undefined;
          authentication?:
            | {
                appUrls?:
                  | Array<{ url: string; target: "development" | "preview" | "production" }>
                  | undefined;
              }
            | undefined;
        }
      | undefined;
    notification?:
      | {
          title: string;
          level: "error" | "info" | "warn";
          message?: string | undefined;
          href?: string | undefined;
        }
      | undefined;
    secrets: Array<{ name: string; length: number; frameworkPublishable?: boolean | undefined }>;
    billingPlan?:
      | {
          id: string;
          type: "prepayment" | "subscription";
          description: string;
          name: string;
          scope: "installation" | "resource";
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
        }
      | undefined;
    secretRotationRequestedAt?: number | undefined;
    secretRotationRequestedReason?: string | undefined;
    secretRotationRequestedBy?: string | undefined;
    secretRotationCompletedAt?: number | undefined;
    parentId?: string | undefined;
    targets?: Array<"development" | "preview" | "production"> | undefined;
  } | null;
};

export type PostV1StorageStoresIntegrationDirectInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV1StorageStoresIntegrationDirectBody;
};

export type PostV1StorageStoresIntegrationDirectHandler = (
  input: PostV1StorageStoresIntegrationDirectInput,
) => Promise<PostV1StorageStoresIntegrationDirectResponse>;
