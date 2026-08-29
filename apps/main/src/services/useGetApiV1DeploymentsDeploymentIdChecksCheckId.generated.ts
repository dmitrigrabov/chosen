import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1DeploymentsDeploymentIdChecksCheckIdArgs = {
  deploymentId: string;
  checkId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useGetApiV1DeploymentsDeploymentIdChecksCheckIdResponse = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.number(),
  updatedAt: z.number(),
  deploymentId: z.string(),
  status: z.enum(["completed", "registered", "running"]),
  conclusion: z.enum(["canceled", "failed", "neutral", "skipped", "stale", "succeeded"]).optional(),
  externalId: z.string().optional(),
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
  completedAt: z.number().optional(),
  path: z.string().optional(),
  blocking: z.boolean(),
  detailsUrl: z.string().optional(),
  integrationId: z.string(),
  startedAt: z.number().optional(),
  rerequestable: z.boolean().optional(),
});

export const getApiV1DeploymentsDeploymentIdChecksCheckIdQueryOptions = (
  args: UseGetApiV1DeploymentsDeploymentIdChecksCheckIdArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/deployments/{deploymentId}/checks/{checkId}",
      "checks",
      args.deploymentId,
      args.checkId,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/deployments/{deploymentId}/checks/{checkId}", {
          deploymentId: args.deploymentId,
          checkId: args.checkId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV1DeploymentsDeploymentIdChecksCheckIdResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV1DeploymentsDeploymentIdChecksCheckId = (
  args: UseGetApiV1DeploymentsDeploymentIdChecksCheckIdArgs,
) => useQuery(getApiV1DeploymentsDeploymentIdChecksCheckIdQueryOptions(args));
