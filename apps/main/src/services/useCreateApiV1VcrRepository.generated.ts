import { vcrRepository, type VcrRepository } from "packages/models/src/vcrRepository.generated.ts";
import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1VcrRepositoryArgs = {
  teamId?: string | undefined;
  slug?: string | undefined;
  body: { projectId: string; name: string };
};

export const useCreateApiV1VcrRepositoryResponse = z.object({ repository: vcrRepository });

export type UseCreateApiV1VcrRepositoryResponse = { repository: VcrRepository };

export type CreateApiV1VcrRepositoryBody = { projectId: string; name: string };

export const useCreateApiV1VcrRepository = (
  options: UseMutationOptions<
    UseCreateApiV1VcrRepositoryResponse,
    Error,
    UseCreateApiV1VcrRepositoryArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1VcrRepositoryArgs) =>
      apiFetch(
        buildUrl("/v1/vcr/repository", { teamId: args.teamId, slug: args.slug }),
        useCreateApiV1VcrRepositoryResponse,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["vcr"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
