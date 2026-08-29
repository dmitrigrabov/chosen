import { network } from "packages/models/src/network.generated.ts";
import { z } from "zod";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV1ConnectNetworksResponse = z.array(network);

export type UseGetApiV1ConnectNetworksArgs = {
  includeHostedZones?: boolean | undefined;
  includePeeringConnections?: boolean | undefined;
  includeProjects?: boolean | undefined;
  search?: string | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV1ConnectNetworksQueryOptions = (args: UseGetApiV1ConnectNetworksArgs) =>
  queryOptions({
    queryKey: [
      "GET /v1/connect/networks",
      "networking",
      args.includeHostedZones,
      args.includePeeringConnections,
      args.includeProjects,
      args.search,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/connect/networks", {
          includeHostedZones: args.includeHostedZones,
          includePeeringConnections: args.includePeeringConnections,
          includeProjects: args.includeProjects,
          search: args.search,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV1ConnectNetworksResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV1ConnectNetworks = (args: UseGetApiV1ConnectNetworksArgs) =>
  useQuery(getApiV1ConnectNetworksQueryOptions(args));
