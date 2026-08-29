import { globalConfigItem } from "packages/models/src/globalConfigItem.generated.ts";
import { z } from "zod";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV1GlobalConfigEdgeConfigIdItemsResponse = z.array(globalConfigItem);

export type UseGetApiV1GlobalConfigEdgeConfigIdItemsArgs = {
  edgeConfigId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV1GlobalConfigEdgeConfigIdItemsQueryOptions = (
  args: UseGetApiV1GlobalConfigEdgeConfigIdItemsArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/global-config/{edgeConfigId}/items",
      "global-config",
      args.edgeConfigId,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/global-config/{edgeConfigId}/items", {
          edgeConfigId: args.edgeConfigId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV1GlobalConfigEdgeConfigIdItemsResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV1GlobalConfigEdgeConfigIdItems = (
  args: UseGetApiV1GlobalConfigEdgeConfigIdItemsArgs,
) => useQuery(getApiV1GlobalConfigEdgeConfigIdItemsQueryOptions(args));
