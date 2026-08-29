import { z } from "zod";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV1KmsIssuersResponse = z.object({
  issuers: z.array(
    z.object({
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
    }),
  ),
  pagination: z.object({ count: z.number(), next: z.string().nullable() }),
});

export type UseGetApiV1KmsIssuersArgs = {
  limit?: number | undefined;
  next?: string | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV1KmsIssuersQueryOptions = (args: UseGetApiV1KmsIssuersArgs) =>
  queryOptions({
    queryKey: ["GET /v1/kms/issuers", "kms", args.limit, args.next, args.teamId, args.slug],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/kms/issuers", {
          limit: args.limit,
          next: args.next,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV1KmsIssuersResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV1KmsIssuers = (args: UseGetApiV1KmsIssuersArgs) =>
  useQuery(getApiV1KmsIssuersQueryOptions(args));
