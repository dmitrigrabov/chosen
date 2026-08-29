import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import {
  getV1BillingCharges,
  getV1BillingContractCommitments,
  postV1BillingBuy,
} from "./handlers/billing";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.get(
  "/v1/billing/charges",
  validate(
    "query",
    z.object({
      from: z.string(),
      to: z.string(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(await getV1BillingCharges({ db, env: c.env, user: c.var.user, query }));
  },
);
app.get(
  "/v1/billing/contract-commitments",
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(
      await getV1BillingContractCommitments({ db, env: c.env, user: c.var.user, query }),
    );
  },
);
app.post(
  "/v1/billing/buy",
  validate(
    "query",
    z.object({
      source: z.string().optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  validate("json", postV1BillingBuyBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(await postV1BillingBuy({ db, env: c.env, user: c.var.user, query, body }));
  },
);

export type GetV1BillingChargesInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { from: string; to: string; teamId?: string | undefined; slug?: string | undefined };
};

export type GetV1BillingChargesHandler = (input: GetV1BillingChargesInput) => Promise<void>;

export type GetV1BillingContractCommitmentsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV1BillingContractCommitmentsHandler = (
  input: GetV1BillingContractCommitmentsInput,
) => Promise<void>;

export const postV1BillingBuyBody = z.object({
  item: z.object({
    type: z.literal("credits"),
    creditType: z.enum(["v0", "gateway", "agent"]),
    amount: z.number().int().gte(1),
  }),
});

export type PostV1BillingBuyBody = {
  item: { type: "credits"; creditType: "v0" | "gateway" | "agent"; amount: number };
};

export type PostV1BillingBuyResponse =
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

export type PostV1BillingBuyInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { source?: string | undefined; teamId?: string | undefined; slug?: string | undefined };
  body: PostV1BillingBuyBody;
};

export type PostV1BillingBuyHandler = (
  input: PostV1BillingBuyInput,
) => Promise<PostV1BillingBuyResponse>;
