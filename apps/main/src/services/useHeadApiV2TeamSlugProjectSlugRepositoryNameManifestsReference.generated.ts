import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseHeadApiV2TeamSlugProjectSlugRepositoryNameManifestsReferenceArgs = {
  teamSlug: string;
  projectSlug: string;
  repositoryName: string;
  reference: string;
};

export const useHeadApiV2TeamSlugProjectSlugRepositoryNameManifestsReferenceResponse = z.unknown();

export type UseHeadApiV2TeamSlugProjectSlugRepositoryNameManifestsReferenceResponse = unknown;

export type HeadApiV2TeamSlugProjectSlugRepositoryNameManifestsReferenceBody = void;

export const useHeadApiV2TeamSlugProjectSlugRepositoryNameManifestsReference = (
  options: UseMutationOptions<
    UseHeadApiV2TeamSlugProjectSlugRepositoryNameManifestsReferenceResponse,
    Error,
    UseHeadApiV2TeamSlugProjectSlugRepositoryNameManifestsReferenceArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseHeadApiV2TeamSlugProjectSlugRepositoryNameManifestsReferenceArgs) =>
      apiFetch(
        buildUrl("/v2/{teamSlug}/{projectSlug}/{repositoryName}/manifests/{reference}", {
          teamSlug: args.teamSlug,
          projectSlug: args.projectSlug,
          repositoryName: args.repositoryName,
          reference: args.reference,
        }),
        useHeadApiV2TeamSlugProjectSlugRepositoryNameManifestsReferenceResponse,
        { method: "HEAD" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["vcr"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
