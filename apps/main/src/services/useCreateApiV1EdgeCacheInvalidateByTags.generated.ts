import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1EdgeCacheInvalidateByTagsArgs = {
  projectIdOrName: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: { tags: Array<string> | string; target?: ("production" | "preview") | undefined };
};

export const useCreateApiV1EdgeCacheInvalidateByTagsResponse = z.void();

export type UseCreateApiV1EdgeCacheInvalidateByTagsResponse = void;

export type CreateApiV1EdgeCacheInvalidateByTagsBody = {
  tags: Array<string> | string;
  target?: ("production" | "preview") | undefined;
};

export const useCreateApiV1EdgeCacheInvalidateByTags = (
  options: UseMutationOptions<
    UseCreateApiV1EdgeCacheInvalidateByTagsResponse,
    Error,
    UseCreateApiV1EdgeCacheInvalidateByTagsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1EdgeCacheInvalidateByTagsArgs) =>
      apiFetch(
        buildUrl("/v1/edge-cache/invalidate-by-tags", {
          projectIdOrName: args.projectIdOrName,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useCreateApiV1EdgeCacheInvalidateByTagsResponse,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["edge-cache"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
