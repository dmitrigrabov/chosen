import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV10ProjectsProjectIdPromoteDeploymentIdArgs = {
  projectId: string;
  deploymentId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useCreateApiV10ProjectsProjectIdPromoteDeploymentIdResponse = z.void();

export type UseCreateApiV10ProjectsProjectIdPromoteDeploymentIdResponse = void;

export type CreateApiV10ProjectsProjectIdPromoteDeploymentIdBody = void;

export const useCreateApiV10ProjectsProjectIdPromoteDeploymentId = (
  options: UseMutationOptions<
    UseCreateApiV10ProjectsProjectIdPromoteDeploymentIdResponse,
    Error,
    UseCreateApiV10ProjectsProjectIdPromoteDeploymentIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV10ProjectsProjectIdPromoteDeploymentIdArgs) =>
      apiFetch(
        buildUrl("/v10/projects/{projectId}/promote/{deploymentId}", {
          projectId: args.projectId,
          deploymentId: args.deploymentId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useCreateApiV10ProjectsProjectIdPromoteDeploymentIdResponse,
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
