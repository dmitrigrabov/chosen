import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1InstallationsIntegrationConfigurationIdBillingArgs = {
  integrationConfigurationId: string;
  body: {
    timestamp: string;
    eod: string;
    period: { start: string; end: string };
    billing:
      | Array<{
          billingPlanId: string;
          resourceId?: string | undefined;
          start?: string | undefined;
          end?: string | undefined;
          name: string;
          details?: string | undefined;
          price: string;
          quantity: number;
          units: string;
          total: string;
        }>
      | {
          items: Array<{
            billingPlanId: string;
            resourceId?: string | undefined;
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
                billingPlanId: string;
                resourceId?: string | undefined;
                start?: string | undefined;
                end?: string | undefined;
                name: string;
                details?: string | undefined;
                amount: string;
              }>
            | undefined;
        };
    usage: Array<{
      resourceId?: string | undefined;
      name: string;
      type: "total" | "interval" | "rate";
      units: string;
      dayValue: number;
      periodValue: number;
      planValue?: number | undefined;
    }>;
  };
};

export const useCreateApiV1InstallationsIntegrationConfigurationIdBillingResponse = z.void();

export type UseCreateApiV1InstallationsIntegrationConfigurationIdBillingResponse = void;

export type CreateApiV1InstallationsIntegrationConfigurationIdBillingBody = {
  timestamp: string;
  eod: string;
  period: { start: string; end: string };
  billing:
    | Array<{
        billingPlanId: string;
        resourceId?: string | undefined;
        start?: string | undefined;
        end?: string | undefined;
        name: string;
        details?: string | undefined;
        price: string;
        quantity: number;
        units: string;
        total: string;
      }>
    | {
        items: Array<{
          billingPlanId: string;
          resourceId?: string | undefined;
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
              billingPlanId: string;
              resourceId?: string | undefined;
              start?: string | undefined;
              end?: string | undefined;
              name: string;
              details?: string | undefined;
              amount: string;
            }>
          | undefined;
      };
  usage: Array<{
    resourceId?: string | undefined;
    name: string;
    type: "total" | "interval" | "rate";
    units: string;
    dayValue: number;
    periodValue: number;
    planValue?: number | undefined;
  }>;
};

export const useCreateApiV1InstallationsIntegrationConfigurationIdBilling = (
  options: UseMutationOptions<
    UseCreateApiV1InstallationsIntegrationConfigurationIdBillingResponse,
    Error,
    UseCreateApiV1InstallationsIntegrationConfigurationIdBillingArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1InstallationsIntegrationConfigurationIdBillingArgs) =>
      apiFetch(
        buildUrl("/v1/installations/{integrationConfigurationId}/billing", {
          integrationConfigurationId: args.integrationConfigurationId,
        }),
        useCreateApiV1InstallationsIntegrationConfigurationIdBillingResponse,
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
