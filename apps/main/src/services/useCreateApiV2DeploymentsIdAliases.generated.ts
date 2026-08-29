import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV2DeploymentsIdAliasesArgs = {
  id: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: { alias?: string | undefined; redirect?: (string | null) | undefined };
};

export const useCreateApiV2DeploymentsIdAliasesResponse = z.object({
  uid: z.string(),
  alias: z.string(),
  created: z.string(),
  oldDeploymentId: z.string().nullable().optional(),
});

export type UseCreateApiV2DeploymentsIdAliasesResponse = {
  uid: string;
  alias: string;
  created: string;
  oldDeploymentId?: (string | null) | undefined;
};

export type CreateApiV2DeploymentsIdAliasesBody = {
  alias?: string | undefined;
  redirect?: (string | null) | undefined;
};

export const useCreateApiV2DeploymentsIdAliases = (
  options: UseMutationOptions<
    UseCreateApiV2DeploymentsIdAliasesResponse,
    Error,
    UseCreateApiV2DeploymentsIdAliasesArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV2DeploymentsIdAliasesArgs) =>
      apiFetch(
        buildUrl("/v2/deployments/{id}/aliases", {
          id: args.id,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useCreateApiV2DeploymentsIdAliasesResponse,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["aliases"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
