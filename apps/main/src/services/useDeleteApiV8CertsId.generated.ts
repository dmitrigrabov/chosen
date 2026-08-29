import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV8CertsIdArgs = {
  id: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useDeleteApiV8CertsIdResponse = z.object({});

export type UseDeleteApiV8CertsIdResponse = Record<string, never>;

export type DeleteApiV8CertsIdBody = void;

export const useDeleteApiV8CertsId = (
  options: UseMutationOptions<
    UseDeleteApiV8CertsIdResponse,
    Error,
    UseDeleteApiV8CertsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiV8CertsIdArgs) =>
      apiFetch(
        buildUrl("/v8/certs/{id}", { id: args.id, teamId: args.teamId, slug: args.slug }),
        useDeleteApiV8CertsIdResponse,
        { method: "DELETE" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["certs"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
