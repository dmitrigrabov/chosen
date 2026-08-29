import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1TeamsTeamIdDsyncRolesArgs = {
  teamId: string;
  slug?: string | undefined;
  body: {
    roles: Record<
      string,
      | "OWNER"
      | "MEMBER"
      | "DEVELOPER"
      | "SECURITY"
      | "BILLING"
      | "VIEWER"
      | "VIEWER_FOR_PLUS"
      | "CONTRIBUTOR"
      | { accessGroupId: string }
    >;
  };
};

export const useCreateApiV1TeamsTeamIdDsyncRolesResponse = z.object({ ok: z.boolean() });

export type UseCreateApiV1TeamsTeamIdDsyncRolesResponse = { ok: boolean };

export type CreateApiV1TeamsTeamIdDsyncRolesBody = {
  roles: Record<
    string,
    | "OWNER"
    | "MEMBER"
    | "DEVELOPER"
    | "SECURITY"
    | "BILLING"
    | "VIEWER"
    | "VIEWER_FOR_PLUS"
    | "CONTRIBUTOR"
    | { accessGroupId: string }
  >;
};

export const useCreateApiV1TeamsTeamIdDsyncRoles = (
  options: UseMutationOptions<
    UseCreateApiV1TeamsTeamIdDsyncRolesResponse,
    Error,
    UseCreateApiV1TeamsTeamIdDsyncRolesArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1TeamsTeamIdDsyncRolesArgs) =>
      apiFetch(
        buildUrl("/v1/teams/{teamId}/dsync-roles", { teamId: args.teamId, slug: args.slug }),
        useCreateApiV1TeamsTeamIdDsyncRolesResponse,
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
