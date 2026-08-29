import { z } from "zod";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV1DeploymentsDeploymentIdFeatureFlagsResponse = z.object({
  flags: z.array(z.object({})),
  status: z
    .object({
      deploymentId: z.string(),
      projectId: z.string(),
      responseStatus: z.number(),
      flagCount: z.number(),
      createdAt: z.number(),
    })
    .nullable(),
});

export type UseGetApiV1DeploymentsDeploymentIdFeatureFlagsArgs = {
  deploymentId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV1DeploymentsDeploymentIdFeatureFlagsQueryOptions = (
  args: UseGetApiV1DeploymentsDeploymentIdFeatureFlagsArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/deployments/{deploymentId}/feature-flags",
      "feature-flags",
      args.deploymentId,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/deployments/{deploymentId}/feature-flags", {
          deploymentId: args.deploymentId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV1DeploymentsDeploymentIdFeatureFlagsResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV1DeploymentsDeploymentIdFeatureFlags = (
  args: UseGetApiV1DeploymentsDeploymentIdFeatureFlagsArgs,
) => useQuery(getApiV1DeploymentsDeploymentIdFeatureFlagsQueryOptions(args));
