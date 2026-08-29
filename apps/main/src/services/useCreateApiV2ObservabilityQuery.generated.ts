import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/client";

export type UseCreateApiV2ObservabilityQueryArgs = {
  body:
    | {
        metric: string;
        scope: Record<string, never>;
        aggregation?: string | undefined;
        groupBy?: Array<string> | undefined;
        filter?: string | undefined;
        limit?: number | undefined;
        orderBy?: string | undefined;
        orderDirection?: ("asc" | "desc") | undefined;
        granularity?: Record<string, never> | undefined;
        startTime?: string | undefined;
        endTime?: string | undefined;
        bucketTimezone?: string | undefined;
      }
    | Record<string, unknown>;
};

export const useCreateApiV2ObservabilityQueryResponse = z.object({});

export type UseCreateApiV2ObservabilityQueryResponse = Record<string, never>;

export type CreateApiV2ObservabilityQueryBody =
  | {
      metric: string;
      scope: Record<string, never>;
      aggregation?: string | undefined;
      groupBy?: Array<string> | undefined;
      filter?: string | undefined;
      limit?: number | undefined;
      orderBy?: string | undefined;
      orderDirection?: ("asc" | "desc") | undefined;
      granularity?: Record<string, never> | undefined;
      startTime?: string | undefined;
      endTime?: string | undefined;
      bucketTimezone?: string | undefined;
    }
  | Record<string, unknown>;

export const useCreateApiV2ObservabilityQuery = (
  options: UseMutationOptions<
    UseCreateApiV2ObservabilityQueryResponse,
    Error,
    UseCreateApiV2ObservabilityQueryArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV2ObservabilityQueryArgs) =>
      apiFetch("/v2/observability/query", useCreateApiV2ObservabilityQueryResponse, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(args.body),
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: [] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
