import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import {
  getV5DomainsDomainRecords,
  postV2DomainsDomainRecords,
  patchV1DomainsRecordsRecordId,
  deleteV2DomainsDomainRecordsRecordId,
  getV6DomainsDomainConfig,
  getV9DomainsDomainVerification,
  postV9DomainsDomainClaim,
  getV1DomainsDomainProjectDomains,
  getV5DomainsDomain,
  getV5Domains,
  postV7Domains,
  patchV3DomainsDomain,
  deleteV6DomainsDomain,
} from "./handlers/domains";
import type { Pagination } from "packages/models/src/pagination.generated.ts";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.get(
  "/v5/domains/:domain/records",
  validate("param", z.object({ domain: z.string() })),
  validate(
    "query",
    z.object({
      limit: z.string().optional(),
      since: z.string().optional(),
      until: z.string().optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV5DomainsDomainRecords({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);
app.post(
  "/v2/domains/:domain/records",
  validate("param", z.object({ domain: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV2DomainsDomainRecordsBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV2DomainsDomainRecords({ db, env: c.env, user: c.var.user, params, query, body }),
    );
  },
);
app.patch(
  "/v1/domains/records/:recordId",
  validate("param", z.object({ recordId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", patchV1DomainsRecordsRecordIdBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await patchV1DomainsRecordsRecordId({
        db,
        env: c.env,
        user: c.var.user,
        params,
        query,
        body,
      }),
    );
  },
);
app.delete(
  "/v2/domains/:domain/records/:recordId",
  validate("param", z.object({ domain: z.string(), recordId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await deleteV2DomainsDomainRecordsRecordId({
        db,
        env: c.env,
        user: c.var.user,
        params,
        query,
      }),
    );
  },
);
app.get(
  "/v6/domains/:domain/config",
  validate("param", z.object({ domain: z.string() })),
  validate(
    "query",
    z.object({
      projectIdOrName: z.string().optional(),
      strict: z.enum(["true", "false"]).optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV6DomainsDomainConfig({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);
app.get(
  "/v9/domains/:domain/verification",
  validate("param", z.object({ domain: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV9DomainsDomainVerification({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);
app.post(
  "/v9/domains/:domain/claim",
  validate("param", z.object({ domain: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await postV9DomainsDomainClaim({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);
app.get(
  "/v1/domains/:domain/project-domains",
  validate("param", z.object({ domain: z.string() })),
  validate(
    "query",
    z.object({
      limit: z.coerce.number().optional(),
      since: z.coerce.number().optional(),
      until: z.coerce.number().optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV1DomainsDomainProjectDomains({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);
app.get(
  "/v5/domains/:domain",
  validate("param", z.object({ domain: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(await getV5DomainsDomain({ db, env: c.env, user: c.var.user, params, query }));
  },
);
app.get(
  "/v5/domains",
  validate(
    "query",
    z.object({
      limit: z.coerce.number().optional(),
      since: z.coerce.number().optional(),
      until: z.coerce.number().optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(await getV5Domains({ db, env: c.env, user: c.var.user, query }));
  },
);
app.post(
  "/v7/domains",
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV7DomainsBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(await postV7Domains({ db, env: c.env, user: c.var.user, query, body }));
  },
);
app.patch(
  "/v3/domains/:domain",
  validate("param", z.object({ domain: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", patchV3DomainsDomainBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await patchV3DomainsDomain({ db, env: c.env, user: c.var.user, params, query, body }),
    );
  },
);
app.delete(
  "/v6/domains/:domain",
  validate("param", z.object({ domain: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(await deleteV6DomainsDomain({ db, env: c.env, user: c.var.user, params, query }));
  },
);

export type GetV5DomainsDomainRecordsResponse =
  | string
  | {
      records: Array<{
        id: string;
        slug: string;
        name: string;
        type: "A" | "AAAA" | "ALIAS" | "CAA" | "CNAME" | "HTTPS" | "MX" | "NS" | "SRV" | "TXT";
        value: string;
        mxPriority?: number | undefined;
        priority?: number | undefined;
        creator: string;
        created: number | null;
        updated: number | null;
        createdAt: number | null;
        updatedAt: number | null;
        ttl?: number | undefined;
        comment?: string | undefined;
      }>;
    }
  | {
      records: Array<{
        id: string;
        slug: string;
        name: string;
        type: "A" | "AAAA" | "ALIAS" | "CAA" | "CNAME" | "HTTPS" | "MX" | "NS" | "SRV" | "TXT";
        value: string;
        mxPriority?: number | undefined;
        priority?: number | undefined;
        creator: string;
        created: number | null;
        updated: number | null;
        createdAt: number | null;
        updatedAt: number | null;
        ttl?: number | undefined;
        comment?: string | undefined;
      }>;
      pagination: Pagination;
    };

export type GetV5DomainsDomainRecordsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { domain: string };
  query: {
    limit?: string | undefined;
    since?: string | undefined;
    until?: string | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV5DomainsDomainRecordsHandler = (
  input: GetV5DomainsDomainRecordsInput,
) => Promise<GetV5DomainsDomainRecordsResponse>;

export const postV2DomainsDomainRecordsBody = z.union([
  z.object({
    type: z.literal("A"),
    name: z.string(),
    ttl: z.number().gte(60).lte(2147483647).optional(),
    value: z.string(),
    comment: z.string().max(500).optional(),
  }),
  z.object({
    type: z.literal("AAAA"),
    name: z.string(),
    ttl: z.number().gte(60).lte(2147483647).optional(),
    value: z.string(),
    comment: z.string().max(500).optional(),
  }),
  z.object({
    type: z.literal("ALIAS"),
    name: z.string(),
    ttl: z.number().gte(60).lte(2147483647).optional(),
    value: z.string(),
    comment: z.string().max(500).optional(),
  }),
  z.object({
    type: z.literal("CAA"),
    name: z.string(),
    ttl: z.number().gte(60).lte(2147483647).optional(),
    value: z.string(),
    comment: z.string().max(500).optional(),
  }),
  z.object({
    type: z.literal("CNAME"),
    name: z.string(),
    ttl: z.number().gte(60).lte(2147483647).optional(),
    value: z.string().optional(),
    comment: z.string().max(500).optional(),
  }),
  z.object({
    type: z.literal("MX"),
    name: z.string(),
    ttl: z.number().gte(60).lte(2147483647).optional(),
    value: z.string(),
    mxPriority: z.number().gte(0).lte(65535),
    comment: z.string().max(500).optional(),
  }),
  z.object({
    type: z.literal("SRV"),
    ttl: z.number().gte(60).lte(2147483647).optional(),
    srv: z.object({
      priority: z.number().gte(0).lte(65535).nullable(),
      weight: z.number().gte(0).lte(65535).nullable(),
      port: z.number().gte(0).lte(65535).nullable(),
      target: z.string(),
    }),
    comment: z.string().max(500).optional(),
  }),
  z.object({
    type: z.literal("TXT"),
    ttl: z.number().gte(60).lte(2147483647).optional(),
    value: z.string(),
    comment: z.string().max(500).optional(),
  }),
  z.object({
    type: z.literal("NS"),
    name: z.string(),
    ttl: z.number().gte(60).lte(2147483647).optional(),
    value: z.string().optional(),
    comment: z.string().max(500).optional(),
  }),
  z.object({
    type: z.literal("HTTPS"),
    ttl: z.number().gte(60).lte(2147483647).optional(),
    https: z.object({
      priority: z.number().gte(0).lte(65535).nullable(),
      target: z.string(),
      params: z.string().optional(),
    }),
    comment: z.string().max(500).optional(),
  }),
]);

export type PostV2DomainsDomainRecordsBody =
  | {
      type: "A";
      name: string;
      ttl?: number | undefined;
      value: string;
      comment?: string | undefined;
    }
  | {
      type: "AAAA";
      name: string;
      ttl?: number | undefined;
      value: string;
      comment?: string | undefined;
    }
  | {
      type: "ALIAS";
      name: string;
      ttl?: number | undefined;
      value: string;
      comment?: string | undefined;
    }
  | {
      type: "CAA";
      name: string;
      ttl?: number | undefined;
      value: string;
      comment?: string | undefined;
    }
  | {
      type: "CNAME";
      name: string;
      ttl?: number | undefined;
      value?: string | undefined;
      comment?: string | undefined;
    }
  | {
      type: "MX";
      name: string;
      ttl?: number | undefined;
      value: string;
      mxPriority: number;
      comment?: string | undefined;
    }
  | {
      type: "SRV";
      ttl?: number | undefined;
      srv: { priority: number | null; weight: number | null; port: number | null; target: string };
      comment?: string | undefined;
    }
  | { type: "TXT"; ttl?: number | undefined; value: string; comment?: string | undefined }
  | {
      type: "NS";
      name: string;
      ttl?: number | undefined;
      value?: string | undefined;
      comment?: string | undefined;
    }
  | {
      type: "HTTPS";
      ttl?: number | undefined;
      https: { priority: number | null; target: string; params?: string | undefined };
      comment?: string | undefined;
    };

export type PostV2DomainsDomainRecordsResponse =
  | { uid?: string | undefined; updated: number }
  | { uid: string };

export type PostV2DomainsDomainRecordsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { domain: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV2DomainsDomainRecordsBody;
};

export type PostV2DomainsDomainRecordsHandler = (
  input: PostV2DomainsDomainRecordsInput,
) => Promise<PostV2DomainsDomainRecordsResponse>;

export const patchV1DomainsRecordsRecordIdBody = z.object({
  name: z.string().nullable().optional(),
  value: z.string().nullable().optional(),
  type: z
    .enum(["A", "AAAA", "ALIAS", "CAA", "CNAME", "HTTPS", "MX", "SRV", "TXT", "NS", "null"])
    .max(255)
    .nullable()
    .optional(),
  ttl: z.number().int().gte(60).lte(2147483647).nullable().optional(),
  mxPriority: z.number().int().nullable().optional(),
  srv: z
    .object({
      target: z.string().max(255).nullable(),
      weight: z.number().int().nullable(),
      port: z.number().int().nullable(),
      priority: z.number().int().nullable(),
    })
    .nullable()
    .optional(),
  https: z
    .object({
      priority: z.number().int().nullable(),
      target: z.string().max(255).nullable(),
      params: z.string().nullable().optional(),
    })
    .nullable()
    .optional(),
  comment: z.string().max(500).optional(),
});

export type PatchV1DomainsRecordsRecordIdBody = {
  name?: (string | null) | undefined;
  value?: (string | null) | undefined;
  type?:
    | (
        | "A"
        | "AAAA"
        | "ALIAS"
        | "CAA"
        | "CNAME"
        | "HTTPS"
        | "MX"
        | "SRV"
        | "TXT"
        | "NS"
        | "null"
        | null
      )
    | undefined;
  ttl?: (number | null) | undefined;
  mxPriority?: (number | null) | undefined;
  srv?:
    | ({
        target: string | null;
        weight: number | null;
        port: number | null;
        priority: number | null;
      } | null)
    | undefined;
  https?:
    | ({
        priority: number | null;
        target: string | null;
        params?: (string | null) | undefined;
      } | null)
    | undefined;
  comment?: string | undefined;
};

export type PatchV1DomainsRecordsRecordIdResponse = {
  id: string;
  name: string;
  type: "record" | "record-sys";
  value: string;
  creator: string;
  domain: string;
  ttl?: number | undefined;
  comment?: string | undefined;
  recordType: "A" | "AAAA" | "ALIAS" | "CAA" | "CNAME" | "HTTPS" | "MX" | "NS" | "SRV" | "TXT";
  createdAt?: (number | null) | undefined;
};

export type PatchV1DomainsRecordsRecordIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { recordId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PatchV1DomainsRecordsRecordIdBody;
};

export type PatchV1DomainsRecordsRecordIdHandler = (
  input: PatchV1DomainsRecordsRecordIdInput,
) => Promise<PatchV1DomainsRecordsRecordIdResponse>;

export type DeleteV2DomainsDomainRecordsRecordIdResponse = Record<string, never>;

export type DeleteV2DomainsDomainRecordsRecordIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { domain: string; recordId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type DeleteV2DomainsDomainRecordsRecordIdHandler = (
  input: DeleteV2DomainsDomainRecordsRecordIdInput,
) => Promise<DeleteV2DomainsDomainRecordsRecordIdResponse>;

export type GetV6DomainsDomainConfigResponse = {
  configuredBy: "A" | "CNAME" | "dns-01" | "http" | "null" | null;
  acceptedChallenges: Array<"dns-01" | "http-01">;
  recommendedIPv4: Array<{ rank: number; value: Array<string> }>;
  recommendedCNAME: Array<{ rank: number; value: string }>;
  misconfigured: boolean;
};

export type GetV6DomainsDomainConfigInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { domain: string };
  query: {
    projectIdOrName?: string | undefined;
    strict?: ("true" | "false") | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV6DomainsDomainConfigHandler = (
  input: GetV6DomainsDomainConfigInput,
) => Promise<GetV6DomainsDomainConfigResponse>;

export type GetV9DomainsDomainVerificationResponse = {
  txtRecord: string;
  verificationDomain: string;
};

export type GetV9DomainsDomainVerificationInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { domain: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV9DomainsDomainVerificationHandler = (
  input: GetV9DomainsDomainVerificationInput,
) => Promise<GetV9DomainsDomainVerificationResponse>;

export type PostV9DomainsDomainClaimResponse = {
  domain: {
    expiresAt: number | null;
    verified: boolean;
    nameservers: Array<string>;
    intendedNameservers: Array<string>;
    customNameservers?: Array<string> | undefined;
    creator: {
      username: string;
      email: string;
      customerId?: (string | null) | undefined;
      isDomainReseller?: boolean | undefined;
      id: string;
    };
    echMode: "auto" | "disabled" | "enabled";
    name: string;
    teamId: string | null;
    boughtAt: number | null;
    createdAt: number;
    id: string;
    renew?: boolean | undefined;
    serviceType: "external" | "na" | "zeit.world";
    transferredAt?: (number | null) | undefined;
    transferStartedAt?: number | undefined;
    userId: string;
  };
};

export type PostV9DomainsDomainClaimInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { domain: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type PostV9DomainsDomainClaimHandler = (
  input: PostV9DomainsDomainClaimInput,
) => Promise<PostV9DomainsDomainClaimResponse>;

export type GetV1DomainsDomainProjectDomainsResponse = {
  projectDomains: Array<{
    name: string;
    apexName: string;
    projectId: string;
    redirect?: (string | null) | undefined;
    redirectStatusCode?: (number | null) | undefined;
    gitBranch?: (string | null) | undefined;
    customEnvironmentId?: (string | null) | undefined;
    updatedAt?: number | undefined;
    createdAt?: number | undefined;
    verified: boolean;
    verification?:
      | Array<{ type: string; domain: string; value: string; reason: string }>
      | undefined;
  }>;
  pagination: Pagination;
};

export type GetV1DomainsDomainProjectDomainsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { domain: string };
  query: {
    limit?: number | undefined;
    since?: number | undefined;
    until?: number | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV1DomainsDomainProjectDomainsHandler = (
  input: GetV1DomainsDomainProjectDomainsInput,
) => Promise<GetV1DomainsDomainProjectDomainsResponse>;

export type GetV5DomainsDomainResponse = {
  domain: {
    suffix: boolean;
    expiresAt: number | null;
    verified: boolean;
    nameservers: Array<string>;
    intendedNameservers: Array<string>;
    customNameservers?: Array<string> | undefined;
    creator: {
      username: string;
      email: string;
      customerId?: (string | null) | undefined;
      isDomainReseller?: boolean | undefined;
      id: string;
    };
    echMode: "auto" | "disabled" | "enabled";
    name: string;
    teamId: string | null;
    boughtAt: number | null;
    createdAt: number;
    id: string;
    renew?: boolean | undefined;
    serviceType: "external" | "na" | "zeit.world";
    transferredAt?: (number | null) | undefined;
    transferStartedAt?: number | undefined;
    userId: string;
  };
};

export type GetV5DomainsDomainInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { domain: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV5DomainsDomainHandler = (
  input: GetV5DomainsDomainInput,
) => Promise<GetV5DomainsDomainResponse>;

export type GetV5DomainsResponse = {
  domains: Array<{
    expiresAt: number | null;
    verified: boolean;
    nameservers: Array<string>;
    intendedNameservers: Array<string>;
    customNameservers?: Array<string> | undefined;
    creator: {
      username: string;
      email: string;
      customerId?: (string | null) | undefined;
      isDomainReseller?: boolean | undefined;
      id: string;
    };
    echMode: "auto" | "disabled" | "enabled";
    name: string;
    teamId: string | null;
    boughtAt: number | null;
    createdAt: number;
    id: string;
    renew?: boolean | undefined;
    serviceType: "external" | "na" | "zeit.world";
    transferredAt?: (number | null) | undefined;
    transferStartedAt?: number | undefined;
    userId: string;
  }>;
  pagination: Pagination;
};

export type GetV5DomainsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: {
    limit?: number | undefined;
    since?: number | undefined;
    until?: number | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV5DomainsHandler = (input: GetV5DomainsInput) => Promise<GetV5DomainsResponse>;

export const postV7DomainsBody = z.union([
  z.object({
    method: z.string().optional(),
    name: z.string(),
    cdnEnabled: z.boolean().optional(),
    zone: z.boolean().optional(),
  }),
  z.object({ method: z.string(), name: z.string(), token: z.string().optional() }),
]);

export type PostV7DomainsBody =
  | {
      method?: string | undefined;
      name: string;
      cdnEnabled?: boolean | undefined;
      zone?: boolean | undefined;
    }
  | { method: string; name: string; token?: string | undefined };

export type PostV7DomainsResponse = {
  domain: {
    expiresAt: number | null;
    verified: boolean;
    nameservers: Array<string>;
    intendedNameservers: Array<string>;
    customNameservers?: Array<string> | undefined;
    creator: {
      username: string;
      email: string;
      customerId?: (string | null) | undefined;
      isDomainReseller?: boolean | undefined;
      id: string;
    };
    echMode: "auto" | "disabled" | "enabled";
    name: string;
    teamId: string | null;
    boughtAt: number | null;
    createdAt: number;
    id: string;
    renew?: boolean | undefined;
    serviceType: "external" | "na" | "zeit.world";
    transferredAt?: (number | null) | undefined;
    transferStartedAt?: number | undefined;
    userId: string;
  };
};

export type PostV7DomainsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV7DomainsBody;
};

export type PostV7DomainsHandler = (input: PostV7DomainsInput) => Promise<PostV7DomainsResponse>;

export const patchV3DomainsDomainBody = z.union([
  z.object({
    op: z.string().optional(),
    renew: z.boolean().optional(),
    customNameservers: z.array(z.string()).optional(),
    zone: z.boolean().optional(),
    echMode: z.enum(["auto", "disabled"]).optional(),
  }),
  z.object({ op: z.string().optional(), destination: z.string().optional() }),
]);

export type PatchV3DomainsDomainBody =
  | {
      op?: string | undefined;
      renew?: boolean | undefined;
      customNameservers?: Array<string> | undefined;
      zone?: boolean | undefined;
      echMode?: ("auto" | "disabled") | undefined;
    }
  | { op?: string | undefined; destination?: string | undefined };

export type PatchV3DomainsDomainResponse =
  | { moved: boolean }
  | { moved: boolean; token: string }
  | {
      renew?: boolean | undefined;
      customNameservers?: Array<string> | undefined;
      zone?: boolean | undefined;
      echMode: "auto" | "disabled" | "enabled";
    };

export type PatchV3DomainsDomainInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { domain: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PatchV3DomainsDomainBody;
};

export type PatchV3DomainsDomainHandler = (
  input: PatchV3DomainsDomainInput,
) => Promise<PatchV3DomainsDomainResponse>;

export type DeleteV6DomainsDomainResponse = { uid: string };

export type DeleteV6DomainsDomainInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { domain: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type DeleteV6DomainsDomainHandler = (
  input: DeleteV6DomainsDomainInput,
) => Promise<DeleteV6DomainsDomainResponse>;
