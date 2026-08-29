import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1GlobalConfigArgs = {
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useGetApiV1GlobalConfigResponse = z.object({
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

export const getApiV1GlobalConfigQueryOptions = (args: UseGetApiV1GlobalConfigArgs) =>
  queryOptions({
    queryKey: ["GET /v1/global-config", "global-config", args.teamId, args.slug],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/global-config", { teamId: args.teamId, slug: args.slug }),
        useGetApiV1GlobalConfigResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV1GlobalConfig = (args: UseGetApiV1GlobalConfigArgs) =>
  useQuery(getApiV1GlobalConfigQueryOptions(args));
