import { z } from "zod";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV1ProjectsProjectIdOrNameFeatureFlagsSettingsResponse = z.object({
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
});

export type UseGetApiV1ProjectsProjectIdOrNameFeatureFlagsSettingsArgs = {
  projectIdOrName: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV1ProjectsProjectIdOrNameFeatureFlagsSettingsQueryOptions = (
  args: UseGetApiV1ProjectsProjectIdOrNameFeatureFlagsSettingsArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/projects/{projectIdOrName}/feature-flags/settings",
      "feature-flags",
      args.projectIdOrName,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/projects/{projectIdOrName}/feature-flags/settings", {
          projectIdOrName: args.projectIdOrName,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV1ProjectsProjectIdOrNameFeatureFlagsSettingsResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV1ProjectsProjectIdOrNameFeatureFlagsSettings = (
  args: UseGetApiV1ProjectsProjectIdOrNameFeatureFlagsSettingsArgs,
) => useQuery(getApiV1ProjectsProjectIdOrNameFeatureFlagsSettingsQueryOptions(args));
