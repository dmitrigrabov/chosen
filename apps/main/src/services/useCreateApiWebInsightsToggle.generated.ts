import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiWebInsightsToggleArgs = { projectId: string; body: { value: boolean } };

export const useCreateApiWebInsightsToggleResponse = z.object({ value: z.boolean() });

export type UseCreateApiWebInsightsToggleResponse = { value: boolean };

export type CreateApiWebInsightsToggleBody = { value: boolean };

export const useCreateApiWebInsightsToggle = (
  options: UseMutationOptions<
    UseCreateApiWebInsightsToggleResponse,
    Error,
    UseCreateApiWebInsightsToggleArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiWebInsightsToggleArgs) =>
      apiFetch(
        buildUrl("/web/insights/toggle", { projectId: args.projectId }),
        useCreateApiWebInsightsToggleResponse,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: [] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
