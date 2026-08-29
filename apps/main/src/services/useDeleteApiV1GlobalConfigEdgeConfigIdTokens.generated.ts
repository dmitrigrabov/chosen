import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV1GlobalConfigEdgeConfigIdTokensArgs = {
  edgeConfigId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body:
    | { tokens: Array<string>; ids?: Array<string> | undefined }
    | { tokens?: Array<string> | undefined; ids: Array<string> };
};

export const useDeleteApiV1GlobalConfigEdgeConfigIdTokensResponse = z.void();

export type UseDeleteApiV1GlobalConfigEdgeConfigIdTokensResponse = void;

export type DeleteApiV1GlobalConfigEdgeConfigIdTokensBody =
  | { tokens: Array<string>; ids?: Array<string> | undefined }
  | { tokens?: Array<string> | undefined; ids: Array<string> };

export const useDeleteApiV1GlobalConfigEdgeConfigIdTokens = (
  options: UseMutationOptions<
    UseDeleteApiV1GlobalConfigEdgeConfigIdTokensResponse,
    Error,
    UseDeleteApiV1GlobalConfigEdgeConfigIdTokensArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiV1GlobalConfigEdgeConfigIdTokensArgs) =>
      apiFetch(
        buildUrl("/v1/global-config/{edgeConfigId}/tokens", {
          edgeConfigId: args.edgeConfigId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useDeleteApiV1GlobalConfigEdgeConfigIdTokensResponse,
        {
          method: "DELETE",
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
