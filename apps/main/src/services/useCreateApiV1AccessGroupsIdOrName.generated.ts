import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1AccessGroupsIdOrNameArgs = {
  idOrName: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: {
    name?: string | undefined;
    projects?:
      | Array<{
          projectId: string;
          role: "ADMIN" | "PROJECT_VIEWER" | "PROJECT_DEVELOPER" | "null" | null;
        }>
      | undefined;
    membersToAdd?: Array<string> | undefined;
    membersToRemove?: Array<string> | undefined;
  };
};

export const useCreateApiV1AccessGroupsIdOrNameResponse = z.object({
  entitlements: z.array(z.literal("v0")),
  name: z.string(),
  createdAt: z.string(),
  teamId: z.string(),
  updatedAt: z.string(),
  accessGroupId: z.string(),
  membersCount: z.number(),
  projectsCount: z.number(),
  teamRoles: z.array(z.string()).optional(),
  teamPermissions: z.array(z.string()).optional(),
});

export type UseCreateApiV1AccessGroupsIdOrNameResponse = {
  entitlements: Array<"v0">;
  name: string;
  createdAt: string;
  teamId: string;
  updatedAt: string;
  accessGroupId: string;
  membersCount: number;
  projectsCount: number;
  teamRoles?: Array<string> | undefined;
  teamPermissions?: Array<string> | undefined;
};

export type CreateApiV1AccessGroupsIdOrNameBody = {
  name?: string | undefined;
  projects?:
    | Array<{
        projectId: string;
        role: "ADMIN" | "PROJECT_VIEWER" | "PROJECT_DEVELOPER" | "null" | null;
      }>
    | undefined;
  membersToAdd?: Array<string> | undefined;
  membersToRemove?: Array<string> | undefined;
};

export const useCreateApiV1AccessGroupsIdOrName = (
  options: UseMutationOptions<
    UseCreateApiV1AccessGroupsIdOrNameResponse,
    Error,
    UseCreateApiV1AccessGroupsIdOrNameArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1AccessGroupsIdOrNameArgs) =>
      apiFetch(
        buildUrl("/v1/access-groups/{idOrName}", {
          idOrName: args.idOrName,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useCreateApiV1AccessGroupsIdOrNameResponse,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["access-groups"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
