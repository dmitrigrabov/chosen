import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import {
  getV1KmsIssuers,
  postV1KmsIssuers,
  postV1KmsIssuersIssuerIdSignMessage,
  postV1KmsIssuersIssuerIdSignToken,
  postV1KmsIssuersIssuerIdKeys,
  postV1KmsIssuersIssuerIdKeysKeyIdActivate,
  postV1KmsIssuersIssuerIdKeysKeyIdRevoke,
  getV1KmsIssuersIssuerId,
  patchV1KmsIssuersIssuerId,
  deleteV1KmsIssuersIssuerId,
  postV1KmsIssuersIssuerIdPolicies,
  patchV1KmsIssuersIssuerIdPoliciesKindPolicyKey,
  deleteV1KmsIssuersIssuerIdPoliciesKindPolicyKey,
} from "./handlers/kms";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.get(
  "/v1/kms/issuers",
  validate(
    "query",
    z.object({
      limit: z.coerce.number().int().gte(1).lte(100).optional(),
      next: z
        .string()
        .max(1024)
        .regex(/^[A-Za-z0-9_-]+$/)
        .optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(await getV1KmsIssuers({ db, env: c.env, user: c.var.user, query }));
  },
);
app.post(
  "/v1/kms/issuers",
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV1KmsIssuersBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(await postV1KmsIssuers({ db, env: c.env, user: c.var.user, query, body }), 201);
  },
);
app.post(
  "/v1/kms/issuers/:issuerId/sign/message",
  validate("param", z.object({ issuerId: z.string() })),
  validate("json", postV1KmsIssuersIssuerIdSignMessageBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const body = c.req.valid("json");
    return c.json(
      await postV1KmsIssuersIssuerIdSignMessage({ db, env: c.env, user: c.var.user, params, body }),
    );
  },
);
app.post(
  "/v1/kms/issuers/:issuerId/sign/token",
  validate("param", z.object({ issuerId: z.string() })),
  validate("json", postV1KmsIssuersIssuerIdSignTokenBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const body = c.req.valid("json");
    return c.json(
      await postV1KmsIssuersIssuerIdSignToken({ db, env: c.env, user: c.var.user, params, body }),
    );
  },
);
app.post(
  "/v1/kms/issuers/:issuerId/keys",
  validate("param", z.object({ issuerId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV1KmsIssuersIssuerIdKeysBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV1KmsIssuersIssuerIdKeys({ db, env: c.env, user: c.var.user, params, query, body }),
    );
  },
);
app.post(
  "/v1/kms/issuers/:issuerId/keys/:keyId/activate",
  validate("param", z.object({ issuerId: z.string(), keyId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV1KmsIssuersIssuerIdKeysKeyIdActivateBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV1KmsIssuersIssuerIdKeysKeyIdActivate({
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
app.post(
  "/v1/kms/issuers/:issuerId/keys/:keyId/revoke",
  validate("param", z.object({ issuerId: z.string(), keyId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await postV1KmsIssuersIssuerIdKeysKeyIdRevoke({
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
  "/v1/kms/issuers/:issuerId",
  validate("param", z.object({ issuerId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV1KmsIssuersIssuerId({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);
app.patch(
  "/v1/kms/issuers/:issuerId",
  validate("param", z.object({ issuerId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", patchV1KmsIssuersIssuerIdBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await patchV1KmsIssuersIssuerId({ db, env: c.env, user: c.var.user, params, query, body }),
    );
  },
);
app.delete(
  "/v1/kms/issuers/:issuerId",
  validate("param", z.object({ issuerId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    await deleteV1KmsIssuersIssuerId({ db, env: c.env, user: c.var.user, params, query });
    return c.body(null, 204);
  },
);
app.post(
  "/v1/kms/issuers/:issuerId/policies",
  validate("param", z.object({ issuerId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV1KmsIssuersIssuerIdPoliciesBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV1KmsIssuersIssuerIdPolicies({
        db,
        env: c.env,
        user: c.var.user,
        params,
        query,
        body,
      }),
      201,
    );
  },
);
app.patch(
  "/v1/kms/issuers/:issuerId/policies/:kind/:policyKey",
  validate(
    "param",
    z.object({ issuerId: z.string(), kind: z.literal("project-grant"), policyKey: z.string() }),
  ),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", patchV1KmsIssuersIssuerIdPoliciesKindPolicyKeyBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await patchV1KmsIssuersIssuerIdPoliciesKindPolicyKey({
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
  "/v1/kms/issuers/:issuerId/policies/:kind/:policyKey",
  validate(
    "param",
    z.object({
      issuerId: z.string(),
      kind: z.enum(["project-grant", "connex-grant"]),
      policyKey: z.string(),
    }),
  ),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    await deleteV1KmsIssuersIssuerIdPoliciesKindPolicyKey({
      db,
      env: c.env,
      user: c.var.user,
      params,
      query,
    });
    return c.body(null, 204);
  },
);

export type GetV1KmsIssuersResponse = {
  issuers: Array<{
    id: string;
    ownerId: string;
    name: string;
    algorithm:
      | "ES256"
      | "ES384"
      | "ES512"
      | "EdDSA"
      | "PS256"
      | "PS384"
      | "PS512"
      | "RS256"
      | "RS384"
      | "RS512";
    origin: "external" | "vercel";
    managedBy?: string | undefined;
    claimsSchema?: Record<string, unknown> | undefined;
    createdAt: string;
    updatedAt: string;
    signingKeys: Array<{
      keyId: string;
      importKeyId?: string | undefined;
      issuerId: string;
      algorithm: string;
      status: "active" | "pending" | "revoking";
      publicKey?:
        | {
            kty?: string | undefined;
            kid?: string | undefined;
            alg?: string | undefined;
            use?: string | undefined;
            key_ops?: Array<string> | undefined;
            x5c?: Array<string> | undefined;
            "x5t#S256"?: string | undefined;
          }
        | undefined;
      publicKeyFingerprint?: string | undefined;
      publicKeyPem?: string | undefined;
      certificatePem?: string | undefined;
      createdAt: string;
      updatedAt: string;
      revokeAt?: string | undefined;
      activateAt?: string | undefined;
      activatedAt?: string | undefined;
    }>;
    policies: Array<
      | {
          kind: "project-grant";
          teamId: string;
          projectId: string;
          environments: Array<string>;
          tokenClaims?: Record<string, unknown> | undefined;
          createdAt: string;
          updatedAt: string;
        }
      | {
          kind: "connex-grant";
          clientId: string;
          tokenClaims?: Record<string, unknown> | undefined;
          createdAt: string;
          updatedAt: string;
        }
    >;
  }>;
  pagination: { count: number; next: string | null };
};

export type GetV1KmsIssuersInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: {
    limit?: number | undefined;
    next?: string | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV1KmsIssuersHandler = (
  input: GetV1KmsIssuersInput,
) => Promise<GetV1KmsIssuersResponse>;

export const postV1KmsIssuersBody = z.object({
  name: z.string(),
  algorithm: z
    .enum([
      "RS256",
      "RS384",
      "RS512",
      "PS256",
      "PS384",
      "PS512",
      "ES256",
      "ES384",
      "ES512",
      "EdDSA",
    ])
    .optional(),
  claimsSchema: z.record(z.string(), z.unknown()).optional(),
  policy: z
    .union([
      z.object({
        kind: z.literal("project-grant"),
        teamId: z.string(),
        projectId: z.string(),
        environments: z.array(z.string().regex(/^(?:production|preview|development|env_.+)$/)),
        tokenClaims: z.record(z.string(), z.unknown()).optional(),
      }),
      z.object({
        kind: z.literal("connex-grant"),
        clientId: z.string(),
        tokenClaims: z.record(z.string(), z.unknown()).optional(),
      }),
    ])
    .optional(),
  importKey: z.string().optional(),
  importKeyId: z
    .string()
    .max(128)
    .regex(/^[A-Za-z0-9._-]+$/)
    .optional(),
});

export type PostV1KmsIssuersBody = {
  name: string;
  algorithm?:
    | (
        | "RS256"
        | "RS384"
        | "RS512"
        | "PS256"
        | "PS384"
        | "PS512"
        | "ES256"
        | "ES384"
        | "ES512"
        | "EdDSA"
      )
    | undefined;
  claimsSchema?: Record<string, unknown> | undefined;
  policy?:
    | (
        | {
            kind: "project-grant";
            teamId: string;
            projectId: string;
            environments: Array<string>;
            tokenClaims?: Record<string, unknown> | undefined;
          }
        | {
            kind: "connex-grant";
            clientId: string;
            tokenClaims?: Record<string, unknown> | undefined;
          }
      )
    | undefined;
  importKey?: string | undefined;
  importKeyId?: string | undefined;
};

export type PostV1KmsIssuersResponse = {
  id: string;
  ownerId: string;
  name: string;
  algorithm:
    | "ES256"
    | "ES384"
    | "ES512"
    | "EdDSA"
    | "PS256"
    | "PS384"
    | "PS512"
    | "RS256"
    | "RS384"
    | "RS512";
  origin: "external" | "vercel";
  managedBy?: string | undefined;
  claimsSchema?: Record<string, unknown> | undefined;
  createdAt: string;
  updatedAt: string;
  signingKeys: Array<{
    keyId: string;
    importKeyId?: string | undefined;
    issuerId: string;
    algorithm: string;
    status: "active" | "pending" | "revoking";
    publicKey?:
      | {
          kty?: string | undefined;
          kid?: string | undefined;
          alg?: string | undefined;
          use?: string | undefined;
          key_ops?: Array<string> | undefined;
          x5c?: Array<string> | undefined;
          "x5t#S256"?: string | undefined;
        }
      | undefined;
    publicKeyFingerprint?: string | undefined;
    publicKeyPem?: string | undefined;
    certificatePem?: string | undefined;
    createdAt: string;
    updatedAt: string;
    revokeAt?: string | undefined;
    activateAt?: string | undefined;
    activatedAt?: string | undefined;
  }>;
  policies: Array<
    | {
        kind: "project-grant";
        teamId: string;
        projectId: string;
        environments: Array<string>;
        tokenClaims?: Record<string, unknown> | undefined;
        createdAt: string;
        updatedAt: string;
      }
    | {
        kind: "connex-grant";
        clientId: string;
        tokenClaims?: Record<string, unknown> | undefined;
        createdAt: string;
        updatedAt: string;
      }
  >;
};

export type PostV1KmsIssuersInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV1KmsIssuersBody;
};

export type PostV1KmsIssuersHandler = (
  input: PostV1KmsIssuersInput,
) => Promise<PostV1KmsIssuersResponse>;

export const postV1KmsIssuersIssuerIdSignMessageBody = z.object({
  message: z
    .string()
    .max(44000)
    .regex(/^[A-Za-z0-9+\/]*={0,2}$/),
});

export type PostV1KmsIssuersIssuerIdSignMessageBody = { message: string };

export type PostV1KmsIssuersIssuerIdSignMessageResponse = {
  signature: {
    payload: string;
    signature: string;
    header?:
      | {
          alg?: string | undefined;
          b64?: boolean | undefined;
          crit?: Array<string> | undefined;
          kid?: string | undefined;
          x5t?: string | undefined;
          x5c?: Array<string> | undefined;
          x5u?: string | undefined;
          jku?: string | undefined;
          jwk?:
            | {
                n?: string | undefined;
                e?: string | undefined;
                kty?: string | undefined;
                crv?: string | undefined;
                x?: string | undefined;
                y?: string | undefined;
                alg?: string | undefined;
                pub?: string | undefined;
              }
            | undefined;
          typ?: string | undefined;
          cty?: string | undefined;
        }
      | undefined;
    protected?: string | undefined;
  };
};

export type PostV1KmsIssuersIssuerIdSignMessageInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { issuerId: string };
  body: PostV1KmsIssuersIssuerIdSignMessageBody;
};

export type PostV1KmsIssuersIssuerIdSignMessageHandler = (
  input: PostV1KmsIssuersIssuerIdSignMessageInput,
) => Promise<PostV1KmsIssuersIssuerIdSignMessageResponse>;

export const postV1KmsIssuersIssuerIdSignTokenBody = z.object({
  claims: z.object({}).optional(),
  headers: z.object({}).optional(),
  ttl: z.number().nullable().optional(),
});

export type PostV1KmsIssuersIssuerIdSignTokenBody = {
  claims?: Record<string, never> | undefined;
  headers?: Record<string, never> | undefined;
  ttl?: (number | null) | undefined;
};

export type PostV1KmsIssuersIssuerIdSignTokenResponse = { token: string };

export type PostV1KmsIssuersIssuerIdSignTokenInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { issuerId: string };
  body: PostV1KmsIssuersIssuerIdSignTokenBody;
};

export type PostV1KmsIssuersIssuerIdSignTokenHandler = (
  input: PostV1KmsIssuersIssuerIdSignTokenInput,
) => Promise<PostV1KmsIssuersIssuerIdSignTokenResponse>;

export const postV1KmsIssuersIssuerIdKeysBody = z.object({
  activation: z.enum(["automatic", "manual"]).optional(),
  revokePreviousAfterHours: z.number().gte(0).optional(),
  revokePreviousAt: z.union([z.string(), z.number()]).optional(),
  importKey: z.string().optional(),
  importKeyId: z
    .string()
    .max(128)
    .regex(/^[A-Za-z0-9._-]+$/)
    .optional(),
});

export type PostV1KmsIssuersIssuerIdKeysBody = {
  activation?: ("automatic" | "manual") | undefined;
  revokePreviousAfterHours?: number | undefined;
  revokePreviousAt?: (string | number) | undefined;
  importKey?: string | undefined;
  importKeyId?: string | undefined;
};

export type PostV1KmsIssuersIssuerIdKeysResponse = {
  keyId: string;
  importKeyId?: string | undefined;
  issuerId: string;
  algorithm: string;
  status: "active" | "pending" | "revoking";
  publicKey?:
    | {
        kty?: string | undefined;
        kid?: string | undefined;
        alg?: string | undefined;
        use?: string | undefined;
        key_ops?: Array<string> | undefined;
        x5c?: Array<string> | undefined;
        "x5t#S256"?: string | undefined;
      }
    | undefined;
  publicKeyFingerprint?: string | undefined;
  publicKeyPem?: string | undefined;
  certificatePem?: string | undefined;
  createdAt: string;
  updatedAt: string;
  revokeAt?: string | undefined;
  activateAt?: string | undefined;
  activatedAt?: string | undefined;
};

export type PostV1KmsIssuersIssuerIdKeysInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { issuerId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV1KmsIssuersIssuerIdKeysBody;
};

export type PostV1KmsIssuersIssuerIdKeysHandler = (
  input: PostV1KmsIssuersIssuerIdKeysInput,
) => Promise<PostV1KmsIssuersIssuerIdKeysResponse>;

export const postV1KmsIssuersIssuerIdKeysKeyIdActivateBody = z.object({
  revokePreviousAfterHours: z.number().gte(0).optional(),
});

export type PostV1KmsIssuersIssuerIdKeysKeyIdActivateBody = {
  revokePreviousAfterHours?: number | undefined;
};

export type PostV1KmsIssuersIssuerIdKeysKeyIdActivateResponse = {
  keyId: string;
  importKeyId?: string | undefined;
  issuerId: string;
  algorithm: string;
  status: "active" | "pending" | "revoking";
  publicKey?:
    | {
        kty?: string | undefined;
        kid?: string | undefined;
        alg?: string | undefined;
        use?: string | undefined;
        key_ops?: Array<string> | undefined;
        x5c?: Array<string> | undefined;
        "x5t#S256"?: string | undefined;
      }
    | undefined;
  publicKeyFingerprint?: string | undefined;
  publicKeyPem?: string | undefined;
  certificatePem?: string | undefined;
  createdAt: string;
  updatedAt: string;
  revokeAt?: string | undefined;
  activateAt?: string | undefined;
  activatedAt?: string | undefined;
};

export type PostV1KmsIssuersIssuerIdKeysKeyIdActivateInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { issuerId: string; keyId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV1KmsIssuersIssuerIdKeysKeyIdActivateBody;
};

export type PostV1KmsIssuersIssuerIdKeysKeyIdActivateHandler = (
  input: PostV1KmsIssuersIssuerIdKeysKeyIdActivateInput,
) => Promise<PostV1KmsIssuersIssuerIdKeysKeyIdActivateResponse>;

export type PostV1KmsIssuersIssuerIdKeysKeyIdRevokeResponse = {
  id: string;
  ownerId: string;
  name: string;
  algorithm:
    | "ES256"
    | "ES384"
    | "ES512"
    | "EdDSA"
    | "PS256"
    | "PS384"
    | "PS512"
    | "RS256"
    | "RS384"
    | "RS512";
  origin: "external" | "vercel";
  managedBy?: string | undefined;
  claimsSchema?: Record<string, unknown> | undefined;
  createdAt: string;
  updatedAt: string;
  signingKeys: Array<{
    keyId: string;
    importKeyId?: string | undefined;
    issuerId: string;
    algorithm: string;
    status: "active" | "pending" | "revoking";
    publicKey?:
      | {
          kty?: string | undefined;
          kid?: string | undefined;
          alg?: string | undefined;
          use?: string | undefined;
          key_ops?: Array<string> | undefined;
          x5c?: Array<string> | undefined;
          "x5t#S256"?: string | undefined;
        }
      | undefined;
    publicKeyFingerprint?: string | undefined;
    publicKeyPem?: string | undefined;
    certificatePem?: string | undefined;
    createdAt: string;
    updatedAt: string;
    revokeAt?: string | undefined;
    activateAt?: string | undefined;
    activatedAt?: string | undefined;
  }>;
  policies: Array<
    | {
        kind: "project-grant";
        teamId: string;
        projectId: string;
        environments: Array<string>;
        tokenClaims?: Record<string, unknown> | undefined;
        createdAt: string;
        updatedAt: string;
      }
    | {
        kind: "connex-grant";
        clientId: string;
        tokenClaims?: Record<string, unknown> | undefined;
        createdAt: string;
        updatedAt: string;
      }
  >;
};

export type PostV1KmsIssuersIssuerIdKeysKeyIdRevokeInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { issuerId: string; keyId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type PostV1KmsIssuersIssuerIdKeysKeyIdRevokeHandler = (
  input: PostV1KmsIssuersIssuerIdKeysKeyIdRevokeInput,
) => Promise<PostV1KmsIssuersIssuerIdKeysKeyIdRevokeResponse>;

export type GetV1KmsIssuersIssuerIdResponse = {
  id: string;
  ownerId: string;
  name: string;
  algorithm:
    | "ES256"
    | "ES384"
    | "ES512"
    | "EdDSA"
    | "PS256"
    | "PS384"
    | "PS512"
    | "RS256"
    | "RS384"
    | "RS512";
  origin: "external" | "vercel";
  managedBy?: string | undefined;
  claimsSchema?: Record<string, unknown> | undefined;
  createdAt: string;
  updatedAt: string;
  signingKeys: Array<{
    keyId: string;
    importKeyId?: string | undefined;
    issuerId: string;
    algorithm: string;
    status: "active" | "pending" | "revoking";
    publicKey?:
      | {
          kty?: string | undefined;
          kid?: string | undefined;
          alg?: string | undefined;
          use?: string | undefined;
          key_ops?: Array<string> | undefined;
          x5c?: Array<string> | undefined;
          "x5t#S256"?: string | undefined;
        }
      | undefined;
    publicKeyFingerprint?: string | undefined;
    publicKeyPem?: string | undefined;
    certificatePem?: string | undefined;
    createdAt: string;
    updatedAt: string;
    revokeAt?: string | undefined;
    activateAt?: string | undefined;
    activatedAt?: string | undefined;
  }>;
  policies: Array<
    | {
        kind: "project-grant";
        teamId: string;
        projectId: string;
        environments: Array<string>;
        tokenClaims?: Record<string, unknown> | undefined;
        createdAt: string;
        updatedAt: string;
      }
    | {
        kind: "connex-grant";
        clientId: string;
        tokenClaims?: Record<string, unknown> | undefined;
        createdAt: string;
        updatedAt: string;
      }
  >;
};

export type GetV1KmsIssuersIssuerIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { issuerId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV1KmsIssuersIssuerIdHandler = (
  input: GetV1KmsIssuersIssuerIdInput,
) => Promise<GetV1KmsIssuersIssuerIdResponse>;

export const patchV1KmsIssuersIssuerIdBody = z.object({
  name: z.string().optional(),
  claimsSchema: z.record(z.string(), z.unknown()).nullable().optional(),
});

export type PatchV1KmsIssuersIssuerIdBody = {
  name?: string | undefined;
  claimsSchema?: (Record<string, unknown> | null) | undefined;
};

export type PatchV1KmsIssuersIssuerIdResponse = {
  id: string;
  ownerId: string;
  name: string;
  algorithm:
    | "ES256"
    | "ES384"
    | "ES512"
    | "EdDSA"
    | "PS256"
    | "PS384"
    | "PS512"
    | "RS256"
    | "RS384"
    | "RS512";
  origin: "external" | "vercel";
  managedBy?: string | undefined;
  claimsSchema?: Record<string, unknown> | undefined;
  createdAt: string;
  updatedAt: string;
  signingKeys: Array<{
    keyId: string;
    importKeyId?: string | undefined;
    issuerId: string;
    algorithm: string;
    status: "active" | "pending" | "revoking";
    publicKey?:
      | {
          kty?: string | undefined;
          kid?: string | undefined;
          alg?: string | undefined;
          use?: string | undefined;
          key_ops?: Array<string> | undefined;
          x5c?: Array<string> | undefined;
          "x5t#S256"?: string | undefined;
        }
      | undefined;
    publicKeyFingerprint?: string | undefined;
    publicKeyPem?: string | undefined;
    certificatePem?: string | undefined;
    createdAt: string;
    updatedAt: string;
    revokeAt?: string | undefined;
    activateAt?: string | undefined;
    activatedAt?: string | undefined;
  }>;
  policies: Array<
    | {
        kind: "project-grant";
        teamId: string;
        projectId: string;
        environments: Array<string>;
        tokenClaims?: Record<string, unknown> | undefined;
        createdAt: string;
        updatedAt: string;
      }
    | {
        kind: "connex-grant";
        clientId: string;
        tokenClaims?: Record<string, unknown> | undefined;
        createdAt: string;
        updatedAt: string;
      }
  >;
};

export type PatchV1KmsIssuersIssuerIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { issuerId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PatchV1KmsIssuersIssuerIdBody;
};

export type PatchV1KmsIssuersIssuerIdHandler = (
  input: PatchV1KmsIssuersIssuerIdInput,
) => Promise<PatchV1KmsIssuersIssuerIdResponse>;

export type DeleteV1KmsIssuersIssuerIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { issuerId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type DeleteV1KmsIssuersIssuerIdHandler = (
  input: DeleteV1KmsIssuersIssuerIdInput,
) => Promise<void>;

export const postV1KmsIssuersIssuerIdPoliciesBody = z.object({
  kind: z.literal("project-grant"),
  projectId: z.string(),
  environments: z.array(z.string().regex(/^(?:production|preview|development|env_.+)$/)),
  tokenClaims: z.record(z.string(), z.unknown()).optional(),
});

export type PostV1KmsIssuersIssuerIdPoliciesBody = {
  kind: "project-grant";
  projectId: string;
  environments: Array<string>;
  tokenClaims?: Record<string, unknown> | undefined;
};

export type PostV1KmsIssuersIssuerIdPoliciesResponse =
  | {
      kind: "project-grant";
      teamId: string;
      projectId: string;
      environments: Array<string>;
      tokenClaims?: Record<string, unknown> | undefined;
      createdAt: string;
      updatedAt: string;
    }
  | {
      kind: "connex-grant";
      clientId: string;
      tokenClaims?: Record<string, unknown> | undefined;
      createdAt: string;
      updatedAt: string;
    };

export type PostV1KmsIssuersIssuerIdPoliciesInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { issuerId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV1KmsIssuersIssuerIdPoliciesBody;
};

export type PostV1KmsIssuersIssuerIdPoliciesHandler = (
  input: PostV1KmsIssuersIssuerIdPoliciesInput,
) => Promise<PostV1KmsIssuersIssuerIdPoliciesResponse>;

export const patchV1KmsIssuersIssuerIdPoliciesKindPolicyKeyBody = z.object({
  environments: z.array(z.string().regex(/^(?:production|preview|development|env_.+)$/)).optional(),
  tokenClaims: z.record(z.string(), z.unknown()).nullable().optional(),
});

export type PatchV1KmsIssuersIssuerIdPoliciesKindPolicyKeyBody = {
  environments?: Array<string> | undefined;
  tokenClaims?: (Record<string, unknown> | null) | undefined;
};

export type PatchV1KmsIssuersIssuerIdPoliciesKindPolicyKeyResponse =
  | {
      kind: "project-grant";
      teamId: string;
      projectId: string;
      environments: Array<string>;
      tokenClaims?: Record<string, unknown> | undefined;
      createdAt: string;
      updatedAt: string;
    }
  | {
      kind: "connex-grant";
      clientId: string;
      tokenClaims?: Record<string, unknown> | undefined;
      createdAt: string;
      updatedAt: string;
    };

export type PatchV1KmsIssuersIssuerIdPoliciesKindPolicyKeyInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { issuerId: string; kind: "project-grant"; policyKey: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PatchV1KmsIssuersIssuerIdPoliciesKindPolicyKeyBody;
};

export type PatchV1KmsIssuersIssuerIdPoliciesKindPolicyKeyHandler = (
  input: PatchV1KmsIssuersIssuerIdPoliciesKindPolicyKeyInput,
) => Promise<PatchV1KmsIssuersIssuerIdPoliciesKindPolicyKeyResponse>;

export type DeleteV1KmsIssuersIssuerIdPoliciesKindPolicyKeyInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { issuerId: string; kind: "project-grant" | "connex-grant"; policyKey: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type DeleteV1KmsIssuersIssuerIdPoliciesKindPolicyKeyHandler = (
  input: DeleteV1KmsIssuersIssuerIdPoliciesKindPolicyKeyInput,
) => Promise<void>;
