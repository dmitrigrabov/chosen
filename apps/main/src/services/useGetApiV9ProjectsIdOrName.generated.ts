import { z } from "zod";
import { aCLAction } from "packages/models/src/aCLAction.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV9ProjectsIdOrNameResponse = z.object({
  integrations: z
    .array(
      z.object({
        installationId: z.string(),
        resources: z.array(z.object({ externalResourceId: z.string() })).optional(),
      }),
    )
    .optional(),
  accountId: z.string(),
  creator: z
    .union([
      z.object({
        type: z.literal("user"),
        via: z
          .union([
            z.object({
              type: z.literal("app"),
              app: z.object({ id: z.string(), clientId: z.string().optional() }),
            }),
            z.object({
              type: z.literal("integration"),
              integration: z.object({ integrationId: z.string(), configurationId: z.string() }),
            }),
          ])
          .nullable(),
        user: z.object({ id: z.string() }),
      }),
      z.object({
        type: z.literal("app"),
        app: z.object({ id: z.string(), clientId: z.string().optional() }),
      }),
      z.object({
        type: z.literal("integration"),
        integration: z.object({ integrationId: z.string(), configurationId: z.string() }),
      }),
      z.object({ type: z.literal("system") }),
    ])
    .optional(),
  alias: z.array(
    z.object({
      configuredBy: z.enum(["A", "CNAME", "dns-01", "http", "null"]).nullable().optional(),
      configuredChangedAt: z.number().nullable().optional(),
      createdAt: z.number().nullable().optional(),
      deployment: z
        .object({
          id: z.string(),
          alias: z.array(z.string()).optional(),
          aliasAssigned: z.union([z.number(), z.boolean()]).nullable().optional(),
          aliasError: z.object({ code: z.string(), message: z.string() }).nullable().optional(),
          aliasFinal: z.string().nullable().optional(),
          automaticAliases: z.array(z.string()).optional(),
          branchMatcher: z
            .object({ type: z.enum(["endsWith", "equals", "startsWith"]), pattern: z.string() })
            .optional(),
          buildingAt: z.number().optional(),
          builds: z
            .array(
              z.object({
                use: z.string(),
                src: z.string().optional(),
                dest: z.string().optional(),
              }),
            )
            .optional(),
          checksConclusion: z.enum(["canceled", "failed", "skipped", "succeeded"]).optional(),
          checksState: z.enum(["completed", "registered", "running"]).optional(),
          connectBuildsEnabled: z.boolean().optional(),
          connectConfigurationId: z.string().optional(),
          createdAt: z.number(),
          createdIn: z.string(),
          creator: z
            .object({
              email: z.string(),
              githubLogin: z.string().optional(),
              gitlabLogin: z.string().optional(),
              uid: z.string(),
              username: z.string(),
            })
            .nullable(),
          deletedAt: z.number().optional(),
          deploymentHostname: z.string(),
          forced: z.boolean().optional(),
          name: z.string(),
          meta: z.record(z.string(), z.string()).optional(),
          monorepoManager: z.string().nullable().optional(),
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
          plan: z.enum(["enterprise", "hobby", "pro"]),
          previewCommentsEnabled: z.boolean().optional(),
          private: z.boolean(),
          readyAt: z.number().optional(),
          readyState: z.enum([
            "BLOCKED",
            "BUILDING",
            "CANCELED",
            "ERROR",
            "INITIALIZING",
            "QUEUED",
            "READY",
          ]),
          readySubstate: z.enum(["PROMOTED", "ROLLING", "STAGED"]).optional(),
          requestedAt: z.number().optional(),
          target: z.string().nullable().optional(),
          teamId: z.string().nullable().optional(),
          type: z.literal("LAMBDAS"),
          url: z.string(),
          userId: z.string().optional(),
          withCache: z.boolean().optional(),
        })
        .nullable(),
      domain: z.string(),
      environment: z.enum(["preview", "production"]),
      gitBranch: z.string().nullable().optional(),
      redirect: z.string().nullable().optional(),
      redirectStatusCode: z
        .union([z.literal(301), z.literal(302), z.literal(307), z.literal(308), z.literal(null)])
        .nullable()
        .optional(),
      target: z.enum(["PREVIEW", "PRODUCTION", "STAGING"]),
    }),
  ),
  analytics: z
    .object({
      id: z.string(),
      canceledAt: z.number().nullable().optional(),
      disabledAt: z.number(),
      enabledAt: z.number(),
      paidAt: z.number().optional(),
      sampleRatePercent: z.number().nullable().optional(),
      spendLimitInDollars: z.number().nullable().optional(),
    })
    .optional(),
  appliedCve55182Migration: z.boolean().optional(),
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
  autoExposeSystemEnvs: z.boolean().optional(),
  autoAssignCustomDomains: z.boolean().optional(),
  autoAssignCustomDomainsUpdatedBy: z.string().optional(),
  buildCommand: z.string().nullable().optional(),
  commandForIgnoringBuildStep: z.string().nullable().optional(),
  connectConfigurations: z
    .array(
      z.object({
        envId: z.union([z.string(), z.enum(["preview", "production"])]),
        connectConfigurationId: z.string(),
        dc: z.string().optional(),
        passive: z.boolean(),
        buildsEnabled: z.boolean(),
        aws: z
          .object({ subnetIds: z.array(z.string()), securityGroupId: z.string().optional() })
          .optional(),
        createdAt: z.number(),
        updatedAt: z.number(),
      }),
    )
    .nullable()
    .optional(),
  connectConfigurationId: z.string().nullable().optional(),
  connectBuildsEnabled: z.boolean().optional(),
  passiveConnectConfigurationId: z.string().nullable().optional(),
  createdAt: z.number().optional(),
  customerSupportCodeVisibility: z.boolean().optional(),
  crons: z
    .object({
      enabledAt: z.number(),
      disabledAt: z.number().nullable(),
      updatedAt: z.number(),
      deploymentId: z.string().nullable(),
      definitions: z.array(
        z.object({
          host: z.string(),
          path: z.string(),
          schedule: z.string(),
          source: z.literal("api").optional(),
          description: z.string().optional(),
          hostInferred: z.boolean().optional(),
        }),
      ),
    })
    .optional(),
  dataCache: z
    .object({
      userDisabled: z.boolean(),
      storageSizeBytes: z.number().nullable().optional(),
      unlimited: z.boolean().optional(),
    })
    .optional(),
  deploymentExpiration: z.object({
    expirationDays: z.number().optional(),
    expirationDaysProduction: z.number().optional(),
    expirationDaysCanceled: z.number().optional(),
    expirationDaysErrored: z.number().optional(),
    deploymentsToKeep: z.number().optional(),
  }),
  expiration: z
    .union([
      z.object({ expiresAt: z.number() }),
      z.object({ lockedAt: z.number(), lockedBy: z.string() }),
    ])
    .optional(),
  devCommand: z.string().nullable().optional(),
  directoryListing: z.boolean(),
  installCommand: z.string().nullable().optional(),
  env: z
    .array(
      z.object({
        target: z
          .union([
            z.array(z.enum(["development", "development", "preview", "preview", "production"])),
            z.enum(["production", "preview", "development"]),
          ])
          .optional(),
        type: z.enum(["encrypted", "plain", "secret", "sensitive", "system"]),
        sunsetSecretId: z.string().optional(),
        legacyValue: z.string().optional(),
        decrypted: z.boolean().optional(),
        value: z.string(),
        vsmValue: z.string().optional(),
        id: z.string().optional(),
        key: z.string(),
        configurationId: z.string().nullable().optional(),
        createdAt: z.number().optional(),
        updatedAt: z.number().optional(),
        createdBy: z.string().nullable().optional(),
        updatedBy: z.string().nullable().optional(),
        gitBranch: z.string().optional(),
        visibility: z.enum(["config", "secret"]).optional(),
        edgeConfigId: z.string().nullable().optional(),
        edgeConfigTokenId: z.string().nullable().optional(),
        contentHint: z
          .union([
            z.object({ type: z.literal("redis-url"), storeId: z.string() }),
            z.object({ type: z.literal("redis-rest-api-url"), storeId: z.string() }),
            z.object({ type: z.literal("redis-rest-api-token"), storeId: z.string() }),
            z.object({ type: z.literal("redis-rest-api-read-only-token"), storeId: z.string() }),
            z.object({ type: z.literal("blob-read-write-token"), storeId: z.string() }),
            z.object({ type: z.literal("blob-store-id"), storeId: z.string() }),
            z.object({ type: z.literal("blob-webhook-public-key"), storeId: z.string() }),
            z.object({ type: z.literal("postgres-url"), storeId: z.string() }),
            z.object({ type: z.literal("postgres-url-non-pooling"), storeId: z.string() }),
            z.object({ type: z.literal("postgres-prisma-url"), storeId: z.string() }),
            z.object({ type: z.literal("postgres-user"), storeId: z.string() }),
            z.object({ type: z.literal("postgres-host"), storeId: z.string() }),
            z.object({ type: z.literal("postgres-password"), storeId: z.string() }),
            z.object({ type: z.literal("postgres-database"), storeId: z.string() }),
            z.object({ type: z.literal("postgres-url-no-ssl"), storeId: z.string() }),
            z.object({
              type: z.literal("integration-store-secret"),
              storeId: z.string(),
              integrationId: z.string(),
              integrationProductId: z.string(),
              integrationConfigurationId: z.string(),
            }),
            z.object({ type: z.literal("flags-connection-string"), projectId: z.string() }),
          ])
          .nullable()
          .optional(),
        internalContentHint: z
          .object({ type: z.literal("flags-secret"), encryptedValue: z.string() })
          .nullable()
          .optional(),
        comment: z.string().optional(),
        customEnvironmentIds: z.array(z.string()).optional(),
      }),
    )
    .optional(),
  customEnvironments: z
    .array(
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
    )
    .optional(),
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
  services: z
    .array(
      z.object({
        serviceName: z.string(),
        serviceType: z.enum(["cron", "job", "web", "worker"]).optional(),
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
          ])
          .optional(),
        runtime: z.string().optional(),
      }),
    )
    .optional(),
  gitForkProtection: z.boolean().optional(),
  gitLFS: z.boolean().optional(),
  id: z.string(),
  ipBuckets: z
    .array(
      z.object({
        bucket: z.string(),
        default: z.boolean().optional(),
        supportUntil: z.number().optional(),
      }),
    )
    .optional(),
  jobs: z
    .object({
      lint: z.object({ targets: z.array(z.string()) }).optional(),
      typecheck: z.object({ targets: z.array(z.string()) }).optional(),
      "mfe-config-present": z.object({ targets: z.array(z.string()) }).optional(),
    })
    .optional(),
  latestDeployments: z
    .array(
      z.object({
        id: z.string(),
        alias: z.array(z.string()).optional(),
        aliasAssigned: z.union([z.number(), z.boolean()]).nullable().optional(),
        aliasError: z.object({ code: z.string(), message: z.string() }).nullable().optional(),
        aliasFinal: z.string().nullable().optional(),
        automaticAliases: z.array(z.string()).optional(),
        branchMatcher: z
          .object({ type: z.enum(["endsWith", "equals", "startsWith"]), pattern: z.string() })
          .optional(),
        buildingAt: z.number().optional(),
        builds: z
          .array(
            z.object({ use: z.string(), src: z.string().optional(), dest: z.string().optional() }),
          )
          .optional(),
        checksConclusion: z.enum(["canceled", "failed", "skipped", "succeeded"]).optional(),
        checksState: z.enum(["completed", "registered", "running"]).optional(),
        connectBuildsEnabled: z.boolean().optional(),
        connectConfigurationId: z.string().optional(),
        createdAt: z.number(),
        createdIn: z.string(),
        creator: z
          .object({
            email: z.string(),
            githubLogin: z.string().optional(),
            gitlabLogin: z.string().optional(),
            uid: z.string(),
            username: z.string(),
          })
          .nullable(),
        deletedAt: z.number().optional(),
        deploymentHostname: z.string(),
        forced: z.boolean().optional(),
        name: z.string(),
        meta: z.record(z.string(), z.string()).optional(),
        monorepoManager: z.string().nullable().optional(),
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
        plan: z.enum(["enterprise", "hobby", "pro"]),
        previewCommentsEnabled: z.boolean().optional(),
        private: z.boolean(),
        readyAt: z.number().optional(),
        readyState: z.enum([
          "BLOCKED",
          "BUILDING",
          "CANCELED",
          "ERROR",
          "INITIALIZING",
          "QUEUED",
          "READY",
        ]),
        readySubstate: z.enum(["PROMOTED", "ROLLING", "STAGED"]).optional(),
        requestedAt: z.number().optional(),
        target: z.string().nullable().optional(),
        teamId: z.string().nullable().optional(),
        type: z.literal("LAMBDAS"),
        url: z.string(),
        userId: z.string().optional(),
        withCache: z.boolean().optional(),
      }),
    )
    .optional(),
  link: z
    .union([
      z.object({
        org: z.string(),
        repoOwnerId: z.number().optional(),
        repo: z.string().optional(),
        repoId: z.number().optional(),
        type: z.literal("github"),
        createdAt: z.number().optional(),
        deployHooks: z.array(
          z.object({
            createdAt: z.number().optional(),
            id: z.string(),
            name: z.string(),
            ref: z.string(),
            url: z.string(),
          }),
        ),
        gitCredentialId: z.string(),
        updatedAt: z.number().optional(),
        sourceless: z.boolean().optional(),
        productionBranch: z.string(),
      }),
      z.object({
        type: z.literal("github-limited"),
        repo: z.string().optional(),
        repoId: z.number().optional(),
        createdAt: z.number().optional(),
        updatedAt: z.number().optional(),
        org: z.string(),
        repoOwnerId: z.number().optional(),
        deployHooks: z.array(
          z.object({
            createdAt: z.number().optional(),
            id: z.string(),
            name: z.string(),
            ref: z.string(),
            url: z.string(),
          }),
        ),
        gitCredentialId: z.string(),
        sourceless: z.boolean().optional(),
        productionBranch: z.string(),
      }),
      z.object({
        org: z.string(),
        repoOwnerId: z.number().optional(),
        repo: z.string().optional(),
        repoId: z.number().optional(),
        type: z.literal("github-custom-host"),
        host: z.string(),
        createdAt: z.number().optional(),
        deployHooks: z.array(
          z.object({
            createdAt: z.number().optional(),
            id: z.string(),
            name: z.string(),
            ref: z.string(),
            url: z.string(),
          }),
        ),
        gitCredentialId: z.string(),
        updatedAt: z.number().optional(),
        sourceless: z.boolean().optional(),
        productionBranch: z.string(),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        projectNameWithNamespace: z.string(),
        projectNamespace: z.string(),
        projectOwnerId: z.number().optional(),
        projectUrl: z.string(),
        type: z.literal("gitlab"),
        createdAt: z.number().optional(),
        deployHooks: z.array(
          z.object({
            createdAt: z.number().optional(),
            id: z.string(),
            name: z.string(),
            ref: z.string(),
            url: z.string(),
          }),
        ),
        gitCredentialId: z.string(),
        updatedAt: z.number().optional(),
        sourceless: z.boolean().optional(),
        productionBranch: z.string(),
      }),
      z.object({
        name: z.string(),
        slug: z.string(),
        owner: z.string(),
        type: z.literal("bitbucket"),
        uuid: z.string(),
        workspaceUuid: z.string(),
        createdAt: z.number().optional(),
        deployHooks: z.array(
          z.object({
            createdAt: z.number().optional(),
            id: z.string(),
            name: z.string(),
            ref: z.string(),
            url: z.string(),
          }),
        ),
        gitCredentialId: z.string(),
        updatedAt: z.number().optional(),
        sourceless: z.boolean().optional(),
        productionBranch: z.string(),
      }),
      z.object({
        org: z.string(),
        repo: z.string(),
        type: z.literal("vercel"),
        createdAt: z.number().optional(),
        deployHooks: z.array(
          z.object({
            createdAt: z.number().optional(),
            id: z.string(),
            name: z.string(),
            ref: z.string(),
            url: z.string(),
          }),
        ),
        gitCredentialId: z.string(),
        updatedAt: z.number().optional(),
        sourceless: z.boolean().optional(),
        productionBranch: z.string(),
      }),
      z.object({
        owner: z.string(),
        repo: z.string(),
        repoId: z.string(),
        ownerId: z.string(),
        type: z.literal("cursor-origin"),
        createdAt: z.number().optional(),
        deployHooks: z.array(
          z.object({
            createdAt: z.number().optional(),
            id: z.string(),
            name: z.string(),
            ref: z.string(),
            url: z.string(),
          }),
        ),
        gitCredentialId: z.string(),
        updatedAt: z.number().optional(),
        sourceless: z.boolean().optional(),
        productionBranch: z.string(),
      }),
    ])
    .optional(),
  blobs: z.object({ isDefaultApp: z.boolean().optional() }).optional(),
  microfrontends: z
    .union([
      z.object({
        isDefaultApp: z.literal(true),
        updatedAt: z.number(),
        groupIds: z.array(z.string()),
        enabled: z.literal(true),
        defaultRoute: z.string().optional(),
        freeProjectForLegacyLimits: z.boolean().optional(),
      }),
      z.object({
        isDefaultApp: z.literal(false).optional(),
        routeObservabilityToThisProject: z.boolean().optional(),
        doNotRouteWithMicrofrontendsRouting: z.boolean().optional(),
        updatedAt: z.number(),
        groupIds: z.array(z.string()),
        enabled: z.literal(true),
        defaultRoute: z.string().optional(),
        freeProjectForLegacyLimits: z.boolean().optional(),
      }),
      z.object({
        updatedAt: z.number(),
        groupIds: z.array(z.unknown()),
        enabled: z.literal(false),
        freeProjectForLegacyLimits: z.boolean().optional(),
      }),
    ])
    .optional(),
  name: z.string(),
  nodeVersion: z.enum(["10.x", "12.x", "14.x", "16.x", "18.x", "20.x", "22.x", "24.x", "8.10.x"]),
  optionsAllowlist: z
    .object({ paths: z.array(z.object({ value: z.string() })) })
    .nullable()
    .optional(),
  outputDirectory: z.string().nullable().optional(),
  passwordProtection: z.object({}).nullable().optional(),
  passport: z
    .object({
      deploymentType: z.enum([
        "all",
        "all_except_custom_domains",
        "preview",
        "prod_deployment_urls_and_all_previews",
      ]),
      connectorId: z.string(),
    })
    .nullable()
    .optional(),
  protectionConfig: z
    .object({
      sandboxUrls: z.object({ inheritDeploymentProtection: z.boolean().optional() }).optional(),
    })
    .optional(),
  sandbox: z
    .object({
      region: z
        .enum([
          "arn1",
          "bom1",
          "cdg1",
          "cle1",
          "cpt1",
          "dub1",
          "fra1",
          "gru1",
          "hkg1",
          "hnd1",
          "iad1",
          "icn1",
          "kix1",
          "lhr1",
          "pdx1",
          "sfo1",
          "sin1",
          "syd1",
          "yul1",
        ])
        .optional(),
      failoverRegions: z
        .array(
          z.enum([
            "arn1",
            "bom1",
            "cdg1",
            "cle1",
            "cpt1",
            "dub1",
            "fra1",
            "gru1",
            "hkg1",
            "hnd1",
            "iad1",
            "icn1",
            "kix1",
            "lhr1",
            "pdx1",
            "sfo1",
            "sin1",
            "syd1",
            "yul1",
          ]),
        )
        .optional(),
    })
    .optional(),
  productionDeploymentsFastLane: z.boolean().optional(),
  resourceConfig: z.object({
    elasticConcurrencyEnabled: z.boolean().optional(),
    fluid: z.boolean().optional(),
    functionDefaultRegions: z.array(z.string()),
    functionDefaultTimeout: z.number().optional(),
    functionDefaultMemoryType: z
      .enum(["performance", "performance_xl", "standard", "standard_legacy"])
      .optional(),
    functionZeroConfigFailover: z.boolean().optional(),
    buildMachineType: z.enum(["basic", "enhanced", "standard", "turbo"]).optional(),
    buildMachineSelection: z.enum(["elastic", "fixed"]).optional(),
    buildMachineElasticLastUpdated: z.number().optional(),
    buildMachineElasticReason: z
      .enum([
        "basic-floor",
        "build-timeout-failure",
        "enospc-failure",
        "enterprise-floor",
        "high-peak-disk",
        "high-peak-memory",
        "long-build-duration",
        "oom-failure",
        "short-build-duration",
        "sustained-high-cpu",
      ])
      .optional(),
    isNSNBDisabled: z.boolean().optional(),
    buildQueue: z
      .object({
        configuration: z.enum(["SKIP_NAMESPACE_QUEUE", "WAIT_FOR_NAMESPACE_QUEUE"]).optional(),
      })
      .optional(),
    enableFunctionsBeta: z.boolean().optional(),
  }),
  rollbackDescription: z
    .object({
      userId: z.string(),
      username: z.string(),
      description: z.string(),
      createdAt: z.number(),
    })
    .optional(),
  rollingRelease: z
    .object({
      target: z.string(),
      stages: z
        .array(
          z.object({
            targetPercentage: z.number(),
            requireApproval: z.boolean().optional(),
            duration: z.number().optional(),
            linearShift: z.boolean().optional(),
          }),
        )
        .nullable()
        .optional(),
      canaryResponseHeader: z.boolean().optional(),
      gate: z
        .object({
          enabled: z.boolean(),
          checks: z.array(
            z.object({
              type: z.literal("error-rate-5xx"),
              minSampleSize: z.number().optional(),
              excludeStatusCodes: z.array(z.number()).optional(),
              excludePaths: z.array(z.string()).optional(),
              ingestWatermarkSeconds: z.number().optional(),
            }),
          ),
          failureThreshold: z.number().optional(),
          windowSize: z.number().optional(),
          action: z.enum(["pause", "rollback"]),
          dryRun: z.boolean(),
        })
        .optional(),
    })
    .nullable()
    .optional(),
  defaultResourceConfig: z.object({
    elasticConcurrencyEnabled: z.boolean().optional(),
    fluid: z.boolean().optional(),
    functionDefaultRegions: z.array(z.string()),
    functionDefaultTimeout: z.number().optional(),
    functionDefaultMemoryType: z
      .enum(["performance", "performance_xl", "standard", "standard_legacy"])
      .optional(),
    functionZeroConfigFailover: z.boolean().optional(),
    buildMachineType: z.enum(["basic", "enhanced", "standard", "turbo"]).optional(),
    buildMachineSelection: z.enum(["elastic", "fixed"]).optional(),
    buildMachineElasticLastUpdated: z.number().optional(),
    buildMachineElasticReason: z
      .enum([
        "basic-floor",
        "build-timeout-failure",
        "enospc-failure",
        "enterprise-floor",
        "high-peak-disk",
        "high-peak-memory",
        "long-build-duration",
        "oom-failure",
        "short-build-duration",
        "sustained-high-cpu",
      ])
      .optional(),
    isNSNBDisabled: z.boolean().optional(),
    buildQueue: z
      .object({
        configuration: z.enum(["SKIP_NAMESPACE_QUEUE", "WAIT_FOR_NAMESPACE_QUEUE"]).optional(),
      })
      .optional(),
    enableFunctionsBeta: z.boolean().optional(),
  }),
  rootDirectory: z.string().nullable().optional(),
  serverlessFunctionZeroConfigFailover: z.boolean().optional(),
  skewProtectionBoundaryAt: z.number().optional(),
  skewProtectionMaxAge: z.number().optional(),
  skewProtectionAllowedDomains: z.array(z.string()).optional(),
  skipGitConnectDuringLink: z.boolean().optional(),
  staticIps: z
    .object({ builds: z.boolean(), enabled: z.boolean(), regions: z.array(z.string()) })
    .optional(),
  sourceFilesOutsideRootDirectory: z.boolean().optional(),
  enableAffectedProjectsDeployments: z.boolean().optional(),
  enableExternalRewriteCaching: z.boolean().optional(),
  ssoProtection: z
    .object({
      deploymentType: z.enum([
        "all",
        "all_except_custom_domains",
        "preview",
        "prod_deployment_urls_and_all_previews",
      ]),
      cve55182MigrationAppliedFrom: z
        .enum([
          "all",
          "all_except_custom_domains",
          "preview",
          "prod_deployment_urls_and_all_previews",
          "null",
        ])
        .nullable()
        .optional(),
      april2026SecurityIncidentMigrationAppliedFrom: z
        .enum([
          "all",
          "all_except_custom_domains",
          "preview",
          "prod_deployment_urls_and_all_previews",
          "null",
        ])
        .nullable()
        .optional(),
    })
    .nullable()
    .optional(),
  targets: z
    .record(
      z.string(),
      z
        .object({
          id: z.string(),
          alias: z.array(z.string()).optional(),
          aliasAssigned: z.union([z.number(), z.boolean()]).nullable().optional(),
          aliasError: z.object({ code: z.string(), message: z.string() }).nullable().optional(),
          aliasFinal: z.string().nullable().optional(),
          automaticAliases: z.array(z.string()).optional(),
          branchMatcher: z
            .object({ type: z.enum(["endsWith", "equals", "startsWith"]), pattern: z.string() })
            .optional(),
          buildingAt: z.number().optional(),
          builds: z
            .array(
              z.object({
                use: z.string(),
                src: z.string().optional(),
                dest: z.string().optional(),
              }),
            )
            .optional(),
          checksConclusion: z.enum(["canceled", "failed", "skipped", "succeeded"]).optional(),
          checksState: z.enum(["completed", "registered", "running"]).optional(),
          connectBuildsEnabled: z.boolean().optional(),
          connectConfigurationId: z.string().optional(),
          createdAt: z.number(),
          createdIn: z.string(),
          creator: z
            .object({
              email: z.string(),
              githubLogin: z.string().optional(),
              gitlabLogin: z.string().optional(),
              uid: z.string(),
              username: z.string(),
            })
            .nullable(),
          deletedAt: z.number().optional(),
          deploymentHostname: z.string(),
          forced: z.boolean().optional(),
          name: z.string(),
          meta: z.record(z.string(), z.string()).optional(),
          monorepoManager: z.string().nullable().optional(),
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
          plan: z.enum(["enterprise", "hobby", "pro"]),
          previewCommentsEnabled: z.boolean().optional(),
          private: z.boolean(),
          readyAt: z.number().optional(),
          readyState: z.enum([
            "BLOCKED",
            "BUILDING",
            "CANCELED",
            "ERROR",
            "INITIALIZING",
            "QUEUED",
            "READY",
          ]),
          readySubstate: z.enum(["PROMOTED", "ROLLING", "STAGED"]).optional(),
          requestedAt: z.number().optional(),
          target: z.string().nullable().optional(),
          teamId: z.string().nullable().optional(),
          type: z.literal("LAMBDAS"),
          url: z.string(),
          userId: z.string().optional(),
          withCache: z.boolean().optional(),
        })
        .nullable(),
    )
    .optional(),
  transferCompletedAt: z.number().optional(),
  transferStartedAt: z.number().optional(),
  transferToAccountId: z.string().optional(),
  transferredFromAccountId: z.string().optional(),
  updatedAt: z.number().optional(),
  live: z.boolean().optional(),
  enablePreviewFeedback: z.boolean().nullable().optional(),
  enableProductionFeedback: z.boolean().nullable().optional(),
  permissions: z
    .object({
      oauth2Connection: z.array(aCLAction).optional(),
      user: z.array(aCLAction).optional(),
      userConnection: z.array(aCLAction).optional(),
      userMfaConfiguration: z.array(aCLAction).optional(),
      userPreference: z.array(aCLAction).optional(),
      userSudo: z.array(aCLAction).optional(),
      webAuthn: z.array(aCLAction).optional(),
      accessGroup: z.array(aCLAction).optional(),
      agent: z.array(aCLAction).optional(),
      aiGatewayApiKey: z.array(aCLAction).optional(),
      aiGatewayApiKeyBypassAll: z.array(aCLAction).optional(),
      aiGatewayApiKeyOwnedBySelf: z.array(aCLAction).optional(),
      aiGatewayApiKeySpendAttribution: z.array(aCLAction).optional(),
      aiGatewayApiKeyZdrExemption: z.array(aCLAction).optional(),
      aiGatewayBudget: z.array(aCLAction).optional(),
      aiGatewayCredits: z.array(aCLAction).optional(),
      aiGatewayPrivateModels: z.array(aCLAction).optional(),
      aiGatewayGuardrails: z.array(aCLAction).optional(),
      aiGatewayRules: z.array(aCLAction).optional(),
      aiGatewaySettings: z.array(aCLAction).optional(),
      aiGatewayUsage: z.array(aCLAction).optional(),
      aiGatewayVirtualModelConfigs: z.array(aCLAction).optional(),
      alerts: z.array(aCLAction).optional(),
      alertRules: z.array(aCLAction).optional(),
      aliasGlobal: z.array(aCLAction).optional(),
      analyticsSampling: z.array(aCLAction).optional(),
      analyticsUsage: z.array(aCLAction).optional(),
      apiKey: z.array(aCLAction).optional(),
      apiKeyAiGateway: z.array(aCLAction).optional(),
      apiKeyOwnedBySelf: z.array(aCLAction).optional(),
      oauth2Application: z.array(aCLAction).optional(),
      vercelAppInstallation: z.array(aCLAction).optional(),
      vercelAppInstallationRequest: z.array(aCLAction).optional(),
      auditLog: z.array(aCLAction).optional(),
      billingAddress: z.array(aCLAction).optional(),
      billingInformation: z.array(aCLAction).optional(),
      billingInvoice: z.array(aCLAction).optional(),
      billingInvoiceEmailRecipient: z.array(aCLAction).optional(),
      billingInvoiceLanguage: z.array(aCLAction).optional(),
      billingPlan: z.array(aCLAction).optional(),
      billingPurchaseOrder: z.array(aCLAction).optional(),
      billingRefund: z.array(aCLAction).optional(),
      billingTaxId: z.array(aCLAction).optional(),
      blob: z.array(aCLAction).optional(),
      blobStoreTokenSet: z.array(aCLAction).optional(),
      budget: z.array(aCLAction).optional(),
      cacheArtifact: z.array(aCLAction).optional(),
      cacheArtifactUsageEvent: z.array(aCLAction).optional(),
      codeChecks: z.array(aCLAction).optional(),
      codeOwners: z.array(aCLAction).optional(),
      ciInvocations: z.array(aCLAction).optional(),
      ciLogs: z.array(aCLAction).optional(),
      concurrentBuilds: z.array(aCLAction).optional(),
      connect: z.array(aCLAction).optional(),
      connectConfiguration: z.array(aCLAction).optional(),
      connectLogs: z.array(aCLAction).optional(),
      connexClient: z.array(aCLAction).optional(),
      connexClientProject: z.array(aCLAction).optional(),
      connexContact: z.array(aCLAction).optional(),
      connexInstallation: z.array(aCLAction).optional(),
      connexToken: z.array(aCLAction).optional(),
      buildMachineDefault: z.array(aCLAction).optional(),
      cursorOriginInstallation: z.array(aCLAction).optional(),
      dataCacheBillingSettings: z.array(aCLAction).optional(),
      defaultDeploymentProtection: z.array(aCLAction).optional(),
      deploymentPolicy: z.array(aCLAction).optional(),
      domain: z.array(aCLAction).optional(),
      domainAcceptDelegation: z.array(aCLAction).optional(),
      domainAuthCodes: z.array(aCLAction).optional(),
      domainCertificate: z.array(aCLAction).optional(),
      domainCheckConfig: z.array(aCLAction).optional(),
      domainMove: z.array(aCLAction).optional(),
      domainPurchase: z.array(aCLAction).optional(),
      domainRecord: z.array(aCLAction).optional(),
      domainTransferIn: z.array(aCLAction).optional(),
      drain: z.array(aCLAction).optional(),
      edgeConfig: z.array(aCLAction).optional(),
      edgeConfigItem: z.array(aCLAction).optional(),
      edgeConfigSchema: z.array(aCLAction).optional(),
      edgeConfigToken: z.array(aCLAction).optional(),
      endpointVerification: z.array(aCLAction).optional(),
      event: z.array(aCLAction).optional(),
      fileUpload: z.array(aCLAction).optional(),
      flagsExplorerSubscription: z.array(aCLAction).optional(),
      gitRepository: z.array(aCLAction).optional(),
      imageOptimizationNewPrice: z.array(aCLAction).optional(),
      integration: z.array(aCLAction).optional(),
      integrationAccount: z.array(aCLAction).optional(),
      integrationConfiguration: z.array(aCLAction).optional(),
      integrationConfigurationProjects: z.array(aCLAction).optional(),
      integrationConfigurationRole: z.array(aCLAction).optional(),
      integrationConfigurationTransfer: z.array(aCLAction).optional(),
      integrationDeploymentAction: z.array(aCLAction).optional(),
      integrationEvent: z.array(aCLAction).optional(),
      integrationLog: z.array(aCLAction).optional(),
      integrationResource: z.array(aCLAction).optional(),
      integrationResourceData: z.array(aCLAction).optional(),
      integrationResourceReplCommand: z.array(aCLAction).optional(),
      integrationResourceSecrets: z.array(aCLAction).optional(),
      integrationSSOSession: z.array(aCLAction).optional(),
      integrationStrict: z.array(aCLAction).optional(),
      integrationStoreTokenSet: z.array(aCLAction).optional(),
      integrationVercelConfigurationOverride: z.array(aCLAction).optional(),
      integrationPullRequest: z.array(aCLAction).optional(),
      ipBlocking: z.array(aCLAction).optional(),
      jobGlobal: z.array(aCLAction).optional(),
      kmsIssuer: z.array(aCLAction).optional(),
      kmsProjectGrant: z.array(aCLAction).optional(),
      logDrain: z.array(aCLAction).optional(),
      marketplaceBillingData: z.array(aCLAction).optional(),
      marketplaceExperimentationEdgeConfigData: z.array(aCLAction).optional(),
      marketplaceExperimentationItem: z.array(aCLAction).optional(),
      marketplaceFlexCommit: z.array(aCLAction).optional(),
      marketplaceInstallationMember: z.array(aCLAction).optional(),
      marketplaceInvoice: z.array(aCLAction).optional(),
      marketplaceSettings: z.array(aCLAction).optional(),
      Monitoring: z.array(aCLAction).optional(),
      monitoringAlert: z.array(aCLAction).optional(),
      monitoringChart: z.array(aCLAction).optional(),
      monitoringQuery: z.array(aCLAction).optional(),
      monitoringSettings: z.array(aCLAction).optional(),
      notificationCustomerBudget: z.array(aCLAction).optional(),
      notificationDeploymentFailed: z.array(aCLAction).optional(),
      notificationDomainConfiguration: z.array(aCLAction).optional(),
      notificationDomainExpire: z.array(aCLAction).optional(),
      notificationDomainMoved: z.array(aCLAction).optional(),
      notificationDomainPurchase: z.array(aCLAction).optional(),
      notificationDomainRenewal: z.array(aCLAction).optional(),
      notificationDomainTransfer: z.array(aCLAction).optional(),
      notificationDomainUnverified: z.array(aCLAction).optional(),
      NotificationMonitoringAlert: z.array(aCLAction).optional(),
      notificationPaymentFailed: z.array(aCLAction).optional(),
      notificationPreferences: z.array(aCLAction).optional(),
      notificationStatementOfReasons: z.array(aCLAction).optional(),
      notificationUsageAlert: z.array(aCLAction).optional(),
      oidcFederationPolicy: z.array(aCLAction).optional(),
      observabilityConfiguration: z.array(aCLAction).optional(),
      observabilityFunnel: z.array(aCLAction).optional(),
      observabilityNotebook: z.array(aCLAction).optional(),
      openTelemetryEndpoint: z.array(aCLAction).optional(),
      ownEvent: z.array(aCLAction).optional(),
      organization: z.array(aCLAction).optional(),
      organizationDomain: z.array(aCLAction).optional(),
      organizationTeam: z.array(aCLAction).optional(),
      passwordProtectionInvoiceItem: z.array(aCLAction).optional(),
      paymentMethod: z.array(aCLAction).optional(),
      permissions: z.array(aCLAction).optional(),
      postgres: z.array(aCLAction).optional(),
      postgresStoreTokenSet: z.array(aCLAction).optional(),
      previewDeploymentSuffix: z.array(aCLAction).optional(),
      privateCloudAccount: z.array(aCLAction).optional(),
      projectTransferIn: z.array(aCLAction).optional(),
      proTrialOnboarding: z.array(aCLAction).optional(),
      rateLimit: z.array(aCLAction).optional(),
      redis: z.array(aCLAction).optional(),
      redisStoreTokenSet: z.array(aCLAction).optional(),
      remoteCaching: z.array(aCLAction).optional(),
      repository: z.array(aCLAction).optional(),
      samlConfig: z.array(aCLAction).optional(),
      secret: z.array(aCLAction).optional(),
      securityConfig: z.array(aCLAction).optional(),
      sensitiveEnvironmentVariablePolicy: z.array(aCLAction).optional(),
      sharedEnvVars: z.array(aCLAction).optional(),
      sharedEnvVarsProduction: z.array(aCLAction).optional(),
      space: z.array(aCLAction).optional(),
      spaceRun: z.array(aCLAction).optional(),
      storeIsLocked: z.array(aCLAction).optional(),
      storeTokenSetSensitive: z.array(aCLAction).optional(),
      storeTransfer: z.array(aCLAction).optional(),
      supportCase: z.array(aCLAction).optional(),
      supportCaseComment: z.array(aCLAction).optional(),
      team: z.array(aCLAction).optional(),
      teamAccessRequest: z.array(aCLAction).optional(),
      teamFellowMembership: z.array(aCLAction).optional(),
      teamGitExclusivity: z.array(aCLAction).optional(),
      teamInvite: z.array(aCLAction).optional(),
      teamInviteCode: z.array(aCLAction).optional(),
      teamInviteLink: z.array(aCLAction).optional(),
      teamJoin: z.array(aCLAction).optional(),
      teamMemberMfaStatus: z.array(aCLAction).optional(),
      teamMicrofrontends: z.array(aCLAction).optional(),
      teamOwnMembership: z.array(aCLAction).optional(),
      teamOwnMembershipDisconnectSAML: z.array(aCLAction).optional(),
      teamSudo: z.array(aCLAction).optional(),
      teamTokenInvalidation: z.array(aCLAction).optional(),
      token: z.array(aCLAction).optional(),
      toolbarComment: z.array(aCLAction).optional(),
      usage: z.array(aCLAction).optional(),
      usageCycle: z.array(aCLAction).optional(),
      vcrRepository: z.array(aCLAction).optional(),
      vpcPeeringConnection: z.array(aCLAction).optional(),
      webAnalyticsPlan: z.array(aCLAction).optional(),
      webhook: z.array(aCLAction).optional(),
      "webhook-event": z.array(aCLAction).optional(),
      aliasProject: z.array(aCLAction).optional(),
      aliasProtectionBypass: z.array(aCLAction).optional(),
      bulkRedirects: z.array(aCLAction).optional(),
      buildMachine: z.array(aCLAction).optional(),
      connectConfigurationLink: z.array(aCLAction).optional(),
      dataCacheNamespace: z.array(aCLAction).optional(),
      deployment: z.array(aCLAction).optional(),
      deploymentBuildLogs: z.array(aCLAction).optional(),
      deploymentCheck: z.array(aCLAction).optional(),
      deploymentCheckPreview: z.array(aCLAction).optional(),
      deploymentCheckReRunFromProductionBranch: z.array(aCLAction).optional(),
      deploymentProductionGit: z.array(aCLAction).optional(),
      deploymentV0: z.array(aCLAction).optional(),
      deploymentPreview: z.array(aCLAction).optional(),
      deploymentPrivate: z.array(aCLAction).optional(),
      deploymentPromote: z.array(aCLAction).optional(),
      deploymentRollback: z.array(aCLAction).optional(),
      edgeCacheNamespace: z.array(aCLAction).optional(),
      environments: z.array(aCLAction).optional(),
      job: z.array(aCLAction).optional(),
      logs: z.array(aCLAction).optional(),
      logsPreset: z.array(aCLAction).optional(),
      observabilityData: z.array(aCLAction).optional(),
      onDemandBuild: z.array(aCLAction).optional(),
      onDemandConcurrency: z.array(aCLAction).optional(),
      optionsAllowlist: z.array(aCLAction).optional(),
      passwordProtection: z.array(aCLAction).optional(),
      privateLinkEndpoint: z.array(aCLAction).optional(),
      productionAliasProtectionBypass: z.array(aCLAction).optional(),
      productionShareableLink: z.array(aCLAction).optional(),
      project: z.array(aCLAction).optional(),
      projectAccessGroup: z.array(aCLAction).optional(),
      projectAnalyticsSampling: z.array(aCLAction).optional(),
      projectAnalyticsUsage: z.array(aCLAction).optional(),
      projectCheck: z.array(aCLAction).optional(),
      projectCheckRun: z.array(aCLAction).optional(),
      projectDeploymentExpiration: z.array(aCLAction).optional(),
      projectDeploymentHook: z.array(aCLAction).optional(),
      projectDeploymentProtectionStrict: z.array(aCLAction).optional(),
      projectDomain: z.array(aCLAction).optional(),
      projectDomainCheckConfig: z.array(aCLAction).optional(),
      projectDomainMove: z.array(aCLAction).optional(),
      projectDomainVerify: z.array(aCLAction).optional(),
      projectEvent: z.array(aCLAction).optional(),
      projectEnvVars: z.array(aCLAction).optional(),
      projectEnvVarsProduction: z.array(aCLAction).optional(),
      projectEnvVarsUnownedByIntegration: z.array(aCLAction).optional(),
      projectFlags: z.array(aCLAction).optional(),
      projectFlagsProduction: z.array(aCLAction).optional(),
      projectFlagsSdkKey: z.array(aCLAction).optional(),
      projectFromV0: z.array(aCLAction).optional(),
      projectId: z.array(aCLAction).optional(),
      projectIntegrationConfiguration: z.array(aCLAction).optional(),
      projectLink: z.array(aCLAction).optional(),
      projectMember: z.array(aCLAction).optional(),
      projectMonitoring: z.array(aCLAction).optional(),
      projectOIDCToken: z.array(aCLAction).optional(),
      projectPermissions: z.array(aCLAction).optional(),
      projectProductionBranch: z.array(aCLAction).optional(),
      projectProtectionBypass: z.array(aCLAction).optional(),
      projectRollingRelease: z.array(aCLAction).optional(),
      projectRoutes: z.array(aCLAction).optional(),
      projectSupportCase: z.array(aCLAction).optional(),
      projectSupportCaseComment: z.array(aCLAction).optional(),
      projectTier: z.array(aCLAction).optional(),
      projectTransfer: z.array(aCLAction).optional(),
      projectTransferOut: z.array(aCLAction).optional(),
      projectUsage: z.array(aCLAction).optional(),
      pageIntegrity: z.array(aCLAction).optional(),
      seawallConfig: z.array(aCLAction).optional(),
      securityPlusConfiguration: z.array(aCLAction).optional(),
      shareableLink: z.array(aCLAction).optional(),
      shareableLinkStrict: z.array(aCLAction).optional(),
      sharedEnvVarConnection: z.array(aCLAction).optional(),
      skewProtection: z.array(aCLAction).optional(),
      analytics: z.array(aCLAction).optional(),
      trustedIps: z.array(aCLAction).optional(),
      trustedSources: z.array(aCLAction).optional(),
      v0Chat: z.array(aCLAction).optional(),
      vercelAuth: z.array(aCLAction).optional(),
      vercelRun: z.array(aCLAction).optional(),
      webAnalytics: z.array(aCLAction).optional(),
      workflowRunData: z.array(aCLAction).optional(),
    })
    .optional(),
  lastRollbackTarget: z.object({}).nullable().optional(),
  lastAliasRequest: z
    .object({
      fromDeploymentId: z.string().nullable(),
      toDeploymentId: z.string(),
      fromRollingReleaseId: z.string().optional(),
      jobStatus: z.enum(["failed", "in-progress", "pending", "skipped", "succeeded"]),
      requestedAt: z.number(),
      type: z.enum(["promote", "rollback"]),
    })
    .nullable()
    .optional(),
  protectionBypass: z
    .record(
      z.string(),
      z.union([
        z.object({
          createdAt: z.number(),
          createdBy: z.string(),
          scope: z.literal("integration-automation-bypass"),
          integrationId: z.string(),
          configurationId: z.string(),
        }),
        z.object({
          createdAt: z.number(),
          createdBy: z.string(),
          scope: z.literal("automation-bypass"),
          isEnvVar: z.boolean().optional(),
          note: z.string().optional(),
        }),
      ]),
    )
    .optional(),
  hasActiveBranches: z.boolean().optional(),
  trustedIps: z
    .union([
      z.object({
        deploymentType: z.enum([
          "all",
          "all_except_custom_domains",
          "preview",
          "prod_deployment_urls_and_all_previews",
          "production",
        ]),
        addresses: z.array(z.object({ value: z.string(), note: z.string().optional() })),
        protectionMode: z.enum(["additional", "exclusive"]),
      }),
      z.object({
        deploymentType: z.enum([
          "all",
          "all_except_custom_domains",
          "preview",
          "prod_deployment_urls_and_all_previews",
          "production",
        ]),
      }),
    ])
    .nullable()
    .optional(),
  trustedSources: z
    .object({
      projects: z
        .record(
          z.string(),
          z.object({
            label: z.string().optional(),
            customAllow: z
              .array(
                z.object({
                  from: z.union([
                    z.object({
                      slugs: z.array(z.string()),
                      preset: z.literal("all-custom").optional(),
                    }),
                    z.object({
                      slugs: z.array(z.string()).optional(),
                      preset: z.literal("all-custom"),
                    }),
                  ]),
                  to: z.union([
                    z.object({
                      slugs: z.array(z.string()),
                      preset: z.literal("all-custom").optional(),
                    }),
                    z.object({
                      slugs: z.array(z.string()).optional(),
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
              to: z.union([
                z.object({
                  slugs: z.array(z.string()),
                  preset: z.literal("all-custom").optional(),
                }),
                z.object({
                  slugs: z.array(z.string()).optional(),
                  preset: z.literal("all-custom"),
                }),
              ]),
              label: z.string().optional(),
              claims: z.record(z.string(), z.array(z.string())),
            }),
          ),
        )
        .optional(),
    })
    .nullable()
    .optional(),
  gitComments: z.object({ onPullRequest: z.boolean(), onCommit: z.boolean() }).optional(),
  gitProviderOptions: z
    .object({
      createDeployments: z.enum(["disabled", "enabled"]),
      disableRepositoryDispatchEvents: z.boolean().optional(),
      requireVerifiedCommits: z.boolean().optional(),
      gitCommitStatus: z.boolean().optional(),
      consolidatedGitCommitStatus: z
        .object({ enabled: z.boolean(), propagateFailures: z.boolean() })
        .optional(),
    })
    .optional(),
  paused: z.boolean().optional(),
  concurrencyBucketName: z.string().optional(),
  webAnalytics: z
    .object({
      id: z.string(),
      disabledAt: z.number().optional(),
      canceledAt: z.number().optional(),
      enabledAt: z.number().optional(),
      hasData: z.literal(true).optional(),
    })
    .optional(),
  security: z
    .object({
      attackModeEnabled: z.boolean().optional(),
      attackModeUpdatedAt: z.number().optional(),
      firewallEnabled: z.boolean().optional(),
      firewallUpdatedAt: z.number().optional(),
      attackModeActiveUntil: z.number().nullable().optional(),
      firewallConfigVersion: z.number().optional(),
      rulesets: z
        .record(
          z.string(),
          z.object({
            action: z.enum([
              "allow",
              "bypass",
              "challenge",
              "deny",
              "log",
              "rate_limit",
              "redirect",
            ]),
            rateLimit: z
              .object({
                algo: z.enum(["fixed_window", "token_bucket"]),
                window: z.number(),
                limit: z.number(),
                keys: z.array(z.string()),
              })
              .nullable()
              .optional(),
            redirect: z
              .object({ location: z.string(), permanent: z.boolean() })
              .nullable()
              .optional(),
            actionDuration: z.string().nullable().optional(),
            bypassSystem: z.boolean().nullable().optional(),
            logHeaders: z.union([z.array(z.string()), z.literal("*")]).optional(),
          }),
        )
        .optional(),
      firewallSeawallEnabled: z.boolean().optional(),
      ja3Enabled: z.boolean().optional(),
      ja4Enabled: z.boolean().optional(),
      firewallBypassIps: z.array(z.string()).optional(),
      managedRules: z
        .object({
          vercel_ruleset: z.object({
            active: z.boolean(),
            action: z.enum(["challenge", "deny", "log"]).optional(),
          }),
          traffic_sources: z.object({
            active: z.boolean(),
            action: z.enum(["challenge", "deny", "log"]).optional(),
          }),
          bot_filter: z.object({
            active: z.boolean(),
            action: z.enum(["challenge", "deny", "log"]).optional(),
          }),
          ai_bots: z.object({
            active: z.boolean(),
            action: z.enum(["challenge", "deny", "log"]).optional(),
          }),
          owasp: z.object({
            active: z.boolean(),
            action: z.enum(["challenge", "deny", "log"]).optional(),
          }),
        })
        .nullable()
        .optional(),
      botIdEnabled: z.boolean().optional(),
      log_headers: z.union([z.array(z.string()), z.literal("*")]).optional(),
      securityPlus: z.boolean().optional(),
      securityPlusMetadata: z
        .object({ updatedAt: z.number(), firstEnabledAt: z.number().optional() })
        .optional(),
      pageIntegrityEnabled: z.boolean().optional(),
    })
    .optional(),
  oidcTokenConfig: z
    .object({ enabled: z.boolean().optional(), issuerMode: z.enum(["global", "team"]).optional() })
    .optional(),
  deploymentPolicy: z
    .object({
      gitSources: z
        .array(
          z.object({
            sources: z.array(
              z.union([
                z.object({
                  provider: z.enum(["bitbucket", "github"]),
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
            enabled: z.boolean(),
            environments: z.array(
              z.union([
                z.object({ type: z.literal("system"), target: z.enum(["preview", "production"]) }),
                z.object({ type: z.literal("custom"), environmentId: z.string() }),
              ]),
            ),
          }),
        )
        .nullable()
        .optional(),
      deploymentSources: z
        .array(
          z.object({
            sources: z.array(
              z.enum(["cli", "deploy-hook", "git", "integration", "rest-api", "v0"]),
            ),
            enabled: z.boolean(),
            environments: z.array(
              z.union([
                z.object({ type: z.literal("system"), target: z.enum(["preview", "production"]) }),
                z.object({ type: z.literal("custom"), environmentId: z.string() }),
              ]),
            ),
          }),
        )
        .nullable()
        .optional(),
    })
    .nullable()
    .optional(),
  tier: z.enum(["advanced", "critical"]).optional(),
  usageStatus: z
    .object({
      kind: z.literal("flat"),
      exceededAllowanceUntil: z.number().optional(),
      bypassThrottleUntil: z.number().optional(),
      throttled: z.boolean().optional(),
      teamThrottled: z.boolean().optional(),
    })
    .optional(),
  features: z.object({ webAnalytics: z.boolean().optional() }).optional(),
  v0: z.boolean().optional(),
  v0Created: z.boolean().optional(),
  abuse: z
    .object({
      scanner: z.string().optional(),
      history: z.array(
        z.object({
          scanner: z.string(),
          reason: z.string(),
          by: z.string(),
          byId: z.string(),
          at: z.number(),
        }),
      ),
      updatedAt: z.number(),
      block: z
        .object({
          action: z.literal("blocked"),
          reason: z.string(),
          statusCode: z.number(),
          createdAt: z.number(),
          caseId: z.string().optional(),
          actor: z.string().optional(),
          comment: z.string().optional(),
          ineligibleForAppeal: z.boolean().optional(),
          isCascading: z.boolean().optional(),
        })
        .optional(),
      blockHistory: z
        .array(
          z.union([
            z.object({
              action: z.literal("blocked"),
              reason: z.string(),
              statusCode: z.number(),
              createdAt: z.number(),
              caseId: z.string().optional(),
              actor: z.string().optional(),
              comment: z.string().optional(),
              ineligibleForAppeal: z.boolean().optional(),
              isCascading: z.boolean().optional(),
            }),
            z.object({
              action: z.literal("unblocked"),
              createdAt: z.number(),
              caseId: z.string().optional(),
              actor: z.string().optional(),
              comment: z.string().optional(),
              ineligibleForAppeal: z.boolean().optional(),
              isCascading: z.boolean().optional(),
            }),
            z.object({
              action: z.literal("route-blocked"),
              route: z.union([
                z.object({ src: z.string(), status: z.number(), expiry: z.number().optional() }),
                z.object({
                  has: z.array(
                    z.union([
                      z.object({
                        type: z.literal("header"),
                        key: z.literal("x-vercel-ip-country"),
                        value: z.object({ eq: z.string() }),
                      }),
                      z.object({ type: z.literal("host"), value: z.object({ eq: z.string() }) }),
                    ]),
                  ),
                  mitigate: z.object({ action: z.literal("block_legal_cwc") }),
                  src: z.string().optional(),
                }),
              ]),
              reason: z.string(),
              createdAt: z.number(),
              caseId: z.string().optional(),
              actor: z.string().optional(),
              comment: z.string().optional(),
              ineligibleForAppeal: z.boolean().optional(),
              isCascading: z.boolean().optional(),
            }),
            z.object({
              action: z.literal("route-unblocked"),
              route: z.union([
                z.object({ src: z.string(), status: z.number(), expiry: z.number().optional() }),
                z.object({
                  has: z.array(
                    z.union([
                      z.object({
                        type: z.literal("header"),
                        key: z.literal("x-vercel-ip-country"),
                        value: z.object({ eq: z.string() }),
                      }),
                      z.object({ type: z.literal("host"), value: z.object({ eq: z.string() }) }),
                    ]),
                  ),
                  mitigate: z.object({ action: z.literal("block_legal_cwc") }),
                  src: z.string().optional(),
                }),
              ]),
              statusCode: z.number().optional(),
              createdAt: z.number(),
              caseId: z.string().optional(),
              actor: z.string().optional(),
              comment: z.string().optional(),
              ineligibleForAppeal: z.boolean().optional(),
              isCascading: z.boolean().optional(),
            }),
          ]),
        )
        .optional(),
      interstitial: z.boolean().optional(),
      interstitialHistory: z
        .array(
          z.object({
            action: z.enum([
              "add-deployment-interstitial",
              "add-project-interstitial",
              "remove-deployment-interstitial",
              "remove-project-interstitial",
            ]),
            createdAt: z.number(),
            caseId: z.string().optional(),
            reason: z.string().optional(),
            actor: z.string().optional(),
            comment: z.string().optional(),
          }),
        )
        .optional(),
    })
    .optional(),
  internalRoutes: z
    .array(
      z.union([
        z.object({ src: z.string(), status: z.number(), expiry: z.number().optional() }),
        z.object({
          has: z.array(
            z.union([
              z.object({
                type: z.literal("header"),
                key: z.literal("x-vercel-ip-country"),
                value: z.object({ eq: z.string() }),
              }),
              z.object({ type: z.literal("host"), value: z.object({ eq: z.string() }) }),
            ]),
          ),
          mitigate: z.object({ action: z.literal("block_legal_cwc") }),
          src: z.string().optional(),
        }),
      ]),
    )
    .optional(),
  hasDeployments: z.boolean().optional(),
  dismissedToasts: z
    .array(
      z.object({
        key: z.string(),
        dismissedAt: z.number(),
        action: z.enum(["accept", "cancel", "delete"]),
        value: z
          .union([
            z.string(),
            z.number(),
            z.object({
              previousValue: z.union([z.string(), z.number(), z.boolean()]),
              currentValue: z.union([z.string(), z.number(), z.boolean()]),
            }),
            z.boolean(),
          ])
          .nullable(),
      }),
    )
    .optional(),
  protectedSourcemaps: z.boolean().optional(),
  tracing: z
    .object({
      domains: z.string().optional(),
      ignorePaths: z.array(z.string()).optional(),
      samplingRules: z
        .array(
          z.object({
            rate: z.number(),
            env: z.enum(["preview", "production"]).optional(),
            requestPath: z.string().optional(),
            destination: z.enum(["external", "internal"]).optional(),
          }),
        )
        .optional(),
    })
    .optional(),
  avatar: z.string().nullable().optional(),
});

export type UseGetApiV9ProjectsIdOrNameArgs = {
  idOrName: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV9ProjectsIdOrNameQueryOptions = (args: UseGetApiV9ProjectsIdOrNameArgs) =>
  queryOptions({
    queryKey: ["GET /v9/projects/{idOrName}", "projects", args.idOrName, args.teamId, args.slug],
    queryFn: () =>
      apiFetch(
        buildUrl("/v9/projects/{idOrName}", {
          idOrName: args.idOrName,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV9ProjectsIdOrNameResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV9ProjectsIdOrName = (args: UseGetApiV9ProjectsIdOrNameArgs) =>
  useQuery(getApiV9ProjectsIdOrNameQueryOptions(args));
