import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV4AliasesIdOrAliasArgs = {
  from?: number | undefined;
  idOrAlias: string;
  projectId?: string | undefined;
  since?: number | undefined;
  until?: number | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useGetApiV4AliasesIdOrAliasResponse = z.object({
  alias: z.string(),
  created: z.string(),
  createdAt: z.number().nullable().optional(),
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
  updatedAt: z.number().nullable().optional(),
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
          z.object({ fallbackHost: z.string(), branchAlias: z.string(), projectId: z.string() }),
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
});

export const getApiV4AliasesIdOrAliasQueryOptions = (args: UseGetApiV4AliasesIdOrAliasArgs) =>
  queryOptions({
    queryKey: [
      "GET /v4/aliases/{idOrAlias}",
      "aliases",
      args.from,
      args.idOrAlias,
      args.projectId,
      args.since,
      args.until,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v4/aliases/{idOrAlias}", {
          idOrAlias: args.idOrAlias,
          from: args.from,
          projectId: args.projectId,
          since: args.since,
          until: args.until,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV4AliasesIdOrAliasResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV4AliasesIdOrAlias = (args: UseGetApiV4AliasesIdOrAliasArgs) =>
  useQuery(getApiV4AliasesIdOrAliasQueryOptions(args));
