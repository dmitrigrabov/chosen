import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1InstallationsIntegrationConfigurationIdBillingInvoicesInvoiceIdActionsArgs =
  {
    integrationConfigurationId: string;
    invoiceId: string;
    body: { action: "refund"; reason: string; total: string };
  };

export const useCreateApiV1InstallationsIntegrationConfigurationIdBillingInvoicesInvoiceIdActionsResponse =
  z.void();

export type UseCreateApiV1InstallationsIntegrationConfigurationIdBillingInvoicesInvoiceIdActionsResponse =
  void;

export type CreateApiV1InstallationsIntegrationConfigurationIdBillingInvoicesInvoiceIdActionsBody =
  { action: "refund"; reason: string; total: string };

export const useCreateApiV1InstallationsIntegrationConfigurationIdBillingInvoicesInvoiceIdActions =
  (
    options: UseMutationOptions<
      UseCreateApiV1InstallationsIntegrationConfigurationIdBillingInvoicesInvoiceIdActionsResponse,
      Error,
      UseCreateApiV1InstallationsIntegrationConfigurationIdBillingInvoicesInvoiceIdActionsArgs,
      unknown
    > = {},
  ) => {
    const queryClient = useQueryClient();

    const { onSuccess, ...rest } = options;

    return useMutation({
      mutationFn: (
        args: UseCreateApiV1InstallationsIntegrationConfigurationIdBillingInvoicesInvoiceIdActionsArgs,
      ) =>
        apiFetch(
          buildUrl(
            "/v1/installations/{integrationConfigurationId}/billing/invoices/{invoiceId}/actions",
            {
              integrationConfigurationId: args.integrationConfigurationId,
              invoiceId: args.invoiceId,
            },
          ),
          useCreateApiV1InstallationsIntegrationConfigurationIdBillingInvoicesInvoiceIdActionsResponse,
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
