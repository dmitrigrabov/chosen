import { z } from "zod";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV1ProjectsProjectIdOrNameFeatureFlagsSdkKeysResponse = z.object({
  data: z.array(
    z.object({
      hashKey: z.string(),
      projectId: z.string(),
      type: z.enum(["client", "mobile", "server"]),
      environment: z.string(),
      createdBy: z.string(),
      createdAt: z.number(),
      updatedAt: z.number(),
      label: z.string().optional(),
      deletedAt: z.number().optional(),
      partialKeyValue: z.string(),
    }),
  ),
});

export type UseGetApiV1ProjectsProjectIdOrNameFeatureFlagsSdkKeysArgs = {
  projectIdOrName: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV1ProjectsProjectIdOrNameFeatureFlagsSdkKeysQueryOptions = (
  args: UseGetApiV1ProjectsProjectIdOrNameFeatureFlagsSdkKeysArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/projects/{projectIdOrName}/feature-flags/sdk-keys",
      "feature-flags",
      args.projectIdOrName,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/projects/{projectIdOrName}/feature-flags/sdk-keys", {
          projectIdOrName: args.projectIdOrName,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV1ProjectsProjectIdOrNameFeatureFlagsSdkKeysResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV1ProjectsProjectIdOrNameFeatureFlagsSdkKeys = (
  args: UseGetApiV1ProjectsProjectIdOrNameFeatureFlagsSdkKeysArgs,
) => useQuery(getApiV1ProjectsProjectIdOrNameFeatureFlagsSdkKeysQueryOptions(args));
