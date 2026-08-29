import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationItemsArgs =
  {
    integrationConfigurationId: string;
    resourceId: string;
    body: {
      items: Array<{
        id: string;
        slug: string;
        origin: string;
        category?: ("experiment" | "flag") | undefined;
        name?: string | undefined;
        description?: string | undefined;
        isArchived?: boolean | undefined;
        createdAt?: number | undefined;
        updatedAt?: number | undefined;
      }>;
    };
  };

export const useCreateApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationItemsResponse =
  z.void();

export type UseCreateApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationItemsResponse =
  void;

export type CreateApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationItemsBody =
  {
    items: Array<{
      id: string;
      slug: string;
      origin: string;
      category?: ("experiment" | "flag") | undefined;
      name?: string | undefined;
      description?: string | undefined;
      isArchived?: boolean | undefined;
      createdAt?: number | undefined;
      updatedAt?: number | undefined;
    }>;
  };

export const useCreateApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationItems =
  (
    options: UseMutationOptions<
      UseCreateApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationItemsResponse,
      Error,
      UseCreateApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationItemsArgs,
      unknown
    > = {},
  ) => {
    const queryClient = useQueryClient();

    const { onSuccess, ...rest } = options;

    return useMutation({
      mutationFn: (
        args: UseCreateApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationItemsArgs,
      ) =>
        apiFetch(
          buildUrl(
            "/v1/installations/{integrationConfigurationId}/resources/{resourceId}/experimentation/items",
            {
              integrationConfigurationId: args.integrationConfigurationId,
              resourceId: args.resourceId,
            },
          ),
          useCreateApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationItemsResponse,
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
