import { z } from "zod";
import { pagination } from "packages/models/src/pagination.generated.ts";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV10ProjectsIdOrNameEnvArgs = {
  idOrName: string;
  gitBranch?: string | undefined;
  decrypt?: ("true" | "false") | undefined;
  source?: string | undefined;
  customEnvironmentId?: string | undefined;
  customEnvironmentSlug?: string | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useGetApiV10ProjectsIdOrNameEnvResponse = z.union([
  z.object({
    target: z
      .union([
        z.array(z.enum(["development", "development", "preview", "preview", "production"])),
        z.enum(["development", "development", "preview", "preview", "production"]),
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
  z.object({
    envs: z.array(
      z.object({
        target: z
          .union([
            z.array(z.enum(["development", "development", "preview", "preview", "production"])),
            z.enum(["development", "development", "preview", "preview", "production"]),
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
    ),
    pagination: pagination,
  }),
  z.object({
    envs: z.array(
      z.object({
        target: z
          .union([
            z.array(z.enum(["development", "development", "preview", "preview", "production"])),
            z.enum(["development", "development", "preview", "preview", "production"]),
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
    ),
    hiddenProductionEnvCount: z.number(),
  }),
]);

export const getApiV10ProjectsIdOrNameEnvQueryOptions = (
  args: UseGetApiV10ProjectsIdOrNameEnvArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v10/projects/{idOrName}/env",
      "projects",
      args.idOrName,
      args.gitBranch,
      args.decrypt,
      args.source,
      args.customEnvironmentId,
      args.customEnvironmentSlug,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v10/projects/{idOrName}/env", {
          idOrName: args.idOrName,
          gitBranch: args.gitBranch,
          decrypt: args.decrypt,
          source: args.source,
          customEnvironmentId: args.customEnvironmentId,
          customEnvironmentSlug: args.customEnvironmentSlug,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV10ProjectsIdOrNameEnvResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV10ProjectsIdOrNameEnv = (args: UseGetApiV10ProjectsIdOrNameEnvArgs) =>
  useQuery(getApiV10ProjectsIdOrNameEnvQueryOptions(args));
