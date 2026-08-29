import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1IntegrationsConfigurationIdArgs = {
  id: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useGetApiV1IntegrationsConfigurationIdResponse = z.union([
  z.object({
    projectSelection: z.enum(["all", "selected"]),
    notification: z.object({
      level: z.enum(["error", "info", "warn"]),
      title: z.string(),
      message: z.string().optional(),
      href: z.string().optional(),
    }),
    transferRequest: z.union([
      z.object({
        kind: z.literal("transfer-to-marketplace"),
        metadata: z.record(z.string(), z.unknown()).optional(),
        billingPlan: z
          .object({
            id: z.string(),
            type: z.enum(["prepayment", "subscription"]),
            scope: z.enum(["installation", "resource"]).optional(),
            name: z.string(),
            description: z.string(),
            paymentMethodRequired: z.boolean().optional(),
            preauthorizationAmount: z.number().optional(),
          })
          .optional(),
        requestId: z.string(),
        transferId: z.string(),
        requester: z.object({ name: z.string(), email: z.string().optional() }),
        createdAt: z.number(),
        expiresAt: z.number(),
        discardedAt: z.number().optional(),
        discardedBy: z.string().optional(),
        approvedAt: z.number().optional(),
        approvedBy: z.string().optional(),
        authorizationId: z.string().optional(),
      }),
      z.object({
        kind: z.literal("transfer-from-marketplace"),
        requestId: z.string(),
        transferId: z.string(),
        requester: z.object({ name: z.string(), email: z.string().optional() }),
        createdAt: z.number(),
        expiresAt: z.number(),
        discardedAt: z.number().optional(),
        discardedBy: z.string().optional(),
        approvedAt: z.number().optional(),
        approvedBy: z.string().optional(),
        authorizationId: z.string().optional(),
      }),
    ]),
    projects: z.array(z.string()).optional(),
    status: z
      .enum(["error", "onboarding", "pending", "ready", "resumed", "suspended", "uninstalled"])
      .optional(),
    type: z.literal("integration-configuration"),
    id: z.string(),
    integrationId: z.string(),
    userId: z.string(),
    createdAt: z.number(),
    deletedAt: z.number().nullable().optional(),
    slug: z.string(),
    teamId: z.string().nullable().optional(),
    updatedAt: z.number(),
    scopes: z.array(z.string()),
    ownerId: z.string(),
    canConfigureOpenTelemetry: z.boolean().optional(),
    completedAt: z.number().optional(),
    externalId: z.string().optional(),
    source: z
      .enum([
        "backoffice",
        "cli",
        "deploy-button",
        "external",
        "import-recommended-integrations",
        "marketplace",
        "oauth",
        "resource-claims",
        "v0",
      ])
      .optional(),
    disabledAt: z.number().optional(),
    deleteRequestedAt: z.number().nullable().optional(),
    customerDeleteRequestedAt: z.number().nullable().optional(),
    disabledReason: z
      .enum([
        "account-plan-downgrade",
        "disabled-by-admin",
        "disabled-by-owner",
        "feature-not-available",
        "original-owner-left-the-team",
        "original-owner-role-downgraded",
      ])
      .optional(),
    installationType: z.enum(["external", "marketplace"]).optional(),
  }),
  z.object({
    completedAt: z.number().optional(),
    createdAt: z.number(),
    id: z.string(),
    integrationId: z.string(),
    ownerId: z.string(),
    status: z
      .enum(["error", "onboarding", "pending", "ready", "resumed", "suspended", "uninstalled"])
      .optional(),
    externalId: z.string().optional(),
    projects: z.array(z.string()).optional(),
    source: z
      .enum([
        "backoffice",
        "cli",
        "deploy-button",
        "external",
        "import-recommended-integrations",
        "marketplace",
        "oauth",
        "resource-claims",
        "v0",
      ])
      .optional(),
    slug: z.string(),
    teamId: z.string().nullable().optional(),
    type: z.literal("integration-configuration"),
    updatedAt: z.number(),
    userId: z.string(),
    scopes: z.array(z.string()),
    disabledAt: z.number().optional(),
    deletedAt: z.number().nullable().optional(),
    deleteRequestedAt: z.number().nullable().optional(),
    customerDeleteRequestedAt: z.number().nullable().optional(),
    disabledReason: z
      .enum([
        "account-plan-downgrade",
        "disabled-by-admin",
        "disabled-by-owner",
        "feature-not-available",
        "original-owner-left-the-team",
        "original-owner-role-downgraded",
      ])
      .optional(),
    installationType: z.enum(["external", "marketplace"]).optional(),
  }),
  z.object({
    completedAt: z.number().optional(),
    createdAt: z.number().optional(),
    id: z.string().optional(),
    integrationId: z.string().optional(),
    ownerId: z.string().optional(),
    status: z
      .enum(["error", "onboarding", "pending", "ready", "resumed", "suspended", "uninstalled"])
      .optional(),
    externalId: z.string().optional(),
    projects: z.array(z.string()).optional(),
    source: z
      .enum([
        "backoffice",
        "cli",
        "deploy-button",
        "external",
        "import-recommended-integrations",
        "marketplace",
        "oauth",
        "resource-claims",
        "v0",
      ])
      .optional(),
    slug: z.string().optional(),
    teamId: z.string().nullable().optional(),
    type: z.literal("integration-configuration").optional(),
    updatedAt: z.number().optional(),
    userId: z.string().optional(),
    scopes: z.array(z.string()).optional(),
    disabledAt: z.number().optional(),
    deletedAt: z.number().nullable().optional(),
    deleteRequestedAt: z.number().nullable().optional(),
    customerDeleteRequestedAt: z.number().nullable().optional(),
    disabledReason: z
      .enum([
        "account-plan-downgrade",
        "disabled-by-admin",
        "disabled-by-owner",
        "feature-not-available",
        "original-owner-left-the-team",
        "original-owner-role-downgraded",
      ])
      .optional(),
    installationType: z.enum(["external", "marketplace"]).optional(),
  }),
]);

export const getApiV1IntegrationsConfigurationIdQueryOptions = (
  args: UseGetApiV1IntegrationsConfigurationIdArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/integrations/configuration/{id}",
      "integrations",
      args.id,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/integrations/configuration/{id}", {
          id: args.id,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV1IntegrationsConfigurationIdResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV1IntegrationsConfigurationId = (
  args: UseGetApiV1IntegrationsConfigurationIdArgs,
) => useQuery(getApiV1IntegrationsConfigurationIdQueryOptions(args));
