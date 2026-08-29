import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdArgs = {
  integrationConfigurationId: string;
  resourceId: string;
};

export const useDeleteApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdResponse =
  z.void();

export type UseDeleteApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdResponse = void;

export type DeleteApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdBody = void;

export const useDeleteApiV1InstallationsIntegrationConfigurationIdResourcesResourceId = (
  options: UseMutationOptions<
    UseDeleteApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdResponse,
    Error,
    UseDeleteApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (
      args: UseDeleteApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdArgs,
    ) =>
      apiFetch(
        buildUrl("/v1/installations/{integrationConfigurationId}/resources/{resourceId}", {
          integrationConfigurationId: args.integrationConfigurationId,
          resourceId: args.resourceId,
        }),
        useDeleteApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdResponse,
        { method: "DELETE" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["marketplace"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
