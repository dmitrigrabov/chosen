import {
  globalConfigItemValue,
  type GlobalConfigItemValue,
} from "packages/models/src/globalConfigItemValue.generated.ts";
import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseUpdateApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationGlobalConfigArgs =
  {
    integrationConfigurationId: string;
    resourceId: string;
    body: { data: Record<string, unknown> };
  };

export const useUpdateApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationGlobalConfigResponse =
  z.object({
    items: z.record(z.string(), globalConfigItemValue),
    updatedAt: z.number(),
    digest: z.string(),
    purpose: z.enum(["experimentation", "flags"]).optional(),
  });

export type UseUpdateApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationGlobalConfigResponse =
  {
    items: Record<string, GlobalConfigItemValue>;
    updatedAt: number;
    digest: string;
    purpose?: ("experimentation" | "flags") | undefined;
  };

export type UpdateApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationGlobalConfigBody =
  { data: Record<string, unknown> };

export const useUpdateApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationGlobalConfig =
  (
    options: UseMutationOptions<
      UseUpdateApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationGlobalConfigResponse,
      Error,
      UseUpdateApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationGlobalConfigArgs,
      unknown
    > = {},
  ) => {
    const queryClient = useQueryClient();

    const { onSuccess, ...rest } = options;

    return useMutation({
      mutationFn: (
        args: UseUpdateApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationGlobalConfigArgs,
      ) =>
        apiFetch(
          buildUrl(
            "/v1/installations/{integrationConfigurationId}/resources/{resourceId}/experimentation/global-config",
            {
              integrationConfigurationId: args.integrationConfigurationId,
              resourceId: args.resourceId,
            },
          ),
          useUpdateApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationGlobalConfigResponse,
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
