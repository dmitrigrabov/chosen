import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV1IntegrationsLogDrainsIdArgs = {
  id: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useDeleteApiV1IntegrationsLogDrainsIdResponse = z.void();

export type UseDeleteApiV1IntegrationsLogDrainsIdResponse = void;

export type DeleteApiV1IntegrationsLogDrainsIdBody = void;

export const useDeleteApiV1IntegrationsLogDrainsId = (
  options: UseMutationOptions<
    UseDeleteApiV1IntegrationsLogDrainsIdResponse,
    Error,
    UseDeleteApiV1IntegrationsLogDrainsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiV1IntegrationsLogDrainsIdArgs) =>
      apiFetch(
        buildUrl("/v1/integrations/log-drains/{id}", {
          id: args.id,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useDeleteApiV1IntegrationsLogDrainsIdResponse,
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
