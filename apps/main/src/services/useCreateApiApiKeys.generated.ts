import { z } from "zod";
import { aPIKey, type APIKey } from "packages/models/src/aPIKey.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/client";

export type UseCreateApiApiKeysArgs = {
  body: {
    purpose: string;
    projectId?: string | undefined;
    name?: string | undefined;
    expiresAt?: number | undefined;
    aiGatewayQuota?:
      | {
          limitAmount: number;
          includeByokInQuota?: boolean | undefined;
          refreshPeriod?: ("daily" | "weekly" | "monthly" | "none") | undefined;
          alertThresholds?: Array<number> | undefined;
        }
      | undefined;
    metadata?: Record<string, unknown> | undefined;
  };
};

export const useCreateApiApiKeysResponse = z.object({ apiKeyString: z.string(), apiKey: aPIKey });

export type UseCreateApiApiKeysResponse = { apiKeyString: string; apiKey: APIKey };

export type CreateApiApiKeysBody = {
  purpose: string;
  projectId?: string | undefined;
  name?: string | undefined;
  expiresAt?: number | undefined;
  aiGatewayQuota?:
    | {
        limitAmount: number;
        includeByokInQuota?: boolean | undefined;
        refreshPeriod?: ("daily" | "weekly" | "monthly" | "none") | undefined;
        alertThresholds?: Array<number> | undefined;
      }
    | undefined;
  metadata?: Record<string, unknown> | undefined;
};

export const useCreateApiApiKeys = (
  options: UseMutationOptions<
    UseCreateApiApiKeysResponse,
    Error,
    UseCreateApiApiKeysArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiApiKeysArgs) =>
      apiFetch("/api-keys", useCreateApiApiKeysResponse, {
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
