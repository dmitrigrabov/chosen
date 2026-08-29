import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV1VcrRepositoryIdOrNamePermissionsAllArgs = {
  projectId: string;
  idOrName: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useDeleteApiV1VcrRepositoryIdOrNamePermissionsAllResponse = z.unknown();

export type UseDeleteApiV1VcrRepositoryIdOrNamePermissionsAllResponse = unknown;

export type DeleteApiV1VcrRepositoryIdOrNamePermissionsAllBody = void;

export const useDeleteApiV1VcrRepositoryIdOrNamePermissionsAll = (
  options: UseMutationOptions<
    UseDeleteApiV1VcrRepositoryIdOrNamePermissionsAllResponse,
    Error,
    UseDeleteApiV1VcrRepositoryIdOrNamePermissionsAllArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiV1VcrRepositoryIdOrNamePermissionsAllArgs) =>
      apiFetch(
        buildUrl("/v1/vcr/repository/{idOrName}/permissions/all", {
          idOrName: args.idOrName,
          projectId: args.projectId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useDeleteApiV1VcrRepositoryIdOrNamePermissionsAllResponse,
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
