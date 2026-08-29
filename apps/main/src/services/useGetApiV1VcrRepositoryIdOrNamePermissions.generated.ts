import { vcrRepositoryPermissionList } from "packages/models/src/vcrRepositoryPermissionList.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1VcrRepositoryIdOrNamePermissionsArgs = {
  projectId: string;
  idOrName: string;
  limit?: number | undefined;
  cursor?: string | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV1VcrRepositoryIdOrNamePermissionsQueryOptions = (
  args: UseGetApiV1VcrRepositoryIdOrNamePermissionsArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/vcr/repository/{idOrName}/permissions",
      "vcr",
      args.projectId,
      args.idOrName,
      args.limit,
      args.cursor,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/vcr/repository/{idOrName}/permissions", {
          idOrName: args.idOrName,
          projectId: args.projectId,
          limit: args.limit,
          cursor: args.cursor,
          teamId: args.teamId,
          slug: args.slug,
        }),
        vcrRepositoryPermissionList,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV1VcrRepositoryIdOrNamePermissions = (
  args: UseGetApiV1VcrRepositoryIdOrNamePermissionsArgs,
) => useQuery(getApiV1VcrRepositoryIdOrNamePermissionsQueryOptions(args));
