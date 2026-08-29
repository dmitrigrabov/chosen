import { z } from "zod";
import { pagination } from "packages/models/src/pagination.generated.ts";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV9ProjectsIdOrNameDomainsArgs = {
  idOrName: string;
  production?: ("true" | "false") | undefined;
  target?: ("production" | "preview") | undefined;
  customEnvironmentId?: string | undefined;
  gitBranch?: string | undefined;
  redirects?: ("true" | "false") | undefined;
  redirect?: string | undefined;
  verified?: ("true" | "false") | undefined;
  limit?: number | undefined;
  since?: number | undefined;
  until?: number | undefined;
  order?: ("ASC" | "DESC") | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useGetApiV9ProjectsIdOrNameDomainsResponse = z.union([
  z.object({
    domains: z.array(
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
    ),
    pagination: z.object({
      count: z.number(),
      next: z.number().nullable(),
      prev: z.number().nullable(),
    }),
  }),
  z.object({
    domains: z.array(
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
    ),
    pagination: pagination,
  }),
]);

export const getApiV9ProjectsIdOrNameDomainsQueryOptions = (
  args: UseGetApiV9ProjectsIdOrNameDomainsArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v9/projects/{idOrName}/domains",
      "projects",
      args.idOrName,
      args.production,
      args.target,
      args.customEnvironmentId,
      args.gitBranch,
      args.redirects,
      args.redirect,
      args.verified,
      args.limit,
      args.since,
      args.until,
      args.order,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v9/projects/{idOrName}/domains", {
          idOrName: args.idOrName,
          production: args.production,
          target: args.target,
          customEnvironmentId: args.customEnvironmentId,
          gitBranch: args.gitBranch,
          redirects: args.redirects,
          redirect: args.redirect,
          verified: args.verified,
          limit: args.limit,
          since: args.since,
          until: args.until,
          order: args.order,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV9ProjectsIdOrNameDomainsResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV9ProjectsIdOrNameDomains = (args: UseGetApiV9ProjectsIdOrNameDomainsArgs) =>
  useQuery(getApiV9ProjectsIdOrNameDomainsQueryOptions(args));
