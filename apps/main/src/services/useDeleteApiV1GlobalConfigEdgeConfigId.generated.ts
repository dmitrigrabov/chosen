import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV1GlobalConfigEdgeConfigIdArgs = {
  edgeConfigId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useDeleteApiV1GlobalConfigEdgeConfigIdResponse = z.void();

export type UseDeleteApiV1GlobalConfigEdgeConfigIdResponse = void;

export type DeleteApiV1GlobalConfigEdgeConfigIdBody = void;

export const useDeleteApiV1GlobalConfigEdgeConfigId = (
  options: UseMutationOptions<
    UseDeleteApiV1GlobalConfigEdgeConfigIdResponse,
    Error,
    UseDeleteApiV1GlobalConfigEdgeConfigIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiV1GlobalConfigEdgeConfigIdArgs) =>
      apiFetch(
        buildUrl("/v1/global-config/{edgeConfigId}", {
          edgeConfigId: args.edgeConfigId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useDeleteApiV1GlobalConfigEdgeConfigIdResponse,
        { method: "DELETE" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["global-config"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
