import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdArgs = {
  integrationConfigurationId: string;
  resourceId: string;
};

export const useGetApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdResponse =
  z.object({
    id: z.string(),
    internalId: z.string(),
    name: z.string(),
    status: z
      .enum(["error", "onboarding", "pending", "ready", "resumed", "suspended", "uninstalled"])
      .optional(),
    productId: z.string(),
    protocolSettings: z
      .object({
        experimentation: z
          .object({ edgeConfigId: z.string().optional(), globalConfigId: z.string().optional() })
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
  });

export const getApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdQueryOptions = (
  args: UseGetApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/installations/{integrationConfigurationId}/resources/{resourceId}",
      "marketplace",
      args.integrationConfigurationId,
      args.resourceId,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/installations/{integrationConfigurationId}/resources/{resourceId}", {
          integrationConfigurationId: args.integrationConfigurationId,
          resourceId: args.resourceId,
        }),
        useGetApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV1InstallationsIntegrationConfigurationIdResourcesResourceId = (
  args: UseGetApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdArgs,
) => useQuery(getApiV1InstallationsIntegrationConfigurationIdResourcesResourceIdQueryOptions(args));
