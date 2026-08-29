import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1GlobalConfigEdgeConfigIdTokenArgs = {
  edgeConfigId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: { label: string };
};

export const useCreateApiV1GlobalConfigEdgeConfigIdTokenResponse = z.object({
  token: z.string(),
  id: z.string(),
});

export type UseCreateApiV1GlobalConfigEdgeConfigIdTokenResponse = { token: string; id: string };

export type CreateApiV1GlobalConfigEdgeConfigIdTokenBody = { label: string };

export const useCreateApiV1GlobalConfigEdgeConfigIdToken = (
  options: UseMutationOptions<
    UseCreateApiV1GlobalConfigEdgeConfigIdTokenResponse,
    Error,
    UseCreateApiV1GlobalConfigEdgeConfigIdTokenArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1GlobalConfigEdgeConfigIdTokenArgs) =>
      apiFetch(
        buildUrl("/v1/global-config/{edgeConfigId}/token", {
          edgeConfigId: args.edgeConfigId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useCreateApiV1GlobalConfigEdgeConfigIdTokenResponse,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["global-config"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
