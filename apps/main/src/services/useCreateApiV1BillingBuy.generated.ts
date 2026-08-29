import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1BillingBuyArgs = {
  source?: string | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: { item: { type: "credits"; creditType: "v0" | "gateway" | "agent"; amount: number } };
};

export const useCreateApiV1BillingBuyResponse = z.union([
  z.object({ checkoutSessionId: z.string(), checkoutSessionUrl: z.string() }),
  z.object({
    purchaseIntent: z.object({
      id: z.string(),
      configuration: z.union([
        z.object({
          options: z.object({
            amount: z.string(),
            currency: z.enum([
              "ai_credits",
              "ai_gateway_credits",
              "copper_test_units",
              "v0_user_credits",
              "vercel_agent_credits",
            ]),
            expirationDate: z.string().optional(),
          }),
          output: z.unknown(),
          type: z.literal("credit_topup"),
        }),
        z.object({
          options: z.object({
            items: z.array(
              z.object({
                name: z.string(),
                subtotal: z.string(),
                type: z.enum(["purchase", "renewal", "transfer"]),
                years: z.number(),
              }),
            ),
            orderId: z.string(),
          }),
          output: z.unknown(),
          type: z.literal("domain_name"),
        }),
        z.object({
          options: z.object({
            effectiveDate: z.union([
              z.object({}),
              z.enum(["end_of_subscription_term", "immediate"]),
            ]),
            orbSubscriptionId: z.string(),
            alignBillingWithPlanChangeDate: z.boolean().optional(),
            couponRedemptionCode: z.string().optional(),
            externalPlanId: z.string().optional(),
            replacePrices: z
              .array(z.object({ fixedPriceQuantity: z.number(), replacesPriceId: z.string() }))
              .optional(),
          }),
          output: z.object({ pendingSubscriptionChangeId: z.string() }),
          type: z.literal("orb_plan_change"),
        }),
        z.object({
          options: z.object({}),
          output: z.object({ pendingSubscriptionChangeId: z.string() }),
          type: z.literal("orb_price_interval"),
        }),
        z.object({
          options: z.object({
            externalPlanId: z.string(),
            addPrices: z
              .array(z.union([z.object({ priceId: z.string() }), z.object({})]))
              .optional(),
            alignBillingWithSubscriptionStartDate: z.boolean().optional(),
            couponRedemptionCode: z.string().optional(),
            initialPhaseOrder: z.number().optional(),
            metadata: z.record(z.string(), z.string().nullable()).optional(),
            removePrices: z.array(z.object({ priceId: z.string() })).optional(),
            replacePrices: z
              .array(z.object({ fixedPriceQuantity: z.number(), replacesPriceId: z.string() }))
              .optional(),
            startDate: z.string().optional(),
          }),
          output: z.object({ pendingSubscriptionChangeId: z.string() }),
          type: z.literal("orb_subscription"),
        }),
        z.object({
          options: z.object({
            orbCustomerId: z.string(),
            orbExternalCustomerId: z.string(),
            orbExternalPlanId: z.string(),
            orbPlanId: z.string(),
            orbSubscriptionId: z.string(),
            lineItems: z
              .array(
                z.object({
                  id: z.string(),
                  description: z.string(),
                  name: z.string(),
                  productId: z.string(),
                  quantity: z.string(),
                  unitAmount: z.string(),
                  metadata: z.record(z.string(), z.string()).optional(),
                  productAlias: z.string().optional(),
                  refund: z.string().optional(),
                }),
              )
              .optional(),
            orbPendingSubscriptionChangeId: z.string().optional(),
          }),
          output: z.object({ pendingSubscriptionChangeId: z.string().optional() }),
          type: z.literal("orb_subscription_intent"),
        }),
        z.object({
          options: z.object({
            planId: z.string(),
            planItemQuantities: z
              .array(
                z.object({
                  planItemId: z.string(),
                  quantity: z.number(),
                  resourceIds: z.array(z.string()).optional(),
                }),
              )
              .optional(),
            rateVariantKey: z.string().optional(),
          }),
          output: z.object({ planChangeId: z.string().optional() }),
          type: z.literal("subscription"),
        }),
      ]),
      createdAt: z.string(),
      currency: z.enum(["miu", "usd"]),
      ownerId: z.string(),
      provider: z.object({
        resourceId: z.string(),
        type: z.enum([
          "apple_in_app_purchase",
          "orb_ledger",
          "stripe_elements",
          "stripe_hosted",
          "stripe_invoice_deferred",
          "stripe_invoice_elements",
          "stripe_invoice_immediate",
          "tackle_aws_marketplace",
        ]),
        currencyConversionRate: z.string().optional(),
        stripeSharedPaymentTokenUsed: z.boolean().optional(),
      }),
      status: z.enum(["failed", "pending", "succeeded"]),
      subtotal: z.string(),
      tax: z.string(),
      total: z.string(),
      updatedAt: z.string(),
      dispute: z
        .object({
          id: z.string(),
          amount: z.string(),
          createdAt: z.string(),
          currency: z.string(),
          providerId: z.string(),
          reason: z.string().nullable(),
          status: z.string(),
          updatedAt: z.string(),
        })
        .optional(),
      lineItems: z
        .array(
          z.object({
            id: z.string(),
            description: z.string(),
            name: z.string(),
            productId: z.string(),
            quantity: z.string(),
            unitAmount: z.string(),
            metadata: z.record(z.string(), z.string()).optional(),
            productAlias: z.string().optional(),
            refund: z.string().optional(),
          }),
        )
        .optional(),
      metadata: z.record(z.string(), z.string()).optional(),
      refund: z.string().optional(),
      returnUrl: z.string().optional(),
    }),
  }),
  z.object({
    orbSubscriptionIntent: z.object({
      id: z.string(),
      configuration: z.union([
        z.object({
          options: z.object({
            productAlias: z.string(),
            quantity: z.number(),
            resourceIds: z.array(z.string()).optional(),
          }),
          output: z.object({
            effectiveBehavior: z.enum(["end_of_term", "immediate"]),
            orbPriceId: z.string(),
            pricingSource: z.enum(["copper", "orb"]),
            productId: z.string(),
            changedResources: z
              .array(
                z.object({
                  productAlias: z.string(),
                  productId: z.string(),
                  quantity: z.number(),
                  addedResourceIds: z.array(z.string()).optional(),
                  effectiveAt: z.string().optional(),
                  removedResourceIds: z.array(z.string()).optional(),
                  resourceIds: z.array(z.string()).optional(),
                }),
              )
              .optional(),
            metadata: z.record(z.string(), z.string()).optional(),
            pendingSubscriptionChangeId: z.string().optional(),
          }),
          type: z.literal("set_plan_item_quantity"),
        }),
        z.object({
          options: z.object({ productAlias: z.string(), resourceIds: z.array(z.string()) }),
          output: z.object({
            effectiveBehavior: z.enum(["end_of_term", "immediate"]),
            orbPriceId: z.string(),
            pricingSource: z.enum(["copper", "orb"]),
            productId: z.string(),
            changedResources: z
              .array(
                z.object({
                  productAlias: z.string(),
                  productId: z.string(),
                  quantity: z.number(),
                  addedResourceIds: z.array(z.string()).optional(),
                  effectiveAt: z.string().optional(),
                  removedResourceIds: z.array(z.string()).optional(),
                  resourceIds: z.array(z.string()).optional(),
                }),
              )
              .optional(),
            metadata: z.record(z.string(), z.string()).optional(),
            pendingSubscriptionChangeId: z.string().optional(),
          }),
          type: z.literal("increase_plan_item_quantity"),
        }),
        z.object({
          options: z.object({ productAlias: z.string(), resourceIds: z.array(z.string()) }),
          output: z.object({
            effectiveBehavior: z.enum(["end_of_term", "immediate"]),
            orbPriceId: z.string(),
            pricingSource: z.enum(["copper", "orb"]),
            productId: z.string(),
            changedResources: z
              .array(
                z.object({
                  productAlias: z.string(),
                  productId: z.string(),
                  quantity: z.number(),
                  addedResourceIds: z.array(z.string()).optional(),
                  effectiveAt: z.string().optional(),
                  removedResourceIds: z.array(z.string()).optional(),
                  resourceIds: z.array(z.string()).optional(),
                }),
              )
              .optional(),
            metadata: z.record(z.string(), z.string()).optional(),
            pendingSubscriptionChangeId: z.string().optional(),
          }),
          type: z.literal("decrease_plan_item_quantity"),
        }),
        z.object({
          options: z.object({
            addedResourceIds: z.array(z.string()),
            productAlias: z.string(),
            removedResourceIds: z.array(z.string()),
          }),
          output: z.object({
            effectiveBehavior: z.enum(["end_of_term", "immediate"]),
            orbPriceId: z.string(),
            pricingSource: z.enum(["copper", "orb"]),
            productId: z.string(),
            changedResources: z
              .array(
                z.object({
                  productAlias: z.string(),
                  productId: z.string(),
                  quantity: z.number(),
                  addedResourceIds: z.array(z.string()).optional(),
                  effectiveAt: z.string().optional(),
                  removedResourceIds: z.array(z.string()).optional(),
                  resourceIds: z.array(z.string()).optional(),
                }),
              )
              .optional(),
            metadata: z.record(z.string(), z.string()).optional(),
            pendingSubscriptionChangeId: z.string().optional(),
          }),
          type: z.literal("adjust_plan_item_quantity"),
        }),
      ]),
      createdAt: z.string(),
      orbSubscriptionId: z.string(),
      orbUpdate: z.union([
        z.object({ mode: z.literal("sync") }),
        z.object({
          mode: z.literal("async"),
          status: z.enum(["canceled", "failed", "pending", "running"]),
        }),
        z.object({
          appliedAt: z.string(),
          mode: z.literal("async"),
          status: z.literal("succeeded"),
        }),
      ]),
      ownerId: z.string(),
      status: z.enum(["failed", "pending", "succeeded"]),
      updatedAt: z.string(),
      purchaseIntentId: z.string().optional(),
    }),
  }),
]);

