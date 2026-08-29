import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1DrainsArgs = {
  projectId?: string | undefined;
  includeMetadata?: boolean | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useGetApiV1DrainsResponse = z.object({
  drains: z.union([
    z.array(
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
    ),
    z.array(
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
    ),
  ]),
});

export const getApiV1DrainsQueryOptions = (args: UseGetApiV1DrainsArgs) =>
  queryOptions({
    queryKey: [
      "GET /v1/drains",
      "drains",
      args.projectId,
      args.includeMetadata,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/drains", {
          projectId: args.projectId,
          includeMetadata: args.includeMetadata,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV1DrainsResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV1Drains = (args: UseGetApiV1DrainsArgs) =>
  useQuery(getApiV1DrainsQueryOptions(args));
