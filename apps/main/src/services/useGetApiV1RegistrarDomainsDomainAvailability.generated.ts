import type { DomainName } from "packages/models/src/domainName.generated.ts";
import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1RegistrarDomainsDomainAvailabilityArgs = {
  domain: DomainName;
  teamId?: string | undefined;
};

export const useGetApiV1RegistrarDomainsDomainAvailabilityResponse = z.object({
  available: z.boolean(),
});

export const getApiV1RegistrarDomainsDomainAvailabilityQueryOptions = (
  args: UseGetApiV1RegistrarDomainsDomainAvailabilityArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/registrar/domains/{domain}/availability",
      "domains-registrar",
      args.domain,
      args.teamId,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/registrar/domains/{domain}/availability", {
          domain: args.domain,
          teamId: args.teamId,
        }),
        useGetApiV1RegistrarDomainsDomainAvailabilityResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV1RegistrarDomainsDomainAvailability = (
  args: UseGetApiV1RegistrarDomainsDomainAvailabilityArgs,
) => useQuery(getApiV1RegistrarDomainsDomainAvailabilityQueryOptions(args));
