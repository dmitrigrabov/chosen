import { z } from "zod";

export type ConnectConnectorCreateData =
  | {
      serverUrl?: string | undefined;
      serverConfig?:
        | (
            | {
                issuer?: string | undefined;
                authorization_endpoint?: string | undefined;
                token_endpoint?: string | undefined;
                userinfo_endpoint?: string | undefined;
                jwks_uri?: string | undefined;
                jwks?:
                  | (
                      | {
                          keys: Array<
                            | {
                                kty: string;
                                kid?: string | undefined;
                                use?: ("sig" | "enc") | undefined;
                                key_ops?: Array<string> | undefined;
                                alg?: string | undefined;
                              }
                            | Record<string, unknown>
                          >;
                        }
                      | Record<string, unknown>
                    )
                  | undefined;
                revocation_endpoint?: string | undefined;
                introspection_endpoint?: string | undefined;
                end_session_endpoint?: string | undefined;
                device_authorization_endpoint?: string | undefined;
                registration_endpoint?: string | undefined;
                response_types_supported?: Array<string> | undefined;
                token_endpoint_auth_methods_supported?: Array<string> | undefined;
                token_endpoint_auth_signing_alg_values_supported?: Array<string> | undefined;
                scopes_supported?: Array<string> | undefined;
                grant_types_supported?: Array<string> | undefined;
                response_modes_supported?: Array<string> | undefined;
                subject_types_supported?: Array<string> | undefined;
                id_token_signing_alg_values_supported?: Array<string> | undefined;
                id_token_encryption_alg_values_supported?: Array<string> | undefined;
                id_token_encryption_enc_values_supported?: Array<string> | undefined;
                claim_types_supported?: Array<string> | undefined;
                claims_supported?: Array<string> | undefined;
                code_challenge_methods_supported?: Array<string> | undefined;
                prompt_values_supported?: Array<string> | undefined;
                claims_parameter_supported?: boolean | undefined;
                request_parameter_supported?: boolean | undefined;
                request_uri_parameter_supported?: boolean | undefined;
                require_request_uri_registration?: boolean | undefined;
                service_documentation?: string | undefined;
                op_policy_uri?: string | undefined;
                op_tos_uri?: string | undefined;
                logo_uri?: string | undefined;
                client_id_metadata_document_supported?: boolean | undefined;
                authorization_details_types_supported?: Array<string> | undefined;
              }
            | Record<string, unknown>
          )
        | undefined;
      clientId: string;
      clientName?: string | undefined;
      clientSecret?: string | undefined;
      tokenEndpointAuthMethod?: string | undefined;
      responseType?: string | undefined;
      pkceRequired?: boolean | undefined;
      codeChallengeMethod?: string | undefined;
      userAuthorization?: { enabled: boolean; scopes?: Array<string> | undefined } | undefined;
      refreshTokens?: { enabled: boolean } | undefined;
      clientCredentials?: { enabled: boolean; scopes?: Array<string> | undefined } | undefined;
      forwardedClaims?: { idToken?: Array<string> | undefined } | undefined;
      defaultAudience?: string | undefined;
      defaultTokenExpiresIn?: number | undefined;
      authorizationUrlParams?: Record<string, string> | undefined;
      jwtBearer?:
        | {
            enabled?: boolean | undefined;
            scopes?: Array<string> | undefined;
            sub?: string | undefined;
            iss?: string | undefined;
            aud?: string | undefined;
            additionalClaims?: Record<string, unknown> | undefined;
            ttl?: number | undefined;
            useClientCredentials?: boolean | undefined;
          }
        | undefined;
      clientAssertion?:
        | {
            type?: string | undefined;
            ttl?: number | undefined;
            claims?: Record<string, unknown> | undefined;
          }
        | undefined;
    }
  | {
      subjectType?: ("app" | "user") | undefined;
      values?:
        | Array<{ value: string; scope?: string | undefined; expiresAt?: number | undefined }>
        | undefined;
      serviceUrls?: Array<string> | undefined;
    }
  | {
      appId: number;
      appSlug: string;
      appName: string;
      clientId: string;
      owner?:
        | {
            type: "user" | "organization" | "User" | "Organization";
            id: number;
            slug: string;
            name?: string | undefined;
          }
        | undefined;
      clientSecret?: string | undefined;
      privateKeyPem?: string | undefined;
      webhookSecret?: string | undefined;
      extras?: Record<string, unknown> | undefined;
    }
  | {
      appId?: string | undefined;
      appName?: string | undefined;
      clientId: string;
      clientSecret: string;
      webhookSecret?: string | undefined;
      appScopes?: Array<string> | undefined;
      userScopes?: Array<string> | undefined;
      ownerOrganization?:
        | { id: string; slug: string; name: string; logoUrl?: (string | null) | undefined }
        | undefined;
      application?:
        | {
            id: string;
            clientId: string;
            name: string;
            description?: (string | null) | undefined;
            developer?: (string | null) | undefined;
            developerUrl?: (string | null) | undefined;
            imageUrl?: (string | null) | undefined;
            redirectUris?: Array<string> | undefined;
            distribution?: (string | null) | undefined;
            webhookResourceTypes?: Array<string> | undefined;
            webhookUrl?: (string | null) | undefined;
            webhookEnabled?: boolean | undefined;
            createdAt?: string | undefined;
            updatedAt?: string | undefined;
          }
        | undefined;
      extras?: Record<string, unknown> | undefined;
    }
  | { apiToken: string; phoneNumbers?: Array<string> | undefined }
  | { consumerKey: string; consumerSecret: string; loginHost: string }
  | { apiKeyId: string; apiSecretKey: string; phoneNumbers?: Array<string> | undefined }
  | {
      appId: string;
      appName: string;
      clientId: string;
      clientSecret: string;
      slackTeam?:
        | { id: string; name?: string | undefined; domain?: string | undefined }
        | undefined;
      signingSecret?: string | undefined;
      verificationToken?: string | undefined;
      botScopes?: Array<string> | undefined;
      userScopes?: Array<string> | undefined;
      extras?: Record<string, unknown> | undefined;
    }
  | {
      clientName?: string | undefined;
      accountIdentifier: string;
      defaultSessionRole?: string | undefined;
      extras?: Record<string, unknown> | undefined;
    }
  | {
      clientName?: string | undefined;
      accountIdentifier?: string | undefined;
      extras?: Record<string, unknown> | undefined;
    }
  | { projectId: string; projectSecret: string; webhookSecret?: string | undefined }
  | Record<string, unknown>;

