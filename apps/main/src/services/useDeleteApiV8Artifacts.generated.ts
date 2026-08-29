import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV8ArtifactsArgs = {
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useDeleteApiV8ArtifactsResponse = z.object({ deletedCount: z.number() });

export type UseDeleteApiV8ArtifactsResponse = { deletedCount: number };

export type DeleteApiV8ArtifactsBody = void;

export const useDeleteApiV8Artifacts = (
  options: UseMutationOptions<
    UseDeleteApiV8ArtifactsResponse,
    Error,
    UseDeleteApiV8ArtifactsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiV8ArtifactsArgs) =>
      apiFetch(
        buildUrl("/v8/artifacts", { teamId: args.teamId, slug: args.slug }),
        useDeleteApiV8ArtifactsResponse,
        { method: "DELETE" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["artifacts"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
