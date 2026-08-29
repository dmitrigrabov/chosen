import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import {
  getV2Sandboxes,
  postV2Sandboxes,
  getV2SandboxesDrives,
  postV2SandboxesDrivesName,
  deleteV2SandboxesDrivesName,
  getV2SandboxesSnapshots,
  getV2SandboxesSnapshotsSnapshotId,
  deleteV2SandboxesSnapshotsSnapshotId,
  getV2SandboxesSessions,
  getV2SandboxesSessionsSessionId,
  getV2SandboxesName,
  patchV2SandboxesName,
  deleteV2SandboxesName,
  getV2SandboxesSessionsSessionIdCmd,
  postV2SandboxesSessionsSessionIdCmd,
  getV2SandboxesSessionsSessionIdCmdCmdId,
  postV2SandboxesSessionsSessionIdCmdCmdIdKill,
  getV2SandboxesSessionsSessionIdCmdCmdIdLogs,
  postV2SandboxesSessionsSessionIdStop,
  postV2SandboxesSessionsSessionIdExtendTimeout,
  postV2SandboxesSessionsSessionIdNetworkPolicy,
  postV2SandboxesSessionsSessionIdFsRead,
  postV2SandboxesSessionsSessionIdFsMkdir,
  postV2SandboxesSessionsSessionIdFsWrite,
  postV2SandboxesSessionsSessionIdSnapshot,
  postV2SandboxesNameFork,
  postV3Sandboxes,
  postV3SandboxesSessionsSessionIdSnapshot,
  postV3SandboxesNameFork,
  postV4Sandboxes,
} from "./handlers/sandboxes";
import type { NamedSandbox } from "packages/models/src/namedSandbox.generated.ts";
import type { Session } from "packages/models/src/session.generated.ts";
import type { SandboxPublicRoute } from "packages/models/src/sandboxPublicRoute.generated.ts";
import type { Drive } from "packages/models/src/drive.generated.ts";
import type { Snapshot } from "packages/models/src/snapshot.generated.ts";
import type { SessionCommand } from "packages/models/src/sessionCommand.generated.ts";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.get(
  "/v2/sandboxes",
  validate(
    "query",
    z.object({
      project: z.string().optional(),
      limit: z.coerce.number().gte(1).lte(50).optional(),
      sortBy: z.enum(["createdAt", "name", "statusUpdatedAt", "currentSnapshotId"]).optional(),
      namePrefix: z.string().optional(),
      cursor: z.string().optional(),
      sortOrder: z.enum(["asc", "desc"]).optional(),
      status: z.enum(["running", "stopping", "stopped"]).optional(),
      tags: z.union([z.string(), z.array(z.string())]).optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(await getV2Sandboxes({ db, env: c.env, user: c.var.user, query }));
  },
);
app.post(
  "/v2/sandboxes",
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV2SandboxesBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(await postV2Sandboxes({ db, env: c.env, user: c.var.user, query, body }));
  },
);
app.get(
  "/v2/sandboxes/drives",
  validate(
    "query",
    z.object({
      projectId: z.string().optional(),
      limit: z.coerce.number().gte(1).lte(50).optional(),
      cursor: z.string().optional(),
      sortBy: z.enum(["createdAt", "updatedAt", "name"]).optional(),
      namePrefix: z.string().optional(),
      sortOrder: z.enum(["asc", "desc"]).optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(await getV2SandboxesDrives({ db, env: c.env, user: c.var.user, query }));
  },
);
app.post(
  "/v2/sandboxes/drives/:name",
  validate(
    "param",
    z.object({
      name: z
        .string()
        .max(64)
        .regex(/^[a-zA-Z0-9_-]+$/),
    }),
  ),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV2SandboxesDrivesNameBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV2SandboxesDrivesName({ db, env: c.env, user: c.var.user, params, query, body }),
    );
  },
);
app.delete(
  "/v2/sandboxes/drives/:name",
  validate(
    "param",
    z.object({
      name: z
        .string()
        .max(64)
        .regex(/^[a-zA-Z0-9_-]+$/),
    }),
  ),
  validate(
    "query",
    z.object({
      projectId: z.string().optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await deleteV2SandboxesDrivesName({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);
app.get(
  "/v2/sandboxes/snapshots",
  validate(
    "query",
    z.object({
      project: z.string().optional(),
      name: z
        .string()
        .max(128)
        .regex(/^[a-zA-Z0-9_-]+$/)
        .optional(),
      limit: z.coerce.number().gte(1).lte(50).optional(),
      cursor: z.string().optional(),
      sortOrder: z.enum(["asc", "desc"]).optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(await getV2SandboxesSnapshots({ db, env: c.env, user: c.var.user, query }));
  },
);
app.get(
  "/v2/sandboxes/snapshots/:snapshotId",
  validate(
    "param",
    z.object({
      snapshotId: z
        .string()
        .max(33)
        .regex(/^(?:snap_[A-Za-z0-9]{28}|vhs_[a-z0-9]{28})$/),
    }),
  ),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV2SandboxesSnapshotsSnapshotId({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);
app.delete(
  "/v2/sandboxes/snapshots/:snapshotId",
  validate(
    "param",
    z.object({
      snapshotId: z
        .string()
        .max(33)
        .regex(/^(?:snap_[A-Za-z0-9]{28}|vhs_[a-z0-9]{28})$/),
    }),
  ),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await deleteV2SandboxesSnapshotsSnapshotId({
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
  "/v2/sandboxes/sessions",
  validate(
    "query",
    z.object({
      project: z.string().optional(),
      name: z
        .string()
        .max(128)
        .regex(/^[a-zA-Z0-9_-]+$/)
        .optional(),
      limit: z.coerce.number().gte(1).lte(50).optional(),
      cursor: z.string().optional(),
      sortOrder: z.enum(["asc", "desc"]).optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(await getV2SandboxesSessions({ db, env: c.env, user: c.var.user, query }));
  },
);
app.get(
  "/v2/sandboxes/sessions/:sessionId",
  validate("param", z.object({ sessionId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV2SandboxesSessionsSessionId({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);
app.get(
  "/v2/sandboxes/:name",
  validate(
    "param",
    z.object({
      name: z
        .string()
        .max(128)
        .regex(/^[a-zA-Z0-9_-]+$/),
    }),
  ),
  validate(
    "query",
    z.object({
      projectId: z.string().optional(),
      resume: z
        .preprocess((v) => (v === "true" ? true : v === "false" ? false : v), z.boolean())
        .optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(await getV2SandboxesName({ db, env: c.env, user: c.var.user, params, query }));
  },
);
app.patch(
  "/v2/sandboxes/:name",
  validate(
    "param",
    z.object({
      name: z
        .string()
        .max(128)
        .regex(/^[a-zA-Z0-9_-]+$/),
    }),
  ),
  validate(
    "query",
    z.object({
      projectId: z.string().max(128).optional(),
      resume: z
        .preprocess((v) => (v === "true" ? true : v === "false" ? false : v), z.boolean())
        .optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  validate("json", patchV2SandboxesNameBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await patchV2SandboxesName({ db, env: c.env, user: c.var.user, params, query, body }),
    );
  },
);
app.delete(
  "/v2/sandboxes/:name",
  validate(
    "param",
    z.object({
      name: z
        .string()
        .max(128)
        .regex(/^[a-zA-Z0-9_-]+$/),
    }),
  ),
  validate(
    "query",
    z.object({
      projectId: z.string().max(128).optional(),
      deleteOrphanSnapshots: z
        .preprocess((v) => (v === "true" ? true : v === "false" ? false : v), z.boolean())
        .optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(await deleteV2SandboxesName({ db, env: c.env, user: c.var.user, params, query }));
  },
);
app.get(
  "/v2/sandboxes/sessions/:sessionId/cmd",
  validate("param", z.object({ sessionId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV2SandboxesSessionsSessionIdCmd({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);
app.post(
  "/v2/sandboxes/sessions/:sessionId/cmd",
  validate("param", z.object({ sessionId: z.string() })),
  validate(
    "query",
    z.object({ cmdId: z.string(), teamId: z.string().optional(), slug: z.string().optional() }),
  ),
  validate("json", postV2SandboxesSessionsSessionIdCmdBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV2SandboxesSessionsSessionIdCmd({
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
  "/v2/sandboxes/sessions/:sessionId/cmd/:cmdId",
  validate("param", z.object({ sessionId: z.string(), cmdId: z.string() })),
  validate(
    "query",
    z.object({
      wait: z.enum(["true", "false"]).optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV2SandboxesSessionsSessionIdCmdCmdId({
        db,
        env: c.env,
        user: c.var.user,
        params,
        query,
      }),
    );
  },
);
app.post(
  "/v2/sandboxes/sessions/:sessionId/cmd/:cmdId/kill",
  validate("param", z.object({ cmdId: z.string(), sessionId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV2SandboxesSessionsSessionIdCmdCmdIdKillBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV2SandboxesSessionsSessionIdCmdCmdIdKill({
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
  "/v2/sandboxes/sessions/:sessionId/cmd/:cmdId/logs",
  validate("param", z.object({ sessionId: z.string(), cmdId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV2SandboxesSessionsSessionIdCmdCmdIdLogs({
        db,
        env: c.env,
        user: c.var.user,
        params,
        query,
      }),
    );
  },
);
app.post(
  "/v2/sandboxes/sessions/:sessionId/stop",
  validate("param", z.object({ sessionId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await postV2SandboxesSessionsSessionIdStop({
        db,
        env: c.env,
        user: c.var.user,
        params,
        query,
      }),
    );
  },
);
app.post(
  "/v2/sandboxes/sessions/:sessionId/extend-timeout",
  validate("param", z.object({ sessionId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV2SandboxesSessionsSessionIdExtendTimeoutBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV2SandboxesSessionsSessionIdExtendTimeout({
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
  "/v2/sandboxes/sessions/:sessionId/network-policy",
  validate("param", z.object({ sessionId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV2SandboxesSessionsSessionIdNetworkPolicyBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV2SandboxesSessionsSessionIdNetworkPolicy({
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
  "/v2/sandboxes/sessions/:sessionId/fs/read",
  validate("param", z.object({ sessionId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV2SandboxesSessionsSessionIdFsReadBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV2SandboxesSessionsSessionIdFsRead({
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
  "/v2/sandboxes/sessions/:sessionId/fs/mkdir",
  validate("param", z.object({ sessionId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV2SandboxesSessionsSessionIdFsMkdirBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV2SandboxesSessionsSessionIdFsMkdir({
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
  "/v2/sandboxes/sessions/:sessionId/fs/write",
  validate("param", z.object({ sessionId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await postV2SandboxesSessionsSessionIdFsWrite({
        db,
        env: c.env,
        user: c.var.user,
        params,
        query,
      }),
    );
  },
);
app.post(
  "/v2/sandboxes/sessions/:sessionId/snapshot",
  validate("param", z.object({ sessionId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV2SandboxesSessionsSessionIdSnapshotBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV2SandboxesSessionsSessionIdSnapshot({
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
app.post(
  "/v2/sandboxes/:name/fork",
  validate(
    "param",
    z.object({
      name: z
        .string()
        .max(128)
        .regex(/^[a-zA-Z0-9_-]+$/),
    }),
  ),
  validate(
    "query",
    z.object({
      projectId: z.string().max(128).optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  validate("json", postV2SandboxesNameForkBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV2SandboxesNameFork({ db, env: c.env, user: c.var.user, params, query, body }),
    );
  },
);
app.post(
  "/v3/sandboxes",
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV3SandboxesBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(await postV3Sandboxes({ db, env: c.env, user: c.var.user, query, body }));
  },
);
app.post(
  "/v3/sandboxes/sessions/:sessionId/snapshot",
  validate("param", z.object({ sessionId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV3SandboxesSessionsSessionIdSnapshotBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV3SandboxesSessionsSessionIdSnapshot({
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
app.post(
  "/v3/sandboxes/:name/fork",
  validate(
    "param",
    z.object({
      name: z
        .string()
        .max(128)
        .regex(/^[a-zA-Z0-9_-]+$/),
    }),
  ),
  validate(
    "query",
    z.object({
      projectId: z.string().max(128).optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  validate("json", postV3SandboxesNameForkBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV3SandboxesNameFork({ db, env: c.env, user: c.var.user, params, query, body }),
    );
  },
);
app.post(
  "/v4/sandboxes",
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV4SandboxesBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(await postV4Sandboxes({ db, env: c.env, user: c.var.user, query, body }));
  },
);

export type GetV2SandboxesResponse = {
  sandboxes: Array<NamedSandbox>;
  pagination: { count: number; next: string | null };
};

export type GetV2SandboxesInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: {
    project?: string | undefined;
    limit?: number | undefined;
    sortBy?: ("createdAt" | "name" | "statusUpdatedAt" | "currentSnapshotId") | undefined;
    namePrefix?: string | undefined;
    cursor?: string | undefined;
    sortOrder?: ("asc" | "desc") | undefined;
    status?: ("running" | "stopping" | "stopped") | undefined;
    tags?: (string | Array<string>) | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV2SandboxesHandler = (input: GetV2SandboxesInput) => Promise<GetV2SandboxesResponse>;

export const postV2SandboxesBody = z.object({
  networkPolicy: z
    .union([
      z.object({
        mode: z.enum(["allow-all", "deny-all", "custom", "default-allow", "default-deny"]),
        allowedDomains: z.array(z.string()).optional(),
        allowedCIDRs: z.array(z.string()).optional(),
        deniedCIDRs: z.array(z.string()).optional(),
        injectionRules: z
          .array(
            z.object({
              domain: z.string(),
              headers: z.record(z.string(), z.string()),
              match: z
                .object({
                  path: z
                    .object({ exact: z.string().optional(), startsWith: z.string().optional() })
                    .optional(),
                  method: z.array(z.string()).optional(),
                  queryString: z
                    .array(
                      z.object({
                        key: z
                          .object({
                            exact: z.string().optional(),
                            startsWith: z.string().optional(),
                          })
                          .optional(),
                        value: z
                          .object({
                            exact: z.string().optional(),
                            startsWith: z.string().optional(),
                          })
                          .optional(),
                      }),
                    )
                    .optional(),
                  headers: z
                    .array(
                      z.object({
                        key: z
                          .object({
                            exact: z.string().optional(),
                            startsWith: z.string().optional(),
                          })
                          .optional(),
                        value: z
                          .object({
                            exact: z.string().optional(),
                            startsWith: z.string().optional(),
                          })
                          .optional(),
                      }),
                    )
                    .optional(),
                })
                .optional(),
            }),
          )
          .optional(),
      }),
      z.object({
        allow: z
          .union([
            z.array(z.string()),
            z.record(
              z.string(),
              z.array(
                z.object({
                  match: z
                    .object({
                      path: z
                        .object({ exact: z.string().optional(), startsWith: z.string().optional() })
                        .optional(),
                      method: z.array(z.string()).optional(),
                      queryString: z
                        .array(
                          z.object({
                            key: z
                              .object({
                                exact: z.string().optional(),
                                startsWith: z.string().optional(),
                              })
                              .optional(),
                            value: z
                              .object({
                                exact: z.string().optional(),
                                startsWith: z.string().optional(),
                              })
                              .optional(),
                          }),
                        )
                        .optional(),
                      headers: z
                        .array(
                          z.object({
                            key: z
                              .object({
                                exact: z.string().optional(),
                                startsWith: z.string().optional(),
                              })
                              .optional(),
                            value: z
                              .object({
                                exact: z.string().optional(),
                                startsWith: z.string().optional(),
                              })
                              .optional(),
                          }),
                        )
                        .optional(),
                    })
                    .optional(),
                  transform: z
                    .array(z.object({ headers: z.record(z.string(), z.string()).optional() }))
                    .optional(),
                  forwardURL: z.string().optional(),
                }),
              ),
            ),
          ])
          .optional(),
        subnets: z
          .object({ allow: z.array(z.string()).optional(), deny: z.array(z.string()).optional() })
          .optional(),
      }),
    ])
    .optional(),
  runtime: z.enum(["node22", "node24", "node26", "python3.13"]).optional(),
  resources: z
    .object({
      vcpus: z.number().int().gte(1).optional(),
      memory: z.number().int().gte(2048).optional(),
    })
    .optional(),
  source: z
    .union([
      z.object({
        type: z.unknown(),
        url: z.string(),
        username: z.string().optional(),
        password: z.string().optional(),
        depth: z.number().int().gte(1).optional(),
        revision: z.string().optional(),
      }),
      z.object({ type: z.unknown(), url: z.string() }),
      z.object({ type: z.unknown(), snapshotId: z.string() }),
    ])
    .optional(),
  projectId: z.string().optional(),
  image: z.string().max(255).optional(),
  timeout: z.number().int().gte(1000).optional(),
  env: z.record(z.string(), z.string()).optional(),
  mounts: z
    .record(
      z.string(),
      z.object({
        drive: z
          .string()
          .max(64)
          .regex(/^[a-zA-Z0-9_-]+$/),
        mode: z.enum(["read-only", "read-write"]).optional(),
      }),
    )
    .optional(),
  region: z
    .enum([
      "iad1",
      "sfo1",
      "cle1",
      "cdg1",
      "fra1",
      "arn1",
      "sin1",
      "pdx1",
      "lhr1",
      "icn1",
      "bom1",
      "cpt1",
      "dub1",
      "gru1",
      "hkg1",
      "syd1",
      "yul1",
      "hnd1",
      "kix1",
    ])
    .optional(),
  failoverRegions: z
    .array(
      z.enum([
        "iad1",
        "sfo1",
        "cle1",
        "cdg1",
        "fra1",
        "arn1",
        "sin1",
        "pdx1",
        "lhr1",
        "icn1",
        "bom1",
        "cpt1",
        "dub1",
        "gru1",
        "hkg1",
        "syd1",
        "yul1",
        "hnd1",
        "kix1",
      ]),
    )
    .optional(),
  name: z
    .string()
    .max(128)
    .regex(/^[a-zA-Z0-9_-]+$/)
    .optional(),
  persistent: z.boolean().optional(),
  snapshotExpiration: z.union([z.unknown(), z.number().int()]).optional(),
  keepLastSnapshots: z
    .object({
      count: z.number().int().gte(1).lte(10),
      expiration: z.union([z.unknown(), z.number().int()]).optional(),
      deleteEvicted: z.boolean().optional(),
    })
    .optional(),
  tags: z.record(z.string(), z.string().max(256)).optional(),
});

export type PostV2SandboxesBody = {
  networkPolicy?:
    | (
        | {
            mode: "allow-all" | "deny-all" | "custom" | "default-allow" | "default-deny";
            allowedDomains?: Array<string> | undefined;
            allowedCIDRs?: Array<string> | undefined;
            deniedCIDRs?: Array<string> | undefined;
            injectionRules?:
              | Array<{
                  domain: string;
                  headers: Record<string, string>;
                  match?:
                    | {
                        path?:
                          | { exact?: string | undefined; startsWith?: string | undefined }
                          | undefined;
                        method?: Array<string> | undefined;
                        queryString?:
                          | Array<{
                              key?:
                                | { exact?: string | undefined; startsWith?: string | undefined }
                                | undefined;
                              value?:
                                | { exact?: string | undefined; startsWith?: string | undefined }
                                | undefined;
                            }>
                          | undefined;
                        headers?:
                          | Array<{
                              key?:
                                | { exact?: string | undefined; startsWith?: string | undefined }
                                | undefined;
                              value?:
                                | { exact?: string | undefined; startsWith?: string | undefined }
                                | undefined;
                            }>
                          | undefined;
                      }
                    | undefined;
                }>
              | undefined;
          }
        | {
            allow?:
              | (
                  | Array<string>
                  | Record<
                      string,
                      Array<{
                        match?:
                          | {
                              path?:
                                | { exact?: string | undefined; startsWith?: string | undefined }
                                | undefined;
                              method?: Array<string> | undefined;
                              queryString?:
                                | Array<{
                                    key?:
                                      | {
                                          exact?: string | undefined;
                                          startsWith?: string | undefined;
                                        }
                                      | undefined;
                                    value?:
                                      | {
                                          exact?: string | undefined;
                                          startsWith?: string | undefined;
                                        }
                                      | undefined;
                                  }>
                                | undefined;
                              headers?:
                                | Array<{
                                    key?:
                                      | {
                                          exact?: string | undefined;
                                          startsWith?: string | undefined;
                                        }
                                      | undefined;
                                    value?:
                                      | {
                                          exact?: string | undefined;
                                          startsWith?: string | undefined;
                                        }
                                      | undefined;
                                  }>
                                | undefined;
                            }
                          | undefined;
                        transform?:
                          | Array<{ headers?: Record<string, string> | undefined }>
                          | undefined;
                        forwardURL?: string | undefined;
                      }>
                    >
                )
              | undefined;
            subnets?:
              | { allow?: Array<string> | undefined; deny?: Array<string> | undefined }
              | undefined;
          }
      )
    | undefined;
  runtime?: ("node22" | "node24" | "node26" | "python3.13") | undefined;
  resources?: { vcpus?: number | undefined; memory?: number | undefined } | undefined;
  source?:
    | (
        | {
            type: unknown;
            url: string;
            username?: string | undefined;
            password?: string | undefined;
            depth?: number | undefined;
            revision?: string | undefined;
          }
        | { type: unknown; url: string }
        | { type: unknown; snapshotId: string }
      )
    | undefined;
  projectId?: string | undefined;
  image?: string | undefined;
  timeout?: number | undefined;
  env?: Record<string, string> | undefined;
  mounts?:
    | Record<string, { drive: string; mode?: ("read-only" | "read-write") | undefined }>
    | undefined;
  region?:
    | (
        | "iad1"
        | "sfo1"
        | "cle1"
        | "cdg1"
        | "fra1"
        | "arn1"
        | "sin1"
        | "pdx1"
        | "lhr1"
        | "icn1"
        | "bom1"
        | "cpt1"
        | "dub1"
        | "gru1"
        | "hkg1"
        | "syd1"
        | "yul1"
        | "hnd1"
        | "kix1"
      )
    | undefined;
  failoverRegions?:
    | Array<
        | "iad1"
        | "sfo1"
        | "cle1"
        | "cdg1"
        | "fra1"
        | "arn1"
        | "sin1"
        | "pdx1"
        | "lhr1"
        | "icn1"
        | "bom1"
        | "cpt1"
        | "dub1"
        | "gru1"
        | "hkg1"
        | "syd1"
        | "yul1"
        | "hnd1"
        | "kix1"
      >
    | undefined;
  name?: string | undefined;
  persistent?: boolean | undefined;
  snapshotExpiration?: (unknown | number) | undefined;
  keepLastSnapshots?:
    | {
        count: number;
        expiration?: (unknown | number) | undefined;
        deleteEvicted?: boolean | undefined;
      }
    | undefined;
  tags?: Record<string, string> | undefined;
};

export type PostV2SandboxesResponse = {
  sandbox: NamedSandbox;
  session: Session;
  routes: Array<SandboxPublicRoute>;
};

export type PostV2SandboxesInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV2SandboxesBody;
};

export type PostV2SandboxesHandler = (
  input: PostV2SandboxesInput,
) => Promise<PostV2SandboxesResponse>;

export type GetV2SandboxesDrivesResponse = {
  drives: Array<Drive>;
  pagination: { count: number; next: string | null };
};

export type GetV2SandboxesDrivesInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: {
    projectId?: string | undefined;
    limit?: number | undefined;
    cursor?: string | undefined;
    sortBy?: ("createdAt" | "updatedAt" | "name") | undefined;
    namePrefix?: string | undefined;
    sortOrder?: ("asc" | "desc") | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV2SandboxesDrivesHandler = (
  input: GetV2SandboxesDrivesInput,
) => Promise<GetV2SandboxesDrivesResponse>;

export const postV2SandboxesDrivesNameBody = z.object({
  projectId: z.string().optional(),
  maxSizeBytes: z.number().int().optional(),
  region: z
    .enum([
      "iad1",
      "sfo1",
      "cle1",
      "cdg1",
      "fra1",
      "arn1",
      "sin1",
      "pdx1",
      "lhr1",
      "icn1",
      "bom1",
      "cpt1",
      "dub1",
      "gru1",
      "hkg1",
      "syd1",
      "yul1",
      "hnd1",
      "kix1",
    ])
    .optional(),
});

export type PostV2SandboxesDrivesNameBody = {
  projectId?: string | undefined;
  maxSizeBytes?: number | undefined;
  region?:
    | (
        | "iad1"
        | "sfo1"
        | "cle1"
        | "cdg1"
        | "fra1"
        | "arn1"
        | "sin1"
        | "pdx1"
        | "lhr1"
        | "icn1"
        | "bom1"
        | "cpt1"
        | "dub1"
        | "gru1"
        | "hkg1"
        | "syd1"
        | "yul1"
        | "hnd1"
        | "kix1"
      )
    | undefined;
};

export type PostV2SandboxesDrivesNameResponse = { drive: Drive };

export type PostV2SandboxesDrivesNameInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { name: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV2SandboxesDrivesNameBody;
};

export type PostV2SandboxesDrivesNameHandler = (
  input: PostV2SandboxesDrivesNameInput,
) => Promise<PostV2SandboxesDrivesNameResponse>;

export type DeleteV2SandboxesDrivesNameResponse = { drive: Drive };

export type DeleteV2SandboxesDrivesNameInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { name: string };
  query: { projectId?: string | undefined; teamId?: string | undefined; slug?: string | undefined };
};

export type DeleteV2SandboxesDrivesNameHandler = (
  input: DeleteV2SandboxesDrivesNameInput,
) => Promise<DeleteV2SandboxesDrivesNameResponse>;

export type GetV2SandboxesSnapshotsResponse =
  | Record<string, never>
  | { snapshots: Array<Snapshot>; pagination: { count: number; next: string | null } };

export type GetV2SandboxesSnapshotsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: {
    project?: string | undefined;
    name?: string | undefined;
    limit?: number | undefined;
    cursor?: string | undefined;
    sortOrder?: ("asc" | "desc") | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV2SandboxesSnapshotsHandler = (
  input: GetV2SandboxesSnapshotsInput,
) => Promise<GetV2SandboxesSnapshotsResponse>;

export type GetV2SandboxesSnapshotsSnapshotIdResponse = { snapshot: Snapshot };

export type GetV2SandboxesSnapshotsSnapshotIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { snapshotId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV2SandboxesSnapshotsSnapshotIdHandler = (
  input: GetV2SandboxesSnapshotsSnapshotIdInput,
) => Promise<GetV2SandboxesSnapshotsSnapshotIdResponse>;

export type DeleteV2SandboxesSnapshotsSnapshotIdResponse = { snapshot: Snapshot };

export type DeleteV2SandboxesSnapshotsSnapshotIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { snapshotId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type DeleteV2SandboxesSnapshotsSnapshotIdHandler = (
  input: DeleteV2SandboxesSnapshotsSnapshotIdInput,
) => Promise<DeleteV2SandboxesSnapshotsSnapshotIdResponse>;

export type GetV2SandboxesSessionsResponse =
  | Record<string, never>
  | { sessions: Array<Session>; pagination: { count: number; next: string | null } };

export type GetV2SandboxesSessionsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: {
    project?: string | undefined;
    name?: string | undefined;
    limit?: number | undefined;
    cursor?: string | undefined;
    sortOrder?: ("asc" | "desc") | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV2SandboxesSessionsHandler = (
  input: GetV2SandboxesSessionsInput,
) => Promise<GetV2SandboxesSessionsResponse>;

export type GetV2SandboxesSessionsSessionIdResponse = {
  session: Session;
  routes: Array<SandboxPublicRoute>;
};

export type GetV2SandboxesSessionsSessionIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { sessionId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV2SandboxesSessionsSessionIdHandler = (
  input: GetV2SandboxesSessionsSessionIdInput,
) => Promise<GetV2SandboxesSessionsSessionIdResponse>;

export type GetV2SandboxesNameResponse = {
  sandbox: NamedSandbox;
  session: Session;
  routes: Array<SandboxPublicRoute>;
  resumed: boolean;
};

export type GetV2SandboxesNameInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { name: string };
  query: {
    projectId?: string | undefined;
    resume?: boolean | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV2SandboxesNameHandler = (
  input: GetV2SandboxesNameInput,
) => Promise<GetV2SandboxesNameResponse>;

export const patchV2SandboxesNameBody = z.object({
  resources: z
    .object({
      vcpus: z.number().int().gte(1).optional(),
      memory: z.number().int().gte(2048).optional(),
    })
    .optional(),
  runtime: z.enum(["node22", "node24", "node26", "python3.13"]).optional(),
  timeout: z.number().int().gte(1000).optional(),
  persistent: z.boolean().optional(),
  snapshotExpiration: z.union([z.unknown(), z.number().int()]).optional(),
  keepLastSnapshots: z
    .union([
      z.string(),
      z.object({
        count: z.number().int().gte(1).lte(10),
        expiration: z.union([z.unknown(), z.number().int()]).optional(),
        deleteEvicted: z.boolean().optional(),
      }),
    ])
    .optional(),
  networkPolicy: z
    .union([
      z.object({
        mode: z.enum(["allow-all", "deny-all", "custom", "default-allow", "default-deny"]),
        allowedDomains: z.array(z.string()).optional(),
        allowedCIDRs: z.array(z.string()).optional(),
        deniedCIDRs: z.array(z.string()).optional(),
        injectionRules: z
          .array(
            z.object({
              domain: z.string(),
              headers: z.record(z.string(), z.string()),
              match: z
                .object({
                  path: z
                    .object({ exact: z.string().optional(), startsWith: z.string().optional() })
                    .optional(),
                  method: z.array(z.string()).optional(),
                  queryString: z
                    .array(
                      z.object({
                        key: z
                          .object({
                            exact: z.string().optional(),
                            startsWith: z.string().optional(),
                          })
                          .optional(),
                        value: z
                          .object({
                            exact: z.string().optional(),
                            startsWith: z.string().optional(),
                          })
                          .optional(),
                      }),
                    )
                    .optional(),
                  headers: z
                    .array(
                      z.object({
                        key: z
                          .object({
                            exact: z.string().optional(),
                            startsWith: z.string().optional(),
                          })
                          .optional(),
                        value: z
                          .object({
                            exact: z.string().optional(),
                            startsWith: z.string().optional(),
                          })
                          .optional(),
                      }),
                    )
                    .optional(),
                })
                .optional(),
            }),
          )
          .optional(),
      }),
      z.object({
        allow: z
          .union([
            z.array(z.string()),
            z.record(
              z.string(),
              z.array(
                z.object({
                  match: z
                    .object({
                      path: z
                        .object({ exact: z.string().optional(), startsWith: z.string().optional() })
                        .optional(),
                      method: z.array(z.string()).optional(),
                      queryString: z
                        .array(
                          z.object({
                            key: z
                              .object({
                                exact: z.string().optional(),
                                startsWith: z.string().optional(),
                              })
                              .optional(),
                            value: z
                              .object({
                                exact: z.string().optional(),
                                startsWith: z.string().optional(),
                              })
                              .optional(),
                          }),
                        )
                        .optional(),
                      headers: z
                        .array(
                          z.object({
                            key: z
                              .object({
                                exact: z.string().optional(),
                                startsWith: z.string().optional(),
                              })
                              .optional(),
                            value: z
                              .object({
                                exact: z.string().optional(),
                                startsWith: z.string().optional(),
                              })
                              .optional(),
                          }),
                        )
                        .optional(),
                    })
                    .optional(),
                  transform: z
                    .array(z.object({ headers: z.record(z.string(), z.string()).optional() }))
                    .optional(),
                  forwardURL: z.string().optional(),
                }),
              ),
            ),
          ])
          .optional(),
        subnets: z
          .object({ allow: z.array(z.string()).optional(), deny: z.array(z.string()).optional() })
          .optional(),
      }),
    ])
    .optional(),
  region: z
    .enum([
      "iad1",
      "sfo1",
      "cle1",
      "cdg1",
      "fra1",
      "arn1",
      "sin1",
      "pdx1",
      "lhr1",
      "icn1",
      "bom1",
      "cpt1",
      "dub1",
      "gru1",
      "hkg1",
      "syd1",
      "yul1",
      "hnd1",
      "kix1",
    ])
    .optional(),
  failoverRegions: z
    .array(
      z.enum([
        "iad1",
        "sfo1",
        "cle1",
        "cdg1",
        "fra1",
        "arn1",
        "sin1",
        "pdx1",
        "lhr1",
        "icn1",
        "bom1",
        "cpt1",
        "dub1",
        "gru1",
        "hkg1",
        "syd1",
        "yul1",
        "hnd1",
        "kix1",
      ]),
    )
    .optional(),
  env: z.record(z.string(), z.string()).optional(),
  currentSnapshotId: z.string().max(128).optional(),
  tags: z.record(z.string(), z.string().max(256)).optional(),
});

export type PatchV2SandboxesNameBody = {
  resources?: { vcpus?: number | undefined; memory?: number | undefined } | undefined;
  runtime?: ("node22" | "node24" | "node26" | "python3.13") | undefined;
  timeout?: number | undefined;
  persistent?: boolean | undefined;
  snapshotExpiration?: (unknown | number) | undefined;
  keepLastSnapshots?:
    | (
        | string
        | {
            count: number;
            expiration?: (unknown | number) | undefined;
            deleteEvicted?: boolean | undefined;
          }
      )
    | undefined;
  networkPolicy?:
    | (
        | {
            mode: "allow-all" | "deny-all" | "custom" | "default-allow" | "default-deny";
            allowedDomains?: Array<string> | undefined;
            allowedCIDRs?: Array<string> | undefined;
            deniedCIDRs?: Array<string> | undefined;
            injectionRules?:
              | Array<{
                  domain: string;
                  headers: Record<string, string>;
                  match?:
                    | {
                        path?:
                          | { exact?: string | undefined; startsWith?: string | undefined }
                          | undefined;
                        method?: Array<string> | undefined;
                        queryString?:
                          | Array<{
                              key?:
                                | { exact?: string | undefined; startsWith?: string | undefined }
                                | undefined;
                              value?:
                                | { exact?: string | undefined; startsWith?: string | undefined }
                                | undefined;
                            }>
                          | undefined;
                        headers?:
                          | Array<{
                              key?:
                                | { exact?: string | undefined; startsWith?: string | undefined }
                                | undefined;
                              value?:
                                | { exact?: string | undefined; startsWith?: string | undefined }
                                | undefined;
                            }>
                          | undefined;
                      }
                    | undefined;
                }>
              | undefined;
          }
        | {
            allow?:
              | (
                  | Array<string>
                  | Record<
                      string,
                      Array<{
                        match?:
                          | {
                              path?:
                                | { exact?: string | undefined; startsWith?: string | undefined }
                                | undefined;
                              method?: Array<string> | undefined;
                              queryString?:
                                | Array<{
                                    key?:
                                      | {
                                          exact?: string | undefined;
                                          startsWith?: string | undefined;
                                        }
                                      | undefined;
                                    value?:
                                      | {
                                          exact?: string | undefined;
                                          startsWith?: string | undefined;
                                        }
                                      | undefined;
                                  }>
                                | undefined;
                              headers?:
                                | Array<{
                                    key?:
                                      | {
                                          exact?: string | undefined;
                                          startsWith?: string | undefined;
                                        }
                                      | undefined;
                                    value?:
                                      | {
                                          exact?: string | undefined;
                                          startsWith?: string | undefined;
                                        }
                                      | undefined;
                                  }>
                                | undefined;
                            }
                          | undefined;
                        transform?:
                          | Array<{ headers?: Record<string, string> | undefined }>
                          | undefined;
                        forwardURL?: string | undefined;
                      }>
                    >
                )
              | undefined;
            subnets?:
              | { allow?: Array<string> | undefined; deny?: Array<string> | undefined }
              | undefined;
          }
      )
    | undefined;
  region?:
    | (
        | "iad1"
        | "sfo1"
        | "cle1"
        | "cdg1"
        | "fra1"
        | "arn1"
        | "sin1"
        | "pdx1"
        | "lhr1"
        | "icn1"
        | "bom1"
        | "cpt1"
        | "dub1"
        | "gru1"
        | "hkg1"
        | "syd1"
        | "yul1"
        | "hnd1"
        | "kix1"
      )
    | undefined;
  failoverRegions?:
    | Array<
        | "iad1"
        | "sfo1"
        | "cle1"
        | "cdg1"
        | "fra1"
        | "arn1"
        | "sin1"
        | "pdx1"
        | "lhr1"
        | "icn1"
        | "bom1"
        | "cpt1"
        | "dub1"
        | "gru1"
        | "hkg1"
        | "syd1"
        | "yul1"
        | "hnd1"
        | "kix1"
      >
    | undefined;
  env?: Record<string, string> | undefined;
  currentSnapshotId?: string | undefined;
  tags?: Record<string, string> | undefined;
};

export type PatchV2SandboxesNameResponse =
  | { routes: Array<SandboxPublicRoute>; sandbox: NamedSandbox }
  | {
      sandbox: NamedSandbox;
      session: Session;
      routes: Array<SandboxPublicRoute>;
      resumed: boolean;
    };

export type PatchV2SandboxesNameInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { name: string };
  query: {
    projectId?: string | undefined;
    resume?: boolean | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
  body: PatchV2SandboxesNameBody;
};

export type PatchV2SandboxesNameHandler = (
  input: PatchV2SandboxesNameInput,
) => Promise<PatchV2SandboxesNameResponse>;

export type DeleteV2SandboxesNameResponse = { sandbox: NamedSandbox };

export type DeleteV2SandboxesNameInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { name: string };
  query: {
    projectId?: string | undefined;
    deleteOrphanSnapshots?: boolean | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type DeleteV2SandboxesNameHandler = (
  input: DeleteV2SandboxesNameInput,
) => Promise<DeleteV2SandboxesNameResponse>;

export type GetV2SandboxesSessionsSessionIdCmdResponse = { commands: Array<SessionCommand> };

export type GetV2SandboxesSessionsSessionIdCmdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { sessionId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV2SandboxesSessionsSessionIdCmdHandler = (
  input: GetV2SandboxesSessionsSessionIdCmdInput,
) => Promise<GetV2SandboxesSessionsSessionIdCmdResponse>;

export const postV2SandboxesSessionsSessionIdCmdBody = z.object({
  command: z.string(),
  args: z.array(z.string()).optional(),
  cwd: z.string().optional(),
  env: z.record(z.string(), z.string()).optional(),
  sudo: z.boolean().optional(),
  wait: z.boolean().optional(),
  logs: z.boolean().optional(),
  timeout: z.number().int().gte(100).lte(18000000).optional(),
});

export type PostV2SandboxesSessionsSessionIdCmdBody = {
  command: string;
  args?: Array<string> | undefined;
  cwd?: string | undefined;
  env?: Record<string, string> | undefined;
  sudo?: boolean | undefined;
  wait?: boolean | undefined;
  logs?: boolean | undefined;
  timeout?: number | undefined;
};

export type PostV2SandboxesSessionsSessionIdCmdResponse = { command: SessionCommand };

export type PostV2SandboxesSessionsSessionIdCmdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { sessionId: string };
  query: { cmdId: string; teamId?: string | undefined; slug?: string | undefined };
  body: PostV2SandboxesSessionsSessionIdCmdBody;
};

export type PostV2SandboxesSessionsSessionIdCmdHandler = (
  input: PostV2SandboxesSessionsSessionIdCmdInput,
) => Promise<PostV2SandboxesSessionsSessionIdCmdResponse>;

export type GetV2SandboxesSessionsSessionIdCmdCmdIdResponse = { command: SessionCommand };

export type GetV2SandboxesSessionsSessionIdCmdCmdIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { sessionId: string; cmdId: string };
  query: {
    wait?: ("true" | "false") | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV2SandboxesSessionsSessionIdCmdCmdIdHandler = (
  input: GetV2SandboxesSessionsSessionIdCmdCmdIdInput,
) => Promise<GetV2SandboxesSessionsSessionIdCmdCmdIdResponse>;

export const postV2SandboxesSessionsSessionIdCmdCmdIdKillBody = z.object({ signal: z.number() });

export type PostV2SandboxesSessionsSessionIdCmdCmdIdKillBody = { signal: number };

export type PostV2SandboxesSessionsSessionIdCmdCmdIdKillResponse = { command: SessionCommand };

export type PostV2SandboxesSessionsSessionIdCmdCmdIdKillInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { cmdId: string; sessionId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV2SandboxesSessionsSessionIdCmdCmdIdKillBody;
};

export type PostV2SandboxesSessionsSessionIdCmdCmdIdKillHandler = (
  input: PostV2SandboxesSessionsSessionIdCmdCmdIdKillInput,
) => Promise<PostV2SandboxesSessionsSessionIdCmdCmdIdKillResponse>;

export type GetV2SandboxesSessionsSessionIdCmdCmdIdLogsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { sessionId: string; cmdId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV2SandboxesSessionsSessionIdCmdCmdIdLogsHandler = (
  input: GetV2SandboxesSessionsSessionIdCmdCmdIdLogsInput,
) => Promise<void>;

export type PostV2SandboxesSessionsSessionIdStopResponse =
  | { session: Session }
  | { snapshot: Snapshot; sandbox: NamedSandbox; session: Session };

export type PostV2SandboxesSessionsSessionIdStopInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { sessionId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type PostV2SandboxesSessionsSessionIdStopHandler = (
  input: PostV2SandboxesSessionsSessionIdStopInput,
) => Promise<PostV2SandboxesSessionsSessionIdStopResponse>;

export const postV2SandboxesSessionsSessionIdExtendTimeoutBody = z.object({
  duration: z.number().gte(1000),
});

export type PostV2SandboxesSessionsSessionIdExtendTimeoutBody = { duration: number };

export type PostV2SandboxesSessionsSessionIdExtendTimeoutResponse = { session: Session };

export type PostV2SandboxesSessionsSessionIdExtendTimeoutInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { sessionId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV2SandboxesSessionsSessionIdExtendTimeoutBody;
};

export type PostV2SandboxesSessionsSessionIdExtendTimeoutHandler = (
  input: PostV2SandboxesSessionsSessionIdExtendTimeoutInput,
) => Promise<PostV2SandboxesSessionsSessionIdExtendTimeoutResponse>;

export const postV2SandboxesSessionsSessionIdNetworkPolicyBody = z.union([
  z.object({
    mode: z.enum(["allow-all", "deny-all", "custom", "default-allow", "default-deny"]),
    allowedDomains: z.array(z.string()).optional(),
    allowedCIDRs: z.array(z.string()).optional(),
    deniedCIDRs: z.array(z.string()).optional(),
    injectionRules: z
      .array(
        z.object({
          domain: z.string(),
          headers: z.record(z.string(), z.string()),
          match: z
            .object({
              path: z
                .object({ exact: z.string().optional(), startsWith: z.string().optional() })
                .optional(),
              method: z.array(z.string()).optional(),
              queryString: z
                .array(
                  z.object({
                    key: z
                      .object({ exact: z.string().optional(), startsWith: z.string().optional() })
                      .optional(),
                    value: z
                      .object({ exact: z.string().optional(), startsWith: z.string().optional() })
                      .optional(),
                  }),
                )
                .optional(),
              headers: z
                .array(
                  z.object({
                    key: z
                      .object({ exact: z.string().optional(), startsWith: z.string().optional() })
                      .optional(),
                    value: z
                      .object({ exact: z.string().optional(), startsWith: z.string().optional() })
                      .optional(),
                  }),
                )
                .optional(),
            })
            .optional(),
        }),
      )
      .optional(),
  }),
  z.object({
    allow: z
      .union([
        z.array(z.string()),
        z.record(
          z.string(),
          z.array(
            z.object({
              match: z
                .object({
                  path: z
                    .object({ exact: z.string().optional(), startsWith: z.string().optional() })
                    .optional(),
                  method: z.array(z.string()).optional(),
                  queryString: z
                    .array(
                      z.object({
                        key: z
                          .object({
                            exact: z.string().optional(),
                            startsWith: z.string().optional(),
                          })
                          .optional(),
                        value: z
                          .object({
                            exact: z.string().optional(),
                            startsWith: z.string().optional(),
                          })
                          .optional(),
                      }),
                    )
                    .optional(),
                  headers: z
                    .array(
                      z.object({
                        key: z
                          .object({
                            exact: z.string().optional(),
                            startsWith: z.string().optional(),
                          })
                          .optional(),
                        value: z
                          .object({
                            exact: z.string().optional(),
                            startsWith: z.string().optional(),
                          })
                          .optional(),
                      }),
                    )
                    .optional(),
                })
                .optional(),
              transform: z
                .array(z.object({ headers: z.record(z.string(), z.string()).optional() }))
                .optional(),
              forwardURL: z.string().optional(),
            }),
          ),
        ),
      ])
      .optional(),
    subnets: z
      .object({ allow: z.array(z.string()).optional(), deny: z.array(z.string()).optional() })
      .optional(),
  }),
]);

export type PostV2SandboxesSessionsSessionIdNetworkPolicyBody =
  | {
      mode: "allow-all" | "deny-all" | "custom" | "default-allow" | "default-deny";
      allowedDomains?: Array<string> | undefined;
      allowedCIDRs?: Array<string> | undefined;
      deniedCIDRs?: Array<string> | undefined;
      injectionRules?:
        | Array<{
            domain: string;
            headers: Record<string, string>;
            match?:
              | {
                  path?:
                    | { exact?: string | undefined; startsWith?: string | undefined }
                    | undefined;
                  method?: Array<string> | undefined;
                  queryString?:
                    | Array<{
                        key?:
                          | { exact?: string | undefined; startsWith?: string | undefined }
                          | undefined;
                        value?:
                          | { exact?: string | undefined; startsWith?: string | undefined }
                          | undefined;
                      }>
                    | undefined;
                  headers?:
                    | Array<{
                        key?:
                          | { exact?: string | undefined; startsWith?: string | undefined }
                          | undefined;
                        value?:
                          | { exact?: string | undefined; startsWith?: string | undefined }
                          | undefined;
                      }>
                    | undefined;
                }
              | undefined;
          }>
        | undefined;
    }
  | {
      allow?:
        | (
            | Array<string>
            | Record<
                string,
                Array<{
                  match?:
                    | {
                        path?:
                          | { exact?: string | undefined; startsWith?: string | undefined }
                          | undefined;
                        method?: Array<string> | undefined;
                        queryString?:
                          | Array<{
                              key?:
                                | { exact?: string | undefined; startsWith?: string | undefined }
                                | undefined;
                              value?:
                                | { exact?: string | undefined; startsWith?: string | undefined }
                                | undefined;
                            }>
                          | undefined;
                        headers?:
                          | Array<{
                              key?:
                                | { exact?: string | undefined; startsWith?: string | undefined }
                                | undefined;
                              value?:
                                | { exact?: string | undefined; startsWith?: string | undefined }
                                | undefined;
                            }>
                          | undefined;
                      }
                    | undefined;
                  transform?: Array<{ headers?: Record<string, string> | undefined }> | undefined;
                  forwardURL?: string | undefined;
                }>
              >
          )
        | undefined;
      subnets?: { allow?: Array<string> | undefined; deny?: Array<string> | undefined } | undefined;
    };

export type PostV2SandboxesSessionsSessionIdNetworkPolicyResponse = { session: Session };

export type PostV2SandboxesSessionsSessionIdNetworkPolicyInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { sessionId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV2SandboxesSessionsSessionIdNetworkPolicyBody;
};

export type PostV2SandboxesSessionsSessionIdNetworkPolicyHandler = (
  input: PostV2SandboxesSessionsSessionIdNetworkPolicyInput,
) => Promise<PostV2SandboxesSessionsSessionIdNetworkPolicyResponse>;

export const postV2SandboxesSessionsSessionIdFsReadBody = z.object({
  cwd: z.string().optional(),
  path: z.string(),
});

export type PostV2SandboxesSessionsSessionIdFsReadBody = { cwd?: string | undefined; path: string };

export type PostV2SandboxesSessionsSessionIdFsReadInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { sessionId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV2SandboxesSessionsSessionIdFsReadBody;
};

export type PostV2SandboxesSessionsSessionIdFsReadHandler = (
  input: PostV2SandboxesSessionsSessionIdFsReadInput,
) => Promise<void>;

export const postV2SandboxesSessionsSessionIdFsMkdirBody = z.object({
  cwd: z.string().optional(),
  path: z.string(),
  recursive: z.boolean().optional(),
});

export type PostV2SandboxesSessionsSessionIdFsMkdirBody = {
  cwd?: string | undefined;
  path: string;
  recursive?: boolean | undefined;
};

export type PostV2SandboxesSessionsSessionIdFsMkdirResponse = Record<string, never>;

export type PostV2SandboxesSessionsSessionIdFsMkdirInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { sessionId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV2SandboxesSessionsSessionIdFsMkdirBody;
};

export type PostV2SandboxesSessionsSessionIdFsMkdirHandler = (
  input: PostV2SandboxesSessionsSessionIdFsMkdirInput,
) => Promise<PostV2SandboxesSessionsSessionIdFsMkdirResponse>;

export type PostV2SandboxesSessionsSessionIdFsWriteResponse = Record<string, never>;

export type PostV2SandboxesSessionsSessionIdFsWriteInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { sessionId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type PostV2SandboxesSessionsSessionIdFsWriteHandler = (
  input: PostV2SandboxesSessionsSessionIdFsWriteInput,
) => Promise<PostV2SandboxesSessionsSessionIdFsWriteResponse>;

export const postV2SandboxesSessionsSessionIdSnapshotBody = z.object({
  expiration: z.union([z.unknown(), z.number().int()]).optional(),
});

export type PostV2SandboxesSessionsSessionIdSnapshotBody = {
  expiration?: (unknown | number) | undefined;
};

export type PostV2SandboxesSessionsSessionIdSnapshotResponse = {
  snapshot: Snapshot;
  session: Session;
};

export type PostV2SandboxesSessionsSessionIdSnapshotInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { sessionId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV2SandboxesSessionsSessionIdSnapshotBody;
};

export type PostV2SandboxesSessionsSessionIdSnapshotHandler = (
  input: PostV2SandboxesSessionsSessionIdSnapshotInput,
) => Promise<PostV2SandboxesSessionsSessionIdSnapshotResponse>;

export const postV2SandboxesNameForkBody = z.object({
  networkPolicy: z
    .union([
      z.object({
        mode: z.enum(["allow-all", "deny-all", "custom", "default-allow", "default-deny"]),
        allowedDomains: z.array(z.string()).optional(),
        allowedCIDRs: z.array(z.string()).optional(),
        deniedCIDRs: z.array(z.string()).optional(),
        injectionRules: z
          .array(
            z.object({
              domain: z.string(),
              headers: z.record(z.string(), z.string()),
              match: z
                .object({
                  path: z
                    .object({ exact: z.string().optional(), startsWith: z.string().optional() })
                    .optional(),
                  method: z.array(z.string()).optional(),
                  queryString: z
                    .array(
                      z.object({
                        key: z
                          .object({
                            exact: z.string().optional(),
                            startsWith: z.string().optional(),
                          })
                          .optional(),
                        value: z
                          .object({
                            exact: z.string().optional(),
                            startsWith: z.string().optional(),
                          })
                          .optional(),
                      }),
                    )
                    .optional(),
                  headers: z
                    .array(
                      z.object({
                        key: z
                          .object({
                            exact: z.string().optional(),
                            startsWith: z.string().optional(),
                          })
                          .optional(),
                        value: z
                          .object({
                            exact: z.string().optional(),
                            startsWith: z.string().optional(),
                          })
                          .optional(),
                      }),
                    )
                    .optional(),
                })
                .optional(),
            }),
          )
          .optional(),
      }),
      z.object({
        allow: z
          .union([
            z.array(z.string()),
            z.record(
              z.string(),
              z.array(
                z.object({
                  match: z
                    .object({
                      path: z
                        .object({ exact: z.string().optional(), startsWith: z.string().optional() })
                        .optional(),
                      method: z.array(z.string()).optional(),
                      queryString: z
                        .array(
                          z.object({
                            key: z
                              .object({
                                exact: z.string().optional(),
                                startsWith: z.string().optional(),
                              })
                              .optional(),
                            value: z
                              .object({
                                exact: z.string().optional(),
                                startsWith: z.string().optional(),
                              })
                              .optional(),
                          }),
                        )
                        .optional(),
                      headers: z
                        .array(
                          z.object({
                            key: z
                              .object({
                                exact: z.string().optional(),
                                startsWith: z.string().optional(),
                              })
                              .optional(),
                            value: z
                              .object({
                                exact: z.string().optional(),
                                startsWith: z.string().optional(),
                              })
                              .optional(),
                          }),
                        )
                        .optional(),
                    })
                    .optional(),
                  transform: z
                    .array(z.object({ headers: z.record(z.string(), z.string()).optional() }))
                    .optional(),
                  forwardURL: z.string().optional(),
                }),
              ),
            ),
          ])
          .optional(),
        subnets: z
          .object({ allow: z.array(z.string()).optional(), deny: z.array(z.string()).optional() })
          .optional(),
      }),
    ])
    .optional(),
  resources: z
    .object({
      vcpus: z.number().int().gte(1).optional(),
      memory: z.number().int().gte(2048).optional(),
    })
    .optional(),
  image: z.string().max(255).optional(),
  timeout: z.number().int().gte(1000).optional(),
  env: z.record(z.string(), z.string()).optional(),
  mounts: z
    .record(
      z.string(),
      z.object({
        drive: z
          .string()
          .max(64)
          .regex(/^[a-zA-Z0-9_-]+$/),
        mode: z.enum(["read-only", "read-write"]).optional(),
      }),
    )
    .optional(),
  region: z
    .enum([
      "iad1",
      "sfo1",
      "cle1",
      "cdg1",
      "fra1",
      "arn1",
      "sin1",
      "pdx1",
      "lhr1",
      "icn1",
      "bom1",
      "cpt1",
      "dub1",
      "gru1",
      "hkg1",
      "syd1",
      "yul1",
      "hnd1",
      "kix1",
    ])
    .optional(),
  failoverRegions: z
    .array(
      z.enum([
        "iad1",
        "sfo1",
        "cle1",
        "cdg1",
        "fra1",
        "arn1",
        "sin1",
        "pdx1",
        "lhr1",
        "icn1",
        "bom1",
        "cpt1",
        "dub1",
        "gru1",
        "hkg1",
        "syd1",
        "yul1",
        "hnd1",
        "kix1",
      ]),
    )
    .optional(),
  name: z
    .string()
    .max(128)
    .regex(/^[a-zA-Z0-9_-]+$/)
    .optional(),
  persistent: z.boolean().optional(),
  snapshotExpiration: z.union([z.unknown(), z.number().int()]).optional(),
  keepLastSnapshots: z
    .object({
      count: z.number().int().gte(1).lte(10),
      expiration: z.union([z.unknown(), z.number().int()]).optional(),
      deleteEvicted: z.boolean().optional(),
    })
    .optional(),
  tags: z.record(z.string(), z.string().max(256)).optional(),
});

export type PostV2SandboxesNameForkBody = {
  networkPolicy?:
    | (
        | {
            mode: "allow-all" | "deny-all" | "custom" | "default-allow" | "default-deny";
            allowedDomains?: Array<string> | undefined;
            allowedCIDRs?: Array<string> | undefined;
            deniedCIDRs?: Array<string> | undefined;
            injectionRules?:
              | Array<{
                  domain: string;
                  headers: Record<string, string>;
                  match?:
                    | {
                        path?:
                          | { exact?: string | undefined; startsWith?: string | undefined }
                          | undefined;
                        method?: Array<string> | undefined;
                        queryString?:
                          | Array<{
                              key?:
                                | { exact?: string | undefined; startsWith?: string | undefined }
                                | undefined;
                              value?:
                                | { exact?: string | undefined; startsWith?: string | undefined }
                                | undefined;
                            }>
                          | undefined;
                        headers?:
                          | Array<{
                              key?:
                                | { exact?: string | undefined; startsWith?: string | undefined }
                                | undefined;
                              value?:
                                | { exact?: string | undefined; startsWith?: string | undefined }
                                | undefined;
                            }>
                          | undefined;
                      }
                    | undefined;
                }>
              | undefined;
          }
        | {
            allow?:
              | (
                  | Array<string>
                  | Record<
                      string,
                      Array<{
                        match?:
                          | {
                              path?:
                                | { exact?: string | undefined; startsWith?: string | undefined }
                                | undefined;
                              method?: Array<string> | undefined;
                              queryString?:
                                | Array<{
                                    key?:
                                      | {
                                          exact?: string | undefined;
                                          startsWith?: string | undefined;
                                        }
                                      | undefined;
                                    value?:
                                      | {
                                          exact?: string | undefined;
                                          startsWith?: string | undefined;
                                        }
                                      | undefined;
                                  }>
                                | undefined;
                              headers?:
                                | Array<{
                                    key?:
                                      | {
                                          exact?: string | undefined;
                                          startsWith?: string | undefined;
                                        }
                                      | undefined;
                                    value?:
                                      | {
                                          exact?: string | undefined;
                                          startsWith?: string | undefined;
                                        }
                                      | undefined;
                                  }>
                                | undefined;
                            }
                          | undefined;
                        transform?:
                          | Array<{ headers?: Record<string, string> | undefined }>
                          | undefined;
                        forwardURL?: string | undefined;
                      }>
                    >
                )
              | undefined;
            subnets?:
              | { allow?: Array<string> | undefined; deny?: Array<string> | undefined }
              | undefined;
          }
      )
    | undefined;
  resources?: { vcpus?: number | undefined; memory?: number | undefined } | undefined;
  image?: string | undefined;
  timeout?: number | undefined;
  env?: Record<string, string> | undefined;
  mounts?:
    | Record<string, { drive: string; mode?: ("read-only" | "read-write") | undefined }>
    | undefined;
  region?:
    | (
        | "iad1"
        | "sfo1"
        | "cle1"
        | "cdg1"
        | "fra1"
        | "arn1"
        | "sin1"
        | "pdx1"
        | "lhr1"
        | "icn1"
        | "bom1"
        | "cpt1"
        | "dub1"
        | "gru1"
        | "hkg1"
        | "syd1"
        | "yul1"
        | "hnd1"
        | "kix1"
      )
    | undefined;
  failoverRegions?:
    | Array<
        | "iad1"
        | "sfo1"
        | "cle1"
        | "cdg1"
        | "fra1"
        | "arn1"
        | "sin1"
        | "pdx1"
        | "lhr1"
        | "icn1"
        | "bom1"
        | "cpt1"
        | "dub1"
        | "gru1"
        | "hkg1"
        | "syd1"
        | "yul1"
        | "hnd1"
        | "kix1"
      >
    | undefined;
  name?: string | undefined;
  persistent?: boolean | undefined;
  snapshotExpiration?: (unknown | number) | undefined;
  keepLastSnapshots?:
    | {
        count: number;
        expiration?: (unknown | number) | undefined;
        deleteEvicted?: boolean | undefined;
      }
    | undefined;
  tags?: Record<string, string> | undefined;
};

export type PostV2SandboxesNameForkResponse = {
  sandbox: NamedSandbox;
  session: Session;
  routes: Array<SandboxPublicRoute>;
};

export type PostV2SandboxesNameForkInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { name: string };
  query: { projectId?: string | undefined; teamId?: string | undefined; slug?: string | undefined };
  body: PostV2SandboxesNameForkBody;
};

export type PostV2SandboxesNameForkHandler = (
  input: PostV2SandboxesNameForkInput,
) => Promise<PostV2SandboxesNameForkResponse>;

export const postV3SandboxesBody = z.object({
  networkPolicy: z
    .union([
      z.object({
        mode: z.enum(["allow-all", "deny-all", "custom", "default-allow", "default-deny"]),
        allowedDomains: z.array(z.string()).optional(),
        allowedCIDRs: z.array(z.string()).optional(),
        deniedCIDRs: z.array(z.string()).optional(),
        injectionRules: z
          .array(
            z.object({
              domain: z.string(),
              headers: z.record(z.string(), z.string()),
              match: z
                .object({
                  path: z
                    .object({ exact: z.string().optional(), startsWith: z.string().optional() })
                    .optional(),
                  method: z.array(z.string()).optional(),
                  queryString: z
                    .array(
                      z.object({
                        key: z
                          .object({
                            exact: z.string().optional(),
                            startsWith: z.string().optional(),
                          })
                          .optional(),
                        value: z
                          .object({
                            exact: z.string().optional(),
                            startsWith: z.string().optional(),
                          })
                          .optional(),
                      }),
                    )
                    .optional(),
                  headers: z
                    .array(
                      z.object({
                        key: z
                          .object({
                            exact: z.string().optional(),
                            startsWith: z.string().optional(),
                          })
                          .optional(),
                        value: z
                          .object({
                            exact: z.string().optional(),
                            startsWith: z.string().optional(),
                          })
                          .optional(),
                      }),
                    )
                    .optional(),
                })
                .optional(),
            }),
          )
          .optional(),
      }),
      z.object({
        allow: z
          .union([
            z.array(z.string()),
            z.record(
              z.string(),
              z.array(
                z.object({
                  match: z
                    .object({
                      path: z
                        .object({ exact: z.string().optional(), startsWith: z.string().optional() })
                        .optional(),
                      method: z.array(z.string()).optional(),
                      queryString: z
                        .array(
                          z.object({
                            key: z
                              .object({
                                exact: z.string().optional(),
                                startsWith: z.string().optional(),
                              })
                              .optional(),
                            value: z
                              .object({
                                exact: z.string().optional(),
                                startsWith: z.string().optional(),
                              })
                              .optional(),
                          }),
                        )
                        .optional(),
                      headers: z
                        .array(
                          z.object({
                            key: z
                              .object({
                                exact: z.string().optional(),
                                startsWith: z.string().optional(),
                              })
                              .optional(),
                            value: z
                              .object({
                                exact: z.string().optional(),
                                startsWith: z.string().optional(),
                              })
                              .optional(),
                          }),
                        )
                        .optional(),
                    })
                    .optional(),
                  transform: z
                    .array(z.object({ headers: z.record(z.string(), z.string()).optional() }))
                    .optional(),
                  forwardURL: z.string().optional(),
                }),
              ),
            ),
          ])
          .optional(),
        subnets: z
          .object({ allow: z.array(z.string()).optional(), deny: z.array(z.string()).optional() })
          .optional(),
      }),
    ])
    .optional(),
  resources: z
    .object({
      vcpus: z.number().int().gte(1).optional(),
      memory: z.number().int().gte(2048).optional(),
    })
    .optional(),
  source: z
    .union([
      z.object({
        type: z.unknown(),
        url: z.string(),
        username: z.string().optional(),
        password: z.string().optional(),
        depth: z.number().int().gte(1).optional(),
        revision: z.string().optional(),
      }),
      z.object({ type: z.unknown(), url: z.string() }),
      z.object({ type: z.unknown(), snapshotId: z.string() }),
    ])
    .optional(),
  projectId: z.string().optional(),
  image: z.string().max(255).optional(),
  timeout: z.number().int().gte(1000).optional(),
  env: z.record(z.string(), z.string()).optional(),
  mounts: z
    .record(
      z.string(),
      z.object({
        drive: z
          .string()
          .max(64)
          .regex(/^[a-zA-Z0-9_-]+$/),
        mode: z.enum(["read-only", "read-write"]).optional(),
      }),
    )
    .optional(),
  region: z
    .enum([
      "iad1",
      "sfo1",
      "cle1",
      "cdg1",
      "fra1",
      "arn1",
      "sin1",
      "pdx1",
      "lhr1",
      "icn1",
      "bom1",
      "cpt1",
      "dub1",
      "gru1",
      "hkg1",
      "syd1",
      "yul1",
      "hnd1",
      "kix1",
    ])
    .optional(),
  failoverRegions: z
    .array(
      z.enum([
        "iad1",
        "sfo1",
        "cle1",
        "cdg1",
        "fra1",
        "arn1",
        "sin1",
        "pdx1",
        "lhr1",
        "icn1",
        "bom1",
        "cpt1",
        "dub1",
        "gru1",
        "hkg1",
        "syd1",
        "yul1",
        "hnd1",
        "kix1",
      ]),
    )
    .optional(),
  name: z
    .string()
    .max(128)
    .regex(/^[a-zA-Z0-9_-]+$/)
    .optional(),
  persistent: z.boolean().optional(),
  snapshotExpiration: z.union([z.unknown(), z.number().int()]).optional(),
  keepLastSnapshots: z
    .object({
      count: z.number().int().gte(1).lte(10),
      expiration: z.union([z.unknown(), z.number().int()]).optional(),
      deleteEvicted: z.boolean().optional(),
    })
    .optional(),
  tags: z.record(z.string(), z.string().max(256)).optional(),
});

export type PostV3SandboxesBody = {
  networkPolicy?:
    | (
        | {
            mode: "allow-all" | "deny-all" | "custom" | "default-allow" | "default-deny";
            allowedDomains?: Array<string> | undefined;
            allowedCIDRs?: Array<string> | undefined;
            deniedCIDRs?: Array<string> | undefined;
            injectionRules?:
              | Array<{
                  domain: string;
                  headers: Record<string, string>;
                  match?:
                    | {
                        path?:
                          | { exact?: string | undefined; startsWith?: string | undefined }
                          | undefined;
                        method?: Array<string> | undefined;
                        queryString?:
                          | Array<{
                              key?:
                                | { exact?: string | undefined; startsWith?: string | undefined }
                                | undefined;
                              value?:
                                | { exact?: string | undefined; startsWith?: string | undefined }
                                | undefined;
                            }>
                          | undefined;
                        headers?:
                          | Array<{
                              key?:
                                | { exact?: string | undefined; startsWith?: string | undefined }
                                | undefined;
                              value?:
                                | { exact?: string | undefined; startsWith?: string | undefined }
                                | undefined;
                            }>
                          | undefined;
                      }
                    | undefined;
                }>
              | undefined;
          }
        | {
            allow?:
              | (
                  | Array<string>
                  | Record<
                      string,
                      Array<{
                        match?:
                          | {
                              path?:
                                | { exact?: string | undefined; startsWith?: string | undefined }
                                | undefined;
                              method?: Array<string> | undefined;
                              queryString?:
                                | Array<{
                                    key?:
                                      | {
                                          exact?: string | undefined;
                                          startsWith?: string | undefined;
                                        }
                                      | undefined;
                                    value?:
                                      | {
                                          exact?: string | undefined;
                                          startsWith?: string | undefined;
                                        }
                                      | undefined;
                                  }>
                                | undefined;
                              headers?:
                                | Array<{
                                    key?:
                                      | {
                                          exact?: string | undefined;
                                          startsWith?: string | undefined;
                                        }
                                      | undefined;
                                    value?:
                                      | {
                                          exact?: string | undefined;
                                          startsWith?: string | undefined;
                                        }
                                      | undefined;
                                  }>
                                | undefined;
                            }
                          | undefined;
                        transform?:
                          | Array<{ headers?: Record<string, string> | undefined }>
                          | undefined;
                        forwardURL?: string | undefined;
                      }>
                    >
                )
              | undefined;
            subnets?:
              | { allow?: Array<string> | undefined; deny?: Array<string> | undefined }
              | undefined;
          }
      )
    | undefined;
  resources?: { vcpus?: number | undefined; memory?: number | undefined } | undefined;
  source?:
    | (
        | {
            type: unknown;
            url: string;
            username?: string | undefined;
            password?: string | undefined;
            depth?: number | undefined;
            revision?: string | undefined;
          }
        | { type: unknown; url: string }
        | { type: unknown; snapshotId: string }
      )
    | undefined;
  projectId?: string | undefined;
  image?: string | undefined;
  timeout?: number | undefined;
  env?: Record<string, string> | undefined;
  mounts?:
    | Record<string, { drive: string; mode?: ("read-only" | "read-write") | undefined }>
    | undefined;
  region?:
    | (
        | "iad1"
        | "sfo1"
        | "cle1"
        | "cdg1"
        | "fra1"
        | "arn1"
        | "sin1"
        | "pdx1"
        | "lhr1"
        | "icn1"
        | "bom1"
        | "cpt1"
        | "dub1"
        | "gru1"
        | "hkg1"
        | "syd1"
        | "yul1"
        | "hnd1"
        | "kix1"
      )
    | undefined;
  failoverRegions?:
    | Array<
        | "iad1"
        | "sfo1"
        | "cle1"
        | "cdg1"
        | "fra1"
        | "arn1"
        | "sin1"
        | "pdx1"
        | "lhr1"
        | "icn1"
        | "bom1"
        | "cpt1"
        | "dub1"
        | "gru1"
        | "hkg1"
        | "syd1"
        | "yul1"
        | "hnd1"
        | "kix1"
      >
    | undefined;
  name?: string | undefined;
  persistent?: boolean | undefined;
  snapshotExpiration?: (unknown | number) | undefined;
  keepLastSnapshots?:
    | {
        count: number;
        expiration?: (unknown | number) | undefined;
        deleteEvicted?: boolean | undefined;
      }
    | undefined;
  tags?: Record<string, string> | undefined;
};

export type PostV3SandboxesResponse = {
  sandbox: NamedSandbox;
  session: Session;
  routes: Array<SandboxPublicRoute>;
};

export type PostV3SandboxesInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV3SandboxesBody;
};

export type PostV3SandboxesHandler = (
  input: PostV3SandboxesInput,
) => Promise<PostV3SandboxesResponse>;

export const postV3SandboxesSessionsSessionIdSnapshotBody = z.object({
  expiration: z.union([z.unknown(), z.number().int()]).optional(),
});

export type PostV3SandboxesSessionsSessionIdSnapshotBody = {
  expiration?: (unknown | number) | undefined;
};

export type PostV3SandboxesSessionsSessionIdSnapshotResponse = {
  snapshot: Snapshot;
  session: Session;
};

export type PostV3SandboxesSessionsSessionIdSnapshotInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { sessionId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV3SandboxesSessionsSessionIdSnapshotBody;
};

export type PostV3SandboxesSessionsSessionIdSnapshotHandler = (
  input: PostV3SandboxesSessionsSessionIdSnapshotInput,
) => Promise<PostV3SandboxesSessionsSessionIdSnapshotResponse>;

export const postV3SandboxesNameForkBody = z.object({
  networkPolicy: z
    .union([
      z.object({
        mode: z.enum(["allow-all", "deny-all", "custom", "default-allow", "default-deny"]),
        allowedDomains: z.array(z.string()).optional(),
        allowedCIDRs: z.array(z.string()).optional(),
        deniedCIDRs: z.array(z.string()).optional(),
        injectionRules: z
          .array(
            z.object({
              domain: z.string(),
              headers: z.record(z.string(), z.string()),
              match: z
                .object({
                  path: z
                    .object({ exact: z.string().optional(), startsWith: z.string().optional() })
                    .optional(),
                  method: z.array(z.string()).optional(),
                  queryString: z
                    .array(
                      z.object({
                        key: z
                          .object({
                            exact: z.string().optional(),
                            startsWith: z.string().optional(),
                          })
                          .optional(),
                        value: z
                          .object({
                            exact: z.string().optional(),
                            startsWith: z.string().optional(),
                          })
                          .optional(),
                      }),
                    )
                    .optional(),
                  headers: z
                    .array(
                      z.object({
                        key: z
                          .object({
                            exact: z.string().optional(),
                            startsWith: z.string().optional(),
                          })
                          .optional(),
                        value: z
                          .object({
                            exact: z.string().optional(),
                            startsWith: z.string().optional(),
                          })
                          .optional(),
                      }),
                    )
                    .optional(),
                })
                .optional(),
            }),
          )
          .optional(),
      }),
      z.object({
        allow: z
          .union([
            z.array(z.string()),
            z.record(
              z.string(),
              z.array(
                z.object({
                  match: z
                    .object({
                      path: z
                        .object({ exact: z.string().optional(), startsWith: z.string().optional() })
                        .optional(),
                      method: z.array(z.string()).optional(),
                      queryString: z
                        .array(
                          z.object({
                            key: z
                              .object({
                                exact: z.string().optional(),
                                startsWith: z.string().optional(),
                              })
                              .optional(),
                            value: z
                              .object({
                                exact: z.string().optional(),
                                startsWith: z.string().optional(),
                              })
                              .optional(),
                          }),
                        )
                        .optional(),
                      headers: z
                        .array(
                          z.object({
                            key: z
                              .object({
                                exact: z.string().optional(),
                                startsWith: z.string().optional(),
                              })
                              .optional(),
                            value: z
                              .object({
                                exact: z.string().optional(),
                                startsWith: z.string().optional(),
                              })
                              .optional(),
                          }),
                        )
                        .optional(),
                    })
                    .optional(),
                  transform: z
                    .array(z.object({ headers: z.record(z.string(), z.string()).optional() }))
                    .optional(),
                  forwardURL: z.string().optional(),
                }),
              ),
            ),
          ])
          .optional(),
        subnets: z
          .object({ allow: z.array(z.string()).optional(), deny: z.array(z.string()).optional() })
          .optional(),
      }),
    ])
    .optional(),
  resources: z
    .object({
      vcpus: z.number().int().gte(1).optional(),
      memory: z.number().int().gte(2048).optional(),
    })
    .optional(),
  image: z.string().max(255).optional(),
  timeout: z.number().int().gte(1000).optional(),
  env: z.record(z.string(), z.string()).optional(),
  mounts: z
    .record(
      z.string(),
      z.object({
        drive: z
          .string()
          .max(64)
          .regex(/^[a-zA-Z0-9_-]+$/),
        mode: z.enum(["read-only", "read-write"]).optional(),
      }),
    )
    .optional(),
  region: z
    .enum([
      "iad1",
      "sfo1",
      "cle1",
      "cdg1",
      "fra1",
      "arn1",
      "sin1",
      "pdx1",
      "lhr1",
      "icn1",
      "bom1",
      "cpt1",
      "dub1",
      "gru1",
      "hkg1",
      "syd1",
      "yul1",
      "hnd1",
      "kix1",
    ])
    .optional(),
  failoverRegions: z
    .array(
      z.enum([
        "iad1",
        "sfo1",
        "cle1",
        "cdg1",
        "fra1",
        "arn1",
        "sin1",
        "pdx1",
        "lhr1",
        "icn1",
        "bom1",
        "cpt1",
        "dub1",
        "gru1",
        "hkg1",
        "syd1",
        "yul1",
        "hnd1",
        "kix1",
      ]),
    )
    .optional(),
  name: z
    .string()
    .max(128)
    .regex(/^[a-zA-Z0-9_-]+$/)
    .optional(),
  persistent: z.boolean().optional(),
  snapshotExpiration: z.union([z.unknown(), z.number().int()]).optional(),
  keepLastSnapshots: z
    .union([
      z.string(),
      z.object({
        count: z.number().int().gte(1).lte(10),
        expiration: z.union([z.unknown(), z.number().int()]).optional(),
        deleteEvicted: z.boolean().optional(),
      }),
    ])
    .optional(),
  tags: z.record(z.string(), z.string().max(256)).optional(),
});

export type PostV3SandboxesNameForkBody = {
  networkPolicy?:
    | (
        | {
            mode: "allow-all" | "deny-all" | "custom" | "default-allow" | "default-deny";
            allowedDomains?: Array<string> | undefined;
            allowedCIDRs?: Array<string> | undefined;
            deniedCIDRs?: Array<string> | undefined;
            injectionRules?:
              | Array<{
                  domain: string;
                  headers: Record<string, string>;
                  match?:
                    | {
                        path?:
                          | { exact?: string | undefined; startsWith?: string | undefined }
                          | undefined;
                        method?: Array<string> | undefined;
                        queryString?:
                          | Array<{
                              key?:
                                | { exact?: string | undefined; startsWith?: string | undefined }
                                | undefined;
                              value?:
                                | { exact?: string | undefined; startsWith?: string | undefined }
                                | undefined;
                            }>
                          | undefined;
                        headers?:
                          | Array<{
                              key?:
                                | { exact?: string | undefined; startsWith?: string | undefined }
                                | undefined;
                              value?:
                                | { exact?: string | undefined; startsWith?: string | undefined }
                                | undefined;
                            }>
                          | undefined;
                      }
                    | undefined;
                }>
              | undefined;
          }
        | {
            allow?:
              | (
                  | Array<string>
                  | Record<
                      string,
                      Array<{
                        match?:
                          | {
                              path?:
                                | { exact?: string | undefined; startsWith?: string | undefined }
                                | undefined;
                              method?: Array<string> | undefined;
                              queryString?:
                                | Array<{
                                    key?:
                                      | {
                                          exact?: string | undefined;
                                          startsWith?: string | undefined;
                                        }
                                      | undefined;
                                    value?:
                                      | {
                                          exact?: string | undefined;
                                          startsWith?: string | undefined;
                                        }
                                      | undefined;
                                  }>
                                | undefined;
                              headers?:
                                | Array<{
                                    key?:
                                      | {
                                          exact?: string | undefined;
                                          startsWith?: string | undefined;
                                        }
                                      | undefined;
                                    value?:
                                      | {
                                          exact?: string | undefined;
                                          startsWith?: string | undefined;
                                        }
                                      | undefined;
                                  }>
                                | undefined;
                            }
                          | undefined;
                        transform?:
                          | Array<{ headers?: Record<string, string> | undefined }>
                          | undefined;
                        forwardURL?: string | undefined;
                      }>
                    >
                )
              | undefined;
            subnets?:
              | { allow?: Array<string> | undefined; deny?: Array<string> | undefined }
              | undefined;
          }
      )
    | undefined;
  resources?: { vcpus?: number | undefined; memory?: number | undefined } | undefined;
  image?: string | undefined;
  timeout?: number | undefined;
  env?: Record<string, string> | undefined;
  mounts?:
    | Record<string, { drive: string; mode?: ("read-only" | "read-write") | undefined }>
    | undefined;
  region?:
    | (
        | "iad1"
        | "sfo1"
        | "cle1"
        | "cdg1"
        | "fra1"
        | "arn1"
        | "sin1"
        | "pdx1"
        | "lhr1"
        | "icn1"
        | "bom1"
        | "cpt1"
        | "dub1"
        | "gru1"
        | "hkg1"
        | "syd1"
        | "yul1"
        | "hnd1"
        | "kix1"
      )
    | undefined;
  failoverRegions?:
    | Array<
        | "iad1"
        | "sfo1"
        | "cle1"
        | "cdg1"
        | "fra1"
        | "arn1"
        | "sin1"
        | "pdx1"
        | "lhr1"
        | "icn1"
        | "bom1"
        | "cpt1"
        | "dub1"
        | "gru1"
        | "hkg1"
        | "syd1"
        | "yul1"
        | "hnd1"
        | "kix1"
      >
    | undefined;
  name?: string | undefined;
  persistent?: boolean | undefined;
  snapshotExpiration?: (unknown | number) | undefined;
  keepLastSnapshots?:
    | (
        | string
        | {
            count: number;
            expiration?: (unknown | number) | undefined;
            deleteEvicted?: boolean | undefined;
          }
      )
    | undefined;
  tags?: Record<string, string> | undefined;
};

export type PostV3SandboxesNameForkResponse = {
  sandbox: NamedSandbox;
  session: Session;
  routes: Array<SandboxPublicRoute>;
};

export type PostV3SandboxesNameForkInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { name: string };
  query: { projectId?: string | undefined; teamId?: string | undefined; slug?: string | undefined };
  body: PostV3SandboxesNameForkBody;
};

export type PostV3SandboxesNameForkHandler = (
  input: PostV3SandboxesNameForkInput,
) => Promise<PostV3SandboxesNameForkResponse>;

export const postV4SandboxesBody = z.object({
  networkPolicy: z
    .union([
      z.object({
        mode: z.enum(["allow-all", "deny-all", "custom", "default-allow", "default-deny"]),
        allowedDomains: z.array(z.string()).optional(),
        allowedCIDRs: z.array(z.string()).optional(),
        deniedCIDRs: z.array(z.string()).optional(),
        injectionRules: z
          .array(
            z.object({
              domain: z.string(),
              headers: z.record(z.string(), z.string()),
              match: z
                .object({
                  path: z
                    .object({ exact: z.string().optional(), startsWith: z.string().optional() })
                    .optional(),
                  method: z.array(z.string()).optional(),
                  queryString: z
                    .array(
                      z.object({
                        key: z
                          .object({
                            exact: z.string().optional(),
                            startsWith: z.string().optional(),
                          })
                          .optional(),
                        value: z
                          .object({
                            exact: z.string().optional(),
                            startsWith: z.string().optional(),
                          })
                          .optional(),
                      }),
                    )
                    .optional(),
                  headers: z
                    .array(
                      z.object({
                        key: z
                          .object({
                            exact: z.string().optional(),
                            startsWith: z.string().optional(),
                          })
                          .optional(),
                        value: z
                          .object({
                            exact: z.string().optional(),
                            startsWith: z.string().optional(),
                          })
                          .optional(),
                      }),
                    )
                    .optional(),
                })
                .optional(),
            }),
          )
          .optional(),
      }),
      z.object({
        allow: z
          .union([
            z.array(z.string()),
            z.record(
              z.string(),
              z.array(
                z.object({
                  match: z
                    .object({
                      path: z
                        .object({ exact: z.string().optional(), startsWith: z.string().optional() })
                        .optional(),
                      method: z.array(z.string()).optional(),
                      queryString: z
                        .array(
                          z.object({
                            key: z
                              .object({
                                exact: z.string().optional(),
                                startsWith: z.string().optional(),
                              })
                              .optional(),
                            value: z
                              .object({
                                exact: z.string().optional(),
                                startsWith: z.string().optional(),
                              })
                              .optional(),
                          }),
                        )
                        .optional(),
                      headers: z
                        .array(
                          z.object({
                            key: z
                              .object({
                                exact: z.string().optional(),
                                startsWith: z.string().optional(),
                              })
                              .optional(),
                            value: z
                              .object({
                                exact: z.string().optional(),
                                startsWith: z.string().optional(),
                              })
                              .optional(),
                          }),
                        )
                        .optional(),
                    })
                    .optional(),
                  transform: z
                    .array(z.object({ headers: z.record(z.string(), z.string()).optional() }))
                    .optional(),
                  forwardURL: z.string().optional(),
                }),
              ),
            ),
          ])
          .optional(),
        subnets: z
          .object({ allow: z.array(z.string()).optional(), deny: z.array(z.string()).optional() })
          .optional(),
      }),
    ])
    .optional(),
  resources: z
    .object({
      vcpus: z.number().int().gte(1).optional(),
      memory: z.number().int().gte(2048).optional(),
    })
    .optional(),
  source: z
    .union([
      z.object({
        type: z.unknown(),
        url: z.string(),
        username: z.string().optional(),
        password: z.string().optional(),
        depth: z.number().int().gte(1).optional(),
        revision: z.string().optional(),
      }),
      z.object({ type: z.unknown(), url: z.string() }),
      z.object({ type: z.unknown(), snapshotId: z.string() }),
    ])
    .optional(),
  projectId: z.string().optional(),
  image: z.string().max(255).optional(),
  timeout: z.number().int().gte(1000).optional(),
  env: z.record(z.string(), z.string()).optional(),
  mounts: z
    .record(
      z.string(),
      z.object({
        drive: z
          .string()
          .max(64)
          .regex(/^[a-zA-Z0-9_-]+$/),
        mode: z.enum(["read-only", "read-write"]).optional(),
      }),
    )
    .optional(),
  region: z
    .enum([
      "iad1",
      "sfo1",
      "cle1",
      "cdg1",
      "fra1",
      "arn1",
      "sin1",
      "pdx1",
      "lhr1",
      "icn1",
      "bom1",
      "cpt1",
      "dub1",
      "gru1",
      "hkg1",
      "syd1",
      "yul1",
      "hnd1",
      "kix1",
    ])
    .optional(),
  failoverRegions: z
    .array(
      z.enum([
        "iad1",
        "sfo1",
        "cle1",
        "cdg1",
        "fra1",
        "arn1",
        "sin1",
        "pdx1",
        "lhr1",
        "icn1",
        "bom1",
        "cpt1",
        "dub1",
        "gru1",
        "hkg1",
        "syd1",
        "yul1",
        "hnd1",
        "kix1",
      ]),
    )
    .optional(),
  name: z
    .string()
    .max(128)
    .regex(/^[a-zA-Z0-9_-]+$/)
    .optional(),
  persistent: z.boolean().optional(),
  snapshotExpiration: z.union([z.unknown(), z.number().int()]).optional(),
  keepLastSnapshots: z
    .union([
      z.string(),
      z.object({
        count: z.number().int().gte(1).lte(10),
        expiration: z.union([z.unknown(), z.number().int()]).optional(),
        deleteEvicted: z.boolean().optional(),
      }),
    ])
    .optional(),
  tags: z.record(z.string(), z.string().max(256)).optional(),
});

export type PostV4SandboxesBody = {
  networkPolicy?:
    | (
        | {
            mode: "allow-all" | "deny-all" | "custom" | "default-allow" | "default-deny";
            allowedDomains?: Array<string> | undefined;
            allowedCIDRs?: Array<string> | undefined;
            deniedCIDRs?: Array<string> | undefined;
            injectionRules?:
              | Array<{
                  domain: string;
                  headers: Record<string, string>;
                  match?:
                    | {
                        path?:
                          | { exact?: string | undefined; startsWith?: string | undefined }
                          | undefined;
                        method?: Array<string> | undefined;
                        queryString?:
                          | Array<{
                              key?:
                                | { exact?: string | undefined; startsWith?: string | undefined }
                                | undefined;
                              value?:
                                | { exact?: string | undefined; startsWith?: string | undefined }
                                | undefined;
                            }>
                          | undefined;
                        headers?:
                          | Array<{
                              key?:
                                | { exact?: string | undefined; startsWith?: string | undefined }
                                | undefined;
                              value?:
                                | { exact?: string | undefined; startsWith?: string | undefined }
                                | undefined;
                            }>
                          | undefined;
                      }
                    | undefined;
                }>
              | undefined;
          }
        | {
            allow?:
              | (
                  | Array<string>
                  | Record<
                      string,
                      Array<{
                        match?:
                          | {
                              path?:
                                | { exact?: string | undefined; startsWith?: string | undefined }
                                | undefined;
                              method?: Array<string> | undefined;
                              queryString?:
                                | Array<{
                                    key?:
                                      | {
                                          exact?: string | undefined;
                                          startsWith?: string | undefined;
                                        }
                                      | undefined;
                                    value?:
                                      | {
                                          exact?: string | undefined;
                                          startsWith?: string | undefined;
                                        }
                                      | undefined;
                                  }>
                                | undefined;
                              headers?:
                                | Array<{
                                    key?:
                                      | {
                                          exact?: string | undefined;
                                          startsWith?: string | undefined;
                                        }
                                      | undefined;
                                    value?:
                                      | {
                                          exact?: string | undefined;
                                          startsWith?: string | undefined;
                                        }
                                      | undefined;
                                  }>
                                | undefined;
                            }
                          | undefined;
                        transform?:
                          | Array<{ headers?: Record<string, string> | undefined }>
                          | undefined;
                        forwardURL?: string | undefined;
                      }>
                    >
                )
              | undefined;
            subnets?:
              | { allow?: Array<string> | undefined; deny?: Array<string> | undefined }
              | undefined;
          }
      )
    | undefined;
  resources?: { vcpus?: number | undefined; memory?: number | undefined } | undefined;
  source?:
    | (
        | {
            type: unknown;
            url: string;
            username?: string | undefined;
            password?: string | undefined;
            depth?: number | undefined;
            revision?: string | undefined;
          }
        | { type: unknown; url: string }
        | { type: unknown; snapshotId: string }
      )
    | undefined;
  projectId?: string | undefined;
  image?: string | undefined;
  timeout?: number | undefined;
  env?: Record<string, string> | undefined;
  mounts?:
    | Record<string, { drive: string; mode?: ("read-only" | "read-write") | undefined }>
    | undefined;
  region?:
    | (
        | "iad1"
        | "sfo1"
        | "cle1"
        | "cdg1"
        | "fra1"
        | "arn1"
        | "sin1"
        | "pdx1"
        | "lhr1"
        | "icn1"
        | "bom1"
        | "cpt1"
        | "dub1"
        | "gru1"
        | "hkg1"
        | "syd1"
        | "yul1"
        | "hnd1"
        | "kix1"
      )
    | undefined;
  failoverRegions?:
    | Array<
        | "iad1"
        | "sfo1"
        | "cle1"
        | "cdg1"
        | "fra1"
        | "arn1"
        | "sin1"
        | "pdx1"
        | "lhr1"
        | "icn1"
        | "bom1"
        | "cpt1"
        | "dub1"
        | "gru1"
        | "hkg1"
        | "syd1"
        | "yul1"
        | "hnd1"
        | "kix1"
      >
    | undefined;
  name?: string | undefined;
  persistent?: boolean | undefined;
  snapshotExpiration?: (unknown | number) | undefined;
  keepLastSnapshots?:
    | (
        | string
        | {
            count: number;
            expiration?: (unknown | number) | undefined;
            deleteEvicted?: boolean | undefined;
          }
      )
    | undefined;
  tags?: Record<string, string> | undefined;
};

export type PostV4SandboxesResponse = {
  sandbox: NamedSandbox;
  session: Session;
  routes: Array<SandboxPublicRoute>;
};

export type PostV4SandboxesInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV4SandboxesBody;
};

export type PostV4SandboxesHandler = (
  input: PostV4SandboxesInput,
) => Promise<PostV4SandboxesResponse>;
