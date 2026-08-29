import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UsePatchApiV1KmsIssuersIssuerIdPoliciesKindPolicyKeyArgs = {
  issuerId: string;
  kind: "project-grant";
  policyKey: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: {
    environments?: Array<string> | undefined;
    tokenClaims?: (Record<string, unknown> | null) | undefined;
  };
};

export const usePatchApiV1KmsIssuersIssuerIdPoliciesKindPolicyKeyResponse = z.union([
  z.object({
    kind: z.literal("project-grant"),
    teamId: z.string(),
    projectId: z.string(),
    environments: z.array(z.string()),
    tokenClaims: z.record(z.string(), z.unknown()).optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  z.object({
    kind: z.literal("connex-grant"),
    clientId: z.string(),
    tokenClaims: z.record(z.string(), z.unknown()).optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
]);

export type UsePatchApiV1KmsIssuersIssuerIdPoliciesKindPolicyKeyResponse =
  | {
      kind: "project-grant";
      teamId: string;
      projectId: string;
      environments: Array<string>;
      tokenClaims?: Record<string, unknown> | undefined;
      createdAt: string;
      updatedAt: string;
    }
  | {
      kind: "connex-grant";
      clientId: string;
      tokenClaims?: Record<string, unknown> | undefined;
      createdAt: string;
      updatedAt: string;
    };

export type PatchApiV1KmsIssuersIssuerIdPoliciesKindPolicyKeyBody = {
  environments?: Array<string> | undefined;
  tokenClaims?: (Record<string, unknown> | null) | undefined;
};

export const usePatchApiV1KmsIssuersIssuerIdPoliciesKindPolicyKey = (
  options: UseMutationOptions<
    UsePatchApiV1KmsIssuersIssuerIdPoliciesKindPolicyKeyResponse,
    Error,
    UsePatchApiV1KmsIssuersIssuerIdPoliciesKindPolicyKeyArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UsePatchApiV1KmsIssuersIssuerIdPoliciesKindPolicyKeyArgs) =>
      apiFetch(
        buildUrl("/v1/kms/issuers/{issuerId}/policies/{kind}/{policyKey}", {
          issuerId: args.issuerId,
          kind: args.kind,
          policyKey: args.policyKey,
          teamId: args.teamId,
          slug: args.slug,
        }),
        usePatchApiV1KmsIssuersIssuerIdPoliciesKindPolicyKeyResponse,
        {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["kms"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
