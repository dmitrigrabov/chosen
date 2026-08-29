import type { DomainName } from "packages/models/src/domainName.generated.ts";
import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1RegistrarDomainsDomainPriceArgs = {
  domain: DomainName;
  years?: string | undefined;
  teamId?: string | undefined;
};

export const useGetApiV1RegistrarDomainsDomainPriceResponse = z.object({
  years: z.number(),
  purchasePrice: z.union([z.number().gte(0.01), z.string()]),
  renewalPrice: z.union([z.number().gte(0.01), z.string()]),
  transferPrice: z.union([z.number().gte(0.01), z.string()]),
});

export const getApiV1RegistrarDomainsDomainPriceQueryOptions = (
  args: UseGetApiV1RegistrarDomainsDomainPriceArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/registrar/domains/{domain}/price",
      "domains-registrar",
      args.domain,
      args.years,
      args.teamId,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/registrar/domains/{domain}/price", {
          domain: args.domain,
          years: args.years,
          teamId: args.teamId,
        }),
        useGetApiV1RegistrarDomainsDomainPriceResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV1RegistrarDomainsDomainPrice = (
  args: UseGetApiV1RegistrarDomainsDomainPriceArgs,
) => useQuery(getApiV1RegistrarDomainsDomainPriceQueryOptions(args));
