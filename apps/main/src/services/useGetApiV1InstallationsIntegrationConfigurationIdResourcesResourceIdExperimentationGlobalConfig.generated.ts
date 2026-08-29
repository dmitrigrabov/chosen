import { globalConfigItemValue } from "packages/models/src/globalConfigItemValue.generated.ts";
import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationGlobalConfigArgs =
  { integrationConfigurationId: string; resourceId: string };

export const useGetApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationGlobalConfigResponse =
  z.object({
    items: z.record(z.string(), globalConfigItemValue),
    updatedAt: z.number(),
    digest: z.string(),
    purpose: z.enum(["experimentation", "flags"]).optional(),
  });

export const getApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationGlobalConfigQueryOptions =
  (
    args: UseGetApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationGlobalConfigArgs,
  ) =>
    queryOptions({
      queryKey: [
        "GET /v1/installations/{integrationConfigurationId}/resources/{resourceId}/experimentation/global-config",
        "marketplace",
        args.integrationConfigurationId,
        args.resourceId,
      ],
      queryFn: () =>
        apiFetch(
          buildUrl(
            "/v1/installations/{integrationConfigurationId}/resources/{resourceId}/experimentation/global-config",
            {
              integrationConfigurationId: args.integrationConfigurationId,
              resourceId: args.resourceId,
            },
          ),
          useGetApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationGlobalConfigResponse,
          { method: "GET" },
        ),
    });

export const useGetApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationGlobalConfig =
  (
    args: UseGetApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationGlobalConfigArgs,
  ) =>
    useQuery(
      getApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationGlobalConfigQueryOptions(
        args,
      ),
    );
