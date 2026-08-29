import { team } from "packages/models/src/team.generated.ts";
import { teamLimited } from "packages/models/src/teamLimited.generated.ts";
import { z } from "zod";
import { pagination } from "packages/models/src/pagination.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV2TeamsResponse = z.object({
  teams: z.array(z.union([team, teamLimited])),
  pagination: pagination,
});

export type UseGetApiV2TeamsArgs = {
  limit?: number | undefined;
  since?: number | undefined;
  until?: number | undefined;
};

export const getApiV2TeamsQueryOptions = (args: UseGetApiV2TeamsArgs) =>
  queryOptions({
    queryKey: ["GET /v2/teams", "teams", args.limit, args.since, args.until],
    queryFn: () =>
      apiFetch(
        buildUrl("/v2/teams", { limit: args.limit, since: args.since, until: args.until }),
        useGetApiV2TeamsResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV2Teams = (args: UseGetApiV2TeamsArgs) =>
  useQuery(getApiV2TeamsQueryOptions(args));
