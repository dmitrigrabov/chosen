import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1InstallationsIntegrationConfigurationIdEventsArgs = {
  integrationConfigurationId: string;
  body: {
    event:
      | { type: "installation.updated"; billingPlanId?: string | undefined }
      | { type: "resource.updated"; productId?: string | undefined; resourceId: string };
  };
};

export const useCreateApiV1InstallationsIntegrationConfigurationIdEventsResponse = z.void();

export type UseCreateApiV1InstallationsIntegrationConfigurationIdEventsResponse = void;

export type CreateApiV1InstallationsIntegrationConfigurationIdEventsBody = {
  event:
    | { type: "installation.updated"; billingPlanId?: string | undefined }
    | { type: "resource.updated"; productId?: string | undefined; resourceId: string };
};

export const useCreateApiV1InstallationsIntegrationConfigurationIdEvents = (
  options: UseMutationOptions<
    UseCreateApiV1InstallationsIntegrationConfigurationIdEventsResponse,
    Error,
    UseCreateApiV1InstallationsIntegrationConfigurationIdEventsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1InstallationsIntegrationConfigurationIdEventsArgs) =>
      apiFetch(
        buildUrl("/v1/installations/{integrationConfigurationId}/events", {
          integrationConfigurationId: args.integrationConfigurationId,
        }),
        useCreateApiV1InstallationsIntegrationConfigurationIdEventsResponse,
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
