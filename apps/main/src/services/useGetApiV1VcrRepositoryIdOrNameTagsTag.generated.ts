import { vcrTag } from "packages/models/src/vcrTag.generated.ts";
import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1VcrRepositoryIdOrNameTagsTagArgs = {
  projectId: string;
  idOrName: string;
  tag: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useGetApiV1VcrRepositoryIdOrNameTagsTagResponse = z.object({ tag: vcrTag });

export const getApiV1VcrRepositoryIdOrNameTagsTagQueryOptions = (
  args: UseGetApiV1VcrRepositoryIdOrNameTagsTagArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/vcr/repository/{idOrName}/tags/{tag}",
      "vcr",
      args.projectId,
      args.idOrName,
      args.tag,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/vcr/repository/{idOrName}/tags/{tag}", {
          idOrName: args.idOrName,
          tag: args.tag,
          projectId: args.projectId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV1VcrRepositoryIdOrNameTagsTagResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV1VcrRepositoryIdOrNameTagsTag = (
  args: UseGetApiV1VcrRepositoryIdOrNameTagsTagArgs,
) => useQuery(getApiV1VcrRepositoryIdOrNameTagsTagQueryOptions(args));
