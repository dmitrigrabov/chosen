import { segment } from "packages/models/src/segment.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1ProjectsProjectIdOrNameFeatureFlagsSegmentsSegmentIdOrSlugArgs = {
  projectIdOrName: string;
  segmentIdOrSlug: string;
  withMetadata?: boolean | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV1ProjectsProjectIdOrNameFeatureFlagsSegmentsSegmentIdOrSlugQueryOptions = (
  args: UseGetApiV1ProjectsProjectIdOrNameFeatureFlagsSegmentsSegmentIdOrSlugArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/projects/{projectIdOrName}/feature-flags/segments/{segmentIdOrSlug}",
      "feature-flags",
      args.projectIdOrName,
      args.segmentIdOrSlug,
      args.withMetadata,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/projects/{projectIdOrName}/feature-flags/segments/{segmentIdOrSlug}", {
          projectIdOrName: args.projectIdOrName,
          segmentIdOrSlug: args.segmentIdOrSlug,
          withMetadata: args.withMetadata,
          teamId: args.teamId,
          slug: args.slug,
        }),
        segment,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV1ProjectsProjectIdOrNameFeatureFlagsSegmentsSegmentIdOrSlug = (
  args: UseGetApiV1ProjectsProjectIdOrNameFeatureFlagsSegmentsSegmentIdOrSlugArgs,
) => useQuery(getApiV1ProjectsProjectIdOrNameFeatureFlagsSegmentsSegmentIdOrSlugQueryOptions(args));
