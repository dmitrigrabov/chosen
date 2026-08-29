import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV1AiGatewayRulesArgs = {
  ruleId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useDeleteApiV1AiGatewayRulesResponse = z.unknown();

export type UseDeleteApiV1AiGatewayRulesResponse = unknown;

export type DeleteApiV1AiGatewayRulesBody = void;

export const useDeleteApiV1AiGatewayRules = (
  options: UseMutationOptions<
    UseDeleteApiV1AiGatewayRulesResponse,
    Error,
    UseDeleteApiV1AiGatewayRulesArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiV1AiGatewayRulesArgs) =>
      apiFetch(
        buildUrl("/v1/ai-gateway/rules", {
          ruleId: args.ruleId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useDeleteApiV1AiGatewayRulesResponse,
        { method: "DELETE" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["ai-gateway"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
