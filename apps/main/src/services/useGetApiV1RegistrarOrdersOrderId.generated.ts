import { orderId, type OrderId } from "packages/models/src/orderId.generated.ts";
import { z } from "zod";
import { domainName } from "packages/models/src/domainName.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV1RegistrarOrdersOrderIdResponse = z.object({
  orderId: orderId,
  domains: z.array(
    z.union([
      z.object({
        purchaseType: z.literal("purchase"),
        autoRenew: z.boolean(),
        years: z.number(),
        domainName: domainName,
        status: z.enum(["pending", "completed", "failed", "refunded", "refund-failed"]),
        price: z.number().gte(0.01),
        error: z
          .union([
            z.object({
              code: z.literal("unsupported-language-code"),
              details: z.object({ detectedLanguageCode: z.string() }),
            }),
            z.object({
              code: z.literal("incorrect-language-code"),
              details: z.object({ detectedLanguageCode: z.string() }),
            }),
            z.object({ code: z.literal("client-transfer-prohibited") }),
            z.object({ code: z.literal("incorrect-auth-code") }),
            z.object({ code: z.literal("claims-notice-required") }),
            z.object({
              code: z.literal("cannot-transfer-in-until"),
              details: z.object({ numDaysUntilTransferrable: z.number() }),
            }),
            z.object({ code: z.literal("account-transfer-required") }),
            z.object({ code: z.literal("price-change") }),
            z.object({ code: z.literal("unavailable-legal") }),
            z.object({
              code: z.literal("invalid-contact"),
              details: z.object({
                invalidField: z
                  .enum([
                    "firstName",
                    "lastName",
                    "email",
                    "phone",
                    "address1",
                    "address2",
                    "city",
                    "state",
                    "zip",
                    "country",
                    "companyName",
                    "fax",
                  ])
                  .optional(),
              }),
            }),
            z.object({ code: z.string(), details: z.unknown() }),
          ])
          .optional(),
      }),
      z.object({
        purchaseType: z.literal("renewal"),
        years: z.number(),
        domainName: domainName,
        status: z.enum(["pending", "completed", "failed", "refunded", "refund-failed"]),
        price: z.number().gte(0.01),
        error: z
          .union([
            z.object({
              code: z.literal("unsupported-language-code"),
              details: z.object({ detectedLanguageCode: z.string() }),
            }),
            z.object({
              code: z.literal("incorrect-language-code"),
              details: z.object({ detectedLanguageCode: z.string() }),
            }),
            z.object({ code: z.literal("client-transfer-prohibited") }),
            z.object({ code: z.literal("incorrect-auth-code") }),
            z.object({ code: z.literal("claims-notice-required") }),
            z.object({
              code: z.literal("cannot-transfer-in-until"),
              details: z.object({ numDaysUntilTransferrable: z.number() }),
            }),
            z.object({ code: z.literal("account-transfer-required") }),
            z.object({ code: z.literal("price-change") }),
            z.object({ code: z.literal("unavailable-legal") }),
            z.object({
              code: z.literal("invalid-contact"),
              details: z.object({
                invalidField: z
                  .enum([
                    "firstName",
                    "lastName",
                    "email",
                    "phone",
                    "address1",
                    "address2",
                    "city",
                    "state",
                    "zip",
                    "country",
                    "companyName",
                    "fax",
                  ])
                  .optional(),
              }),
            }),
            z.object({ code: z.string(), details: z.unknown() }),
          ])
          .optional(),
      }),
      z.object({
        purchaseType: z.literal("transfer"),
        autoRenew: z.boolean(),
        years: z.number(),
        domainName: domainName,
        status: z.enum(["pending", "completed", "failed", "refunded", "refund-failed"]),
        price: z.number().gte(0.01),
        error: z
          .union([
            z.object({
              code: z.literal("unsupported-language-code"),
              details: z.object({ detectedLanguageCode: z.string() }),
            }),
            z.object({
              code: z.literal("incorrect-language-code"),
              details: z.object({ detectedLanguageCode: z.string() }),
            }),
            z.object({ code: z.literal("client-transfer-prohibited") }),
            z.object({ code: z.literal("incorrect-auth-code") }),
            z.object({ code: z.literal("claims-notice-required") }),
            z.object({
              code: z.literal("cannot-transfer-in-until"),
              details: z.object({ numDaysUntilTransferrable: z.number() }),
            }),
            z.object({ code: z.literal("account-transfer-required") }),
            z.object({ code: z.literal("price-change") }),
            z.object({ code: z.literal("unavailable-legal") }),
            z.object({
              code: z.literal("invalid-contact"),
              details: z.object({
                invalidField: z
                  .enum([
                    "firstName",
                    "lastName",
                    "email",
                    "phone",
                    "address1",
                    "address2",
                    "city",
                    "state",
                    "zip",
                    "country",
                    "companyName",
                    "fax",
                  ])
                  .optional(),
              }),
            }),
            z.object({ code: z.string(), details: z.unknown() }),
          ])
          .optional(),
      }),
    ]),
  ),
  status: z.enum(["draft", "purchasing", "completed", "failed"]),
  error: z
    .union([
      z.object({ code: z.literal("payment-failed") }),
      z.object({
        code: z.literal("tld-outage"),
        details: z.object({ tlds: z.array(z.object({ tldName: z.string(), endsAt: z.string() })) }),
      }),
      z.object({
        code: z.literal("price-mismatch"),
        details: z.object({ expectedPrice: z.number(), actualPrice: z.number().optional() }),
      }),
      z.object({ code: z.literal("unexpected-error") }),
      z.object({
        code: z.literal("claims-required"),
        details: z.object({ message: z.string(), domainNames: z.array(z.string()) }),
      }),
      z.object({ code: z.literal("domain-mismatch") }),
      z.object({ code: z.string(), details: z.unknown() }),
    ])
    .optional(),
});

export type UseGetApiV1RegistrarOrdersOrderIdArgs = {
  orderId: OrderId;
  teamId?: string | undefined;
};

export const getApiV1RegistrarOrdersOrderIdQueryOptions = (
  args: UseGetApiV1RegistrarOrdersOrderIdArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/registrar/orders/{orderId}",
      "domains-registrar",
      args.orderId,
      args.teamId,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/registrar/orders/{orderId}", { orderId: args.orderId, teamId: args.teamId }),
        useGetApiV1RegistrarOrdersOrderIdResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV1RegistrarOrdersOrderId = (args: UseGetApiV1RegistrarOrdersOrderIdArgs) =>
  useQuery(getApiV1RegistrarOrdersOrderIdQueryOptions(args));
