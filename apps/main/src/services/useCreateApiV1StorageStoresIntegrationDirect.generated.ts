import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1StorageStoresIntegrationDirectArgs = {
  teamId?: string | undefined;
  slug?: string | undefined;
  body: {
    name: string;
    integrationConfigurationId: string;
    integrationProductIdOrSlug: string | string;
    metadata?:
      | Record<string, string | number | boolean | Array<string> | Array<number>>
      | undefined;
    externalId?: string | undefined;
    protocolSettings?: Record<string, unknown> | undefined;
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
    billingPlanId?: string | undefined;
    paymentMethodId?: string | undefined;
    prepaymentAmountCents?: number | undefined;
  };
};

export const useCreateApiV1StorageStoresIntegrationDirectResponse = z.object({
  store: z
    .object({
      projectsMetadata: z.array(
        z.object({
          id: z.string(),
          projectId: z.string(),
          name: z.string(),
          framework: z
            .enum([
              "actix-web",
              "angular",
              "ash",
              "astro",
              "axum",
              "blitzjs",
              "brunch",
              "bun",
              "container",
              "create-react-app",
              "django",
              "docusaurus",
              "docusaurus-2",
              "dojo",
              "eleventy",
              "elysia",
              "ember",
              "eve",
              "express",
              "fastapi",
              "fasthtml",
              "fastify",
              "flask",
              "gatsby",
              "go",
              "gridsome",
              "h3",
              "hexo",
              "hono",
              "hugo",
              "hydrogen",
              "ionic-angular",
              "ionic-react",
              "jekyll",
              "koa",
              "mastra",
              "middleman",
              "nestjs",
              "nextjs",
              "nitro",
              "node",
              "nuxtjs",
              "parcel",
              "polymer",
              "preact",
              "python",
              "react-router",
              "redwoodjs",
              "remix",
              "ruby",
              "rust",
              "saber",
              "sanity",
              "sanity-v2",
              "sapper",
              "scully",
              "services",
              "solidstart",
              "solidstart-1",
              "stencil",
              "storybook",
              "svelte",
              "sveltekit",
              "sveltekit-1",
              "tanstack-start",
              "tanstack-start-lovable",
              "umijs",
              "vite",
              "vitepress",
              "vue",
              "vuepress",
              "xmcp",
              "zola",
              "null",
            ])
            .nullable()
            .optional(),
          latestDeployment: z.string().optional(),
          environments: z.array(z.string()),
          envVarPrefix: z.string().nullable(),
          environmentVariables: z.array(z.string()),
          deployments: z
            .object({
              required: z.boolean(),
              actions: z.array(
                z.object({
                  slug: z.string(),
                  environments: z.array(z.enum(["development", "preview", "production"])),
                }),
              ),
            })
            .optional(),
          makeEnvVarsSensitive: z.boolean().optional(),
        }),
      ),
      projectFilter: z
        .object({
          git: z
            .object({
              providers: z.union([
                z.array(z.enum(["bitbucket", "github", "gitlab"])),
                z.literal("*"),
              ]),
              owners: z.array(z.string()).optional(),
              repos: z.array(z.string()).optional(),
            })
            .optional(),
        })
        .optional(),
      totalConnectedProjects: z.number().optional(),
      usageQuotaExceeded: z.boolean(),
      status: z
        .enum([
          "available",
          "error",
          "initializing",
          "limits-exceeded-suspended",
          "limits-exceeded-suspended-store-count",
          "onboarding",
          "suspended",
          "uninstalled",
          "null",
        ])
        .nullable(),
      ownership: z.enum(["linked", "owned", "sandbox"]).optional(),
      capabilities: z
        .object({
          mcp: z.boolean().optional(),
          mcpReadonly: z.boolean().optional(),
          sso: z.boolean().optional(),
          billable: z.boolean().optional(),
          transferable: z.boolean().optional(),
          secretsSync: z.boolean().optional(),
          secretRotation: z
            .union([
              z.object({ maxDelayHours: z.number(), customRotationWarning: z.string().optional() }),
              z.literal(false),
            ])
            .optional(),
          projects: z.boolean().optional(),
          v0: z.boolean().optional(),
          autoSensitive: z.boolean().optional(),
          agentTools: z.boolean().optional(),
        })
        .optional(),
      metadata: z
        .record(
          z.string(),
          z.union([z.string(), z.number(), z.array(z.string()), z.array(z.number()), z.boolean()]),
        )
        .optional(),
      externalResourceId: z.string(),
      externalResourceStatus: z
        .enum([
          "error",
          "onboarding",
          "pending",
          "ready",
          "resumed",
          "suspended",
          "uninstalled",
          "null",
        ])
        .nullable()
        .optional(),
      directPartnerConsoleUrl: z.string().optional(),
      product: z.object({
        id: z.string().optional(),
        name: z.string().optional(),
        slug: z.string().optional(),
        iconUrl: z.string().optional(),
        capabilities: z
          .object({
            mcp: z.boolean().optional(),
            mcpReadonly: z.boolean().optional(),
            sso: z.boolean().optional(),
            billable: z.boolean().optional(),
            transferable: z.boolean().optional(),
            secretsSync: z.boolean().optional(),
            secretRotation: z
              .union([
                z.object({
                  maxDelayHours: z.number(),
                  customRotationWarning: z.string().optional(),
                }),
                z.literal(false),
              ])
              .optional(),
            sandbox: z.boolean().optional(),
            linking: z.boolean().optional(),
            projects: z.boolean().optional(),
            v0: z.boolean().optional(),
            importResource: z.boolean().optional(),
            connectedImportResource: z.boolean().optional(),
            nativeImportResource: z.boolean().optional(),
            databaseUI: z.boolean().optional(),
            v0Flavors: z.boolean().optional(),
            autoSensitive: z.boolean().optional(),
            agentTools: z.boolean().optional(),
          })
          .optional(),
        shortDescription: z.string().optional(),
        metadataSchema: z
          .object({
            type: z.literal("object"),
            properties: z.record(
              z.string(),
              z.union([
                z.object({
                  type: z.literal("string"),
                  "ui:control": z.literal("input"),
                  default: z.string().optional(),
                  enum: z.array(z.string()).optional(),
                  maxLength: z.number().optional(),
                  minLength: z.number().optional(),
                  pattern: z.string().optional(),
                  description: z.string().optional(),
                  "ui:label": z.string().optional(),
                  "ui:read-only": z
                    .union([
                      z.object({ expr: z.string() }),
                      z.boolean(),
                      z.enum(["create", "update"]),
                    ])
                    .optional(),
                  "ui:hidden": z
                    .union([
                      z.object({ expr: z.string() }),
                      z.boolean(),
                      z.enum(["create", "update"]),
                    ])
                    .optional(),
                  "ui:disabled": z
                    .union([
                      z.object({ expr: z.string() }),
                      z.boolean(),
                      z.enum(["create", "update"]),
                    ])
                    .optional(),
                  "ui:description": z
                    .union([z.string(), z.object({ expr: z.string() })])
                    .optional(),
                  "ui:formatted-value": z.object({ expr: z.string() }).optional(),
                  "ui:paid-only": z.boolean().optional(),
                  "ui:placeholder": z.string().optional(),
                }),
                z.object({
                  type: z.literal("number"),
                  "ui:control": z.literal("input"),
                  default: z.number().optional(),
                  maximum: z.number().optional(),
                  exclusiveMaximum: z.number().optional(),
                  minimum: z.number().optional(),
                  exclusiveMinimum: z.number().optional(),
                  description: z.string().optional(),
                  "ui:label": z.string().optional(),
                  "ui:read-only": z
                    .union([
                      z.object({ expr: z.string() }),
                      z.boolean(),
                      z.enum(["create", "update"]),
                    ])
                    .optional(),
                  "ui:hidden": z
                    .union([
                      z.object({ expr: z.string() }),
                      z.boolean(),
                      z.enum(["create", "update"]),
                    ])
                    .optional(),
                  "ui:disabled": z
                    .union([
                      z.object({ expr: z.string() }),
                      z.boolean(),
                      z.enum(["create", "update"]),
                    ])
                    .optional(),
                  "ui:description": z
                    .union([z.string(), z.object({ expr: z.string() })])
                    .optional(),
                  "ui:formatted-value": z.object({ expr: z.string() }).optional(),
                  "ui:paid-only": z.boolean().optional(),
                  "ui:placeholder": z.string().optional(),
                }),
                z.object({
                  type: z.literal("boolean"),
                  "ui:control": z.literal("toggle"),
                  default: z.boolean().optional(),
                  description: z.string().optional(),
                  "ui:label": z.string().optional(),
                  "ui:read-only": z
                    .union([
                      z.object({ expr: z.string() }),
                      z.boolean(),
                      z.enum(["create", "update"]),
                    ])
                    .optional(),
                  "ui:hidden": z
                    .union([
                      z.object({ expr: z.string() }),
                      z.boolean(),
                      z.enum(["create", "update"]),
                    ])
                    .optional(),
                  "ui:disabled": z
                    .union([
                      z.object({ expr: z.string() }),
                      z.boolean(),
                      z.enum(["create", "update"]),
                    ])
                    .optional(),
                  "ui:description": z
                    .union([z.string(), z.object({ expr: z.string() })])
                    .optional(),
                  "ui:formatted-value": z.object({ expr: z.string() }).optional(),
                  "ui:paid-only": z.boolean().optional(),
                }),
                z.object({
                  type: z.literal("array"),
                  items: z.object({
                    type: z.literal("number"),
                    default: z.number().optional(),
                    maximum: z.number().optional(),
                    exclusiveMaximum: z.number().optional(),
                    minimum: z.number().optional(),
                    exclusiveMinimum: z.number().optional(),
                    description: z.string().optional(),
                  }),
                  "ui:control": z.literal("slider"),
                  "ui:steps": z.array(z.number()),
                  default: z.array(z.number()).optional(),
                  maxItems: z.number().optional(),
                  minItems: z.number().optional(),
                  description: z.string().optional(),
                  "ui:label": z.string().optional(),
                  "ui:read-only": z
                    .union([
                      z.object({ expr: z.string() }),
                      z.boolean(),
                      z.enum(["create", "update"]),
                    ])
                    .optional(),
                  "ui:hidden": z
                    .union([
                      z.object({ expr: z.string() }),
                      z.boolean(),
                      z.enum(["create", "update"]),
                    ])
                    .optional(),
                  "ui:disabled": z
                    .union([
                      z.object({ expr: z.string() }),
                      z.boolean(),
                      z.enum(["create", "update"]),
                    ])
                    .optional(),
                  "ui:description": z
                    .union([z.string(), z.object({ expr: z.string() })])
                    .optional(),
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
                  default: z.string().optional(),
                  enum: z.array(z.string()).optional(),
                  maxLength: z.number().optional(),
                  minLength: z.number().optional(),
                  pattern: z.string().optional(),
                  description: z.string().optional(),
                  "ui:label": z.string().optional(),
                  "ui:read-only": z
                    .union([
                      z.object({ expr: z.string() }),
                      z.boolean(),
                      z.enum(["create", "update"]),
                    ])
                    .optional(),
                  "ui:hidden": z
                    .union([
                      z.object({ expr: z.string() }),
                      z.boolean(),
                      z.enum(["create", "update"]),
                    ])
                    .optional(),
                  "ui:disabled": z
                    .union([
                      z.object({ expr: z.string() }),
                      z.boolean(),
                      z.enum(["create", "update"]),
                    ])
                    .optional(),
                  "ui:description": z
                    .union([z.string(), z.object({ expr: z.string() })])
                    .optional(),
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
                  default: z.string().optional(),
                  enum: z.array(z.string()).optional(),
                  maxLength: z.number().optional(),
                  minLength: z.number().optional(),
                  pattern: z.string().optional(),
                  description: z.string().optional(),
                  "ui:label": z.string().optional(),
                  "ui:read-only": z
                    .union([
                      z.object({ expr: z.string() }),
                      z.boolean(),
                      z.enum(["create", "update"]),
                    ])
                    .optional(),
                  "ui:hidden": z
                    .union([
                      z.object({ expr: z.string() }),
                      z.boolean(),
                      z.enum(["create", "update"]),
                    ])
                    .optional(),
                  "ui:disabled": z
                    .union([
                      z.object({ expr: z.string() }),
                      z.boolean(),
                      z.enum(["create", "update"]),
                    ])
                    .optional(),
                  "ui:description": z
                    .union([z.string(), z.object({ expr: z.string() })])
                    .optional(),
                  "ui:formatted-value": z.object({ expr: z.string() }).optional(),
                  "ui:paid-only": z.boolean().optional(),
                  "ui:placeholder": z.string().optional(),
                }),
                z.object({
                  type: z.literal("array"),
                  items: z.object({
                    type: z.literal("string"),
                    default: z.string().optional(),
                    enum: z.array(z.string()).optional(),
                    maxLength: z.number().optional(),
                    minLength: z.number().optional(),
                    pattern: z.string().optional(),
                    description: z.string().optional(),
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
                  default: z.array(z.string()).optional(),
                  maxItems: z.number().optional(),
                  minItems: z.number().optional(),
                  description: z.string().optional(),
                  "ui:label": z.string().optional(),
                  "ui:read-only": z
                    .union([
                      z.object({ expr: z.string() }),
                      z.boolean(),
                      z.enum(["create", "update"]),
                    ])
                    .optional(),
                  "ui:hidden": z
                    .union([
                      z.object({ expr: z.string() }),
                      z.boolean(),
                      z.enum(["create", "update"]),
                    ])
                    .optional(),
                  "ui:disabled": z
                    .union([
                      z.object({ expr: z.string() }),
                      z.boolean(),
                      z.enum(["create", "update"]),
                    ])
                    .optional(),
                  "ui:description": z
                    .union([z.string(), z.object({ expr: z.string() })])
                    .optional(),
                  "ui:formatted-value": z.object({ expr: z.string() }).optional(),
                  "ui:paid-only": z.boolean().optional(),
                  "ui:placeholder": z.string().optional(),
                  example: z.array(z.string()).optional(),
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
                  default: z.string().optional(),
                  enum: z.array(z.string()).optional(),
                  maxLength: z.number().optional(),
                  minLength: z.number().optional(),
                  pattern: z.string().optional(),
                  description: z.string().optional(),
                  "ui:label": z.string().optional(),
                  "ui:read-only": z
                    .union([
                      z.object({ expr: z.string() }),
                      z.boolean(),
                      z.enum(["create", "update"]),
                    ])
                    .optional(),
                  "ui:hidden": z
                    .union([
                      z.object({ expr: z.string() }),
                      z.boolean(),
                      z.enum(["create", "update"]),
                    ])
                    .optional(),
                  "ui:disabled": z
                    .union([
                      z.object({ expr: z.string() }),
                      z.boolean(),
                      z.enum(["create", "update"]),
                    ])
                    .optional(),
                  "ui:description": z
                    .union([z.string(), z.object({ expr: z.string() })])
                    .optional(),
                  "ui:formatted-value": z.object({ expr: z.string() }).optional(),
                  "ui:paid-only": z.boolean().optional(),
                  "ui:placeholder": z.string().optional(),
                }),
                z.object({
                  type: z.literal("array"),
                  items: z.object({
                    type: z.literal("string"),
                    default: z.string().optional(),
                    enum: z.array(z.string()).optional(),
                    maxLength: z.number().optional(),
                    minLength: z.number().optional(),
                    pattern: z.string().optional(),
                    description: z.string().optional(),
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
                  default: z.array(z.string()).optional(),
                  maxItems: z.number().optional(),
                  minItems: z.number().optional(),
                  description: z.string().optional(),
                  "ui:label": z.string().optional(),
                  "ui:read-only": z
                    .union([
                      z.object({ expr: z.string() }),
                      z.boolean(),
                      z.enum(["create", "update"]),
                    ])
                    .optional(),
                  "ui:hidden": z
                    .union([
                      z.object({ expr: z.string() }),
                      z.boolean(),
                      z.enum(["create", "update"]),
                    ])
                    .optional(),
                  "ui:disabled": z
                    .union([
                      z.object({ expr: z.string() }),
                      z.boolean(),
                      z.enum(["create", "update"]),
                    ])
                    .optional(),
                  "ui:description": z
                    .union([z.string(), z.object({ expr: z.string() })])
                    .optional(),
                  "ui:formatted-value": z.object({ expr: z.string() }).optional(),
                  "ui:paid-only": z.boolean().optional(),
                  "ui:placeholder": z.string().optional(),
                  example: z.array(z.string()).optional(),
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
                  default: z.string().optional(),
                  enum: z.array(z.string()).optional(),
                  maxLength: z.number().optional(),
                  minLength: z.number().optional(),
                  pattern: z.string().optional(),
                  description: z.string().optional(),
                  "ui:label": z.string().optional(),
                  "ui:read-only": z
                    .union([
                      z.object({ expr: z.string() }),
                      z.boolean(),
                      z.enum(["create", "update"]),
                    ])
                    .optional(),
                  "ui:hidden": z
                    .union([
                      z.object({ expr: z.string() }),
                      z.boolean(),
                      z.enum(["create", "update"]),
                    ])
                    .optional(),
                  "ui:disabled": z
                    .union([
                      z.object({ expr: z.string() }),
                      z.boolean(),
                      z.enum(["create", "update"]),
                    ])
                    .optional(),
                  "ui:description": z
                    .union([z.string(), z.object({ expr: z.string() })])
                    .optional(),
                  "ui:formatted-value": z.object({ expr: z.string() }).optional(),
                  "ui:paid-only": z.boolean().optional(),
                  "ui:placeholder": z.string().optional(),
                }),
                z.object({
                  type: z.literal("string"),
                  "ui:control": z.literal("domain"),
                  default: z.string().optional(),
                  enum: z.array(z.string()).optional(),
                  maxLength: z.number().optional(),
                  minLength: z.number().optional(),
                  pattern: z.string().optional(),
                  description: z.string().optional(),
                  "ui:label": z.string().optional(),
                  "ui:read-only": z
                    .union([
                      z.object({ expr: z.string() }),
                      z.boolean(),
                      z.enum(["create", "update"]),
                    ])
                    .optional(),
                  "ui:hidden": z
                    .union([
                      z.object({ expr: z.string() }),
                      z.boolean(),
                      z.enum(["create", "update"]),
                    ])
                    .optional(),
                  "ui:disabled": z
                    .union([
                      z.object({ expr: z.string() }),
                      z.boolean(),
                      z.enum(["create", "update"]),
                    ])
                    .optional(),
                  "ui:description": z
                    .union([z.string(), z.object({ expr: z.string() })])
                    .optional(),
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
                    .union([
                      z.object({ expr: z.string() }),
                      z.boolean(),
                      z.enum(["create", "update"]),
                    ])
                    .optional(),
                  "ui:hidden": z
                    .union([
                      z.object({ expr: z.string() }),
                      z.boolean(),
                      z.enum(["create", "update"]),
                    ])
                    .optional(),
                  "ui:disabled": z
                    .union([
                      z.object({ expr: z.string() }),
                      z.boolean(),
                      z.enum(["create", "update"]),
                    ])
                    .optional(),
                  "ui:description": z
                    .union([z.string(), z.object({ expr: z.string() })])
                    .optional(),
                  "ui:formatted-value": z.object({ expr: z.string() }).optional(),
                  "ui:paid-only": z.boolean().optional(),
                  "ui:placeholder": z.string().optional(),
                  "git:providers": z.array(z.enum(["bitbucket", "github", "gitlab"])).optional(),
                }),
              ]),
            ),
            required: z.array(z.string()).optional(),
            "ui:order": z.array(z.string()).optional(),
          })
          .optional(),
        resourceLinks: z.array(z.object({ href: z.string(), title: z.string() })).optional(),
        tags: z
          .array(
            z.enum([
              "ai",
              "authentication",
              "blob",
              "checks",
              "drains",
              "edge-config",
              "experimentation",
              "kv",
              "libsql",
              "logDrain",
              "mcp",
              "messaging",
              "mysql",
              "observability",
              "other",
              "postgres",
              "rds",
              "redis",
              "sqlite",
              "storage",
              "tag_agents",
              "tag_ai",
              "tag_analytics",
              "tag_authentication",
              "tag_checks",
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
              "tag_logDrain",
              "tag_logging",
              "tag_messaging",
              "tag_monitoring",
              "tag_observability",
              "tag_other",
              "tag_payments",
              "tag_performance",
              "tag_productivity",
              "tag_searching",
              "tag_security",
              "tag_storage",
              "tag_support_agent",
              "tag_testing",
              "tag_traceDrain",
              "tag_video",
              "tag_web_automation",
              "tag_workflow",
              "traceDrain",
              "vector",
              "video",
              "workflow",
            ]),
          )
          .optional(),
        projectConnectionScopes: z
          .array(
            z.enum([
              "read-write:deployment",
              "read-write:deployment-check",
              "read-write:domain",
              "read-write:drains",
              "read-write:global-project-env-vars",
              "read-write:integration-deployment-action",
              "read-write:log-drain",
              "read-write:project-env-vars",
              "read-write:project-protection-bypass",
              "read:deployment",
              "read:domain",
              "read:project",
            ]),
          )
          .optional(),
        showSSOLinkOnProjectConnection: z.boolean().optional(),
        disableResourceRenaming: z.boolean().optional(),
        resourceTitle: z.string().optional(),
        agentSkills: z.array(z.string()).optional(),
        repl: z
          .object({
            enabled: z.boolean(),
            supportsReadOnlyMode: z.boolean(),
            welcomeMessage: z.string().optional(),
          })
          .optional(),
        guides: z
          .array(
            z.object({
              framework: z.string(),
              title: z.string(),
              steps: z.array(
                z.object({
                  title: z.string(),
                  content: z.string(),
                  actions: z
                    .array(
                      z.object({
                        type: z.enum([
                          "add_drain",
                          "configure_project_connections",
                          "connect_to_project",
                        ]),
                      }),
                    )
                    .optional(),
                }),
              ),
            }),
          )
          .optional(),
        integration: z.object({
          id: z.string(),
          name: z.string(),
          slug: z.string(),
          supportsInstallationBillingPlans: z.boolean().optional(),
          icon: z.string(),
          capabilities: z
            .object({
              provisioning: z.boolean().optional(),
              mcp: z.boolean().optional(),
              mcpReadonly: z.boolean().optional(),
              sso: z.boolean().optional(),
              billable: z.boolean().optional(),
              transferable: z.boolean().optional(),
              templateCloneOnly: z.boolean().optional(),
              checks: z.boolean().optional(),
              connectedProvisioning: z.boolean().optional(),
              secretRotation: z
                .union([
                  z.object({
                    maxDelayHours: z.number(),
                    customRotationWarning: z.string().optional(),
                  }),
                  z.literal(false),
                ])
                .optional(),
              importResource: z.boolean().optional(),
              connectedImportResource: z.boolean().optional(),
              nativeImportResource: z.boolean().optional(),
              requiresBrowserInstall: z.boolean().optional(),
              v0Flavors: z.boolean().optional(),
              flexCommitEligible: z.boolean().optional(),
              updateConfiguration: z.boolean().optional(),
              maxAllowedTeams: z.number().optional(),
            })
            .optional(),
          flags: z.array(z.string()).optional(),
        }),
        integrationConfigurationId: z.string(),
        supportedProtocols: z.array(
          z.enum([
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
          ]),
        ),
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
        logDrainStatus: z.enum(["disabled", "enabled"]).optional(),
      }),
      protocolSettings: z
        .object({
          experimentation: z
            .object({
              edgeConfigSyncingEnabled: z.boolean().optional(),
              edgeConfigId: z.string().optional(),
              globalConfigId: z.string().optional(),
              globalConfigSyncingEnabled: z.boolean().optional(),
              edgeConfigTokenId: z.string().optional(),
            })
            .optional(),
          authentication: z
            .object({
              appUrls: z
                .array(
                  z.object({
                    url: z.string(),
                    target: z.enum(["development", "preview", "production"]),
                  }),
                )
                .optional(),
            })
            .optional(),
        })
        .optional(),
      notification: z
        .object({
          title: z.string(),
          level: z.enum(["error", "info", "warn"]),
          message: z.string().optional(),
          href: z.string().optional(),
        })
        .optional(),
      secrets: z.array(
        z.object({
          name: z.string(),
          length: z.number(),
          frameworkPublishable: z.boolean().optional(),
        }),
      ),
      billingPlan: z
        .object({
          id: z.string(),
          type: z.enum(["prepayment", "subscription"]),
          description: z.string(),
          name: z.string(),
          scope: z.enum(["installation", "resource"]),
          paymentMethodRequired: z.boolean(),
          preauthorizationAmount: z.number().optional(),
          initialCharge: z.string().optional(),
          minimumAmount: z.string().optional(),
          maximumAmount: z.string().optional(),
          maximumAmountAutoPurchasePerPeriod: z.string().optional(),
          cost: z.string().optional(),
          details: z
            .array(z.object({ label: z.string(), value: z.string().optional() }))
            .optional(),
          highlightedDetails: z
            .array(z.object({ label: z.string(), value: z.string().optional() }))
            .optional(),
          quote: z.array(z.object({ line: z.string(), amount: z.string() })).optional(),
          effectiveDate: z.string().optional(),
          disabled: z.boolean().optional(),
        })
        .optional(),
      secretRotationRequestedAt: z.number().optional(),
      secretRotationRequestedReason: z.string().optional(),
      secretRotationRequestedBy: z.string().optional(),
      secretRotationCompletedAt: z.number().optional(),
      parentId: z.string().optional(),
      targets: z.array(z.enum(["development", "preview", "production"])).optional(),
    })
    .nullable(),
});

export type UseCreateApiV1StorageStoresIntegrationDirectResponse = {
  store: {
    projectsMetadata: Array<{
      id: string;
      projectId: string;
      name: string;
      framework?:
        | (
            | "actix-web"
            | "angular"
            | "ash"
            | "astro"
            | "axum"
            | "blitzjs"
            | "brunch"
            | "bun"
            | "container"
            | "create-react-app"
            | "django"
            | "docusaurus"
            | "docusaurus-2"
            | "dojo"
            | "eleventy"
            | "elysia"
            | "ember"
            | "eve"
            | "express"
            | "fastapi"
            | "fasthtml"
            | "fastify"
            | "flask"
            | "gatsby"
            | "go"
            | "gridsome"
            | "h3"
            | "hexo"
            | "hono"
            | "hugo"
            | "hydrogen"
            | "ionic-angular"
            | "ionic-react"
            | "jekyll"
            | "koa"
            | "mastra"
            | "middleman"
            | "nestjs"
            | "nextjs"
            | "nitro"
            | "node"
            | "nuxtjs"
            | "parcel"
            | "polymer"
            | "preact"
            | "python"
            | "react-router"
            | "redwoodjs"
            | "remix"
            | "ruby"
            | "rust"
            | "saber"
            | "sanity"
            | "sanity-v2"
            | "sapper"
            | "scully"
            | "services"
            | "solidstart"
            | "solidstart-1"
            | "stencil"
            | "storybook"
            | "svelte"
            | "sveltekit"
            | "sveltekit-1"
            | "tanstack-start"
            | "tanstack-start-lovable"
            | "umijs"
            | "vite"
            | "vitepress"
            | "vue"
            | "vuepress"
            | "xmcp"
            | "zola"
            | "null"
            | null
          )
        | undefined;
      latestDeployment?: string | undefined;
      environments: Array<string>;
      envVarPrefix: string | null;
      environmentVariables: Array<string>;
      deployments?:
        | {
            required: boolean;
            actions: Array<{
              slug: string;
              environments: Array<"development" | "preview" | "production">;
            }>;
          }
        | undefined;
      makeEnvVarsSensitive?: boolean | undefined;
    }>;
    projectFilter?:
      | {
          git?:
            | {
                providers: Array<"bitbucket" | "github" | "gitlab"> | "*";
                owners?: Array<string> | undefined;
                repos?: Array<string> | undefined;
              }
            | undefined;
        }
      | undefined;
    totalConnectedProjects?: number | undefined;
    usageQuotaExceeded: boolean;
    status:
      | "available"
      | "error"
      | "initializing"
      | "limits-exceeded-suspended"
      | "limits-exceeded-suspended-store-count"
      | "onboarding"
      | "suspended"
      | "uninstalled"
      | "null"
      | null;
    ownership?: ("linked" | "owned" | "sandbox") | undefined;
    capabilities?:
      | {
          mcp?: boolean | undefined;
          mcpReadonly?: boolean | undefined;
          sso?: boolean | undefined;
          billable?: boolean | undefined;
          transferable?: boolean | undefined;
          secretsSync?: boolean | undefined;
          secretRotation?:
            | ({ maxDelayHours: number; customRotationWarning?: string | undefined } | false)
            | undefined;
          projects?: boolean | undefined;
          v0?: boolean | undefined;
          autoSensitive?: boolean | undefined;
          agentTools?: boolean | undefined;
        }
      | undefined;
    metadata?:
      | Record<string, string | number | Array<string> | Array<number> | boolean>
      | undefined;
    externalResourceId: string;
    externalResourceStatus?:
      | (
          | "error"
          | "onboarding"
          | "pending"
          | "ready"
          | "resumed"
          | "suspended"
          | "uninstalled"
          | "null"
          | null
        )
      | undefined;
    directPartnerConsoleUrl?: string | undefined;
    product: {
      id?: string | undefined;
      name?: string | undefined;
      slug?: string | undefined;
      iconUrl?: string | undefined;
      capabilities?:
        | {
            mcp?: boolean | undefined;
            mcpReadonly?: boolean | undefined;
            sso?: boolean | undefined;
            billable?: boolean | undefined;
            transferable?: boolean | undefined;
            secretsSync?: boolean | undefined;
            secretRotation?:
              | ({ maxDelayHours: number; customRotationWarning?: string | undefined } | false)
              | undefined;
            sandbox?: boolean | undefined;
            linking?: boolean | undefined;
            projects?: boolean | undefined;
            v0?: boolean | undefined;
            importResource?: boolean | undefined;
            connectedImportResource?: boolean | undefined;
            nativeImportResource?: boolean | undefined;
            databaseUI?: boolean | undefined;
            v0Flavors?: boolean | undefined;
            autoSensitive?: boolean | undefined;
            agentTools?: boolean | undefined;
          }
        | undefined;
      shortDescription?: string | undefined;
      metadataSchema?:
        | {
            type: "object";
            properties: Record<
              string,
              | {
                  type: "string";
                  "ui:control": "input";
                  default?: string | undefined;
                  enum?: Array<string> | undefined;
                  maxLength?: number | undefined;
                  minLength?: number | undefined;
                  pattern?: string | undefined;
                  description?: string | undefined;
                  "ui:label"?: string | undefined;
                  "ui:read-only"?: ({ expr: string } | boolean | "create" | "update") | undefined;
                  "ui:hidden"?: ({ expr: string } | boolean | "create" | "update") | undefined;
                  "ui:disabled"?: ({ expr: string } | boolean | "create" | "update") | undefined;
                  "ui:description"?: (string | { expr: string }) | undefined;
                  "ui:formatted-value"?: { expr: string } | undefined;
                  "ui:paid-only"?: boolean | undefined;
                  "ui:placeholder"?: string | undefined;
                }
              | {
                  type: "number";
                  "ui:control": "input";
                  default?: number | undefined;
                  maximum?: number | undefined;
                  exclusiveMaximum?: number | undefined;
                  minimum?: number | undefined;
                  exclusiveMinimum?: number | undefined;
                  description?: string | undefined;
                  "ui:label"?: string | undefined;
                  "ui:read-only"?: ({ expr: string } | boolean | "create" | "update") | undefined;
                  "ui:hidden"?: ({ expr: string } | boolean | "create" | "update") | undefined;
                  "ui:disabled"?: ({ expr: string } | boolean | "create" | "update") | undefined;
                  "ui:description"?: (string | { expr: string }) | undefined;
                  "ui:formatted-value"?: { expr: string } | undefined;
                  "ui:paid-only"?: boolean | undefined;
                  "ui:placeholder"?: string | undefined;
                }
              | {
                  type: "boolean";
                  "ui:control": "toggle";
                  default?: boolean | undefined;
                  description?: string | undefined;
                  "ui:label"?: string | undefined;
                  "ui:read-only"?: ({ expr: string } | boolean | "create" | "update") | undefined;
                  "ui:hidden"?: ({ expr: string } | boolean | "create" | "update") | undefined;
                  "ui:disabled"?: ({ expr: string } | boolean | "create" | "update") | undefined;
                  "ui:description"?: (string | { expr: string }) | undefined;
                  "ui:formatted-value"?: { expr: string } | undefined;
                  "ui:paid-only"?: boolean | undefined;
                }
              | {
                  type: "array";
                  items: {
                    type: "number";
                    default?: number | undefined;
                    maximum?: number | undefined;
                    exclusiveMaximum?: number | undefined;
                    minimum?: number | undefined;
                    exclusiveMinimum?: number | undefined;
                    description?: string | undefined;
                  };
                  "ui:control": "slider";
                  "ui:steps": Array<number>;
                  default?: Array<number> | undefined;
                  maxItems?: number | undefined;
                  minItems?: number | undefined;
                  description?: string | undefined;
                  "ui:label"?: string | undefined;
                  "ui:read-only"?: ({ expr: string } | boolean | "create" | "update") | undefined;
                  "ui:hidden"?: ({ expr: string } | boolean | "create" | "update") | undefined;
                  "ui:disabled"?: ({ expr: string } | boolean | "create" | "update") | undefined;
                  "ui:description"?: (string | { expr: string }) | undefined;
                  "ui:formatted-value"?: { expr: string } | undefined;
                  "ui:paid-only"?: boolean | undefined;
                }
              | {
                  type: "string";
                  "ui:control": "select";
                  "ui:options": Array<{
                    value: string;
                    label: string;
                    description?: string | undefined;
                    disabled?: ({ expr: string } | boolean | "create" | "update") | undefined;
                    hidden?: ({ expr: string } | boolean | "create" | "update") | undefined;
                  }>;
                  default?: string | undefined;
                  enum?: Array<string> | undefined;
                  maxLength?: number | undefined;
                  minLength?: number | undefined;
                  pattern?: string | undefined;
                  description?: string | undefined;
                  "ui:label"?: string | undefined;
                  "ui:read-only"?: ({ expr: string } | boolean | "create" | "update") | undefined;
                  "ui:hidden"?: ({ expr: string } | boolean | "create" | "update") | undefined;
                  "ui:disabled"?: ({ expr: string } | boolean | "create" | "update") | undefined;
                  "ui:description"?: (string | { expr: string }) | undefined;
                  "ui:formatted-value"?: { expr: string } | undefined;
                  "ui:paid-only"?: boolean | undefined;
                  "ui:placeholder"?: string | undefined;
                }
              | {
                  type: "string";
                  "ui:control": "radio-button";
                  "ui:options": Array<{
                    value: string;
                    label: string;
                    description?: string | undefined;
                    disabled?: ({ expr: string } | boolean | "create" | "update") | undefined;
                    hidden?: ({ expr: string } | boolean | "create" | "update") | undefined;
                  }>;
                  default?: string | undefined;
                  enum?: Array<string> | undefined;
                  maxLength?: number | undefined;
                  minLength?: number | undefined;
                  pattern?: string | undefined;
                  description?: string | undefined;
                  "ui:label"?: string | undefined;
                  "ui:read-only"?: ({ expr: string } | boolean | "create" | "update") | undefined;
                  "ui:hidden"?: ({ expr: string } | boolean | "create" | "update") | undefined;
                  "ui:disabled"?: ({ expr: string } | boolean | "create" | "update") | undefined;
                  "ui:description"?: (string | { expr: string }) | undefined;
                  "ui:formatted-value"?: { expr: string } | undefined;
                  "ui:paid-only"?: boolean | undefined;
                  "ui:placeholder"?: string | undefined;
                }
              | {
                  type: "array";
                  items: {
                    type: "string";
                    default?: string | undefined;
                    enum?: Array<string> | undefined;
                    maxLength?: number | undefined;
                    minLength?: number | undefined;
                    pattern?: string | undefined;
                    description?: string | undefined;
                  };
                  "ui:control": "multi-select";
                  "ui:options": Array<{
                    value: string;
                    label: string;
                    description?: string | undefined;
                    disabled?: ({ expr: string } | boolean | "create" | "update") | undefined;
                    hidden?: ({ expr: string } | boolean | "create" | "update") | undefined;
                  }>;
                  default?: Array<string> | undefined;
                  maxItems?: number | undefined;
                  minItems?: number | undefined;
                  description?: string | undefined;
                  "ui:label"?: string | undefined;
                  "ui:read-only"?: ({ expr: string } | boolean | "create" | "update") | undefined;
                  "ui:hidden"?: ({ expr: string } | boolean | "create" | "update") | undefined;
                  "ui:disabled"?: ({ expr: string } | boolean | "create" | "update") | undefined;
                  "ui:description"?: (string | { expr: string }) | undefined;
                  "ui:formatted-value"?: { expr: string } | undefined;
                  "ui:paid-only"?: boolean | undefined;
                  "ui:placeholder"?: string | undefined;
                  example?: Array<string> | undefined;
                }
              | {
                  type: "string";
                  "ui:control": "vercel-region";
                  "ui:options": Array<
                    | {
                        value: string;
                        label: string;
                        description?: string | undefined;
                        disabled?: ({ expr: string } | boolean | "create" | "update") | undefined;
                        hidden?: ({ expr: string } | boolean | "create" | "update") | undefined;
                      }
                    | string
                    | {
                        value: string;
                        description?: string | undefined;
                        disabled?: ({ expr: string } | boolean | "create" | "update") | undefined;
                        hidden?: ({ expr: string } | boolean | "create" | "update") | undefined;
                      }
                  >;
                  default?: string | undefined;
                  enum?: Array<string> | undefined;
                  maxLength?: number | undefined;
                  minLength?: number | undefined;
                  pattern?: string | undefined;
                  description?: string | undefined;
                  "ui:label"?: string | undefined;
                  "ui:read-only"?: ({ expr: string } | boolean | "create" | "update") | undefined;
                  "ui:hidden"?: ({ expr: string } | boolean | "create" | "update") | undefined;
                  "ui:disabled"?: ({ expr: string } | boolean | "create" | "update") | undefined;
                  "ui:description"?: (string | { expr: string }) | undefined;
                  "ui:formatted-value"?: { expr: string } | undefined;
                  "ui:paid-only"?: boolean | undefined;
                  "ui:placeholder"?: string | undefined;
                }
              | {
                  type: "array";
                  items: {
                    type: "string";
                    default?: string | undefined;
                    enum?: Array<string> | undefined;
                    maxLength?: number | undefined;
                    minLength?: number | undefined;
                    pattern?: string | undefined;
                    description?: string | undefined;
                  };
                  "ui:control": "multi-vercel-region";
                  "ui:options": Array<
                    | {
                        value: string;
                        label: string;
                        description?: string | undefined;
                        disabled?: ({ expr: string } | boolean | "create" | "update") | undefined;
                        hidden?: ({ expr: string } | boolean | "create" | "update") | undefined;
                      }
                    | string
                    | {
                        value: string;
                        description?: string | undefined;
                        disabled?: ({ expr: string } | boolean | "create" | "update") | undefined;
                        hidden?: ({ expr: string } | boolean | "create" | "update") | undefined;
                      }
                  >;
                  default?: Array<string> | undefined;
                  maxItems?: number | undefined;
                  minItems?: number | undefined;
                  description?: string | undefined;
                  "ui:label"?: string | undefined;
                  "ui:read-only"?: ({ expr: string } | boolean | "create" | "update") | undefined;
                  "ui:hidden"?: ({ expr: string } | boolean | "create" | "update") | undefined;
                  "ui:disabled"?: ({ expr: string } | boolean | "create" | "update") | undefined;
                  "ui:description"?: (string | { expr: string }) | undefined;
                  "ui:formatted-value"?: { expr: string } | undefined;
                  "ui:paid-only"?: boolean | undefined;
                  "ui:placeholder"?: string | undefined;
                  example?: Array<string> | undefined;
                }
              | {
                  type: "string";
                  "ui:control": "vercel-country";
                  "ui:options": Array<
                    | {
                        value: string;
                        label: string;
                        description?: string | undefined;
                        disabled?: ({ expr: string } | boolean | "create" | "update") | undefined;
                        hidden?: ({ expr: string } | boolean | "create" | "update") | undefined;
                      }
                    | string
                    | {
                        value: string;
                        description?: string | undefined;
                        disabled?: ({ expr: string } | boolean | "create" | "update") | undefined;
                        hidden?: ({ expr: string } | boolean | "create" | "update") | undefined;
                      }
                  >;
                  default?: string | undefined;
                  enum?: Array<string> | undefined;
                  maxLength?: number | undefined;
                  minLength?: number | undefined;
                  pattern?: string | undefined;
                  description?: string | undefined;
                  "ui:label"?: string | undefined;
                  "ui:read-only"?: ({ expr: string } | boolean | "create" | "update") | undefined;
                  "ui:hidden"?: ({ expr: string } | boolean | "create" | "update") | undefined;
                  "ui:disabled"?: ({ expr: string } | boolean | "create" | "update") | undefined;
                  "ui:description"?: (string | { expr: string }) | undefined;
                  "ui:formatted-value"?: { expr: string } | undefined;
                  "ui:paid-only"?: boolean | undefined;
                  "ui:placeholder"?: string | undefined;
                }
              | {
                  type: "string";
                  "ui:control": "domain";
                  default?: string | undefined;
                  enum?: Array<string> | undefined;
                  maxLength?: number | undefined;
                  minLength?: number | undefined;
                  pattern?: string | undefined;
                  description?: string | undefined;
                  "ui:label"?: string | undefined;
                  "ui:read-only"?: ({ expr: string } | boolean | "create" | "update") | undefined;
                  "ui:hidden"?: ({ expr: string } | boolean | "create" | "update") | undefined;
                  "ui:disabled"?: ({ expr: string } | boolean | "create" | "update") | undefined;
                  "ui:description"?: (string | { expr: string }) | undefined;
                  "ui:formatted-value"?: { expr: string } | undefined;
                  "ui:paid-only"?: boolean | undefined;
                  "ui:placeholder"?: string | undefined;
                }
              | {
                  type: "string";
                  "ui:control": "git-namespace";
                  description?: string | undefined;
                  "ui:label"?: string | undefined;
                  "ui:read-only"?: ({ expr: string } | boolean | "create" | "update") | undefined;
                  "ui:hidden"?: ({ expr: string } | boolean | "create" | "update") | undefined;
                  "ui:disabled"?: ({ expr: string } | boolean | "create" | "update") | undefined;
                  "ui:description"?: (string | { expr: string }) | undefined;
                  "ui:formatted-value"?: { expr: string } | undefined;
                  "ui:paid-only"?: boolean | undefined;
                  "ui:placeholder"?: string | undefined;
                  "git:providers"?: Array<"bitbucket" | "github" | "gitlab"> | undefined;
                }
            >;
            required?: Array<string> | undefined;
            "ui:order"?: Array<string> | undefined;
          }
        | undefined;
      resourceLinks?: Array<{ href: string; title: string }> | undefined;
      tags?:
        | Array<
            | "ai"
            | "authentication"
            | "blob"
            | "checks"
            | "drains"
            | "edge-config"
            | "experimentation"
            | "kv"
            | "libsql"
            | "logDrain"
            | "mcp"
            | "messaging"
            | "mysql"
            | "observability"
            | "other"
            | "postgres"
            | "rds"
            | "redis"
            | "sqlite"
            | "storage"
            | "tag_agents"
            | "tag_ai"
            | "tag_analytics"
            | "tag_authentication"
            | "tag_checks"
            | "tag_cms"
            | "tag_code_repository"
            | "tag_code_review"
            | "tag_code_security"
            | "tag_code_testing"
            | "tag_commerce"
            | "tag_databases"
            | "tag_dev_tools"
            | "tag_experimentation"
            | "tag_flags"
            | "tag_logDrain"
            | "tag_logging"
            | "tag_messaging"
            | "tag_monitoring"
            | "tag_observability"
            | "tag_other"
            | "tag_payments"
            | "tag_performance"
            | "tag_productivity"
            | "tag_searching"
            | "tag_security"
            | "tag_storage"
            | "tag_support_agent"
            | "tag_testing"
            | "tag_traceDrain"
            | "tag_video"
            | "tag_web_automation"
            | "tag_workflow"
            | "traceDrain"
            | "vector"
            | "video"
            | "workflow"
          >
        | undefined;
      projectConnectionScopes?:
        | Array<
            | "read-write:deployment"
            | "read-write:deployment-check"
            | "read-write:domain"
            | "read-write:drains"
            | "read-write:global-project-env-vars"
            | "read-write:integration-deployment-action"
            | "read-write:log-drain"
            | "read-write:project-env-vars"
            | "read-write:project-protection-bypass"
            | "read:deployment"
            | "read:domain"
            | "read:project"
          >
        | undefined;
      showSSOLinkOnProjectConnection?: boolean | undefined;
      disableResourceRenaming?: boolean | undefined;
      resourceTitle?: string | undefined;
      agentSkills?: Array<string> | undefined;
      repl?:
        | { enabled: boolean; supportsReadOnlyMode: boolean; welcomeMessage?: string | undefined }
        | undefined;
      guides?:
        | Array<{
            framework: string;
            title: string;
            steps: Array<{
              title: string;
              content: string;
              actions?:
                | Array<{
                    type: "add_drain" | "configure_project_connections" | "connect_to_project";
                  }>
                | undefined;
            }>;
          }>
        | undefined;
      integration: {
        id: string;
        name: string;
        slug: string;
        supportsInstallationBillingPlans?: boolean | undefined;
        icon: string;
        capabilities?:
          | {
              provisioning?: boolean | undefined;
              mcp?: boolean | undefined;
              mcpReadonly?: boolean | undefined;
              sso?: boolean | undefined;
              billable?: boolean | undefined;
              transferable?: boolean | undefined;
              templateCloneOnly?: boolean | undefined;
              checks?: boolean | undefined;
              connectedProvisioning?: boolean | undefined;
              secretRotation?:
                | ({ maxDelayHours: number; customRotationWarning?: string | undefined } | false)
                | undefined;
              importResource?: boolean | undefined;
              connectedImportResource?: boolean | undefined;
              nativeImportResource?: boolean | undefined;
              requiresBrowserInstall?: boolean | undefined;
              v0Flavors?: boolean | undefined;
              flexCommitEligible?: boolean | undefined;
              updateConfiguration?: boolean | undefined;
              maxAllowedTeams?: number | undefined;
            }
          | undefined;
        flags?: Array<string> | undefined;
      };
      integrationConfigurationId: string;
      supportedProtocols: Array<
        | "ai"
        | "authentication"
        | "checks"
        | "experimentation"
        | "logDrain"
        | "messaging"
        | "observability"
        | "other"
        | "storage"
        | "traceDrain"
        | "video"
        | "workflow"
      >;
      primaryProtocol?:
        | (
            | "ai"
            | "authentication"
            | "checks"
            | "experimentation"
            | "logDrain"
            | "messaging"
            | "observability"
            | "other"
            | "storage"
            | "traceDrain"
            | "video"
            | "workflow"
          )
        | undefined;
      logDrainStatus?: ("disabled" | "enabled") | undefined;
    };
    protocolSettings?:
      | {
          experimentation?:
            | {
                edgeConfigSyncingEnabled?: boolean | undefined;
                edgeConfigId?: string | undefined;
                globalConfigId?: string | undefined;
                globalConfigSyncingEnabled?: boolean | undefined;
                edgeConfigTokenId?: string | undefined;
              }
            | undefined;
          authentication?:
            | {
                appUrls?:
                  | Array<{ url: string; target: "development" | "preview" | "production" }>
                  | undefined;
              }
            | undefined;
        }
      | undefined;
    notification?:
      | {
          title: string;
          level: "error" | "info" | "warn";
          message?: string | undefined;
          href?: string | undefined;
        }
      | undefined;
    secrets: Array<{ name: string; length: number; frameworkPublishable?: boolean | undefined }>;
    billingPlan?:
      | {
          id: string;
          type: "prepayment" | "subscription";
          description: string;
          name: string;
          scope: "installation" | "resource";
          paymentMethodRequired: boolean;
          preauthorizationAmount?: number | undefined;
          initialCharge?: string | undefined;
          minimumAmount?: string | undefined;
          maximumAmount?: string | undefined;
          maximumAmountAutoPurchasePerPeriod?: string | undefined;
          cost?: string | undefined;
          details?: Array<{ label: string; value?: string | undefined }> | undefined;
          highlightedDetails?: Array<{ label: string; value?: string | undefined }> | undefined;
          quote?: Array<{ line: string; amount: string }> | undefined;
          effectiveDate?: string | undefined;
          disabled?: boolean | undefined;
        }
      | undefined;
    secretRotationRequestedAt?: number | undefined;
    secretRotationRequestedReason?: string | undefined;
    secretRotationRequestedBy?: string | undefined;
    secretRotationCompletedAt?: number | undefined;
    parentId?: string | undefined;
    targets?: Array<"development" | "preview" | "production"> | undefined;
  } | null;
};

export type CreateApiV1StorageStoresIntegrationDirectBody = {
  name: string;
  integrationConfigurationId: string;
  integrationProductIdOrSlug: string | string;
  metadata?: Record<string, string | number | boolean | Array<string> | Array<number>> | undefined;
  externalId?: string | undefined;
  protocolSettings?: Record<string, unknown> | undefined;
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
  billingPlanId?: string | undefined;
  paymentMethodId?: string | undefined;
  prepaymentAmountCents?: number | undefined;
};

export const useCreateApiV1StorageStoresIntegrationDirect = (
  options: UseMutationOptions<
    UseCreateApiV1StorageStoresIntegrationDirectResponse,
    Error,
    UseCreateApiV1StorageStoresIntegrationDirectArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1StorageStoresIntegrationDirectArgs) =>
      apiFetch(
        buildUrl("/v1/storage/stores/integration/direct", { teamId: args.teamId, slug: args.slug }),
        useCreateApiV1StorageStoresIntegrationDirectResponse,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["integrations"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
