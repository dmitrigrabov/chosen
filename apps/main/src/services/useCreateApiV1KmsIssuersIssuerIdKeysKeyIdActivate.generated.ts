import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1KmsIssuersIssuerIdKeysKeyIdActivateArgs = {
  issuerId: string;
  keyId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: { revokePreviousAfterHours?: number | undefined };
};

export const useCreateApiV1KmsIssuersIssuerIdKeysKeyIdActivateResponse = z.object({
  keyId: z.string(),
  importKeyId: z.string().optional(),
  issuerId: z.string(),
  algorithm: z.string(),
  status: z.enum(["active", "pending", "revoking"]),
  publicKey: z
    .object({
      kty: z.string().optional(),
      kid: z.string().optional(),
      alg: z.string().optional(),
      use: z.string().optional(),
      key_ops: z.array(z.string()).optional(),
      x5c: z.array(z.string()).optional(),
      "x5t#S256": z.string().optional(),
    })
    .optional(),
  publicKeyFingerprint: z.string().optional(),
  publicKeyPem: z.string().optional(),
  certificatePem: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  revokeAt: z.string().optional(),
  activateAt: z.string().optional(),
  activatedAt: z.string().optional(),
});

export type UseCreateApiV1KmsIssuersIssuerIdKeysKeyIdActivateResponse = {
  keyId: string;
  importKeyId?: string | undefined;
  issuerId: string;
  algorithm: string;
  status: "active" | "pending" | "revoking";
  publicKey?:
    | {
        kty?: string | undefined;
        kid?: string | undefined;
        alg?: string | undefined;
        use?: string | undefined;
        key_ops?: Array<string> | undefined;
        x5c?: Array<string> | undefined;
        "x5t#S256"?: string | undefined;
      }
    | undefined;
  publicKeyFingerprint?: string | undefined;
  publicKeyPem?: string | undefined;
  certificatePem?: string | undefined;
  createdAt: string;
  updatedAt: string;
  revokeAt?: string | undefined;
  activateAt?: string | undefined;
  activatedAt?: string | undefined;
};

export type CreateApiV1KmsIssuersIssuerIdKeysKeyIdActivateBody = {
  revokePreviousAfterHours?: number | undefined;
};

export const useCreateApiV1KmsIssuersIssuerIdKeysKeyIdActivate = (
  options: UseMutationOptions<
    UseCreateApiV1KmsIssuersIssuerIdKeysKeyIdActivateResponse,
    Error,
    UseCreateApiV1KmsIssuersIssuerIdKeysKeyIdActivateArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1KmsIssuersIssuerIdKeysKeyIdActivateArgs) =>
      apiFetch(
        buildUrl("/v1/kms/issuers/{issuerId}/keys/{keyId}/activate", {
          issuerId: args.issuerId,
          keyId: args.keyId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useCreateApiV1KmsIssuersIssuerIdKeysKeyIdActivateResponse,
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
