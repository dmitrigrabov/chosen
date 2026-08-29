import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1AccessGroupsArgs = {
  projectId?: string | undefined;
  search?: string | undefined;
  membersLimit?: number | undefined;
  projectsLimit?: number | undefined;
  limit?: number | undefined;
  next?: string | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useGetApiV1AccessGroupsResponse = z.union([
  z.object({}),
  z.object({
    accessGroups: z.array(
      z.object({
        members: z.array(z.string()).optional(),
        projects: z.array(z.string()).optional(),
        entitlements: z.array(z.string()).optional(),
        teamPermissions: z.array(z.string()).optional(),
        isDsyncManaged: z.boolean(),
        name: z.string(),
        createdAt: z.string(),
        teamId: z.string(),
        updatedAt: z.string(),
        accessGroupId: z.string(),
        membersCount: z.number(),
        projectsCount: z.number(),
        teamRoles: z.array(z.string()).optional(),
      }),
    ),
    pagination: z.object({ count: z.number(), next: z.string().nullable() }),
  }),
]);

export const getApiV1AccessGroupsQueryOptions = (args: UseGetApiV1AccessGroupsArgs) =>
  queryOptions({
    queryKey: [
      "GET /v1/access-groups",
      "access-groups",
      args.projectId,
      args.search,
      args.membersLimit,
      args.projectsLimit,
      args.limit,
      args.next,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/access-groups", {
          projectId: args.projectId,
          search: args.search,
          membersLimit: args.membersLimit,
          projectsLimit: args.projectsLimit,
          limit: args.limit,
          next: args.next,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV1AccessGroupsResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV1AccessGroups = (args: UseGetApiV1AccessGroupsArgs) =>
  useQuery(getApiV1AccessGroupsQueryOptions(args));
