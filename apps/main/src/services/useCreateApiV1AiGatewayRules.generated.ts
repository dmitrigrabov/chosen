import { aiGatewayRule, type AiGatewayRule } from "packages/models/src/aiGatewayRule.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1AiGatewayRulesArgs = {
  teamId?: string | undefined;
  slug?: string | undefined;
};

export type CreateApiV1AiGatewayRulesBody = void;

export const useCreateApiV1AiGatewayRules = (
  options: UseMutationOptions<AiGatewayRule, Error, UseCreateApiV1AiGatewayRulesArgs, unknown> = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1AiGatewayRulesArgs) =>
      apiFetch(
        buildUrl("/v1/ai-gateway/rules", { teamId: args.teamId, slug: args.slug }),
        aiGatewayRule,
        { method: "POST" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["ai-gateway"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
