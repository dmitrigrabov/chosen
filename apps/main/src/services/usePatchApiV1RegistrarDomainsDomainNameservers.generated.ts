import type { DomainName } from "packages/models/src/domainName.generated.ts";
import type { Nameserver } from "packages/models/src/nameserver.generated.ts";
import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UsePatchApiV1RegistrarDomainsDomainNameserversArgs = {
  domain: DomainName;
  teamId?: string | undefined;
  body: { nameservers: Array<Nameserver> };
};

export const usePatchApiV1RegistrarDomainsDomainNameserversResponse = z.void();

export type UsePatchApiV1RegistrarDomainsDomainNameserversResponse = void;

export type PatchApiV1RegistrarDomainsDomainNameserversBody = { nameservers: Array<Nameserver> };

export const usePatchApiV1RegistrarDomainsDomainNameservers = (
  options: UseMutationOptions<
    UsePatchApiV1RegistrarDomainsDomainNameserversResponse,
    Error,
    UsePatchApiV1RegistrarDomainsDomainNameserversArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UsePatchApiV1RegistrarDomainsDomainNameserversArgs) =>
      apiFetch(
        buildUrl("/v1/registrar/domains/{domain}/nameservers", {
          domain: args.domain,
          teamId: args.teamId,
        }),
        usePatchApiV1RegistrarDomainsDomainNameserversResponse,
        {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["domains-registrar"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
