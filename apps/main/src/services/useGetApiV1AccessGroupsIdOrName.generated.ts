import { z } from "zod";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV1AccessGroupsIdOrNameResponse = z.object({
  teamPermissions: z
    .array(
      z.enum([
        "AiGatewayApiKeyOwnedBySelf",
        "AiGatewayBudgetManager",
        "AiGatewayCredits",
        "AiGatewaySettings",
        "ConnectorManager",
        "CreateProject",
        "EnvVariableManager",
        "EnvironmentManager",
        "FullProductionDeployment",
        "IntegrationManager",
        "OrgAdmin",
        "OrgViewer",
        "UsageViewer",
        "V0Builder",
        "V0Chatter",
        "V0Viewer",
        "WorkflowDecryptor",
      ]),
    )
    .optional(),
  entitlements: z.array(z.literal("v0")).optional(),
  isDsyncManaged: z.boolean(),
  name: z.string(),
  createdAt: z.string(),
  teamId: z.string(),
  updatedAt: z.string(),
  accessGroupId: z.string(),
  membersCount: z.number(),
  projectsCount: z.number(),
  teamRoles: z.array(z.string()).optional(),
});

export type UseGetApiV1AccessGroupsIdOrNameArgs = {
  idOrName: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV1AccessGroupsIdOrNameQueryOptions = (
  args: UseGetApiV1AccessGroupsIdOrNameArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/access-groups/{idOrName}",
      "access-groups",
      args.idOrName,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/access-groups/{idOrName}", {
          idOrName: args.idOrName,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV1AccessGroupsIdOrNameResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV1AccessGroupsIdOrName = (args: UseGetApiV1AccessGroupsIdOrNameArgs) =>
  useQuery(getApiV1AccessGroupsIdOrNameQueryOptions(args));
