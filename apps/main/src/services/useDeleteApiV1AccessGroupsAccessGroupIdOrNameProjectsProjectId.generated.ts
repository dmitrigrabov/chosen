import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV1AccessGroupsAccessGroupIdOrNameProjectsProjectIdArgs = {
  accessGroupIdOrName: string;
  projectId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useDeleteApiV1AccessGroupsAccessGroupIdOrNameProjectsProjectIdResponse = z.void();

export type UseDeleteApiV1AccessGroupsAccessGroupIdOrNameProjectsProjectIdResponse = void;

export type DeleteApiV1AccessGroupsAccessGroupIdOrNameProjectsProjectIdBody = void;

export const useDeleteApiV1AccessGroupsAccessGroupIdOrNameProjectsProjectId = (
  options: UseMutationOptions<
    UseDeleteApiV1AccessGroupsAccessGroupIdOrNameProjectsProjectIdResponse,
    Error,
    UseDeleteApiV1AccessGroupsAccessGroupIdOrNameProjectsProjectIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiV1AccessGroupsAccessGroupIdOrNameProjectsProjectIdArgs) =>
      apiFetch(
        buildUrl("/v1/access-groups/{accessGroupIdOrName}/projects/{projectId}", {
          accessGroupIdOrName: args.accessGroupIdOrName,
          projectId: args.projectId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useDeleteApiV1AccessGroupsAccessGroupIdOrNameProjectsProjectIdResponse,
        { method: "DELETE" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["access-groups"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
