import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import { getV4Aliases, getV4AliasesIdOrAlias, deleteV2AliasesAliasId } from "./handlers/aliases";
import type { Pagination } from "packages/models/src/pagination.generated.ts";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.get(
  "/v4/aliases",
  validate(
    "query",
    z.object({
      domain: z.union([z.array(z.string()), z.string()]).optional(),
      from: z.coerce.number().optional(),
      limit: z.coerce.number().optional(),
      projectId: z.string().optional(),
      since: z.coerce.number().optional(),
      until: z.coerce.number().optional(),
      rollbackDeploymentId: z.string().optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(await getV4Aliases({ db, env: c.env, user: c.var.user, query }));
  },
);
app.get(
  "/v4/aliases/:idOrAlias",
  validate("param", z.object({ idOrAlias: z.string() })),
  validate(
    "query",
    z.object({
      from: z.coerce.number().optional(),
      projectId: z.string().optional(),
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
    return c.json(await getV4AliasesIdOrAlias({ db, env: c.env, user: c.var.user, params, query }));
  },
);
app.delete(
  "/v2/aliases/:aliasId",
  validate("param", z.object({ aliasId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await deleteV2AliasesAliasId({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);

export type GetV4AliasesResponse = {
  aliases: Array<{
    alias: string;
    created: string;
    createdAt?: number | undefined;
    creator?:
      | { uid: string; email?: string | undefined; username?: string | undefined }
      | undefined;
    deletedAt?: (number | null) | undefined;
    deployment?: { id: string; url?: string | undefined; meta?: string | undefined } | undefined;
    deploymentId: string | null;
    projectId: string | null;
    redirect?: (string | null) | undefined;
    redirectStatusCode?: (number | null) | undefined;
    uid: string;
    updatedAt?: number | undefined;
    protectionBypass?:
      | Record<
          string,
          | {
              createdAt: number;
              createdBy: string;
              scope: "shareable-link";
              expires?: number | undefined;
            }
          | {
              createdAt: number;
              lastUpdatedAt: number;
              lastUpdatedBy: string;
              access: "granted" | "requested";
              scope: "user";
            }
          | { createdAt: number; createdBy: string; scope: "alias-protection-override" }
          | {
              createdAt: number;
              lastUpdatedAt: number;
              lastUpdatedBy: string;
              scope: "email_invite";
            }
        >
      | undefined;
    microfrontends?:
      | {
          defaultApp: { projectId: string };
          applications:
            | Array<{ fallbackHost: string; projectId: string }>
            | Array<{ fallbackHost: string; branchAlias: string; projectId: string }>
            | Array<{
                deploymentId?: string | undefined;
                branchDeploymentId?: string | undefined;
                fallbackDeploymentId?: string | undefined;
                fallbackHost?: string | undefined;
                branchAlias?: string | undefined;
                projectId: string;
              }>;
        }
      | undefined;
  }>;
  pagination: Pagination;
};

export type GetV4AliasesInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: {
    domain?: (Array<string> | string) | undefined;
    from?: number | undefined;
    limit?: number | undefined;
    projectId?: string | undefined;
    since?: number | undefined;
    until?: number | undefined;
    rollbackDeploymentId?: string | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV4AliasesHandler = (input: GetV4AliasesInput) => Promise<GetV4AliasesResponse>;

export type GetV4AliasesIdOrAliasResponse = {
  alias: string;
  created: string;
  createdAt?: (number | null) | undefined;
  creator?: { uid: string; email?: string | undefined; username?: string | undefined } | undefined;
  deletedAt?: (number | null) | undefined;
  deployment?: { id: string; url?: string | undefined; meta?: string | undefined } | undefined;
  deploymentId: string | null;
  projectId: string | null;
  redirect?: (string | null) | undefined;
  redirectStatusCode?: (number | null) | undefined;
  uid: string;
  updatedAt?: (number | null) | undefined;
  protectionBypass?:
    | Record<
        string,
        | {
            createdAt: number;
            createdBy: string;
            scope: "shareable-link";
            expires?: number | undefined;
          }
        | {
            createdAt: number;
            lastUpdatedAt: number;
            lastUpdatedBy: string;
            access: "granted" | "requested";
            scope: "user";
          }
        | { createdAt: number; createdBy: string; scope: "alias-protection-override" }
        | { createdAt: number; lastUpdatedAt: number; lastUpdatedBy: string; scope: "email_invite" }
      >
    | undefined;
  microfrontends?:
    | {
        defaultApp: { projectId: string };
        applications:
          | Array<{ fallbackHost: string; projectId: string }>
          | Array<{ fallbackHost: string; branchAlias: string; projectId: string }>
          | Array<{
              deploymentId?: string | undefined;
              branchDeploymentId?: string | undefined;
              fallbackDeploymentId?: string | undefined;
              fallbackHost?: string | undefined;
              branchAlias?: string | undefined;
              projectId: string;
            }>;
      }
    | undefined;
};

export type GetV4AliasesIdOrAliasInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrAlias: string };
  query: {
    from?: number | undefined;
    projectId?: string | undefined;
    since?: number | undefined;
    until?: number | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV4AliasesIdOrAliasHandler = (
  input: GetV4AliasesIdOrAliasInput,
) => Promise<GetV4AliasesIdOrAliasResponse>;

export type DeleteV2AliasesAliasIdResponse = { status: "SUCCESS" };

export type DeleteV2AliasesAliasIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { aliasId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type DeleteV2AliasesAliasIdHandler = (
  input: DeleteV2AliasesAliasIdInput,
) => Promise<DeleteV2AliasesAliasIdResponse>;
