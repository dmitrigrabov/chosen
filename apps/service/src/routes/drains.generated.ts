import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import {
  postV1Drains,
  getV1Drains,
  deleteV1DrainsId,
  getV1DrainsId,
  patchV1DrainsId,
  postV1DrainsTest,
} from "./handlers/drains";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.post(
  "/v1/drains",
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV1DrainsBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(await postV1Drains({ db, env: c.env, user: c.var.user, query, body }));
  },
);
app.get(
  "/v1/drains",
  validate(
    "query",
    z.object({
      projectId: z.string().optional(),
      includeMetadata: z
        .preprocess((v) => (v === "true" ? true : v === "false" ? false : v), z.boolean())
        .optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(await getV1Drains({ db, env: c.env, user: c.var.user, query }));
  },
);
app.delete(
  "/v1/drains/:id",
  validate("param", z.object({ id: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    await deleteV1DrainsId({ db, env: c.env, user: c.var.user, params, query });
    return c.body(null, 204);
  },
);
app.get(
  "/v1/drains/:id",
  validate("param", z.object({ id: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(await getV1DrainsId({ db, env: c.env, user: c.var.user, params, query }));
  },
);
app.patch(
  "/v1/drains/:id",
  validate("param", z.object({ id: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", patchV1DrainsIdBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(await patchV1DrainsId({ db, env: c.env, user: c.var.user, params, query, body }));
  },
);
app.post(
  "/v1/drains/test",
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV1DrainsTestBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(await postV1DrainsTest({ db, env: c.env, user: c.var.user, query, body }));
  },
);

export const postV1DrainsBody = z.object({
  name: z.string(),
  projects: z.enum(["some", "all"]),
  projectIds: z.array(z.string()).optional(),
  filter: z
    .object({
      version: z.string(),
      filter: z.union([
        z.object({
          type: z.string(),
          project: z.object({ ids: z.array(z.string()).optional() }).optional(),
          log: z
            .object({
              sources: z
                .array(
                  z.enum(["build", "edge", "lambda", "static", "external", "firewall", "redirect"]),
                )
                .optional(),
            })
            .optional(),
          deployment: z
            .object({ environments: z.array(z.enum(["production", "preview"])).optional() })
            .optional(),
        }),
        z.object({ type: z.string(), text: z.string() }),
      ]),
    })
    .optional(),
  schemas: z.record(z.string(), z.object({ version: z.string() })),
  delivery: z
    .union([
      z.object({
        type: z.string(),
        endpoint: z.string(),
        compression: z.enum(["gzip", "none"]).optional(),
        encoding: z.enum(["json", "ndjson"]),
        headers: z.record(z.string(), z.string()),
        secret: z.string().optional(),
      }),
      z.object({
        type: z.string(),
        endpoint: z.object({ traces: z.string() }),
        encoding: z.enum(["proto", "json"]),
        headers: z.record(z.string(), z.string()),
        secret: z.string().optional(),
      }),
      z.object({
        type: z.string(),
        endpoint: z.string(),
        encoding: z.enum(["json", "ndjson"]),
        compression: z.literal("none"),
        fileStructure: z.literal("hive"),
        roleArn: z.string(),
        region: z.string(),
        serverSideEncryption: z.enum(["AES256", "aws:kms", "aws:kms:dsse"]).optional(),
        objectAcl: z.enum(["private", "bucket-owner-read", "bucket-owner-full-control"]).optional(),
      }),
    ])
    .optional(),
  sampling: z
    .array(
      z.object({
        type: z.string(),
        rate: z.number().gte(0).lte(1),
        env: z.enum(["production", "preview"]).optional(),
        requestPath: z.string().optional(),
      }),
    )
    .optional(),
  transforms: z.array(z.object({ id: z.string() })).optional(),
  source: z
    .union([
      z.object({ kind: z.string().optional(), externalResourceId: z.string() }),
      z.object({ kind: z.string().optional(), resourceId: z.string() }),
      z.object({ kind: z.string() }),
      z.object({ kind: z.string() }),
    ])
    .optional(),
});

export type PostV1DrainsBody = {
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

export type PostV1DrainsResponse =
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

export type PostV1DrainsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV1DrainsBody;
};

export type PostV1DrainsHandler = (input: PostV1DrainsInput) => Promise<PostV1DrainsResponse>;

export type GetV1DrainsResponse = {
  drains:
    | Array<{
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
      }>
    | Array<{
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
      }>;
};

export type GetV1DrainsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: {
    projectId?: string | undefined;
    includeMetadata?: boolean | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV1DrainsHandler = (input: GetV1DrainsInput) => Promise<GetV1DrainsResponse>;

export type DeleteV1DrainsIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { id: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type DeleteV1DrainsIdHandler = (input: DeleteV1DrainsIdInput) => Promise<void>;

export type GetV1DrainsIdResponse =
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

export type GetV1DrainsIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { id: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV1DrainsIdHandler = (input: GetV1DrainsIdInput) => Promise<GetV1DrainsIdResponse>;

export const patchV1DrainsIdBody = z.object({
  name: z.string().optional(),
  projects: z.enum(["some", "all"]).optional(),
  projectIds: z.array(z.string()).nullable().optional(),
  filter: z
    .union([
      z.string(),
      z.object({
        version: z.string(),
        filter: z.union([
          z.object({
            type: z.string(),
            project: z.object({ ids: z.array(z.string()).optional() }).optional(),
            log: z
              .object({
                sources: z
                  .array(
                    z.enum([
                      "build",
                      "edge",
                      "lambda",
                      "static",
                      "external",
                      "firewall",
                      "redirect",
                    ]),
                  )
                  .optional(),
              })
              .optional(),
            deployment: z
              .object({ environments: z.array(z.enum(["production", "preview"])).optional() })
              .optional(),
          }),
          z.object({ type: z.string(), text: z.string() }),
        ]),
      }),
    ])
    .optional(),
  schemas: z.record(z.string(), z.object({ version: z.string() })).optional(),
  delivery: z
    .union([
      z.object({
        type: z.string(),
        endpoint: z.string(),
        compression: z.enum(["gzip", "none"]).optional(),
        encoding: z.enum(["json", "ndjson"]),
        headers: z.record(z.string(), z.string()),
        secret: z.string().optional(),
      }),
      z.object({
        type: z.string(),
        endpoint: z.object({ traces: z.string() }),
        encoding: z.enum(["proto", "json"]),
        headers: z.record(z.string(), z.string()),
        secret: z.string().optional(),
      }),
      z.object({
        type: z.string(),
        endpoint: z.string(),
        encoding: z.enum(["json", "ndjson"]),
        compression: z.literal("none"),
        fileStructure: z.literal("hive"),
        roleArn: z.string(),
        region: z.string(),
        serverSideEncryption: z.enum(["AES256", "aws:kms", "aws:kms:dsse"]).optional(),
        objectAcl: z.enum(["private", "bucket-owner-read", "bucket-owner-full-control"]).optional(),
      }),
    ])
    .optional(),
  sampling: z
    .array(
      z.object({
        type: z.string(),
        rate: z.number().gte(0).lte(1),
        env: z.enum(["production", "preview"]).optional(),
        requestPath: z.string().optional(),
      }),
    )
    .nullable()
    .optional(),
  transforms: z
    .array(z.object({ id: z.string() }))
    .nullable()
    .optional(),
  status: z.enum(["enabled", "disabled"]).optional(),
  source: z
    .union([
      z.object({ kind: z.string().optional(), externalResourceId: z.string() }),
      z.object({ kind: z.string().optional(), resourceId: z.string() }),
      z.object({ kind: z.string() }),
      z.object({ kind: z.string() }),
    ])
    .optional(),
});

export type PatchV1DrainsIdBody = {
  name?: string | undefined;
  projects?: ("some" | "all") | undefined;
  projectIds?: (Array<string> | null) | undefined;
  filter?:
    | (
        | string
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
      )
    | undefined;
  schemas?: Record<string, { version: string }> | undefined;
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
    | (Array<{
        type: string;
        rate: number;
        env?: ("production" | "preview") | undefined;
        requestPath?: string | undefined;
      }> | null)
    | undefined;
  transforms?: (Array<{ id: string }> | null) | undefined;
  status?: ("enabled" | "disabled") | undefined;
  source?:
    | (
        | { kind?: string | undefined; externalResourceId: string }
        | { kind?: string | undefined; resourceId: string }
        | { kind: string }
        | { kind: string }
      )
    | undefined;
};

export type PatchV1DrainsIdResponse =
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

export type PatchV1DrainsIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { id: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PatchV1DrainsIdBody;
};

export type PatchV1DrainsIdHandler = (
  input: PatchV1DrainsIdInput,
) => Promise<PatchV1DrainsIdResponse>;

export const postV1DrainsTestBody = z.object({
  schemas: z.record(z.string(), z.object({ version: z.string() })),
  delivery: z.union([
    z.object({
      type: z.string(),
      endpoint: z.string(),
      compression: z.enum(["gzip", "none"]).optional(),
      encoding: z.enum(["json", "ndjson"]),
      headers: z.record(z.string(), z.string()),
      secret: z.string().optional(),
    }),
    z.object({
      type: z.string(),
      endpoint: z.object({ traces: z.string() }),
      encoding: z.enum(["proto", "json"]),
      headers: z.record(z.string(), z.string()),
      secret: z.string().optional(),
    }),
    z.object({
      type: z.string(),
      endpoint: z.string(),
      encoding: z.enum(["json", "ndjson"]),
      compression: z.literal("none"),
      fileStructure: z.literal("hive"),
      roleArn: z.string(),
      region: z.string(),
      serverSideEncryption: z.enum(["AES256", "aws:kms", "aws:kms:dsse"]).optional(),
      objectAcl: z.enum(["private", "bucket-owner-read", "bucket-owner-full-control"]).optional(),
    }),
  ]),
});

export type PostV1DrainsTestBody = {
  schemas: Record<string, { version: string }>;
  delivery:
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
      };
};

export type PostV1DrainsTestResponse =
  | Record<string, never>
  | { status: string; error: string; endpoint: string };

export type PostV1DrainsTestInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV1DrainsTestBody;
};

export type PostV1DrainsTestHandler = (
  input: PostV1DrainsTestInput,
) => Promise<PostV1DrainsTestResponse>;
