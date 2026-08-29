import { globalConfigItem } from "packages/models/src/globalConfigItem.generated.ts";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1GlobalConfigEdgeConfigIdItemEdgeConfigItemKeyArgs = {
  edgeConfigId: string;
  edgeConfigItemKey: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV1GlobalConfigEdgeConfigIdItemEdgeConfigItemKeyQueryOptions = (
  args: UseGetApiV1GlobalConfigEdgeConfigIdItemEdgeConfigItemKeyArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/global-config/{edgeConfigId}/item/{edgeConfigItemKey}",
      "global-config",
      args.edgeConfigId,
      args.edgeConfigItemKey,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/global-config/{edgeConfigId}/item/{edgeConfigItemKey}", {
          edgeConfigId: args.edgeConfigId,
          edgeConfigItemKey: args.edgeConfigItemKey,
          teamId: args.teamId,
          slug: args.slug,
        }),
        globalConfigItem,
        { method: "GET" },
      ),
  });

export const useGetApiV1GlobalConfigEdgeConfigIdItemEdgeConfigItemKey = (
  args: UseGetApiV1GlobalConfigEdgeConfigIdItemEdgeConfigItemKeyArgs,
) => useQuery(getApiV1GlobalConfigEdgeConfigIdItemEdgeConfigItemKeyQueryOptions(args));
