import { pagination } from "packages/models/src/pagination.generated.ts";
import { z } from "zod";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV7DeploymentsResponse = z.object({
  pagination: pagination,
  deployments: z.array(
    z.object({
      createdAt: z.number(),
      readyState: z.enum([
        "BLOCKED",
        "BUILDING",
        "CANCELED",
        "DELETED",
        "ERROR",
        "INITIALIZING",
        "QUEUED",
        "READY",
      ]),
      uid: z.string(),
      name: z.string(),
      projectId: z.string(),
      url: z.string(),
      created: z.number(),
      defaultRoute: z.string().optional(),
      deleted: z.number().optional(),
      undeleted: z.number().optional(),
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
      state: z
        .enum([
          "BLOCKED",
          "BUILDING",
          "CANCELED",
          "DELETED",
          "ERROR",
          "INITIALIZING",
          "QUEUED",
          "READY",
        ])
        .optional(),
      type: z.literal("LAMBDAS"),
      creator: z.object({
        uid: z.string(),
        type: z.enum(["app", "integration", "system", "user"]).optional(),
        email: z.string().optional(),
        username: z.string().optional(),
        githubLogin: z.string().optional(),
        gitlabLogin: z.string().optional(),
      }),
      meta: z.record(z.string(), z.string()).optional(),
      target: z.enum(["production", "staging", "null"]).nullable().optional(),
      aliasError: z.object({ code: z.string(), message: z.string() }).nullable().optional(),
      aliasAssigned: z.union([z.number(), z.boolean()]).nullable().optional(),
      buildingAt: z.number().optional(),
      ready: z.number().optional(),
      readySubstate: z.enum(["PROMOTED", "ROLLING", "STAGED"]).optional(),
      checksState: z.enum(["completed", "registered", "running"]).optional(),
      checksConclusion: z.enum(["canceled", "failed", "skipped", "succeeded"]).optional(),
      checks: z
        .object({
          "deployment-alias": z.object({
            state: z.enum(["failed", "pending", "succeeded"]),
            startedAt: z.number(),
            completedAt: z.number().optional(),
          }),
        })
        .optional(),
      inspectorUrl: z.string().nullable(),
      errorCode: z.string().optional(),
      errorMessage: z.string().nullable().optional(),
      oomReport: z.literal("out-of-memory").optional(),
      isRollbackCandidate: z.boolean().nullable().optional(),
      prebuilt: z.boolean().optional(),
      manualProvisioning: z
        .object({
          state: z.enum(["COMPLETE", "PENDING", "TIMEOUT"]),
          completedAt: z.number().optional(),
        })
        .optional(),
      projectSettings: z
        .object({
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
          gitForkProtection: z.boolean().optional(),
          customerSupportCodeVisibility: z.boolean().optional(),
          gitLFS: z.boolean().optional(),
          devCommand: z.string().nullable().optional(),
          installCommand: z.string().nullable().optional(),
          buildCommand: z.string().nullable().optional(),
          nodeVersion: z
            .enum(["10.x", "12.x", "14.x", "16.x", "18.x", "20.x", "22.x", "24.x", "8.10.x"])
            .optional(),
          outputDirectory: z.string().nullable().optional(),
          rootDirectory: z.string().nullable().optional(),
          sourceFilesOutsideRootDirectory: z.boolean().optional(),
          commandForIgnoringBuildStep: z.string().nullable().optional(),
          createdAt: z.number().optional(),
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
          skipGitConnectDuringLink: z.boolean().optional(),
          gitComments: z.object({ onPullRequest: z.boolean(), onCommit: z.boolean() }).optional(),
        })
        .optional(),
      connectBuildsEnabled: z.boolean().optional(),
      connectConfigurationId: z.string().optional(),
      passiveConnectConfigurationId: z.string().optional(),
      expiration: z.number().optional(),
      proposedExpiration: z.number().optional(),
      platform: z
        .object({
          source: z.object({ name: z.string() }),
          origin: z.object({ type: z.enum(["id", "url"]), value: z.string() }),
          creator: z.object({ name: z.string(), avatar: z.string().optional() }),
          meta: z.record(z.string(), z.string()).optional(),
        })
        .optional(),
      customEnvironment: z.object({ id: z.string(), slug: z.string().optional() }).optional(),
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
  ),
});

export type UseGetApiV7DeploymentsArgs = {
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

export const getApiV7DeploymentsQueryOptions = (args: UseGetApiV7DeploymentsArgs) =>
  queryOptions({
    queryKey: [
      "GET /v7/deployments",
      "deployments",
      args.app,
      args.from,
      args.limit,
      args.projectId,
      args.projectIds,
      args.target,
      args.to,
      args.users,
      args.since,
      args.until,
      args.state,
      args.rollbackCandidate,
      args.branch,
      args.sha,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v7/deployments", {
          app: args.app,
          from: args.from,
          limit: args.limit,
          projectId: args.projectId,
          projectIds: args.projectIds,
          target: args.target,
          to: args.to,
          users: args.users,
          since: args.since,
          until: args.until,
          state: args.state,
          rollbackCandidate: args.rollbackCandidate,
          branch: args.branch,
          sha: args.sha,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV7DeploymentsResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV7Deployments = (args: UseGetApiV7DeploymentsArgs) =>
  useQuery(getApiV7DeploymentsQueryOptions(args));
