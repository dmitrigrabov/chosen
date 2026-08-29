import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV9ProjectsIdOrNameArgs = {
  idOrName: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useDeleteApiV9ProjectsIdOrNameResponse = z.void();

export type UseDeleteApiV9ProjectsIdOrNameResponse = void;

export type DeleteApiV9ProjectsIdOrNameBody = void;

export const useDeleteApiV9ProjectsIdOrName = (
  options: UseMutationOptions<
    UseDeleteApiV9ProjectsIdOrNameResponse,
    Error,
    UseDeleteApiV9ProjectsIdOrNameArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiV9ProjectsIdOrNameArgs) =>
      apiFetch(
        buildUrl("/v9/projects/{idOrName}", {
          idOrName: args.idOrName,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useDeleteApiV9ProjectsIdOrNameResponse,
        { method: "DELETE" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["projects"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
