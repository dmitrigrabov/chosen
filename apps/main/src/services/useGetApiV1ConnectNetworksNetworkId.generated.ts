import { network } from "packages/models/src/network.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1ConnectNetworksNetworkIdArgs = {
  networkId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV1ConnectNetworksNetworkIdQueryOptions = (
  args: UseGetApiV1ConnectNetworksNetworkIdArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/connect/networks/{networkId}",
      "networking",
      args.networkId,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/connect/networks/{networkId}", {
          networkId: args.networkId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        network,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV1ConnectNetworksNetworkId = (
  args: UseGetApiV1ConnectNetworksNetworkIdArgs,
) => useQuery(getApiV1ConnectNetworksNetworkIdQueryOptions(args));
