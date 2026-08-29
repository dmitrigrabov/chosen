import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseUpdateApiV1ProjectsProjectIdRoutesArgs = {
  projectId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: {
    overwrite?: boolean | undefined;
    routes?:
      | Array<{
          id: string;
          name: string;
          description?: string | undefined;
          enabled?: boolean | undefined;
          route: {
            src: string;
            dest?: string | undefined;
            headers?: Record<string, never> | undefined;
            caseSensitive?: boolean | undefined;
            status?: number | undefined;
            has?:
              | Array<{
                  type?: ("host" | "header" | "cookie" | "query") | undefined;
                  key?: string | undefined;
                  value?: string | undefined;
                }>
              | undefined;
            missing?:
              | Array<{
                  type?: ("host" | "header" | "cookie" | "query") | undefined;
                  key?: string | undefined;
                  value?: string | undefined;
                }>
              | undefined;
            transforms?:
              | Array<{
                  type?: ("request.headers" | "request.query" | "response.headers") | undefined;
                  op?: ("append" | "set" | "delete") | undefined;
                  target?: Record<string, never> | undefined;
                  args: unknown;
                  env?: Array<string> | undefined;
                }>
              | undefined;
            respectOriginCacheControl?: boolean | undefined;
          };
        }>
      | undefined;
  };
};

export const useUpdateApiV1ProjectsProjectIdRoutesResponse = z.object({
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

export type UseUpdateApiV1ProjectsProjectIdRoutesResponse = {
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

export type UpdateApiV1ProjectsProjectIdRoutesBody = {
  overwrite?: boolean | undefined;
  routes?:
    | Array<{
        id: string;
        name: string;
        description?: string | undefined;
        enabled?: boolean | undefined;
        route: {
          src: string;
          dest?: string | undefined;
          headers?: Record<string, never> | undefined;
          caseSensitive?: boolean | undefined;
          status?: number | undefined;
          has?:
            | Array<{
                type?: ("host" | "header" | "cookie" | "query") | undefined;
                key?: string | undefined;
                value?: string | undefined;
              }>
            | undefined;
          missing?:
            | Array<{
                type?: ("host" | "header" | "cookie" | "query") | undefined;
                key?: string | undefined;
                value?: string | undefined;
              }>
            | undefined;
          transforms?:
            | Array<{
                type?: ("request.headers" | "request.query" | "response.headers") | undefined;
                op?: ("append" | "set" | "delete") | undefined;
                target?: Record<string, never> | undefined;
                args: unknown;
                env?: Array<string> | undefined;
              }>
            | undefined;
          respectOriginCacheControl?: boolean | undefined;
        };
      }>
    | undefined;
};

export const useUpdateApiV1ProjectsProjectIdRoutes = (
  options: UseMutationOptions<
    UseUpdateApiV1ProjectsProjectIdRoutesResponse,
    Error,
    UseUpdateApiV1ProjectsProjectIdRoutesArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseUpdateApiV1ProjectsProjectIdRoutesArgs) =>
      apiFetch(
        buildUrl("/v1/projects/{projectId}/routes", {
          projectId: args.projectId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useUpdateApiV1ProjectsProjectIdRoutesResponse,
        {
          method: "PUT",
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
