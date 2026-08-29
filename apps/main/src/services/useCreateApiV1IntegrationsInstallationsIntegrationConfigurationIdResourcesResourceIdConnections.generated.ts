import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1IntegrationsInstallationsIntegrationConfigurationIdResourcesResourceIdConnectionsArgs =
  {
    integrationConfigurationId: string;
    resourceId: string;
    teamId?: string | undefined;
    slug?: string | undefined;
    body: {
      projectId: string;
      envVarEnvironments?: Array<"production" | "preview" | "development"> | undefined;
      makeEnvVarsSensitive?: boolean | undefined;
    };
  };

export const useCreateApiV1IntegrationsInstallationsIntegrationConfigurationIdResourcesResourceIdConnectionsResponse =
  z.void();

export type UseCreateApiV1IntegrationsInstallationsIntegrationConfigurationIdResourcesResourceIdConnectionsResponse =
  void;

export type CreateApiV1IntegrationsInstallationsIntegrationConfigurationIdResourcesResourceIdConnectionsBody =
  {
    projectId: string;
    envVarEnvironments?: Array<"production" | "preview" | "development"> | undefined;
    makeEnvVarsSensitive?: boolean | undefined;
  };

export const useCreateApiV1IntegrationsInstallationsIntegrationConfigurationIdResourcesResourceIdConnections =
  (
    options: UseMutationOptions<
      UseCreateApiV1IntegrationsInstallationsIntegrationConfigurationIdResourcesResourceIdConnectionsResponse,
      Error,
      UseCreateApiV1IntegrationsInstallationsIntegrationConfigurationIdResourcesResourceIdConnectionsArgs,
      unknown
    > = {},
  ) => {
    const queryClient = useQueryClient();

    const { onSuccess, ...rest } = options;

    return useMutation({
      mutationFn: (
        args: UseCreateApiV1IntegrationsInstallationsIntegrationConfigurationIdResourcesResourceIdConnectionsArgs,
      ) =>
        apiFetch(
          buildUrl(
            "/v1/integrations/installations/{integrationConfigurationId}/resources/{resourceId}/connections",
            {
              integrationConfigurationId: args.integrationConfigurationId,
              resourceId: args.resourceId,
              teamId: args.teamId,
              slug: args.slug,
            },
          ),
          useCreateApiV1IntegrationsInstallationsIntegrationConfigurationIdResourcesResourceIdConnectionsResponse,
          {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(args.body),
          },
        ),
      onSuccess: (data, variables, onMutateResult, context) => {
        // Invalidate and refetch
        void queryClient.invalidateQueries({ queryKey: ["integrations"] });

        onSuccess?.(data, variables, onMutateResult, context);
      },
      ...rest,
    });
  };
