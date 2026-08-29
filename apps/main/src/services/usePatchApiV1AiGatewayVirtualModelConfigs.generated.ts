import {
  aiGatewayVirtualModelConfig,
  type AiGatewayVirtualModelConfig,
} from "packages/models/src/aiGatewayVirtualModelConfig.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UsePatchApiV1AiGatewayVirtualModelConfigsArgs = {
  teamId?: string | undefined;
  slug?: string | undefined;
};

export type PatchApiV1AiGatewayVirtualModelConfigsBody = void;

export const usePatchApiV1AiGatewayVirtualModelConfigs = (
  options: UseMutationOptions<
    AiGatewayVirtualModelConfig,
    Error,
    UsePatchApiV1AiGatewayVirtualModelConfigsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UsePatchApiV1AiGatewayVirtualModelConfigsArgs) =>
      apiFetch(
        buildUrl("/v1/ai-gateway/virtual-model-configs", { teamId: args.teamId, slug: args.slug }),
        aiGatewayVirtualModelConfig,
        { method: "PATCH" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["api-ai-gateway"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
