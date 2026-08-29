import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseUpdateApiV2TeamSlugProjectSlugRepositoryNameManifestsReferenceArgs = {
  teamSlug: string;
  projectSlug: string;
  repositoryName: string;
  reference: string;
};

export const useUpdateApiV2TeamSlugProjectSlugRepositoryNameManifestsReferenceResponse =
  z.unknown();

export type UseUpdateApiV2TeamSlugProjectSlugRepositoryNameManifestsReferenceResponse = unknown;

export type UpdateApiV2TeamSlugProjectSlugRepositoryNameManifestsReferenceBody = void;

export const useUpdateApiV2TeamSlugProjectSlugRepositoryNameManifestsReference = (
  options: UseMutationOptions<
    UseUpdateApiV2TeamSlugProjectSlugRepositoryNameManifestsReferenceResponse,
    Error,
    UseUpdateApiV2TeamSlugProjectSlugRepositoryNameManifestsReferenceArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseUpdateApiV2TeamSlugProjectSlugRepositoryNameManifestsReferenceArgs) =>
      apiFetch(
        buildUrl("/v2/{teamSlug}/{projectSlug}/{repositoryName}/manifests/{reference}", {
          teamSlug: args.teamSlug,
          projectSlug: args.projectSlug,
          repositoryName: args.repositoryName,
          reference: args.reference,
        }),
        useUpdateApiV2TeamSlugProjectSlugRepositoryNameManifestsReferenceResponse,
        { method: "PUT" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["vcr"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
