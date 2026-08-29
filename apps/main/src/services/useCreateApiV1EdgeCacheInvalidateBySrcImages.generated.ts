import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1EdgeCacheInvalidateBySrcImagesArgs = {
  projectIdOrName: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: { srcImages: Array<string> };
};

export const useCreateApiV1EdgeCacheInvalidateBySrcImagesResponse = z.void();

export type UseCreateApiV1EdgeCacheInvalidateBySrcImagesResponse = void;

export type CreateApiV1EdgeCacheInvalidateBySrcImagesBody = { srcImages: Array<string> };

export const useCreateApiV1EdgeCacheInvalidateBySrcImages = (
  options: UseMutationOptions<
    UseCreateApiV1EdgeCacheInvalidateBySrcImagesResponse,
    Error,
    UseCreateApiV1EdgeCacheInvalidateBySrcImagesArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1EdgeCacheInvalidateBySrcImagesArgs) =>
      apiFetch(
        buildUrl("/v1/edge-cache/invalidate-by-src-images", {
          projectIdOrName: args.projectIdOrName,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useCreateApiV1EdgeCacheInvalidateBySrcImagesResponse,
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
