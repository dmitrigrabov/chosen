import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import {
  getV1LogDrainsId,
  deleteV1LogDrainsId,
  getV1LogDrains,
  postV1LogDrains,
} from "./handlers/log-drains";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.get(
  "/v1/log-drains/:id",
  validate("param", z.object({ id: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(await getV1LogDrainsId({ db, env: c.env, user: c.var.user, params, query }));
  },
);
app.delete(
  "/v1/log-drains/:id",
  validate("param", z.object({ id: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    await deleteV1LogDrainsId({ db, env: c.env, user: c.var.user, params, query });
    return c.body(null, 204);
  },
);
app.get(
  "/v1/log-drains",
  validate(
    "query",
    z.object({
      projectId: z
        .string()
        .regex(/^[a-zA-z0-9_]+$/)
        .optional(),
      projectIdOrName: z.string().optional(),
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
    return c.json(await getV1LogDrains({ db, env: c.env, user: c.var.user, query }));
  },
);
app.post(
  "/v1/log-drains",
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV1LogDrainsBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(await postV1LogDrains({ db, env: c.env, user: c.var.user, query, body }));
  },
);

export type GetV1LogDrainsIdResponse = {
  createdFrom: string;
  clientId?: string | undefined;
  configurationId?: string | undefined;
  projectsMetadata?:
    | (Array<{
        id: string;
        name: string;
        framework?:
          | (
              | "actix-web"
              | "angular"
              | "ash"
              | "astro"
              | "axum"
              | "blitzjs"
              | "brunch"
              | "bun"
              | "container"
              | "create-react-app"
              | "django"
              | "docusaurus"
              | "docusaurus-2"
              | "dojo"
              | "eleventy"
              | "elysia"
              | "ember"
              | "eve"
              | "express"
              | "fastapi"
              | "fasthtml"
              | "fastify"
              | "flask"
              | "gatsby"
              | "go"
              | "gridsome"
              | "h3"
              | "hexo"
              | "hono"
              | "hugo"
              | "hydrogen"
              | "ionic-angular"
              | "ionic-react"
              | "jekyll"
              | "koa"
              | "mastra"
              | "middleman"
              | "nestjs"
              | "nextjs"
              | "nitro"
              | "node"
              | "nuxtjs"
              | "parcel"
              | "polymer"
              | "preact"
              | "python"
              | "react-router"
              | "redwoodjs"
              | "remix"
              | "ruby"
              | "rust"
              | "saber"
              | "sanity"
              | "sanity-v2"
              | "sapper"
              | "scully"
              | "services"
              | "solidstart"
              | "solidstart-1"
              | "stencil"
              | "storybook"
              | "svelte"
              | "sveltekit"
              | "sveltekit-1"
              | "tanstack-start"
              | "tanstack-start-lovable"
              | "umijs"
              | "vite"
              | "vitepress"
              | "vue"
              | "vuepress"
              | "xmcp"
              | "zola"
              | "null"
              | null
            )
          | undefined;
        latestDeployment?: string | undefined;
      }> | null)
    | undefined;
  integrationIcon?: string | undefined;
  integrationConfigurationUri?: string | undefined;
  integrationWebsite?: string | undefined;
};

export type GetV1LogDrainsIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { id: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV1LogDrainsIdHandler = (
  input: GetV1LogDrainsIdInput,
) => Promise<GetV1LogDrainsIdResponse>;

export type DeleteV1LogDrainsIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { id: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type DeleteV1LogDrainsIdHandler = (input: DeleteV1LogDrainsIdInput) => Promise<void>;

export type GetV1LogDrainsResponse =
  | Array<{
      createdFrom: string;
      clientId?: string | undefined;
      configurationId?: string | undefined;
      projectsMetadata?:
        | (Array<{
            id: string;
            name: string;
            framework?:
              | (
                  | "actix-web"
                  | "angular"
                  | "ash"
                  | "astro"
                  | "axum"
                  | "blitzjs"
                  | "brunch"
                  | "bun"
                  | "container"
                  | "create-react-app"
                  | "django"
                  | "docusaurus"
                  | "docusaurus-2"
                  | "dojo"
                  | "eleventy"
                  | "elysia"
                  | "ember"
                  | "eve"
                  | "express"
                  | "fastapi"
                  | "fasthtml"
                  | "fastify"
                  | "flask"
                  | "gatsby"
                  | "go"
                  | "gridsome"
                  | "h3"
                  | "hexo"
                  | "hono"
                  | "hugo"
                  | "hydrogen"
                  | "ionic-angular"
                  | "ionic-react"
                  | "jekyll"
                  | "koa"
                  | "mastra"
                  | "middleman"
                  | "nestjs"
                  | "nextjs"
                  | "nitro"
                  | "node"
                  | "nuxtjs"
                  | "parcel"
                  | "polymer"
                  | "preact"
                  | "python"
                  | "react-router"
                  | "redwoodjs"
                  | "remix"
                  | "ruby"
                  | "rust"
                  | "saber"
                  | "sanity"
                  | "sanity-v2"
                  | "sapper"
                  | "scully"
                  | "services"
                  | "solidstart"
                  | "solidstart-1"
                  | "stencil"
                  | "storybook"
                  | "svelte"
                  | "sveltekit"
                  | "sveltekit-1"
                  | "tanstack-start"
                  | "tanstack-start-lovable"
                  | "umijs"
                  | "vite"
                  | "vitepress"
                  | "vue"
                  | "vuepress"
                  | "xmcp"
                  | "zola"
                  | "null"
                  | null
                )
              | undefined;
            latestDeployment?: string | undefined;
          }> | null)
        | undefined;
      integrationIcon?: string | undefined;
      integrationConfigurationUri?: string | undefined;
      integrationWebsite?: string | undefined;
    }>
  | {
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
                  | {
                      access: "some";
                      projectIds: Array<string>;
                      managedBy: "drain" | "integration";
                    }
                )
              | undefined;
          }>;
    };

export type GetV1LogDrainsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: {
    projectId?: string | undefined;
    projectIdOrName?: string | undefined;
    includeMetadata?: boolean | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV1LogDrainsHandler = (input: GetV1LogDrainsInput) => Promise<GetV1LogDrainsResponse>;

export const postV1LogDrainsBody = z.object({
  deliveryFormat: z.enum(["json", "ndjson"]),
  url: z.string().regex(/^(http|https)?:\/\//),
  headers: z.record(z.string(), z.string()).optional(),
  projectIds: z.array(z.string().regex(/^[a-zA-z0-9_]+$/)).optional(),
  sources: z.array(z.enum(["static", "lambda", "build", "edge", "external", "firewall"])),
  environments: z.array(z.enum(["preview", "production"])).optional(),
  secret: z.string().optional(),
  samplingRate: z.number().gte(0.01).lte(1).multipleOf(0.01).optional(),
  name: z.string().optional(),
});

export type PostV1LogDrainsBody = {
  deliveryFormat: "json" | "ndjson";
  url: string;
  headers?: Record<string, string> | undefined;
  projectIds?: Array<string> | undefined;
  sources: Array<"static" | "lambda" | "build" | "edge" | "external" | "firewall">;
  environments?: Array<"preview" | "production"> | undefined;
  secret?: string | undefined;
  samplingRate?: number | undefined;
  name?: string | undefined;
};

export type PostV1LogDrainsResponse = Record<string, never>;

export type PostV1LogDrainsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV1LogDrainsBody;
};

export type PostV1LogDrainsHandler = (
  input: PostV1LogDrainsInput,
) => Promise<PostV1LogDrainsResponse>;
