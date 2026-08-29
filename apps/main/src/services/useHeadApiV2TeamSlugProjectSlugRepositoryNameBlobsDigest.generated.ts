import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseHeadApiV2TeamSlugProjectSlugRepositoryNameBlobsDigestArgs = {
  teamSlug: string;
  projectSlug: string;
  repositoryName: string;
  digest: string;
};

export const useHeadApiV2TeamSlugProjectSlugRepositoryNameBlobsDigestResponse = z.unknown();

export type UseHeadApiV2TeamSlugProjectSlugRepositoryNameBlobsDigestResponse = unknown;

export type HeadApiV2TeamSlugProjectSlugRepositoryNameBlobsDigestBody = void;

export const useHeadApiV2TeamSlugProjectSlugRepositoryNameBlobsDigest = (
  options: UseMutationOptions<
    UseHeadApiV2TeamSlugProjectSlugRepositoryNameBlobsDigestResponse,
    Error,
    UseHeadApiV2TeamSlugProjectSlugRepositoryNameBlobsDigestArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseHeadApiV2TeamSlugProjectSlugRepositoryNameBlobsDigestArgs) =>
      apiFetch(
        buildUrl("/v2/{teamSlug}/{projectSlug}/{repositoryName}/blobs/{digest}", {
          teamSlug: args.teamSlug,
          projectSlug: args.projectSlug,
          repositoryName: args.repositoryName,
          digest: args.digest,
        }),
        useHeadApiV2TeamSlugProjectSlugRepositoryNameBlobsDigestResponse,
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
