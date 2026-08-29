import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1SecurityFirewallAttackStatusArgs = {
  projectId: string;
  since?: number | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useGetApiV1SecurityFirewallAttackStatusResponse = z.union([
  z.object({}),
  z.object({
    anomalies: z.array(
      z.object({
        projectId: z.string(),
        ownerId: z.string(),
        startTime: z.number(),
        endTime: z.number().nullable(),
        atMinute: z.number(),
        state: z.string().optional(),
        affectedHostMap: z.record(
          z.string(),
          z.object({
            anomalyAlerts: z
              .record(
                z.string(),
                z.object({
                  at_minute: z.string(),
                  zscore: z.number(),
                  total_requests_minute: z.number(),
                  avg_requests: z.number(),
                  stddev_requests: z.number(),
                }),
              )
              .optional(),
            ddosAlerts: z
              .record(z.string(), z.object({ atMinute: z.string(), totalReqs: z.number() }))
              .optional(),
          }),
        ),
      }),
    ),
  }),
]);

export const getApiV1SecurityFirewallAttackStatusQueryOptions = (
  args: UseGetApiV1SecurityFirewallAttackStatusArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/security/firewall/attack-status",
      "security",
      args.projectId,
      args.since,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/security/firewall/attack-status", {
          projectId: args.projectId,
          since: args.since,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV1SecurityFirewallAttackStatusResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV1SecurityFirewallAttackStatus = (
  args: UseGetApiV1SecurityFirewallAttackStatusArgs,
) => useQuery(getApiV1SecurityFirewallAttackStatusQueryOptions(args));
