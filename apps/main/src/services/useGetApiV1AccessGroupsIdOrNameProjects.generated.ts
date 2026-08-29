import { z } from "zod";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV1AccessGroupsIdOrNameProjectsResponse = z.object({
  projects: z.array(
    z.object({
      projectId: z.string(),
      role: z.enum(["ADMIN", "PROJECT_DEVELOPER", "PROJECT_GUEST", "PROJECT_VIEWER"]),
      createdAt: z.string(),
      updatedAt: z.string(),
      project: z.object({
        name: z.string().optional(),
        framework: z.string().nullable().optional(),
        latestDeploymentId: z.string().optional(),
      }),
    }),
  ),
  pagination: z.object({ count: z.number(), next: z.string().nullable() }),
});

export type UseGetApiV1AccessGroupsIdOrNameProjectsArgs = {
  idOrName: string;
  limit?: number | undefined;
  next?: string | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV1AccessGroupsIdOrNameProjectsQueryOptions = (
  args: UseGetApiV1AccessGroupsIdOrNameProjectsArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/access-groups/{idOrName}/projects",
      "access-groups",
      args.idOrName,
      args.limit,
      args.next,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/access-groups/{idOrName}/projects", {
          idOrName: args.idOrName,
          limit: args.limit,
          next: args.next,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV1AccessGroupsIdOrNameProjectsResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV1AccessGroupsIdOrNameProjects = (
  args: UseGetApiV1AccessGroupsIdOrNameProjectsArgs,
) => useQuery(getApiV1AccessGroupsIdOrNameProjectsQueryOptions(args));
