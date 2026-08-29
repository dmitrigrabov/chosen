import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1DrainsArgs = {
  teamId?: string | undefined;
  slug?: string | undefined;
  body: {
    name: string;
    projects: "some" | "all";
    projectIds?: Array<string> | undefined;
    filter?:
      | {
          version: string;
          filter:
            | {
                type: string;
                project?: { ids?: Array<string> | undefined } | undefined;
                log?:
                  | {
                      sources?:
                        | Array<
                            | "build"
                            | "edge"
                            | "lambda"
                            | "static"
                            | "external"
                            | "firewall"
                            | "redirect"
                          >
                        | undefined;
                    }
                  | undefined;
                deployment?:
                  | { environments?: Array<"production" | "preview"> | undefined }
                  | undefined;
              }
            | { type: string; text: string };
        }
      | undefined;
    schemas: Record<string, { version: string }>;
    delivery?:
      | (
          | {
              type: string;
              endpoint: string;
              compression?: ("gzip" | "none") | undefined;
              encoding: "json" | "ndjson";
              headers: Record<string, string>;
              secret?: string | undefined;
            }
          | {
              type: string;
              endpoint: { traces: string };
              encoding: "proto" | "json";
              headers: Record<string, string>;
              secret?: string | undefined;
            }
          | {
              type: string;
              endpoint: string;
              encoding: "json" | "ndjson";
              compression: "none";
              fileStructure: "hive";
              roleArn: string;
              region: string;
              serverSideEncryption?: ("AES256" | "aws:kms" | "aws:kms:dsse") | undefined;
              objectAcl?:
                | ("private" | "bucket-owner-read" | "bucket-owner-full-control")
                | undefined;
            }
        )
      | undefined;
    sampling?:
      | Array<{
          type: string;
          rate: number;
          env?: ("production" | "preview") | undefined;
          requestPath?: string | undefined;
        }>
      | undefined;
    transforms?: Array<{ id: string }> | undefined;
    source?:
      | (
          | { kind?: string | undefined; externalResourceId: string }
          | { kind?: string | undefined; resourceId: string }
          | { kind: string }
          | { kind: string }
        )
      | undefined;
  };
};

