import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1AccessGroupsAccessGroupIdOrNameProjectsProjectIdArgs = {
  accessGroupIdOrName: string;
  projectId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useGetApiV1AccessGroupsAccessGroupIdOrNameProjectsProjectIdResponse = z.object({
  teamId: z.string(),
  accessGroupId: z.string(),
  projectId: z.string(),
  role: z.enum(["ADMIN", "PROJECT_DEVELOPER", "PROJECT_GUEST", "PROJECT_VIEWER"]),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const getApiV1AccessGroupsAccessGroupIdOrNameProjectsProjectIdQueryOptions = (
  args: UseGetApiV1AccessGroupsAccessGroupIdOrNameProjectsProjectIdArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/access-groups/{accessGroupIdOrName}/projects/{projectId}",
      "access-groups",
      args.accessGroupIdOrName,
      args.projectId,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/access-groups/{accessGroupIdOrName}/projects/{projectId}", {
          accessGroupIdOrName: args.accessGroupIdOrName,
          projectId: args.projectId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV1AccessGroupsAccessGroupIdOrNameProjectsProjectIdResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV1AccessGroupsAccessGroupIdOrNameProjectsProjectId = (
  args: UseGetApiV1AccessGroupsAccessGroupIdOrNameProjectsProjectIdArgs,
) => useQuery(getApiV1AccessGroupsAccessGroupIdOrNameProjectsProjectIdQueryOptions(args));
