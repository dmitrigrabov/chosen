import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV8ArtifactsArgs = {
  teamId?: string | undefined;
  slug?: string | undefined;
  body: { hashes: Array<string> };
};

export const useCreateApiV8ArtifactsResponse = z.record(
  z.string(),
  z
    .union([
      z.object({
        size: z.number(),
        taskDurationMs: z.number(),
        tag: z.string().optional(),
        sha: z.string().optional(),
        dirtyHash: z.string().optional(),
      }),
      z.object({ error: z.object({ message: z.string() }) }),
    ])
    .nullable(),
);

export type UseCreateApiV8ArtifactsResponse = Record<
  string,
  | {
      size: number;
      taskDurationMs: number;
      tag?: string | undefined;
      sha?: string | undefined;
      dirtyHash?: string | undefined;
    }
  | { error: { message: string } }
  | null
>;

export type CreateApiV8ArtifactsBody = { hashes: Array<string> };

export const useCreateApiV8Artifacts = (
  options: UseMutationOptions<
    UseCreateApiV8ArtifactsResponse,
    Error,
    UseCreateApiV8ArtifactsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV8ArtifactsArgs) =>
      apiFetch(
        buildUrl("/v8/artifacts", { teamId: args.teamId, slug: args.slug }),
        useCreateApiV8ArtifactsResponse,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["artifacts"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
