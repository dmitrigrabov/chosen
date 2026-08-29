import type { DomainName } from "packages/models/src/domainName.generated.ts";
import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1RegistrarDomainsDomainTransferArgs = {
  domain: DomainName;
  teamId?: string | undefined;
};

export const useGetApiV1RegistrarDomainsDomainTransferResponse = z.object({
  status: z.enum([
    "canceled",
    "canceled_pending_refund",
    "completed",
    "created",
    "failed",
    "pending",
    "pending_insert",
    "pending_new_auth_code",
    "pending_transfer",
    "pending_unlock",
    "pending_registry_unlock",
    "rejected",
    "submitting_transfer",
  ]),
});

export const getApiV1RegistrarDomainsDomainTransferQueryOptions = (
  args: UseGetApiV1RegistrarDomainsDomainTransferArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/registrar/domains/{domain}/transfer",
      "domains-registrar",
      args.domain,
      args.teamId,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/registrar/domains/{domain}/transfer", {
          domain: args.domain,
          teamId: args.teamId,
        }),
        useGetApiV1RegistrarDomainsDomainTransferResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV1RegistrarDomainsDomainTransfer = (
  args: UseGetApiV1RegistrarDomainsDomainTransferArgs,
) => useQuery(getApiV1RegistrarDomainsDomainTransferQueryOptions(args));
