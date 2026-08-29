import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import {
  postV1Webhooks,
  getV1Webhooks,
  getV1WebhooksId,
  deleteV1WebhooksId,
} from "./handlers/webhooks";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.post(
  "/v1/webhooks",
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV1WebhooksBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(await postV1Webhooks({ db, env: c.env, user: c.var.user, query, body }));
  },
);
app.get(
  "/v1/webhooks",
  validate(
    "query",
    z.object({
      projectId: z
        .string()
        .regex(/^[a-zA-z0-9_]+$/)
        .optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(await getV1Webhooks({ db, env: c.env, user: c.var.user, query }));
  },
);
app.get(
  "/v1/webhooks/:id",
  validate("param", z.object({ id: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(await getV1WebhooksId({ db, env: c.env, user: c.var.user, params, query }));
  },
);
app.delete(
  "/v1/webhooks/:id",
  validate("param", z.object({ id: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    await deleteV1WebhooksId({ db, env: c.env, user: c.var.user, params, query });
    return c.body(null, 204);
  },
);

export const postV1WebhooksBody = z.object({
  url: z.string().regex(/^https?:\/\//),
  events: z.array(
    z.enum([
      "budget.reached",
      "domain.created",
      "domain.dns.records.changed",
      "domain.transfer-in.started",
      "domain.transfer-in.completed",
      "domain.transfer-in.failed",
      "domain.certificate.add",
      "domain.certificate.add.failed",
      "domain.certificate.renew",
      "domain.certificate.renew.failed",
      "domain.certificate.deleted",
      "domain.renewal",
      "domain.renewal.failed",
      "domain.auto-renew.changed",
      "deployment.created",
      "deployment.build-requested",
      "deployment.cleanup",
      "deployment.error",
      "deployment.blocked",
      "deployment.canceled",
      "deployment.succeeded",
      "deployment.ready",
      "deployment.check-rerequested",
      "deployment.promoted",
      "deployment.rollback",
      "deployment.integration.action.start",
      "deployment.integration.action.cancel",
      "deployment.integration.action.cleanup",
      "deployment.checkrun.start",
      "deployment.checkrun.cancel",
      "edge-config.created",
      "edge-config.deleted",
      "edge-config.items.updated",
      "firewall.attack",
      "firewall.system-rule-anomaly",
      "firewall.custom-rule-anomaly",
      "function.archival-required",
      "function.removal-required",
      "alerts.triggered",
      "integration-configuration.permission-upgraded",
      "integration-configuration.removed",
      "integration-configuration.scope-change-confirmed",
      "integration-configuration.transferred",
      "integration-resource.project-connected",
      "integration-resource.project-disconnected",
      "project.created",
      "project.removed",
      "project.renamed",
      "project.env-variable.created",
      "project.env-variable.updated",
      "project.env-variable.deleted",
      "project.domain.created",
      "project.domain.updated",
      "project.domain.deleted",
      "project.domain.verified",
      "project.domain.unverified",
      "project.domain.moved",
      "project.rolling-release.started",
      "project.rolling-release.aborted",
      "project.rolling-release.completed",
      "project.rolling-release.approved",
      "deployment.checks.failed",
      "deployment.checks.succeeded",
      "deployment-checks-completed",
      "deployment-ready",
      "deployment-prepared",
      "deployment-error",
      "deployment-check-rerequested",
      "deployment-canceled",
      "project-created",
      "project-removed",
      "domain-created",
      "deployment",
      "integration-configuration-permission-updated",
      "integration-configuration-removed",
      "integration-configuration-scope-change-confirmed",
      "marketplace.member.changed",
      "marketplace.invoice.created",
      "marketplace.invoice.paid",
      "marketplace.invoice.notpaid",
      "marketplace.invoice.overdue",
      "marketplace.invoice.refunded",
      "ai-gateway.balance-depleted",
      "ai-gateway.auto-reload.limit-reached",
      "observability.anomaly",
      "observability.anomaly-error",
      "observability.usage-anomaly",
      "observability.error-anomaly",
      "botid.anomaly",
      "flag.created",
      "flag.updated",
      "flag.deleted",
      "flag.segment.created",
      "flag.segment.updated",
      "flag.segment.deleted",
      "test-webhook",
      "message.created",
      "message.updated",
      "message.deleted",
      "thread.resolved",
      "thread.unresolved",
      "message.reaction-added",
      "message.reaction-removed",
      "message.mentioned",
      "comment.created",
      "comment.updated",
      "comment.deleted",
      "comment.resolved",
      "comment.unresolved",
      "comment.reaction-added",
      "comment.reaction-removed",
      "comment.mentioned",
    ]),
  ),
  projectIds: z.array(z.string().regex(/^[a-zA-z0-9_]+$/)).optional(),
});

export type PostV1WebhooksBody = {
  url: string;
  events: Array<
    | "budget.reached"
    | "domain.created"
    | "domain.dns.records.changed"
    | "domain.transfer-in.started"
    | "domain.transfer-in.completed"
    | "domain.transfer-in.failed"
    | "domain.certificate.add"
    | "domain.certificate.add.failed"
    | "domain.certificate.renew"
    | "domain.certificate.renew.failed"
    | "domain.certificate.deleted"
    | "domain.renewal"
    | "domain.renewal.failed"
    | "domain.auto-renew.changed"
    | "deployment.created"
    | "deployment.build-requested"
    | "deployment.cleanup"
    | "deployment.error"
    | "deployment.blocked"
    | "deployment.canceled"
    | "deployment.succeeded"
    | "deployment.ready"
    | "deployment.check-rerequested"
    | "deployment.promoted"
    | "deployment.rollback"
    | "deployment.integration.action.start"
    | "deployment.integration.action.cancel"
    | "deployment.integration.action.cleanup"
    | "deployment.checkrun.start"
    | "deployment.checkrun.cancel"
    | "edge-config.created"
    | "edge-config.deleted"
    | "edge-config.items.updated"
    | "firewall.attack"
    | "firewall.system-rule-anomaly"
    | "firewall.custom-rule-anomaly"
    | "function.archival-required"
    | "function.removal-required"
    | "alerts.triggered"
    | "integration-configuration.permission-upgraded"
    | "integration-configuration.removed"
    | "integration-configuration.scope-change-confirmed"
    | "integration-configuration.transferred"
    | "integration-resource.project-connected"
    | "integration-resource.project-disconnected"
    | "project.created"
    | "project.removed"
    | "project.renamed"
    | "project.env-variable.created"
    | "project.env-variable.updated"
    | "project.env-variable.deleted"
    | "project.domain.created"
    | "project.domain.updated"
    | "project.domain.deleted"
    | "project.domain.verified"
    | "project.domain.unverified"
    | "project.domain.moved"
    | "project.rolling-release.started"
    | "project.rolling-release.aborted"
    | "project.rolling-release.completed"
    | "project.rolling-release.approved"
    | "deployment.checks.failed"
    | "deployment.checks.succeeded"
    | "deployment-checks-completed"
    | "deployment-ready"
    | "deployment-prepared"
    | "deployment-error"
    | "deployment-check-rerequested"
    | "deployment-canceled"
    | "project-created"
    | "project-removed"
    | "domain-created"
    | "deployment"
    | "integration-configuration-permission-updated"
    | "integration-configuration-removed"
    | "integration-configuration-scope-change-confirmed"
    | "marketplace.member.changed"
    | "marketplace.invoice.created"
    | "marketplace.invoice.paid"
    | "marketplace.invoice.notpaid"
    | "marketplace.invoice.overdue"
    | "marketplace.invoice.refunded"
    | "ai-gateway.balance-depleted"
    | "ai-gateway.auto-reload.limit-reached"
    | "observability.anomaly"
    | "observability.anomaly-error"
    | "observability.usage-anomaly"
    | "observability.error-anomaly"
    | "botid.anomaly"
    | "flag.created"
    | "flag.updated"
    | "flag.deleted"
    | "flag.segment.created"
    | "flag.segment.updated"
    | "flag.segment.deleted"
    | "test-webhook"
    | "message.created"
    | "message.updated"
    | "message.deleted"
    | "thread.resolved"
    | "thread.unresolved"
    | "message.reaction-added"
    | "message.reaction-removed"
    | "message.mentioned"
    | "comment.created"
    | "comment.updated"
    | "comment.deleted"
    | "comment.resolved"
    | "comment.unresolved"
    | "comment.reaction-added"
    | "comment.reaction-removed"
    | "comment.mentioned"
  >;
  projectIds?: Array<string> | undefined;
};

export type PostV1WebhooksResponse = {
  secret: string;
  alertRuleIds?: Array<string> | undefined;
  events: Array<
    | "ai-gateway.auto-reload.limit-reached"
    | "ai-gateway.balance-depleted"
    | "alerts.triggered"
    | "botid.anomaly"
    | "budget.reached"
    | "comment.created"
    | "comment.deleted"
    | "comment.mentioned"
    | "comment.reaction-added"
    | "comment.reaction-removed"
    | "comment.resolved"
    | "comment.unresolved"
    | "comment.updated"
    | "deployment"
    | "deployment-canceled"
    | "deployment-check-rerequested"
    | "deployment-checks-completed"
    | "deployment-error"
    | "deployment-prepared"
    | "deployment-ready"
    | "deployment.blocked"
    | "deployment.build-requested"
    | "deployment.canceled"
    | "deployment.check-rerequested"
    | "deployment.checkrun.cancel"
    | "deployment.checkrun.start"
    | "deployment.checks.failed"
    | "deployment.checks.succeeded"
    | "deployment.cleanup"
    | "deployment.created"
    | "deployment.error"
    | "deployment.integration.action.cancel"
    | "deployment.integration.action.cleanup"
    | "deployment.integration.action.start"
    | "deployment.promoted"
    | "deployment.ready"
    | "deployment.rollback"
    | "deployment.succeeded"
    | "domain-created"
    | "domain.auto-renew.changed"
    | "domain.certificate.add"
    | "domain.certificate.add.failed"
    | "domain.certificate.deleted"
    | "domain.certificate.renew"
    | "domain.certificate.renew.failed"
    | "domain.created"
    | "domain.dns.records.changed"
    | "domain.renewal"
    | "domain.renewal.failed"
    | "domain.transfer-in.completed"
    | "domain.transfer-in.failed"
    | "domain.transfer-in.started"
    | "edge-config.created"
    | "edge-config.deleted"
    | "edge-config.items.updated"
    | "firewall.attack"
    | "firewall.custom-rule-anomaly"
    | "firewall.system-rule-anomaly"
    | "flag.created"
    | "flag.deleted"
    | "flag.segment.created"
    | "flag.segment.deleted"
    | "flag.segment.updated"
    | "flag.updated"
    | "function.archival-required"
    | "function.removal-required"
    | "integration-configuration-permission-updated"
    | "integration-configuration-removed"
    | "integration-configuration-scope-change-confirmed"
    | "integration-configuration.permission-upgraded"
    | "integration-configuration.removed"
    | "integration-configuration.scope-change-confirmed"
    | "integration-configuration.transferred"
    | "integration-resource.project-connected"
    | "integration-resource.project-disconnected"
    | "marketplace.invoice.created"
    | "marketplace.invoice.notpaid"
    | "marketplace.invoice.overdue"
    | "marketplace.invoice.paid"
    | "marketplace.invoice.refunded"
    | "marketplace.member.changed"
    | "message.created"
    | "message.deleted"
    | "message.mentioned"
    | "message.reaction-added"
    | "message.reaction-removed"
    | "message.updated"
    | "observability.anomaly"
    | "observability.anomaly-error"
    | "observability.error-anomaly"
    | "observability.usage-anomaly"
    | "project-created"
    | "project-removed"
    | "project.created"
    | "project.domain.created"
    | "project.domain.deleted"
    | "project.domain.moved"
    | "project.domain.unverified"
    | "project.domain.updated"
    | "project.domain.verified"
    | "project.env-variable.created"
    | "project.env-variable.deleted"
    | "project.env-variable.updated"
    | "project.removed"
    | "project.renamed"
    | "project.rolling-release.aborted"
    | "project.rolling-release.approved"
    | "project.rolling-release.completed"
    | "project.rolling-release.started"
    | "test-webhook"
    | "thread.resolved"
    | "thread.unresolved"
  >;
  id: string;
  url: string;
  ownerId: string;
  createdAt: number;
  updatedAt: number;
  projectIds?: Array<string> | undefined;
};

export type PostV1WebhooksInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV1WebhooksBody;
};

export type PostV1WebhooksHandler = (input: PostV1WebhooksInput) => Promise<PostV1WebhooksResponse>;

export type GetV1WebhooksResponse =
  | Array<{
      projectsMetadata: Array<{
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
      }> | null;
      alertRuleIds?: Array<string> | undefined;
      events: Array<
        | "ai-gateway.auto-reload.limit-reached"
        | "ai-gateway.balance-depleted"
        | "alerts.triggered"
        | "botid.anomaly"
        | "budget.reached"
        | "comment.created"
        | "comment.deleted"
        | "comment.mentioned"
        | "comment.reaction-added"
        | "comment.reaction-removed"
        | "comment.resolved"
        | "comment.unresolved"
        | "comment.updated"
        | "deployment"
        | "deployment-canceled"
        | "deployment-check-rerequested"
        | "deployment-checks-completed"
        | "deployment-error"
        | "deployment-prepared"
        | "deployment-ready"
        | "deployment.blocked"
        | "deployment.build-requested"
        | "deployment.canceled"
        | "deployment.check-rerequested"
        | "deployment.checkrun.cancel"
        | "deployment.checkrun.start"
        | "deployment.checks.failed"
        | "deployment.checks.succeeded"
        | "deployment.cleanup"
        | "deployment.created"
        | "deployment.error"
        | "deployment.integration.action.cancel"
        | "deployment.integration.action.cleanup"
        | "deployment.integration.action.start"
        | "deployment.promoted"
        | "deployment.ready"
        | "deployment.rollback"
        | "deployment.succeeded"
        | "domain-created"
        | "domain.auto-renew.changed"
        | "domain.certificate.add"
        | "domain.certificate.add.failed"
        | "domain.certificate.deleted"
        | "domain.certificate.renew"
        | "domain.certificate.renew.failed"
        | "domain.created"
        | "domain.dns.records.changed"
        | "domain.renewal"
        | "domain.renewal.failed"
        | "domain.transfer-in.completed"
        | "domain.transfer-in.failed"
        | "domain.transfer-in.started"
        | "edge-config.created"
        | "edge-config.deleted"
        | "edge-config.items.updated"
        | "firewall.attack"
        | "firewall.custom-rule-anomaly"
        | "firewall.system-rule-anomaly"
        | "flag.created"
        | "flag.deleted"
        | "flag.segment.created"
        | "flag.segment.deleted"
        | "flag.segment.updated"
        | "flag.updated"
        | "function.archival-required"
        | "function.removal-required"
        | "integration-configuration-permission-updated"
        | "integration-configuration-removed"
        | "integration-configuration-scope-change-confirmed"
        | "integration-configuration.permission-upgraded"
        | "integration-configuration.removed"
        | "integration-configuration.scope-change-confirmed"
        | "integration-configuration.transferred"
        | "integration-resource.project-connected"
        | "integration-resource.project-disconnected"
        | "marketplace.invoice.created"
        | "marketplace.invoice.notpaid"
        | "marketplace.invoice.overdue"
        | "marketplace.invoice.paid"
        | "marketplace.invoice.refunded"
        | "marketplace.member.changed"
        | "message.created"
        | "message.deleted"
        | "message.mentioned"
        | "message.reaction-added"
        | "message.reaction-removed"
        | "message.updated"
        | "observability.anomaly"
        | "observability.anomaly-error"
        | "observability.error-anomaly"
        | "observability.usage-anomaly"
        | "project-created"
        | "project-removed"
        | "project.created"
        | "project.domain.created"
        | "project.domain.deleted"
        | "project.domain.moved"
        | "project.domain.unverified"
        | "project.domain.updated"
        | "project.domain.verified"
        | "project.env-variable.created"
        | "project.env-variable.deleted"
        | "project.env-variable.updated"
        | "project.removed"
        | "project.renamed"
        | "project.rolling-release.aborted"
        | "project.rolling-release.approved"
        | "project.rolling-release.completed"
        | "project.rolling-release.started"
        | "test-webhook"
        | "thread.resolved"
        | "thread.unresolved"
      >;
      id: string;
      url: string;
      ownerId: string;
      createdAt: number;
      updatedAt: number;
      projectIds?: Array<string> | undefined;
    }>
  | Array<{
      alertRuleIds?: Array<string> | undefined;
      events: Array<
        | "ai-gateway.auto-reload.limit-reached"
        | "ai-gateway.balance-depleted"
        | "alerts.triggered"
        | "botid.anomaly"
        | "budget.reached"
        | "comment.created"
        | "comment.deleted"
        | "comment.mentioned"
        | "comment.reaction-added"
        | "comment.reaction-removed"
        | "comment.resolved"
        | "comment.unresolved"
        | "comment.updated"
        | "deployment"
        | "deployment-canceled"
        | "deployment-check-rerequested"
        | "deployment-checks-completed"
        | "deployment-error"
        | "deployment-prepared"
        | "deployment-ready"
        | "deployment.blocked"
        | "deployment.build-requested"
        | "deployment.canceled"
        | "deployment.check-rerequested"
        | "deployment.checkrun.cancel"
        | "deployment.checkrun.start"
        | "deployment.checks.failed"
        | "deployment.checks.succeeded"
        | "deployment.cleanup"
        | "deployment.created"
        | "deployment.error"
        | "deployment.integration.action.cancel"
        | "deployment.integration.action.cleanup"
        | "deployment.integration.action.start"
        | "deployment.promoted"
        | "deployment.ready"
        | "deployment.rollback"
        | "deployment.succeeded"
        | "domain-created"
        | "domain.auto-renew.changed"
        | "domain.certificate.add"
        | "domain.certificate.add.failed"
        | "domain.certificate.deleted"
        | "domain.certificate.renew"
        | "domain.certificate.renew.failed"
        | "domain.created"
        | "domain.dns.records.changed"
        | "domain.renewal"
        | "domain.renewal.failed"
        | "domain.transfer-in.completed"
        | "domain.transfer-in.failed"
        | "domain.transfer-in.started"
        | "edge-config.created"
        | "edge-config.deleted"
        | "edge-config.items.updated"
        | "firewall.attack"
        | "firewall.custom-rule-anomaly"
        | "firewall.system-rule-anomaly"
        | "flag.created"
        | "flag.deleted"
        | "flag.segment.created"
        | "flag.segment.deleted"
        | "flag.segment.updated"
        | "flag.updated"
        | "function.archival-required"
        | "function.removal-required"
        | "integration-configuration-permission-updated"
        | "integration-configuration-removed"
        | "integration-configuration-scope-change-confirmed"
        | "integration-configuration.permission-upgraded"
        | "integration-configuration.removed"
        | "integration-configuration.scope-change-confirmed"
        | "integration-configuration.transferred"
        | "integration-resource.project-connected"
        | "integration-resource.project-disconnected"
        | "marketplace.invoice.created"
        | "marketplace.invoice.notpaid"
        | "marketplace.invoice.overdue"
        | "marketplace.invoice.paid"
        | "marketplace.invoice.refunded"
        | "marketplace.member.changed"
        | "message.created"
        | "message.deleted"
        | "message.mentioned"
        | "message.reaction-added"
        | "message.reaction-removed"
        | "message.updated"
        | "observability.anomaly"
        | "observability.anomaly-error"
        | "observability.error-anomaly"
        | "observability.usage-anomaly"
        | "project-created"
        | "project-removed"
        | "project.created"
        | "project.domain.created"
        | "project.domain.deleted"
        | "project.domain.moved"
        | "project.domain.unverified"
        | "project.domain.updated"
        | "project.domain.verified"
        | "project.env-variable.created"
        | "project.env-variable.deleted"
        | "project.env-variable.updated"
        | "project.removed"
        | "project.renamed"
        | "project.rolling-release.aborted"
        | "project.rolling-release.approved"
        | "project.rolling-release.completed"
        | "project.rolling-release.started"
        | "test-webhook"
        | "thread.resolved"
        | "thread.unresolved"
      >;
      id: string;
      url: string;
      ownerId: string;
      createdAt: number;
      updatedAt: number;
      projectIds?: Array<string> | undefined;
    }>;

export type GetV1WebhooksInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { projectId?: string | undefined; teamId?: string | undefined; slug?: string | undefined };
};

export type GetV1WebhooksHandler = (input: GetV1WebhooksInput) => Promise<GetV1WebhooksResponse>;

export type GetV1WebhooksIdResponse = {
  alertRuleIds?: Array<string> | undefined;
  events: Array<
    | "ai-gateway.auto-reload.limit-reached"
    | "ai-gateway.balance-depleted"
    | "alerts.triggered"
    | "botid.anomaly"
    | "budget.reached"
    | "comment.created"
    | "comment.deleted"
    | "comment.mentioned"
    | "comment.reaction-added"
    | "comment.reaction-removed"
    | "comment.resolved"
    | "comment.unresolved"
    | "comment.updated"
    | "deployment"
    | "deployment-canceled"
    | "deployment-check-rerequested"
    | "deployment-checks-completed"
    | "deployment-error"
    | "deployment-prepared"
    | "deployment-ready"
    | "deployment.blocked"
    | "deployment.build-requested"
    | "deployment.canceled"
    | "deployment.check-rerequested"
    | "deployment.checkrun.cancel"
    | "deployment.checkrun.start"
    | "deployment.checks.failed"
    | "deployment.checks.succeeded"
    | "deployment.cleanup"
    | "deployment.created"
    | "deployment.error"
    | "deployment.integration.action.cancel"
    | "deployment.integration.action.cleanup"
    | "deployment.integration.action.start"
    | "deployment.promoted"
    | "deployment.ready"
    | "deployment.rollback"
    | "deployment.succeeded"
    | "domain-created"
    | "domain.auto-renew.changed"
    | "domain.certificate.add"
    | "domain.certificate.add.failed"
    | "domain.certificate.deleted"
    | "domain.certificate.renew"
    | "domain.certificate.renew.failed"
    | "domain.created"
    | "domain.dns.records.changed"
    | "domain.renewal"
    | "domain.renewal.failed"
    | "domain.transfer-in.completed"
    | "domain.transfer-in.failed"
    | "domain.transfer-in.started"
    | "edge-config.created"
    | "edge-config.deleted"
    | "edge-config.items.updated"
    | "firewall.attack"
    | "firewall.custom-rule-anomaly"
    | "firewall.system-rule-anomaly"
    | "flag.created"
    | "flag.deleted"
    | "flag.segment.created"
    | "flag.segment.deleted"
    | "flag.segment.updated"
    | "flag.updated"
    | "function.archival-required"
    | "function.removal-required"
    | "integration-configuration-permission-updated"
    | "integration-configuration-removed"
    | "integration-configuration-scope-change-confirmed"
    | "integration-configuration.permission-upgraded"
    | "integration-configuration.removed"
    | "integration-configuration.scope-change-confirmed"
    | "integration-configuration.transferred"
    | "integration-resource.project-connected"
    | "integration-resource.project-disconnected"
    | "marketplace.invoice.created"
    | "marketplace.invoice.notpaid"
    | "marketplace.invoice.overdue"
    | "marketplace.invoice.paid"
    | "marketplace.invoice.refunded"
    | "marketplace.member.changed"
    | "message.created"
    | "message.deleted"
    | "message.mentioned"
    | "message.reaction-added"
    | "message.reaction-removed"
    | "message.updated"
    | "observability.anomaly"
    | "observability.anomaly-error"
    | "observability.error-anomaly"
    | "observability.usage-anomaly"
    | "project-created"
    | "project-removed"
    | "project.created"
    | "project.domain.created"
    | "project.domain.deleted"
    | "project.domain.moved"
    | "project.domain.unverified"
    | "project.domain.updated"
    | "project.domain.verified"
    | "project.env-variable.created"
    | "project.env-variable.deleted"
    | "project.env-variable.updated"
    | "project.removed"
    | "project.renamed"
    | "project.rolling-release.aborted"
    | "project.rolling-release.approved"
    | "project.rolling-release.completed"
    | "project.rolling-release.started"
    | "test-webhook"
    | "thread.resolved"
    | "thread.unresolved"
  >;
  id: string;
  url: string;
  ownerId: string;
  createdAt: number;
  updatedAt: number;
  projectIds?: Array<string> | undefined;
};

export type GetV1WebhooksIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { id: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV1WebhooksIdHandler = (
  input: GetV1WebhooksIdInput,
) => Promise<GetV1WebhooksIdResponse>;

export type DeleteV1WebhooksIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { id: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type DeleteV1WebhooksIdHandler = (input: DeleteV1WebhooksIdInput) => Promise<void>;
