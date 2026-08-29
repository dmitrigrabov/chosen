import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV1TeamsTeamIdMembersUidArgs = {
  uid: string;
  newDefaultTeamId?: string | undefined;
  teamId: string;
};

export const useDeleteApiV1TeamsTeamIdMembersUidResponse = z.object({ id: z.string() });

export type UseDeleteApiV1TeamsTeamIdMembersUidResponse = { id: string };

export type DeleteApiV1TeamsTeamIdMembersUidBody = void;

export const useDeleteApiV1TeamsTeamIdMembersUid = (
  options: UseMutationOptions<
    UseDeleteApiV1TeamsTeamIdMembersUidResponse,
    Error,
    UseDeleteApiV1TeamsTeamIdMembersUidArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiV1TeamsTeamIdMembersUidArgs) =>
      apiFetch(
        buildUrl("/v1/teams/{teamId}/members/{uid}", {
          uid: args.uid,
          teamId: args.teamId,
          newDefaultTeamId: args.newDefaultTeamId,
        }),
        useDeleteApiV1TeamsTeamIdMembersUidResponse,
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
