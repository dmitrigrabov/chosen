import { z } from "zod";
import { flag } from "packages/models/src/flag.generated.ts";
import { marketplaceFlag } from "packages/models/src/marketplaceFlag.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV2TeamsTeamIdFeatureFlagsFlagsResponse = z.object({
  pagination: z.object({ next: z.string().nullable() }),
  data: z.array(z.union([flag, marketplaceFlag])),
});

export type UseGetApiV2TeamsTeamIdFeatureFlagsFlagsArgs = {
  state?: ("active" | "archived") | undefined;
  limit?: number | undefined;
  cursor?: string | undefined;
  search?: string | undefined;
  kind?: ("boolean" | "string" | "number" | "json") | undefined;
  tags?: Array<string> | undefined;
  createdBy?: string | undefined;
  maintainerIds?: Array<string> | undefined;
  includeMarketplaceFlags?: boolean | undefined;
  teamId: string;
  slug?: string | undefined;
};

export const getApiV2TeamsTeamIdFeatureFlagsFlagsQueryOptions = (
  args: UseGetApiV2TeamsTeamIdFeatureFlagsFlagsArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v2/teams/{teamId}/feature-flags/flags",
      "feature-flags",
      args.state,
      args.limit,
      args.cursor,
      args.search,
      args.kind,
      args.tags,
      args.createdBy,
      args.maintainerIds,
      args.includeMarketplaceFlags,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v2/teams/{teamId}/feature-flags/flags", {
          teamId: args.teamId,
          state: args.state,
          limit: args.limit,
          cursor: args.cursor,
          search: args.search,
          kind: args.kind,
          tags: args.tags,
          createdBy: args.createdBy,
          maintainerIds: args.maintainerIds,
          includeMarketplaceFlags: args.includeMarketplaceFlags,
          slug: args.slug,
        }),
        useGetApiV2TeamsTeamIdFeatureFlagsFlagsResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV2TeamsTeamIdFeatureFlagsFlags = (
  args: UseGetApiV2TeamsTeamIdFeatureFlagsFlagsArgs,
) => useQuery(getApiV2TeamsTeamIdFeatureFlagsFlagsQueryOptions(args));
