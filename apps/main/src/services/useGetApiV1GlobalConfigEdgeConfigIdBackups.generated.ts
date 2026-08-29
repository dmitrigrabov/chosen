import { z } from "zod";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV1GlobalConfigEdgeConfigIdBackupsResponse = z.object({
  backups: z.array(
    z.object({
      metadata: z
        .object({
          updatedAt: z.string().optional(),
          updatedBy: z.string().optional(),
          itemsCount: z.number().optional(),
          itemsBytes: z.number().optional(),
        })
        .optional(),
      id: z.string(),
      lastModified: z.number(),
    }),
  ),
  pagination: z.object({ hasNext: z.boolean(), next: z.string().optional() }),
});

export type UseGetApiV1GlobalConfigEdgeConfigIdBackupsArgs = {
  edgeConfigId: string;
  next?: string | undefined;
  limit?: number | undefined;
  metadata?: string | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV1GlobalConfigEdgeConfigIdBackupsQueryOptions = (
  args: UseGetApiV1GlobalConfigEdgeConfigIdBackupsArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/global-config/{edgeConfigId}/backups",
      "global-config",
      args.edgeConfigId,
      args.next,
      args.limit,
      args.metadata,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/global-config/{edgeConfigId}/backups", {
          edgeConfigId: args.edgeConfigId,
          next: args.next,
          limit: args.limit,
          metadata: args.metadata,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV1GlobalConfigEdgeConfigIdBackupsResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV1GlobalConfigEdgeConfigIdBackups = (
  args: UseGetApiV1GlobalConfigEdgeConfigIdBackupsArgs,
) => useQuery(getApiV1GlobalConfigEdgeConfigIdBackupsQueryOptions(args));
