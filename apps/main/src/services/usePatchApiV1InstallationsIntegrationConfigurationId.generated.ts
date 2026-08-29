import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UsePatchApiV1InstallationsIntegrationConfigurationIdArgs = {
  integrationConfigurationId: string;
  body: {
    status?:
      | ("ready" | "pending" | "onboarding" | "suspended" | "resumed" | "uninstalled" | "error")
      | undefined;
    externalId?: string | undefined;
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
  };
};

export const usePatchApiV1InstallationsIntegrationConfigurationIdResponse = z.void();

export type UsePatchApiV1InstallationsIntegrationConfigurationIdResponse = void;

export type PatchApiV1InstallationsIntegrationConfigurationIdBody = {
  status?:
    | ("ready" | "pending" | "onboarding" | "suspended" | "resumed" | "uninstalled" | "error")
    | undefined;
  externalId?: string | undefined;
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
};

export const usePatchApiV1InstallationsIntegrationConfigurationId = (
  options: UseMutationOptions<
    UsePatchApiV1InstallationsIntegrationConfigurationIdResponse,
    Error,
    UsePatchApiV1InstallationsIntegrationConfigurationIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UsePatchApiV1InstallationsIntegrationConfigurationIdArgs) =>
      apiFetch(
        buildUrl("/v1/installations/{integrationConfigurationId}", {
          integrationConfigurationId: args.integrationConfigurationId,
        }),
        usePatchApiV1InstallationsIntegrationConfigurationIdResponse,
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
