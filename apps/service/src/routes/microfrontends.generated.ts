import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import {
  getV1MicrofrontendsGroups,
  getV1MicrofrontendsGroupsGroupIdProjects,
  getV1MicrofrontendsDeploymentIdConfig,
  getV1MicrofrontendsProjectsProjectIdOrNameProductionMfeConfig,
  postV1MicrofrontendsGroup,
} from "./handlers/microfrontends";
import type { ACLAction } from "packages/models/src/aCLAction.generated.ts";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.get(
  "/v1/microfrontends/groups",
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(await getV1MicrofrontendsGroups({ db, env: c.env, user: c.var.user, query }));
  },
);
app.get(
  "/v1/microfrontends/groups/:groupId/projects",
  validate("param", z.object({ groupId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV1MicrofrontendsGroupsGroupIdProjects({
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
  "/v1/microfrontends/:deploymentId/config",
  validate("param", z.object({ deploymentId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV1MicrofrontendsDeploymentIdConfig({
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
  "/v1/microfrontends/projects/:projectIdOrName/production-mfe-config",
  validate("param", z.object({ projectIdOrName: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV1MicrofrontendsProjectsProjectIdOrNameProductionMfeConfig({
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
  "/v1/microfrontends/group",
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV1MicrofrontendsGroupBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV1MicrofrontendsGroup({ db, env: c.env, user: c.var.user, query, body }),
    );
  },
);

export type GetV1MicrofrontendsGroupsResponse = Record<string, never>;

export type GetV1MicrofrontendsGroupsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV1MicrofrontendsGroupsHandler = (
  input: GetV1MicrofrontendsGroupsInput,
) => Promise<GetV1MicrofrontendsGroupsResponse>;

export type GetV1MicrofrontendsGroupsGroupIdProjectsResponse = {
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
              createdAt?: number | undefined;
              updatedAt?: number | undefined;
              org: string;
              repoOwnerId?: number | undefined;
              repo?: string | undefined;
              repoId?: number | undefined;
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
      fluid?: boolean | undefined;
      functionDefaultRegions: Array<string>;
      functionDefaultTimeout?: number | undefined;
      functionDefaultMemoryType?:
        | ("performance" | "performance_xl" | "standard" | "standard_legacy")
        | undefined;
      functionZeroConfigFailover?: boolean | undefined;
      elasticConcurrencyEnabled?: boolean | undefined;
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
      fluid?: boolean | undefined;
      functionDefaultRegions: Array<string>;
      functionDefaultTimeout?: number | undefined;
      functionDefaultMemoryType?:
        | ("performance" | "performance_xl" | "standard" | "standard_legacy")
        | undefined;
      functionZeroConfigFailover?: boolean | undefined;
      elasticConcurrencyEnabled?: boolean | undefined;
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
                        action?:
                          | ("challenge" | "deny" | "log" | "rate_limit" | "null" | null)
                          | undefined;
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
  }>;
};

export type GetV1MicrofrontendsGroupsGroupIdProjectsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { groupId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV1MicrofrontendsGroupsGroupIdProjectsHandler = (
  input: GetV1MicrofrontendsGroupsGroupIdProjectsInput,
) => Promise<GetV1MicrofrontendsGroupsGroupIdProjectsResponse>;

export type GetV1MicrofrontendsDeploymentIdConfigResponse = {
  config: {
    $schema?: string | undefined;
    version?: "1" | undefined;
    applications: Record<
      string,
      | {
          development: {
            fallback: string;
            local?: (string | number) | undefined;
            task?: string | undefined;
          };
          packageName?: string | undefined;
          projectId: string;
        }
      | {
          development?:
            | {
                fallback?: string | undefined;
                local?: (string | number) | undefined;
                task?: string | undefined;
              }
            | undefined;
          routing: Array<{
            group?: string | undefined;
            flag?: string | undefined;
            paths: Array<string>;
          }>;
          assetPrefix?: string | undefined;
          packageName?: string | undefined;
          projectId: string;
        }
    >;
    options?:
      | { disableOverrides?: boolean | undefined; localProxyPort?: number | undefined }
      | undefined;
  } | null;
};

export type GetV1MicrofrontendsDeploymentIdConfigInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { deploymentId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV1MicrofrontendsDeploymentIdConfigHandler = (
  input: GetV1MicrofrontendsDeploymentIdConfigInput,
) => Promise<GetV1MicrofrontendsDeploymentIdConfigResponse>;

export type GetV1MicrofrontendsProjectsProjectIdOrNameProductionMfeConfigResponse = {
  config: {
    $schema?: string | undefined;
    version?: "1" | undefined;
    applications: Record<
      string,
      | {
          development: {
            fallback: string;
            local?: (string | number) | undefined;
            task?: string | undefined;
          };
          packageName?: string | undefined;
          projectId: string;
        }
      | {
          development?:
            | {
                fallback?: string | undefined;
                local?: (string | number) | undefined;
                task?: string | undefined;
              }
            | undefined;
          routing: Array<{
            group?: string | undefined;
            flag?: string | undefined;
            paths: Array<string>;
          }>;
          assetPrefix?: string | undefined;
          packageName?: string | undefined;
          projectId: string;
        }
    >;
    options?:
      | { disableOverrides?: boolean | undefined; localProxyPort?: number | undefined }
      | undefined;
  } | null;
};

export type GetV1MicrofrontendsProjectsProjectIdOrNameProductionMfeConfigInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { projectIdOrName: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV1MicrofrontendsProjectsProjectIdOrNameProductionMfeConfigHandler = (
  input: GetV1MicrofrontendsProjectsProjectIdOrNameProductionMfeConfigInput,
) => Promise<GetV1MicrofrontendsProjectsProjectIdOrNameProductionMfeConfigResponse>;

export const postV1MicrofrontendsGroupBody = z.object({
  groupName: z.string(),
  defaultApp: z.object({ projectId: z.string(), defaultRoute: z.string().optional() }),
  otherApplications: z.array(
    z.object({ projectId: z.string(), defaultRoute: z.string().optional() }),
  ),
});

export type PostV1MicrofrontendsGroupBody = {
  groupName: string;
  defaultApp: { projectId: string; defaultRoute?: string | undefined };
  otherApplications: Array<{ projectId: string; defaultRoute?: string | undefined }>;
};

export type PostV1MicrofrontendsGroupResponse = {
  newMicrofrontendsGroup: {
    id: string;
    slug: string;
    name: string;
    fallbackEnvironment: string;
    enablePolyrepoBranchRouting: boolean;
    createdAt: number;
    updatedAt: number;
  };
};

export type PostV1MicrofrontendsGroupInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV1MicrofrontendsGroupBody;
};

export type PostV1MicrofrontendsGroupHandler = (
  input: PostV1MicrofrontendsGroupInput,
) => Promise<PostV1MicrofrontendsGroupResponse>;
