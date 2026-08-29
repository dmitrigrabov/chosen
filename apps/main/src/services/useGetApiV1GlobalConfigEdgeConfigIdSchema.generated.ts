import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1GlobalConfigEdgeConfigIdSchemaArgs = {
  edgeConfigId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useGetApiV1GlobalConfigEdgeConfigIdSchemaResponse = z.object({}).nullable();

export const getApiV1GlobalConfigEdgeConfigIdSchemaQueryOptions = (
  args: UseGetApiV1GlobalConfigEdgeConfigIdSchemaArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/global-config/{edgeConfigId}/schema",
      "global-config",
      args.edgeConfigId,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/global-config/{edgeConfigId}/schema", {
          edgeConfigId: args.edgeConfigId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV1GlobalConfigEdgeConfigIdSchemaResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV1GlobalConfigEdgeConfigIdSchema = (
  args: UseGetApiV1GlobalConfigEdgeConfigIdSchemaArgs,
) => useQuery(getApiV1GlobalConfigEdgeConfigIdSchemaQueryOptions(args));
