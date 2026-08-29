import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UsePatchApiV1TeamsTeamIdMicrofrontendsGroupIdArgs = {
  groupId: string;
  teamId: string;
  slug?: string | undefined;
  body: {
    name?: string | undefined;
    fallbackEnvironment?: string | undefined;
    enablePolyrepoBranchRouting?: boolean | undefined;
  };
};

export const usePatchApiV1TeamsTeamIdMicrofrontendsGroupIdResponse = z.object({
  updatedMicrofrontendsGroup: z.object({
    name: z.string().optional(),
    slug: z.string().optional(),
    id: z.string(),
    fallbackEnvironment: z.string().optional(),
    enablePolyrepoBranchRouting: z.boolean().optional(),
  }),
});

export type UsePatchApiV1TeamsTeamIdMicrofrontendsGroupIdResponse = {
  updatedMicrofrontendsGroup: {
    name?: string | undefined;
    slug?: string | undefined;
    id: string;
    fallbackEnvironment?: string | undefined;
    enablePolyrepoBranchRouting?: boolean | undefined;
  };
};

export type PatchApiV1TeamsTeamIdMicrofrontendsGroupIdBody = {
  name?: string | undefined;
  fallbackEnvironment?: string | undefined;
  enablePolyrepoBranchRouting?: boolean | undefined;
};

export const usePatchApiV1TeamsTeamIdMicrofrontendsGroupId = (
  options: UseMutationOptions<
    UsePatchApiV1TeamsTeamIdMicrofrontendsGroupIdResponse,
    Error,
    UsePatchApiV1TeamsTeamIdMicrofrontendsGroupIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UsePatchApiV1TeamsTeamIdMicrofrontendsGroupIdArgs) =>
      apiFetch(
        buildUrl("/v1/teams/{teamId}/microfrontends/{groupId}", {
          groupId: args.groupId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        usePatchApiV1TeamsTeamIdMicrofrontendsGroupIdResponse,
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
