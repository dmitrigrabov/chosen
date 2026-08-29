import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UsePatchApiV1DeploymentsDeploymentIdIntegrationsIntegrationConfigurationIdResourcesResourceIdActionsActionArgs =
  {
    deploymentId: string;
    integrationConfigurationId: string;
    resourceId: string;
    action: string;
    body: {
      status?: ("running" | "succeeded" | "failed") | undefined;
      statusText?: string | undefined;
      statusUrl?: string | undefined;
      outcomes?:
        | Array<{ kind: string; secrets: Array<{ name: string; value: string }> }>
        | undefined;
    };
  };

export const usePatchApiV1DeploymentsDeploymentIdIntegrationsIntegrationConfigurationIdResourcesResourceIdActionsActionResponse =
  z.void();

export type UsePatchApiV1DeploymentsDeploymentIdIntegrationsIntegrationConfigurationIdResourcesResourceIdActionsActionResponse =
  void;

export type PatchApiV1DeploymentsDeploymentIdIntegrationsIntegrationConfigurationIdResourcesResourceIdActionsActionBody =
  {
    status?: ("running" | "succeeded" | "failed") | undefined;
    statusText?: string | undefined;
    statusUrl?: string | undefined;
    outcomes?: Array<{ kind: string; secrets: Array<{ name: string; value: string }> }> | undefined;
  };

export const usePatchApiV1DeploymentsDeploymentIdIntegrationsIntegrationConfigurationIdResourcesResourceIdActionsAction =
  (
    options: UseMutationOptions<
      UsePatchApiV1DeploymentsDeploymentIdIntegrationsIntegrationConfigurationIdResourcesResourceIdActionsActionResponse,
      Error,
      UsePatchApiV1DeploymentsDeploymentIdIntegrationsIntegrationConfigurationIdResourcesResourceIdActionsActionArgs,
      unknown
    > = {},
  ) => {
    const queryClient = useQueryClient();

    const { onSuccess, ...rest } = options;

    return useMutation({
      mutationFn: (
        args: UsePatchApiV1DeploymentsDeploymentIdIntegrationsIntegrationConfigurationIdResourcesResourceIdActionsActionArgs,
      ) =>
        apiFetch(
          buildUrl(
            "/v1/deployments/{deploymentId}/integrations/{integrationConfigurationId}/resources/{resourceId}/actions/{action}",
            {
              deploymentId: args.deploymentId,
              integrationConfigurationId: args.integrationConfigurationId,
              resourceId: args.resourceId,
              action: args.action,
            },
          ),
          usePatchApiV1DeploymentsDeploymentIdIntegrationsIntegrationConfigurationIdResourcesResourceIdActionsActionResponse,
          {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(args.body),
          },
        ),
      onSuccess: (data, variables, onMutateResult, context) => {
        // Invalidate and refetch
        void queryClient.invalidateQueries({ queryKey: ["deployments", "integrations"] });

        onSuccess?.(data, variables, onMutateResult, context);
      },
      ...rest,
    });
  };
