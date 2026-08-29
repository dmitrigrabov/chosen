import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1BillingContractCommitmentsArgs = {
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useGetApiV1BillingContractCommitmentsResponse = z.void();

export const getApiV1BillingContractCommitmentsQueryOptions = (
  args: UseGetApiV1BillingContractCommitmentsArgs,
) =>
  queryOptions({
    queryKey: ["GET /v1/billing/contract-commitments", "billing", args.teamId, args.slug],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/billing/contract-commitments", { teamId: args.teamId, slug: args.slug }),
        useGetApiV1BillingContractCommitmentsResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV1BillingContractCommitments = (
  args: UseGetApiV1BillingContractCommitmentsArgs,
) => useQuery(getApiV1BillingContractCommitmentsQueryOptions(args));
