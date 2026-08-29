import { aiGatewayVirtualModelConfig } from "packages/models/src/aiGatewayVirtualModelConfig.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1AiGatewayVirtualModelConfigsArgs = {
  ownerId?: string | undefined;
  virtualModelSlug: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV1AiGatewayVirtualModelConfigsQueryOptions = (
  args: UseGetApiV1AiGatewayVirtualModelConfigsArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/ai-gateway/virtual-model-configs",
      "api-ai-gateway",
      args.ownerId,
      args.virtualModelSlug,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/ai-gateway/virtual-model-configs", {
          ownerId: args.ownerId,
          virtualModelSlug: args.virtualModelSlug,
          teamId: args.teamId,
          slug: args.slug,
        }),
        aiGatewayVirtualModelConfig,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV1AiGatewayVirtualModelConfigs = (
  args: UseGetApiV1AiGatewayVirtualModelConfigsArgs,
) => useQuery(getApiV1AiGatewayVirtualModelConfigsQueryOptions(args));
