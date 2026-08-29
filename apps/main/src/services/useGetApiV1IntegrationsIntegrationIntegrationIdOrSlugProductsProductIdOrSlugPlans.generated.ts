import { z } from "zod";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV1IntegrationsIntegrationIntegrationIdOrSlugProductsProductIdOrSlugPlansResponse =
  z.object({
    plans: z.array(
      z.object({
        type: z.enum(["prepayment", "subscription"]),
        id: z.string(),
        name: z.string(),
        scope: z.enum(["installation", "resource"]),
        description: z.string(),
        paymentMethodRequired: z.boolean(),
        preauthorizationAmount: z.number().optional(),
        initialCharge: z.string().optional(),
        minimumAmount: z.string().optional(),
        maximumAmount: z.string().optional(),
        maximumAmountAutoPurchasePerPeriod: z.string().optional(),
        cost: z.string().optional(),
        details: z.array(z.object({ label: z.string(), value: z.string().optional() })).optional(),
        highlightedDetails: z
          .array(z.object({ label: z.string(), value: z.string().optional() }))
          .optional(),
        quote: z.array(z.object({ line: z.string(), amount: z.string() })).optional(),
        effectiveDate: z.string().optional(),
        disabled: z.boolean().optional(),
      }),
    ),
  });

export type UseGetApiV1IntegrationsIntegrationIntegrationIdOrSlugProductsProductIdOrSlugPlansArgs =
  {
    integrationIdOrSlug: string;
    integrationConfigurationId?: string | undefined;
    productIdOrSlug: string;
    metadata?: string | undefined;
    source?:
      | (
          | "marketplace"
          | "deploy-button"
          | "external"
          | "v0"
          | "resource-claims"
          | "cli"
          | "oauth"
          | "backoffice"
          | "import-recommended-integrations"
        )
      | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };

export const getApiV1IntegrationsIntegrationIntegrationIdOrSlugProductsProductIdOrSlugPlansQueryOptions =
  (args: UseGetApiV1IntegrationsIntegrationIntegrationIdOrSlugProductsProductIdOrSlugPlansArgs) =>
    queryOptions({
      queryKey: [
        "GET /v1/integrations/integration/{integrationIdOrSlug}/products/{productIdOrSlug}/plans",
        "integrations",
        args.integrationIdOrSlug,
        args.integrationConfigurationId,
        args.productIdOrSlug,
        args.metadata,
        args.source,
        args.teamId,
        args.slug,
      ],
      queryFn: () =>
        apiFetch(
          buildUrl(
            "/v1/integrations/integration/{integrationIdOrSlug}/products/{productIdOrSlug}/plans",
            {
              integrationIdOrSlug: args.integrationIdOrSlug,
              productIdOrSlug: args.productIdOrSlug,
              integrationConfigurationId: args.integrationConfigurationId,
              metadata: args.metadata,
              source: args.source,
              teamId: args.teamId,
              slug: args.slug,
            },
          ),
          useGetApiV1IntegrationsIntegrationIntegrationIdOrSlugProductsProductIdOrSlugPlansResponse,
          { method: "GET" },
        ),
      placeholderData: keepPreviousData,
    });

export const useGetApiV1IntegrationsIntegrationIntegrationIdOrSlugProductsProductIdOrSlugPlans = (
  args: UseGetApiV1IntegrationsIntegrationIntegrationIdOrSlugProductsProductIdOrSlugPlansArgs,
) =>
  useQuery(
    getApiV1IntegrationsIntegrationIntegrationIdOrSlugProductsProductIdOrSlugPlansQueryOptions(
      args,
    ),
  );
