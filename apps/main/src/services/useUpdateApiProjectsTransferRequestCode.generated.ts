import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseUpdateApiProjectsTransferRequestCodeArgs = {
  code: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: {
    newProjectName?: string | undefined;
    paidFeatures?:
      | {
          concurrentBuilds?: (number | null) | undefined;
          passwordProtection?: (boolean | null) | undefined;
          previewDeploymentSuffix?: (boolean | null) | undefined;
        }
      | undefined;
    acceptedPolicies?:
      | Record<string, { eula: string; privacy: string } | Record<string, string>>
      | undefined;
  };
};

export const useUpdateApiProjectsTransferRequestCodeResponse = z.union([
  z.object({
    partnerCalls: z.array(
      z.object({
        installationId: z.string(),
        resourceIds: z.array(z.string()),
        result: z.object({
          status: z.enum(["errored", "fulfilled"]),
          error: z.object({}).optional(),
          code: z.string().optional(),
        }),
      }),
    ),
    resourceTransferErrors: z.array(z.object({})),
    transferredStoreIds: z.array(z.string()),
  }),
  z.object({}),
]);

export type UseUpdateApiProjectsTransferRequestCodeResponse =
  | {
      partnerCalls: Array<{
        installationId: string;
        resourceIds: Array<string>;
        result: {
          status: "errored" | "fulfilled";
          error?: Record<string, never> | undefined;
          code?: string | undefined;
        };
      }>;
      resourceTransferErrors: Array<Record<string, never>>;
      transferredStoreIds: Array<string>;
    }
  | Record<string, never>;

export type UpdateApiProjectsTransferRequestCodeBody = {
  newProjectName?: string | undefined;
  paidFeatures?:
    | {
        concurrentBuilds?: (number | null) | undefined;
        passwordProtection?: (boolean | null) | undefined;
        previewDeploymentSuffix?: (boolean | null) | undefined;
      }
    | undefined;
  acceptedPolicies?:
    | Record<string, { eula: string; privacy: string } | Record<string, string>>
    | undefined;
};

export const useUpdateApiProjectsTransferRequestCode = (
  options: UseMutationOptions<
    UseUpdateApiProjectsTransferRequestCodeResponse,
    Error,
    UseUpdateApiProjectsTransferRequestCodeArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseUpdateApiProjectsTransferRequestCodeArgs) =>
      apiFetch(
        buildUrl("/projects/transfer-request/{code}", {
          code: args.code,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useUpdateApiProjectsTransferRequestCodeResponse,
        {
          method: "PUT",
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
