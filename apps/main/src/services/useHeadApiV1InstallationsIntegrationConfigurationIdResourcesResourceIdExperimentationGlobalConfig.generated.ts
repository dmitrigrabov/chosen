import {
  globalConfigItemValue,
  type GlobalConfigItemValue,
} from "packages/models/src/globalConfigItemValue.generated.ts";
import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseHeadApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationGlobalConfigArgs =
  { integrationConfigurationId: string; resourceId: string };

export const useHeadApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationGlobalConfigResponse =
  z.object({
    items: z.record(z.string(), globalConfigItemValue),
    updatedAt: z.number(),
    digest: z.string(),
    purpose: z.enum(["experimentation", "flags"]).optional(),
  });

export type UseHeadApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationGlobalConfigResponse =
  {
    items: Record<string, GlobalConfigItemValue>;
    updatedAt: number;
    digest: string;
    purpose?: ("experimentation" | "flags") | undefined;
  };

export type HeadApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationGlobalConfigBody =
  void;

export const useHeadApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationGlobalConfig =
  (
    options: UseMutationOptions<
      UseHeadApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationGlobalConfigResponse,
      Error,
      UseHeadApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationGlobalConfigArgs,
      unknown
    > = {},
  ) => {
    const queryClient = useQueryClient();

    const { onSuccess, ...rest } = options;

    return useMutation({
      mutationFn: (
        args: UseHeadApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationGlobalConfigArgs,
      ) =>
        apiFetch(
          buildUrl(
            "/v1/installations/{integrationConfigurationId}/resources/{resourceId}/experimentation/global-config",
            {
              integrationConfigurationId: args.integrationConfigurationId,
              resourceId: args.resourceId,
            },
          ),
          useHeadApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationGlobalConfigResponse,
          { method: "HEAD" },
        ),
      onSuccess: (data, variables, onMutateResult, context) => {
        // Invalidate and refetch
        void queryClient.invalidateQueries({ queryKey: ["marketplace"] });

        onSuccess?.(data, variables, onMutateResult, context);
      },
      ...rest,
    });
  };
