import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1ProjectsProjectIdRoutesArgs = {
  projectId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: {
    route: {
      name: string;
      description?: string | undefined;
      enabled?: boolean | undefined;
      srcSyntax?: ("equals" | "path-to-regexp" | "regex") | undefined;
      route: {
        src: string;
        dest?: string | undefined;
        headers?: Record<string, never> | undefined;
        caseSensitive?: boolean | undefined;
        status?: number | undefined;
        has?:
          | Array<{
              type?: ("host" | "header" | "cookie" | "query") | undefined;
              key?: string | undefined;
              value?: string | undefined;
            }>
          | undefined;
        missing?:
          | Array<{
              type?: ("host" | "header" | "cookie" | "query") | undefined;
              key?: string | undefined;
              value?: string | undefined;
            }>
          | undefined;
        transforms?:
          | Array<{
              type?: ("request.headers" | "request.query" | "response.headers") | undefined;
              op?: ("append" | "set" | "delete") | undefined;
              target?: Record<string, never> | undefined;
              args: unknown;
              env?: Array<string> | undefined;
            }>
          | undefined;
        respectOriginCacheControl?: boolean | undefined;
      };
    };
    position?:
      | {
          placement?: ("start" | "end" | "after" | "before") | undefined;
          referenceId?: string | undefined;
        }
      | undefined;
  };
};

export const useCreateApiV1ProjectsProjectIdRoutesResponse = z.object({
  route: z.object({
    routeType: z.enum(["redirect", "rewrite", "set_status", "transform"]).optional(),
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
    enabled: z.boolean().optional(),
    staged: z.boolean().optional(),
    route: z.object({
      src: z.string(),
      dest: z.string().optional(),
      headers: z.record(z.string(), z.string()).optional(),
      methods: z.array(z.string()).optional(),
      continue: z.boolean().optional(),
      override: z.boolean().optional(),
      caseSensitive: z.boolean().optional(),
      check: z.boolean().optional(),
      important: z.boolean().optional(),
      status: z.number().optional(),
      has: z
        .array(
          z.union([
            z.object({
              type: z.literal("host"),
              value: z.union([
                z.string(),
                z.object({
                  eq: z.union([z.string(), z.number()]).optional(),
                  neq: z.string().optional(),
                  inc: z.array(z.string()).optional(),
                  ninc: z.array(z.string()).optional(),
                  pre: z.string().optional(),
                  suf: z.string().optional(),
                  re: z.string().optional(),
                  gt: z.number().optional(),
                  gte: z.number().optional(),
                  lt: z.number().optional(),
                  lte: z.number().optional(),
                }),
              ]),
            }),
            z.object({
              type: z.enum(["cookie", "header", "query"]),
              key: z.string(),
              value: z
                .union([
                  z.string(),
                  z.object({
                    eq: z.union([z.string(), z.number()]).optional(),
                    neq: z.string().optional(),
                    inc: z.array(z.string()).optional(),
                    ninc: z.array(z.string()).optional(),
                    pre: z.string().optional(),
                    suf: z.string().optional(),
                    re: z.string().optional(),
                    gt: z.number().optional(),
                    gte: z.number().optional(),
                    lt: z.number().optional(),
                    lte: z.number().optional(),
                  }),
                ])
                .optional(),
            }),
          ]),
        )
        .optional(),
      missing: z
        .array(
          z.union([
            z.object({
              type: z.literal("host"),
              value: z.union([
                z.string(),
                z.object({
                  eq: z.union([z.string(), z.number()]).optional(),
                  neq: z.string().optional(),
                  inc: z.array(z.string()).optional(),
                  ninc: z.array(z.string()).optional(),
                  pre: z.string().optional(),
                  suf: z.string().optional(),
                  re: z.string().optional(),
                  gt: z.number().optional(),
                  gte: z.number().optional(),
                  lt: z.number().optional(),
                  lte: z.number().optional(),
                }),
              ]),
            }),
            z.object({
              type: z.enum(["cookie", "header", "query"]),
              key: z.string(),
              value: z
                .union([
                  z.string(),
                  z.object({
                    eq: z.union([z.string(), z.number()]).optional(),
                    neq: z.string().optional(),
                    inc: z.array(z.string()).optional(),
                    ninc: z.array(z.string()).optional(),
                    pre: z.string().optional(),
                    suf: z.string().optional(),
                    re: z.string().optional(),
                    gt: z.number().optional(),
                    gte: z.number().optional(),
                    lt: z.number().optional(),
                    lte: z.number().optional(),
                  }),
                ])
                .optional(),
            }),
          ]),
        )
        .optional(),
      mitigate: z.object({ action: z.enum(["challenge", "deny"]) }).optional(),
      transforms: z
        .array(
          z.union([
            z.object({
              type: z.enum(["request.headers", "request.query", "response.headers"]),
              op: z.enum(["append", "delete", "set"]),
              target: z.object({
                key: z.union([
                  z.string(),
                  z.object({
                    eq: z.union([z.string(), z.number()]).optional(),
                    neq: z.string().optional(),
                    inc: z.array(z.string()).optional(),
                    ninc: z.array(z.string()).optional(),
                    pre: z.string().optional(),
                    suf: z.string().optional(),
                    gt: z.number().optional(),
                    gte: z.number().optional(),
                    lt: z.number().optional(),
                    lte: z.number().optional(),
                  }),
                ]),
              }),
              args: z.union([z.string(), z.array(z.string())]).optional(),
              env: z.array(z.string()).optional(),
            }),
            z.object({
              type: z.literal("request.path"),
              op: z.literal("set"),
              args: z.string(),
              env: z.array(z.string()).optional(),
            }),
          ]),
        )
        .optional(),
      env: z.array(z.string()).optional(),
      locale: z
        .object({
          redirect: z.record(z.string(), z.string()).optional(),
          cookie: z.string().optional(),
        })
        .optional(),
      source: z.string().optional(),
      destination: z
        .union([
          z.string(),
          z.object({
            type: z.literal("service").optional(),
            service: z.string(),
            path: z.string().optional(),
          }),
        ])
        .optional(),
      statusCode: z.number().optional(),
      middlewarePath: z.string().optional(),
      middlewareRawSrc: z.array(z.string()).optional(),
      middleware: z.number().optional(),
      respectOriginCacheControl: z.boolean().optional(),
    }),
    rawSrc: z.string().optional(),
    rawDest: z.string().optional(),
    srcSyntax: z.enum(["equals", "path-to-regexp", "regex"]).optional(),
  }),
  version: z.object({
    id: z.string(),
    s3Key: z.string(),
    lastModified: z.number(),
    createdBy: z.string(),
    isStaging: z.boolean().optional(),
    isLive: z.boolean().optional(),
    ruleCount: z.number().optional(),
    alias: z.string().optional(),
  }),
});

