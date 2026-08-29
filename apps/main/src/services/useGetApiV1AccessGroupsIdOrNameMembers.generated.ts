import { z } from "zod";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV1AccessGroupsIdOrNameMembersResponse = z.object({
  members: z.array(
    z.object({
      avatar: z.string().optional(),
      email: z.string(),
      uid: z.string(),
      username: z.string(),
      name: z.string().optional(),
      createdAt: z.string().optional(),
      teamRole: z.enum([
        "BILLING",
        "CONTRIBUTOR",
        "DEVELOPER",
        "MEMBER",
        "OWNER",
        "SECURITY",
        "VIEWER",
        "VIEWER_FOR_PLUS",
      ]),
    }),
  ),
  pagination: z.object({ count: z.number(), next: z.string().nullable() }),
});

export type UseGetApiV1AccessGroupsIdOrNameMembersArgs = {
  idOrName: string;
  limit?: number | undefined;
  next?: string | undefined;
  search?: string | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV1AccessGroupsIdOrNameMembersQueryOptions = (
  args: UseGetApiV1AccessGroupsIdOrNameMembersArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/access-groups/{idOrName}/members",
      "access-groups",
      args.idOrName,
      args.limit,
      args.next,
      args.search,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/access-groups/{idOrName}/members", {
          idOrName: args.idOrName,
          limit: args.limit,
          next: args.next,
          search: args.search,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV1AccessGroupsIdOrNameMembersResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV1AccessGroupsIdOrNameMembers = (
  args: UseGetApiV1AccessGroupsIdOrNameMembersArgs,
) => useQuery(getApiV1AccessGroupsIdOrNameMembersQueryOptions(args));
