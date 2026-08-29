import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV1TeamsTeamIdArgs = {
  newDefaultTeamId?: string | undefined;
  teamId: string;
  slug?: string | undefined;
  body: { reasons?: Array<{ slug: string; description: string }> | undefined };
};

export const useDeleteApiV1TeamsTeamIdResponse = z.object({
  id: z.string(),
  newDefaultTeamIdError: z.boolean().optional(),
});

export type UseDeleteApiV1TeamsTeamIdResponse = {
  id: string;
  newDefaultTeamIdError?: boolean | undefined;
};

export type DeleteApiV1TeamsTeamIdBody = {
  reasons?: Array<{ slug: string; description: string }> | undefined;
};

export const useDeleteApiV1TeamsTeamId = (
  options: UseMutationOptions<
    UseDeleteApiV1TeamsTeamIdResponse,
    Error,
    UseDeleteApiV1TeamsTeamIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiV1TeamsTeamIdArgs) =>
      apiFetch(
        buildUrl("/v1/teams/{teamId}", {
          teamId: args.teamId,
          newDefaultTeamId: args.newDefaultTeamId,
          slug: args.slug,
        }),
        useDeleteApiV1TeamsTeamIdResponse,
        {
          method: "DELETE",
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
