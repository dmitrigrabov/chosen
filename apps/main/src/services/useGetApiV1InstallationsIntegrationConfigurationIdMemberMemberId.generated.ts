import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1InstallationsIntegrationConfigurationIdMemberMemberIdArgs = {
  integrationConfigurationId: string;
  memberId: string;
};

export const useGetApiV1InstallationsIntegrationConfigurationIdMemberMemberIdResponse = z.object({
  id: z.string(),
  role: z.enum(["ADMIN", "USER"]),
  globalUserId: z.string().optional(),
  userEmail: z.string().optional(),
});

export const getApiV1InstallationsIntegrationConfigurationIdMemberMemberIdQueryOptions = (
  args: UseGetApiV1InstallationsIntegrationConfigurationIdMemberMemberIdArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/installations/{integrationConfigurationId}/member/{memberId}",
      "marketplace",
      args.integrationConfigurationId,
      args.memberId,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/installations/{integrationConfigurationId}/member/{memberId}", {
          integrationConfigurationId: args.integrationConfigurationId,
          memberId: args.memberId,
        }),
        useGetApiV1InstallationsIntegrationConfigurationIdMemberMemberIdResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV1InstallationsIntegrationConfigurationIdMemberMemberId = (
  args: UseGetApiV1InstallationsIntegrationConfigurationIdMemberMemberIdArgs,
) => useQuery(getApiV1InstallationsIntegrationConfigurationIdMemberMemberIdQueryOptions(args));