export type UseCreateApiV1ProjectsProjectIdRoutesResponse = {
  route: {
    routeType?: ("redirect" | "rewrite" | "set_status" | "transform") | undefined;
    id: string;
    name: string;
    description?: string | undefined;
    enabled?: boolean | undefined;
    staged?: boolean | undefined;
    route: {
      src: string;
      dest?: string | undefined;
      headers?: Record<string, string> | undefined;
      methods?: Array<string> | undefined;
      continue?: boolean | undefined;
      override?: boolean | undefined;
      caseSensitive?: boolean | undefined;
      check?: boolean | undefined;
      important?: boolean | undefined;
      status?: number | undefined;
      has?:
        | Array<
            | {
                type: "host";
                value:
                  | string
                  | {
                      eq?: (string | number) | undefined;
                      neq?: string | undefined;
                      inc?: Array<string> | undefined;
                      ninc?: Array<string> | undefined;
                      pre?: string | undefined;
                      suf?: string | undefined;
                      re?: string | undefined;
                      gt?: number | undefined;
                      gte?: number | undefined;
                      lt?: number | undefined;
                      lte?: number | undefined;
                    };
              }
            | {
                type: "cookie" | "header" | "query";
                key: string;
                value?:
                  | (
                      | string
                      | {
                          eq?: (string | number) | undefined;
                          neq?: string | undefined;
                          inc?: Array<string> | undefined;
                          ninc?: Array<string> | undefined;
                          pre?: string | undefined;
                          suf?: string | undefined;
                          re?: string | undefined;
                          gt?: number | undefined;
                          gte?: number | undefined;
                          lt?: number | undefined;
                          lte?: number | undefined;
                        }
                    )
                  | undefined;
              }
          >
        | undefined;
      missing?:
        | Array<
            | {
                type: "host";
                value:
                  | string
                  | {
                      eq?: (string | number) | undefined;
                      neq?: string | undefined;
                      inc?: Array<string> | undefined;
                      ninc?: Array<string> | undefined;
                      pre?: string | undefined;
                      suf?: string | undefined;
                      re?: string | undefined;
                      gt?: number | undefined;
                      gte?: number | undefined;
                      lt?: number | undefined;
                      lte?: number | undefined;
                    };
              }
            | {
                type: "cookie" | "header" | "query";
                key: string;
                value?:
                  | (
                      | string
                      | {
                          eq?: (string | number) | undefined;
                          neq?: string | undefined;
                          inc?: Array<string> | undefined;
                          ninc?: Array<string> | undefined;
                          pre?: string | undefined;
                          suf?: string | undefined;
                          re?: string | undefined;
                          gt?: number | undefined;
                          gte?: number | undefined;
                          lt?: number | undefined;
                          lte?: number | undefined;
                        }
                    )
                  | undefined;
              }
          >
        | undefined;
      mitigate?: { action: "challenge" | "deny" } | undefined;
      transforms?:
        | Array<
            | {
                type: "request.headers" | "request.query" | "response.headers";
                op: "append" | "delete" | "set";
                target: {
                  key:
                    | string
                    | {
                        eq?: (string | number) | undefined;
                        neq?: string | undefined;
                        inc?: Array<string> | undefined;
                        ninc?: Array<string> | undefined;
                        pre?: string | undefined;
                        suf?: string | undefined;
                        gt?: number | undefined;
                        gte?: number | undefined;
                        lt?: number | undefined;
                        lte?: number | undefined;
                      };
                };
                args?: (string | Array<string>) | undefined;
                env?: Array<string> | undefined;
              }
            | { type: "request.path"; op: "set"; args: string; env?: Array<string> | undefined }
          >
        | undefined;
      env?: Array<string> | undefined;
      locale?:
        | { redirect?: Record<string, string> | undefined; cookie?: string | undefined }
        | undefined;
      source?: string | undefined;
      destination?:
        | (string | { type?: "service" | undefined; service: string; path?: string | undefined })
        | undefined;
      statusCode?: number | undefined;
      middlewarePath?: string | undefined;
      middlewareRawSrc?: Array<string> | undefined;
      middleware?: number | undefined;
      respectOriginCacheControl?: boolean | undefined;
    };
    rawSrc?: string | undefined;
    rawDest?: string | undefined;
    srcSyntax?: ("equals" | "path-to-regexp" | "regex") | undefined;
  };
  version: {
    id: string;
    s3Key: string;
    lastModified: number;
    createdBy: string;
    isStaging?: boolean | undefined;
    isLive?: boolean | undefined;
    ruleCount?: number | undefined;
    alias?: string | undefined;
  };
};

