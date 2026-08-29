import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import {
  headV2TeamSlugProjectSlugRepositoryNameBlobsDigest,
  getV2TeamSlugProjectSlugRepositoryNameBlobsDigest,
  deleteV2TeamSlugProjectSlugRepositoryNameBlobsDigest,
  getV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuid,
  deleteV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuid,
  patchV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuid,
  putV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuid,
  postV2TeamSlugProjectSlugRepositoryNameBlobsUploads,
  putV2TeamSlugProjectSlugRepositoryNameManifestsReference,
  headV2TeamSlugProjectSlugRepositoryNameManifestsReference,
  getV2TeamSlugProjectSlugRepositoryNameManifestsReference,
  deleteV2TeamSlugProjectSlugRepositoryNameManifestsReference,
  getV2TeamSlugProjectSlugRepositoryNameTagsList,
} from "./handlers/{teamSlug}";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.head(
  "/v2/:teamSlug/:projectSlug/:repositoryName/blobs/:digest",
  validate(
    "param",
    z.object({
      teamSlug: z
        .string()
        .max(255)
        .regex(/^[a-z0-9](?:[a-z0-9-]{0,46}[a-z0-9])?$/),
      projectSlug: z
        .string()
        .max(255)
        .regex(/^[a-z0-9](?:[a-z0-9-]{0,46}[a-z0-9])?$/),
      repositoryName: z
        .string()
        .max(255)
        .regex(/^[a-z0-9]+(?:(?:\\.|_|__|-+)[a-z0-9]+)*$/),
      digest: z
        .string()
        .max(255)
        .regex(/^[A-Za-z0-9_+.-]+:[A-Fa-f0-9]+$/),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    return c.json(
      await headV2TeamSlugProjectSlugRepositoryNameBlobsDigest({
        db,
        env: c.env,
        user: c.var.user,
        params,
      }),
    );
  },
);
app.get(
  "/v2/:teamSlug/:projectSlug/:repositoryName/blobs/:digest",
  validate(
    "param",
    z.object({
      teamSlug: z
        .string()
        .max(255)
        .regex(/^[a-z0-9](?:[a-z0-9-]{0,46}[a-z0-9])?$/),
      projectSlug: z
        .string()
        .max(255)
        .regex(/^[a-z0-9](?:[a-z0-9-]{0,46}[a-z0-9])?$/),
      repositoryName: z
        .string()
        .max(255)
        .regex(/^[a-z0-9]+(?:(?:\\.|_|__|-+)[a-z0-9]+)*$/),
      digest: z
        .string()
        .max(255)
        .regex(/^[A-Za-z0-9_+.-]+:[A-Fa-f0-9]+$/),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    return c.json(
      await getV2TeamSlugProjectSlugRepositoryNameBlobsDigest({
        db,
        env: c.env,
        user: c.var.user,
        params,
      }),
    );
  },
);
app.delete(
  "/v2/:teamSlug/:projectSlug/:repositoryName/blobs/:digest",
  validate(
    "param",
    z.object({
      teamSlug: z
        .string()
        .max(255)
        .regex(/^[a-z0-9](?:[a-z0-9-]{0,46}[a-z0-9])?$/),
      projectSlug: z
        .string()
        .max(255)
        .regex(/^[a-z0-9](?:[a-z0-9-]{0,46}[a-z0-9])?$/),
      repositoryName: z
        .string()
        .max(255)
        .regex(/^[a-z0-9]+(?:(?:\\.|_|__|-+)[a-z0-9]+)*$/),
      digest: z
        .string()
        .max(255)
        .regex(/^[A-Za-z0-9_+.-]+:[A-Fa-f0-9]+$/),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    return c.json(
      await deleteV2TeamSlugProjectSlugRepositoryNameBlobsDigest({
        db,
        env: c.env,
        user: c.var.user,
        params,
      }),
    );
  },
);
app.get(
  "/v2/:teamSlug/:projectSlug/:repositoryName/blobs/uploads/:uuid",
  validate(
    "param",
    z.object({
      teamSlug: z
        .string()
        .max(255)
        .regex(/^[a-z0-9](?:[a-z0-9-]{0,46}[a-z0-9])?$/),
      projectSlug: z
        .string()
        .max(255)
        .regex(/^[a-z0-9](?:[a-z0-9-]{0,46}[a-z0-9])?$/),
      repositoryName: z
        .string()
        .max(255)
        .regex(/^[a-z0-9]+(?:(?:\\.|_|__|-+)[a-z0-9]+)*$/),
      uuid: z
        .string()
        .max(40)
        .regex(/^[a-f0-9]{40}$/),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    await getV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuid({
      db,
      env: c.env,
      user: c.var.user,
      params,
    });
    return c.body(null, 204);
  },
);
app.delete(
  "/v2/:teamSlug/:projectSlug/:repositoryName/blobs/uploads/:uuid",
  validate(
    "param",
    z.object({
      teamSlug: z
        .string()
        .max(255)
        .regex(/^[a-z0-9](?:[a-z0-9-]{0,46}[a-z0-9])?$/),
      projectSlug: z
        .string()
        .max(255)
        .regex(/^[a-z0-9](?:[a-z0-9-]{0,46}[a-z0-9])?$/),
      repositoryName: z
        .string()
        .max(255)
        .regex(/^[a-z0-9]+(?:(?:\\.|_|__|-+)[a-z0-9]+)*$/),
      uuid: z
        .string()
        .max(40)
        .regex(/^[a-f0-9]{40}$/),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    await deleteV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuid({
      db,
      env: c.env,
      user: c.var.user,
      params,
    });
    return c.body(null, 204);
  },
);
app.patch(
  "/v2/:teamSlug/:projectSlug/:repositoryName/blobs/uploads/:uuid",
  validate(
    "param",
    z.object({
      teamSlug: z
        .string()
        .max(255)
        .regex(/^[a-z0-9](?:[a-z0-9-]{0,46}[a-z0-9])?$/),
      projectSlug: z
        .string()
        .max(255)
        .regex(/^[a-z0-9](?:[a-z0-9-]{0,46}[a-z0-9])?$/),
      repositoryName: z
        .string()
        .max(255)
        .regex(/^[a-z0-9]+(?:(?:\\.|_|__|-+)[a-z0-9]+)*$/),
      uuid: z
        .string()
        .max(40)
        .regex(/^[a-f0-9]{40}$/),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    return c.json(
      await patchV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuid({
        db,
        env: c.env,
        user: c.var.user,
        params,
      }),
    );
  },
);
app.put(
  "/v2/:teamSlug/:projectSlug/:repositoryName/blobs/uploads/:uuid",
  validate(
    "param",
    z.object({
      teamSlug: z
        .string()
        .max(255)
        .regex(/^[a-z0-9](?:[a-z0-9-]{0,46}[a-z0-9])?$/),
      projectSlug: z
        .string()
        .max(255)
        .regex(/^[a-z0-9](?:[a-z0-9-]{0,46}[a-z0-9])?$/),
      repositoryName: z
        .string()
        .max(255)
        .regex(/^[a-z0-9]+(?:(?:\\.|_|__|-+)[a-z0-9]+)*$/),
      uuid: z
        .string()
        .max(40)
        .regex(/^[a-f0-9]{40}$/),
    }),
  ),
  validate(
    "query",
    z.object({
      digest: z
        .string()
        .max(255)
        .regex(/^[A-Za-z0-9_+.-]+:[A-Fa-f0-9]+$/),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await putV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuid({
        db,
        env: c.env,
        user: c.var.user,
        params,
        query,
      }),
      201,
    );
  },
);
app.post(
  "/v2/:teamSlug/:projectSlug/:repositoryName/blobs/uploads/",
  validate(
    "param",
    z.object({
      teamSlug: z
        .string()
        .max(255)
        .regex(/^[a-z0-9](?:[a-z0-9-]{0,46}[a-z0-9])?$/),
      projectSlug: z
        .string()
        .max(255)
        .regex(/^[a-z0-9](?:[a-z0-9-]{0,46}[a-z0-9])?$/),
      repositoryName: z
        .string()
        .max(255)
        .regex(/^[a-z0-9]+(?:(?:\\.|_|__|-+)[a-z0-9]+)*$/),
    }),
  ),
  validate(
    "query",
    z.object({
      mount: z
        .string()
        .max(255)
        .regex(/^[A-Za-z0-9_+.-]+:[A-Fa-f0-9]+$/)
        .optional(),
      from: z
        .string()
        .max(255)
        .regex(
          /^[a-z0-9](?:[a-z0-9-]{0,46}[a-z0-9])?\\\/[a-z0-9](?:[a-z0-9-]{0,46}[a-z0-9])?\\\/[a-z0-9]+(?:(?:\\.|_|__|-+)[a-z0-9]+)*$/,
        )
        .optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await postV2TeamSlugProjectSlugRepositoryNameBlobsUploads({
        db,
        env: c.env,
        user: c.var.user,
        params,
        query,
      }),
    );
  },
);
app.put(
  "/v2/:teamSlug/:projectSlug/:repositoryName/manifests/:reference",
  validate(
    "param",
    z.object({
      teamSlug: z
        .string()
        .max(255)
        .regex(/^[a-z0-9](?:[a-z0-9-]{0,46}[a-z0-9])?$/),
      projectSlug: z
        .string()
        .max(255)
        .regex(/^[a-z0-9](?:[a-z0-9-]{0,46}[a-z0-9])?$/),
      repositoryName: z
        .string()
        .max(255)
        .regex(/^[a-z0-9]+(?:(?:\\.|_|__|-+)[a-z0-9]+)*$/),
      reference: z
        .string()
        .max(255)
        .regex(/^(?:[a-zA-Z0-9_][a-zA-Z0-9._-]{0,127}|[A-Za-z0-9_+.-]+:[A-Fa-f0-9]+)$/),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    return c.json(
      await putV2TeamSlugProjectSlugRepositoryNameManifestsReference({
        db,
        env: c.env,
        user: c.var.user,
        params,
      }),
      201,
    );
  },
);
app.head(
  "/v2/:teamSlug/:projectSlug/:repositoryName/manifests/:reference",
  validate(
    "param",
    z.object({
      teamSlug: z
        .string()
        .max(255)
        .regex(/^[a-z0-9](?:[a-z0-9-]{0,46}[a-z0-9])?$/),
      projectSlug: z
        .string()
        .max(255)
        .regex(/^[a-z0-9](?:[a-z0-9-]{0,46}[a-z0-9])?$/),
      repositoryName: z
        .string()
        .max(255)
        .regex(/^[a-z0-9]+(?:(?:\\.|_|__|-+)[a-z0-9]+)*$/),
      reference: z
        .string()
        .max(255)
        .regex(/^(?:[a-zA-Z0-9_][a-zA-Z0-9._-]{0,127}|[A-Za-z0-9_+.-]+:[A-Fa-f0-9]+)$/),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    return c.json(
      await headV2TeamSlugProjectSlugRepositoryNameManifestsReference({
        db,
        env: c.env,
        user: c.var.user,
        params,
      }),
    );
  },
);
app.get(
  "/v2/:teamSlug/:projectSlug/:repositoryName/manifests/:reference",
  validate(
    "param",
    z.object({
      teamSlug: z
        .string()
        .max(255)
        .regex(/^[a-z0-9](?:[a-z0-9-]{0,46}[a-z0-9])?$/),
      projectSlug: z
        .string()
        .max(255)
        .regex(/^[a-z0-9](?:[a-z0-9-]{0,46}[a-z0-9])?$/),
      repositoryName: z
        .string()
        .max(255)
        .regex(/^[a-z0-9]+(?:(?:\\.|_|__|-+)[a-z0-9]+)*$/),
      reference: z
        .string()
        .max(255)
        .regex(/^(?:[a-zA-Z0-9_][a-zA-Z0-9._-]{0,127}|[A-Za-z0-9_+.-]+:[A-Fa-f0-9]+)$/),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    return c.json(
      await getV2TeamSlugProjectSlugRepositoryNameManifestsReference({
        db,
        env: c.env,
        user: c.var.user,
        params,
      }),
    );
  },
);
app.delete(
  "/v2/:teamSlug/:projectSlug/:repositoryName/manifests/:reference",
  validate(
    "param",
    z.object({
      teamSlug: z
        .string()
        .max(255)
        .regex(/^[a-z0-9](?:[a-z0-9-]{0,46}[a-z0-9])?$/),
      projectSlug: z
        .string()
        .max(255)
        .regex(/^[a-z0-9](?:[a-z0-9-]{0,46}[a-z0-9])?$/),
      repositoryName: z
        .string()
        .max(255)
        .regex(/^[a-z0-9]+(?:(?:\\.|_|__|-+)[a-z0-9]+)*$/),
      reference: z
        .string()
        .max(255)
        .regex(/^[A-Za-z0-9_+.-]+:[A-Fa-f0-9]+$/),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    return c.json(
      await deleteV2TeamSlugProjectSlugRepositoryNameManifestsReference({
        db,
        env: c.env,
        user: c.var.user,
        params,
      }),
    );
  },
);
app.get(
  "/v2/:teamSlug/:projectSlug/:repositoryName/tags/list",
  validate(
    "param",
    z.object({
      teamSlug: z
        .string()
        .max(255)
        .regex(/^[a-z0-9](?:[a-z0-9-]{0,46}[a-z0-9])?$/),
      projectSlug: z
        .string()
        .max(255)
        .regex(/^[a-z0-9](?:[a-z0-9-]{0,46}[a-z0-9])?$/),
      repositoryName: z
        .string()
        .max(255)
        .regex(/^[a-z0-9]+(?:(?:\\.|_|__|-+)[a-z0-9]+)*$/),
    }),
  ),
  validate(
    "query",
    z.object({
      n: z.coerce.number().int().gte(1).lte(1000).optional(),
      last: z.string().max(1024).optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV2TeamSlugProjectSlugRepositoryNameTagsList({
        db,
        env: c.env,
        user: c.var.user,
        params,
        query,
      }),
    );
  },
);

export type HeadV2TeamSlugProjectSlugRepositoryNameBlobsDigestResponse = unknown;

export type HeadV2TeamSlugProjectSlugRepositoryNameBlobsDigestInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { teamSlug: string; projectSlug: string; repositoryName: string; digest: string };
};

export type HeadV2TeamSlugProjectSlugRepositoryNameBlobsDigestHandler = (
  input: HeadV2TeamSlugProjectSlugRepositoryNameBlobsDigestInput,
) => Promise<HeadV2TeamSlugProjectSlugRepositoryNameBlobsDigestResponse>;

export type GetV2TeamSlugProjectSlugRepositoryNameBlobsDigestInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { teamSlug: string; projectSlug: string; repositoryName: string; digest: string };
};

export type GetV2TeamSlugProjectSlugRepositoryNameBlobsDigestHandler = (
  input: GetV2TeamSlugProjectSlugRepositoryNameBlobsDigestInput,
) => Promise<void>;

export type DeleteV2TeamSlugProjectSlugRepositoryNameBlobsDigestInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { teamSlug: string; projectSlug: string; repositoryName: string; digest: string };
};

export type DeleteV2TeamSlugProjectSlugRepositoryNameBlobsDigestHandler = (
  input: DeleteV2TeamSlugProjectSlugRepositoryNameBlobsDigestInput,
) => Promise<void>;

export type GetV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuidResponse = unknown;

export type GetV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuidInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { teamSlug: string; projectSlug: string; repositoryName: string; uuid: string };
};

export type GetV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuidHandler = (
  input: GetV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuidInput,
) => Promise<GetV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuidResponse>;

export type DeleteV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuidResponse = unknown;

export type DeleteV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuidInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { teamSlug: string; projectSlug: string; repositoryName: string; uuid: string };
};

export type DeleteV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuidHandler = (
  input: DeleteV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuidInput,
) => Promise<DeleteV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuidResponse>;

export type PatchV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuidResponse = unknown;

export type PatchV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuidInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { teamSlug: string; projectSlug: string; repositoryName: string; uuid: string };
};

export type PatchV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuidHandler = (
  input: PatchV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuidInput,
) => Promise<PatchV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuidResponse>;

export type PutV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuidResponse = unknown;

export type PutV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuidInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { teamSlug: string; projectSlug: string; repositoryName: string; uuid: string };
  query: { digest: string };
};

export type PutV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuidHandler = (
  input: PutV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuidInput,
) => Promise<PutV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuidResponse>;

export type PostV2TeamSlugProjectSlugRepositoryNameBlobsUploadsResponse = unknown;

export type PostV2TeamSlugProjectSlugRepositoryNameBlobsUploadsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { teamSlug: string; projectSlug: string; repositoryName: string };
  query: { mount?: string | undefined; from?: string | undefined };
};

export type PostV2TeamSlugProjectSlugRepositoryNameBlobsUploadsHandler = (
  input: PostV2TeamSlugProjectSlugRepositoryNameBlobsUploadsInput,
) => Promise<PostV2TeamSlugProjectSlugRepositoryNameBlobsUploadsResponse>;

export type PutV2TeamSlugProjectSlugRepositoryNameManifestsReferenceResponse = unknown;

export type PutV2TeamSlugProjectSlugRepositoryNameManifestsReferenceInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { teamSlug: string; projectSlug: string; repositoryName: string; reference: string };
};

export type PutV2TeamSlugProjectSlugRepositoryNameManifestsReferenceHandler = (
  input: PutV2TeamSlugProjectSlugRepositoryNameManifestsReferenceInput,
) => Promise<PutV2TeamSlugProjectSlugRepositoryNameManifestsReferenceResponse>;

export type HeadV2TeamSlugProjectSlugRepositoryNameManifestsReferenceResponse = unknown;

export type HeadV2TeamSlugProjectSlugRepositoryNameManifestsReferenceInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { teamSlug: string; projectSlug: string; repositoryName: string; reference: string };
};

export type HeadV2TeamSlugProjectSlugRepositoryNameManifestsReferenceHandler = (
  input: HeadV2TeamSlugProjectSlugRepositoryNameManifestsReferenceInput,
) => Promise<HeadV2TeamSlugProjectSlugRepositoryNameManifestsReferenceResponse>;

export type GetV2TeamSlugProjectSlugRepositoryNameManifestsReferenceInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { teamSlug: string; projectSlug: string; repositoryName: string; reference: string };
};

export type GetV2TeamSlugProjectSlugRepositoryNameManifestsReferenceHandler = (
  input: GetV2TeamSlugProjectSlugRepositoryNameManifestsReferenceInput,
) => Promise<void>;

export type DeleteV2TeamSlugProjectSlugRepositoryNameManifestsReferenceResponse = unknown;

export type DeleteV2TeamSlugProjectSlugRepositoryNameManifestsReferenceInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { teamSlug: string; projectSlug: string; repositoryName: string; reference: string };
};

export type DeleteV2TeamSlugProjectSlugRepositoryNameManifestsReferenceHandler = (
  input: DeleteV2TeamSlugProjectSlugRepositoryNameManifestsReferenceInput,
) => Promise<DeleteV2TeamSlugProjectSlugRepositoryNameManifestsReferenceResponse>;

export type GetV2TeamSlugProjectSlugRepositoryNameTagsListResponse = {
  name: string;
  tags: Array<string>;
};

export type GetV2TeamSlugProjectSlugRepositoryNameTagsListInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { teamSlug: string; projectSlug: string; repositoryName: string };
  query: { n?: number | undefined; last?: string | undefined };
};

export type GetV2TeamSlugProjectSlugRepositoryNameTagsListHandler = (
  input: GetV2TeamSlugProjectSlugRepositoryNameTagsListInput,
) => Promise<GetV2TeamSlugProjectSlugRepositoryNameTagsListResponse>;
