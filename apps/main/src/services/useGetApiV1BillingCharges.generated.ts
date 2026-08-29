import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1BillingChargesArgs = {
  from: string;
  to: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useGetApiV1BillingChargesResponse = z.void();

export const getApiV1BillingChargesQueryOptions = (args: UseGetApiV1BillingChargesArgs) =>
  queryOptions({
    queryKey: ["GET /v1/billing/charges", "billing", args.from, args.to, args.teamId, args.slug],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/billing/charges", {
          from: args.from,
          to: args.to,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV1BillingChargesResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV1BillingCharges = (args: UseGetApiV1BillingChargesArgs) =>
  useQuery(getApiV1BillingChargesQueryOptions(args));
