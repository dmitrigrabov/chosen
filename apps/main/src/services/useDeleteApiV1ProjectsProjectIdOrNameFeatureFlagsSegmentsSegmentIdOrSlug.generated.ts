import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV1ProjectsProjectIdOrNameFeatureFlagsSegmentsSegmentIdOrSlugArgs = {
  projectIdOrName: string;
  segmentIdOrSlug: string;
  withMetadata?: boolean | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useDeleteApiV1ProjectsProjectIdOrNameFeatureFlagsSegmentsSegmentIdOrSlugResponse =
  z.void();

export type UseDeleteApiV1ProjectsProjectIdOrNameFeatureFlagsSegmentsSegmentIdOrSlugResponse = void;

export type DeleteApiV1ProjectsProjectIdOrNameFeatureFlagsSegmentsSegmentIdOrSlugBody = void;

export const useDeleteApiV1ProjectsProjectIdOrNameFeatureFlagsSegmentsSegmentIdOrSlug = (
  options: UseMutationOptions<
    UseDeleteApiV1ProjectsProjectIdOrNameFeatureFlagsSegmentsSegmentIdOrSlugResponse,
    Error,
    UseDeleteApiV1ProjectsProjectIdOrNameFeatureFlagsSegmentsSegmentIdOrSlugArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (
      args: UseDeleteApiV1ProjectsProjectIdOrNameFeatureFlagsSegmentsSegmentIdOrSlugArgs,
    ) =>
      apiFetch(
        buildUrl("/v1/projects/{projectIdOrName}/feature-flags/segments/{segmentIdOrSlug}", {
          projectIdOrName: args.projectIdOrName,
          segmentIdOrSlug: args.segmentIdOrSlug,
          withMetadata: args.withMetadata,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useDeleteApiV1ProjectsProjectIdOrNameFeatureFlagsSegmentsSegmentIdOrSlugResponse,
        { method: "DELETE" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["feature-flags"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
