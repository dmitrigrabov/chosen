import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV1TeamsTeamIdMicrofrontendsGroupIdArgs = {
  groupId: string;
  teamId: string;
  slug?: string | undefined;
};

export const useDeleteApiV1TeamsTeamIdMicrofrontendsGroupIdResponse = z.object({});

export type UseDeleteApiV1TeamsTeamIdMicrofrontendsGroupIdResponse = Record<string, never>;

export type DeleteApiV1TeamsTeamIdMicrofrontendsGroupIdBody = void;

export const useDeleteApiV1TeamsTeamIdMicrofrontendsGroupId = (
  options: UseMutationOptions<
    UseDeleteApiV1TeamsTeamIdMicrofrontendsGroupIdResponse,
    Error,
    UseDeleteApiV1TeamsTeamIdMicrofrontendsGroupIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiV1TeamsTeamIdMicrofrontendsGroupIdArgs) =>
      apiFetch(
        buildUrl("/v1/teams/{teamId}/microfrontends/{groupId}", {
          groupId: args.groupId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useDeleteApiV1TeamsTeamIdMicrofrontendsGroupIdResponse,
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
