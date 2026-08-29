import { z } from "zod";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV1SecurityFirewallEventsResponse = z.object({
  actions: z.array(
    z.object({
      ruleName: z.string().nullable(),
      startTime: z.string(),
      endTime: z.string(),
      isActive: z.boolean(),
      action_type: z.string(),
      action: z.string(),
      ruleId: z.string().nullable(),
      host: z.string(),
      public_ip: z.string(),
      count: z.number(),
    }),
  ),
});

export type UseGetApiV1SecurityFirewallEventsArgs = {
  projectId: string;
  startTimestamp?: number | undefined;
  endTimestamp?: number | undefined;
  hosts?: string | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV1SecurityFirewallEventsQueryOptions = (
  args: UseGetApiV1SecurityFirewallEventsArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/security/firewall/events",
      "security",
      args.projectId,
      args.startTimestamp,
      args.endTimestamp,
      args.hosts,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/security/firewall/events", {
          projectId: args.projectId,
          startTimestamp: args.startTimestamp,
          endTimestamp: args.endTimestamp,
          hosts: args.hosts,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV1SecurityFirewallEventsResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV1SecurityFirewallEvents = (args: UseGetApiV1SecurityFirewallEventsArgs) =>
  useQuery(getApiV1SecurityFirewallEventsQueryOptions(args));
