import { vcrImageList } from "packages/models/src/vcrImageList.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1VcrRepositoryIdOrNameImagesArgs = {
  projectId: string;
  idOrName: string;
  limit?: number | undefined;
  cursor?: string | undefined;
  untagged?: boolean | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV1VcrRepositoryIdOrNameImagesQueryOptions = (
  args: UseGetApiV1VcrRepositoryIdOrNameImagesArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/vcr/repository/{idOrName}/images",
      "vcr",
      args.projectId,
      args.idOrName,
      args.limit,
      args.cursor,
      args.untagged,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/vcr/repository/{idOrName}/images", {
          idOrName: args.idOrName,
          projectId: args.projectId,
          limit: args.limit,
          cursor: args.cursor,
          untagged: args.untagged,
          teamId: args.teamId,
          slug: args.slug,
        }),
        vcrImageList,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV1VcrRepositoryIdOrNameImages = (
  args: UseGetApiV1VcrRepositoryIdOrNameImagesArgs,
) => useQuery(getApiV1VcrRepositoryIdOrNameImagesQueryOptions(args));