export const useCreateApiV1DrainsResponse = z.union([
  z.object({
    id: z.string(),
    createdAt: z.number(),
    updatedAt: z.number(),
    projectIds: z.array(z.string()).optional(),
    name: z.string(),
    teamId: z.string().nullable().optional(),
    ownerId: z.string(),
    status: z.enum(["disabled", "enabled", "errored"]).optional(),
    firstErrorTimestamp: z.number().optional(),
    disabledAt: z.number().optional(),
    disabledBy: z.string().optional(),
    disabledReason: z
      .enum([
        "account-plan-downgrade",
        "disabled-by-admin",
        "disabled-by-owner",
        "feature-not-available",
        "limits-exceeded",
      ])
      .optional(),
    schemas: z.object({
      log: z.object({}).optional(),
      trace: z.object({}).optional(),
      analytics: z.object({}).optional(),
      speed_insights: z.object({}).optional(),
      ai_gateway: z.object({}).optional(),
      audit_log: z.object({}).optional(),
      connect: z.object({}).optional(),
    }),
    delivery: z.union([
      z.object({
        type: z.literal("http"),
        endpoint: z.string(),
        encoding: z.enum(["json", "ndjson"]),
        compression: z.enum(["gzip", "none"]).optional(),
        headers: z.record(z.string(), z.string()),
        secret: z
          .union([z.string(), z.object({ kind: z.literal("INTEGRATION_SECRET") })])
          .optional(),
      }),
      z.object({
        type: z.literal("otlphttp"),
        endpoint: z.object({ traces: z.string() }),
        encoding: z.enum(["json", "proto"]),
        headers: z.record(z.string(), z.string()),
        secret: z
          .union([z.string(), z.object({ kind: z.literal("INTEGRATION_SECRET") })])
          .optional(),
      }),
      z.object({ type: z.literal("clickhouse"), endpoint: z.string(), table: z.string() }),
      z.object({
        type: z.literal("s3"),
        endpoint: z.string(),
        encoding: z.enum(["json", "ndjson"]),
        compression: z.literal("none"),
        fileStructure: z.literal("hive"),
        roleArn: z.string(),
        region: z.string(),
        serverSideEncryption: z.enum(["AES256", "aws:kms", "aws:kms:dsse"]).optional(),
        objectAcl: z
          .enum([
            "authenticated-read",
            "aws-exec-read",
            "bucket-owner-full-control",
            "bucket-owner-read",
            "private",
            "public-read",
            "public-read-write",
          ])
          .optional(),
      }),
      z.object({ type: z.literal("internal"), target: z.literal("vercel-otel-traces-db") }),
    ]),
    sampling: z
      .array(
        z.object({
          type: z.literal("head_sampling"),
          rate: z.number(),
          env: z.enum(["preview", "production"]).optional(),
          requestPath: z.string().optional(),
        }),
      )
      .optional(),
    source: z.union([
      z.object({ kind: z.literal("self-served") }),
      z.object({
        kind: z.literal("integration"),
        resourceId: z.string().optional(),
        externalResourceId: z.string().optional(),
        integrationId: z.string(),
        integrationConfigurationId: z.string(),
      }),
    ]),
    filterV2: z
      .object({
        version: z.literal("v2"),
        filter: z.union([
          z.object({
            type: z.literal("basic"),
            project: z.object({ ids: z.array(z.string()).optional() }).optional(),
            log: z
              .object({
                sources: z
                  .array(
                    z.enum([
                      "build",
                      "edge",
                      "external",
                      "firewall",
                      "lambda",
                      "redirect",
                      "static",
                    ]),
                  )
                  .optional(),
                legacy_excludeCachedStaticAssetLogs: z.boolean().optional(),
              })
              .optional(),
            deployment: z
              .object({ environments: z.array(z.enum(["preview", "production"])).optional() })
              .optional(),
          }),
          z.object({ type: z.literal("odata"), text: z.string() }),
        ]),
      })
      .optional(),
  }),
  z.object({
    id: z.string(),
    createdAt: z.number(),
    updatedAt: z.number(),
    projectIds: z.array(z.string()).optional(),
    name: z.string(),
    teamId: z.string().nullable().optional(),
    ownerId: z.string(),
    status: z.enum(["disabled", "enabled", "errored"]).optional(),
    firstErrorTimestamp: z.number().optional(),
    disabledAt: z.number().optional(),
    disabledBy: z.string().optional(),
    disabledReason: z
      .enum([
        "account-plan-downgrade",
        "disabled-by-admin",
        "disabled-by-owner",
        "feature-not-available",
        "limits-exceeded",
      ])
      .optional(),
    schemas: z.object({
      log: z.object({}).optional(),
      trace: z.object({}).optional(),
      analytics: z.object({}).optional(),
      speed_insights: z.object({}).optional(),
      ai_gateway: z.object({}).optional(),
      audit_log: z.object({}).optional(),
      connect: z.object({}).optional(),
    }),
    delivery: z.union([
      z.object({
        type: z.literal("http"),
        endpoint: z.string(),
        encoding: z.enum(["json", "ndjson"]),
        compression: z.enum(["gzip", "none"]).optional(),
        headers: z.record(z.string(), z.string()),
        secret: z
          .union([z.string(), z.object({ kind: z.literal("INTEGRATION_SECRET") })])
          .optional(),
      }),
      z.object({
        type: z.literal("otlphttp"),
        endpoint: z.object({ traces: z.string() }),
        encoding: z.enum(["json", "proto"]),
        headers: z.record(z.string(), z.string()),
        secret: z
          .union([z.string(), z.object({ kind: z.literal("INTEGRATION_SECRET") })])
          .optional(),
      }),
      z.object({ type: z.literal("clickhouse"), endpoint: z.string(), table: z.string() }),
      z.object({
        type: z.literal("s3"),
        endpoint: z.string(),
        encoding: z.enum(["json", "ndjson"]),
        compression: z.literal("none"),
        fileStructure: z.literal("hive"),
        roleArn: z.string(),
        region: z.string(),
        serverSideEncryption: z.enum(["AES256", "aws:kms", "aws:kms:dsse"]).optional(),
        objectAcl: z
          .enum([
            "authenticated-read",
            "aws-exec-read",
            "bucket-owner-full-control",
            "bucket-owner-read",
            "private",
            "public-read",
            "public-read-write",
          ])
          .optional(),
      }),
      z.object({ type: z.literal("internal"), target: z.literal("vercel-otel-traces-db") }),
    ]),
    sampling: z
      .array(
        z.object({
          type: z.literal("head_sampling"),
          rate: z.number(),
          env: z.enum(["preview", "production"]).optional(),
          requestPath: z.string().optional(),
        }),
      )
      .optional(),
    source: z.union([
      z.object({ kind: z.literal("self-served") }),
      z.object({
        kind: z.literal("integration"),
        resourceId: z.string().optional(),
        externalResourceId: z.string().optional(),
        integrationId: z.string(),
        integrationConfigurationId: z.string(),
      }),
    ]),
    filterV2: z
      .object({
        version: z.literal("v2"),
        filter: z.union([
          z.object({
            type: z.literal("basic"),
            project: z.object({ ids: z.array(z.string()).optional() }).optional(),
            log: z
              .object({
                sources: z
                  .array(
                    z.enum([
                      "build",
                      "edge",
                      "external",
                      "firewall",
                      "lambda",
                      "redirect",
                      "static",
                    ]),
                  )
                  .optional(),
                legacy_excludeCachedStaticAssetLogs: z.boolean().optional(),
              })
              .optional(),
            deployment: z
              .object({ environments: z.array(z.enum(["preview", "production"])).optional() })
              .optional(),
          }),
          z.object({ type: z.literal("odata"), text: z.string() }),
        ]),
      })
      .optional(),
    integrationIcon: z.string().optional(),
    integrationConfigurationUri: z.string().optional(),
    integrationWebsite: z.string().optional(),
    projectAccess: z
      .union([
        z.object({ access: z.literal("all"), managedBy: z.enum(["drain", "integration"]) }),
        z.object({
          access: z.literal("some"),
          projectIds: z.array(z.string()),
          managedBy: z.enum(["drain", "integration"]),
        }),
      ])
      .optional(),
  }),
]);

