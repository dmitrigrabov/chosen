import {
  invitedTeamMember,
  type InvitedTeamMember,
} from "packages/models/src/invitedTeamMember.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV2TeamsTeamIdMembersArgs = {
  teamId: string;
  slug?: string | undefined;
  body: Array<{
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
};

export type CreateApiV2TeamsTeamIdMembersBody = Array<{
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

export const useCreateApiV2TeamsTeamIdMembers = (
  options: UseMutationOptions<
    InvitedTeamMember,
    Error,
    UseCreateApiV2TeamsTeamIdMembersArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV2TeamsTeamIdMembersArgs) =>
      apiFetch(
        buildUrl("/v2/teams/{teamId}/members", { teamId: args.teamId, slug: args.slug }),
        invitedTeamMember,
        {
          method: "POST",
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
