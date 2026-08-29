import { z } from "zod";
import { globalConfigItemValue } from "packages/models/src/globalConfigItemValue.generated.ts";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1GlobalConfigEdgeConfigIdBackupsEdgeConfigBackupVersionIdArgs = {
  edgeConfigId: string;
  edgeConfigBackupVersionId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useGetApiV1GlobalConfigEdgeConfigIdBackupsEdgeConfigBackupVersionIdResponse = z.union([
  z.object({
    id: z.string(),
    lastModified: z.number(),
    backup: z.object({
      slug: z.string(),
      updatedAt: z.number(),
      items: z.record(
        z.string(),
        z.object({
          createdAt: z.number(),
          updatedAt: z.number(),
          value: globalConfigItemValue,
          description: z.string().optional(),
        }),
      ),
      digest: z.string(),
    }),
    metadata: z.object({
      updatedAt: z.string().optional(),
      updatedBy: z.string().optional(),
      itemsCount: z.number().optional(),
      itemsBytes: z.number().optional(),
    }),
    user: z
      .object({
        id: z.string(),
        username: z.string(),
        email: z.string(),
        name: z.string().optional(),
        avatar: z.string().optional(),
      })
      .optional(),
  }),
  z.object({
    user: z.object({
      id: z.string(),
      username: z.string(),
      email: z.string(),
      name: z.string().optional(),
      avatar: z.string().optional(),
    }),
    id: z.string(),
    lastModified: z.number(),
    backup: z.object({
      slug: z.string(),
      updatedAt: z.number(),
      items: z.record(
        z.string(),
        z.object({
          createdAt: z.number(),
          updatedAt: z.number(),
          value: globalConfigItemValue,
          description: z.string().optional(),
        }),
      ),
      digest: z.string(),
    }),
    metadata: z.object({
      updatedAt: z.string().optional(),
      updatedBy: z.string().optional(),
      itemsCount: z.number().optional(),
      itemsBytes: z.number().optional(),
    }),
  }),
]);

export const getApiV1GlobalConfigEdgeConfigIdBackupsEdgeConfigBackupVersionIdQueryOptions = (
  args: UseGetApiV1GlobalConfigEdgeConfigIdBackupsEdgeConfigBackupVersionIdArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/global-config/{edgeConfigId}/backups/{edgeConfigBackupVersionId}",
      "global-config",
      args.edgeConfigId,
      args.edgeConfigBackupVersionId,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/global-config/{edgeConfigId}/backups/{edgeConfigBackupVersionId}", {
          edgeConfigId: args.edgeConfigId,
          edgeConfigBackupVersionId: args.edgeConfigBackupVersionId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV1GlobalConfigEdgeConfigIdBackupsEdgeConfigBackupVersionIdResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV1GlobalConfigEdgeConfigIdBackupsEdgeConfigBackupVersionId = (
  args: UseGetApiV1GlobalConfigEdgeConfigIdBackupsEdgeConfigBackupVersionIdArgs,
) => useQuery(getApiV1GlobalConfigEdgeConfigIdBackupsEdgeConfigBackupVersionIdQueryOptions(args));
