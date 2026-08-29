import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UsePatchApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationItemsItemIdArgs =
  {
    integrationConfigurationId: string;
    resourceId: string;
    itemId: string;
    body: {
      slug: string;
      origin: string;
      name?: string | undefined;
      category?: ("experiment" | "flag") | undefined;
      description?: string | undefined;
      isArchived?: boolean | undefined;
      createdAt?: number | undefined;
      updatedAt?: number | undefined;
    };
  };

export const usePatchApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationItemsItemIdResponse =
  z.void();

export type UsePatchApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationItemsItemIdResponse =
  void;

export type PatchApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationItemsItemIdBody =
  {
    slug: string;
    origin: string;
    name?: string | undefined;
    category?: ("experiment" | "flag") | undefined;
    description?: string | undefined;
    isArchived?: boolean | undefined;
    createdAt?: number | undefined;
    updatedAt?: number | undefined;
  };

export const usePatchApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationItemsItemId =
  (
    options: UseMutationOptions<
      UsePatchApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationItemsItemIdResponse,
      Error,
      UsePatchApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationItemsItemIdArgs,
      unknown
    > = {},
  ) => {
    const queryClient = useQueryClient();

    const { onSuccess, ...rest } = options;

    return useMutation({
      mutationFn: (
        args: UsePatchApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationItemsItemIdArgs,
      ) =>
        apiFetch(
          buildUrl(
            "/v1/installations/{integrationConfigurationId}/resources/{resourceId}/experimentation/items/{itemId}",
            {
              integrationConfigurationId: args.integrationConfigurationId,
              resourceId: args.resourceId,
              itemId: args.itemId,
            },
          ),
          usePatchApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationItemsItemIdResponse,
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
