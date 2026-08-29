import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import {
  postV1SecurityAttackMode,
  getV1SecurityFirewallConfig,
  putV1SecurityFirewallConfig,
  patchV1SecurityFirewallConfig,
  getV1SecurityFirewallConfigConfigVersion,
  deleteV1SecurityFirewallConfigConfigVersion,
  postV1SecurityFirewallConfigConfigVersionActivate,
  getV1SecurityFirewallAttackStatus,
  getV1SecurityFirewallBypass,
  postV1SecurityFirewallBypass,
  deleteV1SecurityFirewallBypass,
  getV1SecurityFirewallEvents,
  postV1SecurityFirewallConfigGenerateRule,
} from "./handlers/security";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.post(
  "/v1/security/attack-mode",
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postV1SecurityAttackModeBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV1SecurityAttackMode({ db, env: c.env, user: c.var.user, query, body }),
    );
  },
);
app.get("/v1/security/firewall/config", async (c) => {
  const db = createDb(c.env.DB);
  return c.json(await getV1SecurityFirewallConfig({ db, env: c.env, user: c.var.user }));
});
app.put(
  "/v1/security/firewall/config",
  validate(
    "query",
    z.object({ projectId: z.string(), teamId: z.string().optional(), slug: z.string().optional() }),
  ),
  validate("json", putV1SecurityFirewallConfigBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await putV1SecurityFirewallConfig({ db, env: c.env, user: c.var.user, query, body }),
    );
  },
);
app.patch(
  "/v1/security/firewall/config",
  validate(
    "query",
    z.object({ projectId: z.string(), teamId: z.string().optional(), slug: z.string().optional() }),
  ),
  validate("json", patchV1SecurityFirewallConfigBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await patchV1SecurityFirewallConfig({ db, env: c.env, user: c.var.user, query, body }),
    );
  },
);
app.get(
  "/v1/security/firewall/config/:configVersion",
  validate("param", z.object({ configVersion: z.string() })),
  validate(
    "query",
    z.object({ projectId: z.string(), teamId: z.string().optional(), slug: z.string().optional() }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV1SecurityFirewallConfigConfigVersion({
        db,
        env: c.env,
        user: c.var.user,
        params,
        query,
      }),
    );
  },
);
app.delete(
  "/v1/security/firewall/config/:configVersion",
  validate("param", z.object({ configVersion: z.string() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    await deleteV1SecurityFirewallConfigConfigVersion({ db, env: c.env, user: c.var.user, params });
    return c.body(null, 204);
  },
);
app.post(
  "/v1/security/firewall/config/:configVersion/activate",
  validate("param", z.object({ configVersion: z.string() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    return c.json(
      await postV1SecurityFirewallConfigConfigVersionActivate({
        db,
        env: c.env,
        user: c.var.user,
        params,
      }),
    );
  },
);
app.get(
  "/v1/security/firewall/attack-status",
  validate(
    "query",
    z.object({
      projectId: z.string(),
      since: z.coerce.number().gte(1).optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(
      await getV1SecurityFirewallAttackStatus({ db, env: c.env, user: c.var.user, query }),
    );
  },
);
app.get(
  "/v1/security/firewall/bypass",
  validate(
    "query",
    z.object({
      projectId: z.string(),
      limit: z.coerce.number().lte(256).optional(),
      sourceIp: z.string().max(49).optional(),
      domain: z
        .string()
        .max(2544)
        .regex(/([a-z]+[a-z.]+)$/)
        .optional(),
      projectScope: z
        .preprocess((v) => (v === "true" ? true : v === "false" ? false : v), z.boolean())
        .optional(),
      offset: z.string().max(2560).optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(await getV1SecurityFirewallBypass({ db, env: c.env, user: c.var.user, query }));
  },
);
app.post(
  "/v1/security/firewall/bypass",
  validate(
    "query",
    z.object({ projectId: z.string(), teamId: z.string().optional(), slug: z.string().optional() }),
  ),
  validate("json", postV1SecurityFirewallBypassBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV1SecurityFirewallBypass({ db, env: c.env, user: c.var.user, query, body }),
    );
  },
);
app.delete(
  "/v1/security/firewall/bypass",
  validate(
    "query",
    z.object({ projectId: z.string(), teamId: z.string().optional(), slug: z.string().optional() }),
  ),
  validate("json", deleteV1SecurityFirewallBypassBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await deleteV1SecurityFirewallBypass({ db, env: c.env, user: c.var.user, query, body }),
    );
  },
);
app.get(
  "/v1/security/firewall/events",
  validate(
    "query",
    z.object({
      projectId: z.string(),
      startTimestamp: z.coerce.number().optional(),
      endTimestamp: z.coerce.number().optional(),
      hosts: z.string().optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(await getV1SecurityFirewallEvents({ db, env: c.env, user: c.var.user, query }));
  },
);
app.post(
  "/v1/security/firewall/config/generate-rule",
  validate(
    "query",
    z.object({
      projectId: z.string().optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(
      await postV1SecurityFirewallConfigGenerateRule({ db, env: c.env, user: c.var.user, query }),
    );
  },
);

export const postV1SecurityAttackModeBody = z.union([
  z.object({
    projectId: z.string(),
    attackModeEnabled: z.boolean(),
    attackModeActiveUntil: z.number(),
  }),
  z.object({ projectId: z.string(), attackModeEnabled: z.boolean() }),
]);

export type PostV1SecurityAttackModeBody =
  | { projectId: string; attackModeEnabled: boolean; attackModeActiveUntil: number }
  | { projectId: string; attackModeEnabled: boolean };

export type PostV1SecurityAttackModeResponse = {
  attackModeEnabled: boolean;
  attackModeUpdatedAt: number;
};

export type PostV1SecurityAttackModeInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostV1SecurityAttackModeBody;
};

export type PostV1SecurityAttackModeHandler = (
  input: PostV1SecurityAttackModeInput,
) => Promise<PostV1SecurityAttackModeResponse>;

export type GetV1SecurityFirewallConfigResponse = {
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
  } | null;
  draft: {
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
  } | null;
  versions: Array<{
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
  }>;
};

export type GetV1SecurityFirewallConfigInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
};

export type GetV1SecurityFirewallConfigHandler = (
  input: GetV1SecurityFirewallConfigInput,
) => Promise<GetV1SecurityFirewallConfigResponse>;

export const putV1SecurityFirewallConfigBody = z.object({
  firewallEnabled: z.boolean(),
  managedRules: z.object({}).optional(),
  crs: z
    .object({
      sd: z.object({ active: z.boolean(), action: z.enum(["deny", "log"]) }).optional(),
      ma: z.object({ active: z.boolean(), action: z.enum(["deny", "log"]) }).optional(),
      lfi: z.object({ active: z.boolean(), action: z.enum(["deny", "log"]) }).optional(),
      rfi: z.object({ active: z.boolean(), action: z.enum(["deny", "log"]) }).optional(),
      rce: z.object({ active: z.boolean(), action: z.enum(["deny", "log"]) }).optional(),
      php: z.object({ active: z.boolean(), action: z.enum(["deny", "log"]) }).optional(),
      gen: z.object({ active: z.boolean(), action: z.enum(["deny", "log"]) }).optional(),
      xss: z.object({ active: z.boolean(), action: z.enum(["deny", "log"]) }).optional(),
      sqli: z.object({ active: z.boolean(), action: z.enum(["deny", "log"]) }).optional(),
      sf: z.object({ active: z.boolean(), action: z.enum(["deny", "log"]) }).optional(),
      java: z.object({ active: z.boolean(), action: z.enum(["deny", "log"]) }).optional(),
    })
    .optional(),
  rules: z
    .array(
      z.object({
        id: z.string().optional(),
        name: z.string().max(160),
        description: z.string().max(256).optional(),
        active: z.boolean(),
        conditionGroup: z.array(
          z.object({
            conditions: z.array(
              z.object({
                type: z.enum([
                  "host",
                  "path",
                  "method",
                  "header",
                  "query",
                  "cookie",
                  "target_path",
                  "route",
                  "raw_path",
                  "ip_address",
                  "region",
                  "protocol",
                  "scheme",
                  "environment",
                  "domain_environment",
                  "user_agent",
                  "geo_continent",
                  "geo_country",
                  "geo_country_region",
                  "geo_city",
                  "geo_as_number",
                  "ja4_digest",
                  "ja3_digest",
                  "rate_limit_api_id",
                  "server_action",
                  "bot_name",
                  "bot_category",
                  "bot_status",
                  "bot_protection",
                  "shared_condition",
                  "ruleset",
                ]),
                op: z.enum([
                  "re",
                  "eq",
                  "neq",
                  "ex",
                  "nex",
                  "inc",
                  "ninc",
                  "pre",
                  "suf",
                  "sub",
                  "gt",
                  "gte",
                  "lt",
                  "lte",
                  "list",
                ]),
                neg: z.boolean().optional(),
                key: z.string().optional(),
                value: z.union([z.string(), z.array(z.string()), z.number()]).optional(),
              }),
            ),
          }),
        ),
        action: z.object({
          mitigate: z
            .object({
              action: z.enum(["log", "challenge", "deny", "bypass", "rate_limit", "redirect"]),
              rateLimit: z
                .union([
                  z.object({
                    algo: z.enum(["fixed_window", "token_bucket"]),
                    window: z.number(),
                    limit: z.number(),
                    keys: z.array(z.string()),
                    action: z
                      .union([z.enum(["log", "challenge", "deny", "rate_limit"]), z.unknown()])
                      .nullable()
                      .optional(),
                  }),
                  z.unknown(),
                ])
                .nullable()
                .optional(),
              redirect: z
                .union([z.object({ location: z.string(), permanent: z.boolean() }), z.unknown()])
                .nullable()
                .optional(),
              actionDuration: z.string().nullable().optional(),
              bypassSystem: z.boolean().nullable().optional(),
              logHeaders: z.union([z.string(), z.array(z.string())]).optional(),
            })
            .optional(),
        }),
        valid: z.boolean().optional(),
        validationErrors: z.union([z.array(z.string()), z.string()]).optional(),
      }),
    )
    .optional(),
  rulesets: z
    .union([
      z.array(
        z.object({
          id: z.string().optional(),
          name: z.string().max(160),
          description: z.string().max(256).optional(),
          active: z.boolean(),
          conditionGroup: z.array(
            z.object({
              conditions: z.array(
                z.object({
                  type: z.enum([
                    "host",
                    "path",
                    "method",
                    "header",
                    "query",
                    "cookie",
                    "target_path",
                    "route",
                    "raw_path",
                    "ip_address",
                    "region",
                    "protocol",
                    "scheme",
                    "environment",
                    "domain_environment",
                    "user_agent",
                    "geo_continent",
                    "geo_country",
                    "geo_country_region",
                    "geo_city",
                    "geo_as_number",
                    "ja4_digest",
                    "ja3_digest",
                    "rate_limit_api_id",
                    "server_action",
                    "bot_name",
                    "bot_category",
                    "bot_status",
                    "bot_protection",
                    "shared_condition",
                    "ruleset",
                  ]),
                  op: z.enum([
                    "re",
                    "eq",
                    "neq",
                    "ex",
                    "nex",
                    "inc",
                    "ninc",
                    "pre",
                    "suf",
                    "sub",
                    "gt",
                    "gte",
                    "lt",
                    "lte",
                    "list",
                  ]),
                  neg: z.boolean().optional(),
                  key: z.string().optional(),
                  value: z.union([z.string(), z.array(z.string()), z.number()]).optional(),
                }),
              ),
            }),
          ),
          action: z
            .object({
              mitigate: z.object({ action: z.enum(["deny", "challenge", "log"]) }).optional(),
            })
            .optional(),
          valid: z.boolean().optional(),
          validationErrors: z.union([z.array(z.string()), z.string()]).optional(),
        }),
      ),
      z.record(z.string(), z.object({ action: z.enum(["deny", "challenge", "log", "allow"]) })),
    ])
    .optional(),
  ips: z
    .array(
      z.object({
        id: z.string().optional(),
        hostname: z.string(),
        ip: z.string(),
        notes: z.string().optional(),
        action: z.enum(["deny", "challenge", "log", "bypass"]),
      }),
    )
    .optional(),
  botIdEnabled: z.boolean().optional(),
  logHeaders: z.union([z.string(), z.array(z.string())]).optional(),
});

export type PutV1SecurityFirewallConfigBody = {
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

export type PutV1SecurityFirewallConfigResponse = {
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

export type PutV1SecurityFirewallConfigInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { projectId: string; teamId?: string | undefined; slug?: string | undefined };
  body: PutV1SecurityFirewallConfigBody;
};

export type PutV1SecurityFirewallConfigHandler = (
  input: PutV1SecurityFirewallConfigInput,
) => Promise<PutV1SecurityFirewallConfigResponse>;

export const patchV1SecurityFirewallConfigBody = z.union([
  z.object({
    action: z.literal("firewallEnabled"),
    id: z.unknown(),
    value: z.object({
      name: z.string().max(160),
      description: z.string().max(256).optional(),
      active: z.boolean(),
      conditionGroup: z.array(
        z.object({
          conditions: z.array(
            z.object({
              type: z.enum([
                "host",
                "path",
                "method",
                "header",
                "query",
                "cookie",
                "target_path",
                "route",
                "raw_path",
                "ip_address",
                "region",
                "protocol",
                "scheme",
                "environment",
                "domain_environment",
                "user_agent",
                "geo_continent",
                "geo_country",
                "geo_country_region",
                "geo_city",
                "geo_as_number",
                "ja4_digest",
                "ja3_digest",
                "rate_limit_api_id",
                "server_action",
                "bot_name",
                "bot_category",
                "bot_status",
                "bot_protection",
                "shared_condition",
                "ruleset",
              ]),
              op: z.enum([
                "re",
                "eq",
                "neq",
                "ex",
                "nex",
                "inc",
                "ninc",
                "pre",
                "suf",
                "sub",
                "gt",
                "gte",
                "lt",
                "lte",
                "list",
              ]),
              neg: z.boolean().optional(),
              key: z.string().optional(),
              value: z.union([z.string(), z.array(z.string()), z.number()]).optional(),
            }),
          ),
        }),
      ),
      action: z
        .object({ mitigate: z.object({ action: z.enum(["deny", "challenge", "log"]) }).optional() })
        .optional(),
      valid: z.boolean().optional(),
      validationErrors: z.union([z.array(z.string()), z.string()]).optional(),
    }),
  }),
  z.object({
    action: z.literal("rules.insert"),
    id: z.unknown(),
    value: z.object({
      name: z.string().max(160),
      description: z.string().max(256).optional(),
      active: z.boolean(),
      conditionGroup: z.array(
        z.object({
          conditions: z.array(
            z.object({
              type: z.enum([
                "host",
                "path",
                "method",
                "header",
                "query",
                "cookie",
                "target_path",
                "route",
                "raw_path",
                "ip_address",
                "region",
                "protocol",
                "scheme",
                "environment",
                "domain_environment",
                "user_agent",
                "geo_continent",
                "geo_country",
                "geo_country_region",
                "geo_city",
                "geo_as_number",
                "ja4_digest",
                "ja3_digest",
                "rate_limit_api_id",
                "server_action",
                "bot_name",
                "bot_category",
                "bot_status",
                "bot_protection",
                "shared_condition",
                "ruleset",
              ]),
              op: z.enum([
                "re",
                "eq",
                "neq",
                "ex",
                "nex",
                "inc",
                "ninc",
                "pre",
                "suf",
                "sub",
                "gt",
                "gte",
                "lt",
                "lte",
                "list",
              ]),
              neg: z.boolean().optional(),
              key: z.string().optional(),
              value: z.union([z.string(), z.array(z.string()), z.number()]).optional(),
            }),
          ),
        }),
      ),
      action: z
        .object({ mitigate: z.object({ action: z.enum(["deny", "challenge", "log"]) }).optional() })
        .optional(),
      valid: z.boolean().optional(),
      validationErrors: z.union([z.array(z.string()), z.string()]).optional(),
    }),
  }),
  z.object({ action: z.literal("rules.update"), id: z.string(), value: z.string().optional() }),
  z.object({ action: z.literal("rules.remove"), id: z.string(), value: z.unknown() }),
  z.object({
    action: z.literal("rules.priority"),
    id: z.string().optional(),
    value: z.object({
      name: z.string().max(160),
      description: z.string().max(256).optional(),
      active: z.boolean(),
      conditionGroup: z.array(
        z.object({
          conditions: z.array(
            z.object({
              type: z.enum([
                "host",
                "path",
                "method",
                "header",
                "query",
                "cookie",
                "target_path",
                "route",
                "raw_path",
                "ip_address",
                "region",
                "protocol",
                "scheme",
                "environment",
                "domain_environment",
                "user_agent",
                "geo_continent",
                "geo_country",
                "geo_country_region",
                "geo_city",
                "geo_as_number",
                "ja4_digest",
                "ja3_digest",
                "rate_limit_api_id",
                "server_action",
                "bot_name",
                "bot_category",
                "bot_status",
                "bot_protection",
                "shared_condition",
                "ruleset",
              ]),
              op: z.enum([
                "re",
                "eq",
                "neq",
                "ex",
                "nex",
                "inc",
                "ninc",
                "pre",
                "suf",
                "sub",
                "gt",
                "gte",
                "lt",
                "lte",
                "list",
              ]),
              neg: z.boolean().optional(),
              key: z.string().optional(),
              value: z.union([z.string(), z.array(z.string()), z.number()]).optional(),
            }),
          ),
        }),
      ),
      valid: z.boolean().optional(),
      validationErrors: z.union([z.array(z.string()), z.string()]).optional(),
    }),
  }),
  z.object({
    action: z.literal("crs.update"),
    id: z.string(),
    value: z.object({
      name: z.string().max(160),
      description: z.string().max(256).optional(),
      active: z.boolean(),
      conditionGroup: z.array(
        z.object({
          conditions: z.array(
            z.object({
              type: z.enum([
                "host",
                "path",
                "method",
                "header",
                "query",
                "cookie",
                "target_path",
                "route",
                "raw_path",
                "ip_address",
                "region",
                "protocol",
                "scheme",
                "environment",
                "domain_environment",
                "user_agent",
                "geo_continent",
                "geo_country",
                "geo_country_region",
                "geo_city",
                "geo_as_number",
                "ja4_digest",
                "ja3_digest",
                "rate_limit_api_id",
                "server_action",
                "bot_name",
                "bot_category",
                "bot_status",
                "bot_protection",
                "shared_condition",
                "ruleset",
              ]),
              op: z.enum([
                "re",
                "eq",
                "neq",
                "ex",
                "nex",
                "inc",
                "ninc",
                "pre",
                "suf",
                "sub",
                "gt",
                "gte",
                "lt",
                "lte",
                "list",
              ]),
              neg: z.boolean().optional(),
              key: z.string().optional(),
              value: z.union([z.string(), z.array(z.string()), z.number()]).optional(),
            }),
          ),
        }),
      ),
      valid: z.boolean().optional(),
      validationErrors: z.union([z.array(z.string()), z.string()]).optional(),
    }),
  }),
  z.object({ action: z.literal("crs.disable"), id: z.unknown(), value: z.unknown() }),
  z.object({
    action: z.literal("ip.insert"),
    id: z.unknown(),
    value: z.object({ action: z.enum(["deny", "challenge", "log", "allow"]) }),
  }),
  z.object({
    action: z.literal("ip.update"),
    id: z.string().max(180),
    value: z.string().optional(),
  }),
  z.object({ action: z.literal("ip.remove"), id: z.string().optional(), value: z.unknown() }),
  z.object({
    action: z.literal("managedRules.update"),
    id: z.string().optional(),
    value: z.object({
      name: z.string().max(160),
      description: z.string().max(256).optional(),
      active: z.boolean(),
      conditionGroup: z.array(
        z.object({
          conditions: z.array(
            z.object({
              type: z.enum([
                "host",
                "path",
                "method",
                "header",
                "query",
                "cookie",
                "target_path",
                "route",
                "raw_path",
                "ip_address",
                "region",
                "protocol",
                "scheme",
                "environment",
                "domain_environment",
                "user_agent",
                "geo_continent",
                "geo_country",
                "geo_country_region",
                "geo_city",
                "geo_as_number",
                "ja4_digest",
                "ja3_digest",
                "rate_limit_api_id",
                "server_action",
                "bot_name",
                "bot_category",
                "bot_status",
                "bot_protection",
                "shared_condition",
                "ruleset",
              ]),
              op: z.enum([
                "re",
                "eq",
                "neq",
                "ex",
                "nex",
                "inc",
                "ninc",
                "pre",
                "suf",
                "sub",
                "gt",
                "gte",
                "lt",
                "lte",
                "list",
              ]),
              neg: z.boolean().optional(),
              key: z.string().optional(),
              value: z.union([z.string(), z.array(z.string()), z.number()]).optional(),
            }),
          ),
        }),
      ),
      action: z.object({
        mitigate: z
          .object({
            action: z.enum(["log", "challenge", "deny", "bypass", "rate_limit", "redirect"]),
            rateLimit: z
              .union([
                z.object({
                  algo: z.enum(["fixed_window", "token_bucket"]),
                  window: z.number(),
                  limit: z.number(),
                  keys: z.array(z.string()),
                  action: z
                    .union([z.enum(["log", "challenge", "deny", "rate_limit"]), z.string()])
                    .optional(),
                }),
                z.string(),
              ])
              .optional(),
            redirect: z
              .union([z.object({ location: z.string(), permanent: z.boolean() }), z.string()])
              .optional(),
            actionDuration: z.string().nullable().optional(),
            bypassSystem: z.boolean().nullable().optional(),
            logHeaders: z.union([z.string(), z.array(z.string())]).optional(),
          })
          .optional(),
      }),
      valid: z.boolean().optional(),
      validationErrors: z.union([z.array(z.string()), z.string()]).optional(),
    }),
  }),
  z.object({
    action: z.string(),
    id: z.string(),
    value: z.object({
      name: z.string().max(160),
      description: z.string().max(256).optional(),
      active: z.boolean(),
      conditionGroup: z.array(
        z.object({
          conditions: z.array(
            z.object({
              type: z.enum([
                "host",
                "path",
                "method",
                "header",
                "query",
                "cookie",
                "target_path",
                "route",
                "raw_path",
                "ip_address",
                "region",
                "protocol",
                "scheme",
                "environment",
                "domain_environment",
                "user_agent",
                "geo_continent",
                "geo_country",
                "geo_country_region",
                "geo_city",
                "geo_as_number",
                "ja4_digest",
                "ja3_digest",
                "rate_limit_api_id",
                "server_action",
                "bot_name",
                "bot_category",
                "bot_status",
                "bot_protection",
                "shared_condition",
                "ruleset",
              ]),
              op: z.enum([
                "re",
                "eq",
                "neq",
                "ex",
                "nex",
                "inc",
                "ninc",
                "pre",
                "suf",
                "sub",
                "gt",
                "gte",
                "lt",
                "lte",
                "list",
              ]),
              neg: z.boolean().optional(),
              key: z.string().optional(),
              value: z.union([z.string(), z.array(z.string()), z.number()]).optional(),
            }),
          ),
        }),
      ),
      action: z.object({
        mitigate: z
          .object({
            action: z.enum(["log", "challenge", "deny", "bypass", "rate_limit", "redirect"]),
            rateLimit: z
              .union([
                z.object({
                  algo: z.enum(["fixed_window", "token_bucket"]),
                  window: z.number(),
                  limit: z.number(),
                  keys: z.array(z.string()),
                  action: z
                    .union([z.enum(["log", "challenge", "deny", "rate_limit"]), z.string()])
                    .optional(),
                }),
                z.string(),
              ])
              .optional(),
            redirect: z
              .union([z.object({ location: z.string(), permanent: z.boolean() }), z.string()])
              .optional(),
            actionDuration: z.string().nullable().optional(),
            bypassSystem: z.boolean().nullable().optional(),
            logHeaders: z.union([z.string(), z.array(z.string())]).optional(),
          })
          .optional(),
      }),
      valid: z.boolean().optional(),
      validationErrors: z.union([z.array(z.string()), z.string()]).optional(),
    }),
  }),
  z.object({ action: z.string(), id: z.string(), value: z.string().optional() }),
  z.object({ action: z.string(), id: z.string(), value: z.number() }),
  z.object({
    action: z.string(),
    id: z.enum(["sd", "ma", "lfi", "rfi", "rce", "php", "gen", "xss", "sqli", "sf", "java"]),
    value: z.object({ active: z.boolean(), action: z.enum(["deny", "log"]) }),
  }),
  z.object({ action: z.string(), id: z.string().optional(), value: z.string().optional() }),
  z.object({
    action: z.string(),
    id: z.string().optional(),
    value: z.object({
      hostname: z.string(),
      ip: z.string(),
      notes: z.string().optional(),
      action: z.enum(["deny", "challenge", "log", "bypass"]),
    }),
  }),
  z.object({
    action: z.string(),
    id: z.string(),
    value: z.object({
      hostname: z.string(),
      ip: z.string(),
      notes: z.string().optional(),
      action: z.enum(["deny", "challenge", "log", "bypass"]),
    }),
  }),
  z.object({ action: z.string(), id: z.string(), value: z.string().optional() }),
  z.object({
    action: z.string(),
    id: z.enum([
      "ai_bots",
      "bot_filter",
      "bot_protection",
      "traffic_sources",
      "vercel_ruleset",
      "owasp",
    ]),
    value: z.object({
      action: z.enum(["log", "challenge", "deny"]).optional(),
      active: z.boolean(),
    }),
  }),
  z.object({
    action: z.string(),
    id: z.enum([
      "ai_bots",
      "bot_filter",
      "bot_protection",
      "traffic_sources",
      "vercel_ruleset",
      "owasp",
    ]),
    value: z.record(
      z.string(),
      z.object({ active: z.boolean(), action: z.enum(["log", "challenge", "deny"]).optional() }),
    ),
  }),
  z.object({ action: z.string(), id: z.string().optional(), value: z.boolean() }),
  z.object({
    action: z.string(),
    id: z.string().optional(),
    value: z.union([z.string(), z.array(z.string()), z.string()]),
  }),
]);

export type PatchV1SecurityFirewallConfigBody =
  | {
      action: "firewallEnabled";
      id: unknown;
      value: {
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
        action?: { mitigate?: { action: "deny" | "challenge" | "log" } | undefined } | undefined;
        valid?: boolean | undefined;
        validationErrors?: (Array<string> | string) | undefined;
      };
    }
  | {
      action: "rules.insert";
      id: unknown;
      value: {
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
        action?: { mitigate?: { action: "deny" | "challenge" | "log" } | undefined } | undefined;
        valid?: boolean | undefined;
        validationErrors?: (Array<string> | string) | undefined;
      };
    }
  | { action: "rules.update"; id: string; value?: string | undefined }
  | { action: "rules.remove"; id: string; value: unknown }
  | {
      action: "rules.priority";
      id?: string | undefined;
      value: {
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
        valid?: boolean | undefined;
        validationErrors?: (Array<string> | string) | undefined;
      };
    }
  | {
      action: "crs.update";
      id: string;
      value: {
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
        valid?: boolean | undefined;
        validationErrors?: (Array<string> | string) | undefined;
      };
    }
  | { action: "crs.disable"; id: unknown; value: unknown }
  | { action: "ip.insert"; id: unknown; value: { action: "deny" | "challenge" | "log" | "allow" } }
  | { action: "ip.update"; id: string; value?: string | undefined }
  | { action: "ip.remove"; id?: string | undefined; value: unknown }
  | {
      action: "managedRules.update";
      id?: string | undefined;
      value: {
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
                            | ("log" | "challenge" | "deny" | "rate_limit" | string)
                            | undefined;
                        }
                      | string
                    )
                  | undefined;
                redirect?: ({ location: string; permanent: boolean } | string) | undefined;
                actionDuration?: (string | null) | undefined;
                bypassSystem?: (boolean | null) | undefined;
                logHeaders?: (string | Array<string>) | undefined;
              }
            | undefined;
        };
        valid?: boolean | undefined;
        validationErrors?: (Array<string> | string) | undefined;
      };
    }
  | {
      action: string;
      id: string;
      value: {
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
                            | ("log" | "challenge" | "deny" | "rate_limit" | string)
                            | undefined;
                        }
                      | string
                    )
                  | undefined;
                redirect?: ({ location: string; permanent: boolean } | string) | undefined;
                actionDuration?: (string | null) | undefined;
                bypassSystem?: (boolean | null) | undefined;
                logHeaders?: (string | Array<string>) | undefined;
              }
            | undefined;
        };
        valid?: boolean | undefined;
        validationErrors?: (Array<string> | string) | undefined;
      };
    }
  | { action: string; id: string; value?: string | undefined }
  | { action: string; id: string; value: number }
  | {
      action: string;
      id: "sd" | "ma" | "lfi" | "rfi" | "rce" | "php" | "gen" | "xss" | "sqli" | "sf" | "java";
      value: { active: boolean; action: "deny" | "log" };
    }
  | { action: string; id?: string | undefined; value?: string | undefined }
  | {
      action: string;
      id?: string | undefined;
      value: {
        hostname: string;
        ip: string;
        notes?: string | undefined;
        action: "deny" | "challenge" | "log" | "bypass";
      };
    }
  | {
      action: string;
      id: string;
      value: {
        hostname: string;
        ip: string;
        notes?: string | undefined;
        action: "deny" | "challenge" | "log" | "bypass";
      };
    }
  | { action: string; id: string; value?: string | undefined }
  | {
      action: string;
      id:
        | "ai_bots"
        | "bot_filter"
        | "bot_protection"
        | "traffic_sources"
        | "vercel_ruleset"
        | "owasp";
      value: { action?: ("log" | "challenge" | "deny") | undefined; active: boolean };
    }
  | {
      action: string;
      id:
        | "ai_bots"
        | "bot_filter"
        | "bot_protection"
        | "traffic_sources"
        | "vercel_ruleset"
        | "owasp";
      value: Record<
        string,
        { active: boolean; action?: ("log" | "challenge" | "deny") | undefined }
      >;
    }
  | { action: string; id?: string | undefined; value: boolean }
  | { action: string; id?: string | undefined; value: string | Array<string> | string };

