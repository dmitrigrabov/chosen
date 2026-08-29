import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1TeamsTeamIdMembersTeamsJoinArgs = {
  teamId: string;
  body: { inviteCode?: string | undefined };
};

export const useCreateApiV1TeamsTeamIdMembersTeamsJoinResponse = z.object({
  teamId: z.string(),
  slug: z.string(),
  name: z.string(),
  from: z.string(),
});

export type UseCreateApiV1TeamsTeamIdMembersTeamsJoinResponse = {
  teamId: string;
  slug: string;
  name: string;
  from: string;
};

export type CreateApiV1TeamsTeamIdMembersTeamsJoinBody = { inviteCode?: string | undefined };

export const useCreateApiV1TeamsTeamIdMembersTeamsJoin = (
  options: UseMutationOptions<
    UseCreateApiV1TeamsTeamIdMembersTeamsJoinResponse,
    Error,
    UseCreateApiV1TeamsTeamIdMembersTeamsJoinArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1TeamsTeamIdMembersTeamsJoinArgs) =>
      apiFetch(
        buildUrl("/v1/teams/{teamId}/members/teams/join", { teamId: args.teamId }),
        useCreateApiV1TeamsTeamIdMembersTeamsJoinResponse,
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
