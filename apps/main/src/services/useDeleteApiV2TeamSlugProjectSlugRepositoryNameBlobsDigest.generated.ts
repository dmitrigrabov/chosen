import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV2TeamSlugProjectSlugRepositoryNameBlobsDigestArgs = {
  teamSlug: string;
  projectSlug: string;
  repositoryName: string;
  digest: string;
};

export const useDeleteApiV2TeamSlugProjectSlugRepositoryNameBlobsDigestResponse = z.void();

export type UseDeleteApiV2TeamSlugProjectSlugRepositoryNameBlobsDigestResponse = void;

export type DeleteApiV2TeamSlugProjectSlugRepositoryNameBlobsDigestBody = void;

export const useDeleteApiV2TeamSlugProjectSlugRepositoryNameBlobsDigest = (
  options: UseMutationOptions<
    UseDeleteApiV2TeamSlugProjectSlugRepositoryNameBlobsDigestResponse,
    Error,
    UseDeleteApiV2TeamSlugProjectSlugRepositoryNameBlobsDigestArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiV2TeamSlugProjectSlugRepositoryNameBlobsDigestArgs) =>
      apiFetch(
        buildUrl("/v2/{teamSlug}/{projectSlug}/{repositoryName}/blobs/{digest}", {
          teamSlug: args.teamSlug,
          projectSlug: args.projectSlug,
          repositoryName: args.repositoryName,
          digest: args.digest,
        }),
        useDeleteApiV2TeamSlugProjectSlugRepositoryNameBlobsDigestResponse,
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
