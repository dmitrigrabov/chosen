import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV10ProjectsIdOrNameEnvArgs = {
  idOrName: string;
  upsert?: string | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
  body:
    | unknown
    | unknown
    | Array<
        | {
            key: string;
            value: string;
            type: "system" | "encrypted" | "plain" | "sensitive";
            target: Array<"production" | "preview" | "development">;
            gitBranch?: (string | null) | undefined;
            comment?: string | undefined;
            customEnvironmentIds?: Array<string> | undefined;
          }
        | {
            key: string;
            value: string;
            type: "system" | "encrypted" | "plain" | "sensitive";
            target?: Array<"production" | "preview" | "development"> | undefined;
            gitBranch?: (string | null) | undefined;
            comment?: string | undefined;
            customEnvironmentIds: Array<string>;
          }
      >;
};

export const useCreateApiV10ProjectsIdOrNameEnvResponse = z.object({
  created: z
    .union([
      z.object({
        target: z
          .union([
            z.array(z.enum(["production", "preview", "development"])),
            z.enum(["production", "preview", "development"]),
          ])
          .optional(),
        type: z.enum(["encrypted", "plain", "secret", "sensitive", "system"]),
        sunsetSecretId: z.string().optional(),
        legacyValue: z.string().optional(),
        decrypted: z.boolean().optional(),
        value: z.string(),
        vsmValue: z.string().optional(),
        id: z.string().optional(),
        key: z.string(),
        configurationId: z.string().nullable().optional(),
        createdAt: z.number().optional(),
        updatedAt: z.number().optional(),
        createdBy: z.string().nullable().optional(),
        updatedBy: z.string().nullable().optional(),
        gitBranch: z.string().optional(),
        visibility: z.enum(["config", "secret"]).optional(),
        edgeConfigId: z.string().nullable().optional(),
        edgeConfigTokenId: z.string().nullable().optional(),
        contentHint: z
          .union([
            z.object({ type: z.literal("redis-url"), storeId: z.string() }),
            z.object({ type: z.literal("redis-rest-api-url"), storeId: z.string() }),
            z.object({ type: z.literal("redis-rest-api-token"), storeId: z.string() }),
            z.object({ type: z.literal("redis-rest-api-read-only-token"), storeId: z.string() }),
            z.object({ type: z.literal("blob-read-write-token"), storeId: z.string() }),
            z.object({ type: z.literal("blob-store-id"), storeId: z.string() }),
            z.object({ type: z.literal("blob-webhook-public-key"), storeId: z.string() }),
            z.object({ type: z.literal("postgres-url"), storeId: z.string() }),
            z.object({ type: z.literal("postgres-url-non-pooling"), storeId: z.string() }),
            z.object({ type: z.literal("postgres-prisma-url"), storeId: z.string() }),
            z.object({ type: z.literal("postgres-user"), storeId: z.string() }),
            z.object({ type: z.literal("postgres-host"), storeId: z.string() }),
            z.object({ type: z.literal("postgres-password"), storeId: z.string() }),
            z.object({ type: z.literal("postgres-database"), storeId: z.string() }),
            z.object({ type: z.literal("postgres-url-no-ssl"), storeId: z.string() }),
            z.object({
              type: z.literal("integration-store-secret"),
              storeId: z.string(),
              integrationId: z.string(),
              integrationProductId: z.string(),
              integrationConfigurationId: z.string(),
            }),
            z.object({ type: z.literal("flags-connection-string"), projectId: z.string() }),
          ])
          .nullable()
          .optional(),
        internalContentHint: z
          .object({ type: z.literal("flags-secret"), encryptedValue: z.string() })
          .nullable()
          .optional(),
        comment: z.string().optional(),
        customEnvironmentIds: z.array(z.string()).optional(),
        system: z.boolean().optional(),
      }),
      z.array(
        z.object({
          target: z
            .union([z.array(z.string()), z.enum(["production", "preview", "development"])])
            .optional(),
          type: z.enum(["encrypted", "plain", "secret", "sensitive", "system"]),
          sunsetSecretId: z.string().optional(),
          legacyValue: z.string().optional(),
          decrypted: z.boolean().optional(),
          value: z.string(),
          vsmValue: z.string().optional(),
          id: z.string().optional(),
          key: z.string(),
          configurationId: z.string().nullable().optional(),
          createdAt: z.number().optional(),
          updatedAt: z.number().optional(),
          createdBy: z.string().nullable().optional(),
          updatedBy: z.string().nullable().optional(),
          gitBranch: z.string().optional(),
          visibility: z.enum(["config", "secret"]).optional(),
          edgeConfigId: z.string().nullable().optional(),
          edgeConfigTokenId: z.string().nullable().optional(),
          contentHint: z
            .union([
              z.object({ type: z.literal("redis-url"), storeId: z.string() }),
              z.object({ type: z.literal("redis-rest-api-url"), storeId: z.string() }),
              z.object({ type: z.literal("redis-rest-api-token"), storeId: z.string() }),
              z.object({ type: z.literal("redis-rest-api-read-only-token"), storeId: z.string() }),
              z.object({ type: z.literal("blob-read-write-token"), storeId: z.string() }),
              z.object({ type: z.literal("blob-store-id"), storeId: z.string() }),
              z.object({ type: z.literal("blob-webhook-public-key"), storeId: z.string() }),
              z.object({ type: z.literal("postgres-url"), storeId: z.string() }),
              z.object({ type: z.literal("postgres-url-non-pooling"), storeId: z.string() }),
              z.object({ type: z.literal("postgres-prisma-url"), storeId: z.string() }),
              z.object({ type: z.literal("postgres-user"), storeId: z.string() }),
              z.object({ type: z.literal("postgres-host"), storeId: z.string() }),
              z.object({ type: z.literal("postgres-password"), storeId: z.string() }),
              z.object({ type: z.literal("postgres-database"), storeId: z.string() }),
              z.object({ type: z.literal("postgres-url-no-ssl"), storeId: z.string() }),
              z.object({
                type: z.literal("integration-store-secret"),
                storeId: z.string(),
                integrationId: z.string(),
                integrationProductId: z.string(),
                integrationConfigurationId: z.string(),
              }),
              z.object({ type: z.literal("flags-connection-string"), projectId: z.string() }),
            ])
            .nullable()
            .optional(),
          internalContentHint: z
            .object({ type: z.literal("flags-secret"), encryptedValue: z.string() })
            .nullable()
            .optional(),
          comment: z.string().optional(),
          customEnvironmentIds: z.array(z.string()).optional(),
          system: z.boolean().optional(),
        }),
      ),
    ])
    .optional(),
  failed: z.array(
    z.object({
      error: z.object({
        code: z.string(),
        message: z.string(),
        key: z.string().optional(),
        envVarId: z.string().optional(),
        envVarKey: z.string().optional(),
        action: z.string().optional(),
        link: z.string().optional(),
        value: z
          .union([z.string(), z.array(z.enum(["production", "preview", "development"]))])
          .optional(),
        gitBranch: z.string().optional(),
        target: z
          .union([
            z.array(z.enum(["development", "development", "preview", "preview", "production"])),
            z.enum(["production", "preview", "development"]),
          ])
          .optional(),
        project: z.string().optional(),
      }),
    }),
  ),
});

