import type { DomainName } from "packages/models/src/domainName.generated.ts";
import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UsePatchApiV1RegistrarDomainsDomainAutoRenewArgs = {
  domain: DomainName;
  teamId?: string | undefined;
  body: { autoRenew: boolean };
};

export const usePatchApiV1RegistrarDomainsDomainAutoRenewResponse = z.void();

export type UsePatchApiV1RegistrarDomainsDomainAutoRenewResponse = void;

export type PatchApiV1RegistrarDomainsDomainAutoRenewBody = { autoRenew: boolean };

export const usePatchApiV1RegistrarDomainsDomainAutoRenew = (
  options: UseMutationOptions<
    UsePatchApiV1RegistrarDomainsDomainAutoRenewResponse,
    Error,
    UsePatchApiV1RegistrarDomainsDomainAutoRenewArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UsePatchApiV1RegistrarDomainsDomainAutoRenewArgs) =>
      apiFetch(
        buildUrl("/v1/registrar/domains/{domain}/auto-renew", {
          domain: args.domain,
          teamId: args.teamId,
        }),
        usePatchApiV1RegistrarDomainsDomainAutoRenewResponse,
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
