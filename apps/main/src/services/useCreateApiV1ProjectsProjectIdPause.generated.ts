import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1ProjectsProjectIdPauseArgs = {
  projectId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useCreateApiV1ProjectsProjectIdPauseResponse = z.void();

export type UseCreateApiV1ProjectsProjectIdPauseResponse = void;

export type CreateApiV1ProjectsProjectIdPauseBody = void;

export const useCreateApiV1ProjectsProjectIdPause = (
  options: UseMutationOptions<
    UseCreateApiV1ProjectsProjectIdPauseResponse,
    Error,
    UseCreateApiV1ProjectsProjectIdPauseArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1ProjectsProjectIdPauseArgs) =>
      apiFetch(
        buildUrl("/v1/projects/{projectId}/pause", {
          projectId: args.projectId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useCreateApiV1ProjectsProjectIdPauseResponse,
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
