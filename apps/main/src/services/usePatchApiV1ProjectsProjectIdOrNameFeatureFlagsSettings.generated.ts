import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UsePatchApiV1ProjectsProjectIdOrNameFeatureFlagsSettingsArgs = {
  projectIdOrName: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: {
    enabled?: boolean | undefined;
    entities?:
      | Array<{
          kind: string;
          label: string;
          attributes: Array<{
            key: string;
            type: string;
            labels?: Array<{ label: string; value: string }> | undefined;
          }>;
        }>
      | undefined;
    environments?: Array<string> | undefined;
  };
};

export const usePatchApiV1ProjectsProjectIdOrNameFeatureFlagsSettingsResponse = z.object({
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

export type UsePatchApiV1ProjectsProjectIdOrNameFeatureFlagsSettingsResponse = {
  typeName: "settings";
  projectId: string;
  ownerId?: string | undefined;
  enabled: boolean;
  environments: Array<string>;
  entities: Array<{
    kind: string;
    label: string;
    attributes: Array<{
      key: string;
      type: string;
      labels?: Array<{ label: string; value: string }> | undefined;
    }>;
  }>;
  createdAt?: number | undefined;
  updatedAt?: number | undefined;
  metadata: {
    activeFlagCount: number;
    archivedFlagCount: number;
    segmentCount: number;
    packSizeInBytes: number;
    packRevision?: number | undefined;
    configUpdatedAt?: number | undefined;
  };
};

export type PatchApiV1ProjectsProjectIdOrNameFeatureFlagsSettingsBody = {
  enabled?: boolean | undefined;
  entities?:
    | Array<{
        kind: string;
        label: string;
        attributes: Array<{
          key: string;
          type: string;
          labels?: Array<{ label: string; value: string }> | undefined;
        }>;
      }>
    | undefined;
  environments?: Array<string> | undefined;
};

export const usePatchApiV1ProjectsProjectIdOrNameFeatureFlagsSettings = (
  options: UseMutationOptions<
    UsePatchApiV1ProjectsProjectIdOrNameFeatureFlagsSettingsResponse,
    Error,
    UsePatchApiV1ProjectsProjectIdOrNameFeatureFlagsSettingsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UsePatchApiV1ProjectsProjectIdOrNameFeatureFlagsSettingsArgs) =>
      apiFetch(
        buildUrl("/v1/projects/{projectIdOrName}/feature-flags/settings", {
          projectIdOrName: args.projectIdOrName,
          teamId: args.teamId,
          slug: args.slug,
        }),
        usePatchApiV1ProjectsProjectIdOrNameFeatureFlagsSettingsResponse,
        {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["feature-flags"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
