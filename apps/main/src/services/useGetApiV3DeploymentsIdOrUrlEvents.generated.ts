import { z } from "zod";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV3DeploymentsIdOrUrlEventsResponse = z
  .array(
    z
      .union([
        z.object({
          type: z.enum([
            "command",
            "delimiter",
            "deployment-state",
            "edge-function-invocation",
            "exit",
            "fatal",
            "metric",
            "middleware",
            "middleware-invocation",
            "report",
            "stderr",
            "stdout",
          ]),
          created: z.number(),
          payload: z.object({
            deploymentId: z.string(),
            info: z
              .object({
                type: z.string(),
                name: z.string(),
                entrypoint: z.string().optional(),
                path: z.string().optional(),
                step: z.string().optional(),
                readyState: z.string().optional(),
              })
              .optional(),
            text: z.string().optional(),
            id: z.string(),
            date: z.number(),
            serial: z.string(),
            created: z.number().optional(),
            statusCode: z.number().optional(),
            requestId: z.string().optional(),
            proxy: z
              .object({
                timestamp: z.number(),
                method: z.string(),
                host: z.string(),
                path: z.string().optional(),
                statusCode: z.number().optional(),
                userAgent: z.array(z.string()).optional(),
                referer: z.string().optional(),
                clientIp: z.string().optional(),
                region: z.string().optional(),
                scheme: z.string().optional(),
                responseByteSize: z.number().optional(),
                cacheId: z.string().optional(),
                pathType: z.string().optional(),
                pathTypeVariant: z.string().optional(),
                vercelId: z.string().optional(),
                vercelCache: z
                  .enum(["BYPASS", "HIT", "MISS", "PRERENDER", "REVALIDATED", "STALE"])
                  .optional(),
                lambdaRegion: z.string().optional(),
                wafAction: z.enum(["bypass", "challenge", "deny", "log", "rate_limit"]).optional(),
                wafRuleId: z.string().optional(),
              })
              .optional(),
          }),
        }),
        z.object({
          created: z.number(),
          date: z.number(),
          deploymentId: z.string(),
          id: z.string(),
          info: z.object({
            type: z.string(),
            name: z.string(),
            entrypoint: z.string().optional(),
            path: z.string().optional(),
            step: z.string().optional(),
            readyState: z.string().optional(),
          }),
          serial: z.string(),
          text: z.string().optional(),
          type: z.enum([
            "command",
            "delimiter",
            "deployment-state",
            "edge-function-invocation",
            "exit",
            "fatal",
            "metric",
            "middleware",
            "middleware-invocation",
            "report",
            "stderr",
            "stdout",
          ]),
          level: z.enum(["error", "warning"]).optional(),
        }),
        z.object({
          type: z.enum([
            "command",
            "delimiter",
            "deployment-state",
            "edge-function-invocation",
            "exit",
            "fatal",
            "metric",
            "middleware",
            "middleware-invocation",
            "report",
            "stderr",
            "stdout",
          ]),
          created: z.number(),
          payload: z.object({
            deploymentId: z.string(),
            info: z
              .object({
                type: z.string(),
                name: z.string(),
                entrypoint: z.string().optional(),
                path: z.string().optional(),
                step: z.string().optional(),
                readyState: z.string().optional(),
              })
              .optional(),
            text: z.string().optional(),
            id: z.string(),
            date: z.number(),
            serial: z.string(),
            created: z.number().optional(),
            statusCode: z.number().optional(),
            requestId: z.string().optional(),
            proxy: z
              .object({
                timestamp: z.number(),
                method: z.string(),
                host: z.string(),
                path: z.string().optional(),
                statusCode: z.number().optional(),
                userAgent: z.array(z.string()).optional(),
                referer: z.string().optional(),
                clientIp: z.string().optional(),
                region: z.string().optional(),
                scheme: z.string().optional(),
                responseByteSize: z.number().optional(),
                cacheId: z.string().optional(),
                pathType: z.string().optional(),
                pathTypeVariant: z.string().optional(),
                vercelId: z.string().optional(),
                vercelCache: z
                  .enum(["BYPASS", "HIT", "MISS", "PRERENDER", "REVALIDATED", "STALE"])
                  .optional(),
                lambdaRegion: z.string().optional(),
                wafAction: z.enum(["bypass", "challenge", "deny", "log", "rate_limit"]).optional(),
                wafRuleId: z.string().optional(),
              })
              .optional(),
          }),
        }),
        z.object({
          created: z.number(),
          date: z.number(),
          deploymentId: z.string(),
          id: z.string(),
          info: z.object({
            type: z.string(),
            name: z.string(),
            entrypoint: z.string().optional(),
            path: z.string().optional(),
            step: z.string().optional(),
            readyState: z.string().optional(),
          }),
          serial: z.string(),
          text: z.string().optional(),
          type: z.enum([
            "command",
            "delimiter",
            "deployment-state",
            "edge-function-invocation",
            "exit",
            "fatal",
            "metric",
            "middleware",
            "middleware-invocation",
            "report",
            "stderr",
            "stdout",
          ]),
          level: z.enum(["error", "warning"]).optional(),
        }),
        z.object({
          type: z.literal("alias-assigned"),
          deploymentId: z.string(),
          date: z.number(),
          alias: z.array(z.string()),
          aliasError: z.object({ code: z.string(), message: z.string() }).nullable(),
          aliasWarning: z
            .object({
              code: z.string(),
              message: z.string(),
              link: z.string().optional(),
              action: z.string().optional(),
            })
            .nullable(),
        }),
      ])
      .nullable(),
  )
  .nullable();

export type UseGetApiV3DeploymentsIdOrUrlEventsArgs = {
  idOrUrl: string;
  direction?: ("backward" | "forward") | undefined;
  follow?: number | undefined;
  limit?: number | undefined;
  name?: string | undefined;
  since?: number | undefined;
  until?: number | undefined;
  statusCode?: (number | string) | undefined;
  delimiter?: number | undefined;
  builds?: number | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV3DeploymentsIdOrUrlEventsQueryOptions = (
  args: UseGetApiV3DeploymentsIdOrUrlEventsArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v3/deployments/{idOrUrl}/events",
      "deployments",
      args.idOrUrl,
      args.direction,
      args.follow,
      args.limit,
      args.name,
      args.since,
      args.until,
      args.statusCode,
      args.delimiter,
      args.builds,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v3/deployments/{idOrUrl}/events", {
          idOrUrl: args.idOrUrl,
          direction: args.direction,
          follow: args.follow,
          limit: args.limit,
          name: args.name,
          since: args.since,
          until: args.until,
          statusCode: args.statusCode,
          delimiter: args.delimiter,
          builds: args.builds,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV3DeploymentsIdOrUrlEventsResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV3DeploymentsIdOrUrlEvents = (
  args: UseGetApiV3DeploymentsIdOrUrlEventsArgs,
) => useQuery(getApiV3DeploymentsIdOrUrlEventsQueryOptions(args));
