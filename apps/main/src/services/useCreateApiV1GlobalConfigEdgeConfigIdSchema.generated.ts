import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1GlobalConfigEdgeConfigIdSchemaArgs = {
  edgeConfigId: string;
  dryRun?: string | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: { definition: unknown };
};

export const useCreateApiV1GlobalConfigEdgeConfigIdSchemaResponse = z.object({}).nullable();

export type UseCreateApiV1GlobalConfigEdgeConfigIdSchemaResponse = Record<string, never> | null;

export type CreateApiV1GlobalConfigEdgeConfigIdSchemaBody = { definition: unknown };

export const useCreateApiV1GlobalConfigEdgeConfigIdSchema = (
  options: UseMutationOptions<
    UseCreateApiV1GlobalConfigEdgeConfigIdSchemaResponse,
    Error,
    UseCreateApiV1GlobalConfigEdgeConfigIdSchemaArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1GlobalConfigEdgeConfigIdSchemaArgs) =>
      apiFetch(
        buildUrl("/v1/global-config/{edgeConfigId}/schema", {
          edgeConfigId: args.edgeConfigId,
          dryRun: args.dryRun,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useCreateApiV1GlobalConfigEdgeConfigIdSchemaResponse,
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
