import type { DomainName } from "packages/models/src/domainName.generated.ts";
import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1RegistrarDomainsDomainContactInfoSchemaArgs = {
  domain: DomainName;
  teamId?: string | undefined;
};

export const useGetApiV1RegistrarDomainsDomainContactInfoSchemaResponse = z.object({});

export const getApiV1RegistrarDomainsDomainContactInfoSchemaQueryOptions = (
  args: UseGetApiV1RegistrarDomainsDomainContactInfoSchemaArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/registrar/domains/{domain}/contact-info/schema",
      "domains-registrar",
      args.domain,
      args.teamId,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/registrar/domains/{domain}/contact-info/schema", {
          domain: args.domain,
          teamId: args.teamId,
        }),
        useGetApiV1RegistrarDomainsDomainContactInfoSchemaResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV1RegistrarDomainsDomainContactInfoSchema = (
  args: UseGetApiV1RegistrarDomainsDomainContactInfoSchemaArgs,
) => useQuery(getApiV1RegistrarDomainsDomainContactInfoSchemaQueryOptions(args));
