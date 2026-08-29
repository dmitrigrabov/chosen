import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1ConnectAuthorizeConnectorArgs = {
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
    returnUrl?: string | undefined;
    webhook?: string | undefined;
    prompt?: string | undefined;
    deviceCode?: boolean | undefined;
    expiresInMs?: number | undefined;
    additionalParams?: Record<string, string> | undefined;
  };
};

export const useCreateApiV1ConnectAuthorizeConnectorResponse = z.object({
  url: z.string(),
  request: z.string(),
  verifier: z.string(),
  deviceCode: z.string().optional(),
  expiresAt: z.number(),
  connector: z.object({
    id: z.string(),
    uid: z.string(),
    type: z.string(),
    service: z.string().optional(),
    serviceName: z.string().optional(),
    displayName: z.string(),
    name: z.string(),
  }),
});

export type UseCreateApiV1ConnectAuthorizeConnectorResponse = {
  url: string;
  request: string;
  verifier: string;
  deviceCode?: string | undefined;
  expiresAt: number;
  connector: {
    id: string;
    uid: string;
    type: string;
    service?: string | undefined;
    serviceName?: string | undefined;
    displayName: string;
    name: string;
  };
};

export type CreateApiV1ConnectAuthorizeConnectorBody = {
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
  returnUrl?: string | undefined;
  webhook?: string | undefined;
  prompt?: string | undefined;
  deviceCode?: boolean | undefined;
  expiresInMs?: number | undefined;
  additionalParams?: Record<string, string> | undefined;
};

export const useCreateApiV1ConnectAuthorizeConnector = (
  options: UseMutationOptions<
    UseCreateApiV1ConnectAuthorizeConnectorResponse,
    Error,
    UseCreateApiV1ConnectAuthorizeConnectorArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1ConnectAuthorizeConnectorArgs) =>
      apiFetch(
        buildUrl("/v1/connect/authorize/{connector}", { connector: args.connector }),
        useCreateApiV1ConnectAuthorizeConnectorResponse,
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
