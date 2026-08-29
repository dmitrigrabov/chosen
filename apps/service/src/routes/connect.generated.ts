import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import {
  getV1ConnectNetworks,
  postV1ConnectNetworks,
  deleteV1ConnectNetworksNetworkId,
  patchV1ConnectNetworksNetworkId,
  getV1ConnectNetworksNetworkId,
  postV1ConnectConnectors,
  postV1ConnectTokenConnector,
  postV1ConnectAuthorizeConnector,
} from "./handlers/connect";
import type { Network } from "packages/models/src/network.generated.ts";
import {
  connectCreateConnectorRequest,
  type ConnectCreateConnectorRequest,
} from "packages/models/src/connectCreateConnectorRequest.generated.ts";
import type { ConnectConnectorCreateResult } from "packages/models/src/connectConnectorCreateResult.generated.ts";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.get(
  "/v1/connect/networks",
  validate(
    "query",
    z.object({
      includeHostedZones: z
        .preprocess((v) => (v === "true" ? true : v === "false" ? false : v), z.boolean())
        .optional(),
      includePeeringConnections: z
        .preprocess((v) => (v === "true" ? true : v === "false" ? false : v), z.boolean())
        .optional(),
      includeProjects: z
        .preprocess((v) => (v === "true" ? true : v === "false" ? false : v), z.boolean())
        .optional(),
      search: z.string().max(255).optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(await getV1ConnectNetworks({ db, env: c.env, user: c.var.user, query }));
  },
);
app.post(
  "/v1/connect/networks",
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV1ConnectNetworksBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV1ConnectNetworks({ db, env: c.env, user: c.var.user, query, body }),
      201,
    );
  },
);
app.delete(
  "/v1/connect/networks/:networkId",
  validate("param", z.object({ networkId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    await deleteV1ConnectNetworksNetworkId({ db, env: c.env, user: c.var.user, params, query });
    return c.body(null, 204);
  },
);
app.patch(
  "/v1/connect/networks/:networkId",
  validate("param", z.object({ networkId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", patchV1ConnectNetworksNetworkIdBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await patchV1ConnectNetworksNetworkId({
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
app.get(
  "/v1/connect/networks/:networkId",
  validate("param", z.object({ networkId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV1ConnectNetworksNetworkId({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);
app.post(
  "/v1/connect/connectors",
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", connectCreateConnectorRequest),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV1ConnectConnectors({ db, env: c.env, user: c.var.user, query, body }),
      201,
    );
  },
);
app.post(
  "/v1/connect/token/:connector",
  validate("param", z.object({ connector: z.string() })),
  validate("json", postV1ConnectTokenConnectorBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const body = c.req.valid("json");
    return c.json(
      await postV1ConnectTokenConnector({ db, env: c.env, user: c.var.user, params, body }),
    );
  },
);
app.post(
  "/v1/connect/authorize/:connector",
  validate("param", z.object({ connector: z.string() })),
  validate("json", postV1ConnectAuthorizeConnectorBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const body = c.req.valid("json");
    return c.json(
      await postV1ConnectAuthorizeConnector({ db, env: c.env, user: c.var.user, params, body }),
    );
  },
);

export type GetV1ConnectNetworksResponse = Array<Network>;

export type GetV1ConnectNetworksInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: {
    includeHostedZones?: boolean | undefined;
    includePeeringConnections?: boolean | undefined;
    includeProjects?: boolean | undefined;
    search?: string | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV1ConnectNetworksHandler = (
  input: GetV1ConnectNetworksInput,
) => Promise<GetV1ConnectNetworksResponse>;

export const postV1ConnectNetworksBody = z.object({
  awsAvailabilityZoneIds: z.array(z.string()).optional(),
  cidr: z.string(),
  name: z.string().max(255),
  region: z.string(),
});

export type PostV1ConnectNetworksBody = {
  awsAvailabilityZoneIds?: Array<string> | undefined;
  cidr: string;
  name: string;
  region: string;
};

export type PostV1ConnectNetworksInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV1ConnectNetworksBody;
};

export type PostV1ConnectNetworksHandler = (input: PostV1ConnectNetworksInput) => Promise<Network>;

export type DeleteV1ConnectNetworksNetworkIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { networkId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type DeleteV1ConnectNetworksNetworkIdHandler = (
  input: DeleteV1ConnectNetworksNetworkIdInput,
) => Promise<void>;

export const patchV1ConnectNetworksNetworkIdBody = z.object({ name: z.string().max(255) });

export type PatchV1ConnectNetworksNetworkIdBody = { name: string };

export type PatchV1ConnectNetworksNetworkIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { networkId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PatchV1ConnectNetworksNetworkIdBody;
};

export type PatchV1ConnectNetworksNetworkIdHandler = (
  input: PatchV1ConnectNetworksNetworkIdInput,
) => Promise<Network>;

export type GetV1ConnectNetworksNetworkIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { networkId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV1ConnectNetworksNetworkIdHandler = (
  input: GetV1ConnectNetworksNetworkIdInput,
) => Promise<Network>;

export type PostV1ConnectConnectorsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: ConnectCreateConnectorRequest;
};

export type PostV1ConnectConnectorsHandler = (
  input: PostV1ConnectConnectorsInput,
) => Promise<ConnectConnectorCreateResult>;

export const postV1ConnectTokenConnectorBody = z.object({
  subject: z
    .union([
      z.object({ type: z.literal("app") }).and(z.record(z.string(), z.unknown())),
      z
        .object({
          type: z.literal("user"),
          id: z.string().optional(),
          issuer: z.string().optional(),
        })
        .and(z.record(z.string(), z.unknown())),
      z
        .object({
          type: z.literal("jwt-bearer"),
          sub: z.string().optional(),
          iss: z.string().optional(),
          aud: z.string().optional(),
          additionalClaims: z.record(z.string(), z.unknown()).optional(),
        })
        .and(z.record(z.string(), z.unknown())),
      z.object({ type: z.literal("token"), token: z.string() }),
    ])
    .optional(),
  installationId: z.string().optional(),
  audience: z.array(z.string()).optional(),
  scopes: z.array(z.string()).optional(),
  resources: z.array(z.string()).optional(),
  authorizationDetails: z
    .array(z.object({ type: z.string().optional() }).and(z.record(z.string(), z.unknown())))
    .optional(),
  validityBufferMs: z.number().optional(),
});

export type PostV1ConnectTokenConnectorBody = {
  subject?:
    | (
        | { type: "app" }
        | Record<string, unknown>
        | { type: "user"; id?: string | undefined; issuer?: string | undefined }
        | Record<string, unknown>
        | {
            type: "jwt-bearer";
            sub?: string | undefined;
            iss?: string | undefined;
            aud?: string | undefined;
            additionalClaims?: Record<string, unknown> | undefined;
          }
        | Record<string, unknown>
        | { type: "token"; token: string }
      )
    | undefined;
  installationId?: string | undefined;
  audience?: Array<string> | undefined;
  scopes?: Array<string> | undefined;
  resources?: Array<string> | undefined;
  authorizationDetails?: Array<{ type?: string | undefined } | Record<string, unknown>> | undefined;
  validityBufferMs?: number | undefined;
};

export type PostV1ConnectTokenConnectorResponse = {
  token: string;
  tokenId: string;
  expiresAt: number;
  connector: { id: string; uid: string; type: string };
  name?: string | undefined;
  installationId?: string | undefined;
  tenantId?: string | undefined;
  externalSubject?: string | undefined;
  authorizationId?: string | undefined;
  tokenGroupId?: string | undefined;
  claims?: Record<string, unknown> | undefined;
  metadata?: Record<string, unknown> | undefined;
};

export type PostV1ConnectTokenConnectorInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { connector: string };
  body: PostV1ConnectTokenConnectorBody;
};

export type PostV1ConnectTokenConnectorHandler = (
  input: PostV1ConnectTokenConnectorInput,
) => Promise<PostV1ConnectTokenConnectorResponse>;

export const postV1ConnectAuthorizeConnectorBody = z.object({
  subject: z
    .union([
      z.object({ type: z.literal("app") }).and(z.record(z.string(), z.unknown())),
      z
        .object({
          type: z.literal("user"),
          id: z.string().optional(),
          issuer: z.string().optional(),
        })
        .and(z.record(z.string(), z.unknown())),
      z
        .object({
          type: z.literal("jwt-bearer"),
          sub: z.string().optional(),
          iss: z.string().optional(),
          aud: z.string().optional(),
          additionalClaims: z.record(z.string(), z.unknown()).optional(),
        })
        .and(z.record(z.string(), z.unknown())),
      z.object({ type: z.literal("token"), token: z.string() }),
    ])
    .optional(),
  installationId: z.string().optional(),
  audience: z.array(z.string()).optional(),
  scopes: z.array(z.string()).optional(),
  resources: z.array(z.string()).optional(),
  authorizationDetails: z
    .array(z.object({ type: z.string().optional() }).and(z.record(z.string(), z.unknown())))
    .optional(),
  validityBufferMs: z.number().optional(),
  returnUrl: z.string().optional(),
  webhook: z.string().optional(),
  prompt: z.string().optional(),
  deviceCode: z.boolean().optional(),
  expiresInMs: z.number().optional(),
  additionalParams: z.record(z.string(), z.string()).optional(),
});

export type PostV1ConnectAuthorizeConnectorBody = {
  subject?:
    | (
        | { type: "app" }
        | Record<string, unknown>
        | { type: "user"; id?: string | undefined; issuer?: string | undefined }
        | Record<string, unknown>
        | {
            type: "jwt-bearer";
            sub?: string | undefined;
            iss?: string | undefined;
            aud?: string | undefined;
            additionalClaims?: Record<string, unknown> | undefined;
          }
        | Record<string, unknown>
        | { type: "token"; token: string }
      )
    | undefined;
  installationId?: string | undefined;
  audience?: Array<string> | undefined;
  scopes?: Array<string> | undefined;
  resources?: Array<string> | undefined;
  authorizationDetails?: Array<{ type?: string | undefined } | Record<string, unknown>> | undefined;
  validityBufferMs?: number | undefined;
  returnUrl?: string | undefined;
  webhook?: string | undefined;
  prompt?: string | undefined;
  deviceCode?: boolean | undefined;
  expiresInMs?: number | undefined;
  additionalParams?: Record<string, string> | undefined;
};

export type PostV1ConnectAuthorizeConnectorResponse = {
  url: string;
  request: string;
  verifier: string;
  deviceCode?: string | undefined;
  expiresAt: number;
  connector: {
    id: string;
    uid: string;
    type: string;
    service?: string | undefined;
    serviceName?: string | undefined;
    displayName: string;
    name: string;
  };
};

export type PostV1ConnectAuthorizeConnectorInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { connector: string };
  body: PostV1ConnectAuthorizeConnectorBody;
};

export type PostV1ConnectAuthorizeConnectorHandler = (
  input: PostV1ConnectAuthorizeConnectorInput,
) => Promise<PostV1ConnectAuthorizeConnectorResponse>;
