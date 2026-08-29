import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV13DeploymentsIdArgs = {
  id: string;
  url?: string | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useDeleteApiV13DeploymentsIdResponse = z.object({
  uid: z.string(),
  state: z.literal("DELETED"),
});

export type UseDeleteApiV13DeploymentsIdResponse = { uid: string; state: "DELETED" };

export type DeleteApiV13DeploymentsIdBody = void;

export const useDeleteApiV13DeploymentsId = (
  options: UseMutationOptions<
    UseDeleteApiV13DeploymentsIdResponse,
    Error,
    UseDeleteApiV13DeploymentsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiV13DeploymentsIdArgs) =>
      apiFetch(
        buildUrl("/v13/deployments/{id}", {
          id: args.id,
          url: args.url,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useDeleteApiV13DeploymentsIdResponse,
        { method: "DELETE" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["deployments"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
