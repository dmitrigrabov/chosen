import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1ProjectsProjectIdUnpauseArgs = {
  projectId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useCreateApiV1ProjectsProjectIdUnpauseResponse = z.void();

export type UseCreateApiV1ProjectsProjectIdUnpauseResponse = void;

export type CreateApiV1ProjectsProjectIdUnpauseBody = void;

export const useCreateApiV1ProjectsProjectIdUnpause = (
  options: UseMutationOptions<
    UseCreateApiV1ProjectsProjectIdUnpauseResponse,
    Error,
    UseCreateApiV1ProjectsProjectIdUnpauseArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1ProjectsProjectIdUnpauseArgs) =>
      apiFetch(
        buildUrl("/v1/projects/{projectId}/unpause", {
          projectId: args.projectId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useCreateApiV1ProjectsProjectIdUnpauseResponse,
        { method: "POST" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["projects"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
