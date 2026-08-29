import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseUpdateApiV1GlobalConfigEdgeConfigIdArgs = {
  edgeConfigId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: { slug: string };
};

export const useUpdateApiV1GlobalConfigEdgeConfigIdResponse = z.object({
  id: z.string(),
  createdAt: z.number(),
  createdBy: z.string().optional(),
  ownerId: z.string(),
  slug: z.string(),
  updatedAt: z.number(),
  digest: z.string(),
  purpose: z
    .union([
      z.object({ type: z.literal("flags"), projectId: z.string() }),
      z.object({ type: z.literal("experimentation"), resourceId: z.string() }),
    ])
    .optional(),
  deletedAt: z.number().nullable().optional(),
  transfer: z
    .object({ fromAccountId: z.string(), startedAt: z.number(), doneAt: z.number().nullable() })
    .optional(),
  schema: z.object({}).optional(),
  syncedToDynamoAt: z.number().optional(),
  sizeInBytes: z.number(),
  itemCount: z.number(),
});

export type UseUpdateApiV1GlobalConfigEdgeConfigIdResponse = {
  id: string;
  createdAt: number;
  createdBy?: string | undefined;
  ownerId: string;
  slug: string;
  updatedAt: number;
  digest: string;
  purpose?:
    | ({ type: "flags"; projectId: string } | { type: "experimentation"; resourceId: string })
    | undefined;
  deletedAt?: (number | null) | undefined;
  transfer?: { fromAccountId: string; startedAt: number; doneAt: number | null } | undefined;
  schema?: Record<string, never> | undefined;
  syncedToDynamoAt?: number | undefined;
  sizeInBytes: number;
  itemCount: number;
};

export type UpdateApiV1GlobalConfigEdgeConfigIdBody = { slug: string };

export const useUpdateApiV1GlobalConfigEdgeConfigId = (
  options: UseMutationOptions<
    UseUpdateApiV1GlobalConfigEdgeConfigIdResponse,
    Error,
    UseUpdateApiV1GlobalConfigEdgeConfigIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseUpdateApiV1GlobalConfigEdgeConfigIdArgs) =>
      apiFetch(
        buildUrl("/v1/global-config/{edgeConfigId}", {
          edgeConfigId: args.edgeConfigId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useUpdateApiV1GlobalConfigEdgeConfigIdResponse,
        {
          method: "PUT",
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
