import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UsePatchApiV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuidArgs = {
  teamSlug: string;
  projectSlug: string;
  repositoryName: string;
  uuid: string;
};

export const usePatchApiV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuidResponse = z.unknown();

export type UsePatchApiV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuidResponse = unknown;

export type PatchApiV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuidBody = void;

export const usePatchApiV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuid = (
  options: UseMutationOptions<
    UsePatchApiV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuidResponse,
    Error,
    UsePatchApiV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuidArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UsePatchApiV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuidArgs) =>
      apiFetch(
        buildUrl("/v2/{teamSlug}/{projectSlug}/{repositoryName}/blobs/uploads/{uuid}", {
          teamSlug: args.teamSlug,
          projectSlug: args.projectSlug,
          repositoryName: args.repositoryName,
          uuid: args.uuid,
        }),
        usePatchApiV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuidResponse,
        { method: "PATCH" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["vcr"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
