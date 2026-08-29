import { team } from "packages/models/src/team.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV2TeamsTeamIdArgs = { slug?: string | undefined; teamId: string };

export const getApiV2TeamsTeamIdQueryOptions = (args: UseGetApiV2TeamsTeamIdArgs) =>
  queryOptions({
    queryKey: ["GET /v2/teams/{teamId}", "teams", args.slug, args.teamId],
    queryFn: () =>
      apiFetch(buildUrl("/v2/teams/{teamId}", { teamId: args.teamId, slug: args.slug }), team, {
        method: "GET",
      }),
    placeholderData: keepPreviousData,
  });

export const useGetApiV2TeamsTeamId = (args: UseGetApiV2TeamsTeamIdArgs) =>
  useQuery(getApiV2TeamsTeamIdQueryOptions(args));
