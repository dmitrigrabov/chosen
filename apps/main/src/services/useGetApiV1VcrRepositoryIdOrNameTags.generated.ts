import { z } from "zod";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV1VcrRepositoryIdOrNameTagsResponse = z.object({
  tags: z.array(
    z.object({
      tag: z.string(),
      manifestDigest: z.string(),
      imageId: z.string(),
      kind: z.enum(["attestation", "index", "manifest"]),
      platform: z.string().optional(),
      arch: z.string().optional(),
      pushedBy: z.string().optional(),
      status: z.enum(["preparing", "ready", "unoptimized", "null"]).nullable(),
      sizeInBytes: z.number(),
      createdAt: z.string(),
      updatedAt: z.string(),
    }),
  ),
  nextCursor: z.string().optional(),
});

export type UseGetApiV1VcrRepositoryIdOrNameTagsArgs = {
  projectId: string;
  idOrName: string;
  limit?: number | undefined;
  cursor?: string | undefined;
  sortBy?: ("updatedAt" | "tag") | undefined;
  sortOrder?: ("asc" | "desc") | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV1VcrRepositoryIdOrNameTagsQueryOptions = (
  args: UseGetApiV1VcrRepositoryIdOrNameTagsArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/vcr/repository/{idOrName}/tags",
      "vcr",
      args.projectId,
      args.idOrName,
      args.limit,
      args.cursor,
      args.sortBy,
      args.sortOrder,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/vcr/repository/{idOrName}/tags", {
          idOrName: args.idOrName,
          projectId: args.projectId,
          limit: args.limit,
          cursor: args.cursor,
          sortBy: args.sortBy,
          sortOrder: args.sortOrder,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV1VcrRepositoryIdOrNameTagsResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV1VcrRepositoryIdOrNameTags = (
  args: UseGetApiV1VcrRepositoryIdOrNameTagsArgs,
) => useQuery(getApiV1VcrRepositoryIdOrNameTagsQueryOptions(args));
