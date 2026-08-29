import type { DomainName } from "packages/models/src/domainName.generated.ts";
import { contactVerified } from "packages/models/src/contactVerified.generated.ts";
import { contactPendingVerification } from "packages/models/src/contactPendingVerification.generated.ts";
import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1RegistrarDomainsDomainContactVerificationArgs = {
  domain: DomainName;
  teamId?: string | undefined;
};

export const useGetApiV1RegistrarDomainsDomainContactVerificationResponse = z.union([
  contactVerified,
  contactPendingVerification,
]);

export const getApiV1RegistrarDomainsDomainContactVerificationQueryOptions = (
  args: UseGetApiV1RegistrarDomainsDomainContactVerificationArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/registrar/domains/{domain}/contact-verification",
      "domains-registrar",
      args.domain,
      args.teamId,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/registrar/domains/{domain}/contact-verification", {
          domain: args.domain,
          teamId: args.teamId,
        }),
        useGetApiV1RegistrarDomainsDomainContactVerificationResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV1RegistrarDomainsDomainContactVerification = (
  args: UseGetApiV1RegistrarDomainsDomainContactVerificationArgs,
) => useQuery(getApiV1RegistrarDomainsDomainContactVerificationQueryOptions(args));
