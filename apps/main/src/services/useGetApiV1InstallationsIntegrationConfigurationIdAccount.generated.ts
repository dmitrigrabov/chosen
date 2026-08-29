import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1InstallationsIntegrationConfigurationIdAccountArgs = {
  integrationConfigurationId: string;
};

export const useGetApiV1InstallationsIntegrationConfigurationIdAccountResponse = z.object({
  name: z.string().optional(),
  url: z.string(),
  contact: z.object({ email: z.string(), name: z.string().optional() }).nullable(),
});

export const getApiV1InstallationsIntegrationConfigurationIdAccountQueryOptions = (
  args: UseGetApiV1InstallationsIntegrationConfigurationIdAccountArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/installations/{integrationConfigurationId}/account",
      "marketplace",
      args.integrationConfigurationId,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/installations/{integrationConfigurationId}/account", {
          integrationConfigurationId: args.integrationConfigurationId,
        }),
        useGetApiV1InstallationsIntegrationConfigurationIdAccountResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV1InstallationsIntegrationConfigurationIdAccount = (
  args: UseGetApiV1InstallationsIntegrationConfigurationIdAccountArgs,
) => useQuery(getApiV1InstallationsIntegrationConfigurationIdAccountQueryOptions(args));
