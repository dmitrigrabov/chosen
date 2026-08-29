import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1ProjectsIdOrNameEnvIdArgs = {
  idOrName: string;
  id: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useGetApiV1ProjectsIdOrNameEnvIdResponse = z.union([
  z.object({
    decrypted: z.boolean(),
    type: z.enum(["encrypted", "plain", "secret", "sensitive", "system"]),
    edgeConfigId: z.string().nullable().optional(),
    edgeConfigTokenId: z.string().nullable().optional(),
    createdAt: z.number().optional(),
    updatedAt: z.number().optional(),
    id: z.string().optional(),
    key: z.string(),
    target: z
      .union([
        z.array(z.enum(["development", "development", "preview", "preview", "production"])),
        z.enum(["production", "preview", "development"]),
      ])
      .optional(),
    gitBranch: z.string().optional(),
    createdBy: z.string().nullable().optional(),
    updatedBy: z.string().nullable().optional(),
    sunsetSecretId: z.string().optional(),
    legacyValue: z.string().optional(),
    configurationId: z.string().nullable().optional(),
    visibility: z.enum(["config", "secret"]).optional(),
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
  }),
  z.object({
    type: z.enum(["encrypted", "plain", "secret", "sensitive", "system"]),
    value: z.string(),
    edgeConfigId: z.string().nullable().optional(),
    edgeConfigTokenId: z.string().nullable().optional(),
    createdAt: z.number().optional(),
    updatedAt: z.number().optional(),
    id: z.string().optional(),
    key: z.string(),
    target: z
      .union([
        z.array(z.enum(["production", "preview", "development"])),
        z.enum(["production", "preview", "development"]),
      ])
      .optional(),
    gitBranch: z.string().optional(),
    createdBy: z.string().nullable().optional(),
    updatedBy: z.string().nullable().optional(),
    sunsetSecretId: z.string().optional(),
    legacyValue: z.string().optional(),
    decrypted: z.boolean().optional(),
    configurationId: z.string().nullable().optional(),
    visibility: z.enum(["config", "secret"]).optional(),
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
  }),
]);

export const getApiV1ProjectsIdOrNameEnvIdQueryOptions = (
  args: UseGetApiV1ProjectsIdOrNameEnvIdArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/projects/{idOrName}/env/{id}",
      "projects",
      args.idOrName,
      args.id,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/projects/{idOrName}/env/{id}", {
          idOrName: args.idOrName,
          id: args.id,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV1ProjectsIdOrNameEnvIdResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV1ProjectsIdOrNameEnvId = (args: UseGetApiV1ProjectsIdOrNameEnvIdArgs) =>
  useQuery(getApiV1ProjectsIdOrNameEnvIdQueryOptions(args));