export type UseCreateApiV1DrainsResponse =
  | {
      id: string;
      createdAt: number;
      updatedAt: number;
      projectIds?: Array<string> | undefined;
      name: string;
      teamId?: (string | null) | undefined;
      ownerId: string;
      status?: ("disabled" | "enabled" | "errored") | undefined;
      firstErrorTimestamp?: number | undefined;
      disabledAt?: number | undefined;
      disabledBy?: string | undefined;
      disabledReason?:
        | (
            | "account-plan-downgrade"
            | "disabled-by-admin"
            | "disabled-by-owner"
            | "feature-not-available"
            | "limits-exceeded"
          )
        | undefined;
      schemas: {
        log?: Record<string, never> | undefined;
        trace?: Record<string, never> | undefined;
        analytics?: Record<string, never> | undefined;
        speed_insights?: Record<string, never> | undefined;
        ai_gateway?: Record<string, never> | undefined;
        audit_log?: Record<string, never> | undefined;
        connect?: Record<string, never> | undefined;
      };
      delivery:
        | {
            type: "http";
            endpoint: string;
            encoding: "json" | "ndjson";
            compression?: ("gzip" | "none") | undefined;
            headers: Record<string, string>;
            secret?: (string | { kind: "INTEGRATION_SECRET" }) | undefined;
          }
        | {
            type: "otlphttp";
            endpoint: { traces: string };
            encoding: "json" | "proto";
            headers: Record<string, string>;
            secret?: (string | { kind: "INTEGRATION_SECRET" }) | undefined;
          }
        | { type: "clickhouse"; endpoint: string; table: string }
        | {
            type: "s3";
            endpoint: string;
            encoding: "json" | "ndjson";
            compression: "none";
            fileStructure: "hive";
            roleArn: string;
            region: string;
            serverSideEncryption?: ("AES256" | "aws:kms" | "aws:kms:dsse") | undefined;
            objectAcl?:
              | (
                  | "authenticated-read"
                  | "aws-exec-read"
                  | "bucket-owner-full-control"
                  | "bucket-owner-read"
                  | "private"
                  | "public-read"
                  | "public-read-write"
                )
              | undefined;
          }
        | { type: "internal"; target: "vercel-otel-traces-db" };
      sampling?:
        | Array<{
            type: "head_sampling";
            rate: number;
            env?: ("preview" | "production") | undefined;
            requestPath?: string | undefined;
          }>
        | undefined;
      source:
        | { kind: "self-served" }
        | {
            kind: "integration";
            resourceId?: string | undefined;
            externalResourceId?: string | undefined;
            integrationId: string;
            integrationConfigurationId: string;
          };
      filterV2?:
        | {
            version: "v2";
            filter:
              | {
                  type: "basic";
                  project?: { ids?: Array<string> | undefined } | undefined;
                  log?:
                    | {
                        sources?:
                          | Array<
                              | "build"
                              | "edge"
                              | "external"
                              | "firewall"
                              | "lambda"
                              | "redirect"
                              | "static"
                            >
                          | undefined;
                        legacy_excludeCachedStaticAssetLogs?: boolean | undefined;
                      }
                    | undefined;
                  deployment?:
                    | { environments?: Array<"preview" | "production"> | undefined }
                    | undefined;
                }
              | { type: "odata"; text: string };
          }
        | undefined;
    }
  | {
      id: string;
      createdAt: number;
      updatedAt: number;
      projectIds?: Array<string> | undefined;
      name: string;
      teamId?: (string | null) | undefined;
      ownerId: string;
      status?: ("disabled" | "enabled" | "errored") | undefined;
      firstErrorTimestamp?: number | undefined;
      disabledAt?: number | undefined;
      disabledBy?: string | undefined;
      disabledReason?:
        | (
            | "account-plan-downgrade"
            | "disabled-by-admin"
            | "disabled-by-owner"
            | "feature-not-available"
            | "limits-exceeded"
          )
        | undefined;
      schemas: {
        log?: Record<string, never> | undefined;
        trace?: Record<string, never> | undefined;
        analytics?: Record<string, never> | undefined;
        speed_insights?: Record<string, never> | undefined;
        ai_gateway?: Record<string, never> | undefined;
        audit_log?: Record<string, never> | undefined;
        connect?: Record<string, never> | undefined;
      };
      delivery:
        | {
            type: "http";
            endpoint: string;
            encoding: "json" | "ndjson";
            compression?: ("gzip" | "none") | undefined;
            headers: Record<string, string>;
            secret?: (string | { kind: "INTEGRATION_SECRET" }) | undefined;
          }
        | {
            type: "otlphttp";
            endpoint: { traces: string };
            encoding: "json" | "proto";
            headers: Record<string, string>;
            secret?: (string | { kind: "INTEGRATION_SECRET" }) | undefined;
          }
        | { type: "clickhouse"; endpoint: string; table: string }
        | {
            type: "s3";
            endpoint: string;
            encoding: "json" | "ndjson";
            compression: "none";
            fileStructure: "hive";
            roleArn: string;
            region: string;
            serverSideEncryption?: ("AES256" | "aws:kms" | "aws:kms:dsse") | undefined;
            objectAcl?:
              | (
                  | "authenticated-read"
                  | "aws-exec-read"
                  | "bucket-owner-full-control"
                  | "bucket-owner-read"
                  | "private"
                  | "public-read"
                  | "public-read-write"
                )
              | undefined;
          }
        | { type: "internal"; target: "vercel-otel-traces-db" };
      sampling?:
        | Array<{
            type: "head_sampling";
            rate: number;
            env?: ("preview" | "production") | undefined;
            requestPath?: string | undefined;
          }>
        | undefined;
      source:
        | { kind: "self-served" }
        | {
            kind: "integration";
            resourceId?: string | undefined;
            externalResourceId?: string | undefined;
            integrationId: string;
            integrationConfigurationId: string;
          };
      filterV2?:
        | {
            version: "v2";
            filter:
              | {
                  type: "basic";
                  project?: { ids?: Array<string> | undefined } | undefined;
                  log?:
                    | {
                        sources?:
                          | Array<
                              | "build"
                              | "edge"
                              | "external"
                              | "firewall"
                              | "lambda"
                              | "redirect"
                              | "static"
                            >
                          | undefined;
                        legacy_excludeCachedStaticAssetLogs?: boolean | undefined;
                      }
                    | undefined;
                  deployment?:
                    | { environments?: Array<"preview" | "production"> | undefined }
                    | undefined;
                }
              | { type: "odata"; text: string };
          }
        | undefined;
      integrationIcon?: string | undefined;
      integrationConfigurationUri?: string | undefined;
      integrationWebsite?: string | undefined;
      projectAccess?:
        | (
            | { access: "all"; managedBy: "drain" | "integration" }
            | { access: "some"; projectIds: Array<string>; managedBy: "drain" | "integration" }
          )
        | undefined;
    };