export const connectConnectorCreateData = z.union([
  z.object({
    serverUrl: z.string().optional(),
    serverConfig: z
      .object({
        issuer: z.string().optional(),
        authorization_endpoint: z.string().optional(),
        token_endpoint: z.string().optional(),
        userinfo_endpoint: z.string().optional(),
        jwks_uri: z.string().optional(),
        jwks: z
          .object({
            keys: z.array(
              z
                .object({
                  kty: z.string(),
                  kid: z.string().optional(),
                  use: z.enum(["sig", "enc"]).optional(),
                  key_ops: z.array(z.string()).optional(),
                  alg: z.string().optional(),
                })
                .and(z.record(z.string(), z.unknown())),
            ),
          })
          .and(z.record(z.string(), z.unknown()))
          .optional(),
        revocation_endpoint: z.string().optional(),
        introspection_endpoint: z.string().optional(),
        end_session_endpoint: z.string().optional(),
        device_authorization_endpoint: z.string().optional(),
        registration_endpoint: z.string().optional(),
        response_types_supported: z.array(z.string()).optional(),
        token_endpoint_auth_methods_supported: z.array(z.string()).optional(),
        token_endpoint_auth_signing_alg_values_supported: z.array(z.string()).optional(),
        scopes_supported: z.array(z.string()).optional(),
        grant_types_supported: z.array(z.string()).optional(),
        response_modes_supported: z.array(z.string()).optional(),
        subject_types_supported: z.array(z.string()).optional(),
        id_token_signing_alg_values_supported: z.array(z.string()).optional(),
        id_token_encryption_alg_values_supported: z.array(z.string()).optional(),
        id_token_encryption_enc_values_supported: z.array(z.string()).optional(),
        claim_types_supported: z.array(z.string()).optional(),
        claims_supported: z.array(z.string()).optional(),
        code_challenge_methods_supported: z.array(z.string()).optional(),
        prompt_values_supported: z.array(z.string()).optional(),
        claims_parameter_supported: z.boolean().optional(),
        request_parameter_supported: z.boolean().optional(),
        request_uri_parameter_supported: z.boolean().optional(),
        require_request_uri_registration: z.boolean().optional(),
        service_documentation: z.string().optional(),
        op_policy_uri: z.string().optional(),
        op_tos_uri: z.string().optional(),
        logo_uri: z.string().optional(),
        client_id_metadata_document_supported: z.boolean().optional(),
        authorization_details_types_supported: z.array(z.string()).optional(),
      })
      .and(z.record(z.string(), z.unknown()))
      .optional(),
    clientId: z.string(),
    clientName: z.string().optional(),
    clientSecret: z.string().optional(),
    tokenEndpointAuthMethod: z.string().optional(),
    responseType: z.string().optional(),
    pkceRequired: z.boolean().optional(),
    codeChallengeMethod: z.string().optional(),
    userAuthorization: z
      .object({ enabled: z.boolean(), scopes: z.array(z.string()).optional() })
      .optional(),
    refreshTokens: z.object({ enabled: z.boolean() }).optional(),
    clientCredentials: z
      .object({ enabled: z.boolean(), scopes: z.array(z.string()).optional() })
      .optional(),
    forwardedClaims: z.object({ idToken: z.array(z.string()).optional() }).optional(),
    defaultAudience: z.string().optional(),
    defaultTokenExpiresIn: z.number().gte(60).optional(),
    authorizationUrlParams: z.record(z.string(), z.string()).optional(),
    jwtBearer: z
      .object({
        enabled: z.boolean().optional(),
        scopes: z.array(z.string()).optional(),
        sub: z.string().optional(),
        iss: z.string().optional(),
        aud: z.string().optional(),
        additionalClaims: z.record(z.string(), z.unknown()).optional(),
        ttl: z.number().gt(0).optional(),
        useClientCredentials: z.boolean().optional(),
      })
      .optional(),
    clientAssertion: z
      .object({
        type: z.string().optional(),
        ttl: z.number().gt(0).optional(),
        claims: z.record(z.string(), z.unknown()).optional(),
      })
      .optional(),
  }),
  z.object({
    subjectType: z.enum(["app", "user"]).optional(),
    values: z
      .array(
        z.object({
          value: z.string(),
          scope: z.string().optional(),
          expiresAt: z.number().int().gt(0).optional(),
        }),
      )
      .optional(),
    serviceUrls: z.array(z.string()).optional(),
  }),
  z.object({
    appId: z.number().int().gt(0),
    appSlug: z.string(),
    appName: z.string(),
    clientId: z.string(),
    owner: z
      .object({
        type: z.enum(["user", "organization", "User", "Organization"]),
        id: z.number().int(),
        slug: z.string(),
        name: z.string().optional(),
      })
      .optional(),
    clientSecret: z.string().optional(),
    privateKeyPem: z.string().optional(),
    webhookSecret: z.string().optional(),
    extras: z.record(z.string(), z.unknown()).optional(),
  }),
  z.object({
    appId: z.string().optional(),
    appName: z.string().optional(),
    clientId: z.string(),
    clientSecret: z.string(),
    webhookSecret: z.string().optional(),
    appScopes: z.array(z.string()).optional(),
    userScopes: z.array(z.string()).optional(),
    ownerOrganization: z
      .object({
        id: z.string(),
        slug: z.string(),
        name: z.string(),
        logoUrl: z.string().nullable().optional(),
      })
      .optional(),
    application: z
      .object({
        id: z.string(),
        clientId: z.string(),
        name: z.string(),
        description: z.string().nullable().optional(),
        developer: z.string().nullable().optional(),
        developerUrl: z.string().nullable().optional(),
        imageUrl: z.string().nullable().optional(),
        redirectUris: z.array(z.string()).optional(),
        distribution: z.string().nullable().optional(),
        webhookResourceTypes: z.array(z.string()).optional(),
        webhookUrl: z.string().nullable().optional(),
        webhookEnabled: z.boolean().optional(),
        createdAt: z.string().optional(),
        updatedAt: z.string().optional(),
      })
      .optional(),
    extras: z.record(z.string(), z.unknown()).optional(),
  }),
  z.object({
    apiToken: z.string(),
    phoneNumbers: z.array(z.string().regex(/^\\+[1-9]\\d{1,14}$/)).optional(),
  }),
  z.object({ consumerKey: z.string(), consumerSecret: z.string(), loginHost: z.string() }),
  z.object({
    apiKeyId: z.string(),
    apiSecretKey: z.string(),
    phoneNumbers: z.array(z.string().regex(/^\\+[1-9]\\d{1,14}$/)).optional(),
  }),
  z.object({
    appId: z.string(),
    appName: z.string(),
    clientId: z.string(),
    clientSecret: z.string(),
    slackTeam: z
      .object({ id: z.string(), name: z.string().optional(), domain: z.string().optional() })
      .optional(),
    signingSecret: z.string().optional(),
    verificationToken: z.string().optional(),
    botScopes: z.array(z.string()).optional(),
    userScopes: z.array(z.string()).optional(),
    extras: z.record(z.string(), z.unknown()).optional(),
  }),
  z.object({
    clientName: z.string().optional(),
    accountIdentifier: z.string(),
    defaultSessionRole: z.string().optional(),
    extras: z.record(z.string(), z.unknown()).optional(),
  }),
  z.object({
    clientName: z.string().optional(),
    accountIdentifier: z.string().optional(),
    extras: z.record(z.string(), z.unknown()).optional(),
  }),
  z.object({
    projectId: z.string(),
    projectSecret: z.string(),
    webhookSecret: z.string().optional(),
  }),
  z.record(z.string(), z.unknown()),
]);
