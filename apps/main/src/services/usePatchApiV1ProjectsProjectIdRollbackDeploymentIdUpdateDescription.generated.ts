import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UsePatchApiV1ProjectsProjectIdRollbackDeploymentIdUpdateDescriptionArgs = {
  projectId: string;
  deploymentId: string;
  body: { description?: string | undefined };
};

export const usePatchApiV1ProjectsProjectIdRollbackDeploymentIdUpdateDescriptionResponse = z.void();

export type UsePatchApiV1ProjectsProjectIdRollbackDeploymentIdUpdateDescriptionResponse = void;

export type PatchApiV1ProjectsProjectIdRollbackDeploymentIdUpdateDescriptionBody = {
  description?: string | undefined;
};

export const usePatchApiV1ProjectsProjectIdRollbackDeploymentIdUpdateDescription = (
  options: UseMutationOptions<
    UsePatchApiV1ProjectsProjectIdRollbackDeploymentIdUpdateDescriptionResponse,
    Error,
    UsePatchApiV1ProjectsProjectIdRollbackDeploymentIdUpdateDescriptionArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UsePatchApiV1ProjectsProjectIdRollbackDeploymentIdUpdateDescriptionArgs) =>
      apiFetch(
        buildUrl("/v1/projects/{projectId}/rollback/{deploymentId}/update-description", {
          projectId: args.projectId,
          deploymentId: args.deploymentId,
        }),
        usePatchApiV1ProjectsProjectIdRollbackDeploymentIdUpdateDescriptionResponse,
        {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["projects"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