export type PatchV1SecurityFirewallConfigResponse = Record<string, never>;

export type PatchV1SecurityFirewallConfigInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { projectId: string; teamId?: string | undefined; slug?: string | undefined };
  body: PatchV1SecurityFirewallConfigBody;
};

export type PatchV1SecurityFirewallConfigHandler = (
  input: PatchV1SecurityFirewallConfigInput,
) => Promise<PatchV1SecurityFirewallConfigResponse>;

export type GetV1SecurityFirewallConfigConfigVersionResponse = {
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
              action: "allow" | "bypass" | "challenge" | "deny" | "log" | "rate_limit" | "redirect";
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

export type GetV1SecurityFirewallConfigConfigVersionInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { configVersion: string };
  query: { projectId: string; teamId?: string | undefined; slug?: string | undefined };
};

export type GetV1SecurityFirewallConfigConfigVersionHandler = (
  input: GetV1SecurityFirewallConfigConfigVersionInput,
) => Promise<GetV1SecurityFirewallConfigConfigVersionResponse>;

export type DeleteV1SecurityFirewallConfigConfigVersionResponse = "";

export type DeleteV1SecurityFirewallConfigConfigVersionInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { configVersion: string };
};

export type DeleteV1SecurityFirewallConfigConfigVersionHandler = (
  input: DeleteV1SecurityFirewallConfigConfigVersionInput,
) => Promise<DeleteV1SecurityFirewallConfigConfigVersionResponse>;

