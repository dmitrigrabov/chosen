import { flag } from "packages/models/src/flag.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlugArgs = {
  projectIdOrName: string;
  flagIdOrSlug: string;
  ifMatch?: string | undefined;
  withMetadata?: boolean | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlugQueryOptions = (
  args: UseGetApiV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlugArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/projects/{projectIdOrName}/feature-flags/flags/{flagIdOrSlug}",
      "feature-flags",
      args.projectIdOrName,
      args.flagIdOrSlug,
      args.ifMatch,
      args.withMetadata,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/projects/{projectIdOrName}/feature-flags/flags/{flagIdOrSlug}", {
          projectIdOrName: args.projectIdOrName,
          flagIdOrSlug: args.flagIdOrSlug,
          ifMatch: args.ifMatch,
          withMetadata: args.withMetadata,
          teamId: args.teamId,
          slug: args.slug,
        }),
        flag,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlug = (
  args: UseGetApiV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlugArgs,
) => useQuery(getApiV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlugQueryOptions(args));
