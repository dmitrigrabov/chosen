import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV1VcrRepositoryIdOrNamePermissionsArgs = {
  projectId: string;
  idOrName: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: { teamId?: string | undefined; teamSlug?: string | undefined };
};

export const useDeleteApiV1VcrRepositoryIdOrNamePermissionsResponse = z.unknown();

export type UseDeleteApiV1VcrRepositoryIdOrNamePermissionsResponse = unknown;

export type DeleteApiV1VcrRepositoryIdOrNamePermissionsBody = {
  teamId?: string | undefined;
  teamSlug?: string | undefined;
};

export const useDeleteApiV1VcrRepositoryIdOrNamePermissions = (
  options: UseMutationOptions<
    UseDeleteApiV1VcrRepositoryIdOrNamePermissionsResponse,
    Error,
    UseDeleteApiV1VcrRepositoryIdOrNamePermissionsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiV1VcrRepositoryIdOrNamePermissionsArgs) =>
      apiFetch(
        buildUrl("/v1/vcr/repository/{idOrName}/permissions", {
          idOrName: args.idOrName,
          projectId: args.projectId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useDeleteApiV1VcrRepositoryIdOrNamePermissionsResponse,
        {
          method: "DELETE",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["vcr"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
