import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV1WebhooksIdArgs = {
  id: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useDeleteApiV1WebhooksIdResponse = z.void();

export type UseDeleteApiV1WebhooksIdResponse = void;

export type DeleteApiV1WebhooksIdBody = void;

export const useDeleteApiV1WebhooksId = (
  options: UseMutationOptions<
    UseDeleteApiV1WebhooksIdResponse,
    Error,
    UseDeleteApiV1WebhooksIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiV1WebhooksIdArgs) =>
      apiFetch(
        buildUrl("/v1/webhooks/{id}", { id: args.id, teamId: args.teamId, slug: args.slug }),
        useDeleteApiV1WebhooksIdResponse,
        { method: "DELETE" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["webhooks"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
