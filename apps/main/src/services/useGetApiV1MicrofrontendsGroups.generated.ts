import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1MicrofrontendsGroupsArgs = {
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useGetApiV1MicrofrontendsGroupsResponse = z.object({});

export const getApiV1MicrofrontendsGroupsQueryOptions = (
  args: UseGetApiV1MicrofrontendsGroupsArgs,
) =>
  queryOptions({
    queryKey: ["GET /v1/microfrontends/groups", "microfrontends", args.teamId, args.slug],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/microfrontends/groups", { teamId: args.teamId, slug: args.slug }),
        useGetApiV1MicrofrontendsGroupsResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV1MicrofrontendsGroups = (args: UseGetApiV1MicrofrontendsGroupsArgs) =>
  useQuery(getApiV1MicrofrontendsGroupsQueryOptions(args));
