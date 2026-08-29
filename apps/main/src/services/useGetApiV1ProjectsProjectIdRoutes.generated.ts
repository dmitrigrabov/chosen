import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1ProjectsProjectIdRoutesArgs = {
  projectId: string;
  versionId?: string | undefined;
  q?: string | undefined;
  filter?: ("rewrite" | "redirect" | "set_status" | "transform") | undefined;
  diff?: (boolean | "only") | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useGetApiV1ProjectsProjectIdRoutesResponse = z.union([
  z.object({}),
  z.object({
    routes: z.array(
      z.object({
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
        routeType: z.enum(["redirect", "rewrite", "set_status", "transform"]).optional(),
      }),
    ),
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
    diffCount: z.number(),
  }),
  z.object({
    routes: z.array(
      z.object({
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
        routeType: z.enum(["redirect", "rewrite", "set_status", "transform"]).optional(),
      }),
    ),
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
  }),
  z.object({
    routes: z.array(
      z.object({
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
        routeType: z.enum(["redirect", "rewrite", "set_status", "transform"]).optional(),
      }),
    ),
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
    limit: z.object({ maxRoutes: z.number(), currentRoutes: z.number() }),
  }),
]);

export const getApiV1ProjectsProjectIdRoutesQueryOptions = (
  args: UseGetApiV1ProjectsProjectIdRoutesArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/projects/{projectId}/routes",
      "project-routes",
      args.projectId,
      args.versionId,
      args.q,
      args.filter,
      args.diff,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/projects/{projectId}/routes", {
          projectId: args.projectId,
          versionId: args.versionId,
          q: args.q,
          filter: args.filter,
          diff: args.diff,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV1ProjectsProjectIdRoutesResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV1ProjectsProjectIdRoutes = (args: UseGetApiV1ProjectsProjectIdRoutesArgs) =>
  useQuery(getApiV1ProjectsProjectIdRoutesQueryOptions(args));
