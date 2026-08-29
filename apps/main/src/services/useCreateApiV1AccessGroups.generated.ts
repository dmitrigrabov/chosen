import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1AccessGroupsArgs = {
  teamId?: string | undefined;
  slug?: string | undefined;
  body: {
    name: string;
    projects?:
      | Array<{
          projectId: string;
          role: "ADMIN" | "PROJECT_VIEWER" | "PROJECT_DEVELOPER" | "null" | null;
        }>
      | undefined;
    membersToAdd?: Array<string> | undefined;
  };
};

export const useCreateApiV1AccessGroupsResponse = z.object({
  entitlements: z.array(z.literal("v0")),
  membersCount: z.number(),
  projectsCount: z.number(),
  name: z.string(),
  createdAt: z.string(),
  teamId: z.string(),
  updatedAt: z.string(),
  accessGroupId: z.string(),
  teamRoles: z.array(z.string()).optional(),
  teamPermissions: z.array(z.string()).optional(),
});

export type UseCreateApiV1AccessGroupsResponse = {
  entitlements: Array<"v0">;
  membersCount: number;
  projectsCount: number;
  name: string;
  createdAt: string;
  teamId: string;
  updatedAt: string;
  accessGroupId: string;
  teamRoles?: Array<string> | undefined;
  teamPermissions?: Array<string> | undefined;
};

export type CreateApiV1AccessGroupsBody = {
  name: string;
  projects?:
    | Array<{
        projectId: string;
        role: "ADMIN" | "PROJECT_VIEWER" | "PROJECT_DEVELOPER" | "null" | null;
      }>
    | undefined;
  membersToAdd?: Array<string> | undefined;
};

export const useCreateApiV1AccessGroups = (
  options: UseMutationOptions<
    UseCreateApiV1AccessGroupsResponse,
    Error,
    UseCreateApiV1AccessGroupsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1AccessGroupsArgs) =>
      apiFetch(
        buildUrl("/v1/access-groups", { teamId: args.teamId, slug: args.slug }),
        useCreateApiV1AccessGroupsResponse,
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
