import { z } from "zod";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV2ProjectsProjectIdOrNameChecksCheckIdResponse = z.object({
  id: z.string(),
  name: z.string(),
  ownerId: z.string(),
  projectId: z.string(),
  isRerequestable: z.boolean(),
  requires: z.enum(["build-ready", "deployment-url", "none"]),
  source: z.union([
    z.object({
      kind: z.literal("integration"),
      integrationId: z.string(),
      integrationConfigurationId: z.string(),
      resourceId: z.string().optional(),
      externalResourceId: z.string().optional(),
    }),
    z.object({ kind: z.literal("webhook"), webhookId: z.string().optional() }),
    z.object({
      kind: z.literal("git-provider"),
      provider: z.enum(["bitbucket", "github", "gitlab"]),
      externalCheckName: z.string(),
    }),
  ]),
  blocks: z.enum([
    "build-start",
    "deployment-alias",
    "deployment-promotion",
    "deployment-start",
    "none",
  ]),
  targets: z.array(z.string()),
  sourceKind: z.enum([
    "git-provider",
    "integration",
    "vercel",
    "webhook",
    "integration",
    "webhook",
    "git-provider",
  ]),
  sourceIntegrationConfigurationId: z.string().optional(),
  timeout: z.number(),
  createdAt: z.number(),
  updatedAt: z.number(),
  deletedAt: z.number().optional(),
});

export type UseGetApiV2ProjectsProjectIdOrNameChecksCheckIdArgs = {
  projectIdOrName: string;
  checkId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV2ProjectsProjectIdOrNameChecksCheckIdQueryOptions = (
  args: UseGetApiV2ProjectsProjectIdOrNameChecksCheckIdArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v2/projects/{projectIdOrName}/checks/{checkId}",
      "checks-v2",
      args.projectIdOrName,
      args.checkId,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v2/projects/{projectIdOrName}/checks/{checkId}", {
          projectIdOrName: args.projectIdOrName,
          checkId: args.checkId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV2ProjectsProjectIdOrNameChecksCheckIdResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV2ProjectsProjectIdOrNameChecksCheckId = (
  args: UseGetApiV2ProjectsProjectIdOrNameChecksCheckIdArgs,
) => useQuery(getApiV2ProjectsProjectIdOrNameChecksCheckIdQueryOptions(args));
