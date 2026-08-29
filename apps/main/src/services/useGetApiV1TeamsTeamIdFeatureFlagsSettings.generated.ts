import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1TeamsTeamIdFeatureFlagsSettingsArgs = {
  limit?: number | undefined;
  cursor?: string | undefined;
  teamId: string;
  slug?: string | undefined;
};

export const useGetApiV1TeamsTeamIdFeatureFlagsSettingsResponse = z.union([
  z.object({}),
  z.object({
    data: z.array(
      z.object({
        typeName: z.literal("settings"),
        projectId: z.string(),
        ownerId: z.string().optional(),
        enabled: z.boolean(),
        environments: z.array(z.string()),
        entities: z.array(
          z.object({
            kind: z.string(),
            label: z.string(),
            attributes: z.array(
              z.object({
                key: z.string(),
                type: z.string(),
                labels: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
              }),
            ),
          }),
        ),
        createdAt: z.number().optional(),
        updatedAt: z.number().optional(),
        metadata: z.object({
          activeFlagCount: z.number(),
          archivedFlagCount: z.number(),
          segmentCount: z.number(),
          packSizeInBytes: z.number(),
          packRevision: z.number().optional(),
          configUpdatedAt: z.number().optional(),
        }),
      }),
    ),
    pagination: z.object({ next: z.string().nullable() }),
  }),
]);

export const getApiV1TeamsTeamIdFeatureFlagsSettingsQueryOptions = (
  args: UseGetApiV1TeamsTeamIdFeatureFlagsSettingsArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/teams/{teamId}/feature-flags/settings",
      "feature-flags",
      args.limit,
      args.cursor,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/teams/{teamId}/feature-flags/settings", {
          teamId: args.teamId,
          limit: args.limit,
          cursor: args.cursor,
          slug: args.slug,
        }),
        useGetApiV1TeamsTeamIdFeatureFlagsSettingsResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV1TeamsTeamIdFeatureFlagsSettings = (
  args: UseGetApiV1TeamsTeamIdFeatureFlagsSettingsArgs,
) => useQuery(getApiV1TeamsTeamIdFeatureFlagsSettingsQueryOptions(args));
