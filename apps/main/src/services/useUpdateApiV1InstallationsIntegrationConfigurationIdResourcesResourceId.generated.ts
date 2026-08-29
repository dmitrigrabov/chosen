import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseUpdateApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdArgs = {
  integrationConfigurationId: string;
  resourceId: string;
  body: {
    ownership?: ("owned" | "linked" | "sandbox") | undefined;
    productId: string;
    name: string;
    status: "ready" | "pending" | "onboarding" | "suspended" | "resumed" | "uninstalled" | "error";
    metadata?: Record<string, unknown> | undefined;
    billingPlan?:
      | (
          | {
              id: string;
              type: "prepayment" | "subscription";
              name: string;
              description?: string | undefined;
              paymentMethodRequired?: boolean | undefined;
              cost?: string | undefined;
              details?: Array<{ label: string; value?: string | undefined }> | undefined;
              highlightedDetails?: Array<{ label: string; value?: string | undefined }> | undefined;
              effectiveDate?: string | undefined;
            }
          | Record<string, unknown>
        )
      | undefined;
    notification?:
      | {
          level: "info" | "warn" | "error";
          title: string;
          message?: string | undefined;
          href?: string | undefined;
        }
      | undefined;
    extras?: Record<string, unknown> | undefined;
    secrets?:
      | Array<{
          name: string;
          value: string;
          prefix?: string | undefined;
          environmentOverrides?:
            | {
                development?: string | undefined;
                preview?: string | undefined;
                production?: string | undefined;
              }
            | undefined;
        }>
      | undefined;
  };
};

export const useUpdateApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdResponse =
  z.object({ name: z.string() });

export type UseUpdateApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdResponse = {
  name: string;
};

export type UpdateApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdBody = {
  ownership?: ("owned" | "linked" | "sandbox") | undefined;
  productId: string;
  name: string;
  status: "ready" | "pending" | "onboarding" | "suspended" | "resumed" | "uninstalled" | "error";
  metadata?: Record<string, unknown> | undefined;
  billingPlan?:
    | (
        | {
            id: string;
            type: "prepayment" | "subscription";
            name: string;
            description?: string | undefined;
            paymentMethodRequired?: boolean | undefined;
            cost?: string | undefined;
            details?: Array<{ label: string; value?: string | undefined }> | undefined;
            highlightedDetails?: Array<{ label: string; value?: string | undefined }> | undefined;
            effectiveDate?: string | undefined;
          }
        | Record<string, unknown>
      )
    | undefined;
  notification?:
    | {
        level: "info" | "warn" | "error";
        title: string;
        message?: string | undefined;
        href?: string | undefined;
      }
    | undefined;
  extras?: Record<string, unknown> | undefined;
  secrets?:
    | Array<{
        name: string;
        value: string;
        prefix?: string | undefined;
        environmentOverrides?:
          | {
              development?: string | undefined;
              preview?: string | undefined;
              production?: string | undefined;
            }
          | undefined;
      }>
    | undefined;
};

export const useUpdateApiV1InstallationsIntegrationConfigurationIdResourcesResourceId = (
  options: UseMutationOptions<
    UseUpdateApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdResponse,
    Error,
    UseUpdateApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (
      args: UseUpdateApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdArgs,
    ) =>
      apiFetch(
        buildUrl("/v1/installations/{integrationConfigurationId}/resources/{resourceId}", {
          integrationConfigurationId: args.integrationConfigurationId,
          resourceId: args.resourceId,
        }),
        useUpdateApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdResponse,
        {
          method: "PUT",
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
