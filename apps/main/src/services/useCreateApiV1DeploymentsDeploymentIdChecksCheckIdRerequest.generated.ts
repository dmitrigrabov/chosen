import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1DeploymentsDeploymentIdChecksCheckIdRerequestArgs = {
  deploymentId: string;
  checkId: string;
  autoUpdate?: boolean | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useCreateApiV1DeploymentsDeploymentIdChecksCheckIdRerequestResponse = z.object({});

export type UseCreateApiV1DeploymentsDeploymentIdChecksCheckIdRerequestResponse = Record<
  string,
  never
>;

export type CreateApiV1DeploymentsDeploymentIdChecksCheckIdRerequestBody = void;

export const useCreateApiV1DeploymentsDeploymentIdChecksCheckIdRerequest = (
  options: UseMutationOptions<
    UseCreateApiV1DeploymentsDeploymentIdChecksCheckIdRerequestResponse,
    Error,
    UseCreateApiV1DeploymentsDeploymentIdChecksCheckIdRerequestArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1DeploymentsDeploymentIdChecksCheckIdRerequestArgs) =>
      apiFetch(
        buildUrl("/v1/deployments/{deploymentId}/checks/{checkId}/rerequest", {
          deploymentId: args.deploymentId,
          checkId: args.checkId,
          autoUpdate: args.autoUpdate,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useCreateApiV1DeploymentsDeploymentIdChecksCheckIdRerequestResponse,
        { method: "POST" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["checks"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
