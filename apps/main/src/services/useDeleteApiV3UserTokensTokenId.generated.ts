import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV3UserTokensTokenIdArgs = { tokenId: string };

export const useDeleteApiV3UserTokensTokenIdResponse = z.object({ tokenId: z.string() });

export type UseDeleteApiV3UserTokensTokenIdResponse = { tokenId: string };

export type DeleteApiV3UserTokensTokenIdBody = void;

export const useDeleteApiV3UserTokensTokenId = (
  options: UseMutationOptions<
    UseDeleteApiV3UserTokensTokenIdResponse,
    Error,
    UseDeleteApiV3UserTokensTokenIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiV3UserTokensTokenIdArgs) =>
      apiFetch(
        buildUrl("/v3/user/tokens/{tokenId}", { tokenId: args.tokenId }),
        useDeleteApiV3UserTokensTokenIdResponse,
        { method: "DELETE" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["authentication"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
