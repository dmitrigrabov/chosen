import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1InstallationsIntegrationConfigurationIdBillingFinalizeArgs = {
  integrationConfigurationId: string;
};

export const useCreateApiV1InstallationsIntegrationConfigurationIdBillingFinalizeResponse =
  z.void();

export type UseCreateApiV1InstallationsIntegrationConfigurationIdBillingFinalizeResponse = void;

export type CreateApiV1InstallationsIntegrationConfigurationIdBillingFinalizeBody = void;

export const useCreateApiV1InstallationsIntegrationConfigurationIdBillingFinalize = (
  options: UseMutationOptions<
    UseCreateApiV1InstallationsIntegrationConfigurationIdBillingFinalizeResponse,
    Error,
    UseCreateApiV1InstallationsIntegrationConfigurationIdBillingFinalizeArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1InstallationsIntegrationConfigurationIdBillingFinalizeArgs) =>
      apiFetch(
        buildUrl("/v1/installations/{integrationConfigurationId}/billing/finalize", {
          integrationConfigurationId: args.integrationConfigurationId,
        }),
        useCreateApiV1InstallationsIntegrationConfigurationIdBillingFinalizeResponse,
        { method: "POST" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["marketplace"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
