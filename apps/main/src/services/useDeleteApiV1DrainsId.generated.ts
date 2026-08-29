import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV1DrainsIdArgs = {
  id: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useDeleteApiV1DrainsIdResponse = z.void();

export type UseDeleteApiV1DrainsIdResponse = void;

export type DeleteApiV1DrainsIdBody = void;

export const useDeleteApiV1DrainsId = (
  options: UseMutationOptions<
    UseDeleteApiV1DrainsIdResponse,
    Error,
    UseDeleteApiV1DrainsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiV1DrainsIdArgs) =>
      apiFetch(
        buildUrl("/v1/drains/{id}", { id: args.id, teamId: args.teamId, slug: args.slug }),
        useDeleteApiV1DrainsIdResponse,
        { method: "DELETE" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["drains"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
