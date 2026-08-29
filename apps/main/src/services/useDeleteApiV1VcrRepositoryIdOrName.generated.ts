import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV1VcrRepositoryIdOrNameArgs = {
  projectId: string;
  idOrName: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useDeleteApiV1VcrRepositoryIdOrNameResponse = z.unknown();

export type UseDeleteApiV1VcrRepositoryIdOrNameResponse = unknown;

export type DeleteApiV1VcrRepositoryIdOrNameBody = void;

export const useDeleteApiV1VcrRepositoryIdOrName = (
  options: UseMutationOptions<
    UseDeleteApiV1VcrRepositoryIdOrNameResponse,
    Error,
    UseDeleteApiV1VcrRepositoryIdOrNameArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiV1VcrRepositoryIdOrNameArgs) =>
      apiFetch(
        buildUrl("/v1/vcr/repository/{idOrName}", {
          idOrName: args.idOrName,
          projectId: args.projectId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useDeleteApiV1VcrRepositoryIdOrNameResponse,
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
