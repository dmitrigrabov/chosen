import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlugArgs = {
  projectIdOrName: string;
  flagIdOrSlug: string;
  ifMatch?: string | undefined;
  withMetadata?: boolean | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useDeleteApiV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlugResponse = z.void();

export type UseDeleteApiV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlugResponse = void;

export type DeleteApiV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlugBody = void;

export const useDeleteApiV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlug = (
  options: UseMutationOptions<
    UseDeleteApiV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlugResponse,
    Error,
    UseDeleteApiV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlugArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlugArgs) =>
      apiFetch(
        buildUrl("/v1/projects/{projectIdOrName}/feature-flags/flags/{flagIdOrSlug}", {
          projectIdOrName: args.projectIdOrName,
          flagIdOrSlug: args.flagIdOrSlug,
          ifMatch: args.ifMatch,
          withMetadata: args.withMetadata,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useDeleteApiV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlugResponse,
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
