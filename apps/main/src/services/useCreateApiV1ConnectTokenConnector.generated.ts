import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1ConnectTokenConnectorArgs = {
  connector: string;
  body: {
    subject?:
      | (
          | { type: "app" }
          | Record<string, unknown>
          | { type: "user"; id?: string | undefined; issuer?: string | undefined }
          | Record<string, unknown>
          | {
              type: "jwt-bearer";
              sub?: string | undefined;
              iss?: string | undefined;
              aud?: string | undefined;
              additionalClaims?: Record<string, unknown> | undefined;
            }
          | Record<string, unknown>
          | { type: "token"; token: string }
        )
      | undefined;
    installationId?: string | undefined;
    audience?: Array<string> | undefined;
    scopes?: Array<string> | undefined;
    resources?: Array<string> | undefined;
    authorizationDetails?:
      | Array<{ type?: string | undefined } | Record<string, unknown>>
      | undefined;
    validityBufferMs?: number | undefined;
  };
};

export const useCreateApiV1ConnectTokenConnectorResponse = z.object({
  token: z.string(),
  tokenId: z.string(),
  expiresAt: z.number(),
  connector: z.object({ id: z.string(), uid: z.string(), type: z.string() }),
  name: z.string().optional(),
  installationId: z.string().optional(),
  tenantId: z.string().optional(),
  externalSubject: z.string().optional(),
  authorizationId: z.string().optional(),
  tokenGroupId: z.string().optional(),
  claims: z.record(z.string(), z.unknown()).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export type UseCreateApiV1ConnectTokenConnectorResponse = {
  token: string;
  tokenId: string;
  expiresAt: number;
  connector: { id: string; uid: string; type: string };
  name?: string | undefined;
  installationId?: string | undefined;
  tenantId?: string | undefined;
  externalSubject?: string | undefined;
  authorizationId?: string | undefined;
  tokenGroupId?: string | undefined;
  claims?: Record<string, unknown> | undefined;
  metadata?: Record<string, unknown> | undefined;
};

export type CreateApiV1ConnectTokenConnectorBody = {
  subject?:
    | (
        | { type: "app" }
        | Record<string, unknown>
        | { type: "user"; id?: string | undefined; issuer?: string | undefined }
        | Record<string, unknown>
        | {
            type: "jwt-bearer";
            sub?: string | undefined;
            iss?: string | undefined;
            aud?: string | undefined;
            additionalClaims?: Record<string, unknown> | undefined;
          }
        | Record<string, unknown>
        | { type: "token"; token: string }
      )
    | undefined;
  installationId?: string | undefined;
  audience?: Array<string> | undefined;
  scopes?: Array<string> | undefined;
  resources?: Array<string> | undefined;
  authorizationDetails?: Array<{ type?: string | undefined } | Record<string, unknown>> | undefined;
  validityBufferMs?: number | undefined;
};

export const useCreateApiV1ConnectTokenConnector = (
  options: UseMutationOptions<
    UseCreateApiV1ConnectTokenConnectorResponse,
    Error,
    UseCreateApiV1ConnectTokenConnectorArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1ConnectTokenConnectorArgs) =>
      apiFetch(
        buildUrl("/v1/connect/token/{connector}", { connector: args.connector }),
        useCreateApiV1ConnectTokenConnectorResponse,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["connect"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
