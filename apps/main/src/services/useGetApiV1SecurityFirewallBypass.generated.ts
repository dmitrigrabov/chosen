import { z } from "zod";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV1SecurityFirewallBypassResponse = z.object({
  result: z.array(
    z.object({
      OwnerId: z.string(),
      Id: z.string(),
      Domain: z.string(),
      Ip: z.string(),
      Action: z.enum(["block", "bypass"]).optional(),
      ProjectId: z.string().optional(),
      IsProjectRule: z.boolean().optional(),
      Note: z.string().optional(),
      CreatedAt: z.string(),
      ActorId: z.string().optional(),
      UpdatedAt: z.string(),
      UpdatedAtHour: z.string(),
      DeletedAt: z.string().optional(),
      ExpiresAt: z.number().nullable().optional(),
    }),
  ),
  pagination: z.object({ OwnerId: z.string(), Id: z.string() }).optional(),
});

export type UseGetApiV1SecurityFirewallBypassArgs = {
  projectId: string;
  limit?: number | undefined;
  sourceIp?: string | undefined;
  domain?: string | undefined;
  projectScope?: boolean | undefined;
  offset?: string | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV1SecurityFirewallBypassQueryOptions = (
  args: UseGetApiV1SecurityFirewallBypassArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/security/firewall/bypass",
      "security",
      args.projectId,
      args.limit,
      args.sourceIp,
      args.domain,
      args.projectScope,
      args.offset,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/security/firewall/bypass", {
          projectId: args.projectId,
          limit: args.limit,
          sourceIp: args.sourceIp,
          domain: args.domain,
          projectScope: args.projectScope,
          offset: args.offset,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV1SecurityFirewallBypassResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV1SecurityFirewallBypass = (args: UseGetApiV1SecurityFirewallBypassArgs) =>
  useQuery(getApiV1SecurityFirewallBypassQueryOptions(args));
