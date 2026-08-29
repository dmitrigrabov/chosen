import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseUpdateApiV1InstallationsIntegrationConfigurationIdProductsIntegrationProductIdOrSlugResourcesResourceIdSecretsArgs =
  {
    integrationConfigurationId: string;
    integrationProductIdOrSlug: string;
    resourceId: string;
    body: {
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
    };
  };

export const useUpdateApiV1InstallationsIntegrationConfigurationIdProductsIntegrationProductIdOrSlugResourcesResourceIdSecretsResponse =
  z.void();

export type UseUpdateApiV1InstallationsIntegrationConfigurationIdProductsIntegrationProductIdOrSlugResourcesResourceIdSecretsResponse =
  void;

export type UpdateApiV1InstallationsIntegrationConfigurationIdProductsIntegrationProductIdOrSlugResourcesResourceIdSecretsBody =
  {
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
  };

export const useUpdateApiV1InstallationsIntegrationConfigurationIdProductsIntegrationProductIdOrSlugResourcesResourceIdSecrets =
  (
    options: UseMutationOptions<
      UseUpdateApiV1InstallationsIntegrationConfigurationIdProductsIntegrationProductIdOrSlugResourcesResourceIdSecretsResponse,
      Error,
      UseUpdateApiV1InstallationsIntegrationConfigurationIdProductsIntegrationProductIdOrSlugResourcesResourceIdSecretsArgs,
      unknown
    > = {},
  ) => {
    const queryClient = useQueryClient();

    const { onSuccess, ...rest } = options;

    return useMutation({
      mutationFn: (
        args: UseUpdateApiV1InstallationsIntegrationConfigurationIdProductsIntegrationProductIdOrSlugResourcesResourceIdSecretsArgs,
      ) =>
        apiFetch(
          buildUrl(
            "/v1/installations/{integrationConfigurationId}/products/{integrationProductIdOrSlug}/resources/{resourceId}/secrets",
            {
              integrationConfigurationId: args.integrationConfigurationId,
              integrationProductIdOrSlug: args.integrationProductIdOrSlug,
              resourceId: args.resourceId,
            },
          ),
          useUpdateApiV1InstallationsIntegrationConfigurationIdProductsIntegrationProductIdOrSlugResourcesResourceIdSecretsResponse,
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
