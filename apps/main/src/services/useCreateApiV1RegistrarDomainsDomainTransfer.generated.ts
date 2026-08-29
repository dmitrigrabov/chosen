import type { DomainName } from "packages/models/src/domainName.generated.ts";
import type { NonEmptyTrimmedString } from "packages/models/src/nonEmptyTrimmedString.generated.ts";
import type { EmailAddress } from "packages/models/src/emailAddress.generated.ts";
import type { E164PhoneNumber } from "packages/models/src/e164PhoneNumber.generated.ts";
import type { CountryCode } from "packages/models/src/countryCode.generated.ts";
import { orderId, type OrderId } from "packages/models/src/orderId.generated.ts";
import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1RegistrarDomainsDomainTransferArgs = {
  domain: DomainName;
  teamId?: string | undefined;
  body: {
    authCode: string;
    autoRenew: boolean;
    years: number;
    expectedPrice: number;
    contactInformation: {
      firstName: NonEmptyTrimmedString;
      lastName: NonEmptyTrimmedString;
      email: EmailAddress;
      phone: E164PhoneNumber;
      address1: NonEmptyTrimmedString;
      address2?: NonEmptyTrimmedString | undefined;
      city: NonEmptyTrimmedString;
      state: NonEmptyTrimmedString;
      zip: NonEmptyTrimmedString;
      country: CountryCode;
      companyName?: NonEmptyTrimmedString | undefined;
      fax?: E164PhoneNumber | undefined;
    };
  };
};

export const useCreateApiV1RegistrarDomainsDomainTransferResponse = z.object({
  orderId: orderId,
  _links: z.record(
    z.string(),
    z.object({ href: z.string(), method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"]) }),
  ),
});

export type UseCreateApiV1RegistrarDomainsDomainTransferResponse = {
  orderId: OrderId;
  _links: Record<string, { href: string; method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" }>;
};

export type CreateApiV1RegistrarDomainsDomainTransferBody = {
  authCode: string;
  autoRenew: boolean;
  years: number;
  expectedPrice: number;
  contactInformation: {
    firstName: NonEmptyTrimmedString;
    lastName: NonEmptyTrimmedString;
    email: EmailAddress;
    phone: E164PhoneNumber;
    address1: NonEmptyTrimmedString;
    address2?: NonEmptyTrimmedString | undefined;
    city: NonEmptyTrimmedString;
    state: NonEmptyTrimmedString;
    zip: NonEmptyTrimmedString;
    country: CountryCode;
    companyName?: NonEmptyTrimmedString | undefined;
    fax?: E164PhoneNumber | undefined;
  };
};

export const useCreateApiV1RegistrarDomainsDomainTransfer = (
  options: UseMutationOptions<
    UseCreateApiV1RegistrarDomainsDomainTransferResponse,
    Error,
    UseCreateApiV1RegistrarDomainsDomainTransferArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1RegistrarDomainsDomainTransferArgs) =>
      apiFetch(
        buildUrl("/v1/registrar/domains/{domain}/transfer", {
          domain: args.domain,
          teamId: args.teamId,
        }),
        useCreateApiV1RegistrarDomainsDomainTransferResponse,
        {
          method: "POST",
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
