import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UsePatchApiV1GlobalConfigEdgeConfigIdItemsArgs = {
  edgeConfigId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: {
    items: Array<
      | { operation: unknown }
      | { operation: "update" | "upsert" }
      | { operation: "update" | "upsert" }
    >;
  };
};

export const usePatchApiV1GlobalConfigEdgeConfigIdItemsResponse = z.object({ status: z.string() });

export type UsePatchApiV1GlobalConfigEdgeConfigIdItemsResponse = { status: string };

export type PatchApiV1GlobalConfigEdgeConfigIdItemsBody = {
  items: Array<
    { operation: unknown } | { operation: "update" | "upsert" } | { operation: "update" | "upsert" }
  >;
};

export const usePatchApiV1GlobalConfigEdgeConfigIdItems = (
  options: UseMutationOptions<
    UsePatchApiV1GlobalConfigEdgeConfigIdItemsResponse,
    Error,
    UsePatchApiV1GlobalConfigEdgeConfigIdItemsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UsePatchApiV1GlobalConfigEdgeConfigIdItemsArgs) =>
      apiFetch(
        buildUrl("/v1/global-config/{edgeConfigId}/items", {
          edgeConfigId: args.edgeConfigId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        usePatchApiV1GlobalConfigEdgeConfigIdItemsResponse,
        {
          method: "PATCH",
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
