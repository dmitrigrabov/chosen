import { z } from "zod";
import { flagJSONValue } from "packages/models/src/flagJSONValue.generated.ts";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV13DeploymentsIdOrUrlArgs = {
  idOrUrl: string;
  withGitRepoInfo?: string | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useGetApiV13DeploymentsIdOrUrlResponse = z.union([
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
  z.object({
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
  }),
]);

export const getApiV13DeploymentsIdOrUrlQueryOptions = (args: UseGetApiV13DeploymentsIdOrUrlArgs) =>
  queryOptions({
    queryKey: [
      "GET /v13/deployments/{idOrUrl}",
      "deployments",
      args.idOrUrl,
      args.withGitRepoInfo,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v13/deployments/{idOrUrl}", {
          idOrUrl: args.idOrUrl,
          withGitRepoInfo: args.withGitRepoInfo,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV13DeploymentsIdOrUrlResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV13DeploymentsIdOrUrl = (args: UseGetApiV13DeploymentsIdOrUrlArgs) =>
  useQuery(getApiV13DeploymentsIdOrUrlQueryOptions(args));
