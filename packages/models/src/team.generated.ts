import { z } from "zod";

export type Team =
  | {
      connect?: { enabled?: boolean | undefined } | undefined;
      creatorId: string;
      updatedAt: number;
      emailDomain?: (string | null) | undefined;
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
            defaultRedirectUri?: ("v0.app" | "v0.dev" | "vercel.com") | undefined;
            roles?:
              | Record<
                  string,
                  | { accessGroupId: string }
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
          }
        | undefined;
      inviteCode?: string | undefined;
      billing: { plan: "enterprise" | "hobby" | "pro" } | null;
      description: string | null;
      defaultRoles?:
        | {
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
          }
        | undefined;
      stagingPrefix: string;
      resourceConfig?:
        | {
            concurrentBuilds?: number | undefined;
            elasticConcurrencyEnabled?: boolean | undefined;
            edgeConfigSize?: number | undefined;
            edgeConfigs?: number | undefined;
            kvDatabases?: number | undefined;
            blobStores?: number | undefined;
            postgresDatabases?: number | undefined;
            customEnvironmentsPerProject?: number | undefined;
            serverlessFunctionMaxMemorySize?: number | undefined;
            buildEntitlements?: { enhancedBuilds?: boolean | undefined } | undefined;
            buildMachine?:
              | { default?: ("basic" | "elastic" | "enhanced" | "standard" | "turbo") | undefined }
              | undefined;
          }
        | undefined;
      previewDeploymentSuffix?: (string | null) | undefined;
      platform?: boolean | undefined;
      disableHardAutoBlocks?: (number | boolean) | undefined;
      remoteCaching?: { enabled?: boolean | undefined } | undefined;
      defaultDeploymentProtection?:
        | {
            passwordProtection?: ({ deploymentType: string } | null) | undefined;
            ssoProtection?: ({ deploymentType: string } | null) | undefined;
          }
        | undefined;
      defaultPassport?:
        | ({
            connectorId: string;
            deploymentType:
              | "all"
              | "all_except_custom_domains"
              | "preview"
              | "prod_deployment_urls_and_all_previews";
          } | null)
        | undefined;
      defaultExpirationSettings?:
        | {
            expirationDays?: number | undefined;
            expirationDaysProduction?: number | undefined;
            expirationDaysCanceled?: number | undefined;
            expirationDaysErrored?: number | undefined;
            deploymentsToKeep?: number | undefined;
          }
        | undefined;
      defaultProjectJobs?:
        | {
            lint?: { targets: Array<string> } | undefined;
            typecheck?: { targets: Array<string> } | undefined;
            "mfe-config-present"?: { targets: Array<string> } | undefined;
          }
        | undefined;
      enablePreviewFeedback?:
        | ("default" | "default-force" | "off" | "off-force" | "on" | "on-force" | "null" | null)
        | undefined;
      enableProductionFeedback?:
        | ("default" | "default-force" | "off" | "off-force" | "on" | "on-force" | "null" | null)
        | undefined;
      sensitiveEnvironmentVariablePolicy?: ("default" | "off" | "on" | "null" | null) | undefined;
      disjunctiveProductionSecretPolicy?: ("default" | "off" | "on" | "null" | null) | undefined;
      hideIpAddresses?: (boolean | null) | undefined;
      hideIpAddressesInLogDrains?: (boolean | null) | undefined;
      dpAccessRequestsMode?: ("all" | "email-domain" | "none") | undefined;
      ipBuckets?:
        | Array<{
            bucket: string;
            supportUntil?: number | undefined;
            default?: boolean | undefined;
          }>
        | undefined;
      requireVerifiedCommits?: boolean | undefined;
      disableRepositoryDispatchEvents?: boolean | undefined;
      strictDeploymentProtectionSettings?: { enabled: boolean; updatedAt: number } | undefined;
      strictShareableLinks?: { enabled: boolean; updatedAt: number } | undefined;
      strictPasswordProtectionSettings?: { enabled: boolean; updatedAt: number } | undefined;
      nsnbConfig?: { preference: "auto-approval" | "block" | "manual-approval" } | undefined;
      deploymentPolicy?:
        | {
            gitSources?:
              | Array<{
                  sources: Array<
                    | { provider: "bitbucket" | "github"; org: string; repo?: string | undefined }
                    | { provider: "gitlab"; namespace: string; project?: string | undefined }
                  >;
                  enabled: boolean;
                  environments: Array<
                    | { type: "system"; target: "preview" | "production" }
                    | { type: "custom"; environmentId: string }
                  >;
                }>
              | undefined;
            deploymentSources?:
              | Array<{
                  sources: Array<"cli" | "deploy-hook" | "git" | "integration" | "rest-api" | "v0">;
                  enabled: boolean;
                  environments: Array<
                    | { type: "system"; target: "preview" | "production" }
                    | { type: "custom"; environmentId: string }
                  >;
                }>
              | undefined;
          }
        | undefined;
      personalAccessTokensInvalidatedAt?: number | undefined;
      appTokensInvalidatedAt?: number | undefined;
      apiKeysInvalidatedAt?: number | undefined;
      integrationTokensInvalidatedAt?: number | undefined;
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
    }
  | Record<string, unknown>;

