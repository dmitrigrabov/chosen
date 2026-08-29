import { aiGatewayRuleList } from "packages/models/src/aiGatewayRuleList.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1AiGatewayRulesArgs = {
  includeDisabled?: ("true" | "false") | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV1AiGatewayRulesQueryOptions = (args: UseGetApiV1AiGatewayRulesArgs) =>
  queryOptions({
    queryKey: [
      "GET /v1/ai-gateway/rules",
      "ai-gateway",
      args.includeDisabled,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/ai-gateway/rules", {
          includeDisabled: args.includeDisabled,
          teamId: args.teamId,
          slug: args.slug,
        }),
        aiGatewayRuleList,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV1AiGatewayRules = (args: UseGetApiV1AiGatewayRulesArgs) =>
  useQuery(getApiV1AiGatewayRulesQueryOptions(args));
