import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseUpdateApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdSecretsArgs = {
  integrationConfigurationId: string;
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

export const useUpdateApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdSecretsResponse =
  z.void();

export type UseUpdateApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdSecretsResponse =
  void;

export type UpdateApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdSecretsBody = {
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

export const useUpdateApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdSecrets = (
  options: UseMutationOptions<
    UseUpdateApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdSecretsResponse,
    Error,
    UseUpdateApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdSecretsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (
      args: UseUpdateApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdSecretsArgs,
    ) =>
      apiFetch(
        buildUrl("/v1/installations/{integrationConfigurationId}/resources/{resourceId}/secrets", {
          integrationConfigurationId: args.integrationConfigurationId,
          resourceId: args.resourceId,
        }),
        useUpdateApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdSecretsResponse,
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
