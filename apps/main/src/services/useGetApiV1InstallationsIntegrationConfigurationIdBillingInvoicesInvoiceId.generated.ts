import { z } from "zod";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV1InstallationsIntegrationConfigurationIdBillingInvoicesInvoiceIdResponse =
  z.object({
    test: z.boolean().optional(),
    invoiceId: z.string(),
    externalId: z.string().optional(),
    state: z.enum([
      "draft",
      "invoiced",
      "notpaid",
      "overdue",
      "paid",
      "pending",
      "refund_requested",
      "refunded",
      "scheduled",
    ]),
    invoiceNumber: z.string().optional(),
    invoiceDate: z.string(),
    period: z.object({ start: z.string(), end: z.string() }),
    paidAt: z.string().optional(),
    refundedAt: z.string().optional(),
    memo: z.string().optional(),
    items: z.array(
      z.object({
        billingPlanId: z.string(),
        resourceId: z.string().optional(),
        start: z.string().optional(),
        end: z.string().optional(),
        name: z.string(),
        details: z.string().optional(),
        price: z.string(),
        quantity: z.number(),
        units: z.string(),
        total: z.string(),
      }),
    ),
    discounts: z
      .array(
        z.object({
          billingPlanId: z.string(),
          resourceId: z.string().optional(),
          start: z.string().optional(),
          end: z.string().optional(),
          name: z.string(),
          details: z.string().optional(),
          amount: z.string(),
        }),
      )
      .optional(),
    total: z.string(),
    refundReason: z.string().optional(),
    refundTotal: z.string().optional(),
    created: z.string(),
    updated: z.string(),
  });

export type UseGetApiV1InstallationsIntegrationConfigurationIdBillingInvoicesInvoiceIdArgs = {
  integrationConfigurationId: string;
  invoiceId: string;
};

export const getApiV1InstallationsIntegrationConfigurationIdBillingInvoicesInvoiceIdQueryOptions = (
  args: UseGetApiV1InstallationsIntegrationConfigurationIdBillingInvoicesInvoiceIdArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/installations/{integrationConfigurationId}/billing/invoices/{invoiceId}",
      "marketplace",
      args.integrationConfigurationId,
      args.invoiceId,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/installations/{integrationConfigurationId}/billing/invoices/{invoiceId}", {
          integrationConfigurationId: args.integrationConfigurationId,
          invoiceId: args.invoiceId,
        }),
        useGetApiV1InstallationsIntegrationConfigurationIdBillingInvoicesInvoiceIdResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV1InstallationsIntegrationConfigurationIdBillingInvoicesInvoiceId = (
  args: UseGetApiV1InstallationsIntegrationConfigurationIdBillingInvoicesInvoiceIdArgs,
) =>
  useQuery(
    getApiV1InstallationsIntegrationConfigurationIdBillingInvoicesInvoiceIdQueryOptions(args),
  );
