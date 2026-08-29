import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseUpdateApiV1SecurityFirewallConfigArgs = {
  projectId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: {
    firewallEnabled: boolean;
    managedRules?: Record<string, never> | undefined;
    crs?:
      | {
          sd?: { active: boolean; action: "deny" | "log" } | undefined;
          ma?: { active: boolean; action: "deny" | "log" } | undefined;
          lfi?: { active: boolean; action: "deny" | "log" } | undefined;
          rfi?: { active: boolean; action: "deny" | "log" } | undefined;
          rce?: { active: boolean; action: "deny" | "log" } | undefined;
          php?: { active: boolean; action: "deny" | "log" } | undefined;
          gen?: { active: boolean; action: "deny" | "log" } | undefined;
          xss?: { active: boolean; action: "deny" | "log" } | undefined;
          sqli?: { active: boolean; action: "deny" | "log" } | undefined;
          sf?: { active: boolean; action: "deny" | "log" } | undefined;
          java?: { active: boolean; action: "deny" | "log" } | undefined;
        }
      | undefined;
    rules?:
      | Array<{
          id?: string | undefined;
          name: string;
          description?: string | undefined;
          active: boolean;
          conditionGroup: Array<{
            conditions: Array<{
              type:
                | "host"
                | "path"
                | "method"
                | "header"
                | "query"
                | "cookie"
                | "target_path"
                | "route"
                | "raw_path"
                | "ip_address"
                | "region"
                | "protocol"
                | "scheme"
                | "environment"
                | "domain_environment"
                | "user_agent"
                | "geo_continent"
                | "geo_country"
                | "geo_country_region"
                | "geo_city"
                | "geo_as_number"
                | "ja4_digest"
                | "ja3_digest"
                | "rate_limit_api_id"
                | "server_action"
                | "bot_name"
                | "bot_category"
                | "bot_status"
                | "bot_protection"
                | "shared_condition"
                | "ruleset";
              op:
                | "re"
                | "eq"
                | "neq"
                | "ex"
                | "nex"
                | "inc"
                | "ninc"
                | "pre"
                | "suf"
                | "sub"
                | "gt"
                | "gte"
                | "lt"
                | "lte"
                | "list";
              neg?: boolean | undefined;
              key?: string | undefined;
              value?: (string | Array<string> | number) | undefined;
            }>;
          }>;
          action: {
            mitigate?:
              | {
                  action: "log" | "challenge" | "deny" | "bypass" | "rate_limit" | "redirect";
                  rateLimit?:
                    | (
                        | {
                            algo: "fixed_window" | "token_bucket";
                            window: number;
                            limit: number;
                            keys: Array<string>;
                            action?:
                              | ("log" | "challenge" | "deny" | "rate_limit" | unknown | null)
                              | undefined;
                          }
                        | unknown
                        | null
                      )
                    | undefined;
                  redirect?:
                    | ({ location: string; permanent: boolean } | unknown | null)
                    | undefined;
                  actionDuration?: (string | null) | undefined;
                  bypassSystem?: (boolean | null) | undefined;
                  logHeaders?: (string | Array<string>) | undefined;
                }
              | undefined;
          };
          valid?: boolean | undefined;
          validationErrors?: (Array<string> | string) | undefined;
        }>
      | undefined;
    rulesets?:
      | (
          | Array<{
              id?: string | undefined;
              name: string;
              description?: string | undefined;
              active: boolean;
              conditionGroup: Array<{
                conditions: Array<{
                  type:
                    | "host"
                    | "path"
                    | "method"
                    | "header"
                    | "query"
                    | "cookie"
                    | "target_path"
                    | "route"
                    | "raw_path"
                    | "ip_address"
                    | "region"
                    | "protocol"
                    | "scheme"
                    | "environment"
                    | "domain_environment"
                    | "user_agent"
                    | "geo_continent"
                    | "geo_country"
                    | "geo_country_region"
                    | "geo_city"
                    | "geo_as_number"
                    | "ja4_digest"
                    | "ja3_digest"
                    | "rate_limit_api_id"
                    | "server_action"
                    | "bot_name"
                    | "bot_category"
                    | "bot_status"
                    | "bot_protection"
                    | "shared_condition"
                    | "ruleset";
                  op:
                    | "re"
                    | "eq"
                    | "neq"
                    | "ex"
                    | "nex"
                    | "inc"
                    | "ninc"
                    | "pre"
                    | "suf"
                    | "sub"
                    | "gt"
                    | "gte"
                    | "lt"
                    | "lte"
                    | "list";
                  neg?: boolean | undefined;
                  key?: string | undefined;
                  value?: (string | Array<string> | number) | undefined;
                }>;
              }>;
              action?:
                | { mitigate?: { action: "deny" | "challenge" | "log" } | undefined }
                | undefined;
              valid?: boolean | undefined;
              validationErrors?: (Array<string> | string) | undefined;
            }>
          | Record<string, { action: "deny" | "challenge" | "log" | "allow" }>
        )
      | undefined;
    ips?:
      | Array<{
          id?: string | undefined;
          hostname: string;
          ip: string;
          notes?: string | undefined;
          action: "deny" | "challenge" | "log" | "bypass";
        }>
      | undefined;
    botIdEnabled?: boolean | undefined;
    logHeaders?: (string | Array<string>) | undefined;
  };
};

