import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV1TeamsTeamIdInvitesInviteIdArgs = { inviteId: string; teamId: string };

export const useDeleteApiV1TeamsTeamIdInvitesInviteIdResponse = z.object({ id: z.string() });

export type UseDeleteApiV1TeamsTeamIdInvitesInviteIdResponse = { id: string };

export type DeleteApiV1TeamsTeamIdInvitesInviteIdBody = void;

export const useDeleteApiV1TeamsTeamIdInvitesInviteId = (
  options: UseMutationOptions<
    UseDeleteApiV1TeamsTeamIdInvitesInviteIdResponse,
    Error,
    UseDeleteApiV1TeamsTeamIdInvitesInviteIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiV1TeamsTeamIdInvitesInviteIdArgs) =>
      apiFetch(
        buildUrl("/v1/teams/{teamId}/invites/{inviteId}", {
          inviteId: args.inviteId,
          teamId: args.teamId,
        }),
        useDeleteApiV1TeamsTeamIdInvitesInviteIdResponse,
        { method: "DELETE" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["teams"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
