import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1ProjectsProjectIdRollbackDeploymentIdArgs = {
  projectId: string;
  deploymentId: string;
  description?: string | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useCreateApiV1ProjectsProjectIdRollbackDeploymentIdResponse = z.void();

export type UseCreateApiV1ProjectsProjectIdRollbackDeploymentIdResponse = void;

export type CreateApiV1ProjectsProjectIdRollbackDeploymentIdBody = void;

export const useCreateApiV1ProjectsProjectIdRollbackDeploymentId = (
  options: UseMutationOptions<
    UseCreateApiV1ProjectsProjectIdRollbackDeploymentIdResponse,
    Error,
    UseCreateApiV1ProjectsProjectIdRollbackDeploymentIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1ProjectsProjectIdRollbackDeploymentIdArgs) =>
      apiFetch(
        buildUrl("/v1/projects/{projectId}/rollback/{deploymentId}", {
          projectId: args.projectId,
          deploymentId: args.deploymentId,
          description: args.description,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useCreateApiV1ProjectsProjectIdRollbackDeploymentIdResponse,
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
