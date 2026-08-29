import { z } from "zod";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV1ObservabilityManageConfigurationProjectsResponse = z.object({
  disabledProjects: z.array(
    z.object({ id: z.string(), name: z.string().optional(), disabledAt: z.number() }),
  ),
});

export type UseGetApiV1ObservabilityManageConfigurationProjectsArgs = {
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV1ObservabilityManageConfigurationProjectsQueryOptions = (
  args: UseGetApiV1ObservabilityManageConfigurationProjectsArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/observability/manage/configuration/projects",
      "observability",
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/observability/manage/configuration/projects", {
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV1ObservabilityManageConfigurationProjectsResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV1ObservabilityManageConfigurationProjects = (
  args: UseGetApiV1ObservabilityManageConfigurationProjectsArgs,
) => useQuery(getApiV1ObservabilityManageConfigurationProjectsQueryOptions(args));
