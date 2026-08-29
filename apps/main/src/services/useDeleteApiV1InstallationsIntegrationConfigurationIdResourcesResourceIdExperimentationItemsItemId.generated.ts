import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationItemsItemIdArgs =
  { integrationConfigurationId: string; resourceId: string; itemId: string };

export const useDeleteApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationItemsItemIdResponse =
  z.void();

export type UseDeleteApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationItemsItemIdResponse =
  void;

export type DeleteApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationItemsItemIdBody =
  void;

export const useDeleteApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationItemsItemId =
  (
    options: UseMutationOptions<
      UseDeleteApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationItemsItemIdResponse,
      Error,
      UseDeleteApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationItemsItemIdArgs,
      unknown
    > = {},
  ) => {
    const queryClient = useQueryClient();

    const { onSuccess, ...rest } = options;

    return useMutation({
      mutationFn: (
        args: UseDeleteApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationItemsItemIdArgs,
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
          useDeleteApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationItemsItemIdResponse,
          { method: "DELETE" },
        ),
      onSuccess: (data, variables, onMutateResult, context) => {
        // Invalidate and refetch
        void queryClient.invalidateQueries({ queryKey: ["marketplace"] });

        onSuccess?.(data, variables, onMutateResult, context);
      },
      ...rest,
    });
  };
