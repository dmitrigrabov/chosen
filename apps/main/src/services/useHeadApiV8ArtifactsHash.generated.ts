import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseHeadApiV8ArtifactsHashArgs = {
  hash: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useHeadApiV8ArtifactsHashResponse = z.void();

export type UseHeadApiV8ArtifactsHashResponse = void;

export type HeadApiV8ArtifactsHashBody = void;

export const useHeadApiV8ArtifactsHash = (
  options: UseMutationOptions<
    UseHeadApiV8ArtifactsHashResponse,
    Error,
    UseHeadApiV8ArtifactsHashArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseHeadApiV8ArtifactsHashArgs) =>
      apiFetch(
        buildUrl("/v8/artifacts/{hash}", { hash: args.hash, teamId: args.teamId, slug: args.slug }),
        useHeadApiV8ArtifactsHashResponse,
        { method: "HEAD" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["artifacts"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