export type UseCreateApiV10ProjectsIdOrNameEnvResponse = {
  created?:
    | (
        | {
            target?:
              | (
                  | Array<"production" | "preview" | "development">
                  | "production"
                  | "preview"
                  | "development"
                )
              | undefined;
            type: "encrypted" | "plain" | "secret" | "sensitive" | "system";
            sunsetSecretId?: string | undefined;
            legacyValue?: string | undefined;
            decrypted?: boolean | undefined;
            value: string;
            vsmValue?: string | undefined;
            id?: string | undefined;
            key: string;
            configurationId?: (string | null) | undefined;
            createdAt?: number | undefined;
            updatedAt?: number | undefined;
            createdBy?: (string | null) | undefined;
            updatedBy?: (string | null) | undefined;
            gitBranch?: string | undefined;
            visibility?: ("config" | "secret") | undefined;
            edgeConfigId?: (string | null) | undefined;
            edgeConfigTokenId?: (string | null) | undefined;
            contentHint?:
              | (
                  | { type: "redis-url"; storeId: string }
                  | { type: "redis-rest-api-url"; storeId: string }
                  | { type: "redis-rest-api-token"; storeId: string }
                  | { type: "redis-rest-api-read-only-token"; storeId: string }
                  | { type: "blob-read-write-token"; storeId: string }
                  | { type: "blob-store-id"; storeId: string }
                  | { type: "blob-webhook-public-key"; storeId: string }
                  | { type: "postgres-url"; storeId: string }
                  | { type: "postgres-url-non-pooling"; storeId: string }
                  | { type: "postgres-prisma-url"; storeId: string }
                  | { type: "postgres-user"; storeId: string }
                  | { type: "postgres-host"; storeId: string }
                  | { type: "postgres-password"; storeId: string }
                  | { type: "postgres-database"; storeId: string }
                  | { type: "postgres-url-no-ssl"; storeId: string }
                  | {
                      type: "integration-store-secret";
                      storeId: string;
                      integrationId: string;
                      integrationProductId: string;
                      integrationConfigurationId: string;
                    }
                  | { type: "flags-connection-string"; projectId: string }
                  | null
                )
              | undefined;
            internalContentHint?:
              | ({ type: "flags-secret"; encryptedValue: string } | null)
              | undefined;
            comment?: string | undefined;
            customEnvironmentIds?: Array<string> | undefined;
            system?: boolean | undefined;
          }
        | Array<{
            target?: (Array<string> | "production" | "preview" | "development") | undefined;
            type: "encrypted" | "plain" | "secret" | "sensitive" | "system";
            sunsetSecretId?: string | undefined;
            legacyValue?: string | undefined;
            decrypted?: boolean | undefined;
            value: string;
            vsmValue?: string | undefined;
            id?: string | undefined;
            key: string;
            configurationId?: (string | null) | undefined;
            createdAt?: number | undefined;
            updatedAt?: number | undefined;
            createdBy?: (string | null) | undefined;
            updatedBy?: (string | null) | undefined;
            gitBranch?: string | undefined;
            visibility?: ("config" | "secret") | undefined;
            edgeConfigId?: (string | null) | undefined;
            edgeConfigTokenId?: (string | null) | undefined;
            contentHint?:
              | (
                  | { type: "redis-url"; storeId: string }
                  | { type: "redis-rest-api-url"; storeId: string }
                  | { type: "redis-rest-api-token"; storeId: string }
                  | { type: "redis-rest-api-read-only-token"; storeId: string }
                  | { type: "blob-read-write-token"; storeId: string }
                  | { type: "blob-store-id"; storeId: string }
                  | { type: "blob-webhook-public-key"; storeId: string }
                  | { type: "postgres-url"; storeId: string }
                  | { type: "postgres-url-non-pooling"; storeId: string }
                  | { type: "postgres-prisma-url"; storeId: string }
                  | { type: "postgres-user"; storeId: string }
                  | { type: "postgres-host"; storeId: string }
                  | { type: "postgres-password"; storeId: string }
                  | { type: "postgres-database"; storeId: string }
                  | { type: "postgres-url-no-ssl"; storeId: string }
                  | {
                      type: "integration-store-secret";
                      storeId: string;
                      integrationId: string;
                      integrationProductId: string;
                      integrationConfigurationId: string;
                    }
                  | { type: "flags-connection-string"; projectId: string }
                  | null
                )
              | undefined;
            internalContentHint?:
              | ({ type: "flags-secret"; encryptedValue: string } | null)
              | undefined;
            comment?: string | undefined;
            customEnvironmentIds?: Array<string> | undefined;
            system?: boolean | undefined;
          }>
      )
    | undefined;
  failed: Array<{
    error: {
      code: string;
      message: string;
      key?: string | undefined;
      envVarId?: string | undefined;
      envVarKey?: string | undefined;
      action?: string | undefined;
      link?: string | undefined;
      value?: (string | Array<"production" | "preview" | "development">) | undefined;
      gitBranch?: string | undefined;
      target?:
        | (
            | Array<"development" | "development" | "preview" | "preview" | "production">
            | "production"
            | "preview"
            | "development"
          )
        | undefined;
      project?: string | undefined;
    };
  }>;
};

export type CreateApiV10ProjectsIdOrNameEnvBody =
  | unknown
  | unknown
  | Array<
      | {
          key: string;
          value: string;
          type: "system" | "encrypted" | "plain" | "sensitive";
          target: Array<"production" | "preview" | "development">;
          gitBranch?: (string | null) | undefined;
          comment?: string | undefined;
          customEnvironmentIds?: Array<string> | undefined;
        }
      | {
          key: string;
          value: string;
          type: "system" | "encrypted" | "plain" | "sensitive";
          target?: Array<"production" | "preview" | "development"> | undefined;
          gitBranch?: (string | null) | undefined;
          comment?: string | undefined;
          customEnvironmentIds: Array<string>;
        }
    >;

export const useCreateApiV10ProjectsIdOrNameEnv = (
  options: UseMutationOptions<
    UseCreateApiV10ProjectsIdOrNameEnvResponse,
    Error,
    UseCreateApiV10ProjectsIdOrNameEnvArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV10ProjectsIdOrNameEnvArgs) =>
      apiFetch(
        buildUrl("/v10/projects/{idOrName}/env", {
          idOrName: args.idOrName,
          upsert: args.upsert,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useCreateApiV10ProjectsIdOrNameEnvResponse,
        {
          method: "POST",
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
