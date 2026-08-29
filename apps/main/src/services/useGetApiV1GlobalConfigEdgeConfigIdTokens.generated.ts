import { globalConfigToken } from "packages/models/src/globalConfigToken.generated.ts";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1GlobalConfigEdgeConfigIdTokensArgs = {
  edgeConfigId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV1GlobalConfigEdgeConfigIdTokensQueryOptions = (
  args: UseGetApiV1GlobalConfigEdgeConfigIdTokensArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/global-config/{edgeConfigId}/tokens",
      "global-config",
      args.edgeConfigId,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/global-config/{edgeConfigId}/tokens", {
          edgeConfigId: args.edgeConfigId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        globalConfigToken,
        { method: "GET" },
      ),
  });

export const useGetApiV1GlobalConfigEdgeConfigIdTokens = (
  args: UseGetApiV1GlobalConfigEdgeConfigIdTokensArgs,
) => useQuery(getApiV1GlobalConfigEdgeConfigIdTokensQueryOptions(args));
