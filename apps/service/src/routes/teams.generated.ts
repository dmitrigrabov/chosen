import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import {
  getV1TeamsTeamIdFeatureFlagsSettings,
  getV2TeamsTeamIdFeatureFlagsFlags,
  getV1TeamsTeamIdFeatureFlagsFlags,
  getV3TeamsTeamIdMembers,
  postV2TeamsTeamIdMembers,
  postV1TeamsTeamIdRequest,
  getV1TeamsTeamIdRequestUserId,
  postV1TeamsTeamIdMembersTeamsJoin,
  patchV1TeamsTeamIdMembersUid,
  deleteV1TeamsTeamIdMembersUid,
  getV2TeamsTeamId,
  patchV2TeamsTeamId,
  getV2Teams,
  postV1Teams,
  postV1TeamsTeamIdDsyncRoles,
  deleteV1TeamsTeamId,
  deleteV1TeamsTeamIdInvitesInviteId,
  patchV1TeamsTeamIdMicrofrontendsGroupId,
  deleteV1TeamsTeamIdMicrofrontendsGroupId,
} from "./handlers/teams";
import type { Flag } from "packages/models/src/flag.generated.ts";
import type { MarketplaceFlag } from "packages/models/src/marketplaceFlag.generated.ts";
import type { InvitedTeamMember } from "packages/models/src/invitedTeamMember.generated.ts";
import type { Team } from "packages/models/src/team.generated.ts";
import type { TeamLimited } from "packages/models/src/teamLimited.generated.ts";
import type { Pagination } from "packages/models/src/pagination.generated.ts";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.get(
  "/v1/teams/:teamId/feature-flags/settings",
  validate("param", z.object({ teamId: z.string() })),
  validate(
    "query",
    z.object({
      limit: z.coerce.number().int().gte(1).lte(100).optional(),
      cursor: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV1TeamsTeamIdFeatureFlagsSettings({
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
  "/v2/teams/:teamId/feature-flags/flags",
  validate("param", z.object({ teamId: z.string() })),
  validate(
    "query",
    z.object({
      state: z.enum(["active", "archived"]).optional(),
      limit: z.coerce.number().int().gte(1).lte(100).optional(),
      cursor: z.string().optional(),
      search: z.string().max(256).optional(),
      kind: z.enum(["boolean", "string", "number", "json"]).optional(),
      tags: z.array(z.string()).optional(),
      createdBy: z.string().max(256).optional(),
      maintainerIds: z.array(z.string().max(24)).optional(),
      includeMarketplaceFlags: z
        .preprocess((v) => (v === "true" ? true : v === "false" ? false : v), z.boolean())
        .optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV2TeamsTeamIdFeatureFlagsFlags({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);
app.get(
  "/v1/teams/:teamId/feature-flags/flags",
  validate("param", z.object({ teamId: z.string() })),
  validate(
    "query",
    z.object({
      state: z.enum(["active", "archived"]).optional(),
      withMetadata: z
        .preprocess((v) => (v === "true" ? true : v === "false" ? false : v), z.boolean())
        .optional(),
      limit: z.coerce.number().int().gte(1).lte(100).optional(),
      cursor: z.string().optional(),
      search: z.string().max(256).optional(),
      kind: z.enum(["boolean", "string", "number", "json"]).optional(),
      tags: z.array(z.string()).optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV1TeamsTeamIdFeatureFlagsFlags({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);
app.get(
  "/v3/teams/:teamId/members",
  validate("param", z.object({ teamId: z.string() })),
  validate(
    "query",
    z.object({
      limit: z.coerce.number().gte(1).optional(),
      since: z.coerce.number().optional(),
      until: z.coerce.number().optional(),
      search: z.string().optional(),
      role: z
        .enum([
          "OWNER",
          "MEMBER",
          "DEVELOPER",
          "SECURITY",
          "BILLING",
          "VIEWER",
          "VIEWER_FOR_PLUS",
          "CONTRIBUTOR",
        ])
        .optional(),
      excludeProject: z.string().optional(),
      eligibleMembersForProjectId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV3TeamsTeamIdMembers({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);
app.post(
  "/v2/teams/:teamId/members",
  validate("param", z.object({ teamId: z.string() })),
  validate("query", z.object({ slug: z.string().optional() })),
  validate("json", postV2TeamsTeamIdMembersBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV2TeamsTeamIdMembers({ db, env: c.env, user: c.var.user, params, query, body }),
    );
  },
);
app.post(
  "/v1/teams/:teamId/request",
  validate("param", z.object({ teamId: z.string() })),
  validate("json", postV1TeamsTeamIdRequestBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const body = c.req.valid("json");
    return c.json(
      await postV1TeamsTeamIdRequest({ db, env: c.env, user: c.var.user, params, body }),
    );
  },
);
app.get(
  "/v1/teams/:teamId/request/:userId",
  validate("param", z.object({ userId: z.string(), teamId: z.string() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    return c.json(
      await getV1TeamsTeamIdRequestUserId({ db, env: c.env, user: c.var.user, params }),
    );
  },
);
app.post(
  "/v1/teams/:teamId/members/teams/join",
  validate("param", z.object({ teamId: z.string() })),
  validate("json", postV1TeamsTeamIdMembersTeamsJoinBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const body = c.req.valid("json");
    return c.json(
      await postV1TeamsTeamIdMembersTeamsJoin({ db, env: c.env, user: c.var.user, params, body }),
    );
  },
);
app.patch(
  "/v1/teams/:teamId/members/:uid",
  validate("param", z.object({ uid: z.string(), teamId: z.string() })),
  validate("json", patchV1TeamsTeamIdMembersUidBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const body = c.req.valid("json");
    return c.json(
      await patchV1TeamsTeamIdMembersUid({ db, env: c.env, user: c.var.user, params, body }),
    );
  },
);
app.delete(
  "/v1/teams/:teamId/members/:uid",
  validate("param", z.object({ uid: z.string(), teamId: z.string() })),
  validate("query", z.object({ newDefaultTeamId: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await deleteV1TeamsTeamIdMembersUid({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);
app.get(
  "/v2/teams/:teamId",
  validate("param", z.object({ teamId: z.string() })),
  validate("query", z.object({ slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(await getV2TeamsTeamId({ db, env: c.env, user: c.var.user, params, query }));
  },
);
app.patch(
  "/v2/teams/:teamId",
  validate("param", z.object({ teamId: z.string() })),
  validate("query", z.object({ slug: z.string().optional() })),
  validate("json", patchV2TeamsTeamIdBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await patchV2TeamsTeamId({ db, env: c.env, user: c.var.user, params, query, body }),
    );
  },
);
app.get(
  "/v2/teams",
  validate(
    "query",
    z.object({
      limit: z.coerce.number().optional(),
      since: z.coerce.number().optional(),
      until: z.coerce.number().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(await getV2Teams({ db, env: c.env, user: c.var.user, query }));
  },
);
app.post("/v1/teams", validate("json", postV1TeamsBody), async (c) => {
  const db = createDb(c.env.DB);
  const body = c.req.valid("json");
  return c.json(await postV1Teams({ db, env: c.env, user: c.var.user, body }));
});
app.post(
  "/v1/teams/:teamId/dsync-roles",
  validate("param", z.object({ teamId: z.string() })),
  validate("query", z.object({ slug: z.string().optional() })),
  validate("json", postV1TeamsTeamIdDsyncRolesBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV1TeamsTeamIdDsyncRoles({ db, env: c.env, user: c.var.user, params, query, body }),
    );
  },
);
app.delete(
  "/v1/teams/:teamId",
  validate("param", z.object({ teamId: z.string() })),
  validate(
    "query",
    z.object({ newDefaultTeamId: z.string().optional(), slug: z.string().optional() }),
  ),
  validate("json", deleteV1TeamsTeamIdBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await deleteV1TeamsTeamId({ db, env: c.env, user: c.var.user, params, query, body }),
    );
  },
);
app.delete(
  "/v1/teams/:teamId/invites/:inviteId",
  validate("param", z.object({ inviteId: z.string(), teamId: z.string() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    return c.json(
      await deleteV1TeamsTeamIdInvitesInviteId({ db, env: c.env, user: c.var.user, params }),
    );
  },
);
app.patch(
  "/v1/teams/:teamId/microfrontends/:groupId",
  validate("param", z.object({ groupId: z.string(), teamId: z.string() })),
  validate("query", z.object({ slug: z.string().optional() })),
  validate("json", patchV1TeamsTeamIdMicrofrontendsGroupIdBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await patchV1TeamsTeamIdMicrofrontendsGroupId({
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
  "/v1/teams/:teamId/microfrontends/:groupId",
  validate("param", z.object({ groupId: z.string(), teamId: z.string() })),
  validate("query", z.object({ slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await deleteV1TeamsTeamIdMicrofrontendsGroupId({
        db,
        env: c.env,
        user: c.var.user,
        params,
        query,
      }),
    );
  },
);

export type GetV1TeamsTeamIdFeatureFlagsSettingsResponse =
  | Record<string, never>
  | {
      data: Array<{
        typeName: "settings";
        projectId: string;
        ownerId?: string | undefined;
        enabled: boolean;
        environments: Array<string>;
        entities: Array<{
          kind: string;
          label: string;
          attributes: Array<{
            key: string;
            type: string;
            labels?: Array<{ label: string; value: string }> | undefined;
          }>;
        }>;
        createdAt?: number | undefined;
        updatedAt?: number | undefined;
        metadata: {
          activeFlagCount: number;
          archivedFlagCount: number;
          segmentCount: number;
          packSizeInBytes: number;
          packRevision?: number | undefined;
          configUpdatedAt?: number | undefined;
        };
      }>;
      pagination: { next: string | null };
    };

export type GetV1TeamsTeamIdFeatureFlagsSettingsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { teamId: string };
  query: { limit?: number | undefined; cursor?: string | undefined; slug?: string | undefined };
};

export type GetV1TeamsTeamIdFeatureFlagsSettingsHandler = (
  input: GetV1TeamsTeamIdFeatureFlagsSettingsInput,
) => Promise<GetV1TeamsTeamIdFeatureFlagsSettingsResponse>;

export type GetV2TeamsTeamIdFeatureFlagsFlagsResponse = {
  pagination: { next: string | null };
  data: Array<Flag | MarketplaceFlag>;
};

export type GetV2TeamsTeamIdFeatureFlagsFlagsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { teamId: string };
  query: {
    state?: ("active" | "archived") | undefined;
    limit?: number | undefined;
    cursor?: string | undefined;
    search?: string | undefined;
    kind?: ("boolean" | "string" | "number" | "json") | undefined;
    tags?: Array<string> | undefined;
    createdBy?: string | undefined;
    maintainerIds?: Array<string> | undefined;
    includeMarketplaceFlags?: boolean | undefined;
    slug?: string | undefined;
  };
};

export type GetV2TeamsTeamIdFeatureFlagsFlagsHandler = (
  input: GetV2TeamsTeamIdFeatureFlagsFlagsInput,
) => Promise<GetV2TeamsTeamIdFeatureFlagsFlagsResponse>;

export type GetV1TeamsTeamIdFeatureFlagsFlagsResponse = {
  data: Array<Flag>;
  pagination: { next: string | null };
};

export type GetV1TeamsTeamIdFeatureFlagsFlagsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { teamId: string };
  query: {
    state?: ("active" | "archived") | undefined;
    withMetadata?: boolean | undefined;
    limit?: number | undefined;
    cursor?: string | undefined;
    search?: string | undefined;
    kind?: ("boolean" | "string" | "number" | "json") | undefined;
    tags?: Array<string> | undefined;
    slug?: string | undefined;
  };
};

export type GetV1TeamsTeamIdFeatureFlagsFlagsHandler = (
  input: GetV1TeamsTeamIdFeatureFlagsFlagsInput,
) => Promise<GetV1TeamsTeamIdFeatureFlagsFlagsResponse>;

export type GetV3TeamsTeamIdMembersResponse = {
  members: Array<{
    avatar?: string | undefined;
    confirmed: boolean;
    email: string;
    github?: { login?: string | undefined } | undefined;
    gitlab?: { login?: string | undefined } | undefined;
    bitbucket?: { login?: string | undefined } | undefined;
    role:
      | "BILLING"
      | "CONTRIBUTOR"
      | "DEVELOPER"
      | "MEMBER"
      | "OWNER"
      | "SECURITY"
      | "VIEWER"
      | "VIEWER_FOR_PLUS";
    uid: string;
    username: string;
    name?: string | undefined;
    createdAt: number;
    accessRequestedAt?: number | undefined;
    joinedFrom?:
      | {
          origin:
            | "account-update"
            | "bitbucket"
            | "dsync"
            | "feedback"
            | "github"
            | "gitlab"
            | "import"
            | "link"
            | "mail"
            | "nsnb-auto-approve"
            | "nsnb-hobby-upgrade"
            | "nsnb-invite"
            | "nsnb-redeploy"
            | "nsnb-redeploy-attribution-card"
            | "nsnb-request-access"
            | "nsnb-viewer-upgrade"
            | "organization-teams"
            | "saml"
            | "teams";
          commitId?: string | undefined;
          repoId?: string | undefined;
          repoPath?: string | undefined;
          gitUserId?: (string | number) | undefined;
          gitUserLogin?: string | undefined;
          ssoUserId?: string | undefined;
          ssoConnectedAt?: number | undefined;
          idpUserId?: string | undefined;
          dsyncUserId?: string | undefined;
          dsyncConnectedAt?: number | undefined;
        }
      | undefined;
    projects?:
      | Array<{
          name: string;
          id: string;
          role?: ("ADMIN" | "PROJECT_DEVELOPER" | "PROJECT_GUEST" | "PROJECT_VIEWER") | undefined;
        }>
      | undefined;
    isEnterpriseManaged?: boolean | undefined;
  }>;
  emailInviteCodes?:
    | Array<{
        accessGroups?: Array<string> | undefined;
        id: string;
        email?: string | undefined;
        role?:
          | (
              | "BILLING"
              | "CONTRIBUTOR"
              | "DEVELOPER"
              | "MEMBER"
              | "OWNER"
              | "SECURITY"
              | "VIEWER"
              | "VIEWER_FOR_PLUS"
            )
          | undefined;
        teamRoles?:
          | Array<
              | "BILLING"
              | "CONTRIBUTOR"
              | "DEVELOPER"
              | "MEMBER"
              | "OWNER"
              | "SECURITY"
              | "VIEWER"
              | "VIEWER_FOR_PLUS"
            >
          | undefined;
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
        isDSyncUser: boolean;
        createdAt?: number | undefined;
        expired?: true | undefined;
        projects?:
          | Record<string, "ADMIN" | "PROJECT_DEVELOPER" | "PROJECT_GUEST" | "PROJECT_VIEWER">
          | undefined;
        entitlements?: Array<string> | undefined;
      }>
    | undefined;
  pagination: { hasNext: boolean; count: number; next: number | null; prev: number | null };
};

export type GetV3TeamsTeamIdMembersInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { teamId: string };
  query: {
    limit?: number | undefined;
    since?: number | undefined;
    until?: number | undefined;
    search?: string | undefined;
    role?:
      | (
          | "OWNER"
          | "MEMBER"
          | "DEVELOPER"
          | "SECURITY"
          | "BILLING"
          | "VIEWER"
          | "VIEWER_FOR_PLUS"
          | "CONTRIBUTOR"
        )
      | undefined;
    excludeProject?: string | undefined;
    eligibleMembersForProjectId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV3TeamsTeamIdMembersHandler = (
  input: GetV3TeamsTeamIdMembersInput,
) => Promise<GetV3TeamsTeamIdMembersResponse>;

export const postV2TeamsTeamIdMembersBody = z.array(
  z.object({
    email: z.string(),
    role: z
      .enum([
        "OWNER",
        "MEMBER",
        "DEVELOPER",
        "SECURITY",
        "BILLING",
        "VIEWER",
        "VIEWER_FOR_PLUS",
        "CONTRIBUTOR",
      ])
      .optional(),
    projects: z
      .array(
        z.object({
          projectId: z.string().max(64),
          role: z.enum(["ADMIN", "PROJECT_VIEWER", "PROJECT_DEVELOPER", "PROJECT_GUEST"]),
        }),
      )
      .optional(),
  }),
);

export type PostV2TeamsTeamIdMembersBody = Array<{
  email: string;
  role?:
    | (
        | "OWNER"
        | "MEMBER"
        | "DEVELOPER"
        | "SECURITY"
        | "BILLING"
        | "VIEWER"
        | "VIEWER_FOR_PLUS"
        | "CONTRIBUTOR"
      )
    | undefined;
  projects?:
    | Array<{
        projectId: string;
        role: "ADMIN" | "PROJECT_VIEWER" | "PROJECT_DEVELOPER" | "PROJECT_GUEST";
      }>
    | undefined;
}>;

export type PostV2TeamsTeamIdMembersInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { teamId: string };
  query: { slug?: string | undefined };
  body: PostV2TeamsTeamIdMembersBody;
};

export type PostV2TeamsTeamIdMembersHandler = (
  input: PostV2TeamsTeamIdMembersInput,
) => Promise<InvitedTeamMember>;

export const postV1TeamsTeamIdRequestBody = z.object({
  joinedFrom: z.object({
    origin: z.enum([
      "import",
      "teams",
      "github",
      "gitlab",
      "bitbucket",
      "feedback",
      "organization-teams",
    ]),
    commitId: z.string().optional(),
    repoId: z.string().optional(),
    repoPath: z.string().optional(),
    gitUserId: z.union([z.string(), z.number()]).optional(),
    gitUserLogin: z.string().optional(),
  }),
});

export type PostV1TeamsTeamIdRequestBody = {
  joinedFrom: {
    origin:
      | "import"
      | "teams"
      | "github"
      | "gitlab"
      | "bitbucket"
      | "feedback"
      | "organization-teams";
    commitId?: string | undefined;
    repoId?: string | undefined;
    repoPath?: string | undefined;
    gitUserId?: (string | number) | undefined;
    gitUserLogin?: string | undefined;
  };
};

export type PostV1TeamsTeamIdRequestResponse = {
  teamSlug: string;
  teamName: string;
  confirmed?: boolean | undefined;
  joinedFrom?:
    | {
        origin:
          | "account-update"
          | "bitbucket"
          | "dsync"
          | "feedback"
          | "github"
          | "gitlab"
          | "import"
          | "link"
          | "mail"
          | "nsnb-auto-approve"
          | "nsnb-hobby-upgrade"
          | "nsnb-invite"
          | "nsnb-redeploy"
          | "nsnb-redeploy-attribution-card"
          | "nsnb-request-access"
          | "nsnb-viewer-upgrade"
          | "organization-teams"
          | "saml"
          | "teams";
        commitId?: string | undefined;
        repoId?: string | undefined;
        repoPath?: string | undefined;
        gitUserId?: (string | number) | undefined;
        gitUserLogin?: string | undefined;
        ssoUserId?: string | undefined;
        ssoConnectedAt?: number | undefined;
        idpUserId?: string | undefined;
        dsyncUserId?: string | undefined;
        dsyncConnectedAt?: number | undefined;
      }
    | undefined;
  accessRequestedAt?: number | undefined;
  github: { login?: string | undefined } | null;
  gitlab: { login?: string | undefined } | null;
  bitbucket: { login?: string | undefined } | null;
};

export type PostV1TeamsTeamIdRequestInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { teamId: string };
  body: PostV1TeamsTeamIdRequestBody;
};

export type PostV1TeamsTeamIdRequestHandler = (
  input: PostV1TeamsTeamIdRequestInput,
) => Promise<PostV1TeamsTeamIdRequestResponse>;

export type GetV1TeamsTeamIdRequestUserIdResponse = {
  teamSlug: string;
  teamName: string;
  confirmed: boolean;
  joinedFrom: {
    origin:
      | "account-update"
      | "bitbucket"
      | "dsync"
      | "feedback"
      | "github"
      | "gitlab"
      | "import"
      | "link"
      | "mail"
      | "nsnb-auto-approve"
      | "nsnb-hobby-upgrade"
      | "nsnb-invite"
      | "nsnb-redeploy"
      | "nsnb-redeploy-attribution-card"
      | "nsnb-request-access"
      | "nsnb-viewer-upgrade"
      | "organization-teams"
      | "saml"
      | "teams";
    commitId?: string | undefined;
    repoId?: string | undefined;
    repoPath?: string | undefined;
    gitUserId?: (string | number) | undefined;
    gitUserLogin?: string | undefined;
    ssoUserId?: string | undefined;
    ssoConnectedAt?: number | undefined;
    idpUserId?: string | undefined;
    dsyncUserId?: string | undefined;
    dsyncConnectedAt?: number | undefined;
  };
  accessRequestedAt: number;
  github: { login?: string | undefined } | null;
  gitlab: { login?: string | undefined } | null;
  bitbucket: { login?: string | undefined } | null;
};

export type GetV1TeamsTeamIdRequestUserIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { userId: string; teamId: string };
};

export type GetV1TeamsTeamIdRequestUserIdHandler = (
  input: GetV1TeamsTeamIdRequestUserIdInput,
) => Promise<GetV1TeamsTeamIdRequestUserIdResponse>;

export const postV1TeamsTeamIdMembersTeamsJoinBody = z.object({
  inviteCode: z.string().optional(),
});

export type PostV1TeamsTeamIdMembersTeamsJoinBody = { inviteCode?: string | undefined };

export type PostV1TeamsTeamIdMembersTeamsJoinResponse = {
  teamId: string;
  slug: string;
  name: string;
  from: string;
};

export type PostV1TeamsTeamIdMembersTeamsJoinInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { teamId: string };
  body: PostV1TeamsTeamIdMembersTeamsJoinBody;
};

export type PostV1TeamsTeamIdMembersTeamsJoinHandler = (
  input: PostV1TeamsTeamIdMembersTeamsJoinInput,
) => Promise<PostV1TeamsTeamIdMembersTeamsJoinResponse>;

export const patchV1TeamsTeamIdMembersUidBody = z.object({
  confirmed: z.literal(true).optional(),
  role: z.string().optional(),
  teamPermissions: z
    .array(
      z.enum([
        "ConnectorManager",
        "IntegrationManager",
        "CreateProject",
        "FullProductionDeployment",
        "UsageViewer",
        "EnvVariableManager",
        "EnvironmentManager",
        "WorkflowDecryptor",
        "OrgAdmin",
        "OrgViewer",
        "AiGatewaySettings",
        "AiGatewayCredits",
        "AiGatewayApiKeyOwnedBySelf",
        "AiGatewayBudgetManager",
        "V0Builder",
        "V0Chatter",
        "V0Viewer",
      ]),
    )
    .optional(),
  projects: z
    .array(
      z.object({
        projectId: z.string().max(256),
        role: z.enum(["ADMIN", "PROJECT_VIEWER", "PROJECT_DEVELOPER", "null"]).nullable(),
      }),
    )
    .optional(),
  joinedFrom: z.object({ ssoUserId: z.unknown() }).optional(),
});

export type PatchV1TeamsTeamIdMembersUidBody = {
  confirmed?: true | undefined;
  role?: string | undefined;
  teamPermissions?:
    | Array<
        | "ConnectorManager"
        | "IntegrationManager"
        | "CreateProject"
        | "FullProductionDeployment"
        | "UsageViewer"
        | "EnvVariableManager"
        | "EnvironmentManager"
        | "WorkflowDecryptor"
        | "OrgAdmin"
        | "OrgViewer"
        | "AiGatewaySettings"
        | "AiGatewayCredits"
        | "AiGatewayApiKeyOwnedBySelf"
        | "AiGatewayBudgetManager"
        | "V0Builder"
        | "V0Chatter"
        | "V0Viewer"
      >
    | undefined;
  projects?:
    | Array<{
        projectId: string;
        role: "ADMIN" | "PROJECT_VIEWER" | "PROJECT_DEVELOPER" | "null" | null;
      }>
    | undefined;
  joinedFrom?: { ssoUserId: unknown } | undefined;
};

export type PatchV1TeamsTeamIdMembersUidResponse = { id: string };

export type PatchV1TeamsTeamIdMembersUidInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { uid: string; teamId: string };
  body: PatchV1TeamsTeamIdMembersUidBody;
};

export type PatchV1TeamsTeamIdMembersUidHandler = (
  input: PatchV1TeamsTeamIdMembersUidInput,
) => Promise<PatchV1TeamsTeamIdMembersUidResponse>;

export type DeleteV1TeamsTeamIdMembersUidResponse = { id: string };

export type DeleteV1TeamsTeamIdMembersUidInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { uid: string; teamId: string };
  query: { newDefaultTeamId?: string | undefined };
};

export type DeleteV1TeamsTeamIdMembersUidHandler = (
  input: DeleteV1TeamsTeamIdMembersUidInput,
) => Promise<DeleteV1TeamsTeamIdMembersUidResponse>;

export type GetV2TeamsTeamIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { teamId: string };
  query: { slug?: string | undefined };
};

export type GetV2TeamsTeamIdHandler = (input: GetV2TeamsTeamIdInput) => Promise<Team>;

export const patchV2TeamsTeamIdBody = z.object({
  avatar: z
    .string()
    .max(40)
    .regex(/^[0-9a-f]+$/)
    .nullable()
    .optional(),
  description: z.string().max(140).optional(),
  emailDomain: z.string().nullable().optional(),
  name: z.string().max(256).optional(),
  previewDeploymentSuffix: z.string().nullable().optional(),
  regenerateInviteCode: z.boolean().optional(),
  saml: z
    .object({
      enforced: z.boolean().optional(),
      roles: z
        .record(
          z.string(),
          z.union([
            z.enum([
              "OWNER",
              "MEMBER",
              "DEVELOPER",
              "SECURITY",
              "BILLING",
              "VIEWER",
              "VIEWER_FOR_PLUS",
              "CONTRIBUTOR",
            ]),
            z.object({ accessGroupId: z.string().regex(/^ag_[A-z0-9_ -]+$/) }),
          ]),
        )
        .optional(),
    })
    .optional(),
  slug: z.string().optional(),
  enablePreviewFeedback: z.string().optional(),
  enableProductionFeedback: z.string().optional(),
  sensitiveEnvironmentVariablePolicy: z.string().optional(),
  disjunctiveProductionSecretPolicy: z.string().optional(),
  remoteCaching: z.object({ enabled: z.boolean().optional() }).optional(),
  hideIpAddresses: z.boolean().optional(),
  hideIpAddressesInLogDrains: z.boolean().optional(),
  dpAccessRequestsMode: z.enum(["all", "none", "email-domain"]).optional(),
  requireVerifiedCommits: z.boolean().optional(),
  disableRepositoryDispatchEvents: z.boolean().optional(),
  defaultDeploymentProtection: z
    .object({
      passwordProtection: z
        .object({
          deploymentType: z.enum([
            "all",
            "preview",
            "prod_deployment_urls_and_all_previews",
            "all_except_custom_domains",
          ]),
          password: z.string().max(72).nullable().optional(),
        })
        .nullable()
        .optional(),
      ssoProtection: z
        .object({
          deploymentType: z.enum([
            "all",
            "preview",
            "prod_deployment_urls_and_all_previews",
            "all_except_custom_domains",
          ]),
        })
        .nullable()
        .optional(),
    })
    .optional(),
  defaultPassport: z
    .object({
      connectorId: z.string(),
      deploymentType: z
        .enum([
          "all",
          "preview",
          "prod_deployment_urls_and_all_previews",
          "all_except_custom_domains",
        ])
        .optional(),
    })
    .nullable()
    .optional(),
  defaultExpirationSettings: z
    .object({
      expiration: z
        .enum(["3y", "2y", "1y", "6m", "3m", "2m", "1m", "2w", "1w", "1d", "unlimited"])
        .optional(),
      expirationProduction: z
        .enum(["3y", "2y", "1y", "6m", "3m", "2m", "1m", "2w", "1w", "1d", "unlimited"])
        .optional(),
      expirationCanceled: z
        .enum(["1y", "6m", "3m", "2m", "1m", "2w", "1w", "1d", "unlimited"])
        .optional(),
      expirationErrored: z
        .enum(["1y", "6m", "3m", "2m", "1m", "2w", "1w", "1d", "unlimited"])
        .optional(),
    })
    .optional(),
  deploymentPolicy: z
    .union([
      z.object({
        gitSources: z
          .union([
            z.array(
              z.object({
                enabled: z.boolean(),
                environments: z.array(
                  z.union([
                    z.object({
                      type: z.literal("system"),
                      target: z.enum(["production", "preview"]),
                    }),
                    z.object({ type: z.literal("custom"), environmentId: z.string() }),
                  ]),
                ),
                sources: z.array(
                  z.union([
                    z.object({
                      provider: z.enum(["github", "bitbucket"]),
                      org: z.string(),
                      repo: z.string().optional(),
                    }),
                    z.object({
                      provider: z.literal("gitlab"),
                      namespace: z.string(),
                      project: z.string().optional(),
                    }),
                  ]),
                ),
              }),
            ),
            z.string(),
          ])
          .optional(),
        deploymentSources: z
          .union([
            z.array(
              z.object({
                enabled: z.boolean(),
                environments: z.array(
                  z.union([
                    z.object({
                      type: z.literal("system"),
                      target: z.enum(["production", "preview"]),
                    }),
                    z.object({ type: z.literal("custom"), environmentId: z.string() }),
                  ]),
                ),
                sources: z.array(
                  z.enum(["git", "cli", "rest-api", "deploy-hook", "integration", "v0"]),
                ),
              }),
            ),
            z.string(),
          ])
          .optional(),
      }),
      z.string(),
    ])
    .optional(),
  strictDeploymentProtectionSettings: z.object({ enabled: z.boolean() }).optional(),
  strictShareableLinks: z.object({ enabled: z.boolean() }).optional(),
  strictPasswordProtectionSettings: z.object({ enabled: z.boolean() }).optional(),
  nsnbConfig: z
    .union([
      z.object({ preference: z.enum(["auto-approval", "manual-approval", "block"]) }),
      z.string(),
    ])
    .optional(),
  defaultProjectJobs: z
    .union([
      z.object({
        lint: z.object({ targets: z.array(z.string()) }).optional(),
        typecheck: z.object({ targets: z.array(z.string()) }).optional(),
      }),
      z.string(),
    ])
    .optional(),
  resourceConfig: z
    .object({
      buildMachine: z
        .object({
          default: z.enum(["basic", "enhanced", "turbo", "standard", "elastic"]).optional(),
        })
        .optional(),
    })
    .optional(),
});

export type PatchV2TeamsTeamIdBody = {
  avatar?: (string | null) | undefined;
  description?: string | undefined;
  emailDomain?: (unknown | null) | undefined;
  name?: string | undefined;
  previewDeploymentSuffix?: (string | null) | undefined;
  regenerateInviteCode?: boolean | undefined;
  saml?:
    | {
        enforced?: boolean | undefined;
        roles?:
          | Record<
              string,
              | "OWNER"
              | "MEMBER"
              | "DEVELOPER"
              | "SECURITY"
              | "BILLING"
              | "VIEWER"
              | "VIEWER_FOR_PLUS"
              | "CONTRIBUTOR"
              | { accessGroupId: string }
            >
          | undefined;
      }
    | undefined;
  slug?: string | undefined;
  enablePreviewFeedback?: string | undefined;
  enableProductionFeedback?: string | undefined;
  sensitiveEnvironmentVariablePolicy?: string | undefined;
  disjunctiveProductionSecretPolicy?: string | undefined;
  remoteCaching?: { enabled?: boolean | undefined } | undefined;
  hideIpAddresses?: boolean | undefined;
  hideIpAddressesInLogDrains?: boolean | undefined;
  dpAccessRequestsMode?: ("all" | "none" | "email-domain") | undefined;
  requireVerifiedCommits?: boolean | undefined;
  disableRepositoryDispatchEvents?: boolean | undefined;
  defaultDeploymentProtection?:
    | {
        passwordProtection?:
          | ({
              deploymentType:
                | "all"
                | "preview"
                | "prod_deployment_urls_and_all_previews"
                | "all_except_custom_domains";
              password?: (string | null) | undefined;
            } | null)
          | undefined;
        ssoProtection?:
          | ({
              deploymentType:
                | "all"
                | "preview"
                | "prod_deployment_urls_and_all_previews"
                | "all_except_custom_domains";
            } | null)
          | undefined;
      }
    | undefined;
  defaultPassport?:
    | ({
        connectorId: string;
        deploymentType?:
          | (
              | "all"
              | "preview"
              | "prod_deployment_urls_and_all_previews"
              | "all_except_custom_domains"
            )
          | undefined;
      } | null)
    | undefined;
  defaultExpirationSettings?:
    | {
        expiration?:
          | ("3y" | "2y" | "1y" | "6m" | "3m" | "2m" | "1m" | "2w" | "1w" | "1d" | "unlimited")
          | undefined;
        expirationProduction?:
          | ("3y" | "2y" | "1y" | "6m" | "3m" | "2m" | "1m" | "2w" | "1w" | "1d" | "unlimited")
          | undefined;
        expirationCanceled?:
          | ("1y" | "6m" | "3m" | "2m" | "1m" | "2w" | "1w" | "1d" | "unlimited")
          | undefined;
        expirationErrored?:
          | ("1y" | "6m" | "3m" | "2m" | "1m" | "2w" | "1w" | "1d" | "unlimited")
          | undefined;
      }
    | undefined;
  deploymentPolicy?:
    | (
        | {
            gitSources?:
              | (
                  | Array<{
                      enabled: boolean;
                      environments: Array<
                        | { type: "system"; target: "production" | "preview" }
                        | { type: "custom"; environmentId: string }
                      >;
                      sources: Array<
                        | {
                            provider: "github" | "bitbucket";
                            org: string;
                            repo?: string | undefined;
                          }
                        | { provider: "gitlab"; namespace: string; project?: string | undefined }
                      >;
                    }>
                  | string
                )
              | undefined;
            deploymentSources?:
              | (
                  | Array<{
                      enabled: boolean;
                      environments: Array<
                        | { type: "system"; target: "production" | "preview" }
                        | { type: "custom"; environmentId: string }
                      >;
                      sources: Array<
                        "git" | "cli" | "rest-api" | "deploy-hook" | "integration" | "v0"
                      >;
                    }>
                  | string
                )
              | undefined;
          }
        | string
      )
    | undefined;
  strictDeploymentProtectionSettings?: { enabled: boolean } | undefined;
  strictShareableLinks?: { enabled: boolean } | undefined;
  strictPasswordProtectionSettings?: { enabled: boolean } | undefined;
  nsnbConfig?: ({ preference: "auto-approval" | "manual-approval" | "block" } | string) | undefined;
  defaultProjectJobs?:
    | (
        | {
            lint?: { targets: Array<string> } | undefined;
            typecheck?: { targets: Array<string> } | undefined;
          }
        | string
      )
    | undefined;
  resourceConfig?:
    | {
        buildMachine?:
          | { default?: ("basic" | "enhanced" | "turbo" | "standard" | "elastic") | undefined }
          | undefined;
      }
    | undefined;
};

export type PatchV2TeamsTeamIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { teamId: string };
  query: { slug?: string | undefined };
  body: PatchV2TeamsTeamIdBody;
};

export type PatchV2TeamsTeamIdHandler = (input: PatchV2TeamsTeamIdInput) => Promise<Team>;

export type GetV2TeamsResponse = { teams: Array<Team | TeamLimited>; pagination: Pagination };

export type GetV2TeamsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { limit?: number | undefined; since?: number | undefined; until?: number | undefined };
};

export type GetV2TeamsHandler = (input: GetV2TeamsInput) => Promise<GetV2TeamsResponse>;

export const postV1TeamsBody = z.object({
  slug: z.string().max(48),
  name: z.string().max(256).optional(),
  attribution: z
    .object({
      sessionReferrer: z.string().optional(),
      landingPage: z.string().optional(),
      pageBeforeConversionPage: z.string().optional(),
      utm: z
        .object({
          utmSource: z.string().optional(),
          utmMedium: z.string().optional(),
          utmCampaign: z.string().optional(),
          utmTerm: z.string().optional(),
        })
        .optional(),
    })
    .optional(),
});

export type PostV1TeamsBody = {
  slug: string;
  name?: string | undefined;
  attribution?:
    | {
        sessionReferrer?: string | undefined;
        landingPage?: string | undefined;
        pageBeforeConversionPage?: string | undefined;
        utm?:
          | {
              utmSource?: string | undefined;
              utmMedium?: string | undefined;
              utmCampaign?: string | undefined;
              utmTerm?: string | undefined;
            }
          | undefined;
      }
    | undefined;
};

export type PostV1TeamsResponse = { id: string; slug: string };

export type PostV1TeamsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  body: PostV1TeamsBody;
};

export type PostV1TeamsHandler = (input: PostV1TeamsInput) => Promise<PostV1TeamsResponse>;

export const postV1TeamsTeamIdDsyncRolesBody = z.object({
  roles: z.record(
    z.string(),
    z.union([
      z.enum([
        "OWNER",
        "MEMBER",
        "DEVELOPER",
        "SECURITY",
        "BILLING",
        "VIEWER",
        "VIEWER_FOR_PLUS",
        "CONTRIBUTOR",
      ]),
      z.object({ accessGroupId: z.string().regex(/^ag_[A-z0-9_ -]+$/) }),
    ]),
  ),
});

export type PostV1TeamsTeamIdDsyncRolesBody = {
  roles: Record<
    string,
    | "OWNER"
    | "MEMBER"
    | "DEVELOPER"
    | "SECURITY"
    | "BILLING"
    | "VIEWER"
    | "VIEWER_FOR_PLUS"
    | "CONTRIBUTOR"
    | { accessGroupId: string }
  >;
};

export type PostV1TeamsTeamIdDsyncRolesResponse = { ok: boolean };

export type PostV1TeamsTeamIdDsyncRolesInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { teamId: string };
  query: { slug?: string | undefined };
  body: PostV1TeamsTeamIdDsyncRolesBody;
};

export type PostV1TeamsTeamIdDsyncRolesHandler = (
  input: PostV1TeamsTeamIdDsyncRolesInput,
) => Promise<PostV1TeamsTeamIdDsyncRolesResponse>;

export const deleteV1TeamsTeamIdBody = z.object({
  reasons: z.array(z.object({ slug: z.string(), description: z.string() })).optional(),
});

export type DeleteV1TeamsTeamIdBody = {
  reasons?: Array<{ slug: string; description: string }> | undefined;
};

export type DeleteV1TeamsTeamIdResponse = {
  id: string;
  newDefaultTeamIdError?: boolean | undefined;
};

export type DeleteV1TeamsTeamIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { teamId: string };
  query: { newDefaultTeamId?: string | undefined; slug?: string | undefined };
  body: DeleteV1TeamsTeamIdBody;
};

export type DeleteV1TeamsTeamIdHandler = (
  input: DeleteV1TeamsTeamIdInput,
) => Promise<DeleteV1TeamsTeamIdResponse>;

export type DeleteV1TeamsTeamIdInvitesInviteIdResponse = { id: string };

export type DeleteV1TeamsTeamIdInvitesInviteIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { inviteId: string; teamId: string };
};

export type DeleteV1TeamsTeamIdInvitesInviteIdHandler = (
  input: DeleteV1TeamsTeamIdInvitesInviteIdInput,
) => Promise<DeleteV1TeamsTeamIdInvitesInviteIdResponse>;

export const patchV1TeamsTeamIdMicrofrontendsGroupIdBody = z.object({
  name: z.string().optional(),
  fallbackEnvironment: z.string().optional(),
  enablePolyrepoBranchRouting: z.boolean().optional(),
});

export type PatchV1TeamsTeamIdMicrofrontendsGroupIdBody = {
  name?: string | undefined;
  fallbackEnvironment?: string | undefined;
  enablePolyrepoBranchRouting?: boolean | undefined;
};

export type PatchV1TeamsTeamIdMicrofrontendsGroupIdResponse = {
  updatedMicrofrontendsGroup: {
    name?: string | undefined;
    slug?: string | undefined;
    id: string;
    fallbackEnvironment?: string | undefined;
    enablePolyrepoBranchRouting?: boolean | undefined;
  };
};

export type PatchV1TeamsTeamIdMicrofrontendsGroupIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { groupId: string; teamId: string };
  query: { slug?: string | undefined };
  body: PatchV1TeamsTeamIdMicrofrontendsGroupIdBody;
};

export type PatchV1TeamsTeamIdMicrofrontendsGroupIdHandler = (
  input: PatchV1TeamsTeamIdMicrofrontendsGroupIdInput,
) => Promise<PatchV1TeamsTeamIdMicrofrontendsGroupIdResponse>;

export type DeleteV1TeamsTeamIdMicrofrontendsGroupIdResponse = Record<string, never>;

export type DeleteV1TeamsTeamIdMicrofrontendsGroupIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { groupId: string; teamId: string };
  query: { slug?: string | undefined };
};

export type DeleteV1TeamsTeamIdMicrofrontendsGroupIdHandler = (
  input: DeleteV1TeamsTeamIdMicrofrontendsGroupIdInput,
) => Promise<DeleteV1TeamsTeamIdMicrofrontendsGroupIdResponse>;
