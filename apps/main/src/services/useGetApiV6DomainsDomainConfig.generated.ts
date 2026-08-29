import { z } from "zod";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV6DomainsDomainConfigResponse = z.object({
  configuredBy: z.enum(["A", "CNAME", "dns-01", "http", "null"]).nullable(),
  acceptedChallenges: z.array(z.enum(["dns-01", "http-01"])),
  recommendedIPv4: z.array(z.object({ rank: z.number(), value: z.array(z.string()) })),
  recommendedCNAME: z.array(z.object({ rank: z.number(), value: z.string() })),
  misconfigured: z.boolean(),
});

export type UseGetApiV6DomainsDomainConfigArgs = {
  domain: string;
  projectIdOrName?: string | undefined;
  strict?: ("true" | "false") | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV6DomainsDomainConfigQueryOptions = (args: UseGetApiV6DomainsDomainConfigArgs) =>
  queryOptions({
    queryKey: [
      "GET /v6/domains/{domain}/config",
      "domains",
      args.domain,
      args.projectIdOrName,
      args.strict,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v6/domains/{domain}/config", {
          domain: args.domain,
          projectIdOrName: args.projectIdOrName,
          strict: args.strict,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV6DomainsDomainConfigResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV6DomainsDomainConfig = (args: UseGetApiV6DomainsDomainConfigArgs) =>
  useQuery(getApiV6DomainsDomainConfigQueryOptions(args));
