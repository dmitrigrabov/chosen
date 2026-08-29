import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1SecurityAttackModeArgs = {
  teamId?: string | undefined;
  slug?: string | undefined;
  body:
    | { projectId: string; attackModeEnabled: boolean; attackModeActiveUntil: number }
    | { projectId: string; attackModeEnabled: boolean };
};

export const useCreateApiV1SecurityAttackModeResponse = z.object({
  attackModeEnabled: z.boolean(),
  attackModeUpdatedAt: z.number(),
});

export type UseCreateApiV1SecurityAttackModeResponse = {
  attackModeEnabled: boolean;
  attackModeUpdatedAt: number;
};

export type CreateApiV1SecurityAttackModeBody =
  | { projectId: string; attackModeEnabled: boolean; attackModeActiveUntil: number }
  | { projectId: string; attackModeEnabled: boolean };

export const useCreateApiV1SecurityAttackMode = (
  options: UseMutationOptions<
    UseCreateApiV1SecurityAttackModeResponse,
    Error,
    UseCreateApiV1SecurityAttackModeArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1SecurityAttackModeArgs) =>
      apiFetch(
        buildUrl("/v1/security/attack-mode", { teamId: args.teamId, slug: args.slug }),
        useCreateApiV1SecurityAttackModeResponse,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["security"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
