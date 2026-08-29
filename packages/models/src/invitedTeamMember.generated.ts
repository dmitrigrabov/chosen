import { z } from "zod";

export type InvitedTeamMember = {
  uid: string;
  username: string;
  email: string;
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
};

export const invitedTeamMember = z.object({
  uid: z.string(),
  username: z.string(),
  email: z.string(),
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
});
