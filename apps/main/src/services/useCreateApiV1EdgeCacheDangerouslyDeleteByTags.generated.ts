import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1EdgeCacheDangerouslyDeleteByTagsArgs = {
  projectIdOrName: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: {
    revalidationDeadlineSeconds?: number | undefined;
    tags: Array<string> | string;
    target?: ("production" | "preview") | undefined;
  };
};

export const useCreateApiV1EdgeCacheDangerouslyDeleteByTagsResponse = z.void();

export type UseCreateApiV1EdgeCacheDangerouslyDeleteByTagsResponse = void;

export type CreateApiV1EdgeCacheDangerouslyDeleteByTagsBody = {
  revalidationDeadlineSeconds?: number | undefined;
  tags: Array<string> | string;
  target?: ("production" | "preview") | undefined;
};

export const useCreateApiV1EdgeCacheDangerouslyDeleteByTags = (
  options: UseMutationOptions<
    UseCreateApiV1EdgeCacheDangerouslyDeleteByTagsResponse,
    Error,
    UseCreateApiV1EdgeCacheDangerouslyDeleteByTagsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1EdgeCacheDangerouslyDeleteByTagsArgs) =>
      apiFetch(
        buildUrl("/v1/edge-cache/dangerously-delete-by-tags", {
          projectIdOrName: args.projectIdOrName,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useCreateApiV1EdgeCacheDangerouslyDeleteByTagsResponse,
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
