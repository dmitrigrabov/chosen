import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1IntegrationsConfigurationsArgs = {
  view: "account" | "project";
  installationType?: ("marketplace" | "external" | "provisioning") | undefined;
  integrationIdOrSlug?: string | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useGetApiV1IntegrationsConfigurationsResponse = z.union([
  z.array(
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
  ),
  z.array(
    z.object({
      integration: z.object({
        name: z.string(),
        icon: z.string(),
        isLegacy: z.boolean(),
        flags: z.array(z.string()).optional(),
        assignedBetaLabelAt: z.number().optional(),
        tagIds: z
          .array(
            z.enum([
              "tag_agents",
              "tag_ai",
              "tag_analytics",
              "tag_authentication",
              "tag_cms",
              "tag_code_repository",
              "tag_code_review",
              "tag_code_security",
              "tag_code_testing",
              "tag_commerce",
              "tag_databases",
              "tag_dev_tools",
              "tag_experimentation",
              "tag_flags",
              "tag_logging",
              "tag_messaging",
              "tag_monitoring",
              "tag_observability",
              "tag_payments",
              "tag_performance",
              "tag_productivity",
              "tag_searching",
              "tag_security",
              "tag_support_agent",
              "tag_testing",
              "tag_video",
              "tag_web_automation",
              "tag_workflow",
            ]),
          )
          .optional(),
      }),
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
  ),
]);

export const getApiV1IntegrationsConfigurationsQueryOptions = (
  args: UseGetApiV1IntegrationsConfigurationsArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/integrations/configurations",
      "integrations",
      args.view,
      args.installationType,
      args.integrationIdOrSlug,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/integrations/configurations", {
          view: args.view,
          installationType: args.installationType,
          integrationIdOrSlug: args.integrationIdOrSlug,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV1IntegrationsConfigurationsResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV1IntegrationsConfigurations = (
  args: UseGetApiV1IntegrationsConfigurationsArgs,
) => useQuery(getApiV1IntegrationsConfigurationsQueryOptions(args));
