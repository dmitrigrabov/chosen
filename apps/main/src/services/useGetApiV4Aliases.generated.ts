import { z } from "zod";
import { pagination } from "packages/models/src/pagination.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV4AliasesResponse = z.object({
  aliases: z.array(
    z.object({
      alias: z.string(),
      created: z.string(),
      createdAt: z.number().optional(),
      creator: z
        .object({ uid: z.string(), email: z.string().optional(), username: z.string().optional() })
        .optional(),
      deletedAt: z.number().nullable().optional(),
      deployment: z
        .object({ id: z.string(), url: z.string().optional(), meta: z.string().optional() })
        .optional(),
      deploymentId: z.string().nullable(),
      projectId: z.string().nullable(),
      redirect: z.string().nullable().optional(),
      redirectStatusCode: z
        .union([z.literal(301), z.literal(302), z.literal(307), z.literal(308), z.literal(null)])
        .nullable()
        .optional(),
      uid: z.string(),
      updatedAt: z.number().optional(),
      protectionBypass: z
        .record(
          z.string(),
          z.union([
            z.object({
              createdAt: z.number(),
              createdBy: z.string(),
              scope: z.literal("shareable-link"),
              expires: z.number().optional(),
            }),
            z.object({
              createdAt: z.number(),
              lastUpdatedAt: z.number(),
              lastUpdatedBy: z.string(),
              access: z.enum(["granted", "requested"]),
              scope: z.literal("user"),
            }),
            z.object({
              createdAt: z.number(),
              createdBy: z.string(),
              scope: z.literal("alias-protection-override"),
            }),
            z.object({
              createdAt: z.number(),
              lastUpdatedAt: z.number(),
              lastUpdatedBy: z.string(),
              scope: z.literal("email_invite"),
            }),
          ]),
        )
        .optional(),
      microfrontends: z
        .object({
          defaultApp: z.object({ projectId: z.string() }),
          applications: z.union([
            z.array(z.object({ fallbackHost: z.string(), projectId: z.string() })),
            z.array(
              z.object({
                fallbackHost: z.string(),
                branchAlias: z.string(),
                projectId: z.string(),
              }),
            ),
            z.array(
              z.object({
                deploymentId: z.string().optional(),
                branchDeploymentId: z.string().optional(),
                fallbackDeploymentId: z.string().optional(),
                fallbackHost: z.string().optional(),
                branchAlias: z.string().optional(),
                projectId: z.string(),
              }),
            ),
          ]),
        })
        .optional(),
    }),
  ),
  pagination: pagination,
});

export type UseGetApiV4AliasesArgs = {
  domain?: (Array<string> | string) | undefined;
  from?: number | undefined;
  limit?: number | undefined;
  projectId?: string | undefined;
  since?: number | undefined;
  until?: number | undefined;
  rollbackDeploymentId?: string | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV4AliasesQueryOptions = (args: UseGetApiV4AliasesArgs) =>
  queryOptions({
    queryKey: [
      "GET /v4/aliases",
      "aliases",
      args.domain,
      args.from,
      args.limit,
      args.projectId,
      args.since,
      args.until,
      args.rollbackDeploymentId,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v4/aliases", {
          domain: args.domain,
          from: args.from,
          limit: args.limit,
          projectId: args.projectId,
          since: args.since,
          until: args.until,
          rollbackDeploymentId: args.rollbackDeploymentId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV4AliasesResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV4Aliases = (args: UseGetApiV4AliasesArgs) =>
  useQuery(getApiV4AliasesQueryOptions(args));
