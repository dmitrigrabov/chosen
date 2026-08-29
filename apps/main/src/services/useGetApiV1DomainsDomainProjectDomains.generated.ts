import { z } from "zod";
import { pagination } from "packages/models/src/pagination.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV1DomainsDomainProjectDomainsResponse = z.object({
  projectDomains: z.array(
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
          z.object({ type: z.string(), domain: z.string(), value: z.string(), reason: z.string() }),
        )
        .optional(),
    }),
  ),
  pagination: pagination,
});

export type UseGetApiV1DomainsDomainProjectDomainsArgs = {
  domain: string;
  limit?: number | undefined;
  since?: number | undefined;
  until?: number | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV1DomainsDomainProjectDomainsQueryOptions = (
  args: UseGetApiV1DomainsDomainProjectDomainsArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/domains/{domain}/project-domains",
      "domains",
      args.domain,
      args.limit,
      args.since,
      args.until,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/domains/{domain}/project-domains", {
          domain: args.domain,
          limit: args.limit,
          since: args.since,
          until: args.until,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV1DomainsDomainProjectDomainsResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV1DomainsDomainProjectDomains = (
  args: UseGetApiV1DomainsDomainProjectDomainsArgs,
) => useQuery(getApiV1DomainsDomainProjectDomainsQueryOptions(args));
