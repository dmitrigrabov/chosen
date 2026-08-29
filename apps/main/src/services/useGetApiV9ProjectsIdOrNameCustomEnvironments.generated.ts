import { z } from "zod";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV9ProjectsIdOrNameCustomEnvironmentsResponse = z.object({
  accountLimit: z.object({ total: z.number() }),
  environments: z.array(
    z.object({
      type: z.enum(["development", "preview", "production"]),
      description: z.string().optional(),
      createdAt: z.number(),
      updatedAt: z.number(),
      slug: z.string(),
      id: z.string(),
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
      branchMatcher: z
        .object({ type: z.enum(["endsWith", "equals", "startsWith"]), pattern: z.string() })
        .optional(),
      currentDeploymentAliases: z.array(z.string()).optional(),
    }),
  ),
});

export type UseGetApiV9ProjectsIdOrNameCustomEnvironmentsArgs = {
  idOrName: string;
  gitBranch?: string | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV9ProjectsIdOrNameCustomEnvironmentsQueryOptions = (
  args: UseGetApiV9ProjectsIdOrNameCustomEnvironmentsArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v9/projects/{idOrName}/custom-environments",
      "environment",
      args.idOrName,
      args.gitBranch,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v9/projects/{idOrName}/custom-environments", {
          idOrName: args.idOrName,
          gitBranch: args.gitBranch,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV9ProjectsIdOrNameCustomEnvironmentsResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV9ProjectsIdOrNameCustomEnvironments = (
  args: UseGetApiV9ProjectsIdOrNameCustomEnvironmentsArgs,
) => useQuery(getApiV9ProjectsIdOrNameCustomEnvironmentsQueryOptions(args));
