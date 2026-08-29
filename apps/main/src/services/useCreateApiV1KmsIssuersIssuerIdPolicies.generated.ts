import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1KmsIssuersIssuerIdPoliciesArgs = {
  issuerId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: {
    kind: "project-grant";
    projectId: string;
    environments: Array<string>;
    tokenClaims?: Record<string, unknown> | undefined;
  };
};

export const useCreateApiV1KmsIssuersIssuerIdPoliciesResponse = z.union([
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

export type UseCreateApiV1KmsIssuersIssuerIdPoliciesResponse =
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

export type CreateApiV1KmsIssuersIssuerIdPoliciesBody = {
  kind: "project-grant";
  projectId: string;
  environments: Array<string>;
  tokenClaims?: Record<string, unknown> | undefined;
};

export const useCreateApiV1KmsIssuersIssuerIdPolicies = (
  options: UseMutationOptions<
    UseCreateApiV1KmsIssuersIssuerIdPoliciesResponse,
    Error,
    UseCreateApiV1KmsIssuersIssuerIdPoliciesArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1KmsIssuersIssuerIdPoliciesArgs) =>
      apiFetch(
        buildUrl("/v1/kms/issuers/{issuerId}/policies", {
          issuerId: args.issuerId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useCreateApiV1KmsIssuersIssuerIdPoliciesResponse,
        {
          method: "POST",
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
