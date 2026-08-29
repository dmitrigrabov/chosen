import { z } from "zod";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV1InstallationsIntegrationConfigurationIdResourcesResponse = z.object({
  resources: z.array(
    z.object({
      partnerId: z.string(),
      internalId: z.string(),
      name: z.string(),
      status: z
        .enum(["error", "onboarding", "pending", "ready", "resumed", "suspended", "uninstalled"])
        .optional(),
      productId: z.string(),
      protocolSettings: z
        .object({
          experimentation: z
            .object({
              edgeConfigSyncingEnabled: z.boolean().optional(),
              edgeConfigId: z.string().optional(),
              globalConfigId: z.string().optional(),
              globalConfigSyncingEnabled: z.boolean().optional(),
              edgeConfigTokenId: z.string().optional(),
            })
            .optional(),
          authentication: z
            .object({
              appUrls: z
                .array(
                  z.object({
                    url: z.string(),
                    target: z.enum(["development", "preview", "production"]),
                  }),
                )
                .optional(),
            })
            .optional(),
        })
        .optional(),
      notification: z
        .object({
          level: z.enum(["error", "info", "warn"]),
          title: z.string(),
          message: z.string().optional(),
          href: z.string().optional(),
        })
        .optional(),
      billingPlanId: z.string().optional(),
      metadata: z
        .record(
          z.string(),
          z.union([z.string(), z.number(), z.array(z.string()), z.array(z.number()), z.boolean()]),
        )
        .optional(),
    }),
  ),
});

export type UseGetApiV1InstallationsIntegrationConfigurationIdResourcesArgs = {
  integrationConfigurationId: string;
};

export const getApiV1InstallationsIntegrationConfigurationIdResourcesQueryOptions = (
  args: UseGetApiV1InstallationsIntegrationConfigurationIdResourcesArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/installations/{integrationConfigurationId}/resources",
      "marketplace",
      args.integrationConfigurationId,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/installations/{integrationConfigurationId}/resources", {
          integrationConfigurationId: args.integrationConfigurationId,
        }),
        useGetApiV1InstallationsIntegrationConfigurationIdResourcesResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV1InstallationsIntegrationConfigurationIdResources = (
  args: UseGetApiV1InstallationsIntegrationConfigurationIdResourcesArgs,
) => useQuery(getApiV1InstallationsIntegrationConfigurationIdResourcesQueryOptions(args));