export const useUpdateApiV1SecurityFirewallConfigResponse = z.object({
  active: z.object({
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
});

export type UseUpdateApiV1SecurityFirewallConfigResponse = {
  active: {
    ownerId: string;
    projectKey: string;
    id: string;
    version: number;
    updatedAt: string;
    firewallEnabled: boolean;
    crs?:
      | {
          sd: { active: boolean; action: "deny" | "log" };
          ma: { active: boolean; action: "deny" | "log" };
          lfi: { active: boolean; action: "deny" | "log" };
          rfi: { active: boolean; action: "deny" | "log" };
          rce: { active: boolean; action: "deny" | "log" };
          php: { active: boolean; action: "deny" | "log" };
          gen: { active: boolean; action: "deny" | "log" };
          xss: { active: boolean; action: "deny" | "log" };
          sqli: { active: boolean; action: "deny" | "log" };
          sf: { active: boolean; action: "deny" | "log" };
          java: { active: boolean; action: "deny" | "log" };
        }
      | undefined;
    rules: Array<
      | {
          id: string;
          name: string;
          description?: string | undefined;
          active: boolean;
          conditionGroup: Array<{
            conditions: Array<{
              type:
                | "bot_category"
                | "bot_name"
                | "bot_protection"
                | "bot_status"
                | "cookie"
                | "domain_environment"
                | "environment"
                | "geo_as_number"
                | "geo_city"
                | "geo_continent"
                | "geo_country"
                | "geo_country_region"
                | "header"
                | "host"
                | "ip_address"
                | "ja3_digest"
                | "ja4_digest"
                | "method"
                | "path"
                | "protocol"
                | "query"
                | "rate_limit_api_id"
                | "raw_path"
                | "region"
                | "route"
                | "ruleset"
                | "scheme"
                | "server_action"
                | "shared_condition"
                | "target_path"
                | "trusted_source"
                | "user_agent";
              op:
                | "eq"
                | "ex"
                | "gt"
                | "gte"
                | "inc"
                | "list"
                | "lt"
                | "lte"
                | "neq"
                | "nex"
                | "ninc"
                | "pre"
                | "re"
                | "sub"
                | "suf";
              neg?: boolean | undefined;
              key?: string | undefined;
              value?: (string | number | Array<string>) | undefined;
            }>;
          }>;
          action: {
            mitigate?:
              | {
                  action:
                    | "allow"
                    | "bypass"
                    | "challenge"
                    | "deny"
                    | "log"
                    | "rate_limit"
                    | "redirect";
                  rateLimit?:
                    | ({
                        algo: "fixed_window" | "token_bucket";
                        window: number;
                        limit: number;
                        keys: Array<string>;
                        action?:
                          | ("challenge" | "deny" | "log" | "rate_limit" | "null" | null)
                          | undefined;
                      } | null)
                    | undefined;
                  redirect?: ({ location: string; permanent: boolean } | null) | undefined;
                  actionDuration?: (string | null) | undefined;
                  bypassSystem?: (boolean | null) | undefined;
                  logHeaders?: (Array<string> | "*") | undefined;
                }
              | undefined;
          };
          valid: true;
          validationErrors: unknown;
        }
      | {
          id: string;
          name: string;
          description?: string | undefined;
          active: boolean;
          conditionGroup: Array<{
            conditions: Array<{
              type:
                | "bot_category"
                | "bot_name"
                | "bot_protection"
                | "bot_status"
                | "cookie"
                | "domain_environment"
                | "environment"
                | "geo_as_number"
                | "geo_city"
                | "geo_continent"
                | "geo_country"
                | "geo_country_region"
                | "header"
                | "host"
                | "ip_address"
                | "ja3_digest"
                | "ja4_digest"
                | "method"
                | "path"
                | "protocol"
                | "query"
                | "rate_limit_api_id"
                | "raw_path"
                | "region"
                | "route"
                | "ruleset"
                | "scheme"
                | "server_action"
                | "shared_condition"
                | "target_path"
                | "trusted_source"
                | "user_agent";
              op:
                | "eq"
                | "ex"
                | "gt"
                | "gte"
                | "inc"
                | "list"
                | "lt"
                | "lte"
                | "neq"
                | "nex"
                | "ninc"
                | "pre"
                | "re"
                | "sub"
                | "suf";
              neg?: boolean | undefined;
              key?: string | undefined;
              value?: (string | number | Array<string>) | undefined;
            }>;
          }>;
          action: {
            mitigate?:
              | {
                  action:
                    | "allow"
                    | "bypass"
                    | "challenge"
                    | "deny"
                    | "log"
                    | "rate_limit"
                    | "redirect";
                  rateLimit?:
                    | ({
                        algo: "fixed_window" | "token_bucket";
                        window: number;
                        limit: number;
                        keys: Array<string>;
                        action?:
                          | ("challenge" | "deny" | "log" | "rate_limit" | "null" | null)
                          | undefined;
                      } | null)
                    | undefined;
                  redirect?: ({ location: string; permanent: boolean } | null) | undefined;
                  actionDuration?: (string | null) | undefined;
                  bypassSystem?: (boolean | null) | undefined;
                  logHeaders?: (Array<string> | "*") | undefined;
                }
              | undefined;
          };
          valid: false;
          validationErrors: Array<string>;
        }
    >;
    ips: Array<{
      id: string;
      hostname: string;
      ip: string;
      notes?: string | undefined;
      action: "bypass" | "challenge" | "deny" | "log";
    }>;
    rulesets?:
      | (
          | Array<{
              description?: string | undefined;
              id: string;
              name: string;
              active: boolean;
              conditionGroup: Array<{
                conditions: Array<{
                  type:
                    | "bot_category"
                    | "bot_name"
                    | "bot_protection"
                    | "bot_status"
                    | "cookie"
                    | "domain_environment"
                    | "environment"
                    | "geo_as_number"
                    | "geo_city"
                    | "geo_continent"
                    | "geo_country"
                    | "geo_country_region"
                    | "header"
                    | "host"
                    | "ip_address"
                    | "ja3_digest"
                    | "ja4_digest"
                    | "method"
                    | "path"
                    | "protocol"
                    | "query"
                    | "rate_limit_api_id"
                    | "raw_path"
                    | "region"
                    | "route"
                    | "ruleset"
                    | "scheme"
                    | "server_action"
                    | "shared_condition"
                    | "target_path"
                    | "trusted_source"
                    | "user_agent";
                  op:
                    | "eq"
                    | "ex"
                    | "gt"
                    | "gte"
                    | "inc"
                    | "list"
                    | "lt"
                    | "lte"
                    | "neq"
                    | "nex"
                    | "ninc"
                    | "pre"
                    | "re"
                    | "sub"
                    | "suf";
                  neg?: boolean | undefined;
                  key?: string | undefined;
                  value?: (string | number | Array<string>) | undefined;
                }>;
              }>;
              action?:
                | {
                    mitigate?:
                      | {
                          action:
                            | "allow"
                            | "bypass"
                            | "challenge"
                            | "deny"
                            | "log"
                            | "rate_limit"
                            | "redirect";
                          rateLimit?:
                            | ({
                                algo: "fixed_window" | "token_bucket";
                                window: number;
                                limit: number;
                                keys: Array<string>;
                                action?:
                                  | ("challenge" | "deny" | "log" | "rate_limit" | "null" | null)
                                  | undefined;
                              } | null)
                            | undefined;
                          redirect?: ({ location: string; permanent: boolean } | null) | undefined;
                          actionDuration?: (string | null) | undefined;
                          bypassSystem?: (boolean | null) | undefined;
                          logHeaders?: (Array<string> | "*") | undefined;
                        }
                      | undefined;
                  }
                | undefined;
            }>
          | Record<
              string,
              {
                action:
                  | "allow"
                  | "bypass"
                  | "challenge"
                  | "deny"
                  | "log"
                  | "rate_limit"
                  | "redirect";
                rateLimit?:
                  | ({
                      algo: "fixed_window" | "token_bucket";
                      window: number;
                      limit: number;
                      keys: Array<string>;
                      action?:
                        | ("challenge" | "deny" | "log" | "rate_limit" | "null" | null)
                        | undefined;
                    } | null)
                  | undefined;
                redirect?: ({ location: string; permanent: boolean } | null) | undefined;
                actionDuration?: (string | null) | undefined;
                bypassSystem?: (boolean | null) | undefined;
                logHeaders?: (Array<string> | "*") | undefined;
              }
            >
        )
      | undefined;
    conditions?:
      | Array<{
          description?: string | undefined;
          id: string;
          name: string;
          active: boolean;
          conditionGroup: Array<{
            conditions: Array<{
              type:
                | "bot_category"
                | "bot_name"
                | "bot_protection"
                | "bot_status"
                | "cookie"
                | "domain_environment"
                | "environment"
                | "geo_as_number"
                | "geo_city"
                | "geo_continent"
                | "geo_country"
                | "geo_country_region"
                | "header"
                | "host"
                | "ip_address"
                | "ja3_digest"
                | "ja4_digest"
                | "method"
                | "path"
                | "protocol"
                | "query"
                | "rate_limit_api_id"
                | "raw_path"
                | "region"
                | "route"
                | "ruleset"
                | "scheme"
                | "server_action"
                | "shared_condition"
                | "target_path"
                | "trusted_source"
                | "user_agent";
              op:
                | "eq"
                | "ex"
                | "gt"
                | "gte"
                | "inc"
                | "list"
                | "lt"
                | "lte"
                | "neq"
                | "nex"
                | "ninc"
                | "pre"
                | "re"
                | "sub"
                | "suf";
              neg?: boolean | undefined;
              key?: string | undefined;
              value?: (string | number | Array<string>) | undefined;
            }>;
          }>;
        }>
      | undefined;
    changes: Array<Record<string, never>>;
    managedRules?:
      | {
          bot_protection?:
            | {
                active: boolean;
                action?: ("challenge" | "deny" | "log") | undefined;
                updatedAt?: string | undefined;
                userId?: string | undefined;
                username?: string | undefined;
              }
            | undefined;
          ai_bots?:
            | {
                active: boolean;
                action?: ("challenge" | "deny" | "log") | undefined;
                updatedAt?: string | undefined;
                userId?: string | undefined;
                username?: string | undefined;
              }
            | undefined;
          owasp?:
            | {
                active: boolean;
                action?: ("challenge" | "deny" | "log") | undefined;
                updatedAt?: string | undefined;
                userId?: string | undefined;
                username?: string | undefined;
              }
            | undefined;
          vercel_ruleset?:
            | {
                active: boolean;
                action?: ("challenge" | "deny" | "log") | undefined;
                updatedAt?: string | undefined;
                userId?: string | undefined;
                username?: string | undefined;
              }
            | undefined;
          traffic_sources?:
            | {
                active: boolean;
                action?: ("challenge" | "deny" | "log") | undefined;
                updatedAt?: string | undefined;
                userId?: string | undefined;
                username?: string | undefined;
              }
            | undefined;
        }
      | undefined;
    botIdEnabled?: boolean | undefined;
    logHeaders?: (Array<string> | "*") | undefined;
  };
};

export type UpdateApiV1SecurityFirewallConfigBody = {
  firewallEnabled: boolean;
  managedRules?: Record<string, never> | undefined;
  crs?:
    | {
        sd?: { active: boolean; action: "deny" | "log" } | undefined;
        ma?: { active: boolean; action: "deny" | "log" } | undefined;
        lfi?: { active: boolean; action: "deny" | "log" } | undefined;
        rfi?: { active: boolean; action: "deny" | "log" } | undefined;
        rce?: { active: boolean; action: "deny" | "log" } | undefined;
        php?: { active: boolean; action: "deny" | "log" } | undefined;
        gen?: { active: boolean; action: "deny" | "log" } | undefined;
        xss?: { active: boolean; action: "deny" | "log" } | undefined;
        sqli?: { active: boolean; action: "deny" | "log" } | undefined;
        sf?: { active: boolean; action: "deny" | "log" } | undefined;
        java?: { active: boolean; action: "deny" | "log" } | undefined;
      }
    | undefined;
  rules?:
    | Array<{
        id?: string | undefined;
        name: string;
        description?: string | undefined;
        active: boolean;
        conditionGroup: Array<{
          conditions: Array<{
            type:
              | "host"
              | "path"
              | "method"
              | "header"
              | "query"
              | "cookie"
              | "target_path"
              | "route"
              | "raw_path"
              | "ip_address"
              | "region"
              | "protocol"
              | "scheme"
              | "environment"
              | "domain_environment"
              | "user_agent"
              | "geo_continent"
              | "geo_country"
              | "geo_country_region"
              | "geo_city"
              | "geo_as_number"
              | "ja4_digest"
              | "ja3_digest"
              | "rate_limit_api_id"
              | "server_action"
              | "bot_name"
              | "bot_category"
              | "bot_status"
              | "bot_protection"
              | "shared_condition"
              | "ruleset";
            op:
              | "re"
              | "eq"
              | "neq"
              | "ex"
              | "nex"
              | "inc"
              | "ninc"
              | "pre"
              | "suf"
              | "sub"
              | "gt"
              | "gte"
              | "lt"
              | "lte"
              | "list";
            neg?: boolean | undefined;
            key?: string | undefined;
            value?: (string | Array<string> | number) | undefined;
          }>;
        }>;
        action: {
          mitigate?:
            | {
                action: "log" | "challenge" | "deny" | "bypass" | "rate_limit" | "redirect";
                rateLimit?:
                  | (
                      | {
                          algo: "fixed_window" | "token_bucket";
                          window: number;
                          limit: number;
                          keys: Array<string>;
                          action?:
                            | ("log" | "challenge" | "deny" | "rate_limit" | unknown | null)
                            | undefined;
                        }
                      | unknown
                      | null
                    )
                  | undefined;
                redirect?: ({ location: string; permanent: boolean } | unknown | null) | undefined;
                actionDuration?: (string | null) | undefined;
                bypassSystem?: (boolean | null) | undefined;
                logHeaders?: (string | Array<string>) | undefined;
              }
            | undefined;
        };
        valid?: boolean | undefined;
        validationErrors?: (Array<string> | string) | undefined;
      }>
    | undefined;
  rulesets?:
    | (
        | Array<{
            id?: string | undefined;
            name: string;
            description?: string | undefined;
            active: boolean;
            conditionGroup: Array<{
              conditions: Array<{
                type:
                  | "host"
                  | "path"
                  | "method"
                  | "header"
                  | "query"
                  | "cookie"
                  | "target_path"
                  | "route"
                  | "raw_path"
                  | "ip_address"
                  | "region"
                  | "protocol"
                  | "scheme"
                  | "environment"
                  | "domain_environment"
                  | "user_agent"
                  | "geo_continent"
                  | "geo_country"
                  | "geo_country_region"
                  | "geo_city"
                  | "geo_as_number"
                  | "ja4_digest"
                  | "ja3_digest"
                  | "rate_limit_api_id"
                  | "server_action"
                  | "bot_name"
                  | "bot_category"
                  | "bot_status"
                  | "bot_protection"
                  | "shared_condition"
                  | "ruleset";
                op:
                  | "re"
                  | "eq"
                  | "neq"
                  | "ex"
                  | "nex"
                  | "inc"
                  | "ninc"
                  | "pre"
                  | "suf"
                  | "sub"
                  | "gt"
                  | "gte"
                  | "lt"
                  | "lte"
                  | "list";
                neg?: boolean | undefined;
                key?: string | undefined;
                value?: (string | Array<string> | number) | undefined;
              }>;
            }>;
            action?:
              | { mitigate?: { action: "deny" | "challenge" | "log" } | undefined }
              | undefined;
            valid?: boolean | undefined;
            validationErrors?: (Array<string> | string) | undefined;
          }>
        | Record<string, { action: "deny" | "challenge" | "log" | "allow" }>
      )
    | undefined;
  ips?:
    | Array<{
        id?: string | undefined;
        hostname: string;
        ip: string;
        notes?: string | undefined;
        action: "deny" | "challenge" | "log" | "bypass";
      }>
    | undefined;
  botIdEnabled?: boolean | undefined;
  logHeaders?: (string | Array<string>) | undefined;
};

export const useUpdateApiV1SecurityFirewallConfig = (
  options: UseMutationOptions<
    UseUpdateApiV1SecurityFirewallConfigResponse,
    Error,
    UseUpdateApiV1SecurityFirewallConfigArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseUpdateApiV1SecurityFirewallConfigArgs) =>
      apiFetch(
        buildUrl("/v1/security/firewall/config", {
          projectId: args.projectId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useUpdateApiV1SecurityFirewallConfigResponse,
        {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["security"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
