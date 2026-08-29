import { vcrRepositoryList } from "packages/models/src/vcrRepositoryList.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1VcrRepositoryArgs = {
  projectId: string;
  limit?: number | undefined;
  cursor?: string | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV1VcrRepositoryQueryOptions = (args: UseGetApiV1VcrRepositoryArgs) =>
  queryOptions({
    queryKey: [
      "GET /v1/vcr/repository",
      "vcr",
      args.projectId,
      args.limit,
      args.cursor,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/vcr/repository", {
          projectId: args.projectId,
          limit: args.limit,
          cursor: args.cursor,
          teamId: args.teamId,
          slug: args.slug,
        }),
        vcrRepositoryList,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV1VcrRepository = (args: UseGetApiV1VcrRepositoryArgs) =>
  useQuery(getApiV1VcrRepositoryQueryOptions(args));