export type CreateApiV1ProjectsProjectIdRoutesBody = {
  route: {
    name: string;
    description?: string | undefined;
    enabled?: boolean | undefined;
    srcSyntax?: ("equals" | "path-to-regexp" | "regex") | undefined;
    route: {
      src: string;
      dest?: string | undefined;
      headers?: Record<string, never> | undefined;
      caseSensitive?: boolean | undefined;
      status?: number | undefined;
      has?:
        | Array<{
            type?: ("host" | "header" | "cookie" | "query") | undefined;
            key?: string | undefined;
            value?: string | undefined;
          }>
        | undefined;
      missing?:
        | Array<{
            type?: ("host" | "header" | "cookie" | "query") | undefined;
            key?: string | undefined;
            value?: string | undefined;
          }>
        | undefined;
      transforms?:
        | Array<{
            type?: ("request.headers" | "request.query" | "response.headers") | undefined;
            op?: ("append" | "set" | "delete") | undefined;
            target?: Record<string, never> | undefined;
            args: unknown;
            env?: Array<string> | undefined;
          }>
        | undefined;
      respectOriginCacheControl?: boolean | undefined;
    };
  };
  position?:
    | {
        placement?: ("start" | "end" | "after" | "before") | undefined;
        referenceId?: string | undefined;
      }
    | undefined;
};

export const useCreateApiV1ProjectsProjectIdRoutes = (
  options: UseMutationOptions<
    UseCreateApiV1ProjectsProjectIdRoutesResponse,
    Error,
    UseCreateApiV1ProjectsProjectIdRoutesArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1ProjectsProjectIdRoutesArgs) =>
      apiFetch(
        buildUrl("/v1/projects/{projectId}/routes", {
          projectId: args.projectId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useCreateApiV1ProjectsProjectIdRoutesResponse,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["project-routes"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
