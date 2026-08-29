import type { DomainName } from "packages/models/src/domainName.generated.ts";
import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1RegistrarDomainsDomainAuthCodeArgs = {
  domain: DomainName;
  teamId?: string | undefined;
};

export const useGetApiV1RegistrarDomainsDomainAuthCodeResponse = z.object({ authCode: z.string() });

export const getApiV1RegistrarDomainsDomainAuthCodeQueryOptions = (
  args: UseGetApiV1RegistrarDomainsDomainAuthCodeArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/registrar/domains/{domain}/auth-code",
      "domains-registrar",
      args.domain,
      args.teamId,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/registrar/domains/{domain}/auth-code", {
          domain: args.domain,
          teamId: args.teamId,
        }),
        useGetApiV1RegistrarDomainsDomainAuthCodeResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV1RegistrarDomainsDomainAuthCode = (
  args: UseGetApiV1RegistrarDomainsDomainAuthCodeArgs,
) => useQuery(getApiV1RegistrarDomainsDomainAuthCodeQueryOptions(args));
