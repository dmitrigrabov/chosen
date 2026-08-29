import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV5DomainsDomainArgs = {
  domain: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useGetApiV5DomainsDomainResponse = z.object({
  domain: z.object({
    suffix: z.boolean(),
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
});

export const getApiV5DomainsDomainQueryOptions = (args: UseGetApiV5DomainsDomainArgs) =>
  queryOptions({
    queryKey: ["GET /v5/domains/{domain}", "domains", args.domain, args.teamId, args.slug],
    queryFn: () =>
      apiFetch(
        buildUrl("/v5/domains/{domain}", {
          domain: args.domain,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV5DomainsDomainResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV5DomainsDomain = (args: UseGetApiV5DomainsDomainArgs) =>
  useQuery(getApiV5DomainsDomainQueryOptions(args));
