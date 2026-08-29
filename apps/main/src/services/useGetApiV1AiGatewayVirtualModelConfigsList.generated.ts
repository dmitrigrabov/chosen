import { aiGatewayVirtualModelConfigList } from "packages/models/src/aiGatewayVirtualModelConfigList.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1AiGatewayVirtualModelConfigsListArgs = {
  ownerId?: string | undefined;
  limit?: number | undefined;
  cursor?: string | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV1AiGatewayVirtualModelConfigsListQueryOptions = (
  args: UseGetApiV1AiGatewayVirtualModelConfigsListArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/ai-gateway/virtual-model-configs/list",
      "api-ai-gateway",
      args.ownerId,
      args.limit,
      args.cursor,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/ai-gateway/virtual-model-configs/list", {
          ownerId: args.ownerId,
          limit: args.limit,
          cursor: args.cursor,
          teamId: args.teamId,
          slug: args.slug,
        }),
        aiGatewayVirtualModelConfigList,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV1AiGatewayVirtualModelConfigsList = (
  args: UseGetApiV1AiGatewayVirtualModelConfigsListArgs,
) => useQuery(getApiV1AiGatewayVirtualModelConfigsListQueryOptions(args));
