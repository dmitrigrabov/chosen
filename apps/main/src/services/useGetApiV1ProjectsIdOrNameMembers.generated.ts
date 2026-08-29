import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1ProjectsIdOrNameMembersArgs = {
  idOrName: string;
  limit?: number | undefined;
  since?: number | undefined;
  until?: number | undefined;
  search?: string | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useGetApiV1ProjectsIdOrNameMembersResponse = z.union([
  z.object({}),
  z.object({
    members: z.array(
      z.object({
        avatar: z.string().optional(),
        email: z.string(),
        role: z.enum(["ADMIN", "PROJECT_DEVELOPER", "PROJECT_GUEST", "PROJECT_VIEWER"]),
        computedProjectRole: z.enum([
          "ADMIN",
          "PROJECT_DEVELOPER",
          "PROJECT_GUEST",
          "PROJECT_VIEWER",
        ]),
        uid: z.string(),
        username: z.string(),
        name: z.string().optional(),
        createdAt: z.number(),
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
    pagination: z.object({
      hasNext: z.boolean(),
      count: z.number(),
      next: z.number().nullable(),
      prev: z.number().nullable(),
    }),
  }),
]);

export const getApiV1ProjectsIdOrNameMembersQueryOptions = (
  args: UseGetApiV1ProjectsIdOrNameMembersArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/projects/{idOrName}/members",
      "projectMembers",
      args.idOrName,
      args.limit,
      args.since,
      args.until,
      args.search,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/projects/{idOrName}/members", {
          idOrName: args.idOrName,
          limit: args.limit,
          since: args.since,
          until: args.until,
          search: args.search,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV1ProjectsIdOrNameMembersResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV1ProjectsIdOrNameMembers = (args: UseGetApiV1ProjectsIdOrNameMembersArgs) =>
  useQuery(getApiV1ProjectsIdOrNameMembersQueryOptions(args));
