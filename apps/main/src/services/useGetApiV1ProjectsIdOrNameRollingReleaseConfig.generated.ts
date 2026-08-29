import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1ProjectsIdOrNameRollingReleaseConfigArgs = {
  idOrName: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useGetApiV1ProjectsIdOrNameRollingReleaseConfigResponse = z.object({
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
    .nullable(),
});

export const getApiV1ProjectsIdOrNameRollingReleaseConfigQueryOptions = (
  args: UseGetApiV1ProjectsIdOrNameRollingReleaseConfigArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/projects/{idOrName}/rolling-release/config",
      "rolling-release",
      args.idOrName,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/projects/{idOrName}/rolling-release/config", {
          idOrName: args.idOrName,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV1ProjectsIdOrNameRollingReleaseConfigResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV1ProjectsIdOrNameRollingReleaseConfig = (
  args: UseGetApiV1ProjectsIdOrNameRollingReleaseConfigArgs,
) => useQuery(getApiV1ProjectsIdOrNameRollingReleaseConfigQueryOptions(args));
