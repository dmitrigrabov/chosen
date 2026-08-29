import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV2TeamSlugProjectSlugRepositoryNameBlobsUploadsArgs = {
  teamSlug: string;
  projectSlug: string;
  repositoryName: string;
  mount?: string | undefined;
  from?: string | undefined;
};

export const useCreateApiV2TeamSlugProjectSlugRepositoryNameBlobsUploadsResponse = z.unknown();

export type UseCreateApiV2TeamSlugProjectSlugRepositoryNameBlobsUploadsResponse = unknown;

export type CreateApiV2TeamSlugProjectSlugRepositoryNameBlobsUploadsBody = void;

export const useCreateApiV2TeamSlugProjectSlugRepositoryNameBlobsUploads = (
  options: UseMutationOptions<
    UseCreateApiV2TeamSlugProjectSlugRepositoryNameBlobsUploadsResponse,
    Error,
    UseCreateApiV2TeamSlugProjectSlugRepositoryNameBlobsUploadsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV2TeamSlugProjectSlugRepositoryNameBlobsUploadsArgs) =>
      apiFetch(
        buildUrl("/v2/{teamSlug}/{projectSlug}/{repositoryName}/blobs/uploads/", {
          teamSlug: args.teamSlug,
          projectSlug: args.projectSlug,
          repositoryName: args.repositoryName,
          mount: args.mount,
          from: args.from,
        }),
        useCreateApiV2TeamSlugProjectSlugRepositoryNameBlobsUploadsResponse,
        { method: "POST" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["vcr"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
