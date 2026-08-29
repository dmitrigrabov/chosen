import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UsePatchApiV9ProjectsIdOrNameEnvIdArgs = {
  idOrName: string;
  id: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: {
    key?: string | undefined;
    target?: Array<"production" | "preview" | "development"> | undefined;
    gitBranch?: (string | null) | undefined;
    type?: ("system" | "encrypted" | "plain" | "sensitive") | undefined;
    value?: string | undefined;
    customEnvironmentIds?: Array<string> | undefined;
    comment?: string | undefined;
  };
};

export const usePatchApiV9ProjectsIdOrNameEnvIdResponse = z
  .object({
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
        z.array(z.enum(["development", "development", "preview", "preview", "production"])),
        z.enum(["development", "development", "preview", "preview", "production"]),
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
  })
  .nullable();

export type UsePatchApiV9ProjectsIdOrNameEnvIdResponse = {
  type: "encrypted" | "plain" | "secret" | "sensitive" | "system";
  value: string;
  edgeConfigId?: (string | null) | undefined;
  edgeConfigTokenId?: (string | null) | undefined;
  createdAt?: number | undefined;
  updatedAt?: number | undefined;
  id?: string | undefined;
  key: string;
  target?:
    | (
        | Array<"development" | "development" | "preview" | "preview" | "production">
        | "development"
        | "development"
        | "preview"
        | "preview"
        | "production"
      )
    | undefined;
  gitBranch?: string | undefined;
  createdBy?: (string | null) | undefined;
  updatedBy?: (string | null) | undefined;
  sunsetSecretId?: string | undefined;
  legacyValue?: string | undefined;
  decrypted?: boolean | undefined;
  configurationId?: (string | null) | undefined;
  visibility?: ("config" | "secret") | undefined;
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
  internalContentHint?: ({ type: "flags-secret"; encryptedValue: string } | null) | undefined;
  comment?: string | undefined;
  customEnvironmentIds?: Array<string> | undefined;
} | null;

export type PatchApiV9ProjectsIdOrNameEnvIdBody = {
  key?: string | undefined;
  target?: Array<"production" | "preview" | "development"> | undefined;
  gitBranch?: (string | null) | undefined;
  type?: ("system" | "encrypted" | "plain" | "sensitive") | undefined;
  value?: string | undefined;
  customEnvironmentIds?: Array<string> | undefined;
  comment?: string | undefined;
};

export const usePatchApiV9ProjectsIdOrNameEnvId = (
  options: UseMutationOptions<
    UsePatchApiV9ProjectsIdOrNameEnvIdResponse,
    Error,
    UsePatchApiV9ProjectsIdOrNameEnvIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UsePatchApiV9ProjectsIdOrNameEnvIdArgs) =>
      apiFetch(
        buildUrl("/v9/projects/{idOrName}/env/{id}", {
          idOrName: args.idOrName,
          id: args.id,
          teamId: args.teamId,
          slug: args.slug,
        }),
        usePatchApiV9ProjectsIdOrNameEnvIdResponse,
        {
          method: "PATCH",
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