export type CreateApiV1DrainsBody = {
  name: string;
  projects: "some" | "all";
  projectIds?: Array<string> | undefined;
  filter?:
    | {
        version: string;
        filter:
          | {
              type: string;
              project?: { ids?: Array<string> | undefined } | undefined;
              log?:
                | {
                    sources?:
                      | Array<
                          | "build"
                          | "edge"
                          | "lambda"
                          | "static"
                          | "external"
                          | "firewall"
                          | "redirect"
                        >
                      | undefined;
                  }
                | undefined;
              deployment?:
                | { environments?: Array<"production" | "preview"> | undefined }
                | undefined;
            }
          | { type: string; text: string };
      }
    | undefined;
  schemas: Record<string, { version: string }>;
  delivery?:
    | (
        | {
            type: string;
            endpoint: string;
            compression?: ("gzip" | "none") | undefined;
            encoding: "json" | "ndjson";
            headers: Record<string, string>;
            secret?: string | undefined;
          }
        | {
            type: string;
            endpoint: { traces: string };
            encoding: "proto" | "json";
            headers: Record<string, string>;
            secret?: string | undefined;
          }
        | {
            type: string;
            endpoint: string;
            encoding: "json" | "ndjson";
            compression: "none";
            fileStructure: "hive";
            roleArn: string;
            region: string;
            serverSideEncryption?: ("AES256" | "aws:kms" | "aws:kms:dsse") | undefined;
            objectAcl?: ("private" | "bucket-owner-read" | "bucket-owner-full-control") | undefined;
          }
      )
    | undefined;
  sampling?:
    | Array<{
        type: string;
        rate: number;
        env?: ("production" | "preview") | undefined;
        requestPath?: string | undefined;
      }>
    | undefined;
  transforms?: Array<{ id: string }> | undefined;
  source?:
    | (
        | { kind?: string | undefined; externalResourceId: string }
        | { kind?: string | undefined; resourceId: string }
        | { kind: string }
        | { kind: string }
      )
    | undefined;
};

export const useCreateApiV1Drains = (
  options: UseMutationOptions<
    UseCreateApiV1DrainsResponse,
    Error,
    UseCreateApiV1DrainsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1DrainsArgs) =>
      apiFetch(
        buildUrl("/v1/drains", { teamId: args.teamId, slug: args.slug }),
        useCreateApiV1DrainsResponse,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["drains"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
