import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV1AccessGroupsIdOrNameArgs = {
  idOrName: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useDeleteApiV1AccessGroupsIdOrNameResponse = z.void();

export type UseDeleteApiV1AccessGroupsIdOrNameResponse = void;

export type DeleteApiV1AccessGroupsIdOrNameBody = void;

export const useDeleteApiV1AccessGroupsIdOrName = (
  options: UseMutationOptions<
    UseDeleteApiV1AccessGroupsIdOrNameResponse,
    Error,
    UseDeleteApiV1AccessGroupsIdOrNameArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiV1AccessGroupsIdOrNameArgs) =>
      apiFetch(
        buildUrl("/v1/access-groups/{idOrName}", {
          idOrName: args.idOrName,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useDeleteApiV1AccessGroupsIdOrNameResponse,
        { method: "DELETE" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["access-groups"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
