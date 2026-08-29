import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1InstallationsIntegrationConfigurationIdBillingBalanceArgs = {
  integrationConfigurationId: string;
  body: {
    timestamp: string;
    balances: Array<{
      resourceId?: string | undefined;
      credit?: string | undefined;
      nameLabel?: string | undefined;
      currencyValueInCents: number;
    }>;
  };
};

export const useCreateApiV1InstallationsIntegrationConfigurationIdBillingBalanceResponse = z.void();

export type UseCreateApiV1InstallationsIntegrationConfigurationIdBillingBalanceResponse = void;

export type CreateApiV1InstallationsIntegrationConfigurationIdBillingBalanceBody = {
  timestamp: string;
  balances: Array<{
    resourceId?: string | undefined;
    credit?: string | undefined;
    nameLabel?: string | undefined;
    currencyValueInCents: number;
  }>;
};

export const useCreateApiV1InstallationsIntegrationConfigurationIdBillingBalance = (
  options: UseMutationOptions<
    UseCreateApiV1InstallationsIntegrationConfigurationIdBillingBalanceResponse,
    Error,
    UseCreateApiV1InstallationsIntegrationConfigurationIdBillingBalanceArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1InstallationsIntegrationConfigurationIdBillingBalanceArgs) =>
      apiFetch(
        buildUrl("/v1/installations/{integrationConfigurationId}/billing/balance", {
          integrationConfigurationId: args.integrationConfigurationId,
        }),
        useCreateApiV1InstallationsIntegrationConfigurationIdBillingBalanceResponse,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["marketplace"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
