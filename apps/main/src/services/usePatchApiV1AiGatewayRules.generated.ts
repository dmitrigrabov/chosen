import { aiGatewayRule, type AiGatewayRule } from "packages/models/src/aiGatewayRule.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UsePatchApiV1AiGatewayRulesArgs = {
  teamId?: string | undefined;
  slug?: string | undefined;
};

export type PatchApiV1AiGatewayRulesBody = void;

export const usePatchApiV1AiGatewayRules = (
  options: UseMutationOptions<AiGatewayRule, Error, UsePatchApiV1AiGatewayRulesArgs, unknown> = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UsePatchApiV1AiGatewayRulesArgs) =>
      apiFetch(
        buildUrl("/v1/ai-gateway/rules", { teamId: args.teamId, slug: args.slug }),
        aiGatewayRule,
        { method: "PATCH" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["ai-gateway"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
