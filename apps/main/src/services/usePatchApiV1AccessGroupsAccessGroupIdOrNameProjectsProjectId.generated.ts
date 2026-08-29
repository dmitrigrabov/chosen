import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UsePatchApiV1AccessGroupsAccessGroupIdOrNameProjectsProjectIdArgs = {
  accessGroupIdOrName: string;
  projectId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: { role: string };
};

export const usePatchApiV1AccessGroupsAccessGroupIdOrNameProjectsProjectIdResponse = z.object({
  teamId: z.string(),
  accessGroupId: z.string(),
  projectId: z.string(),
  role: z.enum(["ADMIN", "PROJECT_DEVELOPER", "PROJECT_GUEST", "PROJECT_VIEWER"]),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type UsePatchApiV1AccessGroupsAccessGroupIdOrNameProjectsProjectIdResponse = {
  teamId: string;
  accessGroupId: string;
  projectId: string;
  role: "ADMIN" | "PROJECT_DEVELOPER" | "PROJECT_GUEST" | "PROJECT_VIEWER";
  createdAt: string;
  updatedAt: string;
};

export type PatchApiV1AccessGroupsAccessGroupIdOrNameProjectsProjectIdBody = { role: string };

export const usePatchApiV1AccessGroupsAccessGroupIdOrNameProjectsProjectId = (
  options: UseMutationOptions<
    UsePatchApiV1AccessGroupsAccessGroupIdOrNameProjectsProjectIdResponse,
    Error,
    UsePatchApiV1AccessGroupsAccessGroupIdOrNameProjectsProjectIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UsePatchApiV1AccessGroupsAccessGroupIdOrNameProjectsProjectIdArgs) =>
      apiFetch(
        buildUrl("/v1/access-groups/{accessGroupIdOrName}/projects/{projectId}", {
          accessGroupIdOrName: args.accessGroupIdOrName,
          projectId: args.projectId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        usePatchApiV1AccessGroupsAccessGroupIdOrNameProjectsProjectIdResponse,
        {
          method: "PATCH",
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