export type PostV1SecurityFirewallConfigConfigVersionActivateResponse = {
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
              action: "allow" | "bypass" | "challenge" | "deny" | "log" | "rate_limit" | "redirect";
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

export type PostV1SecurityFirewallConfigConfigVersionActivateInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { configVersion: string };
};

export type PostV1SecurityFirewallConfigConfigVersionActivateHandler = (
  input: PostV1SecurityFirewallConfigConfigVersionActivateInput,
) => Promise<PostV1SecurityFirewallConfigConfigVersionActivateResponse>;

export type GetV1SecurityFirewallAttackStatusResponse =
  | Record<string, never>
  | {
      anomalies: Array<{
        projectId: string;
        ownerId: string;
        startTime: number;
        endTime: number | null;
        atMinute: number;
        state?: string | undefined;
        affectedHostMap: Record<
          string,
          {
            anomalyAlerts?:
              | Record<
                  string,
                  {
                    at_minute: string;
                    zscore: number;
                    total_requests_minute: number;
                    avg_requests: number;
                    stddev_requests: number;
                  }
                >
              | undefined;
            ddosAlerts?: Record<string, { atMinute: string; totalReqs: number }> | undefined;
          }
        >;
      }>;
    };

export type GetV1SecurityFirewallAttackStatusInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: {
    projectId: string;
    since?: number | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV1SecurityFirewallAttackStatusHandler = (
  input: GetV1SecurityFirewallAttackStatusInput,
) => Promise<GetV1SecurityFirewallAttackStatusResponse>;

export type GetV1SecurityFirewallBypassResponse = {
  result: Array<{
    OwnerId: string;
    Id: string;
    Domain: string;
    Ip: string;
    Action?: ("block" | "bypass") | undefined;
    ProjectId?: string | undefined;
    IsProjectRule?: boolean | undefined;
    Note?: string | undefined;
    CreatedAt: string;
    ActorId?: string | undefined;
    UpdatedAt: string;
    UpdatedAtHour: string;
    DeletedAt?: string | undefined;
    ExpiresAt?: (number | null) | undefined;
  }>;
  pagination?: { OwnerId: string; Id: string } | undefined;
};

export type GetV1SecurityFirewallBypassInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: {
    projectId: string;
    limit?: number | undefined;
    sourceIp?: string | undefined;
    domain?: string | undefined;
    projectScope?: boolean | undefined;
    offset?: string | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV1SecurityFirewallBypassHandler = (
  input: GetV1SecurityFirewallBypassInput,
) => Promise<GetV1SecurityFirewallBypassResponse>;

export const postV1SecurityFirewallBypassBody = z.union([
  z.object({
    domain: z
      .string()
      .max(2544)
      .regex(/([a-z]+[a-z.]+)$/),
    projectScope: z.boolean().optional(),
    sourceIp: z.string().optional(),
    allSources: z.boolean().optional(),
    ttl: z.number().optional(),
    note: z.string().max(500).optional(),
  }),
  z.object({
    domain: z
      .string()
      .max(2544)
      .regex(/([a-z]+[a-z.]+)$/)
      .optional(),
    projectScope: z.boolean(),
    sourceIp: z.string().optional(),
    allSources: z.boolean().optional(),
    ttl: z.number().optional(),
    note: z.string().max(500).optional(),
  }),
]);

export type PostV1SecurityFirewallBypassBody =
  | {
      domain: string;
      projectScope?: boolean | undefined;
      sourceIp?: string | undefined;
      allSources?: boolean | undefined;
      ttl?: number | undefined;
      note?: string | undefined;
    }
  | {
      domain?: string | undefined;
      projectScope: boolean;
      sourceIp?: string | undefined;
      allSources?: boolean | undefined;
      ttl?: number | undefined;
      note?: string | undefined;
    };

export type PostV1SecurityFirewallBypassResponse =
  | {
      ok: boolean;
      result: Array<{
        OwnerId: string;
        Id: string;
        Domain: string;
        Ip?: string | undefined;
        ProjectId: string;
        Note: string;
        IsProjectRule: boolean;
      }>;
      pagination: unknown;
    }
  | {
      ok: boolean;
      result?:
        | Array<{
            OwnerId: string;
            Id: string;
            Domain: string;
            Ip: string;
            Action?: ("block" | "bypass") | undefined;
            ProjectId?: string | undefined;
            IsProjectRule?: boolean | undefined;
            Note?: string | undefined;
            CreatedAt: string;
            ActorId?: string | undefined;
            UpdatedAt: string;
            UpdatedAtHour: string;
            DeletedAt?: string | undefined;
            ExpiresAt?: (number | null) | undefined;
          }>
        | undefined;
    };

export type PostV1SecurityFirewallBypassInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { projectId: string; teamId?: string | undefined; slug?: string | undefined };
  body: PostV1SecurityFirewallBypassBody;
};

export type PostV1SecurityFirewallBypassHandler = (
  input: PostV1SecurityFirewallBypassInput,
) => Promise<PostV1SecurityFirewallBypassResponse>;

export const deleteV1SecurityFirewallBypassBody = z.union([
  z.object({
    domain: z
      .string()
      .max(2544)
      .regex(/([a-z]+[a-z.]+)$/),
    projectScope: z.boolean().optional(),
    sourceIp: z.string().optional(),
    allSources: z.boolean().optional(),
    note: z.string().max(500).optional(),
  }),
  z.object({
    domain: z
      .string()
      .max(2544)
      .regex(/([a-z]+[a-z.]+)$/)
      .optional(),
    projectScope: z.boolean(),
    sourceIp: z.string().optional(),
    allSources: z.boolean().optional(),
    note: z.string().max(500).optional(),
  }),
]);

export type DeleteV1SecurityFirewallBypassBody =
  | {
      domain: string;
      projectScope?: boolean | undefined;
      sourceIp?: string | undefined;
      allSources?: boolean | undefined;
      note?: string | undefined;
    }
  | {
      domain?: string | undefined;
      projectScope: boolean;
      sourceIp?: string | undefined;
      allSources?: boolean | undefined;
      note?: string | undefined;
    };

export type DeleteV1SecurityFirewallBypassResponse = { ok: boolean };

export type DeleteV1SecurityFirewallBypassInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { projectId: string; teamId?: string | undefined; slug?: string | undefined };
  body: DeleteV1SecurityFirewallBypassBody;
};

