import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV1IntegrationsConfigurationIdArgs = {
  id: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useDeleteApiV1IntegrationsConfigurationIdResponse = z.void();

export type UseDeleteApiV1IntegrationsConfigurationIdResponse = void;

export type DeleteApiV1IntegrationsConfigurationIdBody = void;

export const useDeleteApiV1IntegrationsConfigurationId = (
  options: UseMutationOptions<
    UseDeleteApiV1IntegrationsConfigurationIdResponse,
    Error,
    UseDeleteApiV1IntegrationsConfigurationIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiV1IntegrationsConfigurationIdArgs) =>
      apiFetch(
        buildUrl("/v1/integrations/configuration/{id}", {
          id: args.id,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useDeleteApiV1IntegrationsConfigurationIdResponse,
        { method: "DELETE" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["integrations"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
