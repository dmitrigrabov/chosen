import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseUpdateApiV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuidArgs = {
  teamSlug: string;
  projectSlug: string;
  repositoryName: string;
  uuid: string;
  digest: string;
};

export const useUpdateApiV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuidResponse = z.unknown();

export type UseUpdateApiV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuidResponse = unknown;

export type UpdateApiV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuidBody = void;

export const useUpdateApiV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuid = (
  options: UseMutationOptions<
    UseUpdateApiV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuidResponse,
    Error,
    UseUpdateApiV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuidArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseUpdateApiV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuidArgs) =>
      apiFetch(
        buildUrl("/v2/{teamSlug}/{projectSlug}/{repositoryName}/blobs/uploads/{uuid}", {
          teamSlug: args.teamSlug,
          projectSlug: args.projectSlug,
          repositoryName: args.repositoryName,
          uuid: args.uuid,
          digest: args.digest,
        }),
        useUpdateApiV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuidResponse,
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
