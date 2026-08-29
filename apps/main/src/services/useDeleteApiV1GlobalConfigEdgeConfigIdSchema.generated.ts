import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV1GlobalConfigEdgeConfigIdSchemaArgs = {
  edgeConfigId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useDeleteApiV1GlobalConfigEdgeConfigIdSchemaResponse = z.void();

export type UseDeleteApiV1GlobalConfigEdgeConfigIdSchemaResponse = void;

export type DeleteApiV1GlobalConfigEdgeConfigIdSchemaBody = void;

export const useDeleteApiV1GlobalConfigEdgeConfigIdSchema = (
  options: UseMutationOptions<
    UseDeleteApiV1GlobalConfigEdgeConfigIdSchemaResponse,
    Error,
    UseDeleteApiV1GlobalConfigEdgeConfigIdSchemaArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiV1GlobalConfigEdgeConfigIdSchemaArgs) =>
      apiFetch(
        buildUrl("/v1/global-config/{edgeConfigId}/schema", {
          edgeConfigId: args.edgeConfigId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useDeleteApiV1GlobalConfigEdgeConfigIdSchemaResponse,
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
