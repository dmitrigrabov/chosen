import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UsePatchApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdArgs = {
  integrationConfigurationId: string;
  resourceId: string;
  body: {
    ownership?: ("owned" | "linked" | "sandbox") | undefined;
    name?: string | undefined;
    status?:
      | ("ready" | "pending" | "onboarding" | "suspended" | "resumed" | "uninstalled" | "error")
      | undefined;
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
      | (
          | {
              level: "info" | "warn" | "error";
              title: string;
              message?: string | undefined;
              href?: string | undefined;
            }
          | string
        )
      | undefined;
    extras?: Record<string, unknown> | undefined;
    secrets?:
      | (
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
          | {
              secrets: Array<{
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
              }>;
              partial?: boolean | undefined;
            }
        )
      | undefined;
  };
};

export const usePatchApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdResponse =
  z.object({ name: z.string() });

export type UsePatchApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdResponse = {
  name: string;
};

export type PatchApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdBody = {
  ownership?: ("owned" | "linked" | "sandbox") | undefined;
  name?: string | undefined;
  status?:
    | ("ready" | "pending" | "onboarding" | "suspended" | "resumed" | "uninstalled" | "error")
    | undefined;
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
    | (
        | {
            level: "info" | "warn" | "error";
            title: string;
            message?: string | undefined;
            href?: string | undefined;
          }
        | string
      )
    | undefined;
  extras?: Record<string, unknown> | undefined;
  secrets?:
    | (
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
        | {
            secrets: Array<{
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
            }>;
            partial?: boolean | undefined;
          }
      )
    | undefined;
};

export const usePatchApiV1InstallationsIntegrationConfigurationIdResourcesResourceId = (
  options: UseMutationOptions<
    UsePatchApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdResponse,
    Error,
    UsePatchApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (
      args: UsePatchApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdArgs,
    ) =>
      apiFetch(
        buildUrl("/v1/installations/{integrationConfigurationId}/resources/{resourceId}", {
          integrationConfigurationId: args.integrationConfigurationId,
          resourceId: args.resourceId,
        }),
        usePatchApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdResponse,
        {
          method: "PATCH",
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
