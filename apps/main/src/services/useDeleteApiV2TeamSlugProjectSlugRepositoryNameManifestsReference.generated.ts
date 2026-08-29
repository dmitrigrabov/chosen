import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV2TeamSlugProjectSlugRepositoryNameManifestsReferenceArgs = {
  teamSlug: string;
  projectSlug: string;
  repositoryName: string;
  reference: string;
};

export const useDeleteApiV2TeamSlugProjectSlugRepositoryNameManifestsReferenceResponse =
  z.unknown();

export type UseDeleteApiV2TeamSlugProjectSlugRepositoryNameManifestsReferenceResponse = unknown;

export type DeleteApiV2TeamSlugProjectSlugRepositoryNameManifestsReferenceBody = void;

export const useDeleteApiV2TeamSlugProjectSlugRepositoryNameManifestsReference = (
  options: UseMutationOptions<
    UseDeleteApiV2TeamSlugProjectSlugRepositoryNameManifestsReferenceResponse,
    Error,
    UseDeleteApiV2TeamSlugProjectSlugRepositoryNameManifestsReferenceArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiV2TeamSlugProjectSlugRepositoryNameManifestsReferenceArgs) =>
      apiFetch(
        buildUrl("/v2/{teamSlug}/{projectSlug}/{repositoryName}/manifests/{reference}", {
          teamSlug: args.teamSlug,
          projectSlug: args.projectSlug,
          repositoryName: args.repositoryName,
          reference: args.reference,
        }),
        useDeleteApiV2TeamSlugProjectSlugRepositoryNameManifestsReferenceResponse,
        { method: "DELETE" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["vcr"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
