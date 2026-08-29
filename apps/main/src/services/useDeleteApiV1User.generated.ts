import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/client";

export type UseDeleteApiV1UserArgs = {
  body: { reasons?: Array<{ slug: string; description: string }> | undefined };
};

export const useDeleteApiV1UserResponse = z.object({
  id: z.string(),
  email: z.string(),
  message: z.string(),
});

export type UseDeleteApiV1UserResponse = { id: string; email: string; message: string };

export type DeleteApiV1UserBody = {
  reasons?: Array<{ slug: string; description: string }> | undefined;
};

export const useDeleteApiV1User = (
  options: UseMutationOptions<
    UseDeleteApiV1UserResponse,
    Error,
    UseDeleteApiV1UserArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiV1UserArgs) =>
      apiFetch("/v1/user", useDeleteApiV1UserResponse, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(args.body),
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["user"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
