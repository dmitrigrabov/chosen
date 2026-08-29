import { z } from "zod";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV9ProjectsIdOrNameCustomEnvironmentsEnvironmentSlugOrIdResponse = z.object({
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
          .union([z.literal(301), z.literal(302), z.literal(307), z.literal(308), z.literal(null)])
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
});

export type UseGetApiV9ProjectsIdOrNameCustomEnvironmentsEnvironmentSlugOrIdArgs = {
  idOrName: string;
  environmentSlugOrId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV9ProjectsIdOrNameCustomEnvironmentsEnvironmentSlugOrIdQueryOptions = (
  args: UseGetApiV9ProjectsIdOrNameCustomEnvironmentsEnvironmentSlugOrIdArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v9/projects/{idOrName}/custom-environments/{environmentSlugOrId}",
      "environment",
      args.idOrName,
      args.environmentSlugOrId,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v9/projects/{idOrName}/custom-environments/{environmentSlugOrId}", {
          idOrName: args.idOrName,
          environmentSlugOrId: args.environmentSlugOrId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV9ProjectsIdOrNameCustomEnvironmentsEnvironmentSlugOrIdResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV9ProjectsIdOrNameCustomEnvironmentsEnvironmentSlugOrId = (
  args: UseGetApiV9ProjectsIdOrNameCustomEnvironmentsEnvironmentSlugOrIdArgs,
) => useQuery(getApiV9ProjectsIdOrNameCustomEnvironmentsEnvironmentSlugOrIdQueryOptions(args));