export type DeleteV1SecurityFirewallBypassHandler = (
  input: DeleteV1SecurityFirewallBypassInput,
) => Promise<DeleteV1SecurityFirewallBypassResponse>;

export type GetV1SecurityFirewallEventsResponse = {
  actions: Array<{
    ruleName: string | null;
    startTime: string;
    endTime: string;
    isActive: boolean;
    action_type: string;
    action: string;
    ruleId: string | null;
    host: string;
    public_ip: string;
    count: number;
  }>;
};

export type GetV1SecurityFirewallEventsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: {
    projectId: string;
    startTimestamp?: number | undefined;
    endTimestamp?: number | undefined;
    hosts?: string | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV1SecurityFirewallEventsHandler = (
  input: GetV1SecurityFirewallEventsInput,
) => Promise<GetV1SecurityFirewallEventsResponse>;

export type PostV1SecurityFirewallConfigGenerateRuleResponse = {
  rule?:
    | {
        name: string;
        description?: string | undefined;
        active: boolean;
        conditionGroup: Array<{
          conditions: Array<{
            type: string;
            op: string;
            neg?: boolean | undefined;
            key?: string | undefined;
            value?: (string | number | Array<string>) | undefined;
          }>;
        }>;
        action: {
          mitigate?:
            | {
                action: string;
                rateLimit?:
                  | ({
                      algo: string;
                      window: number;
                      limit: number;
                      keys: Array<string>;
                      action?: (string | null) | undefined;
                    } | null)
                  | undefined;
                redirect?: ({ location: string; permanent: boolean } | null) | undefined;
                actionDuration?: (string | null) | undefined;
              }
            | undefined;
        };
      }
    | undefined;
  error?: string | undefined;
};

export type PostV1SecurityFirewallConfigGenerateRuleInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { projectId?: string | undefined; teamId?: string | undefined; slug?: string | undefined };
};

export type PostV1SecurityFirewallConfigGenerateRuleHandler = (
  input: PostV1SecurityFirewallConfigGenerateRuleInput,
) => Promise<PostV1SecurityFirewallConfigGenerateRuleResponse>;