export const team = z
  .object({
    connect: z.object({ enabled: z.boolean().optional() }).optional(),
    creatorId: z.string(),
    updatedAt: z.number(),
    emailDomain: z.string().nullable().optional(),
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
        defaultRedirectUri: z.enum(["v0.app", "v0.dev", "vercel.com"]).optional(),
        roles: z
          .record(
            z.string(),
            z.union([
              z.object({ accessGroupId: z.string() }),
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
            ]),
          )
          .optional(),
      })
      .optional(),
    inviteCode: z.string().optional(),
    billing: z.object({ plan: z.enum(["enterprise", "hobby", "pro"]) }).nullable(),
    description: z.string().nullable(),
    defaultRoles: z
      .object({
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
      })
      .optional(),
    stagingPrefix: z.string(),
    resourceConfig: z
      .object({
        concurrentBuilds: z.number().optional(),
        elasticConcurrencyEnabled: z.boolean().optional(),
        edgeConfigSize: z.number().optional(),
        edgeConfigs: z.number().optional(),
        kvDatabases: z.number().optional(),
        blobStores: z.number().optional(),
        postgresDatabases: z.number().optional(),
        customEnvironmentsPerProject: z.number().optional(),
        serverlessFunctionMaxMemorySize: z.number().optional(),
        buildEntitlements: z.object({ enhancedBuilds: z.boolean().optional() }).optional(),
        buildMachine: z
          .object({
            default: z.enum(["basic", "elastic", "enhanced", "standard", "turbo"]).optional(),
          })
          .optional(),
      })
      .optional(),
    previewDeploymentSuffix: z.string().nullable().optional(),
    platform: z.boolean().optional(),
    disableHardAutoBlocks: z.union([z.number(), z.boolean()]).optional(),
    remoteCaching: z.object({ enabled: z.boolean().optional() }).optional(),
    defaultDeploymentProtection: z
      .object({
        passwordProtection: z.object({ deploymentType: z.string() }).nullable().optional(),
        ssoProtection: z.object({ deploymentType: z.string() }).nullable().optional(),
      })
      .optional(),
    defaultPassport: z
      .object({
        connectorId: z.string(),
        deploymentType: z.enum([
          "all",
          "all_except_custom_domains",
          "preview",
          "prod_deployment_urls_and_all_previews",
        ]),
      })
      .nullable()
      .optional(),
    defaultExpirationSettings: z
      .object({
        expirationDays: z.number().optional(),
        expirationDaysProduction: z.number().optional(),
        expirationDaysCanceled: z.number().optional(),
        expirationDaysErrored: z.number().optional(),
        deploymentsToKeep: z.number().optional(),
      })
      .optional(),
    defaultProjectJobs: z
      .object({
        lint: z.object({ targets: z.array(z.string()) }).optional(),
        typecheck: z.object({ targets: z.array(z.string()) }).optional(),
        "mfe-config-present": z.object({ targets: z.array(z.string()) }).optional(),
      })
      .optional(),
    enablePreviewFeedback: z
      .enum(["default", "default-force", "off", "off-force", "on", "on-force", "null"])
      .nullable()
      .optional(),
    enableProductionFeedback: z
      .enum(["default", "default-force", "off", "off-force", "on", "on-force", "null"])
      .nullable()
      .optional(),
    sensitiveEnvironmentVariablePolicy: z
      .enum(["default", "off", "on", "null"])
      .nullable()
      .optional(),
    disjunctiveProductionSecretPolicy: z
      .enum(["default", "off", "on", "null"])
      .nullable()
      .optional(),
    hideIpAddresses: z.boolean().nullable().optional(),
    hideIpAddressesInLogDrains: z.boolean().nullable().optional(),
    dpAccessRequestsMode: z.enum(["all", "email-domain", "none"]).optional(),
    ipBuckets: z
      .array(
        z.object({
          bucket: z.string(),
          supportUntil: z.number().optional(),
          default: z.boolean().optional(),
        }),
      )
      .optional(),
    requireVerifiedCommits: z.boolean().optional(),
    disableRepositoryDispatchEvents: z.boolean().optional(),
    strictDeploymentProtectionSettings: z
      .object({ enabled: z.boolean(), updatedAt: z.number() })
      .optional(),
    strictShareableLinks: z.object({ enabled: z.boolean(), updatedAt: z.number() }).optional(),
    strictPasswordProtectionSettings: z
      .object({ enabled: z.boolean(), updatedAt: z.number() })
      .optional(),
    nsnbConfig: z
      .object({ preference: z.enum(["auto-approval", "block", "manual-approval"]) })
      .optional(),
    deploymentPolicy: z
      .object({
        gitSources: z
          .array(
            z.object({
              sources: z.array(
                z.union([
                  z.object({
                    provider: z.enum(["bitbucket", "github"]),
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
              enabled: z.boolean(),
              environments: z.array(
                z.union([
                  z.object({
                    type: z.literal("system"),
                    target: z.enum(["preview", "production"]),
                  }),
                  z.object({ type: z.literal("custom"), environmentId: z.string() }),
                ]),
              ),
            }),
          )
          .optional(),
        deploymentSources: z
          .array(
            z.object({
              sources: z.array(
                z.enum(["cli", "deploy-hook", "git", "integration", "rest-api", "v0"]),
              ),
              enabled: z.boolean(),
              environments: z.array(
                z.union([
                  z.object({
                    type: z.literal("system"),
                    target: z.enum(["preview", "production"]),
                  }),
                  z.object({ type: z.literal("custom"), environmentId: z.string() }),
                ]),
              ),
            }),
          )
          .optional(),
      })
      .optional(),
    personalAccessTokensInvalidatedAt: z.number().optional(),
    appTokensInvalidatedAt: z.number().optional(),
    apiKeysInvalidatedAt: z.number().optional(),
    integrationTokensInvalidatedAt: z.number().optional(),
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
  })
  .and(z.record(z.string(), z.unknown()));
