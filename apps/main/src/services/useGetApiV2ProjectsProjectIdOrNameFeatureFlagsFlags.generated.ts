import { z } from "zod";
import { flag } from "packages/models/src/flag.generated.ts";
import { marketplaceFlag } from "packages/models/src/marketplaceFlag.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV2ProjectsProjectIdOrNameFeatureFlagsFlagsResponse = z.object({
  pagination: z.object({ next: z.string().nullable() }),
  data: z.array(z.union([flag, marketplaceFlag])),
});

export type UseGetApiV2ProjectsProjectIdOrNameFeatureFlagsFlagsArgs = {
  projectIdOrName: string;
  state?: ("active" | "archived") | undefined;
  limit?: number | undefined;
  cursor?: string | undefined;
  search?: string | undefined;
  tags?: Array<string> | undefined;
  createdBy?: string | undefined;
  maintainerIds?: Array<string> | undefined;
  includeMarketplaceFlags?: boolean | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV2ProjectsProjectIdOrNameFeatureFlagsFlagsQueryOptions = (
  args: UseGetApiV2ProjectsProjectIdOrNameFeatureFlagsFlagsArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v2/projects/{projectIdOrName}/feature-flags/flags",
      "feature-flags",
      args.projectIdOrName,
      args.state,
      args.limit,
      args.cursor,
      args.search,
      args.tags,
      args.createdBy,
      args.maintainerIds,
      args.includeMarketplaceFlags,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v2/projects/{projectIdOrName}/feature-flags/flags", {
          projectIdOrName: args.projectIdOrName,
          state: args.state,
          limit: args.limit,
          cursor: args.cursor,
          search: args.search,
          tags: args.tags,
          createdBy: args.createdBy,
          maintainerIds: args.maintainerIds,
          includeMarketplaceFlags: args.includeMarketplaceFlags,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV2ProjectsProjectIdOrNameFeatureFlagsFlagsResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV2ProjectsProjectIdOrNameFeatureFlagsFlags = (
  args: UseGetApiV2ProjectsProjectIdOrNameFeatureFlagsFlagsArgs,
) => useQuery(getApiV2ProjectsProjectIdOrNameFeatureFlagsFlagsQueryOptions(args));
