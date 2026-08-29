import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuidArgs = {
  teamSlug: string;
  projectSlug: string;
  repositoryName: string;
  uuid: string;
};

export const useDeleteApiV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuidResponse = z.unknown();

export type UseDeleteApiV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuidResponse = unknown;

export type DeleteApiV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuidBody = void;

export const useDeleteApiV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuid = (
  options: UseMutationOptions<
    UseDeleteApiV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuidResponse,
    Error,
    UseDeleteApiV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuidArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuidArgs) =>
      apiFetch(
        buildUrl("/v2/{teamSlug}/{projectSlug}/{repositoryName}/blobs/uploads/{uuid}", {
          teamSlug: args.teamSlug,
          projectSlug: args.projectSlug,
          repositoryName: args.repositoryName,
          uuid: args.uuid,
        }),
        useDeleteApiV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuidResponse,
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
