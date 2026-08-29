import { z } from "zod";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV1DeploymentsDeploymentIdChecksResponse = z.object({
  checks: z.array(
    z.object({
      completedAt: z.number().optional(),
      conclusion: z
        .enum(["canceled", "failed", "neutral", "skipped", "stale", "succeeded"])
        .optional(),
      createdAt: z.number(),
      detailsUrl: z.string().optional(),
      id: z.string(),
      integrationId: z.string(),
      name: z.string(),
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
                  value: z.number().nullable(),
                  previousValue: z.number().optional(),
                  source: z.literal("web-vitals"),
                })
                .optional(),
            })
            .optional(),
        })
        .optional(),
      path: z.string().optional(),
      rerequestable: z.boolean(),
      blocking: z.boolean(),
      startedAt: z.number().optional(),
      status: z.enum(["completed", "registered", "running"]),
      updatedAt: z.number(),
    }),
  ),
});

export type UseGetApiV1DeploymentsDeploymentIdChecksArgs = {
  deploymentId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV1DeploymentsDeploymentIdChecksQueryOptions = (
  args: UseGetApiV1DeploymentsDeploymentIdChecksArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/deployments/{deploymentId}/checks",
      "checks",
      args.deploymentId,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/deployments/{deploymentId}/checks", {
          deploymentId: args.deploymentId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV1DeploymentsDeploymentIdChecksResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV1DeploymentsDeploymentIdChecks = (
  args: UseGetApiV1DeploymentsDeploymentIdChecksArgs,
) => useQuery(getApiV1DeploymentsDeploymentIdChecksQueryOptions(args));
