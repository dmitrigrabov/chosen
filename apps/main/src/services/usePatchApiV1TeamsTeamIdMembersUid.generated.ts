import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UsePatchApiV1TeamsTeamIdMembersUidArgs = {
  uid: string;
  teamId: string;
  body: {
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
};

export const usePatchApiV1TeamsTeamIdMembersUidResponse = z.object({ id: z.string() });

export type UsePatchApiV1TeamsTeamIdMembersUidResponse = { id: string };

export type PatchApiV1TeamsTeamIdMembersUidBody = {
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

export const usePatchApiV1TeamsTeamIdMembersUid = (
  options: UseMutationOptions<
    UsePatchApiV1TeamsTeamIdMembersUidResponse,
    Error,
    UsePatchApiV1TeamsTeamIdMembersUidArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UsePatchApiV1TeamsTeamIdMembersUidArgs) =>
      apiFetch(
        buildUrl("/v1/teams/{teamId}/members/{uid}", { uid: args.uid, teamId: args.teamId }),
        usePatchApiV1TeamsTeamIdMembersUidResponse,
        {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["teams"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
