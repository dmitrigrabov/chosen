import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1BulkRedirectsArgs = {
  projectId: string;
  versionId?: string | undefined;
  q?: string | undefined;
  diff?: (boolean | "only") | undefined;
  page?: number | undefined;
  per_page?: number | undefined;
  sort_by?: ("source" | "destination" | "statusCode") | undefined;
  sort_order?: ("asc" | "desc") | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useGetApiV1BulkRedirectsResponse = z.union([
  z.record(z.string(), z.unknown()),
  z.object({
    version: z
      .object({
        id: z.string(),
        key: z.string(),
        lastModified: z.number(),
        createdBy: z.string(),
        name: z.string().optional(),
        isStaging: z.boolean().optional(),
        isLive: z.boolean().optional(),
        redirectCount: z.number().optional(),
        alias: z.string().optional(),
      })
      .optional(),
    redirects: z.array(
      z.object({
        statusCode: z.number().optional(),
        permanent: z.boolean().optional(),
        sensitive: z.boolean().optional(),
        caseSensitive: z.boolean().optional(),
        query: z.boolean().optional(),
        preserveQueryParams: z.boolean().optional(),
        destination: z.string(),
        source: z.string(),
      }),
    ),
    pagination: z.object({ page: z.number(), per_page: z.number(), numPages: z.number() }),
  }),
  z.object({
    version: z.object({
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
    redirects: z.array(
      z.object({
        statusCode: z.number().optional(),
        permanent: z.boolean().optional(),
        sensitive: z.boolean().optional(),
        caseSensitive: z.boolean().optional(),
        query: z.boolean().optional(),
        preserveQueryParams: z.boolean().optional(),
        destination: z.string(),
        source: z.string(),
      }),
    ),
    pagination: z.object({ page: z.number(), per_page: z.number(), numPages: z.number() }),
  }),
]);

export const getApiV1BulkRedirectsQueryOptions = (args: UseGetApiV1BulkRedirectsArgs) =>
  queryOptions({
    queryKey: [
      "GET /v1/bulk-redirects",
      "bulk-redirects",
      args.projectId,
      args.versionId,
      args.q,
      args.diff,
      args.page,
      args.per_page,
      args.sort_by,
      args.sort_order,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/bulk-redirects", {
          projectId: args.projectId,
          versionId: args.versionId,
          q: args.q,
          diff: args.diff,
          page: args.page,
          per_page: args.per_page,
          sort_by: args.sort_by,
          sort_order: args.sort_order,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV1BulkRedirectsResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV1BulkRedirects = (args: UseGetApiV1BulkRedirectsArgs) =>
  useQuery(getApiV1BulkRedirectsQueryOptions(args));
