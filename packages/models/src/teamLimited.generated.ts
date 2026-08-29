import { z } from "zod";

export type TeamLimited = {
  limited: true;
  limitedBy: Array<"invalidated" | "mfa" | "scope">;
  saml?:
    | {
        connection?:
          | {
              type: string;
              state: string;
              connectedAt: number;
              lastReceivedWebhookEvent?: number | undefined;
              lastSyncedAt?: number | undefined;
              syncState?: ("ACTIVE" | "SETUP") | undefined;
              status: string;
            }
          | undefined;
        directory?:
          | {
              type: string;
              state: string;
              connectedAt: number;
              lastReceivedWebhookEvent?: number | undefined;
              lastSyncedAt?: number | undefined;
              syncState?: ("ACTIVE" | "SETUP") | undefined;
            }
          | undefined;
        enforced: boolean;
      }
    | undefined;
  id: string;
  slug: string;
  name: string | null;
  avatar: string | null;
  membership?:
    | {
        uid?: string | undefined;
        entitlements?: Array<{ entitlement: string }> | undefined;
        teamId?: string | undefined;
        confirmed: true;
        accessRequestedAt?: number | undefined;
        role:
          | "BILLING"
          | "CONTRIBUTOR"
          | "DEVELOPER"
          | "MEMBER"
          | "OWNER"
          | "SECURITY"
          | "VIEWER"
          | "VIEWER_FOR_PLUS";
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
        createdAt: number;
        created: number;
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
      }
    | undefined;
  createdAt: number;
  parentId?: string | undefined;
  orgRootTeamId?: string | undefined;
};

export const teamLimited = z.object({
  limited: z.literal(true),
  limitedBy: z.array(z.enum(["invalidated", "mfa", "scope"])),
  saml: z
    .object({
      connection: z
        .object({
          type: z.string(),
          state: z.string(),
          connectedAt: z.number(),
          lastReceivedWebhookEvent: z.number().optional(),
          lastSyncedAt: z.number().optional(),
          syncState: z.enum(["ACTIVE", "SETUP"]).optional(),
          status: z.string(),
        })
        .optional(),
      directory: z
        .object({
          type: z.string(),
          state: z.string(),
          connectedAt: z.number(),
          lastReceivedWebhookEvent: z.number().optional(),
          lastSyncedAt: z.number().optional(),
          syncState: z.enum(["ACTIVE", "SETUP"]).optional(),
        })
        .optional(),
      enforced: z.boolean(),
    })
    .optional(),
  id: z.string(),
  slug: z.string(),
  name: z.string().nullable(),
  avatar: z.string().nullable(),
  membership: z
    .object({
      uid: z.string().optional(),
      entitlements: z.array(z.object({ entitlement: z.string() })).optional(),
      teamId: z.string().optional(),
      confirmed: z.literal(true),
      accessRequestedAt: z.number().optional(),
      role: z.enum([
        "BILLING",
        "CONTRIBUTOR",
        "DEVELOPER",
        "MEMBER",
        "OWNER",
        "SECURITY",
        "VIEWER",
        "VIEWER_FOR_PLUS",
      ]),
      teamRoles: z
        .array(
          z.enum([
            "BILLING",
            "CONTRIBUTOR",
            "DEVELOPER",
            "MEMBER",
            "OWNER",
            "SECURITY",
            "VIEWER",
            "VIEWER_FOR_PLUS",
          ]),
        )
        .optional(),
      teamPermissions: z
        .array(
          z.enum([
            "AiGatewayApiKeyOwnedBySelf",
            "AiGatewayBudgetManager",
            "AiGatewayCredits",
            "AiGatewaySettings",
            "ConnectorManager",
            "CreateProject",
            "EnvVariableManager",
            "EnvironmentManager",
            "FullProductionDeployment",
            "IntegrationManager",
            "OrgAdmin",
            "OrgViewer",
            "UsageViewer",
            "V0Builder",
            "V0Chatter",
            "V0Viewer",
            "WorkflowDecryptor",
          ]),
        )
        .optional(),
      createdAt: z.number(),
      created: z.number(),
      joinedFrom: z
        .object({
          origin: z.enum([
            "account-update",
            "bitbucket",
            "dsync",
            "feedback",
            "github",
            "gitlab",
            "import",
            "link",
            "mail",
            "nsnb-auto-approve",
            "nsnb-hobby-upgrade",
            "nsnb-invite",
            "nsnb-redeploy",
            "nsnb-redeploy-attribution-card",
            "nsnb-request-access",
            "nsnb-viewer-upgrade",
            "organization-teams",
            "saml",
            "teams",
          ]),
          commitId: z.string().optional(),
          repoId: z.string().optional(),
          repoPath: z.string().optional(),
          gitUserId: z.union([z.string(), z.number()]).optional(),
          gitUserLogin: z.string().optional(),
          ssoUserId: z.string().optional(),
          ssoConnectedAt: z.number().optional(),
          idpUserId: z.string().optional(),
          dsyncUserId: z.string().optional(),
          dsyncConnectedAt: z.number().optional(),
        })
        .optional(),
    })
    .optional(),
  createdAt: z.number(),
  parentId: z.string().optional(),
  orgRootTeamId: z.string().optional(),
});
