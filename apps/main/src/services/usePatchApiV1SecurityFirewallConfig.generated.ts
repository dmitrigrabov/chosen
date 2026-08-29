import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UsePatchApiV1SecurityFirewallConfigArgs = {
  projectId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body:
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
    | {
        action: "ip.insert";
        id: unknown;
        value: { action: "deny" | "challenge" | "log" | "allow" };
      }
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
};

export const usePatchApiV1SecurityFirewallConfigResponse = z.object({});

export type UsePatchApiV1SecurityFirewallConfigResponse = Record<string, never>;

export type PatchApiV1SecurityFirewallConfigBody =
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

export const usePatchApiV1SecurityFirewallConfig = (
  options: UseMutationOptions<
    UsePatchApiV1SecurityFirewallConfigResponse,
    Error,
    UsePatchApiV1SecurityFirewallConfigArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UsePatchApiV1SecurityFirewallConfigArgs) =>
      apiFetch(
        buildUrl("/v1/security/firewall/config", {
          projectId: args.projectId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        usePatchApiV1SecurityFirewallConfigResponse,
        {
          method: "PATCH",
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
