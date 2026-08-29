import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV1KmsIssuersIssuerIdPoliciesKindPolicyKeyArgs = {
  issuerId: string;
  kind: "project-grant" | "connex-grant";
  policyKey: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useDeleteApiV1KmsIssuersIssuerIdPoliciesKindPolicyKeyResponse = z.void();

export type UseDeleteApiV1KmsIssuersIssuerIdPoliciesKindPolicyKeyResponse = void;

export type DeleteApiV1KmsIssuersIssuerIdPoliciesKindPolicyKeyBody = void;

export const useDeleteApiV1KmsIssuersIssuerIdPoliciesKindPolicyKey = (
  options: UseMutationOptions<
    UseDeleteApiV1KmsIssuersIssuerIdPoliciesKindPolicyKeyResponse,
    Error,
    UseDeleteApiV1KmsIssuersIssuerIdPoliciesKindPolicyKeyArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiV1KmsIssuersIssuerIdPoliciesKindPolicyKeyArgs) =>
      apiFetch(
        buildUrl("/v1/kms/issuers/{issuerId}/policies/{kind}/{policyKey}", {
          issuerId: args.issuerId,
          kind: args.kind,
          policyKey: args.policyKey,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useDeleteApiV1KmsIssuersIssuerIdPoliciesKindPolicyKeyResponse,
        { method: "DELETE" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["kms"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
