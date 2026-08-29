import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV1VcrRepositoryIdOrNameImagesImageIdArgs = {
  projectId: string;
  idOrName: string;
  imageId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useDeleteApiV1VcrRepositoryIdOrNameImagesImageIdResponse = z.unknown();

export type UseDeleteApiV1VcrRepositoryIdOrNameImagesImageIdResponse = unknown;

export type DeleteApiV1VcrRepositoryIdOrNameImagesImageIdBody = void;

export const useDeleteApiV1VcrRepositoryIdOrNameImagesImageId = (
  options: UseMutationOptions<
    UseDeleteApiV1VcrRepositoryIdOrNameImagesImageIdResponse,
    Error,
    UseDeleteApiV1VcrRepositoryIdOrNameImagesImageIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiV1VcrRepositoryIdOrNameImagesImageIdArgs) =>
      apiFetch(
        buildUrl("/v1/vcr/repository/{idOrName}/images/{imageId}", {
          idOrName: args.idOrName,
          imageId: args.imageId,
          projectId: args.projectId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useDeleteApiV1VcrRepositoryIdOrNameImagesImageIdResponse,
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
