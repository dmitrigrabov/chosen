import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiSpeedInsightsToggleArgs = { projectId: string; body: { value: boolean } };

export const useCreateApiSpeedInsightsToggleResponse = z.object({ value: z.boolean() });

export type UseCreateApiSpeedInsightsToggleResponse = { value: boolean };

export type CreateApiSpeedInsightsToggleBody = { value: boolean };

export const useCreateApiSpeedInsightsToggle = (
  options: UseMutationOptions<
    UseCreateApiSpeedInsightsToggleResponse,
    Error,
    UseCreateApiSpeedInsightsToggleArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiSpeedInsightsToggleArgs) =>
      apiFetch(
        buildUrl("/speed-insights/toggle", { projectId: args.projectId }),
        useCreateApiSpeedInsightsToggleResponse,
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
