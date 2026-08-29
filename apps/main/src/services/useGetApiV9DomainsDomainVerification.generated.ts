import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV9DomainsDomainVerificationArgs = {
  domain: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useGetApiV9DomainsDomainVerificationResponse = z.object({
  txtRecord: z.string(),
  verificationDomain: z.string(),
});

export const getApiV9DomainsDomainVerificationQueryOptions = (
  args: UseGetApiV9DomainsDomainVerificationArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v9/domains/{domain}/verification",
      "domains",
      args.domain,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v9/domains/{domain}/verification", {
          domain: args.domain,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV9DomainsDomainVerificationResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV9DomainsDomainVerification = (
  args: UseGetApiV9DomainsDomainVerificationArgs,
) => useQuery(getApiV9DomainsDomainVerificationQueryOptions(args));
