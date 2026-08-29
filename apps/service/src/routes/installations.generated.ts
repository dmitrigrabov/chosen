import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import {
  patchV1InstallationsIntegrationConfigurationId,
  getV1InstallationsIntegrationConfigurationIdAccount,
  getV1InstallationsIntegrationConfigurationIdMemberMemberId,
  postV1InstallationsIntegrationConfigurationIdCredentialsRotate,
  postV1InstallationsIntegrationConfigurationIdCredentialsRevoke,
  postV1InstallationsIntegrationConfigurationIdEvents,
  getV1InstallationsIntegrationConfigurationIdResources,
  getV1InstallationsIntegrationConfigurationIdResourcesResourceId,
  deleteV1InstallationsIntegrationConfigurationIdResourcesResourceId,
  putV1InstallationsIntegrationConfigurationIdResourcesResourceId,
  patchV1InstallationsIntegrationConfigurationIdResourcesResourceId,
  postV1InstallationsIntegrationConfigurationIdBilling,
  postV1InstallationsIntegrationConfigurationIdBillingInvoices,
  postV1InstallationsIntegrationConfigurationIdBillingFinalize,
  getV1InstallationsIntegrationConfigurationIdBillingInvoicesInvoiceId,
  postV1InstallationsIntegrationConfigurationIdBillingInvoicesInvoiceIdActions,
  postV1InstallationsIntegrationConfigurationIdBillingBalance,
  putV1InstallationsIntegrationConfigurationIdProductsIntegrationProductIdOrSlugResourcesResourceIdSecrets,
  putV1InstallationsIntegrationConfigurationIdResourcesResourceIdSecrets,
  postV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationItems,
  patchV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationItemsItemId,
  deleteV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationItemsItemId,
  headV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationGlobalConfig,
  getV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationGlobalConfig,
  putV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationGlobalConfig,
} from "./handlers/installations";
import type { GlobalConfigItemValue } from "packages/models/src/globalConfigItemValue.generated.ts";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.patch(
  "/v1/installations/:integrationConfigurationId",
  validate("param", z.object({ integrationConfigurationId: z.string() })),
  validate("json", patchV1InstallationsIntegrationConfigurationIdBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const body = c.req.valid("json");
    await patchV1InstallationsIntegrationConfigurationId({
      db,
      env: c.env,
      user: c.var.user,
      params,
      body,
    });
    return c.body(null, 204);
  },
);
app.get(
  "/v1/installations/:integrationConfigurationId/account",
  validate("param", z.object({ integrationConfigurationId: z.string() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    return c.json(
      await getV1InstallationsIntegrationConfigurationIdAccount({
        db,
        env: c.env,
        user: c.var.user,
        params,
      }),
    );
  },
);
app.get(
  "/v1/installations/:integrationConfigurationId/member/:memberId",
  validate("param", z.object({ integrationConfigurationId: z.string(), memberId: z.string() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    return c.json(
      await getV1InstallationsIntegrationConfigurationIdMemberMemberId({
        db,
        env: c.env,
        user: c.var.user,
        params,
      }),
    );
  },
);
app.post(
  "/v1/installations/:integrationConfigurationId/credentials/rotate",
  validate("param", z.object({ integrationConfigurationId: z.string() })),
  validate("json", postV1InstallationsIntegrationConfigurationIdCredentialsRotateBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const body = c.req.valid("json");
    return c.json(
      await postV1InstallationsIntegrationConfigurationIdCredentialsRotate({
        db,
        env: c.env,
        user: c.var.user,
        params,
        body,
      }),
    );
  },
);
app.post(
  "/v1/installations/:integrationConfigurationId/credentials/revoke",
  validate("param", z.object({ integrationConfigurationId: z.string() })),
  validate("json", postV1InstallationsIntegrationConfigurationIdCredentialsRevokeBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const body = c.req.valid("json");
    return c.json(
      await postV1InstallationsIntegrationConfigurationIdCredentialsRevoke({
        db,
        env: c.env,
        user: c.var.user,
        params,
        body,
      }),
    );
  },
);
app.post(
  "/v1/installations/:integrationConfigurationId/events",
  validate("param", z.object({ integrationConfigurationId: z.string() })),
  validate("json", postV1InstallationsIntegrationConfigurationIdEventsBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const body = c.req.valid("json");
    return c.json(
      await postV1InstallationsIntegrationConfigurationIdEvents({
        db,
        env: c.env,
        user: c.var.user,
        params,
        body,
      }),
      201,
    );
  },
);
app.get(
  "/v1/installations/:integrationConfigurationId/resources",
  validate("param", z.object({ integrationConfigurationId: z.string() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    return c.json(
      await getV1InstallationsIntegrationConfigurationIdResources({
        db,
        env: c.env,
        user: c.var.user,
        params,
      }),
    );
  },
);
app.get(
  "/v1/installations/:integrationConfigurationId/resources/:resourceId",
  validate("param", z.object({ integrationConfigurationId: z.string(), resourceId: z.string() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    return c.json(
      await getV1InstallationsIntegrationConfigurationIdResourcesResourceId({
        db,
        env: c.env,
        user: c.var.user,
        params,
      }),
    );
  },
);
app.delete(
  "/v1/installations/:integrationConfigurationId/resources/:resourceId",
  validate("param", z.object({ integrationConfigurationId: z.string(), resourceId: z.string() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    await deleteV1InstallationsIntegrationConfigurationIdResourcesResourceId({
      db,
      env: c.env,
      user: c.var.user,
      params,
    });
    return c.body(null, 204);
  },
);
app.put(
  "/v1/installations/:integrationConfigurationId/resources/:resourceId",
  validate("param", z.object({ integrationConfigurationId: z.string(), resourceId: z.string() })),
  validate("json", putV1InstallationsIntegrationConfigurationIdResourcesResourceIdBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const body = c.req.valid("json");
    return c.json(
      await putV1InstallationsIntegrationConfigurationIdResourcesResourceId({
        db,
        env: c.env,
        user: c.var.user,
        params,
        body,
      }),
    );
  },
);
app.patch(
  "/v1/installations/:integrationConfigurationId/resources/:resourceId",
  validate("param", z.object({ integrationConfigurationId: z.string(), resourceId: z.string() })),
  validate("json", patchV1InstallationsIntegrationConfigurationIdResourcesResourceIdBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const body = c.req.valid("json");
    return c.json(
      await patchV1InstallationsIntegrationConfigurationIdResourcesResourceId({
        db,
        env: c.env,
        user: c.var.user,
        params,
        body,
      }),
    );
  },
);
app.post(
  "/v1/installations/:integrationConfigurationId/billing",
  validate("param", z.object({ integrationConfigurationId: z.string() })),
  validate("json", postV1InstallationsIntegrationConfigurationIdBillingBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const body = c.req.valid("json");
    return c.json(
      await postV1InstallationsIntegrationConfigurationIdBilling({
        db,
        env: c.env,
        user: c.var.user,
        params,
        body,
      }),
      201,
    );
  },
);
app.post(
  "/v1/installations/:integrationConfigurationId/billing/invoices",
  validate("param", z.object({ integrationConfigurationId: z.string() })),
  validate("json", postV1InstallationsIntegrationConfigurationIdBillingInvoicesBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const body = c.req.valid("json");
    return c.json(
      await postV1InstallationsIntegrationConfigurationIdBillingInvoices({
        db,
        env: c.env,
        user: c.var.user,
        params,
        body,
      }),
    );
  },
);
app.post(
  "/v1/installations/:integrationConfigurationId/billing/finalize",
  validate("param", z.object({ integrationConfigurationId: z.string() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    await postV1InstallationsIntegrationConfigurationIdBillingFinalize({
      db,
      env: c.env,
      user: c.var.user,
      params,
    });
    return c.body(null, 204);
  },
);
app.get(
  "/v1/installations/:integrationConfigurationId/billing/invoices/:invoiceId",
  validate("param", z.object({ integrationConfigurationId: z.string(), invoiceId: z.string() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    return c.json(
      await getV1InstallationsIntegrationConfigurationIdBillingInvoicesInvoiceId({
        db,
        env: c.env,
        user: c.var.user,
        params,
      }),
    );
  },
);
app.post(
  "/v1/installations/:integrationConfigurationId/billing/invoices/:invoiceId/actions",
  validate("param", z.object({ integrationConfigurationId: z.string(), invoiceId: z.string() })),
  validate(
    "json",
    postV1InstallationsIntegrationConfigurationIdBillingInvoicesInvoiceIdActionsBody,
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const body = c.req.valid("json");
    await postV1InstallationsIntegrationConfigurationIdBillingInvoicesInvoiceIdActions({
      db,
      env: c.env,
      user: c.var.user,
      params,
      body,
    });
    return c.body(null, 204);
  },
);
app.post(
  "/v1/installations/:integrationConfigurationId/billing/balance",
  validate("param", z.object({ integrationConfigurationId: z.string() })),
  validate("json", postV1InstallationsIntegrationConfigurationIdBillingBalanceBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const body = c.req.valid("json");
    return c.json(
      await postV1InstallationsIntegrationConfigurationIdBillingBalance({
        db,
        env: c.env,
        user: c.var.user,
        params,
        body,
      }),
      201,
    );
  },
);
app.put(
  "/v1/installations/:integrationConfigurationId/products/:integrationProductIdOrSlug/resources/:resourceId/secrets",
  validate(
    "param",
    z.object({
      integrationConfigurationId: z.string(),
      integrationProductIdOrSlug: z.string(),
      resourceId: z.string(),
    }),
  ),
  validate(
    "json",
    putV1InstallationsIntegrationConfigurationIdProductsIntegrationProductIdOrSlugResourcesResourceIdSecretsBody,
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const body = c.req.valid("json");
    return c.json(
      await putV1InstallationsIntegrationConfigurationIdProductsIntegrationProductIdOrSlugResourcesResourceIdSecrets(
        { db, env: c.env, user: c.var.user, params, body },
      ),
      201,
    );
  },
);
app.put(
  "/v1/installations/:integrationConfigurationId/resources/:resourceId/secrets",
  validate("param", z.object({ integrationConfigurationId: z.string(), resourceId: z.string() })),
  validate("json", putV1InstallationsIntegrationConfigurationIdResourcesResourceIdSecretsBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const body = c.req.valid("json");
    return c.json(
      await putV1InstallationsIntegrationConfigurationIdResourcesResourceIdSecrets({
        db,
        env: c.env,
        user: c.var.user,
        params,
        body,
      }),
      201,
    );
  },
);
app.post(
  "/v1/installations/:integrationConfigurationId/resources/:resourceId/experimentation/items",
  validate("param", z.object({ integrationConfigurationId: z.string(), resourceId: z.string() })),
  validate(
    "json",
    postV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationItemsBody,
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const body = c.req.valid("json");
    await postV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationItems({
      db,
      env: c.env,
      user: c.var.user,
      params,
      body,
    });
    return c.body(null, 204);
  },
);
app.patch(
  "/v1/installations/:integrationConfigurationId/resources/:resourceId/experimentation/items/:itemId",
  validate(
    "param",
    z.object({
      integrationConfigurationId: z.string(),
      resourceId: z.string(),
      itemId: z.string(),
    }),
  ),
  validate(
    "json",
    patchV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationItemsItemIdBody,
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const body = c.req.valid("json");
    await patchV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationItemsItemId(
      { db, env: c.env, user: c.var.user, params, body },
    );
    return c.body(null, 204);
  },
);
app.delete(
  "/v1/installations/:integrationConfigurationId/resources/:resourceId/experimentation/items/:itemId",
  validate(
    "param",
    z.object({
      integrationConfigurationId: z.string(),
      resourceId: z.string(),
      itemId: z.string(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    await deleteV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationItemsItemId(
      { db, env: c.env, user: c.var.user, params },
    );
    return c.body(null, 204);
  },
);
app.head(
  "/v1/installations/:integrationConfigurationId/resources/:resourceId/experimentation/global-config",
  validate("param", z.object({ integrationConfigurationId: z.string(), resourceId: z.string() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    return c.json(
      await headV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationGlobalConfig(
        { db, env: c.env, user: c.var.user, params },
      ),
    );
  },
);
app.get(
  "/v1/installations/:integrationConfigurationId/resources/:resourceId/experimentation/global-config",
  validate("param", z.object({ integrationConfigurationId: z.string(), resourceId: z.string() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    return c.json(
      await getV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationGlobalConfig(
        { db, env: c.env, user: c.var.user, params },
      ),
    );
  },
);
app.put(
  "/v1/installations/:integrationConfigurationId/resources/:resourceId/experimentation/global-config",
  validate("param", z.object({ integrationConfigurationId: z.string(), resourceId: z.string() })),
  validate(
    "json",
    putV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationGlobalConfigBody,
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const body = c.req.valid("json");
    return c.json(
      await putV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationGlobalConfig(
        { db, env: c.env, user: c.var.user, params, body },
      ),
    );
  },
);

export const patchV1InstallationsIntegrationConfigurationIdBody = z.object({
  status: z
    .enum(["ready", "pending", "onboarding", "suspended", "resumed", "uninstalled", "error"])
    .optional(),
  externalId: z.string().optional(),
  billingPlan: z
    .object({
      id: z.string(),
      type: z.enum(["prepayment", "subscription"]),
      name: z.string(),
      description: z.string().optional(),
      paymentMethodRequired: z.boolean().optional(),
      cost: z.string().optional(),
      details: z.array(z.object({ label: z.string(), value: z.string().optional() })).optional(),
      highlightedDetails: z
        .array(z.object({ label: z.string(), value: z.string().optional() }))
        .optional(),
      effectiveDate: z.string().optional(),
    })
    .and(z.record(z.string(), z.unknown()))
    .optional(),
  notification: z
    .union([
      z.object({
        level: z.enum(["info", "warn", "error"]),
        title: z.string(),
        message: z.string().optional(),
        href: z
          .string()
          .regex(/^https?:\/\/|^sso:/)
          .optional(),
      }),
      z.string(),
    ])
    .optional(),
});

export type PatchV1InstallationsIntegrationConfigurationIdBody = {
  status?:
    | ("ready" | "pending" | "onboarding" | "suspended" | "resumed" | "uninstalled" | "error")
    | undefined;
  externalId?: string | undefined;
  billingPlan?:
    | (
        | {
            id: string;
            type: "prepayment" | "subscription";
            name: string;
            description?: string | undefined;
            paymentMethodRequired?: boolean | undefined;
            cost?: string | undefined;
            details?: Array<{ label: string; value?: string | undefined }> | undefined;
            highlightedDetails?: Array<{ label: string; value?: string | undefined }> | undefined;
            effectiveDate?: string | undefined;
          }
        | Record<string, unknown>
      )
    | undefined;
  notification?:
    | (
        | {
            level: "info" | "warn" | "error";
            title: string;
            message?: string | undefined;
            href?: string | undefined;
          }
        | string
      )
    | undefined;
};

export type PatchV1InstallationsIntegrationConfigurationIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { integrationConfigurationId: string };
  body: PatchV1InstallationsIntegrationConfigurationIdBody;
};

export type PatchV1InstallationsIntegrationConfigurationIdHandler = (
  input: PatchV1InstallationsIntegrationConfigurationIdInput,
) => Promise<void>;

export type GetV1InstallationsIntegrationConfigurationIdAccountResponse = {
  name?: string | undefined;
  url: string;
  contact: { email: string; name?: string | undefined } | null;
};

export type GetV1InstallationsIntegrationConfigurationIdAccountInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { integrationConfigurationId: string };
};

export type GetV1InstallationsIntegrationConfigurationIdAccountHandler = (
  input: GetV1InstallationsIntegrationConfigurationIdAccountInput,
) => Promise<GetV1InstallationsIntegrationConfigurationIdAccountResponse>;

export type GetV1InstallationsIntegrationConfigurationIdMemberMemberIdResponse = {
  id: string;
  role: "ADMIN" | "USER";
  globalUserId?: string | undefined;
  userEmail?: string | undefined;
};

export type GetV1InstallationsIntegrationConfigurationIdMemberMemberIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { integrationConfigurationId: string; memberId: string };
};

export type GetV1InstallationsIntegrationConfigurationIdMemberMemberIdHandler = (
  input: GetV1InstallationsIntegrationConfigurationIdMemberMemberIdInput,
) => Promise<GetV1InstallationsIntegrationConfigurationIdMemberMemberIdResponse>;

export const postV1InstallationsIntegrationConfigurationIdCredentialsRotateBody = z.object({
  client_secret: z.string().max(512),
  client_id: z.string().optional(),
});

export type PostV1InstallationsIntegrationConfigurationIdCredentialsRotateBody = {
  client_secret: string;
  client_id?: string | undefined;
};

export type PostV1InstallationsIntegrationConfigurationIdCredentialsRotateResponse = {
  scope: string;
  expires_in: number;
  access_token: string;
  token_type: "oauth2-token";
};

export type PostV1InstallationsIntegrationConfigurationIdCredentialsRotateInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { integrationConfigurationId: string };
  body: PostV1InstallationsIntegrationConfigurationIdCredentialsRotateBody;
};

export type PostV1InstallationsIntegrationConfigurationIdCredentialsRotateHandler = (
  input: PostV1InstallationsIntegrationConfigurationIdCredentialsRotateInput,
) => Promise<PostV1InstallationsIntegrationConfigurationIdCredentialsRotateResponse>;

export const postV1InstallationsIntegrationConfigurationIdCredentialsRevokeBody = z.object({
  token: z.string().max(512),
  client_secret: z.string().max(512),
  client_id: z.string().optional(),
});

export type PostV1InstallationsIntegrationConfigurationIdCredentialsRevokeBody = {
  token: string;
  client_secret: string;
  client_id?: string | undefined;
};

export type PostV1InstallationsIntegrationConfigurationIdCredentialsRevokeResponse = {
  revoked: boolean;
  already_revoked: boolean;
};

export type PostV1InstallationsIntegrationConfigurationIdCredentialsRevokeInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { integrationConfigurationId: string };
  body: PostV1InstallationsIntegrationConfigurationIdCredentialsRevokeBody;
};

export type PostV1InstallationsIntegrationConfigurationIdCredentialsRevokeHandler = (
  input: PostV1InstallationsIntegrationConfigurationIdCredentialsRevokeInput,
) => Promise<PostV1InstallationsIntegrationConfigurationIdCredentialsRevokeResponse>;

export const postV1InstallationsIntegrationConfigurationIdEventsBody = z.object({
  event: z.union([
    z.object({ type: z.literal("installation.updated"), billingPlanId: z.string().optional() }),
    z.object({
      type: z.literal("resource.updated"),
      productId: z.string().optional(),
      resourceId: z.string(),
    }),
  ]),
});

export type PostV1InstallationsIntegrationConfigurationIdEventsBody = {
  event:
    | { type: "installation.updated"; billingPlanId?: string | undefined }
    | { type: "resource.updated"; productId?: string | undefined; resourceId: string };
};

export type PostV1InstallationsIntegrationConfigurationIdEventsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { integrationConfigurationId: string };
  body: PostV1InstallationsIntegrationConfigurationIdEventsBody;
};

export type PostV1InstallationsIntegrationConfigurationIdEventsHandler = (
  input: PostV1InstallationsIntegrationConfigurationIdEventsInput,
) => Promise<void>;

export type GetV1InstallationsIntegrationConfigurationIdResourcesResponse = {
  resources: Array<{
    partnerId: string;
    internalId: string;
    name: string;
    status?:
      | ("error" | "onboarding" | "pending" | "ready" | "resumed" | "suspended" | "uninstalled")
      | undefined;
    productId: string;
    protocolSettings?:
      | {
          experimentation?:
            | {
                edgeConfigSyncingEnabled?: boolean | undefined;
                edgeConfigId?: string | undefined;
                globalConfigId?: string | undefined;
                globalConfigSyncingEnabled?: boolean | undefined;
                edgeConfigTokenId?: string | undefined;
              }
            | undefined;
          authentication?:
            | {
                appUrls?:
                  | Array<{ url: string; target: "development" | "preview" | "production" }>
                  | undefined;
              }
            | undefined;
        }
      | undefined;
    notification?:
      | {
          level: "error" | "info" | "warn";
          title: string;
          message?: string | undefined;
          href?: string | undefined;
        }
      | undefined;
    billingPlanId?: string | undefined;
    metadata?:
      | Record<string, string | number | Array<string> | Array<number> | boolean>
      | undefined;
  }>;
};

export type GetV1InstallationsIntegrationConfigurationIdResourcesInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { integrationConfigurationId: string };
};

export type GetV1InstallationsIntegrationConfigurationIdResourcesHandler = (
  input: GetV1InstallationsIntegrationConfigurationIdResourcesInput,
) => Promise<GetV1InstallationsIntegrationConfigurationIdResourcesResponse>;

export type GetV1InstallationsIntegrationConfigurationIdResourcesResourceIdResponse = {
  id: string;
  internalId: string;
  name: string;
  status?:
    | ("error" | "onboarding" | "pending" | "ready" | "resumed" | "suspended" | "uninstalled")
    | undefined;
  productId: string;
  protocolSettings?:
    | {
        experimentation?:
          | { edgeConfigId?: string | undefined; globalConfigId?: string | undefined }
          | undefined;
        authentication?:
          | {
              appUrls?:
                | Array<{ url: string; target: "development" | "preview" | "production" }>
                | undefined;
            }
          | undefined;
      }
    | undefined;
  notification?:
    | {
        level: "error" | "info" | "warn";
        title: string;
        message?: string | undefined;
        href?: string | undefined;
      }
    | undefined;
  billingPlanId?: string | undefined;
  metadata?: Record<string, string | number | Array<string> | Array<number> | boolean> | undefined;
};

export type GetV1InstallationsIntegrationConfigurationIdResourcesResourceIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { integrationConfigurationId: string; resourceId: string };
};

export type GetV1InstallationsIntegrationConfigurationIdResourcesResourceIdHandler = (
  input: GetV1InstallationsIntegrationConfigurationIdResourcesResourceIdInput,
) => Promise<GetV1InstallationsIntegrationConfigurationIdResourcesResourceIdResponse>;

export type DeleteV1InstallationsIntegrationConfigurationIdResourcesResourceIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { integrationConfigurationId: string; resourceId: string };
};

export type DeleteV1InstallationsIntegrationConfigurationIdResourcesResourceIdHandler = (
  input: DeleteV1InstallationsIntegrationConfigurationIdResourcesResourceIdInput,
) => Promise<void>;

export const putV1InstallationsIntegrationConfigurationIdResourcesResourceIdBody = z.object({
  ownership: z.enum(["owned", "linked", "sandbox"]).optional(),
  productId: z.string(),
  name: z.string(),
  status: z.enum([
    "ready",
    "pending",
    "onboarding",
    "suspended",
    "resumed",
    "uninstalled",
    "error",
  ]),
  metadata: z.record(z.string(), z.unknown()).optional(),
  billingPlan: z
    .object({
      id: z.string(),
      type: z.enum(["prepayment", "subscription"]),
      name: z.string(),
      description: z.string().optional(),
      paymentMethodRequired: z.boolean().optional(),
      cost: z.string().optional(),
      details: z.array(z.object({ label: z.string(), value: z.string().optional() })).optional(),
      highlightedDetails: z
        .array(z.object({ label: z.string(), value: z.string().optional() }))
        .optional(),
      effectiveDate: z.string().optional(),
    })
    .and(z.record(z.string(), z.unknown()))
    .optional(),
  notification: z
    .object({
      level: z.enum(["info", "warn", "error"]),
      title: z.string(),
      message: z.string().optional(),
      href: z
        .string()
        .regex(/^https?:\/\/|^sso:/)
        .optional(),
    })
    .optional(),
  extras: z.record(z.string(), z.unknown()).optional(),
  secrets: z
    .array(
      z.object({
        name: z.string(),
        value: z.string(),
        prefix: z.string().optional(),
        environmentOverrides: z
          .object({
            development: z.string().optional(),
            preview: z.string().optional(),
            production: z.string().optional(),
          })
          .optional(),
      }),
    )
    .optional(),
});

export type PutV1InstallationsIntegrationConfigurationIdResourcesResourceIdBody = {
  ownership?: ("owned" | "linked" | "sandbox") | undefined;
  productId: string;
  name: string;
  status: "ready" | "pending" | "onboarding" | "suspended" | "resumed" | "uninstalled" | "error";
  metadata?: Record<string, unknown> | undefined;
  billingPlan?:
    | (
        | {
            id: string;
            type: "prepayment" | "subscription";
            name: string;
            description?: string | undefined;
            paymentMethodRequired?: boolean | undefined;
            cost?: string | undefined;
            details?: Array<{ label: string; value?: string | undefined }> | undefined;
            highlightedDetails?: Array<{ label: string; value?: string | undefined }> | undefined;
            effectiveDate?: string | undefined;
          }
        | Record<string, unknown>
      )
    | undefined;
  notification?:
    | {
        level: "info" | "warn" | "error";
        title: string;
        message?: string | undefined;
        href?: string | undefined;
      }
    | undefined;
  extras?: Record<string, unknown> | undefined;
  secrets?:
    | Array<{
        name: string;
        value: string;
        prefix?: string | undefined;
        environmentOverrides?:
          | {
              development?: string | undefined;
              preview?: string | undefined;
              production?: string | undefined;
            }
          | undefined;
      }>
    | undefined;
};

export type PutV1InstallationsIntegrationConfigurationIdResourcesResourceIdResponse = {
  name: string;
};

export type PutV1InstallationsIntegrationConfigurationIdResourcesResourceIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { integrationConfigurationId: string; resourceId: string };
  body: PutV1InstallationsIntegrationConfigurationIdResourcesResourceIdBody;
};

export type PutV1InstallationsIntegrationConfigurationIdResourcesResourceIdHandler = (
  input: PutV1InstallationsIntegrationConfigurationIdResourcesResourceIdInput,
) => Promise<PutV1InstallationsIntegrationConfigurationIdResourcesResourceIdResponse>;

export const patchV1InstallationsIntegrationConfigurationIdResourcesResourceIdBody = z.object({
  ownership: z.enum(["owned", "linked", "sandbox"]).optional(),
  name: z.string().optional(),
  status: z
    .enum(["ready", "pending", "onboarding", "suspended", "resumed", "uninstalled", "error"])
    .optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  billingPlan: z
    .object({
      id: z.string(),
      type: z.enum(["prepayment", "subscription"]),
      name: z.string(),
      description: z.string().optional(),
      paymentMethodRequired: z.boolean().optional(),
      cost: z.string().optional(),
      details: z.array(z.object({ label: z.string(), value: z.string().optional() })).optional(),
      highlightedDetails: z
        .array(z.object({ label: z.string(), value: z.string().optional() }))
        .optional(),
      effectiveDate: z.string().optional(),
    })
    .and(z.record(z.string(), z.unknown()))
    .optional(),
  notification: z
    .union([
      z.object({
        level: z.enum(["info", "warn", "error"]),
        title: z.string(),
        message: z.string().optional(),
        href: z
          .string()
          .regex(/^https?:\/\/|^sso:/)
          .optional(),
      }),
      z.string(),
    ])
    .optional(),
  extras: z.record(z.string(), z.unknown()).optional(),
  secrets: z
    .union([
      z.array(
        z.object({
          name: z.string(),
          value: z.string(),
          prefix: z.string().optional(),
          environmentOverrides: z
            .object({
              development: z.string().optional(),
              preview: z.string().optional(),
              production: z.string().optional(),
            })
            .optional(),
        }),
      ),
      z.object({
        secrets: z.array(
          z.object({
            name: z.string(),
            value: z.string(),
            prefix: z.string().optional(),
            environmentOverrides: z
              .object({
                development: z.string().optional(),
                preview: z.string().optional(),
                production: z.string().optional(),
              })
              .optional(),
          }),
        ),
        partial: z.boolean().optional(),
      }),
    ])
    .optional(),
});

export type PatchV1InstallationsIntegrationConfigurationIdResourcesResourceIdBody = {
  ownership?: ("owned" | "linked" | "sandbox") | undefined;
  name?: string | undefined;
  status?:
    | ("ready" | "pending" | "onboarding" | "suspended" | "resumed" | "uninstalled" | "error")
    | undefined;
  metadata?: Record<string, unknown> | undefined;
  billingPlan?:
    | (
        | {
            id: string;
            type: "prepayment" | "subscription";
            name: string;
            description?: string | undefined;
            paymentMethodRequired?: boolean | undefined;
            cost?: string | undefined;
            details?: Array<{ label: string; value?: string | undefined }> | undefined;
            highlightedDetails?: Array<{ label: string; value?: string | undefined }> | undefined;
            effectiveDate?: string | undefined;
          }
        | Record<string, unknown>
      )
    | undefined;
  notification?:
    | (
        | {
            level: "info" | "warn" | "error";
            title: string;
            message?: string | undefined;
            href?: string | undefined;
          }
        | string
      )
    | undefined;
  extras?: Record<string, unknown> | undefined;
  secrets?:
    | (
        | Array<{
            name: string;
            value: string;
            prefix?: string | undefined;
            environmentOverrides?:
              | {
                  development?: string | undefined;
                  preview?: string | undefined;
                  production?: string | undefined;
                }
              | undefined;
          }>
        | {
            secrets: Array<{
              name: string;
              value: string;
              prefix?: string | undefined;
              environmentOverrides?:
                | {
                    development?: string | undefined;
                    preview?: string | undefined;
                    production?: string | undefined;
                  }
                | undefined;
            }>;
            partial?: boolean | undefined;
          }
      )
    | undefined;
};

export type PatchV1InstallationsIntegrationConfigurationIdResourcesResourceIdResponse = {
  name: string;
};

export type PatchV1InstallationsIntegrationConfigurationIdResourcesResourceIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { integrationConfigurationId: string; resourceId: string };
  body: PatchV1InstallationsIntegrationConfigurationIdResourcesResourceIdBody;
};

export type PatchV1InstallationsIntegrationConfigurationIdResourcesResourceIdHandler = (
  input: PatchV1InstallationsIntegrationConfigurationIdResourcesResourceIdInput,
) => Promise<PatchV1InstallationsIntegrationConfigurationIdResourcesResourceIdResponse>;

export const postV1InstallationsIntegrationConfigurationIdBillingBody = z.object({
  timestamp: z.string(),
  eod: z.string(),
  period: z.object({ start: z.string(), end: z.string() }),
  billing: z.union([
    z.array(
      z.object({
        billingPlanId: z.string(),
        resourceId: z.string().optional(),
        start: z.string().optional(),
        end: z.string().optional(),
        name: z.string(),
        details: z.string().optional(),
        price: z.string().regex(/^[0-9]+(\.[0-9]+)?$/),
        quantity: z.number(),
        units: z.string(),
        total: z.string().regex(/^[0-9]+(\.[0-9]+)?$/),
      }),
    ),
    z.object({
      items: z.array(
        z.object({
          billingPlanId: z.string(),
          resourceId: z.string().optional(),
          start: z.string().optional(),
          end: z.string().optional(),
          name: z.string(),
          details: z.string().optional(),
          price: z.string().regex(/^[0-9]+(\.[0-9]+)?$/),
          quantity: z.number(),
          units: z.string(),
          total: z.string().regex(/^[0-9]+(\.[0-9]+)?$/),
        }),
      ),
      discounts: z
        .array(
          z.object({
            billingPlanId: z.string(),
            resourceId: z.string().optional(),
            start: z.string().optional(),
            end: z.string().optional(),
            name: z.string(),
            details: z.string().optional(),
            amount: z.string().regex(/^[0-9]+(\.[0-9]+)?$/),
          }),
        )
        .optional(),
    }),
  ]),
  usage: z.array(
    z.object({
      resourceId: z.string().optional(),
      name: z.string(),
      type: z.enum(["total", "interval", "rate"]),
      units: z.string(),
      dayValue: z.number(),
      periodValue: z.number(),
      planValue: z.number().optional(),
    }),
  ),
});

export type PostV1InstallationsIntegrationConfigurationIdBillingBody = {
  timestamp: string;
  eod: string;
  period: { start: string; end: string };
  billing:
    | Array<{
        billingPlanId: string;
        resourceId?: string | undefined;
        start?: string | undefined;
        end?: string | undefined;
        name: string;
        details?: string | undefined;
        price: string;
        quantity: number;
        units: string;
        total: string;
      }>
    | {
        items: Array<{
          billingPlanId: string;
          resourceId?: string | undefined;
          start?: string | undefined;
          end?: string | undefined;
          name: string;
          details?: string | undefined;
          price: string;
          quantity: number;
          units: string;
          total: string;
        }>;
        discounts?:
          | Array<{
              billingPlanId: string;
              resourceId?: string | undefined;
              start?: string | undefined;
              end?: string | undefined;
              name: string;
              details?: string | undefined;
              amount: string;
            }>
          | undefined;
      };
  usage: Array<{
    resourceId?: string | undefined;
    name: string;
    type: "total" | "interval" | "rate";
    units: string;
    dayValue: number;
    periodValue: number;
    planValue?: number | undefined;
  }>;
};

export type PostV1InstallationsIntegrationConfigurationIdBillingInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { integrationConfigurationId: string };
  body: PostV1InstallationsIntegrationConfigurationIdBillingBody;
};

export type PostV1InstallationsIntegrationConfigurationIdBillingHandler = (
  input: PostV1InstallationsIntegrationConfigurationIdBillingInput,
) => Promise<void>;

export const postV1InstallationsIntegrationConfigurationIdBillingInvoicesBody = z.object({
  externalId: z.string().optional(),
  invoiceDate: z.string(),
  memo: z.string().optional(),
  period: z.object({ start: z.string(), end: z.string() }),
  items: z.array(
    z.object({
      resourceId: z.string().optional(),
      billingPlanId: z.string(),
      start: z.string().optional(),
      end: z.string().optional(),
      name: z.string(),
      details: z.string().optional(),
      price: z.string().regex(/^[0-9]+(\.[0-9]+)?$/),
      quantity: z.number(),
      units: z.string(),
      total: z.string().regex(/^[0-9]+(\.[0-9]+)?$/),
    }),
  ),
  discounts: z
    .array(
      z.object({
        resourceId: z.string().optional(),
        billingPlanId: z.string(),
        start: z.string().optional(),
        end: z.string().optional(),
        name: z.string(),
        details: z.string().optional(),
        amount: z.string().regex(/^[0-9]+(\.[0-9]+)?$/),
      }),
    )
    .optional(),
  final: z.boolean().optional(),
  test: z
    .object({
      validate: z.boolean().optional(),
      result: z.enum(["paid", "notpaid", "overdue"]).optional(),
    })
    .optional(),
});

export type PostV1InstallationsIntegrationConfigurationIdBillingInvoicesBody = {
  externalId?: string | undefined;
  invoiceDate: string;
  memo?: string | undefined;
  period: { start: string; end: string };
  items: Array<{
    resourceId?: string | undefined;
    billingPlanId: string;
    start?: string | undefined;
    end?: string | undefined;
    name: string;
    details?: string | undefined;
    price: string;
    quantity: number;
    units: string;
    total: string;
  }>;
  discounts?:
    | Array<{
        resourceId?: string | undefined;
        billingPlanId: string;
        start?: string | undefined;
        end?: string | undefined;
        name: string;
        details?: string | undefined;
        amount: string;
      }>
    | undefined;
  final?: boolean | undefined;
  test?:
    | { validate?: boolean | undefined; result?: ("paid" | "notpaid" | "overdue") | undefined }
    | undefined;
};

export type PostV1InstallationsIntegrationConfigurationIdBillingInvoicesResponse = {
  invoiceId?: string | undefined;
  test?: boolean | undefined;
  validationErrors?: Array<string> | undefined;
};

export type PostV1InstallationsIntegrationConfigurationIdBillingInvoicesInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { integrationConfigurationId: string };
  body: PostV1InstallationsIntegrationConfigurationIdBillingInvoicesBody;
};

export type PostV1InstallationsIntegrationConfigurationIdBillingInvoicesHandler = (
  input: PostV1InstallationsIntegrationConfigurationIdBillingInvoicesInput,
) => Promise<PostV1InstallationsIntegrationConfigurationIdBillingInvoicesResponse>;

export type PostV1InstallationsIntegrationConfigurationIdBillingFinalizeInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { integrationConfigurationId: string };
};

export type PostV1InstallationsIntegrationConfigurationIdBillingFinalizeHandler = (
  input: PostV1InstallationsIntegrationConfigurationIdBillingFinalizeInput,
) => Promise<void>;

export type GetV1InstallationsIntegrationConfigurationIdBillingInvoicesInvoiceIdResponse = {
  test?: boolean | undefined;
  invoiceId: string;
  externalId?: string | undefined;
  state:
    | "draft"
    | "invoiced"
    | "notpaid"
    | "overdue"
    | "paid"
    | "pending"
    | "refund_requested"
    | "refunded"
    | "scheduled";
  invoiceNumber?: string | undefined;
  invoiceDate: string;
  period: { start: string; end: string };
  paidAt?: string | undefined;
  refundedAt?: string | undefined;
  memo?: string | undefined;
  items: Array<{
    billingPlanId: string;
    resourceId?: string | undefined;
    start?: string | undefined;
    end?: string | undefined;
    name: string;
    details?: string | undefined;
    price: string;
    quantity: number;
    units: string;
    total: string;
  }>;
  discounts?:
    | Array<{
        billingPlanId: string;
        resourceId?: string | undefined;
        start?: string | undefined;
        end?: string | undefined;
        name: string;
        details?: string | undefined;
        amount: string;
      }>
    | undefined;
  total: string;
  refundReason?: string | undefined;
  refundTotal?: string | undefined;
  created: string;
  updated: string;
};

export type GetV1InstallationsIntegrationConfigurationIdBillingInvoicesInvoiceIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { integrationConfigurationId: string; invoiceId: string };
};

export type GetV1InstallationsIntegrationConfigurationIdBillingInvoicesInvoiceIdHandler = (
  input: GetV1InstallationsIntegrationConfigurationIdBillingInvoicesInvoiceIdInput,
) => Promise<GetV1InstallationsIntegrationConfigurationIdBillingInvoicesInvoiceIdResponse>;

export const postV1InstallationsIntegrationConfigurationIdBillingInvoicesInvoiceIdActionsBody =
  z.object({
    action: z.literal("refund"),
    reason: z.string(),
    total: z.string().regex(/^[0-9]+(\.[0-9]+)?$/),
  });

export type PostV1InstallationsIntegrationConfigurationIdBillingInvoicesInvoiceIdActionsBody = {
  action: "refund";
  reason: string;
  total: string;
};

export type PostV1InstallationsIntegrationConfigurationIdBillingInvoicesInvoiceIdActionsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { integrationConfigurationId: string; invoiceId: string };
  body: PostV1InstallationsIntegrationConfigurationIdBillingInvoicesInvoiceIdActionsBody;
};

export type PostV1InstallationsIntegrationConfigurationIdBillingInvoicesInvoiceIdActionsHandler = (
  input: PostV1InstallationsIntegrationConfigurationIdBillingInvoicesInvoiceIdActionsInput,
) => Promise<void>;

export const postV1InstallationsIntegrationConfigurationIdBillingBalanceBody = z.object({
  timestamp: z.string(),
  balances: z.array(
    z.object({
      resourceId: z.string().optional(),
      credit: z.string().optional(),
      nameLabel: z.string().optional(),
      currencyValueInCents: z.number(),
    }),
  ),
});

export type PostV1InstallationsIntegrationConfigurationIdBillingBalanceBody = {
  timestamp: string;
  balances: Array<{
    resourceId?: string | undefined;
    credit?: string | undefined;
    nameLabel?: string | undefined;
    currencyValueInCents: number;
  }>;
};

export type PostV1InstallationsIntegrationConfigurationIdBillingBalanceInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { integrationConfigurationId: string };
  body: PostV1InstallationsIntegrationConfigurationIdBillingBalanceBody;
};

export type PostV1InstallationsIntegrationConfigurationIdBillingBalanceHandler = (
  input: PostV1InstallationsIntegrationConfigurationIdBillingBalanceInput,
) => Promise<void>;

export const putV1InstallationsIntegrationConfigurationIdProductsIntegrationProductIdOrSlugResourcesResourceIdSecretsBody =
  z.object({
    secrets: z.array(
      z.object({
        name: z.string(),
        value: z.string(),
        prefix: z.string().optional(),
        environmentOverrides: z
          .object({
            development: z.string().optional(),
            preview: z.string().optional(),
            production: z.string().optional(),
          })
          .optional(),
      }),
    ),
    partial: z.boolean().optional(),
  });

export type PutV1InstallationsIntegrationConfigurationIdProductsIntegrationProductIdOrSlugResourcesResourceIdSecretsBody =
  {
    secrets: Array<{
      name: string;
      value: string;
      prefix?: string | undefined;
      environmentOverrides?:
        | {
            development?: string | undefined;
            preview?: string | undefined;
            production?: string | undefined;
          }
        | undefined;
    }>;
    partial?: boolean | undefined;
  };

export type PutV1InstallationsIntegrationConfigurationIdProductsIntegrationProductIdOrSlugResourcesResourceIdSecretsInput =
  {
    db: Db;
    env: Env;
    user: AuthUser | null;
    params: {
      integrationConfigurationId: string;
      integrationProductIdOrSlug: string;
      resourceId: string;
    };
    body: PutV1InstallationsIntegrationConfigurationIdProductsIntegrationProductIdOrSlugResourcesResourceIdSecretsBody;
  };

export type PutV1InstallationsIntegrationConfigurationIdProductsIntegrationProductIdOrSlugResourcesResourceIdSecretsHandler =
  (
    input: PutV1InstallationsIntegrationConfigurationIdProductsIntegrationProductIdOrSlugResourcesResourceIdSecretsInput,
  ) => Promise<void>;

export const putV1InstallationsIntegrationConfigurationIdResourcesResourceIdSecretsBody = z.object({
  secrets: z.array(
    z.object({
      name: z.string(),
      value: z.string(),
      prefix: z.string().optional(),
      environmentOverrides: z
        .object({
          development: z.string().optional(),
          preview: z.string().optional(),
          production: z.string().optional(),
        })
        .optional(),
    }),
  ),
  partial: z.boolean().optional(),
});

export type PutV1InstallationsIntegrationConfigurationIdResourcesResourceIdSecretsBody = {
  secrets: Array<{
    name: string;
    value: string;
    prefix?: string | undefined;
    environmentOverrides?:
      | {
          development?: string | undefined;
          preview?: string | undefined;
          production?: string | undefined;
        }
      | undefined;
  }>;
  partial?: boolean | undefined;
};

export type PutV1InstallationsIntegrationConfigurationIdResourcesResourceIdSecretsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { integrationConfigurationId: string; resourceId: string };
  body: PutV1InstallationsIntegrationConfigurationIdResourcesResourceIdSecretsBody;
};

export type PutV1InstallationsIntegrationConfigurationIdResourcesResourceIdSecretsHandler = (
  input: PutV1InstallationsIntegrationConfigurationIdResourcesResourceIdSecretsInput,
) => Promise<void>;

export const postV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationItemsBody =
  z.object({
    items: z.array(
      z.object({
        id: z.string().max(1024),
        slug: z.string().max(1024),
        origin: z.string().max(2048),
        category: z.enum(["experiment", "flag"]).optional(),
        name: z.string().max(1024).optional(),
        description: z.string().max(1024).optional(),
        isArchived: z.boolean().optional(),
        createdAt: z.number().optional(),
        updatedAt: z.number().optional(),
      }),
    ),
  });

export type PostV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationItemsBody =
  {
    items: Array<{
      id: string;
      slug: string;
      origin: string;
      category?: ("experiment" | "flag") | undefined;
      name?: string | undefined;
      description?: string | undefined;
      isArchived?: boolean | undefined;
      createdAt?: number | undefined;
      updatedAt?: number | undefined;
    }>;
  };

export type PostV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationItemsInput =
  {
    db: Db;
    env: Env;
    user: AuthUser | null;
    params: { integrationConfigurationId: string; resourceId: string };
    body: PostV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationItemsBody;
  };

export type PostV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationItemsHandler =
  (
    input: PostV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationItemsInput,
  ) => Promise<void>;

export const patchV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationItemsItemIdBody =
  z.object({
    slug: z.string().max(1024),
    origin: z.string().max(2048),
    name: z.string().max(1024).optional(),
    category: z.enum(["experiment", "flag"]).optional(),
    description: z.string().max(1024).optional(),
    isArchived: z.boolean().optional(),
    createdAt: z.number().optional(),
    updatedAt: z.number().optional(),
  });

export type PatchV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationItemsItemIdBody =
  {
    slug: string;
    origin: string;
    name?: string | undefined;
    category?: ("experiment" | "flag") | undefined;
    description?: string | undefined;
    isArchived?: boolean | undefined;
    createdAt?: number | undefined;
    updatedAt?: number | undefined;
  };

export type PatchV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationItemsItemIdInput =
  {
    db: Db;
    env: Env;
    user: AuthUser | null;
    params: { integrationConfigurationId: string; resourceId: string; itemId: string };
    body: PatchV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationItemsItemIdBody;
  };

export type PatchV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationItemsItemIdHandler =
  (
    input: PatchV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationItemsItemIdInput,
  ) => Promise<void>;

export type DeleteV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationItemsItemIdInput =
  {
    db: Db;
    env: Env;
    user: AuthUser | null;
    params: { integrationConfigurationId: string; resourceId: string; itemId: string };
  };

export type DeleteV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationItemsItemIdHandler =
  (
    input: DeleteV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationItemsItemIdInput,
  ) => Promise<void>;

export type HeadV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationGlobalConfigResponse =
  {
    items: Record<string, GlobalConfigItemValue>;
    updatedAt: number;
    digest: string;
    purpose?: ("experimentation" | "flags") | undefined;
  };

export type HeadV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationGlobalConfigInput =
  {
    db: Db;
    env: Env;
    user: AuthUser | null;
    params: { integrationConfigurationId: string; resourceId: string };
  };

export type HeadV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationGlobalConfigHandler =
  (
    input: HeadV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationGlobalConfigInput,
  ) => Promise<HeadV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationGlobalConfigResponse>;

export type GetV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationGlobalConfigResponse =
  {
    items: Record<string, GlobalConfigItemValue>;
    updatedAt: number;
    digest: string;
    purpose?: ("experimentation" | "flags") | undefined;
  };

export type GetV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationGlobalConfigInput =
  {
    db: Db;
    env: Env;
    user: AuthUser | null;
    params: { integrationConfigurationId: string; resourceId: string };
  };

export type GetV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationGlobalConfigHandler =
  (
    input: GetV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationGlobalConfigInput,
  ) => Promise<GetV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationGlobalConfigResponse>;

export const putV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationGlobalConfigBody =
  z.object({ data: z.record(z.string(), z.unknown()) });

export type PutV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationGlobalConfigBody =
  { data: Record<string, unknown> };

export type PutV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationGlobalConfigResponse =
  {
    items: Record<string, GlobalConfigItemValue>;
    updatedAt: number;
    digest: string;
    purpose?: ("experimentation" | "flags") | undefined;
  };

export type PutV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationGlobalConfigInput =
  {
    db: Db;
    env: Env;
    user: AuthUser | null;
    params: { integrationConfigurationId: string; resourceId: string };
    body: PutV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationGlobalConfigBody;
  };

export type PutV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationGlobalConfigHandler =
  (
    input: PutV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationGlobalConfigInput,
  ) => Promise<PutV1InstallationsIntegrationConfigurationIdResourcesResourceIdExperimentationGlobalConfigResponse>;
