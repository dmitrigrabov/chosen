import { segment } from "packages/models/src/segment.generated.ts";
import { z } from "zod";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV1ProjectsProjectIdOrNameFeatureFlagsSegmentsResponse = z.object({
  data: z.array(segment),
});

export type UseGetApiV1ProjectsProjectIdOrNameFeatureFlagsSegmentsArgs = {
  projectIdOrName: string;
  withMetadata?: boolean | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV1ProjectsProjectIdOrNameFeatureFlagsSegmentsQueryOptions = (
  args: UseGetApiV1ProjectsProjectIdOrNameFeatureFlagsSegmentsArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/projects/{projectIdOrName}/feature-flags/segments",
      "feature-flags",
      args.projectIdOrName,
      args.withMetadata,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/projects/{projectIdOrName}/feature-flags/segments", {
          projectIdOrName: args.projectIdOrName,
          withMetadata: args.withMetadata,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV1ProjectsProjectIdOrNameFeatureFlagsSegmentsResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV1ProjectsProjectIdOrNameFeatureFlagsSegments = (
  args: UseGetApiV1ProjectsProjectIdOrNameFeatureFlagsSegmentsArgs,
) => useQuery(getApiV1ProjectsProjectIdOrNameFeatureFlagsSegmentsQueryOptions(args));
