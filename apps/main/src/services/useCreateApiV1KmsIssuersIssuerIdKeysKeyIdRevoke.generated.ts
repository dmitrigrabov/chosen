import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1KmsIssuersIssuerIdKeysKeyIdRevokeArgs = {
  issuerId: string;
  keyId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useCreateApiV1KmsIssuersIssuerIdKeysKeyIdRevokeResponse = z.object({
  id: z.string(),
  ownerId: z.string(),
  name: z.string(),
  algorithm: z.enum([
    "ES256",
    "ES384",
    "ES512",
    "EdDSA",
    "PS256",
    "PS384",
    "PS512",
    "RS256",
    "RS384",
    "RS512",
  ]),
  origin: z.enum(["external", "vercel"]),
  managedBy: z.string().optional(),
  claimsSchema: z.record(z.string(), z.unknown()).optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  signingKeys: z.array(
    z.object({
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
    }),
  ),
  policies: z.array(
    z.union([
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
    ]),
  ),
});

export type UseCreateApiV1KmsIssuersIssuerIdKeysKeyIdRevokeResponse = {
  id: string;
  ownerId: string;
  name: string;
  algorithm:
    | "ES256"
    | "ES384"
    | "ES512"
    | "EdDSA"
    | "PS256"
    | "PS384"
    | "PS512"
    | "RS256"
    | "RS384"
    | "RS512";
  origin: "external" | "vercel";
  managedBy?: string | undefined;
  claimsSchema?: Record<string, unknown> | undefined;
  createdAt: string;
  updatedAt: string;
  signingKeys: Array<{
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
  }>;
  policies: Array<
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
      }
  >;
};

export type CreateApiV1KmsIssuersIssuerIdKeysKeyIdRevokeBody = void;

export const useCreateApiV1KmsIssuersIssuerIdKeysKeyIdRevoke = (
  options: UseMutationOptions<
    UseCreateApiV1KmsIssuersIssuerIdKeysKeyIdRevokeResponse,
    Error,
    UseCreateApiV1KmsIssuersIssuerIdKeysKeyIdRevokeArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1KmsIssuersIssuerIdKeysKeyIdRevokeArgs) =>
      apiFetch(
        buildUrl("/v1/kms/issuers/{issuerId}/keys/{keyId}/revoke", {
          issuerId: args.issuerId,
          keyId: args.keyId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useCreateApiV1KmsIssuersIssuerIdKeysKeyIdRevokeResponse,
        { method: "POST" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["kms"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
