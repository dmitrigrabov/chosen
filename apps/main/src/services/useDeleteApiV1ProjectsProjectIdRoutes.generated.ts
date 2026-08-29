import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV1ProjectsProjectIdRoutesArgs = {
  projectId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: { routeIds: Array<string> };
};

export const useDeleteApiV1ProjectsProjectIdRoutesResponse = z.object({
  deletedCount: z.number(),
  version: z.object({
    id: z.string(),
    s3Key: z.string(),
    lastModified: z.number(),
    createdBy: z.string(),
    isStaging: z.boolean().optional(),
    isLive: z.boolean().optional(),
    ruleCount: z.number().optional(),
    alias: z.string().optional(),
  }),
});

export type UseDeleteApiV1ProjectsProjectIdRoutesResponse = {
  deletedCount: number;
  version: {
    id: string;
    s3Key: string;
    lastModified: number;
    createdBy: string;
    isStaging?: boolean | undefined;
    isLive?: boolean | undefined;
    ruleCount?: number | undefined;
    alias?: string | undefined;
  };
};

export type DeleteApiV1ProjectsProjectIdRoutesBody = { routeIds: Array<string> };

export const useDeleteApiV1ProjectsProjectIdRoutes = (
  options: UseMutationOptions<
    UseDeleteApiV1ProjectsProjectIdRoutesResponse,
    Error,
    UseDeleteApiV1ProjectsProjectIdRoutesArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiV1ProjectsProjectIdRoutesArgs) =>
      apiFetch(
        buildUrl("/v1/projects/{projectId}/routes", {
          projectId: args.projectId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useDeleteApiV1ProjectsProjectIdRoutesResponse,
        {
          method: "DELETE",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["project-routes"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
