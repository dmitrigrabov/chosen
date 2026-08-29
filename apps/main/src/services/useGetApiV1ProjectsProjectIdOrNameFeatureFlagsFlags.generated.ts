import { flag } from "packages/models/src/flag.generated.ts";
import { z } from "zod";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV1ProjectsProjectIdOrNameFeatureFlagsFlagsResponse = z.object({
  data: z.array(flag),
  pagination: z.object({ next: z.string().nullable() }),
});

export type UseGetApiV1ProjectsProjectIdOrNameFeatureFlagsFlagsArgs = {
  projectIdOrName: string;
  state?: ("active" | "archived") | undefined;
  withMetadata?: boolean | undefined;
  limit?: number | undefined;
  cursor?: string | undefined;
  search?: string | undefined;
  tags?: Array<string> | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV1ProjectsProjectIdOrNameFeatureFlagsFlagsQueryOptions = (
  args: UseGetApiV1ProjectsProjectIdOrNameFeatureFlagsFlagsArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/projects/{projectIdOrName}/feature-flags/flags",
      "feature-flags",
      args.projectIdOrName,
      args.state,
      args.withMetadata,
      args.limit,
      args.cursor,
      args.search,
      args.tags,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/projects/{projectIdOrName}/feature-flags/flags", {
          projectIdOrName: args.projectIdOrName,
          state: args.state,
          withMetadata: args.withMetadata,
          limit: args.limit,
          cursor: args.cursor,
          search: args.search,
          tags: args.tags,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV1ProjectsProjectIdOrNameFeatureFlagsFlagsResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV1ProjectsProjectIdOrNameFeatureFlagsFlags = (
  args: UseGetApiV1ProjectsProjectIdOrNameFeatureFlagsFlagsArgs,
) => useQuery(getApiV1ProjectsProjectIdOrNameFeatureFlagsFlagsQueryOptions(args));
