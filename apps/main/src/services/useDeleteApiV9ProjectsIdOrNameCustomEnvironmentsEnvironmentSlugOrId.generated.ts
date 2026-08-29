import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV9ProjectsIdOrNameCustomEnvironmentsEnvironmentSlugOrIdArgs = {
  idOrName: string;
  environmentSlugOrId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: { deleteUnassignedEnvironmentVariables?: boolean | undefined };
};

export const useDeleteApiV9ProjectsIdOrNameCustomEnvironmentsEnvironmentSlugOrIdResponse = z.object(
  {
    id: z.string(),
    slug: z.string(),
    type: z.enum(["development", "preview", "production"]),
    description: z.string().optional(),
    branchMatcher: z
      .object({ type: z.enum(["endsWith", "equals", "startsWith"]), pattern: z.string() })
      .optional(),
    domains: z
      .array(
        z.object({
          name: z.string(),
          apexName: z.string(),
          projectId: z.string(),
          redirect: z.string().nullable().optional(),
          redirectStatusCode: z
            .union([
              z.literal(301),
              z.literal(302),
              z.literal(307),
              z.literal(308),
              z.literal(null),
            ])
            .nullable()
            .optional(),
          gitBranch: z.string().nullable().optional(),
          customEnvironmentId: z.string().nullable().optional(),
          updatedAt: z.number().optional(),
          createdAt: z.number().optional(),
          verified: z.boolean(),
          verification: z
            .array(
              z.object({
                type: z.string(),
                domain: z.string(),
                value: z.string(),
                reason: z.string(),
              }),
            )
            .optional(),
        }),
      )
      .optional(),
    currentDeploymentAliases: z.array(z.string()).optional(),
    createdAt: z.number(),
    updatedAt: z.number(),
  },
);

export type UseDeleteApiV9ProjectsIdOrNameCustomEnvironmentsEnvironmentSlugOrIdResponse = {
  id: string;
  slug: string;
  type: "development" | "preview" | "production";
  description?: string | undefined;
  branchMatcher?: { type: "endsWith" | "equals" | "startsWith"; pattern: string } | undefined;
  domains?:
    | Array<{
        name: string;
        apexName: string;
        projectId: string;
        redirect?: (string | null) | undefined;
        redirectStatusCode?: (number | null) | undefined;
        gitBranch?: (string | null) | undefined;
        customEnvironmentId?: (string | null) | undefined;
        updatedAt?: number | undefined;
        createdAt?: number | undefined;
        verified: boolean;
        verification?:
          | Array<{ type: string; domain: string; value: string; reason: string }>
          | undefined;
      }>
    | undefined;
  currentDeploymentAliases?: Array<string> | undefined;
  createdAt: number;
  updatedAt: number;
};

export type DeleteApiV9ProjectsIdOrNameCustomEnvironmentsEnvironmentSlugOrIdBody = {
  deleteUnassignedEnvironmentVariables?: boolean | undefined;
};

export const useDeleteApiV9ProjectsIdOrNameCustomEnvironmentsEnvironmentSlugOrId = (
  options: UseMutationOptions<
    UseDeleteApiV9ProjectsIdOrNameCustomEnvironmentsEnvironmentSlugOrIdResponse,
    Error,
    UseDeleteApiV9ProjectsIdOrNameCustomEnvironmentsEnvironmentSlugOrIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiV9ProjectsIdOrNameCustomEnvironmentsEnvironmentSlugOrIdArgs) =>
      apiFetch(
        buildUrl("/v9/projects/{idOrName}/custom-environments/{environmentSlugOrId}", {
          idOrName: args.idOrName,
          environmentSlugOrId: args.environmentSlugOrId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useDeleteApiV9ProjectsIdOrNameCustomEnvironmentsEnvironmentSlugOrIdResponse,
        {
          method: "DELETE",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["environment"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
