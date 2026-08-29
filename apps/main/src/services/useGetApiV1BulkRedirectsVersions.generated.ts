import { z } from "zod";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV1BulkRedirectsVersionsResponse = z.object({
  versions: z.array(
    z.object({
      id: z.string(),
      key: z.string(),
      lastModified: z.number(),
      createdBy: z.string(),
      name: z.string().optional(),
      isStaging: z.boolean().optional(),
      isLive: z.boolean().optional(),
      redirectCount: z.number().optional(),
      alias: z.string().optional(),
    }),
  ),
});

export type UseGetApiV1BulkRedirectsVersionsArgs = {
  projectId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV1BulkRedirectsVersionsQueryOptions = (
  args: UseGetApiV1BulkRedirectsVersionsArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/bulk-redirects/versions",
      "bulk-redirects",
      args.projectId,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/bulk-redirects/versions", {
          projectId: args.projectId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV1BulkRedirectsVersionsResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV1BulkRedirectsVersions = (args: UseGetApiV1BulkRedirectsVersionsArgs) =>
  useQuery(getApiV1BulkRedirectsVersionsQueryOptions(args));
