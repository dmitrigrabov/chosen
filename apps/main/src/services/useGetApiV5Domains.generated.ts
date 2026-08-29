import { z } from "zod";
import { pagination } from "packages/models/src/pagination.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV5DomainsResponse = z.object({
  domains: z.array(
    z.object({
      expiresAt: z.number().nullable(),
      verified: z.boolean(),
      nameservers: z.array(z.string()),
      intendedNameservers: z.array(z.string()),
      customNameservers: z.array(z.string()).optional(),
      creator: z.object({
        username: z.string(),
        email: z.string(),
        customerId: z.string().nullable().optional(),
        isDomainReseller: z.boolean().optional(),
        id: z.string(),
      }),
      echMode: z.enum(["auto", "disabled", "enabled"]),
      name: z.string(),
      teamId: z.string().nullable(),
      boughtAt: z.number().nullable(),
      createdAt: z.number(),
      id: z.string(),
      renew: z.boolean().optional(),
      serviceType: z.enum(["external", "na", "zeit.world"]),
      transferredAt: z.number().nullable().optional(),
      transferStartedAt: z.number().optional(),
      userId: z.string(),
    }),
  ),
  pagination: pagination,
});

export type UseGetApiV5DomainsArgs = {
  limit?: number | undefined;
  since?: number | undefined;
  until?: number | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV5DomainsQueryOptions = (args: UseGetApiV5DomainsArgs) =>
  queryOptions({
    queryKey: [
      "GET /v5/domains",
      "domains",
      args.limit,
      args.since,
      args.until,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v5/domains", {
          limit: args.limit,
          since: args.since,
          until: args.until,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV5DomainsResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV5Domains = (args: UseGetApiV5DomainsArgs) =>
  useQuery(getApiV5DomainsQueryOptions(args));
