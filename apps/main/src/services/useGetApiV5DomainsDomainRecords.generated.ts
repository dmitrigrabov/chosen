import { z } from "zod";
import { pagination } from "packages/models/src/pagination.generated.ts";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV5DomainsDomainRecordsArgs = {
  domain: string;
  limit?: string | undefined;
  since?: string | undefined;
  until?: string | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useGetApiV5DomainsDomainRecordsResponse = z.union([
  z.string(),
  z.object({
    records: z.array(
      z.object({
        id: z.string(),
        slug: z.string(),
        name: z.string(),
        type: z.enum(["A", "AAAA", "ALIAS", "CAA", "CNAME", "HTTPS", "MX", "NS", "SRV", "TXT"]),
        value: z.string(),
        mxPriority: z.number().optional(),
        priority: z.number().optional(),
        creator: z.string(),
        created: z.number().nullable(),
        updated: z.number().nullable(),
        createdAt: z.number().nullable(),
        updatedAt: z.number().nullable(),
        ttl: z.number().optional(),
        comment: z.string().optional(),
      }),
    ),
  }),
  z.object({
    records: z.array(
      z.object({
        id: z.string(),
        slug: z.string(),
        name: z.string(),
        type: z.enum(["A", "AAAA", "ALIAS", "CAA", "CNAME", "HTTPS", "MX", "NS", "SRV", "TXT"]),
        value: z.string(),
        mxPriority: z.number().optional(),
        priority: z.number().optional(),
        creator: z.string(),
        created: z.number().nullable(),
        updated: z.number().nullable(),
        createdAt: z.number().nullable(),
        updatedAt: z.number().nullable(),
        ttl: z.number().optional(),
        comment: z.string().optional(),
      }),
    ),
    pagination: pagination,
  }),
]);

export const getApiV5DomainsDomainRecordsQueryOptions = (
  args: UseGetApiV5DomainsDomainRecordsArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v5/domains/{domain}/records",
      "dns",
      args.domain,
      args.limit,
      args.since,
      args.until,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v5/domains/{domain}/records", {
          domain: args.domain,
          limit: args.limit,
          since: args.since,
          until: args.until,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV5DomainsDomainRecordsResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV5DomainsDomainRecords = (args: UseGetApiV5DomainsDomainRecordsArgs) =>
  useQuery(getApiV5DomainsDomainRecordsQueryOptions(args));
