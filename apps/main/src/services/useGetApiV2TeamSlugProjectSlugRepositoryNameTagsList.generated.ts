import { z } from "zod";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV2TeamSlugProjectSlugRepositoryNameTagsListResponse = z.object({
  name: z.string(),
  tags: z.array(z.string()),
});

export type UseGetApiV2TeamSlugProjectSlugRepositoryNameTagsListArgs = {
  teamSlug: string;
  projectSlug: string;
  repositoryName: string;
  n?: number | undefined;
  last?: string | undefined;
};

export const getApiV2TeamSlugProjectSlugRepositoryNameTagsListQueryOptions = (
  args: UseGetApiV2TeamSlugProjectSlugRepositoryNameTagsListArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v2/{teamSlug}/{projectSlug}/{repositoryName}/tags/list",
      "vcr",
      args.teamSlug,
      args.projectSlug,
      args.repositoryName,
      args.n,
      args.last,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v2/{teamSlug}/{projectSlug}/{repositoryName}/tags/list", {
          teamSlug: args.teamSlug,
          projectSlug: args.projectSlug,
          repositoryName: args.repositoryName,
          n: args.n,
          last: args.last,
        }),
        useGetApiV2TeamSlugProjectSlugRepositoryNameTagsListResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV2TeamSlugProjectSlugRepositoryNameTagsList = (
  args: UseGetApiV2TeamSlugProjectSlugRepositoryNameTagsListArgs,
) => useQuery(getApiV2TeamSlugProjectSlugRepositoryNameTagsListQueryOptions(args));
