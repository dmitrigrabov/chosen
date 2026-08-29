import { z } from "zod";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV3TeamsTeamIdMembersResponse = z.object({
  members: z.array(
    z.object({
      avatar: z.string().optional(),
      confirmed: z.boolean(),
      email: z.string(),
      github: z.object({ login: z.string().optional() }).optional(),
      gitlab: z.object({ login: z.string().optional() }).optional(),
      bitbucket: z.object({ login: z.string().optional() }).optional(),
      role: z.enum([
        "BILLING",
        "CONTRIBUTOR",
        "DEVELOPER",
        "MEMBER",
        "OWNER",
        "SECURITY",
        "VIEWER",
        "VIEWER_FOR_PLUS",
      ]),
      uid: z.string(),
      username: z.string(),
      name: z.string().optional(),
      createdAt: z.number(),
      accessRequestedAt: z.number().optional(),
      joinedFrom: z
        .object({
          origin: z.enum([
            "account-update",
            "bitbucket",
            "dsync",
            "feedback",
            "github",
            "gitlab",
            "import",
            "link",
            "mail",
            "nsnb-auto-approve",
            "nsnb-hobby-upgrade",
            "nsnb-invite",
            "nsnb-redeploy",
            "nsnb-redeploy-attribution-card",
            "nsnb-request-access",
            "nsnb-viewer-upgrade",
            "organization-teams",
            "saml",
            "teams",
          ]),
          commitId: z.string().optional(),
          repoId: z.string().optional(),
          repoPath: z.string().optional(),
          gitUserId: z.union([z.string(), z.number()]).optional(),
          gitUserLogin: z.string().optional(),
          ssoUserId: z.string().optional(),
          ssoConnectedAt: z.number().optional(),
          idpUserId: z.string().optional(),
          dsyncUserId: z.string().optional(),
          dsyncConnectedAt: z.number().optional(),
        })
        .optional(),
      projects: z
        .array(
          z.object({
            name: z.string(),
            id: z.string(),
            role: z
              .enum(["ADMIN", "PROJECT_DEVELOPER", "PROJECT_GUEST", "PROJECT_VIEWER"])
              .optional(),
          }),
        )
        .optional(),
      isEnterpriseManaged: z.boolean().optional(),
    }),
  ),
  emailInviteCodes: z
    .array(
      z.object({
        accessGroups: z.array(z.string()).optional(),
        id: z.string(),
        email: z.string().optional(),
        role: z
          .enum([
            "BILLING",
            "CONTRIBUTOR",
            "DEVELOPER",
            "MEMBER",
            "OWNER",
            "SECURITY",
            "VIEWER",
            "VIEWER_FOR_PLUS",
          ])
          .optional(),
        teamRoles: z
          .array(
            z.enum([
              "BILLING",
              "CONTRIBUTOR",
              "DEVELOPER",
              "MEMBER",
              "OWNER",
              "SECURITY",
              "VIEWER",
              "VIEWER_FOR_PLUS",
            ]),
          )
          .optional(),
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
        isDSyncUser: z.boolean(),
        createdAt: z.number().optional(),
        expired: z.literal(true).optional(),
        projects: z
          .record(
            z.string(),
            z.enum(["ADMIN", "PROJECT_DEVELOPER", "PROJECT_GUEST", "PROJECT_VIEWER"]),
          )
          .optional(),
        entitlements: z.array(z.string()).optional(),
      }),
    )
    .optional(),
  pagination: z.object({
    hasNext: z.boolean(),
    count: z.number(),
    next: z.number().nullable(),
    prev: z.number().nullable(),
  }),
});

export type UseGetApiV3TeamsTeamIdMembersArgs = {
  limit?: number | undefined;
  since?: number | undefined;
  until?: number | undefined;
  search?: string | undefined;
  role?:
    | (
        | "OWNER"
        | "MEMBER"
        | "DEVELOPER"
        | "SECURITY"
        | "BILLING"
        | "VIEWER"
        | "VIEWER_FOR_PLUS"
        | "CONTRIBUTOR"
      )
    | undefined;
  excludeProject?: string | undefined;
  eligibleMembersForProjectId?: string | undefined;
  teamId: string;
  slug?: string | undefined;
};

export const getApiV3TeamsTeamIdMembersQueryOptions = (args: UseGetApiV3TeamsTeamIdMembersArgs) =>
  queryOptions({
    queryKey: [
      "GET /v3/teams/{teamId}/members",
      "teams",
      args.limit,
      args.since,
      args.until,
      args.search,
      args.role,
      args.excludeProject,
      args.eligibleMembersForProjectId,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v3/teams/{teamId}/members", {
          teamId: args.teamId,
          limit: args.limit,
          since: args.since,
          until: args.until,
          search: args.search,
          role: args.role,
          excludeProject: args.excludeProject,
          eligibleMembersForProjectId: args.eligibleMembersForProjectId,
          slug: args.slug,
        }),
        useGetApiV3TeamsTeamIdMembersResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV3TeamsTeamIdMembers = (args: UseGetApiV3TeamsTeamIdMembersArgs) =>
  useQuery(getApiV3TeamsTeamIdMembersQueryOptions(args));
