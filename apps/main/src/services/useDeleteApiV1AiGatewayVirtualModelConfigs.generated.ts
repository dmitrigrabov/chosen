import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV1AiGatewayVirtualModelConfigsArgs = {
  ownerId?: string | undefined;
  virtualModelSlug: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useDeleteApiV1AiGatewayVirtualModelConfigsResponse = z.unknown();

export type UseDeleteApiV1AiGatewayVirtualModelConfigsResponse = unknown;

export type DeleteApiV1AiGatewayVirtualModelConfigsBody = void;

export const useDeleteApiV1AiGatewayVirtualModelConfigs = (
  options: UseMutationOptions<
    UseDeleteApiV1AiGatewayVirtualModelConfigsResponse,
    Error,
    UseDeleteApiV1AiGatewayVirtualModelConfigsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiV1AiGatewayVirtualModelConfigsArgs) =>
      apiFetch(
        buildUrl("/v1/ai-gateway/virtual-model-configs", {
          ownerId: args.ownerId,
          virtualModelSlug: args.virtualModelSlug,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useDeleteApiV1AiGatewayVirtualModelConfigsResponse,
        { method: "DELETE" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["api-ai-gateway"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
