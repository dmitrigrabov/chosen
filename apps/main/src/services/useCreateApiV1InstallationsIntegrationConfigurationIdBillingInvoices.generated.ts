import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1InstallationsIntegrationConfigurationIdBillingInvoicesArgs = {
  integrationConfigurationId: string;
  body: {
    externalId?: string | undefined;
    invoiceDate: string;
    memo?: string | undefined;
    period: { start: string; end: string };
    items: Array<{
      resourceId?: string | undefined;
      billingPlanId: string;
      start?: string | undefined;
      end?: string | undefined;
      name: string;
      details?: string | undefined;
      price: string;
      quantity: number;
      units: string;
      total: string;
    }>;
    discounts?:
      | Array<{
          resourceId?: string | undefined;
          billingPlanId: string;
          start?: string | undefined;
          end?: string | undefined;
          name: string;
          details?: string | undefined;
          amount: string;
        }>
      | undefined;
    final?: boolean | undefined;
    test?:
      | { validate?: boolean | undefined; result?: ("paid" | "notpaid" | "overdue") | undefined }
      | undefined;
  };
};

export const useCreateApiV1InstallationsIntegrationConfigurationIdBillingInvoicesResponse =
  z.object({
    invoiceId: z.string().optional(),
    test: z.boolean().optional(),
    validationErrors: z.array(z.string()).optional(),
  });

export type UseCreateApiV1InstallationsIntegrationConfigurationIdBillingInvoicesResponse = {
  invoiceId?: string | undefined;
  test?: boolean | undefined;
  validationErrors?: Array<string> | undefined;
};

export type CreateApiV1InstallationsIntegrationConfigurationIdBillingInvoicesBody = {
  externalId?: string | undefined;
  invoiceDate: string;
  memo?: string | undefined;
  period: { start: string; end: string };
  items: Array<{
    resourceId?: string | undefined;
    billingPlanId: string;
    start?: string | undefined;
    end?: string | undefined;
    name: string;
    details?: string | undefined;
    price: string;
    quantity: number;
    units: string;
    total: string;
  }>;
  discounts?:
    | Array<{
        resourceId?: string | undefined;
        billingPlanId: string;
        start?: string | undefined;
        end?: string | undefined;
        name: string;
        details?: string | undefined;
        amount: string;
      }>
    | undefined;
  final?: boolean | undefined;
  test?:
    | { validate?: boolean | undefined; result?: ("paid" | "notpaid" | "overdue") | undefined }
    | undefined;
};

export const useCreateApiV1InstallationsIntegrationConfigurationIdBillingInvoices = (
  options: UseMutationOptions<
    UseCreateApiV1InstallationsIntegrationConfigurationIdBillingInvoicesResponse,
    Error,
    UseCreateApiV1InstallationsIntegrationConfigurationIdBillingInvoicesArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1InstallationsIntegrationConfigurationIdBillingInvoicesArgs) =>
      apiFetch(
        buildUrl("/v1/installations/{integrationConfigurationId}/billing/invoices", {
          integrationConfigurationId: args.integrationConfigurationId,
        }),
        useCreateApiV1InstallationsIntegrationConfigurationIdBillingInvoicesResponse,
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
