import { z } from "zod";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV1ProjectsProjectIdRoutesVersionsResponse = z.object({
  versions: z.array(
    z.object({
      id: z.string(),
      s3Key: z.string(),
      lastModified: z.number(),
      createdBy: z.string(),
      isStaging: z.boolean().optional(),
      isLive: z.boolean().optional(),
      ruleCount: z.number().optional(),
      alias: z.string().optional(),
    }),
  ),
});

export type UseGetApiV1ProjectsProjectIdRoutesVersionsArgs = {
  projectId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV1ProjectsProjectIdRoutesVersionsQueryOptions = (
  args: UseGetApiV1ProjectsProjectIdRoutesVersionsArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/projects/{projectId}/routes/versions",
      "project-routes",
      args.projectId,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/projects/{projectId}/routes/versions", {
          projectId: args.projectId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV1ProjectsProjectIdRoutesVersionsResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV1ProjectsProjectIdRoutesVersions = (
  args: UseGetApiV1ProjectsProjectIdRoutesVersionsArgs,
) => useQuery(getApiV1ProjectsProjectIdRoutesVersionsQueryOptions(args));
