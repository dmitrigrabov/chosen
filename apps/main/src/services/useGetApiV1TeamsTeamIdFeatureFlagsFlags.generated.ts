import { flag } from "packages/models/src/flag.generated.ts";
import { z } from "zod";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV1TeamsTeamIdFeatureFlagsFlagsResponse = z.object({
  data: z.array(flag),
  pagination: z.object({ next: z.string().nullable() }),
});

export type UseGetApiV1TeamsTeamIdFeatureFlagsFlagsArgs = {
  state?: ("active" | "archived") | undefined;
  withMetadata?: boolean | undefined;
  limit?: number | undefined;
  cursor?: string | undefined;
  search?: string | undefined;
  kind?: ("boolean" | "string" | "number" | "json") | undefined;
  tags?: Array<string> | undefined;
  teamId: string;
  slug?: string | undefined;
};

export const getApiV1TeamsTeamIdFeatureFlagsFlagsQueryOptions = (
  args: UseGetApiV1TeamsTeamIdFeatureFlagsFlagsArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/teams/{teamId}/feature-flags/flags",
      "feature-flags",
      args.state,
      args.withMetadata,
      args.limit,
      args.cursor,
      args.search,
      args.kind,
      args.tags,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/teams/{teamId}/feature-flags/flags", {
          teamId: args.teamId,
          state: args.state,
          withMetadata: args.withMetadata,
          limit: args.limit,
          cursor: args.cursor,
          search: args.search,
          kind: args.kind,
          tags: args.tags,
          slug: args.slug,
        }),
        useGetApiV1TeamsTeamIdFeatureFlagsFlagsResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV1TeamsTeamIdFeatureFlagsFlags = (
  args: UseGetApiV1TeamsTeamIdFeatureFlagsFlagsArgs,
) => useQuery(getApiV1TeamsTeamIdFeatureFlagsFlagsQueryOptions(args));
