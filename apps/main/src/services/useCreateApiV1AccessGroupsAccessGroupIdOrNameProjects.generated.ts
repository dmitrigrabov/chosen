import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1AccessGroupsAccessGroupIdOrNameProjectsArgs = {
  accessGroupIdOrName: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: { projectId: string; role: "ADMIN" | "PROJECT_VIEWER" | "PROJECT_DEVELOPER" };
};

export const useCreateApiV1AccessGroupsAccessGroupIdOrNameProjectsResponse = z.object({
  teamId: z.string(),
  accessGroupId: z.string(),
  projectId: z.string(),
  role: z.enum(["ADMIN", "PROJECT_DEVELOPER", "PROJECT_GUEST", "PROJECT_VIEWER"]),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type UseCreateApiV1AccessGroupsAccessGroupIdOrNameProjectsResponse = {
  teamId: string;
  accessGroupId: string;
  projectId: string;
  role: "ADMIN" | "PROJECT_DEVELOPER" | "PROJECT_GUEST" | "PROJECT_VIEWER";
  createdAt: string;
  updatedAt: string;
};

export type CreateApiV1AccessGroupsAccessGroupIdOrNameProjectsBody = {
  projectId: string;
  role: "ADMIN" | "PROJECT_VIEWER" | "PROJECT_DEVELOPER";
};

export const useCreateApiV1AccessGroupsAccessGroupIdOrNameProjects = (
  options: UseMutationOptions<
    UseCreateApiV1AccessGroupsAccessGroupIdOrNameProjectsResponse,
    Error,
    UseCreateApiV1AccessGroupsAccessGroupIdOrNameProjectsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1AccessGroupsAccessGroupIdOrNameProjectsArgs) =>
      apiFetch(
        buildUrl("/v1/access-groups/{accessGroupIdOrName}/projects", {
          accessGroupIdOrName: args.accessGroupIdOrName,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useCreateApiV1AccessGroupsAccessGroupIdOrNameProjectsResponse,
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
