import { globalConfigToken } from "packages/models/src/globalConfigToken.generated.ts";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1GlobalConfigEdgeConfigIdTokenTokenArgs = {
  edgeConfigId: string;
  token: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV1GlobalConfigEdgeConfigIdTokenTokenQueryOptions = (
  args: UseGetApiV1GlobalConfigEdgeConfigIdTokenTokenArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/global-config/{edgeConfigId}/token/{token}",
      "global-config",
      args.edgeConfigId,
      args.token,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/global-config/{edgeConfigId}/token/{token}", {
          edgeConfigId: args.edgeConfigId,
          token: args.token,
          teamId: args.teamId,
          slug: args.slug,
        }),
        globalConfigToken,
        { method: "GET" },
      ),
  });

export const useGetApiV1GlobalConfigEdgeConfigIdTokenToken = (
  args: UseGetApiV1GlobalConfigEdgeConfigIdTokenTokenArgs,
) => useQuery(getApiV1GlobalConfigEdgeConfigIdTokenTokenQueryOptions(args));
