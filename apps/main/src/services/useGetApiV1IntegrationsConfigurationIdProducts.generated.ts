import { z } from "zod";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV1IntegrationsConfigurationIdProductsResponse = z.object({
  products: z.array(
    z.object({
      id: z.string(),
      slug: z.string(),
      name: z.string(),
      protocols: z.object({
        storage: z
          .object({
            status: z.enum(["disabled", "enabled"]),
            repl: z
              .object({
                enabled: z.boolean(),
                supportsReadOnlyMode: z.boolean(),
                welcomeMessage: z.string().optional(),
              })
              .optional(),
          })
          .optional(),
        experimentation: z
          .object({
            status: z.enum(["disabled", "enabled"]),
            edgeConfigSyncingSupport: z.boolean().optional(),
          })
          .optional(),
        ai: z.object({ status: z.enum(["disabled", "enabled"]) }).optional(),
        authentication: z
          .object({
            status: z.enum(["disabled", "enabled"]),
            appUrlRegistrationSupport: z.boolean().optional(),
          })
          .optional(),
        observability: z.object({ status: z.enum(["disabled", "enabled"]) }).optional(),
        video: z.object({ status: z.enum(["disabled", "enabled"]) }).optional(),
        workflow: z.object({ status: z.enum(["disabled", "enabled"]) }).optional(),
        checks: z.object({ status: z.enum(["disabled", "enabled"]) }).optional(),
        logDrain: z
          .object({
            status: z.enum(["disabled", "enabled"]),
            endpoint: z.string(),
            headers: z.record(z.string(), z.string()).optional(),
            format: z.enum(["json", "ndjson"]),
          })
          .optional(),
        traceDrain: z
          .object({
            status: z.enum(["disabled", "enabled"]),
            endpoint: z.string(),
            headers: z.record(z.string(), z.string()).optional(),
            format: z.enum(["json", "proto"]),
          })
          .optional(),
        messaging: z.object({ status: z.enum(["disabled", "enabled"]) }).optional(),
        other: z.object({ status: z.enum(["disabled", "enabled"]) }).optional(),
      }),
      primaryProtocol: z
        .enum([
          "ai",
          "authentication",
          "checks",
          "experimentation",
          "logDrain",
          "messaging",
          "observability",
          "other",
          "storage",
          "traceDrain",
          "video",
          "workflow",
        ])
        .optional(),
      metadataSchema: z.object({
        type: z.literal("object"),
        properties: z.record(
          z.string(),
          z.union([
            z.object({
              type: z.literal("string"),
              "ui:control": z.literal("input"),
              description: z.string().optional(),
              default: z.string().optional(),
              enum: z.array(z.string()).optional(),
              maxLength: z.number().optional(),
              minLength: z.number().optional(),
              pattern: z.string().optional(),
              "ui:label": z.string().optional(),
              "ui:read-only": z
                .union([z.object({ expr: z.string() }), z.boolean(), z.enum(["create", "update"])])
                .optional(),
              "ui:hidden": z
                .union([z.object({ expr: z.string() }), z.boolean(), z.enum(["create", "update"])])
                .optional(),
              "ui:disabled": z
                .union([z.object({ expr: z.string() }), z.boolean(), z.enum(["create", "update"])])
                .optional(),
              "ui:description": z.union([z.string(), z.object({ expr: z.string() })]).optional(),
              "ui:formatted-value": z.object({ expr: z.string() }).optional(),
              "ui:paid-only": z.boolean().optional(),
              "ui:placeholder": z.string().optional(),
            }),
            z.object({
              type: z.literal("number"),
              "ui:control": z.literal("input"),
              minimum: z.number().optional(),
              maximum: z.number().optional(),
              description: z.string().optional(),
              default: z.number().optional(),
              exclusiveMaximum: z.number().optional(),
              exclusiveMinimum: z.number().optional(),
              "ui:label": z.string().optional(),
              "ui:read-only": z
                .union([z.object({ expr: z.string() }), z.boolean(), z.enum(["create", "update"])])
                .optional(),
              "ui:hidden": z
                .union([z.object({ expr: z.string() }), z.boolean(), z.enum(["create", "update"])])
                .optional(),
              "ui:disabled": z
                .union([z.object({ expr: z.string() }), z.boolean(), z.enum(["create", "update"])])
                .optional(),
              "ui:description": z.union([z.string(), z.object({ expr: z.string() })]).optional(),
              "ui:formatted-value": z.object({ expr: z.string() }).optional(),
              "ui:paid-only": z.boolean().optional(),
              "ui:placeholder": z.string().optional(),
            }),
            z.object({
              type: z.literal("boolean"),
              "ui:control": z.literal("toggle"),
              description: z.string().optional(),
              default: z.boolean().optional(),
              "ui:label": z.string().optional(),
              "ui:read-only": z
                .union([z.object({ expr: z.string() }), z.boolean(), z.enum(["create", "update"])])
                .optional(),
              "ui:hidden": z
                .union([z.object({ expr: z.string() }), z.boolean(), z.enum(["create", "update"])])
                .optional(),
              "ui:disabled": z
                .union([z.object({ expr: z.string() }), z.boolean(), z.enum(["create", "update"])])
                .optional(),
              "ui:description": z.union([z.string(), z.object({ expr: z.string() })]).optional(),
              "ui:formatted-value": z.object({ expr: z.string() }).optional(),
              "ui:paid-only": z.boolean().optional(),
            }),
            z.object({
              type: z.literal("array"),
              items: z.object({
                type: z.literal("number"),
                minimum: z.number().optional(),
                maximum: z.number().optional(),
                description: z.string().optional(),
                default: z.number().optional(),
                exclusiveMaximum: z.number().optional(),
                exclusiveMinimum: z.number().optional(),
              }),
              "ui:control": z.literal("slider"),
              "ui:steps": z.array(z.number()),
              description: z.string().optional(),
              default: z.array(z.number()).optional(),
              maxItems: z.number().optional(),
              minItems: z.number().optional(),
              "ui:label": z.string().optional(),
              "ui:read-only": z
                .union([z.object({ expr: z.string() }), z.boolean(), z.enum(["create", "update"])])
                .optional(),
              "ui:hidden": z
                .union([z.object({ expr: z.string() }), z.boolean(), z.enum(["create", "update"])])
                .optional(),
              "ui:disabled": z
                .union([z.object({ expr: z.string() }), z.boolean(), z.enum(["create", "update"])])
                .optional(),
              "ui:description": z.union([z.string(), z.object({ expr: z.string() })]).optional(),
              "ui:formatted-value": z.object({ expr: z.string() }).optional(),
              "ui:paid-only": z.boolean().optional(),
            }),
            z.object({
              type: z.literal("string"),
              "ui:control": z.literal("select"),
              "ui:options": z.array(
                z.object({
                  value: z.string(),
                  label: z.string(),
                  description: z.string().optional(),
                  disabled: z
                    .union([
                      z.object({ expr: z.string() }),
                      z.boolean(),
                      z.enum(["create", "update"]),
                    ])
                    .optional(),
                  hidden: z
                    .union([
                      z.object({ expr: z.string() }),
                      z.boolean(),
                      z.enum(["create", "update"]),
                    ])
                    .optional(),
                }),
              ),
              description: z.string().optional(),
              default: z.string().optional(),
              enum: z.array(z.string()).optional(),
              maxLength: z.number().optional(),
              minLength: z.number().optional(),
              pattern: z.string().optional(),
              "ui:label": z.string().optional(),
              "ui:read-only": z
                .union([z.object({ expr: z.string() }), z.boolean(), z.enum(["create", "update"])])
                .optional(),
              "ui:hidden": z
                .union([z.object({ expr: z.string() }), z.boolean(), z.enum(["create", "update"])])
                .optional(),
              "ui:disabled": z
                .union([z.object({ expr: z.string() }), z.boolean(), z.enum(["create", "update"])])
                .optional(),
              "ui:description": z.union([z.string(), z.object({ expr: z.string() })]).optional(),
              "ui:formatted-value": z.object({ expr: z.string() }).optional(),
              "ui:paid-only": z.boolean().optional(),
              "ui:placeholder": z.string().optional(),
            }),
            z.object({
              type: z.literal("string"),
              "ui:control": z.literal("radio-button"),
              "ui:options": z.array(
                z.object({
                  value: z.string(),
                  label: z.string(),
                  description: z.string().optional(),
                  disabled: z
                    .union([
                      z.object({ expr: z.string() }),
                      z.boolean(),
                      z.enum(["create", "update"]),
                    ])
                    .optional(),
                  hidden: z
                    .union([
                      z.object({ expr: z.string() }),
                      z.boolean(),
                      z.enum(["create", "update"]),
                    ])
                    .optional(),
                }),
              ),
              description: z.string().optional(),
              default: z.string().optional(),
              enum: z.array(z.string()).optional(),
              maxLength: z.number().optional(),
              minLength: z.number().optional(),
              pattern: z.string().optional(),
              "ui:label": z.string().optional(),
              "ui:read-only": z
                .union([z.object({ expr: z.string() }), z.boolean(), z.enum(["create", "update"])])
                .optional(),
              "ui:hidden": z
                .union([z.object({ expr: z.string() }), z.boolean(), z.enum(["create", "update"])])
                .optional(),
              "ui:disabled": z
                .union([z.object({ expr: z.string() }), z.boolean(), z.enum(["create", "update"])])
                .optional(),
              "ui:description": z.union([z.string(), z.object({ expr: z.string() })]).optional(),
              "ui:formatted-value": z.object({ expr: z.string() }).optional(),
              "ui:paid-only": z.boolean().optional(),
              "ui:placeholder": z.string().optional(),
            }),
            z.object({
              type: z.literal("array"),
              items: z.object({
                type: z.literal("string"),
                description: z.string().optional(),
                default: z.string().optional(),
                enum: z.array(z.string()).optional(),
                maxLength: z.number().optional(),
                minLength: z.number().optional(),
                pattern: z.string().optional(),
              }),
              "ui:control": z.literal("multi-select"),
              "ui:options": z.array(
                z.object({
                  value: z.string(),
                  label: z.string(),
                  description: z.string().optional(),
                  disabled: z
                    .union([
                      z.object({ expr: z.string() }),
                      z.boolean(),
                      z.enum(["create", "update"]),
                    ])
                    .optional(),
                  hidden: z
                    .union([
                      z.object({ expr: z.string() }),
                      z.boolean(),
                      z.enum(["create", "update"]),
                    ])
                    .optional(),
                }),
              ),
              description: z.string().optional(),
              default: z.array(z.string()).optional(),
              maxItems: z.number().optional(),
              minItems: z.number().optional(),
              example: z.array(z.string()).optional(),
              "ui:label": z.string().optional(),
              "ui:read-only": z
                .union([z.object({ expr: z.string() }), z.boolean(), z.enum(["create", "update"])])
                .optional(),
              "ui:hidden": z
                .union([z.object({ expr: z.string() }), z.boolean(), z.enum(["create", "update"])])
                .optional(),
              "ui:disabled": z
                .union([z.object({ expr: z.string() }), z.boolean(), z.enum(["create", "update"])])
                .optional(),
              "ui:description": z.union([z.string(), z.object({ expr: z.string() })]).optional(),
              "ui:formatted-value": z.object({ expr: z.string() }).optional(),
              "ui:paid-only": z.boolean().optional(),
              "ui:placeholder": z.string().optional(),
            }),
            z.object({
              type: z.literal("string"),
              "ui:control": z.literal("vercel-region"),
              "ui:options": z.array(
                z.union([
                  z.object({
                    value: z.string(),
                    label: z.string(),
                    description: z.string().optional(),
                    disabled: z
                      .union([
                        z.object({ expr: z.string() }),
                        z.boolean(),
                        z.enum(["create", "update"]),
                      ])
                      .optional(),
                    hidden: z
                      .union([
                        z.object({ expr: z.string() }),
                        z.boolean(),
                        z.enum(["create", "update"]),
                      ])
                      .optional(),
                  }),
                  z.string(),
                  z.object({
                    value: z.string(),
                    description: z.string().optional(),
                    disabled: z
                      .union([
                        z.object({ expr: z.string() }),
                        z.boolean(),
                        z.enum(["create", "update"]),
                      ])
                      .optional(),
                    hidden: z
                      .union([
                        z.object({ expr: z.string() }),
                        z.boolean(),
                        z.enum(["create", "update"]),
                      ])
                      .optional(),
                  }),
                ]),
              ),
              description: z.string().optional(),
              default: z.string().optional(),
              enum: z.array(z.string()).optional(),
              maxLength: z.number().optional(),
              minLength: z.number().optional(),
              pattern: z.string().optional(),
              "ui:label": z.string().optional(),
              "ui:read-only": z
                .union([z.object({ expr: z.string() }), z.boolean(), z.enum(["create", "update"])])
                .optional(),
              "ui:hidden": z
                .union([z.object({ expr: z.string() }), z.boolean(), z.enum(["create", "update"])])
                .optional(),
              "ui:disabled": z
                .union([z.object({ expr: z.string() }), z.boolean(), z.enum(["create", "update"])])
                .optional(),
              "ui:description": z.union([z.string(), z.object({ expr: z.string() })]).optional(),
              "ui:formatted-value": z.object({ expr: z.string() }).optional(),
              "ui:paid-only": z.boolean().optional(),
              "ui:placeholder": z.string().optional(),
            }),
            z.object({
              type: z.literal("array"),
              items: z.object({
                type: z.literal("string"),
                description: z.string().optional(),
                default: z.string().optional(),
                enum: z.array(z.string()).optional(),
                maxLength: z.number().optional(),
                minLength: z.number().optional(),
                pattern: z.string().optional(),
              }),
              "ui:control": z.literal("multi-vercel-region"),
              "ui:options": z.array(
                z.union([
                  z.object({
                    value: z.string(),
                    label: z.string(),
                    description: z.string().optional(),
                    disabled: z
                      .union([
                        z.object({ expr: z.string() }),
                        z.boolean(),
                        z.enum(["create", "update"]),
                      ])
                      .optional(),
                    hidden: z
                      .union([
                        z.object({ expr: z.string() }),
                        z.boolean(),
                        z.enum(["create", "update"]),
                      ])
                      .optional(),
                  }),
                  z.string(),
                  z.object({
                    value: z.string(),
                    description: z.string().optional(),
                    disabled: z
                      .union([
                        z.object({ expr: z.string() }),
                        z.boolean(),
                        z.enum(["create", "update"]),
                      ])
                      .optional(),
                    hidden: z
                      .union([
                        z.object({ expr: z.string() }),
                        z.boolean(),
                        z.enum(["create", "update"]),
                      ])
                      .optional(),
                  }),
                ]),
              ),
              description: z.string().optional(),
              default: z.array(z.string()).optional(),
              maxItems: z.number().optional(),
              minItems: z.number().optional(),
              example: z.array(z.string()).optional(),
              "ui:label": z.string().optional(),
              "ui:read-only": z
                .union([z.object({ expr: z.string() }), z.boolean(), z.enum(["create", "update"])])
                .optional(),
              "ui:hidden": z
                .union([z.object({ expr: z.string() }), z.boolean(), z.enum(["create", "update"])])
                .optional(),
              "ui:disabled": z
                .union([z.object({ expr: z.string() }), z.boolean(), z.enum(["create", "update"])])
                .optional(),
              "ui:description": z.union([z.string(), z.object({ expr: z.string() })]).optional(),
              "ui:formatted-value": z.object({ expr: z.string() }).optional(),
              "ui:paid-only": z.boolean().optional(),
              "ui:placeholder": z.string().optional(),
            }),
            z.object({
              type: z.literal("string"),
              "ui:control": z.literal("vercel-country"),
              "ui:options": z.array(
                z.union([
                  z.object({
                    value: z.string(),
                    label: z.string(),
                    description: z.string().optional(),
                    disabled: z
                      .union([
                        z.object({ expr: z.string() }),
                        z.boolean(),
                        z.enum(["create", "update"]),
                      ])
                      .optional(),
                    hidden: z
                      .union([
                        z.object({ expr: z.string() }),
                        z.boolean(),
                        z.enum(["create", "update"]),
                      ])
                      .optional(),
                  }),
                  z.string(),
                  z.object({
                    value: z.string(),
                    description: z.string().optional(),
                    disabled: z
                      .union([
                        z.object({ expr: z.string() }),
                        z.boolean(),
                        z.enum(["create", "update"]),
                      ])
                      .optional(),
                    hidden: z
                      .union([
                        z.object({ expr: z.string() }),
                        z.boolean(),
                        z.enum(["create", "update"]),
                      ])
                      .optional(),
                  }),
                ]),
              ),
              description: z.string().optional(),
              default: z.string().optional(),
              enum: z.array(z.string()).optional(),
              maxLength: z.number().optional(),
              minLength: z.number().optional(),
              pattern: z.string().optional(),
              "ui:label": z.string().optional(),
              "ui:read-only": z
                .union([z.object({ expr: z.string() }), z.boolean(), z.enum(["create", "update"])])
                .optional(),
              "ui:hidden": z
                .union([z.object({ expr: z.string() }), z.boolean(), z.enum(["create", "update"])])
                .optional(),
              "ui:disabled": z
                .union([z.object({ expr: z.string() }), z.boolean(), z.enum(["create", "update"])])
                .optional(),
              "ui:description": z.union([z.string(), z.object({ expr: z.string() })]).optional(),
              "ui:formatted-value": z.object({ expr: z.string() }).optional(),
              "ui:paid-only": z.boolean().optional(),
              "ui:placeholder": z.string().optional(),
            }),
            z.object({
              type: z.literal("string"),
              "ui:control": z.literal("domain"),
              description: z.string().optional(),
              default: z.string().optional(),
              enum: z.array(z.string()).optional(),
              maxLength: z.number().optional(),
              minLength: z.number().optional(),
              pattern: z.string().optional(),
              "ui:label": z.string().optional(),
              "ui:read-only": z
                .union([z.object({ expr: z.string() }), z.boolean(), z.enum(["create", "update"])])
                .optional(),
              "ui:hidden": z
                .union([z.object({ expr: z.string() }), z.boolean(), z.enum(["create", "update"])])
                .optional(),
              "ui:disabled": z
                .union([z.object({ expr: z.string() }), z.boolean(), z.enum(["create", "update"])])
                .optional(),
              "ui:description": z.union([z.string(), z.object({ expr: z.string() })]).optional(),
              "ui:formatted-value": z.object({ expr: z.string() }).optional(),
              "ui:paid-only": z.boolean().optional(),
              "ui:placeholder": z.string().optional(),
            }),
            z.object({
              type: z.literal("string"),
              "ui:control": z.literal("git-namespace"),
              description: z.string().optional(),
              "ui:label": z.string().optional(),
              "ui:read-only": z
                .union([z.object({ expr: z.string() }), z.boolean(), z.enum(["create", "update"])])
                .optional(),
              "ui:hidden": z
                .union([z.object({ expr: z.string() }), z.boolean(), z.enum(["create", "update"])])
                .optional(),
              "ui:disabled": z
                .union([z.object({ expr: z.string() }), z.boolean(), z.enum(["create", "update"])])
                .optional(),
              "ui:description": z.union([z.string(), z.object({ expr: z.string() })]).optional(),
              "ui:formatted-value": z.object({ expr: z.string() }).optional(),
              "ui:paid-only": z.boolean().optional(),
              "ui:placeholder": z.string().optional(),
              "git:providers": z.array(z.enum(["bitbucket", "github", "gitlab"])).optional(),
            }),
          ]),
        ),
        required: z.array(z.string()).optional(),
        "ui:order": z.array(z.string()).optional(),
      }),
    }),
  ),
  integration: z.object({ id: z.string(), slug: z.string(), name: z.string() }),
  configuration: z.object({ id: z.string() }),
});

export type UseGetApiV1IntegrationsConfigurationIdProductsArgs = {
  id: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV1IntegrationsConfigurationIdProductsQueryOptions = (
  args: UseGetApiV1IntegrationsConfigurationIdProductsArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/integrations/configuration/{id}/products",
      "integrations",
      args.id,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/integrations/configuration/{id}/products", {
          id: args.id,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV1IntegrationsConfigurationIdProductsResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV1IntegrationsConfigurationIdProducts = (
  args: UseGetApiV1IntegrationsConfigurationIdProductsArgs,
) => useQuery(getApiV1IntegrationsConfigurationIdProductsQueryOptions(args));
