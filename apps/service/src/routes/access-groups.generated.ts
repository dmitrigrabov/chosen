import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import {
  getV1AccessGroupsIdOrName,
  postV1AccessGroupsIdOrName,
  deleteV1AccessGroupsIdOrName,
  getV1AccessGroupsIdOrNameMembers,
  getV1AccessGroups,
  postV1AccessGroups,
  getV1AccessGroupsIdOrNameProjects,
  postV1AccessGroupsAccessGroupIdOrNameProjects,
  getV1AccessGroupsAccessGroupIdOrNameProjectsProjectId,
  patchV1AccessGroupsAccessGroupIdOrNameProjectsProjectId,
  deleteV1AccessGroupsAccessGroupIdOrNameProjectsProjectId,
} from "./handlers/access-groups";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.get(
  "/v1/access-groups/:idOrName",
  validate("param", z.object({ idOrName: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV1AccessGroupsIdOrName({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);
app.post(
  "/v1/access-groups/:idOrName",
  validate("param", z.object({ idOrName: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV1AccessGroupsIdOrNameBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV1AccessGroupsIdOrName({ db, env: c.env, user: c.var.user, params, query, body }),
    );
  },
);
app.delete(
  "/v1/access-groups/:idOrName",
  validate("param", z.object({ idOrName: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await deleteV1AccessGroupsIdOrName({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);
app.get(
  "/v1/access-groups/:idOrName/members",
  validate("param", z.object({ idOrName: z.string() })),
  validate(
    "query",
    z.object({
      limit: z.coerce.number().int().gte(1).lte(100).optional(),
      next: z.string().optional(),
      search: z.string().optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV1AccessGroupsIdOrNameMembers({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);
app.get(
  "/v1/access-groups",
  validate(
    "query",
    z.object({
      projectId: z.string().optional(),
      search: z.string().optional(),
      membersLimit: z.coerce.number().int().gte(1).lte(100).optional(),
      projectsLimit: z.coerce.number().int().gte(1).lte(100).optional(),
      limit: z.coerce.number().int().gte(1).lte(100).optional(),
      next: z.string().optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(await getV1AccessGroups({ db, env: c.env, user: c.var.user, query }));
  },
);
app.post(
  "/v1/access-groups",
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV1AccessGroupsBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(await postV1AccessGroups({ db, env: c.env, user: c.var.user, query, body }));
  },
);
app.get(
  "/v1/access-groups/:idOrName/projects",
  validate("param", z.object({ idOrName: z.string() })),
  validate(
    "query",
    z.object({
      limit: z.coerce.number().int().gte(1).lte(100).optional(),
      next: z.string().optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV1AccessGroupsIdOrNameProjects({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);
app.post(
  "/v1/access-groups/:accessGroupIdOrName/projects",
  validate("param", z.object({ accessGroupIdOrName: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV1AccessGroupsAccessGroupIdOrNameProjectsBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV1AccessGroupsAccessGroupIdOrNameProjects({
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
  "/v1/access-groups/:accessGroupIdOrName/projects/:projectId",
  validate("param", z.object({ accessGroupIdOrName: z.string(), projectId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV1AccessGroupsAccessGroupIdOrNameProjectsProjectId({
        db,
        env: c.env,
        user: c.var.user,
        params,
        query,
      }),
    );
  },
);
app.patch(
  "/v1/access-groups/:accessGroupIdOrName/projects/:projectId",
  validate("param", z.object({ accessGroupIdOrName: z.string(), projectId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", patchV1AccessGroupsAccessGroupIdOrNameProjectsProjectIdBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await patchV1AccessGroupsAccessGroupIdOrNameProjectsProjectId({
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
  "/v1/access-groups/:accessGroupIdOrName/projects/:projectId",
  validate("param", z.object({ accessGroupIdOrName: z.string(), projectId: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await deleteV1AccessGroupsAccessGroupIdOrNameProjectsProjectId({
        db,
        env: c.env,
        user: c.var.user,
        params,
        query,
      }),
    );
  },
);

export type GetV1AccessGroupsIdOrNameResponse = {
  teamPermissions?:
    | Array<
        | "AiGatewayApiKeyOwnedBySelf"
        | "AiGatewayBudgetManager"
        | "AiGatewayCredits"
        | "AiGatewaySettings"
        | "ConnectorManager"
        | "CreateProject"
        | "EnvVariableManager"
        | "EnvironmentManager"
        | "FullProductionDeployment"
        | "IntegrationManager"
        | "OrgAdmin"
        | "OrgViewer"
        | "UsageViewer"
        | "V0Builder"
        | "V0Chatter"
        | "V0Viewer"
        | "WorkflowDecryptor"
      >
    | undefined;
  entitlements?: Array<"v0"> | undefined;
  isDsyncManaged: boolean;
  name: string;
  createdAt: string;
  teamId: string;
  updatedAt: string;
  accessGroupId: string;
  membersCount: number;
  projectsCount: number;
  teamRoles?: Array<string> | undefined;
};

export type GetV1AccessGroupsIdOrNameInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV1AccessGroupsIdOrNameHandler = (
  input: GetV1AccessGroupsIdOrNameInput,
) => Promise<GetV1AccessGroupsIdOrNameResponse>;

export const postV1AccessGroupsIdOrNameBody = z.object({
  name: z
    .string()
    .max(50)
    .regex(/^[A-z0-9_ -]+$/)
    .optional(),
  projects: z
    .array(
      z.object({
        projectId: z.string().max(256),
        role: z.enum(["ADMIN", "PROJECT_VIEWER", "PROJECT_DEVELOPER", "null"]).nullable(),
      }),
    )
    .optional(),
  membersToAdd: z.array(z.string()).optional(),
  membersToRemove: z.array(z.string()).optional(),
});

export type PostV1AccessGroupsIdOrNameBody = {
  name?: string | undefined;
  projects?:
    | Array<{
        projectId: string;
        role: "ADMIN" | "PROJECT_VIEWER" | "PROJECT_DEVELOPER" | "null" | null;
      }>
    | undefined;
  membersToAdd?: Array<string> | undefined;
  membersToRemove?: Array<string> | undefined;
};

export type PostV1AccessGroupsIdOrNameResponse = {
  entitlements: Array<"v0">;
  name: string;
  createdAt: string;
  teamId: string;
  updatedAt: string;
  accessGroupId: string;
  membersCount: number;
  projectsCount: number;
  teamRoles?: Array<string> | undefined;
  teamPermissions?: Array<string> | undefined;
};

export type PostV1AccessGroupsIdOrNameInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV1AccessGroupsIdOrNameBody;
};

export type PostV1AccessGroupsIdOrNameHandler = (
  input: PostV1AccessGroupsIdOrNameInput,
) => Promise<PostV1AccessGroupsIdOrNameResponse>;

export type DeleteV1AccessGroupsIdOrNameInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type DeleteV1AccessGroupsIdOrNameHandler = (
  input: DeleteV1AccessGroupsIdOrNameInput,
) => Promise<void>;

export type GetV1AccessGroupsIdOrNameMembersResponse = {
  members: Array<{
    avatar?: string | undefined;
    email: string;
    uid: string;
    username: string;
    name?: string | undefined;
    createdAt?: string | undefined;
    teamRole:
      | "BILLING"
      | "CONTRIBUTOR"
      | "DEVELOPER"
      | "MEMBER"
      | "OWNER"
      | "SECURITY"
      | "VIEWER"
      | "VIEWER_FOR_PLUS";
  }>;
  pagination: { count: number; next: string | null };
};

export type GetV1AccessGroupsIdOrNameMembersInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string };
  query: {
    limit?: number | undefined;
    next?: string | undefined;
    search?: string | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV1AccessGroupsIdOrNameMembersHandler = (
  input: GetV1AccessGroupsIdOrNameMembersInput,
) => Promise<GetV1AccessGroupsIdOrNameMembersResponse>;

export type GetV1AccessGroupsResponse =
  | Record<string, never>
  | {
      accessGroups: Array<{
        members?: Array<string> | undefined;
        projects?: Array<string> | undefined;
        entitlements?: Array<string> | undefined;
        teamPermissions?: Array<string> | undefined;
        isDsyncManaged: boolean;
        name: string;
        createdAt: string;
        teamId: string;
        updatedAt: string;
        accessGroupId: string;
        membersCount: number;
        projectsCount: number;
        teamRoles?: Array<string> | undefined;
      }>;
      pagination: { count: number; next: string | null };
    };

export type GetV1AccessGroupsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: {
    projectId?: string | undefined;
    search?: string | undefined;
    membersLimit?: number | undefined;
    projectsLimit?: number | undefined;
    limit?: number | undefined;
    next?: string | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV1AccessGroupsHandler = (
  input: GetV1AccessGroupsInput,
) => Promise<GetV1AccessGroupsResponse>;

export const postV1AccessGroupsBody = z.object({
  name: z
    .string()
    .max(50)
    .regex(/^[A-z0-9_ -]+$/),
  projects: z
    .array(
      z.object({
        projectId: z.string().max(256),
        role: z.enum(["ADMIN", "PROJECT_VIEWER", "PROJECT_DEVELOPER", "null"]).nullable(),
      }),
    )
    .optional(),
  membersToAdd: z.array(z.string()).optional(),
});

export type PostV1AccessGroupsBody = {
  name: string;
  projects?:
    | Array<{
        projectId: string;
        role: "ADMIN" | "PROJECT_VIEWER" | "PROJECT_DEVELOPER" | "null" | null;
      }>
    | undefined;
  membersToAdd?: Array<string> | undefined;
};

export type PostV1AccessGroupsResponse = {
  entitlements: Array<"v0">;
  membersCount: number;
  projectsCount: number;
  name: string;
  createdAt: string;
  teamId: string;
  updatedAt: string;
  accessGroupId: string;
  teamRoles?: Array<string> | undefined;
  teamPermissions?: Array<string> | undefined;
};

export type PostV1AccessGroupsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV1AccessGroupsBody;
};

export type PostV1AccessGroupsHandler = (
  input: PostV1AccessGroupsInput,
) => Promise<PostV1AccessGroupsResponse>;

export type GetV1AccessGroupsIdOrNameProjectsResponse = {
  projects: Array<{
    projectId: string;
    role: "ADMIN" | "PROJECT_DEVELOPER" | "PROJECT_GUEST" | "PROJECT_VIEWER";
    createdAt: string;
    updatedAt: string;
    project: {
      name?: string | undefined;
      framework?: (string | null) | undefined;
      latestDeploymentId?: string | undefined;
    };
  }>;
  pagination: { count: number; next: string | null };
};

export type GetV1AccessGroupsIdOrNameProjectsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string };
  query: {
    limit?: number | undefined;
    next?: string | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV1AccessGroupsIdOrNameProjectsHandler = (
  input: GetV1AccessGroupsIdOrNameProjectsInput,
) => Promise<GetV1AccessGroupsIdOrNameProjectsResponse>;

export const postV1AccessGroupsAccessGroupIdOrNameProjectsBody = z.object({
  projectId: z.string().max(256),
  role: z.enum(["ADMIN", "PROJECT_VIEWER", "PROJECT_DEVELOPER"]),
});

export type PostV1AccessGroupsAccessGroupIdOrNameProjectsBody = {
  projectId: string;
  role: "ADMIN" | "PROJECT_VIEWER" | "PROJECT_DEVELOPER";
};

export type PostV1AccessGroupsAccessGroupIdOrNameProjectsResponse = {
  teamId: string;
  accessGroupId: string;
  projectId: string;
  role: "ADMIN" | "PROJECT_DEVELOPER" | "PROJECT_GUEST" | "PROJECT_VIEWER";
  createdAt: string;
  updatedAt: string;
};

export type PostV1AccessGroupsAccessGroupIdOrNameProjectsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { accessGroupIdOrName: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV1AccessGroupsAccessGroupIdOrNameProjectsBody;
};

export type PostV1AccessGroupsAccessGroupIdOrNameProjectsHandler = (
  input: PostV1AccessGroupsAccessGroupIdOrNameProjectsInput,
) => Promise<PostV1AccessGroupsAccessGroupIdOrNameProjectsResponse>;

export type GetV1AccessGroupsAccessGroupIdOrNameProjectsProjectIdResponse = {
  teamId: string;
  accessGroupId: string;
  projectId: string;
  role: "ADMIN" | "PROJECT_DEVELOPER" | "PROJECT_GUEST" | "PROJECT_VIEWER";
  createdAt: string;
  updatedAt: string;
};

export type GetV1AccessGroupsAccessGroupIdOrNameProjectsProjectIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { accessGroupIdOrName: string; projectId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV1AccessGroupsAccessGroupIdOrNameProjectsProjectIdHandler = (
  input: GetV1AccessGroupsAccessGroupIdOrNameProjectsProjectIdInput,
) => Promise<GetV1AccessGroupsAccessGroupIdOrNameProjectsProjectIdResponse>;

export const patchV1AccessGroupsAccessGroupIdOrNameProjectsProjectIdBody = z.object({
  role: z.string(),
});

export type PatchV1AccessGroupsAccessGroupIdOrNameProjectsProjectIdBody = { role: string };

export type PatchV1AccessGroupsAccessGroupIdOrNameProjectsProjectIdResponse = {
  teamId: string;
  accessGroupId: string;
  projectId: string;
  role: "ADMIN" | "PROJECT_DEVELOPER" | "PROJECT_GUEST" | "PROJECT_VIEWER";
  createdAt: string;
  updatedAt: string;
};

export type PatchV1AccessGroupsAccessGroupIdOrNameProjectsProjectIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { accessGroupIdOrName: string; projectId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PatchV1AccessGroupsAccessGroupIdOrNameProjectsProjectIdBody;
};

export type PatchV1AccessGroupsAccessGroupIdOrNameProjectsProjectIdHandler = (
  input: PatchV1AccessGroupsAccessGroupIdOrNameProjectsProjectIdInput,
) => Promise<PatchV1AccessGroupsAccessGroupIdOrNameProjectsProjectIdResponse>;

export type DeleteV1AccessGroupsAccessGroupIdOrNameProjectsProjectIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { accessGroupIdOrName: string; projectId: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type DeleteV1AccessGroupsAccessGroupIdOrNameProjectsProjectIdHandler = (
  input: DeleteV1AccessGroupsAccessGroupIdOrNameProjectsProjectIdInput,
) => Promise<void>;
