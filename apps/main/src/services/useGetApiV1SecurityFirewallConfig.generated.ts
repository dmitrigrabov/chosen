import { z } from "zod";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/client";

export const useGetApiV1SecurityFirewallConfigResponse = z.object({
  active: z
    .object({
      ownerId: z.string(),
      projectKey: z.string(),
      id: z.string(),
      version: z.number(),
      updatedAt: z.string(),
      firewallEnabled: z.boolean(),
      crs: z
        .object({
          sd: z.object({ active: z.boolean(), action: z.enum(["deny", "log"]) }),
          ma: z.object({ active: z.boolean(), action: z.enum(["deny", "log"]) }),
          lfi: z.object({ active: z.boolean(), action: z.enum(["deny", "log"]) }),
          rfi: z.object({ active: z.boolean(), action: z.enum(["deny", "log"]) }),
          rce: z.object({ active: z.boolean(), action: z.enum(["deny", "log"]) }),
          php: z.object({ active: z.boolean(), action: z.enum(["deny", "log"]) }),
          gen: z.object({ active: z.boolean(), action: z.enum(["deny", "log"]) }),
          xss: z.object({ active: z.boolean(), action: z.enum(["deny", "log"]) }),
          sqli: z.object({ active: z.boolean(), action: z.enum(["deny", "log"]) }),
          sf: z.object({ active: z.boolean(), action: z.enum(["deny", "log"]) }),
          java: z.object({ active: z.boolean(), action: z.enum(["deny", "log"]) }),
        })
        .optional(),
      rules: z.array(
        z.union([
          z.object({
            id: z.string(),
            name: z.string(),
            description: z.string().optional(),
            active: z.boolean(),
            conditionGroup: z.array(
              z.object({
                conditions: z.array(
                  z.object({
                    type: z.enum([
                      "bot_category",
                      "bot_name",
                      "bot_protection",
                      "bot_status",
                      "cookie",
                      "domain_environment",
                      "environment",
                      "geo_as_number",
                      "geo_city",
                      "geo_continent",
                      "geo_country",
                      "geo_country_region",
                      "header",
                      "host",
                      "ip_address",
                      "ja3_digest",
                      "ja4_digest",
                      "method",
                      "path",
                      "protocol",
                      "query",
                      "rate_limit_api_id",
                      "raw_path",
                      "region",
                      "route",
                      "ruleset",
                      "scheme",
                      "server_action",
                      "shared_condition",
                      "target_path",
                      "trusted_source",
                      "user_agent",
                    ]),
                    op: z.enum([
                      "eq",
                      "ex",
                      "gt",
                      "gte",
                      "inc",
                      "list",
                      "lt",
                      "lte",
                      "neq",
                      "nex",
                      "ninc",
                      "pre",
                      "re",
                      "sub",
                      "suf",
                    ]),
                    neg: z.boolean().optional(),
                    key: z.string().optional(),
                    value: z.union([z.string(), z.number(), z.array(z.string())]).optional(),
                  }),
                ),
              }),
            ),
            action: z.object({
              mitigate: z
                .object({
                  action: z.enum([
                    "allow",
                    "bypass",
                    "challenge",
                    "deny",
                    "log",
                    "rate_limit",
                    "redirect",
                  ]),
                  rateLimit: z
                    .object({
                      algo: z.enum(["fixed_window", "token_bucket"]),
                      window: z.number(),
                      limit: z.number(),
                      keys: z.array(z.string()),
                      action: z
                        .enum(["challenge", "deny", "log", "rate_limit", "null"])
                        .nullable()
                        .optional(),
                    })
                    .nullable()
                    .optional(),
                  redirect: z
                    .object({ location: z.string(), permanent: z.boolean() })
                    .nullable()
                    .optional(),
                  actionDuration: z.string().nullable().optional(),
                  bypassSystem: z.boolean().nullable().optional(),
                  logHeaders: z.union([z.array(z.string()), z.literal("*")]).optional(),
                })
                .optional(),
            }),
            valid: z.literal(true),
            validationErrors: z.unknown(),
          }),
          z.object({
            id: z.string(),
            name: z.string(),
            description: z.string().optional(),
            active: z.boolean(),
            conditionGroup: z.array(
              z.object({
                conditions: z.array(
                  z.object({
                    type: z.enum([
                      "bot_category",
                      "bot_name",
                      "bot_protection",
                      "bot_status",
                      "cookie",
                      "domain_environment",
                      "environment",
                      "geo_as_number",
                      "geo_city",
                      "geo_continent",
                      "geo_country",
                      "geo_country_region",
                      "header",
                      "host",
                      "ip_address",
                      "ja3_digest",
                      "ja4_digest",
                      "method",
                      "path",
                      "protocol",
                      "query",
                      "rate_limit_api_id",
                      "raw_path",
                      "region",
                      "route",
                      "ruleset",
                      "scheme",
                      "server_action",
                      "shared_condition",
                      "target_path",
                      "trusted_source",
                      "user_agent",
                    ]),
                    op: z.enum([
                      "eq",
                      "ex",
                      "gt",
                      "gte",
                      "inc",
                      "list",
                      "lt",
                      "lte",
                      "neq",
                      "nex",
                      "ninc",
                      "pre",
                      "re",
                      "sub",
                      "suf",
                    ]),
                    neg: z.boolean().optional(),
                    key: z.string().optional(),
                    value: z.union([z.string(), z.number(), z.array(z.string())]).optional(),
                  }),
                ),
              }),
            ),
            action: z.object({
              mitigate: z
                .object({
                  action: z.enum([
                    "allow",
                    "bypass",
                    "challenge",
                    "deny",
                    "log",
                    "rate_limit",
                    "redirect",
                  ]),
                  rateLimit: z
                    .object({
                      algo: z.enum(["fixed_window", "token_bucket"]),
                      window: z.number(),
                      limit: z.number(),
                      keys: z.array(z.string()),
                      action: z
                        .enum(["challenge", "deny", "log", "rate_limit", "null"])
                        .nullable()
                        .optional(),
                    })
                    .nullable()
                    .optional(),
                  redirect: z
                    .object({ location: z.string(), permanent: z.boolean() })
                    .nullable()
                    .optional(),
                  actionDuration: z.string().nullable().optional(),
                  bypassSystem: z.boolean().nullable().optional(),
                  logHeaders: z.union([z.array(z.string()), z.literal("*")]).optional(),
                })
                .optional(),
            }),
            valid: z.literal(false),
            validationErrors: z.array(z.string()),
          }),
        ]),
      ),
      ips: z.array(
        z.object({
          id: z.string(),
          hostname: z.string(),
          ip: z.string(),
          notes: z.string().optional(),
          action: z.enum(["bypass", "challenge", "deny", "log"]),
        }),
      ),
      rulesets: z
        .union([
          z.array(
            z.object({
              description: z.string().optional(),
              id: z.string(),
              name: z.string(),
              active: z.boolean(),
              conditionGroup: z.array(
                z.object({
                  conditions: z.array(
                    z.object({
                      type: z.enum([
                        "bot_category",
                        "bot_name",
                        "bot_protection",
                        "bot_status",
                        "cookie",
                        "domain_environment",
                        "environment",
                        "geo_as_number",
                        "geo_city",
                        "geo_continent",
                        "geo_country",
                        "geo_country_region",
                        "header",
                        "host",
                        "ip_address",
                        "ja3_digest",
                        "ja4_digest",
                        "method",
                        "path",
                        "protocol",
                        "query",
                        "rate_limit_api_id",
                        "raw_path",
                        "region",
                        "route",
                        "ruleset",
                        "scheme",
                        "server_action",
                        "shared_condition",
                        "target_path",
                        "trusted_source",
                        "user_agent",
                      ]),
                      op: z.enum([
                        "eq",
                        "ex",
                        "gt",
                        "gte",
                        "inc",
                        "list",
                        "lt",
                        "lte",
                        "neq",
                        "nex",
                        "ninc",
                        "pre",
                        "re",
                        "sub",
                        "suf",
                      ]),
                      neg: z.boolean().optional(),
                      key: z.string().optional(),
                      value: z.union([z.string(), z.number(), z.array(z.string())]).optional(),
                    }),
                  ),
                }),
              ),
              action: z
                .object({
                  mitigate: z
                    .object({
                      action: z.enum([
                        "allow",
                        "bypass",
                        "challenge",
                        "deny",
                        "log",
                        "rate_limit",
                        "redirect",
                      ]),
                      rateLimit: z
                        .object({
                          algo: z.enum(["fixed_window", "token_bucket"]),
                          window: z.number(),
                          limit: z.number(),
                          keys: z.array(z.string()),
                          action: z
                            .enum(["challenge", "deny", "log", "rate_limit", "null"])
                            .nullable()
                            .optional(),
                        })
                        .nullable()
                        .optional(),
                      redirect: z
                        .object({ location: z.string(), permanent: z.boolean() })
                        .nullable()
                        .optional(),
                      actionDuration: z.string().nullable().optional(),
                      bypassSystem: z.boolean().nullable().optional(),
                      logHeaders: z.union([z.array(z.string()), z.literal("*")]).optional(),
                    })
                    .optional(),
                })
                .optional(),
            }),
          ),
          z.record(
            z.string(),
            z.object({
              action: z.enum([
                "allow",
                "bypass",
                "challenge",
                "deny",
                "log",
                "rate_limit",
                "redirect",
              ]),
              rateLimit: z
                .object({
                  algo: z.enum(["fixed_window", "token_bucket"]),
                  window: z.number(),
                  limit: z.number(),
                  keys: z.array(z.string()),
                  action: z
                    .enum(["challenge", "deny", "log", "rate_limit", "null"])
                    .nullable()
                    .optional(),
                })
                .nullable()
                .optional(),
              redirect: z
                .object({ location: z.string(), permanent: z.boolean() })
                .nullable()
                .optional(),
              actionDuration: z.string().nullable().optional(),
              bypassSystem: z.boolean().nullable().optional(),
              logHeaders: z.union([z.array(z.string()), z.literal("*")]).optional(),
            }),
          ),
        ])
        .optional(),
      conditions: z
        .array(
          z.object({
            description: z.string().optional(),
            id: z.string(),
            name: z.string(),
            active: z.boolean(),
            conditionGroup: z.array(
              z.object({
                conditions: z.array(
                  z.object({
                    type: z.enum([
                      "bot_category",
                      "bot_name",
                      "bot_protection",
                      "bot_status",
                      "cookie",
                      "domain_environment",
                      "environment",
                      "geo_as_number",
                      "geo_city",
                      "geo_continent",
                      "geo_country",
                      "geo_country_region",
                      "header",
                      "host",
                      "ip_address",
                      "ja3_digest",
                      "ja4_digest",
                      "method",
                      "path",
                      "protocol",
                      "query",
                      "rate_limit_api_id",
                      "raw_path",
                      "region",
                      "route",
                      "ruleset",
                      "scheme",
                      "server_action",
                      "shared_condition",
                      "target_path",
                      "trusted_source",
                      "user_agent",
                    ]),
                    op: z.enum([
                      "eq",
                      "ex",
                      "gt",
                      "gte",
                      "inc",
                      "list",
                      "lt",
                      "lte",
                      "neq",
                      "nex",
                      "ninc",
                      "pre",
                      "re",
                      "sub",
                      "suf",
                    ]),
                    neg: z.boolean().optional(),
                    key: z.string().optional(),
                    value: z.union([z.string(), z.number(), z.array(z.string())]).optional(),
                  }),
                ),
              }),
            ),
          }),
        )
        .optional(),
      changes: z.array(z.object({})),
      managedRules: z
        .object({
          bot_protection: z
            .object({
              active: z.boolean(),
              action: z.enum(["challenge", "deny", "log"]).optional(),
              updatedAt: z.string().optional(),
              userId: z.string().optional(),
              username: z.string().optional(),
            })
            .optional(),
          ai_bots: z
            .object({
              active: z.boolean(),
              action: z.enum(["challenge", "deny", "log"]).optional(),
              updatedAt: z.string().optional(),
              userId: z.string().optional(),
              username: z.string().optional(),
            })
            .optional(),
          owasp: z
            .object({
              active: z.boolean(),
              action: z.enum(["challenge", "deny", "log"]).optional(),
              updatedAt: z.string().optional(),
              userId: z.string().optional(),
              username: z.string().optional(),
            })
            .optional(),
          vercel_ruleset: z
            .object({
              active: z.boolean(),
              action: z.enum(["challenge", "deny", "log"]).optional(),
              updatedAt: z.string().optional(),
              userId: z.string().optional(),
              username: z.string().optional(),
            })
            .optional(),
          traffic_sources: z
            .object({
              active: z.boolean(),
              action: z.enum(["challenge", "deny", "log"]).optional(),
              updatedAt: z.string().optional(),
              userId: z.string().optional(),
              username: z.string().optional(),
            })
            .optional(),
        })
        .optional(),
      botIdEnabled: z.boolean().optional(),
      logHeaders: z.union([z.array(z.string()), z.literal("*")]).optional(),
    })
    .nullable(),
  draft: z
    .object({
      ownerId: z.string(),
      projectKey: z.string(),
      id: z.string(),
      version: z.number(),
      updatedAt: z.string(),
      firewallEnabled: z.boolean(),
      crs: z
        .object({
          sd: z.object({ active: z.boolean(), action: z.enum(["deny", "log"]) }),
          ma: z.object({ active: z.boolean(), action: z.enum(["deny", "log"]) }),
          lfi: z.object({ active: z.boolean(), action: z.enum(["deny", "log"]) }),
          rfi: z.object({ active: z.boolean(), action: z.enum(["deny", "log"]) }),
          rce: z.object({ active: z.boolean(), action: z.enum(["deny", "log"]) }),
          php: z.object({ active: z.boolean(), action: z.enum(["deny", "log"]) }),
          gen: z.object({ active: z.boolean(), action: z.enum(["deny", "log"]) }),
          xss: z.object({ active: z.boolean(), action: z.enum(["deny", "log"]) }),
          sqli: z.object({ active: z.boolean(), action: z.enum(["deny", "log"]) }),
          sf: z.object({ active: z.boolean(), action: z.enum(["deny", "log"]) }),
          java: z.object({ active: z.boolean(), action: z.enum(["deny", "log"]) }),
        })
        .optional(),
      rules: z.array(
        z.union([
          z.object({
            id: z.string(),
            name: z.string(),
            description: z.string().optional(),
            active: z.boolean(),
            conditionGroup: z.array(
              z.object({
                conditions: z.array(
                  z.object({
                    type: z.enum([
                      "bot_category",
                      "bot_name",
                      "bot_protection",
                      "bot_status",
                      "cookie",
                      "domain_environment",
                      "environment",
                      "geo_as_number",
                      "geo_city",
                      "geo_continent",
                      "geo_country",
                      "geo_country_region",
                      "header",
                      "host",
                      "ip_address",
                      "ja3_digest",
                      "ja4_digest",
                      "method",
                      "path",
                      "protocol",
                      "query",
                      "rate_limit_api_id",
                      "raw_path",
                      "region",
                      "route",
                      "ruleset",
                      "scheme",
                      "server_action",
                      "shared_condition",
                      "target_path",
                      "trusted_source",
                      "user_agent",
                    ]),
                    op: z.enum([
                      "eq",
                      "ex",
                      "gt",
                      "gte",
                      "inc",
                      "list",
                      "lt",
                      "lte",
                      "neq",
                      "nex",
                      "ninc",
                      "pre",
                      "re",
                      "sub",
                      "suf",
                    ]),
                    neg: z.boolean().optional(),
                    key: z.string().optional(),
                    value: z.union([z.string(), z.number(), z.array(z.string())]).optional(),
                  }),
                ),
              }),
            ),
            action: z.object({
              mitigate: z
                .object({
                  action: z.enum([
                    "allow",
                    "bypass",
                    "challenge",
                    "deny",
                    "log",
                    "rate_limit",
                    "redirect",
                  ]),
                  rateLimit: z
                    .object({
                      algo: z.enum(["fixed_window", "token_bucket"]),
                      window: z.number(),
                      limit: z.number(),
                      keys: z.array(z.string()),
                      action: z
                        .enum(["challenge", "deny", "log", "rate_limit", "null"])
                        .nullable()
                        .optional(),
                    })
                    .nullable()
                    .optional(),
                  redirect: z
                    .object({ location: z.string(), permanent: z.boolean() })
                    .nullable()
                    .optional(),
                  actionDuration: z.string().nullable().optional(),
                  bypassSystem: z.boolean().nullable().optional(),
                  logHeaders: z.union([z.array(z.string()), z.literal("*")]).optional(),
                })
                .optional(),
            }),
            valid: z.literal(true),
            validationErrors: z.unknown(),
          }),
          z.object({
            id: z.string(),
            name: z.string(),
            description: z.string().optional(),
            active: z.boolean(),
            conditionGroup: z.array(
              z.object({
                conditions: z.array(
                  z.object({
                    type: z.enum([
                      "bot_category",
                      "bot_name",
                      "bot_protection",
                      "bot_status",
                      "cookie",
                      "domain_environment",
                      "environment",
                      "geo_as_number",
                      "geo_city",
                      "geo_continent",
                      "geo_country",
                      "geo_country_region",
                      "header",
                      "host",
                      "ip_address",
                      "ja3_digest",
                      "ja4_digest",
                      "method",
                      "path",
                      "protocol",
                      "query",
                      "rate_limit_api_id",
                      "raw_path",
                      "region",
                      "route",
                      "ruleset",
                      "scheme",
                      "server_action",
                      "shared_condition",
                      "target_path",
                      "trusted_source",
                      "user_agent",
                    ]),
                    op: z.enum([
                      "eq",
                      "ex",
                      "gt",
                      "gte",
                      "inc",
                      "list",
                      "lt",
                      "lte",
                      "neq",
                      "nex",
                      "ninc",
                      "pre",
                      "re",
                      "sub",
                      "suf",
                    ]),
                    neg: z.boolean().optional(),
                    key: z.string().optional(),
                    value: z.union([z.string(), z.number(), z.array(z.string())]).optional(),
                  }),
                ),
              }),
            ),
            action: z.object({
              mitigate: z
                .object({
                  action: z.enum([
                    "allow",
                    "bypass",
                    "challenge",
                    "deny",
                    "log",
                    "rate_limit",
                    "redirect",
                  ]),
                  rateLimit: z
                    .object({
                      algo: z.enum(["fixed_window", "token_bucket"]),
                      window: z.number(),
                      limit: z.number(),
                      keys: z.array(z.string()),
                      action: z
                        .enum(["challenge", "deny", "log", "rate_limit", "null"])
                        .nullable()
                        .optional(),
                    })
                    .nullable()
                    .optional(),
                  redirect: z
                    .object({ location: z.string(), permanent: z.boolean() })
                    .nullable()
                    .optional(),
                  actionDuration: z.string().nullable().optional(),
                  bypassSystem: z.boolean().nullable().optional(),
                  logHeaders: z.union([z.array(z.string()), z.literal("*")]).optional(),
                })
                .optional(),
            }),
            valid: z.literal(false),
            validationErrors: z.array(z.string()),
          }),
        ]),
      ),
      ips: z.array(
        z.object({
          id: z.string(),
          hostname: z.string(),
          ip: z.string(),
          notes: z.string().optional(),
          action: z.enum(["bypass", "challenge", "deny", "log"]),
        }),
      ),
      rulesets: z
        .union([
          z.array(
            z.object({
              description: z.string().optional(),
              id: z.string(),
              name: z.string(),
              active: z.boolean(),
              conditionGroup: z.array(
                z.object({
                  conditions: z.array(
                    z.object({
                      type: z.enum([
                        "bot_category",
                        "bot_name",
                        "bot_protection",
                        "bot_status",
                        "cookie",
                        "domain_environment",
                        "environment",
                        "geo_as_number",
                        "geo_city",
                        "geo_continent",
                        "geo_country",
                        "geo_country_region",
                        "header",
                        "host",
                        "ip_address",
                        "ja3_digest",
                        "ja4_digest",
                        "method",
                        "path",
                        "protocol",
                        "query",
                        "rate_limit_api_id",
                        "raw_path",
                        "region",
                        "route",
                        "ruleset",
                        "scheme",
                        "server_action",
                        "shared_condition",
                        "target_path",
                        "trusted_source",
                        "user_agent",
                      ]),
                      op: z.enum([
                        "eq",
                        "ex",
                        "gt",
                        "gte",
                        "inc",
                        "list",
                        "lt",
                        "lte",
                        "neq",
                        "nex",
                        "ninc",
                        "pre",
                        "re",
                        "sub",
                        "suf",
                      ]),
                      neg: z.boolean().optional(),
                      key: z.string().optional(),
                      value: z.union([z.string(), z.number(), z.array(z.string())]).optional(),
                    }),
                  ),
                }),
              ),
              action: z
                .object({
                  mitigate: z
                    .object({
                      action: z.enum([
                        "allow",
                        "bypass",
                        "challenge",
                        "deny",
                        "log",
                        "rate_limit",
                        "redirect",
                      ]),
                      rateLimit: z
                        .object({
                          algo: z.enum(["fixed_window", "token_bucket"]),
                          window: z.number(),
                          limit: z.number(),
                          keys: z.array(z.string()),
                          action: z
                            .enum(["challenge", "deny", "log", "rate_limit", "null"])
                            .nullable()
                            .optional(),
                        })
                        .nullable()
                        .optional(),
                      redirect: z
                        .object({ location: z.string(), permanent: z.boolean() })
                        .nullable()
                        .optional(),
                      actionDuration: z.string().nullable().optional(),
                      bypassSystem: z.boolean().nullable().optional(),
                      logHeaders: z.union([z.array(z.string()), z.literal("*")]).optional(),
                    })
                    .optional(),
                })
                .optional(),
            }),
          ),
          z.record(
            z.string(),
            z.object({
              action: z.enum([
                "allow",
                "bypass",
                "challenge",
                "deny",
                "log",
                "rate_limit",
                "redirect",
              ]),
              rateLimit: z
                .object({
                  algo: z.enum(["fixed_window", "token_bucket"]),
                  window: z.number(),
                  limit: z.number(),
                  keys: z.array(z.string()),
                  action: z
                    .enum(["challenge", "deny", "log", "rate_limit", "null"])
                    .nullable()
                    .optional(),
                })
                .nullable()
                .optional(),
              redirect: z
                .object({ location: z.string(), permanent: z.boolean() })
                .nullable()
                .optional(),
              actionDuration: z.string().nullable().optional(),
              bypassSystem: z.boolean().nullable().optional(),
              logHeaders: z.union([z.array(z.string()), z.literal("*")]).optional(),
            }),
          ),
        ])
        .optional(),
      conditions: z
        .array(
          z.object({
            description: z.string().optional(),
            id: z.string(),
            name: z.string(),
            active: z.boolean(),
            conditionGroup: z.array(
              z.object({
                conditions: z.array(
                  z.object({
                    type: z.enum([
                      "bot_category",
                      "bot_name",
                      "bot_protection",
                      "bot_status",
                      "cookie",
                      "domain_environment",
                      "environment",
                      "geo_as_number",
                      "geo_city",
                      "geo_continent",
                      "geo_country",
                      "geo_country_region",
                      "header",
                      "host",
                      "ip_address",
                      "ja3_digest",
                      "ja4_digest",
                      "method",
                      "path",
                      "protocol",
                      "query",
                      "rate_limit_api_id",
                      "raw_path",
                      "region",
                      "route",
                      "ruleset",
                      "scheme",
                      "server_action",
                      "shared_condition",
                      "target_path",
                      "trusted_source",
                      "user_agent",
                    ]),
                    op: z.enum([
                      "eq",
                      "ex",
                      "gt",
                      "gte",
                      "inc",
                      "list",
                      "lt",
                      "lte",
                      "neq",
                      "nex",
                      "ninc",
                      "pre",
                      "re",
                      "sub",
                      "suf",
                    ]),
                    neg: z.boolean().optional(),
                    key: z.string().optional(),
                    value: z.union([z.string(), z.number(), z.array(z.string())]).optional(),
                  }),
                ),
              }),
            ),
          }),
        )
        .optional(),
      changes: z.array(z.object({})),
      managedRules: z
        .object({
          bot_protection: z
            .object({
              active: z.boolean(),
              action: z.enum(["challenge", "deny", "log"]).optional(),
              updatedAt: z.string().optional(),
              userId: z.string().optional(),
              username: z.string().optional(),
            })
            .optional(),
          ai_bots: z
            .object({
              active: z.boolean(),
              action: z.enum(["challenge", "deny", "log"]).optional(),
              updatedAt: z.string().optional(),
              userId: z.string().optional(),
              username: z.string().optional(),
            })
            .optional(),
          owasp: z
            .object({
              active: z.boolean(),
              action: z.enum(["challenge", "deny", "log"]).optional(),
              updatedAt: z.string().optional(),
              userId: z.string().optional(),
              username: z.string().optional(),
            })
            .optional(),
          vercel_ruleset: z
            .object({
              active: z.boolean(),
              action: z.enum(["challenge", "deny", "log"]).optional(),
              updatedAt: z.string().optional(),
              userId: z.string().optional(),
              username: z.string().optional(),
            })
            .optional(),
          traffic_sources: z
            .object({
              active: z.boolean(),
              action: z.enum(["challenge", "deny", "log"]).optional(),
              updatedAt: z.string().optional(),
              userId: z.string().optional(),
              username: z.string().optional(),
            })
            .optional(),
        })
        .optional(),
      botIdEnabled: z.boolean().optional(),
      logHeaders: z.union([z.array(z.string()), z.literal("*")]).optional(),
    })
    .nullable(),
  versions: z.array(
    z.object({
      ownerId: z.string(),
      projectKey: z.string(),
      id: z.string(),
      version: z.number(),
      updatedAt: z.string(),
      firewallEnabled: z.boolean(),
      crs: z
        .object({
          sd: z.object({ active: z.boolean(), action: z.enum(["deny", "log"]) }),
          ma: z.object({ active: z.boolean(), action: z.enum(["deny", "log"]) }),
          lfi: z.object({ active: z.boolean(), action: z.enum(["deny", "log"]) }),
          rfi: z.object({ active: z.boolean(), action: z.enum(["deny", "log"]) }),
          rce: z.object({ active: z.boolean(), action: z.enum(["deny", "log"]) }),
          php: z.object({ active: z.boolean(), action: z.enum(["deny", "log"]) }),
          gen: z.object({ active: z.boolean(), action: z.enum(["deny", "log"]) }),
          xss: z.object({ active: z.boolean(), action: z.enum(["deny", "log"]) }),
          sqli: z.object({ active: z.boolean(), action: z.enum(["deny", "log"]) }),
          sf: z.object({ active: z.boolean(), action: z.enum(["deny", "log"]) }),
          java: z.object({ active: z.boolean(), action: z.enum(["deny", "log"]) }),
        })
        .optional(),
      rules: z.array(
        z.union([
          z.object({
            id: z.string(),
            name: z.string(),
            description: z.string().optional(),
            active: z.boolean(),
            conditionGroup: z.array(
              z.object({
                conditions: z.array(
                  z.object({
                    type: z.enum([
                      "bot_category",
                      "bot_name",
                      "bot_protection",
                      "bot_status",
                      "cookie",
                      "domain_environment",
                      "environment",
                      "geo_as_number",
                      "geo_city",
                      "geo_continent",
                      "geo_country",
                      "geo_country_region",
                      "header",
                      "host",
                      "ip_address",
                      "ja3_digest",
                      "ja4_digest",
                      "method",
                      "path",
                      "protocol",
                      "query",
                      "rate_limit_api_id",
                      "raw_path",
                      "region",
                      "route",
                      "ruleset",
                      "scheme",
                      "server_action",
                      "shared_condition",
                      "target_path",
                      "trusted_source",
                      "user_agent",
                    ]),
                    op: z.enum([
                      "eq",
                      "ex",
                      "gt",
                      "gte",
                      "inc",
                      "list",
                      "lt",
                      "lte",
                      "neq",
                      "nex",
                      "ninc",
                      "pre",
                      "re",
                      "sub",
                      "suf",
                    ]),
                    neg: z.boolean().optional(),
                    key: z.string().optional(),
                    value: z.union([z.string(), z.number(), z.array(z.string())]).optional(),
                  }),
                ),
              }),
            ),
            action: z.object({
              mitigate: z
                .object({
                  action: z.enum([
                    "allow",
                    "bypass",
                    "challenge",
                    "deny",
                    "log",
                    "rate_limit",
                    "redirect",
                  ]),
                  rateLimit: z
                    .object({
                      algo: z.enum(["fixed_window", "token_bucket"]),
                      window: z.number(),
                      limit: z.number(),
                      keys: z.array(z.string()),
                      action: z
                        .enum(["challenge", "deny", "log", "rate_limit", "null"])
                        .nullable()
                        .optional(),
                    })
                    .nullable()
                    .optional(),
                  redirect: z
                    .object({ location: z.string(), permanent: z.boolean() })
                    .nullable()
                    .optional(),
                  actionDuration: z.string().nullable().optional(),
                  bypassSystem: z.boolean().nullable().optional(),
                  logHeaders: z.union([z.array(z.string()), z.literal("*")]).optional(),
                })
                .optional(),
            }),
            valid: z.literal(true),
            validationErrors: z.unknown(),
          }),
          z.object({
            id: z.string(),
            name: z.string(),
            description: z.string().optional(),
            active: z.boolean(),
            conditionGroup: z.array(
              z.object({
                conditions: z.array(
                  z.object({
                    type: z.enum([
                      "bot_category",
                      "bot_name",
                      "bot_protection",
                      "bot_status",
                      "cookie",
                      "domain_environment",
                      "environment",
                      "geo_as_number",
                      "geo_city",
                      "geo_continent",
                      "geo_country",
                      "geo_country_region",
                      "header",
                      "host",
                      "ip_address",
                      "ja3_digest",
                      "ja4_digest",
                      "method",
                      "path",
                      "protocol",
                      "query",
                      "rate_limit_api_id",
                      "raw_path",
                      "region",
                      "route",
                      "ruleset",
                      "scheme",
                      "server_action",
                      "shared_condition",
                      "target_path",
                      "trusted_source",
                      "user_agent",
                    ]),
                    op: z.enum([
                      "eq",
                      "ex",
                      "gt",
                      "gte",
                      "inc",
                      "list",
                      "lt",
                      "lte",
                      "neq",
                      "nex",
                      "ninc",
                      "pre",
                      "re",
                      "sub",
                      "suf",
                    ]),
                    neg: z.boolean().optional(),
                    key: z.string().optional(),
                    value: z.union([z.string(), z.number(), z.array(z.string())]).optional(),
                  }),
                ),
              }),
            ),
            action: z.object({
              mitigate: z
                .object({
                  action: z.enum([
                    "allow",
                    "bypass",
                    "challenge",
                    "deny",
                    "log",
                    "rate_limit",
                    "redirect",
                  ]),
                  rateLimit: z
                    .object({
                      algo: z.enum(["fixed_window", "token_bucket"]),
                      window: z.number(),
                      limit: z.number(),
                      keys: z.array(z.string()),
                      action: z
                        .enum(["challenge", "deny", "log", "rate_limit", "null"])
                        .nullable()
                        .optional(),
                    })
                    .nullable()
                    .optional(),
                  redirect: z
                    .object({ location: z.string(), permanent: z.boolean() })
                    .nullable()
                    .optional(),
                  actionDuration: z.string().nullable().optional(),
                  bypassSystem: z.boolean().nullable().optional(),
                  logHeaders: z.union([z.array(z.string()), z.literal("*")]).optional(),
                })
                .optional(),
            }),
            valid: z.literal(false),
            validationErrors: z.array(z.string()),
          }),
        ]),
      ),
      ips: z.array(
        z.object({
          id: z.string(),
          hostname: z.string(),
          ip: z.string(),
          notes: z.string().optional(),
          action: z.enum(["bypass", "challenge", "deny", "log"]),
        }),
      ),
      rulesets: z
        .union([
          z.array(
            z.object({
              description: z.string().optional(),
              id: z.string(),
              name: z.string(),
              active: z.boolean(),
              conditionGroup: z.array(
                z.object({
                  conditions: z.array(
                    z.object({
                      type: z.enum([
                        "bot_category",
                        "bot_name",
                        "bot_protection",
                        "bot_status",
                        "cookie",
                        "domain_environment",
                        "environment",
                        "geo_as_number",
                        "geo_city",
                        "geo_continent",
                        "geo_country",
                        "geo_country_region",
                        "header",
                        "host",
                        "ip_address",
                        "ja3_digest",
                        "ja4_digest",
                        "method",
                        "path",
                        "protocol",
                        "query",
                        "rate_limit_api_id",
                        "raw_path",
                        "region",
                        "route",
                        "ruleset",
                        "scheme",
                        "server_action",
                        "shared_condition",
                        "target_path",
                        "trusted_source",
                        "user_agent",
                      ]),
                      op: z.enum([
                        "eq",
                        "ex",
                        "gt",
                        "gte",
                        "inc",
                        "list",
                        "lt",
                        "lte",
                        "neq",
                        "nex",
                        "ninc",
                        "pre",
                        "re",
                        "sub",
                        "suf",
                      ]),
                      neg: z.boolean().optional(),
                      key: z.string().optional(),
                      value: z.union([z.string(), z.number(), z.array(z.string())]).optional(),
                    }),
                  ),
                }),
              ),
              action: z
                .object({
                  mitigate: z
                    .object({
                      action: z.enum([
                        "allow",
                        "bypass",
                        "challenge",
                        "deny",
                        "log",
                        "rate_limit",
                        "redirect",
                      ]),
                      rateLimit: z
                        .object({
                          algo: z.enum(["fixed_window", "token_bucket"]),
                          window: z.number(),
                          limit: z.number(),
                          keys: z.array(z.string()),
                          action: z
                            .enum(["challenge", "deny", "log", "rate_limit", "null"])
                            .nullable()
                            .optional(),
                        })
                        .nullable()
                        .optional(),
                      redirect: z
                        .object({ location: z.string(), permanent: z.boolean() })
                        .nullable()
                        .optional(),
                      actionDuration: z.string().nullable().optional(),
                      bypassSystem: z.boolean().nullable().optional(),
                      logHeaders: z.union([z.array(z.string()), z.literal("*")]).optional(),
                    })
                    .optional(),
                })
                .optional(),
            }),
          ),
          z.record(
            z.string(),
            z.object({
              action: z.enum([
                "allow",
                "bypass",
                "challenge",
                "deny",
                "log",
                "rate_limit",
                "redirect",
              ]),
              rateLimit: z
                .object({
                  algo: z.enum(["fixed_window", "token_bucket"]),
                  window: z.number(),
                  limit: z.number(),
                  keys: z.array(z.string()),
                  action: z
                    .enum(["challenge", "deny", "log", "rate_limit", "null"])
                    .nullable()
                    .optional(),
                })
                .nullable()
                .optional(),
              redirect: z
                .object({ location: z.string(), permanent: z.boolean() })
                .nullable()
                .optional(),
              actionDuration: z.string().nullable().optional(),
              bypassSystem: z.boolean().nullable().optional(),
              logHeaders: z.union([z.array(z.string()), z.literal("*")]).optional(),
            }),
          ),
        ])
        .optional(),
      conditions: z
        .array(
          z.object({
            description: z.string().optional(),
            id: z.string(),
            name: z.string(),
            active: z.boolean(),
            conditionGroup: z.array(
              z.object({
                conditions: z.array(
                  z.object({
                    type: z.enum([
                      "bot_category",
                      "bot_name",
                      "bot_protection",
                      "bot_status",
                      "cookie",
                      "domain_environment",
                      "environment",
                      "geo_as_number",
                      "geo_city",
                      "geo_continent",
                      "geo_country",
                      "geo_country_region",
                      "header",
                      "host",
                      "ip_address",
                      "ja3_digest",
                      "ja4_digest",
                      "method",
                      "path",
                      "protocol",
                      "query",
                      "rate_limit_api_id",
                      "raw_path",
                      "region",
                      "route",
                      "ruleset",
                      "scheme",
                      "server_action",
                      "shared_condition",
                      "target_path",
                      "trusted_source",
                      "user_agent",
                    ]),
                    op: z.enum([
                      "eq",
                      "ex",
                      "gt",
                      "gte",
                      "inc",
                      "list",
                      "lt",
                      "lte",
                      "neq",
                      "nex",
                      "ninc",
                      "pre",
                      "re",
                      "sub",
                      "suf",
                    ]),
                    neg: z.boolean().optional(),
                    key: z.string().optional(),
                    value: z.union([z.string(), z.number(), z.array(z.string())]).optional(),
                  }),
                ),
              }),
            ),
          }),
        )
        .optional(),
      changes: z.array(z.object({})),
      managedRules: z
        .object({
          bot_protection: z
            .object({
              active: z.boolean(),
              action: z.enum(["challenge", "deny", "log"]).optional(),
              updatedAt: z.string().optional(),
              userId: z.string().optional(),
              username: z.string().optional(),
            })
            .optional(),
          ai_bots: z
            .object({
              active: z.boolean(),
              action: z.enum(["challenge", "deny", "log"]).optional(),
              updatedAt: z.string().optional(),
              userId: z.string().optional(),
              username: z.string().optional(),
            })
            .optional(),
          owasp: z
            .object({
              active: z.boolean(),
              action: z.enum(["challenge", "deny", "log"]).optional(),
              updatedAt: z.string().optional(),
              userId: z.string().optional(),
              username: z.string().optional(),
            })
            .optional(),
          vercel_ruleset: z
            .object({
              active: z.boolean(),
              action: z.enum(["challenge", "deny", "log"]).optional(),
              updatedAt: z.string().optional(),
              userId: z.string().optional(),
              username: z.string().optional(),
            })
            .optional(),
          traffic_sources: z
            .object({
              active: z.boolean(),
              action: z.enum(["challenge", "deny", "log"]).optional(),
              updatedAt: z.string().optional(),
              userId: z.string().optional(),
              username: z.string().optional(),
            })
            .optional(),
        })
        .optional(),
      botIdEnabled: z.boolean().optional(),
      logHeaders: z.union([z.array(z.string()), z.literal("*")]).optional(),
    }),
  ),
});

export type UseGetApiV1SecurityFirewallConfigArgs = Record<string, never>;

export const getApiV1SecurityFirewallConfigQueryOptions = () =>
  queryOptions({
    queryKey: ["GET /v1/security/firewall/config", "security"],
    queryFn: () =>
      apiFetch("/v1/security/firewall/config", useGetApiV1SecurityFirewallConfigResponse, {
        method: "GET",
      }),
    placeholderData: keepPreviousData,
  });

export const useGetApiV1SecurityFirewallConfig = () =>
  useQuery(getApiV1SecurityFirewallConfigQueryOptions());
