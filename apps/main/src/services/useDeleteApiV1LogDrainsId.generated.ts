import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV1LogDrainsIdArgs = {
  id: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useDeleteApiV1LogDrainsIdResponse = z.void();

export type UseDeleteApiV1LogDrainsIdResponse = void;

export type DeleteApiV1LogDrainsIdBody = void;

export const useDeleteApiV1LogDrainsId = (
  options: UseMutationOptions<
    UseDeleteApiV1LogDrainsIdResponse,
    Error,
    UseDeleteApiV1LogDrainsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiV1LogDrainsIdArgs) =>
      apiFetch(
        buildUrl("/v1/log-drains/{id}", { id: args.id, teamId: args.teamId, slug: args.slug }),
        useDeleteApiV1LogDrainsIdResponse,
        { method: "DELETE" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["logDrains"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
