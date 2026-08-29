import { z } from "zod";
import { flagJSONValue, type FlagJSONValue } from "packages/models/src/flagJSONValue.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV13DeploymentsArgs = {
  forceNew?: ("0" | "1") | undefined;
  skipAutoDetectionConfirmation?: ("0" | "1") | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: {
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
          | {
              ref: string;
              repoId: number | string;
              sha?: string | undefined;
              type: "github-limited";
            }
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
          | {
              owner: string;
              ref: string;
              sha?: string | undefined;
              slug: string;
              type: "bitbucket";
            }
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
};

export const useCreateApiV13DeploymentsResponse = z.union([
  z.object({
    alias: z.array(z.string()).optional(),
    aliasAssigned: z.boolean(),
    id: z.string(),
    target: z.enum(["production", "staging", "null"]).nullable().optional(),
    readyState: z.enum([
      "BLOCKED",
      "BUILDING",
      "CANCELED",
      "ERROR",
      "INITIALIZING",
      "QUEUED",
      "READY",
    ]),
    aliasError: z.object({ code: z.string(), message: z.string() }).nullable().optional(),
    aliasWarning: z
      .object({
        code: z.string(),
        message: z.string(),
        link: z.string().optional(),
        action: z.string().optional(),
      })
      .nullable()
      .optional(),
    errorCode: z.string().optional(),
    errorMessage: z.string().nullable().optional(),
  }),
  z.object({
    aliasAssignedAt: z.union([z.number(), z.boolean()]).nullable().optional(),
    alwaysRefuseToBuild: z.boolean().optional(),
    build: z.object({ env: z.array(z.string()) }),
    buildArtifactUrls: z.array(z.string()).optional(),
    builds: z
      .array(
        z.object({
          use: z.string(),
          src: z.string().optional(),
          config: z.record(z.string(), z.unknown()).optional(),
        }),
      )
      .optional(),
    env: z.array(z.string()),
    resourceConfig: z
      .object({
        buildMachine: z
          .object({
            purchaseType: z.enum(["basic", "enhanced", "standard", "turbo"]).optional(),
            defaultPurchaseType: z.enum(["basic", "enhanced", "standard"]).optional(),
            machineSelectionType: z.enum(["elastic", "fixed"]).optional(),
            cores: z.number().optional(),
            memory: z.number().optional(),
          })
          .optional(),
      })
      .optional(),
    inspectorUrl: z.string().nullable(),
    isInConcurrentBuildsQueue: z.boolean(),
    isInSystemBuildsQueue: z.boolean(),
    projectSettings: z.object({
      nodeVersion: z
        .enum(["10.x", "12.x", "14.x", "16.x", "18.x", "20.x", "22.x", "24.x", "8.10.x"])
        .optional(),
      buildCommand: z.string().nullable().optional(),
      devCommand: z.string().nullable().optional(),
      framework: z
        .enum([
          "actix-web",
          "angular",
          "ash",
          "astro",
          "axum",
          "blitzjs",
          "brunch",
          "bun",
          "container",
          "create-react-app",
          "django",
          "docusaurus",
          "docusaurus-2",
          "dojo",
          "eleventy",
          "elysia",
          "ember",
          "eve",
          "express",
          "fastapi",
          "fasthtml",
          "fastify",
          "flask",
          "gatsby",
          "go",
          "gridsome",
          "h3",
          "hexo",
          "hono",
          "hugo",
          "hydrogen",
          "ionic-angular",
          "ionic-react",
          "jekyll",
          "koa",
          "mastra",
          "middleman",
          "nestjs",
          "nextjs",
          "nitro",
          "node",
          "nuxtjs",
          "parcel",
          "polymer",
          "preact",
          "python",
          "react-router",
          "redwoodjs",
          "remix",
          "ruby",
          "rust",
          "saber",
          "sanity",
          "sanity-v2",
          "sapper",
          "scully",
          "services",
          "solidstart",
          "solidstart-1",
          "stencil",
          "storybook",
          "svelte",
          "sveltekit",
          "sveltekit-1",
          "tanstack-start",
          "tanstack-start-lovable",
          "umijs",
          "vite",
          "vitepress",
          "vue",
          "vuepress",
          "xmcp",
          "zola",
          "null",
        ])
        .nullable()
        .optional(),
      commandForIgnoringBuildStep: z.string().nullable().optional(),
      installCommand: z.string().nullable().optional(),
      outputDirectory: z.string().nullable().optional(),
      speedInsights: z
        .object({
          id: z.string(),
          enabledAt: z.number().optional(),
          disabledAt: z.number().optional(),
          canceledAt: z.number().optional(),
          hasData: z.boolean().optional(),
          dataReceivedAt: z.number().optional(),
          paidAt: z.number().optional(),
        })
        .optional(),
      webAnalytics: z
        .object({
          id: z.string(),
          disabledAt: z.number().optional(),
          canceledAt: z.number().optional(),
          enabledAt: z.number().optional(),
          hasData: z.literal(true).optional(),
        })
        .optional(),
    }),
    integrations: z
      .object({
        status: z.enum(["error", "pending", "ready", "skipped", "timeout"]),
        startedAt: z.number(),
        claimedAt: z.number().optional(),
        completedAt: z.number().optional(),
        skippedAt: z.number().optional(),
        skippedBy: z.string().optional(),
      })
      .optional(),
    images: z
      .object({
        sizes: z.array(z.number()).optional(),
        qualities: z.array(z.number()).optional(),
        domains: z.array(z.string()).optional(),
        remotePatterns: z
          .array(
            z.object({
              protocol: z.enum(["http", "https"]).optional(),
              hostname: z.string(),
              port: z.string().optional(),
              pathname: z.string().optional(),
              search: z.string().optional(),
            }),
          )
          .optional(),
        localPatterns: z
          .array(z.object({ pathname: z.string().optional(), search: z.string().optional() }))
          .optional(),
        minimumCacheTTL: z.number().optional(),
        formats: z.array(z.enum(["image/avif", "image/webp"])).optional(),
        dangerouslyAllowSVG: z.boolean().optional(),
        contentSecurityPolicy: z.string().optional(),
        contentDispositionType: z.enum(["attachment", "inline"]).optional(),
      })
      .optional(),
    alias: z.array(z.string()).optional(),
    aliasAssigned: z.boolean(),
    bootedAt: z.number(),
    buildingAt: z.number(),
    buildContainerFinishedAt: z.number().optional(),
    buildSkipped: z.boolean(),
    creator: z.object({
      uid: z.string(),
      type: z.enum(["app", "integration", "system", "user"]).optional(),
      username: z.string().optional(),
      avatar: z.string().optional(),
    }),
    initReadyAt: z.number().optional(),
    isFirstBranchDeployment: z.boolean().optional(),
    lambdas: z
      .array(
        z.object({
          id: z.string(),
          readyState: z.enum(["BUILDING", "ERROR", "INITIALIZING", "READY"]).optional(),
          createdAt: z.number().optional(),
          entrypoint: z.string().nullable().optional(),
          readyStateAt: z.number().optional(),
          output: z.array(z.object({ path: z.string(), functionName: z.string() })),
        }),
      )
      .optional(),
    public: z.boolean(),
    ready: z.number().optional(),
    status: z.enum(["BLOCKED", "BUILDING", "CANCELED", "ERROR", "INITIALIZING", "QUEUED", "READY"]),
    team: z
      .object({ id: z.string(), name: z.string(), slug: z.string(), avatar: z.string().optional() })
      .optional(),
    userAliases: z.array(z.string()).optional(),
    previewCommentsEnabled: z.boolean().optional(),
    ttyBuildLogs: z.boolean().optional(),
    customEnvironment: z
      .union([
        z.object({
          id: z.string(),
          slug: z.string(),
          type: z.enum(["development", "preview", "production"]),
          description: z.string().optional(),
          branchMatcher: z
            .object({ type: z.enum(["endsWith", "equals", "startsWith"]), pattern: z.string() })
            .optional(),
          domains: z
            .array(
              z.object({
                name: z.string(),
                apexName: z.string(),
                projectId: z.string(),
                redirect: z.string().nullable().optional(),
                redirectStatusCode: z
                  .union([
                    z.literal(301),
                    z.literal(302),
                    z.literal(307),
                    z.literal(308),
                    z.literal(null),
                  ])
                  .nullable()
                  .optional(),
                gitBranch: z.string().nullable().optional(),
                customEnvironmentId: z.string().nullable().optional(),
                updatedAt: z.number().optional(),
                createdAt: z.number().optional(),
                verified: z.boolean(),
                verification: z
                  .array(
                    z.object({
                      type: z.string(),
                      domain: z.string(),
                      value: z.string(),
                      reason: z.string(),
                    }),
                  )
                  .optional(),
              }),
            )
            .optional(),
          currentDeploymentAliases: z.array(z.string()).optional(),
          createdAt: z.number(),
          updatedAt: z.number(),
        }),
        z.object({ id: z.string() }),
      ])
      .optional(),
    oomReport: z.literal("out-of-memory").optional(),
    readyStateReason: z.string().optional(),
    id: z.string(),
    target: z.enum(["production", "staging", "null"]).nullable().optional(),
    readyState: z.enum([
      "BLOCKED",
      "BUILDING",
      "CANCELED",
      "ERROR",
      "INITIALIZING",
      "QUEUED",
      "READY",
    ]),
    aliasError: z.object({ code: z.string(), message: z.string() }).nullable().optional(),
    aliasWarning: z
      .object({
        code: z.string(),
        message: z.string(),
        link: z.string().optional(),
        action: z.string().optional(),
      })
      .nullable()
      .optional(),
    errorCode: z.string().optional(),
    errorMessage: z.string().nullable().optional(),
    createdAt: z.number(),
    name: z.string(),
    type: z.literal("LAMBDAS"),
    aliasFinal: z.string().nullable().optional(),
    autoAssignCustomDomains: z.boolean().optional(),
    automaticAliases: z.array(z.string()).optional(),
    buildErrorAt: z.number().optional(),
    checksState: z.enum(["completed", "registered", "running"]).optional(),
    checksConclusion: z.enum(["canceled", "failed", "skipped", "succeeded"]).optional(),
    deletedAt: z.number().nullable().optional(),
    defaultRoute: z.string().optional(),
    canceledAt: z.number().optional(),
    errorLink: z.string().optional(),
    errorStep: z.string().optional(),
    passiveRegions: z.array(z.string()).optional(),
    gitSource: z
      .union([
        z.object({
          type: z.literal("github"),
          repoId: z.union([z.string(), z.number()]),
          ref: z.string().nullable().optional(),
          sha: z.string().optional(),
          prId: z.number().nullable().optional(),
        }),
        z.object({
          type: z.literal("github"),
          org: z.string(),
          repo: z.string(),
          ref: z.string().nullable().optional(),
          sha: z.string().optional(),
          prId: z.number().nullable().optional(),
        }),
        z.object({
          type: z.literal("github-custom-host"),
          host: z.string(),
          repoId: z.union([z.string(), z.number()]),
          ref: z.string().nullable().optional(),
          sha: z.string().optional(),
          prId: z.number().nullable().optional(),
        }),
        z.object({
          type: z.literal("github-custom-host"),
          host: z.string(),
          org: z.string(),
          repo: z.string(),
          ref: z.string().nullable().optional(),
          sha: z.string().optional(),
          prId: z.number().nullable().optional(),
        }),
        z.object({
          type: z.literal("github-limited"),
          repoId: z.union([z.string(), z.number()]),
          ref: z.string().nullable().optional(),
          sha: z.string().optional(),
          prId: z.number().nullable().optional(),
        }),
        z.object({
          type: z.literal("github-limited"),
          org: z.string(),
          repo: z.string(),
          ref: z.string().nullable().optional(),
          sha: z.string().optional(),
          prId: z.number().nullable().optional(),
        }),
        z.object({
          type: z.literal("gitlab"),
          projectId: z.union([z.string(), z.number()]),
          ref: z.string().nullable().optional(),
          sha: z.string().optional(),
          prId: z.number().nullable().optional(),
        }),
        z.object({
          type: z.literal("bitbucket"),
          workspaceUuid: z.string().optional(),
          repoUuid: z.string(),
          ref: z.string().nullable().optional(),
          sha: z.string().optional(),
          prId: z.number().nullable().optional(),
        }),
        z.object({
          type: z.literal("bitbucket"),
          owner: z.string(),
          slug: z.string(),
          ref: z.string().nullable().optional(),
          sha: z.string().optional(),
          prId: z.number().nullable().optional(),
        }),
        z.object({
          type: z.literal("vercel"),
          org: z.string().optional(),
          repo: z.string().optional(),
          sha: z.string(),
          repoPushedAt: z.number().optional(),
          ref: z.string().nullable().optional(),
          prId: z.number().nullable().optional(),
        }),
        z.object({
          type: z.literal("cursor-origin"),
          repoId: z.string(),
          owner: z.string().optional(),
          repo: z.string().optional(),
          ref: z.string().nullable().optional(),
          sha: z.string().optional(),
          prId: z.number().nullable().optional(),
        }),
        z.object({
          type: z.literal("custom"),
          ref: z.string(),
          sha: z.string(),
          gitUrl: z.string(),
        }),
        z.object({
          type: z.literal("github"),
          ref: z.string(),
          sha: z.string(),
          repoId: z.number(),
          org: z.string().optional(),
          repo: z.string().optional(),
        }),
        z.object({
          type: z.literal("github-custom-host"),
          host: z.string(),
          ref: z.string(),
          sha: z.string(),
          repoId: z.number(),
          org: z.string().optional(),
          repo: z.string().optional(),
        }),
        z.object({
          type: z.literal("github-limited"),
          ref: z.string(),
          sha: z.string(),
          repoId: z.number(),
          org: z.string().optional(),
          repo: z.string().optional(),
        }),
        z.object({
          type: z.literal("gitlab"),
          ref: z.string(),
          sha: z.string(),
          projectId: z.number(),
        }),
        z.object({
          type: z.literal("bitbucket"),
          ref: z.string(),
          sha: z.string(),
          owner: z.string().optional(),
          slug: z.string().optional(),
          workspaceUuid: z.string(),
          repoUuid: z.string(),
        }),
        z.object({
          type: z.literal("vercel"),
          ref: z.string(),
          sha: z.string(),
          org: z.string(),
          repo: z.string(),
          repoPushedAt: z.number().optional(),
        }),
        z.object({
          type: z.literal("cursor-origin"),
          ref: z.string(),
          sha: z.string(),
          repoId: z.string(),
          owner: z.string(),
          repo: z.string(),
        }),
      ])
      .optional(),
    manualProvisioning: z
      .object({
        state: z.enum(["COMPLETE", "PENDING", "TIMEOUT"]),
        completedAt: z.number().optional(),
      })
      .optional(),
    meta: z.record(z.string(), z.string()),
    originCacheRegion: z.string().optional(),
    nodeVersion: z
      .enum(["10.x", "12.x", "14.x", "16.x", "18.x", "20.x", "22.x", "24.x", "8.10.x"])
      .optional(),
    project: z
      .object({ id: z.string(), name: z.string(), framework: z.string().nullable().optional() })
      .optional(),
    prebuilt: z.boolean().optional(),
    readySubstate: z.enum(["PROMOTED", "ROLLING", "STAGED"]).optional(),
    regions: z.array(z.string()),
    softDeletedByRetention: z.boolean().optional(),
    source: z
      .enum([
        "api-trigger-git-deploy",
        "cli",
        "clone/repo",
        "drop",
        "git",
        "git-deploy-hook",
        "import",
        "import/repo",
        "redeploy",
        "v0-web",
      ])
      .optional(),
    undeletedAt: z.number().optional(),
    url: z.string(),
    userConfiguredDeploymentId: z.string().optional(),
    version: z.literal(2),
    oidcTokenClaims: z
      .object({
        iss: z.string(),
        sub: z.string(),
        scope: z.string(),
        aud: z.string(),
        owner: z.string(),
        owner_id: z.string(),
        project: z.string(),
        project_id: z.string(),
        environment: z.string(),
        custom_environment_id: z.string().optional(),
        mfe_group_ids: z.array(z.string()).optional(),
        plan: z.string().optional(),
      })
      .optional(),
    projectId: z.string(),
    plan: z.enum(["enterprise", "hobby", "pro"]),
    connectBuildsEnabled: z.boolean().optional(),
    connectConfigurationId: z.string().optional(),
    createdIn: z.string(),
    crons: z.array(z.object({ schedule: z.string(), path: z.string() })).optional(),
    atproto: z
      .union([
        z.object({ enabled: z.literal(false) }),
        z.object({
          enabled: z.literal(true),
          subscription: z.object({
            collections: z.array(z.string()),
            dids: z.array(z.string()).optional(),
            kinds: z.array(z.enum(["account", "commit", "identity", "sync"])).optional(),
            path: z.string(),
          }),
        }),
      ])
      .optional(),
    functions: z
      .record(
        z.string(),
        z.object({
          architecture: z.enum(["arm64", "x86_64"]).optional(),
          memory: z.number().optional(),
          maxDuration: z.union([z.number(), z.literal("max")]).optional(),
          maxConcurrency: z.number().optional(),
          regions: z.array(z.string()).optional(),
          functionFailoverRegions: z.array(z.string()).optional(),
          runtime: z.string().optional(),
          includeFiles: z.string().optional(),
          excludeFiles: z.string().optional(),
          experimentalTriggers: z
            .array(
              z.union([
                z.object({
                  type: z.literal("queue/v1beta"),
                  consumer: z.string(),
                  topic: z.string(),
                  maxDeliveries: z.number().optional(),
                  retryAfterSeconds: z.number().optional(),
                  initialDelaySeconds: z.number().optional(),
                  maxConcurrency: z.number().optional(),
                }),
                z.object({
                  type: z.literal("queue/v2beta"),
                  topic: z.string(),
                  maxDeliveries: z.number().optional(),
                  retryAfterSeconds: z.number().optional(),
                  initialDelaySeconds: z.number().optional(),
                  maxConcurrency: z.number().optional(),
                }),
                z.object({ type: z.literal("schedule/v1beta") }),
              ]),
            )
            .optional(),
          supportsCancellation: z.boolean().optional(),
        }),
      )
      .nullable()
      .optional(),
    isInstantStatic: z.boolean().optional(),
    monorepoManager: z.string().nullable().optional(),
    ownerId: z.string(),
    passiveConnectConfigurationId: z.string().optional(),
    routes: z
      .array(
        z.union([
          z.object({
            src: z.string(),
            dest: z.string().optional(),
            headers: z.record(z.string(), z.string()).optional(),
            methods: z.array(z.string()).optional(),
            continue: z.boolean().optional(),
            override: z.boolean().optional(),
            caseSensitive: z.boolean().optional(),
            check: z.boolean().optional(),
            important: z.boolean().optional(),
            status: z.number().optional(),
            has: z
              .array(
                z.union([
                  z.object({
                    type: z.literal("host"),
                    value: z.union([
                      z.string(),
                      z.object({
                        eq: z.union([z.string(), z.number()]).optional(),
                        neq: z.string().optional(),
                        inc: z.array(z.string()).optional(),
                        ninc: z.array(z.string()).optional(),
                        pre: z.string().optional(),
                        suf: z.string().optional(),
                        re: z.string().optional(),
                        gt: z.number().optional(),
                        gte: z.number().optional(),
                        lt: z.number().optional(),
                        lte: z.number().optional(),
                      }),
                    ]),
                  }),
                  z.object({
                    type: z.enum(["cookie", "header", "query"]),
                    key: z.string(),
                    value: z
                      .union([
                        z.string(),
                        z.object({
                          eq: z.union([z.string(), z.number()]).optional(),
                          neq: z.string().optional(),
                          inc: z.array(z.string()).optional(),
                          ninc: z.array(z.string()).optional(),
                          pre: z.string().optional(),
                          suf: z.string().optional(),
                          re: z.string().optional(),
                          gt: z.number().optional(),
                          gte: z.number().optional(),
                          lt: z.number().optional(),
                          lte: z.number().optional(),
                        }),
                      ])
                      .optional(),
                  }),
                ]),
              )
              .optional(),
            missing: z
              .array(
                z.union([
                  z.object({
                    type: z.literal("host"),
                    value: z.union([
                      z.string(),
                      z.object({
                        eq: z.union([z.string(), z.number()]).optional(),
                        neq: z.string().optional(),
                        inc: z.array(z.string()).optional(),
                        ninc: z.array(z.string()).optional(),
                        pre: z.string().optional(),
                        suf: z.string().optional(),
                        re: z.string().optional(),
                        gt: z.number().optional(),
                        gte: z.number().optional(),
                        lt: z.number().optional(),
                        lte: z.number().optional(),
                      }),
                    ]),
                  }),
                  z.object({
                    type: z.enum(["cookie", "header", "query"]),
                    key: z.string(),
                    value: z
                      .union([
                        z.string(),
                        z.object({
                          eq: z.union([z.string(), z.number()]).optional(),
                          neq: z.string().optional(),
                          inc: z.array(z.string()).optional(),
                          ninc: z.array(z.string()).optional(),
                          pre: z.string().optional(),
                          suf: z.string().optional(),
                          re: z.string().optional(),
                          gt: z.number().optional(),
                          gte: z.number().optional(),
                          lt: z.number().optional(),
                          lte: z.number().optional(),
                        }),
                      ])
                      .optional(),
                  }),
                ]),
              )
              .optional(),
            mitigate: z.object({ action: z.enum(["challenge", "deny"]) }).optional(),
            transforms: z
              .array(
                z.union([
                  z.object({
                    type: z.enum(["request.headers", "request.query", "response.headers"]),
                    op: z.enum(["append", "delete", "set"]),
                    target: z.object({
                      key: z.union([
                        z.string(),
                        z.object({
                          eq: z.union([z.string(), z.number()]).optional(),
                          neq: z.string().optional(),
                          inc: z.array(z.string()).optional(),
                          ninc: z.array(z.string()).optional(),
                          pre: z.string().optional(),
                          suf: z.string().optional(),
                          gt: z.number().optional(),
                          gte: z.number().optional(),
                          lt: z.number().optional(),
                          lte: z.number().optional(),
                        }),
                      ]),
                    }),
                    args: z.union([z.string(), z.array(z.string())]).optional(),
                    env: z.array(z.string()).optional(),
                  }),
                  z.object({
                    type: z.literal("request.path"),
                    op: z.literal("set"),
                    args: z.string(),
                    env: z.array(z.string()).optional(),
                  }),
                ]),
              )
              .optional(),
            env: z.array(z.string()).optional(),
            locale: z
              .object({
                redirect: z.record(z.string(), z.string()).optional(),
                cookie: z.string().optional(),
              })
              .optional(),
            source: z.string().optional(),
            destination: z
              .union([
                z.string(),
                z.object({
                  type: z.literal("service").optional(),
                  service: z.string(),
                  path: z.string().optional(),
                }),
              ])
              .optional(),
            statusCode: z.number().optional(),
            middlewarePath: z.string().optional(),
            middlewareRawSrc: z.array(z.string()).optional(),
            middleware: z.number().optional(),
            respectOriginCacheControl: z.boolean().optional(),
          }),
          z.object({
            handle: z.enum(["error", "filesystem", "hit", "miss", "resource", "rewrite"]),
            src: z.string().optional(),
            dest: z.string().optional(),
            status: z.number().optional(),
          }),
          z.object({ src: z.string(), continue: z.boolean(), middleware: z.literal(0) }),
        ]),
      )
      .nullable(),
    services: z
      .array(
        z.union([
          z.object({
            schema: z.literal("experimentalServices"),
            name: z.string(),
            type: z.enum(["cron", "job", "web", "worker"]),
            trigger: z.enum(["queue", "schedule", "workflow"]).optional(),
            group: z.string().optional(),
            workspace: z.string(),
            entrypoint: z.string().optional(),
            framework: z.string().optional(),
            builder: z.object({
              use: z.string(),
              src: z.string().optional(),
              config: z
                .object({
                  bunVersion: z.string().optional(),
                  maxLambdaSize: z.string().optional(),
                  includeFiles: z.union([z.string(), z.array(z.string())]).optional(),
                  excludeFiles: z.union([z.string(), z.array(z.string())]).optional(),
                  bundle: z.boolean().optional(),
                  ldsflags: z.string().optional(),
                  helpers: z.boolean().optional(),
                  rust: z.string().optional(),
                  debug: z.boolean().optional(),
                  zeroConfig: z.boolean().optional(),
                  import: z.record(z.string(), z.string()).optional(),
                  functions: z
                    .record(
                      z.string(),
                      z.object({
                        architecture: z.enum(["arm64", "x86_64"]).optional(),
                        memory: z.number().optional(),
                        maxDuration: z.union([z.number(), z.literal("max")]).optional(),
                        maxConcurrency: z.number().optional(),
                        regions: z.array(z.string()).optional(),
                        functionFailoverRegions: z.array(z.string()).optional(),
                        runtime: z.string().optional(),
                        includeFiles: z.string().optional(),
                        excludeFiles: z.string().optional(),
                        experimentalTriggers: z
                          .array(
                            z.union([
                              z.object({
                                type: z.literal("queue/v1beta"),
                                consumer: z.string(),
                                topic: z.string(),
                                maxDeliveries: z.number().optional(),
                                retryAfterSeconds: z.number().optional(),
                                initialDelaySeconds: z.number().optional(),
                                maxConcurrency: z.number().optional(),
                              }),
                              z.object({
                                type: z.literal("queue/v2beta"),
                                topic: z.string(),
                                maxDeliveries: z.number().optional(),
                                retryAfterSeconds: z.number().optional(),
                                initialDelaySeconds: z.number().optional(),
                                maxConcurrency: z.number().optional(),
                              }),
                              z.object({ type: z.literal("schedule/v1beta") }),
                            ]),
                          )
                          .optional(),
                        supportsCancellation: z.boolean().optional(),
                      }),
                    )
                    .optional(),
                  projectSettings: z
                    .object({
                      framework: z.string().nullable().optional(),
                      devCommand: z.string().nullable().optional(),
                      installCommand: z.string().nullable().optional(),
                      buildCommand: z.string().nullable().optional(),
                      outputDirectory: z.string().nullable().optional(),
                      rootDirectory: z.string().nullable().optional(),
                      nodeVersion: z.string().optional(),
                      monorepoManager: z.string().nullable().optional(),
                      createdAt: z.number().optional(),
                      autoExposeSystemEnvs: z.boolean().optional(),
                      sourceFilesOutsideRootDirectory: z.boolean().optional(),
                      directoryListing: z.boolean().optional(),
                      gitForkProtection: z.boolean().optional(),
                      commandForIgnoringBuildStep: z.string().nullable().optional(),
                    })
                    .optional(),
                  outputDirectory: z.string().optional(),
                  installCommand: z.string().optional(),
                  buildCommand: z.string().optional(),
                  devCommand: z.string().optional(),
                  framework: z.string().nullable().optional(),
                  nodeVersion: z.string().optional(),
                  middleware: z.boolean().optional(),
                  middlewareRuntime: z.literal("nodejs").optional(),
                  middlewareMatcher: z.union([z.string(), z.array(z.string())]).optional(),
                  serviceName: z.string().optional(),
                })
                .optional(),
            }),
            runtime: z.string().optional(),
            buildCommand: z.string().optional(),
            installCommand: z.string().optional(),
            preDeployCommand: z.string().optional(),
            routePrefix: z.string().optional(),
            routePrefixSource: z.enum(["configured", "generated"]).optional(),
            subdomain: z.string().optional(),
            schedule: z.union([z.string(), z.array(z.string())]).optional(),
            handlerFunction: z.string().optional(),
            topics: z
              .union([
                z.array(z.string()),
                z.array(
                  z.object({
                    topic: z.string(),
                    retryAfterSeconds: z.number().optional(),
                    initialDelaySeconds: z.number().optional(),
                  }),
                ),
              ])
              .optional(),
            env: z
              .record(z.string(), z.object({ type: z.literal("service-ref"), service: z.string() }))
              .optional(),
          }),
          z.object({
            schema: z.literal("experimentalServicesV2"),
            name: z.string(),
            root: z.string(),
            framework: z.string().optional(),
            runtime: z.string().optional(),
            entrypoint: z.string().optional(),
            command: z.array(z.string()).optional(),
            builder: z.object({
              use: z.string(),
              src: z.string().optional(),
              config: z
                .object({
                  bunVersion: z.string().optional(),
                  maxLambdaSize: z.string().optional(),
                  includeFiles: z.union([z.string(), z.array(z.string())]).optional(),
                  excludeFiles: z.union([z.string(), z.array(z.string())]).optional(),
                  bundle: z.boolean().optional(),
                  ldsflags: z.string().optional(),
                  helpers: z.boolean().optional(),
                  rust: z.string().optional(),
                  debug: z.boolean().optional(),
                  zeroConfig: z.boolean().optional(),
                  import: z.record(z.string(), z.string()).optional(),
                  functions: z
                    .record(
                      z.string(),
                      z.object({
                        architecture: z.enum(["arm64", "x86_64"]).optional(),
                        memory: z.number().optional(),
                        maxDuration: z.union([z.number(), z.literal("max")]).optional(),
                        maxConcurrency: z.number().optional(),
                        regions: z.array(z.string()).optional(),
                        functionFailoverRegions: z.array(z.string()).optional(),
                        runtime: z.string().optional(),
                        includeFiles: z.string().optional(),
                        excludeFiles: z.string().optional(),
                        experimentalTriggers: z
                          .array(
                            z.union([
                              z.object({
                                type: z.literal("queue/v1beta"),
                                consumer: z.string(),
                                topic: z.string(),
                                maxDeliveries: z.number().optional(),
                                retryAfterSeconds: z.number().optional(),
                                initialDelaySeconds: z.number().optional(),
                                maxConcurrency: z.number().optional(),
                              }),
                              z.object({
                                type: z.literal("queue/v2beta"),
                                topic: z.string(),
                                maxDeliveries: z.number().optional(),
                                retryAfterSeconds: z.number().optional(),
                                initialDelaySeconds: z.number().optional(),
                                maxConcurrency: z.number().optional(),
                              }),
                              z.object({ type: z.literal("schedule/v1beta") }),
                            ]),
                          )
                          .optional(),
                        supportsCancellation: z.boolean().optional(),
                      }),
                    )
                    .optional(),
                  projectSettings: z
                    .object({
                      framework: z.string().nullable().optional(),
                      devCommand: z.string().nullable().optional(),
                      installCommand: z.string().nullable().optional(),
                      buildCommand: z.string().nullable().optional(),
                      outputDirectory: z.string().nullable().optional(),
                      rootDirectory: z.string().nullable().optional(),
                      nodeVersion: z.string().optional(),
                      monorepoManager: z.string().nullable().optional(),
                      createdAt: z.number().optional(),
                      autoExposeSystemEnvs: z.boolean().optional(),
                      sourceFilesOutsideRootDirectory: z.boolean().optional(),
                      directoryListing: z.boolean().optional(),
                      gitForkProtection: z.boolean().optional(),
                      commandForIgnoringBuildStep: z.string().nullable().optional(),
                    })
                    .optional(),
                  outputDirectory: z.string().optional(),
                  installCommand: z.string().optional(),
                  buildCommand: z.string().optional(),
                  devCommand: z.string().optional(),
                  framework: z.string().nullable().optional(),
                  nodeVersion: z.string().optional(),
                  middleware: z.boolean().optional(),
                  middlewareRuntime: z.literal("nodejs").optional(),
                  middlewareMatcher: z.union([z.string(), z.array(z.string())]).optional(),
                  serviceName: z.string().optional(),
                })
                .optional(),
            }),
            installCommand: z.string().optional(),
            buildCommand: z.string().optional(),
            devCommand: z.string().optional(),
            ignoreCommand: z.string().optional(),
            outputDirectory: z.string().optional(),
            bindings: z
              .array(
                z.object({
                  type: z.literal("service").optional(),
                  service: z.string(),
                  format: z.literal("url"),
                  env: z.string(),
                }),
              )
              .optional(),
            functions: z
              .record(
                z.string(),
                z.object({
                  architecture: z.enum(["arm64", "x86_64"]).optional(),
                  memory: z.number().optional(),
                  maxDuration: z.union([z.number(), z.literal("max")]).optional(),
                  maxConcurrency: z.number().optional(),
                  regions: z.array(z.string()).optional(),
                  functionFailoverRegions: z.array(z.string()).optional(),
                  runtime: z.string().optional(),
                  includeFiles: z.string().optional(),
                  excludeFiles: z.string().optional(),
                  experimentalTriggers: z
                    .array(
                      z.union([
                        z.object({
                          type: z.literal("queue/v1beta"),
                          consumer: z.string(),
                          topic: z.string(),
                          maxDeliveries: z.number().optional(),
                          retryAfterSeconds: z.number().optional(),
                          initialDelaySeconds: z.number().optional(),
                          maxConcurrency: z.number().optional(),
                        }),
                        z.object({
                          type: z.literal("queue/v2beta"),
                          topic: z.string(),
                          maxDeliveries: z.number().optional(),
                          retryAfterSeconds: z.number().optional(),
                          initialDelaySeconds: z.number().optional(),
                          maxConcurrency: z.number().optional(),
                        }),
                        z.object({ type: z.literal("schedule/v1beta") }),
                      ]),
                    )
                    .optional(),
                  supportsCancellation: z.boolean().optional(),
                }),
              )
              .optional(),
            headers: z
              .array(
                z.object({
                  source: z.string(),
                  headers: z.array(z.object({ key: z.string(), value: z.string() })),
                  has: z
                    .array(
                      z.union([
                        z.object({
                          type: z.literal("host"),
                          value: z.union([
                            z.string(),
                            z.object({
                              eq: z.union([z.string(), z.number()]).optional(),
                              neq: z.string().optional(),
                              inc: z.array(z.string()).optional(),
                              ninc: z.array(z.string()).optional(),
                              pre: z.string().optional(),
                              suf: z.string().optional(),
                              re: z.string().optional(),
                              gt: z.number().optional(),
                              gte: z.number().optional(),
                              lt: z.number().optional(),
                              lte: z.number().optional(),
                            }),
                          ]),
                        }),
                        z.object({
                          type: z.enum(["cookie", "header", "query"]),
                          key: z.string(),
                          value: z
                            .union([
                              z.string(),
                              z.object({
                                eq: z.union([z.string(), z.number()]).optional(),
                                neq: z.string().optional(),
                                inc: z.array(z.string()).optional(),
                                ninc: z.array(z.string()).optional(),
                                pre: z.string().optional(),
                                suf: z.string().optional(),
                                re: z.string().optional(),
                                gt: z.number().optional(),
                                gte: z.number().optional(),
                                lt: z.number().optional(),
                                lte: z.number().optional(),
                              }),
                            ])
                            .optional(),
                        }),
                      ]),
                    )
                    .optional(),
                  missing: z
                    .array(
                      z.union([
                        z.object({
                          type: z.literal("host"),
                          value: z.union([
                            z.string(),
                            z.object({
                              eq: z.union([z.string(), z.number()]).optional(),
                              neq: z.string().optional(),
                              inc: z.array(z.string()).optional(),
                              ninc: z.array(z.string()).optional(),
                              pre: z.string().optional(),
                              suf: z.string().optional(),
                              re: z.string().optional(),
                              gt: z.number().optional(),
                              gte: z.number().optional(),
                              lt: z.number().optional(),
                              lte: z.number().optional(),
                            }),
                          ]),
                        }),
                        z.object({
                          type: z.enum(["cookie", "header", "query"]),
                          key: z.string(),
                          value: z
                            .union([
                              z.string(),
                              z.object({
                                eq: z.union([z.string(), z.number()]).optional(),
                                neq: z.string().optional(),
                                inc: z.array(z.string()).optional(),
                                ninc: z.array(z.string()).optional(),
                                pre: z.string().optional(),
                                suf: z.string().optional(),
                                re: z.string().optional(),
                                gt: z.number().optional(),
                                gte: z.number().optional(),
                                lt: z.number().optional(),
                                lte: z.number().optional(),
                              }),
                            ])
                            .optional(),
                        }),
                      ]),
                    )
                    .optional(),
                }),
              )
              .optional(),
            redirects: z
              .array(
                z.object({
                  source: z.string(),
                  destination: z.string(),
                  permanent: z.boolean().optional(),
                  statusCode: z.number().optional(),
                  has: z
                    .array(
                      z.union([
                        z.object({
                          type: z.literal("host"),
                          value: z.union([
                            z.string(),
                            z.object({
                              eq: z.union([z.string(), z.number()]).optional(),
                              neq: z.string().optional(),
                              inc: z.array(z.string()).optional(),
                              ninc: z.array(z.string()).optional(),
                              pre: z.string().optional(),
                              suf: z.string().optional(),
                              re: z.string().optional(),
                              gt: z.number().optional(),
                              gte: z.number().optional(),
                              lt: z.number().optional(),
                              lte: z.number().optional(),
                            }),
                          ]),
                        }),
                        z.object({
                          type: z.enum(["cookie", "header", "query"]),
                          key: z.string(),
                          value: z
                            .union([
                              z.string(),
                              z.object({
                                eq: z.union([z.string(), z.number()]).optional(),
                                neq: z.string().optional(),
                                inc: z.array(z.string()).optional(),
                                ninc: z.array(z.string()).optional(),
                                pre: z.string().optional(),
                                suf: z.string().optional(),
                                re: z.string().optional(),
                                gt: z.number().optional(),
                                gte: z.number().optional(),
                                lt: z.number().optional(),
                                lte: z.number().optional(),
                              }),
                            ])
                            .optional(),
                        }),
                      ]),
                    )
                    .optional(),
                  missing: z
                    .array(
                      z.union([
                        z.object({
                          type: z.literal("host"),
                          value: z.union([
                            z.string(),
                            z.object({
                              eq: z.union([z.string(), z.number()]).optional(),
                              neq: z.string().optional(),
                              inc: z.array(z.string()).optional(),
                              ninc: z.array(z.string()).optional(),
                              pre: z.string().optional(),
                              suf: z.string().optional(),
                              re: z.string().optional(),
                              gt: z.number().optional(),
                              gte: z.number().optional(),
                              lt: z.number().optional(),
                              lte: z.number().optional(),
                            }),
                          ]),
                        }),
                        z.object({
                          type: z.enum(["cookie", "header", "query"]),
                          key: z.string(),
                          value: z
                            .union([
                              z.string(),
                              z.object({
                                eq: z.union([z.string(), z.number()]).optional(),
                                neq: z.string().optional(),
                                inc: z.array(z.string()).optional(),
                                ninc: z.array(z.string()).optional(),
                                pre: z.string().optional(),
                                suf: z.string().optional(),
                                re: z.string().optional(),
                                gt: z.number().optional(),
                                gte: z.number().optional(),
                                lt: z.number().optional(),
                                lte: z.number().optional(),
                              }),
                            ])
                            .optional(),
                        }),
                      ]),
                    )
                    .optional(),
                  env: z.array(z.string()).optional(),
                }),
              )
              .optional(),
            rewrites: z
              .array(
                z.object({
                  source: z.string(),
                  destination: z.union([
                    z.string(),
                    z.object({
                      type: z.literal("service").optional(),
                      service: z.string(),
                      path: z.string().optional(),
                    }),
                  ]),
                  transforms: z
                    .array(
                      z.object({
                        type: z.literal("request.path"),
                        op: z.literal("set"),
                        args: z.string(),
                        env: z.array(z.string()).optional(),
                      }),
                    )
                    .optional(),
                  has: z
                    .array(
                      z.union([
                        z.object({
                          type: z.literal("host"),
                          value: z.union([
                            z.string(),
                            z.object({
                              eq: z.union([z.string(), z.number()]).optional(),
                              neq: z.string().optional(),
                              inc: z.array(z.string()).optional(),
                              ninc: z.array(z.string()).optional(),
                              pre: z.string().optional(),
                              suf: z.string().optional(),
                              re: z.string().optional(),
                              gt: z.number().optional(),
                              gte: z.number().optional(),
                              lt: z.number().optional(),
                              lte: z.number().optional(),
                            }),
                          ]),
                        }),
                        z.object({
                          type: z.enum(["cookie", "header", "query"]),
                          key: z.string(),
                          value: z
                            .union([
                              z.string(),
                              z.object({
                                eq: z.union([z.string(), z.number()]).optional(),
                                neq: z.string().optional(),
                                inc: z.array(z.string()).optional(),
                                ninc: z.array(z.string()).optional(),
                                pre: z.string().optional(),
                                suf: z.string().optional(),
                                re: z.string().optional(),
                                gt: z.number().optional(),
                                gte: z.number().optional(),
                                lt: z.number().optional(),
                                lte: z.number().optional(),
                              }),
                            ])
                            .optional(),
                        }),
                      ]),
                    )
                    .optional(),
                  missing: z
                    .array(
                      z.union([
                        z.object({
                          type: z.literal("host"),
                          value: z.union([
                            z.string(),
                            z.object({
                              eq: z.union([z.string(), z.number()]).optional(),
                              neq: z.string().optional(),
                              inc: z.array(z.string()).optional(),
                              ninc: z.array(z.string()).optional(),
                              pre: z.string().optional(),
                              suf: z.string().optional(),
                              re: z.string().optional(),
                              gt: z.number().optional(),
                              gte: z.number().optional(),
                              lt: z.number().optional(),
                              lte: z.number().optional(),
                            }),
                          ]),
                        }),
                        z.object({
                          type: z.enum(["cookie", "header", "query"]),
                          key: z.string(),
                          value: z
                            .union([
                              z.string(),
                              z.object({
                                eq: z.union([z.string(), z.number()]).optional(),
                                neq: z.string().optional(),
                                inc: z.array(z.string()).optional(),
                                ninc: z.array(z.string()).optional(),
                                pre: z.string().optional(),
                                suf: z.string().optional(),
                                re: z.string().optional(),
                                gt: z.number().optional(),
                                gte: z.number().optional(),
                                lt: z.number().optional(),
                                lte: z.number().optional(),
                              }),
                            ])
                            .optional(),
                        }),
                      ]),
                    )
                    .optional(),
                  statusCode: z.number().optional(),
                  env: z.array(z.string()).optional(),
                  respectOriginCacheControl: z.boolean().optional(),
                }),
              )
              .optional(),
            routes: z
              .array(
                z.union([
                  z.object({
                    src: z.string(),
                    dest: z.string().optional(),
                    headers: z.record(z.string(), z.string()).optional(),
                    methods: z.array(z.string()).optional(),
                    continue: z.boolean().optional(),
                    override: z.boolean().optional(),
                    caseSensitive: z.boolean().optional(),
                    check: z.boolean().optional(),
                    important: z.boolean().optional(),
                    status: z.number().optional(),
                    has: z
                      .array(
                        z.union([
                          z.object({
                            type: z.literal("host"),
                            value: z.union([
                              z.string(),
                              z.object({
                                eq: z.union([z.string(), z.number()]).optional(),
                                neq: z.string().optional(),
                                inc: z.array(z.string()).optional(),
                                ninc: z.array(z.string()).optional(),
                                pre: z.string().optional(),
                                suf: z.string().optional(),
                                re: z.string().optional(),
                                gt: z.number().optional(),
                                gte: z.number().optional(),
                                lt: z.number().optional(),
                                lte: z.number().optional(),
                              }),
                            ]),
                          }),
                          z.object({
                            type: z.enum(["cookie", "header", "query"]),
                            key: z.string(),
                            value: z
                              .union([
                                z.string(),
                                z.object({
                                  eq: z.union([z.string(), z.number()]).optional(),
                                  neq: z.string().optional(),
                                  inc: z.array(z.string()).optional(),
                                  ninc: z.array(z.string()).optional(),
                                  pre: z.string().optional(),
                                  suf: z.string().optional(),
                                  re: z.string().optional(),
                                  gt: z.number().optional(),
                                  gte: z.number().optional(),
                                  lt: z.number().optional(),
                                  lte: z.number().optional(),
                                }),
                              ])
                              .optional(),
                          }),
                        ]),
                      )
                      .optional(),
                    missing: z
                      .array(
                        z.union([
                          z.object({
                            type: z.literal("host"),
                            value: z.union([
                              z.string(),
                              z.object({
                                eq: z.union([z.string(), z.number()]).optional(),
                                neq: z.string().optional(),
                                inc: z.array(z.string()).optional(),
                                ninc: z.array(z.string()).optional(),
                                pre: z.string().optional(),
                                suf: z.string().optional(),
                                re: z.string().optional(),
                                gt: z.number().optional(),
                                gte: z.number().optional(),
                                lt: z.number().optional(),
                                lte: z.number().optional(),
                              }),
                            ]),
                          }),
                          z.object({
                            type: z.enum(["cookie", "header", "query"]),
                            key: z.string(),
                            value: z
                              .union([
                                z.string(),
                                z.object({
                                  eq: z.union([z.string(), z.number()]).optional(),
                                  neq: z.string().optional(),
                                  inc: z.array(z.string()).optional(),
                                  ninc: z.array(z.string()).optional(),
                                  pre: z.string().optional(),
                                  suf: z.string().optional(),
                                  re: z.string().optional(),
                                  gt: z.number().optional(),
                                  gte: z.number().optional(),
                                  lt: z.number().optional(),
                                  lte: z.number().optional(),
                                }),
                              ])
                              .optional(),
                          }),
                        ]),
                      )
                      .optional(),
                    mitigate: z.object({ action: z.enum(["challenge", "deny"]) }).optional(),
                    transforms: z
                      .array(
                        z.union([
                          z.object({
                            type: z.enum(["request.headers", "request.query", "response.headers"]),
                            op: z.enum(["append", "delete", "set"]),
                            target: z.object({
                              key: z.union([
                                z.string(),
                                z.object({
                                  eq: z.union([z.string(), z.number()]).optional(),
                                  neq: z.string().optional(),
                                  inc: z.array(z.string()).optional(),
                                  ninc: z.array(z.string()).optional(),
                                  pre: z.string().optional(),
                                  suf: z.string().optional(),
                                  gt: z.number().optional(),
                                  gte: z.number().optional(),
                                  lt: z.number().optional(),
                                  lte: z.number().optional(),
                                }),
                              ]),
                            }),
                            args: z.union([z.string(), z.array(z.string())]).optional(),
                            env: z.array(z.string()).optional(),
                          }),
                          z.object({
                            type: z.literal("request.path"),
                            op: z.literal("set"),
                            args: z.string(),
                            env: z.array(z.string()).optional(),
                          }),
                        ]),
                      )
                      .optional(),
                    env: z.array(z.string()).optional(),
                    locale: z
                      .object({
                        redirect: z.record(z.string(), z.string()).optional(),
                        cookie: z.string().optional(),
                      })
                      .optional(),
                    source: z.string().optional(),
                    destination: z
                      .union([
                        z.string(),
                        z.object({
                          type: z.literal("service").optional(),
                          service: z.string(),
                          path: z.string().optional(),
                        }),
                      ])
                      .optional(),
                    statusCode: z.number().optional(),
                    middlewarePath: z.string().optional(),
                    middlewareRawSrc: z.array(z.string()).optional(),
                    middleware: z.number().optional(),
                    respectOriginCacheControl: z.boolean().optional(),
                  }),
                  z.object({
                    handle: z.enum(["error", "filesystem", "hit", "miss", "resource", "rewrite"]),
                    src: z.string().optional(),
                    dest: z.string().optional(),
                    status: z.number().optional(),
                  }),
                ]),
              )
              .optional(),
            cleanUrls: z.boolean().optional(),
            trailingSlash: z.boolean().optional(),
          }),
        ]),
      )
      .optional(),
    gitRepo: z
      .union([
        z.object({
          namespace: z.string(),
          projectId: z.number(),
          type: z.literal("gitlab"),
          url: z.string(),
          path: z.string(),
          defaultBranch: z.string(),
          name: z.string(),
          private: z.boolean(),
          ownerType: z.enum(["team", "user"]),
        }),
        z.object({
          org: z.string(),
          repo: z.string(),
          repoId: z.number(),
          type: z.literal("github"),
          repoOwnerId: z.number(),
          path: z.string(),
          defaultBranch: z.string(),
          name: z.string(),
          private: z.boolean(),
          ownerType: z.enum(["team", "user"]),
        }),
        z.object({
          owner: z.string(),
          repoUuid: z.string(),
          slug: z.string(),
          type: z.literal("bitbucket"),
          workspaceUuid: z.string(),
          path: z.string(),
          defaultBranch: z.string(),
          name: z.string(),
          private: z.boolean(),
          ownerType: z.enum(["team", "user"]),
        }),
        z.object({
          org: z.string(),
          repo: z.string(),
          type: z.literal("vercel"),
          path: z.string(),
          defaultBranch: z.string(),
          name: z.string(),
          private: z.boolean(),
          ownerType: z.enum(["team", "user"]),
        }),
        z.object({
          owner: z.string(),
          repo: z.string(),
          repoId: z.string(),
          type: z.literal("cursor-origin"),
          path: z.string(),
          defaultBranch: z.string(),
          name: z.string(),
          private: z.boolean(),
          ownerType: z.enum(["team", "user"]),
        }),
      ])
      .nullable()
      .optional(),
    flags: z
      .union([
        z.object({
          definitions: z.record(
            z.string(),
            z.object({
              options: z
                .array(z.object({ value: flagJSONValue, label: z.string().optional() }))
                .optional(),
              url: z.string().optional(),
              description: z.string().optional(),
            }),
          ),
        }),
        z.array(z.object({})),
      ])
      .optional(),
    microfrontends: z
      .union([
        z.object({
          isDefaultApp: z.literal(false).optional(),
          defaultAppProjectName: z.string(),
          defaultRoute: z.string().optional(),
          groupIds: z.array(z.string()),
        }),
        z.object({
          isDefaultApp: z.literal(true),
          mfeConfigUploadState: z.enum(["no_config", "success", "waiting_on_build"]).optional(),
          defaultAppProjectName: z.string(),
          defaultRoute: z.string().optional(),
          groupIds: z.array(z.string()),
        }),
      ])
      .optional(),
    platform: z
      .object({
        source: z.object({ name: z.string() }),
        origin: z.object({ type: z.enum(["id", "url"]), value: z.string() }),
        creator: z.object({ name: z.string(), avatar: z.string().optional() }),
        meta: z.record(z.string(), z.string()).optional(),
      })
      .optional(),
    config: z
      .object({
        version: z.number().optional(),
        functionType: z.enum(["fluid", "standard"]),
        functionMemoryType: z.enum([
          "performance",
          "performance_xl",
          "standard",
          "standard_legacy",
        ]),
        functionTimeout: z.number().nullable(),
        secureComputePrimaryRegion: z.string().nullable(),
        secureComputeFallbackRegion: z.string().nullable(),
        isUsingActiveCPU: z.boolean().optional(),
        resourceConfig: z
          .object({
            buildQueue: z
              .object({
                configuration: z
                  .enum(["SKIP_NAMESPACE_QUEUE", "WAIT_FOR_NAMESPACE_QUEUE"])
                  .optional(),
              })
              .optional(),
            elasticConcurrency: z
              .enum(["PROJECT_SETTING", "SKIP_QUEUE", "TEAM_SETTING"])
              .optional(),
            buildMachine: z
              .object({
                purchaseType: z
                  .enum(["basic", "enhanced", "standard", "turbo", "null"])
                  .nullable()
                  .optional(),
              })
              .optional(),
          })
          .optional(),
      })
      .optional(),
    checks: z
      .object({
        "deployment-alias": z.object({
          state: z.enum(["failed", "pending", "succeeded"]),
          startedAt: z.number(),
          completedAt: z.number().optional(),
        }),
      })
      .optional(),
    seatBlock: z
      .object({
        blockCode: z.enum(["COMMIT_AUTHOR_REQUIRED", "TEAM_ACCESS_REQUIRED"]),
        userId: z.string().optional(),
        isVerified: z.boolean().optional(),
        gitUserId: z.union([z.string(), z.number()]).optional(),
        gitProvider: z.enum(["bitbucket", "github", "gitlab"]).optional(),
      })
      .optional(),
    attribution: z
      .object({
        commitMeta: z
          .object({
            email: z.string().optional(),
            name: z.string().optional(),
            isVerified: z.boolean().optional(),
          })
          .optional(),
        gitUser: z
          .object({
            id: z.union([z.string(), z.number()]),
            login: z.string(),
            type: z.string().optional(),
            provider: z.string().optional(),
          })
          .optional(),
        vercelUser: z
          .object({
            id: z.string(),
            username: z.string(),
            teamRoles: z.array(z.string()).optional(),
          })
          .optional(),
      })
      .optional(),
  }),
]);

export type UseCreateApiV13DeploymentsResponse =
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

export type CreateApiV13DeploymentsBody = {
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

export const useCreateApiV13Deployments = (
  options: UseMutationOptions<
    UseCreateApiV13DeploymentsResponse,
    Error,
    UseCreateApiV13DeploymentsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV13DeploymentsArgs) =>
      apiFetch(
        buildUrl("/v13/deployments", {
          forceNew: args.forceNew,
          skipAutoDetectionConfirmation: args.skipAutoDetectionConfirmation,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useCreateApiV13DeploymentsResponse,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["deployments"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
