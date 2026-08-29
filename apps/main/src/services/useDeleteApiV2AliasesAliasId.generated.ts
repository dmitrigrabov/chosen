import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV2AliasesAliasIdArgs = {
  aliasId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useDeleteApiV2AliasesAliasIdResponse = z.object({ status: z.literal("SUCCESS") });

export type UseDeleteApiV2AliasesAliasIdResponse = { status: "SUCCESS" };

export type DeleteApiV2AliasesAliasIdBody = void;

export const useDeleteApiV2AliasesAliasId = (
  options: UseMutationOptions<
    UseDeleteApiV2AliasesAliasIdResponse,
    Error,
    UseDeleteApiV2AliasesAliasIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiV2AliasesAliasIdArgs) =>
      apiFetch(
        buildUrl("/v2/aliases/{aliasId}", {
          aliasId: args.aliasId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useDeleteApiV2AliasesAliasIdResponse,
        { method: "DELETE" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["aliases"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
