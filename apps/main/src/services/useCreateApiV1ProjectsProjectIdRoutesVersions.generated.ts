import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1ProjectsProjectIdRoutesVersionsArgs = {
  projectId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: { id: string; action: "promote" | "restore" | "discard" };
};

export const useCreateApiV1ProjectsProjectIdRoutesVersionsResponse = z.object({
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

export type UseCreateApiV1ProjectsProjectIdRoutesVersionsResponse = {
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

export type CreateApiV1ProjectsProjectIdRoutesVersionsBody = {
  id: string;
  action: "promote" | "restore" | "discard";
};

export const useCreateApiV1ProjectsProjectIdRoutesVersions = (
  options: UseMutationOptions<
    UseCreateApiV1ProjectsProjectIdRoutesVersionsResponse,
    Error,
    UseCreateApiV1ProjectsProjectIdRoutesVersionsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1ProjectsProjectIdRoutesVersionsArgs) =>
      apiFetch(
        buildUrl("/v1/projects/{projectId}/routes/versions", {
          projectId: args.projectId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useCreateApiV1ProjectsProjectIdRoutesVersionsResponse,
        {
          method: "POST",
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
