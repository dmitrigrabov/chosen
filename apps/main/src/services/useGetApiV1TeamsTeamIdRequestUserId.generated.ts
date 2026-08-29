import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1TeamsTeamIdRequestUserIdArgs = { userId: string; teamId: string };

export const useGetApiV1TeamsTeamIdRequestUserIdResponse = z.object({
  teamSlug: z.string(),
  teamName: z.string(),
  confirmed: z.boolean(),
  joinedFrom: z.object({
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
  }),
  accessRequestedAt: z.number(),
  github: z.object({ login: z.string().optional() }).nullable(),
  gitlab: z.object({ login: z.string().optional() }).nullable(),
  bitbucket: z.object({ login: z.string().optional() }).nullable(),
});

export const getApiV1TeamsTeamIdRequestUserIdQueryOptions = (
  args: UseGetApiV1TeamsTeamIdRequestUserIdArgs,
) =>
  queryOptions({
    queryKey: ["GET /v1/teams/{teamId}/request/{userId}", "teams", args.userId, args.teamId],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/teams/{teamId}/request/{userId}", {
          userId: args.userId,
          teamId: args.teamId,
        }),
        useGetApiV1TeamsTeamIdRequestUserIdResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV1TeamsTeamIdRequestUserId = (
  args: UseGetApiV1TeamsTeamIdRequestUserIdArgs,
) => useQuery(getApiV1TeamsTeamIdRequestUserIdQueryOptions(args));