export type UseCreateApiV1BillingBuyResponse =
  | { checkoutSessionId: string; checkoutSessionUrl: string }
  | {
      purchaseIntent: {
        id: string;
        configuration:
          | {
              options: {
                amount: string;
                currency:
                  | "ai_credits"
                  | "ai_gateway_credits"
                  | "copper_test_units"
                  | "v0_user_credits"
                  | "vercel_agent_credits";
                expirationDate?: string | undefined;
              };
              output: unknown;
              type: "credit_topup";
            }
          | {
              options: {
                items: Array<{
                  name: string;
                  subtotal: string;
                  type: "purchase" | "renewal" | "transfer";
                  years: number;
                }>;
                orderId: string;
              };
              output: unknown;
              type: "domain_name";
            }
          | {
              options: {
                effectiveDate: Record<string, never> | "end_of_subscription_term" | "immediate";
                orbSubscriptionId: string;
                alignBillingWithPlanChangeDate?: boolean | undefined;
                couponRedemptionCode?: string | undefined;
                externalPlanId?: string | undefined;
                replacePrices?:
                  | Array<{ fixedPriceQuantity: number; replacesPriceId: string }>
                  | undefined;
              };
              output: { pendingSubscriptionChangeId: string };
              type: "orb_plan_change";
            }
          | {
              options: Record<string, never>;
              output: { pendingSubscriptionChangeId: string };
              type: "orb_price_interval";
            }
          | {
              options: {
                externalPlanId: string;
                addPrices?: Array<{ priceId: string } | Record<string, never>> | undefined;
                alignBillingWithSubscriptionStartDate?: boolean | undefined;
                couponRedemptionCode?: string | undefined;
                initialPhaseOrder?: number | undefined;
                metadata?: Record<string, string | null> | undefined;
                removePrices?: Array<{ priceId: string }> | undefined;
                replacePrices?:
                  | Array<{ fixedPriceQuantity: number; replacesPriceId: string }>
                  | undefined;
                startDate?: string | undefined;
              };
              output: { pendingSubscriptionChangeId: string };
              type: "orb_subscription";
            }
          | {
              options: {
                orbCustomerId: string;
                orbExternalCustomerId: string;
                orbExternalPlanId: string;
                orbPlanId: string;
                orbSubscriptionId: string;
                lineItems?:
                  | Array<{
                      id: string;
                      description: string;
                      name: string;
                      productId: string;
                      quantity: string;
                      unitAmount: string;
                      metadata?: Record<string, string> | undefined;
                      productAlias?: string | undefined;
                      refund?: string | undefined;
                    }>
                  | undefined;
                orbPendingSubscriptionChangeId?: string | undefined;
              };
              output: { pendingSubscriptionChangeId?: string | undefined };
              type: "orb_subscription_intent";
            }
          | {
              options: {
                planId: string;
                planItemQuantities?:
                  | Array<{
                      planItemId: string;
                      quantity: number;
                      resourceIds?: Array<string> | undefined;
                    }>
                  | undefined;
                rateVariantKey?: string | undefined;
              };
              output: { planChangeId?: string | undefined };
              type: "subscription";
            };
        createdAt: string;
        currency: "miu" | "usd";
        ownerId: string;
        provider: {
          resourceId: string;
          type:
            | "apple_in_app_purchase"
            | "orb_ledger"
            | "stripe_elements"
            | "stripe_hosted"
            | "stripe_invoice_deferred"
            | "stripe_invoice_elements"
            | "stripe_invoice_immediate"
            | "tackle_aws_marketplace";
          currencyConversionRate?: string | undefined;
          stripeSharedPaymentTokenUsed?: boolean | undefined;
        };
        status: "failed" | "pending" | "succeeded";
        subtotal: string;
        tax: string;
        total: string;
        updatedAt: string;
        dispute?:
          | {
              id: string;
              amount: string;
              createdAt: string;
              currency: string;
              providerId: string;
              reason: string | null;
              status: string;
              updatedAt: string;
            }
          | undefined;
        lineItems?:
          | Array<{
              id: string;
              description: string;
              name: string;
              productId: string;
              quantity: string;
              unitAmount: string;
              metadata?: Record<string, string> | undefined;
              productAlias?: string | undefined;
              refund?: string | undefined;
            }>
          | undefined;
        metadata?: Record<string, string> | undefined;
        refund?: string | undefined;
        returnUrl?: string | undefined;
      };
    }
  | {
      orbSubscriptionIntent: {
        id: string;
        configuration:
          | {
              options: {
                productAlias: string;
                quantity: number;
                resourceIds?: Array<string> | undefined;
              };
              output: {
                effectiveBehavior: "end_of_term" | "immediate";
                orbPriceId: string;
                pricingSource: "copper" | "orb";
                productId: string;
                changedResources?:
                  | Array<{
                      productAlias: string;
                      productId: string;
                      quantity: number;
                      addedResourceIds?: Array<string> | undefined;
                      effectiveAt?: string | undefined;
                      removedResourceIds?: Array<string> | undefined;
                      resourceIds?: Array<string> | undefined;
                    }>
                  | undefined;
                metadata?: Record<string, string> | undefined;
                pendingSubscriptionChangeId?: string | undefined;
              };
              type: "set_plan_item_quantity";
            }
          | {
              options: { productAlias: string; resourceIds: Array<string> };
              output: {
                effectiveBehavior: "end_of_term" | "immediate";
                orbPriceId: string;
                pricingSource: "copper" | "orb";
                productId: string;
                changedResources?:
                  | Array<{
                      productAlias: string;
                      productId: string;
                      quantity: number;
                      addedResourceIds?: Array<string> | undefined;
                      effectiveAt?: string | undefined;
                      removedResourceIds?: Array<string> | undefined;
                      resourceIds?: Array<string> | undefined;
                    }>
                  | undefined;
                metadata?: Record<string, string> | undefined;
                pendingSubscriptionChangeId?: string | undefined;
              };
              type: "increase_plan_item_quantity";
            }
          | {
              options: { productAlias: string; resourceIds: Array<string> };
              output: {
                effectiveBehavior: "end_of_term" | "immediate";
                orbPriceId: string;
                pricingSource: "copper" | "orb";
                productId: string;
                changedResources?:
                  | Array<{
                      productAlias: string;
                      productId: string;
                      quantity: number;
                      addedResourceIds?: Array<string> | undefined;
                      effectiveAt?: string | undefined;
                      removedResourceIds?: Array<string> | undefined;
                      resourceIds?: Array<string> | undefined;
                    }>
                  | undefined;
                metadata?: Record<string, string> | undefined;
                pendingSubscriptionChangeId?: string | undefined;
              };
              type: "decrease_plan_item_quantity";
            }
          | {
              options: {
                addedResourceIds: Array<string>;
                productAlias: string;
                removedResourceIds: Array<string>;
              };
              output: {
                effectiveBehavior: "end_of_term" | "immediate";
                orbPriceId: string;
                pricingSource: "copper" | "orb";
                productId: string;
                changedResources?:
                  | Array<{
                      productAlias: string;
                      productId: string;
                      quantity: number;
                      addedResourceIds?: Array<string> | undefined;
                      effectiveAt?: string | undefined;
                      removedResourceIds?: Array<string> | undefined;
                      resourceIds?: Array<string> | undefined;
                    }>
                  | undefined;
                metadata?: Record<string, string> | undefined;
                pendingSubscriptionChangeId?: string | undefined;
              };
              type: "adjust_plan_item_quantity";
            };
        createdAt: string;
        orbSubscriptionId: string;
        orbUpdate:
          | { mode: "sync" }
          | { mode: "async"; status: "canceled" | "failed" | "pending" | "running" }
          | { appliedAt: string; mode: "async"; status: "succeeded" };
        ownerId: string;
        status: "failed" | "pending" | "succeeded";
        updatedAt: string;
        purchaseIntentId?: string | undefined;
      };
    };

export type CreateApiV1BillingBuyBody = {
  item: { type: "credits"; creditType: "v0" | "gateway" | "agent"; amount: number };
};

export const useCreateApiV1BillingBuy = (
  options: UseMutationOptions<
    UseCreateApiV1BillingBuyResponse,
    Error,
    UseCreateApiV1BillingBuyArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1BillingBuyArgs) =>
      apiFetch(
        buildUrl("/v1/billing/buy", { source: args.source, teamId: args.teamId, slug: args.slug }),
        useCreateApiV1BillingBuyResponse,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["billing"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
