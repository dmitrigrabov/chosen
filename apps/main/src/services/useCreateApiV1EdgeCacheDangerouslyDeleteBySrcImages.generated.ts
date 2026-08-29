import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1EdgeCacheDangerouslyDeleteBySrcImagesArgs = {
  projectIdOrName: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: { revalidationDeadlineSeconds?: number | undefined; srcImages: Array<string> };
};

export const useCreateApiV1EdgeCacheDangerouslyDeleteBySrcImagesResponse = z.void();

export type UseCreateApiV1EdgeCacheDangerouslyDeleteBySrcImagesResponse = void;

export type CreateApiV1EdgeCacheDangerouslyDeleteBySrcImagesBody = {
  revalidationDeadlineSeconds?: number | undefined;
  srcImages: Array<string>;
};

export const useCreateApiV1EdgeCacheDangerouslyDeleteBySrcImages = (
  options: UseMutationOptions<
    UseCreateApiV1EdgeCacheDangerouslyDeleteBySrcImagesResponse,
    Error,
    UseCreateApiV1EdgeCacheDangerouslyDeleteBySrcImagesArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1EdgeCacheDangerouslyDeleteBySrcImagesArgs) =>
      apiFetch(
        buildUrl("/v1/edge-cache/dangerously-delete-by-src-images", {
          projectIdOrName: args.projectIdOrName,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useCreateApiV1EdgeCacheDangerouslyDeleteBySrcImagesResponse,
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
