import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiStorageStoresBlobIdArgs = { id: string };

export const useDeleteApiStorageStoresBlobIdResponse = z.object({ id: z.string() });

export type UseDeleteApiStorageStoresBlobIdResponse = { id: string };

export type DeleteApiStorageStoresBlobIdBody = void;

export const useDeleteApiStorageStoresBlobId = (
  options: UseMutationOptions<
    UseDeleteApiStorageStoresBlobIdResponse,
    Error,
    UseDeleteApiStorageStoresBlobIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiStorageStoresBlobIdArgs) =>
      apiFetch(
        buildUrl("/storage/stores/blob/{id}", { id: args.id }),
        useDeleteApiStorageStoresBlobIdResponse,
        { method: "DELETE" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["storage"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
