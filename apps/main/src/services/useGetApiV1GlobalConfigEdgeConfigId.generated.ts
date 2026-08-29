import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1GlobalConfigEdgeConfigIdArgs = {
  edgeConfigId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useGetApiV1GlobalConfigEdgeConfigIdResponse = z.object({
  id: z.string(),
  createdAt: z.number(),
  createdBy: z.string().optional(),
  ownerId: z.string(),
  slug: z.string(),
  updatedAt: z.number(),
  digest: z.string(),
  purpose: z
    .union([
      z.object({ type: z.literal("flags"), projectId: z.string() }),
      z.object({ type: z.literal("experimentation"), resourceId: z.string() }),
    ])
    .optional(),
  deletedAt: z.number().nullable().optional(),
  transfer: z
    .object({ fromAccountId: z.string(), startedAt: z.number(), doneAt: z.number().nullable() })
    .optional(),
  schema: z.object({}).optional(),
  syncedToDynamoAt: z.number().optional(),
  sizeInBytes: z.number(),
  itemCount: z.number(),
});

export const getApiV1GlobalConfigEdgeConfigIdQueryOptions = (
  args: UseGetApiV1GlobalConfigEdgeConfigIdArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/global-config/{edgeConfigId}",
      "global-config",
      args.edgeConfigId,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/global-config/{edgeConfigId}", {
          edgeConfigId: args.edgeConfigId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV1GlobalConfigEdgeConfigIdResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV1GlobalConfigEdgeConfigId = (
  args: UseGetApiV1GlobalConfigEdgeConfigIdArgs,
) => useQuery(getApiV1GlobalConfigEdgeConfigIdQueryOptions(args));
