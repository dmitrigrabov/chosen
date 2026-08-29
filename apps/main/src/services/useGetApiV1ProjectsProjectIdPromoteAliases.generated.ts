import { z } from "zod";
import { pagination } from "packages/models/src/pagination.generated.ts";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1ProjectsProjectIdPromoteAliasesArgs = {
  projectId: string;
  limit?: number | undefined;
  since?: number | undefined;
  until?: number | undefined;
  failedOnly?: boolean | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useGetApiV1ProjectsProjectIdPromoteAliasesResponse = z.union([
  z.object({}),
  z.object({
    aliases: z.array(z.object({ status: z.string(), alias: z.string(), id: z.string() })),
    pagination: pagination,
  }),
]);

export const getApiV1ProjectsProjectIdPromoteAliasesQueryOptions = (
  args: UseGetApiV1ProjectsProjectIdPromoteAliasesArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/projects/{projectId}/promote/aliases",
      "projects",
      args.projectId,
      args.limit,
      args.since,
      args.until,
      args.failedOnly,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/projects/{projectId}/promote/aliases", {
          projectId: args.projectId,
          limit: args.limit,
          since: args.since,
          until: args.until,
          failedOnly: args.failedOnly,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV1ProjectsProjectIdPromoteAliasesResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV1ProjectsProjectIdPromoteAliases = (
  args: UseGetApiV1ProjectsProjectIdPromoteAliasesArgs,
) => useQuery(getApiV1ProjectsProjectIdPromoteAliasesQueryOptions(args));
